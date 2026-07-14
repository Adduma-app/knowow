'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dict as itDict } from '@/i18n/it'
import { dict as enDict } from '@/i18n/en'
import { OPEN_PREFS_EVENT } from '@/lib/consent'

// Link legali + riapertura preferenze cookie. Client component così può leggere
// la lingua dalla URL e riaprire il banner tramite evento window.
export default function FooterLegal() {
  const pathname = usePathname()
  const isEn = pathname?.startsWith('/en') ?? false
  const f = (isEn ? enDict : itDict).footer
  const prefix = isEn ? '/en' : ''

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/40">
      <Link href={`${prefix}/privacy-policy`} className="hover:text-white transition-colors">
        {f.privacyLabel}
      </Link>
      <Link href={`${prefix}/cookie-policy`} className="hover:text-white transition-colors">
        {f.cookieLabel}
      </Link>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
        className="hover:text-white transition-colors"
      >
        {f.manageCookies}
      </button>
    </div>
  )
}
