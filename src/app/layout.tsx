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
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-lg font-semibold tracking-wide transition hover:text-accent hover:drop-shadow-[0_1px_0_rgba(124,58,237,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                thirdpath.cloud
              </Link>

              {/* Icônes sociales inline */}
              <div className="flex gap-3 items-center">
                <a aria-label="YouTube" href="https://www.youtube.com/@TroisiemeChemin" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                  <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a2.997 2.997 0 0 0-2.113-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.385.566a2.997 2.997 0 0 0-2.113 2.12A31.358 31.358 0 0 0 0 12a31.358 31.358 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.113 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.385-.566a2.997 2.997 0 0 0 2.113-2.12A31.358 31.358 0 0 0 24 12a31.358 31.358 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a aria-label="Instagram" href="https://www.instagram.com/troisiemechemin/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                  <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.622c-3.163 0-3.532.012-4.777.069-1.066.049-1.64.228-2.022.385-.51.198-.875.437-1.26.822-.385.385-.624.75-.822 1.26-.157.382-.336.956-.385 2.022-.057 1.245-.069 1.614-.069 4.777s.012 3.532.069 4.777c.049 1.066.228 1.64.385 2.022.198.51.437.875.822 1.26.385.385.75.624 1.26.822.382.157.956.336 2.022.385 1.245.057 1.614.069 4.777.069s3.532-.012 4.777-.069c1.066-.049 1.64-.228 2.022-.385.51-.198.875-.437 1.26-.822.385-.385.624-.75.822-1.26.157-.382.336-.956.385-2.022.057-1.245.069-1.614.069-4.777s-.012-3.532-.069-4.777c-.049-1.066-.228-1.64-.385-2.022-.198-.51-.437-.875-.822-1.26-.385-.385-.75-.624-1.26-.822-.382-.157-.956-.336-2.022-.385-1.245-.057-1.614-.069-4.777-.069zm0 3.905a5.932 5.932 0 1 1 0 11.863 5.932 5.932 0 0 1 0-11.863zm7.842-4.095a1.386 1.386 0 1 1-2.772 0 1.386 1.386 0 0 1 2.772 0z"/>
                  </svg>
                </a>

                <a aria-label="TikTok" href="https://www.tiktok.com/@troisieme_chemin" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                  <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.831 0h4.286a8.369 8.369 0 0 0 .053.962 4.835 4.835 0 0 0 1.146 2.618 4.899 4.899 0 0 0 3.277 1.613v4.27a9.658 9.658 0 0 1-3.644-.744c-.503-.21-.983-.467-1.433-.767v7.795a7.76 7.76 0 1 1-7.76-7.76 7.1 7.1 0 0 1 1.094.083v4.354a3.49 3.49 0 1 0 2.466 3.33V0z"/>
                  </svg>
                </a>

                <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61582137873180" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                  <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.314h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.676V1.325C24 .6 23.4 0 22.675 0z"/>
                  </svg>
                </a>
              </div>
            </div>

            <nav className="flex gap-2 text-base">
              {[
                { href: "/", label: "Home" },
                { href: "/boutique", label: "Store" },
                { href: "/therapies-groupe", label: "Group Therapy" },
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

        <main className="flex-1">{children}</main>

        <footer className="border-t border-muted bg-background">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm opacity-80">
            © {new Date().getFullYear()} thirdpath.cloud
          </div>
        </footer>
      </body>
    </html>
  )
}
