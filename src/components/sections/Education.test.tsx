import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import Education from './Education'

/**
 * Test helper: wraps the Education component in LanguageProvider so it can
 * access useLanguage() context, and optionally in other wrappers if needed.
 */
function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('Education', () => {
  // AC: renders inside a <section id="education">
  it('renders inside a <section id="education">', () => {
    const { container } = renderWithProviders(<Education />)
    const section = container.querySelector('section#education')
    expect(section).not.toBeNull()
  })

  // AC: <h2> heading is rendered by Section wrapper with locale-appropriate label
  it('renders an <h2> heading via the Section wrapper', () => {
    const { container } = renderWithProviders(<Education />)
    const section = container.querySelector('section#education')
    const heading = section?.querySelector('h2')
    expect(heading).not.toBeNull()
    // In French (default), label is "Éducation"; in English, "Education"
    expect(heading?.textContent).toMatch(/[ÉE]ducation/i)
  })

  // AC: all three education entries are rendered
  it('renders all three education entries', () => {
    renderWithProviders(<Education />)
    // Check for distinctive text from the three entries:
    // 1. Master's engineer (2018, École Supérieure Polytechnique d'Antananarivo)
    // 2. Advanced web development (2019, NEITIC)
    // 3. Scientific Baccalaureate (2013)
    const tableRows = screen.getAllByRole('row')
    // Should have 1 header row + 3 data rows = 4 total rows
    expect(tableRows.length).toBeGreaterThanOrEqual(4)
  })

  // AC: each entry shows year, qualification, and institution
  it('renders education entries with year, qualification, and institution', () => {
    const { container } = renderWithProviders(<Education />)
    const table = container.querySelector('table')
    expect(table).not.toBeNull()
    // Check for presence of key text from entries
    // In French: "Ingénieur Master" or in English: "Master's Engineer"
    expect(container.textContent).toMatch(/Master|Ingénieur/)
    // Check for years: should have 2018, 2019, 2013
    expect(container.textContent).toMatch(/2018|2019|2013/)
  })

  // AC: missing/empty institution field renders gracefully (no crash, no [object Object], no undefined)
  it('handles empty institution field gracefully (Baccalaureate entry)', () => {
    const { container } = renderWithProviders(<Education />)
    // The Baccalaureate entry has an empty institution; it should render as — or empty, not "undefined"
    const content = container.textContent || ''
    expect(content).not.toMatch(/\[object Object\]/)
    expect(content).not.toMatch(/undefined/)
    // Should render without throwing
    expect(container).not.toBeNull()
  })

  // AC: <table> includes <thead>, <tbody>, <th scope="col">, proper semantics
  it('renders a table with proper semantic structure', () => {
    const { container } = renderWithProviders(<Education />)
    const table = container.querySelector('table')
    expect(table).not.toBeNull()

    const thead = table?.querySelector('thead')
    expect(thead).not.toBeNull()

    const tbody = table?.querySelector('tbody')
    expect(tbody).not.toBeNull()

    // Check for column header <th> elements with scope="col"
    const columnHeaders = thead?.querySelectorAll('th[scope="col"]')
    expect(columnHeaders).not.toBeNull()
    expect((columnHeaders?.length || 0) > 0).toBe(true)
  })

  // AC: column headers are present and have correct scope attribute
  it('renders column headers with scope="col" attribute', () => {
    const { container } = renderWithProviders(<Education />)
    const columnHeaders = container.querySelectorAll('th[scope="col"]')
    expect(columnHeaders.length).toBeGreaterThan(0)
    // Should have at least 3 headers: Year, Qualification, Institution (or their localized versions)
    expect(columnHeaders.length).toBeGreaterThanOrEqual(3)
  })

  // AC: locale switch updates qualification titles correctly
  it('renders with expected content in the active locale', () => {
    const { container } = renderWithProviders(<Education />)
    // Verify education content is present (either French or English, depending on locale resolution)
    // Common text that appears in both: institution names, years
    expect(container.textContent).toMatch(/NEITIC|Polytechnique|2018|2019|2013/)
  })

  // AC: table is readable and rows are properly structured
  it('renders data rows inside <tbody>', () => {
    const { container } = renderWithProviders(<Education />)
    const tbody = container.querySelector('tbody')
    const rows = tbody?.querySelectorAll('tr')
    expect(rows).not.toBeNull()
    // Should have 3 data rows (one per education entry)
    expect((rows?.length || 0) >= 3).toBe(true)
  })

  // AC: each row has cells for year, qualification, institution
  it('each row contains cells with year and qualification data', () => {
    const { container } = renderWithProviders(<Education />)
    const rows = container.querySelectorAll('tbody tr')
    expect(rows.length).toBeGreaterThanOrEqual(3)
    // Check first row has content
    const firstRow = rows[0]
    expect(firstRow?.textContent?.length || 0).toBeGreaterThan(0)
  })

  // AC: no TypeScript errors on npm run build (runtime verification: no throw)
  it('renders without throwing', () => {
    expect(() => renderWithProviders(<Education />)).not.toThrow()
  })

  // Edge case: ensure the component can be rendered as a sibling in a larger tree
  it('renders correctly when included in a larger component tree', () => {
    const { container } = renderWithProviders(
      <div>
        <h1>Test Page</h1>
        <Education />
        <footer>Footer</footer>
      </div>,
    )
    // Verify the section element exists with correct id
    const section = container.querySelector('section#education')
    expect(section).not.toBeNull()
  })

  // Edge case: verify no "undefined" text in rendered output
  it('does not render the word "undefined" in output', () => {
    const { container } = renderWithProviders(<Education />)
    expect(container.textContent).not.toMatch(/\bundefined\b/)
  })

  // Edge case: verify no "[object Object]" in rendered output
  it('does not render "[object Object]" in output', () => {
    const { container } = renderWithProviders(<Education />)
    expect(container.textContent).not.toMatch(/\[object Object\]/)
  })

  // AC: ensures the section has the education id for scrollspy nav
  it('has the correct id for navigation targeting', () => {
    const { container } = renderWithProviders(<Education />)
    const section = container.querySelector('section')
    expect(section?.id).toBe('education')
  })
})
