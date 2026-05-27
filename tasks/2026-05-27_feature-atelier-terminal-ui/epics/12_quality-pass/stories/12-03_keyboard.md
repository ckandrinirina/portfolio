# 12-03 · Keyboard navigation verification

**Status:** TODO · **Size:** S · **Blocked by:** 11-05

## Description

Verify every interaction is reachable from the keyboard.

## Checklist

- [ ] Tab order: sidebar brand → workspace rows → connect rows → status row controls
      → topbar ⌘K button → view content (in DOM order) → scroll-hint chip.
- [ ] All `.sb-row`, `.btn`, `.proj-card`, `.copy-btn` are focusable via Tab.
- [ ] Focus ring visible everywhere (no `outline: none` anywhere except where
      explicitly replaced with a `box-shadow`/`border` focus style).
- [ ] Arrow keys at view boundary navigate between routes.
- [ ] `⌘/Ctrl+K` opens palette; arrow keys + Enter operate items; Escape closes.
- [ ] Modal: open via click → Escape closes; Tab cycles within the modal
      (basic focus trap acceptable; full trap is future enhancement).
- [ ] Skip-link: optional but recommended — add a hidden "Skip to main"
      link at the top of body that becomes visible on focus.

## Acceptance criteria

- [ ] Every checklist item passes.
- [ ] No `outline: none` without replacement in `src/index.css`.

## Test notes

Manual; cannot be automated reliably.

## Edge cases

- Focus trap inside the modal is not implemented; document as a known
  limitation and a follow-up enhancement (post-launch).
