import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { ThemeProvider } from './theme/ThemeProvider'
import { LanguageProvider } from './i18n/LanguageProvider'
import { NAV_SECTIONS } from './lib/constants'

function renderApp() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

describe('App page shell', () => {
  // AC: App.tsx renders a <Header/> component at the top of the output.
  it('renders a Header (banner landmark)', () => {
    renderApp()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  // AC: App.tsx renders a <main> HTML landmark element below the Header.
  it('renders a <main> landmark', () => {
    renderApp()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  // AC: The <main> element contains exactly eight section slot elements.
  it('renders exactly eight section slots inside <main>', () => {
    renderApp()
    const main = screen.getByRole('main')
    const sections = main.querySelectorAll('section')
    expect(sections).toHaveLength(8)
  })

  // AC: Each section slot has the correct id, in the order defined by NAV_SECTIONS.
  it('renders section slots with ids in the NAV_SECTIONS order', () => {
    renderApp()
    const main = screen.getByRole('main')
    const ids = Array.from(main.querySelectorAll('section')).map((s) => s.id)
    expect(ids).toEqual(NAV_SECTIONS.map((s) => s.id))
  })

  // AC (parity check): the rendered ids match the canonical eight section ids.
  it('renders the eight canonical section ids', () => {
    renderApp()
    const main = screen.getByRole('main')
    const ids = Array.from(main.querySelectorAll('section')).map((s) => s.id)
    expect(ids).toEqual([
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'education',
      'languages',
      'contact',
    ])
  })

  // AC: App.tsx renders a <Footer/> component below the <main> element.
  it('renders a Footer (contentinfo landmark)', () => {
    renderApp()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  // AC: The rendered DOM contains <header>, <main>, <footer> in correct top-to-bottom order.
  it('renders landmarks in the order header → main → footer', () => {
    const { container } = renderApp()
    const landmarks = Array.from(
      container.querySelectorAll('header, main, footer'),
    ).map((el) => el.tagName.toLowerCase())
    expect(landmarks).toEqual(['header', 'main', 'footer'])
  })

  // AC: <main> precedes <footer> in document order (footer is a sibling, after <main>).
  it('places <footer> after <main> as a sibling of the shell', () => {
    const { container } = renderApp()
    const main = container.querySelector('main')
    const footer = container.querySelector('footer')
    expect(main).not.toBeNull()
    expect(footer).not.toBeNull()
    // compareDocumentPosition: 4 = DOCUMENT_POSITION_FOLLOWING (footer comes after main)
    expect(
      main!.compareDocumentPosition(footer!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  // AC: useScrollSpy can resolve every NAV_SECTIONS id against the DOM.
  it('exposes a DOM element for every NAV_SECTIONS id', () => {
    renderApp()
    for (const { id } of NAV_SECTIONS) {
      expect(document.getElementById(id)).not.toBeNull()
    }
  })
})
