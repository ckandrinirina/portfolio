/**
 * ProjectCard — a single grid tile in the Work view.
 *
 * Renders the project artwork, number/client, name, category, summary, and tech
 * tag chips with the `.proj-card` hover-shine (01-01). The whole tile is an
 * activatable control: `role="button"` + `tabIndex={0}` so it is keyboard
 * operable (Enter / Space) and mouse-clickable, calling `onOpen(project)`.
 *
 * A native `<button>` is avoided on purpose: it would wrap the artwork/markup in
 * button semantics and double-fire on keyboard (native click + our handler). A
 * role="button" div gives one activation path that we control explicitly.
 *
 * The `data-cursor` / `data-cursor-label` hooks let the custom Cursor (03-02)
 * switch to its labelled state over the card; the native focus ring is kept.
 */

import { useLanguage } from '../../i18n/useLanguage'
import type { Project } from '../../content/types'
import ProjectArt from './artwork/ProjectArt'

export interface ProjectCardProps {
  project: Project
  /** Open the detail modal for this project. App owns the modal state (04-01). */
  onOpen: (project: Project) => void
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t } = useLanguage()

  function activate() {
    onOpen(project)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      activate()
    }
  }

  return (
    <div
      className="proj-card"
      role="button"
      tabIndex={0}
      aria-label={`${project.name} — ${t('readCase')}`}
      data-cursor
      data-cursor-label={t('readCase')}
      onClick={activate}
      onKeyDown={handleKeyDown}
    >
      <div className="proj-art">
        <ProjectArt id={project.id} />
      </div>

      <div className="proj-meta">
        <div className="proj-num-client">
          <span className="proj-num">{project.num}</span>
          <span> · {project.client}</span>
        </div>

        <div className="proj-name">{project.name}</div>
        <div className="proj-role">{project.category}</div>
        <div className="proj-desc">{project.desc}</div>

        <div className="proj-chips">
          <span className="proj-chip">{project.year}</span>
        </div>

        <div className="proj-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="proj-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
