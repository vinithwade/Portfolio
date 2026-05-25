import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const TOTAL_DURATION = 1400

export function Loader() {
  const initiallyOpen =
    typeof window === 'undefined' || !sessionStorage.getItem('vw_loaded')
  const [open, setOpen] = useState(initiallyOpen)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!open) return
    const start = performance.now()
    let raf = 0
    const tick = () => {
      const elapsed = performance.now() - start
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100))
      setProgress(pct)
      if (pct >= 100) {
        setTimeout(() => {
          sessionStorage.setItem('vw_loaded', '1')
          setOpen(false)
        }, 300)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()
    } else {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] as const }}
          className="fixed inset-0 z-[100] bg-ink text-paper flex flex-col items-center justify-center px-6"
          style={{ backgroundColor: 'var(--color-ink)' }}
        >
          <p className="display text-5xl sm:text-6xl text-paper">
            Vinith <span className="display-italic text-accent">Wade</span>
          </p>
          <div className="mt-8 w-[200px] h-px bg-ink-3 relative overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
              className="absolute inset-y-0 left-0 bg-accent"
            />
          </div>
          <p className="caption text-faint mt-4">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
