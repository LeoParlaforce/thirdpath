import Image from "next/image"
import { products } from "./data"

export const metadata = {
  title: "Store | Third Path",
  description: "Clinical protocols and psychological restructuring guides.",
}

export default function Boutique() {
  return (
    <main className="min-h-screen text-foreground bg-transparent">
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
              className="group block relative overflow-hidden rounded-xl border bg-white/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />

                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/65 backdrop-blur-sm p-4 md:p-6 text-white overflow-y-auto">
                  <h3 className="font-serif text-lg md:text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm opacity-90 italic leading-relaxed">{p.summary}</p>
                  
                  {p.chapters.length > 0 && (
                    <div className="mt-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Chapters</span>
                      <ul className="mt-2 space-y-1 text-sm">
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

              <div className="p-6 border-t border-white/10">
                <h3 className="font-serif text-lg font-bold">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}