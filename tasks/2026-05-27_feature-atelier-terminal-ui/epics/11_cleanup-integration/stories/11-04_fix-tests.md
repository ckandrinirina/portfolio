# 11-04 · Update / fix any leftover tests

**Status:** TODO · **Size:** M · **Blocked by:** 11-03

## Description

Sweep for test files that still reference removed components or stale
assertions. Update or delete each so `npm run test -- --run` is fully green.

## Files affected

- Any `*.test.*` in `src/` that imports a deleted file.
- `src/App.test.tsx` — rewrite around the new shell.

## Implementation notes

```sh
npm run test -- --run 2>&1 | tail -200
```

Address each failure:
- If the test asserts old behavior that no longer exists, delete the test case.
- If the test asserts a new behavior, update the assertions.

Key tests likely to need attention:
- `src/App.test.tsx` (old version asserted sections-based rendering).
- Any integration tests around scroll spy, dark-class toggle, footer copyright.

## Acceptance criteria

- [ ] `npm run test -- --run` exits 0.
- [ ] No `it.todo` or `it.skip` left behind without justification.
- [ ] At least one integration test asserts: clicking sidebar "Work" row
      renders WorkView; pressing `⌘K` opens the palette.

## Test notes

This is the catch-all; expect a few iterations.

## Edge cases

- Tests that depended on `useScrollSpy` may have used a polyfill for
  `IntersectionObserver`. The new `useScrollReveal` also uses IO; keep that
  polyfill (in `src/test/setup.ts`) in place.
