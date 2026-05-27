# 01-08 · Tailwind v4 `@theme` bridge

**Status:** TODO · **Size:** S · **Blocked by:** 01-02, 01-03

## Description

Wire Tailwind v4's `@theme` bridge at the top of `src/index.css` so Tailwind
utilities expose the design tokens by name (e.g., `text-fg`, `bg-bg`,
`text-accent`, `font-mono`, `font-serif`). The existing old tokens in
`@theme` may have been written for the previous design — replace them.

## Files affected

- `src/index.css` — top of file (above `:root`).

## Implementation notes

```css
@import 'tailwindcss';

@theme {
  --color-bg:           var(--bg);
  --color-bg-deep:      var(--bg-deep);
  --color-bg-2:         var(--bg-2);
  --color-surface:      var(--surface);
  --color-surface-2:    var(--surface-2);
  --color-fg:           var(--fg);
  --color-fg-soft:      var(--fg-soft);
  --color-fg-dim:       var(--fg-dim);
  --color-muted:        var(--muted);
  --color-muted-deep:   var(--muted-deep);
  --color-accent:       var(--accent);
  --color-accent-soft:  var(--accent-soft);
  --color-accent-deep:  var(--accent-deep);
  --color-gold:         var(--gold);
  --color-success:      var(--success);
  --color-info:         var(--info);

  --font-mono:  "JetBrains Mono", ui-monospace, monospace;
  --font-serif: "Instrument Serif", serif;
}
```

This makes utilities like `text-accent`, `bg-bg-2`, `border-line-strong`,
`font-serif` resolvable. The actual `--bg`, `--accent` etc. are still defined
on `:root` (story 01-02) and `[data-theme]` blocks — so when the theme
changes, Tailwind utilities re-color automatically.

## Acceptance criteria

- [ ] `@import 'tailwindcss';` is the first line of `src/index.css`.
- [ ] The `@theme { ... }` block lists each token mapping.
- [ ] A temporary `<div class="bg-bg-2 text-accent p-4">test</div>` renders
      with the expected background and orange text in Ember.
- [ ] Toggling `[data-theme="paper"]` recolors the same `<div>` to the Paper
      palette.
- [ ] `npm run build` succeeds; no Tailwind compilation errors.

## Test notes

None.

## Edge cases

- Tailwind v4's `@theme` must come before component classes for safe variable
  ordering. Keep this block at the top of the file.
- Do NOT redefine `--bg`, `--accent`, etc., inside `@theme` — keep them as
  references to the palette tokens in `:root` and `[data-theme]`. Otherwise
  theme switching breaks.
