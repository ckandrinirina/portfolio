import type { ArtProps } from './ProjectArt'

/** SHOYO — Platform · Fintech. Stacked dossiers with a migration arrow. */
export default function ShoyoArt({ className }: ArtProps) {
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
        <rect x="48" y="58" width="70" height="64" />
        <rect x="58" y="48" width="70" height="64" />
      </g>
      <g fill="none" stroke="var(--accent, currentColor)" strokeWidth="1.5">
        <rect x="202" y="50" width="70" height="72" />
        <path d="M212 70h50M212 84h50M212 98h34" />
        <path d="M140 90h40M170 80l12 10-12 10" />
      </g>
    </svg>
  )
}
