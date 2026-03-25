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
  return { title: `${p.title} | Protocol | Third Path`, description: p.summary }
}

export default async function EbookPage({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return notFound()

  return (
    <main className="min-h-screen text-foreground bg-transparent">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <Link href="/boutique" className="text-sm underline opacity-60 hover:opacity-100 transition-opacity">
          ← Back to Store
        </Link>

        <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-start">
          <div className="relative aspect-3/4 overflow-hidden rounded-xl border bg-white/10 backdrop-blur-sm shadow-2xl">
            <Image src={p.image} alt={p.title} fill className="object-cover" priority />
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-white/20">
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">{p.title}</h1>
            <p className="mt-6 text-lg opacity-90 leading-relaxed">{p.summary}</p>

            {p.chapters.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-50 text-purple-600">Contents</h2>
                <ul className="mt-4 space-y-2">
                  {p.chapters.map((c, i) => (
                    <li key={i} className="flex items-baseline text-sm opacity-80 italic">
                      <span className="mr-3 text-purple-600 font-bold">/</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <BuyButton 
                slug={p.slug} 
                priceEUR={p.priceEUR} 
                priceUSD={p.priceUSD} 
                image={p.image}
              />
            </div>
          </div>
        </div>

        {p.faq.length > 0 && (
          <section className="mt-24 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <h2 className="font-serif text-3xl font-bold">FAQ</h2>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              {p.faq.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold opacity-90">Q: {item.question}</h3>
                  <p className="mt-4 opacity-70 leading-relaxed text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}