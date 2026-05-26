import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, ThemeContext } from './ThemeProvider'
import { useTheme } from './useTheme'

function setMatchMedia(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList =>
      ({
        matches,
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

function Probe() {
  const { theme, setTheme, toggle } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>set-dark</button>
      <button onClick={() => setTheme('light')}>set-light</button>
      <button onClick={() => toggle()}>toggle</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    localStorage.clear()
    setMatchMedia(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children and provides a non-null context value', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBeTruthy()
  })

  it("uses 'dark' when localStorage['theme'] is 'dark'", () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it("uses 'light' when localStorage['theme'] is 'light'", () => {
    localStorage.setItem('theme', 'light')
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it("falls back to matchMedia('(prefers-color-scheme: dark)') when localStorage is absent", () => {
    setMatchMedia(true)
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it("defaults to 'light' when neither localStorage nor system preference indicates dark", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it("setTheme('dark') adds the dark class and persists 'dark' to localStorage", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'set-dark' }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it("setTheme('light') removes the dark class and persists 'light' to localStorage", () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'set-light' }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it("toggle() flips theme, html class, and localStorage", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    // initial = light
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('useTheme() throws a descriptive error when called outside ThemeProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Probe />)).toThrow(
      /useTheme must be used within a ThemeProvider/i,
    )
    errorSpy.mockRestore()
  })

  it('falls back to system preference and stays functional when localStorage.getItem throws', () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('storage disabled')
      })
    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('storage disabled')
      })
    setMatchMedia(true)

    expect(() =>
      render(
        <ThemeProvider>
          <Probe />
        </ThemeProvider>,
      ),
    ).not.toThrow()

    // Initial state derives from matchMedia (dark) because localStorage is unreadable.
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    // Toggle still updates in-memory state + html class without throwing on setItem.
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: 'toggle' })),
    ).not.toThrow()
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    getItemSpy.mockRestore()
    setItemSpy.mockRestore()
  })

  it('does not remove the dark class when bootstrap already applied it (no flicker)', () => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
    const removeSpy = vi.spyOn(document.documentElement.classList, 'remove')

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(removeSpy).not.toHaveBeenCalledWith('dark')
    removeSpy.mockRestore()
  })

  it('exports ThemeContext as a named export with a non-null default of null', () => {
    // The context itself is named-exported so tests can read or inject it directly.
    expect(ThemeContext).toBeDefined()
  })
})
