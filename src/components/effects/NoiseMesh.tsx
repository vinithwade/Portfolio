import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'

type Star = {
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  color: string
  glow: string
}

// Realistic stellar color palette — based on real spectral classes
const STELLAR_PALETTE: { color: string; glow: string; weight: number }[] = [
  { color: '#cfe0ff', glow: 'rgba(180,210,255,0.55)', weight: 0.12 },
  { color: '#eaf2ff', glow: 'rgba(220,235,255,0.55)', weight: 0.16 },
  { color: '#ffffff', glow: 'rgba(255,255,255,0.55)', weight: 0.30 },
  { color: '#fff4d8', glow: 'rgba(255,235,180,0.50)', weight: 0.18 },
  { color: '#ffd0a0', glow: 'rgba(255,180,120,0.50)', weight: 0.14 },
  { color: '#ffa07a', glow: 'rgba(255,130,90,0.50)', weight: 0.10 },
]

function pickColor(r: number) {
  let acc = 0
  for (const c of STELLAR_PALETTE) {
    acc += c.weight
    if (r < acc) return c
  }
  return STELLAR_PALETTE[STELLAR_PALETTE.length - 1]
}

function seeded(i: number) {
  const s = Math.sin(i * 9301 + 49297) * 233280
  return s - Math.floor(s)
}

function generateStars(count: number, sizeBoost: number, seedOffset = 0): Star[] {
  const arr: Star[] = []
  for (let i = 0; i < count; i++) {
    const j = i + seedOffset
    const c = pickColor(seeded(j + 7.3))
    arr.push({
      x: seeded(j) * 100,
      y: seeded(j + 13.7) * 100,
      size: 0.4 + seeded(j + 91.2) * sizeBoost,
      duration: 3 + seeded(j + 5.5) * 5,
      delay: seeded(j + 23.1) * 8,
      opacity: 0.30 + seeded(j + 67.3) * 0.65,
      color: c.color,
      glow: c.glow,
    })
  }
  return arr
}

export function NoiseMesh() {
  const { scrollYProgress } = useScroll()

  // Slimmed star counts for perf
  const far = useMemo(() => generateStars(90, 0.8, 0), [])
  const mid = useMemo(() => generateStars(55, 1.4, 400), [])
  const near = useMemo(() => generateStars(30, 1.8, 800), [])
  const giants = useMemo(() => generateStars(8, 2.5, 1200), [])

  // Parallax — gentler ranges for smoother scroll
  const farY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const nearY = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])
  const giantsY = useTransform(scrollYProgress, [0, 1], ['0%', '-85%'])

  // Nebula drift
  const dustA = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const dustB = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* Base — true deep-space near-black */}
      <div className="absolute inset-0" style={{ background: '#04030a' }} />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(8,10,24,0) 0%, #02020a 100%)',
        }}
      />

      {/* Two large dust nebulas — soft, gentle parallax */}
      <motion.div
        style={{ y: dustA, willChange: 'transform' }}
        className="absolute -top-32 -left-20 w-[760px] h-[760px] rounded-full blur-3xl opacity-45"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(110,80,180,0.40) 0%, rgba(60,40,120,0.10) 35%, transparent 70%)',
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: dustB, willChange: 'transform' }}
        className="absolute top-1/2 -right-40 w-[820px] h-[820px] rounded-full blur-3xl opacity-35"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(180,70,120,0.32) 0%, rgba(120,50,80,0.10) 30%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Diagonal milky-way band */}
      <div
        className="absolute -inset-x-32 top-[20%] h-[55vh] opacity-30 pointer-events-none"
        style={{
          background:
            'linear-gradient(110deg, transparent, rgba(255,220,180,0.08) 30%, rgba(255,180,140,0.12) 50%, rgba(180,140,200,0.08) 70%, transparent)',
          filter: 'blur(60px)',
          transform: 'rotate(-12deg)',
        }}
      />

      {/* FAR — small, no glow */}
      <motion.div
        style={{ y: farY, willChange: 'transform' }}
        className="absolute inset-0"
      >
        {far.map((s, i) => (
          <span
            key={`f${i}`}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              opacity: s.opacity * 0.7,
              animation: `tw ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* MID — small with tiny halo */}
      <motion.div
        style={{ y: midY, willChange: 'transform' }}
        className="absolute inset-0"
      >
        {mid.map((s, i) => (
          <span
            key={`m${i}`}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              opacity: s.opacity * 0.85,
              boxShadow: `0 0 2px ${s.glow}`,
              animation: `tw ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* NEAR — brighter with glow */}
      <motion.div
        style={{ y: nearY, willChange: 'transform' }}
        className="absolute inset-0"
      >
        {near.map((s, i) => (
          <span
            key={`n${i}`}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              opacity: s.opacity,
              boxShadow: `0 0 5px ${s.glow}, 0 0 10px ${s.glow}`,
              animation: `tw ${s.duration * 0.9}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* GIANTS — diffraction spikes */}
      <motion.div
        style={{ y: giantsY, willChange: 'transform' }}
        className="absolute inset-0"
      >
        {giants.map((s, i) => (
          <span
            key={`g${i}`}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size + 1}px`,
              height: `${s.size + 1}px`,
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: s.color,
                opacity: s.opacity,
                boxShadow: `0 0 8px ${s.glow}, 0 0 18px ${s.glow}`,
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '1px',
                height: '28px',
                background: `linear-gradient(180deg, transparent, ${s.glow}, transparent)`,
                opacity: 0.55,
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '28px',
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${s.glow}, transparent)`,
                opacity: 0.55,
              }}
            />
          </span>
        ))}
      </motion.div>

      <style>{`
        @keyframes tw {
          0%, 100% { opacity: var(--o, 0.45); }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
