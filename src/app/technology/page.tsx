'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { GlowCard } from '@/components/ui/GlowCard'
import CTAFinal from '@/components/sections/CTAFinal'
import SectionPerche from '@/components/sections/SectionPerche'

// ─── Card + video data ────────────────────────────────────────────────────────
const ALL_ITEMS = [
  {
    num: '01',
    tag: 'Equipment',
    title: 'IR Camera',
    subtitle: 'Infrared Thermal Imaging',
    body: "Rileva l'evoluzione della temperatura superficiale del provino durante il test a fatica.",
    accent: '#E9704D',
    glowRGB: '233,112,77',
    side: 'left'  as const,
    videoSrc: '/video_def/chart.webm',
    xShift: 80,   // video shifts right when card is left
  },
  {
    num: '02',
    tag: 'Equipment',
    title: 'Digital Image Correlation',
    subtitle: 'Campo di deformazione superficiale',
    body: "Misura l'evoluzione della deformazione sulla superficie del provino durante il test di trazione statico.",
    accent: '#3B61AB',
    glowRGB: '59,97,171',
    side: 'right' as const,
    videoSrc: '/video_def/temperature.webm',
    xShift: -80,  // video shifts left when card is right
  },
  {
    num: '03',
    tag: 'Metodo / STM',
    title: 'Static Thermographic Method',
    subtitle: 'Tensione limite macroscopica',
    body: "Valutazione della tensione limite — la tensione macroscopica che induce il primo danno nel materiale.",
    accent: '#E9704D',
    glowRGB: '233,112,77',
    side: 'left'  as const,
    videoSrc: '/video_def/Polyline.webm',
    xShift: 80,
  },
  {
    num: '04',
    tag: 'Metodo / RTM',
    title: "Risitano's Thermographic Method",
    subtitle: 'Valutazione del limite a fatica',
    body: "Valutazione del limite a fatica tramite l'andamento della temperatura di stabilizzazione in funzione del livello di tensione applicato.",
    accent: '#3B61AB',
    glowRGB: '59,97,171',
    side: 'right' as const,
    videoSrc: '/video_def/Risitano.webm',
    xShift: -80,
  },
]

type Item = (typeof ALL_ITEMS)[number]

// ─── VideoBackground — tutti i video sempre montati, play/pause via activeIndex ─
function VideoBackground({ activeIndex }: { activeIndex: number }) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === activeIndex) {
        v.play().catch(() => {/* autoplay policy: silently ignore */})
      } else {
        v.pause()
      }
    })
  }, [activeIndex])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {ALL_ITEMS.map((item, i) => (
        <motion.div
          key={item.num}
          className="absolute"
          style={{ width: '80vw', left: 'calc(50% - 40vw)', top: '50%', translateY: '-25%' }}
          animate={{
            opacity: i === activeIndex ? 1 : 0,
            x: i === activeIndex ? item.xShift : 0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el }}
            src={item.videoSrc}
            muted
            loop
            playsInline
            className="w-[80vw] h-[80vh]"
            style={{ objectFit: 'contain' }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ─── ContentCard ──────────────────────────────────────────────────────────────
// Nessun onVisible qui: l'observer è gestito a livello pagina su sectionRefs.
function ContentCard({ item }: { item: Item }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: item.side === 'left' ? -52 : 52 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      // Fixed width so cards don't stretch across full half-screen
      style={{ width: 'clamp(300px, 30vw, 440px)' }}
    >
      <GlowCard
        className="glass-card clip-card w-full relative overflow-hidden"
        glowRGB={item.glowRGB}
        glowSize={400}
        glowAlpha={0.22}
        style={{ background: 'rgba(8, 10, 24, 0.92)' }}
      >
        {/* Decorative number */}
        <div
          className="absolute -bottom-[8%] -right-[3%] overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-black block leading-none"
            style={{
              fontSize: 'clamp(8rem, 13vw, 13rem)',
              WebkitTextFillColor: 'rgba(255,255,255,0.04)',
            }}
          >
            {item.num}
          </span>
        </div>

        <div className="relative z-10 p-8 min-h-[340px] flex flex-col justify-center">
          <span className="text-micro text-white/30 block mb-6">{item.tag}</span>
          <h3
            className="font-sans font-bold uppercase text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.45rem)', letterSpacing: '-0.015em' }}
          >
            {item.title}
          </h3>
          <p className="text-micro mb-6" style={{ color: item.accent }}>
            {item.subtitle}
          </p>
          <p className="text-sm text-white/75 leading-relaxed">{item.body}</p>
        </div>
      </GlowCard>
    </motion.div>
  )
}

// ─── TechHero ─────────────────────────────────────────────────────────────────
function TechHero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 md:px-16 pt-36 pb-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
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
            style={{
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(90deg, #E9704D 0%, #3B61AB 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Observer stabile (deps vuoti): registrato una volta sola, non si
  // ri-crea ad ogni render. Evita il loop: setActiveIndex → re-render
  // → nuova funzione → observer si ri-registra → setActiveIndex…
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.5 }
    )
    sectionRefs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen overflow-x-clip">
        <Navbar />

        {/* ── Hero ── */}
        <TechHero />

        {/* ══ DESKTOP (lg+) — sticky video + scrolling cards ══ */}
        {/* isolation: isolate contiene gli z-index interni (1,2) e impedisce
            che lo sticky video si sovrapponga al contenuto esterno alla sezione */}
        <section className="hidden lg:block relative" style={{ isolation: 'isolate' }}>

          {/*
            Sticky video layer — stays fixed while cards scroll over it.
            z-index: 1 so cards (z-index: 2) sit on top.
          */}
          <div className="flex flex-col justify-center items-center"
            style={{
              position: 'sticky',
              top: 0,
              height: '90vh',
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            {/* Section label — fixed at top inside sticky container */}
            <div className="absolute top-24 left-0 right-0 text-center px-6 md:px-16 lg:px-24 z-10">
              <span className="text-micro text-white/30 block mb-3">All-in-one equipment</span>
              <h2
                className="font-sans font-bold uppercase text-white"
                style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2rem)', letterSpacing: '-0.015em' }}
              >
                Un sistema, quattro tecnologie
              </h2>
            </div>

            <VideoBackground activeIndex={activeIndex} />
          </div>

          {/*
            Cards layer — scrolls normally on top of the sticky video.
            Each card section is exactly 100vh tall.
            Extra 100vh spacer at the end keeps the sticky alive
            until the last card is fully past.
          */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {ALL_ITEMS.map((item, i) => (
              <div
                key={item.num}
                ref={(el) => { sectionRefs.current[i] = el }}
                className="flex items-center px-6 md:px-16 lg:px-24"
                style={{
                  height: '100vh',
                  justifyContent: item.side === 'left' ? 'flex-start' : 'flex-end',
                }}
              >
                <ContentCard item={item} />
              </div>
            ))}

            {/* Spacer: keeps sticky video alive past the last card */}
            <div style={{ height: '100vh' }} />
          </div>
        </section>

        {/* ══ MOBILE / TABLET (< lg) ══ */}
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

          <div className="flex flex-col gap-8">
            {ALL_ITEMS.map((item, i) => (
              <div key={item.num} className="flex flex-col gap-4">
                <ContentCard item={item} />

                {/* Video below each card on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7 }}
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '16/9' }}
                >
                  <video
                    src={item.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full"
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
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
