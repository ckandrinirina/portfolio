# Feature — Atelier Terminal UI

**Date:** 2026-05-27
**Spec input:** [`../../specs/2026-05-22_personal-portfolio/Erick Andrinirina - Portfolio.html`](../../specs/2026-05-22_personal-portfolio/Erick%20Andrinirina%20-%20Portfolio.html)
**Status:** Architecture only — implementation pending (`/ck-code:plan` next).

## Summary

Replace the current scrolling-section portfolio shell with the **Atelier Terminal**
design from the mockup: a fixed 240px sidebar + main view container with
**route-based navigation** (one view at a time), warm dark default theme with
3 alternate palettes, animated micro-interactions, a command palette, project
detail modals, and a custom cursor. The bilingual (FR/EN) content system is
**preserved**; the visual layer is the change.

The mockup is the **single source of truth for visuals**: all CSS variables,
typography, spacing, radii, shadows, and animation timings must match it
verbatim. No re-interpretation of the palette.

## Decisions (from `/ck-code:design`)

| Decision | Choice | Rationale |
| --- | --- | --- |
| i18n | Keep FR/EN, localize all new copy | Bilingual goal from the original spec stays; mockup copy is translated into FR for parity |
| Theme model | Replace `dark`-class with `[data-theme]` attribute, 4 palettes | Mockup design; supports Ember (default), Paper, Ocean, Forest |
| Default theme | `default` (Ember dark) if system prefers dark, else `paper` | Respects `prefers-color-scheme`; user choice persisted |
| Education section | Dropped | Not in the mockup; Languages becomes a row in the Contact card |
| CV download | Third Home CTA (secondary `.btn`) | Mockup omits it; spec requires it. Added next to "Get in touch" |
| Custom cursor | Kept | Part of the mockup; hover-only devices (`(hover: hover) and (pointer: fine)`) |
| Profile photo | `<img>` referencing `public/profile.jpg` | Replaces the mockup's `<image-slot>` web component |

## Design tokens (verbatim from mockup)

Tokens are CSS custom properties on `:root` and `[data-theme="..."]`. They live
in `src/index.css` (or a dedicated `src/styles/tokens.css`).

### Ember (default — `:root`)

| Token | Value |
| --- | --- |
| `--bg` | `#16130F` |
| `--bg-deep` | `#100E0B` |
| `--bg-2` | `#1C1813` |
| `--surface` | `#221E18` |
| `--surface-2` | `#2A251E` |
| `--line` | `rgba(245, 235, 220, 0.07)` |
| `--line-strong` | `rgba(245, 235, 220, 0.16)` |
| `--fg` | `#F4ECDC` |
| `--fg-soft` | `#E3D9C5` |
| `--fg-dim` | `#C5BAA2` |
| `--muted` | `#948870` |
| `--muted-deep` | `#5E5645` |
| `--accent` | `#E08660` (warm orange) |
| `--accent-soft` | `rgba(224, 134, 96, 0.14)` |
| `--accent-deep` | `#C56E48` |
| `--gold` | `#E8C547` |
| `--success` | `#88C481` |
| `--info` | `#7FB0DC` |
| `--shadow-soft` | `0 8px 32px rgba(0, 0, 0, 0.35)` |
| `--shadow-lift` | `0 18px 48px rgba(0, 0, 0, 0.45)` |

### Paper (`[data-theme="paper"]`)

| Token | Value |
| --- | --- |
| `--bg` | `#F2EDDD` |
| `--bg-deep` | `#ECE5D2` |
| `--bg-2` | `#EFE8D5` |
| `--surface` | `#F7F2E2` |
| `--surface-2` | `#ECE5D2` |
| `--line` | `rgba(20, 14, 8, 0.07)` |
| `--line-strong` | `rgba(20, 14, 8, 0.20)` |
| `--fg` | `#1A140C` |
| `--fg-soft` | `#2A2316` |
| `--fg-dim` | `#4B4332` |
| `--muted` | `#6D6451` |
| `--muted-deep` | `#968B73` |
| `--accent` | `#B5491C` |
| `--accent-soft` | `rgba(181, 73, 28, 0.10)` |
| `--accent-deep` | `#8A3712` |
| `--gold` | `#9A7100` |
| `--success` | `#2C7D43` |
| `--info` | `#1F5F9E` |
| `--shadow-soft` | `0 8px 32px rgba(120, 100, 60, 0.16)` |
| `--shadow-lift` | `0 18px 48px rgba(120, 100, 60, 0.22)` |

