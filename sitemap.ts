import { MetadataRoute } from 'next'
import { getAllPosts } from "@/lib/posts"
import { products } from "@/app/boutique/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thirdpath.cloud'
  const lastMod = new Date()

  // 1. Pages Statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/vision`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/boutique`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // 2. Pages Articles Dynamiques
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post: any) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.date), // Utilise la date de l'article si possible
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // 3. Pages Produits Dynamiques
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/boutique/${product.slug}`,
    lastModified: lastMod,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...postEntries, ...productEntries]
}