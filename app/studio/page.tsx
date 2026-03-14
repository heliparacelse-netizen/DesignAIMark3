'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Upload, Wand2, Sparkles, ArrowLeft, Zap, Brain, Sun, Sofa, Download, X, ImageIcon } from 'lucide-react'

const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room']
const styles = ['Modern', 'Minimal', 'Luxury', 'Scandinavian', 'Industrial', 'Classic', 'Japandi', 'Bohemian']
const promptExamples = [
  'Modern japandi living room with warm lighting',
  'Luxury minimalist bedroom with gold accents',
  'Scandinavian kitchen with natural wood tones',
  'Industrial office with exposed brick walls',
]

export default function StudioPage() {
  const [room, setRoom] = useState('Living Room')
  const [style, setStyle] = useState('Modern')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [lighting, setLighting] = useState(false)
  const [furniturePreservation, setFurniturePreservation] = useState(false)
  const [autoDetect, setAutoDetect] = useState(false)
  const [virtualStaging, setVirtualStaging] = useState(false)
  const [sliderPos, setSliderPos] = useState(50)
  const [dragOver, setDragOver] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')
  const sliderRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    setUploadError('')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Format not supported. Use JPG, PNG or WebP.')
      return
    }
    if (file.size > 25 * 1024 * 1024) {
      setUploadError('File too large. Max 25MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = e => setUploadedImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2500))
    setGenerating(false)
    setGenerated(true)
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
        <div style={{ position: 'absolute', top: 3, left: value ? 20 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ background: '#111118', borderBottom: '1px solid #2a2a3a', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9999aa', textDecoration: 'none', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} />Dashboard
        </Link>
        <div style={{ width: 1, height: 20, background: '#2a2a3a' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#c9a84c" />
          <span style={{ fontWeight: 600, color: '#f5f5f0' }}>AI Studio</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#c9a84c' }}>✦ Beats Interior AI</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', height: 'calc(100vh - 61px)' }}>
        <div style={{ background: '#111118', borderRight: '1px solid #2a2a3a', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>📸 Upload your space</h3>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {uploadedImage ? (
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                <img src={uploadedImage} alt="uploaded" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                <button onClick={() => setUploadedImage(null)} style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(10,10,15,0.8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5f5f0' }}><X size={14} /></button>
                <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(40,200,64,0.9)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: '#fff' }}>✓ Ready</div>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                style={{ border: `2px dashed ${dragOver ? '#c9a84c' : '#2a2a3a'}`, borderRadius: 12, padding: '1.5rem', textAlign: 'center', cursor: 'pointer', background: dragOver ? 'rgba(201,168,76,0.05)' : 'transparent', transition: 'all 0.2s' }}>
                <Upload size={28} color={dragOver ? '#c9a84c' : '#9999aa'} style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ color: '#9999aa', fontSize: '0.85rem' }}>Drag & drop or <span style={{ color: '#c9a84c' }}>browse</span></div>
                <div style={{ color: '#9999aa', fontSize: '0.75rem', marginTop: '0.25rem' }}>JPG, PNG, WebP · Max 25MB</div>
              </div>
            )}
            {uploadError && <div style={{ color: '#ff8080', fontSize: '0.8rem', marginTop: '0.5rem' }}>{uploadError}</div>}
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>✍️ Describe your vision</h3>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your dream interior..."
              rows={3}
              style={{ width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem', color: '#f5f5f0', fontSize: '0.85rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.5 }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {promptExamples.map(ex => (
                <button key={ex} onClick={() => setPrompt(ex)} style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem', borderRadius: '9999px', background: '#2a2a3a', border: 'none', color: '#9999aa', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                  onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(201,168,76,0.1)'); (e.currentTarget.style.color = '#c9a84c') }}
                  onMouseLeave={e => { (e.currentTarget.style.background = '#2a2a3a'); (e.currentTarget.style.color = '#9999aa') }}>
                  {ex.length > 35 ? ex.slice(0, 35) + '...' : ex}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <h3 style={{ fontWeight: 600, color: '#f5f5f0', fontSize: '0.9rem' }}>🏠 Room type</h3>
              {autoDetect && <span style={{ fontSize: '0.7rem', color: '#28c840', background: 'rgba(40,200,64,0.1)', padding: '0.1rem 0.5rem', borderRadius: '9999px' }}>Auto-detected</span>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {roomTypes.map(r => <button key={r} onClick={() => setRoom(r)} style={{ padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', background: room === r ? 'rgba(201,168,76,0.15)' : '#2a2a3a', border: room === r ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent', color: room === r ? '#c9a84c' : '#9999aa', cursor: 'pointer', transition: 'all 0.2s' }}>{r}</button>)}
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>🎨 Design style</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {styles.map(s => <button key={s} onClick={() => setStyle(s)} style={{ padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', background: style === s ? 'rgba(108,71,255,0.15)' : '#2a2a3a', border: style === s ? '1px solid rgba(108,71,255,0.4)' : '1px solid transparent', color: style === s ? '#9070ff' : '#9999aa', cursor: 'pointer', transition: 'all 0.2s' }}>{s}</button>)}
            </div>
          </div>

          <div style={{ background: '#0a0a0f', borderRadius: 12, padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Zap size={14} color="#c9a84c" />
              <h3 style={{ fontWeight: 600, color: '#f5f5f0', fontSize: '0.85rem' }}>AI Features</h3>
            </div>
            <Toggle value={autoDetect} onChange={setAutoDetect} label="Auto room detection" icon={Brain} />
            <Toggle value={furniturePreservation} onChange={setFurniturePreservation} label="Furniture preservation" icon={Sofa} />
            <Toggle value={lighting} onChange={setLighting} label="Lighting enhancement" icon={Sun} />
            <Toggle value={virtualStaging} onChange={setVirtualStaging} label="Virtual staging" icon={ImageIcon} />
          </div>

          <button onClick={handleGenerate} disabled={generating} className="btn-gold" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.9rem', opacity: generating ? 0.8 : 1 }}>
            <Wand2 size={18} />{generating ? 'Generating...' : '✦ Generate Design'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '2rem' }}>
          {generating ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid #2a2a3a', borderTop: '3px solid #c9a84c', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }} />
              <div style={{ color: '#c9a84c', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>AI is redesigning your space...</div>
              <div style={{ color: '#9999aa', fontSize: '0.85rem' }}>{style} · {room}</div>
              {prompt && <div style={{ color: '#9999aa', fontSize: '0.8rem', marginTop: '0.25rem', maxWidth: 300, margin: '0.5rem auto 0' }}>"{prompt.slice(0, 60)}{prompt.length > 60 ? '...' : ''}"</div>}
            </div>
          ) : generated ? (
            <div style={{ width: '100%', maxWidth: 680 }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#9999aa', fontSize: '0.85rem' }}>Drag slider to compare</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}><Download size={14} />Download HD</button>
                  <button className="btn-outline" onClick={() => setGenerated(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Try another</button>
                </div>
              </div>
              <div ref={sliderRef} onMouseMove={e => { if (e.buttons === 1) handleSlider(e) }} onClick={handleSlider} style={{ position: 'relative', height: 400, borderRadius: 20, overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none', boxShadow: '0 0 60px rgba(108,71,255,0.15)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a1a24,#2a2a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {uploadedImage ? <img src={uploadedImage} alt="before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Upload size={48} color="#2a2a3a" />}
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${sliderPos}%`, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, width: `${100 * 100 / sliderPos}%`, background: 'linear-gradient(135deg,#1a1228,#0d0d1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 80px rgba(108,71,255,0.3)' }}>
                    <Sparkles size={56} color="#6c47ff" />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: 3, background: '#c9a84c', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, borderRadius: '50%', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(201,168,76,0.6)', fontSize: '0.8rem', color: '#0a0a0f', fontWeight: 700 }}>↔</div>
                </div>
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(10,10,15,0.8)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#9999aa', zIndex: 5 }}>Before</div>
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#c9a84c', zIndex: 5 }}>After ✦</div>
              </div>
              <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(22,22,31,0.8)', border: '1px solid #2a2a3a', borderRadius: 12, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Sparkles size={16} color="#c9a84c" />
                <span style={{ fontSize: '0.85rem', color: '#9999aa' }}>Style: <span style={{ color: '#f5f5f0' }}>{style}</span> · Room: <span style={{ color: '#f5f5f0' }}>{room}</span></span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(201,168,76,0.05)', border: '2px dashed #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Wand2 size={48} color="#2a2a3a" />
              </div>
              <div style={{ color: '#f5f5f0', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your AI design appears here</div>
              <div style={{ color: '#9999aa', fontSize: '0.85rem', maxWidth: 280, margin: '0 auto' }}>Upload a photo, describe your vision, and click Generate</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
