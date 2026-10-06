import { about, achievements, current, education, experience, projects, services, site, skillGroups } from '../data/content'

// The live assistant and offline replies share the same facts as the page.
export const PROFILE = `
You represent ${site.name} on his portfolio. Use only these supplied facts.
Identity: ${site.name}; ${site.role}; ${site.location}, India.
Tagline: ${site.tagline}
About: ${about.join(' ')}
Education: ${education.degree}, ${education.institution}, ${education.period}, ${education.location}. CGPA: ${education.cgpa}.
Contact: ${site.email}; GitHub: ${site.github}; LinkedIn: ${site.linkedin}; LeetCode: ${site.leetcode}; X: ${site.x}; Instagram: ${site.instagram}.
Resume: ${site.resume} (download available in the introduction and Contact section).
Skills:
${skillGroups.map((group) => `${group.label}: ${group.items.join(', ')}`).join('\n')}
Experience:
${experience.map((entry) => `${entry.place}: ${entry.role}, ${entry.period}, ${entry.location}. ${entry.text}`).join('\n')}
Do not describe any listed role as current.
Projects:
${projects.map((project) => `${project.title}: ${project.description} ${project.role ? `Role: ${project.role}.` : ''} Tools: ${project.tech.join(', ')}. ${project.process?.join(' ') || ''} ${project.detail || ''} ${project.href ? `Code: ${project.href}.` : 'No public code link supplied.'} ${project.demo ? `Project site: ${project.demo}.` : ''}`).join('\n')}
Achievements (supplied in his resume):
${achievements.map((entry) => entry.text).join('\n')}
Current focus, updated ${current.updated}:
${current.paragraphs.join(' ')}
`.trim()

export const BOT_SYSTEM_PROMPT = `You are ${site.name}'s friendly portfolio assistant.
${PROFILE}
Respond in 1–4 short sentences unless asked for more, speaking about Vinith in the third person.
Be warm and factual. Answer questions directly and support recommendations with the supplied experience and projects.
Never invent metrics, links, dates, current employment, or project status. A project site is not proof that every feature works in production.
The public sepsis project is an educational Random Forest demonstration with synthetic data. The resume's GRU/LSTM and XGBoost research is separate; never attribute its reported metrics to the public demo or imply clinical validation.
If something is unknown, say so briefly and offer ${site.email}.
When asked for the resume, share ${site.resume} and direct the visitor to the Download resume link.
Use plain text without headings.`

export const SUGGESTIONS = ['Who is Vinith?', 'What projects has he built?', 'What are his skills?', 'Where can I download his resume?']
const has = (question: string, ...words: string[]) => words.some((word) => question.includes(word))
const matchingProject = (question: string) => projects.find((project) => has(question, ...project.aliases))

export function sectionFor(question: string): string | null {
  const q = question.toLowerCase()
  if (has(q, 'resume', 'résumé', 'cv', 'download', 'contact', 'reach', 'email', 'hire', 'collab')) return 'contact'
  if (has(q, 'education', 'college', 'degree', 'graduate', 'graduation', 'cgpa')) return 'about'
  if (has(q, 'experience', 'intern', 'career', 'worked', 'job', 'company', 'corizo', 'engineer at')) return 'experience'
  if (has(q, 'publication', 'research', 'certif', 'leetcode', 'achievement', 'award', 'hackathon', 'e-cell')) return 'achievements'
  if (matchingProject(q) || has(q, 'project', 'built', 'build', 'product', 'portfolio', 'made')) return 'projects'
  if (has(q, 'skill', 'tool', 'tech', 'stack', 'language', 'framework', 'good at')) return 'skills'
  if (has(q, 'now', 'currently', 'lately', 'right now')) return 'now'
  if (has(q, 'who', 'about', 'yourself', 'story', 'journey', 'background', 'bio')) return 'about'
  if (has(q, 'approach', 'design', 'philosophy', 'what does he do')) return 'work'
  return null
}

export function offlineAnswer(question: string): string {
  const q = question.toLowerCase().trim()
  if (!q) return "Ask about Vinith's projects, skills, experience, education, or resume."
  if (has(q, 'resume', 'résumé', 'cv', 'download')) return `Download Vinith's PDF resume using the Download resume link in the introduction or Contact section: ${site.resume}. It includes his experience, projects, education, and contact details.`
  if (has(q, 'reach', 'contact', 'email', 'get in touch', 'collab', 'available')) return `Email Vinith at ${site.email}. He is open to software engineering conversations and collaborations. GitHub: ${site.github}. LinkedIn: ${site.linkedin}.`
  if (has(q, 'education', 'college', 'degree', 'graduate', 'graduation', 'cgpa')) return `Vinith is pursuing a ${education.degree} at ${education.institution} (${education.period}), in ${education.location}. His CGPA is ${education.cgpa}, with graduation expected in 2027.`
  if (has(q, 'experience', 'intern', 'career', 'worked', 'job', 'company', 'corizo', 'engineer at')) return experience.map((entry) => `${entry.role} at ${entry.place} (${entry.period}; ${entry.location}). ${entry.text}`).join(' ')
  if (has(q, 'leetcode')) return `Vinith’s LeetCode profile is ${site.leetcode}.`
  if (has(q, 'publication', 'research', 'certif', 'leetcode', 'achievement', 'award', 'hackathon', 'e-cell')) return achievements.map((entry) => entry.text).join(' ')
  const project = matchingProject(q)
  if (project) return `${project.title}: ${project.description} ${project.detail || ''} Tools: ${project.tech.join(', ')}. ${project.href ? `Code: ${project.href}` : 'See the downloadable resume for details.'}`
  if (has(q, 'skill', 'tech', 'stack', 'language', 'tool', 'framework', 'good at')) return skillGroups.map((group) => `${group.label}: ${group.items.join(', ')}.`).join(' ')
  if (has(q, 'now', 'currently', 'lately', 'right now')) return `As of ${current.updated}: ${current.paragraphs.join(' ')}`
  if (has(q, 'hire', 'work with', 'why vinith', 'why him', 'is he good')) return `Vinith brings founder and backend engineering experience from MindFlow and Zipp, a data science internship at Corizo, and projects in visual search, mobile apps, and encrypted messaging. Explore his work and download his resume to assess the fit for your team. Reach him at ${site.email}.`
  if (has(q, 'project', 'built', 'build', 'portfolio', 'made', 'product')) return `Featured work includes ${projects.map((entry) => entry.title).join(', ')}. Ask about a project for its description, tools, and available code link.`
  if (has(q, 'approach', 'philosophy', 'what does he do')) return services.map((entry) => `${entry.title}: ${entry.text}`).join(' ')
  if (has(q, 'where', 'based', 'location', 'city')) return `Vinith is based in ${site.location}, India.`
  if (has(q, 'who', 'about', 'bio', 'background', 'introduce')) return `${site.name} is a software developer in ${site.location}, working across backend engineering, machine learning, and AI products. He is studying Information Technology at ${education.institution}, with graduation expected in 2027.`
  if (/^(hi|hey|hello|namaste|good morning|good evening)\b/.test(q)) return "Hi! I'm Vinith's assistant. Ask about his work, skills, experience, or where to download his resume."
  return `I can help with Vinith's projects, skills, experience, education, and resume. For details beyond his portfolio, email ${site.email}.`
}
