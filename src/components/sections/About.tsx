import { useLanguage } from '../../i18n/useLanguage'
import Section from '../layout/Section'

/**
 * About — Profile narrative section.
 *
 * Reads the narrative paragraph from `content.about.narrative` via `useLanguage()`,
 * and renders it inside the Section wrapper with locale-aware heading.
 */
export default function About() {
  const { content, t } = useLanguage()

  return (
    <Section id="about" title={t('navAbout')}>
      <p className="text-lg text-text-secondary leading-relaxed">
        {content.about.narrative}
      </p>
    </Section>
  )
}
