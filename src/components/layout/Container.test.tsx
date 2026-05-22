import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container', () => {
  it('renders its children', () => {
    render(<Container>hello</Container>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('renders children inside a single div', () => {
    const { container } = render(<Container>content</Container>)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    expect(container.childElementCount).toBe(1)
  })

  it('applies centering and a max-width by default', () => {
    const { container } = render(<Container>x</Container>)
    const div = container.firstChild as HTMLElement
    expect(div.className).toContain('mx-auto')
    expect(div.className).toMatch(/max-w-/)
  })

  it('applies responsive horizontal padding', () => {
    const { container } = render(<Container>x</Container>)
    const div = container.firstChild as HTMLElement
    expect(div.className).toMatch(/px-/)
    expect(div.className).toMatch(/sm:px-|md:px-|lg:px-/)
  })

  it('renders without error when no className is passed', () => {
    expect(() => render(<Container>x</Container>)).not.toThrow()
  })

  it('merges an extra className alongside the base classes', () => {
    const { container } = render(<Container className="w-full">x</Container>)
    const div = container.firstChild as HTMLElement
    expect(div.className).toContain('w-full')
    expect(div.className).toContain('mx-auto')
  })
})
