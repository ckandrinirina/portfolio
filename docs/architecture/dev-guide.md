# Developer Guide

How to scaffold, run, test, build, and deploy the portfolio.

## Prerequisites

| Tool    | Version                  |
| ------- | ------------------------ |
| Node.js | 20 LTS or newer          |
| npm     | 10+ (ships with Node 20) |
| Git     | any recent               |

## 1. Scaffold (one-time)

```bash
# From the repository root (project already contains docs/)
npm create vite@latest . -- --template react-ts

npm install
npm install tailwindcss @tailwindcss/vite
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom \
  eslint prettier prettier-plugin-tailwindcss
```

Then:

1. Add `@tailwindcss/vite` to `vite.config.ts` plugins.
2. Replace `src/index.css` with `@import "tailwindcss";` + the dark variant.
3. Set `base` in `vite.config.ts` (see `configuration.md`).

## 2. Run locally

```bash
npm run dev        # start dev server with HMR (http://localhost:5173)
```

## 3. Quality checks

```bash
npm run lint       # ESLint
npm run format     # Prettier write
npm run test       # Vitest (watch)
npm run test -- --run   # Vitest single run (CI)
```

### Test scope (light component tests)

| Test                          | Asserts                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ThemeProvider.test.tsx`      | cycling and setting each of `default | paper | ocean | forest` updates `<html data-theme>` correctly  |
| `LanguageSwitcher.test.tsx`   | switching updates rendered content (FR ⇄ EN) and `<html lang>`                                         |
| `HomeView.test.tsx`           | renders name/tagline, role rotor, both nav CTAs, and the Download CV link with correct `href`         |
| `WorkView.test.tsx`           | renders 8 project cards; clicking one opens the modal; pressing Escape closes it                       |
| `CommandPalette.test.tsx`     | ⌘K opens; typing filters; ArrowDown + Enter triggers the active item; theme/email actions run         |
| `useScrollToNavigate.test.ts` | gestures starting at boundary + over threshold trigger nav; gestures inside the view do not           |
| `content.test.ts`             | `en` and `fr` content objects satisfy the new `PortfolioContent` shape (parity, including `process[]`) |

## 4. Build

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve dist/ locally to verify the production build
```

## 5. Deploy to GitHub Pages

**One-time setup**

1. Create the GitHub repository (for a user page, name it `ckandrinirina.github.io`).
2. Push the code to `main`.
3. Repo **Settings → Pages → Source = GitHub Actions**.
4. Confirm `vite.config.ts` `base` matches the deployment (`'/'` for a user page).

**Every deploy after that**

```bash
git push origin main      # triggers .github/workflows/deploy.yml
```

The workflow builds `dist/` and publishes it. The live URL appears in the
Actions run summary (e.g. `https://ckandrinirina.github.io/`).

## 6. Updating content

- Edit `src/content/fr.ts` (default) and `src/content/en.ts` — keep both in sync;
  TypeScript enforces the shared shape.
- The Atelier Terminal UI introduced new content slices: `hero.greet`,
  `hero.tagline`, `hero.roles[]`, `now`, `stats[]`, `marquee[]`, `process[]`,
  and `contact.languages[]`. Education has been removed.
- Edit `src/content/projects.ts` to add/remove project cards. Each new entry
  must also have a matching `ProjectArt` SVG component under
  `src/components/projects/artwork/`.
- Replace the CV at `public/cv/erick-andrinirina-cv.pdf` to update the download
  (linked from the Home CTAs).
- Commit and push — deployment is automatic.

## npm scripts (package.json)

```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint .",
    "format": "prettier --write .",
  },
}
```

## Definition of done (per the spec + Atelier Terminal UI)

- [ ] All 6 views (Home, Work, Experience, Skills, Process, Contact) render in
      both FR and EN with full parity, including the new `process[]`, `now`,
      `stats[]`, `marquee[]`, and `contact.languages[]` slices.
- [ ] 4-theme switcher (Ember / Paper / Ocean / Forest) toggles
      `<html data-theme>` correctly; persists; respects `prefers-color-scheme`
      on first visit; no FOUC on hard refresh.
- [ ] Default language is **French**; switch to English works and persists.
- [ ] Hash routing works for all 6 routes; back/forward walks the history.
- [ ] Scroll-to-navigate advances routes only when the gesture starts at the
      view boundary and exceeds the 90px threshold.
- [ ] Command palette opens on ⌘/Ctrl+K; arrow-key + Enter navigates;
      filters across `Navigation`, `Quick`, and `Projects` groups.
- [ ] Project card click opens modal; Escape closes; body scroll is locked
      while open.
- [ ] Custom cursor is visible on hover-capable, ≥880px devices; hidden
      elsewhere; native focus rings still visible.
- [ ] Full home address is never present in the output.
- [ ] CV PDF downloads correctly under the configured base path (Home CTA).
- [ ] Responsive across mobile/tablet/desktop (sidebar collapses to top strip ≤880px).
- [ ] `prefers-reduced-motion: reduce` disables all entrance/reveal/cursor/marquee animations.
- [ ] Lighthouse: performance ≥ 95, accessibility ≥ 95.
- [ ] GitHub Actions deploy succeeds and the site is live.

```

```
