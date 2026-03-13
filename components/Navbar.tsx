'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? 'rgba(10,10,15,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid #2a2a3a' : 'none', transition: 'all 0.3s' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #c9a84c, #f0c96e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="#0a0a0f" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f5f5f0' }}>DesignAI</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          {['Product', 'Studio', 'Pricing', 'Contact'].map(item => (
            <Link key={item} href={item === 'Studio' ? '/studio' : `#${item.toLowerCase()}`} style={{ color: '#9999aa', fontSize: '0.9rem', textDecoration: 'none' }}>{item}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {session ? (
            <>
              <Link href="/dashboard"><button className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Dashboard</button></Link>
              <button className="btn-gold" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login"><button className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Sign in</button></Link>
              <Link href="/register"><button className="btn-gold" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Start free</button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
