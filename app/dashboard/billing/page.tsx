'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, LayoutDashboard, FolderOpen, History, Wand2, LogOut, Settings, CreditCard, Check, Zap, MessageCircle, ShoppingCart, Plus, Minus } from 'lucide-react'
import api from '@/lib/api'
import SidebarChat from '@/components/SidebarChat'

const plans = [
  { name: 'Free', price: '$0', period: '', tokens: 75, features: ['75 tokens/month', '3 redesigns (25 tokens each)', '5 chat messages (15 tokens each)', 'Watermarked export', 'All styles'], current: true, priceId: null },
  { name: 'Starter', price: '$12', period: '/mo', tokens: 500, features: ['500 tokens/month', '20 redesigns', '33 chat messages', 'HD export', 'No watermark'], current: false, priceId: 'price_starter' },
  { name: 'Pro', price: '$29', period: '/mo', tokens: 1500, features: ['1500 tokens/month', '60 redesigns', '100 chat messages', 'HD export', 'No watermark', 'Priority queue'], current: false, priceId: 'price_pro', highlighted: true },
  { name: 'Studio', price: '$59', period: '/mo', tokens: 5000, features: ['5000 tokens/month', '200 redesigns', '333 chat messages', 'HD export', 'No watermark', 'Fast generation'], current: false, priceId: 'price_studio' },
]

const tokenPacks = [
  { id: 'pack_50', tokens: 50, price: 2.99, label: '50 tokens', per: '~2 redesigns or 3 chats' },
  { id: 'pack_150', tokens: 150, price: 7.99, label: '150 tokens', per: '~6 redesigns or 10 chats', popular: true },
  { id: 'pack_500', tokens: 500, price: 19.99, label: '500 tokens', per: '~20 redesigns or 33 chats' },
  { id: 'pack_1500', tokens: 1500, price: 49.99, label: '1500 tokens', per: '~60 redesigns or 100 chats' },
]

