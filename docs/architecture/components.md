# Components

Component tree, responsibilities, and key props. All components are function
components (React 19) written in TypeScript.

## Tree

```
main.tsx
└── ThemeProvider
    └── LanguageProvider
        └── App
            ├── Header
            │   ├── nav (anchors, driven by useScrollSpy)
            │   ├── LanguageSwitcher
            │   └── ThemeToggle
            ├── main
            │   ├── Hero            (Section + DownloadCvButton + SocialLinks)
            │   ├── About
            │   ├── Skills          (Badge[])
            │   ├── Experience      (Card[])
            │   ├── Projects        (Card[])
            │   ├── Education
            │   ├── Languages
            │   └── Contact         (SocialLinks, email/WhatsApp links)
            └── Footer              (SocialLinks)
```

## Providers

### `ThemeProvider`
- **State:** `theme: 'light' | 'dark'`.
- **Init:** `localStorage['theme']` → else `matchMedia('(prefers-color-scheme: dark)')`.
- **Effect:** toggles `dark` class on `document.documentElement`; persists choice.
- **Exposes (via `useTheme`):** `{ theme, setTheme, toggle }`.
- **Edge case:** an inline script in `index.html` applies the stored theme
  before React hydrates, to avoid a flash of incorrect theme (FOUC).

### `LanguageProvider`
- **State:** `locale: 'en' | 'fr'`.
- **Init:** `localStorage['locale']` → else `navigator.language` prefix (`en`/`fr`) → else `'fr'` (default).
- **Effect:** sets `document.documentElement.lang`; persists choice.
- **Exposes (via `useLanguage`):** `{ locale, setLocale, content, t }` where
  `content` is the resolved per-locale object and `t(key)` resolves UI labels.

## Layout components

| Component | Responsibility | Key props |
|-----------|----------------|-----------|
| `Header` | Sticky top bar; nav anchors; language + theme controls; mobile menu | — |
| `Footer` | Social links, copyright, "built with" note | — |
| `Section` | Semantic `<section>` with `id`, heading, and reveal animation wrapper | `id`, `title`, `children` |
| `Container` | Centered max-width wrapper with responsive padding | `children`, `className?` |

## Section components

Each consumes `useLanguage()` and renders the matching content slice.

| Component | Renders |
|-----------|---------|
| `Hero` | Name, title, positioning line, location (city/country), CTAs (View projects, Download CV), social links |
| `About` | Profile narrative paragraph |
| `Skills` | Skill groups (Languages, Front-end, Back-end, Databases, Tooling/DevOps, Testing, AI/Specialized, Design tools) rendered as `Badge` chips |
| `Experience` | Reverse-chronological roles as `Card`s: company, role, period, tech highlights, project bullets |
| `Projects` | Curated/derived project cards (SOKA Club, SOKA Live, EER Full Digital, SHOYO, OCR/GPT-4, Happy Capital, etc.) with description + tech tags |
| `Education` | Education table: qualification, institution, year |
| `Languages` | Spoken languages with proficiency (Malagasy native, French fluent, English working) |
| `Contact` | Direct links: email, WhatsApp, GitHub, LinkedIn; location text |

## UI components

| Component | Responsibility | Key props |
|-----------|----------------|-----------|
| `ThemeToggle` | Button switching light/dark; reflects current theme; `aria-pressed` | — |
| `LanguageSwitcher` | EN/FR toggle or segmented control; `aria-label` | — |
| `Button` | Styled link/button (primary/secondary/ghost variants) | `variant`, `as`, `href?` |
| `Badge` | Skill/tech chip | `children` |
| `Card` | Experience/project card shell | `children`, `className?` |
| `SocialLinks` | Renders GitHub + LinkedIn icon links from constants | `size?` |
| `DownloadCvButton` | Anchor to `/cv/...pdf` with `download`; label localized | — |

## Hooks

| Hook | Responsibility |
|------|----------------|
| `useScrollSpy(sectionIds)` | Tracks the section currently in view; returns active id for nav highlighting |
| `useReveal()` | Returns a ref + visibility flag via `IntersectionObserver`; respects `prefers-reduced-motion` |
| `useTheme()` | Theme context accessor |
| `useLanguage()` | Language/content context accessor |

## Accessibility notes

- Single `<h1>` (Hero); sections use `<h2>`.
- Landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`.
- All interactive controls keyboard-focusable with visible focus rings.
- Toggles expose state via `aria-pressed` / `aria-label`; language switch sets
  `lang` correctly.
- Reveal animations are disabled under `prefers-reduced-motion: reduce`.
