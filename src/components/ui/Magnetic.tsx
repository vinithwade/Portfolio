import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { useRef } from 'react'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'div' | 'span' | 'button' | 'a'
  href?: string
  onClick?: () => void
}

export function Magnetic({
  children,
  className = '',
  strength = 0.3,
  as = 'div',
  href,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.6 })

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const common = {
    ref: (node: HTMLElement | null) => {
      ref.current = node
    },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: sx, y: sy },
    className,
    onClick,
    'data-magnet': '',
  }

  if (as === 'a' || href) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <motion.a href={href} {...(common as any)}>
        {children}
      </motion.a>
    )
  }
  if (as === 'button') {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <motion.button type="button" {...(common as any)}>
        {children}
      </motion.button>
    )
  }
  if (as === 'span') {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <motion.span {...(common as any)}>{children}</motion.span>
    )
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <motion.div {...(common as any)}>{children}</motion.div>
  )
}
