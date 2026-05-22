# Implementation Roadmap: Erick Andrinirina — Personal Portfolio

## Dependency Graph

```
Epic 01 Foundation & Tooling
  └─► everything

Epic 02 UI Primitives & Hooks ──┐
Epic 03 Theming ────────────────┤
Epic 04 i18n & Content ─────────┴─► Epic 05 App Shell ─► Epic 06 Sections (06-09)
                                                              │
Epic 07 Assets & SEO ─────────────────────────────────────────┤
                                                              ▼
                                              Epic 08 Deploy ─► Epic 09 QA (09-05)

Epic-level edges:
  01 → 02, 03, 04, 07
  02 → 05, 06        (Section, Button, Badge, Card, SocialLinks, hooks)
  03 → 05            (ThemeToggle, ThemeProvider)
  04 → 05, 06        (LanguageProvider/Switcher, content, DownloadCvButton)
  05 → 06            (App shell)
  06 (06-09) → 08, 09
  07 → 09 (09-05)
  08 (08-01) → 09 (09-05)
```

## Recommended Implementation Order

### Phase 1: Foundation
**Goal:** A project that compiles, lints, tests, and builds to `dist/`.

1. **01-01** — Scaffold Vite + React 19 + TypeScript (S) — nothing builds without it.
2. **01-02** — Configure Tailwind CSS v4 (S) — styling baseline for all components.
3. **01-03** — Configure ESLint 9 + Prettier (S) — quality gate, independent.
4. **01-04** — Configure Vitest + Testing Library (M) — required by every `*.test` story.
5. **01-05** — Finalize Vite base path & npm scripts (S) — deployment-critical `base`.

### Phase 2: Core Systems (parallelizable)
**Goal:** Reusable primitives, theming, and bilingual content — three mostly independent tracks.

1. **02-01 → 02-10** — UI primitives & hooks (utils/constants, tokens, Container, Button, Badge, Card, useReveal, useScrollSpy, Section, SocialLinks).
2. **03-01 → 03-03** — Theming (ThemeProvider/useTheme, anti-FOUC script, ThemeToggle). 03-03 needs 02-04 (Button).
3. **04-01 → 04-08** — i18n & content (types → fr/en/ui labels → LanguageProvider → Switcher, parity test, DownloadCvButton). Content authoring (04-02/04-03) can run while UI primitives are built.

### Phase 3: App Shell
**Goal:** A booting page with header, footer, and ordered section slots.

1. **05-01** — main.tsx provider wiring (S) — needs 03-01 + 04-05.
2. **05-02** — Header (L) — needs useScrollSpy, ThemeToggle, LanguageSwitcher, nav constants.
3. **05-03** — Footer (M) — needs SocialLinks.
4. **05-04** — App.tsx shell (M) — needs Header + Footer.

### Phase 4: Content Sections (fan-out)
**Goal:** All eight sections rendering bilingual content, wired to the nav.

1. **06-01 … 06-08** — Hero, About, Skills, Experience, Projects, Education, Languages, Contact — independent of each other; each needs LanguageProvider (04-05), Section (02-09), and its specific primitive.
2. **06-09** — Wire sections into App + scrollspy nav (S) — convergence point; needs all sections + 05-04.

### Phase 5: Assets, SEO & Deployment
**Goal:** Professional shareable link, downloadable CV, automated publish.

1. **07-01 / 07-02** — CV PDF + presence check; favicon/profile/OG image (can start in Phase 1, only need scaffold).
2. **07-03** — index.html SEO metadata (M) — needs OG image.
3. **08-01** — GitHub Actions Pages workflow (M) — needs build (01-05) + assembled site (06-09).
4. **08-02** — README + Pages setup docs (S).

### Phase 6: Quality Gate
**Goal:** Meet the Definition of Done.

1. **09-01 / 09-02 / 09-03 / 09-04** — a11y, responsiveness, reduced-motion, privacy (all need 06-09; independent of each other).
2. **09-05** — Lighthouse performance & SEO audit (M) — needs a11y + responsiveness + SEO (07-03) + deploy (08-01).

## Parallelization Opportunities
- **Epics 02, 03, 04 overlap** after Phase 1 — primitives, theming, and content authoring share no files.
- **Content authoring (04-02 FR / 04-03 EN)** can proceed in parallel with all UI primitive work.
- **Assets (07-01, 07-02)** can be produced any time after the scaffold — they only need `public/`.
- **The eight sections (06-01…06-08)** are a clean fan-out — ideal for `/ck-code:parallel-build` once 04-05 and 02-09 land.
- **QA stories 09-01…09-04** run in parallel once the site is assembled (06-09).

## Critical Path
The longest sequential chain:

```
01-01 → 01-02 → 04-01 → 04-02/04-03 → 04-05 → 06-01..06-08 → 06-09 → 08-01 → 09-05
```
(Foundation → Tailwind → content types → content data → LanguageProvider → sections → wiring → deploy → Lighthouse audit.)

## Risk Areas
| Risk | Impact | Mitigation |
|------|--------|------------|
| Wrong `base` path for the deployment target | High | Decide user-page vs project-page early (01-05); reference assets via `import.meta.env.BASE_URL`; smoke-test the deployed URL. |
| EN/FR content drift / missing fields | Medium | Single `PortfolioContent` interface (04-01) makes gaps a compile error; parity test (04-07) enforces array-length parity. |
| Theme flash of incorrect colors (FOUC) | Medium | Anti-FOUC inline bootstrap script (03-02) whose precedence matches `ThemeProvider` (03-01). |
| Full home address leaking into output | High | Location is city/country only across content; privacy check over `dist/` in CI (09-04). |
| Lighthouse misses ≥ 95 target | Medium | Optimize OG/profile images (07-02), zero-runtime Tailwind, a11y + responsive passes (09-01/09-02) before the audit (09-05). |
| Missing CV PDF ships a 404 | Low | Build-time presence check fails loudly (07-01); post-deploy smoke test. |
| GitHub/LinkedIn URLs unknown (`[TO BE DEFINED]`) | Low | `SocialLinks` omits empty links gracefully; fill in `lib/constants` when provided. |

## Milestones
| Milestone | Epics Included | Deliverable |
|-----------|----------------|-------------|
| M1 — Toolchain ready | Epic 01 | Project compiles, lints, tests, and builds to `dist/`. |
| M2 — Systems ready | Epics 02, 03, 04 | Primitives, working theme toggle, bilingual content + language switch (in isolation). |
| M3 — Shell assembled | Epic 05 | Booting page with header (nav/toggles), footer, and section slots. |
| M4 — Feature complete | Epic 06 | All eight sections render bilingual content with working nav highlighting. |
| M5 — Live | Epics 07, 08 | CV download, SEO/social preview, auto-deployed to GitHub Pages. |
| M6 — Polished & verified | Epic 09 | WCAG-AA-intent a11y, responsive, private, Lighthouse ≥ 95 — Definition of Done met. |
