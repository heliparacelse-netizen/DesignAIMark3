'use client'
import { Upload, Sliders, Wand2 } from 'lucide-react'

const steps = [
  { number: '01', icon: Upload, title: 'Upload your room photo', description: 'Take a photo of any room. Our AI analyzes the space and existing elements.' },
  { number: '02', icon: Sliders, title: 'Choose a design style', description: 'Pick from Modern, Minimal, Luxury, Scandinavian, and more.' },
  { number: '03', icon: Wand2, title: 'Generate your AI design', description: 'Get a stunning redesign in seconds. Download or iterate with different styles.' },
]

export default function HowItWorksSection() {
  return (
    <section style={{ background: '#111118', padding: '6rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#f5f5f0', marginBottom: '1rem' }}>
            3 steps to your <span className="gold-gradient">dream room</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {steps.map(step => {
            const Icon = step.icon
            return (
              <div key={step.number} className="glass-card" style={{ padding: '2rem', borderRadius: 16 }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: '1rem', fontFamily: 'monospace' }}>{step.number}</div>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Icon size={20} color="#c9a84c" />
                </div>
                <h3 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: '#9999aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
