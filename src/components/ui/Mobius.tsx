type Props = {
  size?: number
  className?: string
}

/**
 * Sidewave-inspired animated abstract — three orbiting rings forming a
 * Möbius/torus illusion. Pure SVG, CSS-animated, no asset deps.
 */
export function Mobius({ size = 260, className = '' }: Props) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="absolute inset-0"
      >
        {/* Outer thin ring */}
        <g className="spin-a" style={{ transformOrigin: '100px 100px' }}>
          <ellipse
            cx="100"
            cy="100"
            rx="92"
            ry="32"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.8"
          />
        </g>
        {/* Mid ring */}
        <g
          className="spin-b"
          style={{ transformOrigin: '100px 100px', transform: 'rotate(60deg)' }}
        >
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="80"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="0.8"
          />
        </g>
        {/* Inner tilted ring */}
        <g
          className="spin-c"
          style={{ transformOrigin: '100px 100px', transform: 'rotate(120deg)' }}
        >
          <ellipse
            cx="100"
            cy="100"
            rx="70"
            ry="22"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.8"
          />
        </g>
        {/* Dashed outer */}
        <g className="spin-b" style={{ transformOrigin: '100px 100px' }}>
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.5"
            strokeDasharray="2 6"
          />
        </g>
        {/* Center dot */}
        <circle cx="100" cy="100" r="2.5" fill="rgba(255,255,255,0.95)" />
      </svg>
    </div>
  )
}
