# Architecture Documentation — Erick Andrinirina Portfolio

Split architecture documentation for the personal developer portfolio. Source of
truth specification: [`../specs/2026-05-22_personal-portfolio/pre-spec.md`](../specs/2026-05-22_personal-portfolio/pre-spec.md).

**Project:** A bilingual (EN/FR), light/dark, single-page personal portfolio for
Erick Andrinirina, built as a static site and deployed to GitHub Pages.

## Index

| Doc                                        | Purpose                                                 | Status                                                  |
| ------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- |
| [overview.md](overview.md)                 | Vision, goals, users, high-level system architecture    | ✅                                                      |
| [folder-structure.md](folder-structure.md) | Directory layout and file conventions                   | ✅                                                      |
| [tech-stack.md](tech-stack.md)             | Technologies, versions, and rationale                   | ✅                                                      |
| [components.md](components.md)             | Component breakdown (providers, layout, views, UI)      | ✅                                                      |
| [data-flow.md](data-flow.md)               | Theme, language, content, route, and reveal flows       | ✅                                                      |
| [configuration.md](configuration.md)       | Build, Tailwind, TS, lint, and deployment configuration | ✅                                                      |
| [dev-guide.md](dev-guide.md)               | Scaffold, run, test, build, and deploy instructions     | ✅                                                      |
| [features/](features/)                     | Feature-scoped architecture additions                   | ✅                                                      |
| `api-contracts.md`                         | —                                                       | ➖ Not applicable (no backend; direct links only)       |
| `database-schema.md`                       | —                                                       | ➖ Not applicable (no database; content is static data) |

## Features

| Date       | Feature                                                                                          | Summary                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-27 | [Atelier Terminal UI](features/2026-05-27_atelier-terminal-ui.md)                                | Sidebar+main shell with 6 routes, 4 themes via `[data-theme]`, command palette, project modal, custom cursor, scroll-navigate |

## Quick facts

- **Type:** Static single-page application (SPA), no server, no database.
- **Stack:** Vite 7 · React 19 · TypeScript 5.7+ · Tailwind CSS v4.
- **Hosting:** GitHub Pages, auto-deployed via GitHub Actions on push to `main`.
- **Languages:** French (default) and English, switchable at runtime.
- **Theme:** Four palettes — Ember (default warm dark), Paper (light), Ocean
  (dark blue), Forest (dark green) — toggled via `[data-theme]` on `<html>`,
  defaulting to the visitor's system preference. See
  [features/2026-05-27_atelier-terminal-ui.md](features/2026-05-27_atelier-terminal-ui.md).
- **Shell:** Sidebar + main view container with route-based navigation
  (Home · Work · Experience · Skills · How I work · Contact) and `⌘K` command palette.

## Changelog

- **2026-05-27** — Atelier Terminal UI: new sidebar+main shell, 6 routes,
  4-theme palette via `[data-theme]`, command palette, project modal, custom
  cursor, scroll-to-navigate. Dropped Education section; Languages merged into
  Contact. CV download moved to a Home CTA.
  See [features/2026-05-27_atelier-terminal-ui.md](features/2026-05-27_atelier-terminal-ui.md).

## Reading order

1. `overview.md` — what and why.
2. `tech-stack.md` — the tools.
3. `folder-structure.md` — where things live.
4. `components.md` + `data-flow.md` — how it works.
5. `configuration.md` + `dev-guide.md` — how to build, run, and ship.

## Next step

Run `/ck-code:plan` to break this architecture into epics and stories under `tasks/`.
