'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { WHY_FFTM } from '@/constants/content'
import { GlowCard } from '@/components/ui/GlowCard'
import { staggerContainer, fadeInUp } from '@/lib/animations'

// SVG circle dimensions
const R   = 130
const CX  = 150
const CY  = 150
const CIRC = 2 * Math.PI * R   // ≈ 816

// ─── Circle: Traditional method ───────────────────────────────────────────────
function CircleTraditional({ trigger }: { trigger: boolean }) {
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (trigger && circleRef.current) {
      circleRef.current.classList.add('stroke-animate')
    }
  }, [trigger])

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Info box — above circle */}
      <div className="text-center max-w-[200px]">
        <span className="text-micro text-white/30 block mb-2">[01] METODO TRADIZIONALE</span>
        <p className="text-xs text-white/40 leading-relaxed font-medium">
          25 provini per test. ~500 ore totali, ~20 giorni lavorativi.
        </p>
      </div>

      {/* SVG circle */}
      <div className="relative" style={{ width: 300, height: 300 }}>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          {/* Background track */}
          <circle cx={CX} cy={CY} r={R} stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
          {/* Animated stroke — white, slow (3.8s) */}
          <circle
            ref={circleRef}
            cx={CX} cy={CY} r={R}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            className="stroke-traditional"
            style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
          />
          {/* Number */}
          <text
            x={CX} y={CY - 10}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize="72"
            fontFamily="Fussion, Eurostile, Arial"
            fontWeight="900"
          >
            ~500
          </text>
          {/* Unit */}
          <text
            x={CX} y={CY + 42}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.22)"
            fontSize="14"
            fontFamily="Eurostile, Arial"
            fontWeight="700"
            letterSpacing="4"
          >
            ORE
          </text>
        </svg>
      </div>

      {/* Info box — below circle */}
      <div className="text-center max-w-[220px]">
        <p className="text-xs text-white/30 leading-relaxed font-medium">
          Costi elevati di energia e manodopera. Ritardi nel time-to-market.
        </p>
      </div>
    </div>
  )
}

// ─── Circle: FFTM ─────────────────────────────────────────────────────────────
function CircleFFTM({ trigger }: { trigger: boolean }) {
  const count     = useCountUp(48, 1600, trigger)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (trigger && circleRef.current) {
      circleRef.current.classList.add('stroke-animate')
    }
  }, [trigger])

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Info box — above circle */}
      <div className="text-center max-w-[200px]">
        <span className="text-micro text-[#E9704D]/60 block mb-2">[02] CON FFTM</span>
        <p className="text-xs text-white/60 leading-relaxed font-medium">
          Curve a fatica in 1–2 giorni lavorativi. Spesso meno di 24 ore.
        </p>
      </div>

      {/* SVG circle */}
      <div className="relative" style={{ width: 300, height: 300 }}>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <defs>
            {/* Gradient for the animated stroke */}
            <linearGradient id="fftmStrokeGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="300" y2="300">
              <stop offset="0%"   stopColor="#E9704D" />
              <stop offset="100%" stopColor="#3B61AB" />
            </linearGradient>
            {/* Gradient for the counter number */}
            <linearGradient id="numGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#E9704D" />
              <stop offset="100%" stopColor="#3B61AB" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle cx={CX} cy={CY} r={R} stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
          {/* Animated stroke — gradient, fast (1.4s) */}
          <circle
            ref={circleRef}
            cx={CX} cy={CY} r={R}
            stroke="url(#fftmStrokeGrad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="stroke-fftm"
            style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
          />
          {/* −90% badge */}
          <rect x="195" y="42" width="70" height="22" rx="0" fill="#E9704D" />
          <text x="230" y="57" textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="10" fontFamily="Eurostile, Arial" fontWeight="900" letterSpacing="1">
            −90%
          </text>

          {/* Animated count */}
          <text
            x={CX} y={CY - 10}
            textAnchor="middle" dominantBaseline="middle"
            fill="url(#numGrad)"
            fontSize="82"
            fontFamily="Fussion, Eurostile, Arial"
            fontWeight="900"
          >
            {count}
          </text>
          {/* Unit */}
          <text
            x={CX} y={CY + 46}
            textAnchor="middle" dominantBaseline="middle"
            fill="#E9704D"
            fontSize="14"
            fontFamily="Eurostile, Arial"
            fontWeight="700"
            letterSpacing="4"
          >
            ORE
          </text>
        </svg>
      </div>

      {/* Info box — below circle */}
      <div className="text-center max-w-[220px]">
        <p className="text-xs text-white/60 leading-relaxed font-medium">
          Un solo sistema integrato: IR + DIC + ML. Validato da pubblicazioni peer-reviewed.
        </p>
      </div>
    </div>
  )
}

