import Lenis from 'lenis'
import { useEffect } from 'react'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * Continuous wheel/trackpad smoothing in the desktop layout only.
 * Phone, tablet, and reduced-motion browsing keep native scrolling.
 * Anchor links retain their fixed-header offset on every screen size.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const shouldSmooth = () => desktop.matches && !prefersReduced

    const EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

    const lenis = new Lenis({
      duration: prefersReduced ? 0.1 : shouldSmooth() ? 0.7 : 1.15,
      easing: EASE,
      smoothWheel: shouldSmooth(),
      syncTouch: false,
      // Sidebar, menu, and dialog scrolling stays inside its own container.
      prevent: (node) => shouldSmooth() && (
        document.documentElement.classList.contains('menu-open') ||
        node.matches('.constellation-modal, .chat-panel, #mobile-menu, .desktop-sidebar')
      ),
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })
    window.__lenis = lenis

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const ANCHOR_DURATION = prefersReduced ? 0.2 : 1.0

    // A resized desktop preview must return to native scrolling below lg.
    const onLayoutChange = () => {
      lenis.scrollTo(lenis.actualScroll, { immediate: true })
      lenis.options.smoothWheel = shouldSmooth()
      lenis.options.duration = prefersReduced ? 0.1 : shouldSmooth() ? 0.7 : 1.15
      lenis.resize()
    }
    desktop.addEventListener('change', onLayoutChange)

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
      const header = document.querySelector('.mobile-header') as HTMLElement | null
      const headerHeight = header && window.getComputedStyle(header).display !== 'none' ? header.offsetHeight : 0
      lenis.scrollTo(el, { offset: -headerHeight, duration: ANCHOR_DURATION, easing: EASE })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      desktop.removeEventListener('change', onLayoutChange)
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return null
}
