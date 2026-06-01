/**
 * WorkView — the `work` route: the selected-work gallery.
 *
 * Verbatim port of the "Atelier Terminal" Work view: an `.eyebrow`, a serif
 * `.section-title` with an accent `.mark` span, a `.section-sub` with `<strong>`
 * emphasis, then a `.work-grid` of `ProjectCard`s sourced from
 * `content/projects.ts`. Each card's `onOpen` is wired to the supplied callback;
 * App (04-01) owns the modal state and opens `ProjectModal` for the chosen
 * project.
 *
 * The root stays `.view-inner` (the scroll container App queries per view); the
 * reference's editorial header lives inside it.
 *
 * SOLID notes:
 *   - S: lays out the grid only; the tile renders in `ProjectCard`.
 *   - I: narrow contract — a single `onOpen` callback.
 *   - D: depends on the `Project` type + the projects dataset, not App state.
 */

import { useLanguage } from '../i18n/useLanguage'
import { projects } from '../content/projects'
import type { Project } from '../content/types'
import ProjectCard from '../components/projects/ProjectCard'

export interface WorkViewProps {
  /** Open the detail modal for a project. App owns the modal state (04-01). */
  onOpen: (project: Project) => void
}

export default function WorkView({ onOpen }: WorkViewProps) {
  const { t } = useLanguage()

  return (
    <div className="view-inner">
      <p className="eyebrow">{t('eyebrowWork')}</p>
      <h2 className="section-title">
        {t('workTitleLead')}
        <span className="mark">{t('workTitleMark')}</span>
        {t('workTitleTail')}
      </h2>
      <p className="section-sub">
        {t('workSubLead')}
        <strong>{t('workSubStrong1')}</strong>
        {t('workSubMid')}
        <strong>{t('workSubStrong2')}</strong>
        {t('workSubTail')}
      </p>

      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}
