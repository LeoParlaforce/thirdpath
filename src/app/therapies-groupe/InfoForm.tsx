// app/therapies-groupe/InfoForm.tsx
"use client"

import { useEffect, useState } from "react"
import type { TrackId } from "./SubscribeButton"

type PublicKey = "anxiety" | "relationships"

function publicToInternal(pk: PublicKey): TrackId {
  return pk === "anxiety" ? "t1-en" : "t2-en"
}
function toBackend(id: TrackId): TrackId {
  return (id.endsWith("-en") ? (id.replace("-en", "-fr") as TrackId) : id)
}

export default function InfoForm() {
  const [publicKey, setPublicKey] = useState<PublicKey | "">("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const m = window.location.hash.match(/inscription-(anxiety|relationships)/i)
    if (m?.[1]) setPublicKey(m[1].toLowerCase() as PublicKey)
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true); setError(null); setDone(false)
    try {
      const form = e.currentTarget
      const pk = ((form.elements.namedItem("track") as HTMLSelectElement)?.value || publicKey) as PublicKey
      const internal = publicToInternal(pk)
      const body = {
        name: (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
        email: (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
        track: toBackend(internal),
        message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "",
      }
      const res = await fetch("/api/tracks/info", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      setDone(true); form.reset(); setPublicKey("")
    } catch { setError("Submission failed. Please try again.") }
    finally { setSubmitting(false) }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Your name</label>
        <input id="name" name="name" type="text" required className="w-full rounded-md border px-3 py-2" placeholder="Jane Doe" />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email address</label>
        <input id="email" name="email" type="email" required className="w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
      </div>

      <div className="grid gap-2">
        <label htmlFor="track" className="text-sm font-medium">Group</label>
        <select id="track" name="track" className="w-full rounded-md border px-3 py-2" value={publicKey} onChange={e => setPublicKey(e.target.value as PublicKey)} required>
          <option value="" disabled>Select a group</option>
          <option value="anxiety">Theme 1 — Anxiety & regulation</option>
          <option value="relationships">Theme 2 — Relationships & self-esteem</option>
        </select>
        <p className="text-xs opacity-70">Sessions are every 2 weeks. See schedule above.</p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Message (optional)</label>
        <textarea id="message" name="message" rows={5} className="w-full rounded-md border px-3 py-2" placeholder="Tell me what you need or any constraints." />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={submitting} className="rounded-md bg-accent px-5 py-2 text-white text-sm font-medium transition disabled:opacity-60">
          {submitting ? "Sending…" : "Send request"}
        </button>
        {done && <span className="text-sm text-green-700">Sent. I will email you back shortly.</span>}
        {error && <span className="text-sm text-red-700">{error}</span>}
      </div>
    </form>
  )
}
