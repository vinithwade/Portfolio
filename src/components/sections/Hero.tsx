import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { site } from '../../data/content'
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from '../ui/BrandIcons'
import { StarSketch } from '../ui/StarSketch'

export function Hero() {
  return (
    <section
      id="hero"
      className="scene relative h-full flex flex-col justify-center container-page py-10"
    >
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT — text */}
        <div className="col-span-12 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="caption flex items-center gap-3 mb-6"
          >
            <span className="live-dot pulse-dot" />
            Open for work · MMXXV
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="display text-[13vw] sm:text-[11vw] lg:text-[8vw] xl:text-[7.5vw]"
          >
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="inline-block"
            >
              Vinith
            </motion.span>
            <br />
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              className="inline-block display-italic text-accent"
            >
              Wade
            </motion.span>
            <span className="text-paper">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="prose-body mt-8 max-w-xl"
          >
            <p>
              I&apos;m a <em>21-year-old developer</em> based in Hyderabad, India
              — currently studying Information Technology at{' '}
              <em>Vardhaman College of Engineering</em>. I build full-stack and
              AI-driven products. Right now I&apos;m{' '}
              <span className="hl-strong">open to joining a startup team</span>{' '}
              where I can ship from day one.
            </p>
            <p>
              I started on the web, drifted into AI, and stayed for the
              products. What I really want is to make things people remember.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-[14px]"
          >
            <a href="#projects" className="link inline-flex items-center gap-2 group">
              See selected work
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={`mailto:${site.email}`} className="link inline-flex items-center gap-2 group">
              Get in touch
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 link"
            >
              <GithubIcon className="w-4 h-4" />
              Github
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 link"
            >
              <LinkedinIcon className="w-4 h-4" />
              Linkedin
            </a>
            <a
              href={site.x}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 link"
            >
              <XIcon className="w-3.5 h-3.5" />
              X
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 link"
            >
              <InstagramIcon className="w-4 h-4" />
              Instagram
            </a>
          </motion.div>
        </div>

        {/* RIGHT — interactive constellation sketch */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="col-span-12 lg:col-span-5"
        >
          <StarSketch />
        </motion.div>
      </div>
    </section>
  )
}
