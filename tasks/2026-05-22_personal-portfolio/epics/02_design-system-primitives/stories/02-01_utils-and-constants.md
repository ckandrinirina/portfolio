# Story 02-01: Utilities & site constants

> **Epic:** Design System — UI Primitives & Hooks
> **Size:** S
> **Status:** TODO

## Description

Create the two foundational library modules that every other component and hook
will import. `src/lib/utils.ts` provides `cn()` — a class-merge helper that
wraps `clsx` + `tailwind-merge` (or the equivalent installed in Epic 01) — plus
any small pure utilities needed across the project. `src/lib/constants.ts`
exports typed, read-only objects for site metadata (name, title, location),
contact links (email, WhatsApp), social profile URLs (GitHub, LinkedIn — both
marked `[TO BE DEFINED]`), and the ordered nav section config (ids + i18n-key
labels). These files have zero runtime side-effects and no UI dependency.

## Acceptance Criteria

- [ ] `cn(...inputs)` merges class strings and deduplicates conflicting Tailwind utilities (e.g. `cn('px-2', 'px-4')` → `'px-4'`).
- [ ] `cn()` called with no arguments returns an empty string without throwing.
- [ ] `cn()` correctly handles `undefined`, `null`, `false`, and conditional objects as inputs (same behaviour as `clsx`).
- [ ] `constants.ts` exports a typed `SITE_META` object containing at minimum: `name`, `title`, `locationLabel`, `email`, `whatsapp` (wa.me URL).
- [ ] WhatsApp URL is `https://wa.me/261385096664` — digits only, no `+`, no spaces, no formatting characters.
- [ ] Full street address is **never** present anywhere in the file.
- [ ] `constants.ts` exports `SOCIAL_LINKS` with `github` and `linkedin` string fields. Both are set to `''` (empty string) as a placeholder, accompanied by a `// TODO: replace with actual URL` comment.
- [ ] `constants.ts` exports `NAV_SECTIONS` as a typed array (or tuple) of `{ id, labelKey }` objects in the order: `hero`, `about`, `skills`, `experience`, `projects`, `education`, `languages`, `contact`.
- [ ] All exports use `const` assertions or explicit typed interfaces — no untyped `any`.
- [ ] TypeScript compiles `src/lib/utils.ts` and `src/lib/constants.ts` without errors.
- [ ] ESLint reports no violations on either file.
- [ ] No UI imports (React, DOM types beyond `string`) in either file.

## Technical Notes

- `cn()` implementation: import `clsx` and `twMerge` from `tailwind-merge` (check `package.json` from Epic 01 for the exact installed packages). Pattern:
  ```ts
  import { clsx, type ClassValue } from 'clsx'
  import { twMerge } from 'tailwind-merge'
  export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
  }
  ```
  If only `tailwind-merge` is installed (without `clsx`), use `twMerge` directly with spread.
- `SITE_META` type suggestion: define an inline `interface SiteMeta` or `type SiteMeta` above the constant; use `as const satisfies SiteMeta` to get both narrowing and type-checking.
- `NAV_SECTIONS` `labelKey` strings will be consumed by the i18n `t()` function (Epic 04). Use predictable keys like `'nav.hero'`, `'nav.about'`, etc., or plain section ids — just be consistent; the i18n epic will match them.
- Keep `constants.ts` free of any logic; it is pure data.
- Location label to use in `SITE_META`: `'Antananarivo, Madagascar'`.

## Files to Create/Modify

| Action | File Path              | Purpose                                                     |
| ------ | ---------------------- | ----------------------------------------------------------- |
| CREATE | `src/lib/utils.ts`     | `cn()` class-merge helper and small shared utilities        |
| CREATE | `src/lib/constants.ts` | Typed site metadata, contact links, social URLs, nav config |

## Dependencies

- **Blocked by:** 01-01 (project scaffold — `src/lib/` directory must exist, dependencies installed)
- **Blocks:** 02-04, 02-10, 05-02, 06-01, 06-08

## Related

- **Epic:** design-system-primitives
- **Related stories:** 02-04 (Button uses `cn`), 02-10 (SocialLinks uses `SOCIAL_LINKS`), 05-02 (Header uses `NAV_SECTIONS` + `useScrollSpy`), 06-01 (Hero uses `SITE_META`), 06-08 (Contact uses contact links)
- **Spec reference:** data-flow.md §8 Contact links; components.md §UI components; spec §5.7 Contact
