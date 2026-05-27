# 08-02 · 8 project SVG artwork components

**Status:** TODO · **Size:** L · **Blocked by:** —

## Description

Create 8 React components, one per project, that render the bespoke inline
SVG artwork from the mockup. Verbatim — colors, paths, animations.

## Files affected

- `src/components/projects/artwork/SokaArt.tsx`
- `src/components/projects/artwork/SokaLiveArt.tsx`
- `src/components/projects/artwork/LudokaArt.tsx`
- `src/components/projects/artwork/EerArt.tsx`
- `src/components/projects/artwork/ShoyoArt.tsx`
- `src/components/projects/artwork/OcrArt.tsx`
- `src/components/projects/artwork/HappyArt.tsx`
- `src/components/projects/artwork/TheseisArt.tsx`

## Implementation notes

Source: the mockup's `ProjectArt` function (from extracted `/tmp/script-37f20218.js`
lines 199–457). Each `case 'soka':` block becomes a single component.

For each component:
1. Copy the JSX as-is.
2. Wrap in a default-exported function component.
3. Camel-case any HTML/JSX-incompatible attributes: e.g.
   - `stop-color` → `stopColor`
   - `stop-opacity` → `stopOpacity`
   - `stroke-width` → `strokeWidth`
   - `stroke-dasharray` → `strokeDasharray`
   - `font-family` → `fontFamily`
   - `font-style` → `fontStyle`
   - `text-anchor` → `textAnchor`
   - `letter-spacing` → `letterSpacing`
   - `preserveAspectRatio` → already camel
   - `<animate attributeName="y" .../>` → JSX-friendly: `attributeName="y"` is fine (already a string attr).
4. Preserve animations (`<animate />` and `repeatCount` etc.).
5. Use `viewBox` (already correct case).

Example — `SokaArt.tsx`:

```tsx
export default function SokaArt() {
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g-soka" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a2920" />
          <stop offset="1" stopColor="#0d0a08" />
        </linearGradient>
        <radialGradient id="r-soka" cx="0.7" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#E08660" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E08660" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="340" fill="url(#g-soka)" />
      <rect width="600" height="340" fill="url(#r-soka)" />
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={50 + c * 60}
            cy={60 + r * 45}
            r={(c + r) % 4 === 0 ? 12 : 6}
            fill="none"
            stroke="#E08660"
            strokeOpacity={0.4}
            strokeWidth="1"
          />
        ))
      )}
      <circle cx="450" cy="170" r="60" fill="none" stroke="#E8C547" strokeWidth="2" strokeDasharray="4 6" />
      <text x="450" y="178" textAnchor="middle" fill="#E8C547" fontFamily="serif" fontStyle="italic" fontSize="38">$</text>
      <text x="48" y="306" fontFamily="monospace" fontSize="11" fill="#94886F" letterSpacing="0.1em">SOKA · POINTS · USDC · GAMES</text>
    </svg>
  )
}
```

Repeat for the other 7 (Source: SVG blocks at lines 227–452 of the mockup React).

## Acceptance criteria

- [ ] All 8 component files exist and default-export a React component.
- [ ] Each renders a single `<svg>` root with the mockup's exact paths, colors, gradients, and animations.
- [ ] No HTML lower-cased attribute (would warn in React dev).
- [ ] `npm run build` succeeds.
- [ ] Visual check: rendering any one component as `<div style="width:400px; aspect-ratio: 16/9">` shows the expected artwork.

## Test notes

Just compilation + render-without-throw — see 08-01's test.

## Edge cases

- Inside `<text>` JSX with template literals (e.g., `{` `"`type"`:`}`), keep
  the original mockup's JSX-escape pattern: `{ '"type":' }` etc. The mockup
  source uses both bare text and `{ '…' }` literals — preserve verbatim.
