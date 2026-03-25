"use client"
import { useState, useEffect } from "react"

function svgCursor(emoji: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='24' font-size='24'>${emoji}</text></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 0 0, auto`
}

export default function BuyButton({
  slug,
  priceEUR,
  priceUSD,
  image,
}: { 
  slug: string; 
  priceEUR: string; 
  priceUSD: string;
  image: string;
}) {
  const [loading, setLoading] = useState(false)
  const [hover, setHover] = useState(false)
  const [displayPrice, setDisplayPrice] = useState<string>("")
  const [activeCurrency, setActiveCurrency] = useState<string>("EUR")

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const isUSZone = timeZone.includes("America") || timeZone.includes("US") || timeZone.includes("Canada")
    
    if (slug === "introduction-aux-guides") {
      setDisplayPrice("Free")
    } else {
      if (isUSZone) {
        setDisplayPrice(priceUSD)
        setActiveCurrency("USD")
      } else {
        setDisplayPrice(priceEUR)
        setActiveCurrency("EUR")
      }
    }
  }, [priceEUR, priceUSD, slug])

  const isFree = slug === "introduction-aux-guides"
  const cursor = loading ? svgCursor("⏳") : hover ? svgCursor("✨") : svgCursor("🪄")

  async function go() {
    if (isFree) {
      window.open("/introduction-guides.pdf", "_blank")
      return
    }

    try {
      setLoading(true)
      const r = await fetch("/api/checkout/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          slug, 
          image, 
          currency: activeCurrency // On envoie "EUR" ou "USD" à l'API
        }),
      })
      
      const data = await r.json()
      if (r.ok && data.url) { 
        window.location.href = data.url
        return 
      }
      alert("An error occurred during checkout access.")
    } catch (e) {
      alert("Purchase unavailable at the moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 items-start">
      {displayPrice && (
        <span className="text-2xl font-light text-purple-600 italic">
          {displayPrice}
        </span>
      )}
      <button
        type="button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={go}
        disabled={loading}
        style={{ cursor }}
        className={`rounded-md px-8 py-3 text-base font-bold uppercase tracking-tight bg-purple-600 text-white transition transform-gpu hover:-translate-y-1 hover:shadow-lg active:scale-95 ${loading ? "opacity-70" : ""}`}
      >
        {loading ? "Redirecting…" : isFree ? "Free Access" : "Order Now"}
      </button>
    </div>
  )
}