# 07-07 · Marquee strip wiring

**Status:** TODO · **Size:** S · **Blocked by:** 07-01, 04-05

## Description

Add the `<Marquee items={content.marquee} />` at the bottom of `HomeView`.

## Files affected

- `src/views/HomeView.tsx`

## Implementation notes

```tsx
import Marquee from '@/components/ui/Marquee'

// at the bottom of HomeView return:
<Marquee items={content.marquee} />
```

That's it — Marquee component + CSS are delivered in 04-05.

## Acceptance criteria

- [ ] `<Marquee>` mounts at the end of HomeView.
- [ ] The infinite loop runs.
- [ ] Hovering pauses it.
- [ ] At ≤1100px and ≤600px, the negative margins extend to the edge of the
      `.view` (visual check — CSS already handles it).

## Test notes

Render and assert `document.querySelector('.marquee')` exists.

## Edge cases

- None.
