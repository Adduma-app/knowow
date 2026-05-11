import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Section1WhyFFTM from '@/components/sections/Section1WhyFFTM'
import Section2HowToUse from '@/components/sections/Section2HowToUse'
import Section3Sectors from '@/components/sections/Section3Sectors'
import Section5About from '@/components/sections/Section5About'
import CTAFinal from '@/components/sections/CTAFinal'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { dict } from '@/i18n/en'

export const metadata: Metadata = {
  title: dict.meta.title,
  description: dict.meta.description,
  keywords: dict.meta.keywords,
  openGraph: {
    title: dict.meta.ogTitle,
    description: dict.meta.ogDescription,
    url: dict.meta.canonical,
    siteName: 'Knowow',
    locale: dict.meta.ogLocale,
    type: 'website',
  },
  alternates: {
    canonical: dict.meta.canonical,
    languages: {
      it: 'https://www.knowow.tech',
      en: 'https://www.knowow.tech/en',
    },
  },
}

export default function HomeEn() {
  return (
    <>
      <AnimatedBackground />

      <main className="relative z-10 min-h-screen overflow-x-clip" lang="en">
        <Navbar
          dict={dict.navbar}
          navLinks={dict.navLinks}
          homeHref="/en"
          switchHref="/"
          ctaHref="/en#contatti"
        />
        <Hero dict={dict.hero} />

        <Section1WhyFFTM dict={dict.whyFftm} extras={dict.whyFftmExtras} technologyHref="/en/technology" />
        <Section2HowToUse dict={dict.howToUse} />
        <Section3Sectors dict={dict.sectors} />
        <Section5About dict={dict.about} />
        <CTAFinal dict={dict.cta} />
        <Footer dict={dict.footer} />
      </main>
    </>
  )
}
