'use client'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  { name: 'Free', price: '$0', period: '', tokens: 3, description: '3 generations forever', features: ['3 AI generations', 'Basic styles', 'Watermarked export', 'Community support'], cta: 'Start free', href: '/register', highlighted: false, priceId: null },
  { name: 'Starter', price: '$12', period: '/mo', tokens: 120, description: '120 tokens/month', features: ['120 AI generations', 'All styles', 'HD export', 'No watermark', 'Email support'], cta: 'Get Starter', href: null, highlighted: false, priceId: 'price_starter' },
  { name: 'Pro', price: '$29', period: '/mo', tokens: 350, description: '350 tokens/month', features: ['350 AI generations', 'All styles', '4K export', 'No watermark', 'Before/After slider', 'Priority support'], cta: 'Get Pro', href: null, highlighted: true, priceId: 'price_pro' },
  { name: 'Studio', price: '$59', period: '/mo', tokens: 1000, description: '1000 tokens/month', features: ['1000 AI generations', 'Custom watermark', '4K export', 'API access', 'White label', 'Dedicated support'], cta: 'Get Studio', href: null, highlighted: false, priceId: 'price_studio' },
]

export default function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (priceId: string, planName: string) => {
    setLoading(priceId)
    try {
      const res = await fetch('/api/stripe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId }) })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert('Stripe not configured yet. Add your Stripe keys in Vercel Environment Variables.')
    } catch { alert('Payment unavailable. Please try again later.') }
    setLoading(null)
  }

  return (
    <section id="pricing" style={{ background: '#0a0a0f', padding: '6rem 0', borderTop: '1px solid #2a2a3a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f5f5f0', marginBottom: '1rem' }}>
            Simple, transparent <span className="gold-gradient">pricing</span>
          </h2>
          <p style={{ color: '#9999aa', marginBottom: '0.5rem' }}>1 generation = 1 token. No hidden fees.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {plans.map(plan => (
            <div key={plan.name} className="glass-card" style={{ padding: '2rem', borderRadius: 20, border: plan.highlighted ? '1px solid rgba(201,168,76,0.4)' : '1px solid #2a2a3a', boxShadow: plan.highlighted ? '0 0 40px rgba(201,168,76,0.1)' : 'none', position: 'relative', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              {plan.highlighted && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #c9a84c, #f0c96e)', color: '#0a0a0f', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 1rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>Most Popular</div>}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '0.25rem', fontSize: '1.1rem' }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c9a84c', lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ color: '#9999aa', fontSize: '0.9rem' }}>{plan.period}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9999aa' }}>{plan.description}</div>
                <div style={{ marginTop: '0.5rem', display: 'inline-block', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: '#c9a84c' }}>
                  {plan.tokens === 3 ? '3 tokens' : `${plan.tokens} tokens/mo`}
                </div>
              </div>
              <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {plan.features.map(f => <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><Check size={14} color="#c9a84c" /><span style={{ color: '#9999aa' }}>{f}</span></li>)}
              </ul>
              {plan.href ? (
                <Link href={plan.href}><button className={plan.highlighted ? 'btn-gold' : 'btn-outline'} style={{ width: '100%' }}>{plan.cta}</button></Link>
              ) : (
                <button className={plan.highlighted ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', opacity: loading === plan.priceId ? 0.7 : 1 }} onClick={() => plan.priceId && handleCheckout(plan.priceId, plan.name)}>
                  {loading === plan.priceId ? 'Loading...' : plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
