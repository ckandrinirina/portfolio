import type { ArtProps } from './ProjectArt'

/** LUDOKA — Realtime · Gaming. Ludo board cross with pawn dots. */
export default function LudokaArt({ className }: ArtProps) {
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
        strokeWidth="1"
        opacity="0.5"
      >
        <rect x="130" y="20" width="60" height="140" />
        <rect x="90" y="60" width="140" height="60" />
      </g>
      <g fill="var(--accent, currentColor)">
        <circle cx="110" cy="40" r="7" />
        <circle cx="210" cy="40" r="7" />
        <circle cx="110" cy="140" r="7" />
        <circle cx="210" cy="140" r="7" />
        <circle cx="160" cy="90" r="9" />
      </g>
    </svg>
  )
}
