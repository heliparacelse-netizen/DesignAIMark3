'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, ChevronRight } from 'lucide-react'
import api from '@/lib/api'

interface Message { role: 'user' | 'assistant'; content: string }

const quickActions = [
  { id: 'furniture', label: 'Suggest furniture', color: '#6c47ff', prompt: 'Suggest specific furniture pieces for a living room with style, material, and approximate price range.' },
  { id: 'prompt', label: 'Improve my prompt', color: '#28c840', prompt: 'Help me write a better AI interior design prompt for Roomvera AI. Ask my preferences first.' },
  { id: 'style', label: 'Help choose a style', color: '#c9a84c', prompt: 'Help me choose the best interior design style for my home. Ask me a few questions.' },
]

export default function SidebarChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your Roomvera AI Assistant ✦\n\nI can help you choose styles, improve prompts, and give design advice. Try a quick action or ask me anything!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [tokenCost] = useState(15)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text?: string) => {
    const msg = text || input
    if (!msg.trim()) return
    setInput('')
    const newMessages = [...messages, { role: 'user' as const, content: msg }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const token = api.getToken()
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Please try again.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'AI temporarily waking up. Please try again in 30 seconds.' }])
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 380, background: '#111118', borderLeft: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', zIndex: 50, boxShadow: '-20px 0 60px rgba(0,0,0,0.4)' }}>
      <style>{'.dot{animation:dp 1.4s ease-in-out infinite}@keyframes dp{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}'}</style>

      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(201,168,76,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} color="#0a0a0f" />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#f5f5f0', fontSize: '0.95rem' }}>Roomvera AI</div>
            <div style={{ fontSize: '0.7rem', color: '#9999aa' }}>15 tokens per message</div>
          </div>
        </div>
        <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9999aa' }}><X size={15} /></button>
      </div>

      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #2a2a3a' }}>
        <div style={{ fontSize: '0.72rem', color: '#9999aa', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Actions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => sendMessage(a.prompt)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.8rem', borderRadius: 10, background: '#0a0a0f', border: '1px solid #2a2a3a', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = a.color + '50')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a3a')}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={13} color={a.color} />
              </div>
              <span style={{ color: '#f5f5f0', fontSize: '0.83rem', fontWeight: 500 }}>{a.label}</span>
              <ChevronRight size={13} color="#9999aa" style={{ marginLeft: 'auto' }} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '85%', padding: '0.65rem 0.9rem', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px', background: msg.role === 'user' ? 'linear-gradient(135deg,#c9a84c,#f0c96e)' : '#1a1a28', color: msg.role === 'user' ? '#0a0a0f' : '#f5f5f0', fontSize: '0.84rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '0.65rem 0.9rem', borderRadius: '4px 16px 16px 16px', background: '#1a1a28', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
              {[0,1,2].map(i => <div key={i} className="dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', animationDelay: i * 0.2 + 's' }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid #2a2a3a', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
          placeholder="Ask about interior design... (15 tokens)" rows={1}
          style={{ flex: 1, background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.6rem 0.85rem', color: '#f5f5f0', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', resize: 'none', lineHeight: 1.5 }} />
        <button onClick={() => sendMessage()} disabled={loading}
          style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading ? 0.5 : 1, flexShrink: 0 }}>
          <Send size={16} color="#0a0a0f" />
        </button>
      </div>
    </div>
  )
}
