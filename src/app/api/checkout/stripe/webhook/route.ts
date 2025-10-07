// app/api/checkout/stripe/webhook/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function must(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(must("STRIPE_SECRET_KEY"))
const resend = new Resend(must("RESEND_API_KEY"))
const FROM = must("RESEND_FROM")

type TrackId = "t1-en" | "t2-en"

const ZOOM_LINK: Record<TrackId, string | undefined> = {
  "t1-en": process.env.ZOOM_T1_EN_LINK,
  "t2-en": process.env.ZOOM_T2_EN_LINK,
}

const FIRST_DATE_TEXT: Record<TrackId, string> = {
  "t1-en": "Saturday, January 10, 2026 — 7:00 PM (Paris) / 1:00 PM (New York)",
  "t2-en": "Saturday, January 17, 2026 — 7:00 PM (Paris) / 1:00 PM (New York)",
}

function welcomeHtml(track: TrackId, link: string) {
  const when = FIRST_DATE_TEXT[track] || "on the announced date"
  return `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#171717">
  <p>Hello,</p>
  <p>Welcome to the group therapy. The first session will be <strong>${when}</strong>, then every two weeks. Duration: 90 minutes.</p>
  <p>Rules: camera optional, confidentiality guaranteed.</p>
  <p><strong>Access link for the sessions:</strong><br />
    <a href="${link}" style="color:#7c3aed">${link}</a>
  </p>
  <p>See you soon,<br/>Léo Gayrard</p>
</div>`.trim()
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")
  if (!sig) return NextResponse.json({ error: "no_signature" }, { status: 400 })
  const payload = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, must("STRIPE_WEBHOOK_SECRET"))
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session
    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "customer_details", "subscription"],
    })

    const email = full.customer_details?.email ?? undefined
    const sub = (full.subscription ?? null) as Stripe.Subscription | null
    const trackRaw = (sub?.metadata?.track ??
      session.metadata?.track ??
      session.client_reference_id) as TrackId | undefined

    if (trackRaw === "t1-en" || trackRaw === "t2-en") {
      const link = ZOOM_LINK[trackRaw] || process.env.ZOOM_DEFAULT_LINK || "#"

      if (email) {
        // Mail to client
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: `Welcome — ${trackRaw === "t1-en" ? "Theme 1: Anxiety & Regulation" : "Theme 2: Relationships & Self-Esteem"}`,
          html: welcomeHtml(trackRaw, link),
        })

        // Mail to admin
        await resend.emails.send({
          from: FROM,
          to: must("CONTACT_TO"),
          subject: `[NEW SUB] ${trackRaw}`,
          html: `<div style="font-family:Arial"><p>Track: <b>${trackRaw}</b></p><p>Email: ${email}</p><p>Sub: ${sub?.id ?? "n/a"}</p></div>`,
        })
      }

      return NextResponse.json({ ok: true })
    }

    // E-books → no mail
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("Webhook handler error:", e)
    return NextResponse.json({ error: "handler_error" }, { status: 200 })
  }
}

// healthcheck pour éviter 405 et tester en prod
export async function GET() {
  return new Response("ok", { status: 200 })
}
