# 02-04 · ThemeSwitcher component

**Status:** TODO · **Size:** M · **Blocked by:** 02-03

## Description

New `src/components/ui/ThemeSwitcher.tsx` — a single button (or a 4-segment
control if compact) that cycles through Ember → Ocean → Forest → Paper →
Ember. Shows the current palette name (localized) and uses `aria-pressed` /
`aria-label`.

## Files affected

- `src/components/ui/ThemeSwitcher.tsx` — new component.
- `src/i18n/ui.ts` — extended with theme label keys in story 03-05.

## Implementation notes

```tsx
import { useTheme } from '@/theme/useTheme'
import { useLanguage } from '@/i18n/useLanguage'

const ICON: Record<string, string> = {
  default: '◑',
  ocean:   '🌊',
  forest:  '🌿',
  paper:   '☼',
}

const LABEL_KEY: Record<string, string> = {
  default: 'theme.ember',
  ocean:   'theme.ocean',
  forest:  'theme.forest',
  paper:   'theme.paper',
}

export default function ThemeSwitcher() {
  const { theme, cycle } = useTheme()
  const { t } = useLanguage()
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={t('theme.cycle')}
      title={t('theme.cycle')}
      data-cursor="hover"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 8,
        border: '1px solid var(--line)',
        color: 'var(--fg-dim)',
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <span aria-hidden>{ICON[theme] ?? '◑'}</span>
      <span>{t(LABEL_KEY[theme])}</span>
    </button>
  )
}
```

Placement decision (final landing spot is up to Epic 09 ContactView /
sidebar status row); this story only creates the component.

## Acceptance criteria

- [ ] Component exists at `src/components/ui/ThemeSwitcher.tsx`.
- [ ] Renders the current theme's icon + localized label.
- [ ] Click cycles through all 4 themes in order: default → ocean → forest → paper → default.
- [ ] Sets `aria-label` and `title` from a localized `t('theme.cycle')`.
- [ ] Renders inside `<ThemeProvider>` + `<LanguageProvider>` without errors.

## Test notes

A small Vitest unit test in this story confirms click cycles theme correctly:

```ts
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import ThemeSwitcher from './ThemeSwitcher'

it('cycles 4 themes on click', () => {
  render(
    <ThemeProvider><LanguageProvider><ThemeSwitcher /></LanguageProvider></ThemeProvider>
  )
  const btn = screen.getByRole('button')
  // start default (no data-theme); click → ocean
  fireEvent.click(btn)
  expect(document.documentElement.getAttribute('data-theme')).toBe('ocean')
  fireEvent.click(btn); expect(document.documentElement.getAttribute('data-theme')).toBe('forest')
  fireEvent.click(btn); expect(document.documentElement.getAttribute('data-theme')).toBe('paper')
  fireEvent.click(btn); expect(document.documentElement.getAttribute('data-theme')).toBeNull()
})
```

## Edge cases

- `t('theme.cycle')`, `t('theme.ember')`, etc., must exist in `ui.ts` —
  added in story 03-05. Until then the test will return the key as the label.
- The localized label key resolution depends on `LanguageProvider` — wrap
  the component in both providers when used in App.
