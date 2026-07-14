import Script from 'next/script'

// ─── Google Analytics 4 (con Consent Mode v2) ────────────────────────────────
// gtag.js viene caricato solo se è configurato NEXT_PUBLIC_GA_ID.
// Grazie a ConsentInit (default: denied), GA parte in modalità "consent mode":
// NON scrive cookie e NON invia dati identificativi finché l'utente non
// acconsente dal banner. Il consenso viene poi propagato via updateGoogleConsent().
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="knowow-ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
