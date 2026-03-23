// src/lib/posts.ts

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "src/posts")

export type PostData = {
  slug: string
  title: string
  date?: string
  summary?: string
  contentHtml: string
}

// Récupérer tous les posts (liste)
export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title || "",
      date: matterResult.data.date || "",
      summary: matterResult.data.summary || "",
      contentHtml: "", // pas utilisé ici
    }
  })

  // Tri par date (plus récent en premier)
  return allPostsData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1
    }
    return 0
  })
}

// Récupérer un seul post (page article)
export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const matterResult = matter(fileContents)

  const processedContent = remark().use(html).processSync(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    title: matterResult.data.title || "",
    date: matterResult.data.date || "",
    summary: matterResult.data.summary || "",
    contentHtml,
  }
}