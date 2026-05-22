# Story 04-03: English content module

> **Epic:** Internationalization & Content Data
> **Size:** L
> **Status:** TODO

## Description

Author `src/content/en.ts`, the English-locale content module. This file mirrors `src/content/fr.ts` in every structural aspect — same interface, same keys, same array lengths, same ordering — but every user-visible string is idiomatic English. The `PortfolioContent` interface guarantees structural parity at compile time, and the dedicated parity test (story 04-07) verifies equal array lengths at runtime. This story exists because EN/FR parity cannot be assumed; it must be explicitly authored and verified.

The content is a faithful translation of the French module. Skill names and technology names (React, NestJS, PostgreSQL…) are identical in both locales and require no translation. Only narrative copy — the hero positioning line, the about paragraph, project descriptions, proficiency labels, and the contact intro — requires genuine localization into idiomatic English.

## Acceptance Criteria

- [ ] `src/content/en.ts` compiles without error: the exported object uses `satisfies PortfolioContent` and TypeScript accepts it.
- [ ] `hero` section: `name` is `"Erick Andrinirina"`, `title` is `"Fullstack JavaScript Engineer"`, `positioning` references 7 years of experience in English, `location` is `"Antananarivo, Madagascar"`, and all three CTA label strings are present in English.
- [ ] `about.narrative` is an idiomatic English paragraph matching spec §5.2 in meaning (experienced Fullstack developer, 7 years, React/Angular/Node.js/Symfony/Laravel, MongoDB/PostgreSQL/MySQL, motivated by technical challenges).
- [ ] `skills` contains exactly 8 `SkillGroup` entries; group labels are in English ("Languages", "Front-end frameworks & libraries", "Back-end frameworks", "Databases", "Tooling & DevOps", "Testing", "AI & Specialized", "Project & design tools"); `items` arrays are identical to those in `fr.ts` (technology names do not change between locales).
- [ ] `experience` array has exactly 7 entries in the same reverse-chronological order as `fr.ts`, with the same companies, roles, and periods — only the prose descriptions of projects are translated to English.
- [ ] Each experience entry's `projects` array contains the same number of entries as the corresponding entry in `fr.ts`; project `name` values are identical (proper nouns); `description` values are in English.
- [ ] `projects` (curated list) has the same number of entries as `fr.ts`; `name` and `company` values are identical; `description` strings are in English; `techTags` arrays are identical.
- [ ] `education` array has exactly 3 entries in the same order as `fr.ts`; `qualification` strings are translated to English; `institution` values are identical (proper nouns); `year` values are identical; the Baccalaureate entry still has `institution: ''`.
- [ ] `spokenLanguages` has exactly 3 entries with English proficiency labels: Malagasy (Native), French (Fluent), English (Working proficiency).
- [ ] `contact.location` is exactly `"Antananarivo, Madagascar"`. No full address.
- [ ] `contact.intro` is a short English invitation to get in touch.
- [ ] No TypeScript `// @ts-ignore` or `as unknown as` casts appear in this file.
- [ ] `npm run build` exits 0 after this file is added.
- [ ] `src/content/content.test.ts` (story 04-07) passes for this module when run after authoring.

### Edge Cases

- Technology names (React, Node.js, PostgreSQL, etc.) and proper nouns (company names, project names) must remain unchanged between locales — do not translate "SOKA CLUB" to "SOKA CLUB [EN]" or alter stack names.
- `institution: ''` for the Baccalaureate entry must be preserved in both locales so the parity test does not flag a structural divergence.
- `techTags` arrays on `ProjectEntry` items must be identical between `fr.ts` and `en.ts`; only `description` and group `label` strings differ between locales.

## Technical Notes

- Export pattern: `export default { ... } satisfies PortfolioContent` — identical to the French module.
- A practical workflow: copy `fr.ts`, then translate only the user-visible narrative strings (`positioning`, `narrative`, `description` fields, skill group `label` strings, proficiency strings, CTA labels, contact intro). Leave technology names, company names, project names, and period strings unchanged.
- If any English phrasing feels ambiguous compared to the French original, prefer clarity over literal translation — the goal is idiomatic English, not word-for-word rendering.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/content/en.ts` | English portfolio content |

## Dependencies

- **Blocked by:** 04-01 (PortfolioContent interface must exist before this file can satisfy it)
- **Blocks:** 04-05, 04-07

## Related

- **Epic:** 04_i18n-content
- **Related stories:** 04-01, 04-02, 04-07
- **Spec reference:** spec §5 (all subsections)
