'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, History, Wand2, Settings, LogOut, Sparkles, TrendingUp, Image, Download, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  if (status === 'loading') return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading...</div>

  const freeUsed = (session?.user as any)?.freeGenerationsUsed || 0
  const freeLimit = 3

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex' }}>
      <aside style={{ width: 240, background: '#111118', borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #c9a84c, #f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="#0a0a0f" />
          </div>
          <span style={{ fontWeight: 700, color: '#f5f5f0' }}>DesignAI</span>
        </div>
        <nav style={{ padding: '1rem', flex: 1 }}>
          {[
            { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
            { icon: FolderOpen, label: 'Projects', href: '/dashboard' },
            { icon: History, label: 'History', href: '/dashboard' },
            { icon: Wand2, label: 'Studio', href: '/studio' },
            { icon: Settings, label: 'Settings', href: '/dashboard' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 10, marginBottom: '0.25rem', background: item.active ? 'rgba(201,168,76,0.1)' : 'transparent', color: item.active ? '#c9a84c' : '#9999aa', fontSize: '0.9rem', fontWeight: item.active ? 600 : 400 }}>
                  <Icon size={18} />{item.label}
                </div>
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid #2a2a3a' }}>
          <button onClick={() => signOut({ callbackUrl: '/' })} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9999aa', fontSize: '0.9rem', borderRadius: 10 }}>
            <LogOut size={18} />Sign out
          </button>
        </div>
      </aside>
      <main style={{ marginLeft: 240, flex: 1, padding: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Welcome back, {session?.user?.name || 'Designer'} 👋</h1>
        <p style={{ color: '#9999aa', marginBottom: '2rem' }}>Here's what's happening with your projects.</p>
        <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#c9a84c', marginBottom: '0.5rem' }}>✦ {freeLimit - freeUsed} free generations remaining</div>
            <div style={{ width: 200, height: 6, background: '#2a2a3a', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, width: `${(freeUsed / freeLimit) * 100}%`, background: 'linear-gradient(90deg, #c9a84c, #f0c96e)' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9999aa', marginTop: '0.25rem' }}>{freeUsed}/{freeLimit} used</div>
          </div>
          <Link href="/studio"><button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Generate now <ArrowRight size={16} /></button></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ label: 'Projects', value: freeUsed, icon: Image }, { label: 'Styles Used', value: 3, icon: TrendingUp }, { label: 'Exports', value: 0, icon: Download }].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="glass-card" style={{ padding: '1.5rem', borderRadius: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><span style={{ color: '#9999aa', fontSize: '0.85rem' }}>{stat.label}</span><Icon size={18} color="#c9a84c" /></div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f5f5f0' }}>{stat.value}</div>
              </div>
            )
          })}
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 16, textAlign: 'center' }}>
          <Wand2 size={40} color="#2a2a3a" style={{ margin: '2rem auto 1rem' }} />
          <p style={{ color: '#9999aa' }}>No projects yet.</p>
          <Link href="/studio"><button className="btn-gold" style={{ marginTop: '1rem' }}>Create your first design</button></Link>
        </div>
      </main>
    </div>
  )
}
