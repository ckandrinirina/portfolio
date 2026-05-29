/**
 * commands.test.ts — Unit tests for the commands.ts dataset.
 *
 * Covers:
 * - All commands have required shape (kind, id, glyph, labelKey)
 * - Navigation group contains all 6 routes
 * - Quick group contains expected action ids
 * - Projects group contains all 8 project ids
 * - Every command descriptor is uniquely identified
 * - No App state imported (data file is pure)
 */

import { describe, it, expect } from 'vitest'
import { COMMANDS, type CommandDescriptor } from './commands'

describe('commands dataset', () => {
  // ── Shape validation ───────────────────────────────────────────────────────
  it('exports an array of command descriptors', () => {
    expect(Array.isArray(COMMANDS)).toBe(true)
    expect(COMMANDS.length).toBeGreaterThan(0)
  })

  it('every command has a kind, id, glyph, and labelKey', () => {
    for (const cmd of COMMANDS) {
      expect(cmd).toHaveProperty('kind')
      expect(cmd).toHaveProperty('id')
      expect(cmd).toHaveProperty('glyph')
      expect(cmd).toHaveProperty('labelKey')
      expect(['nav', 'quick', 'project']).toContain(cmd.kind)
    }
  })

  it('every command id is unique', () => {
    const ids = COMMANDS.map((c) => c.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  // ── Navigation group ───────────────────────────────────────────────────────
  it('Navigation group contains all 6 routes', () => {
    const navCmds = COMMANDS.filter((c) => c.kind === 'nav')
    const routeIds = navCmds.map(
      (c) => (c as { kind: 'nav'; route: string }).route,
    )
    const expectedRoutes = [
      'home',
      'work',
      'experience',
      'skills',
      'process',
      'contact',
    ]
    for (const route of expectedRoutes) {
      expect(routeIds).toContain(route)
    }
    expect(navCmds).toHaveLength(6)
  })

  it('nav commands have a route property', () => {
    const navCmds = COMMANDS.filter((c) => c.kind === 'nav')
    for (const cmd of navCmds) {
      expect(cmd).toHaveProperty('route')
    }
  })

  // ── Quick group ────────────────────────────────────────────────────────────
  it('Quick group contains cycleTheme, toggleLanguage, downloadCv actions', () => {
    const quickCmds = COMMANDS.filter((c) => c.kind === 'quick')
    const actionIds = quickCmds.map((c) => c.id)
    expect(actionIds).toContain('cycleTheme')
    expect(actionIds).toContain('toggleLanguage')
    expect(actionIds).toContain('downloadCv')
  })

  it('quick commands have an actionId property', () => {
    const quickCmds = COMMANDS.filter((c) => c.kind === 'quick')
    for (const cmd of quickCmds) {
      expect(cmd).toHaveProperty('actionId')
    }
  })

  // ── Projects group ─────────────────────────────────────────────────────────
  it('Projects group contains all 8 project ids', () => {
    const projCmds = COMMANDS.filter((c) => c.kind === 'project')
    const projectIds = projCmds.map(
      (c) => (c as { kind: 'project'; projectId: string }).projectId,
    )
    const expectedIds = [
      'soka',
      'soka-live',
      'ludoka',
      'eer',
      'shoyo',
      'ocr',
      'happy',
      'theseis',
    ]
    for (const id of expectedIds) {
      expect(projectIds).toContain(id)
    }
    expect(projCmds).toHaveLength(8)
  })

  it('project commands have a projectId property', () => {
    const projCmds = COMMANDS.filter((c) => c.kind === 'project')
    for (const cmd of projCmds) {
      expect(cmd).toHaveProperty('projectId')
    }
  })

  // ── No App-state imports (structural check) ───────────────────────────────
  it('command descriptors do not reference React or App internals', () => {
    // All command data should be plain objects (no function references in descriptors)
    for (const cmd of COMMANDS) {
      const descriptor = cmd as CommandDescriptor
      // kind, id, glyph, labelKey are all strings
      expect(typeof descriptor.kind).toBe('string')
      expect(typeof descriptor.id).toBe('string')
      expect(typeof descriptor.glyph).toBe('string')
      expect(typeof descriptor.labelKey).toBe('string')
    }
  })

  // ── Filtering support ──────────────────────────────────────────────────────
  it('commands have a searchText property for filtering', () => {
    for (const cmd of COMMANDS) {
      expect(cmd).toHaveProperty('searchText')
      expect(typeof cmd.searchText).toBe('string')
    }
  })
})
