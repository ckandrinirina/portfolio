# 04-05 · `Marquee.tsx`

**Status:** TODO · **Size:** M · **Blocked by:** 01-05 (`@keyframes marquee`)

## Description

`<Marquee items={…} />` renders an infinite horizontal scrolling track of
items separated by `.dot` markers. Pauses on hover. Has edge fade (mask
gradient from Epic 01). Used in HomeView.

## Files affected

- `src/components/ui/Marquee.tsx`
- `src/index.css` — append `.marquee`, `.marquee-track`, `.marquee:hover` rules.

## Implementation notes

CSS rules (append to `index.css`):

```css
.marquee {
  margin: 64px -80px 0;
  padding: 18px 0;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--bg-deep);
  position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}
@media (max-width: 1100px) { .marquee { margin: 48px -40px 0; } }
@media (max-width: 600px)  { .marquee { margin: 40px -18px 0; } }

.marquee-track {
  display: flex; gap: 48px;
  white-space: nowrap;
  animation: marquee 400s linear infinite;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 28px;
  color: var(--fg-dim);
}
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee-track span { display: inline-flex; align-items: center; gap: 48px; }
.marquee-track .dot {
  display: inline-block;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--accent);
  vertical-align: middle;
  font-family: inherit;
}
```

Component:

```tsx
type Props = { items: string[] }

export default function Marquee({ items }: Props) {
  // Duplicate the items track so the animation's -50% translate loops seamlessly
  const oneTrack = (
    <span>
      {items.map((s) => (
        <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 48 }}>
          {s}<span className="dot" aria-hidden />
        </span>
      ))}
    </span>
  )
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {oneTrack}
        {oneTrack}
      </div>
    </div>
  )
}
```

## Acceptance criteria

- [ ] Marquee CSS rules present in `src/index.css`.
- [ ] Component renders two duplicated tracks (for seamless loop).
- [ ] Hovering pauses the animation.
- [ ] Edge fade applies (mask).
- [ ] `aria-hidden` on outer container.

## Test notes

Visual; no unit test.

## Edge cases

- The duplicated track is required because `@keyframes marquee` translates
  by `-50%` — without the duplication the track jumps when it loops.
