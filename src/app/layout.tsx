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
  title: "Third Path — Psychology guides and group sessions",
  description: "English psychology guides and online themed group sessions.",
  alternates: {
    canonical: "https://thirdpath.cloud",
    languages: { en: "https://thirdpath.cloud", "fr-FR": "https://troisiemechemin.fr" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 bg-header/95 backdrop-blur border-b border-muted shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide transition
                         hover:text-accent hover:drop-shadow-[0_1px_0_rgba(124,58,237,0.7)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              thirdpath.cloud
            </Link>
            <nav className="flex gap-2 text-base">
              {[
                { href: "/", label: "Home" },
                { href: "/boutique", label: "Store" },
                { href: "/therapies-groupe", label: "Group Therapy" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-1.5 rounded-md opacity-90 transition
                             hover:opacity-100 hover:text-accent hover:bg-accent/15 hover:-translate-y-0.5 hover:shadow-md
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                             transform-gpu"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-muted bg-background">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col items-center gap-3 text-sm opacity-80">
            <div className="flex gap-5">
              <a aria-label="YouTube" href="https://www.youtube.com/@TroisiemeChemin" target="_blank" rel="noopener noreferrer">
                <img src="/icons/youtube.svg" alt="YouTube" className="h-6 w-6 hover:opacity-70 transition" />
              </a>
              <a aria-label="Instagram" href="https://www.instagram.com/troisiemechemin/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6 hover:opacity-70 transition" />
              </a>
              <a aria-label="TikTok" href="https://www.tiktok.com/@troisieme_chemin" target="_blank" rel="noopener noreferrer">
                <img src="/icons/tiktok.svg" alt="TikTok" className="h-6 w-6 hover:opacity-70 transition" />
              </a>
              <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61582137873180" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6 hover:opacity-70 transition" />
              </a>
            </div>
            <div>© {new Date().getFullYear()} thirdpath.cloud</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
