/**
 * Tests for useCmdK hook.
 *
 * Strategy: Dispatch synthetic KeyboardEvent on window and check whether
 * the toggle callback is called and preventDefault is invoked.
 */
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCmdK } from './useCmdK'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fireCmdK(opts: { metaKey?: boolean; ctrlKey?: boolean }) {
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    metaKey: opts.metaKey ?? false,
    ctrlKey: opts.ctrlKey ?? false,
    bubbles: true,
    cancelable: true,
  })
  window.dispatchEvent(event)
  return event
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useCmdK', () => {
  let toggle: Mock<() => void>

  beforeEach(() => {
    toggle = vi.fn<() => void>()
  })

  describe('⌘K (Meta+K)', () => {
    it('calls toggle when Meta+K is pressed', () => {
      renderHook(() => useCmdK(toggle))

      act(() => {
        fireCmdK({ metaKey: true })
      })

      expect(toggle).toHaveBeenCalledTimes(1)
    })

    it('does not call toggle on plain K without meta/ctrl', () => {
      renderHook(() => useCmdK(toggle))

      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true })
        window.dispatchEvent(event)
      })

      expect(toggle).not.toHaveBeenCalled()
    })
  })

  describe('Ctrl+K', () => {
    it('calls toggle when Ctrl+K is pressed', () => {
      renderHook(() => useCmdK(toggle))

      act(() => {
        fireCmdK({ ctrlKey: true })
      })

      expect(toggle).toHaveBeenCalledTimes(1)
    })
  })

  describe('preventDefault', () => {
    it('calls preventDefault on Meta+K', () => {
      renderHook(() => useCmdK(toggle))

      let capturedEvent: KeyboardEvent | null = null
      const originalAddEventListener = window.addEventListener.bind(window)
      const spy = vi
        .spyOn(window, 'addEventListener')
        .mockImplementation((type, listener, options) => {
          if (type === 'keydown') {
            // wrap listener to capture event
            const wrapped = (e: Event) => {
              capturedEvent = e as KeyboardEvent
              vi.spyOn(capturedEvent, 'preventDefault')
              ;(listener as EventListener)(e)
            }
            return originalAddEventListener(type, wrapped, options)
          }
          return originalAddEventListener(type, listener, options)
        })

      // Re-render to pick up the wrapped listener (this test approach is complex;
      // use a simpler approach: listen before the hook and capture events)
      spy.mockRestore()

      // Simpler: just test preventDefault is invoked via event.defaultPrevented
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true,
        cancelable: true,
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      act(() => {
        window.dispatchEvent(event)
      })

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('calls preventDefault on Ctrl+K', () => {
      renderHook(() => useCmdK(toggle))

      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      act(() => {
        window.dispatchEvent(event)
      })

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('does NOT call preventDefault on plain K', () => {
      renderHook(() => useCmdK(toggle))

      const event = new KeyboardEvent('keydown', {
        key: 'k',
        bubbles: true,
        cancelable: true,
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      act(() => {
        window.dispatchEvent(event)
      })

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })
  })

  describe('cleanup on unmount', () => {
    it('removes keydown listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = renderHook(() => useCmdK(toggle))
      unmount()
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      )
    })

    it('does not call toggle after unmount', () => {
      const { unmount } = renderHook(() => useCmdK(toggle))
      unmount()
      toggle.mockClear()

      act(() => {
        fireCmdK({ metaKey: true })
      })

      expect(toggle).not.toHaveBeenCalled()
    })
  })

  describe('different keys', () => {
    it('does not call toggle for Meta+J', () => {
      renderHook(() => useCmdK(toggle))

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'j',
            metaKey: true,
            bubbles: true,
          }),
        )
      })

      expect(toggle).not.toHaveBeenCalled()
    })

    it('does not call toggle for Escape', () => {
      renderHook(() => useCmdK(toggle))

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
        )
      })

      expect(toggle).not.toHaveBeenCalled()
    })
  })

  describe('named export', () => {
    it('is a named export function', async () => {
      const module = await import('./useCmdK')
      expect(typeof module.useCmdK).toBe('function')
    })
  })
})
