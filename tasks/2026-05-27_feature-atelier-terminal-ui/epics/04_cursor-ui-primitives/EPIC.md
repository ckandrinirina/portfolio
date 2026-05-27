# Epic 04 · Custom cursor & UI primitives

**Goal:** Build the cross-cutting UI primitives that every view depends on:
the custom cursor (dot + ring with hover/label/text states), the
letter-by-letter `Reveal`, the eased `CountUp`, the looping `Marquee`, and
the `useScrollReveal` hook that orchestrates intersection-observer reveals.

## Scope

- `Cursor.tsx` + CSS rules `.cursor-dot` / `.cursor-ring`
  (CSS already partly in Epic 01; cursor-specific rules added here).
- `Reveal.tsx` (letter-by-letter animated text).
- `CountUp.tsx` (eased number animation).
- `Marquee.tsx` (looping horizontal track).
- `useScrollReveal.ts` (IntersectionObserver + stagger).

## Stories

| ID    | Title                                          | Size |
|-------|------------------------------------------------|------|
| 04-01 | Cursor base CSS (`.cursor-dot` / `.cursor-ring`) | S    |
| 04-02 | `Cursor.tsx` component                         | L    |
| 04-03 | `Reveal.tsx` (letter-by-letter)                 | M    |
| 04-04 | `CountUp.tsx`                                   | S    |
| 04-05 | `Marquee.tsx`                                   | M    |
| 04-06 | `useScrollReveal` hook                          | M    |

## Dependencies

- 01-02 (palette tokens — `--accent`, `--bg`).
- 01-05 (`@keyframes blink`, `marquee`, `charIn` used by primitives).

## Acceptance for the epic

- On a hover-capable device (`(hover: hover) and (pointer: fine)`), the
  cursor disappears and the custom dot + ring follow the mouse.
- Hovering a button shows the expanded ring; hovering `[data-cursor-label="X"]`
  shows the label pill.
- A `<Reveal text="Hello" />` renders each character with a 40ms stagger.
- A `<CountUp to={7} />` animates from 0 to 7 over 1.1s with ease-out cubic.
- A `<Marquee items={[…]}>` continuously loops with edge fade and pauses on
  hover.
- A `useScrollReveal()` call adds `.in` to `.reveal` descendants of the view
  when they intersect.
