'use client'
import { Suspense } from 'react'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Upload, Wand2, Sparkles, ArrowLeft, Sun, Sofa, X, Maximize2 } from 'lucide-react'
import api from '@/lib/api'

const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room']
const styles = ['Modern', 'Minimal', 'Luxury', 'Scandinavian', 'Industrial', 'Classic', 'Japandi', 'Bohemian']

const promptExamples = [
  'Scandinavian living room, white oak furniture, linen sofa, warm pendant lights, plants',
  'Japandi bedroom, low platform bed, neutral tones, minimal decor, natural wood',
  'Modern luxury kitchen, marble countertops, brass hardware, handleless cabinets',
  'Industrial office, exposed concrete, dark metal shelves, Edison bulb lighting',
]

const stylePrompts: Record<string, string> = {
  Modern: 'modern interior, clean lines, neutral palette, open space, contemporary furniture',
  Minimal: 'minimalist interior, white walls, essential furniture only, calm atmosphere',
  Luxury: 'luxury interior, marble, gold accents, velvet furniture, high-end finishes',
  Scandinavian: 'Scandinavian interior, white and wood, hygge atmosphere, cozy textures',
  Industrial: 'industrial interior, exposed brick, metal pipes, concrete floors, dark tones',
  Classic: 'classic interior, moldings, traditional furniture, rich fabrics, warm tones',
  Japandi: 'Japandi interior, Japanese minimalism, Scandinavian warmth, natural materials, zen atmosphere',
  Bohemian: 'bohemian interior, layered textiles, plants, eclectic decor, warm colors',
}

const roomPrompts: Record<string, string> = {
  'Living Room': 'living room with sofa, coffee table, rug, ambient lighting',
  'Bedroom': 'bedroom with bed, nightstands, soft bedding, calm atmosphere',
  'Kitchen': 'kitchen with cabinets, countertops, appliances, good lighting',
  'Bathroom': 'bathroom with vanity, tiles, modern fixtures, clean design',
  'Office': 'home office with desk, chair, shelving, focused lighting',
  'Dining Room': 'dining room with table, chairs, pendant light over table',
}

