import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, ThemeContext } from './ThemeProvider'
import { useTheme } from './useTheme'

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

function Probe() {
  const { theme, setTheme, cycle } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('ocean')}>set-ocean</button>
      <button onClick={() => setTheme('default')}>set-default</button>
      <button onClick={() => cycle()}>cycle</button>
    </div>
  )
}

function dataTheme(): string | null {
  return document.documentElement.getAttribute('data-theme')
}

describe('ThemeProvider (4-palette data-theme model)', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.className = ''
    localStorage.clear()
    setMatchMedia(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('provides a non-null context value', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBeTruthy()
  })

  it("uses the stored theme when localStorage['theme'] is set", () => {
    localStorage.setItem('theme', 'ocean')
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('ocean')
    expect(dataTheme()).toBe('ocean')
  })

  it("resolves 'default' when no storage and system prefers dark", () => {
    setMatchMedia(true)
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('default')
    // default removes the attribute (the :root Ember palette governs)
    expect(dataTheme()).toBeNull()
  })

  it("resolves 'paper' when no storage and system prefers light", () => {
    setMatchMedia(false)
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('paper')
    expect(dataTheme()).toBe('paper')
  })

  it('applying default removes data-theme; other themes set it', () => {
    localStorage.setItem('theme', 'forest')
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(dataTheme()).toBe('forest')
    fireEvent.click(screen.getByRole('button', { name: 'set-default' }))
    expect(screen.getByTestId('theme').textContent).toBe('default')
    expect(dataTheme()).toBeNull()
    expect(localStorage.getItem('theme')).toBe('default')
  })

  it('setTheme updates state, attribute, and localStorage', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'set-ocean' }))
    expect(screen.getByTestId('theme').textContent).toBe('ocean')
    expect(dataTheme()).toBe('ocean')
    expect(localStorage.getItem('theme')).toBe('ocean')
  })

  it('cycle() advances default → ocean → forest → paper → default', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    // start: no storage, system light → paper. Set to default first.
    fireEvent.click(screen.getByRole('button', { name: 'set-default' }))
    expect(screen.getByTestId('theme').textContent).toBe('default')

    const cycleBtn = screen.getByRole('button', { name: 'cycle' })
    fireEvent.click(cycleBtn)
    expect(screen.getByTestId('theme').textContent).toBe('ocean')
    fireEvent.click(cycleBtn)
    expect(screen.getByTestId('theme').textContent).toBe('forest')
    fireEvent.click(cycleBtn)
    expect(screen.getByTestId('theme').textContent).toBe('paper')
    fireEvent.click(cycleBtn)
    expect(screen.getByTestId('theme').textContent).toBe('default')
    expect(localStorage.getItem('theme')).toBe('default')
  })

  it('ignores an unrecognised stored value and falls back to system default', () => {
    localStorage.setItem('theme', 'solarized')
    setMatchMedia(true)
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toBe('default')
  })

  it('useTheme() throws a descriptive error outside the provider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Probe />)).toThrow(
      /useTheme must be used within a ThemeProvider/i,
    )
    errorSpy.mockRestore()
  })

  it('stays functional when localStorage throws (privacy mode)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
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
    expect(screen.getByTestId('theme').textContent).toBe('default')
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: 'set-ocean' })),
    ).not.toThrow()
    expect(screen.getByTestId('theme').textContent).toBe('ocean')
  })

  it('exports ThemeContext as a named export', () => {
    expect(ThemeContext).toBeDefined()
  })
})
