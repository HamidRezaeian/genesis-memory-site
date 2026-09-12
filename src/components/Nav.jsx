import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Magnetic } from './ui'

const LINKS = [['Diet', '#diet'], ['Spool', '#spool'], ['Shield', '#shield'], ['Conduit', '#conduit'], ['Sleep', '#sleep'], ['Clients', '#setup'], ['Pricing', '#pricing']]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    fn(); window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, transition: 'background .4s, border-color .4s, backdrop-filter .4s',
        background: scrolled ? 'rgba(0,0,0,.62)' : 'transparent', backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}` }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center' }} aria-label="GENESIS home">
          <img src="./logo.png" alt="GENESIS Memory" height={44} style={{ display: 'block' }} />
        </a>
        <nav style={{ display: 'flex', gap: 4, marginLeft: 'auto' }} className="nav-links">
          {LINKS.map(([l, h]) => <a key={h} href={h} className="btn ghost sm">{l}</a>)}
        </nav>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a className="btn ghost sm" href="https://pypi.org/project/genesis-memory/" target="_blank" rel="noreferrer" style={{ gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3.3 8.3L12 13l8.7-4.7" /><path d="M12 13v9" /></svg>
            PyPI
          </a>
          <Magnetic strength={0.25}><a className="btn primary sm" href="#setup">genesis setup</a></Magnetic>
          <button className="btn ghost sm menu-btn" onClick={() => setOpen(v => !v)} aria-label="menu" style={{ display: 'none' }}>☰</button>
        </div>
      </div>
      <AnimatePresence>{open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', background: 'rgba(0,0,0,.9)', borderTop: '1px solid var(--line)' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', padding: '10px 0 16px' }}>
            {LINKS.map(([l, h]) => <a key={h} href={h} className="btn ghost" onClick={() => setOpen(false)} style={{ justifyContent: 'flex-start' }}>{l}</a>)}
          </div>
        </motion.div>)}
      </AnimatePresence>
      <style>{`@media (max-width: 900px){ .nav-links{display:none!important} .menu-btn{display:inline-flex!important} }`}</style>
    </motion.header>
  )
}
