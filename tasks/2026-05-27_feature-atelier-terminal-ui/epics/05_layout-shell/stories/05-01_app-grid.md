# 05-01 · `.app` outer grid layout

**Status:** TODO · **Size:** S · **Blocked by:** 01-02

## Description

Add the `.app` and `.main` CSS for the outer 240px / 1fr grid. Includes the
responsive break to stacked rows at ≤880px.

## Files affected

- `src/index.css`

## Implementation notes

```css
.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
  position: relative;
  z-index: 1;
}
@media (max-width: 880px) {
  .app { grid-template-columns: 1fr; grid-template-rows: 56px 1fr; }
}

.main {
  display: flex; flex-direction: column;
  min-width: 0; min-height: 0;
  position: relative;
  z-index: 1;
}
```

## Acceptance criteria

- [ ] Rules above present in `src/index.css`.
- [ ] A temporary `<div class="app"><aside style="background:#221E18">side</aside><main class="main" style="background:#16130F">main</main></div>` shows 240px left + remaining right in a 100vh container.
- [ ] At ≤880px (devtools), it switches to stacked rows of 56px + 1fr.

## Test notes

None.

## Edge cases

- `height: 100vh` on iOS Safari includes the URL bar. Optional follow-up: switch
  to `height: 100dvh` for better mobile UX (post-launch optimization).
