/**
 * Contact section — direct-links-only contact section.
 *
 * Renders an email mailto link, a WhatsApp wa.me link, SocialLinks (GitHub +
 * LinkedIn), and the owner's location as plain text. No contact form — per
 * spec §4 design decision on direct links only.
 *
 * Contact details are sourced from SITE_META in lib/constants.ts so they live
 * in one place. Locale-aware copy (intro text, heading) comes from useLanguage().
 * Location is city and country only; the full street address is never shown.
 */

import Section from '../layout/Section'
import SocialLinks from '../ui/SocialLinks'
import { useLanguage } from '../../i18n/useLanguage'
import { SITE_META } from '../../lib/constants'

export default function Contact() {
  const { content, t } = useLanguage()
  const { intro, location } = content.contact

  return (
    <Section id="contact" title={t('navContact')}>
      {/* Intro copy — locale-aware */}
      {intro && (
        <p className="mb-6 max-w-2xl text-text-secondary">{intro}</p>
      )}

      <div className="flex flex-col gap-4">
        {/* Email link — opens the mail client, no target="_blank" required */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">Email:</span>
          <a
            href={`mailto:${SITE_META.email}`}
            className="text-brand-500 hover:underline"
          >
            {SITE_META.email}
          </a>
        </div>

        {/* WhatsApp link — opens in a new tab */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">WhatsApp:</span>
          <a
            href={SITE_META.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 hover:underline"
          >
            +261 38 50 966 64
          </a>
        </div>

        {/* GitHub + LinkedIn via SocialLinks — handles target="_blank" internally */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">Social:</span>
          <SocialLinks size="md" />
        </div>

        {/* Location: city and country only — full street address is never shown */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">Location:</span>
          <span className="text-text-secondary">{location}</span>
        </div>
      </div>
    </Section>
  )
}
