import { NextResponse } from "next/server"
import Stripe from "stripe"
import { products } from "@/app/boutique/data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function mustGet(n: string) {
  const v = process.env[n]
  if (!v) throw new Error(`Missing ${n}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))

export async function POST(req: Request) {
  const { slug } = (await req.json()) as { slug?: string }
  if (!slug) return NextResponse.json({ error: "missing_slug" }, { status: 400 })

  const p = products.find((x) => x.slug === slug)
  if (!p) return NextResponse.json({ error: "unknown_product" }, { status: 404 })

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const isPack = slug === "pack-integral"

  const unit_amount = Number(
    process.env[isPack ? "PACK_PRICE_USD_CENTS" : "GUIDE_PRICE_USD_CENTS"]
  )
  if (!unit_amount)
    return NextResponse.json({ error: "price_missing" }, { status: 500 })

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "auto",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/boutique/${slug}`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount,
          product_data: { name: p.title },
        },
      },
    ],
  })

  return NextResponse.json({ url: session.url }, { status: 200 })
}
