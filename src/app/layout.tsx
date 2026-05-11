import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'
import { dict as itDict } from '@/i18n/it'

export const metadata: Metadata = {
  title: itDict.meta.title,
  description: itDict.meta.description,
  keywords: itDict.meta.keywords,
  openGraph: {
    title: itDict.meta.ogTitle,
    description: itDict.meta.ogDescription,
    url: 'https://www.knowow.tech',
    siteName: 'Knowow',
    locale: itDict.meta.ogLocale,
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: itDict.meta.canonical,
    languages: {
      it: 'https://www.knowow.tech',
      en: 'https://www.knowow.tech/en',
    },
  },
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.knowow.tech/#organization',
      name: 'Knowow s.r.l.',
      url: 'https://www.knowow.tech',
      logo: 'https://www.knowow.tech/images/logo.png',
      description: itDict.jsonLd.orgDescription,
      foundingOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'Università di Messina',
      },
      sameAs: ['https://www.knowow.tech'],
    },
    {
      '@type': 'Service',
      '@id': 'https://www.knowow.tech/#fftm',
      name: 'FFTM — Fast Fatigue Testing Technology',
      provider: { '@id': 'https://www.knowow.tech/#organization' },
      description: itDict.jsonLd.fftmDescription,
      serviceType: 'Material Testing',
      areaServed: itDict.jsonLd.areaServed,
    },
    {
      '@type': 'Service',
      '@id': 'https://www.knowow.tech/#fqct',
      name: 'FQCT — Fast Quality Control Technology',
      provider: { '@id': 'https://www.knowow.tech/#organization' },
      description: itDict.jsonLd.fqctDescription,
      serviceType: 'Quality Control',
    },
  ],
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={itDict.htmlLang} className="h-full" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-full" suppressHydrationWarning>
      <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
