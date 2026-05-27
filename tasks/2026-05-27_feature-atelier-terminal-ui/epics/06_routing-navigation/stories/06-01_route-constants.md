# 06-01 · `ROUTE_ORDER` constants + types

**Status:** TODO · **Size:** S · **Blocked by:** —

## Description

Add the route order and next-route label map to `src/lib/constants.ts`.
Export shared types.

## Files affected

- `src/lib/constants.ts`

## Implementation notes

```ts
export type RouteId = 'home' | 'work' | 'experience' | 'skills' | 'process' | 'contact'

export const ROUTE_ORDER: readonly RouteId[] = [
  'home', 'work', 'experience', 'skills', 'process', 'contact',
] as const

/** Localized via the consuming view; this is the i18n key suffix per route. */
export const NEXT_LABEL_KEY: Record<RouteId, RouteId | null> = {
  home: 'work',
  work: 'experience',
  experience: 'skills',
  skills: 'process',
  process: 'contact',
  contact: null,
}

export function nextRoute(cur: RouteId): RouteId | null {
  const i = ROUTE_ORDER.indexOf(cur)
  return i < ROUTE_ORDER.length - 1 ? ROUTE_ORDER[i + 1] : null
}

export function prevRoute(cur: RouteId): RouteId | null {
  const i = ROUTE_ORDER.indexOf(cur)
  return i > 0 ? ROUTE_ORDER[i - 1] : null
}

export function isRouteId(s: string): s is RouteId {
  return (ROUTE_ORDER as readonly string[]).includes(s)
}
```

## Acceptance criteria

- [ ] All exports present.
- [ ] `nextRoute('home')` returns `'work'`; `nextRoute('contact')` returns `null`.
- [ ] `prevRoute('home')` returns `null`; `prevRoute('contact')` returns `'process'`.
- [ ] `isRouteId('home')` is `true`; `isRouteId('foo')` is `false`.
- [ ] Unit test in `constants.test.ts` asserts the above.

## Test notes

Trivial unit test; add 5 assertions.

## Edge cases

- None.
