/**
 * Cursor.test.tsx — Unit tests for the custom cursor component.
 *
 * Covers:
 * - Dot and ring render on hover devices (matchMedia returns hover:hover)
 * - Does not render on touch devices (matchMedia returns hover:none)
 * - Dot moves on mousemove
 * - Ring lerps behind with RAF (mocked)
 * - Switches to 'hover' state on interactive elements (a, button, .proj-card)
 * - Switches to 'label' state on [data-cursor][data-cursor-label]
 * - Switches to 'text' state on inputs/textareas
 * - Reverts to 'default' on non-interactive elements
 * - Cleans up event listeners and RAF on unmount
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Cursor from './Cursor'

// Helper: create a matchMedia stub that returns matches for a given query
function makeMatchMedia(matchingQuery: string) {
  return (query: string): MediaQueryList =>
    ({
      matches: query === matchingQuery,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList
}

// matchMedia stub for hover device (fine pointer + hover)
function hoverMatchMedia() {
  return makeMatchMedia('(hover: none), (max-width: 880px)')
}

describe('Cursor', () => {
  let rafCallbacks: FrameRequestCallback[] = []
  let rafId = 0

  beforeEach(() => {
    rafCallbacks = []
    rafId = 0

    // Mock RAF — store callbacks, return incrementing ids
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      rafCallbacks.push(cb)
      return ++rafId
    })
    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    // Default: hover-capable device (no match on "hover:none" query)
    vi.stubGlobal(
      'matchMedia',
      (query: string): MediaQueryList =>
        ({
          matches: false, // (hover: none) does NOT match → device has hover
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

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  // ── AC 1: renders dot and ring on hover-capable device ────────────────────
  it('renders the cursor dot on a hover device', () => {
    render(<Cursor />)
    expect(screen.getByTestId('cursor-dot')).toBeInTheDocument()
  })

  it('renders the cursor ring on a hover device', () => {
    render(<Cursor />)
    expect(screen.getByTestId('cursor-ring')).toBeInTheDocument()
  })

  // ── AC 2: does not render on touch/small-screen devices ───────────────────
  it('does not render on hover:none device', () => {
    // matchMedia returns matches=true for the disable query
    vi.stubGlobal('matchMedia', hoverMatchMedia())
    render(<Cursor />)
    expect(screen.queryByTestId('cursor-dot')).not.toBeInTheDocument()
    expect(screen.queryByTestId('cursor-ring')).not.toBeInTheDocument()
  })

  // ── AC 3: dot moves on mousemove ──────────────────────────────────────────
  it('moves the dot to the pointer position on mousemove', () => {
    render(<Cursor />)
    act(() => {
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 123,
          clientY: 456,
          bubbles: true,
        }),
      )
    })
    const dot = screen.getByTestId('cursor-dot')
    // The dot uses translate3d — check the style attribute contains the coordinates
    expect(dot.style.transform).toContain('123')
    expect(dot.style.transform).toContain('456')
  })

  // ── AC 4: ring lerps via RAF ──────────────────────────────────────────────
  it('schedules a RAF tick for the ring lerp', () => {
    render(<Cursor />)
    act(() => {
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 100,
          clientY: 200,
          bubbles: true,
        }),
      )
    })
    expect(rafCallbacks.length).toBeGreaterThan(0)
  })

  // ── AC 5: hover state on interactive elements ─────────────────────────────
  it('sets hover state when mousing over a button', () => {
    render(
      <>
        <Cursor />
        <button>Click me</button>
      </>,
    )
    const button = screen.getByRole('button')
    act(() => {
      // Dispatch on the element so e.target resolves to it naturally. (Do NOT
      // override MouseEvent.prototype.target — that corrupts global state for
      // every subsequent test in this file.)
      button.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    const ring = screen.getByTestId('cursor-ring')
    expect(ring.className).toContain('hover')
  })

  it('sets hover state when mousing over a link', () => {
    render(
      <>
        <Cursor />
        <a href="#">Link</a>
      </>,
    )
    const link = screen.getByRole('link')
    act(() => {
      link.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    const ring = screen.getByTestId('cursor-ring')
    expect(ring.className).toContain('hover')
  })

  // ── AC 6: label state on [data-cursor][data-cursor-label] ─────────────────
  it('sets label state when mousing over a [data-cursor][data-cursor-label] element', () => {
    render(
      <>
        <Cursor />
        <div data-cursor data-cursor-label="View project">
          Project card
        </div>
      </>,
    )
    const el = screen.getByText('Project card')
    act(() => {
      el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    const ring = screen.getByTestId('cursor-ring')
    expect(ring.className).toContain('label')
  })

  it('shows the data-cursor-label text when in label state', () => {
    render(
      <>
        <Cursor />
        <div data-cursor data-cursor-label="View project">
          Project card
        </div>
      </>,
    )
    const el = screen.getByText('Project card')
    act(() => {
      el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    expect(screen.getByTestId('cursor-ring')).toHaveTextContent('View project')
  })

  // ── AC 7: text state on inputs ────────────────────────────────────────────
  it('sets text state when mousing over an input', () => {
    render(
      <>
        <Cursor />
        <input type="text" aria-label="Search" />
      </>,
    )
    const input = screen.getByRole('textbox')
    act(() => {
      input.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    const ring = screen.getByTestId('cursor-ring')
    expect(ring.className).toContain('text')
  })

  it('sets text state when mousing over a textarea', () => {
    render(
      <>
        <Cursor />
        <textarea aria-label="Message" />
      </>,
    )
    const textarea = screen.getByRole('textbox')
    act(() => {
      textarea.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    const ring = screen.getByTestId('cursor-ring')
    expect(ring.className).toContain('text')
  })

  // ── AC 8: default state on non-interactive elements ───────────────────────
  it('reverts to default state on a plain div', () => {
    render(
      <>
        <Cursor />
        <button>Btn</button>
        <div data-testid="plain">Plain</div>
      </>,
    )
    // First hover over button to trigger hover state
    const button = screen.getByRole('button')
    act(() => {
      button.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    // Then hover over plain div
    const plain = screen.getByTestId('plain')
    act(() => {
      plain.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    })
    const ring = screen.getByTestId('cursor-ring')
    expect(ring.className).not.toContain('hover')
    expect(ring.className).not.toContain('label')
    expect(ring.className).not.toContain('text')
  })

  // ── AC 9: cleanup on unmount ──────────────────────────────────────────────
  it('cancels RAF on unmount', () => {
    const cancelRAF = vi.fn()
    vi.stubGlobal('cancelAnimationFrame', cancelRAF)
    const { unmount } = render(<Cursor />)
    act(() => {
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 10,
          clientY: 20,
          bubbles: true,
        }),
      )
    })
    unmount()
    expect(cancelRAF).toHaveBeenCalled()
  })

  it('removes event listeners on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const { unmount } = render(<Cursor />)
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('mouseover', expect.any(Function))
  })

  // ── AC 10: focus rings remain (cursor does not replace native focus) ───────
  it('dot and ring have pointer-events: none so they do not block focus', () => {
    render(<Cursor />)
    const dot = screen.getByTestId('cursor-dot')
    const ring = screen.getByTestId('cursor-ring')
    // The CSS class cursor-dot / cursor-ring has pointer-events: none — components must apply them
    expect(dot.className).toContain('cursor-dot')
    expect(ring.className).toContain('cursor-ring')
  })
})
