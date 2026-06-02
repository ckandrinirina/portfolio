# Components

Component tree, responsibilities, and key props. All components are function
components (React 19) written in TypeScript.

> Updated 2026-05-27 for the **Atelier Terminal UI** — sidebar+main shell with
> 6 route views. The old `Header / Footer / Section` layout and per-section
> components in `components/sections/` are replaced by `Sidebar / Topbar` and
> view components in `src/views/`. Full inventory in
> [features/2026-05-27_atelier-terminal-ui.md](features/2026-05-27_atelier-terminal-ui.md).

## Tree

```
main.tsx
└── ThemeProvider                    (4-palette via [data-theme])
    └── LanguageProvider             (FR default, EN switchable)
        └── App                      (route + modal + cmd state)
            ├── Cursor               (fixed dot + ring, hover devices only)
            ├── Sidebar
            │   ├── brand button     (E mark → home)
            │   ├── nav groups       (workspace · connect)
            │   └── status block     (available · tnr · claude-code)
            ├── main
            │   ├── Topbar           (breadcrumb · ⌘K · TNR clock)
            │   ├── nav-lock         (per-transition top sweep)
            │   └── view             (keyed by route → remounts)
            │       └── view-inner   (view-enter-up | -down)
            │           ├── HomeView
            │           ├── WorkView
            │           ├── ExperienceView
            │           ├── SkillsView
            │           ├── ProcessView
            │           ├── ContactView
            │           └── ScrollHint
            ├── ProjectModal         (rendered when state.openProject set)
            └── CommandPalette       (⌘K)
```

## Providers

### `ThemeProvider`

- **State:** `theme: 'default' | 'paper' | 'ocean' | 'forest'` (4 palettes).
- **Init:** `localStorage['theme']` → else `matchMedia('(prefers-color-scheme: dark)')`
  → `'default'` (Ember dark) if dark preferred, else `'paper'` (light).
- **Effect:** sets `data-theme` attribute on `document.documentElement`
  (removes it when theme is `'default'` so the `:root` palette applies);
  persists choice.
- **Exposes (via `useTheme`):** `{ theme, setTheme, cycle }` where `cycle()`
  walks `default → ocean → forest → paper → default`.
- **Edge case:** an inline script in `index.html` applies the stored theme
  before React hydrates, to avoid a flash of incorrect theme (FOUC).

### `LanguageProvider`

- **State:** `locale: 'en' | 'fr'`.
- **Init:** `localStorage['locale']` → else `navigator.language` prefix (`en`/`fr`) → else `'fr'` (default).
- **Effect:** sets `document.documentElement.lang`; persists choice.
- **Exposes (via `useLanguage`):** `{ locale, setLocale, content, t }` where
  `content` is the resolved per-locale object and `t(key)` resolves UI labels.

## Layout components

| Component     | Responsibility                                                                                | Key props                              |
| ------------- | --------------------------------------------------------------------------------------------- | -------------------------------------- |
| `Sidebar`     | 240px aside: brand mark + grouped route buttons + live status (available · tnr · claude-code) | `active`, `onSelect(id)`, `onCmd()`    |
| `Topbar`      | Breadcrumb (`~/portfolio / current`) + `⌘K` button + auto-updating TNR clock                  | `active`, `onCmd()`                    |
| `ScrollHint`  | Sticky chip at the bottom of each view: "Scroll for {next view}"                              | `visible`, `nextLabel`, `onClick()`    |
| `Container`   | Optional max-width wrapper (the mockup uses `.view-inner` directly inside `.view`)            | `children`, `className?`               |

## View components

Each consumes `useLanguage()` and renders its content slice. See
[folder-structure.md](folder-structure.md#view--content-mapping) for the
view ↔ content map.

| Component         | Renders                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `HomeView`        | Hero (greet · letter-reveal name · tagline · role rotor · CTAs) · Avatar frame · "Now building" card · 2×2 stats · marquee |
| `WorkView`        | Eyebrow + section title; 2-col grid of `ProjectCard`s; opens `ProjectModal` on click                                     |
| `ExperienceView`  | Eyebrow + section title; vertical timeline (`.tl-item` with dot marker); reverse-chrono                                  |
| `SkillsView`      | Eyebrow + section title; 2×2 skill cards (Frontend / Backend / Data & Cloud / AI & Craft) with lead pills + chips        |
| `ProcessView`     | Eyebrow + section title; 5 numbered principles (`.process-item`)                                                          |
| `ContactView`     | Eyebrow + section title; two-card grid: copy-able key/value card (email · whatsapp · location · languages · status) + pitch card |

## Feature-specific components

| Component         | Responsibility                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `Cursor`          | Custom dot + lerped ring; reads `[data-cursor]` / `[data-cursor-label]` to switch states; disabled on touch / small screens |
| `CommandPalette`  | ⌘/Ctrl+K modal with grouped, filtered results (Navigation, Quick actions, Projects); arrow + enter nav     |
| `ProjectModal`    | Detail overlay: hero artwork, role/impact/stack columns, action buttons; Escape closes; body scroll lock  |
| `ProjectCard`     | Card in the work grid: artwork header (`ProjectArt`), category/year chips, num · client, name, role, desc, tags, actions |
| `ProjectArt`      | Inline SVG artwork dispatcher; one component per project id                                               |

## UI components

| Component          | Responsibility                                                          | Key props                |
| ------------------ | ----------------------------------------------------------------------- | ------------------------ |
| `Reveal`           | Letter-by-letter animated text (delays per char)                         | `text`, `delay?`, `italic?`, `perChar?` |
| `CountUp`          | Eased number counter on mount                                            | `to`, `suffix?`, `duration?` |
| `Marquee`          | Looping horizontal track with hover-pause and edge fade                  | `items[]`                |
| `ThemeSwitcher`    | Cycles or segments the 4 palettes; reflects current; `aria-pressed`      | —                        |
| `LanguageSwitcher` | EN/FR toggle or segmented control; `aria-label`                          | —                        |
| `Button`           | `.btn` (secondary) / `.btn-primary` styled link or button                | `variant?`, `as?`, `href?` |
| `Badge`            | Skill / tech chip                                                        | `children`               |
| `Card`             | Generic card shell (used inside views)                                   | `children`, `className?` |
| `SocialLinks`      | Renders GitHub + LinkedIn icon links from `lib/constants`                | `size?`                  |
| `DownloadCvButton` | Anchor to `/cv/...pdf` with `download`; rendered as 3rd Home CTA          | —                        |

## Hooks

| Hook                       | Responsibility                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useScrollReveal(viewRef, route)` | IntersectionObserver over `.reveal, .proj-card, .skill-card, .tl-item, .process-item, .now-card, .stats-grid`; adds `.in` with stagger |
| `useScrollToNavigate(viewRef, route, locked, navigate)` | Wheel + touch; advances route only when a gesture starts at the boundary and exceeds 90px accumulated |
| `useKeyboardArrows(navigate, locked)` | Arrow / Page keys → route nav when at scroll boundary                                                 |
| `useCmdK(toggle)`          | `⌘/Ctrl+K` toggles command palette                                                                                    |
| `useHashRoute(setRoute)`   | Reads `window.location.hash` on mount + on `hashchange`                                                              |
| `useTheme()`               | Theme context accessor (`theme`, `setTheme`, `cycle`)                                                                |
| `useLanguage()`            | Language/content context accessor (`locale`, `setLocale`, `content`, `t`)                                            |
| `useReveal()`              | Legacy one-off reveal (kept; may go unused after migration)                                                          |

## Accessibility notes

- Single `<h1>` (Hero name on Home view); each other view uses `<h2>` for its `.section-title`.
- Landmarks: `<aside>` (sidebar), `<main>` (main pane). The sidebar contains
  the route nav inside a `<nav>` element.
- All interactive controls keyboard-focusable with visible focus rings.
  The custom cursor does **not** replace focus styles.
- Toggles expose state via `aria-pressed` / `aria-label`; language switch sets
  `<html lang>` correctly; theme switch sets `<html data-theme>`.
- Reveal, view-enter, letter-by-letter, marquee, and orbital animations are
  disabled under `prefers-reduced-motion: reduce`.
- The custom cursor is disabled on touch devices and screens ≤880px.
- Role rotor on Home is `aria-live="polite"`.