function StudioPageInner() {
  const searchParams = useSearchParams()
  const [room, setRoom] = useState(searchParams?.get('room') || 'Living Room')
  const [style, setStyle] = useState(searchParams?.get('style') || 'Modern')
  const [prompt, setPrompt] = useState(searchParams?.get('prompt') || '')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [tokens, setTokens] = useState<number | null>(null)
  const [redesigns, setRedesigns] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [preserveStructure, setPreserveStructure] = useState(true)
  const [lightingEnhance, setLightingEnhance] = useState(false)
  const [sliderPos, setSliderPos] = useState(50)
  const [dragOver, setDragOver] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')
  const sliderRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pollRef = useRef<any>(null)

  useEffect(() => {
    api.get('/api/tokens').then(data => {
      if (data.tokens !== undefined) { setTokens(data.tokens); setRedesigns(Math.floor(data.tokens / 25)) }
    }).catch(() => {})
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [])

  const handleFile = useCallback((file: File) => {
    setUploadError('')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setUploadError('Use JPG, PNG or WebP.'); return }
    if (file.size > 25 * 1024 * 1024) { setUploadError('Max 25MB.'); return }
    const reader = new FileReader()
    reader.onload = e => setUploadedImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const buildPrompt = () => {
    const styleP = stylePrompts[style] || style.toLowerCase()
    const roomP = roomPrompts[room] || room.toLowerCase()
    const userP = prompt.trim()
    const structureP = preserveStructure ? 'keep the exact same room layout, same window positions, same wall structure, same floor plan, only change decoration and furniture style' : ''
    const lightP = lightingEnhance ? 'with beautiful natural lighting, warm ambient glow' : ''
    const parts = [userP, styleP, roomP, structureP, lightP].filter(Boolean)
    return parts.join(', ')
  }

  const handleGenerate = async () => {
    if (!api.getToken()) { setError('Please sign in first.'); return }
    if (tokens !== null && tokens < 25) { setError('Not enough tokens. You need 25 tokens per redesign.'); return }
    setGenerating(true); setError(''); setGenerated(false); setGeneratedImage(null)
    try {
      const finalPrompt = buildPrompt()
      const data = await api.post('/api/generate', { image: uploadedImage || null, style, roomType: room, prompt: finalPrompt })
      if (data.error) { setError(data.error); setGenerating(false); return }
      if (data.tokensRemaining !== undefined) { setTokens(data.tokensRemaining); setRedesigns(Math.floor(data.tokensRemaining / 25)) }
      pollRef.current = setInterval(async () => {
        const status = await api.get(`/api/generate/status/${data.generationId}`)
        if (status.status === 'done' && status.imageUrl) {
          clearInterval(pollRef.current); setGeneratedImage(status.imageUrl); setGenerating(false); setGenerated(true)
        } else if (status.status === 'failed') {
          clearInterval(pollRef.current); setError('Generation failed. Token refunded.'); setGenerating(false)
          api.get('/api/tokens').then(d => { if (d.tokens !== undefined) { setTokens(d.tokens); setRedesigns(Math.floor(d.tokens / 25)) } })
        }
      }, 3000)
    } catch (e: any) { setError(e.message || 'Failed'); setGenerating(false) }
  }

  const handleDownload = async () => {
    if (!generatedImage) return
    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `roomvera-${style}-${room}-${Date.now()}.jpg`.replace(/\s+/g, '-').toLowerCase()
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      window.open(generatedImage, '_blank')
    }
  }

  const handleSlider = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    setSliderPos(Math.round(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100))
  }

  const Toggle = ({ value, onChange, label, icon: Icon }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1a1a24' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {Icon && <Icon size={14} color="#9999aa" />}
        <span style={{ color: '#9999aa', fontSize: '0.85rem' }}>{label}</span>
      </div>
      <div onClick={() => onChange(!value)} style={{ width: 40, height: 22, borderRadius: 11, background: value ? 'linear-gradient(135deg,#c9a84c,#f0c96e)' : '#2a2a3a', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: value ? 20 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ background: '#111118', borderBottom: '1px solid #2a2a3a', padding: '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9999aa', textDecoration: 'none', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} />Dashboard
        </Link>
        <div style={{ width: 1, height: 20, background: '#2a2a3a' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#c9a84c" />
          <span style={{ fontWeight: 600, color: '#f5f5f0' }}>Roomvera AI Studio</span>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {tokens !== null && (
            <div style={{ background: tokens < 25 ? 'rgba(255,80,80,0.1)' : 'rgba(201,168,76,0.1)', border: `1px solid ${tokens < 25 ? 'rgba(255,80,80,0.3)' : 'rgba(201,168,76,0.3)'}`, borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.78rem', color: tokens < 25 ? '#ff8080' : '#c9a84c' }}>
              {tokens} tokens · {redesigns} redesigns left
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', height: 'calc(100vh - 57px)' }}>
        <div style={{ background: '#111118', borderRight: '1px solid #2a2a3a', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>📸 Upload your space <span style={{ color: '#9999aa', fontWeight: 400 }}>(optional)</span></h3>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {uploadedImage ? (
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                <img src={uploadedImage} alt="uploaded" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                <button onClick={() => setUploadedImage(null)} style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(10,10,15,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5f5f0' }}><X size={14} /></button>
                <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(40,200,64,0.9)', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.7rem', color: '#fff' }}>✓ Ready</div>
              </div>
            ) : (
              <div onDrop={e => { e.preventDefault(); setDragOver(false); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]) }} onDragOver={e => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onClick={() => fileInputRef.current?.click()}
                style={{ border: `2px dashed ${dragOver ? '#c9a84c' : '#2a2a3a'}`, borderRadius: 12, padding: '1.25rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <Upload size={24} color={dragOver ? '#c9a84c' : '#9999aa'} style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ color: '#9999aa', fontSize: '0.82rem' }}>Drop or <span style={{ color: '#c9a84c' }}>browse</span></div>
                <div style={{ color: '#9999aa', fontSize: '0.72rem', marginTop: '0.2rem' }}>JPG, PNG, WebP · 25MB max</div>
              </div>
            )}
            {uploadError && <div style={{ color: '#ff8080', fontSize: '0.8rem', marginTop: '0.5rem' }}>{uploadError}</div>}
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.5rem', fontSize: '0.9rem' }}>✍️ Describe your vision</h3>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Optional — style is applied automatically below..." rows={2}
              style={{ width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem', color: '#f5f5f0', fontSize: '0.82rem', resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.5, boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
              {promptExamples.map((ex, i) => (
                <button key={i} onClick={() => setPrompt(ex)} style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: '9999px', background: '#2a2a3a', border: 'none', color: '#9999aa', cursor: 'pointer', textAlign: 'left' }}>
                  {ex.slice(0, 32)}...
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.65rem', fontSize: '0.9rem' }}>🏠 Room type</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {roomTypes.map(r => (
                <button key={r} onClick={() => setRoom(r)} style={{ padding: '0.35rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', background: room === r ? 'rgba(201,168,76,0.15)' : '#2a2a3a', border: room === r ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent', color: room === r ? '#c9a84c' : '#9999aa', cursor: 'pointer', fontWeight: room === r ? 600 : 400, transition: 'all 0.15s' }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.65rem', fontSize: '0.9rem' }}>🎨 Design style</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {styles.map(s => (
                <button key={s} onClick={() => setStyle(s)} style={{ padding: '0.35rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', background: style === s ? 'rgba(108,71,255,0.15)' : '#2a2a3a', border: style === s ? '1px solid rgba(108,71,255,0.4)' : '1px solid transparent', color: style === s ? '#9070ff' : '#9999aa', cursor: 'pointer', fontWeight: style === s ? 600 : 400, transition: 'all 0.15s' }}>
                  {s}
                </button>
              ))}
            </div>
            {style && <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#9999aa', background: '#0a0a0f', borderRadius: 8, padding: '0.4rem 0.6rem' }}>✦ {stylePrompts[style]?.slice(0, 60)}...</div>}
          </div>

          <div style={{ background: '#0a0a0f', borderRadius: 12, padding: '0.85rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f5f5f0', marginBottom: '0.4rem' }}>⚙️ AI Options</div>
            <Toggle value={preserveStructure} onChange={setPreserveStructure} label="Preserve room structure" icon={Maximize2} />
            <Toggle value={lightingEnhance} onChange={setLightingEnhance} label="Enhance lighting" icon={Sun} />
          </div>

          {error && (
            <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 10, padding: '0.75rem', color: '#ff8080', fontSize: '0.85rem' }}>
              {error}
              {error.includes('token') && <><br /><Link href="/dashboard/billing" style={{ color: '#c9a84c' }}>Upgrade →</Link></>}
            </div>
          )}

          <button onClick={handleGenerate} disabled={generating || (tokens !== null && tokens < 25)} className="btn-gold"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.9rem', opacity: generating || (tokens !== null && tokens < 25) ? 0.6 : 1 }}>
            <Wand2 size={18} />
            {generating ? 'Generating...' : tokens !== null && tokens < 25 ? '⚠ Not enough tokens' : `✦ Generate (25 tokens)`}
          </button>

          {!api.getToken() && <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#9999aa' }}><Link href="/login" style={{ color: '#c9a84c', textDecoration: 'none' }}>Sign in</Link> to generate</p>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '2rem' }}>
          {generating ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid #2a2a3a', borderTop: '3px solid #c9a84c', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }} />
              <div style={{ color: '#c9a84c', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>AI is redesigning your space...</div>
              <div style={{ color: '#9999aa', fontSize: '0.85rem' }}>{style} style · {room}</div>
              <div style={{ color: '#9999aa', fontSize: '0.75rem', marginTop: '0.75rem' }}>30–60 seconds...</div>
            </div>
          ) : generated && generatedImage ? (
            <div style={{ width: '100%', maxWidth: 700 }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#9999aa', fontSize: '0.85rem' }}>Drag to compare Before / After</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem', border: 'none', borderRadius: '9999px', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', color: '#0a0a0f', fontWeight: 600, cursor: 'pointer' }}>⬇ Download</button>
                  <button className="btn-outline" onClick={() => { setGenerated(false); setGeneratedImage(null) }} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Try another</button>
                </div>
              </div>
              {/* BEFORE = right (original), AFTER = left (generated) */}
              <div ref={sliderRef} onMouseMove={e => { if (e.buttons === 1) handleSlider(e) }} onClick={handleSlider}
                style={{ position: 'relative', height: 440, borderRadius: 20, overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none', border: '1px solid #2a2a3a' }}>
                {/* BEFORE — full background (original uploaded) */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  {uploadedImage
                    ? <img src={uploadedImage} alt="before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#1a1a24,#2a2a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Upload size={48} color="#2a2a3a" /></div>
                  }
                </div>
                {/* AFTER — slides from left */}
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${sliderPos}%`, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, width: `${10000 / Math.max(sliderPos, 1)}%` }}>
                    <img src={generatedImage} alt="after" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: 3, background: '#c9a84c', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 34, height: 34, borderRadius: '50%', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0f', fontWeight: 800, fontSize: '0.85rem', boxShadow: '0 0 20px rgba(201,168,76,0.5)' }}>↔</div>
                </div>
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', color: '#c9a84c', zIndex: 5 }}>After ✨</div>
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(10,10,15,0.85)', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', color: '#9999aa', zIndex: 5 }}>Before</div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(201,168,76,0.04)', border: '2px dashed #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Sparkles size={44} color="#2a2a3a" />
              </div>
              <div style={{ color: '#f5f5f0', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>Your AI redesign appears here</div>
              <div style={{ color: '#9999aa', fontSize: '0.82rem', maxWidth: 300, margin: '0 auto' }}>Select a room type, choose a style, and generate your redesign</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { Suspense } from 'react'
export default function StudioPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading Studio...</div>}>
      <StudioPageInner />
    </Suspense>
  )
}
