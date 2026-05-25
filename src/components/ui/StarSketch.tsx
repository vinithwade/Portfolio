import { motion } from 'framer-motion'
import { RotateCcw, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'

type DrawnStar = { id: number; x: number; y: number; size: number }

export function StarSketch() {
  const ref = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<DrawnStar[]>([])
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null)

  const drop = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setStars((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), x, y, size: 2 + Math.random() * 2 },
    ])
  }

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setHover({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="caption flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-accent" />
          your constellation
        </span>
        {stars.length > 0 && (
          <button
            type="button"
            onClick={() => setStars([])}
            className="caption text-faint hover:text-accent transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" strokeWidth={1.5} /> reset
          </button>
        )}
      </div>

      {/* Canvas */}
      <div
        ref={ref}
        onClick={drop}
        onMouseMove={move}
        onMouseLeave={() => setHover(null)}
        className="relative w-full h-[300px] sm:h-[360px] lg:h-[420px] rounded-2xl border border-dashed border-white/15 overflow-hidden cursor-crosshair"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(232,122,69,0.06), transparent 70%)',
        }}
      >
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {stars.slice(1).map((s, i) => {
            const prev = stars[i]
            return (
              <motion.line
                key={`l${s.id}`}
                x1={prev.x}
                y1={prev.y}
                x2={s.x}
                y2={s.y}
                stroke="rgba(232,122,69,0.45)"
                strokeWidth={0.8}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            )
          })}
          {/* Closing the constellation when 4+ stars */}
          {stars.length > 3 && (
            <motion.line
              x1={stars[stars.length - 1].x}
              y1={stars[stars.length - 1].y}
              x2={stars[0].x}
              y2={stars[0].y}
              stroke="rgba(232,122,69,0.12)"
              strokeWidth={0.6}
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}
          {/* Hover line preview from last star to cursor */}
          {hover && stars.length > 0 && (
            <line
              x1={stars[stars.length - 1].x}
              y1={stars[stars.length - 1].y}
              x2={hover.x}
              y2={hover.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.6}
              strokeDasharray="2 3"
            />
          )}
        </svg>

        {/* Stars */}
        {stars.map((s, i) => (
          <motion.span
            key={s.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: s.x, top: s.y }}
          >
            <span
              className="block rounded-full bg-white"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                boxShadow:
                  '0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(232,122,69,0.55)',
              }}
            />
            <span className="absolute -top-3 left-3 text-[9px] font-mono text-faint tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
          </motion.span>
        ))}

        {/* Hover star preview */}
        {hover && (
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: hover.x, top: hover.y }}
          >
            <span
              className="block w-2 h-2 rounded-full border border-white/40"
              style={{ background: 'rgba(255,255,255,0.10)' }}
            />
          </span>
        )}

        {/* Empty hint */}
        {stars.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6">
            <p className="display text-paper text-xl sm:text-2xl">
              draw your own{' '}
              <span className="display-italic text-accent">constellation</span>.
            </p>
            <p className="caption text-faint mt-3">click anywhere to place a star</p>
          </div>
        )}

        {/* Corner counter */}
        <div className="absolute bottom-3 left-3 caption text-faint font-mono tabular-nums">
          {String(stars.length).padStart(2, '0')} stars
        </div>
        <div className="absolute bottom-3 right-3 caption text-faint">
          {stars.length > 1 ? 'a new sky' : 'tap to begin'}
        </div>
      </div>
    </div>
  )
}
