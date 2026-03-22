import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "src/posts")

export type PostData = {
  slug: string
  title: string
  summary: string
  date: string
  image?: string
}

// Lire tous les articles
export function getAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || "",
      summary: data.summary || "",
      date: data.date || "",
      image: data.image || null,
    }
  })

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Lire un article par slug (sera utilisé plus tard)
export async function getPostBySlug(slug: string): Promise<PostData & { contentHtml?: string }> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) throw new Error("Article not found")
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || "",
    summary: data.summary || "",
    date: data.date || "",
    image: data.image || null,
    contentHtml: content || "",
  }
}