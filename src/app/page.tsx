// src/app/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Third Path — Human-Centered Psychology",
  description: "Explore research-backed psychology guides and join Troisième Chemin, the human-only therapy app.",
}

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-2 pb-12 flex flex-col gap-6 min-h-screen font-serif text-slate-900">

      {/* Header / Intro - Espace réduit en haut */}
      <section className="text-center mt-4">
        <h1 className="text-5xl font-medium mb-3 tracking-tight italic">
          Third Path — Psychology
        </h1>
        <p className="text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans italic opacity-80">
          Practical, research-backed psychological guidance for personal growth, well-being, and understanding human behavior.
        </p>
      </section>

      {/* List Section - Couleur Pastel Bleu Doux */}
      <section className="max-w-3xl mx-auto w-full">
        <h2 className="text-xl font-semibold mb-3 px-1 text-slate-800 italic">What you will find here</h2>
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 shadow-sm">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 list-none text-md">
            <li>
              <Link href="/boutique" className="group flex items-center gap-3 hover:text-blue-800 transition">
                <span className="text-blue-300">/</span>
                <span className="font-medium underline decoration-blue-200 underline-offset-4">Complete Guides</span>
                <span className="text-xs text-slate-500 font-sans italic hover:no-underline">– step-by-step</span>
              </Link>
            </li>
            <li>
              <Link href="/articles" className="group flex items-center gap-3 hover:text-blue-800 transition">
                <span className="text-blue-300">/</span>
                <span className="font-medium underline decoration-blue-200 underline-offset-4">Articles</span>
                <span className="text-xs text-slate-500 font-sans italic">– mental health</span>
              </Link>
            </li>
            <li>
              <Link href="/articles" className="group flex items-center gap-3 hover:text-blue-800 transition">
                <span className="text-blue-300">/</span>
                <span className="font-medium underline decoration-blue-200 underline-offset-4">Resources</span>
                <span className="text-xs text-slate-500 font-sans italic">– exercises</span>
              </Link>
            </li>
            <li>
              <a href="https://chat.troisiemechemin.fr" target="_blank" className="group flex items-center gap-3 hover:text-blue-800 transition">
                <span className="text-blue-300">/</span>
                <span className="font-medium underline decoration-blue-200 underline-offset-4">Humanist Approach</span>
                <span className="text-xs text-slate-500 font-sans italic">– self-awareness</span>
              </a>
            </li>
            <li className="md:col-span-2 mt-2">
              <a href="https://chat.troisiemechemin.fr" target="_blank" className="group flex items-center gap-3 hover:text-blue-900 transition font-semibold italic text-slate-800 bg-white/50 p-2 rounded-lg border border-blue-100">
                <span className="text-blue-500">✦</span>
                <span className="underline decoration-blue-300 underline-offset-4">Troisième chemin : the psychology app fully human, no AI</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Grid Section - Coins arrondis et bordures fines */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Card 1 */}
        <Link
          href="/boutique"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition shadow-sm"
        >
          <div className="h-36 overflow-hidden border-b border-slate-100">
            <img
              src="/complete-guide.jpg"
              alt="Complete Guides"
              className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium mb-2 italic">Complete Guides</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              Evidence-based frameworks for psychological understanding and clinical practice.
            </p>
          </div>
        </Link>

        {/* Card 2 */}
        <Link
          href="/articles"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition shadow-sm"
        >
          <div className="h-36 overflow-hidden border-b border-slate-100">
            <img
              src="/articles.jpg"
              alt="Articles"
              className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium mb-2 italic">Articles</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              In-depth exploration of human behavior, mental health, and personal development.
            </p>
          </div>
        </Link>

        {/* Card 3 - App Link */}
        <a
          href="https://chat.troisiemechemin.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-blue-200 rounded-2xl overflow-hidden hover:border-blue-400 transition bg-blue-50/20 shadow-sm"
        >
          <div className="h-36 overflow-hidden border-b border-blue-100">
            <img
              src="/humanist-approach.jpg"
              alt="Troisième chemin App"
              className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold mb-1 italic text-blue-900">Troisième chemin</h3>
            <p className="text-blue-800 text-[10px] font-bold mb-2 uppercase tracking-widest font-sans">
               Human Experience
            </p>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              A space for therapy, supervision, and human connection, free from AI interference.
            </p>
          </div>
        </a>
      </section>
    </main>
  )
}