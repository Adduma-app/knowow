'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { GlowCard } from '@/components/ui/GlowCard'
import CTAFinal from '@/components/sections/CTAFinal'
import ThermalChart from '@/components/ui/ThermalChart'
import SectionPerche from '@/components/sections/SectionPerche'

// ─── Constants ───────────────────────────────────────────────────────────────
const CHART_W = 462
const CHART_H = 582
const SCALE   = 1.28
const WRAP_W  = Math.round(CHART_W * SCALE)   // ≈ 591
const WRAP_H  = Math.round(CHART_H * SCALE)   // ≈ 745
const VIDEO_W = 660

// ─── Items ───────────────────────────────────────────────────────────────────
const ALL_ITEMS = [
  {
    num: '01',
    tag: 'Equipment',
    title: 'IR Camera',
    subtitle: 'Infrared Thermal Imaging',
    body: "Rileva l'evoluzione della temperatura superficiale del provino durante il test a fatica.",
    accent: '#E9704D',
    glowRGB: '233,112,77',
    videoSrc: null as string | null,
    posterSrc: null as string | null,
    videoLabel: null as string | null,
  },
  {
    num: '02',
    tag: 'Equipment',
    title: 'Digital Image Correlation',
    subtitle: 'Campo di deformazione superficiale',
    body: "Misura l'evoluzione della deformazione sulla superficie del provino durante il test di trazione statico.",
    accent: '#3B61AB',
    glowRGB: '59,97,171',
    videoSrc: null as string | null,
    posterSrc: null as string | null,
    videoLabel: null as string | null,
  },
  {
    num: '03',
    tag: 'Metodo / STM',
    title: 'Static Thermographic Method',
    subtitle: 'Tensione limite macroscopica',
    body: "Valutazione della tensione limite — la tensione macroscopica che induce il primo danno nel materiale.",
    accent: '#E9704D',
    glowRGB: '233,112,77',
    videoSrc: '/media/Knowow-Polyline.mp4',
    posterSrc: '/media/Still-Polyline.webp',
    videoLabel: 'Polyline Regression — STM output',
  },
  {
    num: '04',
    tag: 'Metodo / RTM',
    title: "Risitano's Thermographic Method",
    subtitle: 'Valutazione del limite a fatica',
    body: "Valutazione del limite a fatica tramite l'andamento della temperatura di stabilizzazione in funzione del livello di tensione applicato.",
    accent: '#3B61AB',
    glowRGB: '59,97,171',
    videoSrc: '/media/Knowow-Thermo.mp4',
    posterSrc: '/media/Still-Thermo.webp',
    videoLabel: 'Variazione Termica — RTM output',
  },
]

type Item = (typeof ALL_ITEMS)[number]

// ─── HUD Readouts ─────────────────────────────────────────────────────────────
const READOUTS = [
  { label: 'T_MAX',    val: '33.755 °C',   pos: { top: '8%',     left: '-20%' } as React.CSSProperties },
  { label: 'T_MIN',    val: '31.000 °C',   pos: { bottom: '22%', left: '-18%' } as React.CSSProperties },
  { label: 'METHOD',   val: 'RISITANO',    pos: { top: '42%',    left: '-19%' } as React.CSSProperties },
  { label: 'N_MAX',    val: '200 000 cyc', pos: { top: '14%',    right: '-19%' } as React.CSSProperties },
  { label: 'SPECIMEN', val: 'NOTCHED',     pos: { top: '42%',    right: '-20%' } as React.CSSProperties },
  { label: 'λ BAND',   val: 'IR 8–14 μm', pos: { bottom: '28%', right: '-18%' } as React.CSSProperties },
]

