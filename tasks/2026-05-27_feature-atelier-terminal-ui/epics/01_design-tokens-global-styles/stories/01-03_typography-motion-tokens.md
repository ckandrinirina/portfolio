# 01-03 · Typography & motion tokens

**Status:** TODO · **Size:** S · **Blocked by:** 01-02

## Description

Add the typography and motion tokens (`--font-mono`, `--font-serif`, `--ease`)
to `:root` in `src/index.css`. These are shared across all palettes — they do
not change per theme.

## Files affected

- `src/index.css` — append three custom properties to the existing `:root` block.

## Implementation notes

Append to the `:root { ... }` block from story 01-02:

```css
:root {
  /* ... existing palette variables ... */

  --font-mono: "JetBrains Mono", "Geist Mono", "SF Mono", ui-monospace, monospace;
  --font-serif: "Instrument Serif", "Cormorant Garamond", "Times New Roman", serif;

  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Acceptance criteria

- [ ] `--font-mono` resolves to the exact font stack above.
- [ ] `--font-serif` resolves to the exact font stack above.
- [ ] `--ease` resolves to the exact cubic-bezier value.
- [ ] Variables are inherited across all four `[data-theme]` blocks (only
      defined once in `:root`).
- [ ] After applying `body { font-family: var(--font-mono); }` in a temporary
      style block, the rendered text uses JetBrains Mono in the browser
      (confirms the font from 01-01 is loaded).

## Test notes

None.

## Edge cases

- `Geist Mono` doesn't actually exist as a Google font today (only `Geist` and
  `Geist Mono` as separate families); the chain falls through to `SF Mono` and
  `ui-monospace`. This is intentional from the mockup — keep verbatim.
