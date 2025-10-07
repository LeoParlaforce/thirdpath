// app/boutique/page.tsx
import Image from "next/image"
import { products } from "./data"
import { EN } from "./translations-en"

export default function Boutique() {
  return (
    <main className="min-h-screen text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Store</h1>

        <p className="mt-4 text-lg opacity-80">
          Psychology is not only theory. It matters in practice.
          Read clearly, apply concretely, and tend to your world.
          <br />
          <span className="text-sm opacity-60">
            Member pricing: guides $5.50, bundle $31.50.
          </span>
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const ov = EN[p.slug] ?? {}
            const title = ov.title ?? p.title
            const summary = ov.summary ?? p.summary
            const chapters: string[] = (ov.chapters ?? p.chapters) || []

            return (
              <a
                key={p.slug}
                href={`/boutique/${p.slug}`}
                className="group block relative overflow-hidden rounded-xl border bg-white/50 backdrop-blur transition duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
              >
                {/* Cover + overlay */}
                <div className="relative aspect-[3/4] w-full">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}

                  <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="h-full overflow-y-auto bg-black/65 text-white backdrop-blur-sm p-4 md:p-5">
                      <h3 className="font-serif text-lg md:text-xl font-semibold">{title}</h3>
                      {summary && <p className="mt-2 text-sm md:text-base text-white/90">{summary}</p>}
                      {chapters.length > 0 && (
                        <>
                          <h4 className="mt-3 font-semibold">Chapters</h4>
                          <ul className="mt-1 list-disc pl-5 text-sm md:text-base space-y-0.5">
                            {chapters.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-serif text-base md:text-lg font-semibold">{title}</h3>
                    {p.price && <p className="text-sm opacity-70">{p.price}</p>}
                  </div>
                  <span className="text-sm opacity-70 group-hover:opacity-100">View</span>
                </div>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
