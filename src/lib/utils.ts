import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class strings and deduplicates conflicting Tailwind utilities.
 * Combines clsx (conditional class handling) with tailwind-merge (Tailwind conflict resolution).
 *
 * @example
 * cn('px-2', 'px-4') // 'px-4' (conflict resolved)
 * cn('px-2', undefined, 'py-1') // 'px-2 py-1'
 * cn('base', { 'active': true }) // 'base active'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
