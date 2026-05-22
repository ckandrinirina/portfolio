# Story 05-03: Footer component

> **Epic:** App Shell & Layout
> **Size:** M
> **Status:** TODO

## Description

Build `src/components/layout/Footer.tsx`, the page-wide footer that sits below the last section. The Footer renders a `<footer>` HTML landmark containing three elements: the `SocialLinks` component (GitHub + LinkedIn icon links built in Epic 02), a dynamic copyright notice whose year is computed at runtime, and a short "built with" note (e.g. "Built with React + Vite"). All text and icon colours must be legible against both the light and dark theme backgrounds using Tailwind `dark:` variants. The Footer has no interactive state of its own and requires no props.

## Acceptance Criteria

- [ ] The Footer renders a `<footer>` HTML landmark element as its root.
- [ ] The `SocialLinks` component is rendered inside the Footer and displays GitHub and LinkedIn icon links.
- [ ] A copyright line is present, formatted as `© <year> Erick Andrinirina` (or equivalent), where `<year>` is computed via `new Date().getFullYear()` — not a hardcoded string.
- [ ] A "built with" note is present (e.g. "Built with React & Vite").
- [ ] In light theme, all Footer text and icon colours are legible against the light background.
- [ ] In dark theme, all Footer text and icon colours are legible against the dark background (verified by toggling ThemeToggle).
- [ ] Toggling the theme while the footer is visible updates its colours without a page reload.
- [ ] The Footer is full-width (spans the page), visually separated from the section above it (border, spacing, or background contrast).
- [ ] No TypeScript errors on `npm run build`.
- [ ] The `<footer>` element is present in the DOM and can be located by `role="contentinfo"` in a test or accessibility audit.

## Technical Notes

- The Footer is a pure presentational component — no context consumption beyond what `SocialLinks` handles internally. Do not call `useTheme()` or `useLanguage()` directly in `Footer.tsx` unless a localised string is needed (e.g. a translated "built with" note); in that case use `useLanguage().t('builtWith')` and ensure the key exists in `src/i18n/ui.ts`.
- Copyright year: `{new Date().getFullYear()}` inside JSX. This evaluates once per render/bundle; for a static build this is acceptable — it will reflect the year at build time in production, which is correct behaviour.
- Social link URLs come from `src/lib/constants.ts` via `SocialLinks` — Footer does not need to pass URLs as props.
- Use `Container` (from Epic 02) to centre and pad the Footer content consistently with the rest of the page.
- The `<footer>` element implicitly has `role="contentinfo"` when it is a direct child of `<body>` or the page root — no explicit role attribute is needed.
- Prefer a single horizontal flex row for desktop (SocialLinks left or centred, copyright centred or right, "built with" note) and stack vertically on mobile. Exact layout is at implementer discretion; legibility is the acceptance bar.
- If the "built with" note references Vite and React, ensure the text is in English (or localised if `t()` supports it) — do not leave it in only one language for a bilingual site.

## Files to Create/Modify

| Action | File Path                          | Purpose                                                             |
| ------ | ---------------------------------- | ------------------------------------------------------------------- |
| CREATE | `src/components/layout/Footer.tsx` | Footer landmark with social links, copyright, and "built with" note |

## Dependencies

- **Blocked by:** 02-10 (`SocialLinks` component must exist).
- **Blocks:** 05-04 (`App.tsx` page shell imports and renders `<Footer/>`).

## Related

- **Epic:** app-shell-layout
- **Related stories:** 05-04 (App.tsx renders Footer)
- **Spec reference:** components.md §Footer
