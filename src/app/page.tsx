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
            "publisher": {
              "@type": "Organization",
              "name": "Third Path",
              "url": "https://thirdpath.cloud",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thirdpath.cloud/logo.png"
              },
              "sameAs": [
                "https://chat.troisiemechemin.fr"
              ]
            }
          })
        }}
      />

      <section className="text-center mt-8">
        {/* Couleur adaptative : Noir desktop, Blanc mobile */}
        <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight text-slate-900 max-md:text-white transition-colors duration-300">
          Third Path — Psychology
        </h1>
        <p className="text-base md:text-lg text-slate-700 max-md:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans opacity-90 mb-6 px-2 transition-colors duration-300">
          Practical, research-backed psychological guidance for personal growth, well-being, and understanding human behavior.
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-sans font-medium tracking-wide shadow-sm backdrop-blur-sm">
          <span className="text-blue-600">✦</span>
          100% Human Intelligence. No AI.
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto w-full">
        <Link
          href="/boutique"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition shadow-sm bg-white/80 backdrop-blur-md"
        >
          <div className="h-40 overflow-hidden border-b border-slate-100">
            <img src="/complete-guide.jpg" alt="Psychology Clinical Guides" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium mb-2 text-slate-900">Complete Guides</h3>
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
            <h3 className="text-xl font-medium mb-2 text-slate-900">Articles</h3>
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
            <img src="/humanist-approach.jpg" alt="Troisième chemin App" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1 text-blue-900">Troisième chemin</h3>
            <p className="text-blue-800 text-[10px] font-bold mb-3 uppercase tracking-widest font-sans flex items-center gap-1"><span className="text-blue-500">✦</span> Fully Human App</p>
            <p className="text-slate-700 text-sm md:text-xs leading-relaxed font-sans">A dedicated space for therapy, supervision, and genuine human connection.</p>
          </div>
        </a>
      </section>
    </main>
  )
}