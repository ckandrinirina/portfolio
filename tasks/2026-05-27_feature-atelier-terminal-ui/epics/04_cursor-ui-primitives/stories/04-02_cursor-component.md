# 04-02 · `Cursor.tsx` component

**Status:** TODO · **Size:** L · **Blocked by:** 04-01

## Description

Implement the custom cursor: a fast-following dot + a lerped ring that
expands / morphs depending on the element under the mouse. States: `default
| hover | label | text`. Reads `[data-cursor]` and `[data-cursor-label]`
attributes for explicit overrides.

## Files affected

- `src/components/cursor/Cursor.tsx`

## Implementation notes

```tsx
import { useEffect, useRef, useState } from 'react'

type State = 'default' | 'hover' | 'label' | 'text'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<State>('default')
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (window.matchMedia('(hover: none), (max-width: 880px)').matches) return
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my
    let raf = 0

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      }
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    addEventListener('mousemove', move)

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      const labeled = t.closest?.('[data-cursor]') as HTMLElement | null
      if (labeled) {
        const l = labeled.getAttribute('data-cursor-label')
        if (l) { setLabel(l); setState('label'); return }
        setState('hover'); return
      }
      if (t.closest('a, button, [role="button"], .proj-card, .sb-row, .tb-search')) setState('hover')
      else if (t.closest('input, textarea, [contenteditable]')) setState('text')
      else setState('default')
    }
    document.addEventListener('mouseover', onOver)

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-state={state}>
        {state === 'label' ? label : null}
      </div>
    </>
  )
}
```

Mount once at the top of `App` (delivered in Epic 06).

## Acceptance criteria

- [ ] Component file exists at the path above.
- [ ] On a hover-capable, ≥881px viewport: dot tracks mouse 1:1; ring lerps
      smoothly at 0.18 per RAF.
- [ ] Hovering a `<button>` or `<a>` sets state to `hover` (ring expands).
- [ ] An element with `data-cursor-label="Open"` shows the label pill on hover.
- [ ] An `<input>` shows the thin vertical text-bar state.
- [ ] On viewport ≤880px or touch: hook short-circuits in the early return;
      no listeners attached.
- [ ] Cleanup runs on unmount (no stale listeners).

## Test notes

Unit test is awkward (RAF + DOM events). Skip; rely on manual verification.

## Edge cases

- iOS Safari sometimes fires `mouseleave` on tap — handled by also setting
  opacity back to 1 on `mouseenter`.
- The `mouseover` handler doesn't `e.stopPropagation()` — it's read-only.
