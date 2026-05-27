# Epic 06 · Routing & navigation

**Goal:** Replace the scroll-spy navigation with route-based navigation.
Five entry points to a route change must converge on the same `navTo(id, dir)`
in `App`: sidebar click, ⌘K item, `window.location.hash`, wheel/touch gesture,
keyboard arrows.

## Scope

- `ROUTE_ORDER`, `ROUTE_NEXT_LABEL` constants.
- `useHashRoute(setRoute)` — reads + writes URL hash.
- `useScrollToNavigate(viewRef, route, locked, navigate)` — the boundary-aware
  wheel + touch gesture state machine (90px threshold, 180ms gesture
  end, gestures starting at boundary only).
- `useKeyboardArrows(navigate, locked)` — ArrowUp/Down + PageUp/PageDown.
- Rewrite `src/App.tsx` to own route + direction + lock state, mount the
  sidebar + topbar + view shell, key the view container by route for
  remount-driven view-enter animation, manage scroll-reset on nav, and
  emit the nav-lock sweep.

## Stories

| ID    | Title                                            | Size |
|-------|--------------------------------------------------|------|
| 06-01 | `ROUTE_ORDER` constants + types                  | S    |
| 06-02 | `useHashRoute` hook                              | S    |
| 06-03 | `useScrollToNavigate` hook                       | XL   |
| 06-04 | `useKeyboardArrows` hook                         | S    |
| 06-05 | `App.tsx` rewrite (route shell)                  | XL   |

## Dependencies

- Epic 05 (sidebar / topbar / view CSS and components).
- Epic 04 (cursor, useScrollReveal).
- Epic 03 (UI labels for breadcrumb / scroll-hint).

## Acceptance for the epic

- Visiting `/#work` lands directly on the Work view.
- Clicking sidebar rows updates the URL hash and switches the view with a
  directional enter animation.
- Scrolling past the top of `home` (at the top, releasing then scrolling up)
  triggers a previous-route nav (clamped — `home` has no prev).
- Scrolling past the bottom of any view advances to the next route.
- ArrowDown / PageDown at the bottom triggers the next route.
- The top sweep animation fires on every route change.
- The view container scrollTop is reset to 0 after each route change.
- After `navTo`, listeners are locked for 850ms (no double-fires).
