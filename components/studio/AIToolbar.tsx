'use client'
import { useState } from 'react'
import { Wand2, Zap, Brain, Sun, Sofa, Sparkles, RefreshCw, Clock, Download, RotateCcw, Sliders, DollarSign } from 'lucide-react'

const quickStyles = ['Modern', 'Minimalist', 'Japandi', 'Luxury', 'Scandinavian', 'Industrial', 'Bohemian', 'Classic']
const mixStyles = ['Modern', 'Minimalist', 'Japandi', 'Luxury', 'Scandinavian', 'Industrial']

const mockHistory = [
  { id: 1, style: 'Japandi', room: 'Living Room', date: '14:32', color: '#6c47ff' },
  { id: 2, style: 'Modern', room: 'Bedroom', date: '11:15', color: '#c9a84c' },
  { id: 3, style: 'Luxury', room: 'Kitchen', date: 'Yesterday', color: '#28c840' },
]

interface AIToolbarProps {
  prompt: string
  setPrompt: (v: string) => void
  onGenerate: () => void
  generating: boolean
  style: string
  setStyle: (v: string) => void
}

export default function AIToolbar({ prompt, setPrompt, onGenerate, generating, style, setStyle }: AIToolbarProps) {
  const [preserveStructure, setPreserveStructure] = useState(true)
  const [improveLighting, setImproveLighting] = useState(false)
  const [replaceFurniture, setReplaceFurniture] = useState(false)
  const [addDecoration, setAddDecoration] = useState(false)
  const [virtualStaging, setVirtualStaging] = useState(false)
  const [showMixer, setShowMixer] = useState(false)
  const [showBudget, setShowBudget] = useState(false)
  const [mixStyle1, setMixStyle1] = useState('Japandi')
  const [mixStyle2, setMixStyle2] = useState('Minimalist')
  const [budget, setBudget] = useState('5000')
  const [activeTab, setActiveTab] = useState<'generate'|'mixer'|'budget'>('generate')

  const Toggle = ({ value, onChange, label, icon: Icon }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1a1a24' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {Icon && <Icon size={13} color="#9999aa" />}
        <span style={{ color: '#9999aa', fontSize: '0.8rem' }}>{label}</span>
      </div>
      <div onClick={() => onChange(!value)} style={{ width: 36, height: 20, borderRadius: 10, background: value ? 'linear-gradient(135deg,#c9a84c,#f0c96e)' : '#2a2a3a', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 2, left: value ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {[
          { id: 'generate', label: '✦ Generate', icon: Wand2 },
          { id: 'mixer', label: 'Style Mixer', icon: Sliders },
          { id: 'budget', label: 'Budget AI', icon: DollarSign },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} style={{ flex: 1, padding: '0.5rem 0.25rem', borderRadius: 8, background: activeTab === tab.id ? 'rgba(201,168,76,0.15)' : '#2a2a3a', border: activeTab === tab.id ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent', color: activeTab === tab.id ? '#c9a84c' : '#9999aa', fontSize: '0.75rem', cursor: 'pointer', fontWeight: activeTab === tab.id ? 600 : 400, transition: 'all 0.2s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'generate' && (
        <>
          <div>
            <label style={{ display: 'block', color: '#f5f5f0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>✍️ Describe your vision</label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe your dream interior..." rows={3}
              style={{ width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem', color: '#f5f5f0', fontSize: '0.82rem', resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.5, transition: 'border-color 0.2s', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#c9a84c50')}
              onBlur={e => (e.target.style.borderColor = '#2a2a3a')} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
              {quickStyles.map(s => (
                <button key={s} onClick={() => { setStyle(s); setPrompt(`${s} interior design with premium finishes`) }}
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem', borderRadius: '9999px', background: style === s ? 'rgba(201,168,76,0.15)' : '#2a2a3a', border: style === s ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent', color: style === s ? '#c9a84c' : '#9999aa', cursor: 'pointer', transition: 'all 0.2s' }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ background: '#0a0a0f', borderRadius: 12, padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Zap size={13} color="#c9a84c" />
              <span style={{ fontWeight: 600, color: '#f5f5f0', fontSize: '0.82rem' }}>AI Options</span>
            </div>
            <Toggle value={preserveStructure} onChange={setPreserveStructure} label="Preserve room structure" icon={Brain} />
            <Toggle value={improveLighting} onChange={setImproveLighting} label="Improve lighting" icon={Sun} />
            <Toggle value={replaceFurniture} onChange={setReplaceFurniture} label="Replace furniture" icon={Sofa} />
            <Toggle value={addDecoration} onChange={setAddDecoration} label="Add decoration" icon={Sparkles} />
            <Toggle value={virtualStaging} onChange={setVirtualStaging} label="Virtual staging" icon={Zap} />
          </div>

          <button onClick={onGenerate} disabled={generating} className="btn-gold" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', opacity: generating ? 0.8 : 1 }}>
            <Wand2 size={16} />{generating ? 'Generating...' : '✦ Generate Design'}
          </button>

          <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem', background: 'rgba(108,71,255,0.1)', border: '1px solid rgba(108,71,255,0.3)', borderRadius: '9999px', color: '#9070ff', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(108,71,255,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(108,71,255,0.1)')}>
            <RefreshCw size={14} />Smart Redesign
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Clock size={13} color="#9999aa" />
              <span style={{ color: '#f5f5f0', fontSize: '0.82rem', fontWeight: 600 }}>Recent generations</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {mockHistory.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem', background: '#0a0a0f', borderRadius: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${item.color}20,${item.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={14} color={item.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#f5f5f0', fontSize: '0.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.style} · {item.room}</div>
                    <div style={{ color: '#9999aa', fontSize: '0.7rem' }}>{item.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button style={{ width: 26, height: 26, borderRadius: 6, background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9999aa' }}><Download size={11} /></button>
                    <button onClick={() => setPrompt(`${item.style} interior design`)} style={{ width: 26, height: 26, borderRadius: 6, background: '#2a2a3a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9999aa' }}><RotateCcw size={11} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'mixer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(108,71,255,0.08)', border: '1px solid rgba(108,71,255,0.2)', borderRadius: 12, padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sliders size={14} color="#6c47ff" />
              <span style={{ color: '#9070ff', fontWeight: 600, fontSize: '0.85rem' }}>AI Style Mixer</span>
            </div>
            <p style={{ color: '#9999aa', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: 1.5 }}>Blend two styles into a unique design.</p>
          </div>
          <div>
            <label style={{ display: 'block', color: '#9999aa', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Style 1</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {mixStyles.map(s => <button key={s} onClick={() => setMixStyle1(s)} style={{ padding: '0.3rem 0.7rem', borderRadius: '9999px', fontSize: '0.78rem', background: mixStyle1 === s ? 'rgba(108,71,255,0.2)' : '#2a2a3a', border: mixStyle1 === s ? '1px solid rgba(108,71,255,0.5)' : '1px solid transparent', color: mixStyle1 === s ? '#9070ff' : '#9999aa', cursor: 'pointer' }}>{s}</button>)}
            </div>
          </div>
          <div style={{ textAlign: 'center', color: '#c9a84c', fontSize: '1.2rem', fontWeight: 700 }}>+</div>
          <div>
            <label style={{ display: 'block', color: '#9999aa', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Style 2</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {mixStyles.map(s => <button key={s} onClick={() => setMixStyle2(s)} style={{ padding: '0.3rem 0.7rem', borderRadius: '9999px', fontSize: '0.78rem', background: mixStyle2 === s ? 'rgba(201,168,76,0.15)' : '#2a2a3a', border: mixStyle2 === s ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent', color: mixStyle2 === s ? '#c9a84c' : '#9999aa', cursor: 'pointer' }}>{s}</button>)}
            </div>
          </div>
          <div style={{ background: '#0a0a0f', borderRadius: 10, padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ color: '#9999aa', fontSize: '0.78rem', marginBottom: '0.25rem' }}>Mix result</div>
            <div style={{ color: '#f5f5f0', fontWeight: 600 }}>{mixStyle1} × {mixStyle2}</div>
          </div>
          <button onClick={() => { setPrompt(`${mixStyle1} and ${mixStyle2} fusion interior design, blending both aesthetics seamlessly`); setActiveTab('generate'); onGenerate() }} className="btn-gold" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem' }}>
            <Wand2 size={16} />Mix & Generate
          </button>
        </div>
      )}

      {activeTab === 'budget' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(40,200,64,0.08)', border: '1px solid rgba(40,200,64,0.2)', borderRadius: 12, padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <DollarSign size={14} color="#28c840" />
              <span style={{ color: '#28c840', fontWeight: 600, fontSize: '0.85rem' }}>AI Budget Designer</span>
            </div>
            <p style={{ color: '#9999aa', fontSize: '0.8rem', lineHeight: 1.5 }}>Set your budget and the AI generates a realistic design within your price range.</p>
          </div>
          <div>
            <label style={{ display: 'block', color: '#f5f5f0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Your budget</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9999aa', fontSize: '0.9rem' }}>€</span>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} min="500" max="100000"
                style={{ width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '0.75rem 1rem 0.75rem 2rem', color: '#f5f5f0', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {['1000', '3000', '5000', '10000', '25000'].map(b => (
              <button key={b} onClick={() => setBudget(b)} style={{ padding: '0.3rem 0.7rem', borderRadius: '9999px', fontSize: '0.78rem', background: budget === b ? 'rgba(40,200,64,0.15)' : '#2a2a3a', border: budget === b ? '1px solid rgba(40,200,64,0.4)' : '1px solid transparent', color: budget === b ? '#28c840' : '#9999aa', cursor: 'pointer' }}>€{parseInt(b).toLocaleString()}</button>
            ))}
          </div>
          <div style={{ background: '#0a0a0f', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ color: '#9999aa', fontSize: '0.78rem', marginBottom: '0.5rem' }}>AI will suggest</div>
            {parseInt(budget) < 2000 && <div style={{ color: '#f5f5f0', fontSize: '0.82rem', lineHeight: 1.5 }}>Budget style: IKEA-level furniture, minimal accessories, paint refresh</div>}
            {parseInt(budget) >= 2000 && parseInt(budget) < 8000 && <div style={{ color: '#f5f5f0', fontSize: '0.82rem', lineHeight: 1.5 }}>Mid-range: quality furniture mix, accent pieces, lighting upgrade</div>}
            {parseInt(budget) >= 8000 && <div style={{ color: '#f5f5f0', fontSize: '0.82rem', lineHeight: 1.5 }}>Premium: designer furniture, custom pieces, full renovation</div>}
          </div>
          <button onClick={() => { setPrompt(`Interior design with a budget of €${parseInt(budget).toLocaleString()}, optimizing cost-quality ratio with ${style} style`); setActiveTab('generate'); onGenerate() }} className="btn-gold" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem' }}>
            <Wand2 size={16} />Design within budget
          </button>
        </div>
      )}
    </div>
  )
}
