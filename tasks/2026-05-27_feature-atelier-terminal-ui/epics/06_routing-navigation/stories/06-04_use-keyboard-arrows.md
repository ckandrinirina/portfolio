# 06-04 · `useKeyboardArrows` hook

**Status:** TODO · **Size:** S · **Blocked by:** 06-01

## Description

`useKeyboardArrows(route, viewRef, locked, cmdOpen, modalOpen, navigate)` —
ArrowDown / PageDown advance when the view is at the scroll bottom;
ArrowUp / PageUp go back when at the scroll top. Ignored while input/textarea
focused, or while cmdOpen / modalOpen / locked.

## Files affected

- `src/hooks/useKeyboardArrows.ts`
- `src/hooks/useKeyboardArrows.test.ts`

## Implementation notes

```ts
import { useEffect, type RefObject } from 'react'
import { ROUTE_ORDER, type RouteId } from '@/lib/constants'

type NavigateFn = (id: RouteId, dir: 'down' | 'up') => void

export function useKeyboardArrows(
  route: RouteId,
  viewRef: RefObject<HTMLElement>,
  locked: RefObject<boolean>,
  cmdOpen: boolean,
  modalOpen: boolean,
  navigate: NavigateFn,
) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (locked.current || cmdOpen || modalOpen) return
      const tgt = e.target as HTMLElement | null
      if (tgt?.matches?.('input, textarea, [contenteditable=true]')) return
      const v = viewRef.current
      const i = ROUTE_ORDER.indexOf(route)
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (i < ROUTE_ORDER.length - 1) {
          if (v && v.scrollTop + v.clientHeight < v.scrollHeight - 4) return
          e.preventDefault()
          navigate(ROUTE_ORDER[i + 1], 'down')
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (i > 0) {
          if (v && v.scrollTop > 4) return
          e.preventDefault()
          navigate(ROUTE_ORDER[i - 1], 'up')
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [route, viewRef, locked, cmdOpen, modalOpen, navigate])
}
```

## Acceptance criteria

- [ ] Hook signature matches.
- [ ] ArrowDown at bottom triggers next route.
- [ ] ArrowDown not at bottom does NOT trigger; the event default is
      allowed (native scrolling).
- [ ] ArrowUp at top triggers previous route.
- [ ] When focus is in an input, no navigation.
- [ ] Locked/cmdOpen/modalOpen short-circuit.
- [ ] Cleanup removes listener.

## Test notes

Unit test with `fireEvent.keyDown(window, { key: 'ArrowDown' })`. Mock
`viewRef.current` with `scrollTop`, `clientHeight`, `scrollHeight`.

## Edge cases

- Holding ArrowDown could fire many keydown events. The 850ms lock in
  `App.tsx` (story 06-05) absorbs the burst.
