# Story 02-02: Design tokens in index.css @theme

> **Epic:** Design System — UI Primitives & Hooks
> **Size:** S
> **Status:** TODO

## Description

Declare all shared visual design tokens — colour palette (including the brand
accent colour), font family stacks, and optionally spacing/border-radius values
— inside the `@theme { }` block in `src/index.css`. This block is processed by
Tailwind CSS v4 at build time and emits standard CSS custom properties, making
every token available as a Tailwind utility class (e.g. `text-brand-500`,
`bg-surface`, `font-display`). Both light and dark values must be defined so
that the `dark:` variant (established in Story 01-02) resolves correctly without
extra per-component media-query overrides.

This story is the styling baseline. All downstream components rely on these
tokens instead of hard-coded hex or raw Tailwind default palette values.

## Acceptance Criteria

- [ ] `src/index.css` contains an `@theme { }` block placed **after** the `@import "tailwindcss"` and `@custom-variant dark` lines from Epic 01 — the existing lines must not be removed or reordered.
- [ ] A brand accent colour series (at minimum `--color-brand-500`) is declared and available as `text-brand-500`, `bg-brand-500`, `border-brand-500`, etc.
- [ ] Surface/background tokens are declared for both light and dark contexts (e.g. `--color-surface`, `--color-surface-elevated`) so cards and section backgrounds can reference a semantic token.
- [ ] Text colour tokens for primary and secondary/muted text are declared.
- [ ] At least one font family token is declared (e.g. `--font-sans`, `--font-display`).
- [ ] All dark-mode token values are specified via the `dark` custom variant (using the class-based `.dark` selector established in Epic 01), not via `@media (prefers-color-scheme: dark)`.
- [ ] No raw hex values appear in any component file created in this epic; tokens are the single source of truth for colours.
- [ ] Building the project (`vite build`) completes without CSS processing errors.
- [ ] Visually checking the dev server: switching the `<html>` class between no class and `dark` correctly flips background and text colours as expected from the token definitions.
- [ ] ESLint (if configured for CSS) reports no violations.

## Technical Notes

- Tailwind CSS v4 `@theme` syntax reference: custom properties declared inside `@theme { }` are automatically mapped to utilities. Use the `--color-*`, `--font-*`, `--spacing-*`, `--radius-*` naming conventions so Tailwind's auto-mapping works without extra `theme.extend` config.
- Dark token pattern in v4: wrap the dark-mode overrides in a `.dark { @theme { ... } }` block (or use the `@custom-variant dark` approach configured in Epic 01). Confirm the exact syntax supported by the installed Tailwind version.
- Colour naming convention to use (align with the approved Claude Design):
  - Brand: `--color-brand-{50,100,…,900,950}` (minimum: 500 required; add as many stops as the design needs).
  - Semantic surface colours: `--color-surface`, `--color-surface-elevated`, `--color-border`.
  - Semantic text colours: `--color-text-primary`, `--color-text-secondary`.
- Font families: refer to the approved design for the exact typefaces. If using Google Fonts, the `<link>` import goes in `index.html` (added during Epic 01 or in this story if not yet done).
- Spacing/radius tokens are optional; add them only if the design calls for non-standard values that would otherwise be scattered as arbitrary values (e.g. `rounded-[6px]`).
- This file modification must not break the `dark` custom-variant rule added by Epic 01 (01-02). Run `vite build` as a smoke test.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| MODIFY | `src/index.css` | Add `@theme { }` block with colour, font, and optional spacing/radius tokens for light and dark |

## Dependencies

- **Blocked by:** 01-02 (Tailwind v4 installed, `@import "tailwindcss"` and `@custom-variant dark` already in `src/index.css`)
- **Blocks:** None directly (this is a styling baseline consumed by all subsequent stories and epics)

## Related

- **Epic:** design-system-primitives
- **Related stories:** 02-03, 02-04, 02-05, 02-06, 02-09, 02-10 (all consume tokens); Epic 03, 05, 06 (all components use tokens)
- **Spec reference:** docs/architecture/folder-structure.md §Conventions (Styling); tech-stack.md §Theming; spec §4 (Theme decision)
