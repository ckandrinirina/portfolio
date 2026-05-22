import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from './Section'

const defaultMatchMedia = (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }) as unknown as MediaQueryList

describe('Section', () => {
  afterEach(() => {
    // Restore the no-preference default so a reduced-motion override here does
    // not leak into other tests/files (do NOT unstub IntersectionObserver).
    vi.stubGlobal('matchMedia', defaultMatchMedia)
  })

  it('renders a <section> with the given id', () => {
    const { container } = render(
      <Section id="about" title="About">
        body
      </Section>,
    )
    const section = container.querySelector('section')
    expect(section).not.toBeNull()
    expect(section).toHaveAttribute('id', 'about')
  })

  it('renders the title inside an <h2>', () => {
    render(
      <Section id="about" title="About me">
        body
      </Section>,
    )
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('About me')
  })

  it('renders its children', () => {
    render(
      <Section id="about" title="About">
        <p>section body</p>
      </Section>,
    )
    expect(screen.getByText('section body')).toBeInTheDocument()
  })

  it('contains exactly one heading (the h2, no h1)', () => {
    render(
      <Section id="about" title="About">
        body
      </Section>,
    )
    expect(screen.getAllByRole('heading')).toHaveLength(1)
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
  })

  it('applies pre-animation (hidden) classes when not yet visible', () => {
    const { container } = render(
      <Section id="about" title="About">
        body
      </Section>,
    )
    const section = container.querySelector('section') as HTMLElement
    expect(section.className).toContain('opacity-0')
  })

  it('renders fully visible when prefers-reduced-motion is set', () => {
    vi.stubGlobal(
      'matchMedia',
      (query: string) =>
        ({
          matches: true,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    )
    const { container } = render(
      <Section id="about" title="About">
        body
      </Section>,
    )
    const section = container.querySelector('section') as HTMLElement
    expect(section.className).toContain('opacity-100')
  })
})