### Ocean (`[data-theme="ocean"]`)

| Token | Value |
| --- | --- |
| `--bg` | `#0E1820` |
| `--bg-deep` | `#0A1218` |
| `--bg-2` | `#131F28` |
| `--surface` | `#182531` |
| `--surface-2` | `#1F2E3C` |
| `--line` | `rgba(220, 235, 248, 0.07)` |
| `--line-strong` | `rgba(220, 235, 248, 0.17)` |
| `--fg` | `#ECF3FA` |
| `--fg-soft` | `#DAE6F2` |
| `--fg-dim` | `#B4C5D7` |
| `--muted` | `#6E8499` |
| `--accent` | `#7AB7FF` |
| `--accent-soft` | `rgba(122, 183, 255, 0.16)` |
| `--accent-deep` | `#5E9CE0` |
| `--gold` | `#F0D27A` |
| `--success` | `#79CDA2` |

### Forest (`[data-theme="forest"]`)

| Token | Value |
| --- | --- |
| `--bg` | `#0C140E` |
| `--bg-deep` | `#080F0A` |
| `--bg-2` | `#111B14` |
| `--surface` | `#15211A` |
| `--surface-2` | `#1B2A21` |
| `--line` | `rgba(220, 240, 225, 0.07)` |
| `--line-strong` | `rgba(220, 240, 225, 0.17)` |
| `--fg` | `#ECF5EE` |
| `--fg-soft` | `#D8E5DC` |
| `--fg-dim` | `#B4C9BA` |
| `--muted` | `#708A78` |
| `--accent` | `#94D49A` |
| `--accent-soft` | `rgba(148, 212, 154, 0.14)` |
| `--accent-deep` | `#74B47D` |
| `--gold` | `#DCB658` |
| `--success` | `#94D49A` |

### Typography & motion

| Token | Value |
| --- | --- |
| `--font-mono` | `"JetBrains Mono", "Geist Mono", "SF Mono", ui-monospace, monospace` |
| `--font-serif` | `"Instrument Serif", "Cormorant Garamond", "Times New Roman", serif` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |

Base font: `font-mono` at `14px / 1.6`; OpenType features `"ss01", "cv11"`.
Section/hero titles use `--font-serif` italic, `clamp(32px, 4.5vw, 52px)` for
section titles and `clamp(48px, 7vw, 88px)` for the Hero name.

### Ambient effects

- **Body radial glow** (fixed, `pointer-events: none`, `z-index: 0`): two
  radial gradients — accent-soft top-right, gold 5% bottom-left.
- **Body grid overlay** (fixed, behind everything): two perpendicular
  `linear-gradient(var(--line) 1px, transparent 1px)` at `64px 64px`, `opacity: 0.5`.
- **Marquee fade-out edges**: mask-image gradient transparent→solid 8%→92%→transparent.
- **Project card shine**: diagonal white-6% gradient swept on hover.

## Layout shell

```
┌────────────────────────────────────────────────────────────┐
│ <html lang="fr"|"en" data-theme="default|paper|ocean|forest"> │
│ <body>                                                       │
│  ┌──────────┬─────────────────────────────────────────────┐ │
│  │ Sidebar  │ Topbar  (~/portfolio · current · ⌘K · clock) │ │
│  │  240px   │─────────────────────────────────────────────│ │
│  │  Brand   │                                             │ │
│  │  ─group─ │           VIEW (scrollable inner)           │ │
│  │  Home    │           max-width 1100px                  │ │
│  │  Work    │                                             │ │
│  │  Exper.  │           [scroll-hint] (sticky bottom)     │ │
│  │  Skills  │                                             │ │
│  │  Process │                                             │ │
│  │  Contact │                                             │ │
│  │  ─stat─  │                                             │ │
│  └──────────┴─────────────────────────────────────────────┘ │
│  + ProjectModal · CommandPalette (⌘K) · Cursor (dot + ring) │
│  + body::before (glow) · body::after (grid)                 │
└────────────────────────────────────────────────────────────┘
```

