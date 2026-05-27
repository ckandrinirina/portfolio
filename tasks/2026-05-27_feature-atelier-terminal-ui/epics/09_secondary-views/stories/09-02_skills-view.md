# 09-02 · SkillsView + `.skill-card` CSS

**Status:** TODO · **Size:** M · **Blocked by:** 03-03, 03-04, 05-06, 06-05

## Description

Render the 4 skill cards (2×2 grid on desktop). Each card has a giant decorative
letter background (`data-deco` attribute), a head (name + `count tools`), a
lead pill row, and a chip row.

## Files affected

- `src/views/SkillsView.tsx`
- `src/index.css` — `.skill-cards`, `.skill-card`, `.skill-card::before`
  (giant deco letter), `.skill-card .head`, `.skill-card .lead-list`,
  `.skill-card .other-list` rules verbatim (mockup ~1374–1424).
- `src/App.tsx` — swap PlaceholderSkills.

## Implementation notes

```tsx
export default function SkillsView() {
  const { t, content } = useLanguage()
  return (
    <div className="view-enter">
      <div className="eyebrow">{t('eyebrow.skills')}</div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title(t('title.skills')) }} />
      <p className="section-sub" dangerouslySetInnerHTML={{ __html: inline(t('sub.skills')) }} />

      <div className="skill-cards">
        {content.skills.map((s, i) => (
          <div key={s.cat} className={'skill-card stg-' + (i + 1)} data-deco={s.deco}>
            <div className="head">
              <span className="name">{s.cat}</span>
              <span className="count">{s.lead.length + s.items.length} {t('skills.toolsUnit') ?? 'tools'}</span>
            </div>
            <div className="lead-list">{s.lead.map((it) => <span key={it}>{it}</span>)}</div>
            <div className="other-list">{s.items.map((it) => <span key={it}>{it}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Acceptance criteria

- [ ] CSS present (note: `data-deco` attribute is read via CSS `content: attr(data-deco)`).
- [ ] Renders 4 cards.
- [ ] Each card shows the deco letter, head, lead pills (orange-filled),
      and outline chips.
- [ ] `t('skills.toolsUnit')` localizes "tools" / "outils".

## Test notes

Render, assert each `s.cat` is present, each card's `data-deco` matches.

## Edge cases

- None.
