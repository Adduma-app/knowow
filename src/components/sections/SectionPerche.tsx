'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GlowCard } from '@/components/ui/GlowCard'

// ─── Table data ───────────────────────────────────────────────────────────────

const TABLE_ROWS = [
  { serie: '1', provini: '5',  r2: '91.19%', giorni: '11', warning: true  },
  { serie: '2', provini: '10', r2: '81.48%', giorni: '23', warning: false },
  { serie: '3', provini: '14', r2: '79.79%', giorni: '29', warning: false },
  { serie: '4', provini: '18', r2: '81.63%', giorni: '37', warning: false },
  { serie: '5', provini: '22', r2: '79.92%', giorni: '45', warning: false },
]

// ─── Fade-in block wrapper ────────────────────────────────────────────────────

function FadeBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Accent heading ───────────────────────────────────────────────────────────

function AccentHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-sans font-bold uppercase text-white mb-5 leading-tight"
      style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', letterSpacing: '-0.01em' }}
    >
      {children}
    </h3>
  )
}

// ─── Body text ────────────────────────────────────────────────────────────────

function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm md:text-base text-white/52 leading-relaxed font-medium ${className}`}>
      {children}
    </p>
  )
}

// ─── Inline highlight ─────────────────────────────────────────────────────────

function Hi({ children }: { children: React.ReactNode }) {
  return <span className="text-white/80 font-bold">{children}</span>
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SectionPerche() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">

        {/* ── Section label ── */}
        <FadeBlock>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#E9704D] block mb-5">
            Perché conta farlo bene
          </span>
          <h2
            className="font-sans font-bold uppercase text-white leading-tight mb-16"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
          >
            La fatica dei materiali:
            <br />
            <span className="text-white/35">una materia verticale e poco conosciuta.</span>
          </h2>
        </FadeBlock>

        {/* ── Opening paragraph ── */}
        <FadeBlock delay={0.05}>
          <div className="mb-14 pb-14 border-b border-white/[0.07]">
            <Body>
              Più occasioni di confronto tecnico con ingegneri di alto livello abbiamo e più risulta
              chiaro che la materia è pressoché sconosciuta. Lo studio della fatica è
              un&apos;attività core di R&D estremamente verticale, che si colloca
              all&apos;intersezione tra progettazione, ingegneria meccanica e ingegneria dei
              materiali.
            </Body>
            <Body className="mt-4">
              Ciò che spesso accade è che la non padronanza della tematica, unita a vincoli di
              budget e di tempistiche, porta a progettare con{' '}
              <Hi>margini di sicurezza eccessivi e inefficienti</Hi>, a discapito di prestazioni e
              costi di produzione — oppure a condurre campagne approssimative che nel migliore dei
              casi sono inutili, ma che spesso finiscono per essere dannose poiché restituiscono{' '}
              <Hi>dati fuorvianti</Hi> che orientano le scelte progettuali nella direzione sbagliata.
            </Body>
          </div>
        </FadeBlock>

        {/* ── 5 specimens problem ── */}
        <FadeBlock>
          <div className="mb-14 pb-14 border-b border-white/[0.07]">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-px shrink-0 mt-1"
                style={{ height: 'calc(100% + 0px)', background: '#E9704D', minHeight: 40 }}
                aria-hidden="true"
              />
              <AccentHeading>
                Il problema più comune: cinque provini non sono abbastanza
              </AccentHeading>
            </div>

            <Body>
              Uno degli errori più diffusi è lavorare con curve di Wöhler (curve S-N) derivate da
              appena 5 provini. Tali curve non possono in alcun modo essere messe sullo stesso
              piano di quelle ottenute con 20 o più provini.{' '}
              <Hi>La differenza non è quantitativa: è qualitativa.</Hi>
            </Body>
            <Body className="mt-4">
              Con 20 o più provini è possibile costruire in modo affidabile una{' '}
              <Hi>curva P-S-N</Hi> (Probability-Stress-Number of Cycles): una famiglia di curve
              isoaffidabilità che esprime, a diversi livelli di probabilità di sopravvivenza, il
              legame tra ampiezza di tensione e vita a fatica. Le curve più rilevanti sono quella
              al 95% — al di sotto della quale sopravvive il 95% della popolazione di componenti
              — la mediana al 50%, e quella al 5%, al di sotto della quale sopravvive solo 1
              componente su 20.{' '}
              <Hi>È in quella banda che si decide se un progetto è robusto oppure no.</Hi>
            </Body>
            <Body className="mt-4">
              Quella banda ha senso ed è affidabile solo se i dati sottostanti sono sufficienti a
              stimare la distribuzione reale del fenomeno. Con 5 provini non si stima una
              distribuzione, si fitta una curva su un campione troppo piccolo per essere
              affidabile. È come stimare le precipitazioni annuali di una città misurando solo
              5 giorni d&apos;estate: la curva è perfetta, ma non hai mai visto una settimana di
              febbraio.
            </Body>
          </div>
        </FadeBlock>

        {/* ── Data exercise + table ── */}
        <FadeBlock>
          <div className="mb-14 pb-14 border-b border-white/[0.07]">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-px shrink-0 mt-1"
                style={{ height: 40, background: '#3B61AB' }}
                aria-hidden="true"
              />
              <AccentHeading>Un esercizio su dati reali</AccentHeading>
            </div>

            <Body className="mb-8">
              Di seguito un esercizio basato su dati reali di una ghisa sferoidale pubblicati da{' '}
              <Hi>Kohout &amp; Věchet</Hi> (Int. J. Fatigue, 2001). Con questi dati costruiamo
              cinque serie di curve variando il numero di provini.
            </Body>

            {/* Table */}
            <GlowCard
              className="glass-card clip-card overflow-hidden mb-8"
              glowRGB="59,97,171"
              glowSize={400}
              glowAlpha={0.15}
            >
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    {['Serie', 'Provini', 'R²', 'Giorni di test'].map((h) => (
                      <th
                        key={h}
                        className="text-left font-sans font-bold uppercase text-white/35 py-4 px-6"
                        style={{ fontSize: 10, letterSpacing: '0.25em' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row, i) => (
                    <tr
                      key={row.serie}
                      style={{
                        borderBottom:
                          i < TABLE_ROWS.length - 1
                            ? '1px solid rgba(255,255,255,0.04)'
                            : 'none',
                        background: row.warning
                          ? 'rgba(233,112,77,0.06)'
                          : 'transparent',
                      }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono text-sm"
                            style={{ color: row.warning ? '#E9704D' : 'rgba(255,255,255,0.55)' }}
                          >
                            {row.serie}
                          </span>
                          {row.warning && (
                            <span
                              className="text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-0.5"
                              style={{
                                color: '#E9704D',
                                border: '1px solid rgba(233,112,77,0.35)',
                                borderRadius: 2,
                              }}
                            >
                              R² più alto ≠ migliore
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className="font-mono text-sm font-bold"
                          style={{ color: row.warning ? '#E9704D' : 'rgba(255,255,255,0.75)' }}
                        >
                          {row.provini}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className="font-mono text-sm"
                          style={{
                            color: row.warning
                              ? 'rgba(233,112,77,0.9)'
                              : 'rgba(255,255,255,0.55)',
                            fontWeight: row.warning ? 700 : 400,
                          }}
                        >
                          {row.r2}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className="font-mono text-sm"
                          style={{ color: 'rgba(255,255,255,0.55)' }}
                        >
                          {row.giorni}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlowCard>

            <Body>
              La Serie 1 ha il miglior R² e la campagna più breve. Eppure è la peggiore — e la
              tabella è costruita apposta per mostrare perché{' '}
              <Hi>l&apos;R² è una metrica ingannevole in questo contesto</Hi>.
            </Body>
            <Body className="mt-4">
              Con pochi provini il modello si adatta perfettamente ai dati che ha, ma quei dati
              non rappresentano la distribuzione reale del fenomeno. All&apos;aumentare dei
              provini, la stima dei parametri della distribuzione sottostante converge verso valori
              stabili. Quella convergenza è la &quot;verità ingegneristica&quot;. Le curve derivate
              da campioni piccoli non sono sbagliate in modo sistematico, ma si discostano
              stocasticamente da essa con{' '}
              <Hi>alta varianza</Hi> — e il loro R² elevato maschera esattamente questo problema,
              perché misura quanto bene il modello si adatta ai pochi punti disponibili, non quanto
              bene rappresenta la distribuzione reale.
            </Body>
          </div>
        </FadeBlock>

        {/* ── Norma e pratica ── */}
        <FadeBlock>
          <div className="mb-14 pb-14 border-b border-white/[0.07]">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-px shrink-0 mt-1"
                style={{ height: 40, background: '#E9704D' }}
                aria-hidden="true"
              />
              <AccentHeading>Cosa dice la norma, e cosa suggerisce la pratica</AccentHeading>
            </div>

            {/* ASTM callout */}
            <div
              className="flex items-start gap-4 mb-6 py-4 px-5"
              style={{ border: '1px solid rgba(59,97,171,0.3)', borderLeft: '3px solid #3B61AB' }}
            >
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.25em] text-[#3B61AB] font-bold mb-1"
                >
                  ASTM E739
                </p>
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  Raccomanda un minimo di{' '}
                  <Hi>12–24 provini</Hi> per campagne con finalità statistiche. Sotto quella soglia
                  si può fare caratterizzazione orientativa, non affidabilità di progetto.
                </p>
              </div>
            </div>

            <Body>
              Eppure in molte aziende si lavora ancora sistematicamente con 5 o 6 provini,
              trattando i risultati come se fossero equivalenti a quelli di una campagna
              statistica.
            </Body>
            <Body className="mt-4">
              Il range di ASTM E739 è volutamente ampio per restituire un quadro di minima e
              massima affidabilità del dato. La letteratura sulla caratterizzazione a fatica e
              diversi decenni di applicazioni industriali indicano{' '}
              <Hi>20 provini come soglia pratica</Hi> sotto la quale la stima delle curve di
              sopravvivenza diventa troppo incerta per supportare decisioni di progetto affidabili.
              Non è una regola normativa, ma una soglia ingegneristica ben fondata.
            </Body>
            <Body className="mt-4">
              Questo vale a maggior ragione per <Hi>additive manufacturing e compositi</Hi>, dove
              la dispersione intrinseca del materiale è significativamente più alta e la distanza
              tra la curva al 95% e quella al 5% si allarga in modo sostanziale.
            </Body>

            {/* Aphorism */}
            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <p
                className="font-sans font-bold uppercase text-center leading-tight"
                style={{
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                <span className="text-white/30">Pochi dati producono</span>
                <span className="text-white"> un&apos;alta illusione di precisione.</span>
                <br />
                <span className="text-white/30">Molti dati producono</span>
                <span className="text-white"> vera affidabilità.</span>
              </p>
            </div>
          </div>
        </FadeBlock>

        {/* ── Costi e tempo ── */}
        <FadeBlock>
          <div className="mb-14 pb-14 border-b border-white/[0.07]">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-px shrink-0 mt-1"
                style={{ height: 40, background: '#E9704D' }}
                aria-hidden="true"
              />
              <AccentHeading>Il problema è di tempo e di costi</AccentHeading>
            </div>
            <Body>
              Passare da 5 a 22 provini significa passare da{' '}
              <Hi>11 a 45 giorni di macchina</Hi> a 20 Hz. Quadruplicare il tempo, quadruplicare
              i costi. Questo è un vincolo reale che, complice una conoscenza non approfondita del
              tema, spinge molte aziende a lavorare con campioni insufficienti.
            </Body>
          </div>
        </FadeBlock>

        {/* ── KnoWow solution — final highlight block ── */}
        <FadeBlock>
          <GlowCard
            className="clip-card p-8 md:p-12"
            glowRGB="233,112,77"
            glowSize={500}
            glowAlpha={0.2}
            style={{
              background: 'rgba(233,112,77,0.04)',
              border: '1px solid rgba(233,112,77,0.15)',
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E9704D] block mb-5">
              La risposta di KnoWow
            </span>
            <p
              className="font-sans font-bold uppercase text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', letterSpacing: '-0.01em' }}
            >
              Ed è esattamente questo il problema che KnoWow ha affrontato.
            </p>
            <Body>
              KnoWow ha sviluppato una tecnologia di testing accelerato capace di ridurre i tempi
              di derivazione di una curva P-S-N affidabile da{' '}
              <Hi>4–6 settimane a meno di 48 ore</Hi>. La base statistica rimane equivalente a
              quella di una campagna con 20–24 provini: lo stesso contenuto informativo, in una
              frazione del tempo, senza sacrificare la robustezza su cui si fondano le decisioni
              di progetto.
            </Body>
          </GlowCard>
        </FadeBlock>

      </div>
    </section>
  )
}
