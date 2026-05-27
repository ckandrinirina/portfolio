# Epic 05 · Layout shell (sidebar + topbar + view)

**Goal:** Build the structural shell of the Atelier Terminal UI: the
240px sidebar, the topbar, the scrollable view container, and the
scroll-hint chip. All CSS classes for these blocks are added in this epic.

## Scope

- `.app` outer grid layout with responsive break at 880px.
- `Sidebar` component (brand + grouped routes + status block) and `.sb-*` CSS.
- `Topbar` component (breadcrumb + ⌘K trigger + TNR clock) and `.tb-*` CSS.
- `.view` + `.view-inner` scrollable container CSS.
- `ScrollHint` component (sticky bottom-of-view chip) and `.scroll-hint` CSS.
- Shared section header utilities: `.eyebrow`, `.section-title`, `.section-sub`.

## Stories

| ID    | Title                                                  | Size |
|-------|--------------------------------------------------------|------|
| 05-01 | `.app` outer grid layout (responsive)                  | S    |
| 05-02 | Sidebar component + `.sidebar` / `.sb-*` CSS           | L    |
| 05-03 | Topbar component + `.topbar` / `.tb-*` CSS             | M    |
| 05-04 | View container + `.view` / `.view-inner` CSS           | M    |
| 05-05 | ScrollHint component + `.scroll-hint` CSS              | S    |
| 05-06 | Section header utilities (`.eyebrow`, titles, sub)     | S    |

## Dependencies

- 01-02 / 01-03 / 01-04 (tokens, fonts, body baseline).
- 01-05 (keyframes for orbit / blink).
- 03-05 (UI labels: route names, status text).

## Acceptance for the epic

- A hardcoded test `App` rendering `<Sidebar active="home" onSelect={…} />` +
  `<Topbar active="home" onCmd={…} />` + a blank `<div className="view">…</div>`
  shows the expected layout in dev: 240px sidebar with E mark + 6 nav rows +
  status block; topbar with `~/portfolio / home` breadcrumb + ⌘K chip + TNR
  clock; main area empty.
- Responsive: at ≤880px the sidebar becomes a horizontal scrollable strip
  above the topbar.
- Scroll-hint appears at the bottom of any `.view` whose content exceeds
  the viewport.
