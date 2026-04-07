'use client'

import { useEffect, useRef, useCallback } from 'react'


interface Particle {
  tx: number
  ty: number
  x: number
  y: number
  offsetX: number
  offsetY: number
  speed: number
  phase: number
  amplitude: number
  size: number
  alpha: number
}

const SHAPE_DURATION = 3000 // 3 secondi per forma
const TRANSITION_DURATION = 1500 // 1.5 secondi per la transizione
const PARTICLE_COUNT = 4200 // numero fisso di particelle

export default function ElementiSettori() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef<number>(0)
  const dimensionsRef = useRef({ w: 0, h: 0 })
  const shapeIndexRef = useRef(0)
  const shapeTimeRef = useRef(0)
  const lastTimestampRef = useRef(0)
  const currentTargetsRef = useRef<{ x: number; y: number }[]>([])
  const nextTargetsRef = useRef<{ x: number; y: number }[]>([])
  const isTransitioningRef = useRef(false)
  const transitionProgressRef = useRef(0)

  // ── GENERA PUNTI AEREO (vista dall'alto) ──
  const generateAirplanePoints = useCallback((w: number, h: number, count: number): { x: number; y: number }[] => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.50
    const cy = h * 0.50
    const s = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    // Fusoliera
    for (let i = 0; i < Math.floor(count * 0.19); i++) {
      const t = (Math.random() - 0.5) * 2
      const length = 130 * s
      const normalT = (t + 1) / 2
      const widthProfile = Math.sin(normalT * Math.PI) * 8 * s
      points.push({
        x: cx + t * length + (Math.random() - 0.5) * 2 * s,
        y: cy + (Math.random() - 0.5) * widthProfile * 2,
      })
    }

    // Muso
    for (let i = 0; i < Math.floor(count * 0.048); i++) {
      const t = Math.random()
      const noseX = cx + 130 * s + t * 20 * s
      const taper = (1 - t * t) * 7 * s
      points.push({
        x: noseX + (Math.random() - 0.5) * 1.5 * s,
        y: cy + (Math.random() - 0.5) * taper,
      })
    }

    // Coda
    for (let i = 0; i < Math.floor(count * 0.036); i++) {
      const t = Math.random()
      const tailX = cx - 130 * s - t * 25 * s
      const taper = (1 - t) * 7 * s
      points.push({
        x: tailX + (Math.random() - 0.5) * 2 * s,
        y: cy + (Math.random() - 0.5) * taper,
      })
    }

    // Ala sinistra
    for (let i = 0; i < Math.floor(count * 0.167); i++) {
      const t = Math.random()
      const span = 110 * s
      const yPos = cy - t * span
      const chordRoot = 70 * s
      const chordTip = 15 * s
      const chord = chordRoot * (1 - t) + chordTip * t
      const sweep = t * 40 * s
      const leadingEdge = cx + 20 * s - sweep
      points.push({
        x: leadingEdge - Math.random() * chord + (Math.random() - 0.5) * 2 * s,
        y: yPos + (Math.random() - 0.5) * 3 * s,
      })
    }

    // Ala destra
    for (let i = 0; i < Math.floor(count * 0.167); i++) {
      const t = Math.random()
      const span = 110 * s
      const yPos = cy + t * span
      const chordRoot = 70 * s
      const chordTip = 15 * s
      const chord = chordRoot * (1 - t) + chordTip * t
      const sweep = t * 40 * s
      const leadingEdge = cx + 20 * s - sweep
      points.push({
        x: leadingEdge - Math.random() * chord + (Math.random() - 0.5) * 2 * s,
        y: yPos + (Math.random() - 0.5) * 3 * s,
      })
    }

    // Stabilizzatore sinistro
    for (let i = 0; i < Math.floor(count * 0.071); i++) {
      const t = Math.random()
      const span = 35 * s
      const yPos = cy - t * span
      const chordRoot = 30 * s
      const chordTip = 10 * s
      const chord = chordRoot * (1 - t) + chordTip * t
      const sweep = t * 15 * s
      const leadingEdge = cx - 125 * s - sweep
      points.push({
        x: leadingEdge - Math.random() * chord + (Math.random() - 0.5) * 2 * s,
        y: yPos + (Math.random() - 0.5) * 2 * s,
      })
    }

    // Stabilizzatore destro
    for (let i = 0; i < Math.floor(count * 0.071); i++) {
      const t = Math.random()
      const span = 35 * s
      const yPos = cy + t * span
      const chordRoot = 30 * s
      const chordTip = 10 * s
      const chord = chordRoot * (1 - t) + chordTip * t
      const sweep = t * 15 * s
      const leadingEdge = cx - 125 * s - sweep
      points.push({
        x: leadingEdge - Math.random() * chord + (Math.random() - 0.5) * 2 * s,
        y: yPos + (Math.random() - 0.5) * 2 * s,
      })
    }

    // Pinna di coda
    for (let i = 0; i < Math.floor(count * 0.036); i++) {
      const t = Math.random()
      const length = 40 * s
      points.push({
        x: cx - 130 * s - t * length + (Math.random() - 0.5) * 3 * s,
        y: cy + (Math.random() - 0.5) * 2.5 * s,
      })
    }

    // Motore sinistro
    for (let i = 0; i < Math.floor(count * 0.036); i++) {
      const t = (Math.random() - 0.5) * 2
      const engineLength = 20 * s
      const engineWidth = 5 * s
      const profile = (1 - t * t) * engineWidth
      points.push({
        x: cx + 5 * s + t * engineLength + (Math.random() - 0.5) * 2 * s,
        y: cy - 45 * s + (Math.random() - 0.5) * profile * 2,
      })
    }

    // Motore destro
    for (let i = 0; i < Math.floor(count * 0.036); i++) {
      const t = (Math.random() - 0.5) * 2
      const engineLength = 20 * s
      const engineWidth = 5 * s
      const profile = (1 - t * t) * engineWidth
      points.push({
        x: cx + 5 * s + t * engineLength + (Math.random() - 0.5) * 2 * s,
        y: cy + 45 * s + (Math.random() - 0.5) * profile * 2,
      })
    }

    // Cabina
    for (let i = 0; i < Math.floor(count * 0.024); i++) {
      const t = Math.random()
      const cockpitLength = 18 * s
      points.push({
        x: cx + 110 * s + t * cockpitLength + (Math.random() - 0.5) * 2 * s,
        y: cy + (Math.random() - 0.5) * 6 * s,
      })
    }

    // Particelle sparse
    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const basePoint = points[Math.floor(Math.random() * points.length)]
      if (basePoint) {
        points.push({
          x: basePoint.x + (Math.random() - 0.5) * 45 * s,
          y: basePoint.y + (Math.random() - 0.5) * 45 * s,
        })
      }
    }

    // Rotazione globale
    const angle = (22 * Math.PI) / 180
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)

    return points.slice(0, count).map((p) => {
      const dx = p.x - cx
      const dy = p.y - cy
      return {
        x: cx + dx * cosA - dy * sinA,
        y: cy + dx * sinA + dy * cosA,
      }
    })
  }, [])

  // ── GENERA PUNTI DOPPIA ELICA DNA ──
  const generateDNAPoints = useCallback((w: number, h: number, count: number): { x: number; y: number }[] => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.5
    const cy = h * 0.5
    const s = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    const helixHeight = 240 * s
    const helixRadius = 50 * s
    const turns = 3.5
    const strandThickness = 4 * s

    const strandCount = Math.floor(count * 0.35)
    for (let i = 0; i < strandCount; i++) {
      const t = Math.random()
      const y = cy - helixHeight / 2 + t * helixHeight
      const angle = t * turns * Math.PI * 2
      const x1 = cx + Math.cos(angle) * helixRadius
      points.push({
        x: x1 + (Math.random() - 0.5) * strandThickness,
        y: y + (Math.random() - 0.5) * strandThickness,
      })
    }

    for (let i = 0; i < strandCount; i++) {
      const t = Math.random()
      const y = cy - helixHeight / 2 + t * helixHeight
      const angle = t * turns * Math.PI * 2 + Math.PI
      const x2 = cx + Math.cos(angle) * helixRadius
      points.push({
        x: x2 + (Math.random() - 0.5) * strandThickness,
        y: y + (Math.random() - 0.5) * strandThickness,
      })
    }

    const bridgeCount = Math.floor(count * 0.2)
    const numBridges = 28
    for (let i = 0; i < bridgeCount; i++) {
      const bridgeIndex = Math.floor(Math.random() * numBridges)
      const t = (bridgeIndex + 0.5) / numBridges
      const y = cy - helixHeight / 2 + t * helixHeight
      const angle = t * turns * Math.PI * 2
      const x1 = cx + Math.cos(angle) * helixRadius
      const x2 = cx + Math.cos(angle + Math.PI) * helixRadius
      const bridgeT = Math.random()
      points.push({
        x: x1 + (x2 - x1) * bridgeT + (Math.random() - 0.5) * 3 * s,
        y: y + (Math.random() - 0.5) * 3 * s,
      })
    }

    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const basePoint = points[Math.floor(Math.random() * points.length)]
      if (basePoint) {
        points.push({
          x: basePoint.x + (Math.random() - 0.5) * 35 * s,
          y: basePoint.y + (Math.random() - 0.5) * 35 * s,
        })
      }
    }

    const rotAngle = (8 * Math.PI) / 180
    const cosA = Math.cos(rotAngle)
    const sinA = Math.sin(rotAngle)

    return points.slice(0, count).map((p) => {
      const dx = p.x - cx
      const dy = p.y - cy
      return {
        x: cx + dx * cosA - dy * sinA,
        y: cy + dx * sinA + dy * cosA,
      }
    })
  }, [])

  // ── GENERA PUNTI RETICOLO 3D PRINTING ──
  const generateRobotArmPoints = useCallback((w: number, h: number, count: number): { x: number; y: number }[] => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.5
    const cy = h * 0.5
    const s = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    const cubeSize = 160 * s

    const isoAngle = Math.PI / 6
    const project = (x3: number, y3: number, z3: number) => ({
      x: cx + (x3 - z3) * Math.cos(isoAngle) * 0.9,
      y: cy - y3 * 0.9 + (x3 + z3) * Math.sin(isoAngle) * 0.45,
    })

    const cellsPerAxis = 5
    const cellSize = cubeSize / cellsPerAxis
    const strutThickness = 3 * s

    for (let iy = 0; iy <= cellsPerAxis; iy++) {
      for (let iz = 0; iz <= cellsPerAxis; iz++) {
        const y3 = -cubeSize / 2 + iy * cellSize
        const z3 = -cubeSize / 2 + iz * cellSize
        const numDots = Math.floor(count * 0.018)
        for (let i = 0; i < numDots; i++) {
          const t = Math.random()
          const x3 = -cubeSize / 2 + t * cubeSize
          const p2d = project(x3, y3, z3)
          points.push({
            x: p2d.x + (Math.random() - 0.5) * strutThickness,
            y: p2d.y + (Math.random() - 0.5) * strutThickness,
          })
        }
      }
    }

    for (let ix = 0; ix <= cellsPerAxis; ix++) {
      for (let iz = 0; iz <= cellsPerAxis; iz++) {
        const x3 = -cubeSize / 2 + ix * cellSize
        const z3 = -cubeSize / 2 + iz * cellSize
        const numDots = Math.floor(count * 0.018)
        for (let i = 0; i < numDots; i++) {
          const t = Math.random()
          const y3 = -cubeSize / 2 + t * cubeSize
          const p2d = project(x3, y3, z3)
          points.push({
            x: p2d.x + (Math.random() - 0.5) * strutThickness,
            y: p2d.y + (Math.random() - 0.5) * strutThickness,
          })
        }
      }
    }

    for (let ix = 0; ix <= cellsPerAxis; ix++) {
      for (let iy = 0; iy <= cellsPerAxis; iy++) {
        const x3 = -cubeSize / 2 + ix * cellSize
        const y3 = -cubeSize / 2 + iy * cellSize
        const numDots = Math.floor(count * 0.018)
        for (let i = 0; i < numDots; i++) {
          const t = Math.random()
          const z3 = -cubeSize / 2 + t * cubeSize
          const p2d = project(x3, y3, z3)
          points.push({
            x: p2d.x + (Math.random() - 0.5) * strutThickness,
            y: p2d.y + (Math.random() - 0.5) * strutThickness,
          })
        }
      }
    }

    for (let ix = 0; ix < cellsPerAxis; ix++) {
      for (let iy = 0; iy < cellsPerAxis; iy++) {
        for (let iz = 0; iz < cellsPerAxis; iz++) {
          if ((ix + iy + iz) % 2 === 0) {
            const baseX = -cubeSize / 2 + ix * cellSize
            const baseY = -cubeSize / 2 + iy * cellSize
            const baseZ = -cubeSize / 2 + iz * cellSize
            const numDots = Math.floor(count * 0.003)
            for (let i = 0; i < numDots; i++) {
              const t = Math.random()
              const x3 = baseX + t * cellSize
              const y3 = baseY + t * cellSize
              const z3 = baseZ + t * cellSize
              const p2d = project(x3, y3, z3)
              points.push({
                x: p2d.x + (Math.random() - 0.5) * strutThickness * 0.8,
                y: p2d.y + (Math.random() - 0.5) * strutThickness * 0.8,
              })
            }
          }
        }
      }
    }

    const nodeRadius = 4 * s
    for (let ix = 0; ix <= cellsPerAxis; ix++) {
      for (let iy = 0; iy <= cellsPerAxis; iy++) {
        for (let iz = 0; iz <= cellsPerAxis; iz++) {
          const isBorder = ix === 0 || ix === cellsPerAxis ||
                           iy === 0 || iy === cellsPerAxis ||
                           iz === 0 || iz === cellsPerAxis
          if (isBorder || (ix + iy + iz) % 2 === 0) {
            const x3 = -cubeSize / 2 + ix * cellSize
            const y3 = -cubeSize / 2 + iy * cellSize
            const z3 = -cubeSize / 2 + iz * cellSize
            const p2d = project(x3, y3, z3)
            const numDots = Math.floor(count * 0.0008)
            for (let i = 0; i < numDots; i++) {
              const angle = Math.random() * Math.PI * 2
              const r = Math.sqrt(Math.random()) * nodeRadius
              points.push({
                x: p2d.x + Math.cos(angle) * r,
                y: p2d.y + Math.sin(angle) * r,
              })
            }
          }
        }
      }
    }

    const platformW = cubeSize * 1.3
    const platformH = 8 * s
    const bottomY = project(0, -cubeSize / 2, 0).y + 15 * s
    for (let i = 0; i < Math.floor(count * 0.03); i++) {
      const t = (Math.random() - 0.5)
      const tz = (Math.random() - 0.5)
      const p2d = project(t * platformW, -cubeSize / 2 - 10 * s, tz * platformW * 0.6)
      points.push({
        x: p2d.x + (Math.random() - 0.5) * 2 * s,
        y: bottomY + (Math.random() - 0.5) * platformH,
      })
    }

    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const basePoint = points[Math.floor(Math.random() * points.length)]
      if (basePoint) {
        points.push({
          x: basePoint.x + (Math.random() - 0.5) * 35 * s,
          y: basePoint.y + (Math.random() - 0.5) * 35 * s,
        })
      }
    }

    const rotAngle = (3 * Math.PI) / 180
    const cosA = Math.cos(rotAngle)
    const sinA = Math.sin(rotAngle)

    return points.slice(0, count).map((p) => {
      const dx = p.x - cx
      const dy = p.y - cy
      return {
        x: cx + dx * cosA - dy * sinA,
        y: cy + dx * sinA + dy * cosA,
      }
    })
  }, [])

  // ── LISTA DELLE FORME ──
  const shapeGenerators = useCallback((w: number, h: number) => [
    generateAirplanePoints(w, h, PARTICLE_COUNT),
    generateDNAPoints(w, h, PARTICLE_COUNT),
    generateRobotArmPoints(w, h, PARTICLE_COUNT),
  ], [generateAirplanePoints, generateDNAPoints, generateRobotArmPoints])

  // Inizializza le particelle
  const initParticles = useCallback((w: number, h: number) => {
    const shapes = shapeGenerators(w, h)
    const targets = shapes[0]
    currentTargetsRef.current = targets
    nextTargetsRef.current = shapes[1]
    shapeIndexRef.current = 0
    shapeTimeRef.current = 0
    isTransitioningRef.current = false
    transitionProgressRef.current = 0

    particlesRef.current = targets.map((t) => ({
      tx: t.x,
      ty: t.y,
      x: t.x + (Math.random() - 0.5) * w * 0.5,
      y: t.y + (Math.random() - 0.5) * h * 0.5,
      offsetX: 0,
      offsetY: 0,
      speed: 0.4 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      amplitude: 2 + Math.random() * 5,
      size: 0.5 + Math.random() * 1.8,
      alpha: 0.3 + Math.random() * 0.7,
    }))
  }, [shapeGenerators])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const parent = canvas.parentElement
      const w = parent ? parent.clientWidth : window.innerWidth
      const h = parent ? parent.clientHeight : window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dimensionsRef.current = { w, h }
      initParticles(w, h)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

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

      // ── Gestione transizione tra forme ──
      if (!isTransitioningRef.current && shapeTimeRef.current >= SHAPE_DURATION) {
        isTransitioningRef.current = true
        transitionProgressRef.current = 0
        shapeTimeRef.current = 0

        const numShapes = 3
        const nextIndex = (shapeIndexRef.current + 1) % numShapes
        const shapes = shapeGenerators(w, h)
        nextTargetsRef.current = shapes[nextIndex]
      }

      if (isTransitioningRef.current) {
        transitionProgressRef.current += deltaMs / TRANSITION_DURATION
        if (transitionProgressRef.current >= 1) {
          transitionProgressRef.current = 1
          isTransitioningRef.current = false
          shapeTimeRef.current = 0
          shapeIndexRef.current = (shapeIndexRef.current + 1) % 3
          currentTargetsRef.current = nextTargetsRef.current

          for (let i = 0; i < particlesRef.current.length; i++) {
            const target = currentTargetsRef.current[i]
            if (target) {
              particlesRef.current[i].tx = target.x
              particlesRef.current[i].ty = target.y
            }
          }
        } else {
          const t = transitionProgressRef.current
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

          for (let i = 0; i < particlesRef.current.length; i++) {
            const current = currentTargetsRef.current[i]
            const next = nextTargetsRef.current[i]
            if (current && next) {
              particlesRef.current[i].tx = current.x + (next.x - current.x) * ease
              particlesRef.current[i].ty = current.y + (next.y - current.y) * ease
            }
          }
        }
      }

      const mouse = mouseRef.current
      const mouseRadius = 40

      // ── Calcola centroide e raggio massimo per il gradiente colore ──
      const particles = particlesRef.current
      let centroidX = 0
      let centroidY = 0
      for (const p of particles) {
        centroidX += p.tx
        centroidY += p.ty
      }
      centroidX /= particles.length
      centroidY /= particles.length

      let maxDist = 0
      for (const p of particles) {
        const ddx = p.tx - centroidX
        const ddy = p.ty - centroidY
        const d = Math.sqrt(ddx * ddx + ddy * ddy)
        if (d > maxDist) maxDist = d
      }
      if (maxDist === 0) maxDist = 1

      for (const p of particles) {
        // Fluttuamento organico — triplo strato di oscillazione
        const wave1X = Math.sin(time * p.speed + p.phase) * p.amplitude
        const wave1Y = Math.cos(time * p.speed * 0.8 + p.phase + 1) * p.amplitude
        const wave2X = Math.sin(time * p.speed * 0.3 + p.phase * 2.7) * p.amplitude * 1.5
        const wave2Y = Math.cos(time * p.speed * 0.25 + p.phase * 1.3 + 2.5) * p.amplitude * 1.5
        const wave3X = Math.sin(time * p.speed * 3.2 + p.phase * 5.1) * p.amplitude * 0.3
        const wave3Y = Math.cos(time * p.speed * 2.8 + p.phase * 4.3) * p.amplitude * 0.3

        p.offsetX = wave1X + wave2X + wave3X
        p.offsetY = wave1Y + wave2Y + wave3Y

        // Lerp verso la posizione target
        p.x += (p.tx + p.offsetX - p.x) * 0.06
        p.y += (p.ty + p.offsetY - p.y) * 0.06

        // Repulsione dal mouse — organica e irregolare
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const distSq = dx * dx + dy * dy
        const radiusSq = mouseRadius * mouseRadius
        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq)
          const normalised = dist / mouseRadius

          const noiseRadius = 0.7 + 0.6 * Math.sin(p.phase * 7.3 + time * 0.5)
          const effectiveNorm = Math.min(normalised / noiseRadius, 1)

          const forceIntensity = 0.6 + 0.8 * Math.abs(Math.sin(p.phase * 3.7))
          const force = Math.pow(1 - effectiveNorm, 3) * 12 * forceIntensity

          const angleDeviation =
            Math.sin(p.phase * 11.1 + time * 1.3) * 0.8 +
            Math.cos(p.phase * 5.3 - time * 0.7) * 0.4
          const baseAngle = Math.atan2(dy, dx)
          const finalAngle = baseAngle + angleDeviation

          p.x += Math.cos(finalAngle) * force
          p.y += Math.sin(finalAngle) * force
        }

        // ── Colore basato sulla distanza dal centro della forma ──
        // Esterno = blu chiaro, intermedio = violetto, centro = arancione
        const distFromCenter = Math.sqrt(
          (p.tx - centroidX) * (p.tx - centroidX) +
          (p.ty - centroidY) * (p.ty - centroidY)
        )
        const normDist = Math.min(distFromCenter / maxDist, 1) // 0 = centro, 1 = bordo

        // Tre stop di colore:
        // centro (0.0): arancione  rgb(245, 130, 50)
        // medio  (0.4): violetto   rgb(140, 80, 180)
        // bordo  (1.0): blu chiaro rgb(70, 150, 255)
        let r: number, g: number, b: number
        if (normDist < 0.25) {
          // Arancione → Violetto (fascia stretta)
          const t2 = normDist / 0.25
          r = 248 + (130 - 248) * t2
          g = 120 + (90 - 120) * t2
          b = 40 + (200 - 40) * t2
        } else {
          // Violetto → Blu chiaro (fascia ampia)
          const t2 = (normDist - 0.25) / 0.75
          r = 130 + (60 - 130) * t2
          g = 90 + (140 - 90) * t2
          b = 200 + (255 - 200) * t2
        }


        // Disegna la particella
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${p.alpha})`
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
    <section className="relative w-full h-full overflow-hidden ">
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 inset-0 w-auto h-full"
      />
    </section>
  )
}