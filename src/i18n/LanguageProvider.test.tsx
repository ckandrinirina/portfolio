import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act, renderHook } from '@testing-library/react'
import { LanguageProvider, LanguageContext } from './LanguageProvider'
import { useLanguage } from './useLanguage'
import frContent from '../content/fr'
import enContent from '../content/en'

// ---------------------------------------------------------------------------
// Probe component — renders context values so tests can assert on them
// ---------------------------------------------------------------------------
function Probe() {
  const { locale, setLocale, content, t } = useLanguage()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="hero-name">{content.hero.name}</span>
      <span data-testid="nav-hero">{t('navHero')}</span>
      <button onClick={() => setLocale('en')}>set-en</button>
      <button onClick={() => setLocale('fr')}>set-fr</button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function setNavigatorLanguage(lang: string) {
  vi.stubGlobal('navigator', { ...navigator, language: lang })
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  // -------------------------------------------------------------------------
  // Acceptance criterion: component renders children
  // -------------------------------------------------------------------------
  it('renders children and provides a non-null context value', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBeTruthy()
  })

  // -------------------------------------------------------------------------
  // Locale initialization — localStorage wins
  // -------------------------------------------------------------------------
  it("uses 'en' when localStorage['locale'] is 'en', ignoring navigator", () => {
    localStorage.setItem('locale', 'en')
    setNavigatorLanguage('fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('en')
  })

  it("uses 'fr' when localStorage['locale'] is 'fr', ignoring navigator", () => {
    localStorage.setItem('locale', 'fr')
    setNavigatorLanguage('en')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  // -------------------------------------------------------------------------
  // Locale initialization — navigator.language fallback
  // -------------------------------------------------------------------------
  it("uses 'en' when localStorage empty and navigator.language starts with 'en'", () => {
    setNavigatorLanguage('en-US')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('en')
  })

  it("uses 'fr' when localStorage empty and navigator.language starts with 'fr'", () => {
    setNavigatorLanguage('fr-FR')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  it("uses 'fr' when localStorage empty and navigator.language starts with 'fr-BE'", () => {
    setNavigatorLanguage('fr-BE')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  // -------------------------------------------------------------------------
  // Locale initialization — default 'fr' fallback
  // -------------------------------------------------------------------------
  it("defaults to 'fr' when localStorage empty and navigator.language is 'de'", () => {
    setNavigatorLanguage('de')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  it("defaults to 'fr' when localStorage empty and navigator.language is 'ja'", () => {
    setNavigatorLanguage('ja')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  it("defaults to 'fr' when localStorage empty and navigator.language is 'pt'", () => {
    setNavigatorLanguage('pt')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  // -------------------------------------------------------------------------
  // Corrupted / invalid localStorage value → fall through
  // -------------------------------------------------------------------------
  it('ignores corrupted localStorage value and falls through to navigator', () => {
    localStorage.setItem('locale', 'de')
    setNavigatorLanguage('en-US')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('en')
  })

  it('ignores corrupted localStorage value and falls through to default fr', () => {
    localStorage.setItem('locale', 'invalid')
    setNavigatorLanguage('de')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  // -------------------------------------------------------------------------
  // localStorage.getItem throws (SecurityError in private mode)
  // -------------------------------------------------------------------------
  it('falls back gracefully when localStorage.getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: storage disabled')
    })
    setNavigatorLanguage('de')
    expect(() =>
      render(
        <LanguageProvider>
          <Probe />
        </LanguageProvider>,
      ),
    ).not.toThrow()
    expect(screen.getByTestId('locale').textContent).toBe('fr')
  })

  it('falls back to navigator when localStorage.getItem throws and navigator is en', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: storage disabled')
    })
    setNavigatorLanguage('en-US')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('en')
  })

  // -------------------------------------------------------------------------
  // document.documentElement.lang on mount
  // -------------------------------------------------------------------------
  it('sets document.documentElement.lang on mount', () => {
    localStorage.setItem('locale', 'en')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(document.documentElement.lang).toBe('en')
  })

  it('sets document.documentElement.lang to fr when defaulting', () => {
    setNavigatorLanguage('de')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(document.documentElement.lang).toBe('fr')
  })

  // -------------------------------------------------------------------------
  // Content resolution
  // -------------------------------------------------------------------------
  it('provides frContent when locale is fr', () => {
    localStorage.setItem('locale', 'fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('hero-name').textContent).toBe(frContent.hero.name)
  })

  it('provides enContent when locale is en', () => {
    localStorage.setItem('locale', 'en')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('hero-name').textContent).toBe(enContent.hero.name)
  })

  // -------------------------------------------------------------------------
  // t() function
  // -------------------------------------------------------------------------
  it('t(navHero) returns the French label when locale is fr', () => {
    localStorage.setItem('locale', 'fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('nav-hero').textContent).toBe('Accueil')
  })

  it('t(navHero) returns the English label when locale is en', () => {
    localStorage.setItem('locale', 'en')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('nav-hero').textContent).toBe('Home')
  })

  // -------------------------------------------------------------------------
  // setLocale — state, lang attribute, localStorage
  // -------------------------------------------------------------------------
  it('setLocale updates locale state and triggers re-render', () => {
    localStorage.setItem('locale', 'fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('locale').textContent).toBe('fr')
    fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    expect(screen.getByTestId('locale').textContent).toBe('en')
  })

  it('setLocale updates document.documentElement.lang', () => {
    localStorage.setItem('locale', 'fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    expect(document.documentElement.lang).toBe('en')
  })

  it('setLocale persists to localStorage', () => {
    localStorage.setItem('locale', 'fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    expect(localStorage.getItem('locale')).toBe('en')
  })

  it('setLocale does not throw when localStorage.setItem throws', () => {
    localStorage.setItem('locale', 'fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError: storage disabled')
    })
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    }).not.toThrow()
    // State and lang still update despite storage failure
    expect(screen.getByTestId('locale').textContent).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('setLocale switches content to enContent', () => {
    localStorage.setItem('locale', 'fr')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    expect(screen.getByTestId('hero-name').textContent).toBe(enContent.hero.name)
  })

  it('setLocale switches back to frContent', () => {
    localStorage.setItem('locale', 'en')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'set-fr' }))
    expect(screen.getByTestId('hero-name').textContent).toBe(frContent.hero.name)
  })

  // -------------------------------------------------------------------------
  // Context memoization — stable value across unrelated parent re-renders
  // -------------------------------------------------------------------------
  it('context value is stable across parent re-renders (useMemo)', () => {
    // Use renderHook so the hook renders inside a proper React component context
    // without triggering react-hooks/globals by assigning to outer variables.
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    )

    const { result, rerender } = renderHook(() => useLanguage(), { wrapper })
    const firstValue = result.current

    // Rerender the hook (simulates a parent re-render) without changing locale
    act(() => {
      rerender()
    })

    // Context value object identity must be stable if locale hasn't changed
    expect(result.current).toBe(firstValue)
  })

  // -------------------------------------------------------------------------
  // Named LanguageContext export
  // -------------------------------------------------------------------------
  it('exports LanguageContext as a named export', () => {
    expect(LanguageContext).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// useLanguage — outside provider
// ---------------------------------------------------------------------------
describe('useLanguage — outside LanguageProvider', () => {
  it('throws a descriptive error when called outside LanguageProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Probe />)).toThrow(
      /useLanguage must be used within a LanguageProvider/i,
    )
    errorSpy.mockRestore()
  })
})
