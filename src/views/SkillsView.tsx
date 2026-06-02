/**
 * SkillsView — 2-column grid of skill cards.
 *
 * Verbatim port of the "Atelier Terminal" Skills view: an `.eyebrow`, a serif
 * `.section-title` with an accent `.mark` span, a `.section-sub` with `<strong>`
 * emphasis, then a `.skill-cards` grid of `.skill-card`s. Each card carries a
 * `data-deco` watermark letter (rendered via the CSS `::before`
 * `content: attr(data-deco)`), a `.head` with `.name` + `.count`, a `.lead-list`
 * of solid accent pills, and an `.other-list` of outlined pills.
 *
 * Reads `content.skillCards` + header labels from useLanguage(). Each
 * `.skill-card` is targeted by useScrollReveal and carries a `stg-N` stagger.
 */

import { useLanguage } from '../i18n/useLanguage'
import type { SkillCard } from '../content/types'

// ---------------------------------------------------------------------------
// Sub-component: one skill card
// ---------------------------------------------------------------------------

type SkillCardItemProps = {
  card: SkillCard
  /** 1-based stagger position. */
  stagger: number
  /** Localised "{n} tools" count label, already interpolated. */
  countLabel: string
}

function SkillCardItem({ card, stagger, countLabel }: SkillCardItemProps) {
  return (
    <div className={`skill-card stg-${stagger}`} data-deco={card.deco}>
      <div className="head">
        <span className="name">{card.title}</span>
        <span className="count">{countLabel}</span>
      </div>
      <div className="lead-list">
        {card.lead.map((pill) => (
          <span key={pill}>{pill}</span>
        ))}
      </div>
      <div className="other-list">
        {card.items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export default function SkillsView() {
  const { content, t } = useLanguage()

  return (
    <div className="view-inner">
      <p className="eyebrow">{t('eyebrowSkills')}</p>
      <h2 className="section-title">
        {t('skillsTitleLead')}
        <span className="mark">{t('skillsTitleMark')}</span>
        {t('skillsTitleTail')}
      </h2>
      <p className="section-sub">
        {t('skillsSubLead')}
        <strong>{t('skillsSubStrong')}</strong>
        {t('skillsSubTail')}
      </p>

      <div className="skill-cards">
        {content.skillCards.map((card, i) => (
          <SkillCardItem
            key={card.title}
            card={card}
            stagger={i + 1}
            countLabel={`${card.lead.length + card.items.length} ${t('skillsToolsLabel')}`}
          />
        ))}
      </div>
    </div>
  )
}
