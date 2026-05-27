# Epic 08 · Work view + project detail modal

**Goal:** Render the Selected Work gallery (2-column card grid) with bespoke
inline-SVG artwork for each of 8 projects, plus a detail modal that opens
when a card is clicked.

## Scope

- 8 SVG artworks (one component per project id) + `ProjectArt` dispatcher.
- `ProjectCard.tsx` — card with art, num · client, name, role, desc, tags, actions.
- `ProjectModal.tsx` — overlay with full-bleed artwork, role/impact/stack columns, action buttons; body-scroll lock; Escape to close.
- `WorkView.tsx` — eyebrow, section title, sub, then the grid; opens the modal on click.

## Stories

| ID    | Title                                            | Size |
|-------|--------------------------------------------------|------|
| 08-01 | `ProjectArt` dispatcher                           | S    |
| 08-02 | 8 project SVG artwork components                  | L    |
| 08-03 | ProjectCard + `.proj-card` CSS                    | M    |
| 08-04 | ProjectModal + `.modal-*` CSS                     | L    |
| 08-05 | WorkView assembly + `.work-grid` CSS              | M    |

## Dependencies

- Epic 03 (`projects.ts`, `ui.ts` labels).
- Epic 05 (section header utilities, view container).
- Epic 06 (App owns the modal state).

## Acceptance for the epic

- Visiting `route === 'work'` shows the 2-col grid of 8 cards in mockup order.
- Hovering a card lifts it, tints border orange, runs the shine sweep.
- Each card's artwork is its bespoke SVG (not a placeholder).
- Clicking a card opens the modal; Escape closes it; clicking outside closes.
- Modal renders `role`, `impact`, `stack` columns + Stack chip row.
- Body scroll is locked while modal open.
