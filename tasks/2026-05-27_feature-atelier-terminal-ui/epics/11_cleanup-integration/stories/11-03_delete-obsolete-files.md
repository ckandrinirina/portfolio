# 11-03 · Delete obsolete files

**Status:** TODO · **Size:** M · **Blocked by:** 06-05, 07-*, 08-*, 09-*

## Description

Delete the legacy code that's been replaced. Verify the app still builds and
all tests pass after deletion.

## Files affected

Delete:

- `src/components/layout/Header.tsx` (+ `.test.tsx`)
- `src/components/layout/Footer.tsx` (+ `.test.tsx`)
- `src/components/layout/Section.tsx` (+ `.test.tsx` if any)
- `src/components/sections/Hero.tsx` (+ `.test.tsx`)
- `src/components/sections/About.tsx` (+ `.test.tsx`)
- `src/components/sections/Skills.tsx` (+ `.test.tsx`)
- `src/components/sections/Experience.tsx` (+ `.test.tsx`)
- `src/components/sections/Projects.tsx` (+ `.test.tsx`)
- `src/components/sections/Education.tsx` (+ `.test.tsx`)
- `src/components/sections/Languages.tsx` (+ `.test.tsx`)
- `src/components/sections/Contact.tsx` (+ `.test.tsx`)
- `src/components/sections/` (empty dir)
- `src/hooks/useScrollSpy.ts` (+ `.test.ts`)

(`src/components/ui/ThemeToggle.tsx` is deleted in 02-06; the others go here.)

## Implementation notes

```sh
git rm src/components/layout/Header.tsx src/components/layout/Footer.tsx src/components/layout/Section.tsx
git rm -r src/components/sections/
git rm src/hooks/useScrollSpy.ts src/hooks/useScrollSpy.test.ts
# also any .test.tsx co-located with each
```

Run `grep -RIn "useScrollSpy\|Section\.tsx\|components/sections\|Header\.tsx\|Footer\.tsx" src/` and clean up any leftover imports.

## Acceptance criteria

- [ ] All listed files gone.
- [ ] `npm run build` passes.
- [ ] `npm run test -- --run` passes.
- [ ] `grep` finds no remaining references.

## Test notes

The deletion itself is the test.

## Edge cases

- If a deleted test file was importing a shared fixture, the fixture may
  become orphaned (only deleted file referenced it). Sweep for and remove
  unused fixtures.
