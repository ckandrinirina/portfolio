# 02-02 · Anti-FOUC inline theme bootstrap (new shape)

**Status:** TODO · **Size:** S · **Blocked by:** 02-01

## Description

Replace the inline `<script>` in `index.html` that applies the stored theme
before React hydrates. Update it to read the new key shape (`default | paper
| ocean | forest`) and set the `data-theme` attribute (or leave it absent for
`default`). Mirror the legacy migration logic from 02-01.

## Files affected

- `index.html` — the inline bootstrap script tag in `<head>`.
- (Optional) `src/theme/themeBootstrap.ts` — co-located string of the same
  script, exported for tests or future regeneration of `index.html`.

## Implementation notes

In `index.html`, place the script **before** `<link rel="stylesheet">` of any
external CSS (Google Fonts is fine before this — it's just a font CDN):

```html
<script>
  (function () {
    try {
      var raw = localStorage.getItem('theme');
      var v = raw === 'paper'   ? 'paper'
            : raw === 'ocean'   ? 'ocean'
            : raw === 'forest'  ? 'forest'
            : raw === 'default' ? 'default'
            : raw === 'light'   ? 'paper'    /* legacy */
            : raw === 'dark'    ? 'default'  /* legacy */
            : (matchMedia('(prefers-color-scheme: dark)').matches ? 'default' : 'paper');
      if (v !== 'default') document.documentElement.setAttribute('data-theme', v);
    } catch (e) { /* private mode, etc. */ }
  })();
</script>
```

Optionally, create `src/theme/themeBootstrap.ts` that exports the same script
as a string constant so future tests can `expect(indexHtmlContents).toContain(BOOTSTRAP_SOURCE)`.

## Acceptance criteria

- [ ] The script is inline in `<head>`, before any React script tag.
- [ ] Logic exactly matches the snippet (4 valid values + 2 legacy + fallback).
- [ ] No `defer` or `async` attribute (must execute synchronously).
- [ ] After clearing `localStorage` and reloading with the system in dark
      mode, the page initially renders Ember (no `data-theme` attribute).
- [ ] After `localStorage.setItem('theme', 'paper'); location.reload();` the
      page renders Paper on first paint (no flash to Ember).
- [ ] Hard refresh with `localStorage.setItem('theme', 'dark')` (legacy)
      renders Ember on first paint.

## Test notes

Manual verification with devtools application → storage → reload. Optional
Vitest test in 02-05 asserts `readInitial` matches the script's logic.

## Edge cases

- If `localStorage` throws (private mode in Safari), the `try/catch` falls
  through and the page uses Ember default — which is the system-preference
  outcome for dark-preferring users anyway.
