import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProductBySlug } from "@/app/boutique/data"
import BuyButton from "./BuyButton"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return {}
  return {
    title: `${p.title} | Protocol | Third Path`,
    description: p.summary,
  }
}

export default async function EbookPage({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return notFound()

  return (
    <main className="min-h-screen text-foreground">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <Link href="/boutique" className="text-sm underline opacity-80">
          ← Back to Store
        </Link>

        <div className="mt-4 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-3/4 overflow-hidden rounded-xl border">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              priority
            />
          </div>

          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">{p.title}</h1>
            <p className="mt-4 text-lg opacity-80">{p.summary}</p>

            {p.chapters.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Contents</h2>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm opacity-80">
                  {p.chapters.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              {/* C'est ici que l'assignation doit être correcte */}
              <BuyButton 
                slug={p.slug} 
                priceEUR={p.priceEUR} 
                priceUSD={p.priceUSD} 
              />
              
              <a
                href="https://chat.troisiemechemin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-6 py-3 text-base font-medium transition transform-gpu hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Join the therapy app
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}