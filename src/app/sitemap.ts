import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thirdpath.cloud"
  const products = [
    "introduction-aux-guides","estime-de-soi","depression","anxiete","relations-amoureuses","solitude",
    "tdah","tsa","tca","sommeil","procrastination-creativite","hauts-potentiels","pack-integral",
  ]
  return [
    { url: `${base}/`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/boutique`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/therapies-groupe`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...products.map((slug) => ({
      url: `${base}/boutique/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
