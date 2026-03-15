'use client'
import Link from 'next/link'
import { ArrowRight, Zap, Layers, Box } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="grid-bg" style={{ background: '#0a0a0f', paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(108,71,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 2rem', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '9999px', padding: '0.35rem 1rem', color: '#c9a84c', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <Zap size={14} />AI Interior Design Studio
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: '#f5f5f0' }}>
            Design stunning <span className="gold-gradient">interiors</span><br />with AI.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#9999aa', lineHeight: 1.7, maxWidth: 480, marginBottom: '2rem' }}>
            Upload a photo of your room. Our AI redesigns your space instantly. Start free with 3 generations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link href="/register"><button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.85rem 2rem' }}>Start free <ArrowRight size={16} /></button></Link>
            <Link href="/studio"><button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.85rem 2rem' }}>Open Studio</button></Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[{ value: '10k+', label: 'Rooms designed' }, { value: '3', label: 'Free generations' }, { value: '11', label: 'Languages' }].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c9a84c' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#9999aa' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="glass-card" style={{ borderRadius: 20, padding: '1.5rem', boxShadow: '0 0 60px rgba(108,71,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #2a2a3a' }}>
              {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
              <span style={{ marginLeft: '0.5rem', color: '#9999aa', fontSize: '0.8rem' }}>AI Studio</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#9999aa', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Before</div>
                <div style={{ height: 140, borderRadius: 12, background: 'linear-gradient(135deg,#1a1a24,#2a2a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Layers size={36} color="#2a2a3a" /></div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#c9a84c', marginBottom: '0.5rem', textTransform: 'uppercase' }}>After ✦</div>
                <div style={{ height: 140, borderRadius: 12, background: 'linear-gradient(135deg,#1a1228,#2a1a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(108,71,255,0.2)' }}><Box size={36} color="#6c47ff" /></div>
              </div>
            </div>
            <Link href="/studio"><button className="btn-gold" style={{ width: '100%' }}>✦ Try the Studio free</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
