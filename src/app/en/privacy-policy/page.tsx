import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { dict } from '@/i18n/en'

export const metadata: Metadata = {
  title: 'Privacy Policy — Knowow',
  description: 'How personal data is processed on knowow.tech.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.knowow.tech/en/privacy-policy' },
}

export default function PrivacyPolicyEn() {
  return (
    <LegalPage
      dict={dict}
      content={dict.legal.privacy}
      homeHref="/en"
      switchHref="/privacy-policy"
      ctaHref="/en#contatti"
    />
  )
}
