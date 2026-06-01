import type { ArtProps } from './ProjectArt'

/** SHOYO — Fintech · Migration. Legacy docs → arrow → typed module panel. */
export default function ShoyoArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="340" fill="#1a1410" />
      <defs>
        <linearGradient id="g-shoyo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2820" stopOpacity="0.6" />
          <stop offset="1" stopColor="#1a1410" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill="url(#g-shoyo)" />
      {/* migration arrow + docs */}
      <g transform="translate(60 80)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 14})`}>
            <rect
              x="0"
              y="0"
              width="120"
              height="160"
              rx="6"
              fill="#2a201a"
              stroke="#5E5645"
              strokeWidth="1"
            />
            <rect
              x="14"
              y="20"
              width="92"
              height="4"
              fill="#94886F"
              opacity="0.5"
            />
            <rect
              x="14"
              y="32"
              width="70"
              height="4"
              fill="#94886F"
              opacity="0.4"
            />
            <rect
              x="14"
              y="44"
              width="80"
              height="4"
              fill="#94886F"
              opacity="0.4"
            />
            <rect
              x="14"
              y="60"
              width="92"
              height="4"
              fill="#94886F"
              opacity="0.3"
            />
            <rect
              x="14"
              y="72"
              width="60"
              height="4"
              fill="#94886F"
              opacity="0.3"
            />
          </g>
        ))}
      </g>
      <g transform="translate(260 158)">
        <path
          d="M 0 0 L 60 0 L 60 -16 L 90 12 L 60 40 L 60 24 L 0 24 Z"
          fill="#E08660"
        />
      </g>
      <g transform="translate(380 80)">
        <rect
          x="0"
          y="0"
          width="160"
          height="180"
          rx="10"
          fill="#221a14"
          stroke="#E08660"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="14"
          width="132"
          height="20"
          fill="#E08660"
          opacity="0.2"
          rx="3"
        />
        <text x="22" y="29" fontFamily="monospace" fontSize="11" fill="#E08660">
          app.module.ts
        </text>
        <rect
          x="14"
          y="46"
          width="100"
          height="5"
          fill="#88C481"
          opacity="0.5"
        />
        <rect
          x="14"
          y="60"
          width="120"
          height="5"
          fill="#7AB7FF"
          opacity="0.5"
        />
        <rect
          x="14"
          y="74"
          width="80"
          height="5"
          fill="#94886F"
          opacity="0.5"
        />
        <rect
          x="14"
          y="88"
          width="110"
          height="5"
          fill="#88C481"
          opacity="0.5"
        />
        <rect
          x="14"
          y="102"
          width="60"
          height="5"
          fill="#94886F"
          opacity="0.5"
        />
        <rect
          x="14"
          y="118"
          width="132"
          height="5"
          fill="#E8C547"
          opacity="0.4"
        />
        <rect
          x="14"
          y="132"
          width="90"
          height="5"
          fill="#94886F"
          opacity="0.4"
        />
        <rect
          x="14"
          y="146"
          width="120"
          height="5"
          fill="#94886F"
          opacity="0.4"
        />
      </g>
      <text
        x="48"
        y="316"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="14"
        fill="#94886F"
      >
        Symfony → Angular + Node
      </text>
    </svg>
  )
}
