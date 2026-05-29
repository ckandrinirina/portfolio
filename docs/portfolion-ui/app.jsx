/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, Fragment } = React;

/* =============================================================
   DATA
============================================================== */
const PROJECTS = [
  {
    id: "soka", num: "01", name: "SOKA Club", year: "2025",
    role: "Lead Fullstack", client: "YAS Madagascar",
    category: "Platform · Web3",
    link: "#", repo: null,
    desc: "Multifunctional digital platform — ticketing, online store and interactive mini-games. USDC payments and a native SOKA points wallet, glued together by realtime infrastructure.",
    tags: ["Next.js 14", "NestJS", "Prisma", "Web3Auth", "PostgreSQL", "Ably"],
    detail: {
      role: "Architecture, payments rail, points economy, realtime store and leaderboard.",
      impact: "An end-to-end engagement loop — buy, play, earn, spend. Sub-second realtime sync across leaderboards, store and games. Built for an audience that shouldn't have to think about \"blockchain\".",
      stack: "Next.js 14 · Redux Toolkit · React Admin · Tailwind · NestJS · Prisma · PostgreSQL · Web3Auth · PostHog · Google Cloud Run"
    }
  },
  {
    id: "soka-live", num: "02", name: "SOKA Live", year: "2025",
    role: "Fullstack", client: "YAS Madagascar",
    category: "Realtime · Gaming",
    link: "#", repo: null,
    desc: "Live football prediction platform. Players forecast results, climb a leaderboard, earn SOKA points spendable across the ecosystem.",
    tags: ["Realtime", "Ably", "NestJS", "Leaderboard"],
    detail: {
      role: "Realtime systems, scoring rules, wallet integration with SOKA Club.",
      impact: "Designed prediction windows and a live leaderboard that feels stadium-loud even on a 3G phone.",
      stack: "Next.js · NestJS · Ably realtime · PostgreSQL · Tailwind"
    }
  },
  {
    id: "ludoka", num: "03", name: "Ludoka", year: "2025",
    role: "Fullstack", client: "YAS Madagascar",
    category: "Game · Casual",
    link: "#", repo: null,
    desc: "Competitive Ludo game wired into the SOKA points economy. Matchmaking, verifiable RNG, payouts into the same wallet.",
    tags: ["Game loop", "Realtime", "RNG", "Web"],
    detail: {
      role: "Game state machine, matchmaking, anti-cheat, points accrual.",
      impact: "A folk board game turned into a native web experience. Animated tokens, fair RNG, payouts into the SOKA wallet.",
      stack: "Next.js · NestJS · Ably · PostgreSQL"
    }
  },
  {
    id: "eer", num: "04", name: "EER Full Digital", year: "2024",
    role: "Fullstack", client: "BMOI Madagascar",
    category: "Banking · KYC",
    link: "#", repo: null,
    desc: "Online bank account opening for BMOI. Video-call identity verification, secure document vault, banking-grade KYC compliance.",
    tags: ["Banking", "KYC", "WebRTC", "Laravel", "React 18"],
    detail: {
      role: "Full KYC flow, video identity check, secure document handling.",
      impact: "Replaced a branch visit with a 12-minute online flow. Auditable for the bank, frictionless for the customer.",
      stack: "React 18 · Laravel 10 · PrimeReact · Tailwind · PostgreSQL · Docker"
    }
  },
  {
    id: "shoyo", num: "05", name: "SHOYO", year: "2021–24",
    role: "Lead Developer", client: "SHOYO · France",
    category: "Fintech · Migration",
    link: "#", repo: null,
    desc: "Digital case-file platform for financial onboarding. Led the Symfony → Angular + Node migration end-to-end, with the team and the cutover.",
    tags: ["Angular 16", "Symfony", "Migration", "Lead", "MongoDB"],
    detail: {
      role: "Migration architect, team mentorship, system refactor.",
      impact: "Killed a creaking Symfony monolith. Typed Angular + Node stack, zero-downtime cutover, happier engineers.",
      stack: "Angular 16 · Symfony 4 · Angular Material · Node.js · MariaDB · MongoDB"
    }
  },
  {
    id: "ocr", num: "06", name: "OCR Intelligence", year: "2023",
    role: "R&D · Fullstack", client: "SHOYO · France",
    category: "AI · Pipeline",
    link: "#", repo: null,
    desc: "OCR + GPT-4 pipeline turning photos and PDFs of ID cards, RIBs and passports into typed, validated JSON.",
    tags: ["OCR", "Tesseract", "GPT-4", "pdf2image", "AI"],
    detail: {
      role: "Pipeline design, prompt engineering, model orchestration.",
      impact: "Replaced manual data-entry teams. Scans in, validated JSON out — ready for downstream systems.",
      stack: "Node.js · Tesseract · node-tesseract · OpenAI GPT-4 · pdf2image · Python"
    }
  },
  {
    id: "happy", num: "07", name: "Happy Capital", year: "2022",
    role: "Fullstack", client: "SHOYO · France",
    category: "Fintech · Crowdfunding",
    link: "#", repo: null,
    desc: "Real-estate crowdfunding platform. Investor accounts, project pages, real-time tracking of every euro committed.",
    tags: ["Fintech", "Investing", "Angular"],
    detail: {
      role: "Investor dashboards, project flow, payments integration.",
      impact: "A serious investment product that doesn't condescend. Clear numbers, real-time portfolio view.",
      stack: "Angular · Symfony · MariaDB"
    }
  },
  {
    id: "theseis", num: "08", name: "THESEIS", year: "2022",
    role: "Fullstack", client: "SHOYO · France",
    category: "Documents",
    link: "#", repo: null,
    desc: "Digital document management for administrative workflows. Scan, store, search. Killed paper for clients drowning in it.",
    tags: ["Documents", "Search", "Angular"],
    detail: {
      role: "Frontend architecture, search UX, document pipeline.",
      impact: "Retrieval time went from minutes to seconds — structured metadata + a search that actually understands the corpus.",
      stack: "Angular · Symfony · MongoDB"
    }
  }
];

const TIMELINE = [
  { year: "2025 — Present", role: "Fullstack Developer", company: "SOKA · YAS Madagascar",
    desc: "Building the SOKA ecosystem — Club, Live, Ludoka. A points economy, marketplace and competitive games glued together by a USDC wallet and realtime infrastructure.",
    stack: ["Next.js 14", "NestJS", "Prisma", "Web3Auth", "Google Cloud", "Ably"] },
  { year: "2024 — 2025", role: "Fullstack Developer", company: "BMOI Madagascar",
    desc: "Shipped EER Full Digital — online bank account opening with video-call KYC, secure document handling, and a UX that doesn't feel like a 2008 bank portal.",
    stack: ["React 18", "Laravel 10", "PostgreSQL", "Docker"] },
  { year: "2021 — 2024", role: "Lead Developer", company: "SHOYO",
    desc: "Three years owning the digital case-file platform. Led the Symfony → Angular + Node migration. Shipped THESEIS, Happy Capital, and an OCR pipeline powered by Tesseract + GPT-4.",
    stack: ["Angular 16", "Symfony", "Node.js", "MongoDB", "OpenAI"] },
  { year: "2020", role: "Fullstack Developer", company: "VTC Academy",
    desc: "Training platform for taxi drivers — courses, MCQ assessments, backoffice dashboard for tracking student progress.",
    stack: ["Angular 15", "Symfony 5", "API Platform"] },
  { year: "2020", role: "Fullstack Developer", company: "PANAFRI Help",
    desc: "Solo build of a project-financing platform end-to-end. Concept → production. Loan submissions, project funding, a UX that earns trust on a sensitive topic.",
    stack: ["React 16", "Symfony 4"] },
  { year: "2019 — 2020", role: "Lead Developer", company: "Creactisoft",
    desc: "Lead on a portfolio of ERPs — IPSUM for retail, SOLIUS for construction, MOZART for customer service.",
    stack: ["Angular 13", "React 16", "Symfony 4", "Laravel 7"] },
  { year: "2018 — 2019", role: "Fullstack Developer", company: "Ingenosya",
    desc: "First gig out of engineering school. Banking portal for BNI Madagascar, FMFP project financing, cross-platform document classifier for the Ministry of Forests.",
    stack: ["Symfony 3", "Node.js", "React 16", "Angular", "ElectronJS"] }
];

const SKILLS = [
  { cat: "Frontend",       deco: "F", lead: ["React 18", "Next.js 14", "Angular 16"], items: ["Redux Toolkit", "Vue.js", "Tailwind CSS", "SCSS", "PrimeReact", "Angular Material", "Recoil", "Formik", "Zod", "React Native"] },
  { cat: "Backend",        deco: "B", lead: ["Node.js", "NestJS", "Symfony"],         items: ["Laravel 10", "API Platform", "Prisma", "PHP 7/8", "TypeScript", "Python", "Java"] },
  { cat: "Data & Cloud",   deco: "D", lead: ["PostgreSQL", "MongoDB", "Docker"],      items: ["MariaDB", "MySQL", "Google Cloud Run", "Vercel", "Cloud SQL", "Firebase", "Git / GitLab"] },
  { cat: "AI & Craft",     deco: "A", lead: ["Claude Code", "GPT-4", "Figma"],        items: ["Tesseract OCR", "pdf2image", "Adobe XD", "Web3Auth", "Blockchain", "USDC", "Ably realtime", "PostHog"] }
];

const PROCESS = [
  {
    n: "01",
    title: "Design and code aren't separate disciplines.",
    body: "They're the same act, one inch apart. The button you draw in Figma is the button I render in React. I move freely between both — and the work is better for it."
  },
  {
    n: "02",
    title: "Pair with the machine. Stay in the driver's seat.",
    body: "I work daily with Claude Code as a co-pilot. It accelerates the obvious parts so I can spend my attention on the parts that matter — the architecture, the edge cases, the feel."
  },
  {
    n: "03",
    title: "Type the system, not just the function.",
    body: "Strong types at the seams. Schemas everywhere. Zod, Prisma, TypeScript. Future-me thanks present-me when something needs to change."
  },
  {
    n: "04",
    title: "Read the legacy code before you bury it.",
    body: "Most rewrites fail because the author didn't understand what they were replacing. I migrated a Symfony monolith to Angular + Node by reading every controller first."
  },
  {
    n: "05",
    title: "Ship small. Ship often. Sleep well.",
    body: "I'd rather merge ten well-typed pull requests than one heroic branch. Continuous delivery isn't a process — it's a stance toward risk."
  }
];

const FILES = [
  { kind: 'group', label: 'workspace' },
  { kind: 'route', id: 'home',       label: 'Home',        glyph: '◇' },
  { kind: 'route', id: 'work',       label: 'Selected work', glyph: '▸', badge: '8' },
  { kind: 'route', id: 'experience', label: 'Experience',  glyph: '≡' },
  { kind: 'route', id: 'skills',     label: 'Skills',      glyph: '⌬' },
  { kind: 'route', id: 'process',    label: 'How I work',  glyph: '✦' },
  { kind: 'group', label: 'connect' },
  { kind: 'route', id: 'contact',    label: 'Contact',     glyph: '@' }
];

const COMMANDS = [
  { cmd: 'home',       desc: 'Back to start', route: 'home',       group: 'Navigation' },
  { cmd: 'work',       desc: 'Project gallery (8 cases)', route: 'work', group: 'Navigation' },
  { cmd: 'experience', desc: 'Career timeline since 2018',  route: 'experience', group: 'Navigation' },
  { cmd: 'skills',     desc: 'Stack reference',             route: 'skills',     group: 'Navigation' },
  { cmd: 'process',    desc: 'Principles I work by',        route: 'process',    group: 'Navigation' },
  { cmd: 'contact',    desc: 'Email · WhatsApp · location', route: 'contact',    group: 'Navigation' },
  { cmd: 'email',      desc: 'Copy email to clipboard',                                                action: 'copyEmail', group: 'Quick' },
  { cmd: 'whatsapp',   desc: 'Open WhatsApp chat',                                                     action: 'whatsapp',  group: 'Quick' },
  { cmd: 'theme',      desc: 'Cycle theme (ember → ocean → forest → paper)',                           action: 'cycleTheme', group: 'Quick' }
];

/* =============================================================
   Project artwork (inline SVG, unique per project)
============================================================== */
function ProjectArt({ id }) {
  switch (id) {
    case "soka": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="g-soka" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a2920"/>
            <stop offset="1" stopColor="#0d0a08"/>
          </linearGradient>
          <radialGradient id="r-soka" cx="0.7" cy="0.3" r="0.6">
            <stop offset="0" stopColor="#E08660" stopOpacity="0.55"/>
            <stop offset="1" stopColor="#E08660" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="600" height="340" fill="url(#g-soka)"/>
        <rect width="600" height="340" fill="url(#r-soka)"/>
        {/* coin grid */}
        {Array.from({length: 6}).map((_, r) =>
          Array.from({length: 9}).map((_, c) => (
            <circle key={`${r}-${c}`} cx={50 + c*60} cy={60 + r*45} r={(c+r)%4===0?12:6}
                    fill="none" stroke="#E08660" strokeOpacity={0.4} strokeWidth="1"/>
          ))
        )}
        <circle cx="450" cy="170" r="60" fill="none" stroke="#E8C547" strokeWidth="2" strokeDasharray="4 6"/>
        <text x="450" y="178" textAnchor="middle" fill="#E8C547" fontFamily="serif" fontStyle="italic" fontSize="38">$</text>
        <text x="48" y="306" fontFamily="monospace" fontSize="11" fill="#94886F" letterSpacing="0.1em">SOKA · POINTS · USDC · GAMES</text>
      </svg>
    );
    case "soka-live": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="340" fill="#0e1a17"/>
        <rect width="600" height="340" fill="url(#r-live)"/>
        <defs>
          <radialGradient id="r-live" cx="0.3" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#E8C547" stopOpacity="0.3"/>
            <stop offset="1" stopColor="#E8C547" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* graph */}
        {[40, 90, 60, 130, 100, 170, 140, 200, 180, 230, 210, 260, 240].map((h, i) => (
          <rect key={i} x={40 + i*40} y={260 - h} width="22" height={h}
                fill={i === 12 ? "#E08660" : "#2a5042"} rx="2"/>
        ))}
        <line x1="30" y1="262" x2="560" y2="262" stroke="#3a5a4d" strokeWidth="1"/>
        <text x="40" y="40" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#88C481">⚽ live</text>
        <text x="40" y="62" fontFamily="monospace" fontSize="11" fill="#5e7d6f">match #482 · 73'</text>
        <circle cx="540" cy="42" r="5" fill="#E66B5C"><animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/></circle>
        <text x="510" y="46" fontFamily="monospace" fontSize="10" fill="#E66B5C" textAnchor="end">LIVE</text>
      </svg>
    );
    case "ludoka": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="340" fill="#1a0f1a"/>
        <defs>
          <pattern id="p-ludo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none"/>
            <rect width="20" height="20" fill="#E08660" opacity="0.08"/>
            <rect x="20" y="20" width="20" height="20" fill="#E08660" opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="600" height="340" fill="url(#p-ludo)"/>
        {/* dice */}
        <g transform="translate(190 100) rotate(-12)">
          <rect x="0" y="0" width="100" height="100" rx="14" fill="#F4ECDC" stroke="#E08660" strokeWidth="2"/>
          <circle cx="28" cy="28" r="6" fill="#1a0f1a"/>
          <circle cx="72" cy="28" r="6" fill="#1a0f1a"/>
          <circle cx="50" cy="50" r="6" fill="#E08660"/>
          <circle cx="28" cy="72" r="6" fill="#1a0f1a"/>
          <circle cx="72" cy="72" r="6" fill="#1a0f1a"/>
        </g>
        <g transform="translate(330 130) rotate(15)">
          <rect x="0" y="0" width="84" height="84" rx="12" fill="#E8C547" stroke="#E08660" strokeWidth="2"/>
          <circle cx="42" cy="42" r="6" fill="#1a0f1a"/>
          <circle cx="20" cy="20" r="5" fill="#1a0f1a"/>
          <circle cx="64" cy="64" r="5" fill="#1a0f1a"/>
        </g>
        {/* pawns */}
        <circle cx="80" cy="280" r="14" fill="#E08660"/>
        <rect x="68" y="290" width="24" height="14" fill="#E08660"/>
        <circle cx="520" cy="270" r="14" fill="#88C481"/>
        <rect x="508" y="280" width="24" height="14" fill="#88C481"/>
      </svg>
    );
    case "eer": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="340" fill="#0a1018"/>
        <defs>
          <linearGradient id="g-eer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a2a3a"/>
            <stop offset="1" stopColor="#0a1018"/>
          </linearGradient>
        </defs>
        <rect width="600" height="340" fill="url(#g-eer)"/>
        {/* ID card */}
        <g transform="translate(140 80)">
          <rect x="0" y="0" width="320" height="190" rx="14" fill="#1a2a3a" stroke="#7AB7FF" strokeWidth="1.5"/>
          <circle cx="50" cy="50" r="26" fill="none" stroke="#7AB7FF" strokeWidth="1.5"/>
          <circle cx="50" cy="44" r="9" fill="#7AB7FF" opacity="0.6"/>
          <path d="M 30 70 Q 50 56 70 70" fill="none" stroke="#7AB7FF" strokeWidth="1.5"/>
          <rect x="100" y="38" width="180" height="6" fill="#7AB7FF" opacity="0.4"/>
          <rect x="100" y="52" width="140" height="4" fill="#7AB7FF" opacity="0.25"/>
          <rect x="100" y="62" width="160" height="4" fill="#7AB7FF" opacity="0.25"/>
          <rect x="22" y="100" width="276" height="4" fill="#7AB7FF" opacity="0.2"/>
          <rect x="22" y="112" width="200" height="4" fill="#7AB7FF" opacity="0.2"/>
          <rect x="22" y="124" width="240" height="4" fill="#7AB7FF" opacity="0.2"/>
          {/* scan line */}
          <rect x="0" y="60" width="320" height="2" fill="#E8C547">
            <animate attributeName="y" values="20;170;20" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
          </rect>
          {/* checkmark badge */}
          <circle cx="296" cy="170" r="14" fill="#88C481"/>
          <path d="M 290 170 l 4 4 l 8 -8" fill="none" stroke="#0a1018" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <text x="48" y="306" fontFamily="monospace" fontSize="11" fill="#5e7d99" letterSpacing="0.1em">KYC · BMOI · VIDEO IDENT.</text>
      </svg>
    );
    case "shoyo": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="340" fill="#1a1410"/>
        <defs>
          <linearGradient id="g-shoyo" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3a2820" stopOpacity="0.6"/>
            <stop offset="1" stopColor="#1a1410" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="600" height="340" fill="url(#g-shoyo)"/>
        {/* migration arrow + docs */}
        <g transform="translate(60 80)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${i*14})`}>
              <rect x="0" y="0" width="120" height="160" rx="6" fill="#2a201a" stroke="#5E5645" strokeWidth="1"/>
              <rect x="14" y="20" width="92" height="4" fill="#94886F" opacity="0.5"/>
              <rect x="14" y="32" width="70" height="4" fill="#94886F" opacity="0.4"/>
              <rect x="14" y="44" width="80" height="4" fill="#94886F" opacity="0.4"/>
              <rect x="14" y="60" width="92" height="4" fill="#94886F" opacity="0.3"/>
              <rect x="14" y="72" width="60" height="4" fill="#94886F" opacity="0.3"/>
            </g>
          ))}
        </g>
        <g transform="translate(260 158)">
          <path d="M 0 0 L 60 0 L 60 -16 L 90 12 L 60 40 L 60 24 L 0 24 Z" fill="#E08660"/>
        </g>
        <g transform="translate(380 80)">
          <rect x="0" y="0" width="160" height="180" rx="10" fill="#221a14" stroke="#E08660" strokeWidth="1.5"/>
          <rect x="14" y="14" width="132" height="20" fill="#E08660" opacity="0.2" rx="3"/>
          <text x="22" y="29" fontFamily="monospace" fontSize="11" fill="#E08660">app.module.ts</text>
          <rect x="14" y="46" width="100" height="5" fill="#88C481" opacity="0.5"/>
          <rect x="14" y="60" width="120" height="5" fill="#7AB7FF" opacity="0.5"/>
          <rect x="14" y="74" width="80" height="5" fill="#94886F" opacity="0.5"/>
          <rect x="14" y="88" width="110" height="5" fill="#88C481" opacity="0.5"/>
          <rect x="14" y="102" width="60" height="5" fill="#94886F" opacity="0.5"/>
          <rect x="14" y="118" width="132" height="5" fill="#E8C547" opacity="0.4"/>
          <rect x="14" y="132" width="90" height="5" fill="#94886F" opacity="0.4"/>
          <rect x="14" y="146" width="120" height="5" fill="#94886F" opacity="0.4"/>
        </g>
        <text x="48" y="316" fontFamily="serif" fontStyle="italic" fontSize="14" fill="#94886F">Symfony → Angular + Node</text>
      </svg>
    );
    case "ocr": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="340" fill="#100c08"/>
        <defs>
          <linearGradient id="g-ocr-doc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1f14"/>
            <stop offset="1" stopColor="#1a130a"/>
          </linearGradient>
        </defs>
        {/* scan target */}
        <g transform="translate(60 60)">
          <rect x="0" y="0" width="220" height="220" rx="6" fill="url(#g-ocr-doc)" stroke="#E08660" strokeWidth="1.5"/>
          {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
            <rect key={i} x={20} y={30 + i*13} width={Math.random()*120 + 60} height="6" fill="#94886F" opacity={0.25 + Math.random()*0.3} rx="1"/>
          ))}
          {/* scan beam */}
          <rect x="0" y="60" width="220" height="3" fill="#E8C547" opacity="0.9">
            <animate attributeName="y" values="10;210;10" dur="2.5s" repeatCount="indefinite"/>
          </rect>
          {/* corners */}
          <path d="M 0 0 L 16 0 M 0 0 L 0 16" stroke="#E8C547" strokeWidth="2"/>
          <path d="M 220 0 L 204 0 M 220 0 L 220 16" stroke="#E8C547" strokeWidth="2"/>
          <path d="M 0 220 L 16 220 M 0 220 L 0 204" stroke="#E8C547" strokeWidth="2"/>
          <path d="M 220 220 L 204 220 M 220 220 L 220 204" stroke="#E8C547" strokeWidth="2"/>
        </g>
        {/* arrow */}
        <path d="M 300 170 L 340 170 L 340 160 L 360 170 L 340 180 L 340 170" fill="#E08660"/>
        {/* JSON output */}
        <g transform="translate(380 70)" fontFamily="monospace" fontSize="11">
          <rect x="-10" y="-10" width="180" height="210" rx="6" fill="#1a130a" stroke="#88C481" strokeWidth="1"/>
          <text y="10" fill="#88C481">{"{"}</text>
          <text x="12" y="28" fill="#7AB7FF">{`"type":`}<tspan fill="#E8C547">{` "id_card"`}</tspan>,</text>
          <text x="12" y="46" fill="#7AB7FF">{`"name":`}<tspan fill="#E8C547">{` "Erick"`}</tspan>,</text>
          <text x="12" y="64" fill="#7AB7FF">{`"surname":`}<tspan fill="#E8C547">{` "A."`}</tspan>,</text>
          <text x="12" y="82" fill="#7AB7FF">{`"id":`}<tspan fill="#E8C547">{` "MG-7782"`}</tspan>,</text>
          <text x="12" y="100" fill="#7AB7FF">{`"valid":`}<tspan fill="#E08660">{` true`}</tspan>,</text>
          <text x="12" y="118" fill="#7AB7FF">{`"score":`}<tspan fill="#E08660">{` 0.97`}</tspan></text>
          <text y="138" fill="#88C481">{"}"}</text>
        </g>
      </svg>
    );
    case "happy": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="340" fill="#0e1620"/>
        <defs>
          <linearGradient id="g-happy" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#0e1620"/>
            <stop offset="1" stopColor="#1a2a3a"/>
          </linearGradient>
        </defs>
        <rect width="600" height="340" fill="url(#g-happy)"/>
        {/* city skyline */}
        {[
          {x:40,h:140,w:50},{x:96,h:200,w:60},{x:162,h:160,w:48},{x:216,h:220,w:70},
          {x:292,h:120,w:55},{x:352,h:180,w:50},{x:408,h:240,w:64},{x:478,h:150,w:48},
          {x:532,h:200,w:40}
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={300-b.h} width={b.w} height={b.h} fill="#1a2a3a" stroke="#7AB7FF" strokeOpacity="0.4" strokeWidth="1"/>
            {Array.from({length: Math.floor(b.h/22)}).map((_, j) =>
              Array.from({length: Math.floor(b.w/16)}).map((_, k) => (
                <rect key={`${j}-${k}`} x={b.x + 4 + k*16} y={300-b.h+8+j*22} width="8" height="10"
                      fill={(i+j+k)%3===0?"#E8C547":"#7AB7FF"} opacity={(i+j+k)%5===0?0.9:0.25}/>
              ))
            )}
          </g>
        ))}
        {/* growth arrow */}
        <path d="M 60 280 L 130 240 L 200 250 L 280 200 L 360 180 L 440 130 L 540 90" fill="none" stroke="#88C481" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="540" cy="90" r="6" fill="#88C481"/>
        <text x="48" y="324" fontFamily="serif" fontStyle="italic" fontSize="14" fill="#94886F">€ crowd-funded real estate</text>
      </svg>
    );
    case "theseis": return (
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="340" fill="#15110b"/>
        {/* file cabinet */}
        {[0,1,2,3].map(i => (
          <g key={i} transform={`translate(120 ${50 + i*65})`}>
            <rect x="0" y="0" width="360" height="50" rx="4" fill="#221a12" stroke={i===1?"#E08660":"#5E5645"} strokeWidth={i===1?2:1}/>
            <rect x="14" y="20" width="40" height="10" fill="#94886F" opacity="0.5" rx="2"/>
            <rect x="72" y="20" width="160" height="10" fill="#94886F" opacity="0.3" rx="2"/>
            <text x="320" y="30" textAnchor="end" fontFamily="monospace" fontSize="11" fill="#94886F">{(2024 - i*2)}</text>
            <circle cx="338" cy="25" r="5" fill={i===1?"#E08660":"#3a3025"}/>
            {i === 1 && (
              <g>
                <rect x="-4" y="-4" width="368" height="58" rx="6" fill="none" stroke="#E08660" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
                <text x="-20" y="30" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#E8C547">→</text>
              </g>
            )}
          </g>
        ))}
        <text x="120" y="330" fontFamily="monospace" fontSize="11" fill="#5E5645" letterSpacing="0.1em">SEARCH("contrat 2022") → 1 match</text>
      </svg>
    );
    default: return (
      <svg viewBox="0 0 600 340"><rect width="600" height="340" fill="#221a14"/></svg>
    );
  }
}

/* =============================================================
   Sidebar
============================================================== */
function Sidebar({ active, onSelect, onCmd }) {
  const sections = [];
  let cur = null;
  FILES.forEach((f) => {
    if (f.kind === 'group') { cur = { label: f.label, rows: [] }; sections.push(cur); }
    else if (cur) cur.rows.push(f);
  });

  return (
    <aside className="sidebar">
      <button className="sb-brand" onClick={() => onSelect('home')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}>
        <div className="sb-mark">E</div>
        <div>
          <div className="sb-name">Erick Andrinirina</div>
          <div className="sb-role">fullstack · interface · craft</div>
        </div>
      </button>

      {sections.map((sec) => (
        <div key={sec.label} className="sb-section">
          <div className="sb-head">{sec.label}</div>
          {sec.rows.map((f) => (
            <button key={f.id}
                    className={"sb-row" + (active === f.id ? " active" : "")}
                    onClick={() => onSelect(f.id)}>
              <span className="glyph">{f.glyph}</span>
              <span className="label">{f.label}</span>
              {f.badge && <span className="badge">{f.badge}</span>}
            </button>
          ))}
        </div>
      ))}

      <div className="sb-status">
        <div className="row">
          <span>status</span>
          <span className="live"><span className="dot"></span> available</span>
        </div>
        <div className="row">
          <span>region</span>
          <span>tnr · utc+3</span>
        </div>
        <div className="row">
          <span>paired with</span>
          <span style={{ color: 'var(--accent)' }}>claude-code</span>
        </div>
      </div>
    </aside>
  );
}

