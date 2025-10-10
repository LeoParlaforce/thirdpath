import { NextResponse } from "next/server"
import Stripe from "stripe"
import fs from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"

const PACK_SLUG = "pack-integral"
// Nom de l’archive dans /private (tu peux le changer via env)
const PACK_ARCHIVE = process.env.PACK_ARCHIVE_FILENAME || "Psychological Guides — Full Pack.rar"

const files: Record<string, string> = {
  "introduction-aux-guides": "Introduction to the psychological guides.pdf",
  "estime-de-soi": "Self-esteem - psychological & practical guide.pdf",
  "depression": "Depression - psychological & practical guide.pdf",
  "anxiete": "Anxiety - psychological & practical guide.pdf",
  "relations-amoureuses": "Romantical relationships - psychological & practical guide.pdf",
  "solitude": "Solitude - psychological & practical guide.pdf",
  "tdah": "ADHD - psychological & practical guide.pdf",
  "tsa": "Autistic spectrum disorders - psychological & practical guide.pdf",
  "tca": "Eating disorders - psychological & practical guide.pdf",
  "sommeil": "Sleep disorders - psychological & practical guide.pdf",
  "procrastination-creativite": "Procrastination and creativity - psychological & practical guide.pdf",
  "hauts-potentiels": "High potentials - psychological & practical guide.pdf",
}

function mimeForArchive(filename: string): string {
  const lower = filename.toLowerCase()
  if (lower.endsWith(".zip")) return "application/zip"
  if (lower.endsWith(".rar")) return "application/x-rar-compressed"
  return "application/octet-stream"
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const sessionId = url.searchParams.get("session_id") || ""
    const slug = url.searchParams.get("slug") || ""
    if (!sessionId || !slug) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const full = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    })
    if (full.payment_status !== "paid") {
      return NextResponse.json({ error: "unpaid" }, { status: 403 })
    }

    const ok = (full.line_items?.data ?? []).some((li) => {
      const product = li.price?.product
      const prod = typeof product === "string" ? undefined : (product as Stripe.Product | undefined)
      return prod?.metadata?.slug === slug
    })
    if (!ok) return NextResponse.json({ error: "item_not_in_session" }, { status: 403 })

    // Pack -> sert l’archive (.rar ou .zip)
    if (slug === PACK_SLUG) {
      const archPath = path.join(process.cwd(), "private", PACK_ARCHIVE)
      const buf = await fs.readFile(archPath)
      return new Response(new Uint8Array(buf), {
        status: 200,
        headers: {
          "Content-Type": mimeForArchive(PACK_ARCHIVE),
          "Content-Disposition": `attachment; filename="${PACK_ARCHIVE}"`,
          "Cache-Control": "no-store",
        },
      })
    }

    // Guide unitaire -> PDF
    const fname = files[slug]
    if (!fname) return NextResponse.json({ error: "file_not_mapped" }, { status: 404 })

    const filePath = path.join(process.cwd(), "private", fname)
    const pdf = await fs.readFile(filePath)

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fname}"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "download_error"
    return NextResponse.json({ error: "download_error", detail: msg }, { status: 500 })
  }
}
