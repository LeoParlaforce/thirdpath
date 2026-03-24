import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { ReactNode } from "react"

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/posts")
  const allPosts = getAllPosts()
  return allPosts.map((post: any) => ({
    slug: post.slug,
  }))
}

export default async function ArticlePage({ params }: { params: any }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  if (!slug) return notFound()

  const post = getPostBySlug(slug)
  if (!post) return notFound()

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
    <main className="max-w-3xl mx-auto px-4 py-16">
      <article className="space-y-12">
        {/* JSON-LD SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-8">
          {post.title}
        </h1>

        <p className="text-gray-500 text-center mb-12">
          {post.date}
        </p>

        {/* Main Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-xl mb-12"
        />

        {/* Markdown Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-3xl font-bold text-center my-8" />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-2xl font-semibold text-center my-6" />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="my-4 leading-relaxed" />
              ),
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                />
              ),
              aside: ({ children }: { children?: ReactNode }) => (
                <div className="bg-blue-50 border-l-4 border-blue-300 p-4 my-6 rounded-md">
                  {children}
                </div>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* CTA Sections */}
        <div className="space-y-6 mt-12">
          {/* Supervision App */}
          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: "url('/humanist-approach.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-black/50 p-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Supervision App</h3>
              <p>Get feedback on your positioning, messaging, and online practice.</p>
            </div>
          </a>

          {/* Structured System */}
          <a
            href="https://www.thirdpath.cloud/boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: "url('/complete-guide.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-black/50 p-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Structured System</h3>
              <p>Explore practical tools designed specifically for therapists to get clients.</p>
            </div>
          </a>
        </div>

        {/* References supprimées */}
      </article>
    </main>
  )
}