// ─── ChartEmbed ───────────────────────────────────────────────────────────────
function ChartEmbed() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center"
      style={{ width: WRAP_W, height: WRAP_H }}
    >
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ inset: '-30%', background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,97,171,0.28) 0%, rgba(233,112,77,0.07) 55%, transparent 75%)', filter: 'blur(48px)', zIndex: 0 }} />
      {/* Corner brackets */}
      {[
        { pos: { top: 0, left: 0 },   d: 'M1 28 L1 1 L28 1',  dot: [0,0],   c: '#E9704D' },
        { pos: { top: 0, right: 0 },  d: 'M0 1 L27 1 L27 28', dot: [25,0],  c: '#E9704D' },
        { pos: { bottom: 0, left: 0 },d: 'M1 0 L1 27 L28 27', dot: [0,25],  c: '#3B61AB' },
        { pos: { bottom: 0, right: 0},d: 'M28 0 L27 27 L0 27',dot: [25,25], c: '#3B61AB' },
      ].map(({ pos, d, dot, c }) => (
        <div key={d} aria-hidden="true" className="absolute pointer-events-none z-20" style={pos}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d={d} stroke={c} strokeWidth="1.2" strokeOpacity="0.7" />
            <rect x={dot[0]} y={dot[1]} width="3" height="3" fill={c} fillOpacity="0.9" />
          </svg>
        </div>
      ))}
      {/* HUD readouts */}
      {READOUTS.map(({ label, val, pos }) => (
        <motion.div key={label} aria-hidden="true" className="absolute pointer-events-none z-20 font-mono" style={pos}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.9 }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(180,210,255,0.35)', textTransform: 'uppercase', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{label}</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(200,230,255,0.6)', fontWeight: 600, whiteSpace: 'nowrap' }}>{val}</div>
        </motion.div>
      ))}
      {/* Tick lines */}
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '8%',    left: '-2%',  width: '4%', height: '1px', background: 'rgba(233,112,77,0.2)' }} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ bottom: '22%',left: '-2%',  width: '4%', height: '1px', background: 'rgba(59,97,171,0.2)'  }} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '42%',   left: '-2%',  width: '4%', height: '1px', background: 'rgba(180,210,255,0.15)'}} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '14%',   right: '-2%', width: '4%', height: '1px', background: 'rgba(59,97,171,0.2)'  }} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '42%',   right: '-2%', width: '4%', height: '1px', background: 'rgba(180,210,255,0.15)'}} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ bottom: '28%',right: '-2%', width: '4%', height: '1px', background: 'rgba(233,112,77,0.2)' }} />
      {/* Chart */}
      <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'center center', WebkitMaskImage: 'radial-gradient(ellipse 82% 86% at 50% 50%, black 52%, rgba(0,0,0,0.6) 72%, transparent 100%)', maskImage: 'radial-gradient(ellipse 82% 86% at 50% 50%, black 52%, rgba(0,0,0,0.6) 72%, transparent 100%)', position: 'relative', zIndex: 10 }}>
        <ThermalChart />
      </div>
    </motion.div>
  )
}

// ─── VideoPanel ───────────────────────────────────────────────────────────────
function VideoPanel({ item }: { item: Item }) {
  if (!item.videoSrc || !item.posterSrc) return null
  return (
    <div className="relative" style={{ width: VIDEO_W }}>
      {[
        { pos: { top: 0, left: 0 },   d: 'M1 28 L1 1 L28 1',  dot: [0,0]   },
        { pos: { top: 0, right: 0 },  d: 'M0 1 L27 1 L27 28', dot: [25,0]  },
        { pos: { bottom: 0, left: 0 },d: 'M1 0 L1 27 L28 27', dot: [0,25]  },
        { pos: { bottom: 0, right: 0},d: 'M28 0 L27 27 L0 27',dot: [25,25] },
      ].map(({ pos, d, dot }) => (
        <div key={d} aria-hidden="true" className="absolute pointer-events-none z-20" style={pos}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d={d} stroke={item.accent} strokeWidth="1.2" strokeOpacity="0.7" />
            <rect x={dot[0]} y={dot[1]} width="3" height="3" fill={item.accent} fillOpacity="0.9" />
          </svg>
        </div>
      ))}
      <video
        src={item.videoSrc}
        poster={item.posterSrc}
        autoPlay muted loop playsInline
        className="w-full block"
        style={{
          aspectRatio: '16/9',
          objectFit: 'cover',
          background: 'transparent',
          WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 48%, rgba(0,0,0,0.55) 68%, transparent 100%)',
          maskImage:       'radial-gradient(ellipse 88% 88% at 50% 50%, black 48%, rgba(0,0,0,0.55) 68%, transparent 100%)',
        }}
      />
      {item.videoLabel && (
        <div className="absolute bottom-5 left-5 z-10">
          <span className="text-micro" style={{ color: item.accent }}>{item.videoLabel}</span>
        </div>
      )}
    </div>
  )
}

