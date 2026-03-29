'use client'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Sophie Martin', role: 'Interior Designer, Paris', quote: 'Roomvera AI completely transformed how I present concepts to clients. What used to take days now takes minutes.', avatar: 'SM' },
  { name: 'James Chen', role: 'Architect, Singapore', quote: 'The AI understands spatial relationships better than I expected. The 3D preview feature is a game changer.', avatar: 'JC' },
  { name: 'Maria Rodriguez', role: 'Home Stylist, Madrid', quote: 'My clients are blown away by the quality. I use Roomvera AI for every project now. Worth every euro.', avatar: 'MR' },
]

export default function TestimonialsSection() {
  return (
    <section style={{ background: '#111118', padding: '6rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f5f5f0', marginBottom: '1rem' }}>
            Loved by designers <span className="gold-gradient">worldwide</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map(t => (
            <div key={t.name} className="glass-card glow-gold" style={{ padding: '2rem', borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />)}
              </div>
              <p style={{ color: '#f5f5f0', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #6c47ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f5f5f0', fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: '#9999aa', fontSize: '0.8rem' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
