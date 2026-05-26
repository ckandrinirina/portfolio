import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import About from './About'
import Header from '../layout/Header'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { LanguageProvider } from '../../i18n/LanguageProvider'

/**
 * Helper to render About component with required providers and Header (for language switcher).
 */
function renderAbout() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <About />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

describe('About section', () => {
  beforeEach(() => {
    // Reset locale to French before each test
    localStorage.clear()
    // Set French locale explicitly (browser navigator may default to English in test env)
    localStorage.setItem('locale', 'fr')
    document.documentElement.lang = 'fr'
    document.documentElement.className = ''
  })

  // AC: The component renders inside a `<section id="about">` (provided by the Section wrapper).
  it('renders inside a <section id="about">', () => {
    const { container } = renderAbout()
    const section = container.querySelector('section#about')
    expect(section).toBeInTheDocument()
  })

  // AC: An `<h2>` heading is rendered by the `Section` wrapper with the locale-appropriate label.
  it('renders an <h2> heading with the French label "À propos"', () => {
    renderAbout()
    const headings = screen.getAllByRole('heading', { level: 2 })
    // The last h2 should be the About section heading
    expect(headings[headings.length - 1]).toHaveTextContent('À propos')
  })

  // AC: The profile narrative paragraph is rendered from `content.about` (not hard-coded inline).
  it('renders the French narrative paragraph from content.about.narrative', () => {
    renderAbout()
    // The narrative starts with "Développeur Fullstack" in French content
    expect(
      screen.getByText(
        /Développeur Fullstack expérimenté avec 7 ans d'expertise/i,
      ),
    ).toBeInTheDocument()
  })

  // AC: The narrative is rendered inside a `<p>` element for semantic correctness.
  it('renders the narrative inside a <p> element', () => {
    renderAbout()
    const paragraph = screen.getByText(
      /Développeur Fullstack expérimenté avec 7 ans d'expertise/i,
    )
    expect(paragraph.tagName).toBe('P')
  })

  // AC: Switching the locale from French to English updates the narrative text without a page reload.
  it('updates narrative when locale switches to English', async () => {
    const user = userEvent.setup()
    renderAbout()

    // Verify French narrative is present initially
    expect(
      screen.getByText(
        /Développeur Fullstack expérimenté avec 7 ans d'expertise/i,
      ),
    ).toBeInTheDocument()

    // Find and click the English language button
    const enButton = screen.getByRole('button', { name: 'EN' })
    await user.click(enButton)

    // Verify English narrative is now present
    expect(
      screen.getByText(
        /Experienced Fullstack Developer with 7 years of expertise/i,
      ),
    ).toBeInTheDocument()

    // Verify French narrative is gone
    expect(
      screen.queryByText(
        /Développeur Fullstack expérimenté avec 7 ans d'expertise/i,
      ),
    ).not.toBeInTheDocument()
  })

  // AC: The heading changes when locale switches
  it('updates heading when locale switches to English', async () => {
    const user = userEvent.setup()
    renderAbout()

    // Get all h2 headings and find the About section one
    let aboutHeading = screen.getAllByRole('heading', { level: 2 })
    const frenchAboutHeading = aboutHeading[aboutHeading.length - 1]
    expect(frenchAboutHeading).toHaveTextContent('À propos')

    // Switch to English
    const enButton = screen.getByRole('button', { name: 'EN' })
    await user.click(enButton)

    // Get h2 headings again - the About one should now be "About"
    aboutHeading = screen.getAllByRole('heading', { level: 2 })
    expect(aboutHeading[aboutHeading.length - 1]).toHaveTextContent('About')
  })

  // AC: The component renders without error when both the `fr` and `en` content objects are active.
  it('renders without error in both French and English locales', () => {
    const { container } = renderAbout()
    const section = container.querySelector('section#about')
    expect(section).toBeInTheDocument()

    // Verify default French content
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings[headings.length - 1]).toHaveTextContent('À propos')
    expect(
      screen.getByText(
        /Développeur Fullstack expérimenté avec 7 ans d'expertise/i,
      ),
    ).toBeInTheDocument()
  })
})
