import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

type CursorState = 'default' | 'link' | 'view' | 'send' | 'drag'

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 50, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 600, damping: 50, mass: 0.5 })

  const ringX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 })

  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState<string>('')
  const [supportsHover, setSupportsHover] = useState(true)

  const scale = useTransform(() => {
    if (state === 'view' || state === 'send') return 1
    if (state === 'link') return 1
    return 0.4
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    setSupportsHover(window.matchMedia('(hover: hover)').matches)

    let lastTarget: Element | null = null

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const t = document.elementFromPoint(e.clientX, e.clientY)
      if (t === lastTarget) return
      lastTarget = t

      if (!t) {
        setState('default')
        setLabel('')
        return
      }
      const labelEl = t.closest('[data-cursor]') as HTMLElement | null
      if (labelEl) {
        const role = labelEl.dataset.cursor as CursorState
        setState(role)
        setLabel(labelEl.dataset.cursorLabel ?? '')
        return
      }
      if (t.closest('a, button, [role="button"], [data-magnet]')) {
        setState('link')
        setLabel('')
        return
      }
      setState('default')
      setLabel('')
    }

    const onDown = () => setState((s) => (s === 'default' ? 'drag' : s))
    const onUp = () => {
      const el = lastTarget?.closest('[data-cursor]') as HTMLElement | null
      if (el) {
        const role = el.dataset.cursor as CursorState
        setState(role)
      } else if (lastTarget?.closest('a, button, [data-magnet]')) {
        setState('link')
      } else {
        setState('default')
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [x, y])

  if (!supportsHover) return null

  const ringSize = state === 'view' || state === 'send' ? 88 : state === 'link' ? 44 : 36

  return (
    <>
      {/* OUTER RING */}
      <motion.div
        className="cursor-dot"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
        }}
      >
        <motion.div
          animate={{
            scale: state === 'default' ? 1 : 1.05,
            opacity: 1,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="relative w-full h-full rounded-full"
          style={{
            background:
              state === 'view' || state === 'send'
                ? 'rgba(245, 240, 233, 0.96)'
                : 'transparent',
            border:
              state === 'view' || state === 'send'
                ? 'none'
                : '1px solid rgba(245, 240, 233, 0.55)',
            color: '#08080a',
          }}
        >
          {(state === 'view' || state === 'send') && (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em]">
              {label || (state === 'view' ? 'View' : 'Send')}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* INNER DOT */}
      <motion.div
        className="cursor-dot"
        style={{
          x: sx,
          y: sy,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
        }}
      >
        <motion.div
          style={{ scale }}
          className="w-full h-full rounded-full bg-[color:var(--color-paper)]"
        />
      </motion.div>
    </>
  )
}
