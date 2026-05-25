import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Behooked.co',
    period: 'Apr 2025 — Present',
    description:
      'Working on a video automation and caption rendering engine. Built a reusable React caption component registry, an AI transcription + emphasis tagging pipeline, and multi-format support for YouTube, Shorts, Reels, Feed and Square.',
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Digital Blinc',
    period: 'Jun 2025 — Jul 2025',
    description:
      'Backend API performance, auth flows, and responsive frontends. Optimized Express.js routes, improved MongoDB queries, integrated JWT auth, and built React + Redux interfaces.',
  },
]

export function Experience() {
  return (
    <section id="experience" className="scene reading h-full flex flex-col justify-center py-16">
      <p className="caption mb-8">Experience</p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="display text-3xl sm:text-4xl lg:text-5xl text-paper mb-12 leading-[1.1]"
      >
        Where I&apos;ve <span className="display-italic text-accent">shown up</span>.
      </motion.h2>

      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="grid grid-cols-12 gap-6 border-b border-white/10 pb-12"
          >
            <div className="col-span-12 md:col-span-3">
              <p className="caption text-paper">{exp.period}</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h3 className="display text-2xl sm:text-3xl text-paper">
                {exp.role}{' '}
                <span className="display-italic text-dim">at {exp.company}</span>
              </h3>
              <p className="prose-body mt-4 max-w-2xl">{exp.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
