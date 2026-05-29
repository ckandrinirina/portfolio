/**
 * Sidebar — 240px fixed aside that frames every view.
 *
 * Renders:
 *  - Brand mark (logo + title)
 *  - Grouped nav rows (workspace · connect) with glyph, label, optional badge
 *  - Active route visual distinction via `.active` class
 *  - Desktop-only status block (available · tnr · claude-code)
 *  - ThemeSwitcher and LanguageSwitcher controls
 *
 * Props, not global state: Sidebar is presentational and prop-driven.
 * App owns the route state (04-01). Adding a new route requires only a new
 * entry in `constants.ts` — no changes here (Open/Closed principle).
 */

import type { RouteId } from '../../lib/constants'
import { NAV_GROUPS, ROUTE_META } from '../../lib/constants'
import { useLanguage } from '../../i18n/useLanguage'
import type { UiLabels } from '../../i18n/ui'
import ThemeSwitcher from '../ui/ThemeSwitcher'
import LanguageSwitcher from '../ui/LanguageSwitcher'

// ── Props ────────────────────────────────────────────────────────────────────

export type SidebarProps = {
  /** Currently active route id. */
  route: string
  /** Called when the user clicks a nav row. App updates route state. */
  navigate: (id: RouteId) => void
  /** Called when the user activates the ⌘K entry point (optional, unused here
   *  but accepted so callers can pass a unified handler set). */
  onOpenCmdK?: () => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Sidebar({ route, navigate }: SidebarProps) {
  const { t } = useLanguage()

  return (
    <aside className="sidebar">
      {/* Brand mark -------------------------------------------------------- */}
      <div className="sb-brand">
        <button
          type="button"
          className="sb-logo focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          aria-label="Go to home"
          onClick={() => navigate('home')}
        >
          E
        </button>
        <span className="sb-title">PORTFOLIO</span>
      </div>

      {/* Nav groups -------------------------------------------------------- */}
      <nav className="sb-nav" aria-label="Site navigation">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="sb-group">
            <div className="sb-group-label">{group.label}</div>
            {group.routes.map((id) => {
              const meta = ROUTE_META[id]
              const isActive = id === route
              return (
                <button
                  key={id}
                  type="button"
                  data-testid={`nav-row-${id}`}
                  className={['sb-row', isActive ? 'active' : '']
                    .join(' ')
                    .trim()}
                  onClick={() => navigate(id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="sb-glyph" aria-hidden="true">
                    {meta.glyph}
                  </span>
                  <span className="sb-label">
                    {t(meta.labelKey as keyof UiLabels)}
                  </span>
                  {meta.badge && <span className="sb-badge">{meta.badge}</span>}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Controls (ThemeSwitcher + LanguageSwitcher) ------------------------ */}
      <div className="sb-controls flex flex-col gap-2 border-t border-[var(--line)] px-4 py-3">
        <ThemeSwitcher className="w-full justify-start" />
        <LanguageSwitcher />
      </div>

      {/* Desktop-only status block ---------------------------------------- */}
      <div className="sb-status" data-testid="sb-status">
        <StatusRow
          dot="green"
          testId="sb-status-available"
          label={t('footerStatus')}
        />
        <StatusRow testId="sb-status-region" label={t('footerRegion')} />
        <StatusRow
          dot="accent"
          testId="sb-status-paired"
          label={t('footerPaired')}
        />
      </div>
    </aside>
  )
}

// ── StatusRow sub-component ───────────────────────────────────────────────────

type StatusRowProps = {
  /** If set, renders a coloured dot before the label. */
  dot?: 'green' | 'accent'
  label: string
  testId: string
}

function StatusRow({ dot, label, testId }: StatusRowProps) {
  return (
    <div className="sb-status-row" data-testid={testId}>
      {dot === 'green' && (
        <span
          className="sb-dot"
          data-testid="sb-dot-available"
          aria-hidden="true"
        />
      )}
      {dot === 'accent' && (
        <span className="sb-dot accent" aria-hidden="true" />
      )}
      <span>{label}</span>
    </div>
  )
}
