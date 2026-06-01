import type { ArtProps } from './ProjectArt'

/** Happy Capital — Fintech · Crowdfunding. Lit city skyline + growth curve. */
export default function HappyArt({ className }: ArtProps) {
  const buildings = [
    { x: 40, h: 140, w: 50 },
    { x: 96, h: 200, w: 60 },
    { x: 162, h: 160, w: 48 },
    { x: 216, h: 220, w: 70 },
    { x: 292, h: 120, w: 55 },
    { x: 352, h: 180, w: 50 },
    { x: 408, h: 240, w: 64 },
    { x: 478, h: 150, w: 48 },
    { x: 532, h: 200, w: 40 },
  ]
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="340" fill="#0e1620" />
      <defs>
        <linearGradient id="g-happy" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0e1620" />
          <stop offset="1" stopColor="#1a2a3a" />
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill="url(#g-happy)" />
      {/* city skyline */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={300 - b.h}
            width={b.w}
            height={b.h}
            fill="#1a2a3a"
            stroke="#7AB7FF"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          {Array.from({ length: Math.floor(b.h / 22) }).map((_, j) =>
            Array.from({ length: Math.floor(b.w / 16) }).map((_, k) => (
              <rect
                key={`${j}-${k}`}
                x={b.x + 4 + k * 16}
                y={300 - b.h + 8 + j * 22}
                width="8"
                height="10"
                fill={(i + j + k) % 3 === 0 ? '#E8C547' : '#7AB7FF'}
                opacity={(i + j + k) % 5 === 0 ? 0.9 : 0.25}
              />
            )),
          )}
        </g>
      ))}
      {/* growth arrow */}
      <path
        d="M 60 280 L 130 240 L 200 250 L 280 200 L 360 180 L 440 130 L 540 90"
        fill="none"
        stroke="#88C481"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="540" cy="90" r="6" fill="#88C481" />
      <text
        x="48"
        y="324"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="14"
        fill="#94886F"
      >
        € crowd-funded real estate
      </text>
    </svg>
  )
}
