import { useState, useEffect } from 'react'

/**
 * Tracks which section is currently most visible in the viewport using
 * `IntersectionObserver`. Returns the `id` of the active section.
 *
 * @param sectionIds - Ordered array of `<section id="…">` ids to observe.
 *   Pass a stable reference (module-level constant or memoised array) to avoid
 *   infinite re-render loops — the array reference is used as an effect
 *   dependency.
 * @returns The id of the currently active (most visible) section, or an empty
 *   string when `sectionIds` is empty.
 *
 * Tie-breaking rule: first-intersection wins. With `rootMargin: '-40% 0px -55% 0px'`
 * the activation zone spans only 5 % of the viewport height, so at most one
 * section occupies it during normal scroll. If two observers fire simultaneously,
 * the one whose `IntersectionObserver` callback runs first sets the active id.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    if (!sectionIds.length) return

    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return // silently skip ids with no matching DOM element

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  return activeId
}
