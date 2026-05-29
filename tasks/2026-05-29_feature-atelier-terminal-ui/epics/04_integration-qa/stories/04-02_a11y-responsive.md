# Story 04-02: Accessibility, reduced-motion & responsiveness pass

> **Epic:** Integration & QA
> **Size:** L
> **Status:** TODO

## Description

With the shell assembled (04-01), validate and fix accessibility, reduced motion, and
responsive layout across the documented breakpoints. This is a verification-and-remediation
story: audit the running app against the feature doc’s accessibility table and responsive
specs, then fix whatever fails.

Coverage areas:

- **Landmarks & headings:** `<aside>` sidebar, `<main>` pane, exactly one `<h1>` (Home hero
  name), one `<h2>` `.section-title` per view.
- **Focus:** every interactive element (`.sb-row`, `.btn`, `.tb-search`, `.proj-card`, cmdk
  input/items, copy buttons) reachable by keyboard with a visible focus ring that the custom
  cursor does not suppress.
- **ARIA:** role rotor `aria-live="polite"`; copy buttons announce "✓ copied"; cmdk input has a
  placeholder and the arrow-key/Enter/Escape contract; modal traps focus and is labelled.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables all entrance/letter/scroll/marquee
  animations and forces the final visible state — verified for every animated surface.
- **Responsiveness:** correct layout at desktop, ≤1100px (`40px 40px 60px` view padding), ≤880px
  (grid stacks to `56px 1fr`, sidebar becomes a horizontal strip, status block hidden, cursor
  disabled), and ≤600px (`24px 18px 60px`).

## Acceptance Criteria

- [ ] Landmarks are correct: one `<aside>`, one `<main>`, exactly one `<h1>`, and one `<h2>` per view.
- [ ] Full keyboard traversal works across sidebar, topbar, views, modal, and command palette;
      focus rings are visible everywhere and not hidden by the cursor styles.
- [ ] Tab order is logical and the modal/command palette trap and restore focus correctly.
- [ ] `aria-live` rotor announces; copy buttons announce their success state; cmdk meets its
      keyboard contract (`↑/↓`, `Enter`, `Esc`).
- [ ] Under `prefers-reduced-motion: reduce`, no entrance/letter/scroll/marquee animation plays and
      all content is visible in its final state (verified per surface).
- [ ] Layout is correct and free of overflow/clipping at desktop, ≤1100px, ≤880px, and ≤600px;
      at ≤880px the sidebar is a horizontal strip, the status block is hidden, and the custom cursor
      is disabled.
- [ ] Any issues found are fixed (CSS/markup/ARIA), with tests added where a regression is testable.
- [ ] An automated a11y check (e.g. axe via the test runner, or documented manual results) shows no
      critical violations on Home and Contact at minimum.
- [ ] `npm run build` passes and the suite is green.

## Technical Notes

- Prefer fixing at the source (the component/CSS) over patching App. Many fixes belong in 01-01’s
  stylesheet (focus styles, reduced-motion overrides) or the individual components.
- Use Testing Library + jest-dom for landmark/role/focus assertions; consider `jest-axe`/`axe-core`
  for automated checks on key views. If automated screen-reader testing isn’t feasible, record a
  manual pass (Home + Contact) in the implementation summary.
- Verify reduced motion by toggling the `matchMedia` mock and asserting the final-state classes/
  styles; the CSS media query is the enforcement mechanism.
- Responsiveness is largely CSS (01-01); validate the breakpoints and fix any class gaps. Manual
  resize verification is acceptable where layout can’t be asserted in jsdom — document it.
- The custom cursor must never be the only affordance; confirm focus styling stands alone.

## Files to Create/Modify

| Action        | File Path                 | Purpose                                         |
| ------------- | ------------------------- | ----------------------------------------------- |
| MODIFY        | `src/index.css`           | Focus/reduced-motion/responsive fixes as needed |
| MODIFY        | affected components/views | Landmark/ARIA/focus fixes as needed             |
| CREATE/MODIFY | relevant `*.test.tsx`     | Regression tests for fixed issues; a11y checks  |

## Dependencies

- **Blocked by:** 04-01 (the assembled shell must exist to audit)
- **Blocks:** 04-03 (Lighthouse audit runs after a11y/responsive are sound)

## Related

- **Epic:** integration-qa
- **Related stories:** 04-01 (subject under test), 04-03 (Lighthouse a11y score)
- **Spec reference:** feature doc §Accessibility, §Layout shell (breakpoints), §Non-functional targets

## Implementation Plan

### SOLID Analysis

- **S — Single Responsibility:** fixes land in the component/CSS that owns the concern, not in a
  catch-all.
- **O — Open/Closed:** reduced-motion and focus rules are global CSS that new components inherit.
- **L — Liskov:** accessible patterns apply uniformly across views.
- **I — Interface Segregation:** ARIA attributes attach to the specific element that needs them.
- **D — Dependency Inversion:** behavior keys off media queries / platform APIs, not hardcoded sizes.

### Subtasks

- [ ] 1. Audit landmarks/headings/focus/ARIA; list violations (RED where testable).
- [ ] 2. Fix landmark/ARIA/focus issues at the source (GREEN).
- [ ] 3. Verify + fix reduced-motion across every animated surface.
- [ ] 4. Verify + fix layout at ≤1100 / ≤880 / ≤600 breakpoints.
- [ ] 5. Add automated a11y check on Home + Contact (or document manual pass).
- [ ] 6. QA validation — map each AC, run the suite, check TypeScript.
