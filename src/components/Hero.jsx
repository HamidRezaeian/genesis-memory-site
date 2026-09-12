import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import NeuralField from './NeuralField'
import { Magnetic, Words, Arrow } from './ui'
import { useCounter, fmt } from '../lib/hooks'

const CLIENTS = ['Cursor', 'Claude Code', 'VS Code', 'Zed', 'Windsurf', 'JetBrains', 'Neovim', 'Emacs', 'OpenCode', 'Antigravity', 'Codex CLI', 'Gemini CLI', 'Aider', 'Goose', 'Cline', 'Roo Code', 'Continue', 'Amazon Q', 'LangChain', 'CrewAI', 'AutoGen', 'LlamaIndex']

function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const cmd = 'pip install genesis-memory && genesis setup'
  const copy = async () => { try { await navigator.clipboard.writeText(cmd) } catch {} setCopied(true); setTimeout(() => setCopied(false), 1600) }
  return (
    <motion.button onClick={copy} whileTap={{ scale: 0.98 }}
      className="term" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', fontSize: 14, textAlign: 'left', width: '100%', maxWidth: 560, position: 'relative' }}>
      <span className="cy">$</span>
      <span style={{ flex: 1 }}>{cmd}<span className="caret" style={{ marginLeft: 6 }} /></span>
      <span className="pill" style={{ color: copied ? 'var(--cyan)' : 'var(--fg-3)', borderColor: copied ? 'rgba(0,240,255,.5)' : undefined, transition: '.3s' }}>{copied ? 'copied ✓' : 'copy'}</span>
    </motion.button>
  )
}

function LiveTicker() {
  // A simulated live feed of savings ticking up — makes the value visceral before a single click.
  const [tokens, setTokens] = useState(1_284_902)
  const [dollars, setDollars] = useState(214.37)
  useEffect(() => {
    const id = setInterval(() => {
      setTokens(t => t + Math.round(180 + Math.random() * 640))
      setDollars(d => d + (0.002 + Math.random() * 0.011))
    }, 900)
    return () => clearInterval(id)
  }, [])
  const tk = useCounter(tokens, { duration: 800 })
  const dl = useCounter(dollars, { duration: 800 })
  return (
    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
      <div><div className="mono" style={{ fontSize: 26, fontWeight: 700, color: 'var(--cyan)', letterSpacing: '-.03em' }}>{fmt.int(tk)}</div><div style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '.14em', textTransform: 'uppercase' }}>tokens dieted · live</div></div>
      <div><div className="mono" style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-.03em' }}>{fmt.usd(dl)}</div><div style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '.14em', textTransform: 'uppercase' }}>saved this month</div></div>
      <div><div className="mono" style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.03em' }}>472</div><div style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '.14em', textTransform: 'uppercase' }}>tests green</div></div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 90 }}>
      <NeuralField />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,.94), transparent 60%), radial-gradient(ellipse 60% 70% at 22% 45%, rgba(0,0,0,.72), transparent 70%), linear-gradient(180deg, rgba(0,0,0,.45), transparent 30%, rgba(0,0,0,.85))', pointerEvents: 'none' }} />
      <div className="wrap hero-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,.85fr)', gap: 40, alignItems: 'center', paddingBottom: 80 }}>
        <div>
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><i />Cognitive Memory OS · v0.10 · Local-first</motion.span>
          <h1 style={{ fontSize: 'clamp(42px, 6.4vw, 88px)', fontWeight: 900, margin: '22px 0 20px', lineHeight: 0.98 }}>
            <Words text="One brain for" delay={0.25} /><br />
            <span className="grad" style={{ background: 'linear-gradient(90deg,#fff 0%,var(--cyan) 70%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}><Words text="every AI agent." delay={0.55} /></span>
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} style={{ fontSize: 'clamp(17px,1.5vw,21px)', maxWidth: 620 }}>
            GENESIS gives Cursor, Claude Code, VS Code, Zed, JetBrains, Neovim — <em>every</em> coding agent — a shared, persistent, sub-millisecond memory.
            It collapses 4,000-line tool outputs into 84-token pointers, scrubs secrets before they touch disk, and consolidates what it learns while you sleep.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap', alignItems: 'center' }}>
            <Magnetic><a className="btn primary" href="#setup">Wire every client <Arrow /></a></Magnetic>
            <Magnetic strength={0.2}><a className="btn" href="#spool">See the token diet live</a></Magnetic>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: 0.8 }} style={{ marginTop: 34 }}>
            <InstallCommand />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} style={{ marginTop: 34 }}>
            <LiveTicker />
          </motion.div>
        </div>
        <HeroOrb />
      </div>
      <Marquee />
    </section>
  )
}

