// src/app/articles/[slug]/page.tsx
import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import { remark } from "remark"
import html from "remark-html"

export interface PostData {
  title: string
  date: string
  summary: string
  slug: string
  contentHtml: string
}

const postsDirectory = path.join(process.cwd(), "src/posts")

async function getPostContent(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) notFound()

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const [_, metaRaw, ...contentArr] = fileContents.split("---")
  const metaLines = metaRaw.split("\n").filter(Boolean)
  const metadata: any = {}
  metaLines.forEach(line => {
    const [key, ...rest] = line.split(":")
    metadata[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "")
  })

  const processedContent = await remark().use(html).process(contentArr.join("---"))

  return {
    slug,
    title: metadata.title || "Untitled",
    date: metadata.date || "",
    summary: metadata.summary || "",
    contentHtml: processedContent.toString(),
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".md"))
  return files.map(f => ({ slug: f.replace(/\.md$/, "") }))
}

interface Props {
  params: { slug: string }
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPostContent(params.slug)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-10">
      {/* Title & Date */}
      <h1 className="text-5xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400">{post.date}</p>

      {/* Résumé */}
      {post.summary && (
        <p className="text-gray-700 mt-4 text-lg italic">
          {post.summary}
        </p>
      )}

      {/* Main image */}
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

      {/* Content */}
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* References */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">References</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>
            Chaffey, D. (2023). <em>Global Digital Trends: Local Search Insights</em>.{" "}
            <a
              href="https://www.smartinsights.com/global-digital-trends-local-search"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              https://www.smartinsights.com
            </a>
          </li>
          <li>
            BrightLocal. (2025). <em>Local Consumer Review Survey</em>.{" "}
            <a
              href="https://www.brightlocal.com/research/local-consumer-review-survey/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              https://www.brightlocal.com/research/local-consumer-review-survey/
            </a>
          </li>
          <li>
            Moz. (2025). <em>Beginner's Guide to Local SEO</em>.{" "}
            <a
              href="https://moz.com/learn/seo/local"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              https://moz.com/learn/seo/local
            </a>
          </li>
          <li>
            Think with Google. (2023). <em>Local Search Behavior</em>.{" "}
            <a
              href="https://www.thinkwithgoogle.com/data-tools/local-search-behavior/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              https://www.thinkwithgoogle.com/data-tools/local-search-behavior/
            </a>
          </li>
        </ol>
      </section>

      {/* Discreet CTA to store */}
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