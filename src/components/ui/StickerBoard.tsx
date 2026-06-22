import { useEffect, useRef } from 'react'

/**
 * A grid of dots that ripple away from the cursor — a force-field /
 * interactive playground tile. Pure DOM + rAF for performance.
 */
export function StickerBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([])
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number>(0)

  const cols = 18
  const rows = 14
  const total = cols * rows

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const onLeave = () => {
      mouseRef.current = null
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    container.addEventListener('touchstart', () => (mouseRef.current = null))

    const tick = () => {
      const rect = container.getBoundingClientRect()
      const cellW = rect.width / cols
      const cellH = rect.height / rows
      const maxDist = 110
      const maxForce = 28
      const m = mouseRef.current

      for (let i = 0; i < total; i++) {
        const dot = dotsRef.current[i]
        if (!dot) continue
        const col = i % cols
        const row = Math.floor(i / cols)
        const cx = col * cellW + cellW / 2
        const cy = row * cellH + cellH / 2

        let dx = 0
        let dy = 0
        let strength = 0
        if (m) {
          const distX = cx - m.x
          const distY = cy - m.y
          const dist = Math.sqrt(distX * distX + distY * distY)
          if (dist < maxDist && dist > 0) {
            const t = 1 - dist / maxDist
            const force = t * maxForce
            dx = (distX / dist) * force
            dy = (distY / dist) * force
            strength = t
          }
        }

        const scale = 1 + strength * 1.5
        const opacity = 0.22 + strength * 0.78
        dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`
        dot.style.opacity = opacity.toString()
        // accent color near cursor, paper color far away
        const color = strength > 0.05 ? 'var(--accent)' : 'var(--color-paper)'
        dot.style.background = color
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [total])

  return (
    <div className="card p-4 sm:p-5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <p className="label-sm">cursor field</p>
        <p className="label-sm text-faint">
          {cols} × {rows}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[260px] sm:h-[320px] rounded-xl border border-dashed border-black/10 bg-ink/40 overflow-hidden cursor-crosshair"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,125,77,0.05), transparent 70%)',
        }}
      >
        <div
          className="absolute inset-3 grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <span
                ref={(el) => {
                  dotsRef.current[i] = el
                }}
                className="block w-[3px] h-[3px] rounded-full bg-paper"
                style={{
                  willChange: 'transform, opacity',
                  transition: 'background 0.4s ease',
                  opacity: 0.22,
                }}
              />
            </div>
          ))}
        </div>

        {/* corner labels */}
        <span className="absolute bottom-2 left-3 text-[9px] font-mono uppercase tracking-[0.22em] text-faint">
          move · cursor
        </span>
        <span className="absolute bottom-2 right-3 text-[9px] font-mono uppercase tracking-[0.22em] text-faint">
          {total} pts
        </span>
        <span className="absolute top-2 right-3 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-faint">
          <span className="w-1 h-1 rounded-full bg-accent" />
          live
        </span>
      </div>

      <p className="mt-3 label-sm text-dim display-italic">
        — just move your cursor over it.
      </p>
    </div>
  )
}
