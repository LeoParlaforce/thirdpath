import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Therapists — Third Path | Daily Therapy Tool & Supervision",
  description: "Third Path gives therapists a daily channel to their patients, a supervision line with a licensed psychologist, and a way to find new clients. 50€/month.",
  alternates: { canonical: "https://thirdpath.cloud/for-therapists" },
  openGraph: {
    title: "For Therapists — Third Path",
    description: "Daily therapy continuity, clinical supervision, and patient acquisition. One tool, one subscription.",
    url: "https://thirdpath.cloud/for-therapists",
    type: "website",
    images: [{ url: "https://thirdpath.cloud/og-image.jpg", width: 1200, height: 630 }],
  },
}

const problems = [
  {
    stat: "1×/week",
    label: "The standard of care",
    detail: "One session per week is what most patients can afford. But historically, effective therapy required daily contact. The gap between clinical need and economic reality has never been wider."
  },
  {
    stat: "68%",
    label: "Drop-off rate",
    detail: "Most patients stop therapy within the first 8 sessions — not because they're healed, but because weekly gaps erode momentum, trust, and motivation."
  },
  {
    stat: "0",
    label: "Infrastructure for in-between",
    detail: "There is no standard clinical tool for the space between sessions. Email is unprofessional. WhatsApp is unsecured. The therapeutic relationship goes dark for 6 days out of 7."
  },
]

const useCases = [
  {
    number: "01",
    title: "Daily therapeutic continuity",
    description: "Your patients don't disappear between sessions. Third Path gives them a structured, encrypted space to process, reflect, and stay connected to the work — every day. You maintain clinical presence without multiplying appointments.",
    tag: "For all practitioners"
  },
  {
    number: "02",
    title: "Supervised clinical practice",
    description: "Direct supervision with Leo Gayrard, licensed psychologist. Discuss complex cases, sharpen your theoretical framework, and develop your clinical identity — through the same app, asynchronously or in real time.",
    tag: "For licensed & trainee therapists"
  },
  {
    number: "03",
    title: "Patient acquisition",
    description: "Patients seeking therapy discover practitioners through the Third Path network. Your profile becomes a clinical introduction — your approach, your specializations, your availability. A referral channel that works while you work.",
    tag: "For private practice"
  },
]

const profiles = [
  {
    title: "Private practice therapist",
    pain: "Full calendar, but patients drop out. No tool to maintain continuity between sessions.",
    gain: "Daily patient contact. Lower dropout. Stronger therapeutic alliance."
  },
  {
    title: "Therapist in training",
    pain: "Need regular supervision. University frameworks are rigid, expensive, or inaccessible.",
    gain: "Direct supervision from a licensed psychologist. Flexible, affordable, clinical."
  },
  {
    title: "Modern practice builder",
    pain: "Want to integrate digital tools without losing clinical depth or professional standards.",
    gain: "A clinically grounded platform — not a wellness app, not a chatbot. Real therapy infrastructure."
  },
  {
    title: "Psychology student",
    pain: "Preparing for practice. No access to supervision or real clinical frameworks yet.",
    gain: "Start building your clinical identity now. Supervision before your first patient."
  },
]

const faqs = [
  {
    q: "Is this a replacement for in-person sessions?",
    a: "No — and this distinction matters clinically. Third Path is a continuity tool. It extends the therapeutic relationship into the daily life of the patient, between sessions. In-person or video sessions remain the core of the work."
  },
  {
    q: "Is the platform clinically secure?",
    a: "All exchanges are encrypted. The platform is designed for clinical use — not a consumer chat app. No data is sold or shared."
  },
  {
    q: "What does supervision look like in practice?",
    a: "Supervision with Leo Gayrard happens through the app — asynchronous written exchanges or scheduled real-time sessions. You present cases, discuss theoretical frameworks, and receive structured clinical feedback."
  },
  {
    q: "Can I use this alongside my existing practice management tools?",
    a: "Yes. Third Path handles the therapeutic relationship channel and supervision. It does not replace your scheduling or billing tools — it complements them."
  },
  {
    q: "Is 50€/month the same for therapists and patients?",
    a: "Yes. The subscription is identical. For a therapist, it covers the patient channel, supervision access, and network visibility. For a patient, it covers direct therapeutic access."
  },
]

