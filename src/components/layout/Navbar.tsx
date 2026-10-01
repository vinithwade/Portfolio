import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { site, navLinks as contentNavLinks } from '../../data/content'
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from '../ui/BrandIcons'
import { springs, transition } from '../../lib/motion'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuTargetRef = useRef<string | null>(null)

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) setActive(id)
          }
        })
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.12 }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Mobile menu lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.classList.toggle('menu-open', open)
    return () => {
      document.body.style.overflow = ''
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', onResize)
    return () => desktop.removeEventListener('change', onResize)
  }, [])

  useEffect(() => {
    if (!open) return
    const menu = menuRef.current
    const trigger = menuButtonRef.current
    menu?.querySelector<HTMLButtonElement>('button[aria-label="Close menu"]')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab') return
      const items = menu?.querySelectorAll<HTMLElement>('button, a[href]')
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (window.innerWidth < 1024) trigger?.focus({ preventScroll: true })
    }
  }, [open])

  // Show name in navbar after scrolling past first section (with refined spring animation)
  const [showName, setShowName] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setShowName(window.scrollY > 160)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // check initial
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nameTransition = reduceMotion 
    ? { duration: 0.15 } 
    : transition(reduceMotion ?? false, showName ? springs.gentle : { duration: 0.18, ease: 'easeOut' })

  const scrollToMenuTarget = () => {
    const href = menuTargetRef.current
    menuTargetRef.current = null
    if (!href) return
    const section = document.getElementById(href.slice(1))
    if (!section) return

    // Run after the menu has exited and its body scroll lock is released.
    // The section's scroll-margin already accounts for the fixed phone header.
    const lenis = window.__lenis
    if (lenis) {
      lenis.resize()
      lenis.scrollTo(section, { duration: 0.8, immediate: !!reduceMotion })
    } else {
      section.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    if (window.location.hash !== href) window.history.pushState(null, '', href)
  }

  return (
    <>
      {/* CREATIVE VERTICAL LEFT NAV — the "spine" of the portfolio */}
      {/* Different from standard top bar: a fixed elegant vertical column showcasing typography and the photo creatively */}
      <aside className="desktop-sidebar hidden lg:flex fixed left-0 top-0 z-50 h-full w-[252px] flex-col bg-paper border-r border-ink/10 overflow-y-auto">
        {/* Photo in navbar only: rectangle, taller, touches top + left + right edges */}
        <div className="sidebar-portrait w-full overflow-hidden flex-shrink-0 relative">
          <motion.img 
            src={site.photo} 
            alt="Vinith Wade" 
            width={252}
            height={248}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover object-top"
            whileHover={reduceMotion ? {} : { scale: 1.012 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.6, ease: [0.23, 1, 0.32, 1] }}
          />
          {/* Subtle bottom fade — elegant blend from photo into sidebar content */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-paper/30 to-transparent pointer-events-none" />
        </div>

        {/* Content with refined internal spacing */}
        <div className="flex flex-col px-7 py-7">
          {/* Name - hidden initially, animates in below pic when scrolled past first section */}
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ 
              opacity: showName ? 1 : 0, 
              height: showName ? 'auto' : 0,
              y: showName ? 0 : -10,
              scale: showName ? 1 : 0.985
            }}
            transition={nameTransition}
            className="overflow-hidden mb-6"
          >
            <a href="#hero" className="block group">
              <div className="font-serif text-[31px] leading-none tracking-[-0.022em] text-ink whitespace-nowrap">
                Vinith Wade
              </div>
              {/* Delicate rule */}
              <div className="mt-2 h-px w-7 bg-ink/20 group-hover:bg-ink/35 transition-colors duration-200" />
            </a>
          </motion.div>

          {/* Vertical nav — simple stacked, left aligned, no extra visuals */}
          <nav>
            <div className="flex flex-col gap-y-3.5">
              {contentNavLinks.map((link) => {
                const isActive = active === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-[13px] font-mono tracking-[0.04em] transition-colors duration-150 ${
                      isActive 
                        ? 'text-ink'
                        : 'text-ink/50 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </nav>
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
            <span className="font-mono text-[10px] tracking-[0.14em] text-ink/50">THEME</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* A persistent portrait on phone and tablet screens. */}
      <div className="mobile-header lg:hidden fixed top-0 left-0 right-0 z-50 bg-paper border-b border-ink/10" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="flex h-16 items-center justify-between gap-2 px-4 sm:px-6">
          <a href="#hero" className="flex min-w-0 items-center gap-2.5 font-serif text-[19px] tracking-[-0.018em] active:opacity-70 transition" onClick={() => setOpen(false)}>
            <img src={site.photo} alt="" width={38} height={38} className="h-[38px] w-[38px] shrink-0 rounded-full object-cover object-top" />
            <span>{site.name}</span>
          </a>
          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              className="font-mono text-[11px] tracking-[0.24em] text-ink/70 hover:text-ink active:text-ink py-2.5 px-3 -mr-1 rounded transition touch-target"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-header-spacer lg:hidden" />

      {/* Mobile menu — strengthened: animated overlay, large touch targets, socials, active state, elegant motion */}
      <AnimatePresence onExitComplete={scrollToMenuTarget}>
        {open && (
          <motion.div
            ref={menuRef}
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            id="mobile-menu"
            className="lg:hidden fixed inset-0 z-[60] bg-paper"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="px-5 pt-7 pb-10 h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu header with name + close */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <img src={site.photo} alt="" width={48} height={48} className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 rounded-full object-cover object-top" />
                  <div className="font-serif text-[20px] sm:text-[24px] tracking-[-0.02em] whitespace-nowrap">{site.name}</div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <ThemeToggle />
                  <button
                    onClick={() => setOpen(false)}
                    className="font-mono text-[11px] tracking-[0.26em] text-ink/60 hover:text-ink py-2 px-2 -mr-1 active:text-ink transition touch-target"
                    aria-label="Close menu"
                  >
                    CLOSE
                  </button>
                </div>
              </div>

              {/* Nav links with touch targets + active */}
              <div className="space-y-px">
                {contentNavLinks.map((link) => {
                  const isActive = active === link.href.slice(1)
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault()
                        menuTargetRef.current = link.href
                        setOpen(false)
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`touch-target flex items-center text-[20px] tracking-[-0.008em] border-b border-ink/10 last:border-b-0 transition-all active:bg-ink/5 ${
                        isActive 
                          ? 'text-ink font-medium'
                          : 'text-ink/85 hover:text-ink active:text-ink'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </div>

              {/* Email + Socials to match desktop experience */}
              <div className="mt-9 pt-8 border-t border-ink/10">
                <a 
                  href={`mailto:${site.email}`} 
                  onClick={() => setOpen(false)} 
                  className="touch-target inline-block text-[15px] tracking-[-0.01em] text-ink/80 hover:text-ink font-serif underline underline-offset-2 decoration-ink/30 active:text-ink"
                >
                  {site.email}
                </a>

                <div className="mt-7 flex gap-5">
                  <a 
                    href={site.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-ink/55 hover:text-ink active:text-ink transition p-1 -m-1 touch-target"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={site.github} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-ink/55 hover:text-ink active:text-ink transition p-1 -m-1 touch-target"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={site.x} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-ink/55 hover:text-ink active:text-ink transition p-1 -m-1 touch-target"
                    aria-label="X"
                  >
                    <XIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={site.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-ink/55 hover:text-ink active:text-ink transition p-1 -m-1 touch-target"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </div>

                <div className="mt-1.5 text-[10px] text-ink/40 tracking-[0.12em] font-mono">
                  {site.location}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
