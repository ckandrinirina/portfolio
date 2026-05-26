/**
 * Header — sticky top navigation bar.
 *
 * Renders a <header> landmark containing:
 *   - <nav> with eight anchor links sourced from NAV_SECTIONS constant.
 *   - Active link highlighting driven by useScrollSpy.
 *   - Hamburger button for mobile menu (open/close with keyboard support).
 *   - LanguageSwitcher and ThemeToggle controls.
 *
 * SOLID compliance:
 *   S — Header orchestrates only nav/mobile-menu; scroll-spy lives in useScrollSpy.
 *   O — Nav sections come from NAV_SECTIONS; adding a section needs zero Header changes.
 *   L — No custom types that extend others; renders correctly without any props.
 *   I — No required props; NavLink receives only what it needs.
 *   D — Theme/language state injected via hooks; no concrete context reads in handlers.
 *
 * Smooth-scroll: event.preventDefault() + scrollIntoView with behavior derived
 * from window.matchMedia('(prefers-reduced-motion: reduce)').
 *
 * Keyboard: Escape closes the mobile menu and returns focus to the hamburger.
 * Focus management: opening the menu moves focus to the first nav link.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { NAV_SECTIONS } from '../../lib/constants'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import ThemeToggle from '../ui/ThemeToggle'
import { cn } from '../../lib/utils'
import type { UiLabels } from '../../i18n/ui'

// Stable array reference so useScrollSpy dep does not change on every render.
const SECTION_IDS = NAV_SECTIONS.map((s) => s.id)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Maps a NAV_SECTIONS labelKey ('nav.hero') to the corresponding UiLabels key
 * ('navHero'). This keeps the constants file and ui.ts as the single sources
 * of truth — Header never hardcodes section names.
 */
function labelKeyToUiKey(labelKey: string): keyof UiLabels {
  const parts = labelKey.split('.')
  if (parts.length !== 2) return labelKey as keyof UiLabels
  const uiKey = `nav${parts[1].charAt(0).toUpperCase()}${parts[1].slice(1)}`
  return uiKey as keyof UiLabels
}

// ---------------------------------------------------------------------------
// NavLink sub-component
// Single Responsibility: render one anchor link with active styling.
// Focused interface: only receives what it needs (I of SOLID).
// ---------------------------------------------------------------------------

type NavLinkProps = {
  id: string
  label: string
  isActive: boolean
  onClick: (id: string) => void
  /** Optional ref for focus management (e.g. first link in mobile menu). */
  ref?: React.Ref<HTMLAnchorElement>
  /** Mobile variant uses slightly more padding for touch targets. */
  mobile?: boolean
}

function NavLink({ id, label, isActive, onClick, ref, mobile = false }: NavLinkProps) {
  return (
    <a
      ref={ref}
      href={`#${id}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={(e) => {
        e.preventDefault()
        onClick(id)
      }}
      className={cn(
        'rounded text-sm font-medium transition-colors',
        mobile ? 'px-3 py-2' : 'px-3 py-1.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        isActive
          ? 'font-semibold text-brand-500'
          : 'text-text-secondary hover:text-text-primary dark:text-zinc-400 dark:hover:text-zinc-100',
      )}
    >
      {label}
    </a>
  )
}

// ---------------------------------------------------------------------------
// HamburgerIcon — two states: open (X) and closed (three lines).
// aria-hidden since the button carries the accessible label.
// ---------------------------------------------------------------------------

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Header (main export)
// ---------------------------------------------------------------------------

export type HeaderProps = {
  className?: string
}

export default function Header({ className }: HeaderProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)
  const activeId = useScrollSpy(SECTION_IDS)
  const { t } = useLanguage()

  // ---------------------------------------------------------------------------
  // Scroll handler — smooth or instant per prefers-reduced-motion
  // ---------------------------------------------------------------------------
  const handleNavClick = useCallback((id: string) => {
    const smoothAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = document.getElementById(id)
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: smoothAllowed ? 'smooth' : 'auto' })
    }
    setMenuOpen(false)
  }, [])

  // ---------------------------------------------------------------------------
  // Keyboard: close menu on Escape, return focus to hamburger
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // ---------------------------------------------------------------------------
  // Focus management: move focus to first mobile nav link when menu opens
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (menuOpen) {
      firstMobileLinkRef.current?.focus()
    }
  }, [menuOpen])

  const hamburgerLabel = menuOpen ? 'Close menu' : 'Open menu'

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'border-b border-zinc-200 bg-white/90 backdrop-blur-sm',
        'dark:border-zinc-700 dark:bg-zinc-900/90',
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Desktop nav — visible only on md+ */}
        <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:gap-1">
          {NAV_SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              id={section.id}
              label={t(labelKeyToUiKey(section.labelKey))}
              isActive={activeId === section.id}
              onClick={handleNavClick}
            />
          ))}
        </nav>

        {/* Mobile: hamburger button — visible only on <md */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-label={hamburgerLabel}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={cn(
              'inline-flex items-center justify-center rounded-lg p-2 transition-colors',
              'text-text-primary hover:bg-surface-elevated',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
            )}
          >
            <HamburgerIcon isOpen={menuOpen} />
          </button>
        </div>

        {/* Desktop controls: LanguageSwitcher + ThemeToggle */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav panel — conditionally rendered when menu is open */}
      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 pb-4 dark:border-zinc-700 dark:bg-zinc-900 md:hidden">
          <nav aria-label="Main navigation" className="flex flex-col gap-1 pt-3">
            {NAV_SECTIONS.map((section, index) => (
              <NavLink
                key={section.id}
                id={section.id}
                label={t(labelKeyToUiKey(section.labelKey))}
                isActive={activeId === section.id}
                onClick={handleNavClick}
                mobile
                ref={index === 0 ? firstMobileLinkRef : undefined}
              />
            ))}
          </nav>

          {/* Language + theme controls in mobile menu panel */}
          <div className="mt-3 flex items-center gap-2 border-t border-zinc-200 pt-3 dark:border-zinc-700">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}
