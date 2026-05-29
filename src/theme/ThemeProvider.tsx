import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** The four Atelier palettes. `default` is the Ember `:root` palette. */
export type Theme = 'default' | 'paper' | 'ocean' | 'forest'

export type ThemeContextValue = {
  theme: Theme
  setTheme: (next: Theme) => void
  /** Advance through the documented cycle order and persist. */
  cycle: () => void
}

// Named export so tests can read or inject the context directly.
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'theme'

/** Documented cycle order: default → ocean → forest → paper → default. */
const CYCLE_ORDER: readonly Theme[] = ['default', 'ocean', 'forest', 'paper']

const THEMES: readonly Theme[] = ['default', 'paper', 'ocean', 'forest']

function isTheme(value: string | null): value is Theme {
  return value !== null && (THEMES as readonly string[]).includes(value)
}

function readStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return isTheme(raw) ? raw : null
  } catch {
    return null
  }
}

function readSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? (readSystemPrefersDark() ? 'default' : 'paper')
}

/**
 * Apply a theme to `<html>`: `default` removes the attribute so the `:root`
 * Ember palette governs; every other theme sets `data-theme="<theme>"`.
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement
  if (theme === 'default') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // localStorage unavailable (privacy mode) — in-memory state stays correct.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    persistTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const cycle = useCallback(() => {
    setThemeState((prev) => {
      const idx = CYCLE_ORDER.indexOf(prev)
      return CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length]
    })
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, cycle }),
    [theme, setTheme, cycle],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
