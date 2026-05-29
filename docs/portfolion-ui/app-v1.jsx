// ===== Data =====
const PROJECTS = [
  {
    id: "soka",
    num: "01",
    name: "SOKA Club",
    year: "2025",
    role: "Lead Fullstack",
    client: "YAS Madagascar",
    desc: "Multifunctional digital platform with event ticketing, online store and interactive mini-games. USDC payments with a native SOKA points system.",
    tags: ["Next.js 14", "NestJS", "Prisma", "Web3Auth", "Blockchain"],
    detail: {
      role: "Lead fullstack — architecture, payment rails, points economy, store UX.",
      impact: "Built the end-to-end engagement loop: buy, play, earn, spend — anchored on USDC and an internal points wallet. Sub-second realtime updates with Ably across leaderboards, store, and games.",
      stack: "Next.js 14 · Redux Toolkit · React Admin · Tailwind · NestJS · Prisma · PostgreSQL on Cloud SQL · Web3Auth · PostHog · Google Cloud Run"
    }
  },
  {
    id: "soka-live",
    num: "02",
    name: "SOKA Live",
    year: "2025",
    role: "Fullstack",
    client: "YAS Madagascar",
    desc: "Live football predictions platform. Players forecast results, climb a leaderboard, earn SOKA points and spend them across the ecosystem.",
    tags: ["Realtime", "Ably", "NestJS", "Leaderboard"],
    detail: {
      role: "Realtime systems, leaderboard scoring, integration with SOKA Club wallet.",
      impact: "Designed the prediction window, scoring rules and live leaderboard so a match feels like a stadium even on a 3G phone.",
      stack: "Next.js · NestJS · Ably realtime · PostgreSQL · Tailwind"
    }
  },
  {
    id: "ludoka",
    num: "03",
    name: "Ludoka",
    year: "2025",
    role: "Fullstack",
    client: "YAS Madagascar",
    desc: "Competitive Ludo game wired into the SOKA points economy. Players match up, play and convert wins into rewards.",
    tags: ["Game Loop", "Realtime", "Web"],
    detail: {
      role: "Game state machine, matchmaking, points accrual and anti-cheat.",
      impact: "Took a folk board game and made it feel native to the web — animated tokens, fair RNG, and a payout loop tied to the same points wallet.",
      stack: "Next.js · NestJS · Ably · PostgreSQL"
    }
  },
  {
    id: "eer",
    num: "04",
    name: "EER Full Digital",
    year: "2024",
    role: "Fullstack",
    client: "BMOI Madagascar",
    desc: "Online bank account opening for BMOI. Video-call identity verification, secure document vault and a full KYC pipeline.",
    tags: ["Banking", "KYC", "WebRTC", "Laravel"],
    detail: {
      role: "Full KYC flow, video-call identity check, secure document handling.",
      impact: "Replaced a branch visit with a 12-minute online flow. Banking-grade auditability without sacrificing the UX you'd expect from a fintech.",
      stack: "React 18 · Laravel 10 · PrimeReact · Tailwind · PostgreSQL · Docker"
    }
  },
  {
    id: "shoyo",
    num: "05",
    name: "SHOYO",
    year: "2021–24",
    role: "Lead Developer",
    client: "SHOYO (FR)",
    desc: "Digital case-file platform for financial onboarding. Led the full migration from Symfony to Angular + Node.js. Submission, review, tracking — automated end-to-end.",
    tags: ["Angular 16", "Symfony", "Lead", "MongoDB"],
    detail: {
      role: "Lead dev — migration architect, team mentorship, system refactor.",
      impact: "Replaced a creaking Symfony monolith with a typed Angular + Node stack. Owned the migration plan, the team, and the cutover.",
      stack: "Angular 16 · Symfony 4 · Angular Material · Node.js · MariaDB · MongoDB"
    }
  },
  {
    id: "theseis",
    num: "06",
    name: "THESEIS",
    year: "2022",
    role: "Fullstack",
    client: "SHOYO (FR)",
    desc: "Digital document management for administrative workflows: scan, store, search. Killed paper for clients who used to drown in it.",
    tags: ["Documents", "Search", "Angular"],
    detail: {
      role: "Frontend architecture, search UX, document pipeline.",
      impact: "Cut document retrieval time from minutes to seconds with structured metadata + a search that actually understands the corpus.",
      stack: "Angular · Symfony · MongoDB"
    }
  },
  {
    id: "ocr",
    num: "07",
    name: "OCR Intelligence",
    year: "2023",
    role: "R&D / Fullstack",
    client: "SHOYO (FR)",
    desc: "OCR + GPT-4 pipeline that turns photos and PDFs of ID cards, RIBs and passports into structured JSON. Unstructured paper → typed data.",
    tags: ["OCR", "Tesseract", "GPT-4", "pdf2image"],
    detail: {
      role: "Pipeline design, prompt engineering, model orchestration.",
      impact: "Replaced manual data-entry teams. Documents go in as scans, JSON comes out — typed, validated, and ready for downstream systems.",
      stack: "Node.js · Tesseract · node-tesseract · OpenAI GPT-4 · pdf2image · Python"
    }
  },
  {
    id: "happy",
    num: "08",
    name: "Happy Capital",
    year: "2022",
    role: "Fullstack",
    client: "SHOYO (FR)",
    desc: "Crowdfunding platform for real-estate. Investor accounts, project pages, real-time tracking of every euro committed.",
    tags: ["Fintech", "Investing", "Angular"],
    detail: {
      role: "Investor dashboards, project flow, payments integration.",
      impact: "A serious-feeling investment product that doesn't condescend to the user. Clear numbers, no jargon, real-time portfolio view.",
      stack: "Angular · Symfony · MariaDB"
    }
  }
];

const SKILLS = [
  {
    cat: "Frontend",
    items: ["React 18", "Next.js 14", "Angular 16", "Redux Toolkit", "Vue.js", "Tailwind CSS", "SCSS", "PrimeReact", "Angular Material", "Recoil", "Formik", "Zod"]
  },
  {
    cat: "Backend",
    items: ["Node.js", "NestJS", "Symfony 4", "Laravel 10", "API Platform", "Prisma", "PHP 7/8", "TypeScript", "Python", "Java"]
  },
  {
    cat: "Data & Infra",
    items: ["PostgreSQL", "MongoDB", "MariaDB", "MySQL", "Docker", "Google Cloud Run", "Vercel", "Cloud SQL", "Firebase", "Git / GitLab"]
  },
  {
    cat: "Edge & AI",
    items: ["Web3Auth", "Blockchain", "USDC payments", "Ably realtime", "OpenAI GPT-4", "Tesseract OCR", "pdf2image", "PostHog", "React Native"]
  }
];

const TIMELINE = [
  {
    year: "2025 — Now",
    role: "Fullstack Developer",
    company: "SOKA / YAS Madagascar",
    desc: "Building the SOKA ecosystem — Club, Live, Ludoka. A points economy, an event marketplace and competitive games glued together by a USDC wallet and realtime infrastructure.",
    stack: ["Next.js 14", "NestJS", "Prisma", "Web3Auth", "Google Cloud", "Ably"]
  },
  {
    year: "2024 — 2025",
    role: "Fullstack Developer",
    company: "BMOI Madagascar",
    desc: "Built EER Full Digital — online bank account opening with video-call KYC, secure document handling, and a UX that doesn't feel like a 2008 bank portal.",
    stack: ["React 18", "Laravel 10", "PostgreSQL", "Docker"]
  },
  {
    year: "2021 — 2024",
    role: "Lead Developer",
    company: "SHOYO",
    desc: "Three years owning the digital case-file platform — led the Symfony → Angular + Node migration, shipped THESEIS, Happy Capital and an OCR pipeline powered by Tesseract + GPT-4.",
    stack: ["Angular 16", "Symfony", "Node.js", "MongoDB", "OpenAI"]
  },
  {
    year: "2020",
    role: "Fullstack Developer",
    company: "VTC Academy",
    desc: "Led the build of a training platform for taxi drivers — courses, MCQ assessments, intuitive backoffice for tracking student progress.",
    stack: ["Angular 15", "Symfony 5", "API Platform", "MySQL"]
  },
  {
    year: "2020",
    role: "Fullstack Developer",
    company: "PANAFRI Help",
    desc: "Solo build of a project-financing platform end-to-end — concept to production. Loan submissions, project funding, a UX that earns trust on a sensitive topic.",
    stack: ["React 16", "Symfony 4", "Bootstrap 4"]
  },
  {
    year: "2019 — 2020",
    role: "Lead Developer",
    company: "Creactisoft",
    desc: "Lead on a portfolio of ERPs — IPSUM for retail, SOLIUS for construction, MOZART for customer service. Different industries, same discipline: ship reliably.",
    stack: ["Angular 13", "React 16", "Symfony 4", "Laravel 7"]
  },
  {
    year: "2018 — 2019",
    role: "Fullstack Developer",
    company: "Ingenosya",
    desc: "First gig out of engineering school. Banking portal for BNI Madagascar, project financing for FMFP, a cross-platform document classifier for the Ministry of Forests.",
    stack: ["Symfony 3", "Node.js", "React 16", "Angular", "ElectronJS"]
  }
];

// ===== Cursor =====
function Cursor() {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const [state, setState] = React.useState("default");
  const [label, setLabel] = React.useState("");

  React.useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;
    const move = (e) => { mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);

    const onOver = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        const c = el.getAttribute("data-cursor");
        if (c === "label") {
          setLabel(el.getAttribute("data-cursor-label") || "View");
          setState("label");
        } else {
          setState("hover");
        }
      } else if (e.target.closest("a, button, input, [role=button]")) {
        setState("hover");
      } else {
        setState("default");
      }
    };
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring" data-state={state}>
        {state === "label" ? label : null}
      </div>
    </React.Fragment>
  );
}

// ===== Nav =====
function Nav({ onOpenCmd }) {
  return (
    <nav className="nav">
      <a href="#top" className="nav-mark" data-cursor="hover">
        <span className="dot"></span>
        <span>Erick A. · Fullstack</span>
      </a>
      <div className="nav-links">
        <a href="#work" data-cursor="hover">Work</a>
        <a href="#experience" data-cursor="hover">Experience</a>
        <a href="#skills" data-cursor="hover">Skills</a>
        <a href="#contact" data-cursor="hover">Contact</a>
        <button className="nav-cta" onClick={onOpenCmd} data-cursor="hover">
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
      </div>
    </nav>
  );
}

