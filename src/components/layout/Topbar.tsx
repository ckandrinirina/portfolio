/**
 * Topbar — 48px fixed bar at the top of the main pane.
 *
 * Renders:
 *  - Breadcrumb for the active route (sourced from ROUTE_META)
 *  - ⌘K button that calls the supplied onOpenCmdK callback
 *  - TNR (UTC+3) clock that auto-updates every 30 s; cleaned up on unmount
 *
 * Props, not global state: Topbar is presentational and prop-driven.
 * App owns the route state (04-01).
 *
 * Clock note: the interval is started in a useEffect so module-scope Date
 * reads are avoided. Fake timers in tests drive tick assertions.
 */

import { useEffect, useState } from 'react'
import type { RouteId } from '../../lib/constants'
import { ROUTE_META } from '../../lib/constants'

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Format the current UTC+3 time as HH:MM (24-hour, zero-padded).
 * Avoids reading the clock at module scope.
 */
function getTnrTime(): string {
  const now = new Date()
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000
  const tnr = new Date(utcMs + 3 * 60 * 60_000)
  const hh = String(tnr.getHours()).padStart(2, '0')
  const mm = String(tnr.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

// ── Props ─────────────────────────────────────────────────────────────────────

export type TopbarProps = {
  /** Currently active route id. */
  route: string
  /** Called when the user activates the ⌘K button. */
  onOpenCmdK: () => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Topbar({ route, onOpenCmdK }: TopbarProps) {
  const [clock, setClock] = useState<string>(getTnrTime)

  /* Start a 30 s interval to keep the clock current.
     The cleanup function prevents state updates after unmount. */
  useEffect(() => {
    const id = setInterval(() => {
      setClock(getTnrTime())
    }, 30_000)
    return () => clearInterval(id)
  }, [])

  /* Resolve breadcrumb from route metadata; fall back gracefully. */
  const meta = ROUTE_META[route as RouteId]
  const breadcrumb = meta?.breadcrumb ?? route

  return (
    <div className="topbar">
      {/* Breadcrumb -------------------------------------------------------- */}
      <div className="tb-breadcrumb" data-testid="tb-breadcrumb">
        <span>~/portfolio</span>
        <span className="tb-sep">·</span>
        <span>{breadcrumb}</span>
      </div>

      {/* ⌘K button --------------------------------------------------------- */}
      <button
        type="button"
        className="tb-search focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
        data-testid="tb-cmdk-btn"
        aria-label="Open command palette (⌘K)"
        onClick={onOpenCmdK}
      >
        <span>Search</span>
        <kbd className="tb-kbd">⌘K</kbd>
      </button>

      {/* TNR clock --------------------------------------------------------- */}
      <div className="tb-clock" data-testid="tb-clock">
        {clock}
      </div>
    </div>
  )
}
