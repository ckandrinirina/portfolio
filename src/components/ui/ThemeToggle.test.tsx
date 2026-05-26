import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../theme/ThemeProvider'
import ThemeToggle from './ThemeToggle'

// Helper: render ThemeToggle inside a real ThemeProvider so useTheme() works.
function renderWithTheme(initialTheme?: 'light' | 'dark') {
  if (initialTheme) {
    localStorage.setItem('theme', initialTheme)
  }
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  )
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  // Acceptance criterion: renders as a <button> element
  it('renders a <button> element', () => {
    renderWithTheme('light')
    const btn = screen.getByRole('button')
    expect(btn.tagName).toBe('BUTTON')
  })

  // Acceptance criterion: has a meaningful aria-label
  it('has an aria-label meaningful to screen-reader users', () => {
    renderWithTheme('light')
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-label')
    const label = btn.getAttribute('aria-label')
    expect(label).toBeTruthy()
    expect(label!.length).toBeGreaterThan(0)
  })

  // Acceptance criterion: aria-pressed is "false" in light mode
  it('has aria-pressed="false" when theme is light', () => {
    renderWithTheme('light')
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-pressed', 'false')
  })

  // Acceptance criterion: aria-pressed is "true" in dark mode
  it('has aria-pressed="true" when theme is dark', () => {
    renderWithTheme('dark')
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })

  // Acceptance criterion: keyboard-focusable (tabIndex not negative)
  it('is keyboard-focusable (tabIndex is 0 or absent — not negative)', () => {
    renderWithTheme('light')
    const btn = screen.getByRole('button')
    const tabIndex = btn.getAttribute('tabindex')
    // tabindex is absent (defaults to 0) or explicitly 0
    expect(tabIndex === null || parseInt(tabIndex) >= 0).toBe(true)
  })

  // Acceptance criterion: includes focus-visible ring classes for accessibility
  it('includes focus-visible ring styling for keyboard accessibility', () => {
    const { container } = renderWithTheme('light')
    const btn = container.querySelector('button')!
    expect(btn.className).toMatch(/focus-visible:/)
  })

  // Acceptance criterion: clicking in light mode switches to dark
  it('clicking in light mode adds "dark" class to document.documentElement', () => {
    renderWithTheme('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    fireEvent.click(screen.getByRole('button'))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  // Acceptance criterion: after switching to dark, localStorage is updated
  it('clicking in light mode sets localStorage["theme"] to "dark"', () => {
    renderWithTheme('light')
    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  // Acceptance criterion: clicking in dark mode switches to light
  it('clicking in dark mode removes "dark" class from document.documentElement', () => {
    renderWithTheme('dark')
    // ThemeProvider's useEffect adds 'dark' on mount
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    fireEvent.click(screen.getByRole('button'))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  // Acceptance criterion: after switching to light, localStorage is updated
  it('clicking in dark mode sets localStorage["theme"] to "light"', () => {
    renderWithTheme('dark')
    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('theme')).toBe('light')
  })

  // Acceptance criterion: aria-pressed toggles after click
  it('aria-pressed changes from "false" to "true" after clicking in light mode', () => {
    renderWithTheme('light')
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })

  it('aria-pressed changes from "true" to "false" after clicking in dark mode', () => {
    renderWithTheme('dark')
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'false')
  })

  // Acceptance criterion: icon reflects current theme (sun when light, moon when dark)
  it('renders a sun icon when theme is light', () => {
    renderWithTheme('light')
    // The sun icon has data-testid="sun-icon"
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  })

  it('renders a moon icon when theme is dark', () => {
    renderWithTheme('dark')
    // The moon icon has data-testid="moon-icon"
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })
})
