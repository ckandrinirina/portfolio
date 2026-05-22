# Story 04-06: LanguageSwitcher + test

> **Epic:** Internationalization & Content Data
> **Size:** M
> **Status:** TODO

## Description

Implement `src/components/ui/LanguageSwitcher.tsx` — the visible EN/FR toggle control that sits in the Header — and a co-located test file `LanguageSwitcher.test.tsx` that verifies the switching behavior end-to-end. The component calls `useLanguage()` to read the active locale and `setLocale` to update it. It must be accessible (keyboard operable, proper aria-label from `t('languageSwitcher')`), visually indicate which locale is active, and work correctly in both directions (FR → EN and EN → FR).

The test is not optional: it is the only automated verification that the language switch actually causes downstream content to change (by checking that `document.documentElement.lang` flips and that the component reflects the new active state). Epic 05 and Epic 06 may add integration tests later, but this story provides the foundational confidence.

## Acceptance Criteria

- [ ] `src/components/ui/LanguageSwitcher.tsx` renders a control (button group, segmented control, or two buttons) that displays `"FR"` and `"EN"` options.
- [ ] The currently active locale is visually distinguished (e.g., different styling, `aria-pressed="true"`, or `aria-current`).
- [ ] Clicking the inactive option calls `setLocale` with the corresponding locale value.
- [ ] Clicking the active option is a no-op (does not trigger unnecessary state updates).
- [ ] The control's container or wrapping element has an `aria-label` set to `t('languageSwitcher')` — the localized description from `ui.ts`.
- [ ] Each language option is keyboard-focusable and activatable via `Enter` or `Space`.
- [ ] The component does not accept any required props — it sources all data from `useLanguage()`.
- [ ] No hardcoded locale strings inside the component (locale values `'fr'` and `'en'` are used as constants but all display strings come from `t()` or are the locale codes themselves).
- [ ] `npm run build` exits 0 after this file is added.

#### Test file AC (LanguageSwitcher.test.tsx):

- [ ] Test renders `LanguageSwitcher` inside a `LanguageProvider` with the French locale as initial state.
- [ ] Test asserts the FR option is marked active (e.g., `aria-pressed="true"`) and the EN option is not.
- [ ] Test clicks the EN option: asserts `document.documentElement.lang` changes to `'en'`.
- [ ] Test clicks the FR option after switching to EN: asserts `document.documentElement.lang` changes back to `'fr'`.
- [ ] Test asserts the component is keyboard-accessible: the EN button receives focus and pressing `Enter` triggers the locale switch.
- [ ] All test assertions use `@testing-library/react` queries (preferring accessible queries: `getByRole`, `getByLabelText`).
- [ ] `npm run test -- --run` exits 0 with the `LanguageSwitcher.test.tsx` suite passing.

### Edge Cases

- The component must not crash if rendered without a `LanguageProvider` ancestor — either because `useLanguage` provides a safe fallback or because the error thrown is caught at a higher boundary. Document whichever approach is taken.
- If the component is rendered inside a `LanguageProvider` that starts with `locale = 'en'`, the EN option must be marked active on initial render without a flash of the FR-active state.

## Technical Notes

- Implementation options for the toggle UI: (a) two `<button>` elements in a `<div role="group" aria-label={...}>`, or (b) a `<button>` that cycles between locales with an `aria-label` that describes the current state and the action. The two-button group is preferable for clarity and accessibility.
- `aria-pressed` is appropriate for toggle buttons; `aria-current` is appropriate if the buttons are considered "current" page-language indicators. Either is acceptable as long as the active state is programmatically exposed.
- Styling: use Tailwind utilities to differentiate active/inactive state (e.g., a different background or font weight). The exact visual design is deferred to Epic 02/06, so a minimal functional style is sufficient for this story.
- Test setup: wrap the component in `LanguageProvider` using `render(<LanguageProvider><LanguageSwitcher /></LanguageProvider>)` from `@testing-library/react`. No additional mocking needed if `LanguageProvider` correctly defaults to `'fr'`.
- Use `userEvent` (from `@testing-library/user-event`) rather than `fireEvent` for click interactions in the test.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/components/ui/LanguageSwitcher.tsx` | EN/FR toggle UI component |
| CREATE | `src/components/ui/LanguageSwitcher.test.tsx` | Component test — switching behavior and accessibility |

## Dependencies

- **Blocked by:** 04-05 (LanguageProvider + useLanguage must exist)
- **Blocks:** 05-02 (Header assembly — LanguageSwitcher is placed in the Header)

## Related

- **Epic:** 04_i18n-content
- **Related stories:** 04-05, 05-02
- **Spec reference:** components.md §UI (LanguageSwitcher); data-flow.md §3 Language switch
