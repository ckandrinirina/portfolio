# Folder Structure

Proposed structure for a Vite + React + TypeScript static site. Verified against
Vite's recommended layout and current React conventions.

> The structure below has been **updated for the Atelier Terminal UI** (2026-05-27).
> Notable changes: `src/views/` replaces `src/components/sections/`; new
> `cursor/`, `cmdk/`, and `projects/artwork/` subdirectories; `Header.tsx` /
> `Footer.tsx` are replaced by `Sidebar.tsx` + `Topbar.tsx`. Full delta in
> [features/2026-05-27_atelier-terminal-ui.md](features/2026-05-27_atelier-terminal-ui.md).

```
ck-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages CI/CD
├── docs/                            # Specs & architecture (this documentation)
│   ├── specs/
│   └── architecture/
├── public/                          # Copied verbatim to dist/ (no processing)
│   ├── cv/
│   │   └── erick-andrinirina-cv.pdf # Downloadable CV asset
│   ├── og-image.png                 # Social share preview
│   ├── favicon.svg
│   └── profile.jpg                  # Profile photo (from CV)
├── src/
│   ├── main.tsx                     # App entry: mounts providers + <App/>
│   ├── App.tsx                      # Page shell: Header + sections + Footer
│   ├── index.css                    # @import "tailwindcss"; dark variant; base styles
│   │
│   ├── content/                     # Portfolio CONTENT (data, not UI)
│   │   ├── types.ts                 # Shared content interfaces (updated for Atelier Terminal)
│   │   ├── fr.ts                    # French content (default)
│   │   ├── en.ts                    # English content
│   │   └── projects.ts              # Project list with id/num/year/tags/detail
│   │
│   ├── i18n/                        # Language plumbing (kept)
│   │   ├── LanguageProvider.tsx     # Context provider (locale + content)
│   │   ├── useLanguage.ts           # Hook: { locale, setLocale, content, t }
│   │   └── ui.ts                    # UI micro-labels per locale (nav, buttons, cmdk groups)
│   │
│   ├── theme/                       # Theme plumbing (rewritten for 4 palettes)
│   │   ├── ThemeProvider.tsx        # Context provider (data-theme attribute on <html>)
│   │   ├── useTheme.ts              # Hook: { theme, setTheme, cycle }
│   │   └── themeBootstrap.ts        # Inline script source for anti-FOUC bootstrap
│   │
│   ├── views/                       # Top-level route views
│   │   ├── HomeView.tsx
│   │   ├── WorkView.tsx
│   │   ├── ExperienceView.tsx
│   │   ├── SkillsView.tsx
│   │   ├── ProcessView.tsx
│   │   └── ContactView.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # 240px aside — brand + grouped routes + status
│   │   │   ├── Topbar.tsx           # Breadcrumb + ⌘K trigger + TNR clock
│   │   │   ├── ScrollHint.tsx       # Sticky "Scroll for X" chip at bottom of each view
│   │   │   └── Container.tsx        # (kept; may be inlined as .view-inner)
│   │   ├── cursor/
│   │   │   └── Cursor.tsx           # Custom cursor (dot + ring) for hover devices
│   │   ├── cmdk/
│   │   │   ├── CommandPalette.tsx   # ⌘K modal with grouped, filterable results
│   │   │   └── commands.ts          # COMMANDS data: nav + quick actions + projects
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx      # Used in WorkView grid
│   │   │   ├── ProjectModal.tsx     # Detail modal (role/impact/stack)
│   │   │   └── artwork/
│   │   │       ├── ProjectArt.tsx   # Dispatcher: switch by project id
│   │   │       ├── SokaArt.tsx
│   │   │       ├── SokaLiveArt.tsx
│   │   │       ├── LudokaArt.tsx
│   │   │       ├── EerArt.tsx
│   │   │       ├── ShoyoArt.tsx
│   │   │       ├── OcrArt.tsx
│   │   │       ├── HappyArt.tsx
│   │   │       └── TheseisArt.tsx
│   │   └── ui/
│   │       ├── Reveal.tsx           # Letter-by-letter animated reveal
│   │       ├── CountUp.tsx          # Animated number counter
│   │       ├── Marquee.tsx          # Looping horizontal tech-stack strip
│   │       ├── Button.tsx           # .btn / .btn-primary
│   │       ├── LanguageSwitcher.tsx
│   │       ├── ThemeSwitcher.tsx    # Cycle or segmented (Ember / Paper / Ocean / Forest)
│   │       ├── Badge.tsx            # (kept; restyled)
│   │       ├── Card.tsx             # (kept; restyled)
│   │       ├── SocialLinks.tsx
│   │       └── DownloadCvButton.tsx # Third Home CTA
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.ts       # IntersectionObserver → .in class with stagger
│   │   ├── useScrollToNavigate.ts   # Wheel + touch gestures to walk routes
│   │   ├── useKeyboardArrows.ts     # ArrowUp/Down / PageUp/Down → route nav
│   │   ├── useCmdK.ts               # ⌘/Ctrl+K toggle
│   │   ├── useHashRoute.ts          # Read / write window.location.hash
│   │   └── useReveal.ts             # (kept; legacy one-off use)
│   │
│   ├── lib/
│   │   ├── constants.ts             # Site metadata, contact links, ROUTE_ORDER
│   │   └── utils.ts                 # cn() class merge helper, small utilities
│   │
│   └── test/
│       └── setup.ts                 # Vitest + jest-dom setup
│
├── index.html                       # Vite HTML entry (meta, OG tags, lang)
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── eslint.config.js                 # ESLint 9 flat config
├── .prettierrc                      # Prettier + tailwind plugin
├── package.json
└── README.md
```

## Conventions

| Rule                                | Detail                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------- |
| Component files                     | One component per file, `PascalCase.tsx`, default export the component    |
| Hooks                               | `useXxx.ts`, named export                                                 |
| Content vs UI                       | `src/content/*` holds data only; components import it via `useLanguage()` |
| Styling                             | Tailwind utility classes inline; shared tokens in `index.css` `@theme`    |
| Assets that need a stable URL       | Go in `public/` (CV PDF, OG image, favicon)                               |
| Assets that can be hashed/optimized | Imported from `src/` (decorative images)                                  |
| Tests                               | Co-located as `Component.test.tsx` next to the component                  |

## View ↔ content mapping

Each view component reads its slice from the active-locale content object:

| View component    | Content slice                                                         |
| ----------------- | --------------------------------------------------------------------- |
| `HomeView`        | `content.hero` + `content.now` + `content.stats[]` + `content.marquee[]` |
| `WorkView`        | `content.projects[]`                                                   |
| `ExperienceView`  | `content.experience[]`                                                 |
| `SkillsView`      | `content.skills[]` (4 cards)                                           |
| `ProcessView`     | `content.process[]` (5 principles)                                     |
| `ContactView`     | `content.contact` (email, whatsapp, location, languages[], pitch)      |
