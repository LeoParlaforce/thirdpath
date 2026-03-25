import Image from "next/image"
import { products } from "./data"

export const metadata = {
  title: "Store | Third Path",
  description: "Clinical protocols and psychological restructuring guides.",
}

export default function Boutique() {
  return (
    <main className="min-h-screen text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Store</h1>

        <p className="mt-4 text-lg opacity-80 max-w-2xl">
          Psychology is not only theory. It matters in practice.
          Read clearly, apply concretely, and tend to your world.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <a
              key={p.slug}
              href={`/boutique/${p.slug}`}
              className="group block relative overflow-hidden rounded-xl border bg-white/50 backdrop-blur transition duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
            >
              {/* overflow-hidden ici empêche l'image de dépasser des bords arrondis au zoom */}
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />

                <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="h-full overflow-y-auto bg-black/65 text-white backdrop-blur-sm p-4 md:p-5">
                    <h3 className="font-serif text-lg md:text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm md:text-base text-white/90">{p.summary}</p>
                    {p.chapters.length > 0 && (
                      <>
                        <h4 className="mt-3 font-semibold">Chapters</h4>
                        <ul className="mt-1 list-disc pl-5 text-sm md:text-base space-y-0.5">
                          {p.chapters.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-zinc-100 flex flex-col gap-1">
                <h3 className="font-serif text-base md:text-lg font-semibold">{p.title}</h3>
                <p className="text-sm opacity-70 italic">
                  {p.priceEUR === "0€" ? "Free Access" : "Multi-currency ready"}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}