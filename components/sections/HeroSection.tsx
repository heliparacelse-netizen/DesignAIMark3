'use client'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { useState } from 'react'

export default function HeroSection() {
  const [sliderPos, setSliderPos] = useState(50)
  const [hovered, setHovered] = useState(false)

  const handleSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSliderPos(Math.round(Math.max(5, Math.min(95, (e.clientX - rect.left) / rect.width * 100))))
  }

  return (
    <section className="grid-bg" style={{ background: '#0a0a0f', paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(108,71,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 2rem', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '9999px', padding: '0.35rem 1rem', color: '#c9a84c', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <Zap size={14} />AI Interior Redesign
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: '#f5f5f0' }}>
            Redesign any room<br />with <span className="gold-gradient">AI</span> instantly.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#9999aa', lineHeight: 1.7, maxWidth: 480, marginBottom: '2rem' }}>
            Upload a photo of your room. Choose a style. Get a stunning AI redesign in seconds. Start free with 100 tokens.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link href="/register"><button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.85rem 2rem' }}>Start free <ArrowRight size={16} /></button></Link>
            <Link href="/studio"><button className="btn-outline" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>Open Studio</button></Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[{ value: '10k+', label: 'Rooms redesigned' }, { value: '4', label: 'Free redesigns' }, { value: '8', label: 'Design styles' }].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c9a84c' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#9999aa' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="glass-card" style={{ borderRadius: 20, padding: '1.25rem', boxShadow: '0 0 60px rgba(108,71,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #2a2a3a' }}>
              {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              <span style={{ marginLeft: '0.5rem', color: '#9999aa', fontSize: '0.75rem' }}>Roomvera AI Studio</span>
            </div>
            <div
              style={{ position: 'relative', height: 260, borderRadius: 12, overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none' }}
              onMouseMove={handleSlider}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>
              <img src="/demo/before.jpg" alt="Before" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${sliderPos}%`, overflow: 'hidden', transition: hovered ? 'none' : 'width 0.3s ease' }}>
                <img src="/demo/after.jpg" alt="After" style={{ position: 'absolute', top: 0, left: 0, width: `${10000/Math.max(sliderPos,1)}%`, height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: 2, background: '#c9a84c', transform: 'translateX(-50%)', zIndex: 10, transition: hovered ? 'none' : 'left 0.3s ease' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0f', fontWeight: 800, fontSize: '0.75rem', boxShadow: '0 0 15px rgba(201,168,76,0.6)' }}>↔</div>
              </div>
              <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(10,10,15,0.85)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: '#9999aa', zIndex: 5 }}>Before</div>
              <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: '#c9a84c', zIndex: 5 }}>After ✨</div>
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#9999aa', textAlign: 'center' }}>← Drag to compare Before / After</div>
            <Link href="/studio"><button className="btn-gold" style={{ width: '100%', marginTop: '0.75rem' }}>✦ Try it free</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
