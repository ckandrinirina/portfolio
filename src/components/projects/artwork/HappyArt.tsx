import type { ArtProps } from './ProjectArt'

/** Happy Capital — Fintech · Realtime. Rising investment curve over bars. */
export default function HappyArt({ className }: ArtProps) {
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
      <g fill="var(--line-strong, currentColor)" opacity="0.4">
        <rect x="60" y="110" width="26" height="40" />
        <rect x="100" y="90" width="26" height="60" />
        <rect x="140" y="100" width="26" height="50" />
        <rect x="180" y="70" width="26" height="80" />
        <rect x="220" y="50" width="26" height="100" />
      </g>
      <g fill="none" stroke="var(--accent, currentColor)" strokeWidth="2">
        <path d="M60 120l40-18 40 8 40-30 40-22" />
        <circle cx="240" cy="58" r="4" fill="var(--accent, currentColor)" />
      </g>
    </svg>
  )
}
