# 08-03 · ProjectCard component + `.proj-card` CSS

**Status:** TODO · **Size:** M · **Blocked by:** 08-01, 03-02, 03-05

## Description

Build `<ProjectCard project={p} onOpen={fn} />`. Renders the artwork header
with category + year chips, then the body (num · client, name, role, desc,
tags, actions). Click anywhere on the card opens the modal (`onOpen`).
Inside-actions stop propagation to allow distinct behaviour.

## Files affected

- `src/components/projects/ProjectCard.tsx`
- `src/components/projects/ProjectCard.test.tsx`
- `src/index.css` — `.proj-card`, `.proj-card .art`, `.proj-card .art-tag`,
  `.proj-card .art-year`, `.proj-card .body`, `.proj-card .body .num/name/meta/desc/tags/tag/actions`
  rules (verbatim from mockup lines ~1077–1185).

## Implementation notes

```tsx
import ProjectArt from './artwork/ProjectArt'
import { useLanguage } from '@/i18n/useLanguage'
import type { Project } from '@/content/projects'

type Props = { project: Project; onOpen: () => void; idx?: number }

export default function ProjectCard({ project: p, onOpen, idx = 0 }: Props) {
  const { t } = useLanguage()
  return (
    <article
      className={'proj-card stg-' + Math.min(idx + 1, 8)}
      onClick={onOpen}
      data-cursor="hover"
    >
      <div className="art">
        <div className="art-tag">{p.category}</div>
        <div className="art-year">{p.year}</div>
        <ProjectArt id={p.id} />
      </div>
      <div className="body">
        <div className="num">{p.num} · {p.client}</div>
        <div className="name">{p.name}</div>
        <div className="meta"><span className="role">{p.role}</span></div>
        <div className="desc">{p.desc}</div>
        <div className="tags">
          {p.tags.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
          {p.tags.length > 4 && <span className="tag">+{p.tags.length - 4}</span>}
        </div>
        <div className="actions">
          <button type="button" onClick={(e) => { e.stopPropagation(); onOpen() }}>
            {t('project.readCase')} <span>→</span>
          </button>
          {p.link && p.link !== '#' && (
            <>
              <span className="sep">·</span>
              <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                {t('project.visitLive')} <span>↗</span>
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
```

## Acceptance criteria

- [ ] All `.proj-card*` CSS rules present (verbatim).
- [ ] Card renders all fields from `project`.
- [ ] Clicking the card body calls `onOpen`.
- [ ] Tags clip at 4 + a `+N` chip.
- [ ] When `link === '#'` or `null`, the "Visit live" anchor is not rendered.
- [ ] Stop-propagation works: clicking the "Visit live" anchor doesn't also
      fire the card's `onClick`.
- [ ] `data-cursor="hover"` set for custom-cursor expand.

## Test notes

```tsx
const onOpen = vi.fn()
render(<ProjectCard project={PROJECTS[0]} onOpen={onOpen} />)
fireEvent.click(screen.getByText(PROJECTS[0].name))
expect(onOpen).toHaveBeenCalled()
```

## Edge cases

- The `stg-N` class is for the legacy mount stagger; the `.in` reveal will
  override and use scroll-reveal instead. Keep both — `stg-N` is harmless.
