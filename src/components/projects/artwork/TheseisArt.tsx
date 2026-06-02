import type { ArtProps } from './ProjectArt'

/** THESEIS — Documents. File cabinet rows with a highlighted search match. */
export default function TheseisArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="340" fill="#15110b" />
      {/* file cabinet */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(120 ${50 + i * 65})`}>
          <rect
            x="0"
            y="0"
            width="360"
            height="50"
            rx="4"
            fill="#221a12"
            stroke={i === 1 ? '#E08660' : '#5E5645'}
            strokeWidth={i === 1 ? 2 : 1}
          />
          <rect
            x="14"
            y="20"
            width="40"
            height="10"
            fill="#94886F"
            opacity="0.5"
            rx="2"
          />
          <rect
            x="72"
            y="20"
            width="160"
            height="10"
            fill="#94886F"
            opacity="0.3"
            rx="2"
          />
          <text
            x="320"
            y="30"
            textAnchor="end"
            fontFamily="monospace"
            fontSize="11"
            fill="#94886F"
          >
            {2024 - i * 2}
          </text>
          <circle
            cx="338"
            cy="25"
            r="5"
            fill={i === 1 ? '#E08660' : '#3a3025'}
          />
          {i === 1 && (
            <g>
              <rect
                x="-4"
                y="-4"
                width="368"
                height="58"
                rx="6"
                fill="none"
                stroke="#E08660"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.6"
              />
              <text
                x="-20"
                y="30"
                textAnchor="end"
                fontFamily="monospace"
                fontSize="12"
                fill="#E8C547"
              >
                →
              </text>
            </g>
          )}
        </g>
      ))}
      <text
        x="120"
        y="330"
        fontFamily="monospace"
        fontSize="11"
        fill="#5E5645"
        letterSpacing="0.1em"
      >
        SEARCH("contrat 2022") → 1 match
      </text>
    </svg>
  )
}
