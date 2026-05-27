# Configuration

All configuration is build-time. There are **no runtime environment variables or
secrets** (the deploy workflow uses the auto-provided `GITHUB_TOKEN`).

## `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // User page (ckandrinirina.github.io) → '/'.
  // Project repo (e.g. /ck-portfolio/) → '/ck-portfolio/'.
  base: '/',
  plugins: [react(), tailwindcss()],
})
```

> **Base path is the one deployment-critical setting.** Current assumption: a
> **user page** at `ckandrinirina.github.io`, so `base: '/'`. If deployed as a
> **project page**, set `base: '/<repo-name>/'` and reference assets via
> `import.meta.env.BASE_URL`.

## `src/index.css` (Tailwind v4 + Atelier Terminal tokens)

```css
@import 'tailwindcss';

/* Optional Tailwind v4 theme bridge — exposes tokens as Tailwind colors/fonts */
@theme {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-accent: var(--accent);
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --font-serif: "Instrument Serif", serif;
}

/* :root  — Ember palette (default warm dark) */
:root { /* see features/2026-05-27_atelier-terminal-ui.md for the full list */ }
[data-theme="paper"]  { /* light palette */ }
[data-theme="ocean"]  { /* dark blue */ }
[data-theme="forest"] { /* dark green */ }

/* Component classes: .app, .sidebar, .sb-*, .topbar, .view, .proj-card,
   .tl-item, .skill-card, .process-item, .cmdk-*, .modal, .marquee, .cursor-*,
   .reveal, .scroll-hint, etc. — copied verbatim from the mockup. */
```

Tailwind v4 needs no `tailwind.config.js` and no PostCSS file — the
`@tailwindcss/vite` plugin handles everything; configuration is CSS-first.

**Dark mode model:** `[data-theme]` attribute on `<html>` (not a `dark` class).
The Ember default lives on `:root`; the three alternates live under their
`[data-theme="..."]` selectors. Custom CSS classes do **not** use Tailwind's
`dark:` variant — they read `var(--accent)`, `var(--bg)`, etc., directly so they
restyle automatically when the attribute changes.

## `index.html`

Holds the document-level metadata for SEO and social sharing, the Google
Fonts preconnect/stylesheet, and the inline anti-FOUC theme bootstrap.

```html
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Erick Andrinirina — Fullstack &amp; Interface · Madagascar</title>
    <meta name="description" content="Erick Andrinirina — Fullstack JavaScript Engineer, 7 years experience." />

    <meta property="og:title" content="Erick Andrinirina — Fullstack Engineer" />
    <meta property="og:description" content="..." />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300..700&display=swap"
    />

    <script>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
          var t = stored || (prefersDark ? 'default' : 'paper');
          if (t !== 'default') document.documentElement.setAttribute('data-theme', t);
        } catch (e) {}
      })();
    </script>
  </head>
</html>
```

`lang` defaults to `fr` and is updated at runtime by `LanguageProvider` when
the visitor switches. `data-theme` is set at runtime by `ThemeProvider`
(initial value applied by the inline script before React hydrates).

## `tsconfig.json`

Standard Vite React TS config: `"strict": true`, `"jsx": "react-jsx"`,
`"moduleResolution": "bundler"`, `"types": ["vitest/globals", "@testing-library/jest-dom"]`.

## `eslint.config.js` (ESLint 9 flat config)

`@eslint/js` recommended + `typescript-eslint` + `eslint-plugin-react-hooks` +
`eslint-plugin-react-refresh`. Prettier handles formatting (no stylistic lint rules).

## `.prettierrc`

```jsonc
{
  "semi": false,
  "singleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"],
}
```

## `vitest` config

Defined inside `vite.config.ts` (`test` block) or `vitest.config.ts`:
`environment: 'jsdom'`, `globals: true`, `setupFiles: './src/test/setup.ts'`.

## `.github/workflows/deploy.yml`

Official GitHub Pages deployment (build job + deploy job):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

One-time repo setting: **Settings → Pages → Build and deployment → Source =
GitHub Actions.**

## Configuration matrix

| Setting            | File               | Value                                    | Notes                                                 |
| ------------------ | ------------------ | ---------------------------------------- | ----------------------------------------------------- |
| Public base path   | `vite.config.ts`   | `'/'`                                    | `/<repo>/` for project pages                          |
| Theme strategy     | `index.css`        | `[data-theme]` attribute on `<html>`     | Ember default on `:root`; `paper` / `ocean` / `forest` |
| Default theme      | `ThemeProvider`    | `default` if prefers-dark else `paper`   | persisted to `localStorage['theme']`                  |
| Default language   | `LanguageProvider` | `fr`                                     | falls back from `navigator.language` to French        |
| CV asset path      | `public/cv/`       | `erick-andrinirina-cv.pdf`               | referenced via `BASE_URL`; Home CTA                   |
| Fonts              | `index.html`       | JetBrains Mono · Instrument Serif · Geist | Google Fonts via preconnect + stylesheet              |
| CI Node version    | `deploy.yml`       | `20`                                     | LTS                                                   |
| Deploy trigger     | `deploy.yml`       | push to `main`                           | + manual `workflow_dispatch`                          |
