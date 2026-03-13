'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, Download, RotateCcw, LayoutDashboard, FolderOpen, Settings, Wand2, LogOut, History } from 'lucide-react'

const mockHistory = [
  { id: 1, style: 'Modern', room: 'Living Room', date: '2026-03-13 14:32', color: '#6c47ff' },
  { id: 2, style: 'Minimal', room: 'Bedroom', date: '2026-03-12 10:15', color: '#c9a84c' },
  { id: 3, style: 'Luxury', room: 'Kitchen', date: '2026-03-11 16:45', color: '#28c840' },
  { id: 4, style: 'Scandinavian', room: 'Office', date: '2026-03-10 09:20', color: '#ff6b6b' },
]

function Sidebar({ active }: { active: string }) {
  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Wand2, label: 'Studio', href: '/studio' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]
  return (
    <aside style={{ width: 240, background: '#111118', borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 10 }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #c9a84c, #f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#0a0a0f" /></div>
        <span style={{ fontWeight: 700, color: '#f5f5f0' }}>DesignAI</span>
      </div>
      <nav style={{ padding: '1rem', flex: 1 }}>
        {nav.map(item => { const Icon = item.icon; const isActive = active === item.label; return (
          <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 10, marginBottom: '0.25rem', background: isActive ? 'rgba(201,168,76,0.1)' : 'transparent', color: isActive ? '#c9a84c' : '#9999aa', fontSize: '0.9rem', fontWeight: isActive ? 600 : 400 }}>
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
          <p style={{ color: '#9999aa' }}>All your AI generations in chronological order.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockHistory.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: '1.25rem', borderRadius: 16, display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}>
              <div style={{ width: 80, height: 60, borderRadius: 10, background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={24} color={item.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.25rem' }}>{item.style} — {item.room}</div>
                <div style={{ fontSize: '0.8rem', color: '#9999aa' }}>{item.date}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ padding: '0.5rem 1rem', borderRadius: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Download size={14} />Download</button>
                <Link href="/studio"><button style={{ padding: '0.5rem 1rem', borderRadius: 8, background: '#2a2a3a', border: 'none', color: '#9999aa', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><RotateCcw size={14} />Reuse</button></Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
