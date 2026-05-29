/**
 * Tests for useHashRoute hook.
 *
 * Strategy: Use jsdom's window.location + manually fire 'hashchange' events.
 * The hook reads the initial hash and subscribes to hashchange events.
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
import { useHashRoute } from './useHashRoute'

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useHashRoute', () => {
  let setRoute: Mock<(route: string) => void>

  beforeEach(() => {
    setRoute = vi.fn<(route: string) => void>()
    // Reset hash to empty before each test
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hash: '' },
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initialization from current hash', () => {
    it('calls setRoute with empty string when hash is empty on mount', () => {
      Object.defineProperty(window, 'location', {
        value: { ...window.location, hash: '' },
        writable: true,
      })
      renderHook(() => useHashRoute(setRoute))
      expect(setRoute).toHaveBeenCalledWith('')
    })

    it('calls setRoute with the hash value (without #) on mount', () => {
      Object.defineProperty(window, 'location', {
        value: { ...window.location, hash: '#home' },
        writable: true,
      })
      renderHook(() => useHashRoute(setRoute))
      expect(setRoute).toHaveBeenCalledWith('home')
    })

    it('strips the leading # from the hash value', () => {
      Object.defineProperty(window, 'location', {
        value: { ...window.location, hash: '#work' },
        writable: true,
      })
      renderHook(() => useHashRoute(setRoute))
      expect(setRoute).toHaveBeenCalledWith('work')
    })
  })

  describe('hashchange listener', () => {
    it('calls setRoute when hashchange fires', () => {
      renderHook(() => useHashRoute(setRoute))
      setRoute.mockClear()

      act(() => {
        Object.defineProperty(window, 'location', {
          value: { ...window.location, hash: '#experience' },
          writable: true,
        })
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      })

      expect(setRoute).toHaveBeenCalledWith('experience')
    })

    it('strips # on hashchange events', () => {
      renderHook(() => useHashRoute(setRoute))
      setRoute.mockClear()

      act(() => {
        Object.defineProperty(window, 'location', {
          value: { ...window.location, hash: '#skills' },
          writable: true,
        })
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      })

      expect(setRoute).toHaveBeenCalledWith('skills')
    })

    it('updates multiple times as hash changes', () => {
      renderHook(() => useHashRoute(setRoute))
      setRoute.mockClear()

      act(() => {
        Object.defineProperty(window, 'location', {
          value: { ...window.location, hash: '#work' },
          writable: true,
        })
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      })
      act(() => {
        Object.defineProperty(window, 'location', {
          value: { ...window.location, hash: '#contact' },
          writable: true,
        })
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      })

      expect(setRoute).toHaveBeenCalledTimes(2)
      expect(setRoute).toHaveBeenNthCalledWith(1, 'work')
      expect(setRoute).toHaveBeenNthCalledWith(2, 'contact')
    })
  })

  describe('cleanup on unmount', () => {
    it('removes the hashchange listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderHook(() => useHashRoute(setRoute))
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'hashchange',
        expect.any(Function),
      )
    })

    it('does not call setRoute after unmount when hashchange fires', () => {
      const { unmount } = renderHook(() => useHashRoute(setRoute))
      setRoute.mockClear()
      unmount()

      act(() => {
        Object.defineProperty(window, 'location', {
          value: { ...window.location, hash: '#work' },
          writable: true,
        })
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      })

      expect(setRoute).not.toHaveBeenCalled()
    })
  })

  describe('named export', () => {
    it('is a named export function', async () => {
      const module = await import('./useHashRoute')
      expect(typeof module.useHashRoute).toBe('function')
    })
  })
})
