import { useEffect } from 'react'

/**
 * useCmdK — listens for ⌘K (Mac) or Ctrl+K (Windows/Linux) and calls the
 * provided toggle function, preventing the browser's default action.
 *
 * @param toggle - Callback invoked when the shortcut fires.
 */
export function useCmdK(toggle: () => void): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggle()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggle])
}
