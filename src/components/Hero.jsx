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

/** Hero visual: the product's signature mechanic, not decoration.
 *  A glowing subconscious capsule slides into a live prompt while the
 *  context counter crashes 79,200 → 176. What the product DOES, in one look. */
function HeroOrb() {
  const [n, setN] = useState(79200)
  useEffect(() => {
    let raf
    const t0 = performance.now() + 900
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 2200))
      const e = 1 - Math.pow(1 - t, 3)
      setN(Math.round(79200 - (79200 - 176) * e))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  const done = n <= 200
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className="hero-orb" style={{ position: 'relative', height: 520, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
      <div style={{ textAlign: 'left' }}>
        <div className="mono" style={{ fontSize: 13, letterSpacing: '.14em', color: 'var(--fg-3)', textTransform: 'uppercase' }}>tokens in context</div>
        <div className="mono" style={{ fontSize: 54, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.1, color: done ? 'var(--cyan)' : '#fff', fontVariantNumeric: 'tabular-nums', transition: 'color .6s' }}>{n.toLocaleString('en-US')}</div>
        <div className="mono" style={{ fontSize: 12, color: done ? 'var(--cyan)' : 'var(--fg-3)' }}>{done ? '−99.9% · capsule injected' : 'naive prompt · everything pasted'}</div>
      </div>
      <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="card" style={{ borderRadius: 14, overflow: 'hidden' }}>
        <div className="term" style={{ border: 0, borderRadius: 0, boxShadow: 'none' }}>
          <div className="bar"><i /><i /><i /><span>prompt · last turn · cursor</span></div>
          <div className="body">
            <div className="dim">… 14 turns of history, 2,200 lines of tool output …</div>
            <motion.div animate={{ boxShadow: ['0 0 0px rgba(0,240,255,0)', '0 0 34px rgba(0,240,255,.35)', '0 0 0px rgba(0,240,255,0)'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginTop: 10, border: '1px solid rgba(0,240,255,.45)', borderRadius: 10, background: 'rgba(0,240,255,.05)', padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)' }} />
                <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '.06em' }}>subconscious capsule</span>
                <span className="pill cyan" style={{ marginLeft: 'auto' }}>176 / 200 tokens</span>
              </div>
              <div style={{ fontSize: 12, color: '#cfe3ee', lineHeight: 1.65 }}>• thread: WAL retry path · BEGIN IMMEDIATE + jittered retry<br />• dialogue: “busy timeout?” → 5000 ms, core/db.py<br />• skill: genesis run -- pytest (conf 0.92)</div>
            </motion.div>
            <div style={{ marginTop: 10 }}><span className="cy">$</span> fix the WAL retry path<span className="caret" style={{ marginLeft: 6 }} /></div>
          </div>
        </div>
      </motion.div>
      <style>{`@media (max-width: 1100px){ .hero-orb{display:none!important} .hero-grid{grid-template-columns:1fr!important} }`}</style>
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
