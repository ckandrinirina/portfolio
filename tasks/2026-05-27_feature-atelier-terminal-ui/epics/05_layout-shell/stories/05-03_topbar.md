# 05-03 · Topbar component + `.tb-*` CSS

**Status:** TODO · **Size:** M · **Blocked by:** 05-01, 03-05

## Description

Implement `<Topbar active onCmd />`: a breadcrumb (`~/portfolio / current`),
a `⌘K` button that opens the command palette, and an auto-updating TNR
clock (refreshes every 30 seconds).

## Files affected

- `src/components/layout/Topbar.tsx`
- `src/components/layout/Topbar.test.tsx`
- `src/index.css` (append `.topbar`, `.tb-path`, `.tb-search`, `.tb-clock` rules)

## Implementation notes

### CSS

Append verbatim from mockup (lines ~661–712 of the extracted source):

```css
.topbar {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 28px;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  flex-shrink: 0;
  font-size: 11.5px;
  color: var(--muted);
}
@media (max-width: 880px) { .topbar { padding: 10px 16px; gap: 10px; } }

.tb-path { display: flex; align-items: center; gap: 8px; color: var(--muted); flex: 1; }
.tb-path .sep { color: var(--muted-deep); }
.tb-path .cur { color: var(--fg); }

.tb-search {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--muted);
  font-size: 11.5px;
  transition: border-color 0.2s;
}
.tb-search:hover { border-color: var(--line-strong); color: var(--fg-dim); }
.tb-search kbd {
  font-family: inherit;
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 10px;
}

.tb-clock {
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  font-size: 11px;
}
@media (max-width: 600px) { .tb-clock { display: none; } }
```

### Component

```tsx
import { useEffect, useState } from 'react'
import { useLanguage } from '@/i18n/useLanguage'

type RouteId = 'home' | 'work' | 'experience' | 'skills' | 'process' | 'contact'

const BREADCRUMB: Record<RouteId, string> = {
  home: 'home',
  work: 'selected-work',
  experience: 'experience',
  skills: 'skills',
  process: 'how-i-work',
  contact: 'contact',
}

type Props = { active: RouteId; onCmd: () => void }

export default function Topbar({ active, onCmd }: Props) {
  const { t } = useLanguage()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      try {
        const fmt = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit', minute: '2-digit',
          timeZone: 'Indian/Antananarivo', hour12: false,
        })
        setTime(fmt.format(new Date()) + ' TNR')
      } catch { setTime('') }
    }
    tick()
    const t = setInterval(tick, 30_000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="topbar">
      <div className="tb-path">
        <span>~/portfolio</span>
        <span className="sep">/</span>
        <span className="cur">{BREADCRUMB[active]}</span>
      </div>
      <button className="tb-search" onClick={onCmd} aria-label={t('cmdk.placeholder')}>
        <span>{t('topbar.quickNav') ?? 'Quick nav'}</span>
        <kbd>⌘K</kbd>
      </button>
      <span className="tb-clock" aria-label={t('topbar.tnrClock') ?? 'Antananarivo time'}>{time}</span>
    </div>
  )
}
```

(Add `'topbar.quickNav'` and `'topbar.tnrClock'` to `ui.ts` in story 03-05
addendum or co-located with this story.)

## Acceptance criteria

- [ ] `.topbar`, `.tb-path`, `.tb-search`, `.tb-clock` CSS present.
- [ ] Component renders breadcrumb with `~/portfolio` + slug from `BREADCRUMB[active]`.
- [ ] ⌘K button calls `onCmd()` on click.
- [ ] Clock shows TNR time in `HH:mm TNR` format and updates every 30s.
- [ ] At ≤600px the clock is hidden.
- [ ] Unit test asserts onCmd is called when the ⌘K button is clicked.

## Test notes

Use `vi.useFakeTimers()` to advance time and assert the clock re-renders.

## Edge cases

- jsdom's `Intl.DateTimeFormat` doesn't always honor `timeZone: 'Indian/Antananarivo'`
  unless the test runner is configured with full ICU. The `try/catch` falls
  back to empty string, which means the test should assert "clock element
  exists" rather than a specific time value.
