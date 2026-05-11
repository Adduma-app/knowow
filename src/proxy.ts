// ─── Proxy (middleware in Next ≤15) ─────────────────────────────────────────
// Auto-redirect per lingua basato su:
//   1. Cookie 'knowow_lang' impostato dal selettore IT/EN nella Navbar
//      (scelta esplicita dell'utente, ha sempre la precedenza)
//   2. Header 'x-vercel-ip-country' che Vercel inietta gratis su ogni request
//      (rileva il paese da cui arriva l'IP)
//
// Comportamento:
//   - Il redirect agisce SOLO sulla home "/" — gli altri URL sono rispettati
//     così come l'utente li digita o ci arriva da Google
//   - Italia (o paese sconosciuto) → resta in italiano
//   - Tutti gli altri paesi → redirect a /en
//   - Se l'utente ha già scelto la lingua dal selettore, quella scelta vince
//     su tutto (anche se l'IP suggerirebbe altro)
//
// SEO: il redirect è 302 (temporaneo), e l'header Vary indica ai bot di Google
// che la risposta dipende dal cookie/header. I bot di Google quando accedono
// senza cookie ricevono la versione predefinita per il loro paese di crawling
// (di solito IT da datacenter US o EU), così entrambe le versioni vengono
// indicizzate correttamente via i link interni del sito.

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'knowow_lang'

// Quali path attivano il proxy.
// Escludiamo: _next/static, _next/image, api, file con estensione (immagini, video, font, ecc.),
// favicon, robots.txt, sitemap.xml
export const config = {
  matcher: ['/((?!_next|api|.*\\..*|robots\\.txt|sitemap\\.xml).*)'],
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Il redirect automatico si applica SOLO sulla home "/".
  // Sulle altre pagine, rispettiamo l'URL che l'utente ha digitato/cliccato.
  if (pathname !== '/') {
    return NextResponse.next()
  }

  // 1. Scelta esplicita dell'utente (cookie)
  const cookieLang = req.cookies.get(COOKIE_NAME)?.value

  if (cookieLang === 'it') {
    return NextResponse.next()
  }

  if (cookieLang === 'en') {
    const url = req.nextUrl.clone()
    url.pathname = '/en'
    return NextResponse.redirect(url, 302)
  }

  // 2. Nessuna scelta esplicita → leggi paese da header Vercel
  // Su ambiente locale (npm run dev) l'header non esiste, quindi country è null
  // → in dev e per gli IP italiani, restiamo in italiano
  const country = req.headers.get('x-vercel-ip-country')

  if (!country || country === 'IT') {
    return NextResponse.next()
  }

  // 3. Utente da paese non italiano → redirect a /en
  const url = req.nextUrl.clone()
  url.pathname = '/en'
  return NextResponse.redirect(url, 302)
}
