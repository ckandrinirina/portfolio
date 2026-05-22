// Registers @testing-library/jest-dom matchers (toBeInTheDocument, etc.) on
// every test, and polyfills the browser APIs jsdom omits but our components and
// hooks rely on (matchMedia for theme detection, IntersectionObserver for
// useReveal/useScrollSpy). Loaded once via the `setupFiles` Vitest option.
import '@testing-library/jest-dom'
import { afterEach, beforeAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

beforeAll(() => {
  // jsdom has no matchMedia — default to "no preference" (light, no reduced motion).
  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  )

  // jsdom has no IntersectionObserver — provide an inert stub.
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

// Unmount React trees and reset DOM/storage between tests to avoid leakage.
afterEach(() => {
  cleanup()
})
