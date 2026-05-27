# 11-02 · Re-wire `main.tsx` providers

**Status:** TODO · **Size:** S · **Blocked by:** 02-01, 04-05

## Description

Confirm `main.tsx` mounts `<ThemeProvider><LanguageProvider><App/></LanguageProvider></ThemeProvider>`.
The new `ThemeProvider` (Epic 02) replaces the old one — verify the import.

## Files affected

- `src/main.tsx`

## Implementation notes

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
)
```

## Acceptance criteria

- [ ] Imports point to the new `ThemeProvider`.
- [ ] StrictMode wraps everything.
- [ ] `npm run dev` mounts the app without runtime errors.
- [ ] `<html data-theme>` is set correctly on first paint.

## Test notes

None new.

## Edge cases

- Avoid double-wrapping providers; `App` should not also wrap itself.
