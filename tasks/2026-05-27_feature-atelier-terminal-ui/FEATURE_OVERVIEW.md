# Feature — Atelier Terminal UI

**Date:** 2026-05-27
**Slug:** `feature-atelier-terminal-ui`
**Mode:** ADD FEATURE
**Spec input:** [`docs/specs/2026-05-22_personal-portfolio/Erick Andrinirina - Portfolio.html`](../../docs/specs/2026-05-22_personal-portfolio/Erick%20Andrinirina%20-%20Portfolio.html)
**Architecture source of truth:** [`docs/architecture/features/2026-05-27_atelier-terminal-ui.md`](../../docs/architecture/features/2026-05-27_atelier-terminal-ui.md)

## Why

The current portfolio (built by `tasks/2026-05-22_personal-portfolio/`, epics
01–07 all DONE) is a long scrolling page with 8 sections, a sticky header,
footer, and a `dark`-class light/dark toggle. The owner wants to swap the
visual layer to the **Atelier Terminal** design from the HTML mockup — a fixed
240px sidebar + main view container with route-based navigation, a 4-palette
theme system via `[data-theme]`, command palette, project detail modals,
animated micro-interactions, and a custom cursor. The directive is to apply the
UI **exactly as designed** (no color changes, no re-interpretation).

This feature swaps the visual shell while preserving everything that's
data-shaped: the FR/EN content system, the typed content modules, the CV
asset, brand assets, build/deploy plumbing, and lint/test setup.

## What ships

- A new sidebar + main shell with six hash-routed views: **Home · Selected
  work · Experience · Skills · How I work · Contact**.
- Four palettes (Ember default, Paper light, Ocean dark blue, Forest dark
  green) selected via `[data-theme]` on `<html>`, defaulting to system
  preference, persisted to `localStorage`.
- Scroll-to-navigate (release wheel between gestures), keyboard arrow / Page
  navigation, hash routing, and `⌘/Ctrl+K` command palette.
- Project gallery with hand-drawn inline-SVG artwork per project and a click
  modal showing role / impact / stack.
- Custom dot+ring cursor for hover-capable devices.
- Letter-by-letter hero name reveal, animated count-ups, infinite marquee
  strip, intersection-observed scroll reveals.
- Full FR/EN parity (the mockup ships English copy; we translate to French).

## Affected existing components

