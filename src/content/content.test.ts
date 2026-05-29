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

// New Atelier-model members layered on top of the legacy shape (story 01-03).
// Parity here is structural: same array lengths, same stat values, same
// timeline/skill counts, identical marquee tokens (proper nouns, not localized).
describe('Atelier content model: fr vs en parity', () => {
  it('now-card exposes headline, body, and meta in both locales', () => {
    for (const c of [frContent, enContent]) {
      expect(c.now.headline).toBeTruthy()
      expect(c.now.body).toBeTruthy()
      expect(c.now.meta.label).toBeTruthy()
      expect(c.now.meta.period).toBeTruthy()
    }
  })

  it('stats arrays match in length and numeric values', () => {
    expect(enContent.stats.length).toBe(frContent.stats.length)
    expect(enContent.stats.length).toBeGreaterThan(0)
    frContent.stats.forEach((stat, i) => {
      expect(enContent.stats[i].n).toBe(stat.n)
      expect(enContent.stats[i].label).toBeTruthy()
      expect(frContent.stats[i].label).toBeTruthy()
    })
  })

  it('marquee tokens are identical across locales (proper nouns)', () => {
    expect(enContent.marquee).toEqual(frContent.marquee)
    expect(frContent.marquee.length).toBeGreaterThan(0)
  })

  it('timeline has 7 entries in both locales with matching stack lengths', () => {
    expect(frContent.timeline).toHaveLength(7)
    expect(enContent.timeline).toHaveLength(7)
    frContent.timeline.forEach((entry, i) => {
      expect(entry.year).toBeTruthy()
      expect(entry.role).toBeTruthy()
      expect(entry.company).toBeTruthy()
      expect(entry.desc).toBeTruthy()
      expect(enContent.timeline[i].stack.length).toBe(entry.stack.length)
    })
  })

  it('skillCards has 4 cards in both locales with matching lead/chip counts', () => {
    expect(frContent.skillCards).toHaveLength(4)
    expect(enContent.skillCards).toHaveLength(4)
    frContent.skillCards.forEach((card, i) => {
      expect(card.title).toBeTruthy()
      expect(card.lead.length).toBeGreaterThan(0)
      expect(enContent.skillCards[i].lead.length).toBe(card.lead.length)
      expect(enContent.skillCards[i].chips.length).toBe(card.chips.length)
    })
  })

  it('process has 5 numbered principles in both locales', () => {
    expect(frContent.process).toHaveLength(5)
    expect(enContent.process).toHaveLength(5)
    frContent.process.forEach((principle, i) => {
      expect(principle.num).toBeTruthy()
      expect(principle.title).toBeTruthy()
      expect(principle.body).toBeTruthy()
      expect(enContent.process[i].num).toBe(principle.num)
    })
  })

  it('hero gains greet, tagline, and a non-empty roles rotor', () => {
    for (const c of [frContent, enContent]) {
      expect(c.hero.greet).toBeTruthy()
      expect(c.hero.tagline).toBeTruthy()
      expect(Array.isArray(c.hero.roles)).toBe(true)
      expect(c.hero.roles.length).toBeGreaterThan(0)
    }
    expect(enContent.hero.roles.length).toBe(frContent.hero.roles.length)
  })

  it('contact carries pitch, languages, and meta rows in both locales', () => {
    expect(enContent.contact.languages.length).toBe(
      frContent.contact.languages.length,
    )
    expect(enContent.contact.meta.length).toBe(frContent.contact.meta.length)
    for (const c of [frContent, enContent]) {
      expect(c.contact.pitch).toBeTruthy()
      expect(c.contact.languages.length).toBeGreaterThan(0)
      expect(c.contact.meta.length).toBeGreaterThan(0)
    }
  })
})
