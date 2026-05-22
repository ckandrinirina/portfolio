# Story 06-02: About section

> **Epic:** Content Sections
> **Size:** S
> **Status:** TODO

## Description

Implement `src/components/sections/About.tsx`, the profile narrative section. The
component reads `content.about` via `useLanguage()` and renders the descriptive paragraph
inside the shared `Section` wrapper with `id="about"` and a locale-aware `<h2>` heading.
The narrative covers Erick's seven years of fullstack expertise, his JavaScript and PHP
ecosystem fluency, and his motivation — matching the text authored in the French and
English content files of Epic 04.

## Acceptance Criteria

- [ ] The component renders inside a `<section id="about">` (provided by the `Section` wrapper).
- [ ] An `<h2>` heading is rendered by the `Section` wrapper with the locale-appropriate label (e.g. "À propos" in French, "About" in English).
- [ ] The profile narrative paragraph is rendered from `content.about` (not hard-coded inline).
- [ ] Switching the locale from French to English (or vice-versa) updates the narrative text without a page reload.
- [ ] The component renders without error when both the `fr` and `en` content objects are active.
- [ ] No TypeScript errors on `npm run build`.

## Technical Notes

- Use the `Section` primitive from Epic 02 (story 02-09); pass `id="about"` and the localized heading label via `t('nav.about')` or equivalent UI label key from `src/i18n/ui.ts`.
- `content.about` is expected to be a string (the narrative paragraph); render it inside a `<p>` element for semantic correctness.
- No additional UI primitives (Badge, Card) are needed for this section — plain prose layout.
- If the design calls for a profile photo alongside the text, source `profile.jpg` from `public/`; the decision on whether to include the photo is deferred to the design phase — leave a clearly marked `{/* TODO: profile photo */}` comment if omitting.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/components/sections/About.tsx` | Profile narrative section component |

## Dependencies

- **Blocked by:** 04-05 (LanguageProvider — `useLanguage()` must exist), 02-09 (Section wrapper).
- **Blocks:** 06-09 (wire sections into App).

## Related

- **Epic:** content-sections
- **Related stories:** 06-01 (Hero — precedes About in page order), 06-09 (App wiring)
- **Spec reference:** spec §5.2 (About / profile)
