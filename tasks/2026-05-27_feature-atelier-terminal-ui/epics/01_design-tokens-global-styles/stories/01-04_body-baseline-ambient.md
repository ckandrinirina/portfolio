# 01-04 · Body baseline + ambient effects

**Status:** TODO · **Size:** M · **Blocked by:** 01-02, 01-03

## Description

Add the universal reset, body typography baseline, ambient body effects
(`::before` radial glow + `::after` grid overlay), link/button/selection
styling, and view scrollbar styling. Verbatim from the mockup CSS.

## Files affected

- `src/index.css` — append the "Reset + base" block.

## Implementation notes

Append (verbatim from the mockup):

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "ss01", "cv11";
  overflow: hidden;
}

button {
  background: none; border: none;
  color: inherit; font: inherit;
  cursor: pointer; padding: 0;
}

a { color: var(--accent); text-decoration: none; transition: color 0.15s; }
a:hover { color: var(--accent-deep); }
::selection { background: var(--accent-soft); color: var(--fg); }

input, textarea {
  background: none; border: none; outline: none;
  color: inherit; font: inherit; width: 100%;
}

/* ambient background grid + glow */
body::before {
  content: "";
  position: fixed; inset: 0;
  pointer-events: none;
  background:
    radial-gradient(800px 600px at 80% 10%, var(--accent-soft), transparent 60%),
    radial-gradient(700px 700px at 10% 90%, rgba(232, 197, 71, 0.05), transparent 60%);
  z-index: 0;
}

body::after {
  content: "";
  position: fixed; inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.5;
  z-index: 0;
}
```

`overflow: hidden` on `html, body` is part of the design — scrolling happens
inside `.view` (delivered in Epic 05).

## Acceptance criteria

- [ ] All rules from the snippet above are present in `src/index.css`, verbatim.
- [ ] Visiting `npm run dev` (with a temporary blank root) shows: warm dark
      `#16130F` background, the diagonal warm orange glow top-right, a faint
      gold glow bottom-left, and a 64px square grid faintly overlaid.
- [ ] Toggling to `[data-theme="paper"]` via devtools makes the glow softer
      and the background switch to `#F2EDDD`.
- [ ] `body` font is the JetBrains Mono stack at 14px / 1.6 line-height.
- [ ] No scrollbars on `html`/`body`.

## Test notes

No automated test (visual verification).

## Edge cases

- Some browsers ignore `font-feature-settings` for JetBrains Mono variants.
  That's fine; falls through gracefully.
- The fixed pseudo-elements MUST be `z-index: 0` so the `.app` shell at
  `z-index: 1` sits above them.
