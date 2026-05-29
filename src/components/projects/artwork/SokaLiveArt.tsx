import type { ArtProps } from './ProjectArt'

/** SOKA Live — Realtime · Gaming. Pitch lines with a live leaderboard bar set. */
export default function SokaLiveArt({ className }: ArtProps) {
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
        <rect x="40" y="30" width="240" height="80" />
        <line x1="160" y1="30" x2="160" y2="110" />
        <circle cx="160" cy="70" r="18" />
      </g>
      <g fill="var(--accent, currentColor)">
        <rect x="60" y="138" width="22" height="26" />
        <rect x="92" y="126" width="22" height="38" />
        <rect x="124" y="146" width="22" height="18" />
        <rect x="206" y="132" width="22" height="32" />
        <rect x="238" y="120" width="22" height="44" />
      </g>
    </svg>
  )
}
