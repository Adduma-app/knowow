'use client'

import { useEffect, useRef } from 'react'

/**
 * BorealisBackground — fixed full-viewport animated gradient background.
 * - Three large blobs animate slowly with CSS keyframes
 * - A soft glow follows the cursor with smooth CSS transition easing
 * Sits at z-0, behind all page content.
 */
export default function BorealisBackground() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="borealis-bg" aria-hidden="true">
      {/* Blob 1 — blue, top-left */}
      <div className="borealis-blob borealis-blob-1" />
      {/* Blob 2 — accent orange, bottom-right */}
      <div className="borealis-blob borealis-blob-2" />
      {/* Blob 3 — blue mid, center */}
      <div className="borealis-blob borealis-blob-3" />
      {/* Cursor follower */}
      <div ref={cursorRef} className="borealis-cursor" />
    </div>
  )
}
