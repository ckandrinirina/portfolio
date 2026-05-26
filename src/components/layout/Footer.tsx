import { useLanguage } from '../../i18n/useLanguage'
import { SITE_META } from '../../lib/constants'
import Container from './Container'
import SocialLinks from '../ui/SocialLinks'

/**
 * Footer — page-wide footer landmark.
 *
 * Renders a <footer> (implicit role="contentinfo") containing:
 *   - SocialLinks (GitHub + LinkedIn icon links)
 *   - A dynamic copyright notice (year computed at render time)
 *   - A localised "built with" note via useLanguage().t('builtWith')
 *
 * Pure presentational component — no props, no local state.
 * Colours adapt to light/dark theme via Tailwind dark: variants.
 */
export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-8 dark:border-gray-700 dark:bg-gray-900">
      <Container>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Social icon links (GitHub + LinkedIn) */}
          <SocialLinks size="md" />

          {/* Copyright notice — year is dynamic, never hardcoded */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {year} {SITE_META.name}
          </p>

          {/* Localised "built with" note */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('builtWith')}
          </p>
        </div>
      </Container>
    </footer>
  )
}
