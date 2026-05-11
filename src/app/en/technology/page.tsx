import type { Metadata } from 'next'
import TechnologyContent from '@/components/technology/TechnologyContent'
import { dict } from '@/i18n/en'

export const metadata: Metadata = {
  title: `${dict.technology.h1Line1} ${dict.technology.h1Line2} — Knowow`,
  description: dict.technology.body,
}

export default function TechnologyPageEn() {
  return (
    <TechnologyContent
      dict={dict}
      homeHref="/en"
      switchHref="/technology"
      ctaHref="/en#contatti"
    />
  )
}
