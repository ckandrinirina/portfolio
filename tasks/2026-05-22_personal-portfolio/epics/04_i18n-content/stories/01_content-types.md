# Story 04-01: Content type definitions

> **Epic:** Internationalization & Content Data
> **Size:** M
> **Status:** TODO

## Description

Create `src/content/types.ts`, the single TypeScript source of truth for the shape of all bilingual portfolio content. This file exports the `PortfolioContent` interface and every sub-type it depends on. Both `src/content/fr.ts` and `src/content/en.ts` must satisfy this interface via the `satisfies` operator, which means any field missing in one locale is a compile-time error rather than a runtime gap. Because the interface governs parity, its design is the most important decision in Epic 04 — it must cover every content section (hero, about, skills, experience, projects, education, spokenLanguages, contact) without leaking any presentation concern.

## Acceptance Criteria

- [ ] `src/content/types.ts` is a valid TypeScript module that exports `PortfolioContent` as a named interface (or type alias that is structurally equivalent).
- [ ] `PortfolioContent` contains a `hero` field typed as an object with at minimum: `name: string`, `title: string`, `positioning: string`, `location: string`, `ctaViewProjects: string`, `ctaDownloadCv: string`, `ctaContact: string`.
- [ ] `PortfolioContent` contains an `about` field typed as an object with at minimum: `narrative: string`.
- [ ] `PortfolioContent` contains a `skills` field typed as an array of `SkillGroup` where `SkillGroup = { label: string; items: string[] }`. The eight groups (Languages, Front-end, Back-end, Databases, Tooling/DevOps, Testing, AI/Specialized, Design tools) are enforced by having exactly 8 items, or by a tuple type if order must be fixed — a plain array is acceptable as long as the shape is typed.
- [ ] `PortfolioContent` contains an `experience` array typed as `ExperienceEntry[]` where `ExperienceEntry` includes: `company: string`, `role: string`, `period: string`, `techHighlights: string[]`, `projects: ExperienceProject[]`, and `ExperienceProject` includes: `name: string`, `description: string`.
- [ ] `PortfolioContent` contains a `projects` array typed as `ProjectEntry[]` where `ProjectEntry` includes: `name: string`, `company: string`, `description: string`, `techTags: string[]`.
- [ ] `PortfolioContent` contains an `education` array typed as `EducationEntry[]` where `EducationEntry` includes: `qualification: string`, `institution: string`, `year: string`.
- [ ] `PortfolioContent` contains a `spokenLanguages` array typed as `SpokenLanguage[]` where `SpokenLanguage` includes: `language: string`, `proficiency: string`.
- [ ] `PortfolioContent` contains a `contact` field typed as an object with at minimum: `location: string`, `intro: string`.
- [ ] All sub-types (`SkillGroup`, `ExperienceEntry`, `ExperienceProject`, `ProjectEntry`, `EducationEntry`, `SpokenLanguage`) are exported from the same file so they can be used by test files.
- [ ] No JSX, no Tailwind classes, no component imports, and no presentation logic appear in this file.
- [ ] A stub object written inline (not committed) of the form `const _check: PortfolioContent = { ... }` — or the real fr/en modules using `satisfies PortfolioContent` — compiles without error. The story is complete when TypeScript accepts both locale files against the interface.
- [ ] `npm run build` exits 0 after this file is introduced (no type regressions elsewhere).

### Edge Cases

- `institution` in `EducationEntry` must accept an empty string (`''`) to handle the Baccalaureate row where the institution is unknown — do not use a non-optional type that would require a non-empty string.
- Future-proofing: keep all sub-types exported so test files and later epics can reference exact shapes without re-declaring them locally.

## Technical Notes

- Use the `satisfies` operator in the content modules (`export default { ... } satisfies PortfolioContent`) rather than explicit type annotation, so TypeScript catches surplus properties as well as missing ones.
- TypeScript `interface` vs `type`: either is acceptable; prefer `interface` for the root `PortfolioContent` shape and `type` for simple union or alias cases.
- The `SkillGroup` type deliberately uses a simple `string[]` for `items` rather than a union of known skill names, because the items are display strings that vary by locale (e.g., translated labels are not required, but the array must not be empty).
- `techHighlights` on `ExperienceEntry` is a flat string array (not a `SkillGroup` — no label needed at this level).
- No runtime code in this file — only `interface` / `type` declarations and `export` statements.

## Files to Create/Modify

| Action | File Path              | Purpose                                               |
| ------ | ---------------------- | ----------------------------------------------------- |
| CREATE | `src/content/types.ts` | Shared `PortfolioContent` interface and all sub-types |

## Dependencies

- **Blocked by:** 01-01 (TypeScript must be configured before this file is authored)
- **Blocks:** 04-02, 04-03, 04-04

## Related

- **Epic:** 04_i18n-content
- **Related stories:** 04-02, 04-03, 04-04
- **Spec reference:** spec §5 (all sections); folder-structure.md §Section↔content mapping
