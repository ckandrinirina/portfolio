/**
 * HomeView — the `home` route view.
 *
 * Composes primitives from 02-02 (Reveal, CountUp, Marquee, DownloadCvButton)
 * and reads `hero`, `now`, `stats`, and `marquee` from `useLanguage().content`.
 *
 * Sections:
 * - Hero: eyebrow/greeting · Reveal name as <h1> · tagline · role rotor · 3 CTAs
 * - Avatar frame: profile img · orbit accent · avatar-tag
 * - Now-card: headline · body · meta label/period
 * - Stats grid: stat-tiles with CountUp + label
 * - Marquee: looping tech-token track
 *
 * SOLID notes:
 * - S: this file composes; motion / reveal details live in primitives.
 * - O: stat/marquee/role lists are data-driven — adding items needs no view change.
 * - L: renders for any valid hero/now/stats/marquee content shape.
 * - I: receives only { navigate } — content comes from useLanguage().
 * - D: depends on useLanguage() hook abstraction, not concrete content modules.
 */

import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import Reveal from '../components/ui/Reveal'
import CountUp from '../components/ui/CountUp'
import Marquee from '../components/ui/Marquee'
import Button from '../components/ui/Button'
import DownloadCvButton from '../components/ui/DownloadCvButton'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HomeViewProps {
  /** App-level navigation callback; HomeView does not own routing. */
  navigate: (route: string) => void
}

// ---------------------------------------------------------------------------
// Reduced-motion guard (mirrors the approach in Reveal / CountUp)
// ---------------------------------------------------------------------------

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ---------------------------------------------------------------------------
// Role rotor — cycles through hero.roles on an interval
// ---------------------------------------------------------------------------

const ROTOR_INTERVAL_MS = 2800

function RoleRotor({ roles }: { roles: string[] }) {
  const reduced = prefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Under reduced motion: freeze on the first role — no interval.
    if (reduced || roles.length <= 1) return

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, ROTOR_INTERVAL_MS)

    return () => clearInterval(id)
  }, [roles, reduced])

  return (
    <div className="home-roles" aria-live="polite" aria-atomic="true">
      <span className="home-rotor">{roles[index]}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stats grid — each tile uses CountUp (inView = true immediately; reveal hook
// adds .in class later, but CountUp triggers so tiles are usable standalone)
// ---------------------------------------------------------------------------

function StatsGrid({
  stats,
}: {
  stats: Array<{ n: number; suffix?: string; label: string }>
}) {
  return (
    <div className="stats-grid reveal">
      {stats.map((stat, i) => (
        <div key={i} className="stat-tile">
          <div className="stat-n">
            <CountUp to={stat.n} suffix={stat.suffix} inView />
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// HomeView
// ---------------------------------------------------------------------------

export default function HomeView({ navigate }: HomeViewProps) {
  const { content, t } = useLanguage()
  const { hero, now, stats, marquee } = content

  // Profile image path — served from public/ with a stable URL.
  const profileSrc = `${import.meta.env.BASE_URL}profile.jpg`

  return (
    <div className="view-inner">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="home-hero">
        <p className="home-greet eyebrow">{hero.greet}</p>

        <h1 className="home-name">
          <Reveal text={hero.name} />
        </h1>

        <p className="home-tagline">{hero.tagline}</p>

        <RoleRotor roles={hero.roles} />

        <div className="home-actions">
          {/* Primary CTA — navigates to contact */}
          <Button variant="primary" onClick={() => navigate('contact')}>
            {hero.ctaContact}
          </Button>

          {/* Secondary CTA — navigates to work */}
          <Button variant="secondary" onClick={() => navigate('work')}>
            {hero.ctaViewProjects}
          </Button>

          {/* Third CTA — CV download */}
          <DownloadCvButton />
        </div>
      </section>

      {/* ── Home grid (avatar + now-card) ────────────────────────────────── */}
      <div className="home-grid">
        {/* Avatar frame */}
        <div>
          <div className="avatar-frame">
            <img src={profileSrc} alt="Erick Andrinirina — profile photo" />

            {/* Orbiting accent — decorative only */}
            <span
              className="avatar-orbit"
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                border: '1px dashed var(--accent)',
                pointerEvents: 'none',
              }}
            />

            <span className="avatar-tag">{t('footerStatus')}</span>
          </div>
        </div>

        {/* Now card */}
        <div className="now-card reveal">
          <p className="eyebrow">Now building</p>
          <p className="now-headline">{now.headline}</p>
          <p className="now-body">{now.body}</p>
          <div className="now-meta">
            <span>{now.meta.label}</span>
            <span>{now.meta.period}</span>
          </div>
        </div>
      </div>

      {/* ── Stats grid ───────────────────────────────────────────────────── */}
      <StatsGrid stats={stats} />

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <Marquee items={marquee} />
    </div>
  )
}
