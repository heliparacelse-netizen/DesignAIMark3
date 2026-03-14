'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, History, Wand2, Settings, LogOut, Sparkles, Download, ArrowRight, Zap, Star, CreditCard } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  if (status === 'loading') return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading...</div>

  const freeUsed = (session?.user as any)?.freeGenerationsUsed || 0
  const freeLimit = 3
  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Wand2, label: 'Studio', href: '/studio' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex' }}>
      <aside style={{ width: 240, background: '#111118', borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 10 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#0a0a0f" /></div>
          <span style={{ fontWeight: 700, color: '#f5f5f0' }}>DesignAI</span>
        </div>
        <nav style={{ padding: '1rem', flex: 1 }}>
          {nav.map(item => { const Icon = item.icon; return (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 10, marginBottom: '0.25rem', background: (item as any).active ? 'rgba(201,168,76,0.1)' : 'transparent', color: (item as any).active ? '#c9a84c' : '#9999aa', fontSize: '0.9rem', fontWeight: (item as any).active ? 600 : 400, transition: 'all 0.2s' }}>
                <Icon size={18} />{item.label}
              </div>
            </Link>
          )})}
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid #2a2a3a' }}>
          <button onClick={() => signOut({ callbackUrl: '/' })} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9999aa', fontSize: '0.9rem', borderRadius: 10 }}>
            <LogOut size={18} />Sign out
          </button>
        </div>
      </aside>
      <main style={{ marginLeft: 240, flex: 1, padding: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Welcome back, {session?.user?.name || 'Designer'} 👋</h1>
        <p style={{ color: '#9999aa', marginBottom: '2rem' }}>Your AI interior design workspace.</p>
        <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#c9a84c', marginBottom: '0.5rem' }}>✦ {freeLimit - freeUsed} free generations remaining</div>
            <div style={{ width: 200, height: 6, background: '#2a2a3a', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, width: `${(freeUsed / freeLimit) * 100}%`, background: 'linear-gradient(90deg,#c9a84c,#f0c96e)', transition: 'width 0.5s' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9999aa', marginTop: '0.25rem' }}>{freeUsed}/{freeLimit} used · <Link href="/dashboard/billing" style={{ color: '#c9a84c', textDecoration: 'none' }}>Upgrade for unlimited</Link></div>
          </div>
          <Link href="/studio"><button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Generate now <ArrowRight size={16} /></button></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Projects', value: 0, icon: FolderOpen, color: '#c9a84c', href: '/dashboard/projects' },
            { label: 'Generations', value: freeUsed, icon: Zap, color: '#6c47ff', href: '/studio' },
            { label: 'Styles Used', value: 0, icon: Star, color: '#c9a84c', href: '/studio' },
            { label: 'Exports', value: 0, icon: Download, color: '#6c47ff', href: '/dashboard/history' },
          ].map(stat => { const Icon = stat.icon; return (
            <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 16, transition: 'transform 0.2s, border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#9999aa', fontSize: '0.85rem' }}>{stat.label}</span>
                  <Icon size={18} color={stat.color} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f5f5f0' }}>{stat.value}</div>
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
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Wand2 size={36} color="#2a2a3a" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ color: '#9999aa', fontSize: '0.85rem', marginBottom: '1rem' }}>No projects yet</p>
              <Link href="/studio"><button className="btn-gold" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>Create first design</button></Link>
            </div>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 16 }}>
            <h2 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '1rem' }}>Quick actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'New AI generation', href: '/studio', icon: Wand2, color: '#c9a84c' },
                { label: 'View projects', href: '/dashboard/projects', icon: FolderOpen, color: '#6c47ff' },
                { label: 'Generation history', href: '/dashboard/history', icon: History, color: '#c9a84c' },
                { label: 'Upgrade plan', href: '/dashboard/billing', icon: CreditCard, color: '#6c47ff' },
              ].map(action => { const Icon = action.icon; return (
                <Link key={action.label} href={action.href} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 10, background: '#0a0a0f', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#16161f')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0f')}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} color={action.color} />
                    </div>
                    <span style={{ color: '#f5f5f0', fontSize: '0.9rem' }}>{action.label}</span>
                    <ArrowRight size={14} color="#9999aa" style={{ marginLeft: 'auto' }} />
                  </div>
                </Link>
              )})}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
