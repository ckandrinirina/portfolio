import type { ArtProps } from './ProjectArt'

/** SOKA Club — Platform · Web3. Coin grid with a dashed $ medallion. */
export default function SokaArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="g-soka" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a2920" />
          <stop offset="1" stopColor="#0d0a08" />
        </linearGradient>
        <radialGradient id="r-soka" cx="0.7" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#E08660" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E08660" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="340" fill="url(#g-soka)" />
      <rect width="600" height="340" fill="url(#r-soka)" />
      {/* coin grid */}
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={50 + c * 60}
            cy={60 + r * 45}
            r={(c + r) % 4 === 0 ? 12 : 6}
            fill="none"
            stroke="#E08660"
            strokeOpacity={0.4}
            strokeWidth="1"
          />
        )),
      )}
      <circle
        cx="450"
        cy="170"
        r="60"
        fill="none"
        stroke="#E8C547"
        strokeWidth="2"
        strokeDasharray="4 6"
      />
      <text
        x="450"
        y="178"
        textAnchor="middle"
        fill="#E8C547"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="38"
      >
        $
      </text>
      <text
        x="48"
        y="306"
        fontFamily="monospace"
        fontSize="11"
        fill="#94886F"
        letterSpacing="0.1em"
      >
        SOKA · POINTS · USDC · GAMES
      </text>
    </svg>
  )
}
