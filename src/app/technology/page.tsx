import TechnologyContent from '@/components/technology/TechnologyContent'
import { dict } from '@/i18n/it'

export default function TechnologyPage() {
  return (
    <TechnologyContent
      dict={dict}
      homeHref="/"
      switchHref="/en/technology"
      ctaHref="/#contatti"
    />
  )
}
