import { describe, it, expect } from 'vitest'
import { ui, type UiLabels } from './ui'

describe('ui — UI micro-labels map', () => {
  it('exports a ui constant with fr and en locales', () => {
    expect(ui).toBeDefined()
    expect(ui.fr).toBeDefined()
    expect(ui.en).toBeDefined()
  })

  it('fr locale contains all 14 UiLabels keys', () => {
    const requiredKeys: (keyof UiLabels)[] = [
      'navHero',
      'navAbout',
      'navSkills',
      'navExperience',
      'navProjects',
      'navEducation',
      'navLanguages',
      'navContact',
      'viewProjects',
      'downloadCv',
      'contact',
      'languageSwitcher',
      'themeToggle',
      'builtWith',
    ]
    for (const key of requiredKeys) {
      expect(ui.fr).toHaveProperty(key)
      expect(typeof ui.fr[key]).toBe('string')
      expect(ui.fr[key].length).toBeGreaterThan(0)
    }
  })

  it('en locale contains all 14 UiLabels keys', () => {
    const requiredKeys: (keyof UiLabels)[] = [
      'navHero',
      'navAbout',
      'navSkills',
      'navExperience',
      'navProjects',
      'navEducation',
      'navLanguages',
      'navContact',
      'viewProjects',
      'downloadCv',
      'contact',
      'languageSwitcher',
      'themeToggle',
      'builtWith',
    ]
    for (const key of requiredKeys) {
      expect(ui.en).toHaveProperty(key)
      expect(typeof ui.en[key]).toBe('string')
      expect(ui.en[key].length).toBeGreaterThan(0)
    }
  })

  it('both locales have identical key sets', () => {
    const frKeys = Object.keys(ui.fr).sort()
    const enKeys = Object.keys(ui.en).sort()
    expect(frKeys).toEqual(enKeys)
  })

  it('nav labels do not conflict with language switcher', () => {
    expect(ui.fr).toHaveProperty('navLanguages')
    expect(ui.fr).toHaveProperty('languageSwitcher')
    expect(ui.fr.navLanguages).not.toBe(ui.fr.languageSwitcher)
    expect(ui.en.navLanguages).not.toBe(ui.en.languageSwitcher)
  })

  it('all values are non-empty strings', () => {
    const keys = Object.keys(ui.fr) as (keyof UiLabels)[]
    for (const key of keys) {
      expect(ui.fr[key]).toBeTruthy()
      expect(typeof ui.fr[key]).toBe('string')
      expect(ui.en[key]).toBeTruthy()
      expect(typeof ui.en[key]).toBe('string')
    }
  })
})
