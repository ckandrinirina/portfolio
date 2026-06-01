/**
 * ThemeSwitcher — a palette swatch picker (top-right of the topbar).
 *
 * Renders one color swatch per palette (Ember / Paper / Ocean / Forest). Each is
 * a button that applies that palette via `useTheme().setTheme()`; the active
 * palette's swatch is ringed (`aria-pressed="true"`). Persistence + the
 * `data-theme` attribute are owned by the provider.
 */

import type { CSSProperties } from 'react'
import { useTheme } from '../../theme/useTheme'
import type { Theme } from '../../theme/ThemeProvider'
import { cn } from '../../lib/utils'

export type ThemeSwitcherProps = {
  className?: string
}

/** Palette order shown in the picker. */
const THEMES: Theme[] = ['default', 'paper', 'ocean', 'forest']

/** Human-facing palette names, keyed by theme id. */
const THEME_LABELS: Record<Theme, string> = {
  default: 'Ember',
  paper: 'Paper',
  ocean: 'Ocean',
  forest: 'Forest',
}

/** Representative accent colour per palette, for the swatch dot. */
const THEME_SWATCH: Record<Theme, string> = {
  default: '#e08660',
  paper: '#b5491c',
  ocean: '#7ab7ff',
  forest: '#94d49a',
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps = {}) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Switch color theme"
      className={cn('tb-theme', className)}
    >
      {THEMES.map((th) => {
        const active = th === theme
        return (
          <button
            key={th}
            type="button"
            onClick={() => setTheme(th)}
            aria-label={THEME_LABELS[th]}
            aria-pressed={active}
            title={THEME_LABELS[th]}
            data-cursor="hover"
            className={cn(
              'tb-swatch focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none',
              active && 'tb-swatch-active',
            )}
            style={{ '--sw': THEME_SWATCH[th] } as CSSProperties}
          />
        )
      })}
    </div>
  )
}
