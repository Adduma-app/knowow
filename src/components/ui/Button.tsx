'use client'

import { useRef } from 'react'
import type { MouseEvent } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  children: React.ReactNode
  className?: string
}

const VARIANT_BASE: Record<ButtonVariant, string> = {
  primary: 'bg-[#E9704D] text-white clip-btn-tr',
  outline: 'border border-[#E9704D] text-[#E9704D] clip-btn-tr',
  ghost:   'border border-white/25 text-white clip-btn-bl',
}

const BASE =
  'relative inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-widest font-bold transition-all duration-300 select-none overflow-hidden'

/**
 * Button — Magnetic hover + direction-aware gradient shimmer.
 *
 * On hover, a gradient band (orange→blue) sweeps across the button,
 * following the cursor's X position. On mouse leave, the band fades out
 * and the button settles to its base style.
 */
export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const btnRef   = useRef<HTMLButtonElement>(null)
  const bandRef  = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  // ── Magnetic move ────────────────────────────────────────────────────────
  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn) return

    // Magnetic translate
    const rect = btn.getBoundingClientRect()
    const cx   = rect.left + rect.width / 2
    const cy   = rect.top  + rect.height / 2
    btn.style.transform = `translate(${(e.clientX - cx) * 0.14}px, ${(e.clientY - cy) * 0.14}px)`

    // Shimmer band follows cursor X
    if (bandRef.current) {
      const x = e.clientX - rect.left
      bandRef.current.style.left = `${x - 80}px`
    }
  }

  const handleMouseEnter = () => {
    layerRef.current?.classList.add('active')
  }

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)'
    layerRef.current?.classList.remove('active')
  }

  const classes = `${BASE} ${VARIANT_BASE[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classes}
      {...props}
    >
      {/* Shimmer layer — invisible until hover */}
      <div ref={layerRef} className="btn-shimmer-layer">
        <div ref={bandRef} className="btn-shimmer-band" />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
