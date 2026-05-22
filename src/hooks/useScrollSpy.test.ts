/**
 * Tests for useScrollSpy hook.
 *
 * Strategy: Replace the global IntersectionObserver (already stubbed in
 * src/test/setup.ts) with a controllable implementation that captures each
 * observer's callback so tests can simulate intersection events.
 *
 * The setup.ts stub provides an inert mock; we override it per-test with a
 * richer mock that stores callbacks, then restore the original after each test.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollSpy } from './useScrollSpy'

// ---------------------------------------------------------------------------
// Controllable IntersectionObserver mock
// ---------------------------------------------------------------------------

type IOCallback = (entries: IntersectionObserverEntry[]) => void

interface MockObserverEntry {
  callback: IOCallback
  targets: Element[]
  observer: MockIOInstance
}

class MockIOInstance implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  private _callback: IOCallback
  private _targets: Element[] = []

  constructor(callback: IOCallback) {
    this._callback = callback
    MockIOInstance._instances.push({ callback, targets: this._targets, observer: this })
  }

  observe = vi.fn((el: Element) => {
    this._targets.push(el)
  })
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [] as IntersectionObserverEntry[])

  /** Simulate an intersection event for a given element on this observer. */
  triggerIntersect(element: Element, isIntersecting: boolean) {
    const entry = {
      target: element,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now(),
    } as IntersectionObserverEntry
    this._callback([entry])
  }

  // Track all instances created during a test
  static _instances: MockObserverEntry[] = []
  static resetInstances() {
    MockIOInstance._instances = []
  }
}

// ---------------------------------------------------------------------------
// Test setup / teardown
// ---------------------------------------------------------------------------

let originalIO: typeof IntersectionObserver

beforeEach(() => {
  originalIO = window.IntersectionObserver
  vi.stubGlobal('IntersectionObserver', MockIOInstance)
  MockIOInstance.resetInstances()
})

afterEach(() => {
  vi.stubGlobal('IntersectionObserver', originalIO)
  // Clean up DOM elements created per test
  document.body.innerHTML = ''
})

// Helper: create a <div id="..."> element and append to body so getElementById works
function createSection(id: string): HTMLElement {
  const el = document.createElement('div')
  el.id = id
  document.body.appendChild(el)
  return el
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useScrollSpy', () => {
  describe('initial return value', () => {
    it('returns the first sectionId before any intersection event', () => {
      createSection('hero')
      createSection('about')
      const { result } = renderHook(() => useScrollSpy(['hero', 'about']))
      expect(result.current).toBe('hero')
    })

    it('returns the first id even when DOM elements do not exist yet', () => {
      // Elements not in DOM — hook should still default to first id
      const { result } = renderHook(() => useScrollSpy(['hero', 'about']))
      expect(result.current).toBe('hero')
    })
  })

  describe('empty sectionIds', () => {
    it('returns empty string when sectionIds is empty', () => {
      const { result } = renderHook(() => useScrollSpy([]))
      expect(result.current).toBe('')
    })

    it('does not throw when sectionIds is empty', () => {
      expect(() => renderHook(() => useScrollSpy([]))).not.toThrow()
    })
  })

  describe('intersection updates', () => {
    it('updates active id when a section enters the viewport', () => {
      createSection('hero')
      const aboutEl = createSection('about')

      const { result } = renderHook(() => useScrollSpy(['hero', 'about']))
      expect(result.current).toBe('hero')

      const aboutObserverEntry = MockIOInstance._instances.find((inst) =>
        inst.targets.includes(aboutEl),
      )
      expect(aboutObserverEntry).toBeDefined()

      act(() => {
        aboutObserverEntry!.observer.triggerIntersect(aboutEl, true)
      })

      expect(result.current).toBe('about')
    })

    it('updates active id for the intersecting section (full render check)', () => {
      createSection('hero')
      const aboutEl = createSection('about')

      const { result } = renderHook(() => useScrollSpy(['hero', 'about']))
      expect(result.current).toBe('hero')

      const aboutObserverEntry = MockIOInstance._instances.find((inst) =>
        inst.targets.includes(aboutEl),
      )
      expect(aboutObserverEntry).toBeDefined()

      act(() => {
        aboutObserverEntry!.observer.triggerIntersect(aboutEl, true)
      })

      expect(result.current).toBe('about')
    })

    it('can switch active id between multiple sections', () => {
      const heroEl = createSection('hero')
      const aboutEl = createSection('about')
      const skillsEl = createSection('skills')

      const { result } = renderHook(() => useScrollSpy(['hero', 'about', 'skills']))
      expect(result.current).toBe('hero')

      const aboutEntry = MockIOInstance._instances.find((inst) =>
        inst.targets.includes(aboutEl),
      )
      act(() => {
        aboutEntry!.observer.triggerIntersect(aboutEl, true)
      })
      expect(result.current).toBe('about')

      const skillsEntry = MockIOInstance._instances.find((inst) =>
        inst.targets.includes(skillsEl),
      )
      act(() => {
        skillsEntry!.observer.triggerIntersect(skillsEl, true)
      })
      expect(result.current).toBe('skills')

      const heroEntry = MockIOInstance._instances.find((inst) =>
        inst.targets.includes(heroEl),
      )
      act(() => {
        heroEntry!.observer.triggerIntersect(heroEl, true)
      })
      expect(result.current).toBe('hero')
    })

    it('does not change active id when isIntersecting is false', () => {
      createSection('hero')
      const aboutEl = createSection('about')

      const { result } = renderHook(() => useScrollSpy(['hero', 'about']))
      expect(result.current).toBe('hero')

      const aboutEntry = MockIOInstance._instances.find((inst) =>
        inst.targets.includes(aboutEl),
      )
      act(() => {
        aboutEntry!.observer.triggerIntersect(aboutEl, false)
      })

      // Still hero — non-intersecting event should not activate 'about'
      expect(result.current).toBe('hero')
    })
  })

  describe('non-existent DOM elements', () => {
    it('skips ids that have no matching DOM element (no crash)', () => {
      // 'ghost' has no element in DOM; 'hero' does
      createSection('hero')
      expect(() => {
        renderHook(() => useScrollSpy(['ghost', 'hero']))
      }).not.toThrow()
    })

    it('creates observers only for ids that match DOM elements', () => {
      createSection('hero')
      // 'missing' is not in DOM
      renderHook(() => useScrollSpy(['missing', 'hero']))

      // Only 1 observer should be created (for 'hero')
      const heroEl = document.getElementById('hero')!
      const observedTargets = MockIOInstance._instances.flatMap((inst) => inst.targets)
      expect(observedTargets).toContain(heroEl)
      // No observers for the missing id
      expect(observedTargets.length).toBe(1)
    })
  })

  describe('cleanup on unmount', () => {
    it('disconnects all observers when the component unmounts', () => {
      createSection('hero')
      createSection('about')

      const { unmount } = renderHook(() => useScrollSpy(['hero', 'about']))

      // Capture observer instances before unmount
      const instances = [...MockIOInstance._instances]
      expect(instances.length).toBe(2)

      unmount()

      // All observers should have been disconnected
      instances.forEach((entry) => {
        expect(entry.observer.disconnect).toHaveBeenCalled()
      })
    })

    it('does not disconnect when sectionIds is empty (no observers created)', () => {
      const { unmount } = renderHook(() => useScrollSpy([]))
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('effect re-runs when sectionIds changes', () => {
    it('creates new observers when sectionIds changes', () => {
      createSection('hero')
      createSection('about')

      const { rerender } = renderHook(
        ({ ids }: { ids: string[] }) => useScrollSpy(ids),
        { initialProps: { ids: ['hero'] } },
      )

      const initialCount = MockIOInstance._instances.length
      expect(initialCount).toBe(1)

      // Change sectionIds — effect should re-run
      rerender({ ids: ['hero', 'about'] })

      // After re-render with new ids, new observers should be created
      // (old ones disconnected, new ones created)
      const totalInstances = MockIOInstance._instances.length
      expect(totalInstances).toBeGreaterThan(initialCount)
    })
  })

  describe('named export and TypeScript types', () => {
    it('is a named export', async () => {
      const module = await import('./useScrollSpy')
      expect(typeof module.useScrollSpy).toBe('function')
    })

    it('returns a string type', () => {
      createSection('hero')
      const { result } = renderHook(() => useScrollSpy(['hero']))
      expect(typeof result.current).toBe('string')
    })

    it('returns a string even for empty ids', () => {
      const { result } = renderHook(() => useScrollSpy([]))
      expect(typeof result.current).toBe('string')
    })
  })
})
