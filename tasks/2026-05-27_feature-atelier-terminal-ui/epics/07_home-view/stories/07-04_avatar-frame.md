# 07-04 · Avatar frame with profile photo

**Status:** TODO · **Size:** M · **Blocked by:** 07-01

## Description

Build the avatar frame on the right side of the hero: rounded card holding
the profile photo (`public/profile.jpg`), plus a small "online · tnr" tag
below.

## Files affected

- `src/views/HomeView.tsx` — avatar-col JSX.
- `src/index.css` — `.avatar-col`, `.avatar-frame`, `.avatar-tag` rules.

## Implementation notes

CSS (verbatim from mockup):

```css
.avatar-col { display: flex; flex-direction: column; align-items: flex-end; gap: 16px; position: relative; }
.avatar-frame {
  position: relative;
  width: 220px;
  height: 280px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
}
.avatar-frame:hover {
  transform: translateY(-4px) rotate(-1deg);
  box-shadow: var(--shadow-lift);
}
.avatar-frame::before {
  content: ""; position: absolute; inset: -1px; border-radius: 18px;
  border: 1px solid var(--accent-soft); pointer-events: none; z-index: 3;
}
.avatar-frame img {
  width: 100%; height: 100%; display: block; object-fit: cover;
}
.avatar-tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 4px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--bg-2);
}
.avatar-tag .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
}
```

JSX:

```tsx
import { useLanguage } from '@/i18n/useLanguage'

// inside .avatar-col
<>
  <div className="avatar-frame">
    <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Erick Andrinirina" />
  </div>
  <span className="avatar-tag">
    <span className="dot" />
    {t('home.avatar.online')}
  </span>
</>
```

## Acceptance criteria

- [ ] `.avatar-*` CSS rules present.
- [ ] `<img>` references `BASE_URL + 'profile.jpg'`.
- [ ] Avatar frame has rounded 18px corners, 220×280, with subtle border
      glow `::before`.
- [ ] Hover lifts and slightly tilts the frame.
- [ ] Tag shows "ONLINE · TNR" with pulsing green dot.

## Test notes

Smoke test: assert `<img>` with the expected `src` is rendered.

## Edge cases

- If `public/profile.jpg` is missing, the broken-image icon will show.
  Old plan 07-02 already shipped this asset, so it should be present.
