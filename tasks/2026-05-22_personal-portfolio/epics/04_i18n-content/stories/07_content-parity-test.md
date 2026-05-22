# Story 04-07: Content parity test

> **Epic:** Internationalization & Content Data
> **Size:** S
> **Status:** TODO

## Description

Create `src/content/content.test.ts`, a Vitest test suite that imports both `fr.ts` and `en.ts` and asserts their structural parity. The TypeScript interface guarantees that both objects have the same keys at compile time, but it does not prevent an array in one locale from having more or fewer items than the corresponding array in the other locale — that would be a silent data inconsistency causing mismatched rendering between languages. This test catches those runtime disparities: if a developer adds an experience entry in French but forgets to add the corresponding English entry, the test fails immediately.

## Acceptance Criteria

- [ ] `src/content/content.test.ts` exists and is picked up by the Vitest configuration.
- [ ] The test suite imports the default exports from both `src/content/fr.ts` and `src/content/en.ts`.
- [ ] Test: `experience` array length is equal in both locales.
- [ ] Test: `projects` array length is equal in both locales.
- [ ] Test: `skills` array length (number of groups) is equal in both locales.
- [ ] Test: `education` array length is equal in both locales.
- [ ] Test: `spokenLanguages` array length is equal in both locales.
- [ ] Test: for each `experience` entry, the `projects` sub-array length is equal between the FR and EN entries at the same index.
- [ ] Test: for each `skills` group at the same index, the `items` array length is equal between FR and EN.
- [ ] All above tests pass when `fr.ts` and `en.ts` are correctly authored; any intentional divergence between the locales (e.g., adding an entry in FR without EN) causes the relevant test to fail.
- [ ] `npm run test -- --run` exits 0 with all parity tests passing after both content modules are authored.
- [ ] No test imports from the React testing library — this is a pure data test using plain Vitest `describe`/`it`/`expect`.

### Edge Cases

- If `fr.ts` or `en.ts` has a typing error that prevents import, the test file itself will fail to compile — this is intentional and acceptable, as it surfaces the underlying type error.
- The test does not assert string values (no hardcoded French or English text) — only lengths and structural shape. This keeps the test resilient to future content edits that don't add or remove array entries.

## Technical Notes

- Test structure suggestion:
  ```ts
  import frContent from './fr';
  import enContent from './en';

  describe('content parity: fr vs en', () => {
    it('experience array has equal length', () => {
      expect(enContent.experience.length).toBe(frContent.experience.length);
    });
    it('each experience has equal number of projects', () => {
      frContent.experience.forEach((_, i) => {
        expect(enContent.experience[i].projects.length)
          .toBe(frContent.experience[i].projects.length);
      });
    });
    // … repeat for projects, skills, education, spokenLanguages
  });
  ```
- Vitest globals (`describe`, `it`, `expect`) are available without import if the Vitest config has `globals: true` (established in Epic 01 story 01-04).
- No `@testing-library/react` or `jsdom` is needed — this test runs in the Node-like Vitest environment.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/content/content.test.ts` | Structural parity assertions between fr.ts and en.ts |

## Dependencies

- **Blocked by:** 04-02 (fr.ts must be authored), 04-03 (en.ts must be authored)
- **Blocks:** None

## Related

- **Epic:** 04_i18n-content
- **Related stories:** 04-01, 04-02, 04-03
- **Spec reference:** (no direct spec section — derived from the parity guarantee in data-flow.md §2 and tech-stack.md §Internationalization)
