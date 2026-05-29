# Story 01-02: Theme system rewrite — 4 palettes, data-theme, switcher

> **Epic:** Foundation — Tokens, Theme & Content
> **Size:** L
> **Status:** TODO

## Description

Rewrite the theme system to drive the four Atelier palettes through the `data-theme`
attribute on `<html>` instead of the old `dark` class. This replaces `ThemeProvider`,
extends `useTheme`, adds the co-located anti-FOUC bootstrap, ships a `ThemeSwitcher`
control, and deletes the obsolete `ThemeToggle`.

`ThemeProvider` exposes `{ theme, setTheme, cycle }` where `theme` is one of
`'default' | 'paper' | 'ocean' | 'forest'`. Applying a theme sets `data-theme` on the
document element — **except** `default` (Ember), which removes the attribute so the
`:root` palette governs. The choice is persisted to `localStorage['theme']`. The default
when nothing is stored is `default` if the system prefers dark, else `paper`.

The anti-FOUC bootstrap (`themeBootstrap.ts` as an exported string) is wired into
`index.html` as an inline `<script>` that runs before React so the correct theme is
applied on first paint. The logic must match the provider's resolution exactly.

## Acceptance Criteria

- [ ] `Theme` type is `'default' | 'paper' | 'ocean' | 'forest'`.
- [ ] `ThemeProvider` resolves the initial theme as `localStorage['theme']` if present,
      else `default` when `matchMedia('(prefers-color-scheme: dark)').matches`, else `paper`.
- [ ] Applying `default` **removes** the `data-theme` attribute; any other theme sets
      `data-theme="<theme>"` on `document.documentElement`.
- [ ] `setTheme(t)` updates state, the attribute, and `localStorage['theme']`.
- [ ] `cycle()` advances through `default → ocean → forest → paper → default` (the
      documented order) and persists.
- [ ] `useTheme()` returns `{ theme, setTheme, cycle }` and throws a clear error when used
      outside the provider.
- [ ] `themeBootstrap.ts` exports the inline-script string; `index.html` runs it before the
      React bundle and its resolution matches the provider (no flash of wrong theme on a
      hard reload with a stored preference).
- [ ] `ThemeSwitcher` renders the active theme and switches it app-wide on click/activation
      (segmented control or cycle button), with an accessible label and visible focus ring.
- [ ] `src/components/ui/ThemeToggle.tsx` and its test are removed; no remaining import
      references them.
- [ ] Provider/switcher/bootstrap unit tests pass; `npm run build` has no TS errors.

## Technical Notes

- Keep the provider tree order `ThemeProvider → LanguageProvider → App` (wired in 04-01);
  this story only changes the ThemeProvider implementation, not the nesting.
- The bootstrap is duplicated by necessity (inline in HTML + co-located TS source). Export
  one canonical string from `themeBootstrap.ts` and paste it into `index.html`; add a test
  that the two stay in sync (e.g. assert the HTML contains the exported snippet).
- Guard `localStorage`/`matchMedia` access in `try/catch` for SSR-less safety and old
  browsers (the bootstrap already does).
- `ThemeSwitcher` reads `useTheme()`; do not duplicate persistence logic in the component.
- Removing `ThemeToggle` may break an import in the old `Header` (slated for deletion in
  04-01). If `Header` still imports it at this point, leave a TODO or stub rather than
  editing the doomed file extensively — full teardown happens in 04-01.

## Files to Create/Modify

| Action | File Path                                | Purpose                                           |
| ------ | ---------------------------------------- | ------------------------------------------------- |
| MODIFY | `src/theme/ThemeProvider.tsx`            | 4-theme provider via `data-theme`, cycle, persist |
| MODIFY | `src/theme/useTheme.ts`                  | Extended return `{ theme, setTheme, cycle }`      |
| CREATE | `src/theme/themeBootstrap.ts`            | Exported anti-FOUC inline-script string           |
| MODIFY | `index.html`                             | Inline bootstrap `<script>` before the bundle     |
| CREATE | `src/components/ui/ThemeSwitcher.tsx`    | Theme control replacing ThemeToggle               |
| DELETE | `src/components/ui/ThemeToggle.tsx`      | Superseded by ThemeSwitcher                       |
| DELETE | `src/components/ui/ThemeToggle.test.tsx` | Obsolete test                                     |

## Dependencies

- **Blocked by:** 01-01 (the `[data-theme]` token blocks must exist for theming to work)
- **Blocks:** 02-03 (Sidebar/Topbar host the ThemeSwitcher), 04-01 (provider wiring)

## Related

- **Epic:** foundation-tokens-theme-content
- **Related stories:** 01-01 (tokens + font links + bootstrap placeholder), 02-03 (chrome)
- **Spec reference:** feature doc §Decisions (theme model), §Data flow (Boot, Theme cycle),
  §Components (ThemeProvider), §Configuration changes

## Implementation Plan

### SOLID Analysis

- **S — Single Responsibility:** provider owns theme state/persistence; bootstrap owns
  first-paint resolution; switcher owns presentation; hook owns context access.
- **O — Open/Closed:** adding a palette means extending the `Theme` union + cycle array,
  not rewriting the provider.
- **L — Liskov:** every theme value is a valid argument to `setTheme`; `default` is handled
  by attribute removal but is otherwise interchangeable.
- **I — Interface Segregation:** `ThemeSwitcher` consumes only `{ theme, cycle/setTheme }`.
- **D — Dependency Inversion:** components depend on `useTheme()`, not on `localStorage` or
  the DOM attribute directly.

### Subtasks

- [ ] 1. Write provider/hook/switcher/bootstrap tests (RED).
- [ ] 2. Implement `themeBootstrap.ts` + `ThemeProvider`/`useTheme` (GREEN).
- [ ] 3. Wire the inline script into `index.html`; add the in-sync test.
- [ ] 4. Build `ThemeSwitcher`; delete `ThemeToggle` + test.
- [ ] 5. Refactor + SOLID check; verify no dangling imports.
- [ ] 6. QA validation — map each AC, run the suite, check TypeScript.
