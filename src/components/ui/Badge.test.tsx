import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>React</Badge>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders inside a single inline <span>', () => {
    const { container } = render(<Badge>x</Badge>)
    expect(container.firstChild).toBeInstanceOf(HTMLSpanElement)
    expect(container.childElementCount).toBe(1)
  })

  it('applies rounded chip styling with padding', () => {
    const { container } = render(<Badge>x</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toMatch(/rounded-/)
    expect(span.className).toMatch(/px-/)
  })

  it('merges a custom className alongside the base chip styles', () => {
    const { container } = render(<Badge className="extra">x</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('extra')
    expect(span.className).toMatch(/rounded-/)
  })

  it('accepts JSX children', () => {
    render(
      <Badge>
        <strong>bold</strong>
      </Badge>,
    )
    expect(screen.getByText('bold').tagName).toBe('STRONG')
  })
})
