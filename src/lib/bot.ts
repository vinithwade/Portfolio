/**
 * Knowledge base + offline fallback brain for the portfolio chatbot.
 *
 * This file is intentionally self-contained (no imports) so the Vercel
 * serverless function `api/chat.ts` can import it without pulling in any
 * browser/React dependencies.
 *
 * - PROFILE / BOT_SYSTEM_PROMPT  → given to Claude on the server (real AI mode).
 * - offlineAnswer()              → keyword-matched replies used when no API key
 *                                  is configured (works locally, fully free).
 */

export const PROFILE = `
You represent Vinith Wade through a chat widget on his personal portfolio site.
Visitors ask questions to get to know him. Answer ONLY using the facts below.

# Identity
- Name: Vinith Wade
- Tagline: "I trace sparks into constellations."
- Role: Software developer & designer — full-stack engineering, UI/UX, and AI-powered products.
- Location: Hyderabad, Telangana, India.
- Started coding at sixteen and has been building ever since.
- Philosophy: builds things that are useful and kind; cares about how software feels in someone's hands, not polish for its own sake.

# Contact & links
- Email: wadevinith6@gmail.com
- GitHub: https://github.com/vinithwade
- LinkedIn: https://www.linkedin.com/in/vinithwade/
- X (Twitter): https://x.com/Vinith_04
- Instagram: https://www.instagram.com/vinith_wade/
- He is open to a few careful collaborations.

# Skills
- Languages: Python, JavaScript, TypeScript, Java, C, SQL
- Frontend: React, Tailwind CSS, Framer Motion
- Backend & Data: Node.js, Express, Supabase, MongoDB, MySQL
- AI & Tools: Claude, OpenAI, LangChain, PyTorch, Git, Figma, Docker

# Experience
- Software Developer Intern at Behooked.co (Apr 2025 – Present): built tools that turn spoken words into beautifully timed captions across the different ways people watch video, helping storytellers spend less time wrestling with tools.
- Full-Stack Developer Intern at Digital Blinc (Jun – Jul 2025): worked on a fast-moving team tuning the backend connections between people and their data so nothing stumbled.

# Projects
- MindFlow (Solo project, 2026): a quiet voice companion — you speak your intent, it takes in what's on your screen, and returns a reply that sounds like it came from you.
- Stuff (Founder, 2026 – Present): a gentle guide that turns big, messy ideas into real things — it sketches, plans, and builds, pausing so you decide what comes next.
- Personal Driver Booking (Founder, 2026): book a trusted driver by the hour so you keep your own car and your own time instead of losing evenings to traffic.
- CTRL (Product, 2025): shape what you imagine with your hands and watch it become something real and usable across every screen. Live at https://ctrl-mvp.vercel.app
- Lexora (Product, 2025): a twice-a-day accountability companion — you speak your intention, then return to mark how it went. Code: https://github.com/vinithwade/Lexora

# Achievements
- Selected as one of only twenty-five people in a four-year circle of builders who believe ideas deserve to become real things.
- An active hackathon builder who shows up with questions and ships something meaningful by morning.
- Enjoys untangling problems one careful step at a time.

# Right now
- Actively building CTRL. Reading the book "Hooked". Exploring new kinds of work after years with familiar ones. Based in Hyderabad, 2026.
`.trim()

export const BOT_SYSTEM_PROMPT = `You are Vinith Wade's friendly portfolio assistant. A visitor is chatting with you on his website to learn about him.

${PROFILE}

# Personality & how to respond
- Your vibe: warm, upbeat, and a little witty — genuinely enthusiastic about Vinith. Tasteful light humor and the odd emoji are welcome; never rude, negative, or dismissive about him.
- Be concise: 1–4 short sentences unless asked for more. Speak about Vinith in the third person ("Vinith has...", "he built...").
- Always stay positive and encouraging about Vinith. If asked whether to hire him, work with him, or whether he's any good — answer with an enthusiastic YES and back it with real reasons from the facts (his shipped projects, his skills, his internships, the 25-person builders' circle).
- Answer real questions about him directly using the facts. Do NOT deflect with "ask me about his projects/skills" — only steer back if the question is genuinely unrelated to Vinith.
- If a specific detail truly isn't in the facts, say so briefly and warmly, then point them to his email (wadevinith6@gmail.com). Never invent facts, dates, or projects.
- You may share his links when relevant. Plain friendly text — no markdown headings.`

/** Suggested questions shown when the chat is empty. */
export const SUGGESTIONS = [
  'Who is Vinith?',
  'What projects has he built?',
  'What are his skills?',
  'How can I reach him?',
]

const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w))

/**
 * Map a question to the portfolio section it's about, so the page can scroll
 * there while the bot answers. Returns a section `id` (see the sections in
 * App.tsx) or null if nothing matches. Works in both AI and offline modes.
 */
