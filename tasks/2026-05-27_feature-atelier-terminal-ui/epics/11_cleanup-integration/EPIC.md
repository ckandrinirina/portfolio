# Epic 11 · Cleanup, integration & verification

**Goal:** Delete the legacy code paths that the new UI replaces, finalize
`index.html` (preconnect + anti-FOUC inline script + OG meta intact),
update `main.tsx` to wire the new providers, refresh any leftover tests
that referenced removed code, and do an end-to-end manual verification of
every interaction.

## Stories

| ID    | Title                                              | Size |
|-------|----------------------------------------------------|------|
| 11-01 | Finalize `index.html` (preconnect + bootstrap + meta) | S |
| 11-02 | Re-wire `main.tsx` providers                        | S    |
| 11-03 | Delete obsolete files (Header, Footer, Section, sections/*, useScrollSpy) | M |
| 11-04 | Update / fix any leftover tests                     | M    |
| 11-05 | Manual end-to-end verification (golden path)        | M    |

## Dependencies

- All previous epics (01–10).

## Acceptance for the epic

- `grep -RIn "Header\|Footer\|Section\.\|useScrollSpy\|ThemeToggle\|components/sections" src/`
  returns nothing.
- `npm run lint && npm run test -- --run && npm run build` all pass.
- Manual verification checklist (delivered in 11-05) is fully checked.
