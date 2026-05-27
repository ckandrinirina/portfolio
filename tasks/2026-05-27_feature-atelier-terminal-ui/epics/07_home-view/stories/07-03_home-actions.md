# 07-03 · Home actions: 3 CTAs

**Status:** TODO · **Size:** M · **Blocked by:** 07-01, 04-08 (existing DownloadCvButton from old plan)

## Description

Add the three CTAs under the role rotor: "See selected work" (primary),
"Get in touch" (secondary), "Download CV" (secondary, anchor with `download`).
The work + contact CTAs accept an `onNav` callback to switch routes.

## Files affected

- `src/views/HomeView.tsx` — actions JSX + `onNav` prop on HomeView.
- `src/index.css` — `.btn`, `.btn-primary` CSS (verbatim from mockup).
- (Possibly) `src/components/ui/DownloadCvButton.tsx` — restyled to use `.btn` classes.

## Implementation notes

CSS:
```css
.home-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 56px; }
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid var(--line-strong);
  font-size: 12.5px;
  letter-spacing: 0.02em;
  color: var(--fg);
  transition: all 0.2s var(--ease);
  position: relative;
  overflow: hidden;
  will-change: transform;
}
.btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
.btn .arrow { transition: transform 0.25s var(--ease); display: inline-block; }
.btn:hover .arrow { transform: translateX(4px); }
.btn-primary { background: var(--accent); color: var(--bg); border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-deep); border-color: var(--accent-deep); color: var(--bg); }

@media (max-width: 600px) {
  .home-actions { flex-direction: column; align-items: stretch; }
  .btn { justify-content: center; }
}
```

JSX fragment:

```tsx
import DownloadCvButton from '@/components/ui/DownloadCvButton'

type Props = { onNav: (id: RouteId) => void }

// in HomeView return:
<div className="home-actions reveal r-fade" style={{ transitionDelay: '0.5s' }}>
  <button className="btn btn-primary" onClick={() => onNav('work')}>
    <span>{content.hero.ctaPrimary}</span>
    <span className="arrow">→</span>
  </button>
  <button className="btn" onClick={() => onNav('contact')}>
    <span>{content.hero.ctaSecondary}</span>
    <span className="arrow">↗</span>
  </button>
  <DownloadCvButton className="btn" label={content.hero.ctaCv} />
</div>
```

Update `DownloadCvButton` to accept `className` and `label` props, and render
`<a className={className} href={BASE_URL + 'cv/erick-andrinirina-cv.pdf'} download>{label} <span className="arrow">↓</span></a>`.

## Acceptance criteria

- [ ] `.btn` and `.btn-primary` CSS present.
- [ ] HomeView accepts `onNav: (id: RouteId) => void` prop.
- [ ] First CTA fires `onNav('work')`.
- [ ] Second CTA fires `onNav('contact')`.
- [ ] Third CTA renders as `<a>` with `download` attribute and the localized
      `ctaCv` label.
- [ ] At ≤600px, CTAs stack vertically.
- [ ] All three buttons get the `.btn` style; first one also gets `.btn-primary`.

## Test notes

```tsx
const onNav = vi.fn()
render(<LanguageProvider><HomeView onNav={onNav} /></LanguageProvider>)
fireEvent.click(screen.getByRole('button', { name: /selected work/i }))
expect(onNav).toHaveBeenCalledWith('work')
```

## Edge cases

- `DownloadCvButton` previously was a stand-alone button; its old shape (no
  `className` / `label` props) is from old plan 04-08. Open up the API here.
