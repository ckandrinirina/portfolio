/**
 * ContactView — key/value card with copy buttons + pitch card.
 *
 * Reads `content.contact` from useLanguage(). Renders a two-card
 * .contact-grid:
 *  1. Key/value card (.contact-card): meta rows (email, location, status)
 *     + languages row; copyable rows have a per-value copy button that shows
 *     "✓ copied" for ~1400ms then reverts.
 *  2. Pitch card (.contact-pitch): the pitch paragraph.
 *
 * Copy logic: navigator.clipboard?.writeText(value) → setCopied(key) →
 *   setTimeout(() => setCopied(null), 1400).
 * Cards carry .reveal class targeted by useScrollReveal.
 */

import { useState, useCallback } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import type { ContactMetaRow } from '../content/types'

const COPIED_DURATION_MS = 1400

// ---------------------------------------------------------------------------
// Sub-component: one contact row (optionally copyable)
// ---------------------------------------------------------------------------

type ContactRowProps = {
  row: ContactMetaRow
  isCopied: boolean
  onCopy: (value: string, key: string) => void
  copyLabel: string
  copiedLabel: string
}

function ContactRow({
  row,
  isCopied,
  onCopy,
  copyLabel,
  copiedLabel,
}: ContactRowProps) {
  return (
    <div className="contact-row">
      <span className="contact-key">{row.label}</span>
      {row.href ? (
        <a
          href={row.href}
          className="contact-val"
          target={row.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={
            row.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
          }
        >
          {row.value}
        </a>
      ) : (
        <span className="contact-val">{row.value}</span>
      )}
      {row.copy && (
        <button
          type="button"
          className={['contact-copy', isCopied ? 'copied' : '']
            .join(' ')
            .trim()}
          onClick={() => onCopy(row.value, row.label)}
          aria-label={
            isCopied
              ? `${row.label}: ${copiedLabel}`
              : `${copyLabel} ${row.label}`
          }
        >
          {isCopied ? `✓ ${copiedLabel}` : copyLabel}
        </button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-component: languages row (always non-copyable)
// ---------------------------------------------------------------------------

type LanguagesRowProps = {
  languages: string[]
  label: string
}

function LanguagesRow({ languages, label }: LanguagesRowProps) {
  return (
    <div className="contact-row">
      <span className="contact-key">{label}</span>
      <span className="contact-val">{languages.join(' · ')}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export default function ContactView() {
  const { content, t } = useLanguage()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = useCallback(async (value: string, key: string) => {
    await navigator.clipboard?.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), COPIED_DURATION_MS)
  }, [])

  const copyLabel = t('copy')
  const copiedLabel = t('copied')

  return (
    <div className="view-inner">
      <p className="eyebrow">{t('eyebrowContact')}</p>
      <h2 className="section-title">{t('navContact')}</h2>

      {/* Accessible live region to announce copy success */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copiedKey ? `${copiedKey}: ${copiedLabel}` : ''}
      </div>

      <div className="contact-grid">
        {/* Key/value card */}
        <div className="contact-card reveal">
          {content.contact.meta.map((row) => (
            <ContactRow
              key={row.label}
              row={row}
              isCopied={copiedKey === row.label}
              onCopy={handleCopy}
              copyLabel={copyLabel}
              copiedLabel={copiedLabel}
            />
          ))}
          <LanguagesRow
            languages={content.contact.languages}
            label={t('navLanguages')}
          />
        </div>

        {/* Pitch card */}
        <div className="contact-pitch reveal">
          <p className="pitch-headline">{content.contact.pitch}</p>
        </div>
      </div>
    </div>
  )
}
