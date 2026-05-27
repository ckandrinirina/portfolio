# 10-01 · `commands.ts` data + types

**Status:** TODO · **Size:** S · **Blocked by:** 06-01

## Description

Static command set: navigation commands (one per route), quick actions, plus
the dynamic projects list pulled from `PROJECTS`. Items are simple objects with
`cmd`, `desc`, `group`, and either `route` or `action`.

## Files affected

- `src/components/cmdk/commands.ts`

## Implementation notes

```ts
import type { RouteId } from '@/lib/constants'

export type CommandGroup = 'Navigation' | 'Quick' | 'Projects'

export type Command =
  | { cmd: string; desc: string; group: CommandGroup; route: RouteId; action?: never }
  | { cmd: string; desc: string; group: CommandGroup; route?: never; action: 'copyEmail' | 'whatsapp' | 'cycleTheme' }
  | { cmd: string; desc: string; group: 'Projects'; route: 'work' /* opens work view */ }

export const COMMANDS: Command[] = [
  { cmd: 'home',       desc: 'Back to start',                         route: 'home',       group: 'Navigation' },
  { cmd: 'work',       desc: 'Project gallery (8 cases)',             route: 'work',       group: 'Navigation' },
  { cmd: 'experience', desc: 'Career timeline since 2018',            route: 'experience', group: 'Navigation' },
  { cmd: 'skills',     desc: 'Stack reference',                       route: 'skills',     group: 'Navigation' },
  { cmd: 'process',    desc: 'Principles I work by',                  route: 'process',    group: 'Navigation' },
  { cmd: 'contact',    desc: 'Email · WhatsApp · location',           route: 'contact',    group: 'Navigation' },
  { cmd: 'email',      desc: 'Copy email to clipboard',               action: 'copyEmail',   group: 'Quick' },
  { cmd: 'whatsapp',   desc: 'Open WhatsApp chat',                    action: 'whatsapp',    group: 'Quick' },
  { cmd: 'theme',      desc: 'Cycle theme (Ember → Ocean → Forest → Paper)', action: 'cycleTheme', group: 'Quick' },
]
```

Descriptions are intentionally English-only here (cmd palette is a power-user
feature; localizing labels is overkill). If localization is needed later,
swap each `desc` for an i18n key.

## Acceptance criteria

- [ ] All 9 commands present.
- [ ] `Command` discriminated union compiles cleanly.
- [ ] No TypeScript errors on `PROJECTS.map((p) => ({ … as Command }))` extension
      (handled in 10-02; this story only ships the static array).

## Test notes

Trivial; no test in this story (covered in 10-05).

## Edge cases

- None.
