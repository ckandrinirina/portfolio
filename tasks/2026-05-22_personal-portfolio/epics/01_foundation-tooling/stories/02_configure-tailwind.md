# Story 01-02: Configure Tailwind CSS v4

> **Epic:** Project Foundation & Tooling
> **Size:** S
> **Status:** TODO

## Description

Install `tailwindcss` and `@tailwindcss/vite`, register the Tailwind plugin in `vite.config.ts` alongside the existing React plugin, and replace `src/index.css` with the Tailwind v4 CSS-first configuration: `@import "tailwindcss"` plus the custom class-based dark variant. This story enables Tailwind utility classes and the dark mode strategy across all future components without requiring any `tailwind.config.js` or PostCSS configuration files.

## Acceptance Criteria

- [ ] `tailwindcss` and `@tailwindcss/vite` are listed as dev dependencies in `package.json`.
- [ ] `vite.config.ts` imports `tailwindcss` from `'@tailwindcss/vite'` and adds it to the `plugins` array (alongside the React plugin, not replacing it).
- [ ] `src/index.css` begins with `@import "tailwindcss";` as its first non-comment line.
- [ ] `src/index.css` contains the custom dark variant declaration: `@custom-variant dark (&:where(.dark, .dark *));`.
- [ ] A Tailwind utility class (e.g. `text-blue-500`) applied to an element in the running dev app renders the correct style — visible in browser dev tools.
- [ ] Adding `class="dark"` to `<html>` in the browser dev tools causes a `dark:` utility (e.g. `dark:bg-gray-900`) applied to a child element to take effect — confirmed visually.
- [ ] No `tailwind.config.js`, `tailwind.config.ts`, `postcss.config.js`, or `postcss.config.ts` file exists anywhere in the project root or `src/`.
- [ ] `npm run build` still exits with code 0 after this configuration change.
- [ ] `npm run dev` still starts without errors after this change.
- [ ] `src/main.tsx` (or wherever `index.css` is imported) still imports it so Tailwind styles are injected; the import line is unchanged or added if missing.

### Edge Cases

- Tailwind v4 requires the `@tailwindcss/vite` plugin — do not use the PostCSS-based integration. Verify no PostCSS config files are created.
- If the scaffold generated `src/App.css` with conflicting base styles, these do not need to be removed in this story, but must not override Tailwind base styles in a way that causes the acceptance criteria above to fail.
- The `@custom-variant` declaration must appear after `@import "tailwindcss"` — incorrect order can cause the variant to be unrecognized; verify by applying a `dark:` class and observing the result.
- Version pin: `tailwindcss` must resolve to v4.x; confirm with `npm ls tailwindcss`.

## Technical Notes

- Tailwind v4 is CSS-first: all configuration lives in `src/index.css`. No `tailwind.config.js` is created, and no PostCSS setup is needed when using `@tailwindcss/vite`.
- Plugin registration in `vite.config.ts`:
  ```ts
  import tailwindcss from '@tailwindcss/vite'
  // ...
  plugins: [react(), tailwindcss()]
  ```
- The dark mode strategy uses a custom CSS variant tied to a `.dark` class on `<html>`, not the `media` strategy. This allows `ThemeProvider` (epic 02) to toggle the class programmatically.
- Optional `@theme` block (for design tokens) is intentionally left empty in this story; it will be filled when visual design tokens are implemented in later epics.

## Files to Create/Modify

| Action | File Path        | Purpose                                                           |
| ------ | ---------------- | ----------------------------------------------------------------- |
| MODIFY | `vite.config.ts` | Add `@tailwindcss/vite` plugin import and register it             |
| MODIFY | `src/index.css`  | Replace with `@import "tailwindcss"` and dark variant declaration |
| MODIFY | `package.json`   | Add `tailwindcss` and `@tailwindcss/vite` to devDependencies      |

## Dependencies

- **Blocked by:** 01-01
- **Blocks:** 01-04, 02-02, 02-03, 02-05, 02-06, 03-01

## Related

- **Epic:** 01_foundation-tooling
- **Related stories:** 01-01, 01-04
- **Spec reference:** tech-stack.md (Tailwind CSS 4.x), configuration.md §index.css, configuration.md §vite.config
