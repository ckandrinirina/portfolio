# 03-06 · Update content parity test

**Status:** TODO · **Size:** S · **Blocked by:** 03-01, 03-03, 03-04

## Description

Update `src/content/content.test.ts` (legacy from old plan 04-07) to assert
the new parity: `frContent` and `enContent` have identical key sets at every
depth, and required arrays have the expected length.

## Files affected

- `src/content/content.test.ts`

## Implementation notes

```ts
import { describe, it, expect } from 'vitest'
import { frContent } from './fr'
import { enContent } from './en'

function keyShape(o: unknown, path = ''): string[] {
  if (o === null || typeof o !== 'object') return [path]
  if (Array.isArray(o)) return [`${path}[]`]
  return Object.entries(o as Record<string, unknown>)
    .flatMap(([k, v]) => keyShape(v, path ? `${path}.${k}` : k))
}

describe('FR/EN content parity', () => {
  it('has identical key paths', () => {
    expect(keyShape(frContent).sort()).toEqual(keyShape(enContent).sort())
  })
  it('has 4 stats in both', () => {
    expect(frContent.stats).toHaveLength(4)
    expect(enContent.stats).toHaveLength(4)
  })
  it('has 5 process principles in both', () => {
    expect(frContent.process).toHaveLength(5)
    expect(enContent.process).toHaveLength(5)
  })
  it('has 4 skill cards in both', () => {
    expect(frContent.skills).toHaveLength(4)
    expect(enContent.skills).toHaveLength(4)
  })
  it('has the same experience count in both', () => {
    expect(frContent.experience.length).toBe(enContent.experience.length)
  })
})
```

## Acceptance criteria

- [ ] Test file replaces the old parity test that referenced Education.
- [ ] All 5 cases above pass.
- [ ] `npm run test -- --run src/content/content.test.ts` is green.

## Test notes

Run after stories 03-03 and 03-04 are both done.

## Edge cases

- The `keyShape` function bottom-outs at primitives and arrays (treating
  array length as part of the test instead of structure) — this is
  intentional so localized array lengths can match without the test caring
  about per-item structure.
