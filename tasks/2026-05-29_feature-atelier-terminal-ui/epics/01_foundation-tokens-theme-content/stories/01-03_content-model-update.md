# Story 01-03: Content model update — types, projects, FR/EN, UI labels

> **Epic:** Foundation — Tokens, Theme & Content
> **Size:** XL
> **Status:** TODO

## Description

Reshape the typed content system to the new `PortfolioContent` model the Atelier views
consume, author the projects dataset, rewrite both locale modules, and extend the UI
labels map. The existing typed-content machinery (`LanguageProvider`/`useLanguage`)
stays; only the data shape and copy change.

`types.ts` is reshaped to:

```ts
interface PortfolioContent {
  hero: HeroContent // greet, name, tagline, roles[], cta labels
  now: NowContent // headline + body + meta (label, period)
  stats: StatTile[] // [{ n, suffix?, label }]
  marquee: string[] // tech tokens
  projects: Project[] // 8 entries
  experience: TimelineEntry[] // 7 entries
  skills: SkillCard[] // 4 cards
  process: ProcessPrinciple[] // 5 numbered principles
  contact: ContactContent // pitch + meta rows (languages here)
  ui: UiLabels // eyebrows, "Read case", "Visit live", copy labels, etc.
}
```

The `Project` and `TimelineEntry` shapes follow the design doc exactly (project `id`
union of the 8 known ids, `num`, `year`, `role`, `client`, `category`, `link`, `repo`,
`desc`, `tags`, and a nested `detail: { role, impact, stack }`). `Education` and the
standalone `spokenLanguages` types are removed; spoken languages move into
`contact.languages: string[]` rendered as a Contact-card row.

`projects.ts` is a new module holding the derived list. `fr.ts` is the localized source
of new copy (process principles, eyebrows, role-rotor terms, marquee labels where it
makes sense); `en.ts` mirrors the shape with the mockup copy as the EN baseline.
`i18n/ui.ts` is extended with nav labels, ⌘K group labels, and copy/“copied” labels.

## Acceptance Criteria

- [ ] `PortfolioContent` is defined with `hero`, `now`, `stats`, `marquee`, `projects`,
      `experience`, `skills`, `process`, `contact`, and `ui` members.
- [ ] `Project` matches the doc shape, with `id` typed as the 8-id union
      (`'soka' | 'soka-live' | 'ludoka' | 'eer' | 'shoyo' | 'ocr' | 'happy' | 'theseis'`)
      and a nested `detail: { role; impact; stack }`.
- [ ] `TimelineEntry` is `{ year; role; company; desc; stack: string[] }`.
- [ ] `Education` and standalone `spokenLanguages` types/content are removed; spoken
      languages live in `contact.languages: string[]`.
- [ ] `src/content/projects.ts` exports 8 typed `Project` entries with `num` `"01"`…`"08"`.
- [ ] `src/content/fr.ts` and `src/content/en.ts` both satisfy `PortfolioContent` and
      compile with no TS errors.
- [ ] `src/i18n/ui.ts` includes nav labels (per route), ⌘K group labels
      (Navigation/Quick/Projects), and copy/“copied” labels, plus eyebrows and footer chips.
- [ ] A content-parity test asserts FR and EN expose an identical key structure (same
      project ids, same number of experience/skills/process entries, matching `ui` keys).
- [ ] No view/component outside this story is required for the modules to type-check;
      `npm run build` passes.

## Technical Notes

- Keep the data **typed-first**: define the interfaces, then let TS enforce both locale
  modules match. The parity test backstops anything types can't (e.g. array lengths).
- Project `link`/`repo` are `string | null` (`"#"`-style placeholders allowed per doc).
- `stack` on `Project.detail` is a single `" · "`-separated string; `stack` on
  `TimelineEntry` is a `string[]`. Don't unify them — they render differently.
- Do not delete the old section content files here if other (doomed) components still
  import them; the section components are removed in 04-01. Prefer adding the new shape
  and letting the old sections break at integration, OR keep old exports temporarily if
  the build must stay green between stories — note the choice for the integrator.
- `marquee` is a flat `string[]` of tech tokens; `stats` entries carry an optional
  `suffix` (e.g. `"+"`).
- Author FR copy naturally (don't machine-translate the mockup); EN uses the mockup text.

## Files to Create/Modify

| Action | File Path                 | Purpose                                                |
| ------ | ------------------------- | ------------------------------------------------------ |
| MODIFY | `src/content/types.ts`    | New `PortfolioContent` shape; drop Education/Languages |
| CREATE | `src/content/projects.ts` | 8 typed `Project` entries (id/num/year/.../detail)     |
| MODIFY | `src/content/fr.ts`       | Rewrite to new shape (localized source of truth)       |
| MODIFY | `src/content/en.ts`       | Rewrite to new shape (mockup copy baseline)            |
| MODIFY | `src/i18n/ui.ts`          | Nav labels, ⌘K group labels, copy labels, eyebrows     |
| MODIFY | `src/content/*.test.ts`   | Update parity/shape tests to the new model             |

## Dependencies

- **Blocked by:** — (independent of the CSS/theme stories; can run in parallel with 01-01)
- **Blocks:** 02-03 (nav labels), 03-01 (projects data), 03-02 (cmdk commands reference
  projects/routes/copy labels), 03-03 & 03-04 (all views read content)

## Related

- **Epic:** foundation-tokens-theme-content
- **Related stories:** 03-01 (projects rendering), 03-03/03-04 (views)
- **Spec reference:** feature doc §Content model, §Projects shape, §Experience timeline shape

## Implementation Plan

### SOLID Analysis

- **S — Single Responsibility:** `types.ts` defines the contract; `projects.ts` holds data;
  locale modules hold copy; `ui.ts` holds micro-labels — each one concern.
- **O — Open/Closed:** adding a project means adding an entry + extending the id union;
  views iterate the array and need no change.
- **L — Liskov:** both locale modules are interchangeable `PortfolioContent` implementations.
- **I — Interface Segregation:** views consume narrow slices (`content.projects`,
  `content.process`) rather than the whole object where practical.
- **D — Dependency Inversion:** components depend on `useLanguage().content` typed by the
  interface, not on a concrete locale module.

### Subtasks

- [ ] 1. Update content tests for the new shape + parity (RED).
- [ ] 2. Reshape `types.ts`; remove Education/standalone Languages (GREEN for types).
- [ ] 3. Author `projects.ts` (8 entries).
- [ ] 4. Rewrite `fr.ts` and `en.ts` to satisfy the interface.
- [ ] 5. Extend `i18n/ui.ts` with nav/⌘K/copy labels.
- [ ] 6. QA validation — parity test, map each AC, check TypeScript.
