# Roadmap — Feature: Scroll Motion

> Add-Feature plan generated 2026-06-02 from `docs/architecture/features/scroll-motion/index.md`.
> A zero-dependency, reduced-motion-gated motion layer across all six route views.

## Epics

| Epic | Title               | Stories | Size   | Status |
| ---- | ------------------- | ------- | ------ | ------ |
| 01   | Scroll Motion Layer | 2       | XL · L | TODO   |

## Stories & dependencies

| ID    | Title                                                    | Size | Blocked by | Parallel-safe with |
| ----- | -------------------------------------------------------- | ---- | ---------- | ------------------ |
| 01-01 | Reveal vocabulary, `useInView` & site-wide view adoption | XL   | —          | 01-02              |
| 01-02 | Scroll-progress indicator (`useScrollProgress` + bar)    | L    | —          | 01-01              |

## Dependency graph

```
01-01  Reveal vocabulary + useInView + view adoption  ─┐
                                                        ├─ (independent, parallel-safe)
01-02  Scroll-progress indicator (Topbar)             ─┘
```

Both stories have no blockers and own disjoint component files — 01-01 touches the reveal
engine, the `useInView` hook, and the view files; 01-02 touches the `useScrollProgress` hook,
the `ScrollProgress` component, the Topbar, and `App.tsx`. The only shared file is `index.css`,
edited in non-overlapping sections (reveal variants vs. `.scroll-progress`). They can run
concurrently via `parallel-build`, or sequentially in either order.

## Recommended execution order

1. **Parallel:** `01-01` + `01-02` (isolated worktrees) — no shared component files.
2. If running sequentially, either order works; do `01-01` first if you want the reveal
   vocabulary visible before adding the progress bar.

## Definition of done (feature)

- All six `data-reveal` variants render correctly; default reveal unchanged (no regression).
- `useInView` drives site-wide `CountUp`; Home no longer uses a hardcoded `inView`.
- Topbar scroll-progress bar tracks each view, reads 0 on short views, and does not break
  wheel-gesture route navigation.
- Full reduced-motion parity; `aria-hidden` progress bar; zero new dependencies.
- `npm run build` + test suite green.

## Post-merge

- Flip the `scroll-motion` row in `docs/architecture/DESIGN_LEDGER.md` is already `planned`
  (done by this plan); `build`/`parallel-build` will roll up `FEATURE_INDEX.md` to `DONE`.
- Consider `/ck-code:doc-optimizer sync` afterwards if a per-increment delta doc is desired.
