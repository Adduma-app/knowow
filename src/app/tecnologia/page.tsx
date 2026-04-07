'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { GlowCard } from '@/components/ui/GlowCard'
import CTAFinal from '@/components/sections/CTAFinal'
import ThermalChart from '@/components/ui/ThermalChart'
import SectionPerche from '@/components/sections/SectionPerche'

// ─── Constants ───────────────────────────────────────────────────────────────
// Natural dimensions of ThermalChart (canvas 320×480 + axes + colorbar)
const CHART_W = 462
const CHART_H = 582
const SCALE   = 1.28
const WRAP_W  = Math.round(CHART_W * SCALE)   // ≈ 591
const WRAP_H  = Math.round(CHART_H * SCALE)   // ≈ 745

// ─── Content ─────────────────────────────────────────────────────────────────

const HERO_SPECS = [
  { label: 'Brevettata', val: 'FFTM' },
  { label: 'Sistema integrato', val: 'IR + DIC + ML' },
  { label: 'Riduzione tempi', val: '−90%' },
  { label: 'Ricerca scientifica', val: '50+ anni' },
]

const LEFT_ITEMS = [
  {
    tag: 'Equipment / 01',
    title: 'IR Camera',
    subtitle: 'Infrared Thermal Imaging',
    body: "Una telecamera ad infrarossi ad alta sensibilità rileva in tempo reale l'evoluzione della temperatura superficiale del provino. Durante il carico a fatica, l'energia dissipata nel materiale si manifesta come calore — il sistema IR mappa questa distribuzione con precisione, rivelando concentrazioni di stress invisibili a occhio nudo.",
    detail: 'La simulazione che vedi rappresenta il campo termico così come lo legge FFTM.',
    accent: '#E9704D',
    glowRGB: '233,112,77',
  },
  {
    tag: 'Metodo / STM',
    title: 'Static Thermographic Method',
    subtitle: 'Rilevamento della tensione limite',
    body: "Sotto carico a trazione a gradini, la temperatura del provino prima scende (effetto termoelastico), poi risale con l'accumulo di micro-danno. L'STM identifica il punto di inflessione esatto — la tensione limite macroscopica σ_lm — da un singolo test rapido, in minuti anziché settimane.",
    detail: 'Accuratezza di fitting R² > 0.97 tipica sui dati termici.',
    accent: '#3B61AB',
    glowRGB: '59,97,171',
  },
]

const RIGHT_ITEMS = [
  {
    tag: 'Equipment / 02',
    title: 'Digital Image Correlation',
    subtitle: 'Misura del campo di deformazione',
    body: 'Una telecamera ottica ad alta risoluzione traccia un pattern a speckle applicato alla superficie del provino. Gli algoritmi DIC calcolano il campo completo di spostamento e deformazione pixel per pixel — catturando gradienti di deformazione, concentrazioni di tensione ed effetti di Poisson durante test di trazione statica.',
    detail: 'Mappe True Strain yy fino al 12% di range di deformazione.',
    accent: '#3B61AB',
    glowRGB: '59,97,171',
  },
  {
    tag: 'Metodo / RTM',
    title: "Risitano's Thermographic Method",
    subtitle: 'Valutazione del limite a fatica',
    body: "In un test a fatica a gradini, la temperatura si stabilizza a ogni livello di tensione. L'RTM plotta la temperatura di stabilizzazione vs. la tensione applicata — il limite a fatica σ₀ viene identificato al ginocchio di questa curva. Una curva di Wöhler completa emerge da un unico provino in meno di 24 ore.",
    detail: 'Validato su metalli, compositi e polimeri.',
    accent: '#E9704D',
    glowRGB: '233,112,77',
  },
]

const OUTPUTS = [
  {
    num: '01',
    title: 'Curva S-N completa',
    text: 'Diagramma di Wöhler (tensione vs. cicli) ottenuto da un numero minimo di provini, con livello di confidenza statisticamente validato.',
  },
  {
    num: '02',
    title: 'Limite di fatica σ₀',
    text: 'Tensione massima al di sotto della quale il materiale non manifesta rottura a fatica, estratta direttamente dal metodo RTM.',
  },
  {
    num: '03',
    title: 'Tensione limite σ_lm',
    text: 'Tensione macroscopica che induce il primo danno nel materiale, determinata con precisione dal metodo STM su un singolo test statico.',
  },
  {
    num: '04',
    title: 'Campo di deformazione',
    text: 'Mappe complete di deformazione vera in ogni punto della superficie del provino, catturate dal sistema DIC durante il carico.',
  },
]

// ─── HUD Readouts ─────────────────────────────────────────────────────────────

const READOUTS: { label: string; val: string; pos: React.CSSProperties }[] = [
  {
    label: 'T_MAX',
    val: '33.755 °C',
    pos: { top: '8%', left: '-18%' },
  },
  {
    label: 'T_MIN',
    val: '31.000 °C',
    pos: { bottom: '22%', left: '-16%' },
  },
  {
    label: 'λ BAND',
    val: 'IR 8–14 μm',
    pos: { top: '14%', right: '-17%' },
  },
  {
    label: 'N_MAX',
    val: '200,000 cyc',
    pos: { bottom: '28%', right: '-16%' },
  },
  {
    label: 'SPECIMEN',
    val: 'NOTCHED',
    pos: { top: '42%', right: '-18%' },
  },
  {
    label: 'METHOD',
    val: 'RISITANO',
    pos: { top: '42%', left: '-17%' },
  },
]

