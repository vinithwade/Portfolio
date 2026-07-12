/**
 * Vercel serverless function — the portfolio chatbot's "brain" (OpenAI / ChatGPT).
 *
 * Runs ONLY on the server, so the OpenAI API key is never exposed to the
 * browser. Set OPENAI_API_KEY in your Vercel project (Settings → Environment
 * Variables). Optionally set CHAT_MODEL to override the default model.
 *
 * If no key is configured it returns 501, and the frontend automatically falls
 * back to the free offline responder in src/lib/bot.ts — so the site keeps
 * working with zero setup and zero cost until you decide to turn on real AI.
 */
import OpenAI from 'openai'
import { BOT_SYSTEM_PROMPT } from '../src/lib/bot'

// Default to gpt-4o-mini — fast and inexpensive, ideal for a portfolio Q&A bot.
// Override with CHAT_MODEL=gpt-4o (or another model) if you want.
const MODEL = process.env.CHAT_MODEL || 'gpt-4o-mini'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

// Minimal request/response shapes (avoids a hard dependency on @vercel/node types).
interface Req {
  method?: string
  body?: unknown
}
interface Res {
  status: (code: number) => Res
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    // No key configured — tell the client to use its offline fallback.
    res.status(501).json({ error: 'no_key' })
    return
  }

  // Parse body (Vercel usually parses JSON, but guard for string bodies too).
  let body: { messages?: unknown }
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body as { messages?: unknown }) || {}
  } catch {
    res.status(400).json({ error: 'bad_json' })
    return
  }

  const raw = Array.isArray(body.messages) ? (body.messages as ChatMessage[]) : []
  const messages: ChatMessage[] = raw
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-12) // keep the conversation bounded

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    res.status(400).json({ error: 'no_user_message' })
    return
  }

  try {
    const client = new OpenAI({ apiKey })
    const completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'system', content: BOT_SYSTEM_PROMPT }, ...messages],
    })

    const reply = (completion.choices[0]?.message?.content || '').trim()

    res.status(200).json({ reply: reply || "Sorry — I didn't catch that. Try asking about Vinith's projects or skills." })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown_error'
    res.status(500).json({ error: 'api_error', message })
  }
}
