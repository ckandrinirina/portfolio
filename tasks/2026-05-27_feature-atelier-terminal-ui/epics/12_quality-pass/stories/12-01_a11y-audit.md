# 12-01 · Accessibility audit

**Status:** TODO · **Size:** M · **Blocked by:** 11-05

## Description

Run axe-core (or Lighthouse a11y) against every route and the open modal /
command palette. Fix any AA violations. Manually verify color contrast on
all 4 palettes for the lowest-contrast pairings (`--muted` on `--bg`,
`--fg-dim` on `--bg-2`).

## Files affected

- Likely tweaks to CSS variables, `aria-*` attributes, button labels.

## Checklist

- [ ] Run Lighthouse a11y on each route in each of 4 palettes (24 runs).
      Score ≥ 95 on each.
- [ ] All `<button>` elements have a usable accessible name (text or `aria-label`).
- [ ] All `<a>` elements with icon-only content have `aria-label`.
- [ ] Modal has `role="dialog"` and either `aria-labelledby` or `aria-label`.
- [ ] Command palette has `role="dialog"` (or `combobox` if going harder).
- [ ] One `<h1>` per page (Home only); each other view starts at `<h2>`.
- [ ] Contrast: `--muted` on `--bg` ≥ 4.5:1 (body text). If not, raise `--muted`
      lightness.
- [ ] Focus indicators are visible on every interactive control under all 4 palettes
      — particularly check Paper, where the orange may need a subtler outline.

## Acceptance criteria

- [ ] Lighthouse a11y ≥ 95 on home/work/experience/skills/process/contact, all 4 themes.
- [ ] axe-core scan finds no Serious/Critical issues.

## Test notes

`npx @axe-core/cli http://localhost:5173` for a CLI scan.

## Edge cases

- Some axe rules trip on missing `lang` — confirm `<html lang>` updates on
  LanguageSwitcher.
