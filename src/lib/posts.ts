// src/lib/posts.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Post = {
  title: string
  date: string
  summary: string
  slug: string
  content: string
  image: string
  imageCredit?: string
  faqs?: Array<{ question: string; answer: string }> // On déclare officiellement la FAQ ici
  [key: string]: any // Permet d'accepter d'autres champs sans erreur TypeScript
}

const postsDirectory = path.join(process.cwd(), "./src/posts")

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md")) // Sécurité : on ne prend que le markdown
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      const { data, content } = matter(fileContents)

      // On retourne TOUTES les données (data) + le contenu et le slug
      return {
        ...data,
        slug,
        content,
        image: data.image || `/articles/${slug}.jpg`,
      } as Post
    })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    ...data,
    slug,
    content,
    image: data.image || `/articles/${slug}.jpg`,
  } as Post
}