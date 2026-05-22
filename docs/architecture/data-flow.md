# Data Flow

No network requests at runtime — all "data" is compiled-in typed content plus two
small pieces of persisted UI state (theme, language). This document traces each
flow.

## 1. App boot

```
index.html
  └─ inline script: read localStorage['theme'] (or prefers-color-scheme)
       └─ set <html class="dark"> early  → prevents theme flash (FOUC)
  └─ main.tsx mounts:
       <ThemeProvider>          // reconciles with the early script
         <LanguageProvider>     // resolves locale + content object
           <App/>
```

## 2. Content rendering

```
LanguageProvider
  ├─ locale = 'fr' (default) | 'en'
  ├─ content = locale === 'en' ? enContent : frContent     // typed, same shape
  └─ provides { locale, content, t } via context

Section component (e.g. Experience)
  └─ const { content } = useLanguage()
       └─ render content.experience[]   // re-renders when locale changes
```

- Content objects (`content/en.ts`, `content/fr.ts`) both implement the
  `PortfolioContent` interface in `content/types.ts`, guaranteeing EN/FR parity
  at compile time (a missing French field is a type error).

## 3. Language switch

```
User clicks LanguageSwitcher (EN ⇄ FR)
  └─ setLocale('fr')
       ├─ context state updates → all consumers re-render with French content
       ├─ document.documentElement.lang = 'fr'
       └─ localStorage['locale'] = 'fr'      // remembered for next visit
```

## 4. Theme toggle

```
User clicks ThemeToggle
  └─ toggle()  (theme: light ⇄ dark)
       ├─ document.documentElement.classList.toggle('dark')
       ├─ Tailwind `dark:` variants restyle the page (zero-runtime CSS)
       └─ localStorage['theme'] = 'dark' | 'light'
```

Initial precedence: `localStorage['theme']` → system `prefers-color-scheme` → light.

## 5. Navigation & scroll spy

```
useScrollSpy([hero, about, skills, experience, projects, education, contact])
  └─ IntersectionObserver watches each <section>
       └─ active section id → Header highlights the matching nav link
Click nav link → smooth-scroll to section anchor (#id)
```

## 6. Reveal-on-scroll

```
Section uses useReveal()
  └─ IntersectionObserver: when section enters viewport → isVisible = true
       └─ apply enter animation classes
  └─ if matchMedia('(prefers-reduced-motion: reduce)') → skip animation, show immediately
```

## 7. CV download

```
DownloadCvButton  →  <a href="/cv/erick-andrinirina-cv.pdf" download>
  └─ Browser downloads the static PDF (served by GitHub Pages from public/)
```
Note: `href` must respect Vite's `base`. Use `import.meta.env.BASE_URL + 'cv/...'`
so it works under both root (`/`) and project sub-path bases.

## 8. Contact links (no form)

```
Email     → <a href="mailto:ckandrinirina@gmail.com">
WhatsApp  → <a href="https://wa.me/261385096664">
GitHub    → <a href="<github-url>" target="_blank" rel="noopener noreferrer">
LinkedIn  → <a href="<linkedin-url>" target="_blank" rel="noopener noreferrer">
```
(GitHub/LinkedIn URLs are `[TO BE DEFINED]` — see spec open questions.)

## State summary

| State | Where | Persisted | Default |
|-------|-------|-----------|---------|
| Theme | `ThemeProvider` | `localStorage['theme']` | system preference |
| Locale | `LanguageProvider` | `localStorage['locale']` | `navigator.language` → `fr` |
| Active section | `useScrollSpy` (transient) | no | first section |
| Reveal visibility | `useReveal` (transient) | no | hidden until in view |

## Failure modes & resilience

| Scenario | Behavior |
|----------|----------|
| `localStorage` unavailable (privacy mode) | Fall back to system/default; toggles still work for the session |
| JS disabled | Page shows base HTML; static content is server-rendered into the bundle's root only after JS runs — acceptable for a portfolio. (If SEO for no-JS becomes a requirement, revisit with SSG.) |
| Missing CV PDF | Download link 404s; mitigated by a build check that the asset exists |
| Reduced-motion preference | Animations disabled, content fully visible |
