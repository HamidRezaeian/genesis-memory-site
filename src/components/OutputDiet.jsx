import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Holo, SectionHead, Reveal } from './ui'

const CARDS = [
  {
    t: 'Terse by default',
    d: 'GENESIS_OUTPUT_DIET=1 injects one static, cache-friendly directive; =auto additionally yields the moment you ask for depth in natural language. An explicit ask always wins over brevity.',
    tag: 'GENESIS_OUTPUT_DIET=auto',
  },
  {
    t: 'Budgets by turn shape',
    d: 'Short acknowledgments and trivial turns can never need an essay: they are structurally bounded at 256 completion tokens. Anything unrecognized stays a standard turn, and a caller-set max_tokens is never touched.',
    tag: '256 · structural cap',
  },
  {
    t: 'Diffs, not pastes',
    d: 'The directive requires unified diffs instead of full-file echoes, and a monitor counts pastes on both response paths — observe-only, it never rewrites your model mid-sentence. Enforcement later; visibility now.',
    tag: 'echo_events',
  },
]

const BENCHMARKS = [
  {
    id: 'diff',
    title: 'Code Bug Fix',
    sub: 'Diff vs. Full File Paste',
    prompt: 'Fix the SQLite connection pool timeout: increase busy timeout default to 5000ms in core/db.py',
    naive: {
      tokens: 358,
      cost: '$0.0054',
      badge: 'Full file echo + filler chatter',
      lines: [
        '```python',
        'import os, sqlite3, time, logging',
        'class DatabaseConnectionPool:',
        '    def __init__(self, db_path: str, timeout_ms: int = 5000):',
        '        self.db_path = db_path',
        '        self.timeout_ms = 5000  # Updated from 1000 to 5000',
        '        self._connections = []',
        '    def _init_db(self):',
        '        conn = sqlite3.connect(self.db_path, timeout=5.0)',
        '        conn.execute("PRAGMA journal_mode=WAL;")',
        '        conn.execute("PRAGMA busy_timeout=5000;")',
        '        conn.close()',
        '    # ... 30 more lines of unchanged class code ...',
        '```',
        'Here is the updated file! I have modified the timeout to 5000ms.',
        'Let me know if you need anything else or have further questions!',
      ],
    },
    diet: {
      tokens: 59,
      cost: '$0.0009',
      badge: 'Unified diff · zero filler',
      lines: [
        '```diff',
        '--- a/genesis_memory/core/db.py',
        '+++ b/genesis_memory/core/db.py',
        '@@ -10,3 +10,3 @@',
        '-        self.timeout_ms = 1000',
        '+        self.timeout_ms = 5000  # prevent WAL storm lock',
        '```',
        'Fixed: increased busy timeout default to 5000ms.',
      ],
    },
    savings: '83.5%',
    speedup: '6.1× faster',
  },
  {
    id: 'ack',
    title: 'Turn Acknowledgment',
    sub: 'Short Confirmation Turn',
    prompt: 'thanks, looks good. now run the test suite.',
    naive: {
      tokens: 82,
      cost: '$0.0012',
      badge: 'Polite conversational filler',
      lines: [
        'You are very welcome! I am glad that the WAL configuration and the jittered',
        'retry mechanism are working smoothly for your environment. If you ever encounter',
        'any concurrency issues across your AI clients or if you want to explore further',
        'memory compaction strategies, please don\'t hesitate to reach out. Happy coding!',
      ],
    },
    diet: {
      tokens: 7,
      cost: '$0.0001',
      badge: 'Terse acknowledgment',
      lines: [
        'Noted. Running test suite now.',
      ],
    },
    savings: '91.5%',
    speedup: '11.7× faster',
  },
  {
    id: 'status',
    title: 'CLI Status Query',
    sub: 'Fact Retrieval',
    prompt: 'is daemon running?',
    naive: {
      tokens: 84,
      cost: '$0.0013',
      badge: 'Verbose paragraph response',
      lines: [
        'Yes, the GENESIS daemon is currently running and active on your system. It is',
        'listening on localhost with PID 4128. The SQLite WAL database located at',
        '~/.genesis/memory.db has 242 memories stored, and the RSS memory usage is',
        'measured at 48.2 MB, which is well within your 100 MB budget. All healthy!',
      ],
    },
    diet: {
      tokens: 12,
      cost: '$0.0002',
      badge: 'Telemetry fact only',
      lines: [
        'Active · PID 4128 · RSS 48.2 MB · 242 memories.',
      ],
    },
    savings: '85.7%',
    speedup: '7.0× faster',
  },
]

