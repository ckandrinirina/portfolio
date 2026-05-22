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

## `src/index.css` (Tailwind v4)

```css
@import 'tailwindcss';

/* Class-based dark mode (toggled on <html>) */
@custom-variant dark (&:where(.dark, .dark *));

/* Optional design tokens from the Claude Design */
@theme {
  /* --color-brand-500: ...; --font-sans: ...; */
}
```

Tailwind v4 needs no `tailwind.config.js` and no PostCSS file — the
`@tailwindcss/vite` plugin handles everything; configuration is CSS-first.

## `index.html`

Holds the document-level metadata for SEO and social sharing:

```html
<html lang="fr">
  <head>
    <meta
      name="description"
      content="Erick Andrinirina — Fullstack JavaScript Engineer, 7 years experience."
    />
    <meta
      property="og:title"
      content="Erick Andrinirina — Fullstack Engineer"
    />
    <meta property="og:description" content="..." />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <!-- inline theme bootstrap script (anti-FOUC) -->
  </head>
</html>
```

`lang` defaults to `fr` and is updated at runtime by `LanguageProvider` when the
visitor switches.

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

| Setting            | File               | Value                      | Notes                                          |
| ------------------ | ------------------ | -------------------------- | ---------------------------------------------- |
| Public base path   | `vite.config.ts`   | `'/'`                      | `/<repo>/` for project pages                   |
| Dark mode strategy | `index.css`        | custom `dark` variant      | class on `<html>`                              |
| Default language   | `LanguageProvider` | `fr`                       | falls back from `navigator.language` to French |
| CV asset path      | `public/cv/`       | `erick-andrinirina-cv.pdf` | referenced via `BASE_URL`                      |
| CI Node version    | `deploy.yml`       | `20`                       | LTS                                            |
| Deploy trigger     | `deploy.yml`       | push to `main`             | + manual `workflow_dispatch`                   |
