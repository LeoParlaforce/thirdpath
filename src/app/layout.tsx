// src/app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { EB_Garamond } from "next/font/google"

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-garamond",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://thirdpath.cloud"),
  title: "Third Path — Psychology guides",
  description: "English psychology guides and practical online resources.",
  alternates: {
    canonical: "https://thirdpath.cloud",
    languages: { en: "https://thirdpath.cloud", "fr-FR": "https://troisiemechemin.fr" },
  },
  openGraph: {
    title: "Third Path — Psychology guides",
    description: "Practical, research-backed psychological guidance for personal growth and well-being.",
    url: "https://thirdpath.cloud",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col`}>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-header/95 backdrop-blur border-b border-muted shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide transition hover:text-accent hover:drop-shadow-[0_1px_0_rgba(124,58,237,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              thirdpath.cloud
            </Link>

            <nav className="flex gap-2 text-base" aria-label="Main navigation">
              {[
                { href: "/", label: "Home" },
                { href: "/boutique", label: "Store" },
                { href: "/articles", label: "Articles" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-accent hover:bg-accent/15 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transform-gpu"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-muted bg-background">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row md:justify-between items-center gap-4 text-sm text-center md:text-left">

            {/* Left links */}
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/mentions-legales" className="opacity-80 hover:opacity-100 transition">Legal Notice</Link>
              <Link href="/editorial-standards" className="opacity-80 hover:opacity-100 transition">Editorial Standards</Link>
              <Link href="/about-us" className="opacity-80 hover:opacity-100 transition">About Us</Link>
            </div>

            {/* Middle buttons */}
            <div className="flex gap-2">
              <a
                href="mailto:leo.gayrard@gmail.com"
                className="px-4 py-2 rounded bg-accent text-white text-sm font-medium transition hover:opacity-90"
              >
                Contact
              </a>
              <a
                href="https://www.troisiemechemin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-accent text-sm font-medium transition hover:bg-accent/10"
              >
                Vous parlez français ?
              </a>
            </div>

            {/* Right copyright */}
            <span className="opacity-60 text-sm mt-2 md:mt-0">
              © {new Date().getFullYear()} thirdpath.cloud — 1184 route de la Maurette, 83520 Roquebrune-sur-Argens, France
            </span>
          </div>
        </footer>

      </body>
    </html>
  )
}