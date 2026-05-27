# 07-06 · Stats grid with `CountUp`

**Status:** TODO · **Size:** M · **Blocked by:** 07-01, 04-04

## Description

Add the 2×2 stats grid (right half of `.home-grid`). Four tiles; each shows
an animated number via `<CountUp>` plus a label.

## Files affected

- `src/views/HomeView.tsx`
- `src/index.css` — `.stats-grid`, `.stat-tile` rules.

## Implementation notes

CSS:
```css
.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 24px;
}
@media (max-width: 880px) { .home-grid { grid-template-columns: 1fr; } }

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}
.stat-tile {
  background: var(--bg-2);
  padding: 22px 24px;
  display: flex; flex-direction: column;
}
.stat-tile .n {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 44px;
  line-height: 1;
  color: var(--accent);
  margin-bottom: 8px;
  font-variant-numeric: tabular-nums;
}
.stat-tile .l {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
```

JSX:
```tsx
import CountUp from '@/components/ui/CountUp'

<div className="stats-grid reveal" style={{ transitionDelay: '0.15s' }}>
  {content.stats.map((s, i) => (
    <div key={i} className="stat-tile">
      <div className="n"><CountUp to={s.n} suffix={s.suffix} /></div>
      <div className="l">{s.label}</div>
    </div>
  ))}
</div>
```

## Acceptance criteria

- [ ] CSS present.
- [ ] 4 stat tiles render with the localized labels.
- [ ] Each `.n` animates from 0 to its target.
- [ ] Tiles arrange as 2×2 on desktop, 1-column on ≤880px.
- [ ] `.n` uses tabular numerals (`font-variant-numeric: tabular-nums`).

## Test notes

Render and `expect(screen.getAllByText(/years|projects|frameworks|languages/i)).toHaveLength(4)`.

## Edge cases

- The grid uses a 1px gap with a `--line`-colored background to draw the
  divider between tiles. Don't try to replace with `border` — the design
  relies on the inner-tile background filling each cell.
