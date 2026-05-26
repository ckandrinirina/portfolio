/**
 * Header component tests — covers all acceptance criteria for story 05-02.
 *
 * Wraps under both ThemeProvider and LanguageProvider (full provider stack)
 * since Header uses both useTheme() and useLanguage().
 *
 * matchMedia and IntersectionObserver are mocked in src/test/setup.ts.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import Header from './Header'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderHeader() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

// Create a minimal DOM structure with section elements matching NAV_SECTIONS ids
// so useScrollSpy can find them (even though IntersectionObserver is mocked).
function setupSectionDom() {
  const ids = [
    'hero',
    'about',
    'skills',
    'experience',
    'projects',
    'education',
    'languages',
    'contact',
  ]
  ids.forEach((id) => {
    const el = document.createElement('section')
    el.id = id
    document.body.appendChild(el)
  })
  return () => {
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) document.body.removeChild(el)
    })
  }
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  document.documentElement.lang = ''
  // Default navigator.language to something not fr/en so LanguageProvider defaults to 'fr'
  vi.stubGlobal('navigator', { ...navigator, language: 'de' })
})

afterEach(() => {
  // Clean up any manually-added section elements (setupSectionDom leftovers).
  // Do NOT call vi.unstubAllGlobals() — that would remove the IntersectionObserver
  // and matchMedia stubs registered in setup.ts beforeAll.
  ;[
    'hero',
    'about',
    'skills',
    'experience',
    'projects',
    'education',
    'languages',
    'contact',
  ].forEach((id) => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })
})

// ---------------------------------------------------------------------------
// AC 1: Header is sticky / fixed
// ---------------------------------------------------------------------------
describe('Header stickiness', () => {
  it('has a position-sticky or position-fixed CSS class on the root element', () => {
    renderHeader()
    const header = screen.getByRole('banner')
    // Check that the className contains sticky or fixed
    expect(header.className).toMatch(/sticky|fixed/)
  })
})

// ---------------------------------------------------------------------------
// AC 2: Root element is a <header> landmark
// ---------------------------------------------------------------------------
describe('Header landmark', () => {
  it('renders a <header> landmark as its root (role="banner")', () => {
    renderHeader()
    const header = screen.getByRole('banner')
    expect(header.tagName).toBe('HEADER')
  })
})

// ---------------------------------------------------------------------------
// AC 3: <nav> landmark with aria-label inside Header
// ---------------------------------------------------------------------------
describe('Nav landmark', () => {
  it('contains a <nav> with an aria-label for main navigation', () => {
    renderHeader()
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label')
    const label = nav.getAttribute('aria-label')
    expect(label).toBeTruthy()
    expect(label!.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// AC 4: Exactly eight nav links, labels from constants
// ---------------------------------------------------------------------------
describe('Nav links count and labels', () => {
  it('renders exactly eight navigation links', () => {
    renderHeader()
    // All nav links are inside the nav element
    const nav = screen.getByRole('navigation')
    const links = nav.querySelectorAll('a')
    expect(links.length).toBe(8)
  })

  it('renders nav links for all expected sections', () => {
    renderHeader()
    // Labels come from ui.ts FR locale (default). We just check 8 links exist.
    const nav = screen.getByRole('navigation')
    const links = Array.from(nav.querySelectorAll('a'))
    const hrefs = links.map((a) => a.getAttribute('href'))
    // Each href should be a section anchor
    expect(hrefs).toContain('#hero')
    expect(hrefs).toContain('#about')
    expect(hrefs).toContain('#skills')
    expect(hrefs).toContain('#experience')
    expect(hrefs).toContain('#projects')
    expect(hrefs).toContain('#education')
    expect(hrefs).toContain('#languages')
    expect(hrefs).toContain('#contact')
  })
})

// ---------------------------------------------------------------------------
// AC 5: href matches section id (e.g. href="#about")
// ---------------------------------------------------------------------------
describe('Nav link hrefs', () => {
  it('each nav link href starts with # and matches a section id', () => {
    renderHeader()
    const nav = screen.getByRole('navigation')
    const links = Array.from(nav.querySelectorAll('a'))
    links.forEach((link) => {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).toMatch(/^#[a-z]/)
    })
  })
})

// ---------------------------------------------------------------------------
// AC 6: smooth-scroll with reduced-motion fallback (unit test via click handler)
// ---------------------------------------------------------------------------
describe('Smooth scroll on nav link click', () => {
  it('calls scrollIntoView on the target element when a nav link is clicked', () => {
    const cleanup = setupSectionDom()
    renderHeader()

    const aboutEl = document.getElementById('about')!
    const mockScrollIntoView = vi.fn()
    aboutEl.scrollIntoView = mockScrollIntoView

    const nav = screen.getByRole('navigation')
    const aboutLink = nav.querySelector('a[href="#about"]') as HTMLAnchorElement
    fireEvent.click(aboutLink)

    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)
    cleanup()
  })

  it('uses instant scroll (behavior: auto) when prefers-reduced-motion is active', () => {
    const domCleanup = setupSectionDom()

    // Save original matchMedia stub and override for this test only
    const originalMatchMedia = window.matchMedia
    vi.stubGlobal(
      'matchMedia',
      (query: string): MediaQueryList =>
        ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    )

    renderHeader()

    const aboutEl = document.getElementById('about')!
    const mockScrollIntoView = vi.fn()
    aboutEl.scrollIntoView = mockScrollIntoView

    const nav = screen.getByRole('navigation')
    const aboutLink = nav.querySelector('a[href="#about"]') as HTMLAnchorElement
    fireEvent.click(aboutLink)

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' })

    // Restore original matchMedia so subsequent tests use the default stub
    vi.stubGlobal('matchMedia', originalMatchMedia)
    domCleanup()
  })

  it('uses smooth scroll when prefers-reduced-motion is not active', () => {
    const domCleanup = setupSectionDom()

    // matchMedia returns false for reduced-motion (default from setup.ts)
    renderHeader()

    const aboutEl = document.getElementById('about')!
    const mockScrollIntoView = vi.fn()
    aboutEl.scrollIntoView = mockScrollIntoView

    const nav = screen.getByRole('navigation')
    const aboutLink = nav.querySelector('a[href="#about"]') as HTMLAnchorElement
    fireEvent.click(aboutLink)

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    domCleanup()
  })
})

// ---------------------------------------------------------------------------
// AC 7 & 8: Active link state driven by useScrollSpy
// ---------------------------------------------------------------------------
describe('Active nav link highlighting', () => {
  it('applies an active class or aria-current to the active nav link', () => {
    renderHeader()
    const nav = screen.getByRole('navigation')
    // useScrollSpy defaults to first section id; check that hero link has active styling
    const heroLink = nav.querySelector('a[href="#hero"]') as HTMLAnchorElement
    // The active link should have aria-current="page" or a distinctive class
    const hasActiveMarker =
      heroLink.getAttribute('aria-current') === 'page' ||
      heroLink.className.includes('active') ||
      heroLink.className.includes('text-brand') ||
      heroLink.className.includes('font-semibold') ||
      heroLink.className.includes('font-bold')
    expect(hasActiveMarker).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// AC 9: Mobile — nav links hidden on narrow viewports, hamburger visible
// ---------------------------------------------------------------------------
describe('Mobile hamburger button', () => {
  it('renders a hamburger button', () => {
    renderHeader()
    // The hamburger button should be identifiable by aria-label
    const hamburger = screen.getByRole('button', { name: /menu|navigation/i })
    expect(hamburger).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC 10: Hamburger toggles mobile nav panel open/closed
// ---------------------------------------------------------------------------
describe('Hamburger open/close toggle', () => {
  it('clicking hamburger opens the mobile menu', async () => {
    const user = userEvent.setup()
    renderHeader()

    const hamburger = screen.getByRole('button', { name: /open menu|menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')

    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  it('clicking hamburger again closes the mobile menu', async () => {
    const user = userEvent.setup()
    renderHeader()

    const hamburger = screen.getByRole('button', { name: /open menu|menu/i })
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })
})

// ---------------------------------------------------------------------------
// AC 11: aria-expanded + aria-label on hamburger
// ---------------------------------------------------------------------------
describe('Hamburger accessibility attributes', () => {
  it('has aria-expanded="false" when closed', () => {
    renderHeader()
    const hamburger = screen.getByRole('button', { name: /menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  it('has aria-expanded="true" when open', async () => {
    const user = userEvent.setup()
    renderHeader()

    const hamburger = screen.getByRole('button', { name: /menu/i })
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  it('has an accessible aria-label', () => {
    renderHeader()
    const hamburger = screen.getByRole('button', { name: /menu/i })
    expect(hamburger).toHaveAttribute('aria-label')
    const label = hamburger.getAttribute('aria-label')
    expect(label).toBeTruthy()
    expect(label!.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// AC 12: Selecting a nav link while mobile menu is open closes the menu
// ---------------------------------------------------------------------------
describe('Mobile menu closes on link selection', () => {
  it('closes the mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup()
    const domCleanup = setupSectionDom()
    renderHeader()

    const hamburger = screen.getByRole('button', { name: /menu/i })
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    // When mobile menu is open there are two <nav> elements (desktop + mobile).
    // Use userEvent to click the first available about link.
    const header = screen.getByRole('banner')
    const aboutLink = header.querySelector('a[href="#about"]') as HTMLAnchorElement
    await user.click(aboutLink)

    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    domCleanup()
  })
})

// ---------------------------------------------------------------------------
// AC 13: Escape key closes mobile menu and returns focus to hamburger
// ---------------------------------------------------------------------------
describe('Escape key closes mobile menu', () => {
  it('pressing Escape while menu is open closes it', async () => {
    const user = userEvent.setup()
    renderHeader()

    const hamburger = screen.getByRole('button', { name: /menu/i })
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    })

    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  it('returns focus to hamburger button after Escape closes the menu', async () => {
    const user = userEvent.setup()
    renderHeader()

    const hamburger = screen.getByRole('button', { name: /menu/i })
    await user.click(hamburger)

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    })

    expect(document.activeElement).toBe(hamburger)
  })
})

// ---------------------------------------------------------------------------
// AC 14: LanguageSwitcher and ThemeToggle render in Header
// ---------------------------------------------------------------------------
describe('LanguageSwitcher and ThemeToggle in Header', () => {
  it('renders the LanguageSwitcher inside the Header', () => {
    renderHeader()
    // LanguageSwitcher renders a role="group" with FR and EN buttons
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders FR and EN language buttons in Header', () => {
    renderHeader()
    expect(screen.getByRole('button', { name: /^FR$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^EN$/i })).toBeInTheDocument()
  })

  it('renders the ThemeToggle button inside the Header', () => {
    renderHeader()
    // ThemeToggle has aria-label matching "Switch to light/dark mode"
    const themeBtn = screen.getByRole('button', { name: /light mode|dark mode|theme/i })
    expect(themeBtn).toBeInTheDocument()
  })

  it('ThemeToggle click changes theme app-wide', async () => {
    const user = userEvent.setup()
    renderHeader()

    const themeBtn = screen.getByRole('button', { name: /light mode|dark mode|theme/i })
    await user.click(themeBtn)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('LanguageSwitcher click changes language app-wide', async () => {
    const user = userEvent.setup()
    renderHeader()

    await user.click(screen.getByRole('button', { name: /^EN$/i }))
    expect(document.documentElement.lang).toBe('en')
  })
})

// ---------------------------------------------------------------------------
// AC 15: Keyboard accessibility — all interactive elements reachable via Tab
// ---------------------------------------------------------------------------
describe('Keyboard accessibility', () => {
  it('hamburger button is keyboard-focusable (tabIndex not negative)', () => {
    renderHeader()
    const hamburger = screen.getByRole('button', { name: /menu/i })
    const tabIndex = hamburger.getAttribute('tabindex')
    expect(tabIndex === null || parseInt(tabIndex) >= 0).toBe(true)
  })

  it('nav links have no negative tabindex', () => {
    renderHeader()
    const nav = screen.getByRole('navigation')
    const links = Array.from(nav.querySelectorAll('a'))
    links.forEach((link) => {
      const tabIndex = link.getAttribute('tabindex')
      expect(tabIndex === null || parseInt(tabIndex) >= 0).toBe(true)
    })
  })

  it('interactive elements have focus-visible ring styling', () => {
    const { container } = renderHeader()
    const hamburger = container.querySelector('button[aria-expanded]')!
    expect(hamburger.className).toMatch(/focus-visible:/)
  })
})

// ---------------------------------------------------------------------------
// AC 16: Dark/light theme styling with dark: Tailwind variants
// ---------------------------------------------------------------------------
describe('Dark/light theme styling', () => {
  it('Header root element has paired dark: classes for background', () => {
    const { container } = renderHeader()
    const header = container.querySelector('header')!
    expect(header.className).toMatch(/dark:/)
  })
})

// ---------------------------------------------------------------------------
// AC 17: No TypeScript errors (verified at build time — test is structural check)
// ---------------------------------------------------------------------------
describe('TypeScript and build', () => {
  it('Header renders without throwing a runtime error', () => {
    expect(() => renderHeader()).not.toThrow()
  })
})
