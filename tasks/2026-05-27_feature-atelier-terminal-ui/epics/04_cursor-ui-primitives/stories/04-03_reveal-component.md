# 04-03 · `Reveal.tsx` (letter-by-letter)

**Status:** TODO · **Size:** M · **Blocked by:** 01-05 (`@keyframes charIn`)

## Description

`<Reveal text="Erick" italic />` renders each character in a span with a
per-character animation delay so they cascade in. Used by HomeView for the
hero name.

## Files affected

- `src/components/ui/Reveal.tsx`
- `src/components/ui/Reveal.test.tsx`

## Implementation notes

```tsx
type Props = {
  text: string
  delay?: number       // base delay in seconds
  italic?: boolean
  perChar?: number     // seconds per char
}

export default function Reveal({ text, delay = 0, italic = false, perChar = 0.04 }: Props) {
  const chars = [...text]
  return (
    <span className={italic ? 'italic' : ''}>
      {chars.map((c, i) => (
        <span
          key={i}
          className="char"
          style={{ animationDelay: `${delay + i * perChar}s` }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  )
}
```

The `.char` class with `animation: charIn 0.6s var(--ease) forwards` is added
to `src/index.css` in this story (small CSS addition):

```css
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: charIn 0.6s var(--ease) forwards;
}
.italic { font-style: italic; }
```

## Acceptance criteria

- [ ] Renders `text.length` spans with class `char`.
- [ ] Each span has the correct `animationDelay` (e.g., "Erick" with
      `perChar=0.04` → 0s, 0.04s, 0.08s, 0.12s, 0.16s).
- [ ] Spaces are rendered as ` ` (non-breaking) inside their own char span.
- [ ] `italic` prop adds the `.italic` class on the outer wrapper.
- [ ] Unit test verifies span count + delay attribute.

## Test notes

```tsx
render(<Reveal text="Hi" />)
const chars = screen.getAllByText(/^.$/)
expect(chars).toHaveLength(2)
expect(chars[1].style.animationDelay).toBe('0.04s')
```

## Edge cases

- Emoji / surrogate-pair characters: use `[...text]` (spreader) instead of
  `text.split('')` to correctly split by grapheme units. (`split('')` would
  split a surrogate pair.)
