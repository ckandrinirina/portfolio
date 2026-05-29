/**
 * CommandPalette — the hand-rolled ⌘K command modal.
 *
 * A controlled component: App (04-01) owns the `open` state (via `useCmdK`) and
 * maps run commands to real handlers. This component renders the search input,
 * the three filterable groups (Navigation / Quick / Projects) sourced from
 * `commands.ts`, and dispatches the active command through `onRun`.
 *
 * Keyboard contract:
 *   - Arrow Up / Down move the active item across the *filtered* flat list (wraps).
 *   - Enter runs the active item (`onRun`) then closes.
 *   - Escape closes.
 *   - The input is focused on open.
 *
 * SOLID notes:
 *   - S: renders command UI only; the data lives in `commands.ts`.
 *   - O: new commands are new dataset entries — no change here.
 *   - D: depends on abstract `CommandDescriptor`s, not App handlers.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { cn } from '../../lib/utils'
import { COMMANDS, type CommandDescriptor } from './commands'

export interface CommandPaletteProps {
  /** Whether the palette is visible. App owns this (via useCmdK). */
  open: boolean
  /** Close the palette (Escape, backdrop click, or after running an item). */
  onClose: () => void
  /** Run the chosen command — App maps the descriptor to a real handler. */
  onRun: (command: CommandDescriptor) => void
}

type GroupKind = CommandDescriptor['kind']

/** Display order of the three groups + their localized header key. */
const GROUPS: ReadonlyArray<{
  kind: GroupKind
  labelKey: 'cmdkNavigation' | 'cmdkQuick' | 'cmdkProjects'
}> = [
  { kind: 'nav', labelKey: 'cmdkNavigation' },
  { kind: 'quick', labelKey: 'cmdkQuick' },
  { kind: 'project', labelKey: 'cmdkProjects' },
]

/** Quick-action → existing UI label key (keeps item text distinct from the
 *  "Quick actions" group header and stays localized). */
const QUICK_LABEL_KEY: Record<
  Extract<CommandDescriptor, { kind: 'quick' }>['actionId'],
  'themeToggle' | 'languageSwitcher' | 'downloadCv'
> = {
  cycleTheme: 'themeToggle',
  toggleLanguage: 'languageSwitcher',
  downloadCv: 'downloadCv',
}

export default function CommandPalette({
  open,
  onClose,
  onRun,
}: CommandPaletteProps) {
  const { t } = useLanguage()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  // Track the previous `open` so we can reset transient state when the palette
  // (re)opens — React's "adjust state during render" pattern, which avoids the
  // cascading renders of resetting inside an effect.
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setQuery('')
      setActive(0)
    }
  }

  // The localized display label for a single command. Quick actions reuse the
  // existing chrome-control labels so they read distinctly from the group
  // header ("Quick actions"); projects show their proper name; nav uses its key.
  const labelFor = (cmd: CommandDescriptor): string => {
    if (cmd.kind === 'project') return cmd.name
    if (cmd.kind === 'quick') return t(QUICK_LABEL_KEY[cmd.actionId])
    return t(cmd.labelKey as Parameters<typeof t>[0])
  }

  // Filtered, flat list (display order) — the keyboard cursor walks this.
  const flat = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = (cmd: CommandDescriptor) =>
      q === '' ||
      cmd.searchText.toLowerCase().includes(q) ||
      labelFor(cmd).toLowerCase().includes(q)
    // Keep group display order: nav → quick → project.
    return GROUPS.flatMap((g) =>
      COMMANDS.filter((c) => c.kind === g.kind && matches(c)),
    )
    // labelFor depends on `t`; including COMMANDS (module constant) is harmless.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, t])

  // Focus the input on open so the palette is keyboard-operable immediately.
  // (DOM side-effect only — no state writes here.)
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Clamp at read-time: typing resets `active` to 0 (onChange), so it normally
  // stays in range, but a derived index keeps it safe if the list shrinks.
  const activeIndex = flat.length === 0 ? -1 : Math.min(active, flat.length - 1)

  if (!open) return null

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (flat.length > 0) setActive((a) => (a + 1) % flat.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (flat.length > 0) setActive((a) => (a - 1 + flat.length) % flat.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = flat[activeIndex]
      if (cmd) {
        onRun(cmd)
        onClose()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  function runItem(cmd: CommandDescriptor) {
    onRun(cmd)
    onClose()
  }

  return (
    <div
      className="cmdk-bg"
      data-testid="cmdk-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="cmdk-input"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-autocomplete="list"
          placeholder="Type a command or search…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={handleKeyDown}
        />

        <div className="cmdk-list" id="cmdk-list" role="listbox">
          {flat.length === 0 ? (
            <div className="cmdk-grp-label" data-testid="cmdk-empty">
              No results
            </div>
          ) : (
            GROUPS.map((group) => {
              const items = flat.filter((c) => c.kind === group.kind)
              if (items.length === 0) return null
              return (
                <div className="cmdk-grp" key={group.kind}>
                  <div className="cmdk-grp-label">{t(group.labelKey)}</div>
                  {items.map((cmd) => {
                    const index = flat.indexOf(cmd)
                    const isActive = index === activeIndex
                    return (
                      <div
                        key={cmd.id}
                        role="option"
                        aria-selected={isActive}
                        className={cn('cmdk-item', isActive && 'active')}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => runItem(cmd)}
                      >
                        <span className="cmdk-item-glyph" aria-hidden="true">
                          {cmd.glyph}
                        </span>
                        <span>{labelFor(cmd)}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>

        <div className="cmdk-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> run
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  )
}
