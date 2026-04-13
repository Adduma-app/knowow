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
const NUM_SHAPES        = 4      // aereo · DNA · auto · molecola

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

  // ── 1. AEREO (vista dall'alto — stile A320/B737) ────────────────────────────
  const generateAirplanePoints = useCallback((w: number, h: number, count: number) => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.50
    const cy = h * 0.50
    const s  = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    // ── Helpers locali ────────────────────────────────────────────────────────
    const addLine = (x1: number, y1: number, x2: number, y2: number, wt: number, thick: number) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const t = Math.random()
        points.push({ x: x1+(x2-x1)*t+(Math.random()-0.5)*thick, y: y1+(y2-y1)*t+(Math.random()-0.5)*thick })
      }
    }
    const addBez = (
      x0: number, y0: number, xc: number, yc: number, x1: number, y1: number,
      wt: number, thick: number,
    ) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const t = Math.random(); const mt = 1 - t
        points.push({
          x: mt*mt*x0+2*mt*t*xc+t*t*x1+(Math.random()-0.5)*thick,
          y: mt*mt*y0+2*mt*t*yc+t*t*y1+(Math.random()-0.5)*thick,
        })
      }
    }
    const addDisk = (ox: number, oy: number, r: number, wt: number) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const a = Math.random()*Math.PI*2; const rr = Math.sqrt(Math.random())*r
        points.push({ x: ox+Math.cos(a)*rr, y: oy+Math.sin(a)*rr })
      }
    }
    const addRing = (ox: number, oy: number, r: number, wt: number, thick: number) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const a = Math.random()*Math.PI*2; const rr = r-thick*0.5+Math.random()*thick
        points.push({ x: ox+Math.cos(a)*rr, y: oy+Math.sin(a)*rr })
      }
    }
    // Riempe la superficie tra due bezier (campionamento uniforme per lo stesso t)
    const fillWing = (
      x0a: number, y0a: number, xca: number, yca: number, x1a: number, y1a: number,
      x0b: number, y0b: number, xcb: number, ycb: number, x1b: number, y1b: number,
      wt: number, thick: number,
    ) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const t = Math.random(); const mt = 1 - t
        const ax = mt*mt*x0a+2*mt*t*xca+t*t*x1a
        const ay = mt*mt*y0a+2*mt*t*yca+t*t*y1a
        const bx = mt*mt*x0b+2*mt*t*xcb+t*t*x1b
        const by = mt*mt*y0b+2*mt*t*ycb+t*t*y1b
        const u = Math.random()
        points.push({ x: ax+(bx-ax)*u+(Math.random()-0.5)*thick, y: ay+(by-ay)*u+(Math.random()-0.5)*thick })
      }
    }

    // ── Proporzioni ───────────────────────────────────────────────────────────
    const fuseHL  = 145 * s   // metà lunghezza fusoliera
    const fuseHW  =  11 * s   // metà larghezza massima
    const halfSpan = 118 * s  // semi-apertura alare

    // Ala: attacco a cx+18*s, bordo d'attacco spazzato ~34°
    const wRootLeadX  = cx + 18 * s;  const wRootTrailX = cx - 44 * s
    const wTipLeadX   = cx - 52 * s;  const wTipTrailX  = cx - 65 * s

    // Motore: 56% span, leggermente avanzato rispetto al centro cordato
    const engSpan = halfSpan * 0.56    // ~66*s
    const engCx   = cx -  8 * s
    const engHL   = 17 * s             // metà lunghezza gondola
    const engHW   =  5 * s             // metà larghezza gondola

    // Stabilizzatori: nella coda
    const stabRootX    = cx - 116 * s
    const stabHalfSpan =  44 * s
    const stabTipX     = cx - 128 * s

    // ── Fusoliera (riempita + bordo) ──────────────────────────────────────────
    for (let i = 0; i < Math.floor(count * 0.14); i++) {
      const t = Math.random()*2-1
      const xPos = cx + t * fuseHL
      const norm = (t+1)/2
      let hw: number
      if      (norm < 0.06) hw = fuseHW * Math.sqrt(norm/0.06)
      else if (norm > 0.87) hw = fuseHW * (1-(norm-0.87)/0.13) * 0.62
      else                  hw = fuseHW
      points.push({ x: xPos+(Math.random()-0.5)*2*s, y: cy+(Math.random()-0.5)*2*hw })
    }
    // Outline fusoliera (bordo superiore e inferiore)
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < Math.floor(count * 0.016); i++) {
        const t = Math.random()*2-1
        const xPos = cx + t * fuseHL
        const norm = (t+1)/2
        let hw: number
        if      (norm < 0.06) hw = fuseHW * Math.sqrt(norm/0.06)
        else if (norm > 0.87) hw = fuseHW * (1-(norm-0.87)/0.13) * 0.62
        else                  hw = fuseHW
        points.push({ x: xPos+(Math.random()-0.5)*1.2*s, y: cy+side*hw+(Math.random()-0.5)*1.2*s })
      }
    }

    // ── Ali (simmetriche, superficie piena) ──────────────────────────────────
    for (let si = 0; si < 2; si++) {
      const sg = si === 0 ? -1 : 1
      const rly = sg * fuseHW
      const tly = sg * halfSpan

      // Superficie alare piena
      fillWing(
        wRootLeadX,  cy+rly,  cx+4*s,   cy+sg*68*s,  wTipLeadX,  cy+tly,
        wRootTrailX, cy+rly,  cx-52*s,  cy+sg*70*s,  wTipTrailX, cy+tly,
        0.145, 3*s
      )
      // Bordo d'attacco
      addBez(wRootLeadX, cy+rly, cx+4*s, cy+sg*68*s, wTipLeadX, cy+tly, 0.020, 1.6*s)
      // Bordo di uscita
      addBez(wRootTrailX, cy+rly, cx-52*s, cy+sg*70*s, wTipTrailX, cy+tly, 0.020, 1.6*s)
      // Punta alare
      addLine(wTipLeadX, cy+tly, wTipTrailX, cy+tly, 0.006, 1.5*s)

      // Linea flap inboard (1/3 span)
      addLine(cx-6*s, cy+sg*(fuseHW+1*s), cx-26*s, cy+sg*(halfSpan*0.36), 0.011, 1.4*s)
      // Linea aileron / flap outboard
      addLine(cx-26*s, cy+sg*(halfSpan*0.36), wTipTrailX+5*s, cy+tly, 0.009, 1.4*s)
      // Rib centrale (struttura interna visibile)
      addLine(cx+5*s, cy+sg*(fuseHW+0.5*s), cx-18*s, cy+sg*(halfSpan*0.20), 0.006, 1.2*s)

      // Winglet (curva angolata alla punta)
      addBez(
        wTipLeadX,       cy+tly,
        wTipLeadX-5*s,   cy+sg*(halfSpan+6*s),
        wTipLeadX-9*s,   cy+sg*(halfSpan+15*s),
        0.006, 1.4*s
      )
    }

    // ── Gondole motore (2, una per ala) ──────────────────────────────────────
    for (let si = 0; si < 2; si++) {
      const sg = si === 0 ? -1 : 1
      const ey = sg * engSpan

      // Rivestimento gondola (ovale allungato, più largo in front)
      for (let i = 0; i < Math.floor(count * 0.026); i++) {
        const t = Math.random()*2-1
        const xPos = engCx + t*engHL
        const hw = engHW * Math.sqrt(Math.max(0, 1 - (t*0.82)**2)) * (1+0.18*Math.max(0,-t))
        points.push({ x: xPos+(Math.random()-0.5)*1.4*s, y: ey+cy+(Math.random()-0.5)*hw*2 })
      }
      // Bordo gondola
      for (let bside = -1; bside <= 1; bside += 2) {
        for (let i = 0; i < Math.floor(count * 0.009); i++) {
          const t = Math.random()*2-1
          const xPos = engCx + t*engHL
          const hw = engHW * Math.sqrt(Math.max(0, 1 - (t*0.82)**2)) * (1+0.18*Math.max(0,-t))
          points.push({ x: xPos+(Math.random()-0.5)*1.2*s, y: ey+cy+bside*hw+(Math.random()-0.5)*1.2*s })
        }
      }
      // Faccia turbofan (cerchio frontale)
      addDisk(engCx+engHL*0.70, cy+ey, engHW*0.80, 0.012)
      addRing(engCx+engHL*0.70, cy+ey, engHW*0.76, 0.006, 1.2*s)
      // Pilone ala→gondola
      addLine(engCx, cy+sg*(engSpan-engHW-0.5*s), engCx, cy+sg*(fuseHW+1.5*s), 0.007, 1.2*s)
    }

    // ── Stabilizzatori orizzontali (coda) ──────────────────────────────────
    for (let si = 0; si < 2; si++) {
      const sg = si === 0 ? -1 : 1
      const sRootY = sg * fuseHW * 0.65
      const sTipY  = sg * stabHalfSpan

      fillWing(
        stabRootX,       cy+sRootY,  stabRootX-7*s,  cy+sg*24*s,  stabTipX,       cy+sTipY,
        stabRootX-13*s,  cy+sRootY,  stabRootX-20*s, cy+sg*26*s,  stabTipX-12*s,  cy+sTipY,
        0.032, 2*s
      )
      addBez(stabRootX,      cy+sRootY, stabRootX-7*s,  cy+sg*24*s, stabTipX,      cy+sTipY, 0.009, 1.3*s)
      addBez(stabRootX-13*s, cy+sRootY, stabRootX-20*s, cy+sg*26*s, stabTipX-12*s, cy+sTipY, 0.009, 1.3*s)
      addLine(stabTipX, cy+sTipY, stabTipX-12*s, cy+sTipY, 0.004, 1.4*s)
    }

    // ── Pinna di coda verticale (da top: spessore sul dorso della fusoliera) ─
    addLine(cx-112*s, cy, cx-140*s, cy, 0.011, 2.8*s)

    // ── Finestrini passeggeri (linea di punti su entrambi i lati) ─────────
    for (let i = 0; i < Math.floor(count * 0.020); i++) {
      const xPos = cx + fuseHL*0.72 - Math.random()*fuseHL*1.42
      const sg   = Math.random() < 0.5 ? -1 : 1
      points.push({ x: xPos+(Math.random()-0.5)*3*s, y: cy+sg*(fuseHW*0.90)+(Math.random()-0.5)*1.4*s })
    }

    // ── Cockpit (cluster muso) ────────────────────────────────────────────────
    for (let i = 0; i < Math.floor(count * 0.010); i++) {
      points.push({
        x: cx+118*s+Math.random()*18*s+(Math.random()-0.5)*1.5*s,
        y: cy+(Math.random()-0.5)*5*s,
      })
    }

    // ── Sparse ────────────────────────────────────────────────────────────────
    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const base = points[Math.floor(Math.random() * points.length)]
      if (base) points.push({ x: base.x+(Math.random()-0.5)*26*s, y: base.y+(Math.random()-0.5)*26*s })
    }

    // ── Rotazione globale 22° ─────────────────────────────────────────────────
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

  // ── 3. AUTO — BMW Serie 3 F30 (cab-back, RWD, proporzioni geometriche precise)
  //
  // Constraint fondamentali verificati:
  //   frontWheelX + archR < frontX   (arco non sporge dal muso)
  //   rearWheelX  - archR > rearX    (arco non sporge dalla coda)
  //   wheelbase ≈ 65% lunghezza totale
  //   sbalzo ant. ≈ 26% del passo (corto per RWD)
  //
  const generateCarPoints = useCallback((w: number, h: number, count: number) => {
    const points: { x: number; y: number }[] = []
    const cx = w * 0.50
    const cy = h * 0.50
    const s  = Math.min(w, h) * (w < 768 ? 0.0028 : 0.0040)

    // ── Helpers ───────────────────────────────────────────────────────────────
    const addLine = (x1: number, y1: number, x2: number, y2: number, wt: number, thick: number) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const t = Math.random()
        points.push({ x: x1+(x2-x1)*t+(Math.random()-0.5)*thick, y: y1+(y2-y1)*t+(Math.random()-0.5)*thick })
      }
    }
    const addBez = (
      x0: number, y0: number, xc: number, yc: number, x1: number, y1: number,
      wt: number, thick: number,
    ) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const t = Math.random(); const mt = 1 - t
        points.push({
          x: mt*mt*x0+2*mt*t*xc+t*t*x1+(Math.random()-0.5)*thick,
          y: mt*mt*y0+2*mt*t*yc+t*t*y1+(Math.random()-0.5)*thick,
        })
      }
    }
    const addCubicBez = (
      x0: number, y0: number, xc1: number, yc1: number, xc2: number, yc2: number, x1: number, y1: number,
      wt: number, thick: number,
    ) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const t = Math.random(); const mt = 1 - t
        points.push({
          x: mt*mt*mt*x0+3*mt*mt*t*xc1+3*mt*t*t*xc2+t*t*t*x1+(Math.random()-0.5)*thick,
          y: mt*mt*mt*y0+3*mt*mt*t*yc1+3*mt*t*t*yc2+t*t*t*y1+(Math.random()-0.5)*thick,
        })
      }
    }
    const addRing = (ox: number, oy: number, r: number, wt: number, thick: number) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const a = Math.random()*Math.PI*2; const rr = r-thick*0.5+Math.random()*thick
        points.push({ x: ox+Math.cos(a)*rr, y: oy+Math.sin(a)*rr })
      }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // Profilo berlina moderna (ref: BMW F30 3-Series, vista laterale)
    //
    // Proporzioni chiave BMW F30:
    // - Lunghezza totale ~210*s, altezza ~65*s (ratio ~3.2:1, molto basso e lungo)
    // - Cofano lungo ~40% della lunghezza totale
    // - Passo (interasse) ~58% della lunghezza
    // - Tetto basso e teso, NON bombato
    // - Muso inclinato verso il basso (shark nose), NON alto e piatto
    // - Linea di cintura che sale verso la coda (wedge shape)
    // ═══════════════════════════════════════════════════════════════════════════

    const wheelR  = 22 * s
    const groundY = cy + 32 * s
    const axleY   = groundY - wheelR
    const archR   = 25 * s

    // Interasse lungo, sbalzi corti
    const frontWheelX = cx + 55 * s
    const rearWheelX  = cx - 65 * s

    const frontX = cx + 100 * s
    const rearX  = cx - 95 * s
    const sillY  = groundY - 4 * s

    // ── Punti chiave silhouette (calibrati sul profilo F30) ───────────────────
    //
    // Muso: scende verso il basso (shark nose), punta bassa
    const noseTipX = frontX;           const noseTipY = cy + 12 * s
    const hoodFrontX = cx + 90 * s;   const hoodFrontY = cy + 4 * s

    // Cofano: leggera discesa dal cowl verso il muso (~8° pendenza)
    const cowlX = cx + 14 * s;         const cowlY = cy - 8 * s

    // Parabrezza: molto inclinato (~65° da orizzontale), tipico F30
    const wsTopX = cx + 2 * s;         const wsTopY = cy - 32 * s

    // Tetto: arco teso e basso, picco leggermente avanti rispetto al centro
    const roofPkX = cx - 14 * s;       const roofPkY = cy - 36 * s

    // C-pillar: discesa fluida, tipica 3 volumi
    const cpTopX = cx - 42 * s;        const cpTopY = cy - 28 * s

    // Lunotto: inclinazione media
    const rearWindowBotX = cx - 56 * s; const rearWindowBotY = cy - 16 * s

    // Trunk lid: corto e quasi orizzontale con leggero spoiler lip
    const trunkEndX = cx - 84 * s;     const trunkEndY = cy - 14 * s

    // Coda: troncata, verticale
    const rearTopY = cy - 8 * s

    // ── 1. MUSO — shark nose, scende in avanti ───────────────────────────────
    // Cofano: bezier dal cowl al fronte del cofano con leggera discesa
    addCubicBez(cowlX, cowlY, cx+40*s, cowlY+2*s, cx+70*s, hoodFrontY-4*s, hoodFrontX, hoodFrontY, 0.045, 1.4*s)
    // Punta del muso: dal fronte cofano scende alla punta
    addBez(hoodFrontX, hoodFrontY, frontX-4*s, hoodFrontY+4*s, noseTipX, noseTipY, 0.014, 1.3*s)

    // ── 2. FACCIA ANTERIORE — inclinata, non verticale ───────────────────────
    addBez(noseTipX, noseTipY, frontX+2*s, cy+20*s, frontX-2*s, sillY, 0.016, 1.3*s)

    // ── 3. PARABREZZA — molto inclinato ──────────────────────────────────────
    addLine(cowlX, cowlY, wsTopX, wsTopY, 0.030, 1.4*s)

    // ── 4. TETTO — arco teso e basso ─────────────────────────────────────────
    addCubicBez(wsTopX, wsTopY, cx-4*s, roofPkY-1*s, cx-28*s, roofPkY, cpTopX, cpTopY, 0.038, 1.4*s)

    // ── 5. C-PILLAR + LUNOTTO — discesa fluida ───────────────────────────────
    addBez(cpTopX, cpTopY, cx-48*s, cpTopY+4*s, rearWindowBotX, rearWindowBotY, 0.024, 1.4*s)

    // ── 6. TRUNK LID — quasi orizzontale, leggero spoiler lip ────────────────
    addBez(rearWindowBotX, rearWindowBotY, cx-68*s, rearWindowBotY+1*s, trunkEndX, trunkEndY, 0.022, 1.3*s)

    // ── 7. CODA — troncata ───────────────────────────────────────────────────
    addLine(trunkEndX, trunkEndY, rearX, rearTopY, 0.008, 1.3*s)
    addLine(rearX, rearTopY, rearX, sillY, 0.018, 1.3*s)

    // ── 8. FARI ANTERIORI — blade DRL stile F30, allungati ───────────────────
    const hlY = noseTipY - 4 * s
    addBez(frontX-1*s, hlY, cx+82*s, hlY+1*s, cx+72*s, hlY+3*s, 0.014, 0.8*s)
    // DRL strip inferiore
    addBez(frontX-2*s, hlY+6*s, cx+84*s, hlY+7*s, cx+76*s, hlY+8*s, 0.008, 0.7*s)

    // ── 9. FARI POSTERIORI — barra orizzontale ───────────────────────────────
    const rlY = rearTopY + 4 * s
    addLine(rearX, rlY, rearX+14*s, rlY, 0.006, 1.0*s)
    addLine(rearX, rlY+4*s, rearX+10*s, rlY+4*s, 0.004, 0.8*s)

    // ── 10. SOTTOSCOCCA ──────────────────────────────────────────────────────
    addLine(frontX-2*s, sillY, frontWheelX+archR, sillY, 0.005, 1.3*s)
    addLine(frontWheelX-archR, sillY, rearWheelX+archR, sillY, 0.016, 1.3*s)
    addLine(rearWheelX-archR, sillY, rearX, sillY, 0.006, 1.3*s)

    // ── 11. ARCHI RUOTA — semicerchi puliti ──────────────────────────────────
    for (let i = 0; i < Math.floor(count * 0.032); i++) {
      const a = Math.PI + Math.random()*Math.PI
      points.push({ x: frontWheelX+Math.cos(a)*archR+(Math.random()-0.5)*1.1*s, y: axleY+Math.sin(a)*archR+(Math.random()-0.5)*1.1*s })
    }
    for (let i = 0; i < Math.floor(count * 0.032); i++) {
      const a = Math.PI + Math.random()*Math.PI
      points.push({ x: rearWheelX+Math.cos(a)*archR+(Math.random()-0.5)*1.1*s, y: axleY+Math.sin(a)*archR+(Math.random()-0.5)*1.1*s })
    }

    // ── 12. RUOTE — cerchio esterno + mozzo ──────────────────────────────────
    addRing(frontWheelX, axleY, wheelR, 0.040, 3.5*s)
    addRing(rearWheelX, axleY, wheelR, 0.040, 3.5*s)
    addRing(frontWheelX, axleY, wheelR*0.35, 0.008, 2*s)
    addRing(rearWheelX, axleY, wheelR*0.35, 0.008, 2*s)
    // Razze (linee radiali dentro le ruote)
    for (let wi = 0; wi < 2; wi++) {
      const wx = wi === 0 ? frontWheelX : rearWheelX
      for (let ri = 0; ri < 10; ri++) {
        const a = (ri / 10) * Math.PI * 2
        addLine(wx+Math.cos(a)*wheelR*0.35, axleY+Math.sin(a)*wheelR*0.35,
                wx+Math.cos(a)*wheelR*0.85, axleY+Math.sin(a)*wheelR*0.85, 0.002, 1.0*s)
      }
    }

    // ── 13. LINEA DI CINTURA (character line, sale verso la coda) ────────────
    const beltY0 = cy + 2 * s
    addCubicBez(
      frontWheelX-4*s, beltY0,
      cx+10*s, beltY0-1*s,
      cx-20*s, beltY0-4*s,
      rearWheelX+6*s, beltY0-7*s,
      0.016, 1.0*s
    )

    // ── 14. LINEA DI FIANCATA INFERIORE (attraverso maniglie) ────────────────
    const midLY = cy + 14 * s
    addBez(frontWheelX-2*s, midLY, cx, midLY-1*s, rearWheelX+4*s, midLY-2*s, 0.012, 0.9*s)

    // ── 15. DLO (finestrini) ─────────────────────────────────────────────────
    // A-pillar interno
    addLine(cowlX+4*s, cowlY+4*s, wsTopX+2*s, wsTopY+3*s, 0.014, 1.1*s)
    // Tetto greenhouse
    addCubicBez(wsTopX+2*s, wsTopY+3*s, cx-4*s, roofPkY+3*s, cx-28*s, roofPkY+3*s, cpTopX+4*s, cpTopY+4*s, 0.016, 1.1*s)
    // Hofmeister kink: piccolo kick all'indietro prima di scendere
    const kinkTopX = cpTopX + 4*s;  const kinkTopY = cpTopY + 4*s
    const kinkMidX = cpTopX - 4*s;  const kinkMidY = cpTopY + 10*s
    const kinkBotX = cpTopX - 2*s;  const kinkBotY = rearWindowBotY + 2*s
    addLine(kinkTopX, kinkTopY, kinkMidX, kinkMidY, 0.007, 1.1*s)
    addBez(kinkMidX, kinkMidY, kinkMidX-1*s, kinkMidY+3*s, kinkBotX, kinkBotY, 0.006, 1.1*s)
    // Base DLO (sotto finestrini) — sale leggermente come la cintura
    addBez(cowlX+4*s, cowlY+4*s, cx, beltY0-2*s, kinkBotX, kinkBotY, 0.012, 1.0*s)

    // ── 16. GRIGLIA/KIDNEY (accenno) ─────────────────────────────────────────
    const grilleY = noseTipY + 4*s
    addLine(frontX-6*s, grilleY, frontX-6*s, grilleY+8*s, 0.003, 0.8*s)
    addLine(frontX-10*s, grilleY, frontX-10*s, grilleY+8*s, 0.003, 0.8*s)

    // ── 17. SPARSE — alone di particelle ─────────────────────────────────────
    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const base = points[Math.floor(Math.random() * points.length)]
      if (base) points.push({ x: base.x+(Math.random()-0.5)*6*s, y: base.y+(Math.random()-0.5)*6*s })
    }

    return points.slice(0, count)
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
    generateCarPoints(w, h, PARTICLE_COUNT),
    generateMoleculePoints(w, h, PARTICLE_COUNT),
  ], [generateAirplanePoints, generateDNAPoints, generateCarPoints, generateMoleculePoints])

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

    // Su mobile i pallini devono essere più piccoli per mantenere
    // la stessa densità percepita del desktop (canvas più piccolo → stessi punti)
    const isMobile   = w < 768
    const sizeBase   = isMobile ? 0.3 : 0.5
    const sizeRange  = isMobile ? 0.9 : 1.8

    particlesRef.current = targets.map((t: { x: number; y: number }) => ({
      tx: t.x, ty: t.y,
      x:  t.x + (Math.random() - 0.5) * w * 0.5,
      y:  t.y + (Math.random() - 0.5) * h * 0.5,
      offsetX: 0, offsetY: 0,
      speed:     0.4 + Math.random() * 0.9,
      phase:     Math.random() * Math.PI * 2,
      amplitude: isMobile ? 1.5 + Math.random() * 3 : 2 + Math.random() * 5,
      size:      sizeBase + Math.random() * sizeRange,
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
