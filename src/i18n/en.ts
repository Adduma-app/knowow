// English dictionary. Mirrors the shape of src/i18n/it.ts.
// To add a new string: add it both here and in it.ts under the same key.

export const dict = {
  locale: 'en' as const,
  htmlLang: 'en',

  meta: {
    title: 'Knowow | Fast Fatigue Testing Technology — beyond ordinary engineering',
    description:
      'Knowow cuts fatigue testing from ~500 hours to under 48 hours with FFTM. Academic spin-off of the University of Messina. Testing, licensing and tailored services.',
    keywords:
      'fast fatigue testing technology, FFTM, fatigue testing, Wöhler curve, thermography, Risitano, materials',
    ogTitle: 'Knowow | Fast Fatigue Testing Technology',
    ogDescription:
      'From ~500 hours to under 48 hours. Fatigue testing technology based on patented thermographic methods.',
    ogLocale: 'en_US',
    canonical: 'https://www.knowow.tech/en',
    pageProdottiTitle: 'Products & Services — Knowow',
    pageProdottiDescription:
      'The full Knowow ecosystem of products and services: from fatigue characterization to quality control, from performance-driven design to numerical simulation.',
  },

  navbar: {
    ariaNavigation: 'Main navigation',
    ariaLogoHome: 'Knowow — back to top of page',
    ariaSection: 'Go to {name} section',
    cta: 'Request an FFTT pilot',
    ariaCta: 'Request an FFTT demo',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchToOther: 'IT',
    ariaSwitchToOther: 'Passa alla versione italiana',
  },

  navLinks: [
    { label: 'About', href: '/en#chi-siamo' },
    { label: 'FFTT', href: '/en/technology' },
    { label: 'Products & Services', href: '/en/prodotti-e-servizi' },
    { label: 'Partners', href: '/en/partner' },
    { label: 'Contact', href: '/en#contatti' },
  ],

  hero: {
    tag: 'Fast Fatigue Testing Technology',
    h1Line1: 'Testing the fatigue behavior of materials, components and systems has ',
    h1Line2: 'never been this simple and fast.',
    subtitle: 'FFTT cuts testing time from several weeks down to a few hours.',
    ctaPrimary: 'Discover FFTT',
    ctaSecondary: 'Request a demo',
    ariaSection: 'Hero — Fast Fatigue Testing Technology',
    ariaCtaPrimary: 'Discover FFTT technology',
    stats: [
      { value: '< 48h', label: 'Testing time' },
      { value: '90%+', label: 'Reduction vs. traditional methods' },
      { value: '50+', label: 'Years of scientific research' },
    ],
  },

  whyFftmExtras: {
    cta: 'Discover the thermographic methods',
    circleTraditional: {
      label: '[01] TRADITIONAL METHOD',
      items: ['25 specimens (5 load levels x 5 specimens)', '500+ hours', '~1 month'],
      impact: 'Slows innovation and delays time-to-market',
      unit: 'HOURS',
      number: '500+',
    },
    circleFftm: {
      label: '[02] WITH FFTT',
      headline: 'Wöhler curve and fatigue limit in <48 hours',
      unit: 'HOURS',
      systemBasedOn: 'Built on:',
      items: ['Thermographic (IR) sensors', 'Digital Image Correlation', 'Proprietary algorithms for data analysis'],
    },
  },

  whyFftm: {
    label: 'Why FFTT',
    h2Line1: 'Fatigue characterization with traditional methods takes a long time',
    h2Line2: 'and slows R&D down. FFTT does NOT.',
    body: 'Standard testing protocols require hundreds of hours and dozens of specimens to derive a Wöhler (S‑N) curve and obtain the fatigue limit. FFTT drastically reduces both the number of specimens and the test duration, while delivering data reliability equal to or better than traditional protocols.',
    traditional: {
      tag: '[01]',
      title: 'The traditional method',
      items: [
        '25 specimens (5 load levels x 5 specimens)',
        '500+ hours',
        '~1 month',
      ],
    },
    fftm: {
      tag: '[02]',
      title: 'FFTM — Fast Fatigue Testing Technology',
      items: [
        'Fatigue curves in 1–2 working days',
        'Under 48 hours — often ~24 hours or less',
        'A single integrated system: IR + DIC + ML',
        'Methods validated in peer-reviewed publications',
      ],
    },
    benefits: [
      {
        num: '01',
        title: 'From 500+ hours to <48 hours',
        text: 'Where traditional methods take weeks, FFTT delivers the Wöhler (S‑N) curve and the fatigue limit in under 48 hours',
      },
      {
        num: '02',
        title: 'An integrated technology',
        text: 'FFTT combines thermographic (IR) sensors, Digital Image Correlation (DIC) and proprietary algorithms for data analysis in a single process.',
      },
      {
        num: '03',
        title: 'Technology grounded in energy methods, the result of over 35 years of scientific research',
        text: 'The technology is based on the Risitano Thermographic Method and the Static Thermographic Method, documented in numerous peer-reviewed publications.',
      },
    ],
  },

  howToUse: {
    label: 'serving business needs',
    h2: 'FAST FATIGUE TESTING TECHNOLOGY AT THE SERVICE OF YOUR COMPANY',
    body: 'FFTT is available as pilot projects, as service bundles within an ongoing partnership, and as a licensed technology transferred directly to your laboratories. ',
    cards: [
      {
        mode: 'MODE 01',
        num: '01',
        title: 'Pilot project',
        text: 'The pilot project takes place either at the Knowow laboratories or at your facilities. We deliver the Wöhler (S‑N) curve, the fatigue limit and a complete technical report. The pilot serves as a showcase of our technical capabilities, designed to make the first engagement easier. The next step in the partnership is the activation of a service bundle.',
        cta: 'Request a quote →',
        borderColor: 'border-[#E9704D]',
      },
      {
        mode: 'MODE 02',
        num: '02',
        title: 'Service bundles',
        text: 'We favor structured, ongoing relationships over one-off engagements, in order to deliver the highest value to our selected partners. Our service bundles let us align with your roadmap, guaranteeing fast response times and dedicated technical capacity. ',
        cta: 'Discover our bundles →',
        borderColor: 'border-[#3B61AB]',
      },
      {
        mode: 'MODE 03',
        num: '03',
        title: 'Bring FFTT into your lab',
        text: 'When the need is frequent or comes from multiple R&D teams, you can license the technology and integrate it directly into your laboratories. We provide custom test rigs or a retrofit for your existing benches. Knowow supports installation and calibration, trains your staff and provides remote assistance.',
        cta: 'Ask about licensing →',
        borderColor: 'border-white/20',
      },
    ],
  },

  sectors: {
    label: 'Application sectors',
    h2: 'FFTT in your industry',
    body: 'FFTT applies across several industrial sectors and to a wide range of materials, including metals, composites, polymers, technical fabrics and high-performance fibers.',
    items: [
      { label: 'Automotive' },
      { label: 'Motorsport' },
      { label: 'Luxury manufacturing' },
      { label: 'Biomedical' },
      { label: 'Aerospace' },
      { label: 'Naval' },
      { label: 'Defense' },
      { label: 'Additive manufacturing' },
    ],
  },

  ecosystem: {
    h2line1: 'FFTT IS THE TECHNOLOGICAL FRONTIER',
    h2line2a: 'Around it, a complete ',
    h2accent: 'ecosystem',
    h2line2b: ' of products and services.',
    body: "Knowow is more than fatigue testing. Our products and services cover the entire lifecycle of an industrial product.",
    services: [
      {
        num: '01.',
        title: 'Non-destructive quality control',
        keyword: 'FQCT',
        subtitle: 'Fast Quality Control Technology — FQCT',
        text: "Building on the physics behind FFTT, our non-destructive quality control analyzes a component's mechanical-structural signature and compares it to that of a validated prototype. A complete screening takes 50–60 minutes and returns a clear pass/fail result, useful for catching production drift before it becomes a quality issue.",
        icon: '/favicon.webp',
      },
      {
        num: '02.',
        title: 'Performance-driven design',
        keyword: 'Performance Driven Design',
        subtitle: 'Performance Driven Design',
        text: 'A design approach that goes beyond trial-and-error by mathematically exploring the entire space of possible solutions. Fewer iterations, fewer simulations, optimal results.',
        icon: '/favicon.webp',
      },
      {
        num: '03.',
        title: 'NUMERICAL SIMULATIONS',
        keyword: 'FEM, CFD, MBS, CAO/RT',
        subtitle: 'Numerical Simulations',
        text: 'Finite element analysis, computational fluid dynamics, multibody simulations, optical simulation and optimization let us accurately predict system behavior under real operating conditions and provide the data needed to drive design decisions within the Performance Driven Design framework.',
        icon: '/favicon.webp',
      },
      {
        num: '04.',
        title: 'Innovation',
        keyword: 'Tailored R&D',
        subtitle: 'Tailored R&D',
        text: 'Custom design and development of innovative engineering solutions. ',
        icon: '/favicon.webp',
      },
    ],
  },

  about: {
    label: 'Behind FFTT',
    h2line1: 'Over 35 years of research.',
    h2line2: 'A technology without equal.',
    body: 'Knowow was founded as an academic spin-off of the University of Messina. The team that developed and industrialized FFTT brings over 35 years of pioneering research in materials fatigue and thermography — the foundation of the methods behind FFTT: the Risitano Thermographic Method and the Static Thermographic Method.',
    linkAbout: 'About us →',
    linkPubs: 'Publications & patents →',
    yearsLabel: 'Years of scientific research',
    spinoffLabel: 'University of Messina — Academic spin-off',
  },

  ecosystemExtras: {
    closeAria: 'Close',
    discoverAreasButton: 'Explore the areas',
    ambitiNote:
      'Each simulation is run for the specific application and stays consistent with project requirements and experimental data.',
    ambiti: [
      {
        button: 'Fem',
        title: 'FEM – Finite Element Analysis',
        img: '/simulazioni_new/sospensione.webp',
        text: 'Structural simulations to evaluate stress, strain and failure mechanisms under realistic load conditions.',
      },
      {
        button: 'Cfd',
        title: 'Computational Fluid Dynamics',
        img: '/simulazioni_new/car.webp',
        text: 'Analysis of internal and external flows, heat exchange and fluid-structure interactions.',
      },
      {
        button: 'Multibody Dynamics',
        title: 'Multibody Dynamics',
        img: '/simulazioni_new/multibody.webp',
        text: 'Kinematic and dynamic modeling of complex mechanical systems with interacting components.',
      },
      {
        button: 'Optical Simulations',
        title: 'Optical Simulations',
        img: '/simulazioni_new/knowow_light.webp',
        text: 'Prediction and optimization of how light behaves through materials and surfaces, for optical and lighting systems.',
      },
    ],
  },

  cta: {
    h2: 'Get in touch',
    body: 'Reach out to our team. We have a solution for every need your company has.',
    ctaPrimary: 'Send',
    ctaSecondary: 'Contact us',
    form: {
      namePlaceholder: 'Name *',
      emailPlaceholder: 'Email *',
      companyPlaceholder: 'Company *',
      messagePlaceholder: 'Message (optional)',
      nameAria: 'Name',
      emailAria: 'Email',
      companyAria: 'Company',
      messageAria: 'Message',
      requiredError: 'Required field',
      invalidEmailError: 'Invalid email',
      sendError: 'Something went wrong. Try again or write to us directly.',
      submittedH2: 'Message sent',
      submittedBody: 'The team will be in touch within 24 hours.',
      sendAnother: 'Send another message',
      submitting: 'Sending…',
    },
  },

  footer: {
    descLine1: 'Academic spin-off of the University of Messina',
    descLine2: 'Fast Fatigue Testing Technology',
    copyright: '© 2026 Knowow s.r.l. — VAT 03698560830',
    contactsLabel: 'Contact',
    associationLabel: 'Member of Confindustria via Sicindustria',
    rightsReserved: 'Knowow s.r.l. — All rights reserved',
  },

  partner: {
    tag: 'Collaborations',
    h1Line1: 'Our',
    h1Line2: 'Partners',
    body: 'Institutions, companies and research centers we work with to bring innovation to materials characterization.',
  },

  technology: {
    tag: 'The heart of FFTT',
    h1Line1: 'Fast Fatigue',
    h1Line2: 'TESTING TECHNOLOGY',
    body:
      'FFTT is built on the Risitano Thermographic Method and the Static Thermographic Method, equipped with thermographic (IR) sensors and digital image correlation (DIC). It delivers the Wöhler curve and the fatigue limit in under 48 hours.',
    integratedHeader:
      'FFTT combines thermographic (IR) sensors, Digital Image Correlation (DIC), thermographic methods and proprietary algorithms for data analysis in a single process.',
    integratedH2: 'An integrated technology',
    items: [
      {
        num: '01',
        tag: 'Equipment',
        title: 'IR Camera',
        subtitle: 'Infrared Thermal Imaging',
        body: 'Tracks the evolution of the specimen surface temperature during the fatigue test.',
      },
      {
        num: '02',
        tag: 'Equipment',
        title: 'Digital Image Correlation',
        subtitle: 'Strain field',
        body: 'Measures specimen deformation during mechanical tests.',
      },
      {
        num: '03',
        tag: 'Method / STM',
        title: 'Static Thermographic Method',
        subtitle: 'First-damage limit',
        body: 'Estimation of the limit stress that triggers the first microplasticization of the material.',
      },
      {
        num: '04',
        tag: 'Method / RTM',
        title: 'Risitano Thermographic Method',
        subtitle: 'Wöhler curve and fatigue limit',
        body: 'Derivation of the Wöhler curve and the fatigue limit by analyzing the stabilization-temperature trend as a function of the applied stress level.',
      },
    ],
  },

  perche: {
    case1Tag: 'case study 1',
    case1H2Line1: 'FEW DATA POINTS GIVE AN ILLUSION OF PRECISION.',
    case1H2Line2: 'MORE DATA GUARANTEES TRUE RELIABILITY.',
    case1Body: 'Series 1 has the best R² — and it is the least reliable.',
    astmTag: 'ASTM E739',
    astmBodyPart1: 'The ASTM E739 standard recommends a minimum of ',
    astmHi: '12–24 specimens',
    astmBodyPart2:
      ' for statistically meaningful campaigns. Below that threshold the result can only be called an indicative characterization, not design-grade reliability. The ASTM E739 range is wide because it spans low and high reliability bands. Scientific literature on fatigue characterization, together with several decades of industrial application, points to 20 specimens as the practical threshold below which survival-curve estimates become too uncertain to support reliable design decisions. It is not a regulatory rule, but a well-grounded engineering threshold.',
    tableHeaders: ['Series', 'Specimens', 'R²', 'Days'],
    tableWarningBadge: 'High R²',
    tableWarningSep: '≠',
    tableWarningText: 'better',
    sectionLabel: 'WHY A WELL-DESIGNED CAMPAIGN MATTERS',
    sectionH2Line1: 'Materials fatigue:',
    sectionH2Line2: 'a deep, little-known field.',
    block1Heading: 'The most common mistake: 5 specimens are not enough',
    block1BodyPart1:
      'One of the most widespread mistakes is working with Wöhler curves derived from just 5 specimens. ',
    block1BodyHi: 'The difference compared to 20+ specimens is not quantitative — it is qualitative.',
    block1BodyPart2:
      ' With 5 specimens you do not estimate a distribution, you fit a curve to a sample that is too small: like estimating a city’s annual rainfall by measuring only 5 summer days.',
    chartLabel: 'Traditional method',
    chartSubtitle: 'Wöhler curve construction — statistical standard',
    compareCol1: {
      label: 'INDUSTRIAL PRACTICE',
      badge: '⚠ Insufficient',
      num: '5',
      unit: 'specimens',
      items: [
        '~11 days of machine time',
        'R² that looks great',
        'Distribution cannot be estimated',
        'Unreliable S-N curve',
      ],
    },
    compareCol2: {
      label: 'Statistical standard',
      badge: '✓ Reliable',
      num: '20+',
      unit: 'specimens',
      items: [
        '~45 days of machine time',
        'Complete P-S-N curve',
        'Survival bands at 5/50/95%',
        'A foundation for design decisions',
      ],
    },
    block1AfterPart1: 'With traditional methods, 20+ specimens make it possible to build a ',
    block1AfterHi: 'P-S-N curve',
    block1AfterPart2:
      ' (Probability-Stress-Number of Cycles): the family of iso-reliability curves at 5%, 50%, 95% on which robust design decisions are built. With FFTT you reach the same result with a handful of specimens, in under 48 hours.',
    case2Tag: 'case study 2',
    case2H2Line1: 'Fatigue evaluation of a',
    case2H2Line2: 'naval structural steel.',
    case2Body: 'A comparison between the traditional method and our solution.',
    case2Cards: [
      {
        title: 'Case study image 1',
        body: 'S-N curve with scatter band obtained through traditional fatigue methods. Test time: about 500 hours.',
      },
      {
        title: 'Case study image 2',
        body: 'Fatigue limit evaluation via the thermographic method. Test time: about 8 hours.',
      },
      {
        title: 'Case study image 3',
        body: 'Comparison between the S-N value obtained from stepwise testing via the thermographic method and the scatter band of traditional fatigue tests.',
      },
    ],
  },

  jsonLd: {
    orgDescription:
      'Academic spin-off of the University of Messina, specialized in materials fatigue testing with FFTM technology.',
    fftmDescription:
      'Proprietary technology for materials fatigue testing that cuts test time from ~500 hours to under 48 hours, based on thermographic methods validated by scientific research.',
    fqctDescription:
      'Non-destructive quality control: analysis of the mechanical-structural signature of a component with a pass/fail result in 50–60 minutes.',
    areaServed: 'Worldwide',
  },
}

export type Dictionary = typeof dict
