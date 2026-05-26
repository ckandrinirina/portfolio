/**
 * useLanguage — context accessor hook.
 *
 * Returns { locale, setLocale, content, t } when called inside a LanguageProvider.
 * Throws a descriptive error if called outside one so the developer gets an
 * actionable message rather than a silent null-reference failure.
 */

import { useContext } from 'react'
import { LanguageContext, type LanguageContextValue } from './LanguageProvider'

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (ctx === null) {
    throw new Error(
      'useLanguage must be used within a LanguageProvider. ' +
        'Wrap your component tree with <LanguageProvider>.',
    )
  }
  return ctx
}
