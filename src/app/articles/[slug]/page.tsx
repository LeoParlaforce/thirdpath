import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { ReactNode } from "react"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  }
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  // ✅ JSON-LD (SEO invisible)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: [post.image],
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Third Path",
    },
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <article>
        {/* ✅ SEO JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">{post.date}</p>

        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-xl mb-8"
        />

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              aside: ({ children }: { children?: ReactNode }) => (
                <div className="bg-gray-100 border-l-4 border-gray-300 p-4 my-6">
                  {children}
                </div>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* ✅ CTA 1 — APP */}
        <div className="mt-12 p-6 border rounded-xl bg-gray-50">
          <p className="text-lg font-semibold">
            You don’t just need visibility — you need direction.
          </p>

          <p className="mt-2 text-gray-600">
            Get supervision on your practice and improve how you work online.
          </p>

          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
          >
            Access the supervision app →
          </a>
        </div>

        {/* ✅ CTA 2 — BOUTIQUE */}
        <div className="mt-6 p-6 border rounded-xl">
          <p className="text-lg font-semibold">
            Want a structured system to get clients?
          </p>

          <p className="mt-2 text-gray-600">
            Explore practical tools designed for therapists.
          </p>

          <a
            href="https://www.thirdpath.cloud/boutique"
            target="_blank"
            className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
          >
            View the resources →
          </a>
        </div>
      </article>
    </main>
  )
}