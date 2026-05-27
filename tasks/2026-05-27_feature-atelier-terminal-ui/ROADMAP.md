# Roadmap — Atelier Terminal UI

12 epics · 70 stories · 7 phases. The phases describe the recommended execution
order; within a phase, stories can be parallelized via
`/ck-code:parallel-build` so long as their per-story `Blocked by` constraints
are honored.

## Phase summary

```
Phase A · Foundation                        ─►  Epic 01
                                                 │
Phase B · Plumbing (PARALLELIZABLE)         ─►  Epic 02 │ Epic 03 │ Epic 04
                                                 │       │         │
Phase C · Shell + routing                   ─►  Epic 05 ─► Epic 06
                                                 │
Phase D · Views (PARALLELIZABLE)            ─►  Epic 07 │ Epic 08 │ Epic 09
                                                 │       │         │
Phase E · Cross-cutting                     ─►  Epic 10
                                                 │
Phase F · Integration                       ─►  Epic 11
                                                 │
Phase G · Quality                           ─►  Epic 12
```

## Per-epic detail

### Phase A · Foundation

| Epic | Title                                       | Stories | Parallelism            |
|------|---------------------------------------------|---------|------------------------|
| 01   | Design tokens, fonts & global styles        | 8       | Mostly sequential (CSS file ordering matters); 01-01 (fonts in index.html) is independent and can run in parallel with 01-02/03 |

### Phase B · Plumbing (parallel after Epic 01)

| Epic | Title                                | Stories | Parallelism                                 |
|------|--------------------------------------|---------|----------------------------------------------|
| 02   | Theme system migration               | 6       | Sequential within (02-01 → 02-02 → 02-03 → 02-04 → 02-05 → 02-06); parallel with Epics 03, 04 |
| 03   | Content model migration              | 7       | 03-01 first; 03-02..03-05 parallel; 03-06 after 03-03+03-04; 03-07 after them |
| 04   | Custom cursor & UI primitives        | 6       | 04-01 first; 04-02..04-06 parallel after that  |

### Phase C · Shell + routing

| Epic | Title                       | Stories | Notes                                                                                     |
|------|-----------------------------|---------|-------------------------------------------------------------------------------------------|
| 05   | Layout shell                | 6       | 05-01 first; 05-02..05-06 parallel after that (need 05-01 + 03-05 i18n labels)            |
| 06   | Routing & navigation        | 5       | 06-01 first; 06-02..06-04 parallel; 06-05 (App rewrite) last — needs all of Epic 05 + 06  |

### Phase D · Views (parallel after Phase C)

| Epic | Title                                                    | Stories | Notes                                              |
|------|----------------------------------------------------------|---------|----------------------------------------------------|
| 07   | Home view                                                | 7       | 07-01 first; 07-02..07-07 parallel                  |
| 08   | Work view + project modal                                | 5       | 08-02 first (artwork SVGs); then 08-01 → 08-03/04 parallel → 08-05 |
| 09   | Experience / Skills / Process / Contact + switchers      | 5       | All 5 parallel after 03+05+06                       |

### Phase E · Cross-cutting

| Epic | Title             | Stories | Notes                                                              |
|------|-------------------|---------|--------------------------------------------------------------------|
| 10   | Command palette   | 5       | 10-01 → 10-02 → (10-03, 10-04) parallel → 10-05                    |

### Phase F · Integration

| Epic | Title                                | Stories | Notes                                |
|------|--------------------------------------|---------|--------------------------------------|
| 11   | Cleanup, integration & verification  | 5       | Sequential: 11-01 → 11-02 → 11-03 → 11-04 → 11-05 |

### Phase G · Quality

| Epic | Title                            | Stories | Notes                                  |
|------|----------------------------------|---------|----------------------------------------|
| 12   | Quality pass for the new UI      | 5       | All 5 are independent; can run in any order or in parallel |

## Critical path

The chain that can't be parallelized:

```
01-02 (palette CSS vars)
  → 02-01 (ThemeProvider rewrite)
  → 05-01 (.app grid)
  → 05-02 (Sidebar)
  → 06-05 (App.tsx rewrite)
  → 07-01 (HomeView skeleton)            ┐
  → 08-05 (WorkView assembly)             │  Phase D in parallel
  → 09-* (each remaining view)            ┘
  → 10-04 (cmdk wired into App)
  → 11-03 (delete obsolete files)
  → 11-04 (fix tests)
  → 11-05 (manual verification)
  → 12-* (quality)
```

Roughly: **15–20 sequential stories** even with aggressive parallelism on
Phases B, D, and the start of A.

## Effort estimate

| Sizing | Count | Hours (avg) | Total |
|--------|-------|-------------|-------|
| S      | 23    | 0.75        | 17.3  |
| M      | 31    | 2.5         | 77.5  |
| L      | 14    | 6           | 84.0  |
| XL     | 2     | 12          | 24.0  |
| **Total** | **70** | —          | **~203 person-hours** |

(8–12 sessions sequential, ~4–6 sessions if heavily parallelized across
Phases B & D.)

## Risks

| Risk | Mitigation |
|------|------------|
| Mockup CSS is large and brittle (1620 lines) | All CSS is copied verbatim into `index.css`; no re-interpretation. If a class is broken, fall back to mockup source for ground truth. |
| Scroll-to-navigate (06-03) is the trickiest piece | Allocated XL; isolate the gesture machine and test with mocked wheel events first; only wire into App after tests pass. |
| Custom cursor noise on real devices | Disabled on touch / ≤880px via media query; behind `(hover: hover) and (pointer: fine)`. |
| 8 SVG artworks may diverge from mockup if hand-typed | Use the extracted `/tmp/script-37f20218.js` (lines 199–457) as source and copy with attribute camelization only. |
| Old plan's `09-01..09-05` quality stories overlap with new Epic 12 | New Epic 12 supersedes; document old stories as superseded; do not duplicate work. |
| GitHub Pages deploy story (`08-01` in old plan) is still TODO | Run it any time after Epic 11; not blocked by the new feature. |

## Recommended execution order

1. **Epic 01** (entire — foundation).
2. **Epics 02 + 03 + 04 in parallel** (use `/ck-code:parallel-build 02-01 03-01 04-01` then expand).
3. **Epic 05** sequential.
4. **Epic 06** sequential.
5. **Epics 07 + 08 + 09 in parallel**.
6. **Epic 10** sequential.
7. **Epic 11** sequential, then commit/PR via `/ck-code:ship`.
8. **Epic 12** sequential.
9. Return to the original `tasks/2026-05-22_personal-portfolio/` and complete
   `08-01 GitHub Pages deploy` + `08-02 README docs` to ship.

## Next

Run `/ck-code:track next` to find the first ready story (will be `01-01` or
`01-02`). Or `/ck-code:parallel-build 01-01 01-02 01-03` to fan out the
foundation work.