- Outer container `.app`: `display: grid; grid-template-columns: 240px 1fr;
  height: 100vh; overflow: hidden`.
- Below `880px`: stacks vertically (`grid-template-rows: 56px 1fr`); sidebar
  becomes a horizontal scrollable strip.
- View padding: `56px 80px 80px` desktop → `40px 40px 60px` ≤1100px →
  `24px 18px 60px` ≤600px.

## Routes

| ID | Sidebar label | Sidebar glyph | Badge | Topbar breadcrumb |
| --- | --- | --- | --- | --- |
| `home` | Home | `◇` | — | `home` |
| `work` | Selected work | `▸` | `8` | `selected-work` |
| `experience` | Experience | `≡` | — | `experience` |
| `skills` | Skills | `⌬` | — | `skills` |
| `process` | How I work | `✦` | — | `how-i-work` |
| `contact` | Contact | `@` | — | `contact` |

Sidebar groups: `workspace` (home/work/experience/skills/process), `connect`
(contact). Sidebar status block (desktop only): `status: available` (green dot),
`region: tnr · utc+3`, `paired with: claude-code` (accent color).

**Order** (`ROUTE_ORDER`) for forward/back navigation:
`home → work → experience → skills → process → contact`.

### Routing

- Hash-based: `window.location.hash = '#work'`, listens to `hashchange`.
- `history.replaceState(null, '', '#' + id)` on every nav so the back button
  walks the route history.
- `direction: 'up' | 'down'` tracked so the view-enter animation can mirror.

## Components

| Component | File | Responsibility |
| --- | --- | --- |
| `App` | `src/App.tsx` | Owns route state, direction, modal/cmd state, scroll-to-navigate listeners, scroll-reveal observer, keyboard arrows, theme bootstrap |
| `Sidebar` | `src/components/layout/Sidebar.tsx` | Brand mark, grouped nav rows, status block |
| `Topbar` | `src/components/layout/Topbar.tsx` | Breadcrumb, `⌘K` button, TNR clock (auto-updating every 30s) |
| `Cursor` | `src/components/cursor/Cursor.tsx` | Fixed dot + lerped ring; states `default | hover | label | text`; reads `[data-cursor][data-cursor-label]` attrs |
| `CommandPalette` | `src/components/cmdk/CommandPalette.tsx` | Modal with input, grouped results (Navigation, Quick, Projects), arrow-key nav, `⌘K` toggle |
| `ProjectModal` | `src/components/projects/ProjectModal.tsx` | Detail view: artwork, role/impact/stack columns, action buttons; `Escape` closes; locks body scroll |
| `ProjectArt` | `src/components/projects/artwork/ProjectArt.tsx` | Inline-SVG artwork, one branch per project id |
| `HomeView` | `src/views/HomeView.tsx` | Hero (greet/Reveal/tagline/role rotor/CTAs), avatar frame, Now-card, Stats grid, Marquee |
| `WorkView` | `src/views/WorkView.tsx` | 2-col project grid |
| `ExperienceView` | `src/views/ExperienceView.tsx` | Timeline with dot markers |
| `SkillsView` | `src/views/SkillsView.tsx` | 2×2 skill cards with lead pills + secondary chips |
| `ProcessView` | `src/views/ProcessView.tsx` | 5 numbered principles |
| `ContactView` | `src/views/ContactView.tsx` | Two-card grid: key/value card with copy buttons + pitch card |
| `LanguageProvider` | `src/i18n/LanguageProvider.tsx` | **Kept**; provides `{ locale, setLocale, content, t }` |
| `ThemeProvider` | `src/theme/ThemeProvider.tsx` | **Updated**; `{ theme: 'default'|'paper'|'ocean'|'forest', setTheme, cycle }`; toggles `data-theme` on `<html>` (removes attr for `default`) |

### UI primitives

