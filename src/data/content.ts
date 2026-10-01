// Shared facts for the page and assistant. No browser or UI dependencies.
export const site = {
  name: 'Vinith Wade',
  role: 'Software developer · Backend & AI',
  tagline: 'I trace sparks into constellations.',
  email: 'wadevinith01@gmail.com',
  location: 'Hyderabad, Telangana',
  linkedin: 'https://www.linkedin.com/in/vinithwade/',
  github: 'https://github.com/vinithwade',
  x: 'https://x.com/Vinith_04',
  instagram: 'https://www.instagram.com/vinith_wade/',
  photo: '/me.jpg',
  resume: '/VinithWade_SDE1.pdf',
  resumeFilename: 'Vinith_Wade_Resume.pdf',
}

export const introduction = {
  headline: 'Thoughtful software. Solid foundations.',
  paragraphs: [
    'I build software with AI, think in systems, and care about the details that make a product useful. My work spans backend engineering, distributed pipelines, and tools that fit naturally into everyday life.',
    'From voice and screen context to source-grounded study tools, I turn complex workflows into something people can actually use.',
  ],
}

export const about = [
  'I am a software developer based in Hyderabad, studying Information Technology at Vardhaman College of Engineering. I like understanding how a system works all the way down, then making its surface feel simple.',
  'My work brings together Java and Python backends, TypeScript applications, event-driven processing, and AI. MindFlow and Zipp gave me room to work on asynchronous pipelines, retrieval, provider integrations, and the foundations behind the interface.',
  'I care about clear boundaries, reliable data flows, and software that earns trust through how it behaves. Building with AI is part of my process; understanding what I ship is the point.',
]

export const education = {
  institution: 'Vardhaman College of Engineering',
  degree: 'B.Tech in Information Technology',
  period: '2023 – 2027',
  location: 'Hyderabad, India',
}

export const navLinks = [
  { label: 'Begin', href: '#hero' },
  { label: 'Journey', href: '#about' },
  { label: 'Marks', href: '#work' },
  { label: 'Chapters', href: '#experience' },
  { label: 'Now', href: '#now' },
  { label: 'Constellations', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Sparks', href: '#achievements' },
  { label: 'Connect', href: '#contact' },
]

export const services = [
  { num: '01', title: 'Foundations that hold', text: 'Backend services, REST APIs, and event-driven workflows. I work with Java, Spring Boot, Node.js, and Python to connect the pieces behind a product.' },
  { num: '02', title: 'AI with a purpose', text: 'Voice, screen context, document ingestion, and retrieval. I build around a clear task, with provider boundaries, retries, and source-grounded answers.' },
  { num: '03', title: 'Data that finds its way', text: 'PostgreSQL, vector search, stream processing, and caching. I care about how data moves, who can access it, and what happens when a step fails.' },
  { num: '04', title: 'The whole thing, thoughtfully', text: 'React and Next.js interfaces, Electron desktop experiences, and tests for the systems behind them. The interface and the infrastructure should make sense together.' },
]

export const experience = [
  {
    period: 'Jun – Jul 2026', role: 'Founding Backend Engineer', place: 'MindFlow',
    text: 'Built asynchronous desktop workflows coordinating hotkeys, audio capture, OCR, and accessibility APIs. Designed modular AI provider interfaces, IPC state management, validation, and retry flows; worked on credit transactions and webhook processing.',
  },
  {
    period: '2025 – 2026', role: 'Backend Engineer', place: 'Zipp',
    text: 'Built multi-source document ingestion with Inngest, text chunking, and batch embeddings. Developed retrieval with pgvector and source citations, alongside tenant isolation, usage metering, signed uploads, and subscription synchronization.',
  },
  {
    // Original portfolio supplies a start date; current status is unconfirmed.
    period: 'Started Apr 2025', role: 'Software Developer Intern', place: 'Behooked.co',
    text: 'Built tools that turn spoken words into timed captions, helping creators spend more time on their stories and less on the tools around them.',
  },
  {
    period: 'Jun – Jul 2025', role: 'Full-Stack Developer Intern', place: 'Digital Blinc',
    text: 'Worked on backend connections and data flows in a fast-moving development team.',
  },
]

export const skillGroups = [
  { label: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'C', 'C++'] },
  { label: 'Backend & Systems', items: ['Spring Boot', 'Apache Kafka', 'Node.js', 'REST APIs', 'WebSockets', 'Non-blocking I/O', 'Inngest'] },
  { label: 'Data & Storage', items: ['PostgreSQL', 'Redis', 'ClickHouse', 'Supabase', 'pgvector', 'Row-Level Security'] },
  { label: 'Frontend & Desktop', items: ['React', 'Next.js', 'Tailwind CSS', 'Electron', 'Streamlit'] },
  { label: 'AI & Retrieval', items: ['RAG', 'Vector search', 'scikit-learn', 'XGBoost', 'OpenAI', 'Anthropic', 'Gemini'] },
  { label: 'Testing & Tools', items: ['JUnit 5', 'Mockito', 'Testcontainers', 'Docker', 'Git', 'AWS EC2 & S3', 'Claude Code', 'GitHub Copilot'] },
]

