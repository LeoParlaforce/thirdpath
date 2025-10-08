// src/app/api/checkout/ebook-member/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { cookies } from "next/headers"
import { products } from "@/app/boutique/data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))
const ACTIVE_STATUSES = ["active", "trialing", "past_due", "unpaid"]

async function isMember(customerId: string) {
  const query = `customer:'${customerId}' AND (${ACTIVE_STATUSES.map(s => `status:'${s}'`).join(" OR ")})`
  const result = await stripe.subscriptions.search({ query, limit: 1 })
  return result.data.length > 0
}

export async function POST(req: Request) {
  try {
    const { slug, email } = (await req.json()) as { slug?: string; email?: string }
    if (!slug) return NextResponse.json({ error: "missing_slug" }, { status: 400 })

    // 1. get customer id from cookie
    const store = await cookies()
    let cid = store.get("member_cid")?.value

    // 2. fallback: if no cookie, try via email (useful after logout)
    if (!cid && email) {
      const list = await stripe.customers.list({ email, limit: 1 })
      cid = list.data[0]?.id
    }

    if (!cid) {
      return NextResponse.json({ error: "not_member" }, { status: 403 })
    }

    // 3. check active membership
    const valid = await isMember(cid)
    if (!valid) {
      return NextResponse.json({ error: "not_member" }, { status: 403 })
    }

    // 4. get product
    const p = products.find(x => x.slug === slug)
    if (!p) return NextResponse.json({ error: "unknown_product" }, { status: 404 })

    // 5. get price
    const unit_amount = Number(
      process.env[
        slug === "pack-integral"
          ? "PACK_MEMBER_PRICE_USD_CENTS"
          : "GUIDE_MEMBER_PRICE_USD_CENTS"
      ]
    )
    if (!unit_amount) {
      return NextResponse.json({ error: "price_missing" }, { status: 500 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin

    // 6. create checkout session for member
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "auto",
      customer: cid,
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
  } catch (e: unknown) {
    console.error("ebook-member error:", e)
    const message = e instanceof Error ? e.message : "internal_error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
