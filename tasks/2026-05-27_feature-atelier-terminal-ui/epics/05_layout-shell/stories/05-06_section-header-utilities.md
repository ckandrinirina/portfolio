# 05-06 · Section header utilities

**Status:** TODO · **Size:** S · **Blocked by:** 01-02, 01-03

## Description

Append shared section header CSS used by every view's intro: `.eyebrow`
(small accent label with leading line), `.section-title` (large italic
serif with markup helpers `.roman` and `.mark`), and `.section-sub` (gray
intro paragraph).

## Files affected

- `src/index.css`

## Implementation notes

Verbatim from mockup (lines ~753–790):

```css
.eyebrow {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-flex; align-items: center; gap: 8px;
  margin-bottom: 18px;
}
.eyebrow::before {
  content: "";
  width: 24px; height: 1px;
  background: var(--accent);
}

.section-title {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(32px, 4.5vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--fg);
  margin-bottom: 14px;
  text-wrap: balance;
}
.section-title .roman {
  font-style: normal; font-family: var(--font-mono);
  font-size: 0.7em; vertical-align: 0.18em; color: var(--muted);
}
.section-title .mark {
  color: var(--accent);
  font-style: normal;
  font-family: var(--font-mono);
}

.section-sub {
  color: var(--fg-dim);
  font-size: 14px;
  line-height: 1.7;
  max-width: 620px;
  text-wrap: pretty;
  margin-bottom: 48px;
}
.section-sub strong { color: var(--fg); font-weight: 500; }
```

## Acceptance criteria

- [ ] All rules present.
- [ ] A test `<div class="eyebrow">…</div>` + `<h2 class="section-title">…</h2>` + `<p class="section-sub">…</p>` renders with the expected typography.
- [ ] `.mark` inside section-title appears in monospace orange.

## Test notes

Visual.

## Edge cases

- `text-wrap: balance` is supported in modern browsers (Chrome 114+, Safari 17.4+);
  older browsers fall back gracefully to default wrapping.
