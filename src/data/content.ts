import {
  Brain,
  Code2,
  Database,
  Layers,
  Sparkles,
} from 'lucide-react'

export const site = {
  name: 'Vinith Wade',
  tagline: 'I trace sparks into constellations.',
  email: 'wadevinith6@gmail.com',
  location: 'Hyderabad, Telangana',
  linkedin: 'https://www.linkedin.com/in/vinithwade/',
  github: 'https://github.com/vinithwade',
  x: 'https://x.com/Vinith_04',
  instagram: 'https://www.instagram.com/vinith_wade/',
  photo: '/me.jpg',
  tags: [
    'Constellation builder',
    'Spark catcher',
    'Story keeper',
    'Night walker',
  ],
}

export const navLinks = [
  { label: 'Begin', href: '#hero' },
  { label: 'Journey', href: '#about' },
  { label: 'Marks', href: '#work' },
  { label: 'Chapters', href: '#experience' },
  { label: 'Now', href: '#now' },
  { label: 'Constellations', href: '#projects' },
  { label: 'Tools', href: '#skills' },
  { label: 'Sparks', href: '#achievements' },
  { label: 'Connect', href: '#contact' },
]

export type Project = {
  title: string
  subtitle: string
  tag: string
  description: string
  detail?: string
  highlight?: string
  href: string
  role?: string
  problem?: string
  process?: string[]
  impact?: string
  metrics?: string[]
  tech?: string[]
}

export const projects: Project[] = [
  {
    title: 'MindFlow',
    subtitle: 'Your voice, the right words, right where you are',
    tag: 'Solo Project · 2026',
    description: 'A quiet companion that listens when you speak your intent, takes in what is on screen, and offers a reply that sounds like it came from you.',
    href: 'https://github.com/vinithwade',
    highlight: 'Speak what you mean. A reply that feels like your own arrives before the thought slips away.',
    role: 'Solo',
    problem: 'Good intentions dissolve between the moment you speak and when you sit down to shape them.',
    process: ['Listen in the moment', 'Take in what is on screen', 'Return words that feel true'],
  },
  {
    title: 'Stuff',
    subtitle: 'The gentle guide that turns wild ideas into real things',
    tag: 'Founder · 2026 – Present',
    description: 'Where big, messy dreams meet careful hands. It sketches, plans, builds, and pauses so you can decide what comes next.',
    href: 'https://github.com/vinithwade',
    highlight: 'Big ideas do not have to feel reckless. Here they get room to grow safely.',
    role: 'Founder',
    problem: 'Big dreams scatter before they can be shaped into something real.',
    process: ['Sketch the first shape', 'Plan the quiet steps', 'Build and wait for your hand'],
  },
  {
    title: 'Personal Driver Booking',
    subtitle: 'Someone to take the wheel when the city gets too heavy',
    tag: 'Founder · 2026',
    description: 'For anyone who loves the car but dreads the hours the city takes. Book a trusted driver by the hour. Keep your own seat, keep your own time.',
    href: 'https://github.com/vinithwade',
    highlight: 'Your car. Your night. Someone steady to carry the weight of the road.',
    role: 'Founder',
    problem: 'Evenings disappear inside traffic while the car sits unused.',
    process: ['Find a steady hand nearby', 'Keep your own seat', 'Ride without the weight'],
  },
  {
    title: 'CTRL',
    subtitle: 'When your idea deserves to become something you can touch',
    tag: 'Product · 2025',
    description: 'Shape what you imagine with your hands. Watch it become something real you can use across every screen. Nothing stands between you and what you pictured.',
    href: 'https://ctrl-mvp.vercel.app',
    highlight: 'Your wild thought becomes something you can touch, share, and send into the world today.',
    role: 'Product dreamer',
    problem: 'Ideas stay trapped in sketches and never reach the screen.',
    process: ['Draw what you mean', 'Watch it become something real', 'Ship without the gap between thought and thing'],
  },
  {
    title: 'Lexora',
    subtitle: 'The friend who shows up twice a day and never judges',
    tag: 'Product · 2025',
    description: 'Twice a day you sit with a gentle face and speak what you mean to do. Later you return and share how it went. The quiet streak becomes pride in keeping the promises you made to yourself.',
    href: 'https://github.com/vinithwade/Lexora',
    highlight: 'Twice a day. No pressure. Just the steady feeling that someone trusts you will.',
    role: 'Gentle keeper',
    problem: 'Promises to ourselves slip away without a witness or rhythm.',
    process: ['Show up twice daily', 'Speak the intention out loud', 'Return to mark what happened'],
  },
]


export const achievements = [
  {
    icon: Brain,
    text: 'Chosen as one of twenty-five in a small circle across four years — a group that believes ideas deserve to become real things in the world.',
  },
  {
    icon: Sparkles,
    text: 'Showed up with a pocketful of questions and a willingness to build something that mattered by morning.',
  },
  {
    icon: Code2,
    text: 'Found the quiet satisfaction of untangling problems, one careful step at a time.',
  },
  {
    icon: Layers,
    text: 'Sat with new ways of shaping thought — learning how to turn sparks into something that feels almost alive.',
  },
  {
    icon: Database,
    text: 'Danced through many puzzles. Each one a small constellation of patience and the right next move.',
  },
]
