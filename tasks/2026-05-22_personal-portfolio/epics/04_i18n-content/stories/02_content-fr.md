# Story 04-02: French content module (default)

> **Epic:** Internationalization & Content Data
> **Size:** L
> **Status:** TODO

## Description

Author `src/content/fr.ts`, the default-locale content module. This file exports a single object that satisfies the `PortfolioContent` interface and contains every piece of portfolio content in French. It is the authoritative source for the site's default experience: French is displayed on first load for any visitor whose browser language is not explicitly set to English, and it is the language the site designer has validated visually. The data is drawn directly from spec §5 and the CV, transcribed faithfully — including all seven employers, their named projects, all eight skill groups, three education rows, spoken-language proficiencies, and contact information limited to city and country.

Because this is the largest single content file in the project, accuracy and completeness take priority. Every experience must appear in reverse-chronological order; every named project listed in spec §5.4 must have its own `ExperienceProject` entry; the contact section must contain only "Antananarivo, Madagascar" as the location — never a street address.

## Acceptance Criteria

- [ ] `src/content/fr.ts` compiles without error: the exported object uses `satisfies PortfolioContent` (or an equivalent explicit type annotation) and TypeScript accepts it.
- [ ] `hero` section: `name` is `"Erick Andrinirina"`, `title` is `"Développeur Fullstack JavaScript"` (or equivalent French), `positioning` references 7 years of experience, `location` is `"Antananarivo, Madagascar"`, and all three CTA label strings are present in French.
- [ ] `about.narrative` is a coherent French paragraph matching spec §5.2 (experienced Fullstack developer, 7 years, React/Angular/Node.js/Symfony/Laravel, MongoDB/PostgreSQL/MySQL, motivated by technical challenges).
- [ ] `skills` contains exactly 8 `SkillGroup` entries covering the groups: Languages, Front-end (frameworks & libraries), Back-end (frameworks), Databases, Tooling & DevOps, Testing, AI & Specialized, and Project & design tools — with each group's `items` matching the skill lists in spec §5.3.
- [ ] `experience` array has exactly 7 entries in reverse-chronological order:
  1. SOKA / YAS Madagascar — Jan 2025 – present
  2. BMOI Madagascar — Jul 2024 – Jan 2025
  3. SHOYO — Jan 2021 – Jul 2024
  4. VTC Academy — Jun 2020 – Dec 2020
  5. PANAFRI HELP — Jan 2020 – Jun 2020
  6. CREACTISOFT — Sept 2019 – Dec 2020
  7. INGENOSYA — Oct 2018 – Sept 2019
- [ ] Each experience entry's `projects` array contains all named projects from spec §5.4:
  - SOKA/YAS: SOKA CLUB, SOKA LIVE, LUDOKA
  - BMOI: EER Full Digital
  - SHOYO: SHOYO, THESEIS, Happy Capital / My Capital Immo, OCR information extraction
  - VTC Academy: VTC Academy platform
  - PANAFRI HELP: PANAFRI HELP platform
  - CREACTISOFT: IPSUM, SOLIUS, MOZART, ELISE
  - INGENOSYA: BNI Madagascar, FMFP, FORET MAD
- [ ] `projects` (curated/derived list) contains at minimum the following entries: SOKA Club, SOKA Live, LUDOKA, EER Full Digital, SHOYO, THESEIS, Happy Capital, OCR/GPT-4, VTC Academy, PANAFRI HELP, and representative CREACTISOFT and INGENOSYA items. Each entry has a non-empty `description` and a populated `techTags` array.
- [ ] `education` array has exactly 3 entries in reverse-chronological order:
  1. Advanced web development training — NEITIC — June 2019
  2. Master's Engineer in Electronics, Applied Computing track — École Supérieure Polytechnique d'Antananarivo — June 2018
  3. Scientific Baccalaureate — `institution: ''` (empty string, institution unknown) — June 2013
- [ ] `spokenLanguages` has exactly 3 entries: Malagasy (native/langue maternelle), French (courant/fluent), English (niveau professionnel/working proficiency). Labels and proficiency strings are in French.
- [ ] `contact.location` is exactly `"Antananarivo, Madagascar"` — no street, no postal code, no full home address anywhere in the file.
- [ ] `contact.intro` is a short French invitation to get in touch.
- [ ] No TypeScript `// @ts-ignore` or `as unknown as` casts appear in this file.
- [ ] `npm run build` exits 0 after this file is added.

### Edge Cases

- CREACTISOFT overlaps chronologically with VTC Academy and PANAFRI HELP (Sept 2019 – Dec 2020). Both the overlapping and the main role periods must be transcribed exactly as they appear on the CV — do not merge or elide them.
- The Baccalaureate institution is unknown/not on CV: use `institution: ''` as specified by the type definition to avoid a type error.
- GitHub and LinkedIn URLs are `[TO BE DEFINED]` — they are not in the content module (they live in `src/lib/constants.ts`). The contact section does not need URL fields.

## Technical Notes

- Export pattern: `export default { ... } satisfies PortfolioContent` — this is the canonical pattern for content modules in this project, as it catches both missing and surplus properties.
- Tech highlights on each experience (`techHighlights`) should be a concise, flat array of technology names drawn from the stack hints in spec §5.4 (e.g., for SOKA: `['Next.js', 'NestJS', 'Prisma', 'Redux Toolkit', 'React Admin', 'Tailwind CSS', 'PostgreSQL', 'Web3/blockchain', 'real-time messaging']`).
- The `projects` array at the root of `PortfolioContent` is the curated showcase list (derived from the experience entries), not a duplication of every sub-project. It may include a subset of the most noteworthy projects plus a representative entry per smaller employer.
- All text strings are plain UTF-8 — no HTML tags, no Markdown, no JSX in the data.
- Descriptions should be concise (1-3 sentences) but must convey the project's purpose, per spec §5.4.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/content/fr.ts` | French portfolio content — default locale |

## Dependencies

- **Blocked by:** 04-01 (PortfolioContent interface must exist before this file can satisfy it)
- **Blocks:** 04-05, 04-07

## Related

- **Epic:** 04_i18n-content
- **Related stories:** 04-01, 04-03, 04-07
- **Spec reference:** spec §5 (all subsections — hero, about, skills, experience, education, languages, contact)
