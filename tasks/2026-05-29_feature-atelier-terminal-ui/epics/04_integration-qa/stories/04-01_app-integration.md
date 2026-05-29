# Story 04-01: App.tsx integration, view routing & obsolete-file teardown

> **Epic:** Integration & QA
> **Size:** XL
> **Status:** TODO

## Description

Rewrite `App.tsx` to be the orchestrator of the Atelier Terminal shell, then remove every
obsolete file from the old section-based design. This is the convergence story — it brings
together the hooks (02-01), chrome (02-03), views (03-01/03-03/03-04), and overlays (03-02)
into the running application, and ensures the new shell is the only UI left.

`App.tsx` owns the cross-cutting state and wiring:

- **State:** current `route`, navigation `direction` (`'up' | 'down'`), the open `project`
  for the modal, and the command-palette `open` flag, plus the 850 ms `locked` flag.
- **Navigation:** a single `navigate(idOrDir)` that resolves the next route from `ROUTE_ORDER`,
  sets direction, calls `history.replaceState(null, '', '#' + id)`, resets the view’s
  `scrollTop`, and engages the lock. Wires `useHashRoute`, `useScrollToNavigate`,
  `useKeyboardArrows`, `useCmdK`, and `useScrollReveal` against the view ref.
- **View shell:** renders `<aside>` Sidebar + `<main>` (Topbar + the re-keyed `.view`
  container with the active view + `ScrollHint`). The `.view` is keyed by route so React
  remounts it, and gets `view-enter-down`/`-up` from `direction`.
- **Overlays:** renders `CommandPalette` (mapping command descriptors to handlers — nav,
  theme cycle, language toggle, CV download, open project) and `ProjectModal` (controlled by
  the `project` state) and `Cursor`.

**Teardown (run last):** delete `Header`, `Footer`, `Section`, all `components/sections/*`,
and any remaining `ThemeToggle`/`useScrollSpy` files and their tests; remove all imports of
them. The tree must contain only the new shell.

## Acceptance Criteria

- [ ] `App.tsx` renders `<aside>` (Sidebar), `<main>` (Topbar + `.view` + `ScrollHint`), and the
      overlays (`CommandPalette`, `ProjectModal`, `Cursor`).
- [ ] The correct view renders for the active route; an unknown/empty hash defaults to `home`.
- [ ] Clicking a sidebar row navigates and sets the enter-direction from `ROUTE_ORDER` position.
- [ ] Scroll-gesture, arrow/Page keys, hash changes, and ⌘K all drive navigation/overlays via the
      wired hooks.
- [ ] On every nav: the hash updates via `history.replaceState`, the view `scrollTop` resets to 0,
      the `.view` remounts (re-keyed) with `view-enter-down`/`-up` per direction, and a 850 ms lock
      blocks re-entrant navs.
- [ ] Opening a project (from a card or the cmdk Projects group) sets the modal state; closing
      clears it and restores focus.
- [ ] Command-palette items run: Navigation navigates, Quick actions fire (theme cycle / language
      toggle / CV download), Projects open the modal or link.
- [ ] `Header.tsx`, `Footer.tsx`, `Section.tsx`, `components/sections/*` (all 8), and any remaining
      `ThemeToggle`/`useScrollSpy` files + tests are deleted, with no dangling imports anywhere.
- [ ] `npm run build` passes and the **entire** test suite is green (no references to removed files).
- [ ] Provider order remains `ThemeProvider → LanguageProvider → App` (in `main.tsx`).

## Technical Notes

- `navigate` accepts either a concrete route id (sidebar/cmdk/hash) or a direction (`'up'`/`'down'`
  from gestures/keys); resolve direction to the neighbouring route via `ROUTE_ORDER`, clamping at ends.
- Re-key the `.view` (e.g. `key={route}`) so the remount triggers the entrance keyframe; pick
  `view-enter-down`/`-up` from `direction`.
- Keep leaf components prop-driven: pass `route`, `navigate`, `onOpenCmdK`, `onOpenProject`, etc.
- Map `commands.ts` descriptors to handlers here (the data file stays App-agnostic, per 03-02).
- Do the teardown **after** the new shell renders and tests pass, so the build is never left with
  two half-wired designs. After deleting, grep for stale imports and dead `ui` keys.
- This story’s tests are integration-level: render `App`, drive navigation/overlays, assert the
  right view/overlay shows. Mock `matchMedia`/RAF/clipboard as the child components require.

## Files to Create/Modify

| Action | File Path                                   | Purpose                                   |
| ------ | ------------------------------------------- | ----------------------------------------- |
| MODIFY | `src/App.tsx`                               | Route/view shell + overlays orchestration |
| MODIFY | `src/App.test.tsx`                          | Rewritten integration tests               |
| DELETE | `src/components/layout/Header.tsx` (+test)  | Replaced by Sidebar + Topbar              |
| DELETE | `src/components/layout/Footer.tsx` (+test)  | No footer in new design                   |
| DELETE | `src/components/layout/Section.tsx` (+test) | Replaced by view-level layout             |
| DELETE | `src/components/sections/*` (8 + tests)     | Replaced by `views/`                      |
| DELETE | residual `ThemeToggle`/`useScrollSpy` files | Already superseded (01-02 / 02-01)        |

## Dependencies

- **Blocked by:** 02-01 (hooks), 02-03 (chrome), 03-01 (WorkView + modal), 03-02 (overlays),
  03-03 (HomeView), 03-04 (remaining views)
- **Blocks:** 04-02 (a11y/responsive pass runs against the assembled shell)

## Related

- **Epic:** integration-qa
- **Related stories:** all of Epics 02–03 (consumed here), 04-02 (validates this)
- **Spec reference:** feature doc §Components (App), §Data flow (Route navigation), §Folder
  structure (delta — deletions), §Layout shell

## Implementation Plan

### SOLID Analysis

- **S — Single Responsibility:** App owns orchestration only; rendering/motion live in the leaves
  and CSS; data lives in content/commands.
- **O — Open/Closed:** adding a route = a view entry + `ROUTE_ORDER`/metadata; App’s render map
  iterates rather than hardcoding.
- **L — Liskov:** any view component slots into the `.view` container the same way.
- **I — Interface Segregation:** each child receives only the props it needs.
- **D — Dependency Inversion:** App depends on hook/command abstractions; it maps descriptors to
  handlers rather than children reaching into App state.

### Subtasks

- [ ] 1. Write integration tests for routing, transitions, overlays, and defaults (RED).
- [ ] 2. Implement App state + `navigate` + hook wiring (GREEN).
- [ ] 3. Render chrome + re-keyed view shell + ScrollHint.
- [ ] 4. Wire overlays + command/project action mapping.
- [ ] 5. Teardown obsolete files; grep for dangling imports/keys.
- [ ] 6. QA validation — map each AC, run the full suite, check TypeScript.
