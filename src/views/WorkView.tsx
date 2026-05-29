/**
 * WorkView — the `work` route: the selected-work grid.
 *
 * Renders the section eyebrow + `<h2>` title and a 2-column `.work-grid` of
 * `ProjectCard`s sourced from `content/projects.ts`. Each card's `onOpen` is
 * wired to the supplied callback; App (04-01) owns the modal state and passes a
 * handler that opens `ProjectModal` for the chosen project.
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
      <h2 className="section-title">{t('navWork')}</h2>

      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}
