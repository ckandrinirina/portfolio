# 01-02 · CSS variables for all 4 palettes

**Status:** TODO · **Size:** M · **Blocked by:** —

## Description

Define every CSS custom property for the four Atelier Terminal palettes
**verbatim** from the mockup. Ember lives on `:root` (default). Paper, Ocean,
Forest each live under `[data-theme="..."]`. No re-interpretation of any
color value.

## Files affected

- `src/index.css` — add the palette blocks. Replace existing content (the old
  Tailwind import is restored in story 01-08).

## Implementation notes

Copy each block from
[`docs/architecture/features/2026-05-27_atelier-terminal-ui.md`](../../../../../docs/architecture/features/2026-05-27_atelier-terminal-ui.md#design-tokens-verbatim-from-mockup) — there are four tables:
**Ember (`:root`)**, **Paper (`[data-theme="paper"]`)**, **Ocean (`[data-theme="ocean"]`)**, **Forest (`[data-theme="forest"]`)**.

Every variable listed in those tables must be in the CSS. Use the **exact**
hex/rgba values from the doc.

Token names (must match these exactly so component CSS later resolves correctly):
`--bg`, `--bg-deep`, `--bg-2`, `--surface`, `--surface-2`, `--line`,
`--line-strong`, `--fg`, `--fg-soft`, `--fg-dim`, `--muted`, `--muted-deep`,
`--accent`, `--accent-soft`, `--accent-deep`, `--gold`, `--success`, `--info`,
`--shadow-soft`, `--shadow-lift`.

(Note: Ocean and Forest omit `--info`, `--shadow-soft`, and `--shadow-lift` in
the mockup — leave them omitted; they inherit Ember's values via the cascade
when the attribute is set.)

## Acceptance criteria

- [ ] `:root { ... }` block contains all 20 Ember variables, exact values.
- [ ] `[data-theme="paper"] { ... }` contains all 20 Paper variables, exact values.
- [ ] `[data-theme="ocean"] { ... }` contains the Ocean variables (minus
      `--info`/`--shadow-*` which fall through to `:root`).
- [ ] `[data-theme="forest"] { ... }` same — Forest variables only.
- [ ] Setting `document.documentElement.dataset.theme = 'paper'` in devtools
      makes `getComputedStyle(document.documentElement).getPropertyValue('--bg')`
      return `#F2EDDD`.
- [ ] All four palettes' `--bg` resolve to the expected colors when toggled.

## Test notes

A future unit test (in Epic 02) will assert palette switching via
ThemeProvider; no test in this story.

## Edge cases

- Don't combine palettes into a single `@media` query — each `[data-theme]`
  selector is independent of system preference; ThemeProvider chooses which
  attribute to set.
- The Ember palette MUST be on `:root` (not `[data-theme="default"]`) — that's
  the design: removing the attribute reverts to Ember.
