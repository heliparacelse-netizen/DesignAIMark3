'use client'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section style={{ background: '#0a0a0f', padding: '6rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(108,71,255,0.08))', border: '1px solid #2a2a3a', borderRadius: 24, padding: '4rem 2rem' }}>
          <Sparkles size={40} color="#c9a84c" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f5f5f0', marginBottom: '1rem' }}>Ready to redesign your space?</h2>
          <p style={{ color: '#9999aa', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.7 }}>Join thousands of designers using Roomvera AI. Start free with 100 tokens (4 redesigns).</p>
          <Link href="/register">
            <button className="btn-gold" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Start free <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ background: '#0a0a0f', padding: '3rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={14} color="#0a0a0f" />
          </div>
          <span style={{ fontWeight: 700, color: '#f5f5f0' }}>Roomvera AI</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {['Studio', 'Pricing', 'Privacy', 'Terms'].map(link => (
            <a key={link} href="#" style={{ color: '#9999aa', fontSize: '0.85rem', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
        <div style={{ color: '#9999aa', fontSize: '0.8rem' }}>© 2026 Roomvera AI. All rights reserved.</div>
      </div>
    </footer>
  )
}
