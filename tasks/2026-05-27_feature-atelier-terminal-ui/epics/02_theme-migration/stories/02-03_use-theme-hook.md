# 02-03 · Update `useTheme` hook return shape

**Status:** TODO · **Size:** S · **Blocked by:** 02-01

## Description

Update `src/theme/useTheme.ts` to read the new context value: `{ theme,
setTheme, cycle }`. Throw a clear error if used outside a `ThemeProvider`.

## Files affected

- `src/theme/useTheme.ts`

## Implementation notes

```ts
import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a <ThemeProvider>')
  return ctx
}
```

## Acceptance criteria

- [ ] Returns `{ theme, setTheme, cycle }`.
- [ ] Throws if context is null (component used outside the provider).
- [ ] TypeScript inference makes `theme` typed as the `Theme` union from
      `ThemeProvider`.

## Test notes

Covered indirectly by 02-05.

## Edge cases

- None new.
