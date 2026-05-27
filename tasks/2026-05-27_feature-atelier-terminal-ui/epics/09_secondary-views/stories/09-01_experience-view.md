# 09-01 · ExperienceView + `.timeline` CSS

**Status:** TODO · **Size:** M · **Blocked by:** 03-03, 03-04, 05-06, 06-05

## Description

Render the career timeline. Eyebrow + title + sub, then a vertical timeline
with dot markers and per-entry block (year · role · `at company` · desc · stack chips).

## Files affected

- `src/views/ExperienceView.tsx`
- `src/index.css` — `.timeline`, `.tl-item`, `.tl-item::before` (dot), `.tl-year`,
  `.tl-role`, `.tl-co`, `.tl-co .at`, `.tl-desc`, `.tl-stack`, `.tl-stack span` rules
  (verbatim from mockup lines ~1318–1366).
- `src/App.tsx` — swap PlaceholderExperience for `<ExperienceView />`.

## Implementation notes

```tsx
import { useLanguage } from '@/i18n/useLanguage'

export default function ExperienceView() {
  const { t, content } = useLanguage()
  return (
    <div className="view-enter">
      <div className="eyebrow">{t('eyebrow.experience')}</div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title(t('title.experience')) }} />
      <p className="section-sub" dangerouslySetInnerHTML={{ __html: inline(t('sub.experience')) }} />

      <div className="timeline">
        {content.experience.map((e, i) => (
          <div key={i} className={'tl-item stg-' + Math.min(i + 1, 8)}>
            <div className="tl-year">{e.year}</div>
            <div className="tl-role">{e.role}</div>
            <div className="tl-co"><span className="at">{t('experience.at') ?? 'at'}</span> {e.company}</div>
            <div className="tl-desc">{e.desc}</div>
            <div className="tl-stack">
              {e.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

(Reuses `title()` and `inline()` helpers from 08-05.)

## Acceptance criteria

- [ ] `.timeline` and `.tl-*` CSS present.
- [ ] Renders the 7 timeline entries with dot markers.
- [ ] Hovering an item enlarges its dot and fills it.
- [ ] Localized "at" word in `t('experience.at')`.

## Test notes

`expect(screen.getAllByText(/2018|2019|2020|2021|2024|2025/)).not.toHaveLength(0)`.

## Edge cases

- The timeline gradient (`linear-gradient(to bottom, transparent, var(--line-strong), var(--line-strong), transparent)`)
  is rendered via `.timeline::before` — make sure to include in the CSS block.
