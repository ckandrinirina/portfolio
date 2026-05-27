# 07-05 · Now-card

**Status:** TODO · **Size:** S · **Blocked by:** 07-01

## Description

Add the "Now building" card under the hero (left half of `.home-grid`).
Header (icon + label), body (with em markers), meta row (client · period).

## Files affected

- `src/views/HomeView.tsx`
- `src/index.css` — `.now-card` rules (verbatim from mockup).

## Implementation notes

CSS (verbatim, including the orange radial gradient overlay):

```css
.now-card {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 22px 24px;
  background: var(--bg-2);
  position: relative;
  overflow: hidden;
}
.now-card::before {
  content: "";
  position: absolute; top: 0; right: 0;
  width: 120px; height: 120px;
  background: radial-gradient(circle, var(--accent-soft) 0%, transparent 60%);
  pointer-events: none;
}
.now-card .head {
  display: flex; align-items: center; gap: 10px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}
.now-card .head .ico {
  width: 14px; height: 14px;
  border: 1.5px solid var(--accent);
  border-radius: 50%;
  position: relative;
}
.now-card .head .ico::after {
  content: "";
  position: absolute; top: 2px; left: 2px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  animation: blink 1.8s infinite;
}
.now-card .body { font-size: 14px; color: var(--fg-soft); line-height: 1.6; }
.now-card .body em {
  font-style: italic;
  font-family: var(--font-serif);
  color: var(--accent);
  font-size: 1.15em;
}
.now-card .meta {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--line);
  display: flex; justify-content: space-between;
  font-size: 11px;
  color: var(--muted);
}
```

JSX inside `.home-grid`:

```tsx
<div className="now-card reveal" style={{ transitionDelay: '0.05s' }}>
  <div className="head"><span className="ico" /><span>{content.now.label}</span></div>
  <div className="body" dangerouslySetInnerHTML={{ __html: renderInline(content.now.body) }} />
  <div className="meta">
    <span>{content.now.meta1}</span>
    <span>{content.now.meta2}</span>
  </div>
</div>
```

(`renderInline` is the same helper from 07-01.)

## Acceptance criteria

- [ ] CSS present.
- [ ] Card renders with localized label, body, and 2-column meta row.
- [ ] `**bold**` and `*em*` markers in the body resolve to `<strong>` / `<em>`.
- [ ] The orange dot in the `.head .ico` blinks.

## Test notes

Render-only smoke test.

## Edge cases

- None.
