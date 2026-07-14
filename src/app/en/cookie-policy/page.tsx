import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { dict } from '@/i18n/en'

export const metadata: Metadata = {
  title: 'Cookie Policy — Knowow',
  description: 'Cookies used by knowow.tech.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.knowow.tech/en/cookie-policy' },
}

export default function CookiePolicyEn() {
  return (
    <LegalPage
      dict={dict}
      content={dict.legal.cookiePolicy}
      homeHref="/en"
      switchHref="/cookie-policy"
      ctaHref="/en#contatti"
    />
  )
}
