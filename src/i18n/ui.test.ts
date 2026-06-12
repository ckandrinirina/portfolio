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

  // Segmented `.section-title` tail fragments are legitimately empty when the
  // reference title ends on the accent `.mark` span (Process, Contact).
  const ALLOWED_EMPTY: (keyof UiLabels)[] = [
    'processTitleTail',
    'contactTitleTail',
  ]

  it('all values are strings, non-empty except the known empty title tails', () => {
    const keys = Object.keys(ui.fr) as (keyof UiLabels)[]
    for (const key of keys) {
      expect(typeof ui.fr[key]).toBe('string')
      expect(typeof ui.en[key]).toBe('string')
      if (!ALLOWED_EMPTY.includes(key)) {
        expect(ui.fr[key]).toBeTruthy()
        expect(ui.en[key]).toBeTruthy()
      }
    }
  })
})

// New Atelier-shell labels added by story 01-03: per-route nav, command-palette
// group headers, copy-to-clipboard feedback, view eyebrows, and sidebar footer
// status chips. Old keys stay for the doomed section components (removed in 04-01).
describe('ui — Atelier shell labels', () => {
  const ATELIER_KEYS: (keyof UiLabels)[] = [
    // per-route nav (new routes)
    'navHome',
    'navWork',
    'navProcess',
    // command palette group headers
    'cmdkNavigation',
    'cmdkQuick',
    'cmdkProjects',
    // copy-to-clipboard feedback
    'copy',
    'copied',
    // project actions
    'readCase',
    'visitLive',
    // view eyebrows
    'eyebrowWork',
    'eyebrowExperience',
    'eyebrowSkills',
    'eyebrowProcess',
    'eyebrowContact',
    // sidebar footer status chips
    'footerStatus',
    'footerRegion',
    'footerPaired',
  ]

  it('both locales expose every Atelier shell key as a non-empty string', () => {
    for (const key of ATELIER_KEYS) {
      expect(ui.fr).toHaveProperty(key)
      expect(ui.en).toHaveProperty(key)
      expect(ui.fr[key].length).toBeGreaterThan(0)
      expect(ui.en[key].length).toBeGreaterThan(0)
    }
  })

  it('copy and copied are distinct feedback labels', () => {
    expect(ui.fr.copy).not.toBe(ui.fr.copied)
    expect(ui.en.copy).not.toBe(ui.en.copied)
  })
})

// Project detail modal section labels — previously hardcoded English in
// ProjectModal.tsx, now localized via t(). (BUG-20260612-01)
describe('ui — project modal labels', () => {
  const MODAL_KEYS: (keyof UiLabels)[] = [
    'modalRole',
    'modalImpact',
    'modalStack',
    'modalClose',
    'modalCloseAria',
  ]

  it('both locales expose every modal label key as a non-empty string', () => {
    for (const key of MODAL_KEYS) {
      expect(ui.fr).toHaveProperty(key)
      expect(ui.en).toHaveProperty(key)
      expect(ui.fr[key].length).toBeGreaterThan(0)
      expect(ui.en[key].length).toBeGreaterThan(0)
    }
  })

  it('the role / close labels are actually translated to French', () => {
    expect(ui.fr.modalRole).not.toBe(ui.en.modalRole)
    expect(ui.fr.modalClose).not.toBe(ui.en.modalClose)
    expect(ui.fr.modalCloseAria).not.toBe(ui.en.modalCloseAria)
  })
})
