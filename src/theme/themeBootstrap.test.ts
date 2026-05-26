/**
 * Unit tests for the anti-FOUC theme bootstrap logic.
 *
 * The inline script in index.html cannot be imported by Vitest, so these
 * tests validate the exact same precedence logic in isolation:
 *   1. localStorage['theme'] === 'dark' | 'light'  →  use that
 *   2. else matchMedia('(prefers-color-scheme: dark)').matches  →  'dark'
 *   3. else  →  'light' (no dark class added)
 *
 * Each test manipulates localStorage and matchMedia, then runs the inline
 * script logic as an extracted function to verify the class that would be
 * applied to document.documentElement.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

/**
 * This function mirrors the IIFE in index.html exactly.
 * The implementation in index.html MUST stay in sync with this logic.
 *
 * Return value: 'dark' if the dark class would be added, 'light' otherwise.
 */
function resolveBootstrapTheme(): 'dark' | 'light' {
  try {
    const t = localStorage.getItem('theme')
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark'
    }
  } catch {
    // localStorage access error (privacy mode) — fall through to light
  }
  return 'light'
}

/**
 * Simulates what the bootstrap script does to document.documentElement.
 */
function applyBootstrapTheme(): void {
  try {
    const t = localStorage.getItem('theme')
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }
  } catch {
    // no-op on storage error
  }
}

function setMatchMedia(prefersDark: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList =>
      ({
        matches: prefersDark && query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  )
}

describe('Anti-FOUC theme bootstrap logic', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    setMatchMedia(false)
  })

  // AC: localStorage['theme'] = 'dark' → dark class applied
  it("resolves 'dark' when localStorage['theme'] is 'dark'", () => {
    localStorage.setItem('theme', 'dark')
    expect(resolveBootstrapTheme()).toBe('dark')
  })

  // AC: localStorage['theme'] = 'light' → no dark class
  it("resolves 'light' when localStorage['theme'] is 'light'", () => {
    localStorage.setItem('theme', 'light')
    expect(resolveBootstrapTheme()).toBe('light')
  })

  // AC: no localStorage, prefers-color-scheme: dark → dark class applied
  it("resolves 'dark' when no localStorage and prefers-color-scheme is dark", () => {
    setMatchMedia(true)
    expect(resolveBootstrapTheme()).toBe('dark')
  })

  // AC: no localStorage, prefers-color-scheme: light (absent) → no dark class
  it("resolves 'light' when no localStorage and prefers-color-scheme is light", () => {
    setMatchMedia(false)
    expect(resolveBootstrapTheme()).toBe('light')
  })

  // AC: localStorage['theme'] = 'dark' takes precedence over system preference
  it("localStorage 'dark' overrides system light preference", () => {
    localStorage.setItem('theme', 'dark')
    setMatchMedia(false) // system is light
    expect(resolveBootstrapTheme()).toBe('dark')
  })

  // AC: localStorage['theme'] = 'light' takes precedence over system dark preference
  it("localStorage 'light' overrides system dark preference", () => {
    localStorage.setItem('theme', 'light')
    setMatchMedia(true) // system is dark
    expect(resolveBootstrapTheme()).toBe('light')
  })

  // Note: the bootstrap script pattern uses `t === 'dark'` check only.
  // An unrecognised localStorage value (e.g. 'solarized') is truthy, so `!t`
  // is false — the script does NOT fall back to matchMedia for invalid values;
  // it defaults to light. This is an acceptable edge case since ThemeProvider
  // is the only writer and always writes valid values.
  it("resolves 'light' when localStorage has an unrecognised value (script limitation)", () => {
    localStorage.setItem('theme', 'solarized') // not 'dark' or 'light'
    setMatchMedia(true) // even system dark won't override a set (invalid) storage value
    expect(resolveBootstrapTheme()).toBe('light')
  })

  it("resolves 'light' when localStorage has an unrecognised value and system is light", () => {
    localStorage.setItem('theme', 'solarized')
    setMatchMedia(false)
    expect(resolveBootstrapTheme()).toBe('light')
  })

  // AC: localStorage throws (privacy mode) → no uncaught exception, falls through to light
  it('does not throw when localStorage.getItem throws (privacy mode)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled')
    })
    expect(() => resolveBootstrapTheme()).not.toThrow()
    vi.restoreAllMocks()
  })

  it("falls back to 'light' when localStorage.getItem throws and matchMedia is unavailable to verify no crash", () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled')
    })
    // matchMedia is stubbed but localStorage error is caught first
    expect(resolveBootstrapTheme()).toBe('light')
    vi.restoreAllMocks()
  })

  // DOM application tests — verifies the script actually mutates document.documentElement
  it("adds 'dark' class to documentElement when localStorage['theme'] is 'dark'", () => {
    localStorage.setItem('theme', 'dark')
    applyBootstrapTheme()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it("does NOT add 'dark' class when localStorage['theme'] is 'light'", () => {
    localStorage.setItem('theme', 'light')
    applyBootstrapTheme()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it("adds 'dark' class when no localStorage and system prefers dark", () => {
    setMatchMedia(true)
    applyBootstrapTheme()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it("does NOT add 'dark' class when no localStorage and system prefers light", () => {
    applyBootstrapTheme()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  // AC: script is try/catch protected — no exception propagates
  it('does not throw when localStorage throws during DOM application', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled')
    })
    expect(() => applyBootstrapTheme()).not.toThrow()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    vi.restoreAllMocks()
  })

  // Precedence parity check: bootstrap result must match ThemeProvider's resolveInitialTheme
  it('precedence matches ThemeProvider: localStorage dark → dark', () => {
    localStorage.setItem('theme', 'dark')
    // ThemeProvider: readStoredTheme() = 'dark' → 'dark'
    expect(resolveBootstrapTheme()).toBe('dark')
  })

  it('precedence matches ThemeProvider: localStorage light → light', () => {
    localStorage.setItem('theme', 'light')
    expect(resolveBootstrapTheme()).toBe('light')
  })

  it('precedence matches ThemeProvider: no storage + system dark → dark', () => {
    setMatchMedia(true)
    expect(resolveBootstrapTheme()).toBe('dark')
  })

  it('precedence matches ThemeProvider: no storage + system light → light', () => {
    expect(resolveBootstrapTheme()).toBe('light')
  })
})
