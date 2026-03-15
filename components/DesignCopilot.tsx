'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

const suggestions = [
  'What style suits a small living room?',
  'Suggest a prompt for Japandi bedroom',
  'Best colors for a modern kitchen?',
  'How to make a room look bigger?',
]

export default function DesignCopilot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your Design Copilot ✦ Ask me anything about interior design, styles, or how to use the studio.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text?: string) => {
    const msg = text || input
    if (!msg.trim()) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Please try again.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Add OPENAI_API_KEY to Vercel env vars to enable AI chat.' }])
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`@keyframes pulse{0%,80%,100%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}`}</style>
      <button onClick={() => setOpen(true)} style={{ position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(201,168,76,0.4)', zIndex: 100, transition: 'transform 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
        <MessageCircle size={24} color="#0a0a0f" />
      </button>
      {open && (
        <div style={{ position: 'fixed', bottom: 90, right: 24, width: 360, height: 500, background: '#111118', border: '1px solid #2a2a3a', borderRadius: 20, display: 'flex', flexDirection: 'column', zIndex: 101, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(201,168,76,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#0a0a0f" /></div>
              <div>
                <div style={{ fontWeight: 700, color: '#f5f5f0', fontSize: '0.9rem' }}>Design Copilot</div>
                <div style={{ fontSize: '0.7rem', color: '#28c840' }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ width: 28, height: 28, borderRadius: '50%', background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9999aa' }}><X size={14} /></button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '0.65rem 0.9rem', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.role === 'user' ? 'linear-gradient(135deg,#c9a84c,#f0c96e)' : '#1a1a24', color: msg.role === 'user' ? '#0a0a0f' : '#f5f5f0', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: msg.role === 'user' ? 500 : 400 }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.65rem 0.9rem', borderRadius: '16px 16px 16px 4px', background: '#1a1a24', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', animation: `pulse 1.4s ease-in-out ${i*0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {messages.length === 1 && (
            <div style={{ padding: '0 1rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => sendMessage(s)} style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem', borderRadius: '9999px', background: '#2a2a3a', border: '1px solid #3a3a4a', color: '#9999aa', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                  onMouseEnter={e => { (e.currentTarget.style.borderColor = '#c9a84c50'); (e.currentTarget.style.color = '#c9a84c') }}
                  onMouseLeave={e => { (e.currentTarget.style.borderColor = '#3a3a4a'); (e.currentTarget.style.color = '#9999aa') }}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #2a2a3a', display: 'flex', gap: '0.5rem' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage() } }}
              placeholder="Ask about interior design..." style={{ flex: 1, background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.6rem 0.85rem', color: '#f5f5f0', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }} />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading || !input.trim() ? 0.5 : 1 }}>
              <Send size={16} color="#0a0a0f" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
