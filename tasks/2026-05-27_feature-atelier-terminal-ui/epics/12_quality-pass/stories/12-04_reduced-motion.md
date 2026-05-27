# 12-04 · `prefers-reduced-motion` verification

**Status:** TODO · **Size:** S · **Blocked by:** 11-05, 01-07

## Description

In devtools "Emulate CSS prefers-reduced-motion: reduce", confirm every
animation/transition is disabled.

## Checklist

- [ ] No view-enter animation on route change (instant).
- [ ] No letter-by-letter reveal on hero name (text appears immediately).
- [ ] No role-rotor cycling animation (CSS transform transition is overridden;
      JS still cycles, but visually instant — acceptable).
- [ ] No marquee scroll (animation duration 0.01ms → effectively static).
- [ ] No card hover lift (`transform: none !important`).
- [ ] No scroll-reveal entrance.
- [ ] No cursor lerp animation (cursor still works; transitions just instant).
- [ ] No orbit / blink / bounce on sidebar mark, now-card icon, scroll-hint arrow.

## Acceptance criteria

- [ ] Every animation observed with the reduced-motion media is either gone
      or instantaneous.
- [ ] Page still functional and visually coherent.

## Test notes

Manual; devtools rendering.

## Edge cases

- The CountUp animation still runs (it's JS-driven). For full compliance,
  add a `useReducedMotion()` hook and short-circuit CountUp when reduce is
  preferred (render `to` directly). Optional follow-up — note in epic 12-04.
