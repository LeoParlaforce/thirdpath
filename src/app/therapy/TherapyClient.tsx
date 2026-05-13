"use client"

import Link from "next/link"
import { useState } from "react"

export default function TherapyClient() {
  const [loading, setLoading] = useState<"reduced" | "full" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (tier: "reduced" | "full") => {
    setLoading(tier)
    setError(null)
    try {
      const res = await fetch("/api/checkout/signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, segment: "therapy" }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || "An error occurred. Please try again.")
        setLoading(null)
      }
    } catch {
      setError("Network error. Please try again.")
      setLoading(null)
    }
  }

  const faqs = [
    {
      q: "How does it work in practice?",
      a: "After subscribing, you receive my Signal contact by email. Signal is a free encrypted messaging app — you install it on your phone (and computer if you like). You write me a private message whenever you want, as much as you want. I respond within 24 hours. The conversation continues day after day, building over time. That's really all there is to it.",
    },
    {
      q: "Why text and not video?",
      a: "You write when something comes to you — not when a calendar slot tells you to. After a dream, after a difficult call, when something surfaces. This continuous availability is a clinical condition that the weekly session, by design, cannot offer.",
    },
    {
      q: "Is this really therapy?",
      a: "Yes. I am a state-licensed clinical psychologist, trained in psychoanalysis. This is not coaching, not wellness, not moral support. It is therapy — with its framework, rigor, and ethics — adapted to the chat format.",
    },
    {
      q: "Is there AI in the loop?",
      a: "None. You are writing with a human — me. No algorithm, no automated response, no script. A real presence at the other end.",
    },
    {
      q: "Why two prices for the same service?",
      a: "The service is strictly identical. The reduced rate (80€) is for students and those on a tight budget. The full rate (150€) is the standard. Choose what fits your situation — no justification required.",
    },
    {
      q: "What if I want to stop?",
      a: "You cancel in one click from the Stripe receipt email. No commitment, no minimum duration.",
    },
  ]

  return (
    <main className="font-serif text-slate-900 bg-transparent">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-20 md:pt-16">
        <Link
          href="/app"
          className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold mb-8 hover:gap-2 gap-1 transition-all"
        >
          <span>←</span> Back
        </Link>

        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest">
            <span className="text-blue-500">✦</span> Therapy · Individual messaging
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter leading-none mb-8 max-w-4xl">
          Therapy that fits{" "}
          <span className="text-blue-600">into your daily life.</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 italic font-light leading-relaxed max-w-2xl mb-6">
          Write when something comes up. In the morning, in the evening, after a difficult call, before a decision. Not only on Tuesdays at 6pm.
        </p>

        <p className="text-base text-slate-500 italic font-sans">
          Private individual messaging · 100% human · Cancel anytime
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          How it works
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-12 max-w-2xl leading-tight">
          Simple. Very simple.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">1.</div>
            <h3 className="text-xl font-bold italic text-slate-900">You write.</h3>
            <p className="text-slate-600 italic text-sm leading-relaxed">
              A private message to me, directly on Signal. Whenever you want, as much as you want — morning, evening, after a difficult call, in the middle of the night. No appointment, no scheduling.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">2.</div>
            <h3 className="text-xl font-bold italic text-slate-900">I respond.</h3>
            <p className="text-slate-600 italic text-sm leading-relaxed">
              Always within 24 hours. Always in writing, always me — no AI, no assistant, no script. A real clinical response to what you brought.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">3.</div>
            <h3 className="text-xl font-bold italic text-slate-900">We keep going.</h3>
            <p className="text-slate-600 italic text-sm leading-relaxed">
              The conversation continues. Day after day, message after message. A thread that builds over time — not an isolated session that resets every week.
            </p>
          </div>
        </div>
      </section>

      {/* THE DIFFERENCE */}
      <section className="border-y border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-10">
            The difference
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">5×/week</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Originally</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                Effective therapy once required five to six sessions per week. That wasn't a luxury — it was the clinical condition of the work.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">1×/week</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">What became of it</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                One session per week. A format dictated by economics, not by clinical need. The rest of the time, you're alone with what you're going through.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">∞</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Here</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                You write when something crosses your mind. This isn't less than classical therapy — it's closer to what it should be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE CAN TALK ABOUT */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          What we can talk about
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-12 max-w-3xl leading-tight">
          Everything, really.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { t: "Anxiety and distress", d: "Rumination, panic attacks, fear of the future, the feeling of being overwhelmed." },
            { t: "Relationships", d: "Couples, family, friendship, conflict, loneliness, difficulty loving or being loved." },
            { t: "Sexuality", d: "Desire, lack, shame, confusion. Everything that touches intimate life and can be hard to put into words, even to yourself." },
            { t: "Work and meaning", d: "Burnout, loss of motivation, impostor syndrome, career choices." },
            { t: "Loss and grief", d: "The death of a loved one, a breakup, a job loss, a health change." },
            { t: "Dreams", d: "A recurring dream, a disturbing image, something sleep left behind. Dreams are not trivial." },
            { t: "Identity and self-relationship", d: "Who I am, what I really want, what holds me back, what I can't bring myself to say." },
            { t: "What seems unimportant", d: "A detail that struck you, a reaction that surprised you, a banality that keeps coming back. That's often where the key to the rest lies." },
          ].map((item, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-white/70 backdrop-blur-sm">
              <h3 className="text-lg font-bold italic text-slate-900 mb-2">{item.t}</h3>
              <p className="text-slate-600 italic text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="border-t border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4 text-center">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-6 text-center">
            Two prices. Same service.
          </h2>
          <p className="text-slate-500 italic mb-12 text-center max-w-xl mx-auto leading-relaxed">
            The reduced rate exists for students and those on a tight budget. The full rate is the standard. Your choice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border border-slate-200 rounded-3xl p-8 md:p-10 bg-white/80 space-y-6">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">
                Reduced rate
              </div>
              <div>
                <div className="text-6xl font-bold italic tracking-tighter text-slate-900">80€</div>
                <div className="text-slate-400 font-sans text-sm uppercase tracking-widest mt-1">/ month</div>
              </div>
              <p className="text-slate-500 italic text-sm leading-relaxed">
                For students and those on a tight budget.
              </p>
              <button
                onClick={() => handleSubscribe("reduced")}
                disabled={loading !== null}
                className="w-full py-4 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 rounded-full font-bold text-sm font-sans transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "reduced" ? "Opening…" : "Subscribe →"}
              </button>
            </div>

            <div className="border-2 border-slate-900 rounded-3xl p-8 md:p-10 bg-white/80 space-y-6">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
                Full rate
              </div>
              <div>
                <div className="text-6xl font-bold italic tracking-tighter text-slate-900">150€</div>
                <div className="text-slate-400 font-sans text-sm uppercase tracking-widest mt-1">/ month</div>
              </div>
              <p className="text-slate-500 italic text-sm leading-relaxed">
                The standard rate.
              </p>
              <button
                onClick={() => handleSubscribe("full")}
                disabled={loading !== null}
                className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-full font-bold text-sm font-sans transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "full" ? "Opening…" : "Subscribe →"}
              </button>
            </div>

          </div>

          {error && (
            <p className="text-red-500 text-sm text-center italic mt-6">{error}</p>
          )}

          <p className="text-slate-400 text-xs font-sans uppercase tracking-widest text-center mt-8">
            Cancel anytime · Private messaging · 100% human — no AI
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          Frequently asked questions
        </p>
        <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter mb-10">
          Before you start.
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold italic text-slate-800 hover:text-blue-600 transition-colors">
                <span className="pr-4">{f.q}</span>
                <span className="text-blue-400 group-open:rotate-180 transition-transform shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 italic text-sm leading-relaxed border-t border-slate-100 pt-4">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

    </main>
  )
}
