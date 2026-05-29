import type { ArtProps } from './ProjectArt'

/** THESEIS — Document Management. Classified folder grid with index ticks. */
export default function TheseisArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="180" fill="var(--bg-2, transparent)" />
      <g
        fill="none"
        stroke="var(--line-strong, currentColor)"
        strokeWidth="1.2"
        opacity="0.6"
      >
        <path d="M70 60h28l8 10h44v60H70z" />
        <path d="M170 60h28l8 10h44v60h-80z" />
      </g>
      <g stroke="var(--accent, currentColor)" strokeWidth="1.5">
        <path d="M84 96h40M84 108h26" />
        <path d="M192 96h40M192 108h26" />
      </g>
    </svg>
  )
}
