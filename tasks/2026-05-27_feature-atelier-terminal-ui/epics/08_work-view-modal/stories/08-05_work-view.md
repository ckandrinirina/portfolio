# 08-05 · WorkView assembly + `.work-grid` CSS

**Status:** TODO · **Size:** M · **Blocked by:** 08-03, 03-02, 03-05, 05-06, 06-05

## Description

Build `<WorkView onOpenProject />`. Renders the eyebrow + section title +
subtitle, then a 2-column grid of `<ProjectCard>`s. Replace the placeholder
in `App.tsx` and wire `openProject` state in App.

## Files affected

- `src/views/WorkView.tsx`
- `src/views/WorkView.test.tsx`
- `src/index.css` — `.work-grid` rule.
- `src/App.tsx` — replace `PlaceholderWork` with `<WorkView onOpenProject={setOpenProject} />`
  and mount `<ProjectModal project={openProject} onClose={() => setOpenProject(null)}/>`.

## Implementation notes

```css
.work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 880px) { .work-grid { grid-template-columns: 1fr; gap: 20px; } }
```

```tsx
import ProjectCard from '@/components/projects/ProjectCard'
import { PROJECTS, type Project } from '@/content/projects'
import { useLanguage } from '@/i18n/useLanguage'

type Props = { onOpenProject: (p: Project) => void }

export default function WorkView({ onOpenProject }: Props) {
  const { t } = useLanguage()
  return (
    <div className="view-enter">
      <div className="eyebrow">{t('eyebrow.work')}</div>
      <h2
        className="section-title"
        dangerouslySetInnerHTML={{ __html: titleHtml(t('title.work')) }}
      />
      <p className="section-sub" dangerouslySetInnerHTML={{ __html: renderInline(t('sub.work')) }} />

      <div className="work-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} idx={i} onOpen={() => onOpenProject(p)} />
        ))}
      </div>
    </div>
  )
}

function titleHtml(s: string) {
  // <mark>…</mark> → <span class="mark">…</span>
  return s.replace(/<mark>(.+?)<\/mark>/g, '<span class="mark">$1</span>')
}
```

`t('sub.work')` is a new key — add to `ui.ts` with FR/EN values pulled from
the mockup's `section-sub` strings for the Work view.

## Acceptance criteria

- [ ] `.work-grid` CSS present.
- [ ] Renders 8 cards via PROJECTS.
- [ ] Title's `<mark>` markers resolve to `.mark` span.
- [ ] Clicking any card calls `onOpenProject(project)`.
- [ ] In App, `openProject` becomes truthy → `<ProjectModal>` opens; close clears it.
- [ ] At ≤880px, grid is one column.

## Test notes

Render the view with a stub `onOpenProject`; click the first card by its
visible name; expect callback called with `PROJECTS[0]`.

## Edge cases

- `dangerouslySetInnerHTML` is safe here (content from typed modules — no
  user input). Document in source comment.
