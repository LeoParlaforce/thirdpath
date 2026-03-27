import Image from "next/image"
import Link from "next/link"
import { products } from "./data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Store | Clinical Protocols & Psychology Guides | Third Path",
  description: "Browse our collection of research-backed clinical protocols and psychological restructuring guides.",
  alternates: { canonical: "https://thirdpath.cloud/boutique" }
}

export default function Boutique() {
  return (
    <main className="min-h-screen bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": products.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://thirdpath.cloud/boutique/${p.slug}`,
              "name": p.title
            }))
          })
        }}
      />
      <section className="mx-auto max-w-6xl px-6 py-14">
        <header className="mb-16">
          {/* Couleur adaptative */}
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 max-md:text-white italic tracking-tighter transition-colors">Store.</h1>
          <p className="mt-4 text-xl text-slate-500 max-md:text-slate-300 max-w-2xl font-serif italic leading-relaxed transition-colors">
            Psychology is not only theory. It matters in practice. <br/>
            Read clearly, apply concretely, and tend to your world.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/boutique/${p.slug}`}
              className="group block relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width:1024px) 33vw, 50vw" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white backdrop-blur-sm">
                   <p className="text-sm italic font-serif leading-relaxed mb-2 line-clamp-4">{p.summary}</p>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">View Protocol →</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-slate-900 italic group-hover:text-blue-600 transition-colors">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}