// Shared facts for the page and assistant. No browser or UI dependencies.
export const site = {
  name: 'Vinith Wade',
  role: 'Software developer · Backend & AI',
  tagline: 'I trace sparks into constellations.',
  email: 'wadevinith01@gmail.com',
  location: 'Hyderabad, Telangana',
  linkedin: 'https://www.linkedin.com/in/vinithwade/',
  github: 'https://github.com/vinithwade',
  leetcode: 'https://leetcode.com/u/vinith_wade/',
  x: 'https://x.com/Vinith_04',
  instagram: 'https://www.instagram.com/vinith_wade/',
  photo: '/me.jpg',
  resume: '/VinithWade_SDE.pdf',
  resumeFilename: 'Vinith_Wade_Resume.pdf',
}

export const introduction = {
  headline: 'Thoughtful software. Solid foundations.',
  paragraphs: [
    'I build software with AI, think in systems, and care about the details that make a product useful. My work spans backend engineering, machine learning, and applications that fit naturally into everyday life.',
    'From context-aware desktop assistants and source-grounded study tools to visual search and movie discovery, I turn complex workflows into something people can actually use.',
  ],
}

export const about = [
  'I am a software developer based in Hyderabad, studying Information Technology at Vardhaman College of Engineering. I like understanding how a system works all the way down, then making its surface feel simple.',
  'My work brings together Python backends, TypeScript applications, and AI. As a founder and backend engineer at MindFlow and Zipp, I built context-aware assistant and retrieval pipelines. My data science internship at Corizo added hands-on work in data preparation, exploratory analysis, and machine learning.',
  'I care about clear boundaries, reliable data flows, and software that earns trust through how it behaves. Building with AI is part of my process; understanding what I ship is the point.',
]

export const education = {
  institution: 'Vardhaman College of Engineering',
  degree: 'B.Tech in Information Technology',
  period: '2023 – 2027',
  location: 'Hyderabad, India',
  cgpa: '7.5',
}

export const navLinks = [
  { label: 'Overview', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Expertise', href: '#work' },
  { label: 'About & Education', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Current Focus', href: '#now' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  { num: '01', title: 'Backend engineering', text: 'Backend services, REST APIs, and asynchronous workflows. I work with Python, FastAPI, Flask, and Node.js to connect the pieces behind a product.' },
  { num: '02', title: 'AI integration & retrieval', text: 'Voice, screen context, document ingestion, and retrieval. I build around a clear task, with provider boundaries, retries, and source-grounded answers.' },
  { num: '03', title: 'Data & machine learning', text: 'Data preparation, exploratory analysis, model development, and vector search. I work with Pandas, scikit-learn, XGBoost, PostgreSQL, and Qdrant to make data useful and model outputs understandable.' },
  { num: '04', title: 'Web, mobile & desktop development', text: 'Next.js interfaces, React Native mobile apps, and Electron desktop experiences. I build around real workflows, from movie discovery and watchlists to AI replies inside the app you are using.' },
]

export const experience = [
  {
    period: 'Jun – Jul 2026', role: 'Founder / Founding Backend Engineer', place: 'MindFlow', location: 'Hyderabad, India',
    text: 'Built the backend for a desktop AI assistant that captures audio, OCR, and screen context, generates responses, and inserts them into the active application, with response times under 450 ms. Integrated OpenAI, Deepgram, and Anthropic APIs, with Supabase/PostgreSQL for user data, credit tracking, row-level access control, and webhook handling.',
  },
  {
    period: '2025 – 2026', role: 'Founder / Backend Engineer', place: 'Zipp', location: 'Hyderabad, India',
    text: 'Built a document ingestion pipeline for PDFs, audio, and web pages, with chunking, embeddings, and semantic search. Developed the RAG backend using pgvector, with source citations, multi-user data isolation, usage tracking, signed uploads, and Stripe subscription handling.',
  },
  {
    period: 'Dec 2025 – Feb 2026', role: 'Data Science Intern', place: 'Corizo Edutech Private Limited', location: 'Remote',
    text: 'Worked on data preprocessing, exploratory data analysis, and machine learning model development on real-world datasets using Python, Pandas, NumPy, Matplotlib, and scikit-learn.',
  },
]

export const skillGroups = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'SQL'] },
  { label: 'Backend & APIs', items: ['Node.js', 'FastAPI', 'Flask', 'REST APIs', 'Inngest'] },
  { label: 'Databases & Cloud', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Qdrant', 'Supabase', 'pgvector', 'AWS', 'GCP'] },
  { label: 'Web, Mobile & Desktop', items: ['Next.js', 'React', 'React Native', 'Expo', 'Zustand', 'Electron', 'Streamlit'] },
  { label: 'AI & Machine Learning', items: ['scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib', 'RAG', 'CLIP', 'Gemini Vision'] },
  { label: 'Tools & Integrations', items: ['Docker', 'Git', 'GitHub', 'Postman', 'OpenAI', 'Anthropic', 'Deepgram', 'Stripe'] },
]

