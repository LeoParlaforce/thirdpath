// src/app/articles/page.tsx
import Link from "next/link"
import { getAllPosts, PostData } from "../../lib/posts"

export const metadata = {
  title: "Third Path — Articles on Psychology & Personal Growth",
  description:
    "Explore evidence-based psychology articles, self-improvement tips, and insights by certified psychologist Leo Gayrard.",
  alternates: {
    canonical: "https://thirdpath.cloud/articles",
  },
  openGraph: {
    title: "Third Path — Articles on Psychology & Personal Growth",
    description:
      "Explore evidence-based psychology articles, self-improvement tips, and insights by certified psychologist Leo Gayrard.",
    url: "https://thirdpath.cloud/articles",
  },
}

export default function ArticlesPage() {
  const posts: PostData[] = getAllPosts()

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>

      {posts.length === 0 && <p>No articles yet.</p>}

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/articles/${post.slug}`}
            className="group block relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            {/* Image en background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition"
              style={{
                backgroundImage: `url(/articles/${post.slug}.jpg)`,
              }}
            />

            {/* Contenu texte */}
            <div className="relative p-6 flex flex-col gap-2 bg-white/90 dark:bg-gray-900/80">
              <h2 className="text-2xl font-semibold">{post.title || "Untitled"}</h2>
              {post.summary && <p className="text-gray-700 mt-1">{post.summary}</p>}
              {post.date && <p className="text-sm text-gray-400">{post.date}</p>}

              {/* Partage réseaux sociaux */}
              <div className="flex gap-3 mt-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}&url=https://thirdpath.cloud/articles/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://thirdpath.cloud/articles/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://thirdpath.cloud/articles/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}