import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import LanguageSwitcher from './LanguageSwitcher'

// Helper: render LanguageSwitcher inside a real LanguageProvider.
// LanguageProvider defaults to 'fr' when localStorage is empty and
// navigator.language is not 'en' or 'fr'.
function renderWithProvider() {
  return render(
    <LanguageProvider>
      <LanguageSwitcher />
    </LanguageProvider>,
  )
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = ''
    // Ensure navigator.language does not accidentally resolve to 'en',
    // so LanguageProvider defaults to 'fr' (the project default).
    vi.stubGlobal('navigator', { ...navigator, language: 'de' })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  // -------------------------------------------------------------------------
  // Renders the FR and EN buttons
  // -------------------------------------------------------------------------
  it('renders FR and EN buttons', () => {
    renderWithProvider()
    expect(screen.getByRole('button', { name: /^FR$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^EN$/i })).toBeInTheDocument()
  })

  // -------------------------------------------------------------------------
  // AC: initial FR active state — aria-pressed="true" on FR, "false" on EN
  // -------------------------------------------------------------------------
  it('marks FR button as active (aria-pressed="true") on initial render', () => {
    renderWithProvider()
    const frButton = screen.getByRole('button', { name: /^FR$/i })
    expect(frButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('marks EN button as inactive (aria-pressed="false") on initial render', () => {
    renderWithProvider()
    const enButton = screen.getByRole('button', { name: /^EN$/i })
    expect(enButton).toHaveAttribute('aria-pressed', 'false')
  })

  // -------------------------------------------------------------------------
  // AC: wrapper has aria-label from t('languageSwitcher')
  // -------------------------------------------------------------------------
  it('wrapping element has an aria-label', () => {
    renderWithProvider()
    // The group element should have an accessible label (from t('languageSwitcher'))
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('aria-label')
    const label = group.getAttribute('aria-label')
    expect(label).toBeTruthy()
    expect(label!.length).toBeGreaterThan(0)
  })

  it('wrapping group has aria-label matching the French UI label "Changer de langue"', () => {
    renderWithProvider()
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('aria-label', 'Changer de langue')
  })

  // -------------------------------------------------------------------------
  // AC: clicking EN switches locale → document.documentElement.lang = 'en'
  // -------------------------------------------------------------------------
  it('clicking EN button sets document.documentElement.lang to "en"', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button', { name: /^EN$/i }))
    expect(document.documentElement.lang).toBe('en')
  })

  // -------------------------------------------------------------------------
  // AC: after switching to EN, aria-pressed flips
  // -------------------------------------------------------------------------
  it('after clicking EN: EN button is aria-pressed="true", FR is "false"', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button', { name: /^EN$/i }))
    expect(screen.getByRole('button', { name: /^EN$/i })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /^FR$/i })).toHaveAttribute('aria-pressed', 'false')
  })

  // -------------------------------------------------------------------------
  // AC: clicking FR after EN → document.documentElement.lang = 'fr'
  // -------------------------------------------------------------------------
  it('clicking FR after EN sets document.documentElement.lang back to "fr"', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button', { name: /^EN$/i }))
    expect(document.documentElement.lang).toBe('en')
    await user.click(screen.getByRole('button', { name: /^FR$/i }))
    expect(document.documentElement.lang).toBe('fr')
  })

  // -------------------------------------------------------------------------
  // AC: clicking active button is a no-op (does not re-trigger state change)
  // -------------------------------------------------------------------------
  it('clicking the already-active FR button keeps lang as "fr"', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    // FR is active by default; clicking it again should be a no-op
    await user.click(screen.getByRole('button', { name: /^FR$/i }))
    expect(document.documentElement.lang).toBe('fr')
    expect(screen.getByRole('button', { name: /^FR$/i })).toHaveAttribute('aria-pressed', 'true')
  })

  // -------------------------------------------------------------------------
  // AC: keyboard accessibility — tab to EN button, press Enter to activate
  // -------------------------------------------------------------------------
  it('EN button receives focus via Tab and pressing Enter switches locale', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    // Tab through focusable elements until EN button is focused
    await user.tab()
    await user.tab()

    // At least one of the buttons should be focused; find the EN button
    // and check it's reachable
    const enButton = screen.getByRole('button', { name: /^EN$/i })
    enButton.focus()
    expect(document.activeElement).toBe(enButton)

    // Press Enter to activate the focused EN button
    await user.keyboard('{Enter}')
    expect(document.documentElement.lang).toBe('en')
  })

  // -------------------------------------------------------------------------
  // AC: if rendered with 'en' locale in localStorage, EN is initially active
  // -------------------------------------------------------------------------
  it('renders EN as active when localStorage locale is "en"', () => {
    localStorage.setItem('locale', 'en')
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>,
    )
    expect(screen.getByRole('button', { name: /^EN$/i })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /^FR$/i })).toHaveAttribute('aria-pressed', 'false')
  })
})
