# 09-03 · ProcessView + `.process-item` CSS

**Status:** TODO · **Size:** M · **Blocked by:** 03-03, 03-04, 05-06, 06-05

## Description

Render the 5 numbered principles. Each item: big italic serif number (left)
+ title (h3) + body paragraph (right). Hovering an item pushes its content
slightly right (`padding-left: 12px`).

## Files affected

- `src/views/ProcessView.tsx`
- `src/index.css` — `.process-list`, `.process-item`, `.process-item:hover`,
  `.process-num`, `.process-content h3 / p` rules (mockup ~1429–1468).
- `src/App.tsx` — swap PlaceholderProcess.

## Implementation notes

```tsx
export default function ProcessView() {
  const { t, content } = useLanguage()
  return (
    <div className="view-enter">
      <div className="eyebrow">{t('eyebrow.process')}</div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title(t('title.process')) }} />
      <p className="section-sub" dangerouslySetInnerHTML={{ __html: inline(t('sub.process')) }} />

      <div className="process-list">
        {content.process.map((p, i) => (
          <div key={p.n} className={'process-item stg-' + (i + 1)}>
            <div className="process-num">{p.n}</div>
            <div className="process-content">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Acceptance criteria

- [ ] CSS present.
- [ ] 5 principles render with numbered left column.
- [ ] At ≤600px, layout collapses to single column.

## Test notes

Render, assert 5 `process-item` nodes.

## Edge cases

- None.
