# 12-05 · Lighthouse performance + SEO audit

**Status:** TODO · **Size:** M · **Blocked by:** 11-05

## Description

Run Lighthouse against the deployed (or local `npm run preview`) build on
Home, Work, and Contact. Optimize anything below the budget.

## Targets

- Performance ≥ 95 on Home.
- Accessibility ≥ 95 (covered separately in 12-01).
- Best Practices ≥ 95.
- SEO = 100.

## Common optimizations expected

- [ ] Confirm Google Fonts `display=swap` is set.
- [ ] Confirm `og-image.png` is referenced in OG meta and exists in `public/`.
- [ ] Confirm `<meta name="description">` and `<title>` are present (from old plan 07-03).
- [ ] Confirm `<html lang>` is set (default `fr`, updated by LanguageProvider).
- [ ] Image sizes: `profile.jpg` should be under ~200 KB; if larger, recompress.
- [ ] No render-blocking CSS beyond `index.css` (Tailwind v4 bundled by Vite).
- [ ] No console errors.
- [ ] LCP element is Home hero name — should render quickly given inline `<h1>`.

## Acceptance criteria

- [ ] Home Lighthouse ≥ 95 perf, 100 SEO.
- [ ] Documented score screenshots filed in the PR.

## Test notes

`npm run build && npm run preview` and run Lighthouse from devtools.

## Edge cases

- Lighthouse runs on the URL given; for a local preview, run against
  `http://localhost:4173/` (Vite preview default port).
- If running against the deployed GitHub Pages URL, ensure that URL matches
  the configured `base` in `vite.config.ts`.
