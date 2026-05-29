import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders a <button> when `as` is omitted', () => {
    render(<Button>click</Button>)
    const el = screen.getByRole('button', { name: 'click' })
    expect(el.tagName).toBe('BUTTON')
  })

  it('renders an <a> (not a button) when as="a"', () => {
    render(
      <Button as="a" href="https://example.com">
        link
      </Button>,
    )
    const el = screen.getByRole('link', { name: 'link' })
    expect(el.tagName).toBe('A')
  })

  it('sets href on the anchor when provided', () => {
    render(
      <Button as="a" href="https://example.com">
        link
      </Button>,
    )
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    )
  })

  it('renders an <a> without throwing when as="a" but no href', () => {
    expect(() => render(<Button as="a">no href</Button>)).not.toThrow()
    expect(screen.getByText('no href').tagName).toBe('A')
  })

  it('applies .btn class by default (secondary variant)', () => {
    const { container } = render(<Button>default</Button>)
    expect((container.firstChild as HTMLElement).className).toContain('btn')
  })

  it('applies .btn-primary class for the primary variant', () => {
    const { container } = render(<Button variant="primary">primary</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('btn-primary')
  })

  it('applies .btn class for the secondary variant explicitly', () => {
    const { container } = render(<Button variant="secondary">sec</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('btn')
  })

  it('applies distinct classes per variant', () => {
    const { rerender, container } = render(<Button variant="primary">p</Button>)
    const primary = (container.firstChild as HTMLElement).className
    rerender(<Button variant="secondary">s</Button>)
    const secondary = (container.firstChild as HTMLElement).className
    expect(primary).not.toBe(secondary)
  })

  it('includes a visible focus ring for keyboard accessibility', () => {
    const { container } = render(<Button>x</Button>)
    expect((container.firstChild as HTMLElement).className).toMatch(
      /focus-visible:/,
    )
  })

  it('merges a custom className alongside variant classes', () => {
    const { container } = render(<Button className="custom-class">x</Button>)
    expect((container.firstChild as HTMLElement).className).toContain(
      'custom-class',
    )
  })
})