export const current = {
  paragraphs: [
    'Building with AI. Thinking in systems. Shipping software I understand.',
    'Recent public work includes OneSearch, a visual fashion search platform, and FocusTube, a more intentional way to learn on YouTube.',
    'Continuing my B.Tech in Information Technology, with graduation expected in 2027.',
    'Open to conversations about software engineering roles and thoughtful collaborations.',
  ],
  updated: 'October 2026',
}

export type Project = {
  title: string
  subtitle: string
  tag: string
  description: string
  href?: string
  demo?: string
  role?: string
  problem?: string
  process?: string[]
  detail?: string
  tech: string[]
  aliases: string[]
}

export const projects: Project[] = [
  {
    title: 'MindFlow', subtitle: 'Your intent, with the context to answer', tag: 'Desktop · AI communication',
    description: 'Hold a shortcut, speak your intent, and get a reply shaped by what is on your screen. A floating overlay lets you edit, regenerate, copy, or insert it into the app you are using.',
    href: 'https://github.com/vinithwade/MindFlow', demo: 'https://mind-flow-silk.vercel.app',
    role: 'Founding Backend Engineer · Jun – Jul 2026',
    problem: 'Replying with AI usually means leaving the conversation, copying context, and explaining what you want.',
    process: ['Capture voice through a hold-to-talk shortcut.', 'Read selected text, accessibility content, or OCR as context.', 'Generate a reply through modular providers and insert it back into the source app.'],
    tech: ['Electron', 'React', 'TypeScript', 'Whisper / Deepgram', 'Claude / OpenAI'], aliases: ['mindflow', 'mind flow'],
  },
  {
    title: 'Zipp', subtitle: 'A study workspace grounded in your sources', tag: 'Web · AI learning',
    description: 'Turn PDFs, audio, YouTube links, and web pages into structured notes, flashcards, quizzes, and study plans. Ask a tutor questions grounded in the material you bring.',
    href: 'https://github.com/vinithwade/ZIPP', demo: 'https://zipp-pied.vercel.app', role: 'Backend Engineer · 2025 – 2026',
    problem: 'Study material is scattered across formats, while generic AI answers lack the context of your own sources.',
    process: ['Ingest, extract, chunk, and embed sources with retryable background jobs.', 'Retrieve relevant chunks with pgvector for source-grounded answers.', 'Support study tools with usage metering, tenant isolation, and subscription sync.'],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'pgvector', 'Inngest', 'Stripe'], aliases: ['zipp'],
  },
  {
    title: 'Transaction Monitoring Pipeline', subtitle: 'From event streams to rolling insights', tag: 'Backend · Distributed systems',
    description: 'A Java event-processing project for financial tick and transaction streams, combining rolling aggregations, anomaly flags, and separate stores for live metrics and historical analytics.',
    role: 'Project developer', problem: 'Streaming events need ordered processing and quick lookups without losing the history needed for analysis.',
    process: ['Partition Kafka streams by account and handle simulated backpressure.', 'Compute rolling volumes with atomic arrays and circular buffers.', 'Store hot metrics in Redis and history in ClickHouse; test broker restarts and rebalancing with Testcontainers.'],
    detail: 'Full project title in my resume: Real-Time Compliance & Transaction Monitoring Pipeline. Technical details are available in the downloadable resume; a public repository link is not listed.',
    tech: ['Java 21', 'Spring Boot', 'Apache Kafka', 'Redis', 'ClickHouse', 'JUnit 5', 'Testcontainers'], aliases: ['transaction', 'compliance', 'monitoring pipeline'],
  },
  {
    title: 'ICU Sepsis Prediction', subtitle: 'Exploring interpretable risk prediction', tag: 'Python · Educational ML',
    description: 'An educational Streamlit demonstration of sepsis risk prediction using synthetic patient data, with risk visualization and feature importance to make model output easier to inspect.',
    href: 'https://github.com/vinithwade/ICU-Sepsis-Prediction-System', role: 'Project developer',
    problem: 'A prediction is more useful to explore when its inputs and influential features are visible.',
    process: ['Generate synthetic patient records for the public demonstration.', 'Train a Random Forest classifier on physiological inputs.', 'Explore probability scores and feature importance in Streamlit.'],
    detail: 'Educational use only; this demonstration is not for clinical decisions. My resume separately lists research using GRU/LSTM temporal embeddings and XGBoost. That research description and its reported results are distinct from the linked public Random Forest demonstration.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Streamlit', 'Plotly'], aliases: ['sepsis', 'icu'],
  },
  {
    title: 'Stuff', subtitle: 'Give the build a little structure', tag: 'Desktop · Agent orchestration',
    description: 'A local-first Electron app that connects a GitHub repository to a gated software-building pipeline. AI agents work through a feature with checkpoints for the person directing it.',
    href: 'https://github.com/vinithwade/stuff', demo: 'https://stuff-landing-page.vercel.app',
    problem: 'A feature needs coordinated steps and review, rather than one long, unstructured agent session.',
    process: ['Connect a repository and describe a feature.', 'Coordinate agents through a gated pipeline.', 'Pause at checkpoints so the user can guide the work.'],
    tech: ['Electron', 'AI agents', 'GitHub integration'], aliases: ['stuff'],
  },
  {
    title: 'OneSearch', subtitle: 'Find the outfit behind the screenshot', tag: 'Web · Visual search',
    description: 'A visual fashion search platform that reads outfit screenshots, extracts garment attributes, and finds similar items across D2C brand inventories.',
    href: 'https://github.com/vinithwade/OneSearch',
    problem: 'An outfit screenshot rarely tells you where to find similar garments.',
    process: ['Extract structured garment attributes with Gemini Vision.', 'Create multimodal embeddings with CLIP.', 'Search brand inventories by vector similarity in Qdrant.'],
    tech: ['Next.js', 'FastAPI', 'Gemini', 'CLIP', 'Qdrant'], aliases: ['onesearch', 'one search', 'fashion'],
  },
  {
    title: 'FocusTube', subtitle: 'Start with a goal. Stay with the lesson.', tag: 'Extension · Intentional learning',
    description: 'A Chrome extension that asks what you want to learn, ranks relevant YouTube videos with local embeddings, and hides distractions while you watch.',
    href: 'https://github.com/vinithwade/FocusTube-',
    problem: 'YouTube browsing can pull attention away from the question you came to answer.',
    process: ['Capture a learning goal and discover candidate videos.', 'Rank videos using local embeddings, transcripts, and relevance signals.', 'Enable focus mode and a session whitelist for intentional watching.'],
    tech: ['TypeScript', 'Next.js', 'Chrome Manifest V3', 'Local embeddings'], aliases: ['focustube', 'focus tube'],
  },
  {
    title: 'C2E', subtitle: 'A private handoff from creator to editor', tag: 'Full-stack · Video collaboration',
    description: 'A video collaboration platform with creator and editor roles, private uploads, project folders, and a desktop connector for editing workflows.',
    href: 'https://github.com/vinithwade/C2E', demo: 'https://c2-e-olive.vercel.app',
    problem: 'Creators and editors need a clear way to share footage with controlled access.',
    process: ['Upload footage using signed S3 URLs.', 'Invite editors with scoped project access.', 'Connect files to DaVinci Resolve or Premiere Pro through Electron.'],
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'AWS S3', 'Electron'], aliases: ['c2e', 'creator to editor'],
  },
]

export const achievements = [
  { text: 'Research publication: “Early and Interpretable Prediction of Sepsis In ICU Using Hybrid GRU/LSTM Temporal Embeddings and XGBoost” — IC-SIT International Conference, 2026.' },
  { text: 'Google Cloud certifications in Generative AI and Large Language Models; HackerRank certified in Python and Problem Solving.' },
  { text: 'Solved 237+ LeetCode problems, building a steady practice in algorithms and problem solving.' },
  { text: 'Participated in Smart India Hackathon.' },
  { text: 'Selected for E-Cell Leadership among the top 25.' },
]
