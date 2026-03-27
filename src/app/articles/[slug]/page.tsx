import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import ShareActions from "@/components/ShareActions"

interface FAQItem {
  question: string;
  answer: string;
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug) as any
  if (!post) return {}
  const url = `https://thirdpath.cloud/articles/${slug}`
  return {
    title: `${post.title} | Third Path`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: url,
      images: [{ url: post.image }],
      type: 'article',
    },
  }
}

export async function generateStaticParams() {
  const allPosts = getAllPosts()
  return allPosts.map((post: any) => ({ slug: post.slug }))
}

const markdownComponents = {
  h2: ({ ...props }: any) => <h2 {...props} className="text-4xl md:text-5xl font-medium text-slate-900 mt-16 mb-8 tracking-tight border-b border-slate-100 pb-4 font-serif italic" />,
  h3: ({ ...props }: any) => <h3 {...props} className="text-xl font-bold text-slate-800 mt-10 mb-6 uppercase tracking-[0.2em] font-sans" />,
  p: ({ ...props }: any) => <p {...props} className="text-xl leading-relaxed text-slate-700 mb-8 font-serif" />,
  ul: ({ ...props }: any) => <ul {...props} className="space-y-4 mb-10 list-none" />,
  li: ({ ...props }: any) => (
    <li {...props} className="flex items-start text-xl text-slate-700 font-serif italic">
      <span className="text-blue-400 mr-3 font-bold text-2xl leading-none">/</span>
      {props.children}
    </li>
  ),
  blockquote: ({ ...props }: any) => (
    <div className="my-12 bg-blue-50/50 border-l-2 border-blue-400 p-8 rounded-r-3xl italic">
      <p className="text-2xl font-medium leading-relaxed text-blue-900 mb-0">"{props.children}"</p>
    </div>
  ),
  strong: ({ ...props }: any) => <strong {...props} className="font-bold text-slate-900 bg-blue-50 px-1" />,
  a: ({ ...props }: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline decoration-1 underline-offset-4 hover:text-blue-800 transition-all" />,
  img: ({ ...props }: any) => (
    <span className="block my-12 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100 p-2 bg-white">
      <img {...props} className="w-full h-auto rounded-2xl block" alt={props.alt || "Article image"} />
    </span>
  ),
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug) as any
  if (!post) return notFound()

  const contentParts = (post.content || "").split("[CTA-APP]")
  const articleUrl = `https://thirdpath.cloud/articles/${slug}`
  const faqs: FAQItem[] = post.faqs || [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": post.image,
              "datePublished": post.date,
              "author": { "@type": "Person", "name": "Leo Gayrard" }
            },
            ...(faqs.length > 0 ? [{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((f: FAQItem) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
              }))
            }] : [])
          ])
        }}
      />

      <article>
        <nav className="max-w-5xl mx-auto mb-10">
          <Link href="/articles" className="group inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold">
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Back to articles
          </Link>
        </nav>

        <header className="max-w-4xl mx-auto text-center mb-10 font-serif">
          <div className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">{post.date}</div>
          <h1 className="text-5xl md:text-7xl font-medium text-slate-900 leading-tight tracking-tighter mb-6 italic">{post.title}</h1>
          <p className="text-2xl font-light text-slate-500 italic max-w-2xl mx-auto leading-snug">{post.summary}</p>
        </header>

        <ShareActions url={articleUrl} title={post.title} />

        <div className="max-w-5xl mx-auto mb-10">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-2 bg-white/90 backdrop-blur-sm">
             <img src={post.image} alt={post.title} className="w-full h-auto max-h-150 object-cover rounded-2xl block" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="prose-xl">
            <ReactMarkdown components={markdownComponents}>{contentParts[0]}</ReactMarkdown>

            {contentParts.length > 1 && (
              <a href="https://chat.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" className="block my-12 group p-px rounded-3xl bg-linear-to-br from-blue-100 to-transparent shadow-sm hover:shadow-md transition-all">
                <div className="bg-white rounded-[22px] p-3 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-slate-50">
                  <div className="w-full md:w-48 aspect-square rounded-xl overflow-hidden">
                    <img src="/humanist-approach.jpg" alt="App" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2 font-sans">Human Connection</h3>
                    <p className="text-2xl italic text-slate-800 leading-tight">Third Path App</p>
                  </div>
                  <div className="pr-6">
                    <span className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm group-hover:bg-blue-600 transition-all">Join →</span>
                  </div>
                </div>
              </a>
            )}

            {contentParts.length > 1 && <ReactMarkdown components={markdownComponents}>{contentParts[1]}</ReactMarkdown>}
          </div>

          {faqs.length > 0 && (
            <section className="mt-12 border-t border-slate-100 pt-10">
              <h2 className="text-3xl font-serif italic mb-6 text-slate-900">Questions & Insights</h2>
              <div className="space-y-4">
                {faqs.map((faq: FAQItem, i: number) => (
                  <details key={i} className="group border border-slate-200 rounded-2xl bg-slate-50/50 transition-all">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-serif text-lg text-slate-800 hover:text-blue-600">
                      {faq.question}
                      <span className="ml-4 transition-transform group-open:rotate-180 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 italic font-sans border-t border-slate-100 pt-4">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 pt-8 border-t border-slate-50">
            <ShareActions url={articleUrl} title={post.title} />
          </div>
        </div>

        <footer className="max-w-7xl mx-auto mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 text-white">
          <Link href="/articles" className="group h-80 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
             <img src="/articles.jpg" alt="Library" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors z-10" />
             <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Library</h4>
                <p className="text-3xl font-serif italic leading-tight">More Articles</p>
             </div>
          </Link>

          <a href="https://chat.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" className="group h-80 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl bg-blue-900">
             <img src="/humanist-approach.jpg" alt="App" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-blue-900/60 group-hover:bg-blue-900/40 transition-colors z-10" />
             <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-200 mb-2">Community</h4>
                <p className="text-3xl font-serif italic leading-tight">Join the App</p>
             </div>
          </a>

          <Link href="/boutique" className="group h-80 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 md:col-span-2 lg:col-span-1">
             <img src="/complete-guide.jpg" alt="Store" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors z-10" />
             <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Store</h4>
                <p className="text-3xl font-serif italic leading-tight">Clinical Guides</p>
             </div>
          </Link>
        </footer>
      </article>
    </main>
  )
}