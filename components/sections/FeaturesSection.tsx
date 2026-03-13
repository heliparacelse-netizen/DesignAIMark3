'use client'
import { Brain, Palette, Box, Download } from 'lucide-react'

const features = [
  { icon: Brain, title: 'AI Layout Intelligence', description: 'Predictive layout suggestions optimized for flow, lighting, and comfort.', color: '#c9a84c' },
  { icon: Palette, title: 'Style Blending Engine', description: 'Fuse modern, minimal, and classic palettes into curated design presets.', color: '#6c47ff' },
  { icon: Box, title: '3D Room Preview', description: 'Inspect proportions, materials, and lighting with interactive controls.', color: '#c9a84c' },
  { icon: Download, title: 'Client-ready Export', description: 'Generate shareable previews and moodboards in seconds.', color: '#6c47ff' },
]

export default function FeaturesSection() {
  return (
    <section id="product" style={{ background: '#0a0a0f', padding: '6rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#f5f5f0', marginBottom: '1rem' }}>
            Why creators choose <span className="gold-gradient">DesignAI</span>
          </h2>
          <p style={{ color: '#9999aa', maxWidth: 500, margin: '0 auto' }}>Everything you need to create stunning interior designs.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {features.map(f => {
            const Icon = f.icon
            return (
              <div key={f.title} className="glass-card glow-gold" style={{ padding: '2rem', borderRadius: 16, transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}15`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={22} color={f.color} />
                </div>
                <h3 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '0.75rem' }}>{f.title}</h3>
                <p style={{ color: '#9999aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
