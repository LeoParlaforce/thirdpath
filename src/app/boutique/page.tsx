import Image from "next/image"
import { products } from "./data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Store | Clinical Protocols & Psychology Guides | Third Path",
  description: "Browse our collection of research-backed clinical protocols and psychological restructuring guides. Professional resources for growth.",
}

export default function Boutique() {
  // FAQs Globales pour la boutique
  const storeFaqs = [
    { 
      question: "Are these guides suitable for clinical practice?", 
      answer: "Yes, our protocols are specifically designed to be integrated into therapeutic settings, offering structured frameworks for practitioners." 
    },
    { 
      question: "How do I receive my purchase?", 
      answer: "Immediately after checkout, you will receive a secure download link via email for your digital guides (PDF format)." 
    }
  ];

  return (
    <main className="min-h-screen text-slate-900">
      {/* JSON-LD : CollectionPage + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Third Path Psychology Store",
              "description": "Clinical protocols and psychological restructuring guides.",
              "url": "https://thirdpath.cloud/boutique"
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": storeFaqs.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
              }))
            }
          ])
        }}
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Store</h1>

        <p className="mt-4 text-lg text-slate-700 max-w-2xl font-serif italic">
          Psychology is not only theory. It matters in practice.
          Read clearly, apply concretely, and tend to your world.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <a
              key={p.slug}
              href={`/boutique/${p.slug}`}
              className="group block relative overflow-hidden rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={`Psychology Guide: ${p.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />

                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/65 backdrop-blur-sm p-4 md:p-6 text-white overflow-y-auto">
                  <h3 className="font-serif text-lg md:text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm opacity-90 italic leading-relaxed">{p.summary}</p>
                  
                  {p.chapters.length > 0 && (
                    <div className="mt-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 font-sans">Chapters</span>
                      <ul className="mt-2 space-y-1 text-sm font-serif italic">
                        {p.chapters.slice(0, 6).map((c, i) => (
                          <li key={i} className="flex items-baseline opacity-80">
                            <span className="mr-2">/</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white">
                <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>

        {/* Accordéon FAQ Boutique */}
        <section className="mt-20 border-t border-slate-100 pt-12 max-w-3xl">
          <h2 className="text-3xl font-serif italic mb-8 text-slate-900">Store Inquiry</h2>
          <div className="space-y-4">
            {storeFaqs.map((faq, i) => (
              <details key={i} className="group border border-slate-200 rounded-2xl bg-white/50 transition-all">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-serif text-lg font-medium text-slate-800">
                  {faq.question}
                  <span className="text-blue-500 transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 italic font-sans border-t border-slate-50 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}