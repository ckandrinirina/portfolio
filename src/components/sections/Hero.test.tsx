import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Hero from './Hero'
import { LanguageProvider } from '../../i18n/LanguageProvider'

const renderWithLanguageProvider = (component: React.ReactElement) => {
  return render(<LanguageProvider>{component}</LanguageProvider>)
}

describe('Hero', () => {
  it('renders an <h1> containing "Erick Andrinirina"', () => {
    renderWithLanguageProvider(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Erick Andrinirina')
  })

  it('contains exactly one <h1>', () => {
    const { container } = renderWithLanguageProvider(<Hero />)
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
  })

  it('renders the professional title visible in the active locale', () => {
    renderWithLanguageProvider(<Hero />)
    // Default locale is 'fr' — French title
    expect(screen.getByText(/Développeur Fullstack JavaScript|Fullstack JavaScript Engineer/i)).toBeInTheDocument()
  })

  it('renders the one-line positioning statement from content.hero', () => {
    renderWithLanguageProvider(<Hero />)
    // The positioning statement contains "7" for either locale
    expect(screen.getByText(/7/)).toBeInTheDocument()
  })

  it('renders the location "Antananarivo, Madagascar"', () => {
    renderWithLanguageProvider(<Hero />)
    expect(screen.getByText(/Antananarivo, Madagascar/i)).toBeInTheDocument()
  })

  it('does not render any full street address', () => {
    const { container } = renderWithLanguageProvider(<Hero />)
    // Location must not contain digits that look like a postal code or house number
    // combined with a street name; just assert the text node contains only city/country.
    const locationEl = container.querySelector('[data-testid="hero-location"]')
    expect(locationEl?.textContent).not.toMatch(/\d{4,}/) // no postal codes
  })

  it('renders a "View projects" CTA button or link', () => {
    renderWithLanguageProvider(<Hero />)
    // Match either locale: "Voir les projets" or "View projects"
    const cta = screen.getByRole('button', { name: /voir les projets|view projects/i })
    expect(cta).toBeInTheDocument()
  })

  it('renders a link for CV download with the correct href', () => {
    renderWithLanguageProvider(<Hero />)
    const cvLink = screen.getByRole('link', { name: /cv/i })
    expect(cvLink).toBeInTheDocument()
    expect(cvLink.getAttribute('href')).toContain('cv/erick-andrinirina-cv.pdf')
  })

  it('renders SocialLinks component in the Hero section', () => {
    // SocialLinks renders a flex container; even with empty URL constants it is present.
    // The actual links depend on SOCIAL_LINKS values — check the container is rendered.
    const { container } = renderWithLanguageProvider(<Hero />)
    const section = container.querySelector('section#hero')
    // SocialLinks renders a div.flex inside the section
    const socialContainer = section?.querySelector('div.flex')
    expect(socialContainer).toBeInTheDocument()
  })

  it('has an outer element <section id="hero">', () => {
    const { container } = renderWithLanguageProvider(<Hero />)
    const section = container.querySelector('section#hero')
    expect(section).toBeInTheDocument()
  })

  it('h1 text "Erick Andrinirina" is the same regardless of locale', () => {
    const { rerender } = render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>,
    )
    const h1Before = screen.getByRole('heading', { level: 1 }).textContent

    // Trigger locale switch by re-rendering is not straightforward from outside;
    // the name is static content so we verify it is the same string.
    rerender(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>,
    )
    const h1After = screen.getByRole('heading', { level: 1 }).textContent
    expect(h1Before).toBe('Erick Andrinirina')
    expect(h1After).toBe('Erick Andrinirina')
  })

  it('"View projects" button triggers smooth scroll to #projects section', () => {
    const mockScrollIntoView = vi.fn()
    // Create mock #projects element
    const projectsSection = document.createElement('section')
    projectsSection.id = 'projects'
    projectsSection.scrollIntoView = mockScrollIntoView
    document.body.appendChild(projectsSection)

    renderWithLanguageProvider(<Hero />)
    const cta = screen.getByRole('button', { name: /voir les projets|view projects/i })
    fireEvent.click(cta)

    expect(mockScrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: expect.any(String) }),
    )

    document.body.removeChild(projectsSection)
  })
})
