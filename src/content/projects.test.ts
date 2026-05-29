// Tests for the new Atelier project dataset (`src/content/projects.ts`).
//
// `projects.ts` is the standalone, locale-independent source of the 8 featured
// works rendered by the Work view and the project detail modal. It is typed by
// the `Project` interface in `types.ts`. This suite locks the shape the design
// doc specifies: 8 entries, `num` "01"…"08", the 8-id union, and a populated
// `detail` block on every entry.
import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import type { Project, ProjectId } from './types'

const EXPECTED_IDS: ProjectId[] = [
  'soka',
  'soka-live',
  'ludoka',
  'eer',
  'shoyo',
  'ocr',
  'happy',
  'theseis',
]

describe('projects dataset', () => {
  it('exports exactly 8 entries', () => {
    expect(projects).toHaveLength(8)
  })

  it('covers every project id in the union, with no duplicates', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(8)
    expect([...ids].sort()).toEqual([...EXPECTED_IDS].sort())
  })

  it('numbers entries "01" through "08" in order', () => {
    const nums = projects.map((p) => p.num)
    expect(nums).toEqual(['01', '02', '03', '04', '05', '06', '07', '08'])
  })

  it('every entry carries the required scalar fields', () => {
    projects.forEach((project: Project) => {
      expect(project.name).toBeTruthy()
      expect(project.year).toBeTruthy()
      expect(project.role).toBeTruthy()
      expect(project.client).toBeTruthy()
      expect(project.category).toBeTruthy()
      expect(Array.isArray(project.tags)).toBe(true)
      expect(project.tags.length).toBeGreaterThan(0)
    })
  })

  it('link and repo are string-or-null', () => {
    projects.forEach((project) => {
      expect(['string', 'object']).toContain(typeof project.link)
      expect(['string', 'object']).toContain(typeof project.repo)
      // null is typeof 'object'; a non-null object would be wrong
      if (project.link !== null) expect(typeof project.link).toBe('string')
      if (project.repo !== null) expect(typeof project.repo).toBe('string')
    })
  })

  it('every entry has a populated detail block', () => {
    projects.forEach((project) => {
      expect(project.detail.role).toBeTruthy()
      expect(project.detail.impact).toBeTruthy()
      expect(project.detail.stack).toBeTruthy()
      // detail.stack is a single " · "-separated string, not an array
      expect(typeof project.detail.stack).toBe('string')
    })
  })
})
