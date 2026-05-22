# Story 06-05: Projects section

> **Epic:** Content Sections
> **Size:** L
> **Status:** TODO

## Description

Implement `src/components/sections/Projects.tsx`, the curated project showcase section.
The component reads `content.projects[]` via `useLanguage()` — a dedicated array derived
from the experience data and authored in Epic 04 — and renders each project as a `Card`
with the project name, the company or client it was built for, a short description, and a
set of technology `Badge` tags. All projects are named and attributed per the owner's
decision. The section uses the shared `Section` wrapper with `id="projects"` and renders
responsively in a grid or column layout.

## Acceptance Criteria

- [ ] The component renders inside a `<section id="projects">` (provided by the `Section` wrapper).
- [ ] An `<h2>` heading is rendered by the `Section` wrapper with the locale-appropriate label.
- [ ] All projects from `content.projects[]` are rendered — at minimum: SOKA Club, SOKA Live, LUDOKA, EER Full Digital, SHOYO (platform), THESEIS, Happy Capital / My Capital Immo, OCR/GPT-4 extraction, VTC Academy training site, PANAFRI HELP funding platform, IPSUM, SOLIUS, MOZART, ELISE, BNI Madagascar, FMFP, FORET MAD.
- [ ] Each project is rendered as a `Card` component.
- [ ] Each Card displays: project name, company / client name, description text.
- [ ] Each Card displays technology tags as `Badge` chips.
- [ ] Cards use a responsive grid layout (e.g. 1 column mobile → 2–3 columns desktop).
- [ ] Switching the locale updates description text without a page reload.
- [ ] Project names and company/client attributions remain unchanged on locale switch (they are proper nouns).
- [ ] No TypeScript errors on `npm run build`.

## Technical Notes

- `content.projects[]` is a dedicated array in the content object (not re-derived in the component from `content.experience`). The expected shape is approximately: `{ name: string; company: string; description: string; tech: string[] }`. Align with Epic 04 types.
- Use `Card` from Epic 02 (story 02-06) and `Badge` from Epic 02 (story 02-05).
- Responsive grid suggestion: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` inside a `Container`.
- Per spec §7: all employers and projects are named, per the owner's explicit choice. If any client later requests anonymisation, individual entries can be relabelled in the content files without redesigning this component.
- Project ordering: group by employer (matching the Experience section order) or use whatever order the content author defines in `fr.ts`/`en.ts`. Do not re-sort in the component.
- `Badge` tech tags inside a Card: use a `<div className="flex flex-wrap gap-1.5">` wrapper so they wrap gracefully on narrow cards.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/components/sections/Projects.tsx` | Project showcase section with Card and Badge components |

## Dependencies

- **Blocked by:** 04-05 (LanguageProvider — `useLanguage()` must exist), 02-06 (Card), 02-09 (Section wrapper).
- **Blocks:** 06-09 (wire sections into App).

## Related

- **Epic:** content-sections
- **Related stories:** 06-04 (Experience — same underlying employer data), 06-03 (Skills — also uses Badge), 06-09 (App wiring)
- **Spec reference:** spec §5.4 (Projects by role), §7 (project naming decision)
