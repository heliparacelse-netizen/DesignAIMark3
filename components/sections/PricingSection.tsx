'use client'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  { name: 'Free', price: '0€', description: 'No credit card required', features: ['3 AI generations', 'Basic styles', 'Watermark'], cta: 'Start free', href: '/register', highlighted: false, priceId: null },
  { name: 'Starter', price: '9€', description: '5 projects', features: ['5 generations', 'All styles', 'No watermark', 'HD export'], cta: 'Get Starter', highlighted: false, priceId: 'price_starter' },
  { name: 'Pro', price: '19€', description: 'Most popular', features: ['15 generations', 'All styles', 'No watermark', 'HD export', '3D preview'], cta: 'Get Pro', highlighted: true, priceId: 'price_pro' },
  { name: 'Studio', price: '39€', description: 'For agencies', features: ['40 generations', 'All styles', 'Custom watermark', '4K export', '3D preview'], cta: 'Get Studio', highlighted: false, priceId: 'price_studio' },
]

export default function PricingSection() {
  const handleCheckout = async (priceId: string) => {
    const res = await fetch('/api/stripe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId }) })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <section id="pricing" style={{ background: '#0a0a0f', padding: '6rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f5f5f0', marginBottom: '1rem' }}>
            Simple, transparent <span className="gold-gradient">pricing</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {plans.map(plan => (
            <div key={plan.name} className="glass-card" style={{ padding: '2rem', borderRadius: 16, border: plan.highlighted ? '1px solid rgba(201,168,76,0.4)' : '1px solid #2a2a3a', boxShadow: plan.highlighted ? '0 0 40px rgba(201,168,76,0.1)' : 'none', position: 'relative' }}>
              {plan.highlighted && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #c9a84c, #f0c96e)', color: '#0a0a0f', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 1rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>Most Popular</div>}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '0.25rem' }}>{plan.name}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c9a84c', lineHeight: 1, marginBottom: '0.5rem' }}>{plan.price}</div>
                <div style={{ fontSize: '0.85rem', color: '#9999aa' }}>{plan.description}</div>
              </div>
              <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {plan.features.map(f => <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><Check size={14} color="#c9a84c" /><span style={{ color: '#9999aa' }}>{f}</span></li>)}
              </ul>
              {plan.href ? (
                <Link href={plan.href}><button className={plan.highlighted ? 'btn-gold' : 'btn-outline'} style={{ width: '100%' }}>{plan.cta}</button></Link>
              ) : (
                <button className={plan.highlighted ? 'btn-gold' : 'btn-outline'} style={{ width: '100%' }} onClick={() => plan.priceId && handleCheckout(plan.priceId)}>{plan.cta}</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
