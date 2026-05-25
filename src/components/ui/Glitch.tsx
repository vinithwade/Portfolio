import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz0123456789'

type Props = {
  text: string
  duration?: number // ms total
  trigger?: 'visible' | 'mount'
  className?: string
  as?: 'span' | 'div'
}

/**
 * Scrambles characters then settles on `text`. Fires once when scrolled into view
 * (default) or on mount.
 */
export function Glitch({
  text,
  duration = 900,
  trigger = 'visible',
  className,
  as: Tag = 'span',
}: Props) {
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null)
  const [display, setDisplay] = useState(text)
  const startedRef = useRef(false)

  useEffect(() => {
    const run = () => {
      if (startedRef.current) return
      startedRef.current = true
      const start = performance.now()
      const len = text.length
      const reveal = new Array(len).fill(false)
      let raf = 0
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        for (let i = 0; i < len; i++) {
          const threshold = i / len // earlier chars settle first
          if (!reveal[i] && t > threshold) reveal[i] = true
        }
        const out = new Array(len)
        for (let i = 0; i < len; i++) {
          if (reveal[i] || text[i] === ' ' || text[i] === '\n') {
            out[i] = text[i]
          } else {
            out[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
        }
        setDisplay(out.join(''))
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
        }
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }

    if (trigger === 'mount') {
      return run()
    }

    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run()
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [text, duration, trigger])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {display}
    </Tag>
  )
}
