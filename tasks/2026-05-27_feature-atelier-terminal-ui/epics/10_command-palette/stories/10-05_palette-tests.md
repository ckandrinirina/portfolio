# 10-05 · CommandPalette tests

**Status:** TODO · **Size:** M · **Blocked by:** 10-02, 10-04

## Description

Comprehensive test for the palette: open via ⌘K, filter, arrow nav, enter
runs action, escape closes, click-outside closes.

## Files affected

- `src/components/cmdk/CommandPalette.test.tsx`

## Implementation notes

Cases:

1. Renders nothing visible when `open={false}` (class `cmdk-bg` without `open` class).
2. On open, input is focused after 50ms.
3. Typing "exp" filters to one nav row "Experience".
4. ArrowDown moves `active` to index 1; ArrowUp moves it back to 0.
5. Enter on a route item calls `onRoute` with the right id and `onClose`.
6. Enter on a `Quick` action item calls `doAction` with the right key.
7. Escape calls `onClose`.
8. Click on backdrop calls `onClose`; click inside `.cmdk` does not.
9. Empty filter shows the "No matches" line interpolated with the query.

## Acceptance criteria

- [ ] All 9 cases pass.
- [ ] No flaky timing (use `act` + `waitFor` for focus-after-50ms case).

## Test notes

```tsx
import { render, screen, fireEvent, act } from '@testing-library/react'
import CommandPalette from './CommandPalette'

it('arrow + enter runs route command', () => {
  const onRoute = vi.fn(), onClose = vi.fn(), doAction = vi.fn()
  render(<LanguageProvider>
    <CommandPalette open={true} onClose={onClose} onRoute={onRoute} doAction={doAction} />
  </LanguageProvider>)
  fireEvent.keyDown(window, { key: 'ArrowDown' })  // active -> 1
  fireEvent.keyDown(window, { key: 'Enter' })
  expect(onRoute).toHaveBeenCalledWith('work')
  expect(onClose).toHaveBeenCalled()
})
```

## Edge cases

- jsdom focus is reliable; use `expect(inputEl).toHaveFocus()` after the
  50ms timer. Use `vi.useFakeTimers()` then `act(() => vi.advanceTimersByTime(60))`.
