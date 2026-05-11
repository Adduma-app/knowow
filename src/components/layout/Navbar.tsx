'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SiteButton } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/it'

interface NavbarProps {
  dict: Dictionary['navbar']
  navLinks: Dictionary['navLinks']
  homeHref: string
  switchHref: string
  ctaHref: string
}

export default function Navbar({ dict, navLinks, homeHref, switchHref, ctaHref }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.includes('#') && !href.startsWith('http')) {
      const hash = href.split('#')[1]
      if (hash) {
        const target = document.querySelector('#' + hash) as HTMLElement | null
        if (target) {
          target.setAttribute('tabindex', '-1')
          target.focus({ preventScroll: false })
        }
      }
    }
  }

  // Quando l'utente clicca il selettore IT/EN, memorizziamo la scelta in un
  // cookie così le visite future rispettano la sua preferenza (vince sulla
  // geolocalizzazione IP del proxy).
  const handleLanguageSwitch = () => {
    const lang = switchHref.startsWith('/en') ? 'en' : 'it'
    document.cookie = `knowow_lang=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`
  }

  return (
    <nav
      role="navigation"
      aria-label={dict.ariaNavigation}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[#17192D]/95 backdrop-blur-md border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div
        className="flex items-center justify-between py-2 md:py-4 navbar-safe"
        style={{ paddingLeft: 'max(1.5rem, env(safe-area-inset-left))', paddingRight: 'max(1.5rem, env(safe-area-inset-right))' }}
      >
        {/* Logo */}
        <a href={homeHref} aria-label={dict.ariaLogoHome} className="flex items-center">
          <Image
            src="/images/logo_footer_knowowcompleto.svg"
            alt="Knowow"
            width={120}
            height={32}
            className="h-6 xl:h-10"
            style={{ width: 'auto' }}
            quality={90}
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 2xl:gap-12" role="list">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              role="listitem"
              className="text-[10px] 2xl:text-xs uppercase tracking-widest text-center text-white/65 hover:text-white transition-colors w-auto"
              aria-label={dict.ariaSection.replace('{name}', link.label)}
              style={{ width: 'min-content' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right cluster: CTA + language switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <SiteButton href={ctaHref} variant="primary" clip="bl" aria-label={dict.ariaCta}>
            {dict.cta}
          </SiteButton>
          <a
            href={switchHref}
            onClick={handleLanguageSwitch}
            aria-label={dict.ariaSwitchToOther}
            className="text-[10px] 2xl:text-xs uppercase tracking-widest text-white/65 hover:text-white transition-colors border border-white/15 px-2 py-1"
          >
            {dict.switchToOther}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[7px] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? dict.closeMenu : dict.openMenu}
        >
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden bg-[#17192D] border-t border-white/[0.05] overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col px-6 py-6 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-widest text-white/65 hover:text-white transition-colors"
              onClick={() => handleNavClick(link.href)}
              aria-label={dict.ariaSection.replace('{name}', link.label)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="border border-[#E9704D] text-[#E9704D] text-xs uppercase tracking-widest px-5 py-3 text-center hover:bg-[#E9704D] hover:text-white transition-all mt-2"
            onClick={() => setIsOpen(false)}
            aria-label={dict.ariaCta}
          >
            {dict.cta}
          </a>
          <a
            href={switchHref}
            onClick={handleLanguageSwitch}
            aria-label={dict.ariaSwitchToOther}
            className="text-xs uppercase tracking-widest text-white/50 text-center border border-white/15 px-3 py-2"
          >
            {dict.switchToOther}
          </a>
        </div>
      </div>
    </nav>
  )
}
