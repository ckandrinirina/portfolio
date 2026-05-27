# 08-04 · ProjectModal + `.modal-*` CSS

**Status:** TODO · **Size:** L · **Blocked by:** 08-01, 03-02, 03-05

## Description

`<ProjectModal project onClose />` — fullscreen modal with backdrop, large
artwork header, close button (×), and modal body containing the num · category,
name, meta (role · client · year), description, role/impact columns, Stack
chip row, and action buttons (Visit live, Close).

## Files affected

- `src/components/projects/ProjectModal.tsx`
- `src/components/projects/ProjectModal.test.tsx`
- `src/index.css` — `.modal-bg`, `.modal`, `.modal .art`, `.modal .close`,
  `.modal-body`, `.modal-body .num/name/meta/desc/row/col/stack/actions`
  rules verbatim (lines ~1187–1271).

## Implementation notes

```tsx
import { useEffect } from 'react'
import ProjectArt from './artwork/ProjectArt'
import { useLanguage } from '@/i18n/useLanguage'
import type { Project } from '@/content/projects'

type Props = { project: Project | null; onClose: () => void }

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage()
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null
  const { detail, link, num, category, name, role, client, year, desc } = project

  return (
    <div className="modal-bg open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" type="button" onClick={onClose} aria-label={t('project.close')}>×</button>
        <div className="art"><ProjectArt id={project.id} /></div>
        <div className="modal-body">
          <div className="num">{num} · {category}</div>
          <div className="name">{name}</div>
          <div className="meta">{role} · {client} · {year}</div>
          <div className="desc">{desc}</div>
          <div className="row">
            <div className="col">
              <h4>{t('project.myRole')}</h4>
              <p>{detail.role}</p>
            </div>
            <div className="col">
              <h4>{t('project.impact')}</h4>
              <p>{detail.impact}</p>
            </div>
          </div>
          <h4 style={{
            fontSize: '10.5px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--accent)', fontWeight: 500, marginBottom: 8,
          }}>{t('project.stack')}</h4>
          <div className="stack">
            {detail.stack.split(/ · | /).map((s, i) => s.trim() && <span key={i}>{s}</span>)}
          </div>
          <div className="actions">
            {link && link !== '#' && (
              <a href={link} target="_blank" rel="noreferrer" className="btn btn-primary">
                {t('project.visitLive')} <span className="arrow">↗</span>
              </a>
            )}
            <button type="button" className="btn" onClick={onClose}>{t('project.close')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Acceptance criteria

- [ ] All `.modal-*` CSS rules present.
- [ ] Renders nothing if `project === null`.
- [ ] Opens with the `.open` class (entry transition fires).
- [ ] Backdrop click closes.
- [ ] `Escape` key closes.
- [ ] `document.body.style.overflow = 'hidden'` while open; restored on close.
- [ ] Cleanup removes listener and restores body overflow.
- [ ] Stop-propagation on `.modal` so clicking inside doesn't close.

## Test notes

```tsx
const onClose = vi.fn()
render(<ProjectModal project={PROJECTS[0]} onClose={onClose} />)
expect(document.body.style.overflow).toBe('hidden')
fireEvent.keyDown(window, { key: 'Escape' })
expect(onClose).toHaveBeenCalled()
```

## Edge cases

- If a second modal renders before the first cleanup runs, the body overflow
  state could leak. Single-modal-at-a-time is the assumption — enforce
  via the App owning a single `openProject` state.
- Focus trap is not implemented in this story. Future a11y enhancement
  (covered in Epic 12 audit).
