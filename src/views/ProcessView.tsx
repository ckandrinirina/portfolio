/**
 * ProcessView — five numbered principles.
 *
 * Verbatim port of the "Atelier Terminal" Process view: an `.eyebrow`, a serif
 * `.section-title` with an accent `.mark` span, a `.section-sub` with `<strong>`
 * emphasis, then a `.process-list` of `.process-item` rows. Each row is a
 * `80px / 1fr` grid of a serif `.process-num` accent and a `.process-content`
 * holding a serif `<h3>` title and a `<p>` body.
 *
 * Reads `content.process` + header labels from useLanguage(). Each
 * `.process-item` is targeted by useScrollReveal and carries a `stg-N` stagger.
 */

import { useLanguage } from '../i18n/useLanguage'
import type { ProcessPrinciple } from '../content/types'

// ---------------------------------------------------------------------------
// Sub-component: one process principle
// ---------------------------------------------------------------------------

type ProcessItemProps = {
  principle: ProcessPrinciple
  /** 1-based stagger position. */
  stagger: number
}

function ProcessItem({ principle, stagger }: ProcessItemProps) {
  return (
    <div className={`process-item stg-${stagger}`}>
      <div className="process-num" aria-hidden="true">
        {principle.num}
      </div>
      <div className="process-content">
        <h3>{principle.title}</h3>
        <p>{principle.body}</p>
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
      <h2 className="section-title">
        {t('processTitleLead')}
        <span className="mark">{t('processTitleMark')}</span>
        {t('processTitleTail')}
      </h2>
      <p className="section-sub">
        {t('processSubLead')}
        <strong>{t('processSubStrong1')}</strong>
        {t('processSubMid')}
        <strong>{t('processSubStrong2')}</strong>
        {t('processSubTail')}
      </p>

      <div className="process-list">
        {content.process.map((principle, i) => (
          <ProcessItem
            key={principle.num}
            principle={principle}
            stagger={i + 1}
          />
        ))}
      </div>
    </div>
  )
}
