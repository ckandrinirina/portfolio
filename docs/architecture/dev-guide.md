# Developer Guide

How to scaffold, run, test, build, and deploy the portfolio.

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 LTS or newer |
| npm | 10+ (ships with Node 20) |
| Git | any recent |

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

| Test | Asserts |
|------|---------|
| `ThemeToggle.test.tsx` | toggling adds/removes `dark` on `<html>` and persists to `localStorage` |
| `LanguageSwitcher.test.tsx` | switching updates rendered content (FR ⇄ EN) and `<html lang>` |
| `Hero.test.tsx` | renders name/title and the Download CV link with correct `href` |
| `content.test.ts` | `en` and `fr` content objects satisfy the `PortfolioContent` shape (parity) |

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
- Replace the CV at `public/cv/erick-andrinirina-cv.pdf` to update the download.
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
    "format": "prettier --write ."
  }
}
```

## Definition of done (per the spec)

- [ ] All 8 sections render in both FR and EN with full parity.
- [ ] Light/dark toggle works and persists; defaults to system preference.
- [ ] Default language is **French**; switch to English works and persists.
- [ ] Full home address is never present in the output.
- [ ] CV PDF downloads correctly under the configured base path.
- [ ] Responsive across mobile/tablet/desktop.
- [ ] Lighthouse: performance ≥ 95, accessibility ≥ 95.
- [ ] GitHub Actions deploy succeeds and the site is live.
```
