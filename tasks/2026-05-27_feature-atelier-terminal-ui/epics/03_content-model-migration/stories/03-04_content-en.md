# 03-04 · `en.ts` — populate from mockup + drop removed slices

**Status:** TODO · **Size:** L · **Blocked by:** 03-01

## Description

Update `src/content/en.ts` to match the new `PortfolioContent` shape. Use the
mockup's React source as the baseline for all English copy (it's already
written in English).

## Files affected

- `src/content/en.ts` — rewritten / extended.

## Implementation notes

Reference: `/tmp/script-37f20218.js` lines 114–171 (TIMELINE, SKILLS, PROCESS),
and the JSX strings inside HomeView (lines 553+), WorkView (799+),
ExperienceView (906+), SkillsView (935+), ProcessView (967+), ContactView
(994+).

Verbatim entries to mirror:

- `hero.greet`: "Hello — currently available for new work · Q3 2026"
- `hero.rolesLabel`: "also a —"
- `hero.roles`: ["interface designer", "systems thinker", "OCR & AI tinkerer", "realtime engineer", "ludo champion"]
- `hero.tagline`: "Fullstack engineer based in **Antananarivo, Madagascar**. Seven years writing software that needs to feel as good as it works — from a Malagasy bank's online onboarding to a *USDC-powered points economy* at YAS. I write the backend, design the frontend, and care about the inch between them."
- `hero.ctaPrimary`: "See selected work"
- `hero.ctaSecondary`: "Get in touch"
- `hero.ctaCv`: "Download CV"

- `now.label`: "Now building"
- `now.body`: "**SOKA · Ludoka** — a points economy where you can *buy, play, earn, spend* in one wallet. USDC + an internal point system, realtime everywhere."
- `now.meta1`: "YAS Madagascar"
- `now.meta2`: "2025 — present"

- `stats[]`:
  - `{ n: 7, label: "years shipping" }`
  - `{ n: 8, suffix: "+", label: "flagship projects" }`
  - `{ n: 12, label: "frameworks shipped" }`
  - `{ n: 3, label: "languages spoken" }`

- `marquee[]`: ["React", "Next.js", "NestJS", "TypeScript", "Angular", "Symfony", "PostgreSQL", "MongoDB", "Blockchain", "OpenAI", "Realtime", "Docker", "Figma", "Claude Code"]

- `experience[]`: 7 entries from mockup TIMELINE, verbatim.

- `skills[]`: 4 cards from mockup SKILLS, verbatim (deco letters "F", "B", "D", "A").

- `process[]`: 5 principles from mockup PROCESS, verbatim.

- `contact`:
  - `emailLabel: "Email"`, `whatsappLabel: "WhatsApp"`, `basedInLabel: "Based in"`,
    `basedIn: "Antananarivo, Madagascar · UTC+3"`
  - `languagesLabel: "Languages"`, `languages: ["Malagasy", "Français", "English"]`
  - `availableLabel: "Available"`, `availability: "open · remote, contract or full-time"`
  - `pitchTitle: "What I'm looking for next."`
  - `pitchBody1: "A team that ships, a product I care about, and a problem with enough substance to keep me curious. I'm open to **fintech, gaming, AI** — anywhere I can write code that earns its place."`
  - `pitchBody2: "If that sounds like you, drop me a line. Tell me what you're building, and how I might fit."`
  - `pitchSignoff: "— Erick"`

## Acceptance criteria

- [ ] `en.ts` exports `enContent: PortfolioContent`.
- [ ] No `education` / `spokenLanguages` fields remain.
- [ ] All copy strings match the mockup source verbatim (em-dash `—`, em
      `*emphasis*`, strong `**strong**` markers preserved).
- [ ] `npm run build` passes.
- [ ] Parity test (story 03-06) passes.

## Test notes

Covered by 03-06.

## Edge cases

- The tagline's `<strong>` and `<em>` markers in mockup JSX become `**…**` and
  `*…*` markdown markers in the data; the view component parses them into
  the appropriate `<strong>`/`<em>` tags. Document this convention in
  `types.ts` (story 03-01) header comment.
