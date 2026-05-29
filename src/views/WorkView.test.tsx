/**
 * WorkView unit tests (story 03-01).
 *
 * Covers: section heading (<h2> + eyebrow, no <h1>), the 2-col .work-grid of all
 * projects, and that activating a card invokes the supplied onOpen callback with
 * the right project.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '../i18n/LanguageProvider'
import { projects } from '../content/projects'
import WorkView from './WorkView'

function renderWork(onOpen = vi.fn()) {
  return render(
    <LanguageProvider>
      <WorkView onOpen={onOpen} />
    </LanguageProvider>,
  )
}

describe('WorkView — section heading', () => {
  it('renders an <h2> with class section-title', () => {
    const { container } = renderWork()
    expect(container.querySelector('h2.section-title')).not.toBeNull()
  })

  it('renders an eyebrow', () => {
    const { container } = renderWork()
    expect(container.querySelector('.eyebrow')).not.toBeNull()
  })

  it('does not render an <h1>', () => {
    renderWork()
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
  })
})

describe('WorkView — grid', () => {
  it('renders a .work-grid container', () => {
    const { container } = renderWork()
    expect(container.querySelector('.work-grid')).not.toBeNull()
  })

  it('renders one .proj-card per project', () => {
    const { container } = renderWork()
    expect(container.querySelectorAll('.proj-card')).toHaveLength(
      projects.length,
    )
  })

  it('renders all eight projects', () => {
    const { container } = renderWork()
    expect(container.querySelectorAll('.proj-card')).toHaveLength(8)
  })
})

describe('WorkView — interaction', () => {
  it('calls onOpen with the project when a card is activated', () => {
    const onOpen = vi.fn()
    renderWork(onOpen)
    const cards = screen.getAllByRole('button')
    fireEvent.click(cards[0])
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith(projects[0])
  })
})
