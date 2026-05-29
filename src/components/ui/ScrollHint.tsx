/**
 * ScrollHint — the sticky bottom chip that names the next view.
 *
 * Stays leaf-like: it receives the resolved next-route label via `nextLabel`
 * (App derives it from `ROUTE_ORDER`) rather than importing constants directly.
 * On the last route the label is `null`/`undefined` and the component renders
 * nothing.
 *
 * Markup mirrors the stylesheet (01-01): a `.scroll-hint` sticky wrapper
 * (pointer-events: none) holding a `.scroll-hint-inner` chip (pointer-events:
 * auto) that the `bounce` keyframe animates. The inner element is a native
 * `<button>` so it is keyboard-focusable and fires `onClick` on Enter/Space for
 * free.
 */

type Props = {
  /** Label of the next route, or null/undefined on the last route. */
  nextLabel?: string | null
  /** Invoked when the chip is activated (click / Enter / Space). */
  onClick?: () => void
}

export default function ScrollHint({ nextLabel, onClick }: Props) {
  // Last route (or no next route): render nothing.
  if (!nextLabel) return null

  return (
    <div className="scroll-hint">
      <button type="button" className="scroll-hint-inner" onClick={onClick}>
        <span aria-hidden="true">↓</span>
        <span>{nextLabel}</span>
      </button>
    </div>
  )
}
