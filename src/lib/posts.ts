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
  imageCredit?: string // Ajout de la propriété optionnelle
}

const postsDirectory = path.join(process.cwd(), "./src/posts")

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data, content } = matter(fileContents)

    return {
      title: data.title,
      date: data.date,
      summary: data.summary,
      slug,
      content,
      image: data.image || `/articles/${slug}.jpg`,
      imageCredit: data.imageCredit || null, // On récupère le crédit s'il existe
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    title: data.title,
    date: data.date,
    summary: data.summary,
    slug,
    content,
    image: data.image || `/articles/${slug}.jpg`,
    imageCredit: data.imageCredit || null, // On récupère le crédit ici aussi
  }
}