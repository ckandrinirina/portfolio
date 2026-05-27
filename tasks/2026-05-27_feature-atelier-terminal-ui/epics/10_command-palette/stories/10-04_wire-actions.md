# 10-04 · Wire actions

**Status:** TODO · **Size:** S · **Blocked by:** 10-02, 06-05, 02-04

## Description

Mount `<CommandPalette>` in `App.tsx` with the `doAction` handler that
performs `copyEmail`, `whatsapp`, and `cycleTheme`.

## Files affected

- `src/App.tsx`

## Implementation notes

```tsx
import CommandPalette from '@/components/cmdk/CommandPalette'
import { useTheme } from '@/theme/useTheme'

// inside App component:
const { cycle } = useTheme()

const doAction = (a: 'copyEmail' | 'whatsapp' | 'cycleTheme') => {
  if (a === 'copyEmail') navigator.clipboard?.writeText('ckandrinirina@gmail.com')
  else if (a === 'whatsapp') window.open('https://wa.me/261385096664', '_blank', 'noopener')
  else if (a === 'cycleTheme') cycle()
}

// in JSX:
<CommandPalette
  open={cmdOpen}
  onClose={() => setCmdOpen(false)}
  onRoute={(id) => select(id)}
  doAction={doAction}
/>
```

## Acceptance criteria

- [ ] `<CommandPalette>` mounted in App.
- [ ] `cmdOpen` state from 06-05 drives `open` prop.
- [ ] `theme` command cycles the theme.
- [ ] `email` command writes the email to clipboard.
- [ ] `whatsapp` command opens the WA URL in a new tab.
- [ ] Project items navigate to Work view.

## Test notes

Smoke integration test: render App, dispatch `⌘K`, click "email", assert
clipboard write was called with the email.

## Edge cases

- `window.open` is blocked by popup blockers if not triggered by a user
  gesture. Since this fires from a click handler, it's fine.
