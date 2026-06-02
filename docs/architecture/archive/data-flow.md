# Data Flow

No network requests at runtime — all "data" is compiled-in typed content plus two
small pieces of persisted UI state (theme, language). This document traces each
flow.

> Updated 2026-05-27 for the **Atelier Terminal UI**: hash routing,
> scroll-to-navigate, route cycling, scroll-reveal, copy-to-clipboard, and
> 4-palette theme cycling. Full details in
> [features/2026-05-27_atelier-terminal-ui.md](features/2026-05-27_atelier-terminal-ui.md).

## 1. App boot

```
index.html
  ├─ preconnect + Google Fonts stylesheet (JetBrains Mono, Instrument Serif, Geist)
  └─ inline script (anti-FOUC):
       const stored = localStorage.getItem('theme')                  // 'default'|'paper'|'ocean'|'forest'|null
       const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
       const t = stored || (prefersDark ? 'default' : 'paper')
       if (t !== 'default') html.setAttribute('data-theme', t)
main.tsx mounts:
  <ThemeProvider>            // reconciles with the early script
    <LanguageProvider>       // resolves locale + content object
      <App/>                 // owns route, modal, cmdk, scroll listeners
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

## 4. Theme cycle (4 palettes)

```
User clicks ThemeSwitcher (or runs `theme` in ⌘K)
  └─ cycle() — walks default → ocean → forest → paper → default
       ├─ next === 'default' → html.removeAttribute('data-theme')
       │  else                → html.setAttribute('data-theme', next)
       ├─ CSS custom properties recompute; Tailwind utilities + custom classes
       │  all pull from the new --bg / --fg / --accent / etc. tokens
       └─ localStorage['theme'] = next
```

Initial precedence: `localStorage['theme']` → `prefers-color-scheme: dark`
→ `'default'` (Ember dark), else `'paper'` (light).

## 5. Route navigation

```
Sources of route change:
  • Sidebar row click   → setRoute(id) with computed direction
  • Cmd-K item          → setRoute(id) with direction='down'
  • hashchange          → setRoute(hash)
  • Wheel/touch gesture → useScrollToNavigate → next/prev
  • Arrow / PageUp/Down → useKeyboardArrows  → next/prev

On change:
  history.replaceState(null, '', '#' + id)
  viewRef.current.scrollTop = 0
  navLock = true (auto-clears after 850 ms)
  the .view container is re-keyed on `route` → React remounts → fresh
  view-enter animation in the chosen direction ('up' or 'down').
```

## 6. Scroll-to-navigate

```
Boundary detection:
  atTop = view.scrollTop <= 1
  atBot = view.scrollTop + view.clientHeight >= view.scrollHeight - 2
  boundary = atTop ? 'top' : atBot ? 'bot' : null

Gesture state machine:
  • A gesture starts when a wheel event arrives and `inGesture` is false.
  • The gesture remembers the boundary it STARTED at (`startedAtBoundary`).
  • Only a gesture that started at a boundary AND continues to push past it
    can accumulate toward navigation.
  • Accumulator resets on direction change or when no wheel event arrives for 180ms.
  • Threshold 90 → cur ± 1 in ROUTE_ORDER; clamp to [0, len-1].
```

```
Touch:
  touchstart: { y: clientY, scrollTop, t: now }
  touchend:   dy = startY - endY
              if |dy| > 70 AND dt < 700ms AND view didn't scroll (Δ<8px):
                dy > 0 && atBot → next
                dy < 0 && atTop → prev
```

## 7. Scroll-reveal

```
useScrollReveal:
  on route change, wait 30ms, then:
    Strip .in from .reveal, .proj-card, .skill-card, .tl-item, .process-item, .now-card, .stats-grid
    Create IntersectionObserver(root: viewRef, threshold: 0.08, rootMargin: '0px 0px -8% 0px')
    On enter:
      el.style.transitionDelay = Math.min(siblingIndex, 8) * 90 + 'ms'
      el.classList.add('in')
      io.unobserve(el)
  prefers-reduced-motion: opacity:1; transform:none everywhere.
```

## 8. CV download (Home CTA)

```
HomeView <DownloadCvButton/>  →  <a href={BASE_URL + 'cv/erick-andrinirina-cv.pdf'} download>
  └─ Browser downloads the static PDF (served by GitHub Pages from public/)
```

`href` respects Vite's `base` via `import.meta.env.BASE_URL` so it works under
both root (`/`) and project sub-path bases.

## 9. Contact links + copy-to-clipboard

```
ContactView card rows:
  Email     → <a href="mailto:ckandrinirina@gmail.com"> + copy button
  WhatsApp  → <a href="https://wa.me/261385096664">    + copy button
  Based in  → text (Antananarivo · UTC+3)
  Languages → text (Malagasy · Français · English)
  Available → text (● open · remote, contract or full-time)
```

```
Copy button click → navigator.clipboard?.writeText(value)
  → setCopied('email' | 'phone') → render "✓ copied" (success color)
  → setTimeout 1400ms → setCopied(null)
```

## 10. Command palette (⌘K)

```
Keyboard ⌘/Ctrl+K toggles open state.
Open:
  filter = items.filter(i => (cmd + label + desc).toLowerCase().includes(q.toLowerCase()))
  group by item.group → Navigation, Quick, Projects
  ArrowUp/Down moves active; Enter runs active item; Escape closes.
Items run() →
  • route → setRoute(id) [home, work, experience, skills, process, contact]
  • action 'copyEmail' → clipboard write
  • action 'whatsapp'  → window.open(WA link)
  • action 'cycleTheme' → see flow 4
```

## 11. Custom cursor

See [features/2026-05-27_atelier-terminal-ui.md#custom-cursor](features/2026-05-27_atelier-terminal-ui.md#custom-cursor)
for the full event chain (mousemove, mouseover state inspection, label
attribute extraction).

## State summary

| State             | Where                                | Persisted                | Default                                    |
| ----------------- | ------------------------------------ | ------------------------ | ------------------------------------------ |
| Theme             | `ThemeProvider`                      | `localStorage['theme']`  | system preference → `default` or `paper`   |
| Locale            | `LanguageProvider`                   | `localStorage['locale']` | `navigator.language` → `fr`                |
| Active route      | `App`                                | URL hash (history)       | `home` (or hash on load)                   |
| Direction         | `App` (transient)                    | no                       | `down`                                     |
| Modal project     | `App` (transient)                    | no                       | `null`                                     |
| Cmd-K open        | `App` (transient)                    | no                       | `false`                                    |
| Reveal `.in` flag | DOM element class (transient)        | no                       | unset until in view                        |
| Cursor state      | `Cursor` (transient)                 | no                       | `default`                                  |
| Copy feedback     | `ContactView` (transient)            | no                       | `null` (clears after 1400ms)               |

## Failure modes & resilience

| Scenario                                  | Behavior                                                                                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `localStorage` unavailable (privacy mode) | Fall back to system/default; toggles still work for the session                                                                                                                             |
| JS disabled                               | Page shows base HTML; static content is server-rendered into the bundle's root only after JS runs — acceptable for a portfolio. (If SEO for no-JS becomes a requirement, revisit with SSG.) |
| Missing CV PDF                            | Download link 404s; mitigated by a build check that the asset exists                                                                                                                        |
| Reduced-motion preference                 | Animations disabled, content fully visible                                                                                                                                                  |
