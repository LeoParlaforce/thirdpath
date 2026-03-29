import Link from "next/link"

export const metadata = {
  title: "Editorial Standards — Third Path",
  description: "How Third Path ensures accuracy, credibility, and independence in all psychological content. Written by a licensed psychologist.",
  alternates: { canonical: "https://thirdpath.cloud/editorial-standards" },
  robots: { index: true, follow: true },
}

export default function EditorialStandards() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://thirdpath.cloud/editorial-standards",
    "name": "Editorial Standards — Third Path",
    "url": "https://thirdpath.cloud/editorial-standards",
    "description": "How Third Path ensures accuracy, credibility, and independence in all psychological content.",
    "publisher": { "@id": "https://thirdpath.cloud/#organization" },
    "author": { "@id": "https://thirdpath.cloud/#author" }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 font-serif">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/" className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold mb-16 group">
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Home
      </Link>

      <h1 className="text-5xl font-bold italic tracking-tighter text-slate-900 mb-6 leading-none">
        Editorial Standards
      </h1>
      <p className="text-xl text-slate-500 italic leading-relaxed mb-16 font-light">
        How we ensure accuracy, credibility, and independence in every article and guide.
      </p>

      {[
        {
          id: "certified",
          title: "Written by Certified Professionals",
          content: "All content is produced by Leo Gayrard, a licensed psychologist. Guidance and articles are based on professional training, evidence-based psychology research, and extensive clinical experience."
        },
        {
          id: "research",
          title: "Research-Backed Content",
          content: "All claims are supported by peer-reviewed studies and established psychological principles. When evidence is preliminary or limited, it is clearly identified as such to ensure full transparency."
        },
        {
          id: "updates",
          title: "Update Frequency",
          content: "The field of psychology is constantly evolving. We review our core guides and articles regularly to ensure they reflect the most recent data and professional standards."
        },
        {
          id: "independence",
          title: "Editorial Independence",
          content: "Third Path maintains absolute editorial independence. Our content is never influenced by advertisers, sponsors, or affiliate programs. Our priority is the accuracy of the information and the well-being of our readers."
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
          Review Process
        </h2>
        <ol className="list-none p-0 space-y-4 text-slate-600">
          {[
            ["01. Drafting", "Initial article created by a certified psychologist."],
            ["02. Fact-checking", "Evidence and citations verified against current scientific literature."],
            ["03. Expert review", "Clinical review for accuracy, clarity, and safety."],
            ["04. Publication", "Article published only once it meets our rigorous standards."],
          ].map(([label, desc]) => (
            <li key={label}>
              <strong className="text-slate-800 uppercase text-xs tracking-widest font-sans block mb-1">{label}</strong>
              <span className="italic">{desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-16 p-8 border border-slate-200 bg-white/80 rounded-2xl">
        <h3 className="font-bold uppercase text-xs tracking-widest text-slate-500 mb-4 font-sans">Corrections Policy</h3>
        <p className="text-slate-500 text-sm italic leading-relaxed">
          Accuracy is our foundation. If you believe an article contains an error, please report it to{' '}
          <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:text-blue-800 transition font-bold not-italic">
            leo.gayrard@gmail.com
          </a>
          . We investigate all reports and issue corrections promptly.
        </p>
      </div>
    </main>
  )
}
