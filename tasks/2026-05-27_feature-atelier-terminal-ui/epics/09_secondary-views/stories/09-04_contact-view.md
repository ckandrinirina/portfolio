# 09-04 · ContactView + copy-to-clipboard

**Status:** TODO · **Size:** L · **Blocked by:** 03-03, 03-04, 03-05, 05-06, 06-05

## Description

Render the Contact view: two-card grid. Left card = key/value rows (Email,
WhatsApp, Based in, Languages, Available) with copy buttons on email +
phone. Right card = "What I'm looking for next." pitch with sign-off.

## Files affected

- `src/views/ContactView.tsx`
- `src/index.css` — `.contact-grid`, `.contact-card`, `.contact-card .row/.key/.val`,
  `.copy-btn`, `.contact-pitch`, `.contact-pitch::before` (✦ deco), `.contact-pitch h3/p/.sig`
  rules verbatim (mockup ~1473–1544).
- `src/App.tsx` — swap PlaceholderContact.

## Implementation notes

```tsx
import { useState } from 'react'
import { useLanguage } from '@/i18n/useLanguage'

const EMAIL = 'ckandrinirina@gmail.com'
const WA_NUMBER = '+261 38 50 966 64'
const WA_URL = 'https://wa.me/261385096664'

export default function ContactView() {
  const { t, content } = useLanguage()
  const [copied, setCopied] = useState<null | 'email' | 'phone'>(null)
  const copy = (key: 'email' | 'phone', val: string) => {
    navigator.clipboard?.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 1400)
  }
  return (
    <div className="view-enter">
      <div className="eyebrow">{t('eyebrow.contact')}</div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title(t('title.contact')) }} />
      <p className="section-sub" dangerouslySetInnerHTML={{ __html: inline(t('sub.contact')) }} />

      <div className="contact-grid">
        <div className="contact-card reveal">
          <div className="row">
            <div className="key">{content.contact.emailLabel}</div>
            <div className="val">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button
                type="button"
                className={'copy-btn' + (copied === 'email' ? ' copied' : '')}
                onClick={() => copy('email', EMAIL)}
              >{copied === 'email' ? t('copy.copied') : t('copy')}</button>
            </div>
          </div>

          <div className="row">
            <div className="key">{content.contact.whatsappLabel}</div>
            <div className="val">
              <a href={WA_URL} target="_blank" rel="noreferrer">{WA_NUMBER}</a>
              <button
                type="button"
                className={'copy-btn' + (copied === 'phone' ? ' copied' : '')}
                onClick={() => copy('phone', WA_NUMBER.replace(/\s/g, ''))}
              >{copied === 'phone' ? t('copy.copied') : t('copy')}</button>
            </div>
          </div>

          <div className="row">
            <div className="key">{content.contact.basedInLabel}</div>
            <div className="val">{content.contact.basedIn}</div>
          </div>

          <div className="row">
            <div className="key">{content.contact.languagesLabel}</div>
            <div className="val">{content.contact.languages.join(' · ')}</div>
          </div>

          <div className="row">
            <div className="key">{content.contact.availableLabel}</div>
            <div className="val"><span style={{ color: 'var(--success)' }}>● </span>{content.contact.availability}</div>
          </div>
        </div>

        <div className="contact-pitch reveal" style={{ transitionDelay: '0.12s' }}>
          <h3>{content.contact.pitchTitle}</h3>
          <p dangerouslySetInnerHTML={{ __html: inline(content.contact.pitchBody1) }} />
          <p style={{ marginTop: 12 }} dangerouslySetInnerHTML={{ __html: inline(content.contact.pitchBody2) }} />
          <div className="sig">{content.contact.pitchSignoff}</div>
        </div>
      </div>
    </div>
  )
}
```

## Acceptance criteria

- [ ] All CSS rules present.
- [ ] Email and WhatsApp rows render with their `<a>` link.
- [ ] Copy buttons write the value to the clipboard (`navigator.clipboard.writeText`).
- [ ] After click, button label changes to "✓ copied" and reverts after 1.4s.
- [ ] Languages row shows `"Malagasy · Français · English"` (or the FR-localized list).
- [ ] Pitch card shows the ✦ corner deco and signoff in italic accent.

## Test notes

```tsx
const writeText = vi.fn()
Object.assign(navigator, { clipboard: { writeText } })
render(<ContactView />)
fireEvent.click(screen.getByRole('button', { name: /copy|copier/i }))
expect(writeText).toHaveBeenCalledWith(EMAIL)
```

## Edge cases

- `navigator.clipboard` is undefined under jsdom; the `?.` optional chain
  swallows the call so the test must stub it as above.
- The "feature pitch" markers (`**fintech, gaming, AI**`) are parsed by
  `inline()` into `<strong>` tags.
