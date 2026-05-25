import { motion } from 'framer-motion'
import { BookOpen, Cpu, GitCommit, Music, Sparkles, Terminal } from 'lucide-react'

const widgets = [
  {
    icon: Cpu,
    title: 'Shipping',
    value: 'CTRL',
    sub: 'AI design → code tool',
    chip: 'in progress',
  },
  {
    icon: GitCommit,
    title: 'Last commit',
    value: '2 hours ago',
    sub: 'fix: caption alignment',
    chip: '@vinithwade',
  },
  {
    icon: Terminal,
    title: 'Latest stack',
    value: 'React + Claude',
    sub: 'building a renderer',
    chip: 'typescript',
  },
  {
    icon: Music,
    title: 'Listening to',
    value: 'lo-fi study',
    sub: 'while shipping',
    chip: 'on repeat',
  },
  {
    icon: BookOpen,
    title: 'Reading',
    value: 'Hooked',
    sub: 'Nir Eyal',
    chip: '· next: Range',
  },
  {
    icon: Sparkles,
    title: 'Learning',
    value: 'Rust',
    sub: 'after JS · Python',
    chip: 'side quest',
  },
]

const githubGrid = Array.from({ length: 7 * 18 }).map((_, i) => {
  // pseudo random based on i to look like a real contrib graph
  const seed = (i * 9301 + 49297) % 233280
  const r = seed / 233280
  if (r > 0.86) return 4
  if (r > 0.7) return 3
  if (r > 0.5) return 2
  if (r > 0.3) return 1
  return 0
})

export function Now() {
  return (
    <section id="now" className="scene container-page py-20 sm:py-24 lg:py-28 hair-t">
      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 lg:col-span-3">
          <p className="label-num">Now</p>
          <p className="mt-2 label-sm text-accent">a snapshot</p>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-9 display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          What I&apos;m up to{' '}
          <span className="display-italic text-accent">right now.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {widgets.map((w, i) => (
          <motion.article
            key={w.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="card col-span-6 sm:col-span-4 lg:col-span-2 p-5 group flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <w.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span className="label-sm text-faint">{w.chip}</span>
            </div>
            <p className="label-sm text-dim">{w.title}</p>
            <p
              className="text-paper text-lg mt-1.5 leading-tight display-italic"
              style={{ fontWeight: 400 }}
            >
              {w.value}
            </p>
            <p className="text-xs text-muted mt-1">{w.sub}</p>
          </motion.article>
        ))}

        {/* GITHUB GRID */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card col-span-12 lg:col-span-8 p-6 group"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="label-sm text-dim">activity · last 18 weeks</p>
            <a
              href="https://github.com/vinithwade"
              target="_blank"
              rel="noreferrer"
              className="label-sm text-paper hover:text-accent transition-colors"
            >
              @vinithwade ↗
            </a>
          </div>
          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
              gridAutoFlow: 'column',
              gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
            }}
          >
            {githubGrid.map((level, i) => (
              <span
                key={i}
                className="gh-cell"
                style={{
                  background: `rgba(255, 125, 77, ${0.05 + level * 0.18})`,
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between label-sm text-faint">
            <span>less</span>
            <span className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((l) => (
                <span
                  key={l}
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: `rgba(255, 125, 77, ${0.05 + l * 0.18})` }}
                />
              ))}
            </span>
            <span>more</span>
          </div>
        </motion.article>

        {/* MICRO-AVAILABILITY */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="card col-span-12 lg:col-span-4 p-6"
        >
          <p className="label-sm text-dim mb-4">availability</p>
          <p className="text-paper text-lg leading-snug">
            Taking <span className="text-accent">2 freelance projects</span>{' '}
            this quarter. Replies within{' '}
            <span className="display-italic">24 hours</span>.
          </p>
          <p className="text-dim text-xs mt-3">Q2 · 2026 booking</p>
        </motion.article>
      </div>
    </section>
  )
}
