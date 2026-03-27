import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { EB_Garamond } from "next/font/google"
import Script from "next/script"

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-garamond",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://thirdpath.cloud"),
  title: {
    default: "Third Path — Psychology guides",
    template: "%s | Third Path"
  },
  description: "English psychology guides and practical online resources.",
  alternates: {
    canonical: "https://thirdpath.cloud",
    languages: { en: "https://thirdpath.cloud", "fr-FR": "https://troisiemechemin.fr" },
  },
  openGraph: {
    title: "Third Path — Psychology guides",
    description: "Practical, research-backed psychological guidance for personal growth and well-being.",
    url: "https://thirdpath.cloud",
    siteName: "Third Path",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Définition de la texture grainée subtile
const grainBg = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden w-full">
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden w-full antialiased`}>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QYNZ30WC5X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QYNZ30WC5X');
          `}
        </Script>

        {/* Header avec grain */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={grainBg}></div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
            >
              thirdpath.cloud
            </Link>

            <nav className="flex gap-1 md:gap-2 text-base" aria-label="Main navigation">
              {[
                { href: "/", label: "Home" },
                { href: "/boutique", label: "Store" },
                { href: "/articles", label: "Articles" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-2 md:px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-blue-700 hover:bg-blue-50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 transform-gpu"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full max-w-full">{children}</main>

        {/* Footer avec grain */}
        <footer className="relative border-t border-slate-200 bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={grainBg}></div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row md:justify-between items-center gap-4 text-sm text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/mentions-legales" className="opacity-80 hover:opacity-100 transition">Legal Notice</Link>
              <Link href="/editorial-standards" className="opacity-80 hover:opacity-100 transition">Editorial Standards</Link>
              <Link href="/about-us" className="opacity-80 hover:opacity-100 transition">About Us</Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a href="mailto:leo.gayrard@gmail.com" className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium transition hover:bg-blue-700">Contact</a>
              <a href="https://www.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded border border-blue-600 text-blue-700 text-sm font-medium transition hover:bg-blue-50">Vous parlez le français ?</a>
            </div>

            <span className="opacity-60 text-sm mt-2 md:mt-0">
              © {new Date().getFullYear()} thirdpath.cloud — 1184 route de la Maurette, 83520 Roquebrune-sur-Argens, France
            </span>
          </div>
        </footer>

        {/* Données structurées JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Third Path",
              "url": "https://thirdpath.cloud",
              "founder": {
                "@type": "Person",
                "name": "Leo Gayrard",
                "jobTitle": "Licensed Psychologist",
                "sameAs": [
                  "https://www.troisiemechemin.fr",
                  "https://parlaforce.com"
                ]
              },
              "description": "Practical, research-backed psychological guidance and resources.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1184 route de la Maurette",
                "addressLocality": "Roquebrune-sur-Argens",
                "postalCode": "83520",
                "addressCountry": "FR"
              }
            })
          }}
        />
      </body>
    </html>
  )
}