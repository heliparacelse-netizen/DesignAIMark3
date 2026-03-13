'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, Plus, FolderOpen, Trash2, Copy, ExternalLink, LayoutDashboard, History, Settings, Wand2, LogOut } from 'lucide-react'

const mockProjects = [
  { id: 1, name: 'Modern Living Room', style: 'Modern', date: '2026-03-10', color: '#6c47ff' },
  { id: 2, name: 'Minimal Bedroom', style: 'Minimal', date: '2026-03-11', color: '#c9a84c' },
  { id: 3, name: 'Luxury Kitchen', style: 'Luxury', date: '2026-03-12', color: '#28c840' },
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

export default function ProjectsPage() {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  if (status === 'loading') return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading...</div>
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex' }}>
      <Sidebar active="Projects" />
      <main style={{ marginLeft: 240, flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Projects</h1>
            <p style={{ color: '#9999aa' }}>All your AI-generated interior designs.</p>
          </div>
          <Link href="/studio"><button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16} />Create new project</button></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {mockProjects.map(project => (
            <div key={project.id} className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ height: 180, background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Sparkles size={48} color={project.color} />
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(10,10,15,0.8)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#f5f5f0' }}>{project.style}</div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.25rem' }}>{project.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#9999aa', marginBottom: '1rem' }}>{project.date}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ flex: 1, padding: '0.4rem', borderRadius: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}><ExternalLink size={12} />Open</button>
                  <button style={{ flex: 1, padding: '0.4rem', borderRadius: 8, background: '#2a2a3a', border: 'none', color: '#9999aa', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}><Copy size={12} />Duplicate</button>
                  <button style={{ padding: '0.4rem 0.75rem', borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: 'none', color: '#ff8080', cursor: 'pointer' }}><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
          <Link href="/studio" style={{ textDecoration: 'none' }}>
            <div style={{ borderRadius: 16, minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer', border: '2px dashed #2a2a3a', transition: 'border-color 0.2s', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#c9a84c50')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a3a')}>
              <Plus size={40} color="#2a2a3a" />
              <span style={{ color: '#9999aa', fontSize: '0.9rem' }}>New project</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
