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

  // ── 3. AUTO — berlina standard 3 volumi (minimal) ───────────────────────────
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
    const addRing = (ox: number, oy: number, r: number, wt: number, thick: number) => {
      const n = Math.floor(count * wt)
      for (let i = 0; i < n; i++) {
        const a = Math.random()*Math.PI*2; const rr = r-thick*0.5+Math.random()*thick
        points.push({ x: ox+Math.cos(a)*rr, y: oy+Math.sin(a)*rr })
      }
    }

    // ── Proporzioni berlina (tipo Passat / Camry / Serie 3) ───────────────────
    const wheelR      = 26 * s
    const groundY     = cy + 44 * s
    const axleY       = groundY - wheelR         // cy + 18*s
    const frontWheelX = cx + 72 * s
    const rearWheelX  = cx - 60 * s
    const archR       = wheelR + 8 * s           // 34*s

    // ── Punti chiave ─────────────────────────────────────────────────────────
    const frontX  = cx + 116 * s
    const rearX   = cx - 108 * s
    const sillY   = groundY -  7 * s

    // Cofano — leggermente convesso, poco inclinato
    const hoodTopX = cx + 108 * s;  const hoodTopY = axleY +  8 * s   // top paraurti
    const cowlX    = cx +  12 * s;  const cowlY    = axleY - 22 * s   // basso — berlina

    // Parabrezza — inclinazione moderata (~52° da verticale)
    const wsTopX = cx +  4 * s;  const wsTopY = cy - 30 * s

    // Tetto — piatto, breve
    const roofPkX = cx -  8 * s;  const roofPkY = cy - 34 * s

    // C-pillar — cade quasi verticale (notch berlina)
    const cpX = cx - 46 * s;  const cpY = cy - 32 * s

    // Cofano posteriore (trunk lid) — orizzontale, chiaramente separato
    const trk0X = cx - 50 * s;  const trk0Y = cy - 22 * s   // spigolo coda C-pillar
    const trk1X = cx - 98 * s;  const trk1Y = cy - 21 * s   // spigolo post. trunk

    // Coda — verticale, altezza media
    const rearTopY = cy - 13 * s

    // ── Silhouette superiore (3 volumi distinti) ──────────────────────────────
    // [1] Paraurti ant. → cofano (bezier dolce)
    addBez(hoodTopX, hoodTopY, cx+55*s, axleY-6*s, cowlX, cowlY,     0.050, 1.6*s)
    // [2] Parabrezza (moderatamente inclinato)
    addLine(cowlX, cowlY, wsTopX, wsTopY,                             0.036, 1.6*s)
    // [3] Tetto (bezier piatta)
    addBez(wsTopX, wsTopY, roofPkX+12*s, roofPkY, cpX, cpY,          0.038, 1.6*s)
    // [4] C-pillar — scende ripido (notch)
    addLine(cpX, cpY, trk0X, trk0Y,                                   0.020, 1.6*s)
    // [5] Trunk lid — quasi orizzontale (volume 3)
    addLine(trk0X, trk0Y, trk1X, trk1Y,                              0.032, 1.6*s)
    // [6] Coda — verticale
    addLine(trk1X, trk1Y, rearX, rearTopY,                           0.010, 1.6*s)
    addLine(rearX, rearTopY, rearX, sillY,                            0.022, 1.6*s)

    // ── Silhouette inferiore ──────────────────────────────────────────────────
    // Paraurti ant. verticale
    addLine(frontX, hoodTopY, frontX, sillY,                          0.012, 1.5*s)
    // Pannello ant. → arco ant.
    addBez(frontX, sillY, frontWheelX+archR+3*s, sillY, frontWheelX+archR, axleY, 0.013, 1.5*s)
    // Sottoporta tra gli archi
    addLine(frontWheelX-archR, sillY, rearWheelX+archR, sillY,        0.018, 1.5*s)
    // Pannello arco post. → coda
    addBez(rearWheelX-archR, axleY, rearX+6*s, sillY, rearX, sillY,  0.013, 1.5*s)

    // ── Archi ruota (semicerchio) ─────────────────────────────────────────────
    for (let i = 0; i < Math.floor(count * 0.036); i++) {
      const a = Math.PI + Math.random()*Math.PI
      points.push({ x: frontWheelX+Math.cos(a)*archR+(Math.random()-0.5)*1.5*s, y: axleY+Math.sin(a)*archR+(Math.random()-0.5)*1.5*s })
    }
    for (let i = 0; i < Math.floor(count * 0.036); i++) {
      const a = Math.PI + Math.random()*Math.PI
      points.push({ x: rearWheelX+Math.cos(a)*archR+(Math.random()-0.5)*1.5*s, y: axleY+Math.sin(a)*archR+(Math.random()-0.5)*1.5*s })
    }

    // ── Ruote (anello + mozzo) ────────────────────────────────────────────────
    addRing(frontWheelX, axleY, wheelR,      0.044, 4*s)
    addRing(rearWheelX,  axleY, wheelR,      0.044, 4*s)
    addRing(frontWheelX, axleY, wheelR*0.3,  0.008, 2*s)
    addRing(rearWheelX,  axleY, wheelR*0.3,  0.008, 2*s)

    // ── DLO — bordo superiore finestrini (greenhouse outline) ────────────────
    // Parabrezza interno
    addLine(cowlX+5*s, cowlY+6*s, wsTopX+2*s, wsTopY+3*s,            0.016, 1.3*s)
    // Tetto finestrini
    addBez(wsTopX+2*s, wsTopY+3*s, cx-5*s, cy-28*s, cpX+4*s, cpY+5*s, 0.018, 1.3*s)
    // Lunotto (quasi verticale — berlina)
    addLine(cpX+4*s, cpY+5*s, trk0X+3*s, trk0Y+3*s,                  0.012, 1.3*s)

    // ── Sparse (jitter stretto) ───────────────────────────────────────────────
    const sparseCount = count - points.length
    for (let i = 0; i < sparseCount; i++) {
      const base = points[Math.floor(Math.random() * points.length)]
      if (base) points.push({ x: base.x+(Math.random()-0.5)*8*s, y: base.y+(Math.random()-0.5)*8*s })
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

    particlesRef.current = targets.map((t: { x: number; y: number }) => ({
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
