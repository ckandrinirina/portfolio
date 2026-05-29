/**
 * ExperienceView — timeline of professional roles.
 *
 * Reads `content.timeline` from useLanguage(), renders a reverse-chronological
 * vertical timeline using the .timeline / .tl-item CSS classes from Epic 01.
 * Items carry the .tl-item class targeted by useScrollReveal.
 */

import { useLanguage } from '../i18n/useLanguage'
import type { TimelineEntry } from '../content/types'

// ---------------------------------------------------------------------------
// Sub-component: one timeline entry
// ---------------------------------------------------------------------------

type TlItemProps = {
  entry: TimelineEntry
}

function TlItem({ entry }: TlItemProps) {
  return (
    <div className="tl-item">
      <div className="tl-year">{entry.year}</div>
      <div className="tl-role">{entry.role}</div>
      <div className="tl-co">{entry.company}</div>
      <div className="tl-desc">{entry.desc}</div>
      <div className="tl-stack">
        {entry.stack.map((tag) => (
          <span key={tag} className="tl-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export default function ExperienceView() {
  const { content, t } = useLanguage()

  return (
    <div className="view-inner">
      <p className="eyebrow">{t('eyebrowExperience')}</p>
      <h2 className="section-title">{t('navExperience')}</h2>

      <div className="timeline">
        {content.timeline.map((entry) => (
          <TlItem key={`${entry.year}-${entry.company}`} entry={entry} />
        ))}
      </div>
    </div>
  )
}
