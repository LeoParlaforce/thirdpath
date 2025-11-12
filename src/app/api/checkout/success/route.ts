import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get("id") || url.searchParams.get("session_id")
    if (!id) {
      return NextResponse.json({ error: "missing_session_id" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["subscription", "customer", "line_items.data.price.product"],
    })

    const track =
      (session.metadata?.track as string | undefined) ||
      session.client_reference_id ||
      null

    const email = session.customer_details?.email || null

    const lineItem = session.line_items?.data?.[0]
    let slug: string | null = null

    if (lineItem?.price?.product && typeof lineItem.price.product !== "string") {
      const product = lineItem.price.product as Stripe.Product
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slug = (product.metadata as any)?.slug || null
    }

    // fallback sur description si metadata.slug non présent
    if (!slug && lineItem?.description) {
      slug = lineItem.description.toLowerCase().replace(/\s+/g, "-")
    }

    const res = NextResponse.json({ track, email, slug }, { status: 200 })

    // Group IDs version English
    const isMember = track === "t1-en" || track === "t2-en"

    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer
        ? (session.customer as Stripe.Customer).id
        : null

    if (customerId && isMember) {
      res.cookies.set("member_cid", customerId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })
    }

    return res
  } catch (e: unknown) {
    console.error("checkout route error:", e)
    const message = e instanceof Error ? e.message : "internal_error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
