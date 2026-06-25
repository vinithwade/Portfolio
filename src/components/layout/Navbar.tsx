import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { site, navLinks as contentNavLinks } from '../../data/content'
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from '../ui/BrandIcons'
import { springs, transition } from '../../lib/motion'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')

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
    return () => { document.body.style.overflow = '' }
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

  return (
    <>
      {/* CREATIVE VERTICAL LEFT NAV — the "spine" of the portfolio */}
      {/* Different from standard top bar: a fixed elegant vertical column showcasing typography and the photo creatively */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-50 h-full w-[252px] flex-col bg-black border-r border-white/10">
        {/* Photo in navbar only: rectangle, taller, touches top + left + right edges */}
        <div className="w-full h-[248px] overflow-hidden flex-shrink-0 relative">
          <motion.img 
            src={site.photo} 
            alt="Vinith Wade" 
            width={252}
            height={248}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover"
            whileHover={reduceMotion ? {} : { scale: 1.012 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.6, ease: [0.23, 1, 0.32, 1] }}
          />
          {/* Subtle bottom fade — elegant blend from photo into sidebar content */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
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
              <div className="font-serif text-[31px] leading-none tracking-[-0.022em] text-white whitespace-nowrap">
                Vinith Wade
              </div>
              {/* Delicate rule */}
              <div className="mt-2 h-px w-7 bg-white/20 group-hover:bg-white/35 transition-colors duration-200" />
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
                        ? 'text-white' 
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile: Minimal top bar (no photo) — strengthened: taller tap targets, better contrast */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="flex h-[60px] items-center justify-between px-5">
          <a href="#hero" className="font-serif text-[19px] tracking-[-0.018em] active:opacity-70 transition">
            Vinith Wade
          </a>
          <button 
            onClick={() => setOpen(!open)} 
            className="font-mono text-[11px] tracking-[0.24em] text-white/70 hover:text-white active:text-white py-2.5 px-4 -mr-1 rounded transition touch-target"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      <div className="h-[60px] lg:hidden" />

      {/* Mobile menu — strengthened: animated overlay, large touch targets, socials, active state, elegant motion */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            id="mobile-menu"
            className="lg:hidden fixed inset-0 z-[60] bg-black"
            style={{ paddingTop: 'calc(60px + env(safe-area-inset-top))' }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
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
                <div className="font-serif text-[26px] tracking-[-0.02em]">Vinith Wade</div>
                <button
                  onClick={() => setOpen(false)}
                  className="font-mono text-[11px] tracking-[0.26em] text-white/60 hover:text-white py-2 px-3 -mr-1 active:text-white transition touch-target"
                  aria-label="Close menu"
                >
                  CLOSE
                </button>
              </div>

              {/* Nav links with touch targets + active */}
              <div className="space-y-px">
                {contentNavLinks.map((link) => {
                  const isActive = active === link.href.slice(1)
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`touch-target flex items-center text-[20px] tracking-[-0.008em] border-b border-white/10 last:border-b-0 transition-all active:bg-white/5 ${
                        isActive 
                          ? 'text-white font-medium' 
                          : 'text-white/85 hover:text-white active:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </div>

              {/* Email + Socials to match desktop experience */}
              <div className="mt-9 pt-8 border-t border-white/10">
                <a 
                  href={`mailto:${site.email}`} 
                  onClick={() => setOpen(false)} 
                  className="touch-target inline-block text-[15px] tracking-[-0.01em] text-white/80 hover:text-white font-serif underline underline-offset-2 decoration-white/30 active:text-white"
                >
                  {site.email}
                </a>

                <div className="mt-7 flex gap-5">
                  <a 
                    href={site.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-white/55 hover:text-white active:text-white transition p-1 -m-1 touch-target"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={site.github} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-white/55 hover:text-white active:text-white transition p-1 -m-1 touch-target"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={site.x} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-white/55 hover:text-white active:text-white transition p-1 -m-1 touch-target"
                    aria-label="X"
                  >
                    <XIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={site.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-white/55 hover:text-white active:text-white transition p-1 -m-1 touch-target"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </div>

                <div className="mt-1.5 text-[10px] text-white/40 tracking-[0.12em] font-mono">
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
