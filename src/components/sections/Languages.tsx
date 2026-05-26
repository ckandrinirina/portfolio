import { useLanguage } from '../../i18n/useLanguage'
import Section from '../layout/Section'
import { ui } from '../../i18n/ui'

export default function Languages() {
  const { locale, content } = useLanguage()

  // Get the section title from UI labels based on current locale
  const sectionTitle = ui[locale].navLanguages

  return (
    <Section id="languages" title={sectionTitle}>
      <ul className="space-y-4">
        {content.spokenLanguages.map((lang) => (
          <li key={lang.language} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <span className="font-semibold text-text-primary">{lang.language}</span>
            <span className="text-text-secondary text-sm sm:text-base">{lang.proficiency}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