// ─── ChartEmbed ───────────────────────────────────────────────────────────────

function ChartEmbed() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center"
      style={{ width: WRAP_W, height: WRAP_H }}
    >
      {/* ── Deep ambient glow behind the chart ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: '-30%',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,97,171,0.28) 0%, rgba(233,112,77,0.07) 55%, transparent 75%)',
          filter: 'blur(48px)',
          zIndex: 0,
        }}
      />

      {/* ── HUD corner brackets ── */}
      {/* Top-left */}
      <div aria-hidden="true" className="absolute pointer-events-none z-20" style={{ top: 0, left: 0 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M1 28 L1 1 L28 1" stroke="#E9704D" strokeWidth="1.2" strokeOpacity="0.7" />
          <rect x="0" y="0" width="3" height="3" fill="#E9704D" fillOpacity="0.9" />
        </svg>
      </div>
      {/* Top-right */}
      <div aria-hidden="true" className="absolute pointer-events-none z-20" style={{ top: 0, right: 0 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M0 1 L27 1 L27 28" stroke="#E9704D" strokeWidth="1.2" strokeOpacity="0.7" />
          <rect x="25" y="0" width="3" height="3" fill="#E9704D" fillOpacity="0.9" />
        </svg>
      </div>
      {/* Bottom-left */}
      <div aria-hidden="true" className="absolute pointer-events-none z-20" style={{ bottom: 0, left: 0 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M1 0 L1 27 L28 27" stroke="#3B61AB" strokeWidth="1.2" strokeOpacity="0.7" />
          <rect x="0" y="25" width="3" height="3" fill="#3B61AB" fillOpacity="0.9" />
        </svg>
      </div>
      {/* Bottom-right */}
      <div aria-hidden="true" className="absolute pointer-events-none z-20" style={{ bottom: 0, right: 0 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M28 0 L27 27 L0 27" stroke="#3B61AB" strokeWidth="1.2" strokeOpacity="0.7" />
          <rect x="25" y="25" width="3" height="3" fill="#3B61AB" fillOpacity="0.9" />
        </svg>
      </div>

      {/* ── HUD readout labels floating around chart ── */}
      {READOUTS.map(({ label, val, pos }) => (
        <motion.div
          key={label}
          aria-hidden="true"
          className="absolute pointer-events-none z-20 font-mono"
          style={pos}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div
            style={{
              fontSize: '9px',
              letterSpacing: '0.18em',
              color: 'rgba(180,210,255,0.35)',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'rgba(200,230,255,0.6)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {val}
          </div>
        </motion.div>
      ))}

      {/* ── Thin tick lines connecting readouts to chart edge ── */}
      {/* Left ticks */}
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '8%', left: '-2%', width: '4%', height: '1px', background: 'rgba(233,112,77,0.2)' }} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ bottom: '22%', left: '-2%', width: '4%', height: '1px', background: 'rgba(59,97,171,0.2)' }} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '42%', left: '-2%', width: '4%', height: '1px', background: 'rgba(180,210,255,0.15)' }} />
      {/* Right ticks */}
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '14%', right: '-2%', width: '4%', height: '1px', background: 'rgba(59,97,171,0.2)' }} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ bottom: '28%', right: '-2%', width: '4%', height: '1px', background: 'rgba(233,112,77,0.2)' }} />
      <div aria-hidden="true" className="absolute pointer-events-none z-10" style={{ top: '42%', right: '-2%', width: '4%', height: '1px', background: 'rgba(180,210,255,0.15)' }} />

      {/* ── ThermalChart: scaled + edge-faded ── */}
      <div
        style={{
          transform: `scale(${SCALE})`,
          transformOrigin: 'center center',
          WebkitMaskImage:
            'radial-gradient(ellipse 82% 86% at 50% 50%, black 52%, rgba(0,0,0,0.6) 72%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 82% 86% at 50% 50%, black 52%, rgba(0,0,0,0.6) 72%, transparent 100%)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <ThermalChart />
      </div>
    </motion.div>
  )
}

// ─── ContentCard ──────────────────────────────────────────────────────────────

