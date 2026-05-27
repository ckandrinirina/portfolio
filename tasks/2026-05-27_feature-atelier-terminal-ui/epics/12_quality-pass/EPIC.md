# Epic 12 · Quality pass for the new UI

**Goal:** Audit the finished Atelier Terminal UI against the project's
non-functional targets: accessibility (WCAG AA intent), responsive coverage
mobile→desktop, keyboard navigation, `prefers-reduced-motion` compliance,
Lighthouse performance + SEO. This epic supersedes old plan's `09-01..09-05`.

## Stories

| ID    | Title                                                  | Size |
|-------|--------------------------------------------------------|------|
| 12-01 | Accessibility audit (axe + manual)                      | M    |
| 12-02 | Responsive verification (320 → 1440)                    | M    |
| 12-03 | Keyboard navigation verification                        | S    |
| 12-04 | `prefers-reduced-motion` verification                   | S    |
| 12-05 | Lighthouse performance + SEO audit                      | M    |

## Dependencies

- Epic 11 (the app must be feature-complete first).

## Acceptance for the epic

- A11y Lighthouse score ≥ 95.
- Perf Lighthouse score ≥ 95 on Home view, broadband.
- Responsive: no overflow / cut-off content at 320, 375, 768, 1024, 1280, 1440 px wide.
- All keyboard interactions reachable; focus ring visible everywhere.
- Reduced motion: zero animations / transitions perceptible.
