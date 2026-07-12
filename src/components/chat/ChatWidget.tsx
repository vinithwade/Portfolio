import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { SUGGESTIONS, offlineAnswer, sectionFor } from '../../lib/bot'

type Msg = { role: 'user' | 'assistant'; content: string }

const easeOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

/** Smoothly scroll the page to a section by id (uses Lenis when available). */
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(el, { duration: 1.1, easing: easeOut })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function ChatWidget() {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const [hint, setHint] = useState(false)
  const controls = useAnimationControls()

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const openRef = useRef(false)

  useEffect(() => {
    openRef.current = open
  }, [open])

  // Attention-getter on load: give the launcher a little wiggle after a beat,
  // then pop an introductory tooltip after 2s (unless the user already opened it).
  useEffect(() => {
    const timers: number[] = []
    if (!reduceMotion) {
      timers.push(
        window.setTimeout(() => {
          void controls.start({ rotate: [0, -14, 11, -8, 5, 0], transition: { duration: 0.75, ease: 'easeInOut' } })
        }, 900),
      )
    }
    timers.push(
      window.setTimeout(() => {
        if (openRef.current) return
        setHint(true)
        if (!reduceMotion) {
          void controls.start({ scale: [1, 1.12, 1], transition: { duration: 0.4, ease: 'easeInOut' } })
        }
      }, 2000),
    )
    return () => timers.forEach((t) => clearTimeout(t))
  }, [reduceMotion, controls])

  // Opening the chat dismisses the intro tooltip.
  useEffect(() => {
    if (open) setHint(false)
  }, [open])

  // Keep the transcript scrolled to the newest message.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading, open])

  // Shift the page content left (on desktop) so it isn't hidden behind the
  // sidebar — mirrors how <main> already reserves space for the left navbar.
  useEffect(() => {
    document.documentElement.classList.toggle('chat-open', open)
    return () => document.documentElement.classList.remove('chat-open')
  }, [open])

  // Focus the input when the panel opens; Esc closes it.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function ask(text: string) {
    const question = text.trim()
    if (!question || loading) return

    const nextMessages: Msg[] = [...messages, { role: 'user', content: question }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    let reply = ''
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      // Only trust a real JSON reply from the AI backend; otherwise fall back.
      const data = res.ok ? await res.json().catch(() => null) : null
      reply = data && typeof data.reply === 'string' ? data.reply : ''
    } catch {
      reply = ''
    }

    // No backend / no API key configured → use the free offline responder.
    if (!reply) reply = offlineAnswer(question)

    setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    setLoading(false)

    // Navigate the page to the section the question is about.
    const section = sectionFor(question)
    if (section) setTimeout(() => scrollToSection(section), 260)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void ask(input)
  }

  return (
    <>
      {/* Floating launcher button (bottom-right) */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Ask about Vinith'}
        className="fixed right-5 top-20 lg:right-6 lg:top-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-[0_6px_24px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        animate={controls}
        whileHover={reduceMotion ? {} : { scale: 1.05 }}
        whileTap={reduceMotion ? {} : { scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <SparkIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Intro tooltip — a little "holding board" that pops after 2s */}
      <AnimatePresence>
        {hint && !open && (
          <motion.div
            key="hint"
            role="status"
            onClick={() => {
              setHint(false)
              setOpen(true)
            }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-[5.5rem] top-20 lg:right-[5.75rem] lg:top-6 z-[80] max-w-[15.5rem] cursor-pointer rounded-2xl border border-black/12 bg-white px-4 py-3 shadow-[0_12px_38px_rgba(0,0,0,0.18)]"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setHint(false)
              }}
              aria-label="Dismiss"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-black/12 bg-white text-[11px] text-black/50 shadow-sm hover:text-black"
            >
              ✕
            </button>
            <div className="text-[13px] font-semibold leading-snug">Hi, I'm Vinith's personal AI agent 👋</div>
            <div className="mt-1 text-[12.5px] leading-snug text-black/60">Click me — I'll tell you all about Vinith.</div>
            {/* tail pointing toward the button */}
            <div className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-black/12 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Chat with Vinith's assistant"
            className="chat-panel fixed top-0 right-0 z-[80] h-full w-full sm:w-[400px] flex flex-col bg-white border-l border-black/10 shadow-[-16px_0_50px_rgba(0,0,0,0.10)]"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
            initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4">
              <img src="/me.jpg" alt="Vinith Wade" className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-tight">Ask about Vinith</div>
                <div className="font-mono text-[10px] tracking-[0.12em] text-black/45">AI ASSISTANT</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-md p-1 text-black/50 hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-black/[0.06] px-3.5 py-2.5 text-[14px] leading-relaxed">
                    Hi! I'm Vinith's assistant. Ask me anything about his work, skills, projects, or how to reach him.
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void ask(s)}
                        className="rounded-full border border-black/15 px-3 py-1.5 text-[12.5px] text-black/70 transition hover:border-black/40 hover:text-black"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-black px-3.5 py-2.5 text-[14px] leading-relaxed text-white'
                        : 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-black/[0.06] px-3.5 py-2.5 text-[14px] leading-relaxed text-black'
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-black/[0.06] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/40"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-black/10 px-4 py-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Vinith…"
                aria-label="Type your question"
                className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-[14px] outline-none placeholder:text-black/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition disabled:opacity-30"
              >
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// A radiant "spark" starburst — an AI-agent mark that reads at a glance.
function SparkIcon() {
  const cx = 12
  const cy = 12
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6 // 30° apart
    const inner = 1.6
    const outer = i % 2 === 0 ? 8.8 : 6
    return {
      x1: cx + Math.cos(a) * inner,
      y1: cy + Math.sin(a) * inner,
      x2: cx + Math.cos(a) * outer,
      y2: cy + Math.sin(a) * outer,
    }
  })
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
      ))}
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
