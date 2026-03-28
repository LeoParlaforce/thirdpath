import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. PROTECTION DES ROUTES "CLOUD" / "ADMIN"
  // Si l'utilisateur essaie d'accéder à /dashboard ou /admin sans cookie de session
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    const session = request.cookies.get('session-token')

    if (!session) {
      // Redirection vers la page de login si non authentifié
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 2. SÉCURITÉ : Ajouter des headers de sécurité à la volée
  const response = NextResponse.next()
  
  // Empêche l'affichage dans une iframe (protection contre le clickjacking)
  response.headers.set('X-Frame-Options', 'DENY')
  // Force le navigateur à respecter le type MIME (protection contre le sniffing)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}

// 3. CONFIGURATION DU MATCHER
// On définit ici précisément quelles routes le middleware doit surveiller
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (routes API)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (icône)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}