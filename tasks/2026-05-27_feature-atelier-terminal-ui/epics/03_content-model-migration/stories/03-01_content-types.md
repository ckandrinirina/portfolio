# 03-01 · `types.ts` — new content shape

**Status:** TODO · **Size:** M · **Blocked by:** —

## Description

Rewrite `src/content/types.ts` so the `PortfolioContent` interface matches the
Atelier Terminal UI. Drop `education` and `spokenLanguages` (top-level).
Add `now`, `stats`, `marquee`, `process`, `contact.languages`. Reshape `hero`
and `skills`. Keep `experience` and `projects` (with project shape extended).

## Files affected

- `src/content/types.ts` — rewritten.
- `src/content/types.test.ts` — updated to reflect the new shape's required keys.

## Implementation notes

```ts
// src/content/types.ts

export interface HeroContent {
  greet: string             // e.g. "Hello — currently available for new work · Q3 2026"
  nameFirst: string         // "Erick"
  nameLast: string          // "Andrinirina"
  tagline: string           // full paragraph; can use **strong** + *em* markers parsed by view
  rolesLabel: string        // "also a —"
  roles: string[]           // ["interface designer", ...]
  ctaPrimary: string        // "See selected work"
  ctaSecondary: string      // "Get in touch"
  ctaCv: string             // "Download CV"
}

export interface NowContent {
  label: string             // "Now building"
  body: string              // markdown-ish
  meta1: string             // "YAS Madagascar"
  meta2: string             // "2025 — present"
}

export interface StatTile {
  n: number                 // animated count target
  suffix?: string           // optional "+", "k", etc.
  label: string             // "years shipping"
}

export interface TimelineEntry {
  year: string              // "2025 — Present"
  role: string              // "Fullstack Developer"
  company: string           // "SOKA · YAS Madagascar"
  desc: string              // 1-3 sentences
  stack: string[]           // ["Next.js 14", "NestJS", ...]
}

export interface SkillCard {
  cat: string               // "Frontend"
  deco: string              // single letter background deco
  lead: string[]            // pill chips
  items: string[]           // outline chips
}

export interface ProcessPrinciple {
  n: string                 // "01" .. "05"
  title: string
  body: string
}

export interface ContactContent {
  emailLabel: string        // "Email"
  whatsappLabel: string     // "WhatsApp"
  basedInLabel: string      // "Based in"
  basedIn: string           // "Antananarivo, Madagascar · UTC+3"
  languagesLabel: string    // "Languages"
  languages: string[]       // ["Malagasy", "Français", "English"]
  availableLabel: string    // "Available"
  availability: string      // "open · remote, contract or full-time"
  pitchTitle: string
  pitchBody1: string
  pitchBody2: string
  pitchSignoff: string      // "— Erick"
}

export interface PortfolioContent {
  hero:       HeroContent
  now:        NowContent
  stats:      StatTile[]    // exactly 4
  marquee:    string[]      // tech tokens
  experience: TimelineEntry[]
  skills:     SkillCard[]   // exactly 4 cards (Frontend, Backend, Data & Cloud, AI & Craft)
  process:    ProcessPrinciple[]  // exactly 5
  contact:    ContactContent
}
```

Note: project content (id, num, year, name, role, client, category, desc, tags, detail)
lives in `src/content/projects.ts` separately — language-neutral — so it isn't
duplicated across `fr.ts` and `en.ts`. (Project descriptions / impact / role
strings could be localized later if needed; this iteration keeps them English-
only per the mockup, since they're code-flavored. Document this decision in
the story.)

## Acceptance criteria

- [ ] All interfaces above are defined and exported.
- [ ] No `Education`, `SpokenLanguage` types remain.
- [ ] `PortfolioContent` does not have `education` or `spokenLanguages` fields.
- [ ] `npm run build` passes (TS compilation).
- [ ] Updated `types.test.ts` asserts the shape via a `satisfies` check on
      a minimal fixture (this gives a TS-level + runtime check).

## Test notes

Existing `types.test.ts` from old plan story 04-01 will be updated. Use a
`const FIXTURE: PortfolioContent = { ... } satisfies PortfolioContent` and
runtime `expect(FIXTURE.hero.greet).toBeTypeOf('string')` for the key paths.

## Edge cases

- If a deeper localization need arises later, project descriptions can move
  back to FR/EN modules; the type is intentionally separated now for clarity.
