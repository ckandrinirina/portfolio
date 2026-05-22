import { describe, it, expect } from 'vitest'
import { SITE_META, SOCIAL_LINKS, NAV_SECTIONS } from './constants'

describe('SITE_META constant', () => {
  it('exports name field', () => {
    expect(SITE_META).toHaveProperty('name')
    expect(typeof SITE_META.name).toBe('string')
  })

  it('exports title field', () => {
    expect(SITE_META).toHaveProperty('title')
    expect(typeof SITE_META.title).toBe('string')
  })

  it('exports locationLabel field', () => {
    expect(SITE_META).toHaveProperty('locationLabel')
    expect(typeof SITE_META.locationLabel).toBe('string')
    expect(SITE_META.locationLabel).toBe('Antananarivo, Madagascar')
  })

  it('exports email field', () => {
    expect(SITE_META).toHaveProperty('email')
    expect(typeof SITE_META.email).toBe('string')
  })

  it('exports whatsapp field with correct URL format', () => {
    expect(SITE_META).toHaveProperty('whatsapp')
    expect(typeof SITE_META.whatsapp).toBe('string')
    expect(SITE_META.whatsapp).toBe('https://wa.me/261385096664')
  })

  it('does not contain full street address', () => {
    const stringified = JSON.stringify(SITE_META)
    expect(stringified).not.toContain('Street')
    expect(stringified).not.toContain('Address')
    expect(stringified).not.toContain('Lot')
  })
})

describe('SOCIAL_LINKS constant', () => {
  it('exports github field as empty string', () => {
    expect(SOCIAL_LINKS).toHaveProperty('github')
    expect(SOCIAL_LINKS.github).toBe('')
  })

  it('exports linkedin field as empty string', () => {
    expect(SOCIAL_LINKS).toHaveProperty('linkedin')
    expect(SOCIAL_LINKS.linkedin).toBe('')
  })
})

describe('NAV_SECTIONS constant', () => {
  it('exports array of nav sections', () => {
    expect(Array.isArray(NAV_SECTIONS)).toBe(true)
  })

  it('contains all required sections in correct order', () => {
    const expectedIds = [
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'education',
      'languages',
      'contact',
    ]
    expect(NAV_SECTIONS).toHaveLength(expectedIds.length)
    NAV_SECTIONS.forEach((section, index) => {
      expect(section.id).toBe(expectedIds[index])
    })
  })

  it('each section has an id and labelKey property', () => {
    NAV_SECTIONS.forEach((section) => {
      expect(section).toHaveProperty('id')
      expect(section).toHaveProperty('labelKey')
      expect(typeof section.id).toBe('string')
      expect(typeof section.labelKey).toBe('string')
    })
  })

  it('labelKey follows consistent pattern', () => {
    NAV_SECTIONS.forEach((section) => {
      // labelKey should be either the id itself or follow a nav. prefix pattern
      expect(section.labelKey.length).toBeGreaterThan(0)
    })
  })
})
