import type { ArtProps } from './ProjectArt'

/**
 * OCR Intelligence — AI · Pipeline. Scanned document → typed JSON output.
 *
 * The reference used `Math.random()` for the 14 OCR text-line widths and
 * opacities, which is non-deterministic across renders/snapshots. To keep the
 * exact same visual character (varied line lengths and faint opacities) while
 * staying stable, the random calls are replaced by a fixed precomputed table:
 * `LINES[i].w` is `Math.random()*120 + 60` (range 60–180) and `LINES[i].o` is
 * `0.25 + Math.random()*0.3` (range 0.25–0.55), sampled once and frozen here.
 */
const LINES: { w: number; o: number }[] = [
  { w: 142, o: 0.41 },
  { w: 88, o: 0.52 },
  { w: 167, o: 0.29 },
  { w: 113, o: 0.47 },
  { w: 74, o: 0.36 },
  { w: 155, o: 0.5 },
  { w: 96, o: 0.32 },
  { w: 178, o: 0.44 },
  { w: 121, o: 0.27 },
  { w: 67, o: 0.54 },
  { w: 149, o: 0.39 },
  { w: 104, o: 0.49 },
  { w: 132, o: 0.33 },
  { w: 81, o: 0.45 },
]

export default function OcrArt({ className }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="340" fill="#100c08" />
      <defs>
        <linearGradient id="g-ocr-doc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1f14" />
          <stop offset="1" stopColor="#1a130a" />
        </linearGradient>
      </defs>
      {/* scan target */}
      <g transform="translate(60 60)">
        <rect
          x="0"
          y="0"
          width="220"
          height="220"
          rx="6"
          fill="url(#g-ocr-doc)"
          stroke="#E08660"
          strokeWidth="1.5"
        />
        {LINES.map((ln, i) => (
          <rect
            key={i}
            x={20}
            y={30 + i * 13}
            width={ln.w}
            height="6"
            fill="#94886F"
            opacity={ln.o}
            rx="1"
          />
        ))}
        {/* scan beam */}
        <rect x="0" y="60" width="220" height="3" fill="#E8C547" opacity="0.9">
          <animate
            attributeName="y"
            values="10;210;10"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
        {/* corners */}
        <path d="M 0 0 L 16 0 M 0 0 L 0 16" stroke="#E8C547" strokeWidth="2" />
        <path
          d="M 220 0 L 204 0 M 220 0 L 220 16"
          stroke="#E8C547"
          strokeWidth="2"
        />
        <path
          d="M 0 220 L 16 220 M 0 220 L 0 204"
          stroke="#E8C547"
          strokeWidth="2"
        />
        <path
          d="M 220 220 L 204 220 M 220 220 L 220 204"
          stroke="#E8C547"
          strokeWidth="2"
        />
      </g>
      {/* arrow */}
      <path
        d="M 300 170 L 340 170 L 340 160 L 360 170 L 340 180 L 340 170"
        fill="#E08660"
      />
      {/* JSON output */}
      <g transform="translate(380 70)" fontFamily="monospace" fontSize="11">
        <rect
          x="-10"
          y="-10"
          width="180"
          height="210"
          rx="6"
          fill="#1a130a"
          stroke="#88C481"
          strokeWidth="1"
        />
        <text y="10" fill="#88C481">
          {'{'}
        </text>
        <text x="12" y="28" fill="#7AB7FF">
          {`"type":`}
          <tspan fill="#E8C547">{` "id_card"`}</tspan>,
        </text>
        <text x="12" y="46" fill="#7AB7FF">
          {`"name":`}
          <tspan fill="#E8C547">{` "Erick"`}</tspan>,
        </text>
        <text x="12" y="64" fill="#7AB7FF">
          {`"surname":`}
          <tspan fill="#E8C547">{` "A."`}</tspan>,
        </text>
        <text x="12" y="82" fill="#7AB7FF">
          {`"id":`}
          <tspan fill="#E8C547">{` "MG-7782"`}</tspan>,
        </text>
        <text x="12" y="100" fill="#7AB7FF">
          {`"valid":`}
          <tspan fill="#E08660">{` true`}</tspan>,
        </text>
        <text x="12" y="118" fill="#7AB7FF">
          {`"score":`}
          <tspan fill="#E08660">{` 0.97`}</tspan>
        </text>
        <text y="138" fill="#88C481">
          {'}'}
        </text>
      </g>
    </svg>
  )
}
