/**
 * ProcessView.test.tsx
 *
 * Tests for story 03-04 AC:
 * - Renders <h2> .section-title and eyebrow
 * - Renders 5 numbered .process-items with .process-num and content
 * - Revealable items carry .process-item class
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../i18n/LanguageProvider'
import ProcessView from './ProcessView'

function renderProcess() {
  return render(
    <LanguageProvider>
      <ProcessView />
    </LanguageProvider>,
  )
}

describe('ProcessView — section heading', () => {
  it('renders an <h2> element with class section-title', () => {
    const { container } = renderProcess()
    expect(container.querySelector('h2.section-title')).not.toBeNull()
  })

  it('renders an eyebrow element', () => {
    const { container } = renderProcess()
    expect(container.querySelector('.eyebrow')).not.toBeNull()
  })

  it('does not render an <h1>', () => {
    renderProcess()
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
  })
})

describe('ProcessView — process list structure', () => {
  it('renders a .process-list container', () => {
    const { container } = renderProcess()
    expect(container.querySelector('.process-list')).not.toBeNull()
  })

  it('renders exactly 5 .process-item elements', () => {
    const { container } = renderProcess()
    const items = container.querySelectorAll('.process-item')
    expect(items).toHaveLength(5)
  })
})

describe('ProcessView — .process-item content', () => {
  it('each .process-item has a .process-num', () => {
    const { container } = renderProcess()
    const items = container.querySelectorAll('.process-item')
    items.forEach((item) => {
      expect(item.querySelector('.process-num')).not.toBeNull()
    })
  })

  it('each .process-item has a .process-content area', () => {
    const { container } = renderProcess()
    const items = container.querySelectorAll('.process-item')
    items.forEach((item) => {
      expect(item.querySelector('.process-content')).not.toBeNull()
    })
  })

  it('each .process-item has a .process-title', () => {
    const { container } = renderProcess()
    const items = container.querySelectorAll('.process-item')
    items.forEach((item) => {
      expect(item.querySelector('.process-title')).not.toBeNull()
    })
  })

  it('each .process-item has a .process-desc', () => {
    const { container } = renderProcess()
    const items = container.querySelectorAll('.process-item')
    items.forEach((item) => {
      expect(item.querySelector('.process-desc')).not.toBeNull()
    })
  })

  it('renders process numbers 01 through 05', () => {
    const { container } = renderProcess()
    const nums = container.querySelectorAll('.process-num')
    const numTexts = Array.from(nums).map((el) => el.textContent?.trim())
    expect(numTexts).toContain('01')
    expect(numTexts).toContain('05')
  })

  it('renders process titles from content data', () => {
    localStorage.setItem('locale', 'fr')
    renderProcess()
    // The FR locale has specific process titles (from fr.ts)
    expect(screen.getByText("Comprendre d'abord")).toBeInTheDocument()
  })
})

describe('ProcessView — scroll-reveal classes', () => {
  it('.process-item elements carry the class targeted by useScrollReveal', () => {
    const { container } = renderProcess()
    const items = container.querySelectorAll('.process-item')
    expect(items.length).toBeGreaterThan(0)
  })
})
