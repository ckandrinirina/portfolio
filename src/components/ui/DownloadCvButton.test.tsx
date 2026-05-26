import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DownloadCvButton from './DownloadCvButton'
import { LanguageProvider } from '../../i18n/LanguageProvider'

describe('DownloadCvButton', () => {
  const renderWithLanguageProvider = (component: React.ReactElement) => {
    return render(<LanguageProvider>{component}</LanguageProvider>)
  }

  it('renders an anchor element with correct href containing cv/erick-andrinirina-cv.pdf', () => {
    renderWithLanguageProvider(<DownloadCvButton />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toContain('cv/erick-andrinirina-cv.pdf')
  })

  it('has the download attribute present', () => {
    renderWithLanguageProvider(<DownloadCvButton />)
    const link = screen.getByRole('link')
    expect(link.hasAttribute('download')).toBe(true)
  })

  it('displays localized label from useLanguage().t("downloadCv")', () => {
    renderWithLanguageProvider(<DownloadCvButton />)
    const link = screen.getByRole('link')
    // In EN locale, the label should be "Download CV"
    expect(link.textContent).toMatch(/Download CV|Télécharger le CV/)
  })

  it('accepts and applies className prop', () => {
    renderWithLanguageProvider(<DownloadCvButton className="custom-class" />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('custom-class')
  })
})
