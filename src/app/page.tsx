// src/app/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Third Path — Psychology guides",
  description: "Practical, research-backed psychological guidance for personal growth and well-being.",
  openGraph: {
    title: "Third Path — Psychology guides",
    description: "Practical, research-backed psychological guidance for personal growth and well-being.",
    images: ["/articles.jpg"],
  },
}

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">

      {/* Header / Intro */}
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Third Path — Psychology guides
        </h1>
        <p className="text-lg text-gray-700">
          Practical, research-backed psychological guidance for personal growth and well-being.
        </p>
      </section>

      {/* Encadrés principaux */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Complete Guides */}
        <Link
          href="/complete-guides"
          title="Complete Guides on Psychology"
          className="group block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src="/complete-guide.jpg"
            alt="Complete Guides on Psychology"
            loading="lazy"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Complete Guides</h2>
            <p className="text-gray-600">
              Step-by-step evidence-based guides for understanding psychological concepts and practices.
            </p>
          </div>
        </Link>

        {/* Humanist Approach */}
        <Link
          href="/humanist-approach"
          title="Humanist Approach in Psychology"
          className="group block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src="/humanist-approach.jpg"
            alt="Humanist Approach in Psychology"
            loading="lazy"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Humanist Approach</h2>
            <p className="text-gray-600">
              Learn how psychological insights can be applied to improve self-awareness and relationships.
            </p>
          </div>
        </Link>

        {/* Articles */}
        <Link
          href="/articles"
          title="Read Articles on Psychology"
          className="group block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src="/articles.jpg"
            alt="Articles on Psychology and Personal Development"
            loading="lazy"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Articles</h2>
            <p className="text-gray-600">
              Read individual articles on psychology, personal development, and mental health.
            </p>
          </div>
        </Link>
      </section>
    </main>
  )
}