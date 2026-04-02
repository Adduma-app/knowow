'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HOW_TO_USE } from '@/constants/content'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { staggerContainer } from '@/lib/animations'

const CARD_W   = 380  // px
const CARD_GAP = 20   // px

export default function Section2HowToUse() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible  = useInView(sectionRef, { once: true, amount: 0.15 })

  const cards = HOW_TO_USE.cards

  return (
    <section
      id="applicazioni"
      ref={sectionRef}
      className="py-24 md:py-32 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="px-6 md:px-16 lg:px-24 mb-14"
      >
        <SectionHeading
          label={HOW_TO_USE.label}
          h2={HOW_TO_USE.h2}
          body={HOW_TO_USE.body}
          center={false}
          animate={false}
        />
      </motion.div>

      {/* Slider — scroll nativo orizzontale */}
      <div className="overflow-x-auto scrollbar-hide">
        <div
          className="flex justify-center px-6 md:px-16 lg:px-24 select-none"
          style={{ gap: CARD_GAP }}
        >
          {cards.map((card, i) => (
            <div
              key={`${card.num}-${i}`}
              style={{ width: CARD_W, flexShrink: 0 }}
            >
              <GlowCard
                className={`glass-card  clip-card border-l-2 ${card.borderColor}`}
                style={{ minHeight: 400, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                {/* Mode badge */}
                <div className="h-full">
                  <span className="text-micro text-white/25 border border-white/10 px-2 py-1 inline-block mb-5">
                    {card.mode}
                  </span>
                  <h3 className="font-sans font-bold uppercase text-white text-lg leading-tight mb-4" style={{ letterSpacing: '-0.01em' }}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">{card.text}</p>
                </div>
                {/* CTA */}
                <div className="pt-5 border-t border-white/[0.07]">
                  <a
                    href="#contatti"
                    className="text-micro text-[#E9704D] hover:text-white transition-colors"
                    aria-label={card.title}
                  >
                    {card.cta}
                  </a>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}