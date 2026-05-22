# Architecture Documentation — Erick Andrinirina Portfolio

Split architecture documentation for the personal developer portfolio. Source of
truth specification: [`../specs/2026-05-22_personal-portfolio/pre-spec.md`](../specs/2026-05-22_personal-portfolio/pre-spec.md).

**Project:** A bilingual (EN/FR), light/dark, single-page personal portfolio for
Erick Andrinirina, built as a static site and deployed to GitHub Pages.

## Index

| Doc | Purpose | Status |
|-----|---------|--------|
| [overview.md](overview.md) | Vision, goals, users, high-level system architecture | ✅ |
| [folder-structure.md](folder-structure.md) | Directory layout and file conventions | ✅ |
| [tech-stack.md](tech-stack.md) | Technologies, versions, and rationale | ✅ |
| [components.md](components.md) | Component breakdown (providers, layout, sections, UI) | ✅ |
| [data-flow.md](data-flow.md) | Theme, language, content, scroll, and download flows | ✅ |
| [configuration.md](configuration.md) | Build, Tailwind, TS, lint, and deployment configuration | ✅ |
| [dev-guide.md](dev-guide.md) | Scaffold, run, test, build, and deploy instructions | ✅ |
| `api-contracts.md` | — | ➖ Not applicable (no backend; direct links only) |
| `database-schema.md` | — | ➖ Not applicable (no database; content is static data) |

## Quick facts

- **Type:** Static single-page application (SPA), no server, no database.
- **Stack:** Vite 7 · React 19 · TypeScript 5.7+ · Tailwind CSS v4.
- **Hosting:** GitHub Pages, auto-deployed via GitHub Actions on push to `main`.
- **Languages:** French (default) and English, switchable at runtime.
- **Theme:** Light/dark with a toggle, defaulting to the visitor's system preference.

## Reading order

1. `overview.md` — what and why.
2. `tech-stack.md` — the tools.
3. `folder-structure.md` — where things live.
4. `components.md` + `data-flow.md` — how it works.
5. `configuration.md` + `dev-guide.md` — how to build, run, and ship.

## Next step

Run `/ck-code:plan` to break this architecture into epics and stories under `tasks/`.
