"use client"
import { useState, useEffect } from "react"

interface BuyButtonProps {
  slug: string
  priceEUR: string
  priceUSD: string
}

export default function BuyButton({ slug, priceEUR, priceUSD }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState({ code: 'EUR', label: priceEUR })

  useEffect(() => {
    const isEuroZone = Intl.DateTimeFormat().resolvedOptions().timeZone.includes('Europe')
    if (!isEuroZone) {
      setCurrency({ code: 'USD', label: priceUSD })
    }
  }, [priceEUR, priceUSD])

  // Le guide d'introduction est gratuit
  const isFree = slug === "introduction-aux-guides"

  async function go() {
    if (isFree) {
      // Ouvre le PDF stocké dans /public/
      window.open("/introduction-guides.pdf", "_blank")
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/checkout/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, currency: currency.code }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) {
      console.error("Checkout error")
    } finally {
      setLoading(false)
    }
  }

  const labelText = loading ? "Redirecting…" : isFree ? "Access for free" : `Buy now — ${currency.label}`

  return (
    <button
      type="button"
      onClick={go}
      disabled={loading}
      className="relative overflow-hidden group rounded-md bg-accent px-6 py-3 text-white text-base font-medium transition transform-gpu hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <span className="relative z-10 font-bold uppercase tracking-tight">{labelText}</span>
    </button>
  )
}