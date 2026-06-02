import type { ArtProps } from './ProjectArt'

/** EER Full Digital — Banking · KYC. ID card with animated scan line + badge. */
export default function EerArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="340" fill="#0a1018" />
      <defs>
        <linearGradient id="g-eer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2a3a" />
          <stop offset="1" stopColor="#0a1018" />
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill="url(#g-eer)" />
      {/* ID card */}
      <g transform="translate(140 80)">
        <rect
          x="0"
          y="0"
          width="320"
          height="190"
          rx="14"
          fill="#1a2a3a"
          stroke="#7AB7FF"
          strokeWidth="1.5"
        />
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="none"
          stroke="#7AB7FF"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="44" r="9" fill="#7AB7FF" opacity="0.6" />
        <path
          d="M 30 70 Q 50 56 70 70"
          fill="none"
          stroke="#7AB7FF"
          strokeWidth="1.5"
        />
        <rect
          x="100"
          y="38"
          width="180"
          height="6"
          fill="#7AB7FF"
          opacity="0.4"
        />
        <rect
          x="100"
          y="52"
          width="140"
          height="4"
          fill="#7AB7FF"
          opacity="0.25"
        />
        <rect
          x="100"
          y="62"
          width="160"
          height="4"
          fill="#7AB7FF"
          opacity="0.25"
        />
        <rect
          x="22"
          y="100"
          width="276"
          height="4"
          fill="#7AB7FF"
          opacity="0.2"
        />
        <rect
          x="22"
          y="112"
          width="200"
          height="4"
          fill="#7AB7FF"
          opacity="0.2"
        />
        <rect
          x="22"
          y="124"
          width="240"
          height="4"
          fill="#7AB7FF"
          opacity="0.2"
        />
        {/* scan line */}
        <rect x="0" y="60" width="320" height="2" fill="#E8C547">
          <animate
            attributeName="y"
            values="20;170;20"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
        {/* checkmark badge */}
        <circle cx="296" cy="170" r="14" fill="#88C481" />
        <path
          d="M 290 170 l 4 4 l 8 -8"
          fill="none"
          stroke="#0a1018"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      <text
        x="48"
        y="306"
        fontFamily="monospace"
        fontSize="11"
        fill="#5e7d99"
        letterSpacing="0.1em"
      >
        KYC · BMOI · VIDEO IDENT.
      </text>
    </svg>
  )
}
