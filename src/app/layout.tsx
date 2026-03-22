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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const footerLinks = [
    { href: "/mentions-legales", label: "Legal Notice" },
    { href: "/editorial-standards", label: "Editorial Standards" },
    { href: "/about-us", label: "About Us" },
  ]

  const headerLinks = [
    { href: "/", label: "Home" },
    { href: "/boutique", label: "Store" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <html lang="en">
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-header/95 backdrop-blur border-b border-muted shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-lg font-semibold tracking-wide transition hover:text-accent hover:drop-shadow-[0_1px_0_rgba(124,58,237,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                thirdpath.cloud
              </Link>
            </div>

            <nav aria-label="Main navigation" className="flex gap-2 text-base">
              {headerLinks.map((l) => (
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
        <footer aria-label="Site footer" className="border-t border-muted bg-background">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm flex flex-wrap md:flex-nowrap md:justify-between items-center gap-4">
            
            {/* Footer links */}
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="opacity-80 hover:opacity-100 transition"
              >
                {l.label}
              </Link>
            ))}

            {/* Contact button */}
            <a
              href="mailto:leo.gayrard@gmail.com"
              className="px-4 py-2 rounded bg-accent text-white text-sm font-medium transition hover:opacity-90"
            >
              Contact
            </a>

            {/* French site link */}
            <a
              href="https://www.troisiemechemin.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-accent text-sm font-medium transition hover:bg-accent/10"
            >
              Vous parlez français ?
            </a>

            {/* Copyright */}
            <span className="opacity-60 text-sm mt-2 md:mt-0">
              © {new Date().getFullYear()} thirdpath.cloud
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}