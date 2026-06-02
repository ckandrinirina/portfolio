import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Reveal from './Reveal'

describe('Reveal', () => {
  describe('default (motion enabled)', () => {
    it('renders a container with the full text accessible via aria-label', () => {
      render(<Reveal text="Hello" />)
      const container = screen.getByLabelText('Hello')
      expect(container).toBeInTheDocument()
    })

    it('splits text into per-character spans', () => {
      const { container } = render(<Reveal text="Hi" />)
      const spans = container.querySelectorAll('span[aria-hidden="true"]')
      expect(spans.length).toBe(2)
    })

    it('includes a visually-hidden full-text node for screen readers', () => {
      const { container } = render(<Reveal text="Hello" />)
      const hidden = container.querySelector('.sr-only')
      expect(hidden).toBeInTheDocument()
      expect(hidden?.textContent).toBe('Hello')
    })

    it('preserves whitespace — spaces become spans or non-breaking spaces', () => {
      const { container } = render(<Reveal text="Hi there" />)
      const spans = container.querySelectorAll('span[aria-hidden="true"]')
      // "Hi there" = 8 chars including space
      expect(spans.length).toBe(8)
    })

    it('applies charIn animation class to each character span', () => {
      const { container } = render(<Reveal text="AB" />)
      const spans = container.querySelectorAll('span[aria-hidden="true"]')
      spans.forEach((span) => {
        expect(span.className).toMatch(/char-in/)
      })
    })

    it('applies staggered transition-delay to successive characters', () => {
      const { container } = render(<Reveal text="ABC" />)
      const spans = container.querySelectorAll<HTMLElement>(
        'span[aria-hidden="true"]',
      )
      // Each char should have a different (increasing) transition-delay
      const delays = Array.from(spans).map((s) => s.style.animationDelay)
      const uniqueDelays = new Set(delays)
      expect(uniqueDelays.size).toBeGreaterThan(1)
    })

    // BUG-20260602-01: the container must NOT carry the `.reveal` class. That
    // class sets opacity:0 + a translate/scale transform and is gated behind
    // useScrollReveal adding `.in`; layering it over the per-character `charIn`
    // animation washes out the letter-by-letter cascade (the whole word fades as
    // a block instead). The reference (app.jsx:570-571) gives the wrapper only
    // an optional `italic` class — the letters animate autonomously via charIn.
    it('does NOT gate the container behind the .reveal scroll class', () => {
      const { container } = render(<Reveal text="Test" />)
      expect(container.firstChild).not.toHaveClass('reveal')
    })

    it('accepts an optional className', () => {
      const { container } = render(<Reveal text="X" className="extra" />)
      expect(container.firstChild).toHaveClass('extra')
    })
  })

  describe('reduced motion', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'matchMedia',
        (query: string): MediaQueryList =>
          ({
            matches: query.includes('reduce'),
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
          }) as unknown as MediaQueryList,
      )
    })

    it('renders the plain text without per-letter spans under reduced motion', () => {
      const { container } = render(<Reveal text="Hello" />)
      const spans = container.querySelectorAll('span[aria-hidden="true"]')
      expect(spans.length).toBe(0)
    })

    it('renders the full text directly as text content', () => {
      render(<Reveal text="Hello world" />)
      expect(screen.getByText('Hello world')).toBeInTheDocument()
    })
  })
})
