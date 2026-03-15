'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, Sparkles, Upload, Sofa, Wand2, ChevronRight, Image as ImageIcon } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string; image?: string }

const quickActions = [
  { id: 'analyze', icon: 'ImageIcon', label: 'Analyze my room', color: '#c9a84c', prompt: 'Analyze this room: 1) Current style 2) Main issues 3) Top 3 improvements' },
  { id: 'furniture', icon: 'Sofa', label: 'Suggest furniture', color: '#6c47ff', prompt: 'Suggest specific furniture: style, material, price range, where to buy.' },
  { id: 'prompt', icon: 'Wand2', label: 'Improve my prompt', color: '#28c840', prompt: 'Help me write a better AI interior design prompt. Ask about my preferences first.' },
]

const suggestions = [
  'Best colors for a small bedroom?',
  'How to mix modern and vintage?',
  'Lighting tips for home office?',
  'Japandi vs Scandinavian?',
]

export default function SidebarChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your Lumara AI Assistant ✦\n\nI can analyze your room, suggest furniture, and help craft perfect prompts. Try a quick action or ask me anything!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text?: string, image?: string) => {
    const msg = text || input
    if (!msg.trim() && !image) return
    setInput('')
    const imgToSend = image || uploadedImage || undefined
    const newMsg: Message = { role: 'user', content: msg, image: imgToSend }
    const newMessages = [...messages, newMsg]
    setMessages(newMessages)
    setUploadedImage(null)
    setLoading(true)
    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.image ? '[Image attached] ' + m.content : m.content })) })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Please try again.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Add OPENAI_API_KEY to Vercel env vars to enable AI chat.' }])
    }
    setLoading(false)
    setActiveAction(null)
  }

  const handleAction = (action: typeof quickActions[0]) => {
    setActiveAction(action.id)
    if (action.id === 'analyze') { fileInputRef.current?.click() }
    else { sendMessage(action.prompt) }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = e.target?.result as string
      setUploadedImage(img)
      sendMessage('Please analyze this room photo and give detailed design recommendations.', img)
    }
    reader.readAsDataURL(file)
  }

  if (!isOpen) return null

  const iconMap: any = { ImageIcon, Sofa, Wand2 }

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 380, background: '#111118', borderLeft: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', zIndex: 50, boxShadow: '-20px 0 60px rgba(0,0,0,0.4)' }}>
      <style>{'.dot-pulse{animation:pulse 1.4s ease-in-out infinite} @keyframes pulse{0%,80%,100%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}'}</style>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(201,168,76,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} color="#0a0a0f" />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#f5f5f0', fontSize: '0.95rem' }}>Lumara AI</div>
            <div style={{ fontSize: '0.7rem', color: '#28c840', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />Online
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9999aa' }}><X size={15} /></button>
      </div>

      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #2a2a3a' }}>
        <div style={{ fontSize: '0.72rem', color: '#9999aa', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Actions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {quickActions.map(action => {
            const Icon = iconMap[action.icon]
            return (
              <button key={action.id} onClick={() => handleAction(action)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.8rem', borderRadius: 10, background: activeAction === action.id ? action.color + '18' : '#0a0a0f', border: '1px solid ' + (activeAction === action.id ? action.color + '50' : '#2a2a3a'), cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'left' }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: action.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {Icon && <Icon size={14} color={action.color} />}
                </div>
                <span style={{ color: '#f5f5f0', fontSize: '0.83rem', fontWeight: 500 }}>{action.label}</span>
                <ChevronRight size={13} color="#9999aa" style={{ marginLeft: 'auto' }} />
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '85%' }}>
              {msg.image && <img src={msg.image} alt="room" style={{ width: '100%', borderRadius: 10, marginBottom: '0.4rem', display: 'block', maxHeight: 150, objectFit: 'cover' }} />}
              <div style={{ padding: '0.65rem 0.9rem', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px', background: msg.role === 'user' ? 'linear-gradient(135deg,#c9a84c,#f0c96e)' : '#1a1a28', color: msg.role === 'user' ? '#0a0a0f' : '#f5f5f0', fontSize: '0.84rem', lineHeight: 1.6, fontWeight: msg.role === 'user' ? 500 : 400, whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '0.65rem 0.9rem', borderRadius: '4px 16px 16px 16px', background: '#1a1a28', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
              {[0,1,2].map(i => <div key={i} className="dot-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', animationDelay: i * 0.2 + 's' }} />)}
            </div>
          </div>
        )}
        {messages.length === 1 && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => sendMessage(s)}
                style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem', borderRadius: '9999px', background: '#2a2a3a', border: '1px solid #3a3a4a', color: '#9999aa', cursor: 'pointer', transition: 'all 0.2s' }}>
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {uploadedImage && (
        <div style={{ padding: '0.5rem 1.25rem', borderTop: '1px solid #2a2a3a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: '#0a0a0f', borderRadius: 8, border: '1px solid #2a2a3a' }}>
            <img src={uploadedImage} alt="preview" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
            <span style={{ color: '#9999aa', fontSize: '0.8rem', flex: 1 }}>Image ready</span>
            <button onClick={() => setUploadedImage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9999aa' }}><X size={14} /></button>
          </div>
        </div>
      )}

      <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid #2a2a3a', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
        <button onClick={() => fileInputRef.current?.click()} style={{ width: 36, height: 36, borderRadius: 10, background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9999aa', flexShrink: 0 }}>
          <Upload size={16} />
        </button>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
          placeholder="Ask about interior design..." rows={1}
          style={{ flex: 1, background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.6rem 0.85rem', color: '#f5f5f0', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', resize: 'none', lineHeight: 1.5 }} />
        <button onClick={() => sendMessage()} disabled={loading}
          style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading ? 0.5 : 1, flexShrink: 0 }}>
          <Send size={16} color="#0a0a0f" />
        </button>
      </div>
    </div>
  )
}
