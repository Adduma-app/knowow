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
 *
 * Layout alternates per panel:
 *   Even (0, 2): text top-left  + icon centre
 *   Odd  (1, 3): text bottom-right + icon centre
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
        const totalScroll = (panelCount - 1) * window.innerHeight

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

        // Text is always visible — the sliding panels (clipped by overflow:hidden
        // on the wrapper) create the natural entrance/exit effect. No extra animation needed.
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
        className="pt-24 md:pt-32 pb-16 px-6 md:px-16 lg:px-24 "
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
          <p className="text-white/50 text-sm leading-relaxed mt-6 max-w-2xl font-medium">
            {ECOSYSTEM.body}
          </p>
        </div>
      </div>

      {/* Sticky wrapper — pinned by GSAP */}
      <div
        ref={wrapperRef}
        className="relative h-[100vh]"
        style={{  overflow: 'hidden' }}
      >
        {/* Rotating favicon — always centred */}
        <div
          ref={faviconRef}
          className="absolute top-1/2 left-1/2 z-0 pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
          aria-hidden="true"
        >
          <div className="relative">
            {/* Ambient glow ring */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(59,97,171,0.6) 0%, rgba(233,112,77,0.3) 50%, transparent 70%)',
                transform: 'scale(2.5)',
              }}
            />
            <Image
              src="/favicon.webp"
              alt=""
              width={120}
              height={120}
              className="relative z-10 opacity-30"
              style={{
                width: 'clamp(80px, 10vw, 140px)',
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Slides container — scrolls upward */}
        <div
          ref={slidesRef}
          className="absolute inset-0 "
          style={{ willChange: 'transform' }}
        >
        {ECOSYSTEM.services.map((service, i) => {
            const isEven = i % 2 === 0

            return (
              <div
                key={service.num}
                className="eco-panel relative flex items-center justify-center h-[50vh]"
              >
                {/* Text block */}
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
                  <p className="text-micro text-[#E9704D]/60 ">{service.subtitle}</p>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">{service.text}</p>
                </div>

                {/* Large background number */}
                <span
                  className="absolute font-display font-black text-white/[0.03] select-none pointer-events-none leading-none"
                  style={{
                    fontSize: 'clamp(14rem, 36vw, 40rem)',
                    letterSpacing: '-0.05em',
                    bottom: 0,
                    left:   isEven ? 0    : 'auto',
                    right:  isEven ? 'auto' : 0,
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
