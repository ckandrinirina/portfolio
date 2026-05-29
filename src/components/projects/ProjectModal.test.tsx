/**
 * ProjectModal unit tests (story 03-01).
 *
 * Covers: closed state renders nothing; open renders artwork + role/impact/stack;
 * action buttons render only when their links exist; Escape / backdrop / close
 * button all invoke onClose; body scroll locks while open and restores on close.
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import type { Project } from '../../content/types'
import ProjectModal from './ProjectModal'

const baseProject: Project = {
  id: 'soka',
  num: '01',
  name: 'SOKA Club',
  year: '2025',
  role: 'Lead Fullstack',
  client: 'YAS Madagascar',
  category: 'Platform · Web3',
  link: 'https://example.com',
  repo: 'https://github.com/example',
  desc: 'A great platform.',
  tags: ['Next.js', 'NestJS'],
  detail: {
    role: 'Lead fullstack engineer.',
    impact: 'Unified ticketing and commerce.',
    stack: 'Next.js · NestJS · PostgreSQL',
  },
}

function renderModal(project: Project | null, onClose = vi.fn()) {
  return render(
    <LanguageProvider>
      <ProjectModal project={project} onClose={onClose} />
    </LanguageProvider>,
  )
}

afterEach(() => {
  document.body.style.overflow = ''
})

describe('ProjectModal — open / closed', () => {
  it('renders nothing when project is null', () => {
    renderModal(null)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders a dialog with the project name when open', () => {
    renderModal(baseProject)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-label', 'SOKA Club')
  })

  it('renders the project artwork (inline SVG)', () => {
    const { container } = renderModal(baseProject)
    expect(container.querySelector('.modal-art svg')).not.toBeNull()
  })
})

describe('ProjectModal — detail columns', () => {
  it('renders the role, impact, and stack values', () => {
    renderModal(baseProject)
    expect(screen.getByText('Lead fullstack engineer.')).toBeInTheDocument()
    expect(
      screen.getByText('Unified ticketing and commerce.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Next.js · NestJS · PostgreSQL'),
    ).toBeInTheDocument()
  })
})

describe('ProjectModal — action buttons', () => {
  it('renders a visit-live link when project.link exists', () => {
    const { container } = renderModal(baseProject)
    const link = container.querySelector(
      '.modal-actions a[href="https://example.com"]',
    )
    expect(link).not.toBeNull()
  })

  it('renders a repo/read-case link when project.repo exists', () => {
    const { container } = renderModal(baseProject)
    const repo = container.querySelector(
      '.modal-actions a[href="https://github.com/example"]',
    )
    expect(repo).not.toBeNull()
  })

  it('omits both action links when link and repo are null', () => {
    const { container } = renderModal({
      ...baseProject,
      link: null,
      repo: null,
    })
    expect(container.querySelectorAll('.modal-actions a')).toHaveLength(0)
  })
})

describe('ProjectModal — closing', () => {
  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn()
    renderModal(baseProject, onClose)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn()
    renderModal(baseProject, onClose)
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when the dialog body is clicked', () => {
    const onClose = vi.fn()
    renderModal(baseProject, onClose)
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    renderModal(baseProject, onClose)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe('ProjectModal — focus management (04-02)', () => {
  it('moves focus to the close button on open', () => {
    renderModal(baseProject)
    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus()
  })

  it('traps Tab focus inside the modal (wraps forward to the first element)', async () => {
    const user = userEvent.setup()
    renderModal(baseProject) // close + 2 action links = 3 focusables
    const close = screen.getByRole('button', { name: /close/i })
    expect(close).toHaveFocus()
    await user.tab() // → visit live
    await user.tab() // → read case
    await user.tab() // → wraps back to close
    expect(close).toHaveFocus()
  })

  it('wraps backward with Shift+Tab from the first element to the last', async () => {
    const user = userEvent.setup()
    renderModal(baseProject)
    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus()
    await user.tab({ shift: true }) // wraps to last focusable
    expect(screen.getByRole('link', { name: /read case/i })).toHaveFocus()
  })
})

describe('ProjectModal — body scroll lock', () => {
  it('locks body scroll while open and restores it on unmount', () => {
    const { unmount } = renderModal(baseProject)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
