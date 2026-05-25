import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Children, useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
}

const COOLDOWN_MS = 850

/**
 * Snap horizontal scroll. Each wheel/touch/key input advances exactly one
 * section, which then sticks in the center until the next input.
 */
export function HorizontalScroll({ children }: Props) {
  const items = Children.toArray(children)
  const n = items.length

  const xMV = useMotionValue(0)
  const sx = useSpring(xMV, { stiffness: 110, damping: 24, mass: 0.55 })

  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const cooldownRef = useRef(false)
  const vwRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1280)

  const snapTo = (i: number, animate = true) => {
    const clamped = Math.max(0, Math.min(n - 1, i))
    indexRef.current = clamped
    setIndex(clamped)
    const target = -clamped * vwRef.current
    if (animate) {
      xMV.set(target)
    } else {
      xMV.jump(target)
    }
  }

  const advance = (dir: 1 | -1) => {
    if (cooldownRef.current) return
    const next = indexRef.current + dir
    if (next < 0 || next > n - 1) return
    cooldownRef.current = true
    snapTo(next)
    window.setTimeout(() => {
      cooldownRef.current = false
    }, COOLDOWN_MS)
  }

  useEffect(() => {
    const onResize = () => {
      vwRef.current = window.innerWidth
      // Re-snap to current index at new vw
      xMV.jump(-indexRef.current * vwRef.current)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [xMV])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 4) return
      advance(delta > 0 ? 1 : -1)
    }

    // Touch — accumulate per-gesture delta; snap on end
    let startX = 0
    let startY = 0
    let lastX = 0
    let lastY = 0
    const onTouchStart = (e: TouchEvent) => {
      startX = lastX = e.touches[0].clientX
      startY = lastY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }
    const onTouchEnd = () => {
      const dx = lastX - startX
      const dy = lastY - startY
      const delta = Math.abs(dy) > Math.abs(dx) ? -dy : -dx
      if (Math.abs(delta) < 40) return
      advance(delta > 0 ? 1 : -1)
    }

    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', 'Space'].includes(e.code)) {
        e.preventDefault()
        advance(1)
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.code)) {
        e.preventDefault()
        advance(-1)
      } else if (e.code === 'Home') {
        e.preventDefault()
        snapTo(0)
      } else if (e.code === 'End') {
        e.preventDefault()
        snapTo(n - 1)
      }
    }

    const onAnchorClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      const anchor = t?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      if (id === 'hero') {
        e.preventDefault()
        snapTo(0)
        return
      }
      const panels = document.querySelectorAll<HTMLElement>('[data-panel]')
      for (let i = 0; i < panels.length; i++) {
        if (panels[i].querySelector(`#${CSS.escape(id)}`)) {
          e.preventDefault()
          snapTo(i)
          return
        }
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onAnchorClick)

    // Body lock
    const prevOverflow = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    document.documentElement.style.height = '100vh'

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onAnchorClick)
      document.body.style.overflow = prevOverflow
      document.documentElement.style.overflow = prevHtml
      document.body.style.height = ''
      document.documentElement.style.height = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n])

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-hidden">
        <motion.div
          style={{ x: sx, width: `${n * 100}vw`, willChange: 'transform' }}
          className="flex h-screen"
        >
          {items.map((child, i) => (
            <div
              key={i}
              data-panel
              className="shrink-0 w-screen h-screen overflow-hidden"
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Section dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => snapTo(i)}
            aria-label={`Go to section ${i + 1}`}
            className="group p-1"
          >
            <span
              className={`block h-px transition-all rounded-full ${
                index === i
                  ? 'w-10 bg-accent'
                  : 'w-5 bg-white/20 group-hover:bg-white/50'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.22em] text-faint tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
      </div>
    </>
  )
}
