import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { dict } from '@/i18n/it'

export const metadata: Metadata = {
  title: 'Privacy Policy — Knowow',
  description: 'Informativa sul trattamento dei dati personali del sito knowow.tech.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.knowow.tech/privacy-policy' },
}

export default function PrivacyPolicyIt() {
  return (
    <LegalPage
      dict={dict}
      content={dict.legal.privacy}
      homeHref="/"
      switchHref="/en/privacy-policy"
      ctaHref="/#contatti"
    />
  )
}
