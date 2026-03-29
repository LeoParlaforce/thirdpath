"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/app/boutique/data"

// FIX : suppression complète de tout le code groupes/tracks/Zoom/Jitsi/Calendar
// (TrackId, TRACK_GCAL, gcalUrl, sending, welcomeEmail, PortalButton, etc.)
// Ce code est mort depuis l'arrêt des groupes thérapeutiques.
// Il reste uniquement : vérification paiement → téléchargement PDF → suggestions upsell.

export default function SuccessClient() {
  const sp = useSearchParams()
  const sid = sp.get("session_id") || sp.get("id")

  const [slug, setSlug] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!sid) {
      setLoading(false)
      setError(true)
      return
    }
    // FIX : appel unifié vers /api/checkout (suppression du doublon /api/checkout/success)
    fetch(`/api/checkout?id=${encodeURIComponent(sid)}`, { cache: "no-store" })
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(data => {
        setSlug(data.slug ?? null)
        setEmail(data.email ?? null)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [sid])

  async function handleDownload() {
    if (!slug || !sid) return
    const url = `/api/download?session_id=${encodeURIComponent(sid)}&slug=${encodeURIComponent(slug)}`
    const link = document.createElement("a")
    link.href = url
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  // Suggestions upsell : autres guides sauf celui acheté
  const suggestions = products
    .filter(p => p.slug !== slug && p.slug !== "introduction-aux-guides")
    .slice(0, 3)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 font-serif">

      {/* ÉTAT : CHARGEMENT */}
      {loading && (
        <div className="text-center py-20">
          <p className="text-slate-400 italic animate-pulse">Verifying your session…</p>
        </div>
      )}

      {/* ÉTAT : ERREUR */}
      {!loading && (error || !slug) && (
        <div className="text-center py-20 space-y-6">
          <h1 className="text-3xl font-bold italic">Something went wrong.</h1>
          <p className="text-slate-500 italic">
            If you were charged, contact us and we will resolve it immediately.
          </p>
          <a
            href="mailto:leo.gayrard@gmail.com?subject=Download issue — Third Path&body=My session ID is: "
            className="inline-block px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-600 transition"
          >
            Contact Support →
          </a>
        </div>
      )}

      {/* ÉTAT : SUCCÈS */}
      {!loading && !error && slug && (
        <div className="space-y-12">

          {/* CONFIRMATION */}
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold italic tracking-tight">
              Payment confirmed.
            </h1>
            {email && (
              <p className="text-slate-500 italic text-sm">
                Confirmation sent to <span className="text-slate-700 font-medium">{email}</span>
              </p>
            )}
          </div>

          {/* DOWNLOAD */}
          <div className="border border-slate-200 rounded-2xl p-8 bg-white/80 backdrop-blur-sm text-center space-y-4">
            <p className="text-slate-600 italic leading-relaxed">
              Your guide is ready. Download it now — the secure link is valid for 1 hour.
            </p>
            <button
              onClick={handleDownload}
              className="inline-block px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition hover:-translate-y-0.5 transform-gpu shadow-sm"
            >
              Download PDF →
            </button>
            <p className="text-slate-400 text-xs italic">
              Check your spam folder if you don't receive the confirmation email.
            </p>
          </div>

          {/* UPSELL : app chat */}
          <div className="border border-blue-200 rounded-2xl p-8 bg-blue-50/50 text-center space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Go further</p>
            <h2 className="text-2xl font-bold italic text-slate-900">
              Want to work through this with a real psychologist?
            </h2>
            <p className="text-slate-500 italic text-sm max-w-md mx-auto">
              Direct 1:1 access via the Third Path app. Human, encrypted, no AI.
            </p>
            <a
              href="https://chat.troisiemechemin.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-slate-900 transition"
            >
              Open the App →
            </a>
          </div>

          {/* UPSELL : autres guides */}
          {suggestions.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold italic text-slate-900 text-center">
                You might also like
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {suggestions.map(p => (
                  <Link
                    key={p.slug}
                    href={`/boutique/${p.slug}`}
                    className="group block border border-slate-200 rounded-xl overflow-hidden bg-white/80 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div className="relative aspect-3/4 w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold italic text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                        {p.title}
                      </h3>
                      <p className="text-blue-600 text-xs font-bold mt-1">{p.priceEUR}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="text-center pt-4">
            <Link
              href="/boutique"
              className="text-slate-400 hover:text-blue-600 text-sm italic transition underline underline-offset-4"
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
