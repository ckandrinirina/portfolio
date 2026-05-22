# Story 03-01: ThemeProvider + useTheme

> **Epic:** Theming System
> **Size:** M
> **Status:** TODO

## Description

Create the React context layer that owns the application's light/dark theme state. `ThemeProvider` wraps the component tree, initialises theme from `localStorage['theme']` (falling back to `prefers-color-scheme`, then `'light'`), synchronises the `dark` class on `document.documentElement` on every state change, and persists the chosen value back to `localStorage`. `useTheme` is the public hook that any component uses to read or update the theme.

This story is the foundational piece of the theming epic: both the anti-FOUC bootstrap script (03-02) and the `ThemeToggle` component (03-03) depend on its API being stable and correctly implemented.

## Acceptance Criteria

- [ ] `ThemeProvider` renders its children without error and provides a non-null context value.
- [ ] On mount, if `localStorage['theme']` is `'dark'`, the initial state is `'dark'` and `document.documentElement` has the `dark` class.
- [ ] On mount, if `localStorage['theme']` is `'light'`, the initial state is `'light'` and `document.documentElement` does NOT have the `dark` class.
- [ ] On mount, if `localStorage['theme']` is absent and `matchMedia('(prefers-color-scheme: dark)').matches` is `true`, the initial state is `'dark'`.
- [ ] On mount, if both `localStorage['theme']` and `prefers-color-scheme` are absent or non-dark, the initial state is `'light'`.
- [ ] Calling `setTheme('dark')` adds the `dark` class to `document.documentElement` and writes `'dark'` to `localStorage['theme']`.
- [ ] Calling `setTheme('light')` removes the `dark` class from `document.documentElement` and writes `'light'` to `localStorage['theme']`.
- [ ] Calling `toggle()` flips the theme from `'light'` to `'dark'` (and vice versa), updating `<html>` class and `localStorage` accordingly.
- [ ] `useTheme()` called outside `ThemeProvider` throws a descriptive error (e.g. `"useTheme must be used within a ThemeProvider"`).
- [ ] When `localStorage` is unavailable (simulated by `localStorage.getItem` throwing), the provider falls back to system preference and does not throw; `toggle()` still updates in-memory state and the `<html>` class for the duration of the session.
- [ ] No double-application flicker: if the bootstrap script has already set `dark` on `<html>` before mount, the provider's effect does not remove and re-add it (i.e. the derived initial state matches the DOM state applied by the script).
- [ ] TypeScript: `ThemeProvider` props are typed; `useTheme` return type is `{ theme: 'light' | 'dark'; setTheme: (t: 'light' | 'dark') => void; toggle: () => void }`.

## Technical Notes

- Use `createContext` with `undefined` as default so the out-of-provider guard works correctly.
- Initialise state with a lazy initialiser function passed to `useState` — this avoids running the `localStorage`/`matchMedia` logic on every re-render.
- The `useEffect` that manages the `<html>` class should have `[theme]` as its dependency array; it should call `document.documentElement.classList.add('dark')` / `.remove('dark')` (not `.toggle`) for clarity.
- Wrap all `localStorage` access in `try/catch` to handle browsers with storage disabled (incognito/privacy mode on some browsers throws on `localStorage.setItem`).
- `matchMedia` may be `undefined` in test environments — guard with `typeof window !== 'undefined' && window.matchMedia`.
- Export `ThemeContext` as a named export for testing purposes (so tests can provide a mock value directly if needed).

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/theme/ThemeProvider.tsx` | Context provider component, state init logic, `<html>` class effect, `localStorage` persistence |
| CREATE | `src/theme/useTheme.ts` | `useTheme` hook — context accessor with out-of-provider guard |

## Dependencies

- **Blocked by:** 01-02 (Tailwind v4 `@custom-variant dark` configured in `src/index.css` — the `dark` class on `<html>` must actually activate dark styles)
- **Blocks:** 03-02 (bootstrap script must replicate this story's precedence logic), 03-03 (ThemeToggle calls `useTheme`), 05-01 (main.tsx wraps app in ThemeProvider)

## Related

- **Epic:** theming-system
- **Related stories:** 03-02, 03-03, 05-01
- **Spec reference:** components.md §Providers (ThemeProvider), data-flow.md §4 (theme toggle), data-flow.md §Failure modes (localStorage unavailable)
