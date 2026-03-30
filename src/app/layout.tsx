import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { EB_Garamond } from "next/font/google"
import Script from "next/script"

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-garamond",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://thirdpath.cloud"),
  title: {
    default: "Third Path — Psychology Guides",
    template: "%s | Third Path"
  },
  description: "Practical, research-backed psychological guidance for personal growth and well-being. Written by a licensed psychologist.",
  alternates: {
    canonical: "https://thirdpath.cloud",
    languages: {
      en: "https://thirdpath.cloud",
      "fr-FR": "https://troisiemechemin.fr"
    },
  },
  openGraph: {
    title: "Third Path — Psychology Guides",
    description: "Practical, research-backed psychological guidance for personal growth and well-being.",
    url: "https://thirdpath.cloud",
    siteName: "Third Path",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://thirdpath.cloud/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Third Path — Psychology",
    description: "Research-backed psychology guides by a licensed psychologist.",
    images: ["https://thirdpath.cloud/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const grainBg = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://thirdpath.cloud/#organization",
        "name": "Third Path",
        "url": "https://thirdpath.cloud",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://thirdpath.cloud/#logo",
          "url": "https://thirdpath.cloud/logo.png",
        },
        "description": "Practical, research-backed psychological guidance and resources.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1184 route de la Maurette",
          "addressLocality": "Roquebrune-sur-Argens",
          "postalCode": "83520",
          "addressCountry": "FR"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "leo.gayrard@gmail.com",
          "contactType": "customer support"
        },
        "sameAs": [
          "https://parlaforce.com",
          "https://troisiemechemin.fr",
          "https://chat.troisiemechemin.fr"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://thirdpath.cloud/#website",
        "url": "https://thirdpath.cloud",
        "name": "Third Path",
        "description": "Practical, research-backed psychological guidance for personal growth.",
        "publisher": { "@id": "https://thirdpath.cloud/#organization" },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://thirdpath.cloud/articles?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "@id": "https://thirdpath.cloud/#author",
        "name": "Leo Gayrard",
        "jobTitle": "Licensed Psychologist",
        "url": "https://thirdpath.cloud",
        "worksFor": { "@id": "https://thirdpath.cloud/#organization" },
        "knowsAbout": ["Psychology", "Clinical Therapy", "Self-esteem", "Anxiety", "Depression", "ADHD"],
        "sameAs": [
          "https://parlaforce.com/#author",
          "https://troisiemechemin.fr"
        ]
      }
    ]
  }

  return (
    <html lang="en" className="overflow-x-hidden w-full" style={{ colorScheme: 'light' }}>
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col overflow-x-hidden w-full antialiased text-slate-900`}>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QYNZ30WC5X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QYNZ30WC5X', { page_path: window.location.pathname });
          `}
        </Script>

        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={grainBg} aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded text-slate-900"
            >
              thirdpath.cloud
            </Link>

            <nav aria-label="Main navigation" className="flex gap-1 md:gap-2 text-base">
              {[
                { href: "/", label: "Home" },
                { href: "/boutique", label: "Store" },
                { href: "/articles", label: "Articles" },
                { href: "/for-therapists", label: "Therapists" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-2 md:px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-blue-700 hover:bg-blue-50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 transform-gpu text-slate-900 font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* FIX MOBILE LISIBILITÉ : fond blanc semi-transparent sur mobile pour que les textes
            slate-900 soient lisibles sur le fond marbre sombre.
            Sur desktop, transparent pour laisser passer le fond marbre. */}
        <div className="flex-1 w-full max-w-full relative z-0 bg-white/85 md:bg-transparent">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="relative border-t border-slate-200 bg-white overflow-hidden text-slate-900" role="contentinfo">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={grainBg} aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row md:justify-between items-center gap-8 text-sm text-center md:text-left">

            <nav aria-label="Legal navigation">
              <ul className="flex flex-col md:flex-row gap-4 md:gap-6 list-none p-0">
                <li><Link href="/mentions-legales" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">Legal Notice</Link></li>
                <li><Link href="/editorial-standards" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">Editorial Standards</Link></li>
                <li><Link href="/about-us" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">About Us</Link></li>
                <li><Link href="/for-therapists" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">For Therapists</Link></li>
              </ul>
            </nav>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:leo.gayrard@gmail.com"
                className="px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-bold transition hover:bg-blue-600 shadow-sm"
              >
                Contact
              </a>
              <a
                href="https://www.troisiemechemin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-slate-300 bg-slate-50 text-slate-700 text-sm font-medium transition hover:bg-white"
              >
                Vous parlez le français ?
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="opacity-60 text-[10px] uppercase tracking-widest font-sans">
                © {new Date().getFullYear()} thirdpath.cloud
              </span>
              <span className="opacity-40 text-[9px] font-sans">
                Leo Gayrard · Licensed Psychologist · Roquebrune-sur-Argens, France
              </span>
            </div>
          </div>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
