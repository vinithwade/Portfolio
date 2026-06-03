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
    title: 'MindFlow',
    subtitle: 'Context-Aware Voice Reply Assistant (macOS)',
    tag: 'Solo Project · 2026',
    description:
      'A system-wide macOS app that turns a spoken intent plus on-screen context into a polished, ready-to-send reply using LLMs.',
    detail:
      'Built with Electron + React + TypeScript: a global hold-to-talk hotkey, a floating NSPanel overlay that renders over any app including full-screen Spaces, and one-click insert-and-send. Engineered a sub-3-second voice pipeline — mic → Whisper/Deepgram STT → screen-context extraction (macOS Accessibility API, AppleScript, on-device OCR) → Claude / GPT-4o-mini. Secure auth and cloud sync via Supabase (Google OAuth PKCE loopback, Postgres RLS, encrypted keys with safeStorage), a Razorpay credit-based monetization system with HMAC-verified Edge Function webhooks, plus full production practices: Vitest, GitHub Actions CI, Sentry, code signing, notarization, and auto-updates.',
    highlight: 'Speak your intent, get a ready-to-send reply in under 3 seconds.',
    color: '#fb7185',
    href: 'https://github.com/vinithwade',
  },
  {
    title: 'Stuff',
    subtitle: 'AI Agent Orchestration Layer',
    tag: 'Founder · 2026 – Present',
    description:
      'A control plane for AI agents that build software — turning vague product ideas into planned, reviewed, and safely shipped code.',
    detail:
      'A multi-agent pipeline: idea → spec → architecture → task graph → scoped Claude agents → verification → human approval → PR. Designed a policy and permission engine that gives each agent allowed commands and denied paths — making AI software engineering auditable and safe, not just fast. Stack: Next.js, TypeScript, Supabase, LangChain, Claude API, GitHub API.',
    highlight: 'Makes AI software engineering auditable and safe, not just fast.',
    color: '#ff4d8a',
    href: 'https://github.com/vinithwade',
  },
  {
    title: 'Personal Driver Booking',
    subtitle: 'Hourly driver marketplace',
    tag: 'Founder · 2026',
    description:
      'An Uber-inspired platform: book a verified personal driver by the hour at a fixed rate and get home safely — with your own car.',
    detail:
      'Solves a metro-city problem for people who own cars but dread traffic. Designed the full product flow: real-time driver availability, hourly pricing engine, booking + payment, driver-user trust system, and live tracking — thinking through the marketplace dynamics, pricing, and trust model, not just the code.',
    highlight: 'Get home safely while your car comes with you.',
    color: '#a78bfa',
    href: 'https://github.com/vinithwade',
  },
  {
    title: 'CTRL',
    subtitle: 'AI-Powered Visual Design Tool',
    tag: 'AI Product · 2025',
    description:
      'A cross-platform design tool that auto-generates production-ready code for web, mobile, and desktop from drag-and-drop component logic.',
    detail:
      'Built and deployed live at ctrl-mvp.vercel.app. Integrated Claude and GPT-4 for real-time code suggestions and UX feedback, reducing effort by 40% and eliminating the need for non-technical users to write any code.',
    highlight: 'From drag-and-drop to production code — no coding required.',
    color: '#22d3ee',
    href: 'https://ctrl-mvp.vercel.app',
  },
  {
    title: 'Lexora',
    subtitle: 'Real-Time AI Accountability Coach',
    tag: 'AI Product · 2025',
    description:
      'A real-time AI video coaching app where users video-call an AI agent twice daily to set tasks, review progress, and keep a streak.',
    detail:
      'Morning session extracts tasks, evening session reviews progress — using the OpenAI Realtime API over WebRTC with audio streaming directly browser↔OpenAI. Architected the full stack: Next.js 15 (App Router) + TypeScript, Supabase (Postgres + Auth + RLS), Vercel Cron for timed notifications, and Resend for email reminders — server only mints ephemeral tokens, keeping latency minimal and costs lean.',
    highlight: 'Server only mints ephemeral tokens — low latency, lean costs.',
    color: '#d5ff3e',
    href: 'https://github.com/vinithwade/Lexora',
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
