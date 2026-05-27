# Epic 10 · Command palette

**Goal:** A `⌘/Ctrl+K` modal that lists navigation routes, quick actions
(copy email, open WhatsApp, cycle theme), and projects — searchable, keyboard-
operable.

## Stories

| ID    | Title                                              | Size |
|-------|----------------------------------------------------|------|
| 10-01 | `commands.ts` data + types                          | S    |
| 10-02 | `CommandPalette.tsx` UI + `.cmdk*` CSS              | L    |
| 10-03 | `useCmdK` hook (toggle)                             | S    |
| 10-04 | Wire actions (copyEmail, whatsapp, cycleTheme)      | S    |
| 10-05 | CommandPalette tests                                | M    |

## Dependencies

- Epic 02 (theme cycle).
- Epic 06 (App route nav).
- Epic 03 (UI labels: cmdk groups, placeholder).
- `projects.ts` from Epic 03-02.

## Acceptance for the epic

- `⌘K` opens the palette; `Escape` or click-outside closes.
- Typing filters items.
- Arrow keys move active; Enter runs the active item.
- Items grouped as Navigation → Quick → Projects.
- "theme" cycles the theme.
- "email" copies email to clipboard.
- "whatsapp" opens the WhatsApp URL in a new tab.
- Selecting a project navigates to Work.
