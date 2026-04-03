'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ECOSYSTEM } from '@/constants/content'

/**
 * Section4Ecosystem — GSAP Sticky Scroll Slider
 *
 * The wrapper is pinned for the entire scroll distance of all panels.
 * Inside, a slides container moves upward via scrub (smooth vertical slide).
 * The favicon is centred and rotates continuously with scroll progress.
 * Slides scroll OVER the fixed centred favicon.
 */
export default function Section4Ecosystem() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const slidesRef  = useRef<HTMLDivElement>(null)
  const faviconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const panelCount  = ECOSYSTEM.services.length
        const panelHeight = window.innerHeight * 0.6  // 60vh come le slide
        const totalScroll = (panelCount - 1) * panelHeight

        // ── Pin the whole section ──────────────────────────────────────
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        })

        // ── Slide panels up as user scrolls ───────────────────────────
        gsap.to(slidesRef.current, {
          y: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: 1,
          },
        })

        // ── Rotate the favicon with scroll progress ────────────────────
        gsap.to(faviconRef.current, {
          rotation: 720,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: 1,
          },
        })
      }, wrapperRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <>
      {/* Section header — outside the pinned area so it scrolls normally */}
      <div
        id="servizi"
        className="pt-24 md:pt-32 pb-16 px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-6xl mx-auto">
          <span className="text-micro text-[#E9704D] block mb-4">{ECOSYSTEM.h2line1}</span>
          <h2
            className="font-sans font-bold uppercase leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
          >
            <span className="text-white">{ECOSYSTEM.h2line2a}</span>
            <span className="text-[#E9704D]">{ECOSYSTEM.h2accent}</span>
            <span className="text-white">{ECOSYSTEM.h2line2b}</span>
          </h2>
          <p className=" text-sm leading-relaxed mt-6 max-w-2xl font-medium">
            {ECOSYSTEM.body}
          </p>
        </div>
      </div>

      {/* Sticky wrapper — pinned by GSAP */}
      <div
        ref={wrapperRef}
        className="relative h-[100vh]"
        style={{ overflow: 'hidden' }}
      >
        {/* Favicon — centrato e fisso, Z sotto le slide */}
        <div
          ref={faviconRef}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="relative">
            {/* Ambient glow ring */}
            <div
              className="absolute -inset-16 rounded-full blur-3xl opacity-25"
              style={{ background: 'radial-gradient(circle, rgba(233,112,77,0.35), transparent 70%)' }}
            />
            <Image
              src="/favicon.webp"
              alt=""
              width={400}
              height={400}
              className="relative object-contain w-[45vw]  h-auto"
            />
          </div>
        </div>

        {/* Slides container — scrolls upward OVER the favicon */}
        <div
          ref={slidesRef}
          className="absolute inset-0 z-10"
          style={{ willChange: 'transform' }}
        >
          {ECOSYSTEM.services.map((service, i) => {
            const isEven = i % 2 === 0

            return (
              <div
                key={service.num}
                className="eco-panel relative flex items-center justify-center h-[60vh]"
              >
                {/* Text block — posizionato ai lati per non coprire la favicon */}
                <div
                  className={`eco-text absolute z-10 max-w-xs ${
                    isEven
                      ? 'top-14 right-6 md:right-16 lg:right-24 text-right'
                      : 'top-14 left-6 md:left-16 lg:left-24'
                  }`}
                >
                  <h3
                    className="font-sans font-bold uppercase text-white leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', letterSpacing: '-0.01em' }}
                  >
                    {service.title}
                  </h3>
                  <p className="tracking-widest uppercase text-xs text-[#E9704D]">{service.subtitle}</p>
                  <p className="text-sm text-white leading-relaxed font-medium">{service.text}</p>
                </div>

                {/* Large background number — semi-trasparente */}
                <span
                  className="absolute font-display font-black text-white/[0.03] select-none pointer-events-none leading-none z-10"
                  style={{
                    fontSize: 'clamp(14rem, 36vw, 40rem)',
                    letterSpacing: '-0.05em',
                    bottom: 0,
                    left:  isEven ? 0    : 'auto',
                    right: isEven ? 'auto' : 0,
                  }}
                  aria-hidden="true"
                >
                  {service.num.replace('.', '')}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}