/**
 * Projects section component.
 *
 * Reads `content.projects[]` via `useLanguage()` and renders each project as a
 * `Card` with its name, company/client attribution, description, and technology
 * `Badge` tags. The section uses the shared `Section` wrapper with
 * `id="projects"` and a responsive grid layout.
 *
 * Content/UI separation is maintained: no text is hardcoded here — all copy
 * comes from the active-locale content object.
 */

import { useLanguage } from '../../i18n/useLanguage'
import Section from '../layout/Section'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

export default function Projects() {
  const { content, t } = useLanguage()

  return (
    <Section id="projects" title={t('navProjects')}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.projects.map((project) => (
          <Card key={project.name}>
            {/* Project name */}
            <h3 className="mb-1 text-lg font-semibold text-text-primary">
              {project.name}
            </h3>

            {/* Company / client attribution */}
            <p className="mb-3 text-sm font-medium text-text-secondary">
              {project.company}
            </p>

            {/* Description */}
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">
              {project.description}
            </p>

            {/* Technology tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.techTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
