'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, LayoutDashboard, FolderOpen, Settings, Wand2, LogOut, History, CreditCard, Clock } from 'lucide-react'

function Sidebar({ active }: { active: string }) {
  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Wand2, label: 'Studio', href: '/studio' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]
  return (
    <aside style={{ width: 240, background: '#111118', borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 10 }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#0a0a0f" /></div>
        <span style={{ fontWeight: 700, color: '#f5f5f0' }}>DesignAI</span>
      </div>
      <nav style={{ padding: '1rem', flex: 1 }}>
        {nav.map(item => { const Icon = item.icon; const isActive = active === item.label; return (
          <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 10, marginBottom: '0.25rem', background: isActive ? 'rgba(201,168,76,0.1)' : 'transparent', color: isActive ? '#c9a84c' : '#9999aa', fontSize: '0.9rem', fontWeight: isActive ? 600 : 400, transition: 'all 0.2s' }}>
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
  )
}

export default function HistoryPage() {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  if (status === 'loading') return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading...</div>
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex' }}>
      <Sidebar active="History" />
      <main style={{ marginLeft: 240, flex: 1, padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Generation History</h1>
          <p style={{ color: '#9999aa' }}>All your AI generations appear here after you generate designs.</p>
        </div>
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(22,22,31,0.8)', border: '1px solid #2a2a3a', borderRadius: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(201,168,76,0.05)', border: '2px dashed #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Clock size={36} color="#2a2a3a" />
          </div>
          <h2 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '0.5rem' }}>No generations yet</h2>
          <p style={{ color: '#9999aa', marginBottom: '1.5rem', maxWidth: 320, margin: '0 auto 1.5rem' }}>Your AI generation history will appear here once you start creating designs.</p>
          <Link href="/studio"><button className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Wand2 size={16} />Generate your first design</button></Link>
        </div>
      </main>
    </div>
  )
}
