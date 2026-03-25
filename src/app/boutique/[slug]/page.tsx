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

        {/* md:items-stretch force l'alignement vertical des deux blocs */}
        <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-stretch">
          
          <div className="relative min-h-100 h-full overflow-hidden rounded-xl border bg-white/10 backdrop-blur-sm shadow-2xl flex">
            <Image 
              src={p.image} 
              alt={p.title} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-white/20 h-full">
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">{p.title}</h1>
            <p className="mt-6 text-lg opacity-90 leading-relaxed">{p.summary}</p>

            {p.chapters.length > 0 && (
              <div className="mt-8 grow">
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

            {/* Alignement strict des boutons avec hauteur identique */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1 sm:flex-none">
                <BuyButton 
                  slug={p.slug} 
                  priceEUR={p.priceEUR} 
                  priceUSD={p.priceUSD} 
                  image={p.image}
                />
              </div>
              
              <a
                href="https://chat.troisiemechemin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center px-8 h-13 rounded-md border-2 border-purple-600 text-purple-600 font-bold uppercase tracking-tight hover:bg-purple-600 hover:text-white transition duration-200 text-sm"
              >
                Join the therapy app
              </a>
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