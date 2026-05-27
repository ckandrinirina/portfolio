# Tech Stack

All versions target **current latest stable** (verified against official docs via
context7). Exact patch versions are resolved at scaffold time with
`npm create vite@latest` and `npm install <pkg>@latest`.

## Core

| Technology                                   | Version | Role                    | Why                                                                                      |
| -------------------------------------------- | ------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| [Vite](https://vite.dev)                     | 7.x     | Build tool & dev server | Instant HMR, optimized static builds, first-class GitHub Pages support via `base`        |
| [React](https://react.dev)                   | 19.x    | UI library              | Latest stable; modern hooks, improved ref handling, no `forwardRef` boilerplate          |
| [TypeScript](https://www.typescriptlang.org) | 5.7+    | Language                | Type safety across content data and components                                           |
| [Tailwind CSS](https://tailwindcss.com)      | 4.x     | Styling                 | Utility-first, zero-runtime; v4 uses the `@tailwindcss/vite` plugin and CSS-first config |

## Tooling

| Technology                  | Version           | Role                                                              |
| --------------------------- | ----------------- | ----------------------------------------------------------------- |
| `@tailwindcss/vite`         | latest (v4)       | Tailwind integration for Vite (replaces PostCSS setup)            |
| ESLint                      | 9.x (flat config) | Linting                                                           |
| Prettier                    | 3.x               | Formatting (with `prettier-plugin-tailwindcss` for class sorting) |
| Vitest                      | 3.x               | Test runner                                                       |
| `@testing-library/react`    | 16.x              | Component testing                                                 |
| `@testing-library/jest-dom` | 6.x               | DOM matchers                                                      |
| `jsdom`                     | latest            | DOM environment for tests                                         |

## Internationalization

**Chosen approach: lightweight typed `LanguageProvider` + per-locale content modules.**

- No external i18n dependency. Content is authored as typed TypeScript objects
  (`content/fr.ts` — default, `content/en.ts`) sharing one interface
  (`content/types.ts`).
- UI micro-labels (nav items, button text) live in a small `i18n/ui.ts` map.
- A React context exposes the active locale and the resolved content object.
- Rationale: only two languages, fully static content, no async loading, no
  base-path complications on GitHub Pages, and end-to-end type safety.

> **Alternative considered:** [`react-i18next`](https://react.i18next.com) with
> `i18next-http-backend` + `i18next-browser-languagedetector`. More powerful
> (pluralization, namespaces, lazy JSON loading) but heavier and unnecessary for
> a two-language static site; the HTTP backend also needs base-path-aware
> `loadPath` handling on GitHub Pages. Documented here in case requirements grow.

## Theming

- **Four palettes** — Ember (default warm dark), Paper (light), Ocean (dark
  blue), Forest (dark green) — defined as CSS custom properties on `:root` and
  `[data-theme="paper" | "ocean" | "forest"]` selectors.
- The active palette is selected by the `data-theme` attribute on `<html>`
  (no attribute = Ember default), toggled by a `ThemeProvider`.
- Initial theme: read `localStorage['theme']`, else `prefers-color-scheme: dark`
  picks Ember, otherwise Paper. Persisted on user choice.
- Tailwind v4 utilities still available, but the bulk of styling is custom CSS
  classes from the Atelier Terminal mockup (`.sb-row`, `.proj-card`,
  `.tl-item`, etc.).
- Full token list and component class inventory in
  [features/2026-05-27_atelier-terminal-ui.md](features/2026-05-27_atelier-terminal-ui.md).

## Deployment

| Technology                      | Role                                        |
| ------------------------------- | ------------------------------------------- |
| GitHub Actions                  | CI/CD on push to `main`                     |
| `actions/configure-pages`       | Configure the Pages environment             |
| `actions/upload-pages-artifact` | Upload the built `dist/`                    |
| `actions/deploy-pages`          | Publish to GitHub Pages                     |
| Node.js 20 LTS+                 | CI runtime (`actions/setup-node`, `npm ci`) |

## Fonts (Atelier Terminal UI)

Loaded from Google Fonts via `<link rel="stylesheet">` in `index.html` with
`preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`.

| Family | Weights / styles | Role |
| --- | --- | --- |
| **JetBrains Mono** | 300–700 | Body, UI labels, terminal-flavored text (`--font-mono`) |
| **Instrument Serif** | regular + italic | Display headings, hero name, section titles (`--font-serif`) |
| **Geist** | 300–700 | Loaded for fallback (`Geist Mono` mentioned in `--font-mono` chain) |

`font-display: swap` everywhere; OpenType features `"ss01", "cv11"` enabled on body.

## Dependency summary

```jsonc
// Runtime
"react": "^19",
"react-dom": "^19",

// Build / styling
"vite": "^7",
"@vitejs/plugin-react": "latest",
"tailwindcss": "^4",
"@tailwindcss/vite": "^4",
"typescript": "^5.7",

// Quality
"eslint": "^9",
"prettier": "^3",
"prettier-plugin-tailwindcss": "latest",
"vitest": "^3",
"@testing-library/react": "^16",
"@testing-library/jest-dom": "^6",
"jsdom": "latest"
```

> No runtime dependencies beyond React. No analytics, no UI kit — the Atelier
> Terminal design governs the look, implemented as custom CSS (with Tailwind v4
> for utilities). Command palette, modal, and cursor are hand-rolled — no
> `cmdk` / `@headlessui/react` / icon library dependencies.