| Path                                          | Action                                     | Notes                                                                |
|-----------------------------------------------|--------------------------------------------|----------------------------------------------------------------------|
| `src/App.tsx`                                 | **Rewritten** (Epic 06 + 11)               | Becomes the route + view + modal + cmd-k shell                       |
| `src/main.tsx`                                | Re-wired (Epic 11)                         | Same providers, but ThemeProvider is the new 4-palette one           |
| `src/index.css`                               | **Replaced** (Epic 01)                     | All palettes, ambient effects, animations, component classes verbatim |
| `src/theme/ThemeProvider.tsx`                 | **Rewritten** (Epic 02)                    | 4-palette via `data-theme` attribute                                 |
| `src/theme/useTheme.ts`                       | Updated (Epic 02)                          | Return `{ theme, setTheme, cycle }`                                  |
| `src/theme/themeBootstrap.ts`                 | **New / replaces inline** (Epic 02)        | Anti-FOUC bootstrap source                                           |
| `src/components/ui/ThemeToggle.tsx`           | **Deleted** (Epic 02)                      | Replaced by `ThemeSwitcher.tsx`                                      |
| `src/components/layout/Header.tsx`            | **Deleted** (Epic 11)                      | Replaced by `Sidebar` + `Topbar`                                     |
| `src/components/layout/Footer.tsx`            | **Deleted** (Epic 11)                      | No footer in the new shell                                           |
| `src/components/layout/Section.tsx`           | **Deleted** (Epic 11)                      | Replaced by `.view-inner` + per-view section header utilities        |
| `src/components/sections/*` (all 8 files)     | **Deleted** (Epic 11)                      | Replaced by `src/views/*View.tsx`                                    |
| `src/hooks/useScrollSpy.ts`                   | **Deleted** (Epic 11)                      | No scroll-spy in the new shell                                       |
| `src/hooks/useReveal.ts`                      | Kept (legacy)                              | New `useScrollReveal` covers the new flow                            |
| `src/i18n/LanguageProvider.tsx`               | Kept                                       | Untouched                                                            |
| `src/i18n/useLanguage.ts`                     | Kept                                       | Untouched                                                            |
| `src/i18n/ui.ts`                              | Extended (Epic 03)                         | Add cmd-k labels, copy/copied, route names                           |
| `src/content/types.ts`                        | **Updated shape** (Epic 03)                | Drop `education`, `spokenLanguages`; add `now`, `stats`, `marquee`, `process`, `contact.languages` |
| `src/content/fr.ts` · `src/content/en.ts`     | **Updated content** (Epic 03)              | Translate / write new copy; drop old slices                          |
| `src/components/ui/Button.tsx`                | Kept                                       | Restyled to `.btn` / `.btn-primary` via CSS                          |
| `src/components/ui/Badge.tsx` · `Card.tsx`    | Kept                                       | Available for use inside views                                       |
| `src/components/ui/SocialLinks.tsx`           | Kept                                       | Optional use in Contact                                              |
| `src/components/ui/DownloadCvButton.tsx`      | Kept                                       | Rendered as 3rd Home CTA                                             |
| `src/components/ui/LanguageSwitcher.tsx`      | Kept; restyled                             | Placement: sidebar status row or topbar (decided in Epic 09)         |
| `src/lib/constants.ts`                        | Extended (Epic 06)                         | Add `ROUTE_ORDER`, `ROUTE_NEXT_LABEL`                                |
| `src/lib/utils.ts`                            | Kept                                       | `cn()` helper still used                                             |
| `index.html`                                  | Extended (Epic 01 + 11)                    | Preconnect, Google Fonts, anti-FOUC inline bootstrap script          |
| `public/profile.jpg`, `public/og-image.png`   | Kept                                       | Profile photo referenced by HomeView via `<img>`                     |
| `public/cv/erick-andrinirina-cv.pdf`          | Kept                                       | Linked from Home CTA                                                 |

## New components introduced

| Component / Hook                                           | Epic     |
|------------------------------------------------------------|----------|
| `src/components/layout/Sidebar.tsx`                        | 05       |
| `src/components/layout/Topbar.tsx`                         | 05       |
| `src/components/layout/ScrollHint.tsx`                     | 05       |
| `src/components/cursor/Cursor.tsx`                         | 04       |
| `src/components/cmdk/CommandPalette.tsx`                   | 10       |
| `src/components/cmdk/commands.ts`                          | 10       |
| `src/components/projects/ProjectCard.tsx`                  | 08       |
| `src/components/projects/ProjectModal.tsx`                 | 08       |
| `src/components/projects/artwork/ProjectArt.tsx` + 8 SVGs  | 08       |
| `src/components/ui/Reveal.tsx`                             | 04       |
| `src/components/ui/CountUp.tsx`                            | 04       |
| `src/components/ui/Marquee.tsx`                            | 04       |
| `src/components/ui/ThemeSwitcher.tsx`                      | 02       |
| `src/views/HomeView.tsx`                                   | 07       |
| `src/views/WorkView.tsx`                                   | 08       |
| `src/views/ExperienceView.tsx`                             | 09       |
| `src/views/SkillsView.tsx`                                 | 09       |
| `src/views/ProcessView.tsx`                                | 09       |
| `src/views/ContactView.tsx`                                | 09       |
| `src/content/projects.ts`                                  | 03       |
| `src/hooks/useScrollReveal.ts`                             | 04       |
| `src/hooks/useScrollToNavigate.ts`                         | 06       |
| `src/hooks/useKeyboardArrows.ts`                           | 06       |
| `src/hooks/useCmdK.ts`                                     | 10       |
| `src/hooks/useHashRoute.ts`                                | 06       |

## Integration points with the existing system

- **LanguageProvider** continues to provide `{ locale, content, t }`. All new
  views consume it via `useLanguage()`.
- **Theme bootstrap** moves from `dark` class to `data-theme` attribute, but
  keeps the same `localStorage['theme']` key. First-load value migrates
  silently (`'dark'` → `'default'`, `'light'` → `'paper'` if those legacy
  values are encountered).
- **Build/deploy plumbing** is reused: same `vite.config.ts`, same
  `package.json` scripts, same ESLint/Prettier/Vitest configs.
- **Content modules** are reshaped, not replaced — same FR/EN parity test
  pattern from old story `04-07` continues to apply.
- **Existing assets** in `public/` are reused. The profile photo replaces the
  mockup's `<image-slot>` placeholder.

## Out of scope

- Per-project deep-link routes (`#work/<slug>`). Today the modal is in-page state.
- Real-time analytics, PostHog, etc.
- Custom domain on GitHub Pages.
- Mobile/tablet rendering of the custom cursor (intentionally disabled below 880px).
- TWEAKS panel (Claude bundler host-only — not part of the production app).

## Decisions encoded (from `/ck-code:design`)

| Decision                | Choice                                                                                |
|-------------------------|----------------------------------------------------------------------------------------|
| i18n                    | Keep FR/EN; translate all new copy; default locale `fr`                                |
| Theme model             | 4 palettes via `[data-theme]`; default = Ember (warm dark)                             |
| Initial theme           | `localStorage['theme']` → `prefers-color-scheme: dark` → `default` else `paper`        |
| Education section       | Dropped (not in mockup)                                                                |
| Spoken languages        | Folded into Contact card as a row                                                      |
| CV download             | Third Home CTA (secondary `.btn`)                                                      |
| Custom cursor           | Kept; disabled on touch / ≤880px                                                       |
| Profile photo           | `<img src="/profile.jpg">` (replaces mockup `<image-slot>`)                            |

## Relationship to the prior plan (`tasks/2026-05-22_personal-portfolio/`)

| Old story                              | New status after this feature                                              |
|----------------------------------------|-----------------------------------------------------------------------------|
| 01-01 … 01-05 (foundation)             | Reused as-is                                                                |
| 02-01 utils                            | Kept                                                                        |
| 02-02 design tokens                    | **Extended** in new Epic 01 (palettes & motion tokens)                      |
| 02-03 Container                        | Kept (may be inlined as `.view-inner`)                                      |
| 02-04 Button                           | Kept; restyled by new Epic 01 CSS                                           |
| 02-05 Badge · 02-06 Card               | Kept                                                                        |
| 02-07 useReveal                        | Kept (legacy)                                                               |
| 02-08 useScrollSpy                     | **Deleted in new Epic 11**                                                  |
| 02-09 Section                          | **Deleted in new Epic 11**                                                  |
| 02-10 SocialLinks                      | Kept                                                                        |
| 03-01 ThemeProvider                    | **Rewritten in new Epic 02**                                                |
| 03-02 Anti-FOUC bootstrap              | **Rewritten in new Epic 02**                                                |
| 03-03 ThemeToggle                      | **Deleted in new Epic 02**, replaced by ThemeSwitcher                       |
| 04-01 … 04-08 (i18n + content)         | LanguageProvider/useLanguage/LanguageSwitcher/parity test/DownloadCvButton kept; content modules extended in new Epic 03 |
| 05-01 main.tsx wiring                  | **Re-wired in new Epic 11**                                                 |
| 05-02 Header · 05-03 Footer · 05-04 App | **Deleted in new Epic 11**                                                 |
| 06-01 … 06-09 (sections)               | **All deleted in new Epic 11**                                              |
| 07-01 CV asset · 07-02 brand · 07-03 SEO | Kept; `index.html` extended in new Epic 01 + 11 (fonts, preconnect, anti-FOUC) |
| 08-01 GH Pages deploy                  | Still applicable; runs after new feature lands                              |
| 08-02 README + deploy docs             | Re-do after this feature; will reflect the new UI                           |
| 09-01 … 09-05 (quality passes)         | **Superseded by new Epic 12** (the new UI is what gets audited)             |

## Next

1. Run `/ck-code:track next` to find the first ready story (Epic 01, Story 01-01).
2. Implement story by story with `/ck-code:build` or in parallel with `/ck-code:parallel-build`.
3. After Epic 11 (cleanup) lands, re-run the prior plan's `08-01` (GitHub Actions) and proceed through new Epic 12 (quality).
