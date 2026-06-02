# Shared / Cross-Cutting

> Infra used by multiple features. Feature docs link here instead of duplicating.
> A story reads this only when its feature doc's "Shared dependencies" points to a
> section here.

All components are function components (React 19) written in TypeScript.

## Providers & context

Both context providers follow the same pattern: a `Provider` component that holds
state in `useState`, persists it to `localStorage`, mirrors it onto a `<html>`
attribute, and exposes a typed accessor hook.

| Provider           | Hook            | `<html>` attr | localStorage key | Owner feature                                  |
| ------------------ | --------------- | ------------- | ---------------- | ---------------------------------------------- |
| `ThemeProvider`    | `useTheme()`    | `data-theme`  | `theme`          | [theming](features/theming/index.md)           |
| `LanguageProvider` | `useLanguage()` | `lang`        | `locale`         | [i18n-content](features/i18n-content/index.md) |

Mount order (`main.tsx`): `ThemeProvider › LanguageProvider › App`.

## UI primitives

Generic, restyled-from-the-mockup primitives used across more than one feature. Each
lives in `src/components/ui/` unless noted.

| Component     | File                 | Responsibility                                                  | Key props                  |
| ------------- | -------------------- | --------------------------------------------------------------- | -------------------------- |
| `Button`      | `ui/Button.tsx`      | `.btn` (secondary) / `.btn-primary` styled link or button       | `variant?`, `as?`, `href?` |
| `Badge`       | `ui/Badge.tsx`       | Skill / tech chip                                               | `children`                 |
| `Card`        | `ui/Card.tsx`        | Generic card shell used inside views                            | `children`, `className?`   |
| `SocialLinks` | `ui/SocialLinks.tsx` | GitHub + LinkedIn icon links from `lib/constants`               | `size?`                    |
| `Container`   | `ui/Container.tsx`   | Optional max-width wrapper (mockup uses `.view-inner` directly) | `children`, `className?`   |

Feature-specific UI (Reveal, CountUp, Marquee, DownloadCvButton, ScrollHint,
ThemeSwitcher, LanguageSwitcher) is documented in its owning feature doc, not here.

## Accessibility & reduced-motion

Project-wide conventions every feature follows:

- **Headings:** a single `<h1>` per page (the Hero name on Home); every other view
  leads with an `<h2>` `.section-title`.
- **Landmarks:** `<aside>` (sidebar), `<main>` (main pane); the sidebar route nav is a
  `<nav>`.
- **Focus:** all interactive controls (`.sb-row`, `.btn`, `.tb-search`, `.proj-card`,
  links) are keyboard-focusable with visible native focus rings. The custom cursor
  does **not** replace focus styles.
- **ARIA / state:** toggles expose `aria-pressed` / `aria-label`; the language switch
  sets `<html lang>`; the theme switch sets `<html data-theme>`; the Home role rotor is
  `aria-live="polite"`; copy buttons announce by switching to "✓ copied" text.
- **Keyboard:** arrow / Page keys navigate routes at scroll boundaries; `⌘/Ctrl+K`
  opens the palette; `Escape` closes modal/cmdk; `Enter` runs the active cmdk item.
- **Reduced motion:** under `@media (prefers-reduced-motion: reduce)`, all entrance,
  letter-by-letter, view-enter, marquee, scroll-reveal, and orbital animations are
  disabled and content is forced to its final visible state.
- **Custom cursor:** disabled on touch devices and screens ≤880px
  (`(hover: none) or (max-width: 880px)`).
- **Color contrast:** all foreground/background pairs from the mockup target WCAG AA;
  the `Paper` palette is the light-mode equivalent and must pass AA.

## Failure modes & resilience

| Scenario                                  | Behavior                                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `localStorage` unavailable (privacy mode) | Fall back to system/default; toggles still work for the session                                                                 |
| JS disabled                               | Page shows base HTML; content renders only after JS runs — acceptable for a portfolio (revisit with SSG if no-JS SEO is needed) |
| Missing CV PDF                            | Download link 404s; mitigated by a build check that the asset exists                                                            |
| Reduced-motion preference                 | Animations disabled, content fully visible                                                                                      |

## Conventions

- **No runtime network requests** — all data is compiled-in typed content plus two
  pieces of persisted UI state (theme, locale).
- **No new runtime dependencies** — animations are CSS + RAF; the command palette and
  modal are hand-rolled; icons are inline glyphs / SVG.
- **CSS:** Tailwind v4 utilities + heavy custom CSS in `src/index.css`; all visual
  values are verbatim from the Atelier mockup (the single source of truth for visuals).
  Design tokens live in [theming](features/theming/index.md).
