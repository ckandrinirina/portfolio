# 01-05 · Universal `@keyframes` library

**Status:** TODO · **Size:** M · **Blocked by:** 01-02

## Description

Define every `@keyframes` block used across the design in `src/index.css`.
These are reused by sidebar, marquee, hero name, project cards, nav lock,
scroll-reveal, and ambient effects.

## Files affected

- `src/index.css` — append the keyframes section.

## Implementation notes

Append (verbatim from the mockup):

```css
@keyframes orbit {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50%      { transform: scale(1.08); opacity: 0.8; }
}

@keyframes blink {
  0%, 60%, 100% { opacity: 1; }
  80%           { opacity: 0.4; }
}

@keyframes viewEnter {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes viewEnterDown {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes viewEnterUp {
  from { opacity: 0; transform: translateY(-40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes navSweep {
  0%   { opacity: 0; transform: translateX(-100%); }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: translateX(100%); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(3px); }
}

@keyframes charIn {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Stagger delay classes (used by cards):

```css
.stg-1 { animation-delay: 0.05s; }
.stg-2 { animation-delay: 0.10s; }
.stg-3 { animation-delay: 0.15s; }
.stg-4 { animation-delay: 0.20s; }
.stg-5 { animation-delay: 0.25s; }
.stg-6 { animation-delay: 0.30s; }
.stg-7 { animation-delay: 0.35s; }
.stg-8 { animation-delay: 0.40s; }
```

## Acceptance criteria

- [ ] All 10 `@keyframes` blocks present, verbatim.
- [ ] `.stg-1` through `.stg-8` rules present.
- [ ] A temporary `<div style="animation: blink 1.8s infinite; width: 8px; height: 8px; background: #88C481;">` shows the blink animation cycling.
- [ ] No CSS lint errors.

## Test notes

None.

## Edge cases

- Story 01-07 adds `prefers-reduced-motion` overrides that disable these.
