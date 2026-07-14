'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { dict as itDict } from '@/i18n/it'
import { dict as enDict } from '@/i18n/en'
import { readConsent, writeConsent, OPEN_PREFS_EVENT } from '@/lib/consent'
import { SiteButton } from '@/components/ui/Button'

// ─── Banner cookie + pannello preferenze ─────────────────────────────────────
// - Appare al primo accesso (nessun cookie `knowow_consent`).
// - "Accetta tutti" / "Rifiuta" registrano la scelta e chiudono.
// - "Personalizza" apre i toggle per categoria.
// - Riapribile in ogni momento dal link "Gestisci cookie" nel footer
//   (evento window `knowow:open-cookie-prefs`).
export default function CookieBanner() {
  const pathname = usePathname()
  const t = (pathname?.startsWith('/en') ? enDict : itDict).cookie

  const [open, setOpen] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  // Al mount decidiamo se mostrare il banner (solo se non c'è già una scelta).
  useEffect(() => {
    const existing = readConsent()
    if (!existing) {
      setOpen(true)
    } else {
      setAnalytics(existing.analytics)
    }
    const reopen = () => {
      const cur = readConsent()
      setAnalytics(cur?.analytics ?? false)
      setCustomizing(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_PREFS_EVENT, reopen)
    return () => window.removeEventListener(OPEN_PREFS_EVENT, reopen)
  }, [])

  if (!open) return null

  const close = () => {
    setOpen(false)
    setCustomizing(false)
  }

  const acceptAll = () => {
    writeConsent(true)
    close()
  }
  const rejectAll = () => {
    writeConsent(false)
    close()
  }
  const saveChoice = () => {
    writeConsent(analytics)
    close()
  }

  const policyHref = pathname?.startsWith('/en') ? '/en/cookie-policy' : '/cookie-policy'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-[200] p-4 sm:p-6"
    >
      <div
        className="mx-auto max-w-2xl bg-[#0F1120] shadow-2xl p-6 md:p-8"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
      >
        <h2 className="text-white text-lg font-medium mb-2">{t.title}</h2>
        <p className="text-sm text-white/60 leading-relaxed">
          {t.body}{' '}
          <a href={policyHref} className="text-[#E9704D] hover:underline">
            {t.readMore}
          </a>
        </p>

        {customizing && (
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4 bg-white/[0.03] p-4">
              <div>
                <p className="text-sm text-white/80">{t.necessaryTitle}</p>
                <p className="text-xs text-white/40 mt-0.5">{t.necessaryDesc}</p>
              </div>
              <span className="text-xs text-white/40 shrink-0 mt-0.5">{t.alwaysOn}</span>
            </div>
            <label className="flex items-start justify-between gap-4 bg-white/[0.03] p-4 cursor-pointer">
              <div>
                <p className="text-sm text-white/80">{t.analyticsTitle}</p>
                <p className="text-xs text-white/40 mt-0.5">{t.analyticsDesc}</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#E9704D]"
                aria-label={t.analyticsTitle}
              />
            </label>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end sm:items-center">
          {!customizing ? (
            <SiteButton variant="ghost" clip="bl" onClick={() => setCustomizing(true)}>
              {t.customize}
            </SiteButton>
          ) : (
            <SiteButton variant="ghost" clip="bl" onClick={saveChoice}>
              {t.save}
            </SiteButton>
          )}
          <SiteButton variant="ghost" clip="bl" onClick={rejectAll}>
            {t.reject}
          </SiteButton>
          <SiteButton variant="primary" clip="bl" onClick={acceptAll}>
            {t.acceptAll}
          </SiteButton>
        </div>
      </div>
    </div>
  )
}
