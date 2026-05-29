# Implementation Roadmap: Atelier Terminal UI

Feature redesign of the Erick Andrinirina portfolio. Builds on the preserved
foundation from `tasks/2026-05-22_personal-portfolio/` (Vite/React/TS scaffold,
Vitest, i18n machinery, CV asset, SEO metadata — all DONE).

## Dependency Graph

```
Epic 01 Foundation: Tokens, Theme & Content
  01-01 Global stylesheet + tokens + fonts ──┬─► 01-02 Theme system rewrite
                                             ├─► 02-02 UI primitives
                                             ├─► 02-03 Layout chrome
                                             ├─► 03-01 Project showcase
                                             ├─► 03-02 Global overlays
                                             ├─► 03-03 HomeView
                                             └─► 03-04 Remaining views
  01-03 Content model ───────────────────────┴─► (02-03, 03-01..03-04)

Epic 02 Shell & Interaction Layer
  02-01 Interaction hooks ─────────► 03-02 (useCmdK), 04-01 (all hooks)
  02-02 UI primitives ─────────────► 03-01, 03-03, 03-04, 02-03
  02-03 Sidebar + Topbar ──────────► 04-01

Epic 03 Content Surfaces & Overlays
  03-01 Project showcase + WorkView ┐
  03-02 CommandPalette + Cursor     ├─► 04-01 App integration
  03-03 HomeView                    │
  03-04 Experience/Skills/Process/Contact views ┘

Epic 04 Integration & QA
  04-01 App.tsx integration + teardown ─► 04-02 a11y/responsive ─► 04-03 Lighthouse

Epic-level edges:
  01 → 02, 03
  02 → 03, 04
  03 → 04
```

## Recommended Implementation Order

### Phase 1: Foundation (mostly serial at the start, then fan-out)

**Goal:** Tokens, theme machinery, and the new content shape in place — the base
layer every surface depends on.

1. **01-01** — Global stylesheet rewrite (XL) — index.css tokens + all mockup
   classes + Google Fonts. Unblocks nearly everything; do this first.
2. **01-03** — Content model update (XL) — independent of CSS; can run in parallel
   with 01-01.
3. **01-02** — Theme system rewrite (L) — needs the `[data-theme]` tokens from 01-01.

### Phase 2: Shell & Interaction (parallelizable)

**Goal:** Reusable hooks and leaf chrome — the navigational skeleton.

1. **02-01** — Routing & interaction hooks (XL) — pure logic, no CSS/content dep;
   can start as early as Phase 1.
2. **02-02** — UI primitives (L) — needs 01-01 classes.
3. **02-03** — Sidebar + Topbar (L) — needs 01-01, 01-02 (ThemeSwitcher), 01-03 (labels).

### Phase 3: Content Surfaces (fan-out)

**Goal:** Every view, the project showcase, and the global overlays rendering real
bilingual content.

1. **03-01** — Project showcase + WorkView (XL) — needs 01-01, 01-03, 02-02.
2. **03-03** — HomeView (XL) — needs 01-01, 01-03, 02-02. Richest view.
3. **03-04** — Experience/Skills/Process/Contact views (XL) — needs 01-01, 01-03, 02-02.
4. **03-02** — CommandPalette + Cursor (L) — needs 01-01, 01-03, 02-01 (useCmdK).

### Phase 4: Integration & Quality Gate

**Goal:** Assemble the shell, remove the old design, meet the Definition of Done.

1. **04-01** — App.tsx integration + obsolete-file teardown (XL) — convergence point;
   needs all hooks, chrome, views, and overlays.
2. **04-02** — Accessibility, reduced-motion & responsiveness pass (L) — needs 04-01.
3. **04-03** — Lighthouse performance & SEO audit (M) — final gate; needs 04-02.

## Parallelization Opportunities

- **After 01-01 lands:** 01-02, 02-02 can begin; 01-03 and 02-01 need no CSS at all
  and can run from the very start.
- **Phase 3 fan-out:** 03-01, 03-03, 03-04 are mutually independent (different files);
  03-02 only adds the overlay layer. Up to 4 stories in parallel.
- **Convergence:** 04-01 is the single integration point — it cannot start until all
  of Epic 03 plus 02-01/02-03 are merged and stable.

## Critical Path

`01-01 → 01-02 → 02-03 → 04-01 → 04-02 → 04-03`

The longest dependency chain. 01-03, 02-01, 02-02 and the 03-xx surfaces hang off
01-01 and feed into 04-01 but do not extend the critical path if built in parallel.
