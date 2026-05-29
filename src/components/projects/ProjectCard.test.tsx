import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import ProjectCard from './ProjectCard'
import type { Project } from '../../content/types'

const mockProject: Project = {
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
  tags: ['Next.js', 'NestJS', 'PostgreSQL'],
  detail: {
    role: 'Lead fullstack engineer.',
    impact: 'Unified ticketing.',
    stack: 'Next.js · NestJS · PostgreSQL',
  },
}

function renderCard(project: Project = mockProject, onOpen = vi.fn()) {
  return render(
    <LanguageProvider>
      <ProjectCard project={project} onOpen={onOpen} />
    </LanguageProvider>,
  )
}

describe('ProjectCard', () => {
  it('renders the project num', () => {
    renderCard()
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('renders the project name', () => {
    renderCard()
    expect(screen.getByText('SOKA Club')).toBeInTheDocument()
  })

  it('renders the project year', () => {
    renderCard()
    expect(screen.getByText('2025')).toBeInTheDocument()
  })

  it('renders the project category', () => {
    renderCard()
    expect(screen.getByText('Platform · Web3')).toBeInTheDocument()
  })

  it('renders the project desc', () => {
    renderCard()
    expect(screen.getByText('A great platform.')).toBeInTheDocument()
  })

  it('renders all tag chips', () => {
    renderCard()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('NestJS')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })

  it('applies .proj-card class', () => {
    const { container } = renderCard()
    const card = container.querySelector('.proj-card')
    expect(card).not.toBeNull()
  })

  it('carries data-cursor attribute', () => {
    const { container } = renderCard()
    const el = container.querySelector('[data-cursor]')
    expect(el).not.toBeNull()
  })

  it('calls onOpen(project) when clicked', () => {
    const onOpen = vi.fn()
    renderCard(mockProject, onOpen)
    const card = screen.getByRole('button')
    fireEvent.click(card)
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith(mockProject)
  })

  it('calls onOpen(project) when Enter key is pressed', () => {
    const onOpen = vi.fn()
    renderCard(mockProject, onOpen)
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' })
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith(mockProject)
  })

  it('calls onOpen(project) when Space key is pressed', () => {
    const onOpen = vi.fn()
    renderCard(mockProject, onOpen)
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: ' ', code: 'Space' })
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith(mockProject)
  })

  it('is keyboard-focusable (has tabIndex or is a button)', () => {
    renderCard()
    const card = screen.getByRole('button')
    expect(card).toBeTruthy()
  })
})
