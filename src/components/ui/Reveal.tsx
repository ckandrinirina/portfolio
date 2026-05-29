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
 * The `.reveal` class on the container is provided so `useScrollReveal` can add
 * `.in` to trigger the element's entrance transition from the stylesheet.
 */

type Props = {
  text: string
  /** Extra CSS classes forwarded to the root element. */
  className?: string
  /** Base stagger delay between each character in ms (default 40). */
  charDelay?: number
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Reveal({
  text,
  className = '',
  charDelay = 40,
}: Props) {
  const reduced = prefersReducedMotion()

  if (reduced) {
    return <span className={`reveal ${className}`.trim()}>{text}</span>
  }

  return (
    <span className={`reveal ${className}`.trim()} aria-label={text}>
      {/* Visually hidden full text for screen readers */}
      <span className="sr-only">{text}</span>

      {/* Per-character spans, hidden from assistive tech */}
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="char-in"
          style={{ animationDelay: `${i * charDelay}ms` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}
