import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export const metadata = {
  title: "Library of Thoughts | Third Path",
  description: "Explore our collection of research-backed articles on psychology, therapy marketing, and human connection.",
}

export default function ArticlesPage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 font-serif w-full overflow-hidden text-slate-900">
      <header className="mb-12 md:mb-16 border-b border-slate-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-medium italic tracking-tight text-slate-900 mb-4">
          Library of Thoughts
        </h1>
        <p className="text-base md:text-lg text-slate-600 font-sans italic opacity-90">
          Reflections on psychology, clinical practice, and the human experience.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/articles/${post.slug}`}
            className="group block transition-all"
          >
            <article className="flex flex-col gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition group-hover:shadow-md bg-white/90 backdrop-blur-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover sepia-[0.1] transition duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="space-y-3 px-1">
                <div className="flex items-center gap-3 text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold">
                  <span>{post.date}</span>
                  <span className="text-slate-300">/</span>
                  <span>Insights</span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-semibold leading-tight text-slate-900 group-hover:text-blue-800 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-600 text-sm leading-relaxed font-sans opacity-90 line-clamp-3 italic">
                  {post.summary}
                </p>
                
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase border-b border-slate-900 pb-1 group-hover:border-blue-600 group-hover:text-blue-600 transition-all text-slate-900">
                    Read Inquiry →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}