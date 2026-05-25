import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  Code2,
  Database,
  Layers,
  Sparkles,
} from 'lucide-react'

export const site = {
  name: 'Vinith Wade',
  tagline: 'Developer by skill. Builder by mindset.',
  email: 'wadevinith6@gmail.com',
  location: 'Hyderabad, Telangana',
  linkedin: 'https://www.linkedin.com/in/vinithwade/',
  github: 'https://github.com/vinithwade',
  x: 'https://x.com/Vinith_04',
  instagram: 'https://www.instagram.com/vinith_wade/',
  photo: '/me.jpg',
  tags: [
    'Full-Stack Developer',
    'AI Builder',
    'Product Thinker',
    'IT Student',
  ],
}

export const navLinks = [
  { label: 'Intro', href: '#hero' },
  { label: 'Story', href: '#about' },
  { label: 'Craft', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { label: 'GitHub Repos', value: '22+' },
  { label: 'LeetCode Solved', value: '73+' },
  { label: 'Years Building', value: '3+' },
  { label: 'AI Tools Shipped', value: '5' },
]

export const services: {
  icon: LucideIcon
  title: string
  description: string
  accent: string
}[] = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'Responsive, modern, scalable web apps with React, Node, Express, MongoDB, Firebase, Supabase and REST APIs.',
    accent: '#ff4d8a',
  },
  {
    icon: Sparkles,
    title: 'AI Product Building',
    description:
      'LLM workflows, automation, Claude & GPT pipelines, Whisper, and AI-driven rendering systems shipped into product.',
    accent: '#a78bfa',
  },
  {
    icon: Layers,
    title: 'UI/UX & Frontend Systems',
    description:
      'Clean interfaces, reusable component systems, smooth flows and design that gets users to take action.',
    accent: '#22d3ee',
  },
  {
    icon: Database,
    title: 'Backend & API Development',
    description:
      'Authenticated services, optimized APIs, clean DB design and architecture ready for real-world scale.',
    accent: '#d5ff3e',
  },
]

export const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Behooked.co',
    location: 'Remote',
    period: 'Apr 2025 – Present',
    description:
      'Video automation and caption rendering system. Built a reusable React caption component registry, an AI transcription + emphasis tagging pipeline, and multi-format support for YouTube, Shorts, Reels, Feed, and Square.',
    highlight:
      'Built reusable caption components and a smoother workflow for video creators and editors.',
    color: '#ff4d8a',
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Digital Blinc',
    location: 'Noida, India',
    period: 'Jun 2025 – Jul 2025',
    description:
      'Backend API performance, auth flows, and responsive frontend. Optimized Express.js routes, improved MongoDB queries, integrated JWT auth, and built React + Redux interfaces.',
    highlight:
      'Improved API response time, frontend performance, and authentication reliability.',
    color: '#a78bfa',
  },
]

export const projects = [
  {
    title: 'CTRL',
    subtitle: 'AI Visual Design Tool',
    tag: 'AI Product · 2025',
    description:
      'An AI-powered visual design tool that turns intent into production-ready code for web, mobile, and desktop.',
    detail:
      'Founder & developer. Integrated Claude and GPT-4 for real-time code suggestions and UX feedback. The goal: collapse the distance between design and development so anyone can go from idea to shipped product.',
    highlight: 'Automated UI generation made building feel like sketching.',
    color: '#ff4d8a',
    href: 'https://github.com/vinithwade',
  },
  {
    title: 'C2E',
    subtitle: 'Creator ↔ Editor Platform',
    tag: 'Production · 2025',
    description:
      'Secure video collaboration for creators and editors — project folders, role-based access, and clean handoff.',
    detail:
      'Built around how creators actually share raw footage with editors: organized projects, granular access, and a workflow that respects the asset chain.',
    highlight: 'Replaced messy Drive folders with a proper creator workflow.',
    color: '#a78bfa',
    href: 'https://github.com/vinithwade/C2E',
  },
  {
    title: 'ICU Sepsis',
    subtitle: 'Prediction System',
    tag: 'ML · Healthcare · 2024',
    description:
      'A machine-learning system that predicts ICU sepsis risk from vitals and lab values.',
    detail:
      'Built the full pipeline in Python — preprocessing, model training, evaluation, deployment via Streamlit. The Random Forest baseline hit 85–90% accuracy on the test set.',
    highlight: 'Modular by design — slots into real healthcare data systems.',
    color: '#22d3ee',
    href: 'https://github.com/vinithwade/ICU-Sepsis-Prediction-System',
  },
  {
    title: 'Dekho',
    subtitle: 'Bas ek swipe',
    tag: 'Mobile Web · 2025',
    description:
      'A swipe-first discovery experience built in TypeScript. Feels native, ships on the web.',
    detail:
      'Gesture-led UI with momentum, snap, and a content stream tuned for thumb-only navigation. Every interaction designed to feel like one continuous motion.',
    highlight: 'Proof that web apps can move like native ones.',
    color: '#d5ff3e',
    href: 'https://github.com/vinithwade/Dekho',
  },
  {
    title: 'Caption Engine',
    subtitle: 'Video render pipeline',
    tag: 'Production · 2025',
    description:
      'Browser upload, AI transcription, caption styling, video rendering, background removal, S3 caching, aspect-aware positioning.',
    detail:
      'A production-grade pipeline that takes a raw clip and outputs platform-ready video with styled, position-aware captions for every social aspect ratio.',
    highlight: 'Reusable caption components powering creator workflows.',
    color: '#fb7185',
    href: 'https://github.com/vinithwade',
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'SQL'],
    color: '#ff4d8a',
  },
  {
    title: 'Frontend',
    skills: ['React', 'Redux', 'Tailwind', 'Framer Motion', 'Responsive UI'],
    color: '#a78bfa',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'JWT Auth'],
    color: '#22d3ee',
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL', 'Firebase', 'Supabase'],
    color: '#d5ff3e',
  },
  {
    title: 'AI & ML',
    skills: ['PyTorch', 'Scikit-learn', 'LLM integrations', 'Whisper', 'Streamlit'],
    color: '#fb7185',
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Docker', 'AWS S3', 'CI/CD'],
    color: '#34d399',
  },
]

export const achievements = [
  {
    icon: Brain,
    text: 'Selected as an E-Cell member — 25 students across 4 years — for leadership and entrepreneurial potential.',
  },
  {
    icon: Sparkles,
    text: 'Participated in Smart India Hackathon 2024.',
  },
  {
    icon: Code2,
    text: 'Certified in Python and Problem Solving on HackerRank.',
  },
  {
    icon: Layers,
    text: 'Certified in Generative AI and Large Language Models by Google Cloud.',
  },
  {
    icon: Database,
    text: 'Solved 73+ problems on LeetCode.',
  },
]