// ─── MediaPanel ───────────────────────────────────────────────────────────────
function MediaPanel({ activeIndex }: { activeIndex: number }) {
  const showVideo  = activeIndex >= 2
  const activeItem = showVideo ? ALL_ITEMS[activeIndex] : null
  const panelW     = showVideo ? VIDEO_W : WRAP_W
  const panelH     = WRAP_H

  return (
    // Fixed-size container so layout never shifts during cross-fade
    <div style={{ width: panelW, height: panelH, position: 'relative' }}>
      <AnimatePresence>
        {!showVideo && (
          <motion.div
            key="chart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <ChartEmbed />
          </motion.div>
        )}
        {showVideo && activeItem && (
          <motion.div
            key={`video-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <VideoPanel item={activeItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── ContentCard ──────────────────────────────────────────────────────────────
function ContentCard({
  item,
  onVisible,
  from = 'left',
}: {
  item: Item
  onVisible: () => void
  from?: 'left' | 'right'
}) {
  const ref          = useRef<HTMLDivElement>(null)
  const inView       = useInView(ref, { once: true, amount: 0.25 })
  const hasNotified  = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const el  = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasNotified.current) {
          hasNotified.current = true
          onVisible()
        }
        if (!entry.isIntersecting) hasNotified.current = false
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [onVisible])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === 'left' ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <GlowCard
        className="glass-card clip-card w-full relative overflow-hidden"
        glowRGB={item.glowRGB} glowSize={400} glowAlpha={0.16}
      >
        {/* Decorative number */}
        <div className="absolute -bottom-[8%] -right-[3%] overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <span className="font-display font-black block leading-none"
            style={{ fontSize: 'clamp(8rem, 13vw, 13rem)', WebkitTextFillColor: 'rgba(255,255,255,0.04)' }}>
            {item.num}
          </span>
        </div>
        <div className="relative z-10 p-8 min-h-[340px] flex flex-col justify-center gap-0">
          <span className="text-micro text-white/30 block mb-6">{item.tag}</span>
          <h3
            className="font-sans font-bold uppercase text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.45rem)', letterSpacing: '-0.015em' }}
          >
            {item.title}
          </h3>
          <p className="text-micro mb-6" style={{ color: item.accent }}>{item.subtitle}</p>
          <p className="text-sm text-white/75 leading-relaxed">{item.body}</p>
        </div>
      </GlowCard>
    </motion.div>
  )
}

// ─── TechHero ─────────────────────────────────────────────────────────────────
function TechHero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-36 pb-24 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          zIndex: 0,
        }}
      />

      <div className="relative z-10  mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-micro text-[#E9704D] block mb-6"
        >
          FFT — Fast Fatigue Testing
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black uppercase text-white leading-none mb-8"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)', letterSpacing: '-0.03em' }}
        >
          Fast Fatigue
          <br />
          <span
            className="text-[#E9704D]"
          >
            Testing Machine
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-white/45 text-sm leading-relaxed font-medium mx-auto"
          style={{ maxWidth: '36rem' }}
        >
          FFTM è una macchina brevettata per test statici e a fatica completamente automatizzati.
          Equipaggiata con telecamera IR e sistema DIC, basata sul Metodo Termografico di Risitano
          e sul Metodo Termografico Statico — restituisce curve a fatica complete in meno di 48 ore.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TechnologyPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen overflow-x-clip">
        <Navbar />

        {/* Hero — compact, centered, homepage-style */}
        <TechHero />

        {/* ══ DESKTOP (lg+): 3-col scrollytelling ══ */}
        <section className="hidden lg:block relative">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
            className="text-center pb-16 px-6 md:px-16 lg:px-24"
          >
            <span className="text-micro text-white/30 block mb-3">All-in-one equipment</span>
            <h2
              className="font-sans font-bold uppercase text-white"
              style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2rem)', letterSpacing: '-0.015em' }}
            >
              Un sistema, quattro tecnologie
            </h2>
          </motion.div>

          {/*
            3-column grid:
            ┌──────────────┬──────────────┬──────────────┐
            │  left 1fr    │  WRAP_W px   │  right 1fr   │
            │  cards 01,03 │  sticky chart│  cards 02,04 │
            └──────────────┴──────────────┴──────────────┘

            Scroll sequence:
              0vh   → card 01 visible (left), chart centered
              ~50vh → card 02 enters from right
              ~130vh→ card 03 enters from left  + chart→STM video
              ~330vh→ card 04 enters from right (100vh pause after 03)
                        + STM→RTM video
          */}
          <div
            className="grid"
            style={{ gridTemplateColumns: `1fr ${WRAP_W}px 1fr`, gap: '2rem' }}
          >

            {/* ── Left column: cards 01 + 03 ── */}
            <div className="flex flex-col pl-6 md:pl-16 lg:pl-24 pr-2">
              {/* Card 01 — appears immediately */}
              <ContentCard
                item={ALL_ITEMS[0]}
                from="left"
                onVisible={() => setActiveIndex(0)}
              />

              {/* Spacer: card 03 will enter viewport when user has scrolled ~130vh */}
              <div style={{ height: '80vh' }} />

              {/* Card 03 — enters from left, triggers chart→video transition */}
              <ContentCard
                item={ALL_ITEMS[2]}
                from="left"
                onVisible={() => setActiveIndex(2)}
              />

              {/* Bottom padding so page scrolls enough after last left card */}
              <div style={{ height: '60vh' }} />
            </div>

            {/* ── Center column: sticky MediaPanel ── */}
            <div
              style={{
                position: 'sticky',
                top: `calc(50vh - ${WRAP_H / 2}px)`,
                height: 'fit-content',
                alignSelf: 'flex-start',
                paddingTop: '1rem',
                zIndex: 10,
              }}
            >
              <MediaPanel activeIndex={activeIndex} />
            </div>

            {/* ── Right column: cards 02 + 04 ── */}
            <div className="flex flex-col pr-6 md:pr-16 lg:pr-24 pl-2">
              {/* Spacer: card 02 should appear after ~50vh scroll */}
              <div style={{ height: '50vh' }} />

              {/* Card 02 — enters from right */}
              <ContentCard
                item={ALL_ITEMS[1]}
                from="right"
                onVisible={() => setActiveIndex(1)}
              />

              {/*
                Spacer to card 04:
                card 03 enters at ~130vh, then 100vh of video pause,
                then card 04 → spacer = 100vh + some gap ≈ 130vh
              */}
              <div style={{ height: '130vh' }} />

              {/* Card 04 — enters from right, triggers STM→RTM transition */}
              <ContentCard
                item={ALL_ITEMS[3]}
                from="right"
                onVisible={() => setActiveIndex(3)}
              />

              <div style={{ height: '20vh' }} />
            </div>

          </div>
        </section>

        {/* ══ MOBILE / TABLET (< lg): single column ══ */}
        <section className="lg:hidden px-6 pb-16">
          <div className="text-center mb-10">
            <span className="text-micro text-white/30 block mb-3">All-in-one equipment</span>
            <h2
              className="font-sans font-bold uppercase text-white"
              style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', letterSpacing: '-0.015em' }}
            >
              Un sistema, quattro tecnologie
            </h2>
          </div>

          {/* Thermal chart — scaled to fit mobile width */}
          <div className="mb-10 flex justify-center" style={{ overflowX: 'hidden' }}>
            <div
              style={{
                transform: `scale(${Math.min(1, (typeof window !== 'undefined' ? window.innerWidth - 48 : 340) / WRAP_W)})`,
                transformOrigin: 'top center',
              }}
            >
              <ChartEmbed />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {ALL_ITEMS.map((item, i) => (
              <div key={item.num} className="flex flex-col gap-4">
                {item.videoSrc && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <VideoPanel item={item} />
                  </motion.div>
                )}
                <ContentCard item={item} onVisible={() => setActiveIndex(i)} />
              </div>
            ))}
          </div>
        </section>

        <SectionPerche />
        <CTAFinal />
        <Footer />
      </main>
    </>
  )
}
