// src/app/blog/page.tsx
import Link from "next/link"
import { getAllPosts, PostData } from "../../lib/posts"

export const metadata = {
  title: "Third Path Blog — Articles on Psychology & Personal Growth",
  description: "Explore evidence-based psychology articles, self-improvement tips, and insights by certified psychologist Leo Gayrard.",
}

export default function BlogPage() {
  const posts: PostData[] = getAllPosts()

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.length === 0 && <p>No articles yet.</p>}

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                {post.title || "Untitled"}
              </Link>
            </h2>
            {post.summary && <p className="mt-2 text-gray-700">{post.summary}</p>}
            {post.date && <p className="mt-1 text-sm text-gray-400">{post.date}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}