/* =============================================================
   Topbar
============================================================== */
function Topbar({ active, onCmd }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      try {
        setTime(new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit', minute: '2-digit',
          timeZone: 'Indian/Antananarivo', hour12: false
        }).format(new Date()) + ' TNR');
      } catch { setTime(''); }
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  const label = (FILES.find((f) => f.id === active) || {}).label || 'Home';

  return (
    <div className="topbar">
      <div className="tb-path">
        <span>~/portfolio</span>
        <span className="sep">/</span>
        <span className="cur">{label.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>
      <button className="tb-search" onClick={onCmd}>
        <span>Quick nav</span>
        <kbd>⌘K</kbd>
      </button>
      <span className="tb-clock">{time}</span>
    </div>
  );
}

/* =============================================================
   HOME view
============================================================== */
function HomeView({ onNav }) {
  const roles = ["interface designer", "systems thinker", "OCR & AI tinkerer", "realtime engineer", "ludo champion"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="view-enter">
      <div className="home-hero">
        <div className="home-hero-text">
          <div className="home-greet reveal r-fade">
            <span className="pulse"></span>
            <span>Hello — currently available for new work · Q3 2026</span>
          </div>

          <h1 className="home-name">
            <Reveal text="Erick" italic /> <Reveal text="Andrinirina" delay={0.35} />
            <span className="char accent" style={{ animationDelay: '1.1s' }}>.</span>
          </h1>

          <p className="home-tagline reveal r-fade" style={{ transitionDelay: '0.2s' }}>
            Fullstack engineer based in <strong>Antananarivo, Madagascar</strong>. Seven years writing software that needs to feel as good as it works — from a Malagasy bank's online onboarding to a <em>USDC-powered points economy</em> at YAS. I write the backend, design the frontend, and care about the inch between them.
          </p>

          <div className="home-roles reveal r-fade" style={{ transitionDelay: '0.35s' }}>
            <span>also a —</span>
            <span className="home-rotor" aria-live="polite">
              <span className="home-rotor-track" style={{ transform: `translateY(-${idx * 1.3}em)` }}>
                {roles.map((r) => <span key={r} className="home-rotor-item">{r}</span>)}
              </span>
            </span>
          </div>

          <div className="home-actions reveal r-fade" style={{ transitionDelay: '0.5s' }}>
            <button className="btn btn-primary" onClick={() => onNav('work')}>
              <span>See selected work</span>
              <span className="arrow">→</span>
            </button>
            <button className="btn" onClick={() => onNav('contact')}>
              <span>Get in touch</span>
              <span className="arrow">↗</span>
            </button>
          </div>
        </div>

        <div className="avatar-col reveal r-right" style={{ transitionDelay: '0.15s' }}>
          <div className="avatar-frame">
            <image-slot
              id="profile-photo"
              shape="rounded"
              radius="18"
              fit="cover"
              placeholder="Drop your photo · jpg or png"
            ></image-slot>
          </div>
          <span className="avatar-tag"><span className="dot"></span>online · tnr</span>
        </div>
      </div>

      <div className="home-grid">
        <div className="now-card reveal" style={{ transitionDelay: '0.05s' }}>
          <div className="head"><span className="ico"></span><span>Now building</span></div>
          <div className="body">
            <strong style={{ color: 'var(--fg)' }}>SOKA · Ludoka</strong> — a points economy where you can <em>buy, play, earn, spend</em> in one wallet. USDC + an internal point system, realtime everywhere.
          </div>
          <div className="meta">
            <span>YAS Madagascar</span>
            <span>2025 — present</span>
          </div>
        </div>
        <div className="stats-grid reveal" style={{ transitionDelay: '0.15s' }}>
          <div className="stat-tile">
            <div className="n"><CountUp to={7} /></div>
            <div className="l">years shipping</div>
          </div>
          <div className="stat-tile">
            <div className="n"><CountUp to={8} suffix="+" /></div>
            <div className="l">flagship projects</div>
          </div>
          <div className="stat-tile">
            <div className="n"><CountUp to={12} /></div>
            <div className="l">frameworks shipped</div>
          </div>
          <div className="stat-tile">
            <div className="n">3</div>
            <div className="l">languages spoken</div>
          </div>
        </div>
      </div>

      <div className="marquee reveal r-fade" aria-hidden="true">
        <div className="marquee-track">
          <span>
            React<span className="dot"></span>
            Next.js<span className="dot"></span>
            NestJS<span className="dot"></span>
            TypeScript<span className="dot"></span>
            Angular<span className="dot"></span>
            Symfony<span className="dot"></span>
            PostgreSQL<span className="dot"></span>
            MongoDB<span className="dot"></span>
            Blockchain<span className="dot"></span>
            OpenAI<span className="dot"></span>
            Realtime<span className="dot"></span>
            Docker<span className="dot"></span>
            Figma<span className="dot"></span>
            Claude Code<span className="dot"></span>
          </span>
          <span>
            React<span className="dot"></span>
            Next.js<span className="dot"></span>
            NestJS<span className="dot"></span>
            TypeScript<span className="dot"></span>
            Angular<span className="dot"></span>
            Symfony<span className="dot"></span>
            PostgreSQL<span className="dot"></span>
            MongoDB<span className="dot"></span>
            Blockchain<span className="dot"></span>
            OpenAI<span className="dot"></span>
            Realtime<span className="dot"></span>
            Docker<span className="dot"></span>
            Figma<span className="dot"></span>
            Claude Code<span className="dot"></span>
          </span>
        </div>
      </div>
    </div>
  );
}

