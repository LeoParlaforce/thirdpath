// src/app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { EB_Garamond } from "next/font/google"

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 bg-header/95 backdrop-blur border-b border-muted shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-wide transition hover:text-accent">
              Third Path
            </a>
            <nav className="flex gap-2 text-base">
              <a href="/" className="px-3 py-1.5 rounded-md hover:text-accent">Home</a>
              <a href="/boutique" className="px-3 py-1.5 rounded-md hover:text-accent">Store</a>
              <a href="/therapies-groupe" className="px-3 py-1.5 rounded-md hover:text-accent">Group Therapy</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-muted bg-background">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm opacity-80">
            © {new Date().getFullYear()} Third Path
          </div>
        </footer>
      </body>
    </html>
  )
}
