// src/app/api/tracks/send-welcome/route.ts
import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-en" | "t2-en"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const resend = new Resend(mustGet("RESEND_API_KEY"))
const FROM = mustGet("RESEND_FROM")

// Jitsi/Zoom links from .env.local
const SESSION_LINK: Record<TrackId, string | undefined> = {
  "t1-en": process.env.ZOOM_T1_EN_LINK,
  "t2-en": process.env.ZOOM_T2_EN_LINK,
}

const FIRST_DATE_TEXT: Record<TrackId, string> = {
  "t1-en": "Saturday, January 10, 2026 at 7:00 PM (Europe/Paris)",
  "t2-en": "Saturday, January 17, 2026 at 7:00 PM (Europe/Paris)",
}

const SUBJECT: Record<TrackId, string> = {
  "t1-en": "Welcome — Group ENG — Theme 1",
  "t2-en": "Welcome — Group ENG — Theme 2",
}

function welcomeHtml(track: TrackId, link: string) {
  const when = FIRST_DATE_TEXT[track]
  return `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#171717">
  <p>Hello,</p>
  <p>Welcome to the group session. The first meeting will be on <strong>${when}</strong>, then every two weeks. Duration: 90 minutes.</p>
  <p>Rules: camera optional, confidentiality required.</p>
  <p>You will speak only if you want to. Nothing is mandatory — some participants just listen, others share. You decide your level of involvement.</p>
  <p><strong>Access link:</strong><br />
    <a href="${link}" style="color:#7c3aed">${link}</a>
  </p>
  <p>Best regards,<br/>Léo Gayrard</p>
</div>`.trim()
}

export async function POST(req: Request) {
  const { email, track } = (await req.json()) as { email?: string; track?: TrackId }
  if (!email || !track) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const link = SESSION_LINK[track] || process.env.ZOOM_DEFAULT_LINK || "#"

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: SUBJECT[track],
      html: welcomeHtml(track, link),
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("welcome send error:", e)
    return NextResponse.json({ error: "send_failed" }, { status: 500 })
  }
}
