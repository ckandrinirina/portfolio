import type { ArtProps } from './ProjectArt'

/** EER Full Digital — Fintech · KYC. Video-ID frame with face brackets. */
export default function EerArt({ className }: ArtProps) {
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
      <g fill="none" stroke="var(--accent, currentColor)" strokeWidth="1.5">
        <path d="M120 50h-20v20M200 50h20v20M120 130h-20v-20M200 130h20v-20" />
        <circle cx="160" cy="78" r="20" />
        <path d="M132 124c0-18 12-28 28-28s28 10 28 28" />
      </g>
      <g
        stroke="var(--line-strong, currentColor)"
        strokeWidth="1"
        opacity="0.4"
      >
        <path d="M40 156h120M180 156h100" />
      </g>
    </svg>
  )
}
