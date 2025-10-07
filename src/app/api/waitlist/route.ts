// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const resend = new Resend(mustGet("RESEND_API_KEY"))
const ADMIN_TO = mustGet("CONTACT_TO")
const FROM = mustGet("RESEND_FROM")

type Body = {
  type: "info" | "waitlist"
  name: string
  email: string
  track: "t1-en" | "t2-en" | "t1-fr" | "t2-fr"
  message?: string
}

export async function POST(req: Request) {
  const b = (await req.json()) as Partial<Body>

  if (!b?.type || !b?.name || !b?.email || !b?.track) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  // Internal email (to admin)
  const tag = b.type === "waitlist" ? "[WAITLIST]" : "[INFO]"
  const adminHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif">
    <p>${tag} ${b.track}</p>
    <p><strong>Name:</strong> ${b.name}<br/>
    <strong>Email:</strong> ${b.email}</p>
    ${
      b.message
        ? `<p><strong>Message:</strong><br/>${b.message.replace(/\n/g, "<br/>")}</p>`
        : ""
    }
  </div>`.trim()

  // Auto-reply to user
  const firstName = b.name.split(" ")[0] || ""
  const userHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif">
    <p>Hello ${firstName},</p>
    ${
      b.type === "waitlist"
        ? `<p>You’ve been added to the waiting list for <strong>${b.track}</strong>. We’ll contact you as soon as a spot becomes available.</p>`
        : `<p>Thank you for your request. We’ll get back to you shortly.</p>`
    }
  </div>`.trim()

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: ADMIN_TO,
        subject: `${tag} ${b.track}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: b.email!,
        subject: "Confirmation received",
        html: userHtml,
      }),
    ])
  } catch (e) {
    console.error("waitlist send error:", e)
    // still respond ok to avoid blocking UI
  }

  return NextResponse.json({ ok: true })
}
