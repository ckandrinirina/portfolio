# 01-01 · Google Fonts preconnect & stylesheet

**Status:** TODO · **Size:** S · **Blocked by:** —

## Description

Add the Google Fonts preconnect links and stylesheet to `index.html` so the
Atelier Terminal UI has its three typefaces available: **JetBrains Mono**
(body/UI), **Instrument Serif** (display/italic headings), **Geist** (mono
fallback).

## Files affected

- `index.html` — add three `<link>` tags to `<head>` before any styles.

## Implementation notes

Insert the following inside `<head>`, before any inline styles:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300..700&display=swap"
/>
```

- `display=swap` is non-negotiable (perf budget).
- Don't host fonts locally — Google Fonts CDN is the spec.

## Acceptance criteria

- [ ] `index.html` `<head>` contains the two `preconnect` links and the one
      stylesheet link with the exact URL above.
- [ ] The crossorigin attribute is present on the `fonts.gstatic.com` preconnect.
- [ ] `npm run dev` and devtools Network tab show the fonts request fires
      successfully (200) when the page loads.
- [ ] After adding a temporary `<p style="font-family: 'JetBrains Mono'">test</p>`
      in `index.html`, the rendered text uses JetBrains Mono (not the default
      monospace).

## Test notes

No automated test required (the stylesheet link presence can be asserted in a
later Vitest test that reads `index.html`, but it's optional for this story).

## Edge cases

- If a future test environment runs offline, the fonts fall back to the
  generic `monospace` / `serif` declared in the `--font-*` chain (Epic 01-03).
  No code change needed; the fallback is part of the token design.
