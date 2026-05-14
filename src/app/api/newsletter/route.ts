import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createHmac } from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM || "contact@troisiemechemin.fr"

export function makeUnsubToken(email: string): string {
  const secret = process.env.NEWSLETTER_SECRET ?? process.env.RESEND_API_KEY ?? "newsletter-fallback"
  return createHmac("sha256", secret).update(email.toLowerCase()).digest("hex").slice(0, 32)
}

function welcomeHtml(email: string) {
  const token = makeUnsubToken(email)
  const unsubUrl = `https://thirdpath.cloud/api/newsletter/unsubscribe?email=${encodeURIComponent(email.toLowerCase())}&token=${token}`
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px">
    <div style="border-bottom:1px solid #222;padding-bottom:24px;margin-bottom:32px">
      <p style="color:#6b7280;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;margin:0;font-family:Arial,sans-serif">Third Path · Library</p>
    </div>
    <h1 style="color:#f9fafb;font-size:32px;font-weight:400;font-style:italic;margin:0 0 16px;line-height:1.3">Welcome to the Library.</h1>
    <p style="color:#9ca3af;font-size:16px;line-height:1.8;margin:0 0 24px;font-style:italic">
      You'll receive a quiet note whenever a new reflection is published — no noise, no frequency promises. Just the work.
    </p>
    <p style="color:#9ca3af;font-size:16px;line-height:1.8;margin:0 0 32px">
      In the meantime, explore what's already there.
    </p>
    <a href="https://thirdpath.cloud/articles" style="display:inline-block;background:#f9fafb;color:#0a0a0a;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;letter-spacing:0.05em">
      Read the Library →
    </a>
    <div style="border-top:1px solid #222;padding-top:24px;margin-top:48px">
      <p style="color:#4b5563;font-size:12px;margin:0;font-family:Arial,sans-serif">
        Leo Gayrard · Licensed Psychologist ·
        <a href="https://thirdpath.cloud" style="color:#4b5563">thirdpath.cloud</a>
      </p>
      <p style="margin:8px 0 0;font-family:Arial,sans-serif">
        <a href="${unsubUrl}" style="color:#4b5563;font-size:11px">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email: string = body?.email ?? ""

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false })
    }

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Welcome to the Third Path Library.",
      html: welcomeHtml(email),
    })

    const adminEmail = process.env.CONTACT_TO
    if (adminEmail) {
      await resend.emails.send({
        from: FROM,
        to: adminEmail,
        subject: `[Newsletter] New subscriber: ${email}`,
        html: `<div style="font-family:Arial"><p>New newsletter subscriber: <b>${email}</b></p></div>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Newsletter subscription error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
