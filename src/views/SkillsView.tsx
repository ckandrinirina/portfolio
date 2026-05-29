/**
 * SkillsView — 2×2 grid of skill cards.
 *
 * Reads `content.skillCards` from useLanguage(), renders a 2-column
 * .skill-cards grid with .skill-card entries. Each card has a title,
 * lead pills (.skill-pill), and secondary chips (.skill-chip).
 * Items carry the .skill-card class targeted by useScrollReveal.
 */

import { useLanguage } from '../i18n/useLanguage'
import type { SkillCard } from '../content/types'

// ---------------------------------------------------------------------------
// Sub-component: one skill card
// ---------------------------------------------------------------------------

type SkillCardItemProps = {
  card: SkillCard
}

function SkillCardItem({ card }: SkillCardItemProps) {
  return (
    <div className="skill-card">
      <div className="skill-card-title">{card.title}</div>
      <div className="skill-pills">
        {card.lead.map((pill) => (
          <span key={pill} className="skill-pill">
            {pill}
          </span>
        ))}
      </div>
      <div className="skill-chips">
        {card.chips.map((chip) => (
          <span key={chip} className="skill-chip">
            {chip}
          </span>
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
      <h2 className="section-title">{t('navSkills')}</h2>

      <div className="skill-cards">
        {content.skillCards.map((card) => (
          <SkillCardItem key={card.title} card={card} />
        ))}
      </div>
    </div>
  )
}
