import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const COUNT = 32

export function LineGutter() {
  const { scrollYProgress } = useScroll()
  const [active, setActive] = useState(1)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(COUNT, Math.max(1, Math.round(v * COUNT) + 1))
      setActive(idx)
    })
  }, [scrollYProgress])

  // Pointer line follows scroll
  const pointer = useTransform(scrollYProgress, [0, 1], [0, COUNT - 1])

  return (
    <div
      className="hidden lg:flex pointer-events-none fixed left-3 top-0 h-screen z-30 flex-col justify-center"
      aria-hidden
    >
      <ul className="relative flex flex-col gap-[6px]">
        {Array.from({ length: COUNT }).map((_, i) => {
          const n = i + 1
          const isActive = n === active
          return (
            <li
              key={n}
              className={`font-mono text-[9px] tracking-[0.18em] tabular-nums leading-none transition-colors ${
                isActive ? 'text-paper' : 'text-faint'
              }`}
            >
              {String(n).padStart(2, '0')}
            </li>
          )
        })}
        {/* Pointer dot */}
        <motion.span
          style={{ y: useTransform(pointer, (v) => `calc(${v} * 14px)`) }}
          className="absolute -left-3 top-0 w-1.5 h-1.5 rounded-full bg-paper"
        />
      </ul>
    </div>
  )
}
