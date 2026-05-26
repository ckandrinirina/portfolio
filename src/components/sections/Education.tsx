import { useLanguage } from '../../i18n/useLanguage'
import { ui } from '../../i18n/ui'
import Section from '../layout/Section'

/**
 * Education — section component that renders a list of education entries
 * (qualifications, institutions, years) in an accessible table format.
 *
 * Reads `content.education[]` via `useLanguage()` and displays:
 *   - Master's Engineer degree (2018, École Supérieure Polytechnique d'Antananarivo)
 *   - Advanced web development training (2019, NEITIC)
 *   - Scientific Baccalaureate (2013, institution unknown)
 *
 * The Baccalaureate entry has an empty institution field; we render it
 * as "—" to avoid "undefined" or crashes.
 *
 * Renders in the Section wrapper with id="education" and a locale-aware
 * heading (Éducation / Education).
 */
export default function Education() {
  const { locale, content } = useLanguage()

  // Helper to get locale-specific label
  const t = (fr: string, en: string) => (locale === 'fr' ? fr : en)

  // Locale-aware column header labels
  const yearLabel = t('Année', 'Year')
  const qualificationLabel = t('Formation', 'Qualification')
  const institutionLabel = t('Établissement', 'Institution')

  // Locale-aware section title (from ui.ts)
  const sectionTitle = locale === 'fr' ? ui.fr.navEducation : ui.en.navEducation

  return (
    <Section id="education" title={sectionTitle}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-text-primary"
              >
                {yearLabel}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-text-primary"
              >
                {qualificationLabel}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-text-primary"
              >
                {institutionLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {content.education.map((entry, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {entry.year}
                </td>
                <td className="px-4 py-3 text-sm text-text-primary">
                  {entry.qualification}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {entry.institution ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
