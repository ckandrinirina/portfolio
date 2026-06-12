# 2026-06-02 · design — scroll motion layer

> Design record for feature **scroll-motion**. Consolidated state lives in
> [index.md](./index.md); this file records what this design pass added or changed.
> Ledger row: `docs/architecture/DESIGN_LEDGER.md`.

## Type

new — a new cross-view motion feature layered on the existing App Shell scroll system.

## What was designed

A progressive-enhancement motion layer applied across all six views: a named **reveal
vocabulary** (`data-reveal="fade|blur|scale|left|right|mask"`) driven purely by CSS off
the existing `useScrollReveal` engine; the `Reveal` per-letter title and `CountUp` number
tween **promoted from Home-only to site-wide** via a new `useInView` hook; and a slim
per-view **`ScrollProgress`** bar in the Topbar fed by a new `useScrollProgress` hook
(passive scroll listener + RAF, `scrollTop / (scrollHeight − clientHeight)`). No engine is
replaced — `useScrollReveal`/`useScrollToNavigate`/`view-enter` stay in app-shell.

## Why

The portfolio already had entrance and scroll-reveal animations but no consistent,
expressive motion vocabulary or scroll-position feedback. This adds a modern,
low-risk "good to see" UX layer that reads well on a short, route-based site — without a
runtime dependency and without conflicting with the wheel-based route navigation.

## Constraints honoured

- **Zero new runtime dependencies** — CSS + IntersectionObserver + `requestAnimationFrame`
  only ([no-new-deps convention](../../_shared.md#conventions)).
- **Reduced-motion** — every variant, the count-up, and the progress bar collapse to their
  final/static state under `prefers-reduced-motion: reduce`; the bar is `aria-hidden`.
- **No conflict** with `useScrollToNavigate` — smooth/inertial scrolling and pinned
  parallax were explicitly rejected (see `index.md` → Explicitly out of scope).
- **Atelier visual values untouched** — motion is additive; layout, colour, and spacing
  tokens are unchanged.

## Planning status

Not yet planned — listed as `pending` in `DESIGN_LEDGER.md`. `/ck-code:plan` turns
it into epics/stories and flips the ledger row to `planned`.
