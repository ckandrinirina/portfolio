import { describe, expect, it } from 'vitest'
import html from '../../index.html?raw'

const OG_IMAGE_URL = 'https://ckandrinirina.github.io/og-image.png'
const SITE_URL = 'https://ckandrinirina.github.io/'

function metaContent(html: string, attr: string, name: string): string | null {
  const re = new RegExp(
    `<meta\\s+[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']*)["']|<meta\\s+[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${name}["']`,
    'i',
  )
  const match = html.match(re)
  return match ? (match[1] ?? match[2] ?? null) : null
}

describe('index.html — SEO metadata', () => {
  it('uses lang="fr" on <html>', () => {
    expect(html).toMatch(/<html\s+[^>]*lang=["']fr["']/i)
  })

  it('preserves the UTF-8 charset declaration', () => {
    expect(html).toMatch(/<meta\s+charset=["']UTF-8["']/i)
  })

  it('preserves the viewport meta tag', () => {
    expect(html).toMatch(
      /<meta\s+[^>]*name=["']viewport["'][^>]*content=["']width=device-width,\s*initial-scale=1\.0["']/i,
    )
  })

  it('has the portfolio title', () => {
    const m = html.match(/<title>([^<]+)<\/title>/i)
    expect(m).not.toBeNull()
    expect(m![1].trim()).toBe(
      'Erick Andrinirina — Fullstack JavaScript Engineer',
    )
  })

  it('has a meta description under 160 characters mentioning the name', () => {
    const desc = metaContent(html, 'name', 'description')
    expect(desc).not.toBeNull()
    expect(desc!.length).toBeGreaterThan(0)
    expect(desc!.length).toBeLessThan(160)
    expect(desc).toMatch(/Erick Andrinirina/)
  })

  it('has og:title matching <title>', () => {
    expect(metaContent(html, 'property', 'og:title')).toBe(
      'Erick Andrinirina — Fullstack JavaScript Engineer',
    )
  })

  it('has og:description matching the meta description', () => {
    const ogDesc = metaContent(html, 'property', 'og:description')
    const metaDesc = metaContent(html, 'name', 'description')
    expect(ogDesc).toBe(metaDesc)
  })

  it('has og:image with the absolute production URL', () => {
    expect(metaContent(html, 'property', 'og:image')).toBe(OG_IMAGE_URL)
  })

  it('has og:type="website"', () => {
    expect(metaContent(html, 'property', 'og:type')).toBe('website')
  })

  it('has og:url with the canonical production URL', () => {
    expect(metaContent(html, 'property', 'og:url')).toBe(SITE_URL)
  })

  it('has twitter:card="summary_large_image"', () => {
    expect(metaContent(html, 'name', 'twitter:card')).toBe(
      'summary_large_image',
    )
  })

  it('has twitter:title and twitter:description mirroring OG values', () => {
    expect(metaContent(html, 'name', 'twitter:title')).toBe(
      metaContent(html, 'property', 'og:title'),
    )
    expect(metaContent(html, 'name', 'twitter:description')).toBe(
      metaContent(html, 'property', 'og:description'),
    )
  })

  it('has twitter:image equal to og:image', () => {
    expect(metaContent(html, 'name', 'twitter:image')).toBe(OG_IMAGE_URL)
  })

  it('has favicon link to /favicon.svg', () => {
    expect(html).toMatch(
      /<link\s+[^>]*rel=["']icon["'][^>]*href=["']\/favicon\.svg["'][^>]*type=["']image\/svg\+xml["']|<link\s+[^>]*type=["']image\/svg\+xml["'][^>]*href=["']\/favicon\.svg["'][^>]*rel=["']icon["']|<link\s+[^>]*href=["']\/favicon\.svg["'][^>]*type=["']image\/svg\+xml["'][^>]*\/?>/i,
    )
  })

  it('runs the anti-FOUC data-theme bootstrap before the bundle', () => {
    expect(html).toMatch(/localStorage\.getItem\(['"]theme['"]\)/)
    expect(html).toMatch(/setAttribute\(\s*['"]data-theme['"]/)
    expect(html).toMatch(/prefers-color-scheme:\s*dark/)
    // legacy dark-class bootstrap must be gone
    expect(html).not.toMatch(/classList\.add\(['"]dark['"]\)/)
  })
})
