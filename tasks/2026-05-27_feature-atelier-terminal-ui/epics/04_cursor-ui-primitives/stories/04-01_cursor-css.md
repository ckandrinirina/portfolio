# 04-01 · Cursor base CSS

**Status:** TODO · **Size:** S · **Blocked by:** 01-02

## Description

Append the cursor CSS to `src/index.css`. Cover `.cursor-dot`, `.cursor-ring`,
the four ring states (`default | hover | label | text`), the native-cursor
suppression on hover devices, and the touch/mobile disable.

## Files affected

- `src/index.css` — append.

## Implementation notes

Verbatim from the mockup:

```css
@media (hover: hover) and (pointer: fine) {
  html, body { cursor: none; }
  button, a, input, textarea, select, [role="button"] { cursor: none; }
}

.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
}

.cursor-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  transform: translate(-50%, -50%);
  transition: opacity 0.2s, background 0.2s, width 0.2s, height 0.2s;
  box-shadow: 0 0 10px var(--accent);
}

.cursor-ring {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  transform: translate(-50%, -50%);
  transition: width 0.25s var(--ease), height 0.25s var(--ease),
              background 0.25s var(--ease), border-color 0.25s var(--ease),
              border-radius 0.25s var(--ease), padding 0.25s var(--ease);
  display: grid; place-items: center;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bg);
  white-space: nowrap;
}

.cursor-ring[data-state="hover"] {
  width: 56px; height: 56px;
  background: var(--accent-soft);
  border-color: var(--accent);
}

.cursor-ring[data-state="label"] {
  width: auto; height: auto;
  padding: 8px 14px;
  background: var(--accent);
  border-color: var(--accent);
  border-radius: 999px;
  color: var(--bg);
}

.cursor-ring[data-state="text"] {
  width: 2px; height: 22px;
  border-radius: 1px;
  background: var(--accent);
  border-color: transparent;
}

@media (hover: none), (max-width: 880px) {
  .cursor-dot, .cursor-ring { display: none !important; }
  html, body, button, a, input, textarea { cursor: auto !important; }
}
```

## Acceptance criteria

- [ ] All rules above present, verbatim.
- [ ] On a desktop with mouse: native cursor hidden when CSS applied; with no
      `Cursor` component yet, the page looks like the cursor is gone (expected).
- [ ] On a touch device or `<880px` viewport (emulated in devtools): native
      cursor visible again.

## Test notes

None automated; visual verification.

## Edge cases

- During the gap between this story and 04-02, the cursor will be hidden
  with no replacement on desktop. Either land them back to back, or run
  the dev server with devtools cursor emulation to keep working.
