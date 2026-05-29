/**
 * Cursor — the custom pointer overlay (dot + lerped ring).
 *
 * Two fixed elements sit above all content. The dot tracks `mousemove` directly;
 * the ring lerps toward the pointer at ~0.18 per animation frame. A `mouseover`
 * listener inspects `e.target.closest(...)` to switch the ring's state:
 *   - `label`   over `[data-cursor][data-cursor-label]` (ring shows the label)
 *   - `text`    over inputs / textareas / contenteditable (thin bar)
 *   - `hover`   over links / buttons / cards / palette items
 *   - `default` otherwise
 *
 * The whole overlay is disabled (renders nothing) when the device lacks a fine
 * hover pointer or the viewport is narrow — `(hover: none) or (max-width: 880px)`.
 * Both elements are `pointer-events: none` (via the stylesheet) so native focus
 * styling is never replaced.
 *
 * SOLID notes:
 *   - S: this component owns only the pointer FX; it takes no props.
 *   - O: new hover targets are new selectors, not new branches of logic.
 */

import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'hover' | 'label' | 'text'

/** Media query that disables the custom cursor (coarse pointer / small screen). */
const DISABLE_QUERY = '(hover: none), (max-width: 880px)'

/** Selectors that put the ring into its `hover` state. */
const HOVER_SELECTOR =
  'a, button, .proj-card, [data-cursor], [role="option"], .cmdk-input'

/** Selectors that put the ring into its `text` state. */
const TEXT_SELECTOR =
  'input, textarea, [contenteditable=""], [contenteditable="true"]'

/** Ring follow factor per animation frame (higher = snappier). */
const RING_LERP = 0.18

function isDisabled(): boolean {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false
  }
  return window.matchMedia(DISABLE_QUERY).matches
}

export default function Cursor() {
  // Evaluated once on first render so we can skip rendering entirely on
  // touch / small-screen devices (no dot, no ring, no listeners).
  const [enabled] = useState(() => !isDisabled())
  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')

  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY

    function handleMove(e: MouseEvent) {
      targetX = e.clientX
      targetY = e.clientY
      const dot = dotRef.current
      if (dot) {
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
      }
    }

    function handleOver(e: MouseEvent) {
      const el = e.target as Element | null
      if (!el || typeof el.closest !== 'function') return

      const labelEl = el.closest('[data-cursor][data-cursor-label]')
      if (labelEl) {
        setLabel(labelEl.getAttribute('data-cursor-label') ?? '')
        setState('label')
        return
      }
      if (el.closest(TEXT_SELECTOR)) {
        setLabel('')
        setState('text')
        return
      }
      if (el.closest(HOVER_SELECTOR)) {
        setLabel('')
        setState('hover')
        return
      }
      setLabel('')
      setState('default')
    }

    function tick() {
      ringX += (targetX - ringX) * RING_LERP
      ringY += (targetY - ringY) * RING_LERP
      const ring = ringRef.current
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

  if (!enabled) return null

  const ringClass = `cursor-ring${state === 'default' ? '' : ` ${state}`}`

  return (
    <>
      <div
        data-testid="cursor-dot"
        className="cursor-dot"
        ref={dotRef}
        aria-hidden="true"
      />
      <div
        data-testid="cursor-ring"
        className={ringClass}
        ref={ringRef}
        aria-hidden="true"
      >
        {state === 'label' ? label : null}
      </div>
    </>
  )
}
