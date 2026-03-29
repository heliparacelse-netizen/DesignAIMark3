'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react'
import api from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const data = await api.post('/api/auth/login', { email, password }, false)
    if (data.token) { api.setToken(data.token); router.push('/dashboard') }
    else { setError(data.error || 'Login failed'); setLoading(false) }
  }

  const inputStyle: any = { width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem 0.75rem 0.75rem 2.5rem', color: '#f5f5f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#c9a84c,#f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={20} color="#0a0a0f" /></div>
            <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#f5f5f0' }}>Roomvera AI</span>
          </Link>
        </div>
        <div className="glass-card" style={{ padding: '2.5rem', borderRadius: 20 }}>
          <h1 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#f5f5f0', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome back</h1>
          <p style={{ color: '#9999aa', textAlign: 'center', marginBottom: '2rem' }}>Sign in to your account</p>
          {error && <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 8, padding: '0.75rem', color: '#ff8080', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#9999aa" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={inputStyle} />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#9999aa" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : <><span>Sign in</span><ArrowRight size={16} /></>}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#9999aa', fontSize: '0.85rem', marginTop: '1.5rem' }}>
            No account? <Link href="/register" style={{ color: '#c9a84c', textDecoration: 'none' }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
