# 01-06 · Universal `.reveal` scroll-reveal CSS classes

**Status:** TODO · **Size:** S · **Blocked by:** 01-03, 01-05

## Description

Add the `.reveal` family of classes that the `useScrollReveal` hook (Epic 04)
will toggle to `.in`. Plus the override rules for `.proj-card`, `.skill-card`,
`.tl-item`, `.process-item` that opt out of their mount-stagger animation in
favor of scroll-reveal.

## Files affected

- `src/index.css` — append the "Scroll reveal" block.

## Implementation notes

Verbatim from the mockup:

```css
.reveal {
  opacity: 0;
  transform: translateY(36px) scale(0.97);
  transition:
    opacity 0.9s var(--ease),
    transform 0.95s var(--ease);
  will-change: opacity, transform;
}
.reveal.r-fade  { transform: none; }
.reveal.r-left  { transform: translateX(-36px); }
.reveal.r-right { transform: translateX(36px); }
.reveal.r-scale { transform: scale(0.92); }
.reveal.in {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
}

/* Replace mount stagger on cards with scroll-reveal */
.proj-card,
.skill-card,
.tl-item,
.process-item {
  animation: none;
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition:
    opacity 1s var(--ease),
    transform 1s var(--ease),
    border-color 0.3s,
    box-shadow 0.3s;
}
.proj-card.in,
.skill-card.in,
.tl-item.in,
.process-item.in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Project card extra wow on first reveal */
.proj-card .art svg { transition: transform 0.5s var(--ease), opacity 0.8s var(--ease); }
.proj-card:not(.in) .art svg { opacity: 0; transform: scale(1.08); }
.proj-card.in .art svg { opacity: 1; transform: scale(1); }
```

## Acceptance criteria

- [ ] `.reveal`, `.reveal.r-fade`, `.reveal.r-left`, `.reveal.r-right`,
      `.reveal.r-scale`, and `.reveal.in` all present.
- [ ] The four card-class override rules present.
- [ ] The `.proj-card .art svg` reveal rule present.
- [ ] A temporary `<div class="reveal" style="background:#E08660; width:100px; height:100px"></div>` starts invisible and becomes visible when the class `.in` is added via devtools.

## Test notes

Useful unit test in Epic 04 (`useScrollReveal`): verifies `.in` is added when
elements intersect.

## Edge cases

- The `:not(.in)` on `.proj-card .art svg` means we MUST add the `.in` class
  via JS — there's no CSS-only fallback. The hook in Epic 04 handles this.
