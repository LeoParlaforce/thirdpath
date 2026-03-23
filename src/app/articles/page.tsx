import Link from "next/link"
import { getAllPosts, PostData } from "../../lib/posts"

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
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition"
              style={{ backgroundImage: `url(/articles/${post.slug}.jpg)` }}
            />

            <div className="relative p-6 flex flex-col gap-2 bg-white/90 dark:bg-gray-900/80">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p
                className="text-gray-700 mt-1"
                dangerouslySetInnerHTML={{
                  __html:
                    post.summary ||
                    "Even online, Google and AI still treat geography as a priority. Local SEO for therapists remains the best strategy to be found.",
                }}
              />
              {post.date && <p className="text-sm text-gray-400">{post.date}</p>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}