// ===== Hero =====
function Hero() {
  const roles = ["Fullstack engineer", "Interface designer", "OCR & AI tinkerer", "Realtime systems", "Blockchain payments"];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <header id="top" className="hero container">
      <div className="hero-meta">
        <div className="col">
          <span className="label">Portfolio — 2026 / v.1</span>
          <span className="val">Antananarivo, Madagascar · UTC+3</span>
        </div>
        <div className="col" style={{ textAlign: "right" }}>
          <span className="label">Available · Q3 2026</span>
          <span className="val">Open to remote · contract or full-time</span>
        </div>
      </div>

      <h1 className="hero-title">
        <span className="word roman">Erick</span>{" "}
        <span className="word">Andri</span>—<br/>
        <span className="word"><span className="underline">nirina</span></span>
        <span className="word roman">.</span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-bio">
          Seven years building <strong>web platforms</strong> that move money, words and players — from a Malagasy bank's online onboarding to a USDC-powered points economy at YAS. I write the backend, design the frontend, and care about the inch between them.
        </p>
        <div className="hero-role">
          <div>Currently —</div>
          <div className="rotor" aria-live="polite">
            <div className="rotor-track" style={{ transform: `translateY(-${idx * 1.2}em)` }}>
              {roles.map((r) => <div key={r} className="rotor-item">{r}</div>)}
            </div>
          </div>
        </div>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary" data-cursor="hover">
            <span>Start a project</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// ===== Marquee =====
function Marquee() {
  const words = ["React", "Next.js", "NestJS", "TypeScript", "Angular", "Symfony", "PostgreSQL", "MongoDB", "Blockchain", "OpenAI", "Realtime", "Docker"];
  const Row = () => (
    <span>
      {words.map((w) => (
        <React.Fragment key={w}>
          <span>{w}</span>
          <span className="star">✦</span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        <Row /><Row />
      </div>
    </div>
  );
}

// ===== Work =====
function Work() {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="work" className="section container">
      <div className="section-head">
        <div>
          <div className="section-tag"><span className="num">01</span><span>Selected work</span></div>
          <h2 className="section-title">Things I shipped, <em>not pixels</em> on a moodboard.</h2>
        </div>
        <p className="section-sub">Eight projects from the last five years — fintech, gaming, civic tech, AI pipelines. Click any row to expand the case.</p>
      </div>

      <div className="work-list">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className={"work-item" + (open === p.id ? " expanded" : "")}
            onClick={() => setOpen(open === p.id ? null : p.id)}
            data-cursor="label"
            data-cursor-label={open === p.id ? "Close" : "Open case"}
          >
            <div className="work-num">{p.num}</div>
            <div>
              <div className="work-name">{p.name}</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em",
                textTransform: "uppercase", color: "currentColor", opacity: 0.55, marginTop: 6
              }}>
                {p.role} · {p.client} · {p.year}
              </div>
            </div>
            <div className="work-desc">{p.desc}</div>
            <div className="work-tags">
              {p.tags.map((t) => <span key={t} className="work-tag">{t}</span>)}
            </div>
            <div className="work-arrow">{open === p.id ? "↓" : "↗"}</div>

            <div className="work-detail">
              <h4>My role</h4>
              <p>{p.detail.role}</p>
              <h4>Impact</h4>
              <p>{p.detail.impact}</p>
              <h4>Stack</h4>
              <p>{p.detail.stack}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== Timeline =====
function Timeline() {
  return (
    <section id="experience" className="section container">
      <div className="section-head">
        <div>
          <div className="section-tag"><span className="num">02</span><span>Experience</span></div>
          <h2 className="section-title">Seven years, <em>seven companies</em>, one craft.</h2>
        </div>
        <p className="section-sub">From a first job at Ingenosya in 2018 to leading the SOKA ecosystem today — the lineage of every framework I lean on.</p>
      </div>

      <div className="timeline">
        <div className="timeline-side">
          <div className="label">Career</div>
          <div className="count">07</div>
          <div className="count-label">Years shipping</div>
        </div>
        <div className="timeline-list">
          {TIMELINE.map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-year">{t.year}</div>
              <div>
                <div className="timeline-role">{t.role} <em>@ {t.company}</em></div>
                <div className="timeline-desc" style={{ marginTop: 14 }}>{t.desc}</div>
                <div className="timeline-stack">
                  {t.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Skills =====
function Skills() {
  return (
    <section id="skills" className="section container">
      <div className="section-head">
        <div>
          <div className="section-tag"><span className="num">03</span><span>Toolbox</span></div>
          <h2 className="section-title">A stack chosen for <em>longevity</em>, not hype.</h2>
        </div>
        <p className="section-sub">The frameworks I reach for first — grouped by where they sit in the stack. Everything here is something I've shipped to production.</p>
      </div>

      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <div key={s.cat} className="skill-cat">
            <div className="cat-label">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{s.items.length} tools</span>
            </div>
            <div className="cat-name">{s.cat}</div>
            <div className="skill-list">
              {s.items.map((it, j) => (
                <div key={it} className={j < 3 ? "lead" : ""}>— {it}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== Contact =====
function Contact() {
  const [copied, setCopied] = React.useState(false);
  const copy = (val) => {
    navigator.clipboard?.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section id="contact" className="contact container">
      <h2 className="contact-title">
        Got something <span className="accent">good</span><br/>
        to <span className="roman">build?</span>
      </h2>

      <div className="contact-grid">
        <div className="contact-block">
          <div className="label">Email — preferred</div>
          <div className="value">
            <a
              href="mailto:ckandrinirina@gmail.com"
              onClick={(e) => { e.preventDefault(); copy("ckandrinirina@gmail.com"); }}
              data-cursor="label"
              data-cursor-label={copied ? "Copied!" : "Click to copy"}
            >
              ckandrinirina@gmail.com ↗
            </a>
          </div>
        </div>
        <div className="contact-block">
          <div className="label">WhatsApp · Phone</div>
          <div className="value">
            <a href="tel:+261385096664" data-cursor="hover">+261 38 50 966 64 ↗</a>
          </div>
        </div>
        <div className="contact-block">
          <div className="label">Location</div>
          <div className="value">Antananarivo, <em style={{ fontStyle: "italic" }}>Madagascar</em></div>
        </div>
        <div className="contact-block">
          <div className="label">Languages</div>
          <div className="value">Malagasy · Français · English</div>
        </div>
      </div>

      <div className="footer">
        <span>© 2026 Erick Andrinirina · Designed & coded in Antananarivo</span>
        <span>Press ⌘K · Built with React + a lot of espresso</span>
      </div>
    </section>
  );
}

// ===== Command palette =====
function CommandPalette({ open, onClose }) {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);

  const items = React.useMemo(() => {
    const out = [];
    out.push({ group: "Navigation", icon: "→", label: "Selected work", meta: "Section", action: () => go("#work") });
    out.push({ group: "Navigation", icon: "→", label: "Experience", meta: "Section", action: () => go("#experience") });
    out.push({ group: "Navigation", icon: "→", label: "Skills", meta: "Section", action: () => go("#skills") });
    out.push({ group: "Navigation", icon: "→", label: "Contact", meta: "Section", action: () => go("#contact") });
    PROJECTS.forEach((p) => out.push({
      group: "Projects", icon: p.num, label: p.name, meta: p.year, action: () => { go("#work"); }
    }));
    out.push({ group: "Contact", icon: "@", label: "Copy email", meta: "ckandrinirina@gmail.com", action: () => navigator.clipboard?.writeText("ckandrinirina@gmail.com") });
    out.push({ group: "Contact", icon: "☎", label: "WhatsApp", meta: "+261 38 50 966 64", action: () => window.open("https://wa.me/261385096664") });
    out.push({ group: "Theme", icon: "◐", label: "Cycle theme", meta: "Tweaks", action: () => cycleTheme() });
    return out;
  }, []);

  const filtered = q ? items.filter((i) => (i.label + " " + i.meta).toLowerCase().includes(q.toLowerCase())) : items;
  const grouped = filtered.reduce((acc, it) => { (acc[it.group] = acc[it.group] || []).push(it); return acc; }, {});

  function go(hash) {
    onClose();
    setTimeout(() => { window.location.hash = hash; }, 50);
  }
  function cycleTheme() {
    const themes = ["", "paper", "ember", "aqua"];
    const cur = document.documentElement.getAttribute("data-theme") || "";
    const next = themes[(themes.indexOf(cur) + 1) % themes.length];
    if (next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");
  }

  React.useEffect(() => {
    if (open) { setQ(""); setActive(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(filtered.length - 1, a + 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.action();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  let i = -1;
  return (
    <div className={"cmdk-backdrop" + (open ? " open" : "")} onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Search projects, experience, contact…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0); }}
        />
        <div className="cmdk-list">
          {Object.entries(grouped).map(([group, list]) => (
            <React.Fragment key={group}>
              <div className="cmdk-group-label">{group}</div>
              {list.map((it) => {
                i += 1;
                const idx = i;
                return (
                  <button
                    key={it.label}
                    className={"cmdk-item" + (idx === active ? " active" : "")}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => { it.action(); onClose(); }}
                  >
                    <span className="icon">{it.icon}</span>
                    <span>{it.label}</span>
                    <span className="meta">{it.meta}</span>
                  </button>
                );
              })}
            </React.Fragment>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "30px 20px", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              Nothing here for "{q}".
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

// ===== Side rails =====
function Rails() {
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Indian/Antananarivo", hour12: false };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d) + " TNR");
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <React.Fragment>
      <div className="rail">
        <span className="live">● Available for work</span>
      </div>
      <div className="rail-right">
        <span className="clock">{time}</span>
      </div>
    </React.Fragment>
  );
}

// ===== Reveal observer =====
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ===== App =====
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "accent": "#D8FF4A",
  "showCursor": true
}/*EDITMODE-END*/;

function App() {
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  useReveal();

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (tweaks.theme && tweaks.theme !== "default") {
      document.documentElement.setAttribute("data-theme", tweaks.theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [tweaks.theme]);

  React.useEffect(() => {
    if (tweaks.accent) document.documentElement.style.setProperty("--accent", tweaks.accent);
  }, [tweaks.accent]);

  return (
    <React.Fragment>
      {tweaks.showCursor && <Cursor />}
      <Nav onOpenCmd={() => setCmdOpen(true)} />
      <Rails />
      <Hero />
      <Marquee />
      <Work />
      <Timeline />
      <Skills />
      <Contact />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {window.TweaksPanel && (
        <window.TweaksPanel>
          <window.TweakSection label="Theme">
            <window.TweakRadio
              label="Palette"
              value={tweaks.theme}
              onChange={(v) => setTweak("theme", v)}
              options={[
                { value: "default", label: "Night" },
                { value: "paper", label: "Paper" },
                { value: "ember", label: "Ember" },
                { value: "aqua", label: "Aqua" }
              ]}
            />
            <window.TweakColor
              label="Accent"
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
              options={["#D8FF4A", "#FF4D2E", "#FF6A2C", "#5EEAD4", "#FFFFFF"]}
            />
            <window.TweakToggle
              label="Custom cursor"
              value={tweaks.showCursor}
              onChange={(v) => setTweak("showCursor", v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
