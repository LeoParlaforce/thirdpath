"use client"
import { useState } from "react"

export type TrackId = `${"t1" | "t2"}-${"fr" | "en"}`

export default function SubscribeButton({
  track,
  label = "Join (every 2 weeks)",
}: { track: TrackId; label?: string }) {
  const [loading, setLoading] = useState(false)

  async function go() {
    try {
      setLoading(true)
      const r = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track }),
      })

      const ct = r.headers.get("content-type") || ""
      let data: any = null
      if (ct.includes("application/json")) {
        try { data = await r.json() } catch { /* ignore */ }
      } else {
        const raw = await r.text()
        throw new Error(`Non-JSON response (${r.status}): ${raw.slice(0,120)}`)
      }

      if (!r.ok || !data?.url) {
        throw new Error(data?.error || `Bad response (${r.status})`)
      }

      window.location.href = data.url
    } catch (e: any) {
      alert(e?.message || "Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={go}
      disabled={loading}
      className={[
        "px-4 py-2 rounded bg-purple-600 text-white",
        "cursor-pointer hover:bg-purple-700 active:scale-[0.98]",
        loading ? "opacity-70 cursor-wait" : "",
        "transition-transform duration-100",
      ].join(" ")}
    >
      {loading ? "Redirecting…" : label}
    </button>
  )
}
