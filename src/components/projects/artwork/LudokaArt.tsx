import type { ArtProps } from './ProjectArt'

/** LUDOKA — Game · Casual. Tilted dice over a checkered board with pawns. */
export default function LudokaArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="340" fill="#1a0f1a" />
      <defs>
        <pattern
          id="p-ludo"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <rect width="40" height="40" fill="none" />
          <rect width="20" height="20" fill="#E08660" opacity="0.08" />
          <rect
            x="20"
            y="20"
            width="20"
            height="20"
            fill="#E08660"
            opacity="0.08"
          />
        </pattern>
      </defs>
      <rect width="600" height="340" fill="url(#p-ludo)" />
      {/* dice */}
      <g transform="translate(190 100) rotate(-12)">
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="14"
          fill="#F4ECDC"
          stroke="#E08660"
          strokeWidth="2"
        />
        <circle cx="28" cy="28" r="6" fill="#1a0f1a" />
        <circle cx="72" cy="28" r="6" fill="#1a0f1a" />
        <circle cx="50" cy="50" r="6" fill="#E08660" />
        <circle cx="28" cy="72" r="6" fill="#1a0f1a" />
        <circle cx="72" cy="72" r="6" fill="#1a0f1a" />
      </g>
      <g transform="translate(330 130) rotate(15)">
        <rect
          x="0"
          y="0"
          width="84"
          height="84"
          rx="12"
          fill="#E8C547"
          stroke="#E08660"
          strokeWidth="2"
        />
        <circle cx="42" cy="42" r="6" fill="#1a0f1a" />
        <circle cx="20" cy="20" r="5" fill="#1a0f1a" />
        <circle cx="64" cy="64" r="5" fill="#1a0f1a" />
      </g>
      {/* pawns */}
      <circle cx="80" cy="280" r="14" fill="#E08660" />
      <rect x="68" y="290" width="24" height="14" fill="#E08660" />
      <circle cx="520" cy="270" r="14" fill="#88C481" />
      <rect x="508" y="280" width="24" height="14" fill="#88C481" />
    </svg>
  )
}
