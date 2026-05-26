import { useTheme } from '../../theme/useTheme'
import { cn } from '../../lib/utils'

// ThemeToggle props — exported even if empty, for future extensibility (SOLID: Open/Closed).
export type ThemeToggleProps = {
  className?: string
}

// Icon semantics: show the SUN icon when the current theme is LIGHT (you are in light mode),
// and show the MOON icon when the current theme is DARK (you are in dark mode).
// aria-pressed mirrors dark mode state: "true" = dark is active.
// This is the "reflect current state" convention, consistent with aria-pressed.

function SunIcon() {
  return (
    <svg
      data-testid="sun-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      data-testid="moon-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function ThemeToggle({ className }: ThemeToggleProps = {}) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark ? 'true' : 'false'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-2 transition-colors',
        'text-text-primary hover:bg-surface-elevated',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        className,
      )}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
