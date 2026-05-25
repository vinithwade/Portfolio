import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../../data/content'
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from '../ui/BrandIcons'

export function Contact() {
  return (
    <section
      id="contact"
      className="scene reading h-full flex flex-col justify-center py-16"
    >
      <p className="caption mb-8">Contact</p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="display text-4xl sm:text-5xl lg:text-6xl text-paper leading-[1.05]"
      >
        Let&apos;s build something
        <br />
        <span className="display-italic text-accent">that matters.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="prose-body mt-10 max-w-2xl"
      >
        <p>
          I&apos;m open for internships, freelance, and late-night product
          conversations. The fastest way to reach me is by email — I read
          everything and reply within a day.
        </p>
      </motion.div>

      <motion.a
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.25 }}
        href={`mailto:${site.email}`}
        className="group inline-flex items-baseline gap-3 mt-12 display text-3xl sm:text-4xl lg:text-5xl text-accent"
      >
        <span className="reveal-underline">{site.email}</span>
        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </motion.a>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-sans text-[14px]">
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
        <span className="text-dim">·</span>
        <span className="text-dim">{site.location}</span>
      </div>
    </section>
  )
}
