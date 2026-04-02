'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, LayoutDashboard, FolderOpen, History, Wand2, LogOut, Settings, CreditCard, MessageCircle, Save } from 'lucide-react'
import api from '@/lib/api'
import SidebarChat from '@/components/SidebarChat'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const token = api.getToken()
    if (!token) { router.push('/login'); return }
    api.get('/api/auth/me').then(data => {
      if (data.error) { router.push('/login'); return }
      setUser(data)
      setName(data.name || '')
      setLoading(false)
    }).catch(() => router.push('/login'))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Wand2, label: 'Studio', href: '/studio' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings', active: true },
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
            <MessageCircle size={18} />Roomvera AI Chat
          </button>
          <button onClick={() => { api.removeToken(); router.push('/') }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9999aa', fontSize: '0.9rem', borderRadius: 10 }}>
            <LogOut size={18} />Sign out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: 240, flex: 1, padding: '2rem', marginRight: chatOpen ? 380 : 0, transition: 'margin-right 0.3s', maxWidth: 700 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '2rem' }}>Settings</h1>

        <div className="glass-card" style={{ padding: '2rem', borderRadius: 16, marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '1.5rem' }}>Profile</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#9999aa', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem', color: '#f5f5f0', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9999aa', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Email</label>
              <input value={user?.email || ''} disabled style={{ width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem', color: '#9999aa', boxSizing: 'border-box', opacity: 0.7 }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9999aa', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Plan</label>
              <div style={{ padding: '0.75rem', background: '#0a0a0f', borderRadius: 10, border: '1px solid #2a2a3a', color: '#c9a84c', fontWeight: 600, textTransform: 'capitalize' }}>{user?.plan || 'free'}</div>
            </div>
            <button onClick={handleSave} disabled={saving} className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content', opacity: saving ? 0.7 : 1 }}>
              <Save size={16} />{saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save changes'}
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem', borderRadius: 16 }}>
          <h2 style={{ fontWeight: 700, color: '#f5f5f0', marginBottom: '1rem' }}>Danger zone</h2>
          <button onClick={() => { api.removeToken(); router.push('/') }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: 10, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff8080', cursor: 'pointer', fontSize: '0.9rem' }}>
            <LogOut size={16} />Sign out of all devices
          </button>
        </div>
      </main>
      <SidebarChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