function CountUp({ to, suffix = "", duration = 1100 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const step = () => {
      const t = performance.now() - t0;
      const p = Math.min(1, t / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n}{suffix}</span>;
}

/* Letter-by-letter reveal */
function Reveal({ text, delay = 0, italic = false, perChar = 0.04 }) {
  const chars = text.split('');
  return (
    <span className={italic ? 'italic' : ''}>
      {chars.map((c, i) => (
        <span key={i} className="char" style={{ animationDelay: (delay + i * perChar) + 's' }}>
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </span>
  );
}

/* Custom cursor — dot + ring with hover states */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState('default');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(hover: none), (max-width: 880px)').matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', move);

    const onOver = (e) => {
      const t = e.target;
      const labeled = t.closest('[data-cursor]');
      if (labeled) {
        const l = labeled.getAttribute('data-cursor-label');
        if (l) { setLabel(l); setState('label'); return; }
        setState('hover');
        return;
      }
      if (t.closest('a, button, [role="button"], .proj-card, .sb-row, .tb-search')) {
        setState('hover');
      } else if (t.closest('input, textarea, [contenteditable]')) {
        setState('text');
      } else {
        setState('default');
      }
    };
    document.addEventListener('mouseover', onOver);

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <span style={{display:"contents"}}>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-state={state}>
        {state === 'label' ? label : null}
      </div>
    </span>
  );
}

/* =============================================================
   WORK view
============================================================== */
function WorkView({ onOpenProject }) {
  return (
    <div className="view-enter">
      <div className="eyebrow">01 · Selected work</div>
      <h2 className="section-title">Things I shipped — <span className="mark">not pixels</span> on a moodboard.</h2>
      <p className="section-sub">
        Eight projects from the last five years across <strong>fintech, gaming, civic tech</strong> and <strong>AI pipelines</strong>. Some I owned end-to-end, some I led teams through. Click any card to open the case.
      </p>

      <div className="work-grid">
        {PROJECTS.map((p, i) => (
          <article key={p.id}
                   className={"proj-card stg-" + (Math.min(i + 1, 8))}
                   onClick={() => onOpenProject(p)}>
            <div className="art">
              <div className="art-tag">{p.category}</div>
              <div className="art-year">{p.year}</div>
              <ProjectArt id={p.id} />
            </div>
            <div className="body">
              <div className="num">{p.num} · {p.client}</div>
              <div className="name">{p.name}</div>
              <div className="meta"><span className="role">{p.role}</span></div>
              <div className="desc">{p.desc}</div>
              <div className="tags">
                {p.tags.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
                {p.tags.length > 4 && <span className="tag">+{p.tags.length - 4}</span>}
              </div>
              <div className="actions">
                <button onClick={(e) => { e.stopPropagation(); onOpenProject(p); }}>
                  Read case <span>→</span>
                </button>
                {p.link && (
                  <span style={{display:"contents"}}>
                    <span className="sep">·</span>
                    <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      Visit live <span>↗</span>
                    </a>
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);
  if (!project) return null;
  return (
    <div className={"modal-bg open"} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <div className="art"><ProjectArt id={project.id} /></div>
        <div className="modal-body">
          <div className="num">{project.num} · {project.category}</div>
          <div className="name">{project.name}</div>
          <div className="meta">{project.role} · {project.client} · {project.year}</div>
          <div className="desc">{project.desc}</div>
          <div className="row">
            <div className="col">
              <h4>My role</h4>
              <p>{project.detail.role}</p>
            </div>
            <div className="col">
              <h4>Impact</h4>
              <p>{project.detail.impact}</p>
            </div>
          </div>
          <h4 style={{
            fontSize: '10.5px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--accent)', fontWeight: 500, marginBottom: '8px'
          }}>Stack</h4>
          <div className="stack">
            {project.detail.stack.split(/ · | /).map((s, i) => (
              s.trim() && <span key={i}>{s}</span>
            ))}
          </div>
          <div className="actions">
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                Visit live <span className="arrow">↗</span>
              </a>
            )}
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   EXPERIENCE view
============================================================== */
function ExperienceView() {
  return (
    <div className="view-enter">
      <div className="eyebrow">02 · Experience</div>
      <h2 className="section-title">Seven years, <span className="mark">seven companies</span>, one craft.</h2>
      <p className="section-sub">
        From a first job at Ingenosya in 2018 to leading the SOKA ecosystem today. The lineage of every framework I lean on, and every hard lesson I keep.
      </p>

      <div className="timeline">
        {TIMELINE.map((t, i) => (
          <div key={i} className={"tl-item stg-" + Math.min(i + 1, 8)}>
            <div className="tl-year">{t.year}</div>
            <div className="tl-role">{t.role}</div>
            <div className="tl-co"><span className="at">at</span> {t.company}</div>
            <div className="tl-desc">{t.desc}</div>
            <div className="tl-stack">
              {t.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================
   SKILLS view
============================================================== */
function SkillsView() {
  return (
    <div className="view-enter">
      <div className="eyebrow">03 · Toolbox</div>
      <h2 className="section-title">A stack chosen for <span className="mark">longevity</span>, not hype.</h2>
      <p className="section-sub">
        The frameworks I reach for first, grouped by where they sit in the stack. <strong>Everything here is something I've shipped to production.</strong> Highlights in the rounded pills are the daily drivers.
      </p>

      <div className="skill-cards">
        {SKILLS.map((s, i) => (
          <div key={s.cat} className={"skill-card stg-" + (i + 1)} data-deco={s.deco}>
            <div className="head">
              <span className="name">{s.cat}</span>
              <span className="count">{s.lead.length + s.items.length} tools</span>
            </div>
            <div className="lead-list">
              {s.lead.map((it) => <span key={it}>{it}</span>)}
            </div>
            <div className="other-list">
              {s.items.map((it) => <span key={it}>{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================
   PROCESS view (new!)
============================================================== */
function ProcessView() {
  return (
    <div className="view-enter">
      <div className="eyebrow">04 · How I work</div>
      <h2 className="section-title">Five rules I've earned, <span className="mark">one project at a time.</span></h2>
      <p className="section-sub">
        I'm not just a developer. I think about <strong>systems</strong>, about <strong>interfaces</strong>, about the team next to me and the customer at the other end. These principles are the shorthand for how I work — and how I'd like to work with you.
      </p>

      <div className="process-list">
        {PROCESS.map((p, i) => (
          <div key={p.n} className={"process-item stg-" + (i + 1)}>
            <div className="process-num">{p.n}</div>
            <div className="process-content">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================
   CONTACT view
============================================================== */
function ContactView() {
  const [copied, setCopied] = useState(null);
  const copy = (key, val) => {
    navigator.clipboard?.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 1400);
  };
  return (
    <div className="view-enter">
      <div className="eyebrow">05 · Let's talk</div>
      <h2 className="section-title">Have a thing to build? <span className="mark">I'm listening.</span></h2>
      <p className="section-sub">
        Available for <strong>contract or full-time, remote</strong>, from Q3 2026. I reply within 24 hours, usually sooner.
      </p>

      <div className="contact-grid">
        <div className="contact-card reveal">
          <div className="row">
            <div className="key">Email</div>
            <div className="val">
              <a href="mailto:ckandrinirina@gmail.com">ckandrinirina@gmail.com</a>
              <button className={"copy-btn" + (copied === 'email' ? ' copied' : '')}
                      onClick={() => copy('email', 'ckandrinirina@gmail.com')}>
                {copied === 'email' ? '✓ copied' : 'copy'}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="key">WhatsApp</div>
            <div className="val">
              <a href="https://wa.me/261385096664" target="_blank" rel="noreferrer">+261 38 50 966 64</a>
              <button className={"copy-btn" + (copied === 'phone' ? ' copied' : '')}
                      onClick={() => copy('phone', '+261385096664')}>
                {copied === 'phone' ? '✓ copied' : 'copy'}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="key">Based in</div>
            <div className="val">Antananarivo, Madagascar <span style={{ color: 'var(--muted)' }}>· UTC+3</span></div>
          </div>
          <div className="row">
            <div className="key">Languages</div>
            <div className="val">Malagasy · Français · English</div>
          </div>
          <div className="row">
            <div className="key">Available</div>
            <div className="val"><span style={{ color: 'var(--success)' }}>● open</span> · remote, contract or full-time</div>
          </div>
        </div>

        <div className="contact-pitch reveal" style={{ transitionDelay: '0.12s' }}>
          <h3>What I'm looking for next.</h3>
          <p>
            A team that ships, a product I care about, and a problem with enough substance to keep me curious. I'm open to <strong>fintech, gaming, AI</strong> — anywhere I can write code that earns its place.
          </p>
          <p style={{ marginTop: 12 }}>
            If that sounds like you, drop me a line. Tell me what you're building, and how I might fit.
          </p>
          <div className="sig">— Erick</div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   Command palette
============================================================== */
function CommandPalette({ open, onClose, onRoute, doAction }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const navCommands = COMMANDS.map((c) => ({
      ...c,
      label: c.cmd.charAt(0).toUpperCase() + c.cmd.slice(1),
      run: () => c.route ? onRoute(c.route) : doAction(c.action)
    }));
    const projectItems = PROJECTS.map((p) => ({
      cmd: p.id, label: p.name, desc: p.category + ' · ' + p.year,
      group: 'Projects',
      run: () => { onRoute('work'); /* could trigger modal */ }
    }));
    return [...navCommands, ...projectItems];
  }, [onRoute, doAction]);

  const filtered = q
    ? items.filter((i) => (i.cmd + ' ' + (i.label || '') + ' ' + (i.desc || '')).toLowerCase().includes(q.toLowerCase()))
    : items;

  const grouped = filtered.reduce((acc, it) => {
    (acc[it.group || 'Other'] = acc[it.group || 'Other'] || []).push(it);
    return acc;
  }, {});

  useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(filtered.length - 1, a + 1)); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
      else if (e.key === 'Enter')     { e.preventDefault(); filtered[active]?.run(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose]);

  let i = -1;
  return (
    <div className={"cmdk-bg" + (open ? " open" : "")} onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input ref={inputRef} className="cmdk-input"
               placeholder="Search projects, sections, or actions…"
               value={q}
               onChange={(e) => { setQ(e.target.value); setActive(0); }} />
        <div className="cmdk-list">
          {Object.entries(grouped).map(([group, list]) => (
            <div key={group}>
              <div className="cmdk-grp">{group}</div>
              {list.map((it) => {
                i += 1;
                const idx = i;
                return (
                  <button key={(it.cmd || '') + idx}
                          className={"cmdk-item" + (idx === active ? " active" : "")}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => { it.run(); onClose(); }}>
                    <span className="ico">{it.group === 'Projects' ? '◆' : it.group === 'Quick' ? '⚡' : '→'}</span>
                    <span>{it.label}</span>
                    <span className="meta">{it.desc}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px 20px', color: 'var(--muted)', fontSize: 12.5 }}>
              No matches for "{q}".
            </div>
          )}
        </div>
        <div className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select · <kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   App
============================================================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "accent": "#E08660"
}/*EDITMODE-END*/;

const ROUTE_ORDER = ['home', 'work', 'experience', 'skills', 'process', 'contact'];
const ROUTE_NEXT_LABEL = {
  home: 'Selected work',
  work: 'Experience',
  experience: 'Skills',
  skills: 'How I work',
  process: 'Contact',
  contact: null
};

function App() {
  const [route, setRoute] = useState('home');
  const [direction, setDirection] = useState('down');
  const [openProject, setOpenProject] = useState(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [navPulse, setNavPulse] = useState(0);

  const viewRef = useRef(null);
  const lockRef = useRef(false);
  const accRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const restAtBoundaryRef = useRef(false);
  const touchStartRef = useRef(null);

  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  useEffect(() => {
    if (tweaks.theme && tweaks.theme !== 'default') {
      document.documentElement.setAttribute('data-theme', tweaks.theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [tweaks.theme]);
  useEffect(() => {
    if (tweaks.accent) document.documentElement.style.setProperty('--accent', tweaks.accent);
  }, [tweaks.accent]);

  // ⌘K
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen((o) => !o); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // hash routing
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h && ROUTE_ORDER.includes(h)) setRoute(h);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const navTo = (id, dir = 'down') => {
    if (id === route) return;
    setDirection(dir);
    setRoute(id);
    history.replaceState(null, '', '#' + id);
    setCmdOpen(false);
    setNavPulse((n) => n + 1);
    lockRef.current = true;
    setTimeout(() => { lockRef.current = false; }, 850);
    // reset scroll
    if (viewRef.current) viewRef.current.scrollTop = 0;
  };

  const nav = (id) => {
    const curIdx = ROUTE_ORDER.indexOf(route);
    const nextIdx = ROUTE_ORDER.indexOf(id);
    const dir = nextIdx > curIdx ? 'down' : 'up';
    navTo(id, dir);
  };

  // Scroll-to-navigate — require user to RELEASE wheel between gestures.
  // Only a wheel gesture that STARTED at the boundary can advance the route;
  // a gesture that just scrolled INTO the boundary won't.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    let inGesture = false;
    let startedAtBoundary = null; // 'top' | 'bot' | null
    let gestureTimer = null;

    const endGesture = () => {
      inGesture = false;
      startedAtBoundary = null;
      accRef.current = 0;
    };

    const onWheel = (e) => {
      if (lockRef.current || cmdOpen || openProject) return;
      const atTop = view.scrollTop <= 1;
      const atBot = view.scrollTop + view.clientHeight >= view.scrollHeight - 2;
      const boundary = atTop ? 'top' : atBot ? 'bot' : null;

      clearTimeout(gestureTimer);
      gestureTimer = setTimeout(endGesture, 180);

      if (!inGesture) {
        inGesture = true;
        startedAtBoundary = boundary;
      }

      if (!boundary || !startedAtBoundary) {
        accRef.current = 0;
        return;
      }

      const goingDown = e.deltaY > 0;
      const goingUp   = e.deltaY < 0;
      if (!((goingDown && boundary === 'bot') || (goingUp && boundary === 'top'))) {
        accRef.current = 0;
        return;
      }

      accRef.current += e.deltaY;
      if (Math.abs(accRef.current) > 90) {
        const dir = accRef.current > 0 ? 1 : -1;
        const curIdx = ROUTE_ORDER.indexOf(route);
        const nextIdx = curIdx + dir;
        accRef.current = 0;
        inGesture = false;
        startedAtBoundary = null;
        if (nextIdx >= 0 && nextIdx < ROUTE_ORDER.length) {
          navTo(ROUTE_ORDER[nextIdx], dir > 0 ? 'down' : 'up');
        }
      }
    };

    const onTouchStart = (e) => {
      const t = e.touches[0];
      touchStartRef.current = { y: t.clientY, scrollTop: view.scrollTop, t: Date.now() };
    };
    const onTouchEnd = (e) => {
      if (lockRef.current || cmdOpen || openProject) return;
      const s = touchStartRef.current;
      if (!s) return;
      const t = (e.changedTouches[0] || e.touches[0]);
      if (!t) return;
      const dy = s.y - t.clientY;
      const dt = Date.now() - s.t;
      const atTop = view.scrollTop <= 2;
      const atBot = view.scrollTop + view.clientHeight >= view.scrollHeight - 2;
      const scrolled = Math.abs(view.scrollTop - s.scrollTop) > 8;
      if (Math.abs(dy) > 70 && dt < 700 && !scrolled) {
        const curIdx = ROUTE_ORDER.indexOf(route);
        if (dy > 0 && atBot && curIdx < ROUTE_ORDER.length - 1) {
          navTo(ROUTE_ORDER[curIdx + 1], 'down');
        } else if (dy < 0 && atTop && curIdx > 0) {
          navTo(ROUTE_ORDER[curIdx - 1], 'up');
        }
      }
      touchStartRef.current = null;
    };

    view.addEventListener('wheel', onWheel, { passive: true });
    view.addEventListener('touchstart', onTouchStart, { passive: true });
    view.addEventListener('touchend', onTouchEnd, { passive: true });

    const checkHint = () => {
      const atBot = view.scrollTop + view.clientHeight >= view.scrollHeight - 80;
      const hasNext = ROUTE_ORDER.indexOf(route) < ROUTE_ORDER.length - 1;
      setShowHint(atBot && hasNext);
    };
    view.addEventListener('scroll', checkHint, { passive: true });
    setTimeout(checkHint, 100);

    return () => {
      clearTimeout(gestureTimer);
      view.removeEventListener('wheel', onWheel);
      view.removeEventListener('touchstart', onTouchStart);
      view.removeEventListener('touchend', onTouchEnd);
      view.removeEventListener('scroll', checkHint);
    };
  }, [route, cmdOpen, openProject]);

  // Scroll-reveal: add .in class to elements as they enter view
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const selectors = '.reveal, .proj-card, .skill-card, .tl-item, .process-item, .now-card, .stats-grid';
    let io;
    const setup = () => {
      const els = view.querySelectorAll(selectors);
      els.forEach((el) => el.classList.remove('in'));
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // small per-element index stagger if there are siblings of same class
            const idx = Array.from(e.target.parentNode.children).indexOf(e.target);
            e.target.style.transitionDelay = (Math.min(idx, 8) * 90) + 'ms';
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { root: view, threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
      els.forEach((el) => io.observe(el));
    };
    // wait for view to render
    const t = setTimeout(setup, 30);
    return () => { clearTimeout(t); if (io) io.disconnect(); };
  }, [route]);

  // Keyboard arrows for nav
  useEffect(() => {
    const onKey = (e) => {
      if (cmdOpen || openProject) return;
      if (e.target.matches('input, textarea')) return;
      const curIdx = ROUTE_ORDER.indexOf(route);
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (curIdx < ROUTE_ORDER.length - 1) {
          const v = viewRef.current;
          if (v && v.scrollTop + v.clientHeight < v.scrollHeight - 4) return; // let native scroll happen
          e.preventDefault();
          navTo(ROUTE_ORDER[curIdx + 1], 'down');
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (curIdx > 0) {
          const v = viewRef.current;
          if (v && v.scrollTop > 4) return;
          e.preventDefault();
          navTo(ROUTE_ORDER[curIdx - 1], 'up');
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [route, cmdOpen, openProject]);

  const doAction = (action) => {
    if (action === 'copyEmail') navigator.clipboard?.writeText('ckandrinirina@gmail.com');
    else if (action === 'whatsapp') window.open('https://wa.me/261385096664');
    else if (action === 'cycleTheme') {
      const order = ['default', 'ocean', 'forest', 'paper'];
      const idx = order.indexOf(tweaks.theme);
      setTweak('theme', order[(idx + 1) % order.length]);
    }
  };

  const nextRoute = ROUTE_ORDER[ROUTE_ORDER.indexOf(route) + 1];
  const nextLabel = ROUTE_NEXT_LABEL[route];

  return (
    <div className="app">
      <Cursor />
      <Sidebar active={route} onSelect={nav} onCmd={() => setCmdOpen(true)} />
      <main className="main">
        <Topbar active={route} onCmd={() => setCmdOpen(true)} />
        {navPulse > 0 && <div key={navPulse} className="nav-lock" />}
        <div className="view" ref={viewRef} key={route}>
          <div className={"view-inner " + (direction === 'up' ? 'view-enter-up' : 'view-enter-down')}>
            {route === 'home'       && <HomeView onNav={nav} />}
            {route === 'work'       && <WorkView onOpenProject={setOpenProject} />}
            {route === 'experience' && <ExperienceView />}
            {route === 'skills'     && <SkillsView />}
            {route === 'process'    && <ProcessView />}
            {route === 'contact'    && <ContactView />}

            {nextRoute && (
              <div className={"scroll-hint" + (showHint ? " visible" : "")}>
                <button className="label" onClick={() => navTo(nextRoute, 'down')}>
                  Scroll for {nextLabel}
                  <span className="arrow">↓</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onRoute={nav} doAction={doAction} />

      {window.TweaksPanel && (
        <window.TweaksPanel>
          <window.TweakSection label="Theme">
            <window.TweakRadio
              label="Palette"
              value={tweaks.theme}
              onChange={(v) => setTweak('theme', v)}
              options={[
                { value: 'default', label: 'Ember' },
                { value: 'ocean',   label: 'Ocean' },
                { value: 'forest',  label: 'Forest' },
                { value: 'paper',   label: 'Paper' }
              ]}
            />
            <window.TweakColor
              label="Accent"
              value={tweaks.accent}
              onChange={(v) => setTweak('accent', v)}
              options={['#E08660', '#7AB7FF', '#94D49A', '#E8C547', '#E07AB7']}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
