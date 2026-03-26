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
    <main className="min-h-screen text-foreground bg-transparent">
      {/* JSON-LD PRODUCT (SEO Blindage) */}
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
        <Link href="/boutique" className="text-sm underline opacity-60 hover:opacity-100 transition-opacity">
          ← Back to Store
        </Link>

        <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-stretch">
          <div className="relative min-h-100 h-full overflow-hidden rounded-xl border bg-white/10 backdrop-blur-sm shadow-2xl flex">
            <Image 
              src={p.image} 
              alt={`Psychology guide: ${p.title}`} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-white/20 h-full text-slate-900">
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight italic">{p.title}</h1>
            <p className="mt-6 text-lg opacity-90 leading-relaxed font-serif">{p.summary}</p>

            {p.chapters.length > 0 && (
              <div className="mt-8 grow">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-50 text-blue-600">Contents</h2>
                <ul className="mt-4 space-y-2">
                  {p.chapters.map((c, i) => (
                    <li key={i} className="flex items-baseline text-sm opacity-80 italic">
                      <span className="mr-3 text-blue-600 font-bold">/</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <BuyButton slug={p.slug} priceEUR={p.priceEUR} priceUSD={p.priceUSD} image={p.image} />
              <a
                href="https://chat.troisiemechemin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center px-8 h-13 rounded-md border-2 border-blue-600 text-blue-600 font-bold uppercase tracking-tight hover:bg-blue-600 hover:text-white transition duration-200 text-sm"
              >
                Join the therapy app
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section conservée... */}
      </section>
    </main>
  )
}