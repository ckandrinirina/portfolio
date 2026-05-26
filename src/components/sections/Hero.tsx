/**
 * Hero — the first and most prominent section of the portfolio.
 *
 * Responsibilities (Single Responsibility):
 * - Renders the page's single <h1> (owner's name)
 * - Displays professional title, positioning statement, and location
 * - Provides two CTAs: smooth-scroll to #projects and DownloadCvButton
 * - Renders SocialLinks (GitHub + LinkedIn)
 *
 * Does NOT use the shared Section wrapper because it must emit <h1>
 * rather than the Section's <h2>. Renders its own <section id="hero">
 * directly.
 */

import { useLanguage } from '../../i18n/useLanguage'
import DownloadCvButton from '../ui/DownloadCvButton'
import SocialLinks from '../ui/SocialLinks'

/**
 * Handle the "View projects" scroll with prefers-reduced-motion guard.
 * Dependency-inverted: accepts the target id so it can be tested/overridden.
 */
function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: prefersReduced ? 'instant' : 'smooth' })
}

export default function Hero() {
  const { content } = useLanguage()
  const { name, title, positioning, location, ctaViewProjects } = content.hero

  function handleViewProjects() {
    scrollToSection('projects')
  }

  return (
    <section id="hero" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Name — the single <h1> on the page */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          {name}
        </h1>

        {/* Professional title */}
        <p className="mb-4 text-xl font-medium text-brand-500 sm:text-2xl">
          {title}
        </p>

        {/* Positioning statement */}
        <p className="mb-4 max-w-2xl text-base text-text-secondary sm:text-lg">
          {positioning}
        </p>

        {/* Location — city and country only; no street address */}
        <p
          data-testid="hero-location"
          className="mb-8 flex items-center gap-1 text-sm text-text-secondary"
        >
          <span aria-hidden="true">📍</span>
          {location}
        </p>

        {/* CTAs */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleViewProjects}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {ctaViewProjects}
          </button>
          <DownloadCvButton />
        </div>

        {/* Social links */}
        <SocialLinks size="lg" />
      </div>
    </section>
  )
}