| Component | File |
| --- | --- |
| `Reveal` (letter-by-letter) | `src/components/ui/Reveal.tsx` |
| `CountUp` | `src/components/ui/CountUp.tsx` |
| `Marquee` | `src/components/ui/Marquee.tsx` |
| `ScrollHint` (sticky next-view chip) | `src/components/ui/ScrollHint.tsx` |
| `Button` (`.btn` / `.btn-primary`) | `src/components/ui/Button.tsx` |
| `LanguageSwitcher` | `src/components/ui/LanguageSwitcher.tsx` (lives in sidebar status or topbar) |
| `ThemeSwitcher` | `src/components/ui/ThemeSwitcher.tsx` (segmented or cycle button) |

### Hooks

| Hook | Responsibility |
| --- | --- |
| `useTheme()` | Theme context accessor |
| `useLanguage()` | Locale + content accessor |
| `useScrollReveal(viewRef, route)` | IntersectionObserver against `.reveal, .proj-card, .skill-card, .tl-item, .process-item, .now-card, .stats-grid`; adds `.in` class with stagger delay |
| `useScrollToNavigate(viewRef, route, locked, navigate)` | Wheel + touch listeners; advances route only when a gesture **starts** at top/bot boundary and accumulates `> 90px`; locks for 850 ms after a nav |
| `useKeyboardArrows(navigate, locked)` | Page-up/down / arrow-up/down to move between routes when at scroll boundary |
| `useCmdK(toggle)` | `⌘/Ctrl+K` to toggle the command palette |
| `useHashRoute(setRoute)` | Reads/writes `window.location.hash`; subscribes to `hashchange` |
| `useReveal()` | Kept from current arch — still useful for one-off section reveals if needed |

## Content model

The existing typed-content system stays. Update `src/content/types.ts` to:

```ts
interface PortfolioContent {
  hero: HeroContent;          // greet, name, tagline, roles[], cta labels
  now: NowContent;            // headline + body + meta (label, period)
  stats: StatTile[];          // [{ n, suffix?, label }]
  marquee: string[];          // tech tokens
  projects: Project[];        // 8 entries (see below)
  experience: TimelineEntry[];// 7 entries
  skills: SkillCard[];        // 4 cards (Frontend, Backend, Data & Cloud, AI & Craft)
  process: ProcessPrinciple[];// 5 numbered principles
  contact: ContactContent;    // pitch + meta rows (languages here)
  ui: UiLabels;               // eyebrows, "Read case", "Visit live", "copy"/"copied", footer chips, etc.
}
```

- `content/fr.ts` becomes the source for new copy (Process principles, eyebrows,
  marquee labels translated where it makes sense, role rotor terms, etc.).
- `content/en.ts` mirrors the same shape; the original mockup copy is the EN baseline.
- `Education` and `spokenLanguages` types are **removed**.
- `Languages` content moves into `contact.languages: string[]` and is rendered
  as a row in the Contact card.

### Projects shape

```ts
interface Project {
  id: 'soka' | 'soka-live' | 'ludoka' | 'eer' | 'shoyo' | 'ocr' | 'happy' | 'theseis'
  num: string                // "01"…"08"
  name: string
  year: string               // "2025" or "2021–24"
  role: string               // "Lead Fullstack"
  client: string             // "YAS Madagascar"
  category: string           // "Platform · Web3"
  link: string | null        // "#" if none
  repo: string | null
  desc: string               // card summary
  tags: string[]
  detail: {
    role: string             // detailed role
    impact: string
    stack: string            // " · "-separated string
  }
}
```

### Experience timeline shape

```ts
interface TimelineEntry {
  year: string
  role: string
  company: string
  desc: string
  stack: string[]
}
```

## Data flow

### Boot

```
index.html
  ├─ <link rel="preconnect" href="https://fonts.googleapis.com">
  ├─ <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ├─ <link rel="stylesheet" href="…Geist+JetBrains+Mono+Instrument+Serif…">
  └─ inline theme bootstrap (anti-FOUC):
       const stored = localStorage['theme']
       const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
       const theme = stored || (prefersDark ? 'default' : 'paper')
       if (theme !== 'default') html.setAttribute('data-theme', theme)
main.tsx
  └─ <ThemeProvider><LanguageProvider><App/></LanguageProvider></ThemeProvider>
```

