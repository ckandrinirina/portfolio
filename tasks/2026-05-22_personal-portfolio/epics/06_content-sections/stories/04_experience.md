# Story 06-04: Experience section

> **Epic:** Content Sections
> **Size:** L
> **Status:** TODO

## Description

Implement `src/components/sections/Experience.tsx`, the professional experience section.
The component reads `content.experience[]` via `useLanguage()` and renders all seven roles
in reverse-chronological order (most recent first) as `Card` components. Each card
displays the company name, job title, employment period, a list of tech stack highlights,
and a set of project bullets describing what was built during that role. The section uses
the shared `Section` wrapper with `id="experience"` and adapts to the active locale.

## Acceptance Criteria

- [ ] The component renders inside a `<section id="experience">` (provided by the `Section` wrapper).
- [ ] An `<h2>` heading is rendered by the `Section` wrapper with the locale-appropriate label.
- [ ] All seven roles are rendered, ordered most-recent-first (SOKA/YAS Madagascar first, INGENOSYA last).
- [ ] Each role is rendered as a `Card` component.
- [ ] Each Card displays: company name, job title, employment period (e.g. "Jan 2025 – present").
- [ ] Each Card displays tech stack highlights for that role.
- [ ] Each Card displays one or more project bullets describing the projects delivered in that role.
- [ ] The layout is responsive: cards stack on mobile, and use a comfortable readable width on desktop.
- [ ] Switching the locale updates any locale-aware text (descriptions, bullet labels) without a page reload.
- [ ] No TypeScript errors on `npm run build`.

## Technical Notes

- `content.experience[]` is an array of role objects; the expected shape (from Epic 04 types) is approximately: `{ company: string; role: string; period: string; techHighlights: string[]; projects: { name: string; description: string }[] }`.
- Use `Card` from Epic 02 (story 02-06); compose card content inside with standard HTML elements (`<h3>` for company or role name, `<p>`, `<ul>`, etc.).
- Tech highlights can be rendered as `Badge` chips (same as Skills) or as plain comma-separated text — use Badges if the design shows chips; plain text otherwise. Match whatever the design file specifies.
- Project bullets within a card: render as a `<ul>` with `<li>` items for semantic list structure and screen-reader clarity.
- The employment period string is locale-neutral (month abbreviations are the same in EN and FR in the content files, or the content files use full locale-specific strings — align with what Epic 04 produces).
- "present" in the current role's period must match the active locale (French: "aujourd'hui" or "en cours"). Confirm the shape with the Epic 04 implementer; if the content files return a translated string, no extra work is needed here.
- Reverse-chronological order should be enforced by the content data (Epic 04 authors `fr.ts`/`en.ts` in that order), but add a comment noting the assumption so a future content update does not silently break order.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/components/sections/Experience.tsx` | Reverse-chronological role cards section |

## Dependencies

- **Blocked by:** 04-05 (LanguageProvider — `useLanguage()` must exist), 02-06 (Card), 02-09 (Section wrapper).
- **Blocks:** 06-09 (wire sections into App).

## Related

- **Epic:** content-sections
- **Related stories:** 06-05 (Projects — content is derived from the same experience data), 06-03 (Skills — also uses Badge chips), 06-09 (App wiring)
- **Spec reference:** spec §5.4 (Professional experience — roles table and projects by role)
