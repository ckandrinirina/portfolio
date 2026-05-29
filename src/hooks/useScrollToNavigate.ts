import { useEffect, useRef, type RefObject } from 'react'

const WHEEL_THRESHOLD = 90 // px accumulation needed to trigger nav
const PAUSE_RESET_MS = 180 // ms gap that resets the accumulator
const LOCK_MS = 850 // ms lock after a nav fires
const TOUCH_DY_MIN = 70 // px minimum swipe distance
const TOUCH_DT_MAX = 700 // ms maximum swipe duration
const TOUCH_SCROLL_EPSILON = 8 // px — view scroll that cancels touch nav

/** Returns true when el is scrolled to its top (within 0px). */
function isAtTop(el: HTMLElement): boolean {
  return el.scrollTop <= 0
}

/** Returns true when el is scrolled to its bottom (within 1px epsilon). */
function isAtBottom(el: HTMLElement): boolean {
  return el.scrollHeight - el.clientHeight - el.scrollTop <= 1
}

/**
 * useScrollToNavigate — attaches wheel and touch listeners to the view ref
 * and calls navigate('up'|'down') only when a gesture:
 *
 *   Wheel: starts at the matching scroll boundary, accumulates > 90 px in that
 *   direction, and has not paused for > 180 ms. Locks for 850 ms after firing.
 *
 *   Touch: |dy| > 70, dt < 700 ms, and the inner view did not scroll
 *   (|ΔscrollTop| < 8).
 *
 * @param viewRef  - Ref to the scrollable view element.
 * @param route    - Current route id (used as effect dependency to re-attach on change).
 * @param locked   - External lock (e.g. while a nav animation plays).
 * @param navigate - Callback receiving 'up' or 'down'.
 */
export function useScrollToNavigate(
  viewRef: RefObject<HTMLElement | null>,
  route: string,
  locked: boolean,
  navigate: (dir: 'up' | 'down') => void,
): void {
  // Internal lock ref: avoids stale-closure issues with setState + timers.
  const internalLockRef = useRef(false)
  const accumulatorRef = useRef(0)
  const lastWheelTimeRef = useRef(0)
  const gestureDirectionRef = useRef<'up' | 'down' | null>(null)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = viewRef.current
    if (!el) return

    function triggerNav(dir: 'up' | 'down') {
      internalLockRef.current = true
      navigate(dir)
      // Reset accumulator state
      accumulatorRef.current = 0
      gestureDirectionRef.current = null
      // Release lock after LOCK_MS
      setTimeout(() => {
        internalLockRef.current = false
      }, LOCK_MS)
    }

    const handleWheel = (event: WheelEvent) => {
      if (locked || internalLockRef.current) return

      const now = Date.now()
      const deltaY = event.deltaY

      // Determine the gesture direction from the sign of deltaY.
      const dir: 'up' | 'down' = deltaY < 0 ? 'up' : 'down'

      // Check if we've been paused for > PAUSE_RESET_MS — reset accumulator.
      if (now - lastWheelTimeRef.current > PAUSE_RESET_MS) {
        accumulatorRef.current = 0
        gestureDirectionRef.current = null
      }

      lastWheelTimeRef.current = now

      // A gesture is only tracked if it STARTS at the matching boundary.
      // gestureDirectionRef being null means a new gesture is beginning.
      if (gestureDirectionRef.current === null) {
        // Check the boundary condition at the start of the gesture.
        if (dir === 'down' && !isAtBottom(el)) return
        if (dir === 'up' && !isAtTop(el)) return
        gestureDirectionRef.current = dir
      } else if (gestureDirectionRef.current !== dir) {
        // Direction changed mid-gesture — reset.
        accumulatorRef.current = 0
        gestureDirectionRef.current = null
        return
      }

      // Accumulate (absolute value — direction is tracked separately).
      accumulatorRef.current += Math.abs(deltaY)

      // Schedule accumulator reset if no wheel event arrives within PAUSE_RESET_MS.
      if (pauseTimerRef.current !== null) {
        clearTimeout(pauseTimerRef.current)
      }
      pauseTimerRef.current = setTimeout(() => {
        accumulatorRef.current = 0
        gestureDirectionRef.current = null
      }, PAUSE_RESET_MS)

      if (accumulatorRef.current > WHEEL_THRESHOLD) {
        if (pauseTimerRef.current !== null) {
          clearTimeout(pauseTimerRef.current)
          pauseTimerRef.current = null
        }
        triggerNav(gestureDirectionRef.current)
      }
    }

    // Touch state (stored outside handler closures for cross-event access).
    let touchStartY = 0
    let touchStartTime = 0
    let touchStartScrollTop = 0

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      touchStartY = touch.clientY
      touchStartTime = Date.now()
      touchStartScrollTop = el.scrollTop
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (locked || internalLockRef.current) return
      const touch = event.changedTouches[0]
      if (!touch) return

      const dy = touch.clientY - touchStartY // positive = swipe down (finger moves down = navigate up)
      const dt = Date.now() - touchStartTime
      const scrollDelta = Math.abs(el.scrollTop - touchStartScrollTop)

      if (Math.abs(dy) <= TOUCH_DY_MIN) return
      if (dt >= TOUCH_DT_MAX) return
      if (scrollDelta >= TOUCH_SCROLL_EPSILON) return

      // dy > 0: finger moved down → navigate up; dy < 0: finger moved up → navigate down.
      triggerNav(dy > 0 ? 'up' : 'down')
    }

    el.addEventListener('wheel', handleWheel)
    el.addEventListener('touchstart', handleTouchStart)
    el.addEventListener('touchend', handleTouchEnd)

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
      if (pauseTimerRef.current !== null) {
        clearTimeout(pauseTimerRef.current)
      }
    }
  }, [viewRef, route, locked, navigate])
}
