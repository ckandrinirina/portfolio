# 06-03 · `useScrollToNavigate` hook

**Status:** TODO · **Size:** XL · **Blocked by:** 06-01

## Description

The trickiest piece of routing. Wheel + touch gestures advance the route
**only** when the gesture starts at the view boundary (top or bottom) and
the user keeps pushing past it. A gesture that scrolls INTO a boundary
should NOT advance the route — the user has to lift the wheel/finger and
start a new gesture for that to count.

## Files affected

- `src/hooks/useScrollToNavigate.ts`
- `src/hooks/useScrollToNavigate.test.ts`

## Implementation notes

```ts
import { useEffect, type RefObject } from 'react'
import { ROUTE_ORDER, type RouteId } from '@/lib/constants'

const ACCUMULATOR_THRESHOLD = 90  // px
const GESTURE_END_MS        = 180 // ms idle = gesture released
const TOUCH_THRESHOLD       = 70
const TOUCH_MAX_MS          = 700

type NavigateFn = (id: RouteId, dir: 'down' | 'up') => void

export function useScrollToNavigate(
  viewRef: RefObject<HTMLElement>,
  route: RouteId,
  locked: RefObject<boolean>,
  cmdOpen: boolean,
  modalOpen: boolean,
  navigate: NavigateFn,
) {
  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    let inGesture = false
    let startedAtBoundary: 'top' | 'bot' | null = null
    let accumulator = 0
    let gestureTimer: ReturnType<typeof setTimeout> | null = null

    const endGesture = () => {
      inGesture = false
      startedAtBoundary = null
      accumulator = 0
    }

    const onWheel = (e: WheelEvent) => {
      if (locked.current || cmdOpen || modalOpen) return
      const atTop = view.scrollTop <= 1
      const atBot = view.scrollTop + view.clientHeight >= view.scrollHeight - 2
      const boundary = atTop ? 'top' : atBot ? 'bot' : null

      if (gestureTimer) clearTimeout(gestureTimer)
      gestureTimer = setTimeout(endGesture, GESTURE_END_MS)

      if (!inGesture) {
        inGesture = true
        startedAtBoundary = boundary
      }
      if (!boundary || !startedAtBoundary) { accumulator = 0; return }

      const goingDown = e.deltaY > 0
      const goingUp   = e.deltaY < 0
      if (!((goingDown && boundary === 'bot') || (goingUp && boundary === 'top'))) {
        accumulator = 0; return
      }

      accumulator += e.deltaY
      if (Math.abs(accumulator) > ACCUMULATOR_THRESHOLD) {
        const dir = accumulator > 0 ? 1 : -1
        const i = ROUTE_ORDER.indexOf(route)
        const next = i + dir
        accumulator = 0
        inGesture = false
        startedAtBoundary = null
        if (next >= 0 && next < ROUTE_ORDER.length) {
          navigate(ROUTE_ORDER[next], dir > 0 ? 'down' : 'up')
        }
      }
    }

    let touchStart: { y: number; scrollTop: number; t: number } | null = null
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touchStart = { y: t.clientY, scrollTop: view.scrollTop, t: Date.now() }
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (locked.current || cmdOpen || modalOpen || !touchStart) return
      const t = e.changedTouches[0] || e.touches[0]
      if (!t) return
      const dy = touchStart.y - t.clientY
      const dt = Date.now() - touchStart.t
      const atTop = view.scrollTop <= 2
      const atBot = view.scrollTop + view.clientHeight >= view.scrollHeight - 2
      const scrolled = Math.abs(view.scrollTop - touchStart.scrollTop) > 8
      if (Math.abs(dy) > TOUCH_THRESHOLD && dt < TOUCH_MAX_MS && !scrolled) {
        const i = ROUTE_ORDER.indexOf(route)
        if (dy > 0 && atBot && i < ROUTE_ORDER.length - 1) navigate(ROUTE_ORDER[i + 1], 'down')
        else if (dy < 0 && atTop && i > 0) navigate(ROUTE_ORDER[i - 1], 'up')
      }
      touchStart = null
    }

    view.addEventListener('wheel', onWheel, { passive: true })
    view.addEventListener('touchstart', onTouchStart, { passive: true })
    view.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      if (gestureTimer) clearTimeout(gestureTimer)
      view.removeEventListener('wheel', onWheel)
      view.removeEventListener('touchstart', onTouchStart)
      view.removeEventListener('touchend', onTouchEnd)
    }
  }, [viewRef, route, locked, cmdOpen, modalOpen, navigate])
}
```

## Acceptance criteria

- [ ] Hook signature matches.
- [ ] Pushing two wheel events with `deltaY: 100` each, with `view.scrollTop`
      stuck at 0 (above top boundary), after a gesture-end pause, triggers
      `navigate('work', 'down')` ONLY when the first event came in at the boundary.
- [ ] Scrolling INTO a boundary (within the view, not starting at boundary)
      does NOT trigger a nav.
- [ ] Touch swipe up 100px in 400ms at the bottom triggers `navigate(next, 'down')`.
- [ ] When `locked.current` is true OR `cmdOpen` OR `modalOpen`, no nav fires.
- [ ] Cleanup removes all listeners.

## Test notes

This is the hardest hook to test. Recommended approach: use
`renderHook` with a custom hook wrapper that exposes a stub view ref, then
fire `WheelEvent` and `TouchEvent` via Testing Library `fireEvent`. Mock
`view.scrollTop`, `view.clientHeight`, `view.scrollHeight` directly.

Cover at minimum: gesture-from-top, gesture-from-bottom, gesture-into-boundary
(no nav), locked state, gesture-end timeout reset.

## Edge cases

- Apple trackpads emit many small `deltaY` events; the 90px threshold means
  ~3-4 deliberate flicks are needed. This is intentional — accidental scroll
  should not nav.
- Some browsers fire `wheel` events with `deltaY = 0` for diagonal scrolling;
  the if-check `e.deltaY > 0 / < 0` handles it (zero doesn't add or subtract).
- `passive: true` is critical for performance; we don't `preventDefault` on
  the wheel event because the underlying view scrolling must still work.
