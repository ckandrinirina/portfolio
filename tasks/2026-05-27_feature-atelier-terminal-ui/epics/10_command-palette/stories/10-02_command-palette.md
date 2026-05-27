# 10-02 · `CommandPalette.tsx` UI

**Status:** TODO · **Size:** L · **Blocked by:** 10-01, 03-05

## Description

The full palette UI: backdrop, input, grouped result list, footer with kbd
hints. Arrow-up/down moves the active row, Enter runs it, Escape closes,
click-outside closes.

## Files affected

- `src/components/cmdk/CommandPalette.tsx`
- `src/index.css` — `.cmdk-bg`, `.cmdk`, `.cmdk-input`, `.cmdk-list`,
  `.cmdk-grp`, `.cmdk-item`, `.cmdk-item.active`, `.cmdk-item .ico`,
  `.cmdk-item .meta`, `.cmdk-foot`, `.cmdk-foot kbd` rules verbatim
  (mockup ~1551–1611).

## Implementation notes

```tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { COMMANDS } from './commands'
import { PROJECTS } from '@/content/projects'
import { useLanguage } from '@/i18n/useLanguage'
import type { RouteId } from '@/lib/constants'

type Props = {
  open: boolean
  onClose: () => void
  onRoute: (id: RouteId) => void
  doAction: (a: 'copyEmail' | 'whatsapp' | 'cycleTheme') => void
}

export default function CommandPalette({ open, onClose, onRoute, doAction }: Props) {
  const { t } = useLanguage()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo(() => {
    const nav = COMMANDS.map((c) => ({
      ...c,
      label: c.cmd[0].toUpperCase() + c.cmd.slice(1),
      run: () => c.route ? onRoute(c.route) : doAction(c.action!),
    }))
    const projects = PROJECTS.map((p) => ({
      cmd: p.id, label: p.name, desc: p.category + ' · ' + p.year,
      group: 'Projects' as const,
      run: () => onRoute('work'),
    }))
    return [...nav, ...projects]
  }, [onRoute, doAction])

  const filtered = q
    ? items.filter((i) => (i.cmd + ' ' + i.label + ' ' + (i.desc || '')).toLowerCase().includes(q.toLowerCase()))
    : items

  useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(filtered.length - 1, a + 1)) }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
      else if (e.key === 'Enter')     { e.preventDefault(); filtered[active]?.run(); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, active, onClose])

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, it) => {
    ;(acc[it.group] = acc[it.group] || []).push(it as any); return acc
  }, {})

  let runningIdx = -1
  return (
    <div className={'cmdk-bg' + (open ? ' open' : '')} onClick={onClose} aria-hidden={!open}>
      <div className="cmdk" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder={t('cmdk.placeholder')}
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0) }}
        />
        <div className="cmdk-list">
          {Object.entries(grouped).map(([group, list]) => (
            <div key={group}>
              <div className="cmdk-grp">{t(`cmdk.group.${group.toLowerCase()}`) ?? group}</div>
              {list.map((it) => {
                runningIdx += 1
                const idx = runningIdx
                return (
                  <button
                    key={(it.cmd ?? '') + idx}
                    type="button"
                    className={'cmdk-item' + (idx === active ? ' active' : '')}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => { it.run(); onClose() }}
                  >
                    <span className="ico">{it.group === 'Projects' ? '◆' : it.group === 'Quick' ? '⚡' : '→'}</span>
                    <span>{it.label}</span>
                    <span className="meta">{it.desc}</span>
                  </button>
                )
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px 20px', color: 'var(--muted)', fontSize: 12.5 }}>
              {(t('cmdk.no.results') ?? 'No matches for "{q}".').replace('{q}', q)}
            </div>
          )}
        </div>
        <div className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> {t('cmdk.hint.navigate')}</span>
          <span><kbd>↵</kbd> {t('cmdk.hint.select')} · <kbd>Esc</kbd> {t('cmdk.hint.close')}</span>
        </div>
      </div>
    </div>
  )
}
```

## Acceptance criteria

- [ ] CSS present.
- [ ] When `open`, palette is visible with input focused.
- [ ] Backdrop click closes; Escape closes.
- [ ] Up/Down arrows move `active` between filtered items.
- [ ] Enter runs `filtered[active].run()` and closes.
- [ ] Typing filters case-insensitively across cmd/label/desc.
- [ ] Empty filter results show the localized no-results line.
- [ ] Groups render in fixed order: Navigation → Quick → Projects (which is
      the order they appear in the source items array).

## Test notes

Covered in 10-05.

## Edge cases

- The `runningIdx` counter pattern looks awkward but it gives each visible
  row a stable index across groups for arrow-key navigation.
