import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { Metadata } from "next"

// Interface pour le typage des posts
interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  image: string;
}

export const metadata: Metadata = {
  title: "Library of Thoughts | Psychology & Clinical Insights | Third Path",
  description: "Explore our collection of research-backed articles on psychology, therapy marketing, and human connection. Clinical reflections for the modern age.",
}

export default function ArticlesPage() {
  const posts: Post[] = getAllPosts()

  // FAQ spécifique à la bibliothèque d'articles
  const libraryFaqs = [
    {
      question: "How often is the Library of Thoughts updated?",
      answer: "We publish new psychological inquiries and clinical reflections on a monthly basis, focusing on quality and research depth over frequency."
    },
    {
      question: "Can I cite these articles in my own work?",
      answer: "Yes, all articles are original clinical reflections by Leo Gayrard. Please cite 'Third Path' and the specific article URL when referencing our insights."
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 font-serif w-full overflow-hidden text-slate-900">
      {/* JSON-LD : Blog + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Third Path - Library of Thoughts",
              "description": "Reflections on psychology, clinical practice, and the human experience.",
              "url": "https://thirdpath.cloud/articles",
              "publisher": {
                "@type": "Organization",
                "name": "Third Path",
                "logo": { "@type": "ImageObject", "url": "https://thirdpath.cloud/logo.png" }
              },
              "blogPost": posts.map((post) => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "url": `https://thirdpath.cloud/articles/${post.slug}`,
                "datePublished": post.date,
                "description": post.summary
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": libraryFaqs.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
              }))
            }
          ])
        }}
      />

      <header className="mb-12 md:mb-16 border-b border-slate-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-medium italic tracking-tight text-slate-900 mb-4">
          Library of Thoughts
        </h1>
        <p className="text-base md:text-lg text-slate-600 font-sans italic opacity-90">
          Reflections on psychology, clinical practice, and the human experience.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {posts.map((post: Post) => (
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

      {/* Accordéon FAQ Bibliothèque */}
      <section className="mt-24 border-t border-slate-200 pt-16 max-w-4xl">
        <h2 className="text-3xl font-serif italic mb-10 text-slate-900">Library Inquiry</h2>
        <div className="space-y-4">
          {libraryFaqs.map((faq, i: number) => (
            <details key={i} className="group border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-serif text-lg font-medium text-slate-800 hover:text-blue-600">
                {faq.question}
                <span className="ml-4 transition-transform duration-500 group-open:rotate-180 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed font-sans italic border-t border-slate-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}