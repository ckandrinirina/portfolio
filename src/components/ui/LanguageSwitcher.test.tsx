import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import LanguageSwitcher from './LanguageSwitcher'

// LanguageProvider defaults to 'fr' when localStorage is empty and
// navigator.language is not 'en' or 'fr'.
function renderWithProvider() {
  return render(
    <LanguageProvider>
      <LanguageSwitcher />
    </LanguageProvider>,
  )
}

describe('LanguageSwitcher (flag toggle)', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = ''
    vi.stubGlobal('navigator', { ...navigator, language: 'de' })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders a single toggle button', () => {
    renderWithProvider()
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('shows the current locale code (FR by default)', () => {
    renderWithProvider()
    expect(screen.getByRole('button')).toHaveTextContent('FR')
  })

  it('has an accessible label sourced from the localized switcher string', () => {
    renderWithProvider()
    const label = screen.getByRole('button').getAttribute('aria-label')
    expect(label).toBeTruthy()
    // French default UI label is "Changer de langue".
    expect(label).toMatch(/Changer de langue/i)
  })

  it('clicking toggles the locale to "en" (sets <html lang>)', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button'))
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })

  it('clicking twice toggles back to "fr"', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button'))
    expect(document.documentElement.lang).toBe('en')
    await user.click(screen.getByRole('button'))
    expect(document.documentElement.lang).toBe('fr')
  })

  it('is keyboard-activatable (focus + Enter switches locale)', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    const btn = screen.getByRole('button')
    btn.focus()
    expect(document.activeElement).toBe(btn)
    await user.keyboard('{Enter}')
    expect(document.documentElement.lang).toBe('en')
  })

  it('shows EN when the stored locale is "en"', () => {
    localStorage.setItem('locale', 'en')
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>,
    )
    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })
})
