/// <reference types="node" />
/**
 * Accessibility / reduced-motion regression tests (story 04-02).
 *
 * Three layers:
 *  1. Landmarks & ARIA on the assembled shell (Home + Contact) via the real App.
 *  2. Reduced-motion JS behaviour — under `prefers-reduced-motion: reduce` the
 *     letter-by-letter Reveal collapses to plain text (no `.char-in` spans).
 *  3. CSS-presence facts that protect the global focus ring + reduced-motion
 *     block from accidental removal (CSS visuals can't be asserted in jsdom).
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from '../App'
import { ThemeProvider } from '../theme/ThemeProvider'
import { LanguageProvider } from '../i18n/LanguageProvider'

const css = readFileSync(resolve(__dirname, '../../src/index.css'), 'utf8')

function renderApp() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

/** Build a matchMedia stub that matches the reduced-motion query iff `reduce`. */
function makeMatchMedia(reduce: boolean) {
  return (query: string): MediaQueryList =>
    ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList
}

/** Force matchMedia to report reduced-motion (and no other matches). */
function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', makeMatchMedia(reduce))
}

afterEach(() => {
  // Restore a baseline no-match matchMedia (never leave it undefined, which would
  // break the next render — unstubbing would also drop setup.ts's stub).
  vi.stubGlobal('matchMedia', makeMatchMedia(false))
  window.history.replaceState(null, '', window.location.pathname)
  localStorage.clear()
})

describe('Landmarks & headings', () => {
  it('renders exactly one aside (sidebar) and one main', () => {
    const { container } = renderApp()
    expect(container.querySelectorAll('aside')).toHaveLength(1)
    expect(screen.getAllByRole('main')).toHaveLength(1)
  })

  it('Home has exactly one <h1> and no <h2>', () => {
    renderApp() // default route = home
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelectorAll('main h2')).toHaveLength(0)
  })

  it('a content view (Contact) has exactly one <h2> section title and no <h1>', () => {
    window.history.replaceState(null, '', '#contact')
    renderApp()
    expect(document.querySelectorAll('main h2.section-title')).toHaveLength(1)
    expect(document.querySelectorAll('h1')).toHaveLength(0)
  })
})

describe('ARIA live regions', () => {
  it('Home role rotor is an aria-live polite region', () => {
    const { container } = renderApp()
    const rotor = container.querySelector('.home-roles')
    expect(rotor).not.toBeNull()
    expect(rotor).toHaveAttribute('aria-live', 'polite')
  })

  it('Contact exposes a polite live region for copy announcements', () => {
    window.history.replaceState(null, '', '#contact')
    const { container } = renderApp()
    const live = container.querySelector('[aria-live="polite"]')
    expect(live).not.toBeNull()
  })

  it('Contact copy buttons have an accessible name', () => {
    window.history.replaceState(null, '', '#contact')
    renderApp()
    const main = screen.getByRole('main')
    const copyBtn = within(main)
      .getAllByRole('button')
      .find((b) => /copy|copier/i.test(b.getAttribute('aria-label') ?? ''))
    expect(copyBtn).toBeDefined()
  })
})

describe('Reduced motion (JS surfaces)', () => {
  it('Reveal collapses to plain text — no per-letter .char-in spans', () => {
    stubReducedMotion(true)
    const { container } = renderApp() // Home renders <Reveal> for the hero name
    expect(container.querySelectorAll('.char-in')).toHaveLength(0)
    // The hero name is still present (final visible state).
    expect(
      document.querySelector('h1')?.textContent?.trim().length,
    ).toBeGreaterThan(0)
  })

  it('Reveal animates (has .char-in spans) when motion is allowed', () => {
    stubReducedMotion(false)
    const { container } = renderApp()
    expect(container.querySelectorAll('.char-in').length).toBeGreaterThan(0)
  })
})

describe('Stylesheet a11y facts (index.css)', () => {
  it('defines a global :focus-visible outline ring', () => {
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline/)
  })

  it('gives the cmdk input a visible focus-visible state', () => {
    expect(css).toMatch(/\.cmdk-input:focus-visible/)
  })

  it('keeps the reduced-motion media block', () => {
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  })

  it('keeps the three responsive breakpoints (1100 / 880 / 600)', () => {
    expect(css).toMatch(/max-width:\s*1100px/)
    expect(css).toMatch(/max-width:\s*880px/)
    expect(css).toMatch(/max-width:\s*600px/)
  })
})
