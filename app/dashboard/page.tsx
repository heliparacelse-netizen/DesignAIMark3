'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, History, Wand2, Settings, LogOut, Sparkles, Download, ArrowRight, Zap, Star, CreditCard, MessageCircle } from 'lucide-react'
import api from '@/lib/api'
import SidebarChat from '@/components/SidebarChat'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [tokens, setTokens] = useState(0)
  const [plan, setPlan] = useState('free')
  const [projects, setProjects] = useState<any[]>([])
  const [generations, setGenerations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const token = api.getToken()
    if (!token) { router.push('/login'); return }
    Promise.all([
      api.get('/api/auth/me'),
      api.get('/api/tokens'),
      api.get('/api/projects'),
      api.get('/api/generations'),
    ]).then(([userData, tokenData, projectsData, genData]) => {
      if (userData.error) { router.push('/login'); return }
      setUser(userData)
      setTokens(tokenData.tokens || 0)
      setPlan(tokenData.plan || 'free')
      setProjects(Array.isArray(projectsData) ? projectsData.slice(0, 4) : [])
      setGenerations(Array.isArray(genData) ? genData.slice(0, 3) : [])
      setLoading(false)
    }).catch(() => { router.push('/login') })
  }, [])

  const handleSignOut = () => { api.removeToken(); router.push('/') }

  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Wand2, label: 'Studio', href: '/studio' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  if (loading) return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading...</div>

  const planLimit: any = { free: 3, starter: 120, pro: 350, studio: 1000 }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex' }}>
      <aside style={{ width: 240, background: '#111118', borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 20 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#0a0a0f" /></div>
          <span style={{ fontWeight: 800, color: '#f5f5f0', fontSize: '1.1rem' }}>Lumara</span>
        </div>
        <nav style={{ padding: '1rem', flex: 1 }}>
          {nav.map(item => { const Icon = item.icon; return (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 10, marginBottom: '0.25rem', background: item.active ? 'rgba(201,168,76,0.1)' : 'transparent', color: item.active ? '#c9a84c' : '#9999aa', fontSize: '0.9rem', fontWeight: item.active ? 600 : 400, transition: 'all 0.2s' }}>
                <Icon size={18} />{item.label}
              </div>
            </Link>
          )})}
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button onClick={() => setChatOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', cursor: 'pointer', color: '#c9a84c', fontSize: '0.9rem', borderRadius: 10, fontWeight: 600 }}>
            <MessageCircle size={18} />Lumara AI
          </button>
          <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9999aa', fontSize: '0.9rem', borderRadius: 10 }}>
            <LogOut size={18} />Sign out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: 240, flex: 1, padding: '2rem', marginRight: chatOpen ? 380 : 0, transition: 'margin-right 0.3s' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Welcome back, {user?.name || 'Designer'} 👋</h1>
        <p style={{ color: '#9999aa', marginBottom: '2rem' }}>Your AI interior design workspace.</p>

        <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#c9a84c', marginBottom: '0.5rem' }}>✦ {tokens} token{tokens !== 1 ? 's' : ''} remaining · <span style={{ textTransform: 'capitalize' }}>{plan}</span> plan</div>
            <div style={{ width: 200, height: 6, background: '#2a2a3a', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, width: `${Math.min((tokens / (planLimit[plan] || 3)) * 100, 100)}%`, background: 'linear-gradient(90deg,#c9a84c,#f0c96e)', transition: 'width 0.5s' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9999aa', marginTop: '0.25rem' }}>{tokens}/{planLimit[plan] || 3} · <Link href="/dashboard/billing" style={{ color: '#c9a84c', textDecoration: 'none' }}>Upgrade</Link></div>
          </div>
          <Link href="/studio"><button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Generate now <ArrowRight size={16} /></button></Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Projects', value: projects.length, icon: FolderOpen, color: '#c9a84c', href: '/dashboard/projects' },
            { label: 'Generations', value: generations.length, icon: Zap, color: '#6c47ff', href: '/dashboard/history' },
            { label: 'Tokens Left', value: tokens, icon: Star, color: '#c9a84c', href: '/dashboard/billing' },
            { label: 'Plan', value: plan.charAt(0).toUpperCase() + plan.slice(1), icon: CreditCard, color: '#6c47ff', href: '/dashboard/billing' },
          ].map(stat => { const Icon = stat.icon; return (
            <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 16, transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#9999aa', fontSize: '0.85rem' }}>{stat.label}</span>
                  <Icon size={18} color={stat.color} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f5f5f0' }}>{stat.value}</div>
              </div>
            </Link>
          )})}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontWeight: 700, color: '#f5f5f0' }}>Recent projects</h2>
              <Link href="/dashboard/projects" style={{ color: '#c9a84c', fontSize: '0.85rem', textDecoration: 'none' }}>View all</Link>
            </div>
            {projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <Wand2 size={36} color="#2a2a3a" style={{ margin: '0 auto 0.75rem' }} />
                <p style={{ color: '#9999aa', fontSize: '0.85rem', marginBottom: '1rem' }}>No projects yet</p>
                <Link href="/studio"><button className="btn-gold" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>Create first design</button></Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {projects.map((p: any) => (
                  <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem', background: '#0a0a0f', borderRadius: 10 }}>
                    {p.coverUrl ? <img src={p.coverUrl} alt={p.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} /> : <div style={{ width: 40, height: 40, borderRadius: 8, background: '#2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#c9a84c" /></div>}
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#f5f5f0', fontSize: '0.85rem', fontWeight: 600 }}>{p.name}</div>
                      <div style={{ color: '#9999aa', fontSize: '0.75rem' }}>{p.style} · {p.roomType}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontWeight: 700, color: '#f5f5f0' }}>Recent generations</h2>
              <Link href="/dashboard/history" style={{ color: '#c9a84c', fontSize: '0.85rem', textDecoration: 'none' }}>View all</Link>
            </div>
            {generations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <History size={36} color="#2a2a3a" style={{ margin: '0 auto 0.75rem' }} />
                <p style={{ color: '#9999aa', fontSize: '0.85rem' }}>No generations yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {generations.map((g: any) => (
                  <div key={g._id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem', background: '#0a0a0f', borderRadius: 10 }}>
                    {g.imageUrl && g.imageUrl !== 'ERROR' ? <img src={g.imageUrl} alt="gen" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} /> : <div style={{ width: 40, height: 40, borderRadius: 8, background: '#2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={16} color="#6c47ff" /></div>}
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#f5f5f0', fontSize: '0.85rem', fontWeight: 600 }}>{g.style} · {g.roomType}</div>
                      <div style={{ color: '#9999aa', fontSize: '0.75rem' }}>{new Date(g.createdAt).toLocaleDateString()}</div>
                    </div>
                    {g.imageUrl && g.imageUrl !== 'ERROR' && (
                      <a href={g.imageUrl} download style={{ color: '#9999aa' }}><Download size={14} /></a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <SidebarChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
