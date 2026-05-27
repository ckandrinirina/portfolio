# Epic 02 · Theme system migration (4-palette via `[data-theme]`)

**Goal:** Replace the existing 2-theme (`dark` class) ThemeProvider with the
4-palette `[data-theme]` model from the Atelier Terminal mockup. Delete the
old `ThemeToggle` and introduce a `ThemeSwitcher` (cycle button or segmented).

## Scope

- Rewrite `ThemeProvider.tsx` for 4 palettes: `default | paper | ocean | forest`.
- Sets/removes `data-theme` attribute on `<html>`; persists to
  `localStorage['theme']`; initial value respects `prefers-color-scheme`.
- Replace the inline anti-FOUC script in `index.html` (legacy story 03-02
  delivered the old version).
- Update `useTheme` to return `{ theme, setTheme, cycle }`.
- New `ThemeSwitcher` component.
- Delete `ThemeToggle.tsx` + its tests.
- Migration: legacy `localStorage['theme']` values `'dark' | 'light'` should
  silently translate to `'default' | 'paper'` on first load.

## Stories

| ID    | Title                                             | Size |
|-------|---------------------------------------------------|------|
| 02-01 | Rewrite ThemeProvider for 4 palettes              | M    |
| 02-02 | Anti-FOUC inline theme bootstrap (new shape)      | S    |
| 02-03 | Update `useTheme` hook return shape               | S    |
| 02-04 | ThemeSwitcher component (cycle button)            | M    |
| 02-05 | ThemeProvider unit tests (4 palettes + migration) | M    |
| 02-06 | Delete `ThemeToggle.tsx` + its tests              | S    |

## Acceptance for the epic

- Switching theme via `setTheme('paper')` updates `<html data-theme="paper">`
  and changes the visible palette across all 4 themes.
- Setting `setTheme('default')` removes the `data-theme` attribute entirely
  (Ember default lives on `:root`).
- After reload, the last chosen theme is restored before React hydrates
  (no FOUC).
- Legacy values (`'dark'`, `'light'`) in `localStorage['theme']` are
  silently migrated.

## Dependencies

- 01-02 (palette CSS vars) — required for `data-theme` switch to be visible.

## References

- [`docs/architecture/components.md`](../../../../docs/architecture/components.md#themeprovider)
- [`docs/architecture/data-flow.md`](../../../../docs/architecture/data-flow.md#4-theme-cycle-4-palettes)
