# 10-03 · `useCmdK` hook

**Status:** TODO · **Size:** S · **Blocked by:** —

## Description

Tiny hook that toggles an `open` state when `⌘/Ctrl+K` is pressed.

## Files affected

- `src/hooks/useCmdK.ts`
- `src/hooks/useCmdK.test.ts`

## Implementation notes

```ts
import { useEffect } from 'react'

export function useCmdK(onToggle: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onToggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onToggle])
}
```

Note: `App.tsx` story 06-05 has the same effect inline. Refactor to use this
hook for clarity, OR keep inline if extracted-hook overhead isn't worth the
single use. Either is acceptable.

## Acceptance criteria

- [ ] Hook exists at the path.
- [ ] Pressing `⌘K` (or `Ctrl+K`) fires `onToggle`.
- [ ] Other key combos don't fire.
- [ ] `e.preventDefault()` is called so the browser doesn't intercept
      (Firefox quick-search, for example).
- [ ] Cleanup removes listener.

## Test notes

```ts
const onToggle = vi.fn()
renderHook(() => useCmdK(onToggle))
fireEvent.keyDown(window, { key: 'k', metaKey: true })
expect(onToggle).toHaveBeenCalled()
```

## Edge cases

- macOS: `metaKey` (⌘). Windows/Linux: `ctrlKey`.
