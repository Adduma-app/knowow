import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import Section4Ecosystem from '@/components/sections/Section4Ecosystem'
import CTAFinal from '@/components/sections/CTAFinal'
import { dict } from '@/i18n/en'

export const metadata: Metadata = {
  title: dict.meta.pageProdottiTitle,
  description: dict.meta.pageProdottiDescription,
}

export default function ProdottiServiziPageEn() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen overflow-x-clip">
        <Navbar
          dict={dict.navbar}
          navLinks={dict.navLinks}
          homeHref="/en"
          switchHref="/prodotti-e-servizi"
          ctaHref="/en#contatti"
        />
        <Section4Ecosystem dict={dict.ecosystem} extras={dict.ecosystemExtras} />
        <CTAFinal dict={dict.cta} />
        <Footer dict={dict.footer} />
      </main>
    </>
  )
}