### Theme cycle

```
User clicks ThemeSwitcher (or runs `theme` in cmdk)
  └─ cycleTheme()
       ├─ next = ['default','ocean','forest','paper'][(idx + 1) % 4]
       ├─ if next === 'default'  → html.removeAttribute('data-theme')
       │  else                    → html.setAttribute('data-theme', next)
       └─ localStorage['theme'] = next
```

### Route navigation

```
1. User input source → route change:
   - Click sidebar row    → setRoute(id, dir = computed)
   - Click ⌘K item        → setRoute(id)
   - Hash change          → setRoute(hash)
   - Wheel/touch gesture  → useScrollToNavigate → next/prev route
   - Arrow / PageUp/Down  → useKeyboardArrows  → next/prev route
2. On change:
   - history.replaceState(null, '', '#' + id)
   - viewRef.current.scrollTop = 0
   - lock for 850 ms
   - re-key the .view container so React remounts → view-enter animation
   - direction sets .view-enter-down vs .view-enter-up
```

### Scroll-to-navigate (the trickiest piece)

Two rules from the mockup:
1. A wheel gesture only advances the route when it **starts** at the top
   (going up) or bottom (going down) boundary — not when it scrolls into one.
2. The accumulator resets when the gesture pauses (no wheel event for 180 ms).
3. Threshold: 90 px accumulated in the boundary direction triggers the nav.

