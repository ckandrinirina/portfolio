# 05-02 · Sidebar component + `.sb-*` CSS

**Status:** TODO · **Size:** L · **Blocked by:** 05-01, 03-05

## Description

Implement `<Sidebar active onSelect onCmd />`: brand mark (E), grouped
navigation (`workspace` + `connect`), and status block (available · region
· paired with). Append all `.sidebar`, `.sb-brand`, `.sb-mark`, `.sb-name`,
`.sb-role`, `.sb-section`, `.sb-head`, `.sb-row`, `.sb-row.active`,
`.sb-row .glyph`, `.sb-row .badge`, `.sb-status` CSS verbatim.

## Files affected

- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Sidebar.test.tsx`
- `src/index.css` (append `.sidebar` and `.sb-*` rules)
- `src/lib/constants.ts` — export `ROUTES` array (used here and by topbar; see
  Epic 06 for `ROUTE_ORDER` constant — overlapping concerns split is OK).

## Implementation notes

### CSS (append verbatim from mockup)

`.sidebar`, `.sb-brand`, `.sb-mark` (with `::after orbit` animation),
`.sb-name`, `.sb-role`, `.sb-section`, `.sb-head`, `.sb-row` and
`.sb-row.active` (with the orange left tick `::before`), `.sb-row .glyph`,
`.sb-row .badge`, `.sb-status`, `.sb-status .row`, `.sb-status .live`,
`.sb-status .dot`. Plus the `@media (max-width: 880px)` overrides that
flatten the sidebar to a horizontal strip.

(See the mockup source CSS lines ~466–657 for the verbatim rules.)

### Component

```tsx
import { useLanguage } from '@/i18n/useLanguage'

export type RouteId = 'home' | 'work' | 'experience' | 'skills' | 'process' | 'contact'

type RouteRow  = { kind: 'route'; id: RouteId;  label: string; glyph: string; badge?: string }
type GroupRow  = { kind: 'group'; label: string }
type Row = RouteRow | GroupRow

type Props = {
  active: RouteId
  onSelect: (id: RouteId) => void
  onCmd?: () => void
}

export default function Sidebar({ active, onSelect }: Props) {
  const { t } = useLanguage()
  const rows: Row[] = [
    { kind: 'group', label: t('sidebar.group.workspace') ?? 'workspace' },
    { kind: 'route', id: 'home',       label: t('route.home'),       glyph: '◇' },
    { kind: 'route', id: 'work',       label: t('route.work'),       glyph: '▸', badge: '8' },
    { kind: 'route', id: 'experience', label: t('route.experience'), glyph: '≡' },
    { kind: 'route', id: 'skills',     label: t('route.skills'),     glyph: '⌬' },
    { kind: 'route', id: 'process',    label: t('route.process'),    glyph: '✦' },
    { kind: 'group', label: t('sidebar.group.connect') ?? 'connect' },
    { kind: 'route', id: 'contact',    label: t('route.contact'),    glyph: '@' },
  ]
  const groups: Array<{ label: string; routes: RouteRow[] }> = []
  for (const r of rows) {
    if (r.kind === 'group') groups.push({ label: r.label, routes: [] })
    else groups[groups.length - 1]?.routes.push(r)
  }

  return (
    <aside className="sidebar">
      <button className="sb-brand" onClick={() => onSelect('home')}>
        <div className="sb-mark">E</div>
        <div>
          <div className="sb-name">Erick Andrinirina</div>
          <div className="sb-role">fullstack · interface · craft</div>
        </div>
      </button>

      <nav>
        {groups.map((g) => (
          <div key={g.label} className="sb-section">
            <div className="sb-head">{g.label}</div>
            {g.routes.map((r) => (
              <button
                key={r.id}
                className={'sb-row' + (active === r.id ? ' active' : '')}
                onClick={() => onSelect(r.id)}
                aria-current={active === r.id ? 'page' : undefined}
              >
                <span className="glyph">{r.glyph}</span>
                <span className="label">{r.label}</span>
                {r.badge && <span className="badge">{r.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sb-status">
        <div className="row"><span>{t('sidebar.status')}</span><span className="live"><span className="dot" />{t('sidebar.available')}</span></div>
        <div className="row"><span>{t('sidebar.region')}</span><span>{t('sidebar.region.value')}</span></div>
        <div className="row"><span>{t('sidebar.pairedWith')}</span><span style={{ color: 'var(--accent)' }}>claude-code</span></div>
      </div>
    </aside>
  )
}
```

(Note: `sidebar.group.workspace` / `sidebar.group.connect` keys need to be added
to `ui.ts` if not already present in 03-05 — verify and add if missing.)

## Acceptance criteria

- [ ] All `.sb-*` CSS rules present in `src/index.css`, verbatim from the mockup.
- [ ] `<Sidebar active="home" onSelect={fn} />` renders inside `.app` + `LanguageProvider`:
      brand row, 5 workspace nav rows, separator + connect group with `Contact`,
      status block.
- [ ] The `work` row has the orange `8` badge.
- [ ] The row matching `active` has the `active` class and shows the orange tick.
- [ ] Clicking any row calls `onSelect(id)` with the right id.
- [ ] At ≤880px viewport: sidebar flattens to a horizontal scrollable strip.
- [ ] `aria-current="page"` on the active row.

## Test notes

Component test using Testing Library: render with stubbed `onSelect`, fireEvent
click on the "Work" row → expect callback called with `'work'`. Assert
`getByRole('button', { name: /Selected work/i })` has class `active` when
`active="work"`.

## Edge cases

- The `.sb-brand` is technically a button (clickable to go home). Ensure
  reset CSS in `.sb-brand` (background: none, border: none, text-align: left)
  is preserved.
- Sidebar `nav` ancestor element gives this a real landmark.
