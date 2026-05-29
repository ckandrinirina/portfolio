/**
 * Tests for story 01-01: Google Fonts links in index.html.
 *
 * Asserts that the two preconnect links and the Google Fonts stylesheet
 * for Geist, Instrument Serif, and JetBrains Mono are present.
 */
import { describe, expect, it } from 'vitest'
import html from '../../index.html?raw'

describe('index.html — Google Fonts', () => {
  it('has preconnect to fonts.googleapis.com', () => {
    expect(html).toMatch(
      /<link\s[^>]*rel=["']preconnect["'][^>]*href=["']https:\/\/fonts\.googleapis\.com["'][^>]*>/i,
    )
  })

  it('has preconnect to fonts.gstatic.com with crossorigin', () => {
    expect(html).toMatch(
      /<link\s[^>]*rel=["']preconnect["'][^>]*href=["']https:\/\/fonts\.gstatic\.com["'][^>]*crossorigin[^>]*>/i,
    )
  })

  it('has a Google Fonts stylesheet link for Geist', () => {
    expect(html).toMatch(/fonts\.googleapis\.com\/css2/)
    expect(html).toMatch(/Geist/)
  })

  it('has a Google Fonts stylesheet link for Instrument Serif', () => {
    expect(html).toMatch(
      /Instrument\+Serif|Instrument%20Serif|Instrument Serif/,
    )
  })

  it('has a Google Fonts stylesheet link for JetBrains Mono', () => {
    expect(html).toMatch(/JetBrains\+Mono|JetBrains%20Mono|JetBrains Mono/)
  })

  it('uses display=swap in the fonts URL', () => {
    expect(html).toMatch(/display=swap/)
  })
})
