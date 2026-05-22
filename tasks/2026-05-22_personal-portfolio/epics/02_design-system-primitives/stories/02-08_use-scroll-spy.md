# Story 02-08: useScrollSpy hook

> **Epic:** Design System — UI Primitives & Hooks
> **Size:** M
> **Status:** TODO

## Description

Create `src/hooks/useScrollSpy.ts` — a custom React hook that accepts an array
of DOM element ids (matching the `<section id="…">` elements), observes each
with an `IntersectionObserver`, and returns the id of the section currently most
visible in the viewport. The `Header` component (Epic 05, Story 05-02) passes
the `NAV_SECTIONS` ids to this hook and uses the returned active id to highlight
the correct nav link. The hook is read-only and stateless with respect to
content; it only tracks the viewport intersection state.

## Acceptance Criteria

- [ ] The hook signature is `useScrollSpy(sectionIds: string[]): string` (returns the active section id as a string).
- [ ] Before any section intersects the viewport, the hook returns the first element of `sectionIds` (default to first section).
- [ ] When a section enters the viewport, the hook updates the returned id to that section's id.
- [ ] When multiple sections are partially visible, the hook returns the id of the one with the greatest intersection ratio (or the topmost one in DOM order — document the chosen tie-breaking rule).
- [ ] All `IntersectionObserver` instances are disconnected on component unmount (cleanup in `useEffect` return).
- [ ] Passing an empty array does not throw; the hook returns an empty string or handles it gracefully.
- [ ] Ids that do not match any DOM element at the time the effect runs are silently skipped (no `null`-ref crash).
- [ ] The hook re-runs observers when `sectionIds` changes (the effect dependency includes `sectionIds`).
- [ ] The hook is a named export from `src/hooks/useScrollSpy.ts`.
- [ ] TypeScript compiles without errors; the return type is `string`.
- [ ] ESLint reports no violations.
- [ ] **Test notes:** Mock `IntersectionObserver` (same approach as 02-07). Verify: (a) initial return is first id; (b) simulating an intersection event for a given id updates the returned value; (c) cleanup disconnects all observers; (d) non-existent id does not crash.

## Technical Notes

- `IntersectionObserver` mock: same global stub as in Story 02-07. If the stub is added to `src/test/setup.ts` by 02-07, it will be available here automatically.
- Implementation pattern — one observer per section:
  ```ts
  export function useScrollSpy(sectionIds: string[]): string {
    const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
    useEffect(() => {
      if (!sectionIds.length) return
      const observers: IntersectionObserver[] = []
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
          { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        )
        obs.observe(el)
        observers.push(obs)
      })
      return () => observers.forEach((o) => o.disconnect())
    }, [sectionIds])
    return activeId
  }
  ```
- `rootMargin: '-40% 0px -55% 0px'` is a common pattern that activates the section when its top third crosses the vertical centre of the viewport — adjust based on actual UX testing.
- The `sectionIds` array reference should be stable at the call site (pass a memoised or module-level constant) to avoid infinite re-render loops. Document this expectation in a JSDoc comment on the hook.
- Alternative: use a single observer with multiple targets and pick the entry with the highest `intersectionRatio` — simpler observer management but slightly different tie-breaking. Either approach is acceptable; document the choice.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `src/hooks/useScrollSpy.ts` | IntersectionObserver-based active section tracker for nav highlighting |

## Dependencies

- **Blocked by:** 01-01 (project scaffold)
- **Blocks:** 05-02 (Header uses useScrollSpy to highlight nav links)

## Related

- **Epic:** design-system-primitives
- **Related stories:** 02-01 (NAV_SECTIONS constant provides the ids array), 05-02 (Header imports useScrollSpy)
- **Spec reference:** data-flow.md §5 Navigation & scroll spy; components.md §Hooks (useScrollSpy)
