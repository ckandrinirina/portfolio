/**
 * LanguageSwitcher — FR/EN toggle button group.
 *
 * Renders a `<div role="group">` containing two toggle buttons.
 * The container's aria-label is sourced from `t('languageSwitcher')`.
 * The active locale button has `aria-pressed="true"`; inactive has `"false"`.
 * Clicking the active button is a no-op (setLocale is not called).
 *
 * No required props — all data comes from useLanguage().
 * Keyboard-accessible: both buttons are focusable and activatable via Enter/Space.
 */

import { useLanguage } from '../../i18n/useLanguage'
import type { Locale } from '../../i18n/LanguageProvider'

const LOCALES: Locale[] = ['fr', 'en']
const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
}

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()

  function handleClick(target: Locale) {
    if (target === locale) return
    setLocale(target)
  }

  return (
    <div
      role="group"
      aria-label={t('languageSwitcher')}
      className="flex items-center gap-1"
    >
      {LOCALES.map((loc) => {
        const isActive = loc === locale
        return (
          <button
            key={loc}
            type="button"
            aria-pressed={isActive ? 'true' : 'false'}
            onClick={() => handleClick(loc)}
            className={[
              'rounded px-2 py-1 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              isActive
                ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            ].join(' ')}
          >
            {LOCALE_LABELS[loc]}
          </button>
        )
      })}
    </div>
  )
}
