import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Third Path — Human-Centered Psychology | Clinical Guides",
  description: "Practical, research-backed psychological guidance for personal growth, well-being, and understanding human behavior. 100% human-authored content.",
  openGraph: {
    title: "Third Path — Human-Centered Psychology",
    description: "Explore research-backed psychology guides and clinical protocols.",
    url: "https://thirdpath.cloud",
    siteName: "Third Path",
    images: [{ url: "https://thirdpath.cloud/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Third Path — Psychology",
    description: "Research-backed psychology guides for human growth.",
    images: ["https://thirdpath.cloud/og-home.jpg"],
  },
}

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 flex flex-col gap-12 min-h-screen font-serif w-full bg-transparent">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Third Path",
            "url": "https://thirdpath.cloud",
            "description": "Practical, research-backed psychological guidance.",
            "publisher": { "@id": "https://thirdpath.cloud/#organization" }
          })
        }}
      />

      {/* HERO */}
      <section className="text-center mt-8">
        <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight text-slate-900">
          Third Path — Psychology
        </h1>
        <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans opacity-90 mb-6 px-2">
          Practical, research-backed psychological guidance for personal growth, well-being, and understanding human behavior.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-sans font-medium tracking-wide shadow-sm backdrop-blur-sm">
          <span className="text-blue-600">✦</span>
          100% Human Intelligence. No AI.
        </div>
      </section>

      {/* CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto w-full">
        <Link
          href="/boutique"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition shadow-sm bg-white/80 backdrop-blur-md"
        >
          <div className="h-40 overflow-hidden border-b border-slate-100">
            <img src="/complete-guide.jpg" alt="Psychology Clinical Guides" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2 text-slate-900">Complete Guides</h2>
            <p className="text-slate-600 text-sm md:text-xs leading-relaxed font-sans">Evidence-based frameworks for psychological understanding and clinical practice.</p>
          </div>
        </Link>

        <Link
          href="/articles"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition shadow-sm bg-white/80 backdrop-blur-md"
        >
          <div className="h-40 overflow-hidden border-b border-slate-100">
            <img src="/articles.jpg" alt="Psychology Articles" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2 text-slate-900">Articles</h2>
            <p className="text-slate-600 text-sm md:text-xs leading-relaxed font-sans">In-depth exploration of human behavior, mental health, and personal development.</p>
          </div>
        </Link>

        <a
          href="https://chat.troisiemechemin.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-blue-200 rounded-2xl overflow-hidden hover:border-blue-400 transition bg-blue-50/80 shadow-sm backdrop-blur-md"
        >
          <div className="h-40 overflow-hidden border-b border-blue-100">
            <img src="/humanist-approach.jpg" alt="Third Path App" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-1 text-blue-900">Daily Therapy App</h2>
            <p className="text-blue-800 text-[10px] font-bold mb-3 uppercase tracking-widest font-sans flex items-center gap-1"><span className="text-blue-500">✦</span> 100% Human · No AI</p>
            <p className="text-slate-700 text-sm md:text-xs leading-relaxed font-sans">A dedicated space for therapy, supervision, and genuine human connection — every day.</p>
          </div>
        </a>
      </section>

      <div className="max-w-5xl mx-auto w-full border-t border-slate-200/60" />

      {/* BLOC THÉRAPEUTES */}
      <section className="max-w-5xl mx-auto w-full">
        <Link
          href="/for-therapists"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row items-center gap-0">
            <div className="w-full md:w-64 h-48 md:h-full shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
              <img src="/humanist-approach.jpg" alt="For therapists" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex-1 p-8 md:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-[10px] font-sans font-bold uppercase tracking-widest">
                <span className="text-blue-500">✦</span> For Practitioners
              </div>
              <h2 className="text-2xl md:text-3xl font-bold italic tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                Are you a therapist?
              </h2>
              <p className="text-slate-500 italic text-sm leading-relaxed max-w-lg">
                Third Path gives you a daily channel to your patients, clinical supervision with a licensed psychologist, and a way to find new clients. One subscription, three tools.
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm font-sans group-hover:gap-3 transition-all">
                Discover the practitioner offer
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </Link>
      </section>

    </main>
  )
}
