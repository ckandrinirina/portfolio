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

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
    setMatchMedia(false) // → initial theme 'paper'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a button with an accessible theme label', () => {
    renderSwitcher()
    const btn = screen.getByRole('button', { name: /theme/i })
    expect(btn).toBeInTheDocument()
  })

  it('reflects the active theme name', () => {
    localStorage.setItem('theme', 'ocean')
    renderSwitcher()
    expect(screen.getByText(/ocean/i)).toBeInTheDocument()
  })

  it('cycles the theme app-wide on click', async () => {
    const user = userEvent.setup()
    localStorage.setItem('theme', 'default')
    renderSwitcher()
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()

    await user.click(screen.getByRole('button', { name: /theme/i }))
    // default → ocean
    expect(document.documentElement.getAttribute('data-theme')).toBe('ocean')
    expect(localStorage.getItem('theme')).toBe('ocean')
  })

  it('exposes a visible focus ring style', () => {
    renderSwitcher()
    const btn = screen.getByRole('button', { name: /theme/i })
    expect(btn.className).toMatch(/focus-visible:/)
  })
})
