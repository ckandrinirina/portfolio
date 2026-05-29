import { useEffect, type RefObject } from 'react'

/** Returns true when the element is scrolled to its top (scrollTop ≤ 0). */
function isAtTop(el: HTMLElement): boolean {
  return el.scrollTop <= 0
}

/** Returns true when the element is scrolled to its bottom (within 1px epsilon). */
function isAtBottom(el: HTMLElement): boolean {
  return el.scrollHeight - el.clientHeight - el.scrollTop <= 1
}

/**
 * useKeyboardArrows — listens for ArrowUp / ArrowDown / PageUp / PageDown on
 * the window and calls navigate('up'|'down') when the view is at the matching
 * scroll boundary and the hook is not locked.
 *
 * @param viewRef - Ref to the scrollable view element used for boundary detection.
 * @param locked  - When true, all key events are ignored.
 * @param navigate - Callback receiving 'up' or 'down'.
 */
export function useKeyboardArrows(
  viewRef: RefObject<HTMLElement | null>,
  locked: boolean,
  navigate: (dir: 'up' | 'down') => void,
): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (locked) return
      const el = viewRef.current
      if (!el) return

      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        if (isAtBottom(el)) navigate('down')
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        if (isAtTop(el)) navigate('up')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [viewRef, locked, navigate])
}