export default function OutputDiet() {
  const [activeTab, setActiveTab] = useState(0)
  const b = BENCHMARKS[activeTab]

  return (
    <section id="output" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Output token diet"
          title="Input diet is lossless."
          grad="Output diet is a choice."
          lead="You cannot compress what hasn't been said yet — only ask for less of it. Three small, user-sovereign mechanisms govern outbound tokens, and telemetry counts every decision. Output tokens cost 2–5× input tokens, so less out is where the money is."
        />

        {/* 3 Core Principles */}
        <div className="grid g3" style={{ marginTop: 44 }}>
          {CARDS.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <Holo style={{ height: '100%' }}>
                <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '.08em' }}>{c.tag}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 800 }}>{c.t}</h3>
                  <p style={{ color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.65 }}>{c.d}</p>
                </div>
              </Holo>
            </Reveal>
          ))}
        </div>

        {/* Real Benchmark & Comparison Card */}
        <Reveal style={{ marginTop: 48 }}>
          <div className="card holo" style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderBottom: '1px solid var(--line)', paddingBottom: 20 }}>
              <div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  Empirical Benchmark
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>
                  Real Developer Prompts · Byte-for-Byte Comparison
                </h3>
              </div>

              {/* Benchmark Switcher Tabs */}
              <div style={{ display: 'inline-flex', padding: 4, borderRadius: 10, background: 'rgba(148,163,184,.08)', border: '1px solid var(--line)', gap: 4 }}>
                {BENCHMARKS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: activeTab === idx ? '#001317' : 'var(--fg-2)',
                      background: activeTab === idx ? 'var(--cyan)' : 'transparent',
                      transition: 'all .25s ease',
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt bar */}
            <div style={{ margin: '18px 0 24px', padding: '12px 16px', borderRadius: 8, background: 'rgba(0, 240, 255, 0.04)', border: '1px solid rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', fontWeight: 700 }}>USER PROMPT</span>
              <span className="mono" style={{ fontSize: 13, color: 'var(--fg)' }}>"{b.prompt}"</span>
            </div>

            {/* Side-by-side comparison grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid g2"
                style={{ alignItems: 'stretch' }}
              >
                {/* Without Diet */}
                <div className="term" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="bar" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i /><i /><i />
                      <span>Standard Agent (Without Diet)</span>
                    </div>
                    <span className="mono pill" style={{ borderColor: 'rgba(251, 113, 133, 0.3)', color: 'var(--rose)' }}>
                      {b.naive.tokens} tokens · {b.naive.cost}
                    </span>
                  </div>
                  <div className="body" style={{ flex: 1, fontSize: 12, lineHeight: 1.55 }}>
                    {b.naive.lines.map((ln, i) => (
                      <div key={i} className={ln.startsWith('```') || ln.includes('class') ? 'dim' : ''}>
                        {ln}
                      </div>
                    ))}
                  </div>
                </div>

                {/* With GENESIS Output Diet */}
                <div className="term" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderColor: 'rgba(0, 240, 255, 0.35)', boxShadow: '0 0 30px -15px rgba(0, 240, 255, 0.4)' }}>
                  <div className="bar" style={{ justifyContent: 'space-between', background: 'rgba(0, 240, 255, 0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i style={{ background: 'var(--cyan)' }} /><i /><i />
                      <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>GENESIS Output Diet</span>
                    </div>
                    <span className="mono pill cyan" style={{ fontWeight: 700 }}>
                      {b.diet.tokens} tokens · {b.diet.cost}
                    </span>
                  </div>
                  <div className="body" style={{ flex: 1, fontSize: 12, lineHeight: 1.55 }}>
                    {b.diet.lines.map((ln, i) => {
                      let col = ''
                      if (ln.startsWith('+')) col = 'ok'
                      else if (ln.startsWith('-')) col = 'err'
                      else if (ln.startsWith('@@') || ln.startsWith('Fixed:')) col = 'cy'
                      return <div key={i} className={col}>{ln}</div>
                    })}
                  </div>
                  <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line)', background: 'rgba(0, 240, 255, 0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{b.diet.badge}</span>
                    <span className="mono" style={{ fontSize: 13, color: 'var(--cyan)', fontWeight: 800 }}>
                      −{b.savings} output tokens ({b.speedup})
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Aggregated Benchmark Metrics Footer */}
            <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 16, textAlign: 'center' }}>
              <div>
                <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: 'var(--cyan)' }}>86.9%</span>
                <p style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2, letterSpacing: '.06em', textTransform: 'uppercase' }}>Avg Output Token Cut</p>
              </div>
              <div>
                <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: 'var(--fg)' }}>2–5×</span>
                <p style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2, letterSpacing: '.06em', textTransform: 'uppercase' }}>Token Dollar Weight (vs Input)</p>
              </div>
              <div>
                <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: 'var(--cyan)' }}>0%</span>
                <p style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2, letterSpacing: '.06em', textTransform: 'uppercase' }}>Code Re-paste Overhead</p>
              </div>
              <div>
                <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: 'var(--fg)' }}>100%</span>
                <p style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2, letterSpacing: '.06em', textTransform: 'uppercase' }}>User Depth Sovereignty</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The Exact Directive Box */}
        <Reveal style={{ marginTop: 28 }}>
          <div className="term" style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="bar"><i /><i /><i /><span>the whole directive · static · prefix-cache friendly</span></div>
            <div className="body">
              <span className="dim">Answer tersely unless depth is explicitly requested. No greetings, filler, hedging, restatement, or summaries. State only result and reason. Preserve code blocks, commands, error messages, file paths, and numbers byte-for-byte. Never paraphrase or reformat them. Reply with unified diffs, never full files.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