// ─── BenefitNum — stroke-on-hover decorative number ──────────────────────────
function BenefitNum({ num, isActive }: { num: string; isActive: boolean }) {
  const [hovered, setHovered] = useState(false)
  const on = hovered || isActive
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="select-none pointer-events-auto leading-none font-display font-black transition-all duration-500 block"
      style={{
        fontSize: 'clamp(8rem, 20vw, 30rem)',
        WebkitTextFillColor: on ? 'transparent' : 'rgba(255,255,255,0.03)',
        backgroundImage: on ? 'linear-gradient(90deg, #E9704D 0%, #3B61AB 100%)' : 'none',
        WebkitBackgroundClip: on ? 'text' : 'unset',
        backgroundClip: on ? 'text' : 'unset',
        filter: on ? 'drop-shadow(0 0 2px rgba(233,112,77,0.5))' : 'none',
        cursor: 'default',
      }}
      aria-hidden="true"
    >
      {num}
    </span>
  )
}

// ─── Sticky Benefits ──────────────────────────────────────────────────────────
function BenefitsSticky() {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.55 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const active = WHY_FFTM.benefits[activeIndex]

  return (
    <div className="flex items-start">
      {/* Left sticky */}
      <div className="sticky top-0 h-screen w-[42%] flex flex-col justify-center pl-6 md:pl-16 lg:pl-24 pr-8 shrink-0">
        <span className="text-micro text-[#E9704D] block mb-3">Perché FFTM</span>
        <motion.h3
          key={activeIndex}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-sans font-bold uppercase text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', letterSpacing: '-0.01em' }}
        >
          {active.title}
        </motion.h3>
        <motion.p
          key={`p-${activeIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-white/50 text-sm leading-relaxed font-medium"
        >
          {active.text}
        </motion.p>
        <div className="flex gap-3 mt-8">
          {WHY_FFTM.benefits.map((_, i) => (
            <button
              key={i}
              onClick={() => cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="h-px transition-all duration-300 focus:outline-none"
              style={{
                width: i === activeIndex ? 32 : 14,
                backgroundColor: i === activeIndex ? '#E9704D' : 'rgba(255,255,255,0.18)',
              }}
              aria-label={`Benefit ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right scrollable cards — 90vh height, 50px gap */}
      <div className="flex-1 py-8 pr-6 md:pr-16 lg:pr-24">
        {WHY_FFTM.benefits.map((b, i) => (
          <div
            key={b.num}
            ref={(el) => { cardRefs.current[i] = el }}
            className="flex items-center"
            style={{
              minHeight: '90vh',
              marginBottom: i < WHY_FFTM.benefits.length - 1 ? '50px' : '0',
            }}
          >
            <GlowCard className="glass-card clip-card w-full relative overflow-hidden">
              {/* Decorative number */}
              <div className="absolute -bottom-[8%] -right-[5%] overflow-hidden pointer-events-none">
                <BenefitNum num={b.num} isActive={activeIndex === i} />
              </div>
              {/* Content */}
              <div className="relative z-10 p-8 md:p-20 min-h-[50vh]">
                <p className="text-sm lg:text-2xl text-white/55 leading-relaxed max-w-lg font-medium">
                  {b.text}
                </p>
              </div>
            </GlowCard>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Section1WhyFFTM() {
  const circlesRef    = useRef<HTMLDivElement>(null)
  const circlesInView = useInView(circlesRef, { once: true, amount: 0.4 })

  return (
    <section id="fftm" className="">

      {/* Part A — Comparison */}
      <div className="min-h-screen flex flex-col py-16 px-6 md:px-16 lg:px-24">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12 shrink-0"
        >
          <motion.span variants={fadeInUp} className="text-micro text-[#E9704D] block mb-4">
            {WHY_FFTM.label}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-sans font-bold uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.01em' }}
          >
            {WHY_FFTM.h2Line1}<br />{WHY_FFTM.h2Line2}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/50 max-w-xl mx-auto mt-5 text-sm font-medium">
            {WHY_FFTM.body}
          </motion.p>
        </motion.div>

        {/* Circles */}
        <div
          ref={circlesRef}
          className="flex-1 flex items-center justify-center"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 w-full">
            <CircleTraditional trigger={circlesInView} />

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={circlesInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="origin-left hidden lg:block shrink-0"
              aria-hidden="true"
            >
              <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
                <path d="M0 9 L52 9 M44 2 L52 9 L44 16"
                  stroke="#3B61AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            <CircleFFTM trigger={circlesInView} />
          </div>
        </div>
      </div>

      {/* Part B — Sticky Benefits */}
      <BenefitsSticky />

    </section>
  )
}
