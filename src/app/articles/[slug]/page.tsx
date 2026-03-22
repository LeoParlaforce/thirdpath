// src/app/articles/[slug]/page.tsx
import { getPostBySlug, PostData } from "../../../lib/posts"

type Props = { params: { slug: string } }

export default async function PostPage({ params }: Props) {
  try {
    const post: PostData & { contentHtml?: string } = await getPostBySlug(params.slug)

    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">{post.title || "Untitled"}</h1>
        {post.date && <p className="text-sm text-gray-500 mb-8">{post.date}</p>}
        {post.image && <img src={post.image} alt={post.title} className="mb-6 rounded" />}
        <article className="prose prose-lg">{post.contentHtml || "No content yet."}</article>
      </main>
    )
  } catch (error) {
    return <p>Article not found.</p>
  }
}