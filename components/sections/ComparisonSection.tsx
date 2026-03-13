'use client'
import { Check, X } from 'lucide-react'

const rows = [
  { feature: 'AI Speed', homestyler: false, interiorAI: true, designAI: true },
  { feature: 'Before/After Slider', homestyler: false, interiorAI: false, designAI: true },
  { feature: 'Smart Style Suggestions', homestyler: false, interiorAI: false, designAI: true },
  { feature: 'Auto Room Detection', homestyler: false, interiorAI: false, designAI: true },
  { feature: 'Lighting Enhancement', homestyler: false, interiorAI: false, designAI: true },
  { feature: 'Furniture Realism Mode', homestyler: true, interiorAI: false, designAI: true },
  { feature: '3D Preview', homestyler: true, interiorAI: false, designAI: true },
  { feature: 'HD Export', homestyler: false, interiorAI: true, designAI: true },
  { feature: 'Free Plan Available', homestyler: true, interiorAI: false, designAI: true },
  { feature: 'Midjourney-level Quality', homestyler: false, interiorAI: false, designAI: true },
]

export default function ComparisonSection() {
  return (
    <section id="comparison" style={{ background: '#111118', padding: '6rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f5f5f0', marginBottom: '1rem' }}>
            Why <span className="gold-gradient">DesignAI</span> beats the rest
          </h2>
          <p style={{ color: '#9999aa' }}>We compared ourselves to the best — here's how we stack up.</p>
        </div>
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #2a2a3a' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#16161f', padding: '1rem 1.5rem', borderBottom: '1px solid #2a2a3a' }}>
            <div style={{ color: '#9999aa', fontSize: '0.85rem', fontWeight: 600 }}>Feature</div>
            <div style={{ color: '#9999aa', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>Homestyler</div>
            <div style={{ color: '#9999aa', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>Interior AI</div>
            <div style={{ color: '#c9a84c', fontSize: '0.85rem', fontWeight: 700, textAlign: 'center' }}>DesignAI ✦</div>
          </div>
          {rows.map((row, i) => (
            <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '1rem 1.5rem', borderBottom: i < rows.length - 1 ? '1px solid #2a2a3a' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(22,22,31,0.5)', alignItems: 'center' }}>
              <div style={{ color: '#f5f5f0', fontSize: '0.9rem' }}>{row.feature}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {row.homestyler ? <Check size={18} color="#28c840" /> : <X size={18} color="#ff5050" />}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {row.interiorAI ? <Check size={18} color="#28c840" /> : <X size={18} color="#ff5050" />}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {row.designAI ? <Check size={18} color="#c9a84c" /> : <X size={18} color="#ff5050" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
