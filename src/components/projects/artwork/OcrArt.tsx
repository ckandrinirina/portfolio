import type { ArtProps } from './ProjectArt'

/** OCR / GPT-4 — AI · Automation. Document with scan beam and corner brackets. */
export default function OcrArt({ className }: ArtProps) {
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
        <rect x="110" y="36" width="100" height="108" />
        <path d="M124 58h72M124 74h72M124 90h52M124 106h72M124 122h40" />
      </g>
      <g fill="none" stroke="var(--accent, currentColor)" strokeWidth="1.5">
        <path d="M96 30h-14v14M224 30h14v14M96 150h-14v-14M224 150h14v-14" />
        <line x1="92" y1="92" x2="228" y2="92" />
      </g>
    </svg>
  )
}
