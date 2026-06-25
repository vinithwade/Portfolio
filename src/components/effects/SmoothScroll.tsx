import Lenis from 'lenis'
import { useEffect } from 'react'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: prefersReduced ? 0.1 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: prefersReduced ? 1 : 1.5,
    })
    window.__lenis = lenis

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Anchor link smooth-scroll bridge
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id.length < 2) return
      const el = document.querySelector(id) as HTMLElement | null
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -20 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return null
}
