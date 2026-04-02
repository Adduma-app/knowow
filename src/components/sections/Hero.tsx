'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { HERO } from '@/constants/content'
import { staggerContainer, wordReveal } from '@/lib/animations'

// ─── Staggered H1 ─────────────────────────────────────────────────────────────
function StaggeredH1({ line1, line2 }: { line1: string; line2: string }) {
  const words1 = line1.split(' ')
  const words2 = line2.split(' ')
  return (
    <motion.h1
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="font-sans font-black uppercase text-white leading-none"
      style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)', letterSpacing: '-0.03em' }}
      aria-label={`${line1} ${line2}`}
    >
      <span className="block">
        {words1.map((word, i) => (
          <span key={i} className="word-clip mr-[0.18em] last:mr-0">
            <motion.span variants={wordReveal} className="inline-block">{word}</motion.span>
          </span>
        ))}
      </span>
      <span className="block">
        {words2.map((word, i) => (
          <span key={i} className="word-clip mr-[0.18em] last:mr-0">
            <motion.span
              variants={wordReveal}
              className={`inline-block ${i >= 3 ? 'text-[#E9704D]' : ''}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.h1>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const thermalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!thermalRef.current) return
      const x = (e.clientX / window.innerWidth  - 0.5) * 16
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      thermalRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.04)`
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero — Fast Fatigue Testing Technology"
    >
      <div ref={thermalRef} className="hero-thermal-bg" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-[60] flex-1 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <Image src="/images/decoro.svg" alt="" width={18} height={18} className="opacity-50" aria-hidden="true" />
          <span className="text-micro text-[#E9704D]">{HERO.tag}</span>
        </motion.div>

        {mounted && <StaggeredH1 line1={HERO.h1Line1} line2={HERO.h1Line2} />}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-white/60 max-w-xl text-sm leading-relaxed mt-8 font-medium"
        >
          {HERO.subtitle}
        </motion.p>

        {/* CTA buttons — alternating clip-path: btn1=TR, btn2=BL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          {/* Primary — clip Top-Right */}
          <a
            href="#fftm"
            className="clip-btn-tr relative inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-widest font-bold bg-[#E9704D] text-white transition-all duration-300 hover:bg-[#E9704D]/85 overflow-hidden"
            aria-label="Scopri la tecnologia FFTM"
          >
            {HERO.ctaPrimary}
          </a>
          {/* Secondary — clip Bottom-Left */}
          <a
            href="#contatti"
            className="clip-btn-bl relative inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-widest font-bold border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white/5 overflow-hidden"
            aria-label="Richiedi una demo di FFTM"
          >
            {HERO.ctaSecondary}
          </a>
        </motion.div>
      </div>

      {/* Stat bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-[60] border-t border-white/[0.08] shrink-0"
      >
        <div className="flex flex-col sm:flex-row justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] max-w-3xl mx-auto">
          {HERO.stats.map((s) => (
            <div key={s.label} className="flex-1 px-8 py-5 text-center">
              <div className="font-display text-2xl font-black text-white">{s.value}</div>
              <div className="text-micro text-white/35 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce z-[60]"
        aria-hidden="true"
      >
        <ChevronDown className="w-5 h-5 text-white/20" />
      </motion.div>
    </section>
  )
}
