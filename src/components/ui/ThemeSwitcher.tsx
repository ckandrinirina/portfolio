import { useTheme } from '../../theme/useTheme'
import type { Theme } from '../../theme/ThemeProvider'
import { cn } from '../../lib/utils'

// ThemeSwitcher props — exported for extensibility (SOLID: Open/Closed).
export type ThemeSwitcherProps = {
  className?: string
}

/** Human-facing palette names, keyed by theme id. */
const THEME_LABELS: Record<Theme, string> = {
  default: 'Ember',
  paper: 'Paper',
  ocean: 'Ocean',
  forest: 'Forest',
}

/**
 * Cycle-button theme control. Activation advances through the documented
 * palette order via `useTheme().cycle()` — persistence and the `data-theme`
 * attribute are owned by the provider, not duplicated here.
 */
export default function ThemeSwitcher({ className }: ThemeSwitcherProps = {}) {
  const { theme, cycle } = useTheme()

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch color theme (current: ${THEME_LABELS[theme]})`}
      data-cursor="hover"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
        'focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
    >
      <span aria-hidden="true">◐</span>
      <span>{THEME_LABELS[theme]}</span>
    </button>
  )
}
