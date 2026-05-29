import type { ArtProps } from './ProjectArt'

/** SOKA Club — Platform · Web3. Concentric token/coin motif over a hex frame. */
export default function SokaArt({ className }: ArtProps) {
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
        stroke="var(--accent, currentColor)"
        strokeWidth="1.5"
        opacity="0.85"
      >
        <polygon points="160,38 198,60 198,104 160,126 122,104 122,60" />
        <circle cx="160" cy="82" r="30" />
        <circle cx="160" cy="82" r="18" />
        <path d="M152 82h16M160 74v16" />
      </g>
      <g
        stroke="var(--line-strong, currentColor)"
        strokeWidth="1"
        opacity="0.4"
      >
        <path d="M20 150h280M20 160h180" />
      </g>
    </svg>
  )
}
