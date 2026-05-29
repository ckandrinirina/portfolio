/**
 * Tests for useScrollToNavigate hook.
 *
 * Strategy: Use vi.useFakeTimers() for the 850ms lock and 180ms reset.
 * Synthesize WheelEvent and TouchEvent-like objects.
 * The hook attaches listeners to viewRef.current.
 */
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRef } from 'react'
import { useScrollToNavigate } from './useScrollToNavigate'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeEl(opts: {
  scrollTop?: number
  scrollHeight?: number
  clientHeight?: number
}) {
  const el = document.createElement('div')
  Object.defineProperties(el, {
    scrollTop: {
      value: opts.scrollTop ?? 0,
      writable: true,
      configurable: true,
    },
    scrollHeight: {
      value: opts.scrollHeight ?? 800,
      writable: true,
      configurable: true,
    },
    clientHeight: {
      value: opts.clientHeight ?? 400,
      writable: true,
      configurable: true,
    },
  })
  document.body.appendChild(el)
  return el
}

/** Fire a wheel event on an element with deltaY */
function fireWheel(el: HTMLElement, deltaY: number) {
  const event = new WheelEvent('wheel', {
    deltaY,
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(event)
}

/** Simulate a touch gesture */
function fireTouch(
  el: HTMLElement,
  opts: {
    startY: number
    endY: number
    dt?: number
    startScrollTop?: number
    endScrollTop?: number
  },
) {
  const startY = opts.startY
  const endY = opts.endY

  // touchstart
  const touchStart = new TouchEvent('touchstart', {
    touches: [
      {
        clientY: startY,
        clientX: 0,
        identifier: 0,
        target: el,
      } as unknown as Touch,
    ],
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(touchStart)

  // Update scrollTop if changed
  if (opts.endScrollTop !== undefined) {
    Object.defineProperty(el, 'scrollTop', {
      value: opts.endScrollTop,
      writable: true,
      configurable: true,
    })
  }

  // touchend
  const touchEnd = new TouchEvent('touchend', {
    changedTouches: [
      {
        clientY: endY,
        clientX: 0,
        identifier: 0,
        target: el,
      } as unknown as Touch,
    ],
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(touchEnd)
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useScrollToNavigate', () => {
  let navigate: Mock<(dir: 'up' | 'down') => void>

  beforeEach(() => {
    navigate = vi.fn<(dir: 'up' | 'down') => void>()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  // -------------------------------------------------------------------------
  // Wheel — bottom boundary → navigate('down')
  // -------------------------------------------------------------------------

  describe('wheel gesture at bottom boundary', () => {
    it('calls navigate("down") when starting at bottom and accumulating > 90px', () => {
      // scrollTop=400, scrollHeight=800, clientHeight=400 → at bottom
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 100) // > 90px, starts at bottom
      })

      expect(navigate).toHaveBeenCalledWith('down')
    })

    it('does NOT navigate when accumulator is <= 90px', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 50) // only 50px
      })

      expect(navigate).not.toHaveBeenCalled()
    })

    it('accumulates across multiple small wheel events', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 50) // 50px
        fireWheel(el, 50) // total 100px > 90px
      })

      expect(navigate).toHaveBeenCalledWith('down')
    })
  })

  // -------------------------------------------------------------------------
  // Wheel — top boundary → navigate('up')
  // -------------------------------------------------------------------------

  describe('wheel gesture at top boundary', () => {
    it('calls navigate("up") when starting at top and accumulating > 90px upward', () => {
      // scrollTop=0 → at top
      const el = makeEl({ scrollTop: 0, scrollHeight: 800, clientHeight: 400 })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, -100) // negative deltaY = upward
      })

      expect(navigate).toHaveBeenCalledWith('up')
    })
  })

  // -------------------------------------------------------------------------
  // Wheel — NOT starting at boundary → no nav
  // -------------------------------------------------------------------------

  describe('wheel gesture NOT starting at boundary', () => {
    it('does not navigate when gesture starts in the middle of the view', () => {
      // scrollTop=100, scrollHeight=800, clientHeight=400 → not at top or bottom
      const el = makeEl({
        scrollTop: 100,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 200) // large delta, but not at boundary
      })

      expect(navigate).not.toHaveBeenCalled()
    })

    it('does not navigate when gesture scrolls INTO the bottom boundary but did not start there', () => {
      // Start not at boundary
      const el = makeEl({
        scrollTop: 100,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        // First wheel event: not at boundary, accumulator starts fresh (should not track)
        fireWheel(el, 50)
        // Now simulate scrolling to boundary
        Object.defineProperty(el, 'scrollTop', {
          value: 400,
          writable: true,
          configurable: true,
        })
        fireWheel(el, 50)
      })

      expect(navigate).not.toHaveBeenCalled()
    })
  })

  // -------------------------------------------------------------------------
  // Accumulator reset after > 180ms pause
  // -------------------------------------------------------------------------

  describe('accumulator reset after pause', () => {
    it('resets the accumulator after > 180ms gap and does not navigate', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 60) // 60px — below threshold
      })

      act(() => {
        vi.advanceTimersByTime(200) // > 180ms pause — accumulator resets
        fireWheel(el, 60) // 60px again — fresh start, still below 90
      })

      expect(navigate).not.toHaveBeenCalled()
    })

    it('does navigate if accumulation continues within 180ms', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 50) // 50px
      })
      act(() => {
        vi.advanceTimersByTime(100) // < 180ms
        fireWheel(el, 50) // total = 100px > 90
      })

      expect(navigate).toHaveBeenCalledWith('down')
    })
  })

  // -------------------------------------------------------------------------
  // 850ms lock after nav
  // -------------------------------------------------------------------------

  describe('850ms lock after navigation', () => {
    it('ignores wheel gestures during the 850ms lock', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 100) // triggers nav + lock
      })

      expect(navigate).toHaveBeenCalledTimes(1)
      navigate.mockClear()

      act(() => {
        vi.advanceTimersByTime(500) // still within lock
        fireWheel(el, 200) // should be ignored
      })

      expect(navigate).not.toHaveBeenCalled()
    })

    it('allows navigation after 850ms lock expires', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireWheel(el, 100) // triggers nav + lock
      })

      navigate.mockClear()

      act(() => {
        vi.advanceTimersByTime(900) // > 850ms lock expired
        fireWheel(el, 100) // should navigate again
      })

      expect(navigate).toHaveBeenCalledWith('down')
    })
  })

  // -------------------------------------------------------------------------
  // External locked prop
  // -------------------------------------------------------------------------

  describe('locked prop', () => {
    it('does not navigate when locked is true (external lock)', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', true, navigate)
      })

      act(() => {
        fireWheel(el, 200)
      })

      expect(navigate).not.toHaveBeenCalled()
    })
  })

  // -------------------------------------------------------------------------
  // Touch navigation
  // -------------------------------------------------------------------------

  describe('touch navigation', () => {
    it('calls navigate("up") on upward swipe with |dy| > 70 and dt < 700ms', () => {
      const el = makeEl({ scrollTop: 0, scrollHeight: 800, clientHeight: 400 })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireTouch(el, {
          startY: 100,
          endY: 180,
          startScrollTop: 0,
          endScrollTop: 0,
        })
      })

      expect(navigate).toHaveBeenCalledWith('up')
    })

    it('calls navigate("down") on downward swipe with |dy| > 70 and dt < 700ms', () => {
      const el = makeEl({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireTouch(el, {
          startY: 200,
          endY: 100,
          startScrollTop: 400,
          endScrollTop: 400,
        })
      })

      expect(navigate).toHaveBeenCalledWith('down')
    })

    it('does NOT navigate when |dy| <= 70', () => {
      const el = makeEl({ scrollTop: 0 })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        fireTouch(el, { startY: 100, endY: 130 }) // only 30px
      })

      expect(navigate).not.toHaveBeenCalled()
    })

    it('does NOT navigate when the inner view actually scrolled (|ΔscrollTop| >= 8)', () => {
      const el = makeEl({ scrollTop: 0 })

      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      act(() => {
        // startScrollTop=0, endScrollTop=20 — view scrolled 20px
        fireTouch(el, {
          startY: 100,
          endY: 200,
          startScrollTop: 0,
          endScrollTop: 20,
        })
      })

      expect(navigate).not.toHaveBeenCalled()
    })
  })

  // -------------------------------------------------------------------------
  // Null ref safety
  // -------------------------------------------------------------------------

  describe('null ref', () => {
    it('does not throw when ref.current is null', () => {
      expect(() => {
        renderHook(() => {
          const ref = useRef<HTMLElement>(null)
          useScrollToNavigate(ref, 'home', false, navigate)
        })
      }).not.toThrow()
    })
  })

  // -------------------------------------------------------------------------
  // Cleanup
  // -------------------------------------------------------------------------

  describe('cleanup on unmount', () => {
    it('removes wheel and touch listeners on unmount', () => {
      const el = makeEl({ scrollTop: 0 })
      const removeSpy = vi.spyOn(el, 'removeEventListener')

      const { unmount } = renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useScrollToNavigate(ref, 'home', false, navigate)
      })

      unmount()

      expect(removeSpy).toHaveBeenCalledWith('wheel', expect.any(Function))
    })
  })
})
