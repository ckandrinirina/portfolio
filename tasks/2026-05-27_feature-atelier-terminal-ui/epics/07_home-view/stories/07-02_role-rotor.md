# 07-02 · Role rotor

**Status:** TODO · **Size:** M · **Blocked by:** 07-01

## Description

Add the "also a —" role rotor under the tagline. Cycles through
`content.hero.roles[]` every 2600ms via `setInterval`. Uses CSS-only vertical
sliding (translateY) on a flex column of items. Marks the rotor container
`aria-live="polite"` so screen readers announce changes.

## Files affected

- `src/views/HomeView.tsx`
- `src/index.css` — `.home-rotor`, `.home-rotor-track`, `.home-rotor-item`
  rules (verbatim from mockup).

## Implementation notes

CSS:
```css
.home-roles { display: inline-flex; gap: 10px; align-items: baseline; font-size: 13px; color: var(--muted); font-family: var(--font-mono); margin-bottom: 48px; }
.home-rotor { display: inline-block; height: 1.3em; overflow: hidden; vertical-align: bottom; color: var(--accent); }
.home-rotor-track { display: flex; flex-direction: column; transition: transform 0.55s var(--ease); }
.home-rotor-item { line-height: 1.3; white-space: nowrap; }
```

Component fragment (slot into HomeView between tagline and actions):

```tsx
import { useEffect, useState } from 'react'

function RoleRotor({ rolesLabel, roles }: { rolesLabel: string; roles: string[] }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(t)
  }, [roles.length])
  return (
    <div className="home-roles reveal r-fade" style={{ transitionDelay: '0.35s' }}>
      <span>{rolesLabel}</span>
      <span className="home-rotor" aria-live="polite">
        <span
          className="home-rotor-track"
          style={{ transform: `translateY(-${idx * 1.3}em)` }}
        >
          {roles.map((r) => <span key={r} className="home-rotor-item">{r}</span>)}
        </span>
      </span>
    </div>
  )
}
```

## Acceptance criteria

- [ ] CSS rules present.
- [ ] After 2.6s, the visible role advances to the next item.
- [ ] After last item, wraps to first.
- [ ] `aria-live="polite"` on the rotor container.
- [ ] Cleanup clears the interval on unmount.
- [ ] Tests with `vi.useFakeTimers()` + `vi.advanceTimersByTime(2600)`
      verify the index advances and `translateY` updates.

## Test notes

Render with `roles=['a', 'b']`; advance 2600ms; assert
`getByText('a').parentElement.style.transform` includes `translateY(-1.3em)`.

## Edge cases

- `prefers-reduced-motion`: the CSS already covers transforms; the JS-driven
  rotor is fine — visually the change is instantaneous instead of sliding.
  Acceptable.
