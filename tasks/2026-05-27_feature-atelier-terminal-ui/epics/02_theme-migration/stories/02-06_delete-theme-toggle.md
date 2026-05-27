# 02-06 · Delete `ThemeToggle.tsx`

**Status:** TODO · **Size:** S · **Blocked by:** 02-04

## Description

Remove the legacy `ThemeToggle` component and its test now that
`ThemeSwitcher` is in place. Also update any imports that referenced it
(`Header.tsx` if still present at this point).

## Files affected

- `src/components/ui/ThemeToggle.tsx` — **deleted**.
- `src/components/ui/ThemeToggle.test.tsx` — **deleted**.
- Any file importing `ThemeToggle` — temporarily comment-out / replace with
  `ThemeSwitcher` (Header is fully deleted later in Epic 11, but during the
  intermediate state, `Header.tsx` may still reference it).

## Implementation notes

Run `grep -RIn "ThemeToggle" src/` first to enumerate dependents.

If `Header.tsx` is still alive (it is until Epic 11), swap its `ThemeToggle`
import for `ThemeSwitcher`. The Header itself will be deleted in Epic 11; this
swap just keeps the app building in the interim.

## Acceptance criteria

- [ ] `src/components/ui/ThemeToggle.tsx` no longer exists.
- [ ] `src/components/ui/ThemeToggle.test.tsx` no longer exists.
- [ ] `grep -RIn "ThemeToggle" src/` returns no matches.
- [ ] `npm run build` succeeds.
- [ ] `npm run test -- --run` passes (no test references the deleted file).

## Test notes

None new.

## Edge cases

- If `Header.tsx` was deleted before this story runs (it shouldn't be — Epic
  11 covers that), there's nothing to swap. Skip the swap step.
