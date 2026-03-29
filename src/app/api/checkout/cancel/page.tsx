import Link from "next/link"

export const metadata = {
  title: "Payment Cancelled | Third Path",
  robots: { index: false, follow: false },
}

// FIX : page était en français ("Paiement annulé") sur un site anglais
export default function Cancel() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24 text-center font-serif">
      <h1 className="text-4xl font-bold italic tracking-tight mb-4">Payment cancelled.</h1>
      <p className="text-slate-500 italic mb-10">
        No charge was made. You can go back and try again whenever you're ready.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/boutique"
          className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition"
        >
          Back to Store
        </Link>
        <a
          href="mailto:leo.gayrard@gmail.com"
          className="px-8 py-3 border border-slate-300 text-slate-600 rounded-full font-bold text-sm hover:border-blue-400 hover:text-blue-600 transition italic"
        >
          Need help?
        </a>
      </div>
    </main>
  )
}
