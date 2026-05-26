// Structural parity test between French and English content modules.
//
// This test verifies that `fr.ts` and `en.ts` have identical structure:
// - Same top-level array lengths (experience, projects, education, spokenLanguages)
// - Same skill group count
// - For each experience entry: same number of projects
// - For each skill group: same number of items
//
// No string assertions — only lengths and shapes. This keeps the test resilient
// to content edits that don't add or remove array entries.

import { describe, expect, it } from 'vitest'
import frContent from './fr'
import enContent from './en'

describe('content parity: fr vs en', () => {
  describe('top-level array lengths', () => {
    it('experience array has equal length', () => {
      expect(enContent.experience.length).toBe(frContent.experience.length)
    })

    it('projects array has equal length', () => {
      expect(enContent.projects.length).toBe(frContent.projects.length)
    })

    it('skills array has equal length', () => {
      expect(enContent.skills.length).toBe(frContent.skills.length)
    })

    it('education array has equal length', () => {
      expect(enContent.education.length).toBe(frContent.education.length)
    })

    it('spokenLanguages array has equal length', () => {
      expect(enContent.spokenLanguages.length).toBe(
        frContent.spokenLanguages.length,
      )
    })
  })

  describe('nested array parity', () => {
    it('each experience has equal number of projects', () => {
      frContent.experience.forEach((_, i) => {
        expect(enContent.experience[i].projects.length).toBe(
          frContent.experience[i].projects.length,
        )
      })
    })

    it('each skills group has equal number of items', () => {
      frContent.skills.forEach((_, i) => {
        expect(enContent.skills[i].items.length).toBe(
          frContent.skills[i].items.length,
        )
      })
    })
  })
})
