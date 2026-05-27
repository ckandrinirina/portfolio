# 12-02 · Responsive verification

**Status:** TODO · **Size:** M · **Blocked by:** 11-05

## Description

Walk through every view at 6 breakpoints and verify no overflow, no cut-off
content, no broken stacking.

## Files affected

- Likely tweaks to existing `@media` rules.

## Checklist (per view × per breakpoint)

Breakpoints: **320, 375, 768, 880, 1024, 1280, 1440 px**.

For each view:
- [ ] No horizontal scrollbars.
- [ ] Sidebar collapses to top strip at ≤880px (CSS already enforces).
- [ ] Topbar truncates gracefully (clock hides at ≤600px).
- [ ] Hero name doesn't overflow at 320px.
- [ ] Project cards stack to single column at ≤880px.
- [ ] Modal fits within 24px padding inside viewport at 320×640.
- [ ] Marquee fade edges still look right at all widths.
- [ ] Command palette is usable at 320px width.

## Acceptance criteria

- [ ] No layout breakage on any breakpoint × view combo.
- [ ] Devtools "Toggle device toolbar" walkthrough screenshots filed in PR
      description.

## Test notes

Manual; devtools rendering panel.

## Edge cases

- Notch / safe-area-inset on iOS — out of scope for v1.
