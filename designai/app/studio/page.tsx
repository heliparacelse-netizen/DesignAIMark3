'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Upload, Wand2, Sparkles, ArrowLeft, RotateCcw } from 'lucide-react'

const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room']
const styles = ['Modern', 'Minimal', 'Luxury', 'Scandinavian', 'Industrial', 'Classic']

export default function StudioPage() {
  const [room, setRoom] = useState('Living Room')
  const [style, setStyle] = useState('Modern')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2500))
    setGenerating(false)
    setGenerated(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      {/* Header */}
      <div style={{
        background: '#111118', borderBottom: '1px solid #2a2a3a',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <Link href="/dashboard" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: '#9999aa', textDecoration: 'none', fontSize: '0.85rem',
        }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <div style={{ width: 1, height: 20, background: '#2a2a3a' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#c9a84c" />
          <span style={{ fontWeight: 600, color: '#f5f5f0' }}>AI Studio</span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        display: 'grid', gridTemplateColumns: '360px 1fr',
        height: 'calc(100vh - 60px)',
      }}>
        {/* Left panel */}
        <div style={{
          background: '#111118', borderRight: '1px solid #2a2a3a',
          padding: '1.5rem', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>
          {/* Upload */}
          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              Upload your space
            </h3>
            <div style={{
              border: '2px dashed #2a2a3a', borderRadius: 12,
              padding: '2rem', textAlign: 'center', cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#c9a84c50')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a3a')}
            >
              <Upload size={28} color="#9999aa" style={{ margin: '0 auto 0.75rem' }} />
              <div style={{ color: '#9999aa', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                Drag & drop or click to upload
              </div>
              <div style={{ color: '#9999aa', fontSize: '0.75rem' }}>
                JPG, PNG, HEIC · Max 25MB
              </div>
            </div>
          </div>

          {/* Room type */}
          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              Room type
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {roomTypes.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoom(r)}
                  style={{
                    padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem',
                    background: room === r ? 'rgba(201,168,76,0.15)' : '#2a2a3a',
                    border: room === r ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent',
                    color: room === r ? '#c9a84c' : '#9999aa',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <h3 style={{ fontWeight: 600, color: '#f5f5f0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              Design style
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  style={{
                    padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem',
                    background: style === s ? 'rgba(108,71,255,0.15)' : '#2a2a3a',
                    border: style === s ? '1px solid rgba(108,71,255,0.4)' : '1px solid transparent',
                    color: style === s ? '#9070ff' : '#9999aa',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn-gold"
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.5rem',
              opacity: generating ? 0.8 : 1, marginTop: 'auto',
            }}
          >
            {generating ? (
              <><RotateCcw size={16} className="animate-spin" /> Generating...</>
            ) : (
              <><Wand2 size={16} /> Generate Design</>
            )}
          </button>
        </div>

        {/* Right panel — Preview */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0a0a0f', position: 'relative',
        }}>
          {generating ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '3px solid #2a2a3a',
                borderTop: '3px solid #c9a84c',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1.5rem',
              }} />
              <div style={{ color: '#c9a84c', fontWeight: 600 }}>AI is designing your space...</div>
              <div style={{ color: '#9999aa', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                {style} style · {room}
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : generated ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{
                width: 400, height: 300, borderRadius: 16,
                background: 'linear-gradient(135deg, #1a1228, #0a0a1a)',
                border: '1px solid rgba(108,71,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 0 60px rgba(108,71,255,0.2)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Sparkles size={48} color="#6c47ff" style={{ marginBottom: '1rem' }} />
                  <div style={{ color: '#9999aa', fontSize: '0.85rem' }}>
                    {style} {room} Design
                  </div>
                </div>
              </div>
              <button className="btn-gold">
                Download Design
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Wand2 size={64} color="#2a2a3a" style={{ marginBottom: '1.5rem' }} />
              <div style={{ color: '#9999aa', fontWeight: 500 }}>
                Your AI design will appear here
              </div>
              <div style={{ color: '#9999aa', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Upload a photo and click Generate
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
