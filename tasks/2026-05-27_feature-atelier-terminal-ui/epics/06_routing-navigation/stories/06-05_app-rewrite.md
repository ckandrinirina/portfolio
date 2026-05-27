# 06-05 · `App.tsx` rewrite (route shell)

**Status:** TODO · **Size:** XL · **Blocked by:** 05-02, 05-03, 05-04, 05-05, 06-01, 06-02, 06-03, 06-04, 04-02, 04-06

## Description

Rewrite `src/App.tsx` to be the central route shell. It:
1. Owns `route`, `direction`, `modalProject`, `cmdOpen`, `showHint`, `navPulse` state.
2. Renders `<Cursor>`, `<Sidebar>`, `<main>` (with `<Topbar>` + `.nav-lock`
   + `<View>`), `<ProjectModal>`, `<CommandPalette>`.
3. Keys the `<View>` container by `route` so React remounts it on each
   change → view-enter animation fires.
4. Wires `useHashRoute`, `useScrollToNavigate`, `useKeyboardArrows`,
   `useScrollReveal`, plus `⌘K` toggler.
5. Defines `navTo(id, dir)` which: sets direction, sets route, replaces
   history hash, closes cmdk, resets `viewRef.scrollTop`, locks for 850ms
   (via a `useRef<boolean>`), bumps `navPulse` for the sweep.

## Files affected

- `src/App.tsx` — fully replace previous content.
- `src/App.test.tsx` — major rewrite.

## Implementation notes

```tsx
import { useEffect, useRef, useState } from 'react'
import Cursor from '@/components/cursor/Cursor'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import ScrollHint from '@/components/layout/ScrollHint'
import { ROUTE_ORDER, nextRoute, type RouteId } from '@/lib/constants'
import { useHashRoute } from '@/hooks/useHashRoute'
import { useScrollToNavigate } from '@/hooks/useScrollToNavigate'
import { useKeyboardArrows } from '@/hooks/useKeyboardArrows'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useLanguage } from '@/i18n/useLanguage'

// view imports added incrementally in Epics 07–09
// (until they exist, render a stub placeholder per route — see story acceptance)

export default function App() {
  const [route, setRoute] = useState<RouteId>('home')
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [openProject /* set in Epic 08 */] = useState<null | unknown>(null)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [navPulse, setNavPulse] = useState(0)

  const viewRef = useRef<HTMLDivElement>(null)
  const lockedRef = useRef(false)
  const { t } = useLanguage()

  // Hash routing
  useHashRoute(setRoute)

  // ⌘K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navTo = (id: RouteId, dir: 'down' | 'up' = 'down') => {
    if (id === route) return
    setDirection(dir)
    setRoute(id)
    history.replaceState(null, '', '#' + id)
    setCmdOpen(false)
    setNavPulse((n) => n + 1)
    lockedRef.current = true
    setTimeout(() => { lockedRef.current = false }, 850)
    if (viewRef.current) viewRef.current.scrollTop = 0
  }

  const select = (id: RouteId) => {
    const cur = ROUTE_ORDER.indexOf(route)
    const nxt = ROUTE_ORDER.indexOf(id)
    navTo(id, nxt > cur ? 'down' : 'up')
  }

  useScrollToNavigate(viewRef, route, lockedRef, cmdOpen, openProject != null, navTo)
  useKeyboardArrows(route, viewRef, lockedRef, cmdOpen, openProject != null, navTo)
  useScrollReveal(viewRef, route)

  // Scroll-hint
  useEffect(() => {
    const v = viewRef.current
    if (!v) return
    const check = () => {
      const atBot = v.scrollTop + v.clientHeight >= v.scrollHeight - 80
      setShowHint(atBot && nextRoute(route) !== null)
    }
    v.addEventListener('scroll', check, { passive: true })
    const t = setTimeout(check, 100)
    return () => { clearTimeout(t); v.removeEventListener('scroll', check) }
  }, [route])

  const next = nextRoute(route)
  const nextLabel = next ? t(`route.${next}`) : ''

  return (
    <div className="app">
      <Cursor />
      <Sidebar active={route} onSelect={select} onCmd={() => setCmdOpen(true)} />
      <main className="main">
        <Topbar active={route} onCmd={() => setCmdOpen(true)} />
        {navPulse > 0 && <div key={navPulse} className="nav-lock" />}
        <div className="view" ref={viewRef} key={route}>
          <div className={'view-inner ' + (direction === 'up' ? 'view-enter-up' : 'view-enter-down')}>
            {/* per-route view component — added in Epics 07–09 */}
            {route === 'home'       && <PlaceholderHome />}
            {route === 'work'       && <PlaceholderWork />}
            {route === 'experience' && <PlaceholderExperience />}
            {route === 'skills'     && <PlaceholderSkills />}
            {route === 'process'    && <PlaceholderProcess />}
            {route === 'contact'    && <PlaceholderContact />}
            {next && <ScrollHint visible={showHint} nextLabel={nextLabel} onClick={() => navTo(next, 'down')} />}
          </div>
        </div>
      </main>

      {/* <ProjectModal/> mounted here in Epic 08 */}
      {/* <CommandPalette open={cmdOpen} onClose={...} /> mounted here in Epic 10 */}
    </div>
  )
}

// Stubs to keep the file building until the view epics land
function PlaceholderHome()       { return <h2 className="section-title">Home</h2> }
function PlaceholderWork()       { return <h2 className="section-title">Work</h2> }
function PlaceholderExperience() { return <h2 className="section-title">Experience</h2> }
function PlaceholderSkills()     { return <h2 className="section-title">Skills</h2> }
function PlaceholderProcess()    { return <h2 className="section-title">Process</h2> }
function PlaceholderContact()    { return <h2 className="section-title">Contact</h2> }
```

## Acceptance criteria

- [ ] `App` renders inside `<ThemeProvider><LanguageProvider>` (already wired
      by `main.tsx`).
- [ ] Default route is `home` (or whatever hash is on URL).
- [ ] Sidebar click on each route ID changes the visible view to its placeholder.
- [ ] Hash updates on each nav (`location.hash` reflects current route).
- [ ] After nav, scrollTop of `.view` is 0.
- [ ] After nav, the `.nav-lock` sweep is in the DOM for ~900ms.
- [ ] The view animates with `view-enter-down` (forward nav) or `view-enter-up`
      (backward nav).
- [ ] `⌘K` toggles `cmdOpen` state (no visible UI yet — that's Epic 10).
- [ ] ArrowDown at the bottom of any view advances; ArrowUp at top goes back.
- [ ] Replacing placeholders with the real views in later epics is a simple
      import swap — no further App changes needed.

## Test notes

Comprehensive integration test:
- Render `<App/>` with both providers.
- Click "Work" in the sidebar → expect placeholder "Work" `h2` to appear.
- `location.hash` becomes `#work`.
- Direct hash navigation: set `location.hash = '#skills'`, dispatch `hashchange`,
  expect "Skills" placeholder.
- ⌘K keydown toggles `cmdOpen` (assert via a `data-testid` you can add to a
  dummy CommandPalette mock).

## Edge cases

- React's strict mode in dev double-invokes effects. The 850ms lock is
  measured in real time so this is fine; the `setTimeout` does run twice
  but the second one is a no-op (lock already false).
- The view container is keyed on `route` — meaning React fully unmounts and
  remounts on each nav. Any state inside views is lost. This is the intended
  design (each route is fresh).
