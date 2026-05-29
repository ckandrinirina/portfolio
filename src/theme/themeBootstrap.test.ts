/**
 * Unit tests for the anti-FOUC theme bootstrap (`themeBootstrap.ts`).
 *
 * The bootstrap is a single canonical inline-script string exported from
 * `themeBootstrap.ts` and pasted verbatim into `index.html`. These tests:
 *   1. validate the resolution precedence the script encodes (stored → system
 *      → 'paper'), and that it sets `data-theme` for non-default themes only;
 *   2. assert `index.html` actually embeds the exported string (the two must
 *      stay in sync — a drift would reintroduce a flash of the wrong theme).
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { THEME_BOOTSTRAP } from './themeBootstrap'
import html from '../../index.html?raw'

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

/** Run the exported bootstrap string against the current jsdom globals. */
function runBootstrap(): void {
  new Function(THEME_BOOTSTRAP)()
}

/**
 * Normalize for in-sync comparison: drop whitespace and semicolons so the
 * comparison survives Prettier reformatting the inline `index.html` script
 * (ASI drops statement semicolons; a leading `;` may be added). The logic
 * tokens still have to match exactly.
 */
function normalize(s: string): string {
  return s.replace(/[\s;]+/g, '')
}

describe('theme bootstrap resolution', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
    setMatchMedia(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sets data-theme from a stored non-default theme', () => {
    localStorage.setItem('theme', 'ocean')
    runBootstrap()
    expect(document.documentElement.getAttribute('data-theme')).toBe('ocean')
  })

  it('removes/omits data-theme when the stored theme is default', () => {
    localStorage.setItem('theme', 'default')
    runBootstrap()
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
  })

  it("resolves 'default' (no attribute) when no storage and system prefers dark", () => {
    setMatchMedia(true)
    runBootstrap()
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
  })

  it("resolves 'paper' when no storage and system prefers light", () => {
    setMatchMedia(false)
    runBootstrap()
    expect(document.documentElement.getAttribute('data-theme')).toBe('paper')
  })

  it('does not throw when localStorage is unavailable (privacy mode)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled')
    })
    expect(() => runBootstrap()).not.toThrow()
  })
})

describe('theme bootstrap / index.html in sync', () => {
  it('index.html embeds the exported bootstrap logic (whitespace/semicolon-insensitive)', () => {
    expect(normalize(html)).toContain(normalize(THEME_BOOTSTRAP))
  })

  it('the bootstrap targets data-theme, not the legacy dark class', () => {
    expect(THEME_BOOTSTRAP).toMatch(/setAttribute\(\s*['"]data-theme['"]/)
    expect(THEME_BOOTSTRAP).not.toMatch(/classList\.add\(\s*['"]dark['"]/)
  })
})