export default function BillingPage() {
  const router = useRouter()
  const [chatOpen, setChatOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [tokens, setTokens] = useState(0)
  const [plan, setPlan] = useState('free')
  const [customTokens, setCustomTokens] = useState(100)
  const [activeTab, setActiveTab] = useState<'plans' | 'packs'>('packs')

  useEffect(() => {
    if (!api.getToken()) { router.push('/login'); return }
    api.get('/api/tokens').then(data => {
      if (data.tokens !== undefined) { setTokens(data.tokens); setPlan(data.plan || 'free') }
    })
  }, [])

  const handlePlanCheckout = async (priceId: string) => {
    setLoading(priceId)
    const data = await api.post('/api/stripe/checkout', { priceId })
    if (data.url) window.location.href = data.url
    else alert('Stripe not configured yet. Add STRIPE_SECRET_KEY on Render.')
    setLoading(null)
  }

  const handlePackCheckout = async (packId: string) => {
    setLoading(packId)
    const data = await api.post('/api/tokens/buy', { packId })
    if (data.url) window.location.href = data.url
    else alert(data.error || 'Stripe not configured yet.')
    setLoading(null)
  }

  const customPrice = ((customTokens / 50) * 2.99).toFixed(2)

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
            <MessageCircle size={18} />Roomvera AI Chat
          </button>
          <button onClick={() => { api.removeToken(); router.push('/') }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9999aa', fontSize: '0.9rem', borderRadius: 10 }}>
            <LogOut size={18} />Sign out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: 240, flex: 1, padding: '2rem', marginRight: chatOpen ? 380 : 0, transition: 'margin-right 0.3s' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Billing & Plans</h1>
          <p style={{ color: '#9999aa' }}>Current plan: <span style={{ color: '#c9a84c', textTransform: 'capitalize', fontWeight: 600 }}>{plan}</span> · <span style={{ color: '#f5f5f0', fontWeight: 600 }}>{tokens} tokens</span> remaining</p>
        </div>

        <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 14, padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9999aa', fontSize: '0.85rem' }}>
            <Zap size={14} color="#c9a84c" /><span>1 AI redesign = <strong style={{ color: '#f5f5f0' }}>25 tokens</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9999aa', fontSize: '0.85rem' }}>
            <MessageCircle size={14} color="#c9a84c" /><span>1 chat message = <strong style={{ color: '#f5f5f0' }}>15 tokens</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9999aa', fontSize: '0.85rem' }}>
            <Sparkles size={14} color="#c9a84c" /><span>Free plan watermark · Paid plans no watermark</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['packs', 'plans'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '0.5rem 1.5rem', borderRadius: '9999px', border: activeTab === tab ? '1px solid rgba(201,168,76,0.4)' : '1px solid #2a2a3a', background: activeTab === tab ? 'rgba(201,168,76,0.1)' : 'transparent', color: activeTab === tab ? '#c9a84c' : '#9999aa', cursor: 'pointer', fontWeight: activeTab === tab ? 600 : 400, textTransform: 'capitalize' }}>
              {tab === 'packs' ? '🪙 Buy Tokens' : '📋 Monthly Plans'}
            </button>
          ))}
        </div>

        {activeTab === 'packs' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {tokenPacks.map(pack => (
                <div key={pack.id} className="glass-card" style={{ padding: '1.5rem', borderRadius: 16, border: pack.popular ? '1px solid rgba(201,168,76,0.4)' : '1px solid #2a2a3a', position: 'relative', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                  {pack.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', color: '#0a0a0f', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.75rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>Best Value</div>}
                  <div style={{ fontWeight: 700, color: '#f5f5f0', fontSize: '1.2rem', marginBottom: '0.25rem' }}>{pack.tokens} tokens</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c9a84c', marginBottom: '0.25rem' }}>${pack.price}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9999aa', marginBottom: '1.25rem' }}>{pack.per}</div>
                  <button onClick={() => handlePackCheckout(pack.id)} className={pack.popular ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading === pack.id ? 0.7 : 1 }}>
                    <ShoppingCart size={14} />{loading === pack.id ? 'Loading...' : 'Buy now'}
                  </button>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 16, marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '1rem' }}>🎯 Custom amount</h3>
              <p style={{ color: '#9999aa', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Choose exactly how many tokens you want.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => setCustomTokens(Math.max(50, customTokens - 50))} style={{ width: 32, height: 32, borderRadius: 8, background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5f5f0' }}><Minus size={14} /></button>
                  <div style={{ background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 8, padding: '0.4rem 1rem', color: '#f5f5f0', fontWeight: 700, fontSize: '1.1rem', minWidth: 80, textAlign: 'center' }}>{customTokens}</div>
                  <button onClick={() => setCustomTokens(customTokens + 50)} style={{ width: 32, height: 32, borderRadius: 8, background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5f5f0' }}><Plus size={14} /></button>
                </div>
                <div style={{ color: '#9999aa', fontSize: '0.85rem' }}>
                  = ~{Math.floor(customTokens / 25)} redesigns or ~{Math.floor(customTokens / 15)} chat messages
                </div>
                <div style={{ color: '#c9a84c', fontWeight: 700, fontSize: '1.2rem', marginLeft: 'auto' }}>${customPrice}</div>
              </div>
              <input type="range" min={50} max={2000} step={50} value={customTokens} onChange={e => setCustomTokens(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#c9a84c', marginBottom: '1rem' }} />
              <button onClick={() => handlePackCheckout('pack_custom')} className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingCart size={16} />Buy {customTokens} tokens for ${customPrice}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {plans.map(plan => (
              <div key={plan.name} className="glass-card" style={{ padding: '2rem', borderRadius: 20, border: (plan as any).highlighted ? '1px solid rgba(201,168,76,0.4)' : plan.current ? '1px solid rgba(40,200,64,0.3)' : '1px solid #2a2a3a', position: 'relative', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                {(plan as any).highlighted && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', color: '#0a0a0f', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 1rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>Most Popular</div>}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 700, color: '#f5f5f0', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c9a84c', lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ color: '#9999aa' }}>{plan.period}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9999aa', marginTop: '0.25rem' }}>{plan.tokens} tokens/month</div>
                </div>
                <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {plan.features.map(f => <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#9999aa' }}><Check size={13} color="#c9a84c" style={{ marginTop: 2, flexShrink: 0 }} />{f}</li>)}
                </ul>
                {plan.current ? (
                  <button disabled style={{ width: '100%', padding: '0.75rem', borderRadius: '9999px', background: 'rgba(40,200,64,0.1)', border: '1px solid rgba(40,200,64,0.3)', color: '#28c840', cursor: 'default', fontWeight: 600 }}>Current Plan</button>
                ) : (
                  <button onClick={() => plan.priceId && handlePlanCheckout(plan.priceId)} className={(plan as any).highlighted ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading === plan.priceId ? 0.7 : 1 }}>
                    <Zap size={14} />{loading === plan.priceId ? 'Loading...' : `Get ${plan.name}`}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <SidebarChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
