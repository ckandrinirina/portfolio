# 03-07 · Clean obsolete content tests

**Status:** TODO · **Size:** S · **Blocked by:** 03-03, 03-04

## Description

Remove tests that referenced the removed slices (`education`,
`spokenLanguages`) from `fr.test.ts`, `en.test.ts`, and `types.test.ts`. Also
delete any obsolete fixtures.

## Files affected

- `src/content/fr.test.ts` — drop Education / Languages assertions.
- `src/content/en.test.ts` — drop Education / Languages assertions.
- `src/content/types.test.ts` — drop any `Education` / `SpokenLanguage` references.

## Implementation notes

`grep -RIn "education\|spokenLanguages\|SpokenLanguage" src/content/ src/` to
find references. Remove the cases; add cases for new slices (`process`, `now`,
`stats`, `marquee`, `contact.languages`).

## Acceptance criteria

- [ ] `grep -RIn "education\|spokenLanguages\|SpokenLanguage" src/content/` returns no matches.
- [ ] `npm run test -- --run` passes.
- [ ] At least one case in each of `fr.test.ts` / `en.test.ts` asserts
      `process[0].title` and `contact.languages` are present.

## Test notes

None new.

## Edge cases

- Some old tests may have hardcoded copy strings ("Université d'Antananarivo")
  in Education — make sure those are removed cleanly (not just commented).
