# Story 06-09: Wire sections into App + scrollspy nav

> **Epic:** Content Sections
> **Size:** S
> **Status:** TODO

## Description

Update `src/App.tsx` to replace every section placeholder (from Epic 05 story 05-04) with
the real section components built in stories 06-01 through 06-08, in the correct page
order: Hero, About, Skills, Experience, Projects, Education, Languages, Contact. After
this story, the full single-page portfolio is assembled end-to-end. The story also
verifies that all eight `<section id>` attributes in `App.tsx` match the id list passed
to `useScrollSpy` in the Header (via the nav config in `src/lib/constants.ts`), so nav
link highlighting works correctly for every section.

## Acceptance Criteria

- [ ] `src/App.tsx` imports and renders all eight section components in the order: Hero, About, Skills, Experience, Projects, Education, Languages, Contact.
- [ ] Each section component is placed inside `<main>` and replaces the corresponding placeholder slot from 05-04.
- [ ] The rendered DOM contains exactly one `<h1>` element (Hero's name).
- [ ] Each non-Hero section renders an `<h2>` via its Section wrapper — eight sections, eight `<h2>` elements total.
- [ ] The eight section `id` attributes in `App.tsx` (`hero`, `about`, `skills`, `experience`, `projects`, `education`, `languages`, `contact`) match the ids in the `useScrollSpy` config in `src/lib/constants.ts`.
- [ ] Clicking a nav link in the Header smooth-scrolls to the correct target section.
- [ ] The active nav link in the Header is highlighted as the user scrolls past each section.
- [ ] The full page renders in French (default locale) with no console errors.
- [ ] Switching to English re-renders all sections with English content.
- [ ] `npm run build` completes without TypeScript errors.
- [ ] `npm run dev` displays the fully assembled portfolio page.

## Technical Notes

- The section id values and order must be sourced from `src/lib/constants.ts` (the same array consumed by the Header's `useScrollSpy` call). If `App.tsx` was already mapping over `NAV_SECTIONS` to render placeholder `<section>` elements (as suggested in 05-04), the update is: import each section component by name and replace the generic placeholder render with the real component, keyed by `section.id`.
- If 05-04 used a `NAV_SECTIONS.map(...)` pattern, consider switching to explicit imports for each component — it is more readable and type-safe for a fixed set of eight sections. Alternatively keep the map and add a lookup object `{ hero: Hero, about: About, ... }` — either approach is acceptable.
- After wiring, run `npm run dev` and manually scroll through all eight sections, confirming: (a) each section's content is visible, (b) the nav highlights the correct item, (c) clicking each nav link lands on the right section.
- Verify that the `<h1>` uniqueness invariant holds: search the rendered DOM for `h1` elements and confirm exactly one is present.
- Check that the reveal animations (`useReveal`) fire correctly for each section as it enters the viewport — they depend on the `<section id>` being present in the DOM, which is now guaranteed.

## Files to Create/Modify

| Action | File Path     | Purpose                                                            |
| ------ | ------------- | ------------------------------------------------------------------ |
| MODIFY | `src/App.tsx` | Replace section placeholders with real section components in order |

## Dependencies

- **Blocked by:** 06-01 (Hero), 06-02 (About), 06-03 (Skills), 06-04 (Experience), 06-05 (Projects), 06-06 (Education), 06-07 (Languages), 06-08 (Contact), 05-04 (App shell with placeholder slots).
- **Blocks:** None directly — this story completing gates Epic 08 (deployment) and Epic 09 (QA).

## Related

- **Epic:** content-sections
- **Related stories:** 06-01 through 06-08 (all section implementations), 05-04 (App shell this story modifies)
- **Spec reference:** components.md §Tree, data-flow.md §5 (Navigation & scroll spy)
