'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Plus, FolderOpen, Trash2, ExternalLink, LayoutDashboard, History, Settings, Wand2, LogOut, CreditCard, MessageCircle } from 'lucide-react'
import api from '@/lib/api'
import SidebarChat from '@/components/SidebarChat'

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    if (!api.getToken()) { router.push('/login'); return }
    api.get('/api/projects').then(data => {
      setProjects(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  const handleDelete = async (id: string) => {
    await api.delete(`/api/projects/${id}`)
    setProjects(prev => prev.filter(p => p._id !== id))
  }

  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects', active: true },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Wand2, label: 'Studio', href: '/studio' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  if (loading) return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading...</div>

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Projects</h1>
            <p style={{ color: '#9999aa' }}>{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/studio"><button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16} />New project</button></Link>
        </div>

        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(22,22,31,0.8)', border: '1px solid #2a2a3a', borderRadius: 20 }}>
            <FolderOpen size={48} color="#2a2a3a" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '0.5rem' }}>No projects yet</h2>
            <p style={{ color: '#9999aa', marginBottom: '1.5rem' }}>Generate a design to automatically create your first project.</p>
            <Link href="/studio"><button className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Wand2 size={16} />Start your first design</button></Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {projects.map((p: any) => (
              <div key={p._id} className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ height: 180, background: p.coverUrl ? 'none' : 'linear-gradient(135deg,#1a1228,#2a1a3a)', position: 'relative' }}>
                  {p.coverUrl ? <img src={p.coverUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={40} color="#6c47ff" /></div>}
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(10,10,15,0.8)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.73rem', color: '#f5f5f0' }}>{p.style}</div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.25rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#9999aa', marginBottom: '1rem' }}>{p.roomType} · {new Date(p.createdAt).toLocaleDateString()}</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href="/studio" style={{ flex: 1, textDecoration: 'none' }}>
                      <button style={{ width: '100%', padding: '0.4rem', borderRadius: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                        <ExternalLink size={12} />Open
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(p._id)} style={{ padding: '0.4rem 0.75rem', borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: 'none', color: '#ff8080', cursor: 'pointer' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <SidebarChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
