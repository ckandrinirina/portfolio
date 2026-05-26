# Story 06-01: Hero section + test

> **Epic:** Content Sections
> **Size:** M
> **Status:** DONE

## Description

Implement `src/components/sections/Hero.tsx`, the first and most prominent section of the
portfolio. Hero owns the page's single `<h1>` element (the owner's name). It renders the
professional title, a one-line positioning statement (7 years of experience), the city and
country only (Antananarivo, Madagascar), two primary calls to action — a "View projects"
button that smooth-scrolls to `#projects` and a `DownloadCvButton` — and `SocialLinks`
(GitHub + LinkedIn). Hero does not use the shared `Section` wrapper for its heading
because it must emit `<h1>` rather than `<h2>`; it renders its own outer
`<section id="hero">` directly. A co-located `Hero.test.tsx` asserts the critical
accessibility invariants.

## Acceptance Criteria

- [x] The rendered output contains exactly one `<h1>` with the text "Erick Andrinirina".
- [x] The `<h1>` does not change on locale switch (name is the same in both languages).
- [x] The professional title "Fullstack JavaScript Engineer" is visible (rendered in the active locale's translation).
- [x] The one-line positioning statement (7 years of experience) is rendered from `content.hero`.
- [x] The location "Antananarivo, Madagascar" is rendered — city and country only; no street or postal address appears anywhere in the component.
- [x] A "View projects" CTA (link or button) is present; clicking/activating it smooth-scrolls the page to `#projects`.
- [x] `DownloadCvButton` renders and its `href` resolves to the CV PDF using `import.meta.env.BASE_URL + 'cv/erick-andrinirina-cv.pdf'`.
- [x] `SocialLinks` renders with GitHub and LinkedIn icon links.
- [x] The outer element is `<section id="hero">`.
- [x] The component re-renders with French/English content when locale changes (title and positioning line update).
- [x] `Hero.test.tsx` — test asserts: (a) renders an `<h1>` containing "Erick Andrinirina"; (b) a link with the CV download href is present in the DOM.
- [x] `npm run test` passes for `Hero.test.tsx` with no skipped assertions.
- [x] No TypeScript errors on `npm run build`.

## Technical Notes

- Hero must own the `<h1>` directly — do not wrap with `Section` (which emits `<h2>`). A pattern: `<section id="hero"><div className="..."><h1>{content.hero.name}</h1>...</div></section>`.
- "View projects" smooth-scroll: `document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })` inside an `onClick` handler; guard with `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and fall back to instant scroll.
- `DownloadCvButton` is an existing UI component from Epic 04 (story 04-08); import and reuse it — do not re-implement the download logic.
- `SocialLinks` is from Epic 02 (story 02-10); pass the optional `size` prop if the hero layout requires a larger icon size.
- The CV href pattern: `import.meta.env.BASE_URL + 'cv/erick-andrinirina-cv.pdf'` (note: `BASE_URL` ends with `/` in Vite when set to `'/'`; use `BASE_URL.replace(/\/$/, '') + '/cv/...'` or rely on the `DownloadCvButton` component to handle this internally).
- In `Hero.test.tsx`, wrap the component with `LanguageProvider` (or the project's test helper) to satisfy the `useLanguage()` context dependency.
- Use `@testing-library/react`'s `getByRole('heading', { level: 1 })` to assert the single `<h1>`.
- Use `getByRole('link', { name: /cv/i })` or a `data-testid` to locate the download link and check its `href`.

## Files to Create/Modify

| Action | File Path                               | Purpose                                           |
| ------ | --------------------------------------- | ------------------------------------------------- |
| CREATE | `src/components/sections/Hero.tsx`      | Hero section component with h1, positioning, CTAs |
| CREATE | `src/components/sections/Hero.test.tsx` | Unit tests for Hero rendering and download link   |

## Dependencies

- **Blocked by:** 04-05 (LanguageProvider — `useLanguage()` must exist), 04-08 (DownloadCvButton), 02-10 (SocialLinks).
- **Blocks:** 06-09 (wire sections into App).

## Related

- **Epic:** content-sections
- **Related stories:** 06-08 (Contact — also uses SocialLinks), 06-09 (App wiring)
- **Spec reference:** spec §5.1 (Hero / introduction), §4 (CV download, social links), §7 (location privacy)

## Implementation Plan

- [x] Write failing tests in `Hero.test.tsx` (RED)
  - Test: renders `<h1>` with "Erick Andrinirina"
  - Test: h1 text does not change on locale switch
  - Test: professional title is visible (FR and EN)
  - Test: positioning statement is rendered
  - Test: location "Antananarivo, Madagascar" is rendered
  - Test: "View projects" CTA is present
  - Test: DownloadCvButton renders with CV href
  - Test: SocialLinks renders with GitHub and LinkedIn links
  - Test: outer element is `<section id="hero">`
  - Test: component re-renders with locale change
- [x] Implement `Hero.tsx` (GREEN) — `<section id="hero">` with h1, title, positioning, location, CTAs, SocialLinks
- [x] Refactor and SOLID check
- [x] QA validation
- [x] Mark all tasks completed

## Implementation Summary

### Files Touched

| Action   | File                                            | Lines       |
| -------- | ----------------------------------------------- | ----------- |
| CREATED  | `src/components/sections/Hero.tsx`              | new file    |
| CREATED  | `src/components/sections/Hero.test.tsx`         | new file    |

### What Was Implemented

`Hero.tsx` is the portfolio's above-the-fold section. It renders:
- A single `<h1>` with the owner's name ("Erick Andrinirina") — locale-invariant
- Professional title from `content.hero.title` (locale-aware)
- Positioning statement from `content.hero.positioning`
- Location from `content.hero.location` with a `data-testid="hero-location"` marker
- A "View projects" `<button>` that calls `scrollToSection('projects')` with `prefers-reduced-motion` guard
- `DownloadCvButton` for CV download
- `SocialLinks` with `size="lg"`

`Hero.test.tsx` covers 12 assertions including: h1 presence, name invariance, CV href, smooth-scroll, outer section id, location text, and no-street-address guard.

All 341 tests pass. No TypeScript errors on build. ESLint clean.
