# 08-01 · `ProjectArt` dispatcher

**Status:** TODO · **Size:** S · **Blocked by:** 03-02

## Description

`<ProjectArt id="soka" />` returns the matching SVG component (one of 8). It's
a simple switch / map. Used by both `ProjectCard` and `ProjectModal`.

## Files affected

- `src/components/projects/artwork/ProjectArt.tsx`

## Implementation notes

```tsx
import SokaArt from './SokaArt'
import SokaLiveArt from './SokaLiveArt'
import LudokaArt from './LudokaArt'
import EerArt from './EerArt'
import ShoyoArt from './ShoyoArt'
import OcrArt from './OcrArt'
import HappyArt from './HappyArt'
import TheseisArt from './TheseisArt'
import type { ProjectId } from '@/content/projects'

const MAP: Record<ProjectId, React.ComponentType> = {
  soka: SokaArt,
  'soka-live': SokaLiveArt,
  ludoka: LudokaArt,
  eer: EerArt,
  shoyo: ShoyoArt,
  ocr: OcrArt,
  happy: HappyArt,
  theseis: TheseisArt,
}

export default function ProjectArt({ id }: { id: ProjectId }) {
  const Cmp = MAP[id]
  return Cmp ? <Cmp /> : null
}
```

## Acceptance criteria

- [ ] Component renders the matching SVG by id.
- [ ] Returns `null` for unknown ids (type-safe so this should be unreachable).
- [ ] Unit test asserts each `id` resolves to a non-null element.

## Test notes

```tsx
import { render } from '@testing-library/react'
import ProjectArt from './ProjectArt'
import { PROJECTS } from '@/content/projects'

it('renders for every project id', () => {
  for (const p of PROJECTS) {
    const { container, unmount } = render(<ProjectArt id={p.id} />)
    expect(container.querySelector('svg')).toBeTruthy()
    unmount()
  }
})
```

## Edge cases

- The artwork components don't exist yet at this story's time — story 08-02
  creates them. Sequence this story AFTER 08-02 OR create the 8 stub files
  first. Recommend completing 08-02 first.
