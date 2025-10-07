import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-en" | "t2-en"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))

// Public anchors for redirects
const publicAnchorByTrack: Record<TrackId, string> = {
  "t1-en": "anxiety",
  "t2-en": "relationships",
}

// Start dates — 19:00 Paris = 18:00 UTC
const T1_START_UTC = Math.floor(Date.UTC(2026, 0, 10, 18, 0, 0) / 1000)
const T2_START_UTC = Math.floor(Date.UTC(2026, 0, 17, 18, 0, 0) / 1000)

export async function POST(req: Request) {
  const { track } = (await req.json()) as { track?: string }

  if (!track || (track !== "t1-en" && track !== "t2-en")) {
    return NextResponse.json({ error: "invalid_track" }, { status: 400 })
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin

  const usdCents = Number(process.env.GROUP_PRICE_USD_CENTS || "0")
  if (!usdCents) return NextResponse.json({ error: "price_missing" }, { status: 500 })

  const trial_end = track === "t1-en" ? T1_START_UTC : T2_START_UTC

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    locale: "auto",
    client_reference_id: track,
    metadata: { track },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/therapies-groupe#inscription-${publicAnchorByTrack[track]}`,
    allow_promotion_codes: true,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: usdCents,
          recurring: { interval: "week", interval_count: 2 },
          product_data: {
            name:
              track === "t1-en"
                ? "Group Theme 1 — Anxiety & Regulation"
                : "Group Theme 2 — Relationships & Self-Esteem",
          },
        },
      },
    ],
    subscription_data: {
      trial_end,
      proration_behavior: "none",
      metadata: { track },
    },
  })

  return NextResponse.json({ url: session.url }, { status: 200 })
}
