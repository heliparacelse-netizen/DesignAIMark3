'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Upload, Sparkles, ArrowLeft, X, Box } from 'lucide-react'
import AIToolbar from '@/components/studio/AIToolbar'

const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room']
const styles = ['Modern', 'Minimal', 'Luxury', 'Scandinavian', 'Industrial', 'Classic', 'Japandi', 'Bohemian']

export default function StudioPage() {
  const [room, setRoom] = useState('Living Room')
  const [style, setStyle] = useState('Modern')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [sliderPos, setSliderPos] = useState(50)
  const [dragOver, setDragOver] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [show3D, setShow3D] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = useCallback((file: File) => {
    setUploadError('')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setUploadError('Format not supported. Use JPG, PNG or WebP.'); return }
    if (file.size > 25 * 1024 * 1024) { setUploadError('File too large. Max 25MB.'); return }
    const reader = new FileReader()
    reader.onload = e => setUploadedImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2500))
    setGenerating(false); setGenerated(true)
  }

  const handleSlider = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    setSliderPos(Math.round(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100))
  }

  useEffect(() => {
    if (!show3D || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let angle = 0
    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2, cy = canvas.height / 2
      const points = [
        [-120, -80], [120, -80], [120, 80], [-120, 80],
        [-80, -120], [80, -120], [80, 40], [-80, 40]
      ]
      const cos = Math.cos(angle), sin = Math.sin(angle)
      const project = ([x, y]: number[]) => {
        const rx = x * cos - 0 * sin
        const rz = x * sin + 0 * cos
        const scale = 300 / (300 + rz + y * 0.3)
        return [cx + rx * scale, cy + y * scale * 0.6]
      }
      const floor = [[-150,-50],[150,-50],[150,100],[-150,100]].map(project)
      ctx.beginPath(); ctx.moveTo(floor[0][0], floor[0][1])
      floor.forEach(p => ctx.lineTo(p[0], p[1]))
      ctx.closePath(); ctx.fillStyle = 'rgba(42,42,58,0.6)'; ctx.fill()
      ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 1; ctx.stroke()
      const walls = [
        [[-150,-50],[-150,-150],[150,-150],[150,-50]],
        [[-150,-50],[-150,-150],[-50,-200],[-50,-100]],
      ]
      walls.forEach((wall, i) => {
        const pts = wall.map(p => project(p as number[]))
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1])
        pts.forEach(p => ctx.lineTo(p[0], p[1]))
        ctx.closePath(); ctx.fillStyle = i === 0 ? 'rgba(22,22,31,0.8)' : 'rgba(17,17,24,0.8)'; ctx.fill()
        ctx.strokeStyle = '#2a2a3a'; ctx.stroke()
      })
      const sofa = [[-80,-30],[20,-30],[20,20],[-80,20]].map(p => project(p as number[]))
      ctx.beginPath(); ctx.moveTo(sofa[0][0], sofa[0][1])
      sofa.forEach(p => ctx.lineTo(p[0], p[1]))
      ctx.closePath(); ctx.fillStyle = 'rgba(108,71,255,0.4)'; ctx.fill()
      ctx.strokeStyle = 'rgba(108,71,255,0.6)'; ctx.stroke()
      ctx.fillStyle = '#c9a84c'; ctx.font = '11px system-ui'
      ctx.fillText('3D Preview — drag to rotate', cx - 70, canvas.height - 15)
      angle += 0.008; animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [show3D])

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
          <span style={{ fontWeight: 600, color: '#f5f5f0' }}>AI Studio</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={() => setShow3D(!show3D)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', borderRadius: '9999px', background: show3D ? 'rgba(108,71,255,0.2)' : '#2a2a3a', border: show3D ? '1px solid rgba(108,71,255,0.4)' : '1px solid transparent', color: show3D ? '#9070ff' : '#9999aa', fontSize: '0.8rem', cursor: 'pointer' }}>
            <Box size={14} />3D View
          </button>
          <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#c9a84c' }}>✦ Beats Interior AI</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 320px', height: 'calc(100vh - 57px)' }}>
        <div style={{ background: '#111118', borderRight: '1px solid #2a2a3a', padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.88rem' }}>📸 Upload space</h3>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {uploadedImage ? (
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                <img src={uploadedImage} alt="uploaded" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                <button onClick={() => setUploadedImage(null)} style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26, borderRadius: '50%', background: 'rgba(10,10,15,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5f5f0' }}><X size={13} /></button>
                <div style={{ position: 'absolute', bottom: 6, left: 6, background: 'rgba(40,200,64,0.9)', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.7rem', color: '#fff' }}>✓ Ready</div>
              </div>
            ) : (
              <div onDrop={handleDrop} onDragOver={e => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onClick={() => fileInputRef.current?.click()}
                style={{ border: `2px dashed ${dragOver ? '#c9a84c' : '#2a2a3a'}`, borderRadius: 12, padding: '1.25rem', textAlign: 'center', cursor: 'pointer', background: dragOver ? 'rgba(201,168,76,0.04)' : 'transparent', transition: 'all 0.2s' }}>
                <Upload size={24} color={dragOver ? '#c9a84c' : '#9999aa'} style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ color: '#9999aa', fontSize: '0.8rem' }}>Drop or <span style={{ color: '#c9a84c' }}>browse</span></div>
                <div style={{ color: '#9999aa', fontSize: '0.7rem', marginTop: '0.2rem' }}>JPG, PNG, WebP · 25MB max</div>
              </div>
            )}
            {uploadError && <div style={{ color: '#ff8080', fontSize: '0.75rem', marginTop: '0.4rem' }}>{uploadError}</div>}
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.65rem', fontSize: '0.88rem' }}>🏠 Room type</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {roomTypes.map(r => <button key={r} onClick={() => setRoom(r)} style={{ padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.78rem', background: room === r ? 'rgba(201,168,76,0.15)' : '#2a2a3a', border: room === r ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent', color: room === r ? '#c9a84c' : '#9999aa', cursor: 'pointer', transition: 'all 0.2s' }}>{r}</button>)}
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.65rem', fontSize: '0.88rem' }}>🎨 Design style</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {styles.map(s => <button key={s} onClick={() => setStyle(s)} style={{ padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.78rem', background: style === s ? 'rgba(108,71,255,0.15)' : '#2a2a3a', border: style === s ? '1px solid rgba(108,71,255,0.4)' : '1px solid transparent', color: style === s ? '#9070ff' : '#9999aa', cursor: 'pointer', transition: 'all 0.2s' }}>{s}</button>)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '1.5rem', position: 'relative' }}>
          {show3D && !generating && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', zIndex: 5 }}>
              <canvas ref={canvasRef} width={600} height={400} style={{ borderRadius: 20, border: '1px solid #2a2a3a' }} />
              <button onClick={() => setShow3D(false)} style={{ position: 'absolute', top: 20, right: 20, width: 32, height: 32, borderRadius: '50%', background: 'rgba(10,10,15,0.8)', border: '1px solid #2a2a3a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5f5f0' }}><X size={14} /></button>
            </div>
          )}
          {generating ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid #2a2a3a', borderTop: '3px solid #c9a84c', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }} />
              <div style={{ color: '#c9a84c', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>AI is redesigning your space...</div>
              <div style={{ color: '#9999aa', fontSize: '0.85rem' }}>{style} · {room}</div>
              {prompt && <div style={{ color: '#9999aa', fontSize: '0.78rem', marginTop: '0.5rem', maxWidth: 320, margin: '0.5rem auto 0', fontStyle: 'italic' }}>"{prompt.slice(0, 70)}{prompt.length > 70 ? '...' : ''}"</div>}
            </div>
          ) : generated ? (
            <div style={{ width: '100%', maxWidth: 680 }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#9999aa', fontSize: '0.82rem' }}>Drag slider to compare</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>⬇ HD Download</button>
                  <button className="btn-outline" onClick={() => setGenerated(false)} style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>Try another</button>
                  <button onClick={() => setShow3D(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', fontSize: '0.82rem', background: 'rgba(108,71,255,0.1)', border: '1px solid rgba(108,71,255,0.3)', borderRadius: '9999px', color: '#9070ff', cursor: 'pointer' }}><Box size={13} />3D View</button>
                </div>
              </div>
              <div ref={sliderRef} onMouseMove={e => { if (e.buttons === 1) handleSlider(e) }} onClick={handleSlider}
                style={{ position: 'relative', height: 380, borderRadius: 20, overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none', boxShadow: '0 0 80px rgba(108,71,255,0.12)', border: '1px solid #2a2a3a' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a1a24,#2a2a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {uploadedImage ? <img src={uploadedImage} alt="before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Upload size={48} color="#2a2a3a" />}
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${sliderPos}%`, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a1228,#0d0d1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: `${10000 / Math.max(sliderPos, 1)}%`, boxShadow: 'inset 0 0 80px rgba(108,71,255,0.25)' }}>
                    <Sparkles size={56} color="#6c47ff" />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: 3, background: '#c9a84c', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 34, height: 34, borderRadius: '50%', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(201,168,76,0.6)', color: '#0a0a0f', fontWeight: 800, fontSize: '0.85rem' }}>↔</div>
                </div>
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(10,10,15,0.85)', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', color: '#9999aa', zIndex: 5 }}>Before</div>
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', color: '#c9a84c', zIndex: 5 }}>After ✦</div>
              </div>
              <div style={{ marginTop: '0.75rem', padding: '0.65rem 1rem', background: 'rgba(22,22,31,0.8)', border: '1px solid #2a2a3a', borderRadius: 12, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', color: '#9999aa' }}>Style: <span style={{ color: '#f5f5f0' }}>{style}</span></span>
                <span style={{ color: '#2a2a3a' }}>·</span>
                <span style={{ fontSize: '0.8rem', color: '#9999aa' }}>Room: <span style={{ color: '#f5f5f0' }}>{room}</span></span>
                {prompt && <><span style={{ color: '#2a2a3a' }}>·</span><span style={{ fontSize: '0.8rem', color: '#9999aa', fontStyle: 'italic' }}>"{prompt.slice(0,50)}{prompt.length>50?'...':''}"</span></>}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'rgba(201,168,76,0.04)', border: '2px dashed #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Sparkles size={44} color="#2a2a3a" />
              </div>
              <div style={{ color: '#f5f5f0', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>Your AI design appears here</div>
              <div style={{ color: '#9999aa', fontSize: '0.82rem', maxWidth: 260, margin: '0 auto 1.5rem' }}>Upload a photo, describe your vision, and generate</div>
              <button onClick={() => setShow3D(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', background: 'rgba(108,71,255,0.1)', border: '1px solid rgba(108,71,255,0.3)', color: '#9070ff', cursor: 'pointer', fontSize: '0.82rem' }}>
                <Box size={14} />Preview 3D room template
              </button>
            </div>
          )}
        </div>

        <div style={{ background: '#111118', borderLeft: '1px solid #2a2a3a', padding: '1.25rem', overflowY: 'auto' }}>
          <AIToolbar prompt={prompt} setPrompt={setPrompt} onGenerate={handleGenerate} generating={generating} style={style} setStyle={setStyle} />
        </div>
      </div>
    </div>
  )
}
