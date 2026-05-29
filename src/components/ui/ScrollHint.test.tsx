import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScrollHint from './ScrollHint'

describe('ScrollHint', () => {
  it('renders the next route label when provided', () => {
    render(<ScrollHint nextLabel="Work" />)
    expect(screen.getByText(/Work/i)).toBeInTheDocument()
  })

  it('renders nothing when nextLabel is null (last route)', () => {
    const { container } = render(<ScrollHint nextLabel={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when nextLabel is undefined (last route)', () => {
    const { container } = render(<ScrollHint nextLabel={undefined} />)
    expect(container.firstChild).toBeNull()
  })

  it('applies the scroll-hint class for sticky positioning', () => {
    const { container } = render(<ScrollHint nextLabel="Experience" />)
    expect(container.firstChild).toHaveClass('scroll-hint')
  })

  it('applies the scroll-hint-inner class to the inner chip', () => {
    const { container } = render(<ScrollHint nextLabel="Skills" />)
    const inner = container.querySelector('.scroll-hint-inner')
    expect(inner).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<ScrollHint nextLabel="Process" onClick={handleClick} />)
    await user.click(screen.getByText(/Process/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is keyboard accessible — fires onClick on Enter key', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<ScrollHint nextLabel="Contact" onClick={handleClick} />)
    const inner = screen.getByRole('button')
    inner.focus()
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('includes a scroll indicator label in its text', () => {
    render(<ScrollHint nextLabel="Work" />)
    // Should contain the nextLabel text somewhere
    expect(screen.getByText(/Work/)).toBeInTheDocument()
  })
})
