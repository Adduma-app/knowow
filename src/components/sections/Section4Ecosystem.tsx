'use client'

import { useEffect, useRef } from 'react'
import { ECOSYSTEM } from '@/constants/content'

export default function Section4Ecosystem() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const slidesRef  = useRef<HTMLDivElement>(null)
  const shapeRef   = useRef<HTMLDivElement>(null)
  const svgRef     = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const panelCount  = ECOSYSTEM.services.length
        const panelHeight = window.innerHeight * 0.6
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

        // ── Rotate the shape with scroll ───────────────────────────────
        gsap.to(shapeRef.current, {
          rotation: 720,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: 1,
          },
        })

        // ── Gradient morph: solid blue → blue/orange/violet gradient ───
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress // 0 → 1
            const svg = svgRef.current
            if (!svg) return

            const stop1 = svg.querySelector('#grad-stop1') as SVGStopElement
            const stop2 = svg.querySelector('#grad-stop2') as SVGStopElement
            const stop3 = svg.querySelector('#grad-stop3') as SVGStopElement

            if (stop1) {
              // Resta blu #2864EB → #2864EB
              stop1.setAttribute('stop-color', `rgb(40,100,235)`)
            }

            if (stop2) {
              // blu #2864EB → arancio #F5734B
              const r = Math.round(40 + (245 - 40) * p)
              const g = Math.round(100 + (115 - 100) * p)
              const b = Math.round(235 + (75 - 235) * p)
              stop2.setAttribute('stop-color', `rgb(${r},${g},${b})`)
            }

            if (stop3) {
              // Resta blu #2864EB → #2864EB
              stop3.setAttribute('stop-color', `rgb(40,100,235)`)
            }
          },
        })

        // ── Subtle pulsing ─────────────────────────────────────────────
        gsap.to(shapeRef.current, {
          scale: 1.06,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })

      }, wrapperRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  const logoPath = 'M392.6526864,253.7275366h-93.2539829l-1.673731-.0097594c-21.475482-.1236186-41.7538153-10.5043295-54.17586-27.6710521l-90.4758171-129.9329285H29.0820588c-4.3602949,8.3494765-5.207742,9.9722427-9.568037,18.3217192l93.7768499,134.6725881h85.4367317c27.3652586,0,53.1364877,13.1783955,68.8897289,35.1825098l85.2529304,122.4312302h123.9926684c4.3602827-8.3495258,5.2077066-9.9722619,9.5679893-18.3217877l-93.778234-134.6725196Z'

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
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
          >
            <span className="text-white">{ECOSYSTEM.h2line2a}</span>
            <span className="text-[#E9704D]">{ECOSYSTEM.h2accent}</span>
            <span className="text-white">{ECOSYSTEM.h2line2b}</span>
          </h2>
          <p className="text-sm leading-relaxed mt-6 max-w-2xl font-medium">
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
        {/* SVG Logo shape — posizionato in basso, sotto le slide */}
        <div
          ref={shapeRef}
          className="absolute z-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
          style={{
            left: '50%',
            bottom: '8%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative w-[50vw] ">
            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              className="w-full h-full svgDettaglio"
              style={{ opacity: 0.65 }}
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop id="grad-stop1" offset="0%"   stopColor="#2864EB" />
                  <stop id="grad-stop2" offset="50%"  stopColor="#2864EB" />
                  <stop id="grad-stop3" offset="100%" stopColor="#2864EB" />
                </linearGradient>
                <filter id="soft-edges" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                  <feComposite in="blur" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d={logoPath}
                fill="url(#logo-gradient)"
                stroke="none"
                filter="url(#soft-edges)"
              />
            </svg>
          </div>
        </div>

        {/* Slides container — scrolls upward OVER the shape */}
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
                <div
                  className={`eco-text absolute z-20 max-w-xs ${
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

                {/* I numeri ora usano mix-blend-mode per essere "illuminati" dall'SVG */}
                <span
                  className="absolute font-display font-black select-none pointer-events-none leading-none z-30 text-white/10"
                  style={{
                    fontSize: 'clamp(14rem, 36vw, 40rem)',
                    letterSpacing: '-0.05em',
                    bottom: 0,
                    left:  isEven ? 0    : 'auto',
                    right: isEven ? 'auto' : 0,
                    
                    /* EFFETTO GLASS ILLUMINATO */
    color: 'rgba(255, 255, 255, 0.08)', // Bianco molto tenue di base
    mixBlendMode: 'overlay',             // Fondamentale: reagisce ai colori sottostanti
    backdropFilter: 'blur(4px)',         // Opzionale: aggiunge l'effetto "glass" fisico
    WebkitBackdropFilter: 'blur(4px)',
                 
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