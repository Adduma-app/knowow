// ─── NAVIGATION ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'FFTM', href: '#fftm' },
  { label: 'Applicazioni', href: '#applicazioni' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Chi siamo', href: '#chi-siamo' },
  { label: 'Contatti', href: '#contatti' },
]

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const HERO = {
  tag: 'Fast Fatigue Testing Technology',
  h1Line1: 'Testare la fatica dei materiali',
  h1Line2: 'non è mai stato così veloce.',
  subtitle:
    "KnoWow porta la ricerca universitaria direttamente nel tuo laboratorio. Con FFTM riduci i tempi di testing da mesi a ore — senza rinunciare all'affidabilità dei risultati.",
  ctaPrimary: 'Scopri FFTM',
  ctaSecondary: 'Richiedi una demo',
  stats: [
    { value: '< 48h', label: 'Tempi di testing' },
    { value: '90%+', label: 'Riduzione rispetto ai metodi tradizionali' },
    { value: '50+', label: 'Anni di ricerca scientifica' },
  ],
}

// ─── SECTION 1 — WHY FFTM ────────────────────────────────────────────────────
export const WHY_FFTM = {
  label: 'Perché FFTM',
  h2Line1: 'Il test di fatica tradizionale',
  h2Line2: 'costa tempo e denaro. FFTM no.',
  body: "I metodi standard per la caratterizzazione a fatica richiedono centinaia di provini e settimane di test. FFTM riduce drasticamente tempi e costi senza compromettere l'affidabilità scientifica.",
  traditional: {
    tag: '[01]',
    title: 'Il metodo tradizionale',
    items: [
      '25 provini per test (5 livelli × 5 provini)',
      '~500 ore totali, ~20 giorni lavorativi',
      'Costi elevati di energia e manodopera',
      'Ritardi nel time-to-market',
    ],
  },
  fftm: {
    tag: '[02]',
    title: 'FFTM — Fast Fatigue Testing Technology',
    items: [
      'Curve a fatica in 1–2 giorni lavorativi',
      'Meno di 48 ore — spesso ~24 ore o meno',
      'Un solo sistema integrato: IR + DIC + ML',
      'Metodi validati da pubblicazioni peer-reviewed',
    ],
  },
  benefits: [
    {
      num: '01',
      title: 'Da ~500 ore a meno di 48 ore',
      text: 'Dove i metodi tradizionali impiegano settimane, FFTM restituisce curve a fatica e limiti di fatica in 1–2 giorni lavorativi.',
    },
    {
      num: '02',
      title: 'Una sola tecnologia, tutto integrato',
      text: 'FFTM combina applicazione del carico, sensori termografici IR, correlazione digitale delle immagini (DIC) e software di analisi machine learning in un unico sistema operativo.',
    },
    {
      num: '03',
      title: 'Metodi validati dalla ricerca scientifica',
      text: 'La tecnologia si basa sul Metodo Termografico di Risitano e sul Metodo Termografico Statico, documentati in numerose pubblicazioni peer-reviewed.',
    },
  ],
}

// ─── SECTION 2 — HOW TO USE ───────────────────────────────────────────────────
export const HOW_TO_USE = {
  label: 'Come usare FFTM',
  h2: 'Tre modi per integrare FFTM nella tua azienda',
  body: 'Che tu abbia bisogno di un test singolo o di una partnership continuativa, FFTM si adatta al tuo flusso di lavoro.',
  cards: [
    {
      mode: 'MODALITÀ 01',
      num: '01',
      title: 'Testing su richiesta',
      text: 'Inviaci i tuoi provini oppure veniamo direttamente nella tua azienda. Ti restituiamo curve a fatica, limite di fatica e report tecnico completo.',
      cta: 'Richiedi un preventivo →',
      borderColor: 'border-[#E9704D]',
    },
    {
      mode: 'MODALITÀ 02',
      num: '02',
      title: 'Pacchetti su misura',
      text: "Se hai esigenze continuative o multi-progetto, costruiamo insieme un pacchetto di servizi personalizzato, ottimizzando costi e tempi in base al tuo piano di sviluppo prodotto.",
      cta: 'Scopri i bundle →',
      borderColor: 'border-[#3B61AB]',
    },
    {
      mode: 'MODALITÀ 03',
      num: '03',
      title: 'Porta FFTM nel tuo laboratorio',
      text: "Acquisisci la licenza della tecnologia FFTM e integrala nel tuo laboratorio esistente. KnoWow ti supporta nell'installazione, nella calibrazione e nella formazione del personale.",
      cta: 'Richiedi informazioni sulla licenza →',
      borderColor: 'border-white/20',
    },
  ],
}

