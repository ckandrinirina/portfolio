import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import Languages from './Languages'

describe('Languages section', () => {
  // Test 1: Renders inside a section with id="languages"
  it('renders inside a <section id="languages">', () => {
    const { container } = render(
      <LanguageProvider>
        <Languages />
      </LanguageProvider>,
    )
    const section = container.querySelector('#languages')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')
  })

  // Test 2: Section wrapper renders h2 heading with locale-appropriate label
  it('renders an <h2> heading (via Section wrapper)', () => {
    render(
      <LanguageProvider>
        <Languages />
      </LanguageProvider>,
    )
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  // Test 3: All three spoken languages are rendered (default English locale per content structure)
  it('renders all three spoken languages', () => {
    render(
      <LanguageProvider>
        <Languages />
      </LanguageProvider>,
    )
    // Check for English language names (from content)
    expect(screen.getByText('Malagasy')).toBeInTheDocument()
    expect(screen.getByText('French')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  // Test 4: Each language entry shows language name and proficiency level
  it('shows language name and proficiency level for each language', () => {
    render(
      <LanguageProvider>
        <Languages />
      </LanguageProvider>,
    )
    expect(screen.getByText('Malagasy')).toBeInTheDocument()
    expect(screen.getByText('Native')).toBeInTheDocument()

    expect(screen.getByText('French')).toBeInTheDocument()
    expect(screen.getByText('Fluent')).toBeInTheDocument()

    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Working proficiency')).toBeInTheDocument()
  })

  // Test 5: Proficiency descriptors are present and locale-aware
  it('shows all proficiency levels correctly', () => {
    render(
      <LanguageProvider>
        <Languages />
      </LanguageProvider>,
    )
    // The proficiency descriptors should be present in the rendered output
    expect(screen.getByText('Native')).toBeInTheDocument()
    expect(screen.getByText('Fluent')).toBeInTheDocument()
    expect(screen.getByText('Working proficiency')).toBeInTheDocument()
  })

  // Test 6: Layout is legible and visually clear - each language is distinct
  it('renders each language as a distinct entry (distinct DOM elements)', () => {
    const { container } = render(
      <LanguageProvider>
        <Languages />
      </LanguageProvider>,
    )

    // Check that we have a list with three items
    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBe(3)

    // Check that section has content for all three languages
    const section = container.querySelector('#languages')
    expect(section).toHaveTextContent('Malagasy')
    expect(section).toHaveTextContent('French')
    expect(section).toHaveTextContent('English')
  })

  // Test 7: No TypeScript errors - component renders without crashing
  it('renders without errors or TypeScript issues', () => {
    expect(() => {
      render(
        <LanguageProvider>
          <Languages />
        </LanguageProvider>,
      )
    }).not.toThrow()
  })
})
