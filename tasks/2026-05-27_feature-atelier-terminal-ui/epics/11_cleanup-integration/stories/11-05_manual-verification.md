# 11-05 · Manual end-to-end verification (golden path)

**Status:** TODO · **Size:** M · **Blocked by:** 11-01..11-04

## Description

Run the dev server and walk through every interaction the new UI supports.
This story is checklist-driven; check each item and document any defects
found into follow-up bugs.

## Files affected

None (verification only).

## Checklist

### Boot & theme
- [ ] `npm run dev` starts cleanly; first paint shows the Ember palette
      (warm dark + orange accent + faint grid overlay).
- [ ] In a fresh profile (clear localStorage), system dark preference yields
      Ember; system light yields Paper.
- [ ] Manually set `localStorage.theme = 'dark'` (legacy) and reload — page
      starts as Ember (silent migration).
- [ ] ThemeSwitcher in sidebar cycles Ember → Ocean → Forest → Paper → Ember.
- [ ] After cycling, hard-refresh keeps the chosen palette.
- [ ] No FOUC on hard refresh.

### Language
- [ ] LanguageSwitcher in sidebar switches FR ⇄ EN; all visible text updates.
- [ ] `<html lang>` updates accordingly.
- [ ] Choice persists across reload.

### Routing
- [ ] Sidebar clicks switch the view with the directional view-enter animation.
- [ ] URL hash updates on each nav.
- [ ] Direct hash links (`#work`, `#skills`, …) land on the right view.
- [ ] Browser back/forward walks the route history.
- [ ] ArrowDown at view bottom advances to the next route.
- [ ] ArrowUp at view top goes to the previous route.
- [ ] Scroll-to-navigate: at the top of Home, wheel-up triggers nothing
      (no prev); at bottom of Contact, wheel-down does nothing (no next).
- [ ] Scroll-to-navigate respects the "release wheel between gestures" rule.

### Home view
- [ ] Letter-by-letter name reveal plays once on mount.
- [ ] Role rotor cycles every 2.6s through 5 roles.
- [ ] Stats counters animate from 0 to target.
- [ ] Marquee scrolls; pauses on hover.
- [ ] CTAs: "See selected work" → Work view; "Get in touch" → Contact view;
      "Download CV" → triggers PDF download.

### Work view
- [ ] All 8 project cards render with their SVG artwork.
- [ ] Hovering a card lifts + shine sweeps.
- [ ] Clicking a card opens the modal.
- [ ] Modal Escape closes; backdrop click closes; close button closes.
- [ ] Body scroll locks while modal open.

### Experience / Skills / Process / Contact views
- [ ] Each renders its localized content correctly.
- [ ] Timeline dot markers respond to hover.
- [ ] Contact card copy buttons write to clipboard and flash "✓ copied".

### Command palette
- [ ] `⌘/Ctrl+K` opens.
- [ ] Typing filters items.
- [ ] ArrowDown/Up moves active.
- [ ] Enter on each command type runs the right action.
- [ ] Escape closes.
- [ ] Click-outside closes.

### Cursor
- [ ] On a hover-capable, ≥881px viewport, native cursor is hidden; dot + ring
      track the mouse.
- [ ] Hovering buttons / links / cards expands the ring.
- [ ] Hovering an `<input>` morphs to the text-bar.
- [ ] At ≤880px or on touch, native cursor is restored.

### Accessibility / reduced motion
- [ ] Devtools "Emulate prefers-reduced-motion: reduce" — all entrance animations cease.
- [ ] Tab order through sidebar → topbar → view content → modal → cmdk feels sensible.
- [ ] Focus rings remain visible.

### Performance
- [ ] No console errors during normal interaction.
- [ ] First paint of Home is fast (< 1.5s on Fast 3G in devtools).

## Acceptance criteria

- [ ] Every checkbox above is ticked.
- [ ] Any defects discovered are filed as new stories in this feature folder
      (e.g., `11-06_bug-X.md`) or under Epic 12 (Quality).

## Test notes

Manual.

## Edge cases

- Tests run in headless jsdom can't replicate visual issues. This step
  exists to catch what tests miss.
