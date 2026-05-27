# 04-04 · `CountUp.tsx`

**Status:** TODO · **Size:** S · **Blocked by:** —

## Description

`<CountUp to={7} />` animates a number from 0 to `to` with an ease-out cubic
curve over `duration` (default 1100ms). Used in HomeView stats grid.

## Files affected

- `src/components/ui/CountUp.tsx`
- `src/components/ui/CountUp.test.tsx`

## Implementation notes

```tsx
import { useEffect, useState } from 'react'

type Props = { to: number; suffix?: string; duration?: number }

export default function CountUp({ to, suffix = '', duration = 1100 }: Props) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const step = () => {
      const t = performance.now() - t0
      const p = Math.min(1, t / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <span>{n}{suffix}</span>
}
```

## Acceptance criteria

- [ ] Renders `<span>{n}{suffix}</span>`.
- [ ] After ~1.1s (default), final value equals `to`.
- [ ] Re-renders if `to` changes.
- [ ] Cleanup cancels the RAF on unmount.
- [ ] Unit test: render with `to={5}`, advance time with `vi.useFakeTimers`,
      assert final value is 5.

## Test notes

Use `vi.useFakeTimers()` + `vi.advanceTimersByTime(1100)`. RAF is tricky
under fake timers — use `vi.spyOn(performance, 'now')` + manual `step()`
invocations OR `@testing-library/react` `act` with real timers and
`await waitFor(() => expect(...).toBe(5))`.

## Edge cases

- If user has `prefers-reduced-motion`, the eased animation still runs but
  visually completes within one frame (timer is too fast to perceive). For
  full compliance, the parent should not render `CountUp` under reduced
  motion — handled by CSS rules in Epic 01 (cards animation disabled). The
  number animation is a JS thing; future enhancement could skip if reduced
  motion is preferred. For this story, ship as-is.
