import type { Metadata } from 'next'
import PartnerContent from '@/components/partner/PartnerContent'
import { dict } from '@/i18n/en'

export const metadata: Metadata = {
  title: `${dict.partner.h1Line1} ${dict.partner.h1Line2} — Knowow`,
  description: dict.partner.body,
}

export default function PartnerPageEn() {
  return (
    <PartnerContent
      dict={dict}
      homeHref="/en"
      switchHref="/partner"
      ctaHref="/en#contatti"
    />
  )
}
