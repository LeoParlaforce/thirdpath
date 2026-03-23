// src/app/articles/[slug]/page.tsx

import { getPostData, getAllPosts, PostData } from "../../../lib/posts"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const posts: PostData[] = getAllPosts()
  return posts.map((post: PostData) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `https://thirdpath.cloud/articles/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://thirdpath.cloud/articles/${post.slug}`,
      type: "article",
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug)

  if (!post) return notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <article className="prose prose-lg max-w-none">

        <h1>{post.title}</h1>

        {post.date && (
          <p className="text-sm text-gray-400">{post.date}</p>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      </article>
    </main>
  )
}