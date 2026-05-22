# Story 06-06: Education section

> **Epic:** Content Sections
> **Size:** S
> **Status:** TODO

## Description

Implement `src/components/sections/Education.tsx`, the education history section. The
component reads `content.education[]` via `useLanguage()` and renders three entries —
Master's engineer degree, advanced web development training, and Scientific Baccalaureate
— in a table or accessible list. One entry (Baccalaureate) may have a blank institution
field (per open question §9.2 in the spec); the component must handle this gracefully.
The section uses the shared `Section` wrapper with `id="education"`.

## Acceptance Criteria

- [ ] The component renders inside a `<section id="education">` (provided by the `Section` wrapper).
- [ ] An `<h2>` heading is rendered by the `Section` wrapper with the locale-appropriate label.
- [ ] All three education entries from `content.education[]` are rendered: Master's Engineer (2018, École Supérieure Polytechnique d'Antananarivo), Advanced web development (2019, NEITIC), Scientific Baccalaureate (2013).
- [ ] Each entry shows: year, qualification/degree title, institution name.
- [ ] A missing or empty institution field renders gracefully — no crash, no "[object Object]", no "undefined" text; acceptable outputs are an empty cell, a dash, or the string "—".
- [ ] If a `<table>` is used, it includes `<thead>`, `<tbody>`, `<th scope="col">` for column headers, and `<th scope="row">` or `<td>` for row data (accessible table semantics).
- [ ] If a list layout is used instead of a table, each entry is clearly delineated and the year/qualification/institution hierarchy is visually and semantically clear.
- [ ] The locale switch updates qualification titles and column header labels; years and institution names are locale-neutral.
- [ ] No TypeScript errors on `npm run build`.

## Technical Notes

- `content.education[]` shape (from Epic 04 types): `{ year: string | number; qualification: string; institution: string | null | undefined }`. The `institution` field may be absent for the Baccalaureate entry; use `institution ?? '—'` or a conditional render.
- If using a `<table>`: Tailwind table utilities (`table-auto`, `w-full`) work well; add `border-collapse` and row borders for readability. Ensure the table is horizontally scrollable on very narrow screens (`overflow-x-auto` on a wrapper `<div>`).
- If using a definition list (`<dl>`) or a card-per-entry layout, ensure sufficient visual separation between entries.
- Column header labels (Year, Qualification, Institution) must come from the UI labels file (`src/i18n/ui.ts`) or from `content.education` metadata, so they update on locale switch.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/components/sections/Education.tsx` | Education history section with accessible table or list |

## Dependencies

- **Blocked by:** 04-05 (LanguageProvider — `useLanguage()` must exist), 02-09 (Section wrapper).
- **Blocks:** 06-09 (wire sections into App).

## Related

- **Epic:** content-sections
- **Related stories:** 06-07 (Languages — similar simple data table pattern), 06-09 (App wiring)
- **Spec reference:** spec §5.5 (Education), §9.2 (open question: Baccalaureate institution)