export function sectionFor(question: string): string | null {
  const q = question.toLowerCase()
  if (has(q, 'skill', 'tool', 'tech', 'stack', 'language', 'framework', 'good at')) return 'skills'
  if (has(q, 'project', 'built', 'build', 'mindflow', 'ctrl', 'lexora', 'stuff', 'driver', 'product', 'portfolio', 'made')) return 'projects'
  if (has(q, 'experience', 'intern', 'job', 'behooked', 'digital blinc', 'company', 'worked', 'career')) return 'experience'
  if (has(q, 'achieve', 'award', 'hackathon', 'accomplish', 'recognition', 'spark')) return 'achievements'
  if (has(q, 'contact', 'reach', 'email', 'hire', 'connect', 'get in touch', 'collab', 'available')) return 'contact'
  if (has(q, 'now', 'currently', 'these days', 'lately', 'right now')) return 'now'
  if (has(q, 'who', 'about', 'yourself', 'story', 'journey', 'background', 'bio')) return 'about'
  if (has(q, 'do', 'approach', 'design', 'reach for', 'philosophy')) return 'work'
  return null
}

/**
 * Offline keyword-matched responder. Used when the AI backend isn't available
 * (e.g. running locally with no API key). Keeps the widget useful for free.
 */
export function offlineAnswer(question: string): string {
  const q = question.toLowerCase().trim()

  if (!q) return "Ask me anything about Vinith — his projects, skills, experience, or whether you should hire him (spoiler: you should 😄)."

  // Greeting only when the message really is a greeting (so 'hire' won't match 'hi').
  if (/^(hi|hey|hello|yo|hola|sup|namaste|good (morning|afternoon|evening))\b/.test(q))
    return "Hey there! 👋 I'm Vinith's assistant. Ask me about his projects, skills, experience — or whether you should hire him."

  // Should I hire / work with / is he any good → always an enthusiastic yes.
  if (has(q, 'hire', 'should i', 'work with', 'worth', 'recommend', 'is he good', 'any good', 'why vinith', 'why him', 'trust him'))
    return "Absolutely — yes! 🚀 Vinith ships real products (MindFlow, CTRL, Lexora and more), works as a developer intern at Behooked.co, and was picked as one of just 25 in a four-year builders' circle. He's full-stack, design-minded, quick in a hackathon, and genuinely kind to build with. Grab him at wadevinith6@gmail.com before someone else does."

  if (has(q, 'reach', 'contact', 'email', 'available', 'get in touch', 'collab', 'connect'))
    return "Easy — email him at wadevinith6@gmail.com 📬. He's open to a few careful collaborations, and you'll also find him on GitHub (github.com/vinithwade), LinkedIn (linkedin.com/in/vinithwade), and X (@Vinith_04)."

  if (has(q, 'project', 'built', 'build', 'portfolio', 'made', 'work on', 'products'))
    return "Vinith has built MindFlow (a voice companion), Stuff (a guided idea-to-product builder), a Personal Driver Booking app, CTRL (turn ideas into real things across screens — ctrl-mvp.vercel.app), and Lexora (a twice-daily accountability companion). Ask about any one of them!"

  if (has(q, 'mindflow'))
    return "MindFlow (2026, solo) is a quiet voice companion: you speak your intent, it reads what's on your screen, and returns a reply that sounds like it came from you."
  if (has(q, 'stuff'))
    return "Stuff (2026, Vinith is the founder) is a gentle guide that turns big, messy ideas into real things — it sketches, plans, and builds, pausing so you decide what comes next."
  if (has(q, 'ctrl'))
    return "CTRL (2025) lets you shape what you imagine with your hands and watch it become something real across every screen. It's live at ctrl-mvp.vercel.app."
  if (has(q, 'lexora'))
    return "Lexora (2025) is a twice-a-day accountability companion: you speak your intention, then return to mark how it went. Code: github.com/vinithwade/Lexora."
  if (has(q, 'driver', 'booking'))
    return "Personal Driver Booking (2026, founder) lets you book a trusted driver by the hour — you keep your own car and your own time instead of losing evenings to traffic."

  if (has(q, 'skill', 'tech', 'stack', 'language', 'tool', 'framework', 'know how', 'good at'))
    return "Vinith works with Python, JavaScript, TypeScript, Java, C and SQL; React, Tailwind and Framer Motion on the frontend; Node, Express, Supabase, MongoDB and MySQL on the backend; and Claude, OpenAI, LangChain, PyTorch, Git, Figma and Docker for AI and tooling."

  if (has(q, 'experience', 'intern', 'job', 'behooked', 'digital blinc', 'company', 'worked'))
    return "Vinith is a Software Developer Intern at Behooked.co (Apr 2025 – present), where he builds tools that turn speech into beautifully timed captions. Before that he was a Full-Stack Developer Intern at Digital Blinc (Jun–Jul 2025)."

  if (has(q, 'achieve', 'award', 'hackathon', 'accomplish'))
    return "Vinith was chosen as one of only 25 in a four-year circle of builders, and he's an active hackathon builder who ships something meaningful by morning."

  if (has(q, 'location', 'where', 'based', 'live', 'city', 'country'))
    return "Vinith is based in Hyderabad, Telangana, India."

  if (has(q, 'now', 'currently', 'these days', 'lately'))
    return "Right now Vinith is building CTRL, reading the book “Hooked”, and staying open to a few careful collaborations."

  if (has(q, 'who', 'about', 'yourself', 'tell me', 'introduce'))
    return "Vinith Wade is a software developer and designer from Hyderabad who works across full-stack engineering, UI/UX, and AI products. He started coding at sixteen and builds things that are useful and kind — “I trace sparks into constellations.”"

  return "Happy to help! 😊 I can tell you about Vinith's projects, skills, experience, achievements, or how to reach him — what would you like to know? (Or email him directly at wadevinith6@gmail.com.)"
}
