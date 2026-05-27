# 02-05 · ThemeProvider unit tests

**Status:** TODO · **Size:** M · **Blocked by:** 02-01, 02-02

## Description

Comprehensive test for the rewritten `ThemeProvider`: initial read order,
attribute writes, legacy migration, persistence, and SSR-safety guard.

## Files affected

- `src/theme/ThemeProvider.test.tsx` — replaces the existing file from the
  old plan's story 03-01.
- `src/theme/themeBootstrap.test.ts` — (optional) update or delete the old test
  from old plan 03-02; replace with a parity test that the bootstrap script
  logic matches `readInitial` (use the exported source string from
  `themeBootstrap.ts` if you created it in 02-02).

## Implementation notes

Key cases to cover:

1. **Initial reads from `localStorage` for each of 4 valid values.**
2. **Legacy migration:** `'dark' → 'default'`, `'light' → 'paper'`.
3. **System preference fallback:** no value, `matchMedia('(prefers-color-scheme: dark)')`
   → mocked `matches: true` returns `default`, `false` returns `paper`.
4. **`setTheme(palette)` sets `<html data-theme>` correctly** for each palette.
5. **`setTheme('default')` removes the attribute.**
6. **`cycle()` walks `default → ocean → forest → paper → default`.**
7. **Persistence:** each setter writes to `localStorage`.
8. **localStorage throw resilience:** stub `setItem` to throw; provider does
   not crash and theme still applies in-memory.

```ts
import { render, act } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './useTheme'

function Probe({ onReady }: { onReady: (api: ReturnType<typeof useTheme>) => void }) {
  const api = useTheme()
  onReady(api)
  return null
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})
```

## Acceptance criteria

- [ ] All 8 cases above are tested.
- [ ] Tests pass: `npm run test -- --run src/theme/ThemeProvider.test.tsx`.
- [ ] `matchMedia` is mocked / shimmed so jsdom doesn't throw.

## Test notes

Use `vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true, ...} as any)`
to control the system preference branch.

## Edge cases

- Clearing `data-theme` between tests in `beforeEach` is required — otherwise
  test order matters.
