// Dizionario italiano. Mantiene la stessa shape di src/i18n/en.ts.
// Per aggiungere un nuovo testo: aggiungilo qui E in en.ts con la stessa chiave.

export const dict = {
  locale: 'it' as 'it' | 'en',
  htmlLang: 'it',

  meta: {
    title: 'Knowow | Fast Fatigue Testing Technology — beyond ordinary engineering',
    description:
      "Knowow riduce il testing a fatica da ~500 ore a meno di 48 ore con FFTM. Spin-off dell'Università di Messina. Testing, licenza e servizi su misura.",
    keywords:
      'fast fatigue testing technology, FFTM, testing a fatica, curva di Wöhler, termografia, Risitano, materiali',
    ogTitle: 'Knowow | Fast Fatigue Testing Technology',
    ogDescription:
      'Da ~500 ore a meno di 48 ore. Tecnologia di testing a fatica basata su metodi termografici brevettati.',
    ogLocale: 'it_IT',
    canonical: 'https://www.knowow.tech',
    pageProdottiTitle: 'Prodotti & Servizi — Knowow',
    pageProdottiDescription:
      "L'ecosistema completo di prodotti e servizi Knowow: dalla caratterizzazione a fatica al controllo qualità, dalla progettazione guidata dalla performance alle simulazioni numeriche.",
  },

  navbar: {
    ariaNavigation: 'Navigazione principale',
    ariaLogoHome: "Knowow — torna all'inizio della pagina",
    ariaSection: 'Vai alla sezione {name}',
    cta: 'Richiedi un pilota di FFTT',
    ariaCta: 'Richiedi una demo di FFTT',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    switchToOther: 'EN',
    ariaSwitchToOther: 'Switch to English',
  },

  navLinks: [
    { label: 'Chi siamo', href: '/#chi-siamo' },
    { label: 'FFTT', href: '/technology' },
    { label: 'Prodotti & Servizi', href: '/prodotti-e-servizi' },
    { label: 'Partner', href: '/partner' },
    { label: 'Contatti', href: '/#contatti' },
  ],

  hero: {
    tag: 'Fast Fatigue Testing Technology',
    h1Line1: 'Testare il comportamento a fatica di materiali, componenti e sistemi non è ',
    h1Line2: 'mai stato così semplice e veloce.',
    subtitle: 'FFTT riduce i tempi di testing da diverse settimane a poche ore.',
    ctaPrimary: 'Scopri FFTT',
    ctaSecondary: 'Richiedi una demo',
    ariaSection: 'Hero — Fast Fatigue Testing Technology',
    ariaCtaPrimary: 'Scopri la tecnologia FFTT',
    stats: [
      { value: '< 48h', label: 'Tempi di testing' },
      { value: '90%+', label: 'Riduzione rispetto ai metodi tradizionali' },
      { value: '50+', label: 'Anni di ricerca scientifica' },
    ],
  },

  whyFftmExtras: {
    cta: 'Scopri i metodi termografici',
    circleTraditional: {
      label: '[01] METODO TRADIZIONALE',
      items: ['25 provini (5 livelli di carico x 5 provini)', '500+ ore', '~1 mese'],
      impact: 'Riduce la velocità di innovazione e ritarda il time-to-market',
      unit: 'ORE',
      number: '500+',
    },
    circleFftm: {
      label: '[02] CON FFTT',
      headline: 'Curva di Wöhler e limite di fatica in <48 ore',
      unit: 'ORE',
      systemBasedOn: 'Sistema basato su:',
      items: ['Sensori Termografici (IR)', 'Digital Image Correlation', "Algoritmi proprietari per l'analisi dei dati"],
    },
  },

  whyFftm: {
    label: 'Perché FFTT',
    h2Line1: 'La caratterizzazione a fatica con metodi tradizionali richiede tempi lunghi',
    h2Line2: 'e frena i processi di R&D. FFTT NO.',
    body: "I metodi standard per l'esecuzione delle prove richiedono centinaia di ore e decine di provini per derivare una curva di Wöhler (S‑N) e ricavare il limite di fatica. FFTT riduce drasticamente il numero dei provini e i tempi di prova garantendo un'affidabilità del dato pari o superiore rispetto ai protocolli tradizionali.",
    traditional: {
      tag: '[01]',
      title: 'Il metodo tradizionale',
      items: [
        '25 provini (5 livelli di carico x 5 provini)',
        '500+ ore',
        '~1 mese',
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
        title: 'Da 500+ ore a <48 ore',
        text: 'Dove i metodi tradizionali impiegano settimane, FFTT restituisce curva di Wöhler (S‑N) e limite di fatica in < 48 ore',
      },
      {
        num: '02',
        title: 'Una tecnologia integrata',
        text: "FFTT combina sensori termografici (IR), Digital Image Correlation (DIC) e algoritmi proprietari per l'analisi dei dati in un unico processo.",
      },
      {
        num: '03',
        title: 'Tecnologia fondata su metodi energetici frutto di oltre 35 anni di ricerca scientifica',
        text: 'La tecnologia si basa sul Metodo Termografico Risitano e sul Metodo Termografico Statico, documentati in numerose pubblicazioni peer-reviewed.',
      },
    ],
  },

  howToUse: {
    label: 'al servizio delle esigenze aziendali',
    h2: 'FAST FATIGUE TESTING TECHNOLOGY AL SERVIZIO DELLA TUA AZIENDA',
    body: "FFTT è disponibile per progetti pilota, come bundle di servizi nell'ambito di una partnership continuativa e come tecnologia in licenza trasferita direttamente presso i vostri laboratori ",
    cards: [
      {
        mode: 'MODALITÀ 01',
        num: '01',
        title: 'Progetto pilota',
        text: 'Il progetto pilota si svolge presso i laboratori Knowow oppure presso i vostri laboratori. Restituiamo curva di Wöhler (S‑N), limite di fatica e report tecnico completo. Il pilota rappresenta una vetrina delle nostre capacità tecniche pensata per facilitare il primo engagement. Il passo successivo della partnership è l’attivazione di un bundle di servizi.',
        cta: 'Richiedi un preventivo →',
        borderColor: 'border-[#E9704D]',
      },
      {
        mode: 'MODALITÀ 02',
        num: '02',
        title: 'Bundle di servizi',
        text: 'Alle attività spot prediligiamo relazioni strutturate e continuative per traferire il massimo del valore ai nostri partner selezionati. I nostri bundle di servizi ci consentono di allinearci ai piani di sviluppo aziendali garantendo tempi di risposta celeri e capacità tecnica dedicata. ',
        cta: 'Scopri i nostri bundle →',
        borderColor: 'border-[#3B61AB]',
      },
      {
        mode: 'MODALITÀ 03',
        num: '03',
        title: 'Porta FFTT nel tuo laboratorio',
        text: "In caso di esigenze frequenti o da parte di diversi team del reparto R&D, è possibile acquisire la licenza della tecnologia e integrarla direttamente presso i vostri laboratori. Forniamo banchi prova su misura o un retrofit per i vostri banchi prova esistenti. Knowow fornisce supporto per l'installazione e la calibrazione, cura la formazione del personale e garantisce assistenza da remoto.",
        cta: 'Richiedi informazioni sulla licenza →',
        borderColor: 'border-white/20',
      },
    ],
  },

  sectors: {
    label: 'Settori applicativi',
    h2: 'FFTT nel tuo settore',
    body: "La tecnologia FFTT trova applicazione in diversi settori industriali e su un'ampia gamma di materiali tra cui metalli, compositi, polimeri, tessuti tecnici e fibre ad alte prestazioni.",
    items: [
      { label: 'Automotive' },
      { label: 'Motorsport' },
      { label: 'Luxury manufacturing' },
      { label: 'Biomedicale' },
      { label: 'Aerospace' },
      { label: 'Navale' },
      { label: 'Difesa' },
      { label: 'Additive manufacturing' },
    ],
  },

  ecosystem: {
    h2line1: "FFTT è L'AVANGUARDIA TECNOLOGICA",
    h2line2a: "Intorno c'è un ",
    h2accent: 'ecosistema',
    h2line2b: ' completo di prodotti e servizi.',
    body: "Knowow non è solo testing di fatica. I nostri prodotti e servizi coprono l'intero ciclo di vita del prodotto industriale.",
    services: [
      {
        num: '01.',
        title: 'Controllo qualità non distruttivo',
        keyword: 'FQCT',
        subtitle: 'Fast Quality Control Technology — FQCT',
        text: "Facendo leva sulla fisica alla base di FFTT, il nostro controllo qualità non distruttivo analizza l'impronta meccanico-strutturale di un componente e la confronta con quella del suo prototipo validato. Si effettua così uno screening completo in 50-60 minuti che restituisce un risultato pass/fail chiaro e utile a individuare eventuali derive produttive prima che diventino problemi di qualità.",
        icon: '/favicon.webp',
      },
      {
        num: '02.',
        title: 'Progettazione guidata dalla performance',
        keyword: 'Performance Driven Design',
        subtitle: 'Performance Driven Design',
        text: "Un approccio alla progettazione che supera il metodo trial-and-error esplorando matematicamente l'intero spettro delle soluzioni possibili. Meno iterazioni, meno simulazioni, risultati ottimali.",
        icon: '/favicon.webp',
      },
      {
        num: '03.',
        title: 'SIMULAZIONI NUMERICHE',
        keyword: 'FEM, CFD, MBS, CAO/RT',
        subtitle: 'Simulazioni Numeriche',
        text: "Analisi agli elementi finiti, fluidodinamica computazionale, simulazioni multibody, simulazione e ottimizzazione ottica consentono di prevedere con accuratezza il comportamento dei sistemi in condizioni operative reali e forniscono i dati necessari per guidare le decisioni progettuali all'interno del framework Performance Driven Design.",
        icon: '/favicon.webp',
      },
      {
        num: '04.',
        title: 'Innovazione',
        keyword: 'Tailored R&D',
        subtitle: 'Tailored R&D',
        text: 'Progettazione e sviluppo di soluzioni ingegneristiche innovative su misura ',
        icon: '/favicon.webp',
      },
    ],
  },

  about: {
    label: 'Dietro FFTT',
    h2line1: 'Oltre 35 anni di ricerca.',
    h2line2: 'Una tecnologia senza pari.',
    body: "Knowow nasce come spin-off accademico dell'Università di Messina. Il team che ha sviluppato e industrializzato FFTT vanta oltre 35 anni di ricerca pionieristica nel campo della fatica dei materiali e della termografia, grazie a cui hanno visto la luce i metodi alla base di FFTT: il Metodo Termografico Risitano e il Metodo Termografico Statico.",
    linkAbout: 'Chi siamo →',
    linkPubs: 'Pubblicazioni & brevetti →',
    yearsLabel: 'Anni di ricerca scientifica',
    spinoffLabel: 'Università di Messina — Spin-off accademico',
  },

  ecosystemExtras: {
    closeAria: 'Chiudi',
    discoverAreasButton: 'Scopri gli ambiti',
    ambitiNote:
      "Ogni simulazione è condotta in funzione dell'applicazione specifica e in coerenza con i requisiti di progetto e i dati sperimentali.",
    ambiti: [
      {
        button: 'Fem',
        title: 'FEM – Analisi agli Elementi Finiti',
        img: '/simulazioni_new/sospensione.webp',
        text: 'Simulazioni strutturali per valutare tensioni, deformazioni e meccanismi di cedimento in condizioni di carico reali o realistiche.',
      },
      {
        button: 'Cfd',
        title: 'Fluidodinamica Computazionale',
        img: '/simulazioni_new/car.webp',
        text: 'Analisi di flussi interni ed esterni, scambio termico e interazioni fluido-struttura.',
      },
      {
        button: 'Multibody Dynamics',
        title: 'Multibody Dynamics',
        img: '/simulazioni_new/multibody.webp',
        text: 'Modellazione cinematica e dinamica di sistemi meccanici complessi con componenti interagenti.',
      },
      {
        button: 'Simulazioni Ottiche',
        title: 'Simulazioni Ottiche',
        img: '/simulazioni_new/knowow_light.webp',
        text: 'Previsione e ottimizzazione del comportamento della luce attraverso materiali e superfici per sistemi ottici e di illuminazione.',
      },
    ],
  },

  cta: {
    h2: 'Contattaci',
    body: 'Entra in contatto con il nostro team. Abbiamo una soluzione per ogni esigenza della tua azienda.',
    ctaPrimary: 'Invia',
    ctaSecondary: 'Contattaci',
    form: {
      namePlaceholder: 'Nome *',
      emailPlaceholder: 'Email *',
      companyPlaceholder: 'Azienda *',
      messagePlaceholder: 'Messaggio (opzionale)',
      nameAria: 'Nome',
      emailAria: 'Email',
      companyAria: 'Azienda',
      messageAria: 'Messaggio',
      requiredError: 'Campo obbligatorio',
      invalidEmailError: 'Email non valida',
      sendError: 'Qualcosa è andato storto. Riprova o scrivici direttamente.',
      submittedH2: 'Messaggio inviato',
      submittedBody: 'Il team ti contatterà entro 24 ore.',
      sendAnother: 'Invia un altro messaggio',
      submitting: 'Invio in corso…',
    },
  },

  footer: {
    descLine1: "Spin-off dell'Università di Messina",
    descLine2: 'Fast Fatigue Testing Technology',
    copyright: '© 2026 Knowow s.r.l. — P.IVA 03698560830',
    contactsLabel: 'Contatti',
    associationLabel: 'Associato Confindustria tramite Sicindustria',
    rightsReserved: 'Knowow s.r.l. — Tutti i diritti riservati',
  },

  partner: {
    tag: 'Collaborazioni',
    h1Line1: 'I nostri',
    h1Line2: 'Partner',
    body: 'Istituzioni, aziende e centri di ricerca con cui collaboriamo per portare innovazione nella caratterizzazione dei materiali.',
  },

  technology: {
    tag: 'Il cuore di FFTT',
    h1Line1: 'Fast Fatigue',
    h1Line2: 'TESTING TECHNOLOGY',
    body:
      'FFTT si basa sul Metodo Termografico Risitano e sul Metodo Termografico Statico ed è equipaggiata con sensori termografici (IR)e digital image correlation (DIC). Restituisce curva di Whöler e limite di fatica in meno di 48 ore.',
    integratedHeader:
      "FFTT combina sensori termografici (IR), Digital image Correlation (DIC) metodi termografici e algoritmi proprietari per l'analisi dei dati in un unico processo.",
    integratedH2: 'Una tecnologia integrata',
    items: [
      {
        num: '01',
        tag: 'Equipment',
        title: 'IR Camera',
        subtitle: 'Infrared Thermal Imaging',
        body: "Rileva l'evoluzione della temperatura superficiale del provino durante il test a fatica.",
      },
      {
        num: '02',
        tag: 'Equipment',
        title: 'Digital Image Correlation',
        subtitle: 'Campo di deformazione',
        body: 'Misura la deformazione del provino durante i test meccanici',
      },
      {
        num: '03',
        tag: 'Metodo / STM',
        title: 'Static Thermographic Method',
        subtitle: 'Limite di primo danneggiamento',
        body: 'Valutazione della tensione limite, che induce la prima microplasticizzazione del materiale.',
      },
      {
        num: '04',
        tag: 'Metodo / RTM',
        title: 'Risitano Thermographic Method',
        subtitle: 'Curva di Wöhler e limite di fatica',
        body: "Derivazione della curva di Wöhler e del limite di fatica mediante analisi dell'andamento della temperatura di stabilizzazione in funzione del livello di tensione applicato.",
      },
    ],
  },

  perche: {
    case1Tag: 'caso di studio 1',
    case1H2Line1: "POCHI DATI GENERANO UN'ILLUSIONE DI PRECISIONE.",
    case1H2Line2: "MOLTI DATI GARANTISCONO VERA AFFIDABILITA'.",
    case1Body: 'La Serie 1 ha il miglior R² — ed è la meno affidabile.',
    astmTag: 'ASTM E739',
    astmBodyPart1: 'Lo standard ASTM E739 raccomanda un minimo di ',
    astmHi: '12–24 provini',
    astmBodyPart2:
      ' provini per campagne con finalità statistiche. Sotto quella soglia si può parlare di caratterizzazione orientativa, non di affidabilità di progetto. Il range di ASTM E739 è ampio per restituire un intervallo di minore e maggiore affidabilità del dato. La letteratura scientifica sulla caratterizzazione a fatica e diversi decenni di applicazioni industriali indicano 20 provini come soglia pratica sotto la quale la stima delle curve di sopravvivenza diventa troppo incerta per supportare decisioni di progetto affidabili. Non si tratta di una regola normativa, ma una soglia ingegneristica ben fondata.',
    tableHeaders: ['Serie', 'Provini', 'R²', 'Giorni'],
    tableWarningBadge: 'R² alto',
    tableWarningSep: '≠',
    tableWarningText: 'migliore',
    sectionLabel: "L'IMPORTANZA DI UNA CAMPAGNA BEN FATTA",
    sectionH2Line1: 'La fatica dei materiali:',
    sectionH2Line2: 'una materia verticale e poco conosciuta.',
    block1Heading: 'Il problema più comune: 5 provini non sono abbastanza',
    block1BodyPart1:
      "Uno degli errori più diffusi è lavorare con curve di Wöhler derivate da appena 5 provini. ",
    block1BodyHi: 'La differenza rispetto a 20+ provini non è quantitativa, è qualitativa.',
    block1BodyPart2:
      " Con 5 provini non si stima una distribuzione, si fitta una curva su un campione troppo piccolo: come stimare le precipitazioni annuali di una città misurando solo 5 giorni d'estate.",
    chartLabel: 'Metodo tradizionale',
    chartSubtitle: 'Costruzione curva di Wöhler — standard statistico',
    compareCol1: {
      label: 'PRASSI INDUSTRIALE',
      badge: '⚠ Insufficiente',
      num: '5',
      unit: 'provini',
      items: [
        '~11 giorni di macchina',
        'R² apparentemente ottimo',
        'Distribuzione non stimabile',
        'Curva S-N inaffidabile',
      ],
    },
    compareCol2: {
      label: 'Standard statistico',
      badge: '✓ Affidabile',
      num: '20+',
      unit: 'provini',
      items: [
        '~45 giorni di macchina',
        'Curva P-S-N completa',
        'Bande di sopravvivenza 5/50/95%',
        'Base per decisioni di progetto',
      ],
    },
    block1AfterPart1: 'Con i metodi tradizionali utilizzando 20+ provini è possibile costruire una ',
    block1AfterHi: 'curva P-S-N',
    block1AfterPart2:
      ' (Probability-Stress-Number of Cycles): la famiglia di curve isoaffidabilità al 5%, 50%, 95% su cui si fondano le decisioni di progetto robuste. Con FFTT si raggiunge lo stesso risultato con pochi provini e in meno di 48 ore.',
    case2Tag: 'caso di studio 2',
    case2H2Line1: 'Valutazione della fatica di un',
    case2H2Line2: 'acciaio strutturale navale.',
    case2Body: 'Confronto tra il metodo tradizionale e la nostra soluzione.',
    case2Cards: [
      {
        title: 'Titolo caso studio 1',
        body: 'Curva S-N con banda di dispersione ottenuta tramite metodi di fatica tradizionali. Tempo di prova: circa 500 ore',
      },
      {
        title: 'Titolo caso studio 2',
        body: 'Valutazione del limite di fatica mediante il metodo termografico.Tempo di prova: circa 8 ore',
      },
      {
        title: 'Titolo caso studio 3',
        body: 'Confronto tra il valore S-N ottenuto con prove a gradini mediante metodo termografico e la banda di dispersione delle prove di fatica tradizionali',
      },
    ],
  },

  jsonLd: {
    orgDescription:
      "Spin-off accademico dell'Università di Messina specializzato in testing a fatica dei materiali con tecnologia FFTM.",
    fftmDescription:
      'Tecnologia proprietaria per il testing a fatica dei materiali che riduce i tempi da ~500 ore a meno di 48 ore, basata su metodi termografici validati dalla ricerca scientifica.',
    fqctDescription:
      'Controllo qualità non distruttivo: analisi della firma meccanico-strutturale di un componente con risultato pass/fail in 50–60 minuti.',
    areaServed: 'IT',
  },
}

export type Dictionary = typeof dict
