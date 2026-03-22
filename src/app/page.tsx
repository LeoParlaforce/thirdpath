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
    <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">

      {/* Header / Intro */}
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Third Path — Psychology guides
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Practical, research-backed psychological guidance for personal growth, well-being, and understanding human behavior. Explore guides, articles, and exercises that help you reflect, grow, and apply psychology in daily life.
        </p>
      </section>

      {/* What you will find here */}
      <section className="prose max-w-4xl mx-auto">
        <h2>What You Will Find Here</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Complete Guides – step-by-step evidence-based guides</li>
          <li>Articles – psychology, personal development, and mental health</li>
          <li>Resources – exercises, reflections, and techniques</li>
          <li>Humanist Approach – insights for self-awareness and relationships</li>
        </ul>
      </section>

      {/* Encadrés principaux */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Complete Guides */}
        <Link
          href="/boutique"
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
            <h3 className="text-xl font-semibold mb-1">Complete Guides</h3>
            <p className="text-gray-600 text-sm">
              Step-by-step evidence-based guides for understanding psychological concepts and practices.
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
            <h3 className="text-xl font-semibold mb-1">Articles</h3>
            <p className="text-gray-600 text-sm">
              Read individual articles on psychology, personal development, and mental health.
            </p>
          </div>
        </Link>

        {/* Humanist Approach – non cliquable */}
        <div
          className="group block border rounded-lg overflow-hidden shadow transition cursor-default"
        >
          <img
            src="/humanist-approach.jpg"
            alt="Humanist Approach in Psychology"
            loading="lazy"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-1">Humanist Approach</h3>
            <p className="text-gray-600 text-sm">
              Learn how psychological insights can be applied to improve self-awareness and relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Closing / CTA */}
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-gray-700">
          Whether you are exploring self-esteem, anxiety, personal development, or relationships, our content is grounded in research and clinical expertise to help you apply psychology effectively in your life.
        </p>
        <Link
          href="/articles"
          className="mt-6 inline-block px-6 py-3 rounded bg-accent text-white font-medium hover:opacity-90 transition"
        >
          Explore Articles
        </Link>
      </section>
    </main>
  )
}