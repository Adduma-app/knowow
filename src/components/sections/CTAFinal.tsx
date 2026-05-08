'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { SiteButton } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/it'

interface FormState {
  nome: string; email: string; azienda: string; messaggio: string
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
export default function CTAFinal({ dict }: { dict: Dictionary['cta'] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible  = useInView(sectionRef, { once: true, amount: 0.15 })
  const [form, setForm]           = useState<FormState>({ nome: '', email: '', azienda: '', messaggio: '' })
  const [errors, setErrors]       = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.nome.trim())     e.nome   = dict.form.requiredError
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = dict.form.invalidEmailError
    if (!form.azienda.trim())  e.azienda = dict.form.requiredError
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    setLoading(true)
    setSendError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Send error')
      setSubmitted(true)
    } catch {
      setSendError(dict.form.sendError)
    } finally {
      setLoading(false)
    }
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
      className="relative px-6 md:px-16 lg:px-24 mt-[5%] pb-24 overflow-hidden"
    >

      {/* Logo header — nel flow, altezza scala con la larghezza */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <Image
          src="/images/logo_outline_thin.svg"
          alt="Knowow"
          width={160}
          height={42}
          className="w-full h-auto block"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}

        className="relative z-10 max-w-8xl mx-auto -mt-[8px] md:-mt-[35px]"
        
      >
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
            {/* <div className="text-5xl mb-6 text-[#E9704D]">✓</div> */}
            <h2 className="font-sans font-bold uppercase text-white text-2xl mb-3 text-balance">{dict.form.submittedH2}</h2>
            <p className="text-white/50 text-sm font-medium text-balance">{dict.form.submittedBody}</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ nome: '', email: '', azienda: '', messaggio: '' }) }}
              className="mt-10 text-micro text-[#E9704D] hover:text-white transition-colors"
            >
              {dict.form.sendAnother}
            </button>
          </motion.div>
        ) : (
          <> 
           
            {/* Form box — full-width, opaque, clip TR */}
            <div
              className="clip-card-footer w-full bg-[#0F1120] "
            >
              <div className="p-8 md:p-16">

                {/* Heading */}
                <motion.h2
                  variants={fadeInUp}
                  className="font-sans font-bold uppercase text-white leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.01em' }}
                >
                  {dict.h2}
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/45 text-sm leading-relaxed font-medium mb-10 max-w-lg text-balance">
                  {dict.body}
                </motion.p>

                {/* Form */}
                <motion.form
                  variants={fadeInUp}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div>
                    <input type="text"    name="nome"    placeholder={dict.form.namePlaceholder}    value={form.nome}    onChange={handleChange} className={inputCls('nome')}    aria-label={dict.form.nameAria}    aria-required="true" />
                    {errors.nome    && <p className="text-red-400/70 text-xs mt-1">{errors.nome}</p>}
                  </div>
                  <div>
                    <input type="email"   name="email"   placeholder={dict.form.emailPlaceholder}   value={form.email}   onChange={handleChange} className={inputCls('email')}   aria-label={dict.form.emailAria}   aria-required="true" />
                    {errors.email   && <p className="text-red-400/70 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <input type="text"    name="azienda" placeholder={dict.form.companyPlaceholder} value={form.azienda} onChange={handleChange} className={inputCls('azienda')} aria-label={dict.form.companyAria} aria-required="true" />
                    {errors.azienda && <p className="text-red-400/70 text-xs mt-1">{errors.azienda}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      name="messaggio" placeholder={dict.form.messagePlaceholder} rows={4}
                      value={form.messaggio} onChange={handleChange}
                      className="bg-transparent border-b border-white/10 text-white placeholder:text-white/20 px-0 py-3 w-full focus:outline-none focus:border-[#E9704D] transition-colors text-sm resize-none font-medium tracking-wide"
                      aria-label={dict.form.messageAria}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
                    {sendError && (
                      <p className="w-full text-red-400/80 text-xs mb-2">{sendError}</p>
                    )}
                    <SiteButton type="submit" variant="primary" clip="tr" disabled={loading}>
                      {loading ? dict.form.submitting : dict.ctaPrimary}
                    </SiteButton>
                   
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