import { NextResponse } from "next/server"
import { Resend } from "resend"
import { makeUnsubToken } from "../route"

const resend = new Resend(process.env.RESEND_API_KEY)

function successHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unsubscribed — Third Path</title>
<style>
  body{font-family:Georgia,serif;background:#f9fafb;color:#1e293b;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
  .box{max-width:480px;padding:48px 32px;text-align:center}
  h1{font-size:28px;font-weight:400;font-style:italic;margin:0 0 16px}
  p{color:#64748b;font-size:15px;line-height:1.7;margin:0 0 24px}
  a{color:#2563eb;text-decoration:none}
  .label{font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#2563eb;font-family:Arial,sans-serif;margin-bottom:24px}
</style>
</head>
<body><div class="box">
  <p class="label">Third Path · Library</p>
  <h1>You've been unsubscribed.</h1>
  <p>You won't receive any more emails from the Third Path Library.</p>
  <a href="https://thirdpath.cloud">← Back to thirdpath.cloud</a>
</div></body></html>`
}

function invalidHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Invalid link — Third Path</title>
<style>
  body{font-family:Georgia,serif;background:#f9fafb;color:#1e293b;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
  .box{max-width:480px;padding:48px 32px;text-align:center}
  h1{font-size:28px;font-weight:400;font-style:italic;margin:0 0 16px}
  p{color:#64748b;font-size:15px;line-height:1.7;margin:0}
  a{color:#2563eb;text-decoration:none}
  .label{font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#2563eb;font-family:Arial,sans-serif;margin-bottom:24px}
</style>
</head>
<body><div class="box">
  <p class="label">Third Path · Library</p>
  <h1>Invalid link.</h1>
  <p>This unsubscribe link is invalid or has expired.<br><br><a href="https://thirdpath.cloud">← Back to thirdpath.cloud</a></p>
</div></body></html>`
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = (searchParams.get("email") || "").toLowerCase().trim()
  const token = searchParams.get("token") || ""
  const htmlHeaders = { headers: { "Content-Type": "text/html; charset=utf-8" } }

  if (!email || token !== makeUnsubToken(email)) {
    return new NextResponse(invalidHtml(), htmlHeaders)
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      const list = await resend.contacts.list({ audienceId })
      const contacts: Array<{ id: string; email: string }> = (list.data as { data?: Array<{ id: string; email: string }> })?.data ?? []
      const contact = contacts.find((c) => c.email.toLowerCase() === email)
      if (contact?.id) {
        await resend.contacts.update({ id: contact.id, audienceId, unsubscribed: true })
      }
    }
    return new NextResponse(successHtml(), htmlHeaders)
  } catch {
    return new NextResponse(successHtml(), htmlHeaders)
  }
}