For touch: `touchstart` records `{y, scrollTop, t}`; on `touchend`, if
`|dy| > 70` AND `dt < 700ms` AND `|view.scrollTop - startScrollTop| < 8`
(i.e., the gesture didn't actually scroll the inner view), navigate.

### Reveal animation

```
useScrollReveal:
  Wait 30 ms after route change → query selectors:
    .reveal, .proj-card, .skill-card, .tl-item, .process-item, .now-card, .stats-grid
  Strip .in from all matched elements
  Create IntersectionObserver(root: viewRef, threshold: 0.08, rootMargin: '0px 0px -8% 0px')
  When element enters:
    el.style.transitionDelay = `${Math.min(siblingIndex, 8) * 90}ms`
    el.classList.add('in')
    io.unobserve(el)
```

### Copy-to-clipboard

```
User clicks copy-btn next to a value
  └─ navigator.clipboard?.writeText(value)
  └─ setCopied(key) → render "✓ copied" (success color, 1400 ms)
  └─ setTimeout: setCopied(null)
```

### Custom cursor

- Disabled when `(hover: none) or (max-width: 880px)` matches.
- Two fixed divs at `z-index: 9999`; pointer-events none.
- Dot follows `mousemove` directly; ring lerps at 0.18 per RAF tick.
- `mouseover` listener inspects `e.target.closest(...)`:
  - `[data-cursor]` with `data-cursor-label` → state `label`, ring expands into a pill with the label.
  - `a, button, [role=button], .proj-card, .sb-row, .tb-search` → state `hover`.
  - `input, textarea, [contenteditable]` → state `text` (thin vertical bar).
  - Else → state `default`.
- `mouseleave`/`mouseenter` on `document` toggle opacity for fade out/in.

## Folder structure (delta from current)

```
src/
├── App.tsx                         (rewritten — route + view shell)
├── main.tsx                        (unchanged provider wiring; ThemeProvider updated)
├── index.css                       (rewritten — Tailwind + tokens + all the .sb-* / .view / .proj-card / .tl-* / .skill-card / .process-item / .cmdk / .modal / .marquee / .cursor-* / .reveal classes)
│
├── content/
│   ├── types.ts                    (updated — new shape; drop Education + Languages standalone)
│   ├── fr.ts                       (updated — add Process, Now, Stats, Marquee, UI labels)
│   ├── en.ts                       (updated — add same in English)
│   └── projects.ts                 (NEW — derived list with id/num/year/category/tags/detail)
│
├── i18n/                           (unchanged)
│   ├── LanguageProvider.tsx
│   ├── useLanguage.ts
│   └── ui.ts                       (extended with nav labels, ⌘K group labels, copy labels)
│
├── theme/
│   ├── ThemeProvider.tsx           (REWRITTEN — 4 themes, data-theme attribute)
│   ├── useTheme.ts                 (extended return shape)
│   └── themeBootstrap.ts           (NEW — string of the inline script used in index.html; keeps it co-located)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx             (NEW)
│   │   ├── Topbar.tsx              (NEW)
│   │   ├── ScrollHint.tsx          (NEW)
│   │   ├── Header.tsx              (DELETED — replaced by Sidebar+Topbar)
│   │   ├── Footer.tsx              (DELETED — no footer in new design)
│   │   ├── Section.tsx             (DELETED — replaced by view-level layout)
│   │   └── Container.tsx           (kept or inlined; mockup uses `.view-inner`)
│   ├── cursor/
│   │   └── Cursor.tsx              (NEW)
│   ├── cmdk/
│   │   ├── CommandPalette.tsx      (NEW)
│   │   └── commands.ts             (NEW — COMMANDS data)
│   ├── projects/
│   │   ├── ProjectCard.tsx         (NEW)
│   │   ├── ProjectModal.tsx        (NEW)
│   │   └── artwork/
│   │       ├── ProjectArt.tsx      (NEW — switch on id)
│   │       ├── SokaArt.tsx         (NEW)
│   │       ├── SokaLiveArt.tsx     (NEW)
│   │       ├── LudokaArt.tsx       (NEW)
│   │       ├── EerArt.tsx          (NEW)
│   │       ├── ShoyoArt.tsx        (NEW)
│   │       ├── OcrArt.tsx          (NEW)
│   │       ├── HappyArt.tsx        (NEW)
│   │       └── TheseisArt.tsx      (NEW)
│   ├── sections/                   (DELETED — all 8 section components removed)
│   └── ui/
│       ├── Reveal.tsx              (NEW — letter-by-letter)
│       ├── CountUp.tsx             (NEW)
│       ├── Marquee.tsx             (NEW)
│       ├── Button.tsx              (kept; restyled to `.btn` / `.btn-primary`)
│       ├── LanguageSwitcher.tsx    (kept; restyled)
│       ├── ThemeSwitcher.tsx       (NEW — replaces ThemeToggle; segmented or cycle)
│       ├── ThemeToggle.tsx         (DELETED)
│       ├── SocialLinks.tsx         (kept; used in Contact view if needed)
│       ├── Badge.tsx               (kept; restyled if used)
│       ├── Card.tsx                (kept; restyled)
│       └── DownloadCvButton.tsx    (kept; rendered as 3rd Home CTA)
│
├── views/                          (NEW — replaces components/sections/)
│   ├── HomeView.tsx
│   ├── WorkView.tsx
│   ├── ExperienceView.tsx
│   ├── SkillsView.tsx
│   ├── ProcessView.tsx
│   └── ContactView.tsx
│
├── hooks/
│   ├── useReveal.ts                (kept for reference; may not be used)
│   ├── useScrollSpy.ts             (DELETED — no scroll spy in new shell)
│   ├── useScrollReveal.ts          (NEW)
│   ├── useScrollToNavigate.ts      (NEW)
│   ├── useKeyboardArrows.ts        (NEW)
│   ├── useCmdK.ts                  (NEW)
│   └── useHashRoute.ts             (NEW)
│
└── lib/
    ├── constants.ts                (updated — ROUTE_ORDER, contact links)
    └── utils.ts                    (unchanged — cn helper)
```

## Configuration changes

### `index.html`

Add the Google Fonts preconnects and stylesheet at the top of `<head>`, before
the inline theme bootstrap:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300..700&display=swap">

<script>
  /* Anti-FOUC theme bootstrap — runs before React */
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
      var t = stored || (prefersDark ? 'default' : 'paper');
      if (t !== 'default') document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
  })();
</script>
```

Default `<html lang="fr">`; `LanguageProvider` updates it on switch.

### `src/index.css`

```css
@import 'tailwindcss';

@theme {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-accent: var(--accent);
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --font-serif: "Instrument Serif", serif;
}

