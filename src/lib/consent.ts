// ─── Gestione consenso cookie ───────────────────────────────────────────────
// Modello leggero, senza dipendenze esterne. Il consenso viene salvato in un
// cookie di prima parte `knowow_consent` (durata 6 mesi, come raccomandato dal
// Garante Privacy) e propagato a Google tramite Consent Mode v2.
//
// Categorie:
//   - necessary: sempre attivi (cookie tecnici, es. `knowow_lang`). Non richiedono consenso.
//   - analytics: Google Analytics 4. Attivi SOLO dopo consenso esplicito.

export const CONSENT_COOKIE = 'knowow_consent'
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180 // 180 giorni

export type ConsentState = {
  necessary: true
  analytics: boolean
  ts: number
}

// Evento custom usato dal footer per riaprire il pannello preferenze.
export const OPEN_PREFS_EVENT = 'knowow:open-cookie-prefs'

declare global {
  interface Window {
    // Definita da ConsentInit (Consent Mode v2)
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Legge lo stato di consenso dal cookie di prima parte. `null` se l'utente non ha ancora scelto. */
export function readConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]+)`))
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as Partial<ConsentState>
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      ts: typeof parsed.ts === 'number' ? parsed.ts : 0,
    }
  } catch {
    return null
  }
}

/** Propaga la scelta a Google Consent Mode v2. */
export function updateGoogleConsent(analytics: boolean): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const value = analytics ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    analytics_storage: value,
    // knowow non usa (ancora) advertising: teniamo negato per correttezza.
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

/** Salva la scelta nel cookie e aggiorna il Consent Mode. */
export function writeConsent(analytics: boolean): ConsentState {
  const state: ConsentState = { necessary: true, analytics, ts: Date.now() }
  if (typeof document !== 'undefined') {
    const value = encodeURIComponent(JSON.stringify(state))
    document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`
  }
  updateGoogleConsent(analytics)
  return state
}
