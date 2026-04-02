'use client'

import { useEffect, useRef } from 'react'

/**
 * AnimatedBackground — Industrial-Tech ambient background.
 *
 * Blobs: 4 radial gradient divs animated via CSS keyframes (no JS overhead).
 * Cursor glow: GSAP ticker + quickSetter for butter-smooth LERP follow.
 *   - Lag factor 0.06 gives a ~300ms "drag" feel.
 *   - When mouse is idle >1.8s, a soft pulse animation starts on the glow.
 *   - On mouse move, pulse is killed immediately.
 */
export default function AnimatedBackground() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const pulseRef   = useRef<gsap.core.Tween | null>(null)
  const idleTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let gsapMod: typeof import('gsap').gsap | null = null

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const lerp  = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const init = async () => {
      const { gsap } = await import('gsap')
      gsapMod = gsap

      const el = cursorRef.current
      if (!el) return

      // Position the cursor at centre to start (no flash in corner)
      gsap.set(el, { x: lerp.x, y: lerp.y })

      const xSetter = gsap.quickSetter(el, 'x', 'px')
      const ySetter = gsap.quickSetter(el, 'y', 'px')

      // LERP ticker — runs every rAF
      const lerpFactor = 0.06
      gsap.ticker.add(() => {
        lerp.x += (mouse.x - lerp.x) * lerpFactor
        lerp.y += (mouse.y - lerp.y) * lerpFactor
        xSetter(lerp.x)
        ySetter(lerp.y)
      })

      // Idle pulse — starts after 1.8s of no movement
      const startPulse = () => {
        if (!el) return
        pulseRef.current = gsap.to(el, {
          scale: 1.3,
          opacity: 0.6,
          duration: 1.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }

      const resetIdle = () => {
        if (idleTimer.current) clearTimeout(idleTimer.current)
        if (pulseRef.current) { pulseRef.current.kill(); pulseRef.current = null }
        gsap.to(el, { scale: 1, opacity: 1, duration: 0.3 })
        idleTimer.current = setTimeout(startPulse, 1800)
      }

      const onMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
        resetIdle()
      }

      window.addEventListener('mousemove', onMouseMove, { passive: true })
      // Start idle pulse on mount (user may not move mouse immediately)
      idleTimer.current = setTimeout(startPulse, 1800)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        gsap.ticker.remove(() => {})
      }
    }

    init()

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      if (pulseRef.current) pulseRef.current.kill()
      gsapMod?.ticker.remove(() => {})
    }
  }, [])

  return (
    <div className="anim-bg" aria-hidden="true">
      <div className="anim-blob anim-blob-1" />
      <div className="anim-blob anim-blob-2" />
      <div className="anim-blob anim-blob-3" />
      <div className="anim-blob anim-blob-4" />
      <div ref={cursorRef} className="anim-cursor" />
    </div>
  )
}
