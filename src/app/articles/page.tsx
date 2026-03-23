import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export const metadata = {
  title: "Local SEO & Client Acquisition for Therapists",
  description:
    "Actionable articles on local SEO and client acquisition for therapists. Learn how to turn visibility into real clients.",
}

export default function ArticlesPage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Articles</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/articles/${post.slug}`}
            className="group block border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold group-hover:underline">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">{post.date}</p>

              {/* 👉 TON summary réel */}
              <p className="mt-3 text-gray-700">{post.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}