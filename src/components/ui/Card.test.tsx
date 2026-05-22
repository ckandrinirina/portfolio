import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>body</Card>)
    expect(screen.getByText('body')).toBeInTheDocument()
  })

  it('renders children inside a single block-level element', () => {
    const { container } = render(<Card>x</Card>)
    expect(container.childElementCount).toBe(1)
    const root = container.firstChild as HTMLElement
    expect(['DIV', 'ARTICLE']).toContain(root.tagName)
  })

  it('has a visible surface: border, background and rounded corners', () => {
    const { container } = render(<Card>x</Card>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toMatch(/border/)
    expect(root.className).toMatch(/bg-/)
    expect(root.className).toMatch(/rounded-/)
  })

  it('merges a custom className alongside the base card styles', () => {
    const { container } = render(<Card className="extra">x</Card>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('extra')
    expect(root.className).toMatch(/rounded-/)
  })

  it('accepts any React node as children', () => {
    render(
      <Card>
        <p>para</p>
      </Card>,
    )
    expect(screen.getByText('para').tagName).toBe('P')
  })
})
