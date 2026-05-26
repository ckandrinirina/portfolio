/**
 * LanguageProvider — React context provider that owns the active locale state,
 * resolves it from storage / browser preference, keeps <html lang> in sync,
 * and exposes { locale, setLocale, content, t } to all descendants.
 *
 * Locale resolution order:
 *   1. localStorage['locale'] if 'fr' or 'en'
 *   2. navigator.language.slice(0, 2) if 'fr' or 'en'
 *   3. 'fr' (default)
 *
 * localStorage access is wrapped in try/catch to handle SecurityError
 * thrown by browsers in private/restricted mode.
 */

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PortfolioContent } from '../content/types'
import frContent from '../content/fr'
import enContent from '../content/en'
import { ui, type UiLabels } from './ui'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Locale = 'fr' | 'en'

export type LanguageContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  content: PortfolioContent
  t: (key: keyof UiLabels) => string
}

// Named export so tests (and future consumers) can read the context directly.
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'locale'

// ---------------------------------------------------------------------------
// Pure locale-resolution helpers (not hooks — safe to call in useState init)
// ---------------------------------------------------------------------------

function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw === 'fr' || raw === 'en' ? raw : null
  } catch {
    // SecurityError in private mode — treat as absent
    return null
  }
}

function readNavigatorLocale(): Locale | null {
  if (typeof window === 'undefined' || !navigator?.language) return null
  const prefix = navigator.language.slice(0, 2)
  return prefix === 'fr' || prefix === 'en' ? prefix : null
}

/** Lazy initializer — runs once on first render. */
// eslint-disable-next-line react-refresh/only-export-components
export function resolveInitialLocale(): Locale {
  return readStoredLocale() ?? readNavigatorLocale() ?? 'fr'
}

function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // localStorage unavailable (privacy mode) — in-memory state stays correct.
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale)

  // Keep <html lang> in sync on every locale change (including initial mount).
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    persistLocale(l)
  }, [])

  const content: PortfolioContent = locale === 'en' ? enContent : frContent

  const t = useCallback(
    (key: keyof UiLabels): string => ui[locale][key],
    [locale],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, content, t }),
    [locale, setLocale, content, t],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
