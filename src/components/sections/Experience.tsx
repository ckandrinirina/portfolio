/**
 * Experience.tsx
 *
 * Renders the professional experience section.
 *
 * Content is read from `content.experience[]` via `useLanguage()` and each role
 * is displayed as a `Card` component in reverse-chronological order (most-recent-
 * first). Order is assumed to be enforced by the content data (`fr.ts` / `en.ts`);
 * this component renders the array as-is. NOTE: if a future content update
 * reorders the experience array, the displayed order will silently change here too.
 *
 * Each card shows:
 *   - Company name (<h3>)
 *   - Job title (<p>)
 *   - Employment period (<p>)
 *   - Tech highlights as Badge chips
 *   - Project bullets as a <ul>/<li> list
 *
 * Wrapped inside the shared `Section` layout component which provides the
 * `<section id="experience">`, the `<h2>` heading, and the scroll-reveal animation.
 */

import Section from '../layout/Section'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { useLanguage } from '../../i18n/useLanguage'
import type { ExperienceEntry } from '../../content/types'

// ---------------------------------------------------------------------------
// Sub-component: one role card
// ---------------------------------------------------------------------------

type ExperienceCardProps = {
  entry: ExperienceEntry
}

function ExperienceCard({ entry }: ExperienceCardProps) {
  return (
    <div data-testid="experience-card">
      <Card>
        {/* Company name + role title */}
        <h3 className="text-lg font-semibold text-text-primary">{entry.company}</h3>
        <p className="mt-1 text-sm font-medium text-brand-500">{entry.role}</p>

        {/* Employment period */}
        <p className="mt-1 text-xs text-text-secondary">{entry.period}</p>

        {/* Tech highlights as Badge chips */}
        {entry.techHighlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.techHighlights.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        )}

        {/* Project bullets */}
        {entry.projects.length > 0 && (
          <ul className="mt-4 space-y-2">
            {entry.projects.map((project) => (
              <li key={project.name} className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">{project.name}</span>
                {project.description && (
                  <span> — {project.description}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Experience() {
  const { content, t } = useLanguage()

  return (
    <Section id="experience" title={t('navExperience')}>
      {/* Cards grid — stacks on mobile, comfortable readable width on desktop.
          Order reflects content data order, which must remain most-recent-first.
          See NOTE in file header regarding silent reorder risk. */}
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        data-testid="experience-cards"
      >
        {content.experience.map((entry) => (
          <ExperienceCard key={`${entry.company}-${entry.period}`} entry={entry} />
        ))}
      </div>
    </Section>
  )
}