// ─── SECTION 3 — SECTORS ─────────────────────────────────────────────────────
export const SECTORS = {
  label: 'Applicazioni per settore',
  h2: 'FFTM funziona nel tuo settore',
  body: 'La tecnologia FFTM è stata applicata con successo in diversi settori industriali, su materiali che spaziano dai metalli ai polimeri, dai compositi ai tessuti tecnici.',
  items: [
    { label: 'Automotive' },
    { label: 'Biomedicale'},
    { label: 'Defence' },
    { label: 'Aerospace' },
    { label: 'Manufacturing'},
    { label: 'Additive Manufacturing' },
    { label: '3D Printing' },
    { label: 'Ricerca e Università' },
  ],
}

// ─── SECTION 4 — ECOSYSTEM ───────────────────────────────────────────────────
export const ECOSYSTEM = {
  h2line1: 'FFTM è il cuore.',
  h2line2a: "Intorno c'è un ",
  h2accent: 'ecosistema',
  h2line2b: ' completo.',
  body: "KnoWow non si ferma al testing a fatica. Attorno alla tecnologia FFTM abbiamo costruito un insieme di servizi complementari che coprono l'intero ciclo di vita del prodotto industriale.",
  services: [
    {
      num: '01.',
      title: 'Controllo qualità non distruttivo',
      keyword: 'FQCT',
      subtitle: 'Fast Quality Control Technology — FQCT',
      text: "Una tecnologia proprietaria che analizza la firma meccanico-strutturale di un componente e la confronta con il prototipo validato. Screening completo in 50–60 minuti, con risultato pass/fail chiaro per individuare derive produttive prima che diventino problemi di qualità.",
      icon: '/favicon.webp',
    },
    {
      num: '02.',
      title: 'Progettazione guidata dalla performance',
      keyword: 'Performance Driven Design',
      subtitle: 'Performance Driven Design',
      text: "Un approccio alla progettazione che supera il metodo trial-and-error esplorando matematicamente l'intero spazio delle soluzioni possibili. Meno iterazioni, meno simulazioni, risultati ottimali.",
      icon: '/favicon.webp',
    },
    {
      num: '03.',
      title: 'FEM, CFD e Multibody',
      keyword: 'FEM / CFD',
      subtitle: 'Simulazioni Numeriche',
      text: "Analisi agli elementi finiti, fluidodinamica computazionale e simulazioni multicorpo per il testing virtuale. Il complemento ideale ai test fisici condotti con FFTM.",
      icon: '/favicon.webp',
    },
    {
      num: '04.',
      title: 'Sostenibilità certificata',
      keyword: 'LCA & EPD',
      subtitle: 'LCA & EPD',
      text: "Life Cycle Assessment e Environmental Product Declaration collegati ai materiali e componenti testati. Per chi vuole documentare l'impatto ambientale del proprio prodotto con dati tecnici solidi.",
      icon: '/favicon.webp',
    },
  ],
}

// ─── SECTION 5 — ABOUT ───────────────────────────────────────────────────────
export const ABOUT = {
  label: "Chi c'è dietro FFTM",
  h2line1: '50 anni di ricerca.',
  h2line2: 'Una tecnologia che funziona.',
  body: "KnoWow è uno spin-off accademico dell'Università di Messina. Il team che ha sviluppato FFTM vanta oltre 50 anni di ricerca pionieristica nel campo della fatica dei materiali e della termografia. I metodi alla base di FFTM — il Metodo Termografico di Risitano e il Metodo Termografico Statico — sono documentati da numerose pubblicazioni scientifiche peer-reviewed e da brevetti registrati. Non una promessa: una tecnologia provata.",
  linkAbout: 'Chi siamo →',
  linkPubs: 'Pubblicazioni & brevetti →',
}

// ─── CTA FINAL ───────────────────────────────────────────────────────────────
export const CTA = {
  h2: 'Pronto a ridurre i tuoi tempi di testing?',
  body: 'Parla con il nostro team. Ti mostriamo come FFTM funziona sul tuo caso specifico.',
  ctaPrimary: 'Richiedi una demo gratuita',
  ctaSecondary: 'Contattaci',
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: 'beyond ordinary engineering',
  description: "Spin-off dell'Università di Messina. Fast Fatigue Testing Technology.",
  copyright: '© 2026 KnoWow s.r.l. — P.IVA [in registrazione]',
  navLinks: [
    "FFTM — Cos'è FFTM",
    'FFTM — Come funziona',
    'Applicazioni',
    'Servizi',
    'Chi siamo',
    'Contatti',
  ],
  contacts: {
    web: 'www.knowow.tech',
    email: 'info@knowow.tech',
    location: "Università di Messina — Spin-off accademico",
    badge: 'Membro Confindustria',
  },
}
