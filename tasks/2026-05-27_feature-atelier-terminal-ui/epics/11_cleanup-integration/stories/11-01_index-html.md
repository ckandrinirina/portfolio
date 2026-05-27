# 11-01 · Finalize `index.html`

**Status:** TODO · **Size:** S · **Blocked by:** 01-01, 02-02, 07-04

## Description

Make sure `index.html` has, in this order in `<head>`:

1. `meta charset` + viewport.
2. Title + description (already from old plan 07-03).
3. OG / Twitter meta tags (already from 07-03).
4. Google Fonts preconnect + stylesheet (story 01-01).
5. Inline anti-FOUC theme bootstrap (story 02-02).
6. Vite's auto-injected `<script type="module" src="/src/main.tsx">` (left as-is).

Default `<html lang="fr">` (LanguageProvider updates it at runtime).

## Files affected

- `index.html`

## Implementation notes

Re-open `index.html`, verify the order above. Remove any leftover script tags
or styles from the previous design (e.g., references to a `Header.tsx`-era
viewport meta inside body, if any).

## Acceptance criteria

- [ ] The order above matches.
- [ ] `<html lang="fr">`.
- [ ] No legacy `dark`-class bootstrap leftover (replaced in 02-02).
- [ ] `<title>` and `<meta name="description">` reflect Atelier Terminal copy
      (can mirror the mockup's title: "Erick Andrinirina — Fullstack &amp; Interface · Madagascar").
- [ ] `<meta property="og:image" content="/og-image.png">` still points to the existing asset.

## Test notes

A vitest snapshot of `index.html` content is overkill. Manual check.

## Edge cases

- Don't add a CSP `<meta>` here; the static GitHub Pages deploy doesn't
  have a CSP header today and adding one would require coordinated CDN
  changes (Google Fonts).