/* All :root and [data-theme="..."] custom properties from the mockup */
/* All component classes from the mockup verbatim:
   .app, .sidebar, .sb-*, .topbar, .tb-*, .view, .view-inner, .view-enter,
   .eyebrow, .section-title, .section-sub,
   .home-hero, .home-name, .home-tagline, .home-roles, .home-rotor, .home-actions, .home-grid,
   .avatar-frame, .avatar-tag, .now-card, .stats-grid, .stat-tile, .marquee, .marquee-track,
   .work-grid, .proj-card, .modal-bg, .modal, .modal-body,
   .timeline, .tl-item, .tl-year, .tl-role, .tl-co, .tl-desc, .tl-stack,
   .skill-cards, .skill-card,
   .process-list, .process-item, .process-num, .process-content,
   .contact-grid, .contact-card, .contact-pitch,
   .cmdk-bg, .cmdk, .cmdk-input, .cmdk-list, .cmdk-grp, .cmdk-item, .cmdk-foot,
   .deco-corner, .stg-1..stg-8, .reveal, .nav-lock, .scroll-hint,
   .cursor-dot, .cursor-ring,
   @keyframes orbit, blink, viewEnter, viewEnterDown, viewEnterUp, marquee, navSweep,
                bounce, charIn, cardIn,
   @media (prefers-reduced-motion: reduce) overrides,
   @media (hover: hover) and (pointer: fine) → html, body, button, a, input { cursor: none; }
*/
```

Tailwind v4 stays for utilities, but most of the heavy lifting is custom CSS.

### `vite.config.ts`

No change. (`base` setting depends on user-page vs project-page deployment.)

### Deps

**No new runtime dependencies.** All animations are CSS + RAF; the command
palette is hand-rolled (no `cmdk` library); the modal is in-tree (no
`@headlessui/react`); icons are inline glyphs / SVG.

## Accessibility

| Concern | Plan |
| --- | --- |
| Landmarks | `<aside>` (sidebar), `<main>` (main pane), each view starts with an `<h2>` (`.section-title`). One `<h1>` per page — the Hero name on Home |
| Focus | All `.sb-row`, `.btn`, `.tb-search`, `.proj-card` are buttons or anchors with native focus rings; custom cursor does **not** replace focus styles |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all entrance/letter/scroll animations and forces final visible state |
| ARIA | `home-rotor` is `aria-live="polite"`; copy buttons toggle to "✓ copied" text (announces); cmdk input has `placeholder` and arrow-key contract |
| Keyboard | Arrow keys navigate routes when at scroll boundaries; `⌘/Ctrl+K` opens cmdk; `Escape` closes modal/cmdk; `Enter` runs active cmdk item |
| Color contrast | All foreground/background pairs from the mockup tested at WCAG AA; `Paper` palette is the light-mode equivalent and must pass AA |

## Non-functional targets

- **Performance:** Lighthouse ≥ 95. Font display `swap`, only one external
  network call (Google Fonts CSS), no bundler-blocking JS, custom cursor
  uses `transform: translate3d` for compositor-only updates.
- **Accessibility:** Lighthouse a11y ≥ 95; manual screen reader pass on Home and Contact.
- **Bundle:** Inline SVG artwork keeps the bundle small (no image hosting); estimate < 220 KB JS gzipped.
- **First load:** < 1.5 s broadband; fonts arrive after first paint via `font-display: swap`.

## Out of scope for this feature

- Tweaks panel (mockup-only host integration).
- Real-time analytics (PostHog, etc.).
- Per-project deep-link routes (e.g., `#work/soka`). Future enhancement; today the modal is in-page state.
- Mobile/tablet rendering of the custom cursor.

## Cross-references

- [`../overview.md`](../overview.md) — vision/goals (unchanged)
- [`../folder-structure.md`](../folder-structure.md) — folder layout (updated to reference this feature for new dirs)
- [`../components.md`](../components.md) — high-level component breakdown (updated)
- [`../data-flow.md`](../data-flow.md) — flows (updated to reference this feature for new flows)
- [`../tech-stack.md`](../tech-stack.md) — fonts added
- [`../configuration.md`](../configuration.md) — `data-theme` attribute model
- [`../dev-guide.md`](../dev-guide.md) — content update notes
