import { getPostData } from "../../../lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"

interface Props {
  params: { slug: string }
}

export default async function ArticlePage({ params }: Props) {
  let post
  try {
    post = await getPostData(params.slug)
  } catch {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-10">
      <h1 className="text-5xl font-bold mb-2">{post.title}</h1>
      {post.date && <p className="text-sm text-gray-400">{post.date}</p>}

      {post.summary && (
        <p className="text-gray-700 mt-4 text-lg italic">{post.summary}</p>
      )}

      <div className="relative w-full h-64 rounded overflow-hidden my-6 shadow-lg">
        <img
          src={`/articles/${post.slug}.jpg`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <p className="absolute bottom-2 right-2 text-xs text-gray-100 bg-black/50 px-2 py-1 rounded">
          Photo by{" "}
          <a
            href="https://unsplash.com/fr/@lpbarreto"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Leandro Barreto
          </a>
        </p>
      </div>

      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <section className="text-center mt-12">
        <Link
          href="/boutique"
          className="inline-block px-6 py-3 bg-accent text-white rounded font-medium hover:opacity-90 transition"
        >
          Explore Our Store
        </Link>
      </section>
    </main>
  )
}