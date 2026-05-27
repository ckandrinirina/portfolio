# Epic 01 · Design tokens, fonts & global styles

**Goal:** Establish the visual foundation for the Atelier Terminal UI in
`src/index.css` and `index.html`. Every visual story downstream pulls from
these tokens — colors, typography, motion timing, ambient effects, keyframes,
reduced-motion overrides, and the universal `.reveal` machinery.

## Scope

- Replace the current `src/index.css` content with the mockup's tokens and
  global styles.
- Add Google Fonts (JetBrains Mono, Instrument Serif, Geist) to `index.html`.
- Define every `@keyframes` block the design uses (animations are CSS-driven).
- Define the universal scroll-reveal class `.reveal` + `.reveal.in` and its
  directional variants.
- Wire Tailwind v4 `@theme` bridge so utilities can use the tokens by name.

## Out of scope

- ThemeProvider / `data-theme` toggle logic (Epic 02).
- Component-class CSS for `.sidebar`, `.proj-card`, `.tl-item`, etc. —
  delivered in the epics that build those components.
- Custom cursor CSS (Epic 04).
- Anti-FOUC bootstrap script (Epic 02).

## Stories

| ID    | Title                                                    | Size |
|-------|----------------------------------------------------------|------|
| 01-01 | Google Fonts preconnect & stylesheet in `index.html`     | S    |
| 01-02 | CSS variables for all 4 palettes (Ember/Paper/Ocean/Forest) | M  |
| 01-03 | Typography & motion tokens (`--font-*`, `--ease`)        | S    |
| 01-04 | Body baseline + ambient effects (glow + grid overlay)    | M    |
| 01-05 | Universal `@keyframes` library                           | M    |
| 01-06 | Universal `.reveal` scroll-reveal CSS classes            | S    |
| 01-07 | Global `prefers-reduced-motion` overrides                | S    |
| 01-08 | Tailwind v4 `@theme` bridge for tokens                   | S    |

## Acceptance for the epic

- `npm run dev` renders a blank `<div id="root">` page that shows the warm dark
  `#16130F` background, the body radial glow, the 64px grid overlay, and
  serif/mono fonts (verifiable by injecting a temporary `<h1>` / `<p>`).
- Switching `<html data-theme="paper" | "ocean" | "forest">` manually via
  devtools changes the visible background and text color to the matching palette.
- Browser devtools show all four palettes' CSS variables resolved at
  `document.documentElement` when each `data-theme` is set.

## Dependencies

- None (this is the foundation).

## References

- [`docs/architecture/features/2026-05-27_atelier-terminal-ui.md`](../../../../docs/architecture/features/2026-05-27_atelier-terminal-ui.md) — sections "Design tokens (verbatim from mockup)" and "Ambient effects".
- [`docs/architecture/configuration.md`](../../../../docs/architecture/configuration.md) — the `src/index.css` and `index.html` snippets.