function ContentCard({
  item,
  side,
  index,
}: {
  item: (typeof LEFT_ITEMS)[0]
  side: 'left' | 'right'
  index: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}
    >
      {/* ── Connecting line toward the chart ── */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
        style={{
          [side === 'left' ? 'right' : 'left']: 0,
          width: '60px',
          height: '1px',
          background:
            side === 'left'
              ? `linear-gradient(to right, transparent, rgba(${item.glowRGB},0.35))`
              : `linear-gradient(to left, transparent, rgba(${item.glowRGB},0.35))`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
      />

      <GlowCard
        className="glass-card clip-card p-8 w-full max-w-[390px]"
        glowRGB={item.glowRGB}
        glowSize={360}
        glowAlpha={0.22}
      >
        {/* Tag */}
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">
          {item.tag}
        </span>

        {/* Accent line */}
        <div className="w-8 h-px mb-5" style={{ background: item.accent }} aria-hidden="true" />

        {/* Title */}
        <h3
          className="font-sans font-bold uppercase text-white leading-tight mb-2"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)', letterSpacing: '-0.01em' }}
        >
          {item.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs uppercase tracking-[0.2em] mb-5 font-medium" style={{ color: item.accent }}>
          {item.subtitle}
        </p>

        {/* Body */}
        <p className="text-sm text-white/50 leading-relaxed mb-6">{item.body}</p>

     
      </GlowCard>
    </motion.div>
  )
}

// ─── OutputCard ───────────────────────────────────────────────────────────────

function OutputCard({ item, index }: { item: (typeof OUTPUTS)[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlowCard className="glass-card clip-card p-8 h-full" glowRGB="233,112,77" glowSize={300} glowAlpha={0.16}>
        <span
          className="font-display font-black block mb-4 leading-none"
          style={{
            fontSize: 'clamp(3rem, 5vw, 5rem)',
            WebkitTextFillColor: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #E9704D 0%, #3B61AB 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
          aria-hidden="true"
        >
          {item.num}
        </span>
        <h4
          className="font-sans font-bold uppercase text-white text-sm mb-3"
          style={{ letterSpacing: '-0.01em' }}
        >
          {item.title}
        </h4>
        <p className="text-xs text-white/45 leading-relaxed">{item.text}</p>
      </GlowCard>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TecnologiaPage() {
  return (
    <>
    
      <main className="relative z-10 min-h-screen overflow-x-clip">
        <Navbar />
        <AnimatedBackground />
        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
        

            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.35em] text-[#E9704D] block mb-6"
            >
              FFT — Fast Fatigue Testing
            </motion.span>

            <h1
              className="font-sans font-bold uppercase text-white leading-none mb-8"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 6.5rem)', letterSpacing: '-0.025em' }}
            >
              Fast Fatigue
              <br />
              <span
                style={{
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(90deg, #E9704D 0%, #3B61AB 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Testing Machine
              </span>
            </h1>

            <p className="text-white/50 max-w-2xl text-sm md:text-base leading-relaxed mb-12 font-medium">
              FFTM è una macchina brevettata per test statici e a fatica completamente automatizzati.
              Equipaggiata con telecamera IR e sistema DIC a bordo, basata sul Metodo Termografico
              di Risitano e sul Metodo Termografico Statico — restituisce curve a fatica complete
              in meno di 48 ore.
            </p>
          </motion.div>
        </section>

        {/* ── SCROLLYTELLING: 3-col sticky chart ─────────────── */}
        <section className="relative px-4 md:px-10 lg:px-16 pb-40">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-4 pb-20"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/30 block mb-3">
              All-in-one equipment
            </span>
            <h2
              className="font-sans font-bold uppercase text-white"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)', letterSpacing: '-0.015em' }}
            >
              Un sistema, quattro tecnologie
            </h2>
          </motion.div>

          {/* ── Desktop 3-col layout ── */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-start">

            {/* LEFT column */}
            <div className="flex flex-col pr-10">
              <div style={{ height: '5vh' }} />
              <div className="min-h-[78vh] flex items-center">
                <ContentCard item={LEFT_ITEMS[0]} side="left" index={0} />
              </div>
              <div style={{ height: '65vh' }} />
              <div className="min-h-[78vh] flex items-center">
                <ContentCard item={LEFT_ITEMS[1]} side="left" index={1} />
              </div>
            </div>

            {/* CENTER — sticky chart */}
            <div
              className="flex flex-col items-center px-4"
              style={{
                position: 'sticky',
                top: `calc(50vh - ${WRAP_H / 2}px)`,
                height: 'fit-content',
                alignSelf: 'flex-start',
              }}
            >
              <ChartEmbed />
            </div>

            {/* RIGHT column */}
            <div className="flex flex-col pl-10">
              <div style={{ height: '42vh' }} />
              <div className="min-h-[78vh] flex items-center">
                <ContentCard item={RIGHT_ITEMS[0]} side="right" index={0} />
              </div>
              <div style={{ height: '65vh' }} />
              <div className="min-h-[78vh] flex items-center">
                <ContentCard item={RIGHT_ITEMS[1]} side="right" index={1} />
              </div>
              <div style={{ height: '22vh' }} />
            </div>
          </div>

          {/* ── Mobile: chart then stacked cards ── */}
          <div className="lg:hidden flex flex-col gap-10">
            <div className="flex justify-center overflow-visible">
              <ChartEmbed />
            </div>
            {[...LEFT_ITEMS, ...RIGHT_ITEMS].map((item, i) => (
              <ContentCard key={i} item={item} side="left" index={i} />
            ))}
          </div>
        </section>



        {/* ── PERCHÉ CONTA FARLO BENE ──────── */}
        <SectionPerche />

        {/* ── CTA  ─────────────────────────── */}
        <CTAFinal />
        <Footer />
      </main>
    </>
  )
}
