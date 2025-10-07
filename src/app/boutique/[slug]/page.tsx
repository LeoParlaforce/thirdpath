import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductBySlug } from "@/app/boutique/data"
import { EN } from "@/app/boutique/translations-en"
import BuyButton from "./BuyButton"

export const dynamic = "force-dynamic"

export default function EbookPage({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug)
  if (!p) return notFound()

  const ov = EN[params.slug] ?? {}
  const title = ov.title ?? p.title
  const summary = ov.summary ?? p.summary
  const chapters = (ov.chapters ?? p.chapters) ?? []
  const isPack = p.slug === "pack-integral"

  return (
    <main className="min-h-screen text-foreground">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <a href="/boutique" className="text-sm underline opacity-80">← Back to Store</a>

        <div className="mt-4 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl border">
            <Image src={p.image} alt={title} fill className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
          </div>

          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">{title}</h1>
            <p className="mt-4 text-lg opacity-80">{summary}</p>

            {chapters.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Contents</h2>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm opacity-80">
                  {chapters.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <BuyButton slug={p.slug} label={`Buy now — ${p.price}`} />
              {!isPack && (
                <a
                  href="/therapies-groupe"
                  className="rounded-md border px-6 py-3 text-base font-medium transition transform-gpu hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Join the group therapy
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
