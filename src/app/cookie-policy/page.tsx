import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { dict } from '@/i18n/it'

export const metadata: Metadata = {
  title: 'Cookie Policy — Knowow',
  description: 'Informativa sui cookie utilizzati dal sito knowow.tech.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.knowow.tech/cookie-policy' },
}

export default function CookiePolicyIt() {
  return (
    <LegalPage
      dict={dict}
      content={dict.legal.cookiePolicy}
      homeHref="/"
      switchHref="/en/cookie-policy"
      ctaHref="/#contatti"
    />
  )
}
