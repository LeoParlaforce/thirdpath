import Link from "next/link"

export const metadata = {
  title: "About Us — Third Path",
  description: "Meet Leo Gayrard, licensed psychologist behind Third Path. Research-backed psychology guides for personal growth and well-being.",
  alternates: { canonical: "https://thirdpath.cloud/about-us" },
  robots: { index: true, follow: true },
}

export default function AboutUs() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://thirdpath.cloud/about-us",
    "name": "About Third Path",
    "url": "https://thirdpath.cloud/about-us",
    "description": "Meet Leo Gayrard, licensed psychologist behind Third Path.",
    "publisher": { "@id": "https://thirdpath.cloud/#organization" },
    "mainEntity": { "@id": "https://thirdpath.cloud/#author" }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 font-serif">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/" className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold mb-16 group">
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Home
      </Link>

      <h1 className="text-5xl font-bold italic tracking-tighter text-slate-900 mb-6 leading-none">
        About Third Path
      </h1>
      <p className="text-xl text-slate-500 italic leading-relaxed mb-16 font-light">
        Research-backed psychology guidance from a licensed professional.
      </p>

      {[
        {
          id: "mission",
          title: "Our Mission",
          content: "Third Path exists to provide reliable, evidence-based psychological resources, guides, and insights. Every article and guide is grounded in research, clinical experience, and ethical practice. We bridge the gap between complex psychology and practical daily application."
        },
        {
          id: "who",
          title: "Who We Are",
          content: "Third Path is operated by Leo Gayrard, a licensed psychologist. Our guidance combines professional academic training, clinical experience, and evidence-based methods to ensure practical and reliable psychological insights that genuinely help people."
        },
        {
          id: "why",
          title: "Why Third Path",
          content: "We make psychological knowledge accessible, structured, and useful. Whether you're exploring self-esteem, anxiety, depression, or personal development, every guide is evidence-backed and clinically validated — with zero AI-generated content."
        },
      ].map(section => (
        <section key={section.id} aria-labelledby={`${section.id}-heading`} className="mb-12">
          <h2 id={`${section.id}-heading`} className="text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-400 pl-4 text-slate-800 font-sans">
            {section.title}
          </h2>
          <p className="text-slate-600 leading-relaxed italic">{section.content}</p>
        </section>
      ))}

      <section aria-labelledby="process-heading" className="mb-12">
        <h2 id="process-heading" className="text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-400 pl-4 text-slate-800 font-sans">
          Our Editorial Process
        </h2>
        <ol className="list-none p-0 space-y-4 text-slate-600">
          {[
            ["01. Research & drafting", "Articles written by a certified psychologist."],
            ["02. Fact-checking", "Evidence and sources verified against peer-reviewed studies."],
            ["03. Clinical review", "Review for accuracy, clarity, and ethical compliance."],
            ["04. Regular updates", "Content updated to reflect the latest research."],
          ].map(([label, desc]) => (
            <li key={label}>
              <strong className="text-slate-800 uppercase text-xs tracking-widest font-sans block mb-1">{label}</strong>
              <span className="italic">{desc}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA conversion */}
      <div className="mt-16 p-10 border border-blue-200 bg-blue-50/50 rounded-2xl text-center space-y-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 font-sans">Ready to start?</p>
        <h3 className="text-2xl font-bold italic text-slate-900">Access the Guides.</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/boutique"
            className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition font-sans"
          >
            View PDF Guides
          </Link>
          <Link
            href="/articles"
            className="px-8 py-3 border border-slate-300 text-slate-600 rounded-full font-bold text-sm hover:border-blue-400 hover:text-blue-600 transition font-sans italic"
          >
            Read Articles
          </Link>
        </div>
      </div>

      <div className="mt-12 p-8 border border-slate-200 bg-white/80 rounded-2xl">
        <h3 className="font-bold uppercase text-xs tracking-widest text-slate-500 mb-4 font-sans">Contact</h3>
        <p className="text-slate-500 text-sm italic leading-relaxed">
          Questions or feedback? Email{' '}
          <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:text-blue-800 transition font-bold not-italic">
            leo.gayrard@gmail.com
          </a>
          . We respond within 48 hours on business days.
        </p>
      </div>
    </main>
  )
}
