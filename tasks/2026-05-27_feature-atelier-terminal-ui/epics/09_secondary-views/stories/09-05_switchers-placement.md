# 09-05 · Wire LanguageSwitcher + ThemeSwitcher into shell

**Status:** TODO · **Size:** S · **Blocked by:** 02-04, 05-02

## Description

Decide where the language and theme switchers live in the new shell. Mount
them. Two reasonable spots:

1. **Sidebar status row** (recommended): replace the "paired with claude-code"
   row with two compact controls, or add a new row above it.
2. Topbar right-hand side.

This story places them in the sidebar status block — it's the right semantic
home for "session preferences".

## Files affected

- `src/components/layout/Sidebar.tsx`

## Implementation notes

Add a new row to the `.sb-status` block above the "paired with":

```tsx
<div className="row">
  <span>{t('sidebar.prefs') ?? 'preferences'}</span>
  <span style={{ display: 'inline-flex', gap: 8 }}>
    <LanguageSwitcher />
    <ThemeSwitcher />
  </span>
</div>
```

Restyle `<LanguageSwitcher>` (legacy from old plan 04-06) to match the same
compact button look as `<ThemeSwitcher>` (small bordered pill).

## Acceptance criteria

- [ ] Sidebar shows both switchers inside the status block (desktop) /
      visible on mobile-flattened sidebar.
- [ ] Clicking LanguageSwitcher cycles FR↔EN.
- [ ] Clicking ThemeSwitcher cycles 4 themes.
- [ ] Visual: both controls share styling (pill, line border, fg-dim text).

## Test notes

Render the sidebar; assert both switcher buttons are accessible by role.

## Edge cases

- At ≤880px the sidebar status block is hidden (CSS rule from 05-02).
  Consider moving the switchers into the topbar at that breakpoint as a
  follow-up enhancement; for this story, accept the desktop-only placement
  (Settings can also be reached via `⌘K` → `theme` action in Epic 10).
