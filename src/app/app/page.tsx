import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "The App — Third Path",
  description: "Individual messaging with a licensed clinical psychologist. For therapy or for supervision.",
  alternates: { canonical: "https://thirdpath.cloud/app" },
  openGraph: {
    title: "The App — Third Path",
    description: "Individual messaging with a licensed clinical psychologist.",
    url: "https://thirdpath.cloud/app",
    type: "website",
  },
}

export default function AppPage() {
  return (
    <main className="font-serif text-slate-900 bg-transparent">

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest">
          <span className="text-blue-500">✦</span> Individual messaging · Human · No AI
        </div>

        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter leading-none mb-8">
          Third Path — The App
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 italic font-light leading-relaxed max-w-2xl mx-auto mb-10">
          A daily channel with a licensed clinical psychologist. Write when something comes up — not only when a time slot allows it.
        </p>
      </section>

      {/* TWO PATHS */}
      <section className="max-w-4xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          href="/therapy"
          className="group block p-px rounded-3xl bg-linear-to-br from-blue-100 to-transparent shadow-sm hover:shadow-md transition-all no-underline"
        >
          <div className="bg-white rounded-[22px] p-8 md:p-10 space-y-6 border border-slate-50 h-full">
            <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
              Patient
            </div>
            <h2 className="text-3xl md:text-4xl font-bold italic tracking-tight leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              I&rsquo;m looking for therapy.
            </h2>
            <p className="text-slate-600 italic leading-relaxed">
              I want to work through what&rsquo;s weighing on me — at my own pace, in writing, without a fixed appointment.
            </p>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm font-sans group-hover:gap-3 transition-all pt-2">
              Discover therapy
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        <Link
          href="/for-therapists"
          className="group block p-px rounded-3xl bg-linear-to-br from-slate-100 to-transparent shadow-sm hover:shadow-md transition-all no-underline"
        >
          <div className="bg-white rounded-[22px] p-8 md:p-10 space-y-6 border border-slate-50 h-full">
            <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
              Therapist
            </div>
            <h2 className="text-3xl md:text-4xl font-bold italic tracking-tight leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              I&rsquo;m looking for supervision.
            </h2>
            <p className="text-slate-600 italic leading-relaxed">
              I&rsquo;m a therapist and I want to stop practicing alone. My patients engage me deeply and I want to work through what that stirs in me.
            </p>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm font-sans group-hover:gap-3 transition-all pt-2">
              Discover supervision
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

      </section>

    </main>
  )
}
