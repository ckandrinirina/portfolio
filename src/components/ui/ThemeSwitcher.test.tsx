import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../../theme/ThemeProvider'
import ThemeSwitcher from './ThemeSwitcher'

function setMatchMedia(prefersDark: boolean) {
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

function renderSwitcher() {
  return render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>,
  )
}

describe('ThemeSwitcher (palette swatch picker)', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
    setMatchMedia(false) // → initial theme 'paper'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a labelled group of palette swatches', () => {
    renderSwitcher()
    expect(screen.getByRole('group', { name: /theme/i })).toBeInTheDocument()
  })

  it('renders one swatch per palette (Ember / Paper / Ocean / Forest)', () => {
    renderSwitcher()
    for (const name of ['Ember', 'Paper', 'Ocean', 'Forest']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument()
    }
  })

  it('marks the active palette swatch with aria-pressed="true"', () => {
    // Empty storage + light preference → initial theme 'paper'.
    renderSwitcher()
    expect(screen.getByRole('button', { name: 'Paper' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Ocean' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('applies the chosen palette app-wide on click', async () => {
    const user = userEvent.setup()
    localStorage.setItem('theme', 'default')
    renderSwitcher()
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Ocean' }))

    expect(document.documentElement.getAttribute('data-theme')).toBe('ocean')
    expect(localStorage.getItem('theme')).toBe('ocean')
    expect(screen.getByRole('button', { name: 'Ocean' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('exposes a visible focus ring style on each swatch', () => {
    renderSwitcher()
    expect(screen.getByRole('button', { name: 'Ember' }).className).toMatch(
      /focus-visible:/,
    )
  })
})
