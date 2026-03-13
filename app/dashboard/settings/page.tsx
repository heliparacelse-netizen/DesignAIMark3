'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, User, Mail, Lock, Globe, CreditCard, LayoutDashboard, FolderOpen, History, Wand2, LogOut, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'

function Sidebar() {
  return (
    <aside style={{ width: 240, background: '#111118', borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0 }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #c9a84c, #f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#0a0a0f" /></div>
        <span style={{ fontWeight: 700, color: '#f5f5f0' }}>DesignAI</span>
      </div>
      <nav style={{ padding: '1rem', flex: 1 }}>
        {[
          { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
          { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
          { icon: History, label: 'History', href: '/dashboard/history' },
          { icon: Wand2, label: 'Studio', href: '/studio' },
          { icon: Settings, label: 'Settings', href: '/dashboard/settings', active: true },
        ].map(item => {
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
  )
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [language, setLanguage] = useState('en')
  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  if (status === 'loading') return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>Loading...</div>

  const inputStyle: any = { width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem 1rem', color: '#f5f5f0', fontSize: '0.9rem', outline: 'none' }
  const sectionStyle: any = { background: 'rgba(22,22,31,0.8)', border: '1px solid #2a2a3a', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, flex: 1, padding: '2rem', maxWidth: 700 }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f5f5f0', marginBottom: '0.25rem' }}>Settings</h1>
          <p style={{ color: '#9999aa' }}>Manage your account preferences.</p>
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <User size={18} color="#c9a84c" /><h2 style={{ fontWeight: 700, color: '#f5f5f0' }}>Profile</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#9999aa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Display name</label>
              <input type="text" defaultValue={session?.user?.name || ''} style={inputStyle} />
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Mail size={18} color="#c9a84c" /><h2 style={{ fontWeight: 700, color: '#f5f5f0' }}>Email</h2>
          </div>
          <input type="email" defaultValue={session?.user?.email || ''} style={inputStyle} />
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Lock size={18} color="#c9a84c" /><h2 style={{ fontWeight: 700, color: '#f5f5f0' }}>Password</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="password" placeholder="Current password" style={inputStyle} />
            <input type="password" placeholder="New password" style={inputStyle} />
            <input type="password" placeholder="Confirm new password" style={inputStyle} />
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Globe size={18} color="#c9a84c" /><h2 style={{ fontWeight: 700, color: '#f5f5f0' }}>Language</h2>
          </div>
          <select value={language} onChange={e => setLanguage(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {[['en','English'],['fr','Français'],['es','Español'],['de','Deutsch'],['it','Italiano'],['pt','Português'],['nl','Nederlands'],['ja','日本語'],['zh','中文'],['ko','한국어'],['ar','العربية']].map(([code, label]) => (
              <option key={code} value={code} style={{ background: '#111118' }}>{label}</option>
            ))}
          </select>
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <CreditCard size={18} color="#c9a84c" /><h2 style={{ fontWeight: 700, color: '#f5f5f0' }}>Billing</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.25rem' }}>Free Plan</div>
              <div style={{ fontSize: '0.85rem', color: '#9999aa' }}>3 generations included</div>
            </div>
            <button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={16} />Manage subscription
            </button>
          </div>
        </div>

        <button className="btn-gold">Save changes</button>
      </main>
    </div>
  )
}