export const current = {
  paragraphs: [
    'Building with AI. Thinking in systems. Shipping software I understand.',
    'Recent work includes OneSearch for visual fashion search, Dekho for personalized movie discovery, and CipherMail for encrypted messaging.',
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
    role: 'Founder / Founding Backend Engineer · Jun – Jul 2026',
    problem: 'Replying with AI usually means leaving the conversation, copying context, and explaining what you want.',
    process: ['Capture voice through a hold-to-talk shortcut.', 'Read selected text, accessibility content, or OCR as context.', 'Generate a reply through modular providers and insert it back into the source app.'],
    tech: ['Electron', 'React', 'TypeScript', 'OpenAI', 'Deepgram', 'Anthropic', 'Supabase', 'PostgreSQL'], aliases: ['mindflow', 'mind flow'],
  },
  {
    title: 'Zipp', subtitle: 'A study workspace grounded in your sources', tag: 'Web · AI learning',
    description: 'Turn PDFs, audio, YouTube links, and web pages into structured notes, flashcards, quizzes, and study plans. Ask a tutor questions grounded in the material you bring.',
    href: 'https://github.com/vinithwade/ZIPP', demo: 'https://zipp-pied.vercel.app', role: 'Founder / Backend Engineer · 2025 – 2026',
    problem: 'Study material is scattered across formats, while generic AI answers lack the context of your own sources.',
    process: ['Ingest, extract, chunk, and embed sources with retryable background jobs.', 'Retrieve relevant chunks with pgvector for source-grounded answers.', 'Support study tools with usage metering, tenant isolation, and subscription sync.'],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'pgvector', 'Inngest', 'Stripe'], aliases: ['zipp'],
  },
  {
    title: 'ICU Sepsis Prediction', subtitle: 'Exploring interpretable risk prediction', tag: 'Python · Educational ML',
    description: 'An educational Streamlit demonstration of sepsis risk prediction using synthetic patient data, with risk visualization and feature importance to make model output easier to inspect.',
    href: 'https://github.com/vinithwade/ICU-Sepsis-Prediction-System', role: 'Project developer',
    problem: 'A prediction is more useful to explore when its inputs and influential features are visible.',
    process: ['Generate synthetic patient records for the public demonstration.', 'Train a Random Forest classifier on physiological inputs.', 'Explore probability scores and feature importance in Streamlit.'],
    detail: 'My resume separately describes GRU/LSTM temporal representations with XGBoost across 16 physiological parameters: 78% accuracy and 0.85 ROC-AUC, with SMOTE on 30,000 medical records improving recall from 55% to 75%. These reported research results are distinct from the linked public Random Forest demonstration, which uses synthetic data and is for educational use only.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Streamlit', 'Plotly'], aliases: ['sepsis', 'icu'],
  },
  {
    title: 'OneSearch', subtitle: 'Find the outfit behind the screenshot', tag: 'Web · Visual search',
    description: 'A visual fashion search platform that reads outfit screenshots, extracts garment attributes, and finds similar items across D2C brand inventories.',
    href: 'https://github.com/vinithwade/OneSearch',
    problem: 'An outfit screenshot rarely tells you where to find similar garments.',
    process: ['Extract garment category, cut, color, fabric, and style with Gemini Vision.', 'Crawl, deduplicate, embed, and index D2C fashion catalogs using CLIP.', 'Search with Qdrant vector similarity and category, stock, and price filters.'],
    tech: ['Next.js', 'FastAPI', 'Gemini Vision', 'CLIP', 'Qdrant'], aliases: ['onesearch', 'one search', 'fashion'],
  },
  {
    title: 'Dekho', subtitle: 'Swipe toward your next movie', tag: 'Mobile · Movie discovery',
    description: 'A swipe-based movie discovery app that personalizes recommendations from likes, skips, genre and language preferences, and trailer views. Find trending and recent movies with Indian OTT availability.',
    href: 'https://github.com/vinithwade/Dekho', role: 'Project developer',
    problem: 'Choosing what to watch takes more than scrolling through a generic movie catalog.',
    process: ['Use TMDB APIs to discover trending and recent movies and Indian streaming availability.', 'Rank recommendations using swipe feedback, preferences, and trailer views.', 'Persist watchlists and viewed-title history, support undoable swipes, and prefetch recommendations in the background.'],
    tech: ['React Native', 'TypeScript', 'Expo', 'Zustand', 'TMDB API'], aliases: ['dekho', 'movie discovery'],
  },
  {
    title: 'CipherMail', subtitle: 'Messages encrypted for their recipient', tag: 'Web · Encrypted messaging',
    description: 'A messaging application using PGP encryption and digital signatures, with 2048-bit RSA key pairs. Message bodies stay encrypted in SQLite and are decrypted using the recipient’s passphrase-protected private key.',
    href: 'https://github.com/vinithwade/CipherMail', role: 'Project developer',
    problem: 'Stored message content should be protected, with a way to verify who signed a message.',
    process: ['Generate RSA key pairs and encrypt messages for the recipient’s public key using PGPy.', 'Use AES-256 encryption and SHA-256 for message signing and signature verification.', 'Store encrypted message bodies in SQLite and decrypt with a passphrase-protected private key.'],
    tech: ['Python', 'Flask', 'PGPy', 'SQLite', 'HTML', 'CSS'], aliases: ['ciphermail', 'cipher mail', 'encrypted messaging'],
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
  { text: 'Participated in Smart India Hackathon.' },
  { text: 'Selected for E-Cell Leadership among the top 25.' },
]
