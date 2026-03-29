'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, LayoutDashboard, FolderOpen, History, Wand2, LogOut, Settings, CreditCard, Check, Zap, MessageCircle } from 'lucide-react'
import api from '@/lib/api'
import SidebarChat from '@/components/SidebarChat'

const plans = [
  { name: 'Free', price: '$0', period: '', tokens: 3, features: ['3 AI generations', 'Basic styles', 'Watermarked export'], current: true, priceId: null },
  { name: 'Starter', price: '$12', period: '/mo', tokens: 120, features: ['120 generations/mo', 'All styles', 'HD export', 'No watermark'], current: false, priceId: 'price_starter' },
  { name: 'Pro', price: '$29', period: '/mo', tokens: 350, features: ['350 generations/mo', 'All styles', '4K export', 'Priority support'], current: false, priceId: 'price_pro', highlighted: true },
  { name: 'Studio', price: '$59', period: '/mo', tokens: 1000, features: ['1000 generations/mo', 'Custom watermark', 'API access'], current: false, priceId: 'price_studio' },
]

export default function BillingPage() {
  const router = useRouter()
  const [chatOpen, setChatOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!api.getToken()) router.push('/login')
  }, [])

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId)
    const data = await api.post('/api/stripe/checkout', { priceId })
    if (data.url) window.location.href = data.url
    else alert('Stripe not configured yet.')
    setLoading(null)
  }

  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Wand2, label: 'Studio', href: '/studio' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing', active: true },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex' }}>
      <aside style={{ width: 240, background: '#111118', borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 20 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#0a0a0f" /></div>
          <span style={{ fontWeight: 800, color: '#f5f5f0', fontSize: '1.1rem' }}>Roomvera AI</span>
        </div>
        <nav style={{ padding: '1rem', flex: 1 }}>
          {nav.map(item => { const Icon = item.icon; return (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 10, marginBottom: '0.25rem', background: (item as any).active ? 'rgba(201,168,76,0.1)' : 'transparent', color: (item as any).active ? '#c9a84c' : '#9999aa', fontSize: '0.9rem', fontWeight: (item as any).active ? 600 : 400 }}>
                <Icon size={18} />{item.label}
              </div>
            </Link>
          )})}
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button onClick={() => setChatOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', cursor: 'pointer', color: '#c9a84c', fontSize: '0.9rem', borderRadius: 10, fontWeight: 600 }}>
            <MessageCircle size={18} />Roomvera AI
          </button>
          <button onClick={() => { api.removeToken(); router.push('/') }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9999aa', fontSize: '0.9rem', borderRadius: 10 }}>
            <LogOut size={18} />Sign out
          </button>
        </div>
      </aside>
      <main style={{ marginLeft: 240, flex: 1, padding: '2rem', marginRight: chatOpen ? 380 : 0, transition: 'margin-right 0.3s' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Billing & Plans</h1>
          <p style={{ color: '#9999aa' }}>Upgrade to unlock more AI generations.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {plans.map(plan => (
            <div key={plan.name} style={{ padding: '2rem', borderRadius: 20, border: (plan as any).highlighted ? '1px solid rgba(201,168,76,0.4)' : plan.current ? '1px solid rgba(40,200,64,0.3)' : '1px solid #2a2a3a', background: 'rgba(22,22,31,0.8)', position: 'relative', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              {(plan as any).highlighted && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', color: '#0a0a0f', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 1rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>Most Popular</div>}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 700, color: '#f5f5f0', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c9a84c' }}>{plan.price}</span>
                  <span style={{ color: '#9999aa' }}>{plan.period}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9999aa', marginTop: '0.25rem' }}>{plan.tokens === 3 ? '3 tokens' : `${plan.tokens} tokens/mo`}</div>
              </div>
              <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {plan.features.map(f => <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#9999aa' }}><Check size={14} color="#c9a84c" />{f}</li>)}
              </ul>
              {plan.current ? (
                <button disabled style={{ width: '100%', padding: '0.75rem', borderRadius: '9999px', background: 'rgba(40,200,64,0.1)', border: '1px solid rgba(40,200,64,0.3)', color: '#28c840', cursor: 'default' }}>Current Plan</button>
              ) : (
                <button onClick={() => plan.priceId && handleCheckout(plan.priceId)} className={(plan as any).highlighted ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading === plan.priceId ? 0.7 : 1 }}>
                  <Zap size={16} />{loading === plan.priceId ? 'Loading...' : `Get ${plan.name}`}
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
      <SidebarChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
