/**
 * ProcessView — 5 numbered principles.
 *
 * Reads `content.process` from useLanguage(), renders a vertical
 * .process-list of .process-item elements, each with a .process-num,
 * .process-title, and .process-desc.
 * Items carry the .process-item class targeted by useScrollReveal.
 */

import { useLanguage } from '../i18n/useLanguage'
import type { ProcessPrinciple } from '../content/types'

// ---------------------------------------------------------------------------
// Sub-component: one process principle
// ---------------------------------------------------------------------------

type ProcessItemProps = {
  principle: ProcessPrinciple
}

function ProcessItem({ principle }: ProcessItemProps) {
  return (
    <div className="process-item">
      <div className="process-num" aria-hidden="true">
        {principle.num}
      </div>
      <div className="process-content">
        <div className="process-title">{principle.title}</div>
        <div className="process-desc">{principle.body}</div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export default function ProcessView() {
  const { content, t } = useLanguage()

  return (
    <div className="view-inner">
      <p className="eyebrow">{t('eyebrowProcess')}</p>
      <h2 className="section-title">{t('navProcess')}</h2>

      <div className="process-list">
        {content.process.map((principle) => (
          <ProcessItem key={principle.num} principle={principle} />
        ))}
      </div>
    </div>
  )
}
