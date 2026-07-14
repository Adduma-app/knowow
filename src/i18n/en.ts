// English dictionary. Mirrors the shape of src/i18n/it.ts.
// To add a new string: add it both here and in it.ts under the same key.

export const dict = {
  locale: 'en' as 'it' | 'en',
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
    h2Line1: 'Fatigue characterization with traditional methods is time-consuming',
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
    body: 'FFTT is available for a pilot project, as a service bundle, and as a licensed technology transferred directly to your laboratories.',
    cards: [
      {
        mode: 'MODE 01',
        num: '01',
        title: 'Pilot project',
        text: "The pilot project takes place either at the Knowow laboratories or at the client's. We deliver the Wöhler (S‑N) curve, the fatigue limit and a complete technical report. The pilot serves as a showcase of our technical capabilities, designed to make the first engagement easier. The next step in the partnership is the activation of a service bundle.",
        cta: 'Request a quote →',
        borderColor: 'border-[#E9704D]',
      },
      {
        mode: 'MODE 02',
        num: '02',
        title: 'Service bundles',
        text: 'In order to deliver the highest value to our partners, we favor structured and continuous relationships over one-off engagements. Our service bundles enable us to align with your roadmap, guaranteeing fast response times and ensure dedicated technical capacity.',
        cta: 'Discover our bundles →',
        borderColor: 'border-[#3B61AB]',
      },
      {
        mode: 'MODE 03',
        num: '03',
        title: 'Bring FFTT into your lab',
        text: "When the need is frequent or comes from multiple R&D teams, our technology can be licensed and integrated directly into your laboratories. Based on the client's needs, we can provide custom test benches as well as a retrofit kit for existing test benches. Knowow supports installation and calibration, trains your staff and provides remote assistance.",
        cta: 'Ask about licensing →',
        borderColor: 'border-white/20',
      },
    ],
  },

  sectors: {
    label: 'Application domains',
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
    h2line2: 'An unrivalled technology.',
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
    body: 'Reach out to our team.',
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
    legalLabel: 'Legal',
    privacyLabel: 'Privacy Policy',
    cookieLabel: 'Cookie Policy',
    manageCookies: 'Manage cookies',
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
      'FFTT is built on the Risitano Thermographic Method and the Static Thermographic Method, and it is equipped with thermographic (IR) sensors and digital image correlation (DIC). It delivers the Wöhler curve and the fatigue limit in under 48 hours.',
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
      ' for statistically meaningful campaigns. Below that threshold the result can only be regarded as indicative characterization, not design-grade reliability. The ASTM E 739 range is purposely wide to reflect a low-high reliability band. Scientific literature on fatigue characterization, together with several decades of industrial application, points to 20 specimens as the practical threshold below which survival-curve estimates become too uncertain to support reliable design decisions. It is not a regulatory rule, but a well-grounded engineering threshold.',
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
      ' 5 specimens are insufficient to estimate a distribution, they only allow curve fitting on a sample that is just too small: it is comparable to estimating a city’s annual rainfall by measuring only 5 summer days.',
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
      ' (Probability-Stress-Number of Cycles): the family of iso-reliability curves at 5%, 50%, 95% on which robust design decisions are built. FFTT enables to reach the same result with a handful of specimens, in under 48 hours.',
    case2Tag: 'case study 2',
    case2H2Line1: 'Fatigue evaluation of a',
    case2H2Line2: 'naval structural steel.',
    case2Body: 'A comparison between the traditional method and our solution.',
    case2Cards: [
      {
        title: 'Case study image 1',
        body: 'S-N curve with scatter band obtained through traditional fatigue methods.',
        testTime: 'Test time: about 500 hours',
      },
      {
        title: 'Case study image 2',
        body: 'Fatigue limit evaluation via the thermographic method.',
        testTime: 'Test time: about 8 hours',
      },
      {
        title: 'Case study image 3',
        body: 'Comparison between the S-N value obtained from stepwise testing via the thermographic method and the scatter band of traditional fatigue tests.',
        testTime: '',
      },
    ],
  },

  cookie: {
    ariaLabel: 'Cookie notice',
    title: 'We respect your privacy',
    body: 'We use technical cookies required for the site to work and, with your consent, analytics cookies (Google Analytics) to understand how it is used. You can accept, reject or choose.',
    readMore: 'Cookie Policy',
    acceptAll: 'Accept all',
    reject: 'Reject',
    customize: 'Customise',
    save: 'Save preferences',
    necessaryTitle: 'Necessary cookies',
    necessaryDesc: 'Essential for the site to work (e.g. language preference). No consent required.',
    alwaysOn: 'Always on',
    analyticsTitle: 'Analytics cookies',
    analyticsDesc: 'Google Analytics 4, for anonymous, aggregated usage statistics.',
  },

  legal: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: July 2026',
      intro:
        'This policy describes how personal data of users browsing knowow.tech and using the contact form is processed, pursuant to Articles 13 and 14 of Regulation (EU) 2016/679 (GDPR).',
      sections: [
        {
          heading: 'Data controller',
          paragraphs: [
            'The data controller is Knowow s.r.l., VAT 03698560830, an academic spin-off of the University of Messina.',
            'Registered office: Dipartimento di Ingegneria – Contrada Di Dio snc, 98166 Messina (ME), Italy. For any request regarding personal data you can write to: info@knowow.tech.',
          ],
        },
        {
          heading: 'Data processed and purposes',
          paragraphs: [
            'We process the personal data you voluntarily provide through the contact form on the site: name, email address, company and any message.',
            'This data is used solely to reply to your requests, manage the business enquiry and provide the information you requested about our services.',
            'With your consent, we also collect aggregated, anonymous navigation data through analytics cookies (see Cookie Policy).',
          ],
        },
        {
          heading: 'Legal basis',
          list: [
            'Contact form: performance of pre-contractual measures taken at your request and legitimate interest in replying (Art. 6.1.b and 6.1.f GDPR).',
            'Analytics cookies: consent of the data subject (Art. 6.1.a GDPR).',
          ],
        },
        {
          heading: 'Processing methods and recipients',
          paragraphs: [
            'Data is processed with electronic tools, adopting appropriate security measures. Messages sent through the contact form are delivered to info@knowow.tech via the Resend service (Resend, Inc.), acting as data processor.',
            'The Google Analytics 4 service is provided by Google Ireland Ltd. Some providers may involve the transfer of data to third countries (e.g. USA): such transfers take place under the safeguards provided by the GDPR (standard contractual clauses and/or Data Privacy Framework).',
          ],
        },
        {
          heading: 'Retention period',
          paragraphs: [
            'Data collected through the contact form is retained for as long as necessary to handle the request and any subsequent obligations, and in any case no longer than 24 months from the last contact, unless otherwise required by law.',
            'Statistical data collected via analytics cookies is retained according to the terms set out in the Cookie Policy.',
          ],
        },
        {
          heading: 'Rights of the data subject',
          paragraphs: [
            'At any time you may exercise the rights set out in Articles 15-22 GDPR: access, rectification, erasure, restriction, objection and data portability, as well as withdrawal of consent given.',
            'To exercise these rights, write to info@knowow.tech. You also have the right to lodge a complaint with the Italian Data Protection Authority (www.garanteprivacy.it).',
          ],
        },
      ],
    },
    cookiePolicy: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: July 2026',
      intro:
        'This Cookie Policy explains what cookies are, which cookies knowow.tech uses and how you can manage your preferences, in line with the Italian Data Protection Authority guidelines and the ePrivacy Directive.',
      sections: [
        {
          heading: 'What cookies are',
          paragraphs: [
            'Cookies are small text files that visited sites send to the user’s device, where they are stored to be sent back to the same sites on the next visit. They can be first-party (set by this site) or third-party (set by external services).',
          ],
        },
        {
          heading: 'Technical cookies (necessary)',
          paragraphs: [
            'These are essential for the site to work correctly and do not require the user’s consent. They are installed automatically.',
          ],
          table: {
            headers: ['Cookie', 'Purpose', 'Duration', 'Party'],
            rows: [
              ['knowow_lang', 'Stores the chosen language (IT/EN)', '12 months', 'First party'],
              ['knowow_consent', 'Stores your cookie preferences', '6 months', 'First party'],
            ],
          },
        },
        {
          heading: 'Analytics cookies (statistics)',
          paragraphs: [
            'These are installed only with your consent and are used to collect aggregated information about site usage. We use Google Analytics 4 with anonymised IP and in Consent Mode: no analytics cookie is installed until you give consent.',
          ],
          table: {
            headers: ['Cookie', 'Purpose', 'Duration', 'Party'],
            rows: [
              ['_ga', 'Distinguishes users (statistics)', '24 months', 'Google Analytics'],
              ['_ga_*', 'Maintains session state', '24 months', 'Google Analytics'],
            ],
          },
        },
        {
          heading: 'Managing your preferences',
          paragraphs: [
            'You can change or withdraw your choices at any time by clicking "Manage cookies" in the site footer. You can also block or delete cookies through your browser settings; disabling technical cookies may make some site features unavailable.',
          ],
        },
      ],
    },
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
