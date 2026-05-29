/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo, Fragment } = React;

/* =============================================================
   DATA
============================================================== */

const PROJECTS = [
  {
    id: "soka", num: "01", name: "SOKA Club", year: "2025", role: "Lead Fullstack", client: "YAS Madagascar",
    desc: "Multifunctional digital platform — ticketing, online store and interactive mini-games. USDC payments and a native SOKA points wallet.",
    tags: ["Next.js 14", "NestJS", "Prisma", "Web3Auth", "PostgreSQL", "Ably"],
    detail: {
      role: "Architecture, payments rail, points economy, realtime store/leaderboard.",
      impact: "End-to-end engagement loop — buy, play, earn, spend. Sub-second realtime across leaderboards, store and games.",
      stack: "Next.js 14 · Redux Toolkit · React Admin · Tailwind · NestJS · Prisma · PostgreSQL · Web3Auth · PostHog · Google Cloud Run"
    }
  },
  {
    id: "soka-live", num: "02", name: "SOKA Live", year: "2025", role: "Fullstack", client: "YAS Madagascar",
    desc: "Live football prediction platform. Players forecast results, climb a leaderboard, earn SOKA points spendable across the ecosystem.",
    tags: ["Realtime", "Ably", "NestJS", "Leaderboard"],
    detail: {
      role: "Realtime systems, scoring rules, wallet integration with SOKA Club.",
      impact: "Designed prediction windows and a live leaderboard that feels stadium-loud even on a 3G phone.",
      stack: "Next.js · NestJS · Ably realtime · PostgreSQL · Tailwind"
    }
  },
  {
    id: "ludoka", num: "03", name: "Ludoka", year: "2025", role: "Fullstack", client: "YAS Madagascar",
    desc: "Competitive Ludo game wired into the SOKA points economy. Matchmaking, fair RNG, payout loop into the same wallet.",
    tags: ["Game loop", "Realtime", "RNG", "Web"],
    detail: {
      role: "Game state machine, matchmaking, anti-cheat, points accrual.",
      impact: "Folk board game → native web experience. Animated tokens, verifiable RNG, payouts into the SOKA wallet.",
      stack: "Next.js · NestJS · Ably · PostgreSQL"
    }
  },
  {
    id: "eer", num: "04", name: "EER Full Digital", year: "2024", role: "Fullstack", client: "BMOI Madagascar",
    desc: "Online bank account opening for BMOI. Video-call identity verification, secure document vault, banking-grade KYC.",
    tags: ["Banking", "KYC", "WebRTC", "Laravel", "React 18"],
    detail: {
      role: "Full KYC flow, video identity check, secure document handling.",
      impact: "Replaced a branch visit with a 12-minute online flow. Auditable for the bank, frictionless for the customer.",
      stack: "React 18 · Laravel 10 · PrimeReact · Tailwind · PostgreSQL · Docker"
    }
  },
  {
    id: "shoyo", num: "05", name: "SHOYO", year: "2021–24", role: "Lead Developer", client: "SHOYO (FR)",
    desc: "Digital case-file platform for financial onboarding. Led the Symfony → Angular + Node migration end-to-end.",
    tags: ["Angular 16", "Symfony", "Migration", "Lead", "MongoDB"],
    detail: {
      role: "Migration architect, team mentorship, system refactor.",
      impact: "Killed a creaking Symfony monolith. Typed Angular + Node stack, zero downtime cutover.",
      stack: "Angular 16 · Symfony 4 · Angular Material · Node.js · MariaDB · MongoDB"
    }
  },
  {
    id: "theseis", num: "06", name: "THESEIS", year: "2022", role: "Fullstack", client: "SHOYO (FR)",
    desc: "Digital document management. Scan, store, search. Killed paper for clients drowning in it.",
    tags: ["Documents", "Search", "Angular"],
    detail: {
      role: "Frontend architecture, search UX, document pipeline.",
      impact: "Retrieval went from minutes to seconds — structured metadata + a search that understands the corpus.",
      stack: "Angular · Symfony · MongoDB"
    }
  },
  {
    id: "ocr", num: "07", name: "OCR Intelligence", year: "2023", role: "R&D / Fullstack", client: "SHOYO (FR)",
    desc: "OCR + GPT-4 pipeline turning photos and PDFs of ID cards, RIBs and passports into typed JSON.",
    tags: ["OCR", "Tesseract", "GPT-4", "pdf2image", "AI"],
    detail: {
      role: "Pipeline design, prompt engineering, model orchestration.",
      impact: "Replaced manual data-entry teams. Scans in, validated JSON out — ready for downstream systems.",
      stack: "Node.js · Tesseract · node-tesseract · OpenAI GPT-4 · pdf2image · Python"
    }
  },
  {
    id: "happy", num: "08", name: "Happy Capital", year: "2022", role: "Fullstack", client: "SHOYO (FR)",
    desc: "Real-estate crowdfunding platform. Investor accounts, project pages, real-time tracking of every euro committed.",
    tags: ["Fintech", "Investing", "Angular"],
    detail: {
      role: "Investor dashboards, project flow, payments integration.",
      impact: "A serious investment product that doesn't condescend. Clear numbers, real-time portfolio view.",
      stack: "Angular · Symfony · MariaDB"
    }
  }
];

const TIMELINE = [
  { year: "2025 — now", role: "Fullstack Developer", company: "SOKA / YAS Madagascar",
    desc: "Building the SOKA ecosystem — Club, Live, Ludoka. A points economy, marketplace and competitive games glued together by a USDC wallet and realtime infrastructure.",
    stack: ["Next.js 14", "NestJS", "Prisma", "Web3Auth", "Google Cloud", "Ably"] },
  { year: "2024 — 2025", role: "Fullstack Developer", company: "BMOI Madagascar",
    desc: "Built EER Full Digital — online bank account opening with video-call KYC, secure document handling and a UX that doesn't feel like a 2008 bank portal.",
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
  { cat: "Frontend", lead: ["React 18", "Next.js 14", "Angular 16"], items: ["Redux Toolkit", "Vue.js", "Tailwind CSS", "SCSS", "PrimeReact", "Angular Material", "Recoil", "Formik", "Zod"] },
  { cat: "Backend",  lead: ["Node.js", "NestJS", "Symfony"],         items: ["Laravel 10", "API Platform", "Prisma", "PHP 7/8", "TypeScript", "Python", "Java"] },
  { cat: "Data & Infra", lead: ["PostgreSQL", "MongoDB", "Docker"],  items: ["MariaDB", "MySQL", "Google Cloud Run", "Vercel", "Cloud SQL", "Firebase", "Git / GitLab"] },
  { cat: "AI & Edge", lead: ["Claude Code", "OpenAI GPT-4", "Tesseract OCR"], items: ["pdf2image", "Web3Auth", "Blockchain", "USDC payments", "Ably realtime", "PostHog", "React Native"] }
];

const FILES = [
  { kind: 'group', label: 'workspace ~/portfolio' },
  { kind: 'file', id: 'whoami',     name: 'whoami.md',       glyph: '◇' },
  { kind: 'file', id: 'work',       name: 'projects/',       glyph: '▸' },
  { kind: 'file', id: 'experience', name: 'experience.log',  glyph: '≡' },
  { kind: 'file', id: 'skills',     name: 'skills.json',     glyph: '{ }' },
  { kind: 'file', id: 'contact',    name: 'contact.md',      glyph: '@' },
  { kind: 'group', label: 'system' },
  { kind: 'file', id: 'help',       name: 'help',            glyph: '?' },
  { kind: 'file', id: 'clear',      name: 'clear',           glyph: '×' }
];

const COMMANDS = [
  { cmd: '/whoami',     desc: 'About Erick — 7 years fullstack from Antananarivo' },
  { cmd: '/work',       desc: 'Selected projects across fintech, gaming and AI' },
  { cmd: '/experience', desc: 'Career log — 7 companies, 2018 → now' },
  { cmd: '/skills',     desc: 'Stack reference — frontend, backend, data, AI' },
  { cmd: '/contact',    desc: 'Email, WhatsApp, location' },
  { cmd: '/help',       desc: 'List available commands' },
  { cmd: '/clear',      desc: 'Clear the conversation' }
];

/* =============================================================
   Utilities
============================================================== */
function uid() { return Math.random().toString(36).slice(2, 10); }

function fmtMs(ms) { return ms < 1000 ? `${ms}ms` : `${(ms/1000).toFixed(2)}s`; }

/* =============================================================
   Building messages from commands
============================================================== */

function buildIntro() {
  return [
    { id: uid(), kind: 'tool',
      name: 'Read', args: 'uploads/CV_ANDRINIRINA_ERICK_FULLSTACK.pdf',
      status: 'ok', durMs: 142, open: false,
      body: <ReadCVBody /> },
    { id: uid(), kind: 'tool',
      name: 'Glob', args: 'projects/**/*.md → 8 files',
      status: 'ok', durMs: 28, open: false,
      body: <GlobBody /> },
    { id: uid(), kind: 'claude', stream: true,
      text:
`Hi — I'm **Erick Andrinirina**, a fullstack engineer based in Antananarivo, Madagascar. *7 years* shipping web platforms across fintech, gaming and AI.

This portfolio is built in the style of **Claude Code** — the AI coding agent I pair with every day. I master it as a tool the same way I master a framework: knowing when to defer to it, when to override, and how to keep the human in the loop.

Try \`/work\` to see what I've shipped, \`/experience\` for the timeline, or \`/skills\` for the stack. You can also just type anything.` },
    { id: uid(), kind: 'block', node: <HeroCard /> }
  ];
}

function buildWhoami() {
  return [
    { id: uid(), kind: 'tool', name: 'Read', args: 'whoami.md', status: 'ok', durMs: 12, open: true,
      body: <WhoamiBody /> }
  ];
}

function buildWork() {
  return [
    { id: uid(), kind: 'tool', name: 'Grep', args: 'pattern:"shipped" path:"projects/" → 8 matches', status: 'ok', durMs: 41, open: false,
      body: <GrepBody /> },
    { id: uid(), kind: 'claude', stream: true,
      text: `Loaded **${PROJECTS.length} projects** spanning fintech, civic tech, gaming and AI pipelines. Click any card to expand the case.` },
    { id: uid(), kind: 'tool', name: 'Read', args: 'projects/*.md', status: 'ok', durMs: 89, open: true,
      body: <ProjectsBody /> }
  ];
}

function buildExperience() {
  return [
    { id: uid(), kind: 'tool', name: 'Bash', args: 'tail -f experience.log', status: 'ok', durMs: 18, open: true,
      body: <ExperienceBody /> }
  ];
}

function buildSkills() {
  return [
    { id: uid(), kind: 'tool', name: 'Read', args: 'skills.json', status: 'ok', durMs: 9, open: true,
      body: <SkillsBody /> },
    { id: uid(), kind: 'claude', stream: true,
      text: `Note: **Claude Code** lives at the top of the AI & Edge column on purpose. It's how I 2-3× my output without losing the discipline of writing the code myself.` }
  ];
}

function buildContact() {
  return [
    { id: uid(), kind: 'tool', name: 'Read', args: 'contact.md', status: 'ok', durMs: 6, open: true,
      body: <ContactBody /> },
    { id: uid(), kind: 'claude', stream: true,
      text: `Available for remote engagements, contract or full-time, **Q3 2026 onwards**. Send a note — I reply within 24h.` }
  ];
}

function buildHelp() {
  return [
    { id: uid(), kind: 'tool', name: 'Read', args: 'help.txt', status: 'ok', durMs: 4, open: true,
      body: <HelpBody /> }
  ];
}

function buildUnknown(input) {
  // Fallback "Claude" reply for free-form text
  const t = input.toLowerCase();
  let body;
  if (/hi|hello|hey|salut|bonjour/.test(t)) {
    body = `Hey there. Glad you stopped by. Try \`/work\` to see what I've built, or \`/whoami\` for the short version.`;
  } else if (/cv|resume/.test(t)) {
    body = `My CV is loaded into context. Try \`/whoami\` for the summary, or \`/experience\` for the full log.`;
  } else if (/hire|available|freelance|contract/.test(t)) {
    body = `Yes — I'm open to **contract** or **full-time**, remote-first, from **Q3 2026**. Run \`/contact\` to grab the details.`;
  } else if (/claude|ai|llm/.test(t)) {
    body = `I work with **Claude Code** daily — paired-coding, refactors, code review, tests. I also shipped an OCR pipeline using **GPT-4** to turn scans into typed JSON. See \`/work\` → OCR Intelligence.`;
  } else if (/madagascar|antananarivo|tana/.test(t)) {
    body = `Based in **Antananarivo** — UTC+3. Internet is good enough for remote work with European teams. I've been delivering remote to French clients for 5+ years.`;
  } else {
    body = `I'd love to answer that — but this is a static portfolio, not a live model. Try one of the commands: \`/work\` · \`/experience\` · \`/skills\` · \`/contact\`. Or hit ⌘K to search.`;
  }
  return [{ id: uid(), kind: 'claude', stream: true, text: body }];
}

/* =============================================================
   Body components (rendered inside tool blocks)
============================================================== */

function ReadCVBody() {
  return (
    <pre>
      <span className="gutter">1</span><span className="hl-com">// parsed 4 pages, 247 lines</span>{"\n"}
      <span className="gutter">2</span><span className="hl-key">name</span>: <span className="hl-str">"Erick Andrinirina"</span>{"\n"}
      <span className="gutter">3</span><span className="hl-key">title</span>: <span className="hl-str">"Ingénieur Fullstack JavaScript"</span>{"\n"}
      <span className="gutter">4</span><span className="hl-key">location</span>: <span className="hl-str">"Antananarivo, Madagascar"</span>{"\n"}
      <span className="gutter">5</span><span className="hl-key">years_experience</span>: <span className="hl-num">7</span>{"\n"}
      <span className="gutter">6</span><span className="hl-key">education</span>: <span className="hl-str">"École Supérieure Polytechnique d'Antananarivo, MSc Electronics (2018)"</span>{"\n"}
      <span className="gutter">7</span><span className="hl-key">languages</span>: [<span className="hl-str">"Malagasy"</span>, <span className="hl-str">"Français"</span>, <span className="hl-str">"English"</span>]{"\n"}
      <span className="gutter">8</span><span className="hl-key">stack_lead</span>: [<span className="hl-str">"TypeScript"</span>, <span className="hl-str">"React"</span>, <span className="hl-str">"Next.js"</span>, <span className="hl-str">"NestJS"</span>, <span className="hl-str">"Symfony"</span>]
    </pre>
  );
}

function GlobBody() {
  return (
    <pre>
      <span className="hl-com">// 8 project files indexed</span>{"\n"}
      {PROJECTS.map((p, i) => (
        <span key={p.id} style={{display:"contents"}}>
          <span className="gutter">{i + 1}</span>
          projects/<span className="hl">{p.id}</span>.md
          <span style={{ color: 'var(--muted)' }}>{"  →  "}</span>
          <span style={{ color: 'var(--fg-dim)' }}>{p.name}</span>
          {"\n"}
        </span>
      ))}
    </pre>
  );
}

function GrepBody() {
  return (
    <pre>
      <span className="hl-com">// 8 matches found</span>{"\n"}
      {PROJECTS.slice(0, 4).map((p) => (
        <span key={p.id} style={{display:"contents"}}>
          <span style={{ color: 'var(--accent)' }}>projects/{p.id}.md</span>
          <span style={{ color: 'var(--muted)' }}>{":"}</span>
          <span style={{ color: 'var(--muted)' }}>3</span>
          <span style={{ color: 'var(--muted)' }}>{":"}</span>
          <span> {p.desc.split('.')[0]}.</span>
          {"\n"}
        </span>
      ))}
      <span style={{ color: 'var(--muted)' }}>… 4 more matches</span>
    </pre>
  );
}

function HeroCard() {
  return (
    <div className="hero-card">
      <div className="role">// fullstack engineer · interface designer</div>
      <div className="name">Erick Andrinirina <span className="sparkle">✦</span></div>
      <div className="tagline">
        I write the backend, design the frontend, and care about the inch between them.
        Pair-coding with Claude Code daily — shipping faster without skipping the craft.
      </div>
      <div className="stats">
        <div className="stat"><div className="n">7</div><div className="l">years shipping</div></div>
        <div className="stat"><div className="n">8+</div><div className="l">flagship projects</div></div>
        <div className="stat"><div className="n">3</div><div className="l">languages spoken</div></div>
        <div className="stat"><div className="n">∞</div><div className="l">cups of coffee</div></div>
      </div>
    </div>
  );
}

function WhoamiBody() {
  return (
    <pre style={{ lineHeight: 1.7 }}>
<span className="hl-com"># whoami</span>{"\n\n"}
<span style={{ color: 'var(--fg)' }}>Erick Andrinirina</span>{"  "}<span className="hl-com">// fullstack engineer</span>{"\n"}
<span style={{ color: 'var(--muted)' }}>Antananarivo, Madagascar · UTC+3</span>{"\n\n"}

7 years building web platforms that move money, words and players. From a Malagasy bank's online onboarding (BMOI), to a USDC-powered points economy at YAS, to an OCR pipeline that turns scans into typed JSON.{"\n\n"}

I lead with **JavaScript / TypeScript** — React, Next, Angular up front; Node, NestJS, Symfony, Laravel behind. PostgreSQL or MongoDB depending on the shape of the data. Docker. Google Cloud.{"\n\n"}

I pair daily with <span style={{ color: 'var(--accent)' }}>Claude Code</span>. It's not a magic trick — it's a force multiplier. I still write the code, design the structure, own the bugs. But the boring parts vanish, and the interesting parts get the attention they deserve.{"\n\n"}

<span className="hl-com">// also fluent in</span>{"\n"}
Figma · Adobe XD · OCR (Tesseract + GPT-4) · Web3Auth · Ably realtime · React Native
    </pre>
  );
}

function ProjectsBody() {
  return (
    <div className="card-list">
      {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
    </div>
  );
}

function ProjectCard({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"card-proj" + (open ? " open" : "")} onClick={() => setOpen(!open)}>
      <button className="toggle">{open ? "− collapse" : "+ expand"}</button>
      <div className="row1">
        <span className="num">{p.num}</span>
        <span className="name">{p.name}</span>
        <span className="meta">{p.role} · {p.client} · {p.year}</span>
      </div>
      <div className="desc">{p.desc}</div>
      <div className="tags">
        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="card-detail">
        <span className="lbl">role</span>
        <div>{p.detail.role}</div>
        <span className="lbl">impact</span>
        <div>{p.detail.impact}</div>
        <span className="lbl">stack</span>
        <div>{p.detail.stack}</div>
      </div>
    </div>
  );
}

function ExperienceBody() {
  return (
    <div className="log-list">
      {TIMELINE.map((t, i) => (
        <div key={i} className="log-row">
          <div className="log-time">{t.year}</div>
          <div className="log-content">
            <div className="head">
              <span className="level">INFO</span>
              <span className="role">{t.role}</span>
              <span className="at">@ <em>{t.company}</em></span>
            </div>
            <div className="desc">{t.desc}</div>
            <div className="stack">
              {t.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsBody() {
  return (
    <div>
      <pre style={{ marginBottom: 10, color: 'var(--muted)' }}>{`{`}</pre>
      <div className="skill-table">
        {SKILLS.map((s) => (
          <span key={s.cat} style={{display:"contents"}}>
            <div className="cat">"{s.cat.toLowerCase().replace(/[\s&]+/g, '_')}"</div>
            <div className="items">
              [{" "}
              {s.lead.map((it, i) => (
                <span key={it} style={{display:"contents"}}>
                  <span className="lead">"{it}"</span>{i < s.lead.length - 1 || s.items.length ? ", " : ""}
                </span>
              ))}
              {s.items.map((it, i) => (
                <span key={it} style={{display:"contents"}}>"{it}"{i < s.items.length - 1 ? ", " : ""}</span>
              ))}
              {" "}]
            </div>
          </span>
        ))}
      </div>
      <pre style={{ marginTop: 10, color: 'var(--muted)' }}>{`}`}</pre>
    </div>
  );
}

function ContactBody() {
  const [copied, setCopied] = useState(null);
  const copy = (key, val) => {
    navigator.clipboard?.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 1400);
  };
  return (
    <div className="contact-card">
      <div className="k">email</div>
      <div className="v">
        <a href="mailto:ckandrinirina@gmail.com">ckandrinirina@gmail.com</a>
        <button className={"copy-btn" + (copied === 'email' ? ' copied' : '')}
                onClick={(e) => { e.stopPropagation(); copy('email', 'ckandrinirina@gmail.com'); }}>
          {copied === 'email' ? '✓ copied' : 'copy'}
        </button>
      </div>
      <div className="k">whatsapp</div>
      <div className="v">
        <a href="https://wa.me/261385096664" target="_blank" rel="noreferrer">+261 38 50 966 64</a>
        <button className={"copy-btn" + (copied === 'phone' ? ' copied' : '')}
                onClick={(e) => { e.stopPropagation(); copy('phone', '+261385096664'); }}>
          {copied === 'phone' ? '✓ copied' : 'copy'}
        </button>
      </div>
      <div className="k">location</div>
      <div className="v">Antananarivo, Madagascar <span style={{ color: 'var(--muted)' }}>· UTC+3</span></div>
      <div className="k">availability</div>
      <div className="v"><span style={{ color: 'var(--success)' }}>● open</span> for remote work · Q3 2026 onwards</div>
      <div className="k">languages</div>
      <div className="v">Malagasy · Français · English</div>
    </div>
  );
}

function HelpBody() {
  return (
    <pre>
      <span className="hl-com">// type any command, or hit Tab for autocomplete</span>{"\n\n"}
      {COMMANDS.map((c) => (
        <span key={c.cmd} style={{display:"contents"}}>
          <span style={{ color: 'var(--accent)', display: 'inline-block', width: 130 }}>{c.cmd}</span>
          <span style={{ color: 'var(--fg-dim)' }}>{c.desc}</span>
          {"\n"}
        </span>
      ))}
      {"\n"}<span className="hl-com">// keyboard shortcuts</span>{"\n"}
      <span style={{ color: 'var(--accent)', display: 'inline-block', width: 130 }}>↑ / ↓</span>
      <span style={{ color: 'var(--fg-dim)' }}>navigate command history</span>{"\n"}
      <span style={{ color: 'var(--accent)', display: 'inline-block', width: 130 }}>Tab</span>
      <span style={{ color: 'var(--fg-dim)' }}>autocomplete slash command</span>{"\n"}
      <span style={{ color: 'var(--accent)', display: 'inline-block', width: 130 }}>⌘ / Ctrl + K</span>
      <span style={{ color: 'var(--fg-dim)' }}>focus the input</span>{"\n"}
      <span style={{ color: 'var(--accent)', display: 'inline-block', width: 130 }}>⌘ / Ctrl + L</span>
      <span style={{ color: 'var(--fg-dim)' }}>clear screen</span>
    </pre>
  );
}

/* =============================================================
   Command dispatch
============================================================== */
function runCommand(raw, ctx) {
  const input = raw.trim();
  const lower = input.toLowerCase();
  const cmd = lower.replace(/^\//, '').split(/\s+/)[0];

  if (input === '') return [];

  if (cmd === 'clear' || cmd === 'cls') {
    ctx.clear();
    return [];
  }

  if (cmd === 'whoami' || cmd === 'about' || cmd === 'erick') return buildWhoami();
  if (cmd === 'work' || cmd === 'projects' || cmd === 'cat') return buildWork();
  if (cmd === 'experience' || cmd === 'xp' || cmd === 'cv' || cmd === 'log') return buildExperience();
  if (cmd === 'skills' || cmd === 'stack' || cmd === 'tools') return buildSkills();
  if (cmd === 'contact' || cmd === 'email' || cmd === 'hire') return buildContact();
  if (cmd === 'help' || cmd === '?' || cmd === 'h') return buildHelp();
  if (cmd === 'ls' || cmd === 'dir') return [{
    id: uid(), kind: 'tool', name: 'LS', args: '~/portfolio', status: 'ok', durMs: 3, open: true,
    body: <pre>{FILES.filter(f => f.kind === 'file').map(f => (
      <div key={f.id} style={{ color: 'var(--fg-dim)' }}>{f.glyph}  {f.name}</div>
    ))}</pre>
  }];

  return buildUnknown(input);
}

/* =============================================================
   Streaming text component
============================================================== */
function StreamingText({ text, onDone }) {
  const [n, setN] = useState(0);
  const doneRef = useRef(false);
  useEffect(() => {
    if (doneRef.current) return;
    let raf;
    const t0 = performance.now();
    const total = text.length;
    const dur = Math.min(900, 200 + total * 6);
    const step = () => {
      const t = performance.now() - t0;
      const p = Math.min(1, t / dur);
      const charsShown = Math.floor(p * total);
      setN(charsShown);
      if (p < 1) raf = requestAnimationFrame(step);
      else { doneRef.current = true; onDone && onDone(); }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  const shown = text.slice(0, n);
  const done = n >= text.length;
  return (
    <span>
      {renderMd(shown)}
      {!done && <span className="caret-blink" />}
    </span>
  );
}

// Tiny markdown: **bold**, *italic*, `code`, links not needed
function renderMd(s) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0, m, key = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) out.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('`')) out.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    else out.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    last = re.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

/* =============================================================
   Message renderers
============================================================== */
function UserMsg({ text }) {
  return (
    <div className="msg msg-user">
      <div className="label">
        <span className="who">erick@portfolio</span>
        <span>·</span>
        <span>you</span>
      </div>
      <div className="text">{text}</div>
    </div>
  );
}

function ClaudeMsg({ text, stream }) {
  return (
    <div className="msg msg-claude">
      <div className="label">
        <span className="who"><span className="star">✦</span> claude · sonnet-4.5</span>
        <span style={{ color: 'var(--muted-deep)' }}>·</span>
        <span>thinking complete</span>
      </div>
      <div className="body">
        {stream ? <StreamingText text={text} /> : renderMd(text)}
      </div>
    </div>
  );
}

function ToolMsg({ name, args, body, status = 'ok', durMs = 0, open: defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={"tool" + (open ? " expanded" : "")}>
      <div className="tool-head" onClick={() => setOpen(!open)}>
        <span className="chev">▶</span>
        <span className="name">{name}</span>
        <span className="arg"><span className="arg-paren">(</span>{args}<span className="arg-paren">)</span></span>
        <span className={"status " + status}>
          {status === 'ok' && <span className="check">✓</span>}
          <span>{fmtMs(durMs)}</span>
        </span>
      </div>
      <div className="tool-body">{body}</div>
    </div>
  );
}

function SystemMsg({ text }) {
  return (
    <div className="msg-system">
      <span className="tag">system</span>
      <span>{text}</span>
    </div>
  );
}

function BlockMsg({ node }) { return <div>{node}</div>; }

/* =============================================================
   Topbar
============================================================== */
function Topbar({ active, ctx }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      try {
        setTime(new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit', minute: '2-digit', timeZone: 'Indian/Antananarivo', hour12: false
        }).format(new Date()));
      } catch { setTime(''); }
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="topbar">
      <div className="tb-traffic">
        <div className="light r"></div>
        <div className="light y"></div>
        <div className="light g"></div>
      </div>
      <div className="tb-tabs">
        <div className="tb-tab active">
          {active.name} <span className="x">×</span>
        </div>
      </div>
      <div className="tb-meta">
        <div className="kv"><span className="k">model</span><span className="v accent">claude-sonnet-4.5</span></div>
        <div className="kv"><span className="k">ctx</span><span className="v">{ctx.used}k / 200k</span></div>
        <div className="kv"><span className="k">cwd</span><span className="v">~/portfolio</span></div>
        <div className="kv"><span className="k">tnr</span><span className="v">{time}</span></div>
      </div>
    </div>
  );
}

/* =============================================================
   Sidebar
============================================================== */
function Sidebar({ active, onSelect }) {
  // group files by section
  const sections = [];
  let cur = null;
  FILES.forEach((f) => {
    if (f.kind === 'group') {
      cur = { label: f.label, rows: [] };
      sections.push(cur);
    } else if (cur) {
      cur.rows.push(f);
    }
  });

  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="logo">E</div>
        <div>
          <div className="name">Erick A.</div>
          <div className="role">fullstack · designer</div>
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec.label} className="sb-section">
          <div className="sb-head"><span>{sec.label}</span></div>
          {sec.rows.map((f) => (
            <button key={f.id}
                    className={"sb-row" + (active === f.id ? " active" : "")}
                    onClick={() => onSelect(f.id)}>
              <span className="glyph">{f.glyph}</span>
              <span>{f.name}</span>
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
          <span>pairing</span>
          <span style={{ color: 'var(--accent)' }}>claude-code</span>
        </div>
      </div>
    </aside>
  );
}

/* =============================================================
   Input bar with slash autocomplete + history
============================================================== */
function InputBar({ onSubmit, history, ctx }) {
  const [value, setValue] = useState('');
  const [hIdx, setHIdx] = useState(-1);
  const [sIdx, setSIdx] = useState(0);
  const taRef = useRef(null);

  const showSuggest = value.startsWith('/');
  const suggestions = useMemo(
    () => showSuggest
      ? COMMANDS.filter((c) => c.cmd.toLowerCase().startsWith(value.toLowerCase()))
      : [],
    [value, showSuggest]
  );

  // global ⌘K / ⌘L
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); taRef.current?.focus(); }
      if (mod && e.key.toLowerCase() === 'l') { e.preventDefault(); ctx.clear(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ctx]);

  const submit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
    setHIdx(-1);
    setSIdx(0);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (suggestions.length && showSuggest && value !== suggestions[sIdx].cmd) {
        setValue(suggestions[sIdx].cmd);
      } else {
        submit();
      }
      return;
    }
    if (e.key === 'Tab' && suggestions.length) {
      e.preventDefault();
      setValue(suggestions[sIdx].cmd);
      return;
    }
    if (showSuggest && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      setSIdx((i) => {
        const n = suggestions.length;
        if (!n) return 0;
        return e.key === 'ArrowDown' ? (i + 1) % n : (i - 1 + n) % n;
      });
      return;
    }
    if (!showSuggest && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      if (!history.length) return;
      e.preventDefault();
      let next = hIdx;
      if (e.key === 'ArrowUp') next = Math.min(history.length - 1, hIdx + 1);
      else next = Math.max(-1, hIdx - 1);
      setHIdx(next);
      setValue(next === -1 ? '' : history[history.length - 1 - next]);
      return;
    }
  };

  return (
    <div className="inputbar">
      {showSuggest && suggestions.length > 0 && (
        <div className="suggest">
          {suggestions.map((s, i) => (
            <button key={s.cmd}
                    className={"suggest-item" + (i === sIdx ? " active" : "")}
                    onMouseEnter={() => setSIdx(i)}
                    onClick={() => { setValue(s.cmd); taRef.current?.focus(); }}>
              <span className="cmd">{s.cmd}</span>
              <span className="desc">{s.desc}</span>
              <span className="kbd">↵</span>
            </button>
          ))}
        </div>
      )}
      <div className="input-row">
        <span className="prompt-prefix">{'>'}</span>
        <textarea
          ref={taRef}
          rows={1}
          autoFocus
          placeholder="type a command, or just ask anything…  (try /work)"
          value={value}
          onChange={(e) => { setValue(e.target.value); setSIdx(0); setHIdx(-1); }}
          onKeyDown={onKey}
        />
        <span className="send-hint">
          <kbd>↵</kbd> send · <kbd>⇧↵</kbd> newline
        </span>
      </div>
      <div className="hint-row">
        {COMMANDS.slice(0, 5).map((c) => (
          <button key={c.cmd} className="pill" onClick={() => onSubmit(c.cmd)}>{c.cmd}</button>
        ))}
        <span className="spacer"></span>
        <span className="ctx">{ctx.tokens} tokens · {ctx.msgs} msgs</span>
      </div>
    </div>
  );
}

/* =============================================================
   App
============================================================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "accent": "#D97757"
}/*EDITMODE-END*/;

function App() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeFile, setActiveFile] = useState('whoami');
  const convRef = useRef(null);

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

  // Boot — one welcome interaction
  useEffect(() => {
    const init = [
      { id: uid(), kind: 'user', text: 'introduce yourself, briefly' },
      ...buildIntro()
    ];
    setMessages(init);
    setHistory(['introduce yourself, briefly']);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = convRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight + 9999;
  }, [messages]);

  const clear = () => setMessages([]);

  const ctx = {
    used: Math.max(2, Math.min(180, 2 + messages.length * 1.2)).toFixed(1),
    tokens: 1200 + messages.length * 180,
    msgs: messages.filter((m) => m.kind === 'user' || m.kind === 'claude').length,
    clear
  };

  const submit = (text) => {
    const cleaned = text.trim();
    if (!cleaned) return;
    const userMsg = { id: uid(), kind: 'user', text: cleaned };
    setHistory((h) => [...h, cleaned]);

    if (/^\/?(clear|cls)\b/i.test(cleaned)) {
      clear();
      return;
    }

    setMessages((m) => [...m, userMsg]);
    // small think delay before bot responds
    setTimeout(() => {
      const out = runCommand(cleaned, { clear });
      if (out.length) setMessages((m) => [...m, ...out]);
    }, 220);

    // sidebar highlight
    const cmd = cleaned.toLowerCase().replace(/^\//, '').split(/\s+/)[0];
    const map = { work: 'work', projects: 'work', experience: 'experience', xp: 'experience',
                  skills: 'skills', stack: 'skills', contact: 'contact', hire: 'contact',
                  whoami: 'whoami', about: 'whoami', help: 'help' };
    if (map[cmd]) setActiveFile(map[cmd]);
  };

  const onSelectFile = (id) => {
    setActiveFile(id);
    submit('/' + id);
  };

  const activeName = (FILES.find((f) => f.id === activeFile) || {}).name || 'whoami.md';

  return (
    <div className="app">
      <Sidebar active={activeFile} onSelect={onSelectFile} />
      <main className="main">
        <Topbar active={{ name: activeName }} ctx={ctx} />
        <div className="conv" ref={convRef}>
          <div className="conv-inner">
            {messages.map((m) => {
              if (m.kind === 'user')   return <UserMsg   key={m.id} text={m.text} />;
              if (m.kind === 'claude') return <ClaudeMsg key={m.id} text={m.text} stream={m.stream} />;
              if (m.kind === 'tool')   return <ToolMsg   key={m.id} name={m.name} args={m.args} body={m.body} status={m.status} durMs={m.durMs} open={m.open} />;
              if (m.kind === 'system') return <SystemMsg key={m.id} text={m.text} />;
              if (m.kind === 'block')  return <BlockMsg  key={m.id} node={m.node} />;
              return null;
            })}
          </div>
        </div>
        <InputBar onSubmit={submit} history={history} ctx={ctx} />
      </main>

      {window.TweaksPanel && (
        <window.TweaksPanel>
          <window.TweakSection label="Theme">
            <window.TweakRadio
              label="Palette"
              value={tweaks.theme}
              onChange={(v) => setTweak('theme', v)}
              options={[
                { value: 'default', label: 'Ember' },
                { value: 'ice',     label: 'Ice' },
                { value: 'matrix',  label: 'Matrix' },
                { value: 'paper',   label: 'Paper' }
              ]}
            />
            <window.TweakColor
              label="Accent"
              value={tweaks.accent}
              onChange={(v) => setTweak('accent', v)}
              options={['#D97757', '#7AB7FF', '#7CE08D', '#FFB100', '#E07AFF']}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
