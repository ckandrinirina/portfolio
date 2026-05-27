# Epic 03 · Content model migration

**Goal:** Reshape the FR/EN content modules to fit the Atelier Terminal UI.
Drop `education` and `spokenLanguages` (Education is gone; languages move into
the contact card). Add new slices: `hero.greet`, `hero.tagline`, `hero.roles[]`,
`now`, `stats[]`, `marquee[]`, `process[]`, `contact.languages[]`. Add a
`projects.ts` data module with the 8 entries. Extend `ui.ts` micro-labels.

## Scope

- `src/content/types.ts` — rewrite interfaces.
- `src/content/projects.ts` — new data module (project list, locale-neutral).
- `src/content/fr.ts` — extend (add new slices; remove old ones); copy
  translated into French.
- `src/content/en.ts` — extend; copy from mockup as baseline.
- `src/i18n/ui.ts` — add labels: route names, eyebrows, "copy" / "copied",
  cmd-k group labels, scroll-hint, theme cycle button, project actions.
- `src/content/content.test.ts` — update parity assertions.

## Stories

| ID    | Title                                                | Size |
|-------|------------------------------------------------------|------|
| 03-01 | `types.ts` — new content shape                       | M    |
| 03-02 | `projects.ts` — 8-project data module                | L    |
| 03-03 | `fr.ts` — translate new copy + drop removed slices   | L    |
| 03-04 | `en.ts` — populate from mockup + drop removed slices | L    |
| 03-05 | `ui.ts` — micro-labels extension                     | M    |
| 03-06 | Update content parity test                           | S    |
| 03-07 | Clean obsolete content tests                         | S    |

## Acceptance for the epic

- `npm run test -- --run src/content/` passes.
- `import('./content/fr').then((m) => m.frContent)` returns an object that
  satisfies the new `PortfolioContent` shape (TypeScript-checked).
- `en.ts` and `fr.ts` have identical key sets at every depth (parity test).
- `projects.ts` exports 8 entries matching the mockup's IDs / num / year / etc.

## Dependencies

- None (pure data layer). Old plan's 04-01 .. 04-08 are kept; this epic
  extends them.

## References

- [`docs/architecture/features/2026-05-27_atelier-terminal-ui.md#content-model`](../../../../docs/architecture/features/2026-05-27_atelier-terminal-ui.md#content-model)
- The mockup React source at `/tmp/script-37f20218.js` (extracted during design)
  — projects array starts at line 7, timeline at line 114, skills at line 138,
  process at line 145.
