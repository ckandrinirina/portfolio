/**
 * CountUp — animates a number from 0 to `to` when `inView` becomes true.
 *
 * Approach: the parent view (or a wrapping IntersectionObserver hook) supplies
 * the `inView` boolean so this component stays leaf-like and easy to test.
 * Under `prefers-reduced-motion: reduce` the final value is shown immediately
 * with no animation.
 *
 * The tween uses `requestAnimationFrame` for smooth interpolation. An easing
 * function (ease-out quad) is applied so the counter decelerates toward the
 * target value, matching the CSS `--ease` curve character.
 */

import { useEffect, useRef, useState } from 'react'

type Props = {
  /** Target number to count up to. */
  to: number
  /** Optional suffix appended after the number (e.g. "+", "x", "%"). */
  suffix?: string
  /** Duration of the animation in ms (default 1200). */
  duration?: number
  /** Whether the element is in the viewport. Provided by the parent. */
  inView?: boolean
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function CountUp({
  to,
  suffix = '',
  duration = 1200,
  inView = false,
}: Props) {
  const reduced = prefersReducedMotion()
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    // Reduced motion shows the final value (rendered directly below — no
    // state update needed). Outside the viewport the counter stays at 0.
    if (reduced || !inView) return

    // Animate from 0 → `to`. The first rAF tick writes progress 0 (≈0), so we
    // never call setState synchronously inside the effect.
    startRef.current = null

    function tick(now: number) {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out quad: decelerates toward target
      const eased = 1 - (1 - progress) * (1 - progress)
      setValue(Math.round(eased * to))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, to, duration, reduced])

  return (
    <span>
      {reduced ? to : value}
      {suffix}
    </span>
  )
}
