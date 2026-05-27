# 04-06 · `useScrollReveal` hook

**Status:** TODO · **Size:** M · **Blocked by:** 01-06

## Description

`useScrollReveal(viewRef, route)` — on every `route` change, after a 30ms
tick (let React commit), find all `.reveal, .proj-card, .skill-card, .tl-item,
.process-item, .now-card, .stats-grid` descendants of `viewRef`, strip `.in`
from each, then observe with an `IntersectionObserver`. When an element
enters, set a `transitionDelay` based on its sibling index (capped at 8) and
add `.in`. Unobserve after.

## Files affected

- `src/hooks/useScrollReveal.ts`
- `src/hooks/useScrollReveal.test.ts`

## Implementation notes

```ts
import { useEffect, type RefObject } from 'react'

const SELECTORS =
  '.reveal, .proj-card, .skill-card, .tl-item, .process-item, .now-card, .stats-grid'

export function useScrollReveal<T extends HTMLElement>(
  viewRef: RefObject<T>,
  route: string
) {
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    let io: IntersectionObserver | null = null
    const setup = () => {
      const els = view.querySelectorAll<HTMLElement>(SELECTORS)
      els.forEach((el) => el.classList.remove('in'))
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = e.target.parentElement
              ? Array.from(e.target.parentElement.children).indexOf(e.target)
              : 0
            ;(e.target as HTMLElement).style.transitionDelay = `${Math.min(idx, 8) * 90}ms`
            e.target.classList.add('in')
            io!.unobserve(e.target)
          }
        })
      }, { root: view, threshold: 0.08, rootMargin: '0px 0px -8% 0px' })
      els.forEach((el) => io!.observe(el))
    }
    const t = setTimeout(setup, 30)
    return () => {
      clearTimeout(t)
      if (io) io.disconnect()
    }
  }, [route, viewRef])
}
```

## Acceptance criteria

- [ ] Hook signature matches the snippet.
- [ ] On `route` change, all previously-observed `.in` classes are stripped
      before re-observing.
- [ ] Elements that intersect get `transitionDelay` proportional to their
      sibling index (capped at `8 * 90ms = 720ms`).
- [ ] Returned cleanup disconnects the observer and clears the setTimeout.
- [ ] Unit test mocks `IntersectionObserver`, mounts a test container with
      `.reveal` children, asserts `.in` is added when the mock fires
      `isIntersecting: true`.

## Test notes

Use a hand-rolled IntersectionObserver mock with a `trigger(targets)` helper
that synchronously invokes the callback with `isIntersecting: true`.

## Edge cases

- Stories that render a different `route` keyed view will REMOUNT the view
  (key on route). When React unmounts, this hook's cleanup runs — which
  disconnects the observer. The new view's effect re-runs and starts fresh.
- The hook observes a snapshot at 30ms post-route-change. If new `.reveal`
  elements appear later (data fetched async, etc.), they won't be observed.
  Not a concern today (all content is static).
