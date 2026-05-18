"use client"

import { useEffect, useState } from "react"
import NewsletterSignup from "./NewsletterSignup"

const LS_KEY = "tp_newsletter"

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY)
    if (stored === "subscribed") return

    if (stored) {
      try {
        const { until } = JSON.parse(stored)
        if (Date.now() < until) return
      } catch {
        // corrupted entry — ignore and show
      }
    }

    const timer = setTimeout(() => setVisible(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  function handleSubscribed() {
    localStorage.setItem(LS_KEY, "subscribed")
    setSubscribed(true)
    setTimeout(() => setVisible(false), 2500)
  }

  function handleDismiss() {
    const until = Date.now() + 7 * 24 * 60 * 60 * 1000
    localStorage.setItem(LS_KEY, JSON.stringify({ until }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
      onClick={subscribed ? undefined : handleDismiss}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!subscribed && (
          <button
            onClick={handleDismiss}
            aria-label="Close"
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            ×
          </button>
        )}
        <NewsletterSignup variant="full" onSuccess={handleSubscribed} />
      </div>
    </div>
  )
}
