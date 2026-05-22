import type { ReactNode, RefObject } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { cn } from '../../lib/utils'
import Container from './Container'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

export default function Section({ id, title, children }: SectionProps) {
  const { ref, isVisible } = useReveal()

  return (
    <section
      id={id}
      ref={ref as RefObject<HTMLElement>}
      className={cn(
        'py-16 transition-all duration-500 ease-out md:py-24',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      <Container>
        <h2 className="mb-8 text-2xl font-bold text-text-primary sm:text-3xl">
          {title}
        </h2>
        {children}
      </Container>
    </section>
  )
}
