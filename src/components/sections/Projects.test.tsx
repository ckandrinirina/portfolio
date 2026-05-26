/**
 * Projects.test.tsx
 *
 * Tests for the Projects section component.
 * Maps each acceptance criterion to one or more assertions.
 * Wraps the component in LanguageProvider (the real one) so content and
 * locale-switch behaviour are exercised end-to-end.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import { useLanguage } from '../../i18n/useLanguage'
import frContent from '../../content/fr'
import enContent from '../../content/en'
import Projects from './Projects'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderProjects(locale: 'fr' | 'en' = 'fr') {
  localStorage.setItem('locale', locale)
  return render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  )
}

/**
 * A small switcher probe that renders both locale buttons and the Projects
 * component, allowing locale-switch behaviour tests.
 */
function SwitcherProbe() {
  const { setLocale } = useLanguage()
  return (
    <>
      <button onClick={() => setLocale('en')}>set-en</button>
      <button onClick={() => setLocale('fr')}>set-fr</button>
      <Projects />
    </>
  )
}

function renderWithSwitcher(initialLocale: 'fr' | 'en' = 'fr') {
  localStorage.setItem('locale', initialLocale)
  return render(
    <LanguageProvider>
      <SwitcherProbe />
    </LanguageProvider>,
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.lang = ''
})

afterEach(() => {
  localStorage.clear()
})

// ---------------------------------------------------------------------------
// AC: section element with id="projects"
// ---------------------------------------------------------------------------
describe('Projects — section structure', () => {
  it('renders a <section> element with id="projects"', () => {
    const { container } = renderProjects()
    const section = container.querySelector('section#projects')
    expect(section).toBeInTheDocument()
  })

  it('renders an <h2> heading (provided by Section wrapper)', () => {
    renderProjects()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC: all projects rendered as Card components
// ---------------------------------------------------------------------------
describe('Projects — project cards', () => {
  it('renders all French projects from content.projects[]', () => {
    renderProjects('fr')
    // Some project names appear also as company names, so use getAllByText
    // and verify at least one element is present
    expect(screen.getAllByText('SOKA Club').length).toBeGreaterThan(0)
    expect(screen.getAllByText('SOKA Live').length).toBeGreaterThan(0)
    expect(screen.getAllByText('LUDOKA').length).toBeGreaterThan(0)
    expect(screen.getAllByText('EER Full Digital').length).toBeGreaterThan(0)
    // 'SHOYO' is both a project name and a company — multiple elements expected
    expect(screen.getAllByText('SHOYO').length).toBeGreaterThan(0)
    expect(screen.getAllByText('THESEIS').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Happy Capital / My Capital Immo').length).toBeGreaterThan(0)
    expect(screen.getAllByText('OCR / GPT-4').length).toBeGreaterThan(0)
    expect(screen.getAllByText('VTC Academy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('PANAFRI HELP').length).toBeGreaterThan(0)
    expect(screen.getAllByText('IPSUM – ERP Commercial').length).toBeGreaterThan(0)
    expect(screen.getAllByText('BNI Madagascar').length).toBeGreaterThan(0)
  })

  it('renders all projects — count matches content.projects array length (FR)', () => {
    renderProjects('fr')
    const projectCount = frContent.projects.length
    // Verify all project names from fr content are present
    frContent.projects.forEach((project) => {
      // Use getAllByText since some names might appear in both h3 and company p
      expect(screen.getAllByText(project.name).length).toBeGreaterThan(0)
    })
    expect(projectCount).toBeGreaterThanOrEqual(12) // at minimum 12 from story spec
  })
})

// ---------------------------------------------------------------------------
// AC: each card displays name, company/client, description, and tech badges
// ---------------------------------------------------------------------------
describe('Projects — card content', () => {
  it('displays the project name in each card', () => {
    renderProjects('fr')
    expect(screen.getAllByText('SOKA Club').length).toBeGreaterThan(0)
  })

  it('displays the company/client name for each project', () => {
    renderProjects('fr')
    // The first three projects belong to SOKA / YAS Madagascar
    const instances = screen.getAllByText('SOKA / YAS Madagascar')
    expect(instances.length).toBeGreaterThan(0)
  })

  it('displays the description text for a project', () => {
    renderProjects('fr')
    // Description of SOKA Club in FR — unique text, so getByText is safe
    expect(
      screen.getByText(frContent.projects[0].description),
    ).toBeInTheDocument()
  })

  it('renders tech tags as Badge chips for the first project', () => {
    renderProjects('fr')
    // Multiple projects share Next.js and NestJS tags, so getAllByText is correct
    expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0)
    expect(screen.getAllByText('NestJS').length).toBeGreaterThan(0)
  })

  it('renders all tech tags for a multi-tag project', () => {
    renderProjects('fr')
    // SOKA Club has: Next.js, NestJS, Prisma, PostgreSQL, Web3, Tailwind CSS
    const sokaClub = frContent.projects[0]
    sokaClub.techTags.forEach((tag) => {
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0)
    })
  })

  it('tech tags are wrapped so they can flex-wrap on narrow cards', () => {
    const { container } = renderProjects('fr')
    // Find the tech-tag wrapper div: it should have flex-wrap class
    const wrappers = container.querySelectorAll('[class*="flex-wrap"]')
    expect(wrappers.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// AC: responsive grid layout
// ---------------------------------------------------------------------------
describe('Projects — responsive grid layout', () => {
  it('uses a grid layout for the cards container', () => {
    const { container } = renderProjects()
    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toBeInTheDocument()
  })

  it('applies responsive column classes (sm: or lg: breakpoints)', () => {
    const { container } = renderProjects()
    const grid = container.querySelector('[class*="grid"]')
    expect(grid?.className).toMatch(/sm:|lg:/)
  })
})

// ---------------------------------------------------------------------------
// AC: locale switch updates descriptions without page reload
// ---------------------------------------------------------------------------
describe('Projects — locale switching', () => {
  it('shows French descriptions by default', () => {
    renderProjects('fr')
    expect(
      screen.getByText(frContent.projects[0].description),
    ).toBeInTheDocument()
  })

  it('switches to English descriptions on locale change', () => {
    renderWithSwitcher('fr')
    fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    expect(
      screen.getByText(enContent.projects[0].description),
    ).toBeInTheDocument()
  })

  it('project names remain unchanged on locale switch (proper nouns)', () => {
    renderWithSwitcher('fr')
    // Project name before switch
    expect(screen.getAllByText('SOKA Club').length).toBeGreaterThan(0)
    fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    // Project name must still be present after switch
    expect(screen.getAllByText('SOKA Club').length).toBeGreaterThan(0)
  })

  it('company/client names remain unchanged on locale switch (proper nouns)', () => {
    renderWithSwitcher('fr')
    const company = frContent.projects[0].company // 'SOKA / YAS Madagascar'
    expect(screen.getAllByText(company).length).toBeGreaterThan(0)
    fireEvent.click(screen.getByRole('button', { name: 'set-en' }))
    expect(screen.getAllByText(company).length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// AC: no TypeScript errors — structural / type safety
// ---------------------------------------------------------------------------
describe('Projects — TypeScript / structural', () => {
  it('renders without crashing when content.projects is the FR array', () => {
    expect(() => renderProjects('fr')).not.toThrow()
  })

  it('renders without crashing when content.projects is the EN array', () => {
    expect(() => renderProjects('en')).not.toThrow()
  })
})
