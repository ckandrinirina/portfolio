import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn() utility', () => {
  it('merges class strings', () => {
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toContain('px-4')
    expect(result).toContain('py-1')
  })

  it('deduplicates conflicting Tailwind utilities (px-2 vs px-4)', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toContain('px-4')
    expect(result).not.toContain('px-2')
  })

  it('returns empty string when called with no arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles undefined input', () => {
    const result = cn('px-2', undefined, 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })

  it('handles null input', () => {
    const result = cn('px-2', null, 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })

  it('handles false input', () => {
    const result = cn('px-2', false, 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })

  it('handles conditional objects', () => {
    const isActive = true
    const result = cn('base', { 'bg-blue-500': isActive })
    expect(result).toContain('base')
    expect(result).toContain('bg-blue-500')
  })

  it('handles conditional objects that are false', () => {
    const isActive = false
    const result = cn('base', { 'bg-blue-500': isActive })
    expect(result).toContain('base')
    expect(result).not.toContain('bg-blue-500')
  })

  it('combines multiple class types together', () => {
    const result = cn(
      'base-class',
      ['array', 'of', 'classes'],
      { 'conditional-class': true },
      undefined,
      null,
      false,
    )
    expect(result).toContain('base-class')
    expect(result).toContain('array')
    expect(result).toContain('of')
    expect(result).toContain('classes')
    expect(result).toContain('conditional-class')
  })
})
