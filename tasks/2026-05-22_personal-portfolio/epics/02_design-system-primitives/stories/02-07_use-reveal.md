# Story 02-07: useReveal hook

> **Epic:** Design System — UI Primitives & Hooks
> **Size:** M
> **Status:** TODO

## Description

Create `src/hooks/useReveal.ts` — a custom React hook that uses
`IntersectionObserver` to detect when a DOM element enters the viewport and
exposes an `isVisible` boolean alongside a `ref` to attach to that element.
`Section` (Story 02-09) attaches this ref to its root element and uses
`isVisible` to apply entrance animation classes. The hook is one-shot: once
visible, it stays visible and the observer is disconnected to avoid unnecessary
callbacks. Under `prefers-reduced-motion: reduce`, the hook skips the observer
entirely and returns `isVisible = true` immediately, ensuring content is always
accessible regardless of animation preference.

## Acceptance Criteria

- [ ] The hook returns `{ ref, isVisible }` where `ref` is a `React.RefObject<Element>` and `isVisible` is a `boolean`.
- [ ] On first mount, `isVisible` is `false` when reduced-motion is **not** active.
- [ ] When the attached element intersects the viewport (`threshold` ≥ 0.1 or similar), `isVisible` becomes `true` and remains `true`.
- [ ] After `isVisible` becomes `true`, the `IntersectionObserver` is disconnected (one-shot behaviour — no further callbacks are fired).
- [ ] The observer is also disconnected on component unmount (cleanup in `useEffect` return).
- [ ] When `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is `true`:
  - [ ] `isVisible` is `true` immediately (on mount), without waiting for intersection.
  - [ ] No `IntersectionObserver` instance is created.
- [ ] The hook handles the case where `ref.current` is `null` at effect time without throwing.
- [ ] The hook is a named export from `src/hooks/useReveal.ts` (i.e. `export function useReveal()`).
- [ ] TypeScript compiles without errors; return type is explicitly annotated or correctly inferred.
- [ ] ESLint reports no violations.
- [ ] **Test notes (for the implementer; tests are not strictly required by this story but are encouraged):** Mock `IntersectionObserver` and `window.matchMedia` in `src/test/setup.ts` or at the top of the test file. Verify: (a) `isVisible` starts `false`, becomes `true` after simulated intersection; (b) under mocked `prefers-reduced-motion: reduce`, `isVisible` is `true` immediately; (c) cleanup disconnects the observer.

## Technical Notes

- `IntersectionObserver` is not available in the Vitest/jsdom environment by default. Add a mock in `src/test/setup.ts`:
  ```ts
  const mockObserve = vi.fn()
  const mockDisconnect = vi.fn()
  vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: vi.fn(),
  })))
  ```
  Similarly stub `window.matchMedia` if not already done.
- Hook implementation pattern:
  ```ts
  export function useReveal(options?: IntersectionObserverInit) {
    const ref = useRef<Element>(null)
    const [isVisible, setIsVisible] = useState(
      () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    useEffect(() => {
      if (isVisible) return           // already true (reduced-motion)
      if (!ref.current) return
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      }, { threshold: 0.1, ...options })
      observer.observe(ref.current)
      return () => observer.disconnect()
    }, [])
    return { ref, isVisible }
  }
  ```
- Default threshold: `0.1` (10% of element visible). Make it configurable via an optional `options` argument.
- The `isVisible` state initialiser reads `matchMedia` at call time. If `matchMedia` is not available (SSR/jsdom without stub), guard with `typeof window !== 'undefined'`.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/hooks/useReveal.ts` | IntersectionObserver-based reveal hook with reduced-motion support |

## Dependencies

- **Blocked by:** 01-01 (project scaffold — `src/hooks/` directory must exist)
- **Blocks:** 02-09 (Section uses useReveal), 09-03 (if a dedicated animation story references useReveal)

## Related

- **Epic:** design-system-primitives
- **Related stories:** 02-09 (Section attaches useReveal ref to its root)
- **Spec reference:** data-flow.md §6 Reveal-on-scroll; components.md §Hooks (useReveal)
