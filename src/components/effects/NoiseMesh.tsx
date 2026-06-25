import { useEffect, useRef } from 'react'
import { useScroll, useReducedMotion } from 'framer-motion'

/**
 * TASK 8: Subtle constellation background — Canvas only.
 * Pure monochrome (tiny white dots on black). Extremely faint, non-interactive.
 * Letter-focused: does not compete with typography. Slow gentle twinkle.
 * Fits the sky/constellation motif of the portfolio.
 */
export function NoiseMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      draw()
    }

    // More stars for a richer space / night-sky launch feel (SpaceX inspiration)
    const STAR_COUNT = 42
    const stars: Array<{ x: number; y: number; r: number; phase: number; twinkleSpeed: number }> = []
    const seed = 1729 // fixed seed for consistent positions across renders
    let rand = seed
    const seededRandom = () => {
      rand = (rand * 16807) % 2147483647
      return (rand - 1) / 2147483646
    }

    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: seededRandom() * 0.98 + 0.01,
          y: seededRandom() * 0.96 + 0.02,
          r: 0.6 + seededRandom() * 1.15,
          phase: seededRandom() * Math.PI * 2,
          twinkleSpeed: 0.0008 + seededRandom() * 0.0012,
        })
      }
    }
    initStars()

    let raf = 0
    let t = 0

    const draw = (time: number = 0) => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const w = canvas.width
      const h = canvas.height
      const scroll = scrollYProgress.get() || 0

      // Very faint scroll-tied parallax offset for constellation (subtle, not distracting)
      const parallax = reduceMotion ? 0 : (scroll - 0.5) * 18

      ctx.fillStyle = 'rgba(255,255,255,0.08)'

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        let x = s.x * w
        let y = s.y * h + parallax * (0.6 + (i % 3) * 0.2) // layered subtle drift

        // Gentle twinkle (disabled under reduced motion)
        let alpha = 0.055
        if (!reduceMotion) {
          t = time * 0.001 || t
          const tw = Math.sin(t * s.twinkleSpeed + s.phase) * 0.5 + 0.5
          alpha = 0.028 + tw * 0.045
        }

        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(x, y, s.r * dpr * 0.65, 0, Math.PI * 2)
        ctx.fill()
      }

      // A few ultra-faint connecting "constellation lines" (2-3 quiet ones)
      ctx.strokeStyle = 'rgba(255,255,255,0.018)'
      ctx.lineWidth = 0.6 * dpr
      ctx.globalAlpha = 0.7
      if (stars.length > 8) {
        // connect a couple of "near" pairs
        const pairs = [[2, 7], [11, 19], [5, 23]]
        for (const [a, b] of pairs) {
          const sa = stars[a % stars.length]
          const sb = stars[b % stars.length]
          const x1 = sa.x * w, y1 = sa.y * h + parallax * 0.5
          const x2 = sb.x * w, y2 = sb.y * h + parallax * 0.8
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
    }

    const loop = (time: number) => {
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Initial draw + start gentle loop (or one-shot if reduced)
    if (reduceMotion) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    // React to scroll changes (throttled via rAF already)
    const unsub = scrollYProgress.on('change', () => {
      if (reduceMotion) draw(0)
    })

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      unsub()
    }
  }, [reduceMotion, scrollYProgress])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
      style={{ opacity: 1 }}
    />
  )
}
