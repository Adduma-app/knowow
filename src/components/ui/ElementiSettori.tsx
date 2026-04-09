'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  tx: number; ty: number; x: number; y: number
  offsetX: number; offsetY: number
  speed: number; phase: number; amplitude: number
  size: number; alpha: number
}

const SHAPE_DURATION    = 3000   // ms per forma
const TRANSITION_DURATION = 1500 // ms transizione
const PARTICLE_COUNT    = 4200
const NUM_SHAPES        = 4      // aereo · DNA · pistone · molecola

export default function ElementiSettori() {
  const canvasRef            = useRef<HTMLCanvasElement>(null)
  const particlesRef         = useRef<Particle[]>([])
  const mouseRef             = useRef({ x: -9999, y: -9999 })
  const animFrameRef         = useRef<number>(0)
  const dimensionsRef        = useRef({ w: 0, h: 0 })
  const shapeIndexRef        = useRef(0)
  const shapeTimeRef         = useRef(0)
  const lastTimestampRef     = useRef(0)
  const currentTargetsRef    = useRef<{ x: number; y: number }[]>([])
  const nextTargetsRef       = useRef<{ x: number; y: number }[]>([])
  const isTransitioningRef   = useRef(false)
  const transitionProgressRef = useRef(0)

  // ── 1. AEREO (vista dall'alto) ── stabilizzatori rimossi ─────────────────────
  const generateAirplanePoints = useCallback((w: number, h: number, count: number) => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.50
    const cy = h * 0.50
    const s  = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    // Fusoliera
    for (let i = 0; i < Math.floor(count * 0.22); i++) {
      const t = (Math.random() - 0.5) * 2
      const length = 130 * s
      const widthProfile = Math.sin(((t + 1) / 2) * Math.PI) * 8 * s
      points.push({
        x: cx + t * length + (Math.random() - 0.5) * 2 * s,
        y: cy + (Math.random() - 0.5) * widthProfile * 2,
      })
    }

    // Muso
    for (let i = 0; i < Math.floor(count * 0.055); i++) {
      const t = Math.random()
      const noseX  = cx + 130 * s + t * 20 * s
      const taper  = (1 - t * t) * 7 * s
      points.push({
        x: noseX + (Math.random() - 0.5) * 1.5 * s,
        y: cy + (Math.random() - 0.5) * taper,
      })
    }

    // Coda
    for (let i = 0; i < Math.floor(count * 0.04); i++) {
      const t = Math.random()
      const tailX = cx - 130 * s - t * 25 * s
      const taper = (1 - t) * 7 * s
      points.push({
        x: tailX + (Math.random() - 0.5) * 2 * s,
        y: cy + (Math.random() - 0.5) * taper,
      })
    }

    // Ala sinistra
    for (let i = 0; i < Math.floor(count * 0.18); i++) {
      const t          = Math.random()
      const yPos       = cy - t * 110 * s
      const chord      = (70 * s) * (1 - t) + (15 * s) * t
      const sweep      = t * 40 * s
      const leadingEdge = cx + 20 * s - sweep
      points.push({
        x: leadingEdge - Math.random() * chord + (Math.random() - 0.5) * 2 * s,
        y: yPos + (Math.random() - 0.5) * 3 * s,
      })
    }

    // Ala destra
    for (let i = 0; i < Math.floor(count * 0.18); i++) {
      const t          = Math.random()
      const yPos       = cy + t * 110 * s
      const chord      = (70 * s) * (1 - t) + (15 * s) * t
      const sweep      = t * 40 * s
      const leadingEdge = cx + 20 * s - sweep
      points.push({
        x: leadingEdge - Math.random() * chord + (Math.random() - 0.5) * 2 * s,
        y: yPos + (Math.random() - 0.5) * 3 * s,
      })
    }

    // Pinna di coda
    for (let i = 0; i < Math.floor(count * 0.04); i++) {
      const t = Math.random()
      points.push({
        x: cx - 130 * s - t * 40 * s + (Math.random() - 0.5) * 3 * s,
        y: cy + (Math.random() - 0.5) * 2.5 * s,
      })
    }

    // Motore sinistro
    for (let i = 0; i < Math.floor(count * 0.04); i++) {
      const t = (Math.random() - 0.5) * 2
      const profile = (1 - t * t) * 5 * s
      points.push({
        x: cx + 5 * s + t * 20 * s + (Math.random() - 0.5) * 2 * s,
        y: cy - 45 * s + (Math.random() - 0.5) * profile * 2,
      })
    }

    // Motore destro
    for (let i = 0; i < Math.floor(count * 0.04); i++) {
      const t = (Math.random() - 0.5) * 2
      const profile = (1 - t * t) * 5 * s
      points.push({
        x: cx + 5 * s + t * 20 * s + (Math.random() - 0.5) * 2 * s,
        y: cy + 45 * s + (Math.random() - 0.5) * profile * 2,
      })
    }

    // Cabina
    for (let i = 0; i < Math.floor(count * 0.028); i++) {
      const t = Math.random()
      points.push({
        x: cx + 110 * s + t * 18 * s + (Math.random() - 0.5) * 2 * s,
        y: cy + (Math.random() - 0.5) * 6 * s,
      })
    }

    // Sparse
    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const base = points[Math.floor(Math.random() * points.length)]
      if (base) points.push({ x: base.x + (Math.random() - 0.5) * 45 * s, y: base.y + (Math.random() - 0.5) * 45 * s })
    }

    // Rotazione globale 22°
    const cosA = Math.cos((22 * Math.PI) / 180)
    const sinA = Math.sin((22 * Math.PI) / 180)
    return points.slice(0, count).map(p => {
      const dx = p.x - cx; const dy = p.y - cy
      return { x: cx + dx * cosA - dy * sinA, y: cy + dx * sinA + dy * cosA }
    })
  }, [])

  // ── 2. DOPPIA ELICA DNA ──────────────────────────────────────────────────────
  const generateDNAPoints = useCallback((w: number, h: number, count: number) => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.5; const cy = h * 0.5
    const s  = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)
    const helixHeight  = 240 * s
    const helixRadius  = 50 * s
    const turns        = 3.5
    const thickness    = 4 * s

    const strand = Math.floor(count * 0.35)
    for (let i = 0; i < strand; i++) {
      const t = Math.random()
      const y = cy - helixHeight / 2 + t * helixHeight
      const a = t * turns * Math.PI * 2
      points.push({ x: cx + Math.cos(a) * helixRadius + (Math.random() - 0.5) * thickness, y: y + (Math.random() - 0.5) * thickness })
    }
    for (let i = 0; i < strand; i++) {
      const t = Math.random()
      const y = cy - helixHeight / 2 + t * helixHeight
      const a = t * turns * Math.PI * 2 + Math.PI
      points.push({ x: cx + Math.cos(a) * helixRadius + (Math.random() - 0.5) * thickness, y: y + (Math.random() - 0.5) * thickness })
    }

    const bridge = Math.floor(count * 0.2)
    const numBridges = 28
    for (let i = 0; i < bridge; i++) {
      const bi = Math.floor(Math.random() * numBridges)
      const t  = (bi + 0.5) / numBridges
      const y  = cy - helixHeight / 2 + t * helixHeight
      const a  = t * turns * Math.PI * 2
      const x1 = cx + Math.cos(a) * helixRadius
      const x2 = cx + Math.cos(a + Math.PI) * helixRadius
      const bt = Math.random()
      points.push({ x: x1 + (x2 - x1) * bt + (Math.random() - 0.5) * 3 * s, y: y + (Math.random() - 0.5) * 3 * s })
    }

    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const base = points[Math.floor(Math.random() * points.length)]
      if (base) points.push({ x: base.x + (Math.random() - 0.5) * 35 * s, y: base.y + (Math.random() - 0.5) * 35 * s })
    }

    const cosA = Math.cos((8 * Math.PI) / 180); const sinA = Math.sin((8 * Math.PI) / 180)
    return points.slice(0, count).map(p => {
      const dx = p.x - cx; const dy = p.y - cy
      return { x: cx + dx * cosA - dy * sinA, y: cy + dx * sinA + dy * cosA }
    })
  }, [])

  // ── 3. RETICOLO 3D PRINTING (proiezione isometrica) ─────────────────────────
  const generateLatticePoints = useCallback((w: number, h: number, count: number) => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.5
    const cy = h * 0.5
    const s  = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    const cubeSize     = 160 * s
    const isoAngle     = Math.PI / 6
    const cellsPerAxis = 5
    const cellSize     = cubeSize / cellsPerAxis
    const strutThick   = 3 * s

    const project = (x3: number, y3: number, z3: number) => ({
      x: cx + (x3 - z3) * Math.cos(isoAngle) * 0.9,
      y: cy - y3 * 0.9 + (x3 + z3) * Math.sin(isoAngle) * 0.45,
    })

    // Struts paralleli a X
    for (let iy = 0; iy <= cellsPerAxis; iy++) {
      for (let iz = 0; iz <= cellsPerAxis; iz++) {
        const y3 = -cubeSize / 2 + iy * cellSize
        const z3 = -cubeSize / 2 + iz * cellSize
        const n  = Math.floor(count * 0.018)
        for (let i = 0; i < n; i++) {
          const p2d = project(-cubeSize / 2 + Math.random() * cubeSize, y3, z3)
          points.push({ x: p2d.x + (Math.random() - 0.5) * strutThick, y: p2d.y + (Math.random() - 0.5) * strutThick })
        }
      }
    }

    // Struts paralleli a Y
    for (let ix = 0; ix <= cellsPerAxis; ix++) {
      for (let iz = 0; iz <= cellsPerAxis; iz++) {
        const x3 = -cubeSize / 2 + ix * cellSize
        const z3 = -cubeSize / 2 + iz * cellSize
        const n  = Math.floor(count * 0.018)
        for (let i = 0; i < n; i++) {
          const p2d = project(x3, -cubeSize / 2 + Math.random() * cubeSize, z3)
          points.push({ x: p2d.x + (Math.random() - 0.5) * strutThick, y: p2d.y + (Math.random() - 0.5) * strutThick })
        }
      }
    }

    // Struts paralleli a Z
    for (let ix = 0; ix <= cellsPerAxis; ix++) {
      for (let iy = 0; iy <= cellsPerAxis; iy++) {
        const x3 = -cubeSize / 2 + ix * cellSize
        const y3 = -cubeSize / 2 + iy * cellSize
        const n  = Math.floor(count * 0.018)
        for (let i = 0; i < n; i++) {
          const p2d = project(x3, y3, -cubeSize / 2 + Math.random() * cubeSize)
          points.push({ x: p2d.x + (Math.random() - 0.5) * strutThick, y: p2d.y + (Math.random() - 0.5) * strutThick })
        }
      }
    }

    // Diagonali interne (pattern gyroid-like)
    for (let ix = 0; ix < cellsPerAxis; ix++) {
      for (let iy = 0; iy < cellsPerAxis; iy++) {
        for (let iz = 0; iz < cellsPerAxis; iz++) {
          if ((ix + iy + iz) % 2 === 0) {
            const bx = -cubeSize / 2 + ix * cellSize
            const by = -cubeSize / 2 + iy * cellSize
            const bz = -cubeSize / 2 + iz * cellSize
            const n  = Math.floor(count * 0.003)
            for (let i = 0; i < n; i++) {
              const t   = Math.random()
              const p2d = project(bx + t * cellSize, by + t * cellSize, bz + t * cellSize)
              points.push({ x: p2d.x + (Math.random() - 0.5) * strutThick * 0.8, y: p2d.y + (Math.random() - 0.5) * strutThick * 0.8 })
            }
          }
        }
      }
    }

    // Nodi ai vertici del reticolo
    const nodeR = 4 * s
    for (let ix = 0; ix <= cellsPerAxis; ix++) {
      for (let iy = 0; iy <= cellsPerAxis; iy++) {
        for (let iz = 0; iz <= cellsPerAxis; iz++) {
          const isBorder = ix === 0 || ix === cellsPerAxis || iy === 0 || iy === cellsPerAxis || iz === 0 || iz === cellsPerAxis
          if (isBorder || (ix + iy + iz) % 2 === 0) {
            const p2d = project(
              -cubeSize / 2 + ix * cellSize,
              -cubeSize / 2 + iy * cellSize,
              -cubeSize / 2 + iz * cellSize
            )
            const n = Math.floor(count * 0.0008)
            for (let i = 0; i < n; i++) {
              const a = Math.random() * Math.PI * 2
              const r = Math.sqrt(Math.random()) * nodeR
              points.push({ x: p2d.x + Math.cos(a) * r, y: p2d.y + Math.sin(a) * r })
            }
          }
        }
      }
    }

    // Piattaforma di stampa
    const bottomY = project(0, -cubeSize / 2, 0).y + 15 * s
    for (let i = 0; i < Math.floor(count * 0.03); i++) {
      const p2d = project(
        (Math.random() - 0.5) * cubeSize * 1.3,
        -cubeSize / 2 - 10 * s,
        (Math.random() - 0.5) * cubeSize * 0.6
      )
      points.push({ x: p2d.x + (Math.random() - 0.5) * 2 * s, y: bottomY + (Math.random() - 0.5) * 8 * s })
    }

    // Sparse
    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const base = points[Math.floor(Math.random() * points.length)]
      if (base) points.push({ x: base.x + (Math.random() - 0.5) * 35 * s, y: base.y + (Math.random() - 0.5) * 35 * s })
    }

    const cosA = Math.cos((3 * Math.PI) / 180)
    const sinA = Math.sin((3 * Math.PI) / 180)
    return points.slice(0, count).map(p => {
      const dx = p.x - cx; const dy = p.y - cy
      return { x: cx + dx * cosA - dy * sinA, y: cy + dx * sinA + dy * cosA }
    })
  }, [])

  // ── 4. MOLECOLA STILIZZATA ───────────────────────────────────────────────────
  const generateMoleculePoints = useCallback((w: number, h: number, count: number) => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.50
    const cy = h * 0.50
    const s  = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    const ringRadius   = 48 * s
    const atomR        = 11 * s
    const bondThick    = 3.5 * s
    const NUM_VERTICES = 6

    // Helper: cluster di particelle (atomo)
    const addAtom = (ax: number, ay: number, r: number, weight: number) => {
      const n = Math.floor(count * weight)
      for (let i = 0; i < n; i++) {
        const a   = Math.random() * Math.PI * 2
        const rad = Math.sqrt(Math.random()) * r
        points.push({ x: ax + Math.cos(a) * rad, y: ay + Math.sin(a) * rad })
      }
    }

    // Helper: legame (bond) tra due atomi
    const addBond = (x1: number, y1: number, x2: number, y2: number, halfW: number, weight: number) => {
      const n     = Math.floor(count * weight)
      const angle = Math.atan2(y2 - y1, x2 - x1)
      const perp  = angle + Math.PI / 2
      for (let i = 0; i < n; i++) {
        const t      = Math.random()
        const px     = x1 + (x2 - x1) * t
        const py     = y1 + (y2 - y1) * t
        const offset = (Math.random() - 0.5) * halfW * 2
        points.push({ x: px + Math.cos(perp) * offset, y: py + Math.sin(perp) * offset })
      }
    }

    // ── Anello centrale a 6 termini (benzene-like) ──
    const ringAtoms: { x: number; y: number }[] = []
    for (let i = 0; i < NUM_VERTICES; i++) {
      const a = (i * Math.PI * 2) / NUM_VERTICES - Math.PI / 2
      const ax = cx + Math.cos(a) * ringRadius
      const ay = cy + Math.sin(a) * ringRadius
      ringAtoms.push({ x: ax, y: ay })
      addAtom(ax, ay, atomR, 0.024)
    }

    // Legami del ring
    for (let i = 0; i < NUM_VERTICES; i++) {
      const a = ringAtoms[i]
      const b = ringAtoms[(i + 1) % NUM_VERTICES]
      addBond(a.x, a.y, b.x, b.y, bondThick, 0.026)
    }

    // Doppio legame interno (cerchio concentrico parziale)
    const innerR = ringRadius * 0.56
    for (let i = 0; i < NUM_VERTICES; i++) {
      const a1 = ((i + 0.18) * Math.PI * 2) / NUM_VERTICES - Math.PI / 2
      const a2 = ((i + 0.82) * Math.PI * 2) / NUM_VERTICES - Math.PI / 2
      addBond(
        cx + Math.cos(a1) * innerR, cy + Math.sin(a1) * innerR,
        cx + Math.cos(a2) * innerR, cy + Math.sin(a2) * innerR,
        bondThick * 0.55, 0.010
      )
    }

    // ── Catene laterali ai vertici 0, 2, 4 ──
    const branchLen  = 62 * s
    const branchIdxs = [0, 2, 4]

    for (const idx of branchIdxs) {
      const va = ringAtoms[idx]
      const a  = (idx * Math.PI * 2) / NUM_VERTICES - Math.PI / 2 // angolo dal centro

      // Atomo B (fine della catena primaria)
      const bx = cx + Math.cos(a) * (ringRadius + branchLen)
      const by = cy + Math.sin(a) * (ringRadius + branchLen)
      addBond(va.x, va.y, bx, by, bondThick, 0.022)
      addAtom(bx, by, atomR * 1.25, 0.028)

      // Catena secondaria che si biforca a +60° e −60°
      const sec1Angle = a + Math.PI / 3
      const sec2Angle = a - Math.PI / 3
      const secLen    = 40 * s
      const secAtomR  = atomR * 0.85

      const s1x = bx + Math.cos(sec1Angle) * secLen
      const s1y = by + Math.sin(sec1Angle) * secLen
      addBond(bx, by, s1x, s1y, bondThick * 0.7, 0.013)
      addAtom(s1x, s1y, secAtomR, 0.014)

      const s2x = bx + Math.cos(sec2Angle) * secLen
      const s2y = by + Math.sin(sec2Angle) * secLen
      addBond(bx, by, s2x, s2y, bondThick * 0.7, 0.013)
      addAtom(s2x, s2y, secAtomR, 0.014)
    }

    // Atomo centrale (nucleo)
    addAtom(cx, cy, atomR * 0.7, 0.015)

    // Sparse
    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const base = points[Math.floor(Math.random() * points.length)]
      if (base) points.push({ x: base.x + (Math.random() - 0.5) * 28 * s, y: base.y + (Math.random() - 0.5) * 28 * s })
    }

    return points.slice(0, count)
  }, [])

  // ── Lista delle 4 forme ──────────────────────────────────────────────────────
  const shapeGenerators = useCallback((w: number, h: number) => [
    generateAirplanePoints(w, h, PARTICLE_COUNT),
    generateDNAPoints(w, h, PARTICLE_COUNT),
    generateLatticePoints(w, h, PARTICLE_COUNT),
    generateMoleculePoints(w, h, PARTICLE_COUNT),
  ], [generateAirplanePoints, generateDNAPoints, generateLatticePoints, generateMoleculePoints])

  // ── Inizializzazione particelle ──────────────────────────────────────────────
  const initParticles = useCallback((w: number, h: number) => {
    const shapes  = shapeGenerators(w, h)
    const targets = shapes[0]
    currentTargetsRef.current   = targets
    nextTargetsRef.current      = shapes[1]
    shapeIndexRef.current       = 0
    shapeTimeRef.current        = 0
    isTransitioningRef.current  = false
    transitionProgressRef.current = 0

    particlesRef.current = targets.map(t => ({
      tx: t.x, ty: t.y,
      x:  t.x + (Math.random() - 0.5) * w * 0.5,
      y:  t.y + (Math.random() - 0.5) * h * 0.5,
      offsetX: 0, offsetY: 0,
      speed:     0.4 + Math.random() * 0.9,
      phase:     Math.random() * Math.PI * 2,
      amplitude: 2 + Math.random() * 5,
      size:      0.5 + Math.random() * 1.8,
      alpha:     0.3 + Math.random() * 0.7,
    }))
  }, [shapeGenerators])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr    = window.devicePixelRatio || 1
      const parent = canvas.parentElement
      const w = parent ? parent.clientWidth  : window.innerWidth
      const h = parent ? parent.clientHeight : window.innerHeight
      canvas.width  = w * dpr; canvas.height = h * dpr
      canvas.style.width  = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dimensionsRef.current = { w, h }
      initParticles(w, h)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    let time = 0
    lastTimestampRef.current = performance.now()

    const animate = (timestamp: number) => {
      const { w, h } = dimensionsRef.current
      ctx.clearRect(0, 0, w, h)
      time += 0.012

      const deltaMs = timestamp - lastTimestampRef.current
      lastTimestampRef.current = timestamp
      shapeTimeRef.current += deltaMs

      // ── Avvia transizione alla forma successiva ──
      if (!isTransitioningRef.current && shapeTimeRef.current >= SHAPE_DURATION) {
        isTransitioningRef.current    = true
        transitionProgressRef.current = 0
        shapeTimeRef.current          = 0
        const nextIndex = (shapeIndexRef.current + 1) % NUM_SHAPES
        nextTargetsRef.current = shapeGenerators(w, h)[nextIndex]
      }

      if (isTransitioningRef.current) {
        transitionProgressRef.current += deltaMs / TRANSITION_DURATION
        if (transitionProgressRef.current >= 1) {
          transitionProgressRef.current = 1
          isTransitioningRef.current    = false
          shapeTimeRef.current          = 0
          shapeIndexRef.current         = (shapeIndexRef.current + 1) % NUM_SHAPES
          currentTargetsRef.current     = nextTargetsRef.current
          for (let i = 0; i < particlesRef.current.length; i++) {
            const target = currentTargetsRef.current[i]
            if (target) { particlesRef.current[i].tx = target.x; particlesRef.current[i].ty = target.y }
          }
        } else {
          const t    = transitionProgressRef.current
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
          for (let i = 0; i < particlesRef.current.length; i++) {
            const cur  = currentTargetsRef.current[i]
            const next = nextTargetsRef.current[i]
            if (cur && next) {
              particlesRef.current[i].tx = cur.x + (next.x - cur.x) * ease
              particlesRef.current[i].ty = cur.y + (next.y - cur.y) * ease
            }
          }
        }
      }

      const mouse       = mouseRef.current
      const mouseRadius = 40
      const particles   = particlesRef.current

      // Centroide + raggio max per gradiente colore
      let centroidX = 0, centroidY = 0
      for (const p of particles) { centroidX += p.tx; centroidY += p.ty }
      centroidX /= particles.length; centroidY /= particles.length
      let maxDist = 0
      for (const p of particles) {
        const d = Math.sqrt((p.tx - centroidX) ** 2 + (p.ty - centroidY) ** 2)
        if (d > maxDist) maxDist = d
      }
      if (maxDist === 0) maxDist = 1

      for (const p of particles) {
        // Fluttuamento organico a tre layer
        const w1x = Math.sin(time * p.speed         + p.phase)           * p.amplitude
        const w1y = Math.cos(time * p.speed * 0.8   + p.phase + 1)       * p.amplitude
        const w2x = Math.sin(time * p.speed * 0.3   + p.phase * 2.7)     * p.amplitude * 1.5
        const w2y = Math.cos(time * p.speed * 0.25  + p.phase * 1.3 + 2.5) * p.amplitude * 1.5
        const w3x = Math.sin(time * p.speed * 3.2   + p.phase * 5.1)     * p.amplitude * 0.3
        const w3y = Math.cos(time * p.speed * 2.8   + p.phase * 4.3)     * p.amplitude * 0.3
        p.offsetX = w1x + w2x + w3x
        p.offsetY = w1y + w2y + w3y

        p.x += (p.tx + p.offsetX - p.x) * 0.06
        p.y += (p.ty + p.offsetY - p.y) * 0.06

        // Repulsione mouse organica
        const dx = p.x - mouse.x; const dy = p.y - mouse.y
        const distSq = dx * dx + dy * dy
        if (distSq < mouseRadius * mouseRadius && distSq > 0) {
          const dist         = Math.sqrt(distSq)
          const noiseRadius  = 0.7 + 0.6 * Math.sin(p.phase * 7.3 + time * 0.5)
          const effectiveNorm = Math.min((dist / mouseRadius) / noiseRadius, 1)
          const forceIntensity = 0.6 + 0.8 * Math.abs(Math.sin(p.phase * 3.7))
          const force        = Math.pow(1 - effectiveNorm, 3) * 12 * forceIntensity
          const angleDeviation = Math.sin(p.phase * 11.1 + time * 1.3) * 0.8 + Math.cos(p.phase * 5.3 - time * 0.7) * 0.4
          const finalAngle   = Math.atan2(dy, dx) + angleDeviation
          p.x += Math.cos(finalAngle) * force
          p.y += Math.sin(finalAngle) * force
        }

        // Colore per distanza dal centro: arancione → violetto → blu
        const normDist = Math.min(
          Math.sqrt((p.tx - centroidX) ** 2 + (p.ty - centroidY) ** 2) / maxDist, 1
        )
        let r: number, g: number, b: number
        if (normDist < 0.25) {
          const t2 = normDist / 0.25
          r = 248 + (130 - 248) * t2; g = 120 + (90 - 120) * t2; b = 40 + (200 - 40) * t2
        } else {
          const t2 = (normDist - 0.25) / 0.75
          r = 130 + (60 - 130) * t2; g = 90 + (140 - 90) * t2; b = 200 + (255 - 200) * t2
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${p.alpha})`
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [initParticles, shapeGenerators])

  return (
    <section className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute bottom-0 left-0 inset-0 w-auto h-full" />
    </section>
  )
}
