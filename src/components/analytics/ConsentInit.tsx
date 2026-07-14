import Script from 'next/script'

// ─── Consent Mode v2 — default DENIED ────────────────────────────────────────
// Questo script DEVE essere eseguito PRIMA di gtag.js (GoogleAnalytics.tsx).
// Imposta tutti i consensi di profilazione a "denied" per default, così Google
// Analytics non scrive alcun cookie finché l'utente non acconsente dal banner.
// Se l'utente ha già scelto in una visita precedente, ri-applichiamo subito la
// sua preferenza leggendo il cookie `knowow_consent`.
export default function ConsentInit() {
  return (
    <Script id="knowow-consent-init" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        });
        try {
          var m = document.cookie.match(/(?:^|; )knowow_consent=([^;]+)/);
          if (m) {
            var c = JSON.parse(decodeURIComponent(m[1]));
            if (c && c.analytics) {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          }
        } catch (e) {}
      `}
    </Script>
  )
}
