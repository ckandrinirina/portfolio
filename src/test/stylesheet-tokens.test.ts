/// <reference types="node" />
/**
 * CSS-presence tests for story 01-01: Global stylesheet rewrite.
 *
 * These tests assert STRUCTURAL FACTS about the stylesheet:
 *  - The four palette token blocks exist
 *  - Key tokens are defined
 *  - Core class names are present
 *  - Required keyframes exist
 *  - Media queries are present
 *
 * Visual correctness cannot be fully unit-tested; these tests protect against
 * accidental omissions or regressions in the token/class surface.
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, expect, it } from 'vitest'

// Read the raw CSS file directly — the @tailwindcss/vite plugin transforms
// CSS ?raw imports during the test run (stripping the source), so we bypass
// it with a direct fs read.
const css = readFileSync(resolve(__dirname, '../../src/index.css'), 'utf8')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasToken(
  stylesheet: string,
  selector: string,
  token: string,
): boolean {
  // Normalise the selector to match both quote styles used by formatters.
  // e.g. [data-theme="paper"] also matches [data-theme='paper']
  const selectorEscaped = selector
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/"/g, '["\']') // allow either quote style
  const re = new RegExp(selectorEscaped + '\\s*\\{[^}]*' + token + '\\s*:', 's')
  return re.test(stylesheet)
}

// ---------------------------------------------------------------------------
// @import and @theme header
// ---------------------------------------------------------------------------

describe('index.css — @import and @theme header', () => {
  it("starts with @import 'tailwindcss'", () => {
    expect(css).toMatch(/@import ['"]tailwindcss['"]/)
  })

  it('has an @theme block bridging color-bg, color-fg, color-accent, font-mono, font-serif', () => {
    expect(css).toMatch(/@theme\s*\{/)
    expect(css).toMatch(/--color-bg\s*:/)
    expect(css).toMatch(/--color-fg\s*:/)
    expect(css).toMatch(/--color-accent\s*:/)
    expect(css).toMatch(/--font-mono\s*:/)
    expect(css).toMatch(/--font-serif\s*:/)
  })
})

// ---------------------------------------------------------------------------
// Ember palette (:root)
// ---------------------------------------------------------------------------

describe('index.css — Ember palette (:root)', () => {
  it('defines --bg on :root', () => {
    expect(hasToken(css, ':root', '--bg')).toBe(true)
  })

  it('defines --accent on :root with the correct value', () => {
    expect(css).toMatch(/--accent\s*:\s*#[eE]08660/i)
  })

  it('defines --bg-deep, --bg-2, --surface, --surface-2', () => {
    expect(hasToken(css, ':root', '--bg-deep')).toBe(true)
    expect(hasToken(css, ':root', '--bg-2')).toBe(true)
    expect(hasToken(css, ':root', '--surface')).toBe(true)
    expect(hasToken(css, ':root', '--surface-2')).toBe(true)
  })

  it('defines --fg, --fg-soft, --fg-dim, --muted, --muted-deep', () => {
    expect(hasToken(css, ':root', '--fg')).toBe(true)
    expect(hasToken(css, ':root', '--fg-soft')).toBe(true)
    expect(hasToken(css, ':root', '--fg-dim')).toBe(true)
    expect(hasToken(css, ':root', '--muted')).toBe(true)
    expect(hasToken(css, ':root', '--muted-deep')).toBe(true)
  })

  it('defines --line, --line-strong', () => {
    expect(hasToken(css, ':root', '--line')).toBe(true)
    expect(hasToken(css, ':root', '--line-strong')).toBe(true)
  })

  it('defines --accent-soft, --accent-deep, --gold, --success, --info', () => {
    expect(hasToken(css, ':root', '--accent-soft')).toBe(true)
    expect(hasToken(css, ':root', '--accent-deep')).toBe(true)
    expect(hasToken(css, ':root', '--gold')).toBe(true)
    expect(hasToken(css, ':root', '--success')).toBe(true)
    expect(hasToken(css, ':root', '--info')).toBe(true)
  })

  it('defines --shadow-soft and --shadow-lift', () => {
    expect(hasToken(css, ':root', '--shadow-soft')).toBe(true)
    expect(hasToken(css, ':root', '--shadow-lift')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Paper palette ([data-theme="paper"])
// ---------------------------------------------------------------------------

describe('index.css — Paper palette', () => {
  it('defines [data-theme="paper"] block with --bg and --accent overrides', () => {
    expect(css).toMatch(/\[data-theme=["']paper["']\]/)
    expect(hasToken(css, '[data-theme="paper"]', '--bg')).toBe(true)
    expect(hasToken(css, '[data-theme="paper"]', '--accent')).toBe(true)
  })

  it('has the correct --bg value for paper (#F2EDDD)', () => {
    expect(css).toMatch(/--bg\s*:\s*#f2eddd/i)
  })
})

// ---------------------------------------------------------------------------
// Ocean palette ([data-theme="ocean"])
// ---------------------------------------------------------------------------

describe('index.css — Ocean palette', () => {
  it('defines [data-theme="ocean"] block with --bg and --accent overrides', () => {
    expect(css).toMatch(/\[data-theme=["']ocean["']\]/)
    expect(hasToken(css, '[data-theme="ocean"]', '--bg')).toBe(true)
    expect(hasToken(css, '[data-theme="ocean"]', '--accent')).toBe(true)
  })

  it('has the correct --accent value for ocean (#7AB7FF)', () => {
    expect(css).toMatch(/--accent\s*:\s*#7ab7ff/i)
  })
})

// ---------------------------------------------------------------------------
// Forest palette ([data-theme="forest"])
// ---------------------------------------------------------------------------

describe('index.css — Forest palette', () => {
  it('defines [data-theme="forest"] block with --bg and --accent overrides', () => {
    expect(css).toMatch(/\[data-theme=["']forest["']\]/)
    expect(hasToken(css, '[data-theme="forest"]', '--bg')).toBe(true)
    expect(hasToken(css, '[data-theme="forest"]', '--accent')).toBe(true)
  })

  it('has the correct --accent value for forest (#94D49A)', () => {
    expect(css).toMatch(/--accent\s*:\s*#94d49a/i)
  })
})

// ---------------------------------------------------------------------------
// Typography & motion tokens
// ---------------------------------------------------------------------------

describe('index.css — Typography & motion tokens', () => {
  it('defines --font-mono with JetBrains Mono', () => {
    expect(css).toMatch(/--font-mono\s*:/)
    expect(css).toMatch(/JetBrains Mono/)
  })

  it('defines --font-serif with Instrument Serif', () => {
    expect(css).toMatch(/--font-serif\s*:/)
    expect(css).toMatch(/Instrument Serif/)
  })

  it('defines --ease with cubic-bezier(0.22, 1, 0.36, 1)', () => {
    expect(css).toMatch(/--ease\s*:/)
    expect(css).toMatch(/cubic-bezier\(0\.22,\s*1,\s*0\.36,\s*1\)/)
  })

  it('sets body font-mono at 14px / 1.6', () => {
    expect(css).toMatch(/font-size\s*:\s*14px/)
    expect(css).toMatch(/line-height\s*:\s*1\.6/)
  })

  it('enables ss01 and cv11 OpenType features on body', () => {
    expect(css).toMatch(/font-feature-settings/)
    expect(css).toMatch(/["']ss01["']/)
    expect(css).toMatch(/["']cv11["']/)
  })

  it('uses clamp for section-title font size', () => {
    expect(css).toMatch(/clamp\(32px,\s*4\.5vw,\s*52px\)/)
  })

  it('uses clamp for hero name font size', () => {
    expect(css).toMatch(/clamp\(48px,\s*7vw,\s*88px\)/)
  })
})

// ---------------------------------------------------------------------------
// Ambient effects
// ---------------------------------------------------------------------------

describe('index.css — Ambient effects', () => {
  it('defines body::before (radial glow)', () => {
    expect(css).toMatch(/body\s*::before/)
    expect(css).toMatch(/radial-gradient/)
    expect(css).toMatch(/pointer-events\s*:\s*none/)
  })

  it('defines body::after (grid overlay)', () => {
    expect(css).toMatch(/body\s*::after/)
    expect(css).toMatch(/linear-gradient/)
  })
})

// ---------------------------------------------------------------------------
// Layout — .app grid
// ---------------------------------------------------------------------------

describe('index.css — .app grid layout', () => {
  it('defines .app with grid and 240px sidebar column', () => {
    expect(css).toMatch(/\.app/)
    expect(css).toMatch(/240px\s+1fr/)
  })

  it('has height: 100vh and overflow: hidden on .app', () => {
    // They may be on the same or different lines; check raw presence
    expect(css).toMatch(/height\s*:\s*100vh/)
    expect(css).toMatch(/overflow\s*:\s*hidden/)
  })
})

// ---------------------------------------------------------------------------
// Core component classes
// ---------------------------------------------------------------------------

describe('index.css — Core component classes present', () => {
  const requiredClasses = [
    'app',
    'sidebar',
    'topbar',
    'view',
    'view-inner',
    'eyebrow',
    'section-title',
    'section-sub',
    'home-hero',
    'home-name',
    'home-tagline',
    'home-roles',
    'avatar-frame',
    'now-card',
    'stats-grid',
    'stat-tile',
    'marquee',
    'marquee-track',
    'work-grid',
    'proj-card',
    'modal-bg',
    'modal',
    'modal-body',
    'timeline',
    'tl-item',
    'skill-cards',
    'skill-card',
    'process-item',
    'contact-grid',
    'contact-card',
    'cmdk-bg',
    'cmdk',
    'cmdk-input',
    'cmdk-list',
    'cmdk-grp',
    'cmdk-item',
    'deco-corner',
    'reveal',
    'scroll-hint',
    'cursor-dot',
    'cursor-ring',
    'btn',
    'btn-primary',
  ]

  requiredClasses.forEach((cls) => {
    it(`has .${cls}`, () => {
      // The class selector appears in the CSS
      const re = new RegExp('\\.' + cls + '[\\s{,+~>:]')
      expect(css, `missing .${cls}`).toMatch(re)
    })
  })
})

// ---------------------------------------------------------------------------
// Stagger classes (.stg-1 through .stg-8)
// ---------------------------------------------------------------------------

describe('index.css — Stagger classes', () => {
  for (let i = 1; i <= 8; i++) {
    it(`has .stg-${i}`, () => {
      const re = new RegExp(`\\.stg-${i}[\\s{,+~>:]`)
      expect(css, `missing .stg-${i}`).toMatch(re)
    })
  }
})

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

describe('index.css — Required keyframes', () => {
  const keyframes = [
    'orbit',
    'blink',
    'viewEnter',
    'viewEnterDown',
    'viewEnterUp',
    'marquee',
    'navSweep',
    'bounce',
    'charIn',
    'cardIn',
  ]

  keyframes.forEach((kf) => {
    it(`has @keyframes ${kf}`, () => {
      expect(css, `missing @keyframes ${kf}`).toMatch(
        new RegExp('@keyframes\\s+' + kf + '[\\s{]'),
      )
    })
  })
})

// ---------------------------------------------------------------------------
// Media queries
// ---------------------------------------------------------------------------

describe('index.css — Media queries', () => {
  it('has prefers-reduced-motion: reduce block', () => {
    expect(css).toMatch(/prefers-reduced-motion\s*:\s*reduce/)
  })

  it('has (hover: hover) and (pointer: fine) block', () => {
    expect(css).toMatch(/hover\s*:\s*hover/)
    expect(css).toMatch(/pointer\s*:\s*fine/)
  })

  it('sets cursor: none under hover+fine media query', () => {
    expect(css).toMatch(/cursor\s*:\s*none/)
  })

  it('has responsive breakpoint ≤880px for .app grid-rows stacking', () => {
    expect(css).toMatch(/880px/)
  })
})

// Google Fonts tests live in src/test/google-fonts.test.ts
