"use client"
import { useState } from "react"

function svgCursor(emoji: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='24' font-size='24'>${emoji}</text></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 0 0, auto`
}

export default function BuyButton({ slug, label }: { slug: string; label: string }) {
  const [loading, setLoading] = useState(false)
  const [hover, setHover] = useState(false)
  const cursor = loading ? svgCursor("⏳") : hover ? svgCursor("✨") : svgCursor("🪄")

  async function go() {
    try {
      setLoading(true)

      // 1) membre
      const m = await fetch("/api/checkout/ebook-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
      if (m.ok) {
        const { url } = (await m.json()) as { url?: string }
        if (url) { window.location.href = url; return }
      }

      // 2) public
      const r = await fetch("/api/checkout/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
      const { url } = (await r.json()) as { url?: string }
      if (r.ok && url) { window.location.href = url; return }

      alert("Purchase unavailable right now.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={go}
      disabled={loading}
      style={{ cursor }}
      className={[
        "relative overflow-hidden group rounded-md bg-accent px-6 py-3 text-white text-base font-medium",
        "transition transform-gpu hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        loading ? "opacity-70 cursor-wait" : "",
      ].join(" ")}
      title={loading ? "Redirecting…" : label}
    >
      <span className="relative z-10">{loading ? "Redirecting…" : label}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "6px 6px",
          backgroundRepeat: "repeat",
        }}
      />
    </button>
  )
}
