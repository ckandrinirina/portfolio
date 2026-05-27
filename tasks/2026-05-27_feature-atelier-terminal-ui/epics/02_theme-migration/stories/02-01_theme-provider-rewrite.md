# 02-01 · Rewrite ThemeProvider for 4 palettes

**Status:** TODO · **Size:** M · **Blocked by:** 01-02

## Description

Rewrite `src/theme/ThemeProvider.tsx` so that it manages four palettes
(`default | paper | ocean | forest`) by toggling the `data-theme` attribute on
`<html>` (no class manipulation). Persist to `localStorage['theme']`. Provide
a `cycle()` action that walks `default → ocean → forest → paper → default`.

## Files affected

- `src/theme/ThemeProvider.tsx` — rewritten.
- `src/theme/useTheme.ts` — return shape extended in story 02-03 (touched here
  only via type changes).

## Implementation notes

```tsx
import { createContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'default' | 'paper' | 'ocean' | 'forest'

export const THEME_CYCLE: Theme[] = ['default', 'ocean', 'forest', 'paper']
const STORAGE_KEY = 'theme'

export type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  cycle: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function readInitial(): Theme {
  if (typeof window === 'undefined') return 'default'
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === 'paper' || raw === 'ocean' || raw === 'forest' || raw === 'default') {
    return raw
  }
  // Legacy migration
  if (raw === 'light') return 'paper'
  if (raw === 'dark')  return 'default'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'default' : 'paper'
}

function applyTheme(t: Theme) {
  if (t === 'default') document.documentElement.removeAttribute('data-theme')
  else                 document.documentElement.setAttribute('data-theme', t)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitial)

  useEffect(() => {
    applyTheme(theme)
    try { window.localStorage.setItem(STORAGE_KEY, theme) } catch { /* private mode */ }
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)
  const cycle = () =>
    setThemeState((cur) => THEME_CYCLE[(THEME_CYCLE.indexOf(cur) + 1) % THEME_CYCLE.length])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycle }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

## Acceptance criteria

- [ ] Exports `Theme` type, `THEME_CYCLE` array, `ThemeContext`, `ThemeProvider`.
- [ ] On mount, reads `localStorage['theme']`; falls back to
      `prefers-color-scheme: dark ? 'default' : 'paper'`.
- [ ] Legacy values `'light'` / `'dark'` migrate to `'paper'` / `'default'`.
- [ ] `setTheme('paper')` sets `<html data-theme="paper">`.
- [ ] `setTheme('default')` removes the `data-theme` attribute.
- [ ] `cycle()` walks `default → ocean → forest → paper → default`.
- [ ] Each setter persists to `localStorage['theme']`.
- [ ] Try/catch around `localStorage.setItem` (Safari private mode).

## Test notes

Covered by story 02-05 (full unit test suite for the provider).

## Edge cases

- SSR safety: `typeof window === 'undefined'` guard in `readInitial`. (Vite
  is client-only but defensive code costs nothing.)
- Race with anti-FOUC inline script (story 02-02): both read the same
  storage key. The inline script applies the attribute first; the React
  provider re-applies the same value (idempotent), so no flash.
