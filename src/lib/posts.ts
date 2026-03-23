import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "src/posts")

export type PostData = {
  slug: string
  title: string
  date: string
  summary: string
  contentHtml: string
}

// Liste tous les posts
export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".md"))

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      summary: data.summary || "",
      contentHtml: "", // inutile pour la liste
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Récupère un post complet par slug
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) throw new Error("Post not found")

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "",
    summary: data.summary || "",
    contentHtml,
  }
}