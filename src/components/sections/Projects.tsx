import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/content'

export function Projects() {
  return (
    <section
      id="projects"
      className="scene reading h-full flex flex-col justify-center py-10"
    >
      <p className="caption mb-4">Selected work</p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="display text-3xl sm:text-4xl lg:text-5xl text-paper leading-[1.1] mb-8"
      >
        Things I&apos;ve <span className="display-italic text-accent">made</span>.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group block border-t border-black/10 pt-4"
          >
            <p className="caption text-paper">{p.tag}</p>
            <h3 className="display text-xl sm:text-2xl text-paper mt-2 leading-tight">
              {p.title}{' '}
              <span className="display-italic text-dim text-base">
                — {p.subtitle}
              </span>
            </h3>
            <p className="prose-body text-sm mt-3 text-ivory line-clamp-3">
              {p.description}
            </p>
            <p className="link inline-flex items-center gap-1.5 mt-4 text-[13px] font-sans group/link">
              View source
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
