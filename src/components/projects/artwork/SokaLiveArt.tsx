import type { ArtProps } from './ProjectArt'

/** SOKA Live — Realtime · Gaming. Live match bar graph with a pulsing dot. */
export default function SokaLiveArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="340" fill="#0e1a17" />
      <rect width="600" height="340" fill="url(#r-live)" />
      <defs>
        <radialGradient id="r-live" cx="0.3" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#E8C547" stopOpacity="0.3" />
          <stop offset="1" stopColor="#E8C547" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* graph */}
      {[40, 90, 60, 130, 100, 170, 140, 200, 180, 230, 210, 260, 240].map(
        (h, i) => (
          <rect
            key={i}
            x={40 + i * 40}
            y={260 - h}
            width="22"
            height={h}
            fill={i === 12 ? '#E08660' : '#2a5042'}
            rx="2"
          />
        ),
      )}
      <line
        x1="30"
        y1="262"
        x2="560"
        y2="262"
        stroke="#3a5a4d"
        strokeWidth="1"
      />
      <text
        x="40"
        y="40"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="22"
        fill="#88C481"
      >
        ⚽ live
      </text>
      <text x="40" y="62" fontFamily="monospace" fontSize="11" fill="#5e7d6f">
        match #482 · 73'
      </text>
      <circle cx="540" cy="42" r="5" fill="#E66B5C">
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="510"
        y="46"
        fontFamily="monospace"
        fontSize="10"
        fill="#E66B5C"
        textAnchor="end"
      >
        LIVE
      </text>
    </svg>
  )
}
