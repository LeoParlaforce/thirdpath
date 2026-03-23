// src/app/articles/page.tsx
import Link from "next/link"
import { getAllPosts, PostData } from "../../lib/posts"

export const metadata = {
  title: "Third Path — Articles on Psychology & Personal Growth",
  description:
    "Explore evidence-based psychology articles, self-improvement strategies, and mental health insights by psychologist Leo Gayrard.",
  alternates: {
    canonical: "https://thirdpath.cloud/articles",
  },
  openGraph: {
    title: "Third Path — Articles on Psychology & Personal Growth",
    description:
      "Explore evidence-based psychology articles, self-improvement strategies, and mental health insights.",
    url: "https://thirdpath.cloud/articles",
    type: "website",
  },
}

export default function ArticlesPage() {
  const posts: PostData[] = getAllPosts()

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">Articles</h1>

      {posts.length === 0 && <p>No articles yet.</p>}

      <div className="flex flex-col gap-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/articles/${post.slug}`}
            className="group block border rounded-xl overflow-hidden shadow hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={`/articles/${post.slug}.jpg`}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold group-hover:text-accent transition">
                {post.title || "Untitled"}
              </h2>

              {post.summary && (
                <p className="mt-3 text-gray-700">{post.summary}</p>
              )}

              {post.date && (
                <p className="mt-2 text-sm text-gray-400">{post.date}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}