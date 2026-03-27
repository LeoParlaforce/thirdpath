import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProductBySlug } from "@/app/boutique/data"
import BuyButton from "./BuyButton"

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return {}
  return { 
    title: `${p.title} | Protocol | Third Path`, 
    description: p.summary,
    openGraph: {
      images: [{ url: p.image }]
    }
  }
}

export default async function EbookPage({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return notFound()

  return (
    <main className="min-h-screen text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": p.title,
            "description": p.summary,
            "image": p.image,
            "offers": {
              "@type": "Offer",
              "price": p.priceEUR,
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "url": `https://thirdpath.cloud/boutique/${slug}`
            }
          })
        }}
      />

      <section className="mx-auto max-w-5xl px-6 py-14">
        <Link href="/boutique" className="text-sm underline text-slate-500 hover:text-slate-900 transition-colors">
          ← Back to Store
        </Link>

        <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-stretch">
          <div className="relative aspect-3/4 md:min-h-125 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl flex">
            <Image 
              src={p.image} 
              alt={`Psychology guide: ${p.title}`} 
              fill 
              className="object-cover" 
              priority 
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-sm h-full text-slate-900">
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight italic text-slate-900">{p.title}</h1>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed font-serif">{p.summary}</p>

            {p.chapters.length > 0 && (
              <div className="mt-8 grow">
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 opacity-60">Contents</h2>
                <ul className="mt-4 space-y-2">
                  {p.chapters.map((c, i) => (
                    <li key={i} className="flex items-baseline text-sm text-slate-600 italic">
                      <span className="mr-3 text-blue-600 font-bold">/</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-end">
              <div className="w-full sm:flex-1">
                <BuyButton slug={p.slug} priceEUR={p.priceEUR} priceUSD={p.priceUSD} image={p.image} />
              </div>
              <a
                href="https://chat.troisiemechemin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-8 h-13 rounded-md border-2 border-blue-600 text-blue-600 font-bold uppercase tracking-tight hover:bg-blue-600 hover:text-white transition-all text-sm"
              >
                Join the app
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}