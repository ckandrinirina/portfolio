# 03-02 · `projects.ts` — 8-project data module

**Status:** TODO · **Size:** L · **Blocked by:** 03-01

## Description

Create `src/content/projects.ts` with the 8 project entries (SOKA, SOKA Live,
Ludoka, EER, SHOYO, OCR, Happy Capital, THESEIS) verbatim from the mockup
React source. Export both the array and a `Project` type alias.

## Files affected

- `src/content/projects.ts` — new module.
- `src/content/projects.test.ts` — assert id/num/year/category presence.

## Implementation notes

The mockup's `PROJECTS` array lives at `/tmp/script-37f20218.js` lines 7–112
(extracted during the design phase). Copy verbatim into TypeScript with
proper typing:

```ts
// src/content/projects.ts

export type ProjectId =
  | 'soka' | 'soka-live' | 'ludoka' | 'eer'
  | 'shoyo' | 'ocr' | 'happy' | 'theseis'

export interface Project {
  id: ProjectId
  num: string                 // "01" … "08"
  name: string
  year: string                // "2025" or "2021–24"
  role: string                // "Lead Fullstack"
  client: string              // "YAS Madagascar"
  category: string            // "Platform · Web3"
  link: string | null
  repo: string | null
  desc: string
  tags: string[]
  detail: {
    role: string
    impact: string
    stack: string             // " · "-separated
  }
}

export const PROJECTS: Project[] = [
  { id: 'soka', num: '01', name: 'SOKA Club', year: '2025', /* … verbatim from mockup … */ },
  // … 7 more
]
```

Use the **exact** strings from the mockup. Keep en-dash in years (`2021–24`),
em-dash in descriptions (`—`).

## Acceptance criteria

- [ ] All 8 projects present with the IDs above and `num` `'01'` … `'08'`.
- [ ] All fields populated; `link` and `repo` are `'#'` or `null` as in mockup.
- [ ] `tags` arrays match the mockup's tag arrays.
- [ ] `detail.role`, `detail.impact`, `detail.stack` strings copied verbatim.
- [ ] `npm run build` passes.

## Test notes

Quick assertion test:
```ts
import { PROJECTS } from './projects'
it('has 8 unique ids', () => {
  expect(PROJECTS).toHaveLength(8)
  expect(new Set(PROJECTS.map(p => p.id)).size).toBe(8)
})
it('uses sequential nums 01–08', () => {
  expect(PROJECTS.map(p => p.num)).toEqual(['01','02','03','04','05','06','07','08'])
})
```

## Edge cases

- The mockup writes some `link: "#"` — preserve verbatim (UI distinguishes `"#"`
  from `null` if needed; here we treat `"#"` as "no live link yet").
