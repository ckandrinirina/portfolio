# 07-01 · HomeView skeleton

**Status:** TODO · **Size:** M · **Blocked by:** 03-03, 03-04, 04-03, 05-06

## Description

Create `src/views/HomeView.tsx` with the greet pill, hero name (using
`Reveal` for both first + last name + a final `.` in accent color), and the
tagline paragraph. Add the `.home-*` CSS to `src/index.css`.

## Files affected

- `src/views/HomeView.tsx` — new.
- `src/index.css` — append `.home-hero`, `.home-greet`, `.home-name`,
  `.home-tagline`, `.home-roles`, `.home-rotor`, `.home-actions`, `.home-grid`
  rules (verbatim from mockup lines ~870–1000).

## Implementation notes

CSS (excerpt — copy the full block from the design feature doc):
```css
.home-hero { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: start; margin-bottom: 56px; }
@media (max-width: 880px) { .home-hero { grid-template-columns: 1fr; gap: 32px; } .home-hero .avatar-col { order: -1; } }
.home-greet { /* … */ }
.home-name { /* … */ }
.home-name .italic { font-style: italic; }
.home-name .accent { color: var(--accent); }
.home-tagline { /* … */ }
.home-tagline strong { color: var(--fg); font-weight: 500; }
.home-tagline em { font-style: italic; color: var(--accent); font-family: var(--font-serif); font-size: 1.05em; }
```

Component:

```tsx
import Reveal from '@/components/ui/Reveal'
import { useLanguage } from '@/i18n/useLanguage'

export default function HomeView() {
  const { content } = useLanguage()
  const h = content.hero
  return (
    <div className="view-enter">
      <div className="home-hero">
        <div className="home-hero-text">
          <div className="home-greet reveal r-fade">
            <span className="pulse" />
            <span>{h.greet}</span>
          </div>

          <h1 className="home-name">
            <Reveal text={h.nameFirst} italic />{' '}
            <Reveal text={h.nameLast} delay={0.35} />
            <span className="char accent" style={{ animationDelay: '1.1s' }}>.</span>
          </h1>

          <p
            className="home-tagline reveal r-fade"
            style={{ transitionDelay: '0.2s' }}
            // tagline can contain **bold** + *em* markers; parse below
            dangerouslySetInnerHTML={{ __html: renderInline(h.tagline) }}
          />
          {/* role rotor: story 07-02 */}
          {/* actions: story 07-03 */}
        </div>
        <div className="avatar-col reveal r-right" style={{ transitionDelay: '0.15s' }}>
          {/* avatar: story 07-04 */}
        </div>
      </div>
      {/* home-grid (now + stats): stories 07-05, 07-06 */}
      {/* marquee: story 07-07 */}
    </div>
  )
}

function renderInline(s: string): string {
  // **bold** → <strong>…</strong>; *em* → <em>…</em>
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}
```

`.pulse` CSS rule (small addition):
```css
.home-greet .pulse {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 8px var(--success);
  animation: blink 1.8s infinite;
}
```

## Acceptance criteria

- [ ] HomeView file exists.
- [ ] All CSS rules listed above present in `index.css`.
- [ ] Renders the greet pill with pulsing green dot + localized greet text.
- [ ] Renders the hero name: first name italic with letter cascade,
      space, last name with letter cascade (delay 0.35s), then a final
      orange period at 1.1s.
- [ ] Renders the tagline with `**…**` → `<strong>` and `*…*` → `<em>`.
- [ ] No avatar yet (Story 07-04 adds it).

## Test notes

Component test: render with stubbed LanguageProvider; assert greet text
present, name spans count matches `nameFirst.length + nameLast.length + 1`.

## Edge cases

- `dangerouslySetInnerHTML` is OK here because the content comes from our own
  typed modules — no user input. Document this in the source comment.
- The HTML markers are intentionally Markdown-lite, not full Markdown. If
  this grows, swap to a tiny inline parser.
