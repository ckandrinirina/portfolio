# 05-04 · View container + `.view` / `.view-inner` CSS

**Status:** TODO · **Size:** M · **Blocked by:** 05-01, 01-05

## Description

Append the `.view`, `.view-inner`, `.view-enter` and its directional variants
(`.view-enter-down`, `.view-enter-up`), plus the inner-view scrollbar styling.
Also include the `.nav-lock` transition indicator (the top sweep that fires
on every route change).

## Files affected

- `src/index.css`

## Implementation notes

Verbatim from mockup (lines ~715–751, 1875–1895):

```css
.view {
  flex: 1;
  overflow-y: auto;
  padding: 56px 80px 80px;
  scroll-behavior: smooth;
  position: relative;
}
@media (max-width: 1100px) { .view { padding: 40px 40px 60px; } }
@media (max-width: 600px)  { .view { padding: 24px 18px 60px; } }

.view::-webkit-scrollbar { width: 10px; }
.view::-webkit-scrollbar-track { background: transparent; }
.view::-webkit-scrollbar-thumb {
  background: var(--line-strong);
  border-radius: 5px;
  border: 2px solid var(--bg);
}
.view::-webkit-scrollbar-thumb:hover { background: var(--muted); }

.view-inner { max-width: 1100px; margin: 0 auto; }

.view-enter      { animation: viewEnter 0.6s var(--ease); }
.view-enter-down { animation: viewEnterDown 0.65s var(--ease); }
.view-enter-up   { animation: viewEnterUp 0.65s var(--ease); }

.nav-lock {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--accent), transparent);
  z-index: 99;
  opacity: 0;
  animation: navSweep 0.9s var(--ease);
}
```

## Acceptance criteria

- [ ] All rules present in `src/index.css`.
- [ ] `<div class="view"><div class="view-inner">…</div></div>` inside `.main` of `.app`:
      shows a 1100px-max-width centered area, scrollbars styled to match palette.
- [ ] Setting class `view-enter-down` on `.view-inner` triggers the 0.65s downward enter animation.
- [ ] `nav-lock` element renders the orange sweep when added to the DOM.

## Test notes

Visual only.

## Edge cases

- The view scrolls; the body does not. Make sure no parent has `overflow: hidden`
  that breaks the inner scrollbar appearance.
