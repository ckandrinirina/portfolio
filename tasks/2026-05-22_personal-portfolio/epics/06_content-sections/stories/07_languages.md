# Story 06-07: Languages section

> **Epic:** Content Sections
> **Size:** S
> **Status:** TODO

## Description

Implement `src/components/sections/Languages.tsx`, the spoken languages section. The
component reads `content.spokenLanguages[]` via `useLanguage()` and renders the three
spoken languages — Malagasy (native), French (fluent), English (working proficiency) —
with their proficiency levels. The section uses the shared `Section` wrapper with
`id="languages"`. Labels and proficiency descriptors are locale-aware.

## Acceptance Criteria

- [ ] The component renders inside a `<section id="languages">` (provided by the `Section` wrapper).
- [ ] An `<h2>` heading is rendered by the `Section` wrapper with the locale-appropriate label (e.g. "Langues" / "Languages").
- [ ] All three spoken languages are rendered: Malagasy, French, English.
- [ ] Each language entry shows the language name and its proficiency level.
- [ ] Proficiency level descriptors update on locale switch — e.g. "Langue maternelle" / "Native" for Malagasy, "Courant" / "Fluent" for French, "Professionnel" / "Working proficiency" for English.
- [ ] The layout is legible and visually clear (each language is a distinct row or card; proficiency is not lost visually).
- [ ] No TypeScript errors on `npm run build`.

## Technical Notes

- `content.spokenLanguages[]` shape (from Epic 04 types): `{ language: string; proficiency: string }` where `proficiency` is already the locale-appropriate string (authored in `fr.ts` / `en.ts`) — or alternatively a key looked up from `src/i18n/ui.ts`. Align with Epic 04 data structure.
- Suggested layout: a vertical list of rows, each with the language name in bold and the proficiency level as secondary text or a visual indicator (e.g. a Badge or a text label). A simple `<ul>` / `<li>` structure suffices.
- If a proficiency bar or dot indicator is desired (per the design), implement the visual only with Tailwind utility classes; do not introduce a new UI primitive just for this section.
- Language names ("Malagasy", "French", "English") are proper nouns and do not need translation; proficiency descriptors do.

## Files to Create/Modify

| Action | File Path                               | Purpose                                   |
| ------ | --------------------------------------- | ----------------------------------------- |
| CREATE | `src/components/sections/Languages.tsx` | Spoken languages with proficiency section |

## Dependencies

- **Blocked by:** 04-05 (LanguageProvider — `useLanguage()` must exist), 02-09 (Section wrapper).
- **Blocks:** 06-09 (wire sections into App).

## Related

- **Epic:** content-sections
- **Related stories:** 06-06 (Education — similar compact data-display pattern), 06-09 (App wiring)
- **Spec reference:** spec §5.6 (Languages spoken)
