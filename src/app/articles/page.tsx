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
        {posts.map((post) => {
          const slug = post.slug
          const title = post.title || "Untitled"
          const summary = post.summary
            ? `${post.summary} ` + "<strong>Here’s what to do instead.</strong>"
            : "Ambitious self-employed entrepreneurs aiming to reach the entire world often fail because the internet isn’t as globally open as it seems. <strong>Here’s what to do instead.</strong>"

          return (
            <Link
              key={slug}
              href={`/articles/${slug}`}
              className="group block relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
            >
              {/* Image en background */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition"
                style={{
                  backgroundImage: `url(/articles/${slug}.jpg)`,
                }}
              />

              {/* Contenu texte */}
              <div className="relative p-6 flex flex-col gap-2 bg-white/90 dark:bg-gray-900/80">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p
                  className="text-gray-700 mt-1"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
                {post.date && <p className="text-sm text-gray-400">{post.date}</p>}
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}