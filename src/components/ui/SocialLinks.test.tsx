import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SocialLinks from './SocialLinks'
import { SOCIAL_LINKS } from '../../lib/constants'

vi.mock('../../lib/constants', () => ({
  SOCIAL_LINKS: { github: '', linkedin: '' },
}))

const links = SOCIAL_LINKS as { github: string; linkedin: string }

afterEach(() => {
  links.github = ''
  links.linkedin = ''
})

describe('SocialLinks', () => {
  it('renders no anchors when both URLs are empty', () => {
    render(<SocialLinks />)
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('renders the GitHub anchor when github URL is set', () => {
    links.github = 'https://github.com/erick'
    render(<SocialLinks />)
    const anchor = screen.getByRole('link', { name: /github/i })
    expect(anchor).toHaveAttribute('href', 'https://github.com/erick')
    expect(anchor).toHaveAttribute('target', '_blank')
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the LinkedIn anchor when linkedin URL is set', () => {
    links.linkedin = 'https://linkedin.com/in/erick'
    render(<SocialLinks />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/erick',
    )
  })

  it('renders both anchors when both URLs are set', () => {
    links.github = 'https://github.com/erick'
    links.linkedin = 'https://linkedin.com/in/erick'
    render(<SocialLinks />)
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('hides the icon glyphs from assistive tech', () => {
    links.github = 'https://github.com/erick'
    const { container } = render(<SocialLinks />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('scales the icon via the size prop', () => {
    links.github = 'https://github.com/erick'
    const { container } = render(<SocialLinks size="lg" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })
})
