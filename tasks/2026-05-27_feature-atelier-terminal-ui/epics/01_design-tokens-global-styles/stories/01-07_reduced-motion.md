# 01-07 · Global `prefers-reduced-motion` overrides

**Status:** TODO · **Size:** S · **Blocked by:** 01-05, 01-06

## Description

When `prefers-reduced-motion: reduce`, disable every animation and force final
visible state. Two override blocks: the universal one (all animations and
transitions short-circuited) and the reveal-specific one (cards visible).

## Files affected

- `src/index.css` — append both `@media` blocks.

## Implementation notes

Verbatim:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .proj-card,
  .skill-card,
  .tl-item,
  .process-item {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .view-enter,
  .proj-card,
  .skill-card,
  .tl-item,
  .process-item {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Reduced motion overrides for new animations */
@media (prefers-reduced-motion: reduce) {
  .view-enter-down,
  .view-enter-up,
  .home-name .char {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

The three `@media` blocks are layered intentionally (matches the mockup
source). Don't merge them.

## Acceptance criteria

- [ ] All three `@media (prefers-reduced-motion: reduce)` blocks present.
- [ ] In devtools "Rendering" → "Emulate CSS prefers-reduced-motion: reduce",
      a temporary `<div class="reveal" style="background:#E08660;width:50px;height:50px">` shows immediately at full opacity (no transition).
- [ ] Lighthouse / axe a11y check confirms reduced-motion is respected.

## Test notes

Manual verification with devtools rendering emulation. No automated test;
covered by Epic 12 quality pass.

## Edge cases

- `0.01ms` is the canonical "effectively zero" value; do not use `0` (some
  browsers ignore zero-duration transitions and fire events anyway).
