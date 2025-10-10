// src/app/api/checkout/create/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-en" | "t2-en"
const CAP = 10

function must(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(must("STRIPE_SECRET_KEY"))

const publicAnchorByTrack: Record<TrackId, string> = {
  "t1-en": "anxiety",
  "t2-en": "relationships",
}

// Start dates — 19:00 Paris = 18:00 UTC
const T1_START_UTC = Math.floor(Date.UTC(2026, 0, 10, 18, 0, 0) / 1000)
const T2_START_UTC = Math.floor(Date.UTC(2026, 0, 17, 18, 0, 0) / 1000)
function startUnixFor(track: TrackId): number {
  return track === "t1-en" ? T1_START_UTC : T2_START_UTC
}

async function countActiveFor(track: TrackId): Promise<number> {
  // Compte abonnements actifs ou en période d’essai avec le même metadata.track
  const query = `(status:'active' OR status:'trialing') AND metadata['track']:'${track}'`
  let count = 0
  let next_page: string | null = null
  do {
    const res = await stripe.subscriptions.search({
      query,
      limit: 100,
      page: next_page ?? undefined,
    })
    count += res.data.length
    next_page = (res as any).next_page || null
    if (count >= CAP) return count
  } while (next_page)
  return count
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const track = body?.track as TrackId | undefined
    if (track !== "t1-en" && track !== "t2-en") {
      return NextResponse.json({ error: "invalid_track" }, { status: 400 })
    }

    // Capacity gate
    const used = await countActiveFor(track)
    if (used >= CAP) {
      return NextResponse.json(
        { error: "track_full", track, used, cap: CAP },
        { status: 409 },
      )
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
    const usdCentsNum = Number(process.env.GROUP_PRICE_USD_CENTS)
    if (!usdCentsNum || usdCentsNum < 50) {
      return NextResponse.json({ error: "price_missing" }, { status: 500 })
    }

    const trial_end = startUnixFor(track)
    const now = Math.floor(Date.now() / 1000)
    if (trial_end <= now) {
      return NextResponse.json({ error: "trial_end_in_past" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      locale: "auto",
      client_reference_id: track,
      metadata: { track },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/therapies-group#inscription-${publicAnchorByTrack[track]}`,
      allow_promotion_codes: true,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: usdCentsNum,
            recurring: { interval: "week", interval_count: 2 },
            product_data: {
              name:
                track === "t1-en"
                  ? "Group Theme 1 — Anxiety & Regulation"
                  : "Group Theme 2 — Relationships & Self-Esteem",
              metadata: { track },
            },
          },
        },
      ],
      subscription_data: {
        trial_end,
        metadata: { track },
      },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (e: unknown) {
    console.error("checkout/create error:", e)
    const message = e instanceof Error ? e.message : "internal_error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "checkout/create" })
}
