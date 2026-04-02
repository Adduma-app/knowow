'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { CTA } from '@/constants/content'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface FormState {
  nome: string; email: string; azienda: string; messaggio: string
}

// ─── Shimmer Button ────────────────────────────────────────────────────────────
function ShimmerButton({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
}: {
  children: React.ReactNode
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost'
  onClick?: () => void
}) {
  const btnRef   = useRef<HTMLButtonElement>(null)
  const bandRef  = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || !bandRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x    = e.clientX - rect.left
    bandRef.current.style.left = `${x - 80}px`
  }

  const onMouseEnter = () => {
    layerRef.current?.classList.add('active')
  }

  const onMouseLeave = () => {
    layerRef.current?.classList.remove('active')
    // Settle to dark blue
    if (btnRef.current) {
      btnRef.current.style.background =
        variant === 'primary' ? '#0F1120' : 'transparent'
    }
  }

  const base =
    'relative inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-widest font-bold transition-all duration-400 overflow-hidden w-full sm:w-auto'

  const variantClass =
    variant === 'primary'
      ? 'bg-[#E9704D] text-white clip-btn-tr'
      : 'border border-white/25 text-white clip-btn-bl hover:border-white/50'

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${base} ${variantClass}`}
    >
      {/* Shimmer layer */}
      <div ref={layerRef} className="btn-shimmer-layer">
        <div ref={bandRef} className="btn-shimmer-band" />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible  = useInView(sectionRef, { once: true, amount: 0.15 })
  const [form, setForm]           = useState<FormState>({ nome: '', email: '', azienda: '', messaggio: '' })
  const [errors, setErrors]       = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.nome.trim())     e.nome   = 'Campo obbligatorio'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Email non valida'
    if (!form.azienda.trim())  e.azienda = 'Campo obbligatorio'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof FormState])
      setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const inputCls = (field: keyof FormState) =>
    `bg-transparent border-b text-white placeholder:text-white/20 px-0 py-3 w-full focus:outline-none transition-colors text-sm font-medium tracking-wide ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-400'
        : 'border-white/10 focus:border-[#E9704D]'
    }`

  return (
    <section
      id="contatti"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24  overflow-hidden"
    >

       {/* Logo header */}
       <motion.div variants={fadeInUp} className="">
                  <Image
                    src="/images/logo.png"
                    alt="KnoWow"
                    width={160}
                    height={42}
                    className="w-full h-auto absolute  top-[5%] left-0"
                  />
                </motion.div>
      {/* Subtle glow */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,97,171,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      /> */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative z-10 max-w-8xl mx-auto"
      >
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
            <div className="text-5xl mb-6 text-[#E9704D]">✓</div>
            <h2 className="font-sans font-bold uppercase text-white text-2xl mb-3">Messaggio inviato</h2>
            <p className="text-white/50 text-sm font-medium">Il team ti contatterà entro 24 ore.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ nome: '', email: '', azienda: '', messaggio: '' }) }}
              className="mt-10 text-micro text-[#E9704D] hover:text-white transition-colors"
            >
              Invia un altro messaggio
            </button>
          </motion.div>
        ) : (
          <> 
           
            {/* Form box — full-width, opaque, clip TR */}
            <div
              className="clip-btn-tr w-full"
              style={{ background: '#0A0C1C', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="p-10 md:p-16">

              

                {/* Heading */}
                <motion.h2
                  variants={fadeInUp}
                  className="font-sans font-bold uppercase text-white leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.01em' }}
                >
                  {CTA.h2}
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/45 text-sm leading-relaxed font-medium mb-10 max-w-lg">
                  {CTA.body}
                </motion.p>

                {/* Form */}
                <motion.form
                  variants={fadeInUp}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div>
                    <input type="text"    name="nome"    placeholder="Nome *"    value={form.nome}    onChange={handleChange} className={inputCls('nome')}    aria-label="Nome"    aria-required="true" />
                    {errors.nome    && <p className="text-red-400/70 text-xs mt-1">{errors.nome}</p>}
                  </div>
                  <div>
                    <input type="email"   name="email"   placeholder="Email *"   value={form.email}   onChange={handleChange} className={inputCls('email')}   aria-label="Email"   aria-required="true" />
                    {errors.email   && <p className="text-red-400/70 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <input type="text"    name="azienda" placeholder="Azienda *" value={form.azienda} onChange={handleChange} className={inputCls('azienda')} aria-label="Azienda" aria-required="true" />
                    {errors.azienda && <p className="text-red-400/70 text-xs mt-1">{errors.azienda}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      name="messaggio" placeholder="Messaggio (opzionale)" rows={4}
                      value={form.messaggio} onChange={handleChange}
                      className="bg-transparent border-b border-white/10 text-white placeholder:text-white/20 px-0 py-3 w-full focus:outline-none focus:border-[#E9704D] transition-colors text-sm resize-none font-medium tracking-wide"
                      aria-label="Messaggio"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
                    <ShimmerButton type="submit" variant="primary">
                      {CTA.ctaPrimary}
                    </ShimmerButton>
                    <ShimmerButton
                      type="button"
                      variant="ghost"
                      onClick={() => { window.location.href = 'mailto:info@knowow.tech' }}
                    >
                      {CTA.ctaSecondary}
                    </ShimmerButton>
                  </div>
                </motion.form>

              </div>
            </div>
          </>
        )}
      </motion.div>
    </section>
  )
}
