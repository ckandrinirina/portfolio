/**
 * Reveal — letter-by-letter animated text entrance.
 *
 * Approach: the component checks `prefers-reduced-motion` at render time.
 * - Motion enabled: splits `text` into per-character `<span>` elements styled
 *   with the `char-in` animation class and staggered `animationDelay`. A
 *   visually-hidden `<span class="sr-only">` provides the full string to screen
 *   readers; the character spans are `aria-hidden="true"`. The container carries
 *   `aria-label` so assistive tech reads the whole word rather than individual
 *   letters.
 * - Reduced motion: renders the plain text directly — no per-letter spans, no
 *   animation delays.
 *
 * The container is intentionally NOT given the `.reveal` scroll-reveal class:
 * that class sets `opacity:0` + a transform until `useScrollReveal` adds `.in`,
 * which would hide and wash out the per-character `charIn` cascade. The letters
 * animate autonomously via `charIn` on mount instead.
 */

type Props = {
  text: string
  /** Extra CSS classes forwarded to the root element. */
  className?: string
  /** Base stagger delay between each character in ms (default 40). */
  charDelay?: number
  /** Render the word in serif italic (used for the hero name's first word). */
  italic?: boolean
  /** Starting stagger offset in ms (so a second word continues the cascade). */
  delay?: number
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Reveal({
  text,
  className = '',
  charDelay = 40,
  italic = false,
  delay = 0,
}: Props) {
  const reduced = prefersReducedMotion()
  const rootClass = `${italic ? 'italic' : ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim()

  if (reduced) {
    return <span className={rootClass}>{text}</span>
  }

  return (
    <span className={rootClass} aria-label={text}>
      {/* Visually hidden full text for screen readers */}
      <span className="sr-only">{text}</span>

      {/* Per-character spans, hidden from assistive tech */}
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="char-in"
          style={{ animationDelay: `${delay + i * charDelay}ms` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}
