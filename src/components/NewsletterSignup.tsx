"use client"

import { useState } from "react"

interface NewsletterSignupProps {
  variant?: "full" | "minimal"
}

export default function NewsletterSignup({ variant = "full" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setEmail("")
      } else {
        setErrorMsg(data.error || "Something went wrong.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Network error. Please try again.")
      setStatus("error")
    }
  }

  if (variant === "minimal") {
    return (
      <div className="w-full">
        {status === "success" ? (
          <p className="text-xs font-sans text-blue-600 font-medium">You&apos;re in. See you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 min-w-0 text-sm px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-bold font-sans hover:bg-blue-600 transition-all disabled:opacity-60"
            >
              {status === "loading" ? "…" : "OK"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500 mt-1 font-sans">{errorMsg}</p>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-3 font-sans">
        Library Updates
      </p>
      <h2 className="text-3xl md:text-4xl font-serif italic text-slate-900 mb-3">
        Stay in the loop.
      </h2>
      <p className="text-slate-500 italic font-sans text-sm md:text-base mb-8 leading-relaxed">
        A quiet note whenever a new reflection is published. No noise, no algorithm.
      </p>
      {status === "success" ? (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <p className="text-slate-700 font-serif italic text-lg">
            You&apos;re in. Check your inbox for a welcome note.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className="flex-1 text-sm px-5 py-3 rounded-full border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm font-sans"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-7 py-3 rounded-full bg-slate-900 text-white text-sm font-bold font-sans hover:bg-blue-600 transition-all shadow-sm disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe →"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3 font-sans">{errorMsg}</p>
      )}
    </div>
  )
}
