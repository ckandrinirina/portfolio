import { render, screen } from '@testing-library/react'
import { createElement } from 'react'

// Smoke test: globals (describe/it/expect) resolve without imports, and the
// runner executes — proves the Vitest pipeline + setup file load cleanly.
it('test harness is configured', () => {
  expect(true).toBe(true)
})

// jest-dom matchers (toBeInTheDocument, toHaveTextContent) are registered
// globally via src/test/setup.ts, and RTL render queries the rendered DOM.
it('renders a component and exposes jest-dom matchers', () => {
  render(createElement('button', {}, 'Download CV'))
  const button = screen.getByRole('button', { name: /download cv/i })
  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent('Download CV')
})

// jsdom lacks matchMedia and IntersectionObserver; setup.ts polyfills both so
// downstream theme/hook tests (useReveal, useScrollSpy, ThemeToggle) can run.
it('provides jsdom polyfills for matchMedia and IntersectionObserver', () => {
  expect(typeof window.matchMedia).toBe('function')
  expect(typeof globalThis.IntersectionObserver).toBe('function')
  expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(false)
})
