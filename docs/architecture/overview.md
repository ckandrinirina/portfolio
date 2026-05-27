# Overview

## Vision

A fast, polished, bilingual personal portfolio that presents Erick Andrinirina —
a Fullstack JavaScript engineer with 7 years of experience — to recruiters,
potential clients, and fellow developers. It complements his CV online and acts
as a single shareable link representing his professional identity.

## Goals

1. Convey seniority and specialization (Fullstack JavaScript, 7 years) immediately.
2. Present skills, employers, and projects in a scannable, attractive layout.
3. Offer trusted, direct contact channels (email, WhatsApp, GitHub, LinkedIn).
4. Serve both French (default) and English audiences with a runtime language switch.
5. Stay permanently online, fast, and zero-cost via GitHub Pages.
6. Keep private data (full home address) off the site while remaining personable.

## Target users

| User                         | Need                                         | Delivered by                   |
| ---------------------------- | -------------------------------------------- | ------------------------------ |
| Recruiters / hiring managers | Quick read of seniority, stack, availability | Hero, Skills, CV download      |
| Potential clients            | Proof of real, delivered projects            | Experience + Projects sections |
| Fellow developers            | Technical depth, source/profile links        | Skills, GitHub, LinkedIn       |
| The owner                    | A shareable professional identity            | One link, bilingual, polished  |

## System architecture

A purely client-side static single-page application. There is **no backend, no
database, and no runtime API**. All content is compiled into the bundle as typed
data; the browser does everything.

The visual shell is the **Atelier Terminal** design (sidebar + main with
route-based navigation). See
[features/2026-05-27_atelier-terminal-ui.md](features/2026-05-27_atelier-terminal-ui.md)
for the full visual / layout / interaction specification.

```
                         ┌────────────────────────────────────────────────┐
   Visitor's browser     │              index.html                         │
   ───────────────────►  │   ┌────────────────────────────────────────┐   │
                         │   │            React app                    │   │
                         │   │                                          │   │
   GitHub Pages (CDN)    │   │  ThemeProvider  ──► <html data-theme>   │   │
   serves static files   │   │  LanguageProvider ─► locale + content   │   │
        (dist/)          │   │                                          │   │
                         │   │  App  (route state, hash routing)        │   │
                         │   │   ├─ Sidebar (brand · routes · status)   │   │
                         │   │   ├─ Topbar  (breadcrumb · ⌘K · clock)   │   │
                         │   │   ├─ View    (one of:                    │   │
                         │   │   │   Home · Work · Experience ·         │   │
                         │   │   │   Skills · Process · Contact)        │   │
                         │   │   ├─ ProjectModal · CommandPalette       │   │
                         │   │   └─ Cursor (dot + ring, hover devices)  │   │
                         │   └────────────────────────────────────────┘   │
                         │   localStorage: theme (4-palette) + locale     │
                         │   /cv/<resume>.pdf  (static asset)              │
                         └────────────────────────────────────────────────┘
```

### Build & deploy pipeline

```
push to main ─► GitHub Actions ─► npm ci ─► vite build ─► dist/
                                                   │
                                     upload-pages-artifact
                                                   │
                                          deploy-pages ─► https://ckandrinirina.github.io/
```

## Architectural principles

- **Static-first.** No server-side logic; everything is pre-built and CDN-served.
- **Content/UI separation.** Portfolio content lives in typed per-locale data
  modules, decoupled from presentation components.
- **Progressive enhancement of comfort.** Theme and language respect the
  visitor's environment first (system theme, browser language), then their
  explicit choice (persisted in `localStorage`).
- **Accessibility & performance by default.** Semantic HTML, keyboard
  navigation, `prefers-reduced-motion` support, optimized static assets.

## Non-functional requirements

| Concern        | Target                                                                     |
| -------------- | -------------------------------------------------------------------------- |
| Performance    | Lighthouse performance ≥ 95; first load < 1.5s on broadband                |
| Accessibility  | WCAG 2.1 AA intent: semantic landmarks, focus states, color contrast       |
| Responsiveness | Mobile, tablet, desktop breakpoints                                        |
| SEO / sharing  | Title, meta description, Open Graph/Twitter card, correct `lang` attribute |
| i18n           | Full EN/FR parity for all visible content                                  |
| Availability   | Always online (GitHub Pages CDN)                                           |
| Privacy        | Full home address never rendered or embedded                               |

## Out of scope

- Working contact form / message inbox (direct links only).
- Blog or articles.
- Custom domain (can be layered onto GitHub Pages later).
- Separate English CV file (current CV is in French).
- Visitor analytics.
- Standalone Education view (content is dropped — not in the Atelier Terminal design).
