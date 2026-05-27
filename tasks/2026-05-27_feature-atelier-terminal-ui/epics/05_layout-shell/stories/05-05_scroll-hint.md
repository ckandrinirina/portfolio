# 05-05 · ScrollHint component + `.scroll-hint` CSS

**Status:** TODO · **Size:** S · **Blocked by:** 05-04, 01-05

## Description

`<ScrollHint visible label onClick />` — sticky chip at the bottom of every
view that says "Scroll for {next route name}". Fades in when the user reaches
the view's scroll bottom. Clicking it triggers `onClick()` which navigates to
the next route.

## Files affected

- `src/components/layout/ScrollHint.tsx`
- `src/index.css` — append `.scroll-hint` rules.

## Implementation notes

```css
.scroll-hint {
  position: sticky;
  bottom: 14px;
  margin: 56px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s var(--ease);
  z-index: 5;
}
.scroll-hint.visible { opacity: 1; }
.scroll-hint .label {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--bg);
  padding: 6px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  pointer-events: auto;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.scroll-hint .label:hover { color: var(--accent); border-color: var(--accent); }
.scroll-hint .label .arrow {
  display: inline-block;
  margin-left: 8px;
  animation: bounce 1.6s ease-in-out infinite;
  color: var(--accent);
}
```

```tsx
import { useLanguage } from '@/i18n/useLanguage'

type Props = { visible: boolean; nextLabel: string; onClick: () => void }

export default function ScrollHint({ visible, nextLabel, onClick }: Props) {
  const { t } = useLanguage()
  // t('scroll.for') has placeholder {next}; do simple replace
  const template = t('scroll.for') ?? 'Scroll for {next}'
  const text = template.replace('{next}', nextLabel)
  return (
    <div className={'scroll-hint' + (visible ? ' visible' : '')}>
      <button type="button" className="label" onClick={onClick}>
        {text}
        <span className="arrow">↓</span>
      </button>
    </div>
  )
}
```

## Acceptance criteria

- [ ] CSS rules present.
- [ ] Component renders the localized "Scroll for X" text.
- [ ] When `visible=false`, opacity is 0 and pointer-events are none (still in DOM).
- [ ] When `visible=true`, the chip is interactive; clicking calls `onClick`.

## Test notes

Render with `visible={true}` and verify clicking the button fires the callback.

## Edge cases

- The chip is sticky relative to its containing block. It's placed at the end
  of `.view-inner` content; if a view's content is shorter than the view
  height, the sticky positioning still anchors at the bottom of the inner —
  fine; the chip just sits at the visible bottom.
