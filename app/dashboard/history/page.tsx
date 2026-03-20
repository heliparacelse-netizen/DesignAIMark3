'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, LayoutDashboard, FolderOpen, Settings, Wand2, LogOut, History, CreditCard, Download, RotateCcw, MessageCircle, Trash2 } from 'lucide-react'
import api from '@/lib/api'
import SidebarChat from '@/components/SidebarChat'

export default function HistoryPage() {
  const router = useRouter()
  const [generations, setGenerations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    if (!api.getToken()) { router.push('/login'); return }
    api.get('/api/generations').then(data => {
      setGenerations(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  const handleDelete = async (id: string) => {
    await api.delete(`/api/generations/${id}`)
    setGenerations(prev => prev.filter(g => g._id !== id))
  }

  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
    { icon: History, label: 'History', href: '/dashboard/history', active: true },
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
          <span style={{ fontWeight: 800, color: '#f5f5f0', fontSize: '1.1rem' }}>Lumara</span>
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
            <MessageCircle size={18} />Lumara AI
          </button>
          <button onClick={() => { api.removeToken(); router.push('/') }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9999aa', fontSize: '0.9rem', borderRadius: 10 }}>
            <LogOut size={18} />Sign out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: 240, flex: 1, padding: '2rem', marginRight: chatOpen ? 380 : 0, transition: 'margin-right 0.3s' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Generation History</h1>
          <p style={{ color: '#9999aa' }}>{generations.length} AI generation{generations.length !== 1 ? 's' : ''} total</p>
        </div>

        {generations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(22,22,31,0.8)', border: '1px solid #2a2a3a', borderRadius: 20 }}>
            <History size={48} color="#2a2a3a" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '0.5rem' }}>No generations yet</h2>
            <p style={{ color: '#9999aa', marginBottom: '1.5rem' }}>Your AI generations will appear here after you create designs.</p>
            <Link href="/studio"><button className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Wand2 size={16} />Generate your first design</button></Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {generations.map((g: any) => (
              <div key={g._id} className="glass-card" style={{ padding: '1.25rem', borderRadius: 16, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {g.imageUrl && g.imageUrl !== 'ERROR' ? (
                  <img src={g.imageUrl} alt="generated" style={{ width: 100, height: 70, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 100, height: 70, borderRadius: 10, background: g.imageUrl === 'ERROR' ? 'rgba(255,80,80,0.1)' : '#2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {g.imageUrl === 'ERROR' ? <span style={{ color: '#ff8080', fontSize: '0.7rem' }}>Failed</span> : <span style={{ color: '#9999aa', fontSize: '0.7rem' }}>Pending...</span>}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.25rem' }}>{g.style} — {g.roomType}</div>
                  <div style={{ fontSize: '0.78rem', color: '#9999aa', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.prompt}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9999aa' }}>{new Date(g.createdAt).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {g.imageUrl && g.imageUrl !== 'ERROR' && (
                    <a href={g.imageUrl} download style={{ padding: '0.5rem 0.85rem', borderRadius: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                      <Download size={13} />Download
                    </a>
                  )}
                  <Link href={`/studio?prompt=${encodeURIComponent(g.prompt || '')}&style=${g.style}&room=${g.roomType}`}>
                    <button style={{ padding: '0.5rem 0.85rem', borderRadius: 8, background: '#2a2a3a', border: 'none', color: '#9999aa', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <RotateCcw size={13} />Reuse
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(g._id)} style={{ padding: '0.5rem', borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: 'none', color: '#ff8080', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
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