/** Floating holographic "engram" chips on fixed orbit slots — pure CSS/Framer.
 *  Slots never collide; depth (scale/opacity) fakes 3D; nucleus glows layered. */
function HeroOrb() {
  const ref = useRef(null)
  const [w, setW] = useState(480)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width)); ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const chips = [
    ['decision', 'Use WAL + busy_timeout'], ['fact', 'Proxy listens on :8000'],
    ['outcome', '472 tests green'], ['skill', 'genesis run -- pytest'],
    ['fact', 'Zed → context_servers'], ['decision', 'Redact first'],
  ]
  // Fixed angular slots (deg) alternating outer/inner ring — no drift collisions.
  const slots = [-90, -28, 34, 92, 152, 212]
  const rOuter = Math.max(185, w * 0.42), rInner = Math.max(132, w * 0.3)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="hero-orb" style={{ position: 'relative', height: 540, display: 'grid', placeItems: 'center' }}>
      <div style={{ position: 'absolute', width: rInner * 2, height: rInner * 2, borderRadius: '50%', border: '1px dashed rgba(0,240,255,.18)', animation: 'spin 60s linear infinite' }} />
      <div style={{ position: 'absolute', width: rOuter * 2, height: rOuter * 2, borderRadius: '50%', border: '1px dashed rgba(0,240,255,.1)', animation: 'spin 90s linear infinite reverse' }} />
      <div style={{ position: 'absolute', width: rOuter * 2 + 44, height: rOuter * 2 + 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,.05)' }} />
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 148, height: 148, borderRadius: '50%', background: 'radial-gradient(circle at 38% 34%, #fff 0%, #bffbff 12%, var(--cyan) 30%, rgba(0,150,170,.55) 58%, rgba(0,20,25,0) 72%)', boxShadow: '0 0 70px rgba(0,240,255,.5), 0 0 190px rgba(0,240,255,.18), inset -14px -18px 44px rgba(0,40,48,.55)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 30, top: 22, width: 26, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,.85)', filter: 'blur(7px)', transform: 'rotate(-24deg)' }} />
      </motion.div>
      <div style={{ position: 'absolute', top: '50%', marginTop: 86, textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: '.18em', color: '#fff', fontWeight: 700 }}>memory.db</div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', marginTop: 3 }}>SQLite · WAL · shared</div>
      </div>
      {chips.map(([kind, text], i) => {
        const a = slots[i] * Math.PI / 180
        const r = i % 2 ? rInner : rOuter
        const depth = (Math.sin(a) + 1) / 2 // 0 back → 1 front
        const x0 = Math.cos(a) * r, y0 = Math.sin(a) * r * 0.72
        return (
          <motion.div key={i} className="pill"
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 + depth * 0.4, x: [x0, x0 + 5, x0], y: [y0, y0 - 6, y0], scale: 0.88 + depth * 0.12 }}
            transition={{ opacity: { delay: 0.9 + i * 0.12, duration: 0.6 }, x: { duration: 6 + i * 0.9, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 6 + i * 0.9, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.5 } }}
            whileHover={{ scale: 1.06, borderColor: 'rgba(0,240,255,.55)', boxShadow: '0 14px 44px -12px rgba(0,240,255,.5)' }}
            style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: -110, marginTop: -15, width: 220, background: 'linear-gradient(180deg, rgba(16,24,34,.92), rgba(6,10,15,.88))', backdropFilter: 'blur(10px)', padding: '9px 13px', fontSize: 12, zIndex: Math.round(depth * 10), borderColor: 'rgba(255,255,255,.1)', boxShadow: '0 12px 34px -14px rgba(0,0,0,.9)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,.8)', flex: 'none' }} />
            <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', flex: 'none' }}>{kind}</span>
            <span style={{ color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
          </motion.div>
        )
      })}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @media (max-width: 1100px){ .hero-orb{display:none!important} .hero-grid{grid-template-columns:1fr!important} }`}</style>
    </motion.div>
  )
}

function Marquee() {
  const items = [...CLIENTS, ...CLIENTS]
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 0 22px', borderTop: '1px solid var(--line)', background: 'linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.7))', backdropFilter: 'blur(6px)', overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}>
      <div style={{ display: 'flex', gap: 44, whiteSpace: 'nowrap', animation: 'marquee 60s linear infinite', width: 'max-content' }}>
        {items.map((c, i) => <span key={i} className="mono" style={{ fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 12 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', opacity: .6 }} />{c}</span>)}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
