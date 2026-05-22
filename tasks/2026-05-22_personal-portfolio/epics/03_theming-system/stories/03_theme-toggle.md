# Story 03-03: ThemeToggle component + test

> **Epic:** Theming System
> **Size:** M
> **Status:** TODO

## Description

Build the `ThemeToggle` UI component — the button a visitor clicks to switch between light and dark modes. The component reads current theme state via `useTheme()` and calls `toggle()` on click. It renders a contextually appropriate icon (sun for light, moon for dark) and a screen-reader-friendly label, and sets `aria-pressed` to reflect the active theme. A companion test file verifies DOM effects and `localStorage` persistence end-to-end.

This component is the only user-facing entry point for the theming epic. It will be placed in the `Header` (story 05-02), but that wiring is out of scope here.

## Acceptance Criteria

- [ ] Clicking `ThemeToggle` in light mode switches to dark: `dark` class is added to `document.documentElement`.
- [ ] Clicking `ThemeToggle` in dark mode switches to light: `dark` class is removed from `document.documentElement`.
- [ ] After each click, `localStorage['theme']` is updated to the new theme value (`'dark'` or `'light'`).
- [ ] `aria-pressed` is `"true"` when the current theme is `'dark'`; `"false"` when `'light'`.
- [ ] The rendered icon/symbol reflects the CURRENT theme (e.g. moon icon when dark is active, sun icon when light is active — or the inverse if used as "switch to" semantics, but the choice must be documented and consistent with `aria-pressed`).
- [ ] The component has an `aria-label` (e.g. `"Toggle theme"` or `"Switch to dark mode"` / `"Switch to light mode"`) that is meaningful to screen-reader users.
- [ ] The button is keyboard-focusable (`tabIndex` not negative) and shows a visible focus ring on `:focus-visible` (Tailwind `focus-visible:ring-*` or equivalent).
- [ ] The component renders as a `<button>` element (not `<div>` or `<span>`), ensuring native keyboard activation via Space/Enter.
- [ ] `ThemeToggle.test.tsx` passes: renders inside a `ThemeProvider` wrapper, simulates a click, and asserts `document.documentElement.classList.contains('dark')` changes and `localStorage.getItem('theme')` returns the expected value.
- [ ] `ThemeToggle.test.tsx` covers both directions: light → dark and dark → light transitions.
- [ ] No TypeScript errors; component props interface exported (even if empty, for future extensibility).
- [ ] `npm run test -- --run` exits with code 0 after this story.

## Technical Notes

- Wrap the test render in a `ThemeProvider` helper (a small `renderWithTheme` utility or inline JSX wrapper). This keeps tests isolated without mocking the context.
- To test both directions, run one test starting with `localStorage['theme'] = 'light'` and another starting with `localStorage['theme'] = 'dark'`; reset `localStorage` in `beforeEach` / `afterEach`.
- Mock `window.matchMedia` in `src/test/setup.ts` (or per-file) since jsdom does not implement it:
  ```ts
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  })
  ```
- Use SVG icons inline or from a zero-dependency icon set already in the project (e.g. Heroicons as copy-paste SVG). Do NOT add an icon library dependency just for this component.
- The `Button` component from story 02-04 may be used as the base element to inherit variant styling and focus ring handling, or `ThemeToggle` can render a plain `<button>` styled directly — either is acceptable; document the choice.
- `aria-pressed` should be a string (`"true"` / `"false"`) not a boolean to satisfy ARIA spec and avoid React serialisation inconsistencies.

## Files to Create/Modify

| Action | File Path                                | Purpose                                                                                      |
| ------ | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| CREATE | `src/components/ui/ThemeToggle.tsx`      | Toggle button component — reads `useTheme`, calls `toggle()`, renders icon + aria attributes |
| CREATE | `src/components/ui/ThemeToggle.test.tsx` | Vitest + Testing Library tests asserting DOM class and localStorage effects                  |

## Dependencies

- **Blocked by:** 03-01 (useTheme hook must exist), 02-04 (Button component available as optional base)
- **Blocks:** 05-02 (Header renders ThemeToggle in the top bar)

## Related

- **Epic:** theming-system
- **Related stories:** 03-01, 02-04, 05-02
- **Spec reference:** components.md §UI ThemeToggle, components.md §Accessibility notes, data-flow.md §4 (theme toggle flow)
