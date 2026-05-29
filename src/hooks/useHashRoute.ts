import { useEffect } from 'react'

/**
 * useHashRoute — reads the initial window.location.hash and subscribes to
 * hashchange events, keeping route state in sync via the provided setter.
 *
 * The leading '#' is stripped before calling setRoute so callers receive a
 * plain route id (e.g. 'home', 'work') rather than '#home'.
 *
 * @param setRoute - State setter that receives the current route id.
 */
export function useHashRoute(setRoute: (route: string) => void): void {
  useEffect(() => {
    // Initialize from current hash, stripping the leading '#'.
    setRoute(window.location.hash.replace(/^#/, ''))

    function handleHashChange() {
      setRoute(window.location.hash.replace(/^#/, ''))
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [setRoute])
}
