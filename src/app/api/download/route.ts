import { NextResponse } from "next/server"
import Stripe from "stripe"
import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PACK_FILE = "Psychological Guides - Full Pack.rar" // présent dans /public/

const files: Record<string, string> = {
  "introduction-to-guides": "Introduction to the psychological guides.pdf",
  "self-esteem": "Self-esteem - psychological & practical guide.pdf",
  "depression": "Depression - psychological & practical guide.pdf",
  "anxiety": "Anxiety - psychological & practical guide.pdf",
  "relationships": "Romantical relationships - psychological & practical guide.pdf",
  "loneliness": "Solitude - psychological & practical guide.pdf",
  "adhd": "ADHD - psychological & practical guide.pdf",
  "autism": "Autistic spectrum disorders - psychological & practical guide.pdf",
  "eating-disorders": "Eating disorders - psychological & practical guide.pdf",
  "sleep": "Sleep disorders - psychological & practical guide.pdf",
  "procrastination-creativity": "Procrastination and creativity - psychological & practical guide.pdf",
  "giftedness": "High potentials - psychological & practical guide.pdf",
}

function isPackSlug(raw: string) {
  const s = decodeURIComponent(raw || "").toLowerCase()
  return s.includes("pack") || s.includes("bundle") || s.includes("full-pack") || s.includes("integral")
}
function contentDisposition(name: string) {
  const ascii = name.replace(/[^\x20-\x7E]/g, "_")
  const utf8 = encodeURIComponent(name).replace(/['()]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`).replace(/\*/g, "%2A")
  return `attachment; filename="${ascii}"; filename*=UTF-8''${utf8}`
}
async function streamFile(p: string, name: string, type: string) {
  const st = await fsp.stat(p)
  const s = fs.createReadStream(p)
  const h = new Headers()
  h.set("Content-Type", type)
  h.set("Content-Length", String(st.size))
  h.set("Accept-Ranges", "bytes")
  h.set("Cache-Control", "no-store, private")
  h.set("Content-Disposition", contentDisposition(name))
  return new Response(s as unknown as ReadableStream, { status: 200, headers: h })
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const rawSlug = url.searchParams.get("slug") || ""
    const sessionId = url.searchParams.get("session_id") || ""
    const diag = url.searchParams.get("diag") === "1"
    if (!rawSlug) return NextResponse.json({ error: "bad_request" }, { status: 400 })

    const pack = isPackSlug(rawSlug)

    // BYPASS test: /api/download?slug=full-pack&diag=1
    if (diag && pack) {
      const p = path.join(process.cwd(), "public", PACK_FILE)
      return streamFile(p, PACK_FILE, "application/octet-stream")
    }

    if (!sessionId) return NextResponse.json({ error: "missing_session_id" }, { status: 400 })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    const s = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items.data.price.product"] })
    if (!s || s.payment_status !== "paid") {
      return NextResponse.json({ error: "stripe_session_invalid", detail: s?.payment_status ?? null }, { status: 403 })
    }

    // Autorisation: pack autorisé si session payée
    let authorized = pack
    if (!authorized) {
      authorized = (s.line_items?.data ?? []).some(li => {
        const pr = li.price?.product
        const prod = typeof pr === "string" ? undefined : (pr as Stripe.Product | undefined)
        const meta = (prod?.metadata?.slug || "").toString().trim().toLowerCase()
        return meta === rawSlug.toLowerCase()
      })
    }
    if (!authorized) return NextResponse.json({ error: "item_not_in_session", requested: rawSlug }, { status: 403 })

    if (pack) {
      const p = path.join(process.cwd(), "public", PACK_FILE)
      return streamFile(p, PACK_FILE, "application/octet-stream")
    }

    const fname = files[rawSlug]
    if (!fname) return NextResponse.json({ error: "file_not_mapped", requested: rawSlug }, { status: 404 })
    const fp = path.join(process.cwd(), "public", fname)
    return streamFile(fp, fname, "application/pdf")
  } catch (e) {
    const msg = e instanceof Error ? e.message : "download_error"
    return NextResponse.json({ error: "download_error", detail: msg }, { status: 500 })
  }
}
