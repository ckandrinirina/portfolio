import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import CountUp from './CountUp'

describe('CountUp', () => {
  describe('default (motion enabled)', () => {
    it('renders the final value when inView is true', async () => {
      vi.useFakeTimers()
      render(<CountUp to={42} inView />)
      act(() => {
        vi.runAllTimers()
      })
      expect(screen.getByText('42')).toBeInTheDocument()
      vi.useRealTimers()
    })

    it('renders 0 initially when not in view', () => {
      render(<CountUp to={100} inView={false} />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('renders a suffix alongside the number', async () => {
      vi.useFakeTimers()
      render(<CountUp to={5} suffix="+" inView />)
      act(() => {
        vi.runAllTimers()
      })
      expect(screen.getByText(/5\+/)).toBeInTheDocument()
      vi.useRealTimers()
    })

    it('starts at 0 and ends at the target value', async () => {
      vi.useFakeTimers()
      const { container } = render(<CountUp to={10} inView />)
      // Before any ticks, should be at or near 0
      const initialText = container.textContent
      expect(initialText).toBe('0')
      act(() => {
        vi.runAllTimers()
      })
      expect(container.textContent).toBe('10')
      vi.useRealTimers()
    })

    it('accepts an optional duration prop', async () => {
      vi.useFakeTimers()
      render(<CountUp to={20} duration={500} inView />)
      act(() => {
        vi.runAllTimers()
      })
      expect(screen.getByText('20')).toBeInTheDocument()
      vi.useRealTimers()
    })

    it('does not animate before entering viewport', () => {
      render(<CountUp to={99} inView={false} />)
      expect(screen.queryByText('99')).not.toBeInTheDocument()
      expect(screen.getByText('0')).toBeInTheDocument()
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

    it('shows the final value immediately under reduced motion', () => {
      render(<CountUp to={42} inView />)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('shows the final value with suffix immediately under reduced motion', () => {
      render(<CountUp to={7} suffix="x" inView />)
      expect(screen.getByText(/7x/)).toBeInTheDocument()
    })
  })
})
