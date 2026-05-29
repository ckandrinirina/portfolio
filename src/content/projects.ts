// Featured works dataset for the Atelier Work view and project detail modal.
//
// Locale-independent on purpose: project names, clients, tech stacks, and years
// are proper nouns / identifiers, so they are NOT duplicated across fr.ts/en.ts.
// The card summary (`desc`) and `detail` copy are written in English (the EN
// baseline); if per-locale project copy is ever needed it can move into the
// locale modules, but the design treats this list as the single source.
//
// Ordering is the showcase order — `num` "01"…"08" follows the array index.
import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'soka',
    num: '01',
    name: 'SOKA Club',
    year: '2025',
    role: 'Lead Fullstack',
    client: 'YAS Madagascar',
    category: 'Platform · Web3',
    link: '#',
    repo: null,
    desc: 'Multifunctional platform combining event ticketing, an online shop, and interactive mini-games with USDC payments and a loyalty points system.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Web3'],
    detail: {
      role: 'Lead fullstack engineer — architecture, Web3 payments, and the loyalty engine.',
      impact:
        'Unified ticketing, commerce, and gaming into one product with on-chain USDC settlement and a SOKA points reward loop.',
      stack: 'Next.js · NestJS · Prisma · Redux Toolkit · PostgreSQL · Web3',
    },
  },
  {
    id: 'soka-live',
    num: '02',
    name: 'SOKA Live',
    year: '2025',
    role: 'Fullstack',
    client: 'YAS Madagascar',
    category: 'Realtime · Gaming',
    link: '#',
    repo: null,
    desc: 'Football-prediction platform with competitive real-time leaderboards and a rewards system.',
    tags: ['Next.js', 'NestJS', 'WebSocket', 'PostgreSQL'],
    detail: {
      role: 'Fullstack engineer — realtime scoring and leaderboard infrastructure.',
      impact:
        'Delivered live prediction rounds with sub-second leaderboard updates over WebSocket during match windows.',
      stack: 'Next.js · NestJS · Redux Toolkit · WebSocket · PostgreSQL',
    },
  },
  {
    id: 'ludoka',
    num: '03',
    name: 'LUDOKA',
    year: '2025',
    role: 'Fullstack',
    client: 'YAS Madagascar',
    category: 'Realtime · Gaming',
    link: '#',
    repo: null,
    desc: 'Competitive online Ludo games integrated into the broader SOKA ecosystem with real-time match management.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL'],
    detail: {
      role: 'Fullstack engineer — game state, matchmaking, and ecosystem integration.',
      impact:
        'Shipped multiplayer Ludo with authoritative server-side game state, plugged into the SOKA account and rewards system.',
      stack: 'Next.js · NestJS · Prisma · PostgreSQL · Realtime messaging',
    },
  },
  {
    id: 'eer',
    num: '04',
    name: 'EER Full Digital',
    year: '2024',
    role: 'Fullstack',
    client: 'BMOI Madagascar',
    category: 'Fintech · KYC',
    link: '#',
    repo: null,
    desc: 'Online bank-account creation service with video-based identity verification and secure KYC document handling.',
    tags: ['React', 'Node.js', 'TypeScript', 'KYC'],
    detail: {
      role: 'Fullstack engineer — onboarding flow and the KYC verification pipeline.',
      impact:
        'Replaced in-branch onboarding with a remote video-KYC flow, cutting account-opening time while keeping documents secure.',
      stack: 'React · Node.js · TypeScript · Video verification',
    },
  },
  {
    id: 'shoyo',
    num: '05',
    name: 'SHOYO',
    year: '2021–24',
    role: 'Lead Developer',
    client: 'SHOYO',
    category: 'Platform · Fintech',
    link: '#',
    repo: null,
    desc: 'Digital-dossier platform for financial procedures, including a major migration from a PHP framework to a modern JavaScript stack.',
    tags: ['React', 'NestJS', 'PostgreSQL', 'TypeScript'],
    detail: {
      role: 'Lead developer — owned the PHP → JS migration and the dossier engine.',
      impact:
        'Modernized a legacy PHP product to a typed React/NestJS stack, improving maintainability and onboarding for the team.',
      stack: 'React · NestJS · TypeScript · PostgreSQL · PHP migration',
    },
  },
  {
    id: 'ocr',
    num: '06',
    name: 'OCR / GPT-4 Extraction',
    year: '2021–24',
    role: 'Fullstack',
    client: 'SHOYO',
    category: 'AI · Automation',
    link: '#',
    repo: null,
    desc: 'Automated data extraction from images and PDFs (IDs, IBANs, passports) using OCR and GPT-4.',
    tags: ['Node.js', 'OpenAI', 'Tesseract', 'TypeScript'],
    detail: {
      role: 'Fullstack engineer — OCR pipeline and the GPT-4 structuring layer.',
      impact:
        'Turned scanned documents into structured data automatically, removing manual entry from the dossier workflow.',
      stack: 'Node.js · OpenAI GPT-4 · Tesseract OCR · TypeScript · PDF',
    },
  },
  {
    id: 'happy',
    num: '07',
    name: 'Happy Capital',
    year: '2021–24',
    role: 'Fullstack',
    client: 'SHOYO',
    category: 'Fintech · Realtime',
    link: '#',
    repo: null,
    desc: 'Real-estate crowdfunding platform with real-time investment tracking and interactive investor dashboards.',
    tags: ['React', 'NestJS', 'WebSocket', 'PostgreSQL'],
    detail: {
      role: 'Fullstack engineer — investment tracking and investor dashboards.',
      impact:
        'Gave investors live visibility into funding rounds with real-time tracking and rich dashboards.',
      stack: 'React · NestJS · PostgreSQL · WebSocket · TypeScript',
    },
  },
  {
    id: 'theseis',
    num: '08',
    name: 'THESEIS',
    year: '2021–24',
    role: 'Fullstack',
    client: 'SHOYO',
    category: 'Document Management',
    link: '#',
    repo: null,
    desc: 'Digital document-management solution for enterprise-level classification, storage, and retrieval.',
    tags: ['Angular', 'Node.js', 'MongoDB', 'TypeScript'],
    detail: {
      role: 'Fullstack engineer — classification model and the document store.',
      impact:
        'Centralized enterprise documents with searchable classification, replacing scattered manual filing.',
      stack: 'Angular · Node.js · MongoDB · TypeScript',
    },
  },
]
