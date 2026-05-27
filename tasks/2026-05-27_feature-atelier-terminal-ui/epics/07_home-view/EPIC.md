# Epic 07 · Home view

**Goal:** Assemble the Home view with all its parts: greet pill, hero name
with letter-by-letter Reveal, tagline, role rotor, 3 CTAs (work, contact,
CV), avatar frame with the profile photo, "Now building" card, 2×2 stats
grid with `CountUp`, and the looping marquee.

## Scope

- `HomeView.tsx` and its sub-pieces.
- `.home-hero`, `.avatar-frame`, `.home-greet`, `.home-name`, `.home-tagline`,
  `.home-roles`, `.home-rotor`, `.home-actions`, `.btn`, `.btn-primary`,
  `.home-grid`, `.now-card`, `.stats-grid`, `.stat-tile` CSS (verbatim from mockup).
- Wire `DownloadCvButton` as the third CTA.
- Show `public/profile.jpg` inside the avatar frame.

## Stories

| ID    | Title                                                | Size |
|-------|------------------------------------------------------|------|
| 07-01 | HomeView skeleton: greet + name with Reveal + tagline | M   |
| 07-02 | Role rotor (interval, aria-live)                      | M   |
| 07-03 | Home actions: 3 CTAs (work, contact, CV)              | M   |
| 07-04 | Avatar frame with profile photo                       | M   |
| 07-05 | Now-card                                              | S   |
| 07-06 | Stats grid with `CountUp`                             | M   |
| 07-07 | Marquee strip wiring                                  | S   |

## Dependencies

- Epic 03 (content modules with hero / now / stats / marquee).
- Epic 04 (`Reveal`, `CountUp`, `Marquee`).
- Epic 05 (section-header utilities, view container).
- Epic 06 (App placeholder swap).
- Existing `DownloadCvButton` from old plan 04-08.

## Acceptance for the epic

- `route === 'home'` shows the full Home view in dev.
- The hero name cascades in character-by-character.
- The role rotor cycles every 2.6s through the 5 roles.
- The 3 CTAs are styled as `.btn-primary` (See work), `.btn` (Get in touch),
  `.btn` (Download CV); the latter is an `<a download>` to the CV.
- Profile photo loads from `/profile.jpg` (or `BASE_URL` prefix).
- "Now building" card and stats grid show the localized copy.
- Marquee scrolls infinitely and pauses on hover.
