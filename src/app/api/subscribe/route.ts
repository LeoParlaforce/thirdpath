// src/app/api/subscribe/route.ts
import Stripe from "stripe"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-en" | "t2-en"

function must(key: string): string {
  const v = process.env[key]
  if (!v) throw new Error(`Missing ${key}`)
  return v
}

const stripe = new Stripe(must("STRIPE_SECRET_KEY"))

const LABEL: Record<TrackId, string> = {
  "t1-en": "Group ENG — Theme 1",
  "t2-en": "Group ENG — Theme 2",
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { track?: TrackId }
    const track = body.track

    if (track !== "t1-en" && track !== "t2-en") {
      return NextResponse.json({ error: "bad_track" }, { status: 400 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
    const unit_amount = Number(process.env.GROUP_PRICE_USD_CENTS ?? "2400")

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      locale: "auto",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount,
            recurring: { interval: "week", interval_count: 2 },
            product_data: { name: LABEL[track], metadata: { track } },
          },
          quantity: 1,
        },
      ],
      subscription_data: { metadata: { track } },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/therapies-group#schedule`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (e: unknown) {
    console.error("subscribe error:", e)
    const msg = e instanceof Error ? e.message : "stripe_error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
