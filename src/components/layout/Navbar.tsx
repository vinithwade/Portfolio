import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../../data/content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Writing', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(250,248,244,0)', 'rgba(250,248,244,0.85)'])
  const border = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(26,22,20,0.10)'])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <motion.div
          style={{ background: bg, borderBottom: '1px solid', borderColor: border }}
          className="backdrop-blur-md"
        >
          <nav className="container-page h-[64px] flex items-center justify-between">
            <a href="#hero" className="display text-paper text-[22px] sm:text-[26px]" style={{ fontWeight: 500 }}>
              Vinith <span className="display-italic text-accent">Wade</span>
            </a>

            <ul className="hidden md:flex items-center gap-7">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[14px] text-dim hover:text-paper transition-colors font-sans"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href={`mailto:${site.email}`}
                className="hidden md:inline-flex text-[14px] text-paper border-b border-paper/40 hover:border-accent hover:text-accent transition-colors font-sans"
              >
                Email
              </a>
              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="md:hidden w-10 h-10 flex items-center justify-center"
                onClick={() => setOpen(!open)}
              >
                <span className="flex flex-col gap-1.5">
                  <span
                    className={`block w-5 h-px bg-paper transition-transform ${
                      open ? 'rotate-45 translate-y-[3px]' : ''
                    }`}
                  />
                  <span
                    className={`block w-5 h-px bg-paper transition-transform ${
                      open ? '-rotate-45 -translate-y-[3px]' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      <div className="h-[64px]" aria-hidden />

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 z-30 bg-ink px-6 pt-28 pb-12 flex flex-col"
        >
          <ul className="flex-1 space-y-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display text-paper text-4xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="display text-accent text-2xl mt-8"
          >
            {site.email}
          </a>
        </motion.div>
      )}
    </>
  )
}
