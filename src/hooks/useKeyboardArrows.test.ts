/**
 * Tests for useKeyboardArrows hook.
 *
 * Strategy: Attach a fake viewRef (div with controllable scrollTop/scrollHeight/clientHeight),
 * dispatch KeyboardEvent on window, and check if navigate is called correctly.
 * Tests boundary detection and locked state.
 */
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRef } from 'react'
import { useKeyboardArrows } from './useKeyboardArrows'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeViewRef(opts: {
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
  return el
}

function fireKey(key: string) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  })
  window.dispatchEvent(event)
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useKeyboardArrows', () => {
  let navigate: Mock<(dir: 'up' | 'down') => void>

  beforeEach(() => {
    navigate = vi.fn<(dir: 'up' | 'down') => void>()
  })

  describe('ArrowDown at bottom boundary', () => {
    it('calls navigate("down") when ArrowDown pressed at bottom boundary', () => {
      const el = makeViewRef({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })
      const { result } = renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
        return ref
      })
      void result

      act(() => {
        fireKey('ArrowDown')
      })

      expect(navigate).toHaveBeenCalledWith('down')
    })

    it('calls navigate("down") when PageDown pressed at bottom boundary', () => {
      const el = makeViewRef({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })

      act(() => {
        fireKey('PageDown')
      })

      expect(navigate).toHaveBeenCalledWith('down')
    })

    it('does NOT navigate("down") when NOT at bottom boundary', () => {
      // scrollTop=100, scrollHeight=800, clientHeight=400 — not at bottom (800-400-100=300 > 1)
      const el = makeViewRef({
        scrollTop: 100,
        scrollHeight: 800,
        clientHeight: 400,
      })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })

      act(() => {
        fireKey('ArrowDown')
      })

      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('ArrowUp at top boundary', () => {
    it('calls navigate("up") when ArrowUp pressed at top boundary', () => {
      const el = makeViewRef({
        scrollTop: 0,
        scrollHeight: 800,
        clientHeight: 400,
      })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })

      act(() => {
        fireKey('ArrowUp')
      })

      expect(navigate).toHaveBeenCalledWith('up')
    })

    it('calls navigate("up") when PageUp pressed at top boundary', () => {
      const el = makeViewRef({
        scrollTop: 0,
        scrollHeight: 800,
        clientHeight: 400,
      })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })

      act(() => {
        fireKey('PageUp')
      })

      expect(navigate).toHaveBeenCalledWith('up')
    })

    it('does NOT navigate("up") when NOT at top boundary', () => {
      // scrollTop=50 — not at top (50 > 0)
      const el = makeViewRef({
        scrollTop: 50,
        scrollHeight: 800,
        clientHeight: 400,
      })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })

      act(() => {
        fireKey('ArrowUp')
      })

      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('locked state', () => {
    it('does NOT navigate when locked is true', () => {
      const el = makeViewRef({
        scrollTop: 400,
        scrollHeight: 800,
        clientHeight: 400,
      })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, true, navigate)
      })

      act(() => {
        fireKey('ArrowDown')
      })

      expect(navigate).not.toHaveBeenCalled()
    })

    it('does NOT navigate up when locked', () => {
      const el = makeViewRef({
        scrollTop: 0,
        scrollHeight: 800,
        clientHeight: 400,
      })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, true, navigate)
      })

      act(() => {
        fireKey('ArrowUp')
      })

      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('unrelated keys', () => {
    it('does not navigate on ArrowLeft', () => {
      const el = makeViewRef({ scrollTop: 0 })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })
      act(() => {
        fireKey('ArrowLeft')
      })
      expect(navigate).not.toHaveBeenCalled()
    })

    it('does not navigate on ArrowRight', () => {
      const el = makeViewRef({ scrollTop: 0 })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })
      act(() => {
        fireKey('ArrowRight')
      })
      expect(navigate).not.toHaveBeenCalled()
    })

    it('does not navigate on Enter', () => {
      const el = makeViewRef({ scrollTop: 0 })
      renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })
      act(() => {
        fireKey('Enter')
      })
      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('null ref', () => {
    it('does not throw when ref.current is null', () => {
      renderHook(() => {
        const ref = useRef<HTMLElement>(null)
        useKeyboardArrows(ref, false, navigate)
      })
      expect(() =>
        act(() => {
          fireKey('ArrowDown')
        }),
      ).not.toThrow()
    })
  })

  describe('cleanup on unmount', () => {
    it('removes keydown listener on unmount', () => {
      const el = makeViewRef({ scrollTop: 0 })
      const removeSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = renderHook(() => {
        const ref = useRef<HTMLElement>(el)
        useKeyboardArrows(ref, false, navigate)
      })
      unmount()
      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    })
  })

  describe('named export', () => {
    it('is a named export function', async () => {
      const module = await import('./useKeyboardArrows')
      expect(typeof module.useKeyboardArrows).toBe('function')
    })
  })
})
