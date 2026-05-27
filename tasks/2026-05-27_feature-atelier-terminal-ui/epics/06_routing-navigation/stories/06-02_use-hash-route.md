# 06-02 · `useHashRoute` hook

**Status:** TODO · **Size:** S · **Blocked by:** 06-01

## Description

`useHashRoute(setRoute)` reads `window.location.hash` on mount and listens
for `hashchange`. If the hash matches a valid route, call `setRoute(hash)`.

## Files affected

- `src/hooks/useHashRoute.ts`
- `src/hooks/useHashRoute.test.ts`

## Implementation notes

```ts
import { useEffect } from 'react'
import { isRouteId, type RouteId } from '@/lib/constants'

export function useHashRoute(setRoute: (id: RouteId) => void) {
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace('#', '')
      if (h && isRouteId(h)) setRoute(h)
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [setRoute])
}
```

The companion in `App.tsx` (story 06-05) calls
`history.replaceState(null, '', '#' + id)` whenever route changes, so this
hook doesn't need to write the hash.

## Acceptance criteria

- [ ] On mount with `location.hash = '#work'`, `setRoute('work')` is called.
- [ ] On mount with no hash, `setRoute` is not called.
- [ ] On mount with `#bogus`, `setRoute` is not called.
- [ ] `hashchange` fires `setRoute` when valid hash arrives.
- [ ] Cleanup removes the listener.

## Test notes

```ts
import { renderHook } from '@testing-library/react'
import { useHashRoute } from './useHashRoute'

it('applies valid initial hash', () => {
  location.hash = '#skills'
  const setRoute = vi.fn()
  renderHook(() => useHashRoute(setRoute))
  expect(setRoute).toHaveBeenCalledWith('skills')
})
```

## Edge cases

- Reset `location.hash = ''` in `beforeEach` so tests don't bleed state.
