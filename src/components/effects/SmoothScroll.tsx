import Lenis from 'lenis'
import { useEffect } from 'react'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * Smooth scroll engine + full-page section snapping.
 *
 * Behaviour: one wheel notch / one swipe / one arrow-key press advances exactly
 * ONE snap point and glides there smoothly. The user never has to scroll
 * continuously — a single gesture moves to the next section and stops.
 *
 * Sections taller than the viewport get an extra "bottom-aligned" snap point so
 * their overflowing content is still reachable before moving on.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

    const lenis = new Lenis({
      duration: prefersReduced ? 0.1 : 1.15,
      easing: EASE,
      // We drive the wheel ourselves so each gesture snaps one section.
      smoothWheel: false,
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

    // ---------------- Section snapping ----------------
    const SNAP_DURATION = prefersReduced ? 0.2 : 1.0
    let isSnapping = false
    let lastSnap = 0

    // Let scrollable overlays (e.g. the project modal, chat panel) scroll natively.
    const inScrollable = (t: EventTarget | null) =>
      !!(t as HTMLElement | null)?.closest?.('.constellation-modal, .chat-panel')

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    // Build the ordered list of scroll positions we allow the page to rest at.
    const snapPoints = (): number[] => {
      const vh = window.innerHeight
      const max = maxScroll()
      const secs = Array.from(
        document.querySelectorAll('section.section'),
      ) as HTMLElement[]

      const raw: number[] = [0]
      secs.forEach((s) => {
        const top = Math.round(s.getBoundingClientRect().top + window.scrollY)
        raw.push(top)
        // Tall section — add a stop that shows its bottom before moving on.
        if (s.offsetHeight > vh + 8) raw.push(Math.round(top + s.offsetHeight - vh))
      })
      raw.push(max) // ensure the very bottom (footer) is reachable

      const cleaned = raw
        .map((p) => Math.max(0, Math.min(max, p)))
        .sort((a, b) => a - b)

      const out: number[] = []
      cleaned.forEach((p) => {
        if (!out.length || p - out[out.length - 1] > 8) out.push(p)
      })
      return out
    }

    const nearestIndex = (pts: number[], y: number) => {
      let idx = 0
      let best = Infinity
      pts.forEach((p, i) => {
        const d = Math.abs(p - y)
        if (d < best) {
          best = d
          idx = i
        }
      })
      return idx
    }

    const go = (dir: number) => {
      const now = performance.now()
      // Ignore rapid repeat events during / just after an animation.
      if (isSnapping || now - lastSnap < 120) return

      const pts = snapPoints()
      const y = window.scrollY
      const idx = nearestIndex(pts, y)
      const targetIdx = Math.max(0, Math.min(pts.length - 1, idx + dir))
      const target = pts[targetIdx]
      if (Math.abs(target - y) < 4) return

      isSnapping = true
      lastSnap = now
      lenis.scrollTo(target, {
        duration: SNAP_DURATION,
        easing: EASE,
        lock: true,
        onComplete: () => {
          isSnapping = false
          lastSnap = performance.now()
        },
      })
    }

    // ---- Wheel ----
    const onWheel = (e: WheelEvent) => {
      if (prefersReduced || inScrollable(e.target)) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // ignore horizontal
      e.preventDefault()
      go(e.deltaY > 0 ? 1 : -1)
    }

    // ---- Touch (swipe) ----
    let touchStartY = 0
    let touchTracking = false
    const onTouchStart = (e: TouchEvent) => {
      if (inScrollable(e.target)) {
        touchTracking = false
        return
      }
      touchStartY = e.touches[0]?.clientY ?? 0
      touchTracking = true
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!touchTracking || prefersReduced) return
      e.preventDefault() // suppress native scroll; we snap on release
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchTracking || prefersReduced) return
      touchTracking = false
      const endY = e.changedTouches[0]?.clientY ?? touchStartY
      const dy = touchStartY - endY
      if (Math.abs(dy) < 40) return // ignore tiny taps
      go(dy > 0 ? 1 : -1)
    }

    // ---- Keyboard ----
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        lenis.scrollTo(0, { duration: SNAP_DURATION, easing: EASE })
      } else if (e.key === 'End') {
        e.preventDefault()
        lenis.scrollTo(maxScroll(), { duration: SNAP_DURATION, easing: EASE })
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)

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
      lenis.scrollTo(el, { offset: -20, duration: SNAP_DURATION, easing: EASE })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return null
}
