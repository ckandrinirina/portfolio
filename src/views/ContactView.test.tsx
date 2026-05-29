/**
 * ContactView.test.tsx
 *
 * Tests for story 03-04 AC:
 * - Renders <h2> .section-title and eyebrow
 * - Renders the key/value card including languages row and the pitch card
 * - Copy buttons write via navigator.clipboard and show "✓ copied" for ~1400ms
 * - Copy buttons are accessible (labeled, success state announced)
 * - Revealable items carry .reveal class
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { LanguageProvider } from '../i18n/LanguageProvider'
import ContactView from './ContactView'

// ---------------------------------------------------------------------------
// Clipboard mock
// ---------------------------------------------------------------------------

function mockClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    writable: true,
    configurable: true,
  })
  return writeText
}

function renderContact() {
  return render(
    <LanguageProvider>
      <ContactView />
    </LanguageProvider>,
  )
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

// ---------------------------------------------------------------------------
// Section heading
// ---------------------------------------------------------------------------

describe('ContactView — section heading', () => {
  it('renders an <h2> element with class section-title', () => {
    const { container } = renderContact()
    expect(container.querySelector('h2.section-title')).not.toBeNull()
  })

  it('renders an eyebrow element', () => {
    const { container } = renderContact()
    expect(container.querySelector('.eyebrow')).not.toBeNull()
  })

  it('does not render an <h1>', () => {
    renderContact()
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Two-card grid structure
// ---------------------------------------------------------------------------

describe('ContactView — contact grid structure', () => {
  it('renders a .contact-grid container', () => {
    const { container } = renderContact()
    expect(container.querySelector('.contact-grid')).not.toBeNull()
  })

  it('renders a key/value .contact-card', () => {
    const { container } = renderContact()
    expect(container.querySelector('.contact-card')).not.toBeNull()
  })

  it('renders a .contact-pitch card', () => {
    const { container } = renderContact()
    expect(container.querySelector('.contact-pitch')).not.toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Key/value card rows
// ---------------------------------------------------------------------------

describe('ContactView — key/value card content', () => {
  it('renders .contact-row elements for each meta row', () => {
    const { container } = renderContact()
    const rows = container.querySelectorAll('.contact-row')
    expect(rows.length).toBeGreaterThan(0)
  })

  it('renders .contact-key labels', () => {
    const { container } = renderContact()
    const keys = container.querySelectorAll('.contact-key')
    expect(keys.length).toBeGreaterThan(0)
  })

  it('renders .contact-val values', () => {
    const { container } = renderContact()
    const vals = container.querySelectorAll('.contact-val')
    expect(vals.length).toBeGreaterThan(0)
  })

  it('renders the email address', () => {
    renderContact()
    expect(screen.getByText(/ckandrinirina@gmail\.com/i)).toBeInTheDocument()
  })

  it('renders the languages row from contact.languages', () => {
    // Both locales include Malagasy language (FR: "Malgache", EN: "Malagasy")
    renderContact()
    expect(screen.getByText(/Malagasy|Malgache/i)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Pitch card
// ---------------------------------------------------------------------------

describe('ContactView — pitch card', () => {
  it('renders the pitch text from content.contact.pitch', () => {
    localStorage.setItem('locale', 'fr')
    renderContact()
    // FR locale pitch from fr.ts
    expect(screen.getByText(/Un projet en tête/i)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Copy buttons
// ---------------------------------------------------------------------------

describe('ContactView — copy buttons', () => {
  it('renders copy buttons for copyable rows', () => {
    renderContact()
    // Rows with copy: true in the meta array should have a copy button
    const copyButtons = screen.getAllByRole('button')
    expect(copyButtons.length).toBeGreaterThan(0)
  })

  it('copy button has an accessible aria-label', () => {
    renderContact()
    const copyButtons = screen.getAllByRole('button')
    copyButtons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-label')
    })
  })

  it('calls navigator.clipboard.writeText on copy button click', async () => {
    const writeText = mockClipboard()
    renderContact()

    const copyButtons = screen.getAllByRole('button')
    await act(async () => {
      copyButtons[0].click()
    })

    expect(writeText).toHaveBeenCalledTimes(1)
  })

  it('shows "✓ copied" state after clicking copy button', async () => {
    mockClipboard()
    renderContact()

    const copyButtons = screen.getAllByRole('button')
    await act(async () => {
      copyButtons[0].click()
    })

    // The button should show the copied state indicator (may appear in button + aria-live region)
    const copiedIndicators = screen.getAllByText(/✓|copied|copié/i)
    expect(copiedIndicators.length).toBeGreaterThan(0)
  })

  it('reverts copied state after ~1400ms', async () => {
    mockClipboard()
    renderContact()

    const copyButtons = screen.getAllByRole('button')
    await act(async () => {
      copyButtons[0].click()
    })

    // Advance time past 1400ms
    act(() => {
      vi.advanceTimersByTime(1500)
    })

    // The "✓ copied" indicator should be gone (button reverted)
    expect(screen.queryByText(/✓ copied|✓ copié/i)).toBeNull()
  })

  it('copy button has .copied class while in copied state', async () => {
    mockClipboard()
    const { container } = renderContact()

    const copyButtons = screen.getAllByRole('button')
    await act(async () => {
      copyButtons[0].click()
    })

    const copiedBtn = container.querySelector('.contact-copy.copied')
    expect(copiedBtn).not.toBeNull()
  })

  it('copy button loses .copied class after timeout', async () => {
    mockClipboard()
    const { container } = renderContact()

    const copyButtons = screen.getAllByRole('button')
    await act(async () => {
      copyButtons[0].click()
    })

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    const copiedBtn = container.querySelector('.contact-copy.copied')
    expect(copiedBtn).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Accessibility — success state announcement
// ---------------------------------------------------------------------------

describe('ContactView — accessibility', () => {
  it('copy button success state has aria-live region for announcement', () => {
    const { container } = renderContact()
    // There should be an aria-live region to announce the copy success
    const liveRegion = container.querySelector('[aria-live]')
    expect(liveRegion).not.toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Scroll-reveal
// ---------------------------------------------------------------------------

describe('ContactView — scroll-reveal classes', () => {
  it('contact cards carry .reveal class for useScrollReveal targeting', () => {
    const { container } = renderContact()
    const reveals = container.querySelectorAll('.reveal')
    expect(reveals.length).toBeGreaterThan(0)
  })
})
