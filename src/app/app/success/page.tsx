import Link from "next/link"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

const SIGNAL_LINK = "https://signal.me/#u/leogayrard.11"
const SIGNAL_USERNAME = "@leogayrard.11"

async function verifySession(sessionId: string | undefined) {
  if (!sessionId) return null
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.status === "complete" || session.payment_status === "paid") {
      return session
    }
    return null
  } catch {
    return null
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const session = await verifySession(params.session_id)
  const valid = !!session

  return (
    <main className="font-serif text-slate-900 bg-transparent min-h-screen">

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">

        {valid ? (
          <>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest mb-6">
                <span className="text-blue-500">✦</span> Active subscription
              </div>

              <h1 className="text-5xl md:text-6xl font-bold italic tracking-tighter leading-none mb-6">
                Welcome.
              </h1>

              <p className="text-xl text-slate-500 italic font-light leading-relaxed max-w-xl mx-auto">
                Your channel with Leo Gayrard is now open.
              </p>
            </div>

            <div className="border-2 border-slate-900 rounded-3xl p-8 md:p-10 bg-white/80 space-y-6">

              <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
                Next step
              </div>

              <h2 className="text-2xl md:text-3xl font-bold italic text-slate-900 leading-tight">
                Open the conversation on Signal.
              </h2>

              <p className="text-slate-600 italic leading-relaxed">
                The messaging happens on <strong>Signal</strong>, an end-to-end encrypted messaging app. If you don&rsquo;t have it yet, install it on your phone (and computer if you like).
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">
                  My Signal contact
                </div>
                <div className="text-2xl font-mono text-slate-900 break-all">
                  {SIGNAL_USERNAME}
                </div>
                <a
                  href={SIGNAL_LINK}
                  className="block w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-full font-bold text-sm font-sans text-center transition"
                >
                  Open in Signal →
                </a>
                <p className="text-slate-500 italic text-xs leading-relaxed">
                  Don&rsquo;t have Signal yet?{" "}
                  <a
                    href="https://signal.org/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download it for free
                  </a>{" "}
                  for iOS, Android, macOS, Windows, and Linux.
                </p>
              </div>

              <p className="text-slate-500 italic text-sm leading-relaxed">
                This link has also been sent to you by email, along with your payment receipt.
              </p>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-400 font-sans text-xs uppercase tracking-widest">
                  Stripe billing · Cancel anytime from the receipt email
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/articles"
                className="block py-4 px-6 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans text-center hover:border-blue-400 hover:text-blue-600 transition italic"
              >
                Read the articles
              </Link>
              <Link
                href="/boutique"
                className="block py-4 px-6 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans text-center hover:border-blue-400 hover:text-blue-600 transition italic"
              >
                Browse the store
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter leading-tight mb-6">
                Session not found.
              </h1>
              <p className="text-slate-500 italic mb-10 max-w-xl mx-auto leading-relaxed">
                We couldn&rsquo;t verify your subscription. If you just paid, wait a few seconds and refresh the page.
              </p>
              <Link
                href="/app"
                className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition"
              >
                Back to the app →
              </Link>
            </div>
          </>
        )}

      </section>
    </main>
  )
}
