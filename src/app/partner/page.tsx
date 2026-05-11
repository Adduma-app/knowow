import PartnerContent from '@/components/partner/PartnerContent'
import { dict } from '@/i18n/it'

export default function PartnerPage() {
  return (
    <PartnerContent
      dict={dict}
      homeHref="/"
      switchHref="/en/partner"
      ctaHref="/#contatti"
    />
  )
}
