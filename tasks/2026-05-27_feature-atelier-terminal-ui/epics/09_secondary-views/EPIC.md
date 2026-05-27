# Epic 09 · Experience / Skills / Process / Contact views

**Goal:** Build the four remaining views: timeline, skill cards, numbered
principles, and contact card grid with copy-to-clipboard.

## Stories

| ID    | Title                                                | Size |
|-------|------------------------------------------------------|------|
| 09-01 | ExperienceView + `.timeline` / `.tl-*` CSS           | M    |
| 09-02 | SkillsView + `.skill-cards` / `.skill-card` CSS      | M    |
| 09-03 | ProcessView + `.process-list` / `.process-item` CSS  | M    |
| 09-04 | ContactView + `.contact-grid` / `.contact-card` / `.contact-pitch` CSS + copy-to-clipboard | L |
| 09-05 | Wire LanguageSwitcher + ThemeSwitcher into shell     | S    |

## Dependencies

- Epic 03 (content modules), Epic 05 (section utilities), Epic 06 (App).

## Acceptance for the epic

- All four routes render their localized content.
- ContactView copy buttons copy to clipboard and flash "✓ copied" for 1.4s.
- LanguageSwitcher + ThemeSwitcher live somewhere accessible (sidebar status
  row or contact card, decided in 09-05).