export default function ForTherapists() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://thirdpath.cloud/for-therapists",
        "name": "For Therapists — Third Path",
        "url": "https://thirdpath.cloud/for-therapists",
        "description": "Third Path gives therapists a daily channel to their patients, clinical supervision, and patient acquisition.",
        "publisher": { "@id": "https://thirdpath.cloud/#organization" },
        "author": { "@id": "https://thirdpath.cloud/#author" }
      },
      {
        "@type": "Service",
        "@id": "https://thirdpath.cloud/#therapist-service",
        "name": "Third Path — Therapist Subscription",
        "provider": { "@id": "https://thirdpath.cloud/#organization" },
        "description": "Daily therapeutic continuity tool, clinical supervision, and patient acquisition for therapists.",
        "serviceType": "Clinical Supervision & Therapy Infrastructure",
        "areaServed": "Worldwide",
        "offers": {
          "@type": "Offer",
          "price": "50",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "billingIncrement": "P1M",
          "description": "Monthly subscription. Cancel anytime."
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  }

  return (
    <main className="font-serif text-slate-900 bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest">
            <span className="text-blue-500">✦</span> For Therapists & Supervisees
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter leading-none mb-8 max-w-4xl">
          Your patients need you{" "}
          <span className="text-blue-600">every day.</span>{" "}
          Not once a week.
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 italic font-light leading-relaxed max-w-2xl mb-12">
          Historically, effective therapy meant daily contact. The economic reality of modern practice has made that impossible — until now.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition hover:-translate-y-0.5 transform-gpu shadow-sm"
          >
            Start for 50€/month →
          </a>
          <a
            href="mailto:leo.gayrard@gmail.com?subject=Third Path — Therapist inquiry"
            className="inline-flex items-center justify-center px-10 py-4 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans hover:border-blue-400 hover:text-blue-600 transition italic"
          >
            Ask a question first
          </a>
        </div>

        <p className="mt-4 text-slate-400 text-xs font-sans uppercase tracking-widest">
          Cancel anytime · Encrypted · 100% human — no AI
        </p>
      </section>

      {/* ── PROBLEM ── */}
      <section className="border-y border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-10">
            The clinical reality
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {problems.map((p, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">{p.stat}</div>
                <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">{p.label}</div>
                <p className="text-slate-600 italic text-sm leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          What Third Path gives you
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-16 max-w-2xl leading-tight">
          Three tools. One subscription.
        </h2>

        <div className="space-y-6">
          {useCases.map((u, i) => (
            <div
              key={i}
              className="group border border-slate-200 rounded-2xl p-8 md:p-10 bg-white/70 backdrop-blur-sm hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="shrink-0">
                  <span className="text-5xl font-bold italic text-slate-200 group-hover:text-blue-100 transition-colors">
                    {u.number}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="text-2xl font-bold italic text-slate-900">{u.title}</h3>
                    <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full w-fit">
                      {u.tag}
                    </span>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">{u.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROFILES ── */}
      <section className="border-y border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
            Who is this for
          </p>
          <h2 className="text-4xl font-bold italic tracking-tighter mb-12">
            Recognise yourself.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((p, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-8 bg-white/80 space-y-4">
                <h3 className="text-xl font-bold italic text-slate-900">{p.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-300 font-bold text-lg mt-0.5 shrink-0">—</span>
                    <p className="text-slate-500 italic text-sm leading-relaxed">{p.pain}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-lg mt-0.5 shrink-0">→</span>
                    <p className="text-slate-700 italic text-sm leading-relaxed font-medium">{p.gain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          Pricing
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-6">
          One price. Everything included.
        </h2>
        <p className="text-slate-500 italic mb-12 text-lg leading-relaxed">
          The same subscription gives you the patient channel, supervision access, and network visibility. No tiers, no hidden fees.
        </p>

        <div className="border-2 border-slate-900 rounded-3xl p-10 md:p-14 bg-white/80 space-y-8">
          <div>
            <div className="text-7xl font-bold italic tracking-tighter text-slate-900">50€</div>
            <div className="text-slate-400 font-sans text-sm uppercase tracking-widest mt-2">per month · cancel anytime</div>
          </div>

          <ul className="space-y-3 text-left max-w-sm mx-auto">
            {[
              "Daily patient channel (encrypted)",
              "Clinical supervision with Leo Gayrard",
              "Patient acquisition via the network",
              "No AI — 100% human exchanges",
              "Cancel anytime, no commitment",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 italic text-sm">
                <span className="text-blue-500 font-bold shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition text-center"
          >
            Open the App →
          </a>

          <p className="text-slate-400 text-xs font-sans italic">
            Questions before subscribing?{" "}
            <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:underline">
              Email Leo directly
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
            Common questions
          </p>
          <h2 className="text-3xl font-bold italic tracking-tighter mb-10">
            Before you decide.
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
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold italic tracking-tighter mb-6 leading-tight">
          Your patients need more than{" "}
          <span className="text-blue-600">one hour a week.</span>
        </h2>
        <p className="text-slate-500 italic text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Third Path is the infrastructure for daily therapeutic work. Built by a psychologist, for psychologists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition hover:-translate-y-0.5 transform-gpu shadow-sm"
          >
            Start for 50€/month →
          </a>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-10 py-4 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans hover:border-blue-400 hover:text-blue-600 transition italic"
          >
            Read the research first
          </Link>
        </div>
      </section>
    </main>
  )
}
