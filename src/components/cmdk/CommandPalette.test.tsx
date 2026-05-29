/**
 * CommandPalette.test.tsx — Unit tests for the ⌘K modal.
 *
 * Covers:
 * - Renders three groups (Navigation, Quick, Projects) with localized labels
 * - Input is focused on open
 * - Typing filters items across groups; empty state shown on no match
 * - ArrowUp/Down navigate active item; wraps around
 * - Enter runs the active item and calls onRun
 * - Escape calls onClose
 * - Keyboard-operable end-to-end
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import { ThemeProvider } from '../../theme/ThemeProvider'
import CommandPalette from './CommandPalette'
import type { CommandDescriptor } from './commands'

function renderPalette(
  open = true,
  onClose = vi.fn(),
  onRun = vi.fn<(command: CommandDescriptor) => void>(),
) {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <CommandPalette open={open} onClose={onClose} onRun={onRun} />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

describe('CommandPalette', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.lang = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ── AC 1: renders three groups with localized labels ──────────────────────
  it('renders the Navigation group', () => {
    renderPalette()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })

  it('renders the Quick group', () => {
    renderPalette()
    // "Actions rapides" in FR or "Quick actions" in EN
    const text =
      screen.queryByText('Actions rapides') ??
      screen.queryByText('Quick actions')
    expect(text).toBeInTheDocument()
  })

  it('renders the Projects group', () => {
    renderPalette()
    const text = screen.queryByText('Projets') ?? screen.queryByText('Projects')
    expect(text).toBeInTheDocument()
  })

  it('renders command items sourced from commands.ts in each group', () => {
    renderPalette()
    // Navigation group should have items (home, work, experience, skills, process, contact)
    const navItems = screen.getAllByRole('option')
    expect(navItems.length).toBeGreaterThan(0)
  })

  // ── AC 2: input is focused on open ────────────────────────────────────────
  it('focuses the search input when open', () => {
    renderPalette(true)
    const input = screen.getByRole('combobox')
    expect(document.activeElement).toBe(input)
  })

  it('does not render when closed', () => {
    renderPalette(false)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  // ── AC 3: typing filters items across groups ───────────────────────────────
  it('filters items when user types a query', async () => {
    const user = userEvent.setup()
    renderPalette()
    const input = screen.getByRole('combobox')
    // Typing something that matches a nav route
    await user.type(input, 'home')
    // Should show at least one matching item
    const options = screen.getAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
  })

  it('shows an empty state when no items match the query', async () => {
    const user = userEvent.setup()
    renderPalette()
    const input = screen.getByRole('combobox')
    await user.type(input, 'zzzzznomatchzzzzz')
    // Empty state message should appear
    const emptyState = screen.getByTestId('cmdk-empty')
    expect(emptyState).toBeInTheDocument()
  })

  // ── AC 4: ArrowDown / ArrowUp navigate active item ────────────────────────
  it('marks the first item active after opening', () => {
    renderPalette()
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveClass('active')
  })

  it('moves active item down on ArrowDown', async () => {
    const user = userEvent.setup()
    renderPalette()
    const input = screen.getByRole('combobox')
    await user.type(input, '{ArrowDown}')
    const options = screen.getAllByRole('option')
    expect(options[1]).toHaveClass('active')
  })

  it('moves active item up on ArrowUp', async () => {
    const user = userEvent.setup()
    renderPalette()
    const input = screen.getByRole('combobox')
    // Go down twice then up once → index 1
    await user.type(input, '{ArrowDown}')
    await user.type(input, '{ArrowDown}')
    await user.type(input, '{ArrowUp}')
    const options = screen.getAllByRole('option')
    expect(options[1]).toHaveClass('active')
  })

  it('wraps from last item to first on ArrowDown', async () => {
    const user = userEvent.setup()
    renderPalette()
    const input = screen.getByRole('combobox')
    const options = screen.getAllByRole('option')
    // Press ArrowDown as many times as there are items (wraps to first)
    for (let i = 0; i < options.length; i++) {
      await user.type(input, '{ArrowDown}')
    }
    const updatedOptions = screen.getAllByRole('option')
    expect(updatedOptions[0]).toHaveClass('active')
  })

  // ── AC 5: Enter runs the active item's action ──────────────────────────────
  it('calls onRun with the active command descriptor on Enter', async () => {
    const user = userEvent.setup()
    const onRun = vi.fn()
    renderPalette(true, vi.fn(), onRun)
    const input = screen.getByRole('combobox')
    await user.type(input, '{Enter}')
    expect(onRun).toHaveBeenCalledOnce()
    // The descriptor should have a 'kind' property
    expect(onRun.mock.calls[0][0]).toHaveProperty('kind')
  })

  // ── AC 6: Escape closes the palette ───────────────────────────────────────
  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderPalette(true, onClose)
    const input = screen.getByRole('combobox')
    await user.type(input, '{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  // ── AC 7: backdrop click closes the palette ───────────────────────────────
  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderPalette(true, onClose)
    const backdrop = screen.getByTestId('cmdk-backdrop')
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  // ── AC 8: command descriptors have the right kind ─────────────────────────
  it('calls onRun with a nav descriptor when Enter on nav item', async () => {
    const user = userEvent.setup()
    const onRun = vi.fn()
    renderPalette(true, vi.fn(), onRun)
    const input = screen.getByRole('combobox')
    // First item is in Navigation group → kind = 'nav'
    await user.type(input, '{Enter}')
    const descriptor = onRun.mock.calls[0][0] as CommandDescriptor
    expect(descriptor.kind).toBe('nav')
  })
})
