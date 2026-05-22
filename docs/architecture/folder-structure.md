# Folder Structure

Proposed structure for a Vite + React + TypeScript static site. Verified against
Vite's recommended layout and current React conventions.

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
│   │   ├── types.ts                 # Shared content interfaces
│   │   ├── fr.ts                    # French content (default)
│   │   └── en.ts                    # English content
│   │
│   ├── i18n/                        # Language plumbing
│   │   ├── LanguageProvider.tsx     # Context provider (locale + content)
│   │   ├── useLanguage.ts           # Hook: { locale, setLocale, content, t }
│   │   └── ui.ts                    # UI micro-labels per locale (nav, buttons)
│   │
│   ├── theme/                       # Theme plumbing
│   │   ├── ThemeProvider.tsx        # Context provider (theme state + <html> class)
│   │   └── useTheme.ts              # Hook: { theme, setTheme, toggle }
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Sticky nav + LanguageSwitcher + ThemeToggle
│   │   │   ├── Footer.tsx           # Socials + copyright
│   │   │   ├── Section.tsx          # Section wrapper (id, heading, reveal)
│   │   │   └── Container.tsx        # Max-width content container
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Languages.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── ThemeToggle.tsx
│   │       ├── LanguageSwitcher.tsx
│   │       ├── Button.tsx
│   │       ├── Badge.tsx            # Skill / tech chips
│   │       ├── Card.tsx             # Project / experience card
│   │       ├── SocialLinks.tsx
│   │       └── DownloadCvButton.tsx
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.ts          # Active section highlighting in nav
│   │   └── useReveal.ts             # IntersectionObserver reveal-on-scroll
│   │
│   ├── lib/
│   │   ├── constants.ts             # Site metadata, contact links, nav config
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

## Section ↔ content mapping

Each section component reads its slice from the active-locale content object:

| Section component | Content slice                                  |
| ----------------- | ---------------------------------------------- |
| `Hero`            | `content.hero`                                 |
| `About`           | `content.about`                                |
| `Skills`          | `content.skills` (grouped)                     |
| `Experience`      | `content.experience[]`                         |
| `Projects`        | `content.projects[]` (derived from experience) |
| `Education`       | `content.education[]`                          |
| `Languages`       | `content.spokenLanguages[]`                    |
| `Contact`         | `content.contact` + `lib/constants.ts` links   |
