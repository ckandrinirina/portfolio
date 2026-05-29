// English portfolio content module.
//
// This file mirrors `src/content/fr.ts` in every structural aspect —
// same interface, same keys, same array lengths, same ordering — but
// every user-visible string is idiomatic English.
//
// Technology names, company names, project names, and period strings are
// proper nouns or stack identifiers; they are intentionally unchanged between
// locales. Only narrative copy is translated.
//
// No JSX, no Tailwind classes, no logic — data only.
import type { PortfolioContent } from './types'

export default {
  hero: {
    name: 'Erick Andrinirina',
    title: 'Fullstack JavaScript Engineer',
    positioning:
      '7 years of experience building performant, scalable web applications.',
    location: 'Antananarivo, Madagascar',
    ctaViewProjects: 'View projects',
    ctaDownloadCv: 'Download CV',
    ctaContact: 'Get in touch',
    greet: "Hi, I'm",
    tagline: 'I build performant, scalable web products end-to-end.',
    roles: [
      'Fullstack Engineer',
      'React & Node specialist',
      'Web3 builder',
      'Problem solver',
    ],
  },

  about: {
    narrative:
      'Experienced Fullstack Developer with 7 years of expertise building high-performance web applications. Comfortable across both JavaScript and PHP ecosystems — React and Angular on the front end, Node.js, Symfony, and Laravel on the back end — with solid experience in databases such as MongoDB, PostgreSQL, and MySQL. Motivated by technical challenges and always looking for new opportunities to contribute to the success of ambitious projects.',
  },

  skills: [
    {
      label: 'Languages',
      items: [
        'TypeScript',
        'JavaScript',
        'PHP',
        'Python',
        'Java',
        'C/C++/.NET',
        'HTML5',
        'CSS/SCSS',
        'SQL',
      ],
    },
    {
      label: 'Front-end frameworks & libraries',
      items: [
        'React',
        'Angular',
        'Vue.js',
        'Redux',
        'Recoil',
        'React Native',
        'Angular Material',
        'PrimeReact',
        'Bootstrap',
        'Tailwind CSS',
        'Formik',
        'Zod',
      ],
    },
    {
      label: 'Back-end frameworks',
      items: [
        'Node.js',
        'Symfony',
        'Laravel',
        'CodeIgniter',
        'NestJS',
        'API Platform',
      ],
    },
    {
      label: 'Databases',
      items: [
        'PostgreSQL',
        'MySQL',
        'MariaDB',
        'MongoDB',
        'SQLite',
        'Firebase',
      ],
    },
    {
      label: 'Tooling & DevOps',
      items: [
        'Git',
        'Docker',
        'Vercel',
        'Google Cloud Run',
        'Azure',
        'NPM',
        'Composer',
      ],
    },
    {
      label: 'Testing',
      items: ['Jest', 'Jasmine', 'Karma'],
    },
    {
      label: 'AI & Specialized',
      items: ['OpenAI', 'Tesseract / Node-Tesseract OCR', 'Blockchain'],
    },
    {
      label: 'Project & design tools',
      items: ['Jira', 'Trello', 'Figma / Adobe XD'],
    },
  ],

  experience: [
    {
      company: 'SOKA / YAS Madagascar',
      role: 'Full Stack Developer',
      period: 'Jan 2025 – present',
      techHighlights: [
        'Next.js',
        'NestJS',
        'Prisma',
        'Redux Toolkit',
        'React Admin',
        'Tailwind CSS',
        'PostgreSQL',
        'Google Cloud',
        'Web3',
        'Blockchain',
      ],
      projects: [
        {
          name: 'SOKA CLUB',
          description:
            'A multifunctional digital platform combining event ticketing, an online shop, and interactive mini-games, with USDC payments and a SOKA points loyalty system.',
        },
        {
          name: 'SOKA LIVE',
          description:
            'A football-prediction platform featuring competitive leaderboards and a rewards system.',
        },
        {
          name: 'LUDOKA',
          description:
            'Competitive Ludo games integrated into the broader SOKA ecosystem.',
        },
      ],
    },
    {
      company: 'BMOI Madagascar',
      role: 'Full Stack Developer',
      period: 'Jul 2024 – Jan 2025',
      techHighlights: ['React', 'Node.js', 'PostgreSQL'],
      projects: [
        {
          name: 'EER Full Digital',
          description:
            'An online bank-account creation service with video-based identity verification and secure document handling for the KYC process.',
        },
      ],
    },
    {
      company: 'SHOYO',
      role: 'Full Stack Developer / Lead Developer',
      period: 'Jan 2021 – Jul 2024',
      techHighlights: [
        'React',
        'Angular',
        'Node.js',
        'NestJS',
        'PostgreSQL',
        'MongoDB',
        'OpenAI',
        'Tesseract',
      ],
      projects: [
        {
          name: 'SHOYO',
          description:
            'A digital-dossier platform simplifying financial procedures, including a major migration from a PHP framework to a modern JavaScript stack.',
        },
        {
          name: 'THESEIS',
          description: 'A digital document-management solution.',
        },
        {
          name: 'Happy Capital / My Capital Immo',
          description:
            'A real-estate crowdfunding platform with real-time investment tracking.',
        },
        {
          name: 'OCR information extraction',
          description:
            'A solution leveraging OCR and GPT-4 to convert images and PDFs (ID cards, bank details, passports) into structured data.',
        },
      ],
    },
    {
      company: 'VTC Academy',
      role: 'Full Stack Developer',
      period: 'Jun 2020 – Dec 2020',
      techHighlights: ['React', 'Node.js', 'MySQL'],
      projects: [
        {
          name: 'VTC Academy',
          description:
            'A training platform for taxi drivers featuring multiple-choice quizzes and an administrative dashboard for tracking student progress.',
        },
      ],
    },
    {
      company: 'PANAFRI HELP',
      role: 'Full Stack Developer',
      period: 'Jan 2020 – Jun 2020',
      techHighlights: ['React', 'Node.js', 'MongoDB'],
      projects: [
        {
          name: 'PANAFRI HELP',
          description:
            'A project-funding platform built end-to-end, from concept to production.',
        },
      ],
    },
    {
      company: 'CREACTISOFT',
      role: 'Full Stack Developer / Lead Developer',
      period: 'Sept 2019 – Dec 2020',
      techHighlights: ['Angular', 'Symfony', 'PostgreSQL', 'MySQL'],
      projects: [
        {
          name: 'IPSUM',
          description: 'A sales ERP solution.',
        },
        {
          name: 'SOLIUS',
          description: 'A construction ERP solution.',
        },
        {
          name: 'MOZART',
          description: 'A customer-service ERP solution.',
        },
        {
          name: 'ELISE',
          description: 'An automated after-sales questionnaire system.',
        },
      ],
    },
    {
      company: 'INGENOSYA',
      role: 'Full Stack Developer',
      period: 'Oct 2018 – Sept 2019',
      techHighlights: ['Angular', 'Laravel', 'MySQL', 'PostgreSQL'],
      projects: [
        {
          name: 'BNI Madagascar',
          description: 'An online bank-loan application platform.',
        },
        {
          name: 'FMFP',
          description: 'An inter-company financing portal.',
        },
        {
          name: 'FORET MAD',
          description:
            'A cross-platform document classification application for the Ministry of Forests.',
        },
      ],
    },
  ],

  projects: [
    {
      name: 'SOKA Club',
      company: 'SOKA / YAS Madagascar',
      description:
        'Multifunctional digital platform combining event ticketing, an online shop, and interactive mini-games with USDC payments and a loyalty points system.',
      techTags: [
        'Next.js',
        'NestJS',
        'Prisma',
        'Redux Toolkit',
        'Tailwind CSS',
        'PostgreSQL',
        'Web3',
      ],
    },
    {
      name: 'SOKA Live',
      company: 'SOKA / YAS Madagascar',
      description:
        'Real-time sports prediction platform with dynamic leaderboards and rewards system.',
      techTags: [
        'Next.js',
        'NestJS',
        'Redux Toolkit',
        'PostgreSQL',
        'WebSocket',
      ],
    },
    {
      name: 'LUDOKA',
      company: 'SOKA / YAS Madagascar',
      description:
        'Competitive online Ludo games integrated into the broader SOKA ecosystem with real-time game management.',
      techTags: [
        'Next.js',
        'NestJS',
        'Prisma',
        'PostgreSQL',
        'Real-time messaging',
      ],
    },
    {
      name: 'EER Full Digital',
      company: 'BMOI Madagascar',
      description:
        'Online bank-account creation service with video-based identity verification and secure KYC document handling.',
      techTags: ['React', 'Node.js', 'TypeScript', 'KYC', 'Video verification'],
    },
    {
      name: 'SHOYO',
      company: 'SHOYO',
      description:
        'Digital dossier platform for managing financial procedures, including a major migration from PHP to JavaScript.',
      techTags: [
        'React',
        'NestJS',
        'TypeScript',
        'PostgreSQL',
        'PHP migration',
      ],
    },
    {
      name: 'THESEIS',
      company: 'SHOYO',
      description:
        'Digital document management solution for enterprise-level document classification, storage, and retrieval.',
      techTags: ['Angular', 'Node.js', 'MongoDB', 'TypeScript'],
    },
    {
      name: 'Happy Capital / My Capital Immo',
      company: 'SHOYO',
      description:
        'Real-estate crowdfunding platform with real-time investment tracking and interactive investor dashboards.',
      techTags: ['React', 'NestJS', 'PostgreSQL', 'WebSocket', 'TypeScript'],
    },
    {
      name: 'OCR / GPT-4',
      company: 'SHOYO',
      description:
        'Automated data extraction from images and PDFs (IDs, IBANs, passports) using OCR and GPT-4.',
      techTags: [
        'Node.js',
        'OpenAI GPT-4',
        'Tesseract OCR',
        'TypeScript',
        'PDF',
      ],
    },
    {
      name: 'VTC Academy',
      company: 'VTC Academy',
      description:
        'Training platform for VTC drivers with interactive quizzes and educational progress dashboards.',
      techTags: ['React', 'Node.js', 'MySQL', 'Quiz'],
    },
    {
      name: 'PANAFRI HELP',
      company: 'PANAFRI HELP',
      description:
        'End-to-end project financing platform built from design through production for Africa.',
      techTags: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      name: 'IPSUM – Commercial ERP',
      company: 'CREACTISOFT',
      description:
        'Custom ERP for commercial management: sales, inventory, quotes, and invoicing.',
      techTags: ['Angular', 'Symfony', 'MySQL', 'ERP'],
    },
    {
      name: 'BNI Madagascar',
      company: 'INGENOSYA',
      description:
        'Online banking credit application platform for BNI Madagascar with loan simulation and document submission.',
      techTags: ['Angular', 'Laravel', 'MySQL'],
    },
  ],

  education: [
    {
      qualification:
        "Master's Engineer in Electronics, Applied Computing track",
      institution: "École Supérieure Polytechnique d'Antananarivo",
      year: 'June 2018',
    },
    {
      qualification: 'Advanced web development training',
      institution: 'NEITIC',
      year: 'June 2019',
    },
    {
      qualification: 'Scientific Baccalaureate',
      institution: '',
      year: '2013',
    },
  ],

  spokenLanguages: [
    { language: 'Malagasy', proficiency: 'Native' },
    { language: 'French', proficiency: 'Fluent' },
    { language: 'English', proficiency: 'Working proficiency' },
  ],

  contact: {
    location: 'Antananarivo, Madagascar',
    intro:
      'Feel free to reach out — I am always open to discussing new projects, opportunities, or ideas.',
    pitch:
      "Have a project in mind? I'm open to fullstack roles, freelance work, and ambitious collaborations — let's talk.",
    languages: [
      'Malagasy — Native',
      'French — Fluent',
      'English — Professional',
    ],
    meta: [
      {
        label: 'Email',
        value: 'ckandrinirina@gmail.com',
        href: 'mailto:ckandrinirina@gmail.com',
        copy: true,
      },
      { label: 'Location', value: 'Antananarivo, Madagascar' },
      { label: 'Status', value: 'Available for work' },
    ],
  },

  // ─── NOW ───────────────────────────────────────────────────────────────────

  now: {
    headline: 'Building the SOKA ecosystem',
    body: 'Leading fullstack development on a Web3 platform spanning ticketing, commerce, and real-time games.',
    meta: {
      label: 'Currently',
      period: 'Jan 2025 — present',
    },
  },

  // ─── STATS ───────────────────────────────────────────────────────────────────

  stats: [
    { n: 7, suffix: '+', label: 'Years building' },
    { n: 20, suffix: '+', label: 'Projects shipped' },
    { n: 8, label: 'Featured works' },
    { n: 6, label: 'Companies' },
  ],

  // ─── MARQUEE ─────────────────────────────────────────────────────────────────

  marquee: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Prisma',
    'Tailwind CSS',
    'Web3',
    'OpenAI',
    'Docker',
    'Google Cloud',
  ],

  // ─── TIMELINE (new experience shape) ─────────────────────────────────────────

  timeline: [
    {
      year: '2025 — now',
      role: 'Full Stack Developer',
      company: 'SOKA / YAS Madagascar',
      desc: 'Leading development of a Web3 platform combining ticketing, commerce, and real-time games.',
      stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Web3'],
    },
    {
      year: '2024 — 25',
      role: 'Full Stack Developer',
      company: 'BMOI Madagascar',
      desc: 'Built a remote bank-account onboarding service with video-based KYC verification.',
      stack: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      year: '2021 — 24',
      role: 'Lead Developer',
      company: 'SHOYO',
      desc: 'Led the digital-dossier platform and its migration from PHP to a modern JavaScript stack.',
      stack: ['React', 'NestJS', 'PostgreSQL', 'MongoDB', 'OpenAI'],
    },
    {
      year: '2020',
      role: 'Full Stack Developer',
      company: 'VTC Academy',
      desc: 'Built a driver-training platform with interactive quizzes and a progress dashboard.',
      stack: ['React', 'Node.js', 'MySQL'],
    },
    {
      year: '2020',
      role: 'Full Stack Developer',
      company: 'PANAFRI HELP',
      desc: 'Delivered a project-funding platform end-to-end, from concept to production.',
      stack: ['React', 'Node.js', 'MongoDB'],
    },
    {
      year: '2019 — 20',
      role: 'Lead Developer',
      company: 'CREACTISOFT',
      desc: 'Built sales, construction, and customer-service ERP solutions for multiple clients.',
      stack: ['Angular', 'Symfony', 'PostgreSQL', 'MySQL'],
    },
    {
      year: '2018 — 19',
      role: 'Full Stack Developer',
      company: 'INGENOSYA',
      desc: 'Built banking and financing portals, plus a cross-platform document classifier.',
      stack: ['Angular', 'Laravel', 'MySQL', 'PostgreSQL'],
    },
  ],

  // ─── SKILL CARDS (new skills shape) ──────────────────────────────────────────

  skillCards: [
    {
      title: 'Frontend',
      lead: ['React', 'TypeScript', 'Next.js'],
      chips: [
        'Angular',
        'Vue.js',
        'Redux Toolkit',
        'Tailwind CSS',
        'React Native',
      ],
    },
    {
      title: 'Backend',
      lead: ['Node.js', 'NestJS'],
      chips: ['Symfony', 'Laravel', 'API Platform', 'Prisma'],
    },
    {
      title: 'Data & Cloud',
      lead: ['PostgreSQL', 'MongoDB'],
      chips: ['MySQL', 'Docker', 'Google Cloud', 'Vercel', 'Firebase'],
    },
    {
      title: 'AI & Craft',
      lead: ['OpenAI', 'OCR / Tesseract'],
      chips: ['Web3', 'Blockchain', 'Jest', 'Figma'],
    },
  ],

  // ─── PROCESS ─────────────────────────────────────────────────────────────────

  process: [
    {
      num: '01',
      title: 'Understand first',
      body: 'Start from the problem and the people who have it — not the framework. Clear requirements beat clever code.',
    },
    {
      num: '02',
      title: 'Ship in thin slices',
      body: 'Deliver the smallest valuable increment, get it in front of users, and iterate on real feedback.',
    },
    {
      num: '03',
      title: 'Type everything',
      body: 'Let the compiler carry the contracts. Strong types turn whole classes of bugs into build errors.',
    },
    {
      num: '04',
      title: 'Test what matters',
      body: 'Cover the behaviour users depend on and the edges that break quietly — not coverage for its own sake.',
    },
    {
      num: '05',
      title: 'Refine relentlessly',
      body: 'Leave each module clearer than I found it. Small, safe refactors keep velocity high over time.',
    },
  ],
} satisfies PortfolioContent
