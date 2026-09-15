import React, { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Holo, SectionHead, Reveal, Magnetic } from './ui'
import { 
  Brain, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Minus, 
  AlertCircle, 
  Terminal, 
  Copy, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Gauge,
  Lock,
  Cpu
} from 'lucide-react'

const MODES = [
  {
    id: 'trimodal',
    name: 'Tri-Modal (All 3)',
    badge: 'Recommended',
    tagline: 'The Autonomous Singularity Stack',
    desc: 'Run MCP + Hook + Proxy together. Permanent cross-IDE memory, subconscious instant recall before every turn, and 70.4% token cut with lossless tool spooling.',
    cmd: 'genesis setup --yes && genesis proxy setup',
    mcp: true,
    hook: true,
    proxy: true,
    stats: {
      tokensSaved: '70.4%',
      latency: 'Sub-10ms',
      offlineLocal: 'Hybrid (Local Core + Cloud LLM)',
      crossIdeSync: 'All 20+ AI Tools',
      cognitiveTools: '19 Cognitive Tools Active'
    }
  },
  {
    id: 'mcp',
    name: 'MCP Only',
    badge: '100% Local & Offline',
    tagline: 'The Universal Knowledge Vault',
    desc: 'Zero network calls. Zero API keys. Connect 19 cognitive tools (remember, recall, reinforce) directly to SQLite WAL across Cursor, VS Code, Claude Desktop, Zed, and JetBrains.',
    cmd: 'genesis setup --yes',
    mcp: true,
    hook: false,
    proxy: false,
    stats: {
      tokensSaved: '0% (Standard)',
      latency: '0.4ms Local DB',
      offlineLocal: '100% Offline (Zero Keys)',
      crossIdeSync: 'All 20+ AI Tools',
      cognitiveTools: '19 Cognitive Tools Active'
    }
  },
  {
    id: 'hook',
    name: 'Hook Only',
    badge: 'Subconscious Instinct',
    tagline: 'Zero-Cost Context Priming',
    desc: 'Injects a ≤200-token subconscious capsule right before prompt submission. Your active thread, last cross-client dialogue, and top engrams are known before you press Enter.',
    cmd: 'genesis setup --yes --client cursor,claude_code,opencode',
    mcp: false,
    hook: true,
    proxy: false,
    stats: {
      tokensSaved: 'Bounded ≤200 tok',
      latency: 'Sub-10ms Execution',
      offlineLocal: '100% Offline (Zero Keys)',
      crossIdeSync: 'Lifecycle-Enabled IDEs',
      cognitiveTools: 'Capsule Injection Only'
    }
  },
  {
    id: 'proxy',
    name: 'Proxy Only',
    badge: 'Token Diet & Gateway',
    tagline: 'Stateless Reverse Proxy & Model Freedom',
    desc: 'Listens on 127.0.0.1:8000. Cuts output tokens by 70.4%, collapses 4,000-line tool outputs into 84-token pointers, and forwards requests to OpenRouter, OpenAI, or Groq with any model on the fly.',
    cmd: 'genesis proxy setup',
    mcp: false,
    hook: false,
    proxy: true,
    stats: {
      tokensSaved: '70.4% Output Diet',
      latency: 'Streaming Passthrough',
      offlineLocal: 'Requires LLM Provider Key',
      crossIdeSync: 'Aider, OpenCode & SDKs',
      cognitiveTools: 'Single-Prompt Auto-Recall'
    }
  }
]

const MATRIX_ROWS = [
  {
    category: 'Cognitive Memory & Reasoning',
    features: [
      {
        name: '19 Cognitive Tools (remember, recall, reinforce...)',
        desc: 'Episodic memory, skill synthesis, rule challenges, AST dependency closure.',
        mcp: true,
        hook: false,
        proxy: false,
        all: true,
      },
      {
        name: 'Continuous Cross-IDE Memory Mesh',
        desc: 'Work in Cursor, switch to Claude Code or Zed — your context and decisions follow you.',
        mcp: true,
        hook: true,
        proxy: true,
        all: true,
      },
      {
        name: 'Subconscious Pre-Prompt Priming',
        desc: '≤200-token capsule injected in sub-10ms before turn; agent knows invariants automatically.',
        mcp: false,
        hook: true,
        proxy: false,
        all: true,
      },
      {
        name: 'Active Thread & Last Dialogue Tracking',
        desc: 'Remembers the active task focus and last discussion across different tools.',
        mcp: true,
        hook: true,
        proxy: true,
        all: true,
      }
    ]
  },
  {
    category: 'Token Diet & Financial Efficiency',
    features: [
      {
        name: '70.4% Output Token Diet',
        desc: 'Curbs conversational fluff and enforces concise answers and byte-exact code blocks.',
        mcp: false,
        hook: false,
        proxy: true,
        all: true,
      },
      {
        name: 'Lossless Headless Tool Spooling',
        desc: 'Collapses 4,000-line pytest/git/compiler terminal logs into 84-token line-anchored pointers.',
        mcp: false,
        hook: false,
        proxy: true,
        all: true,
      },
      {
        name: 'Dollar-Exact Savings Counter',
        desc: 'Calculates real cash savings against 437 models in the pricing catalog per request.',
        mcp: false,
        hook: false,
        proxy: true,
        all: true,
      }
    ]
  },
  {
    category: 'Security, Privacy & Infrastructure',
    features: [
      {
        name: '100% Offline & Local Operation',
        desc: 'Zero external network calls; runs strictly on local SQLite WAL.',
        mcp: true,
        hook: true,
        proxy: 'Needs Provider',
        all: 'Hybrid Local/Cloud',
      },
      {
        name: 'Zero API Keys Required',
        desc: 'Does not require OpenAI/Anthropic keys for local memory operations.',
        mcp: true,
        hook: true,
        proxy: false,
        all: 'Core Free, LLM paid',
      },
      {
        name: 'Preserves Native Model Subscriptions',
        desc: 'Never hijacks or interferes with your Cursor Pro, Claude, or Copilot subscription.',
        mcp: true,
        hook: true,
        proxy: 'Uses Upstream Key',
        all: true,
      },
      {
        name: 'Model Freedom (OpenRouter / Groq / OpenAI)',
        desc: 'Select ANY model on the fly under the GENESIS Proxy category inside your client.',
        mcp: false,
        hook: false,
        proxy: true,
        all: true,
      }
    ]
  }
]

export default function PrimitivesMatrix() {
  const [activeMode, setActiveMode] = useState('trimodal')
  const [copied, setCopied] = useState(false)

  const cur = MODES.find(m => m.id === activeMode) || MODES[0]

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="primitives" className="section" style={{ position: 'relative' }}>
      <div className="wrap">
        <SectionHead 
          eyebrow="Three Core Primitives"
          title="Modular by Design."
          grad="Honest by Default."
          lead="Every AI coding client speaks one of three primitives: MCP, Hook, or Proxy. Use any one independently, or combine all three. Zero false claims, zero lock-in — here is exactly what each layer unlocks."
        />

        {/* Mode Selector Tabs */}
        <Reveal style={{ marginTop: 40 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap',
            padding: '6px',
            background: 'rgba(15, 22, 32, 0.6)',
            borderRadius: 16,
            border: '1px solid var(--line)',
            width: 'fit-content',
            margin: '0 auto'
          }}>
            {MODES.map((m) => {
              const active = m.id === activeMode
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  style={{
                    position: 'relative',
                    padding: '10px 18px',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    color: active ? '#000' : 'var(--fg-2)',
                    transition: 'color 0.25s var(--ease)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer'
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="activePill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, #16e6ff, #00b8cc)',
                        borderRadius: 12,
                        boxShadow: '0 4px 20px rgba(0, 240, 255, 0.4)',
                        zIndex: 0
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{m.name}</span>
                  <span style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    fontSize: 10, 
                    padding: '2px 6px', 
                    borderRadius: 999, 
                    background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)',
                    color: active ? '#000' : 'var(--fg-3)',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    {m.badge}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Live Active Synergy HUD */}
        <Reveal style={{ marginTop: 28 }}>
          <Holo tilt={false}>
            <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span className="eyebrow" style={{ padding: '4px 10px', fontSize: 10 }}>
                      <i></i> Active Configuration
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--fg)' }}>{cur.tagline}</span>
                  </div>
                  <p style={{ color: 'var(--fg-2)', fontSize: 14, maxWidth: 680, lineHeight: 1.6 }}>{cur.desc}</p>
                </div>
                
                {/* 1-Click Setup Command */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid var(--line-2)',
                  borderRadius: 12,
                  padding: '10px 16px'
                }}>
                  <Terminal size={16} color="var(--cyan)" />
                  <span className="mono" style={{ fontSize: 13, color: 'var(--cyan)' }}>{cur.cmd}</span>
                  <button 
                    onClick={() => handleCopy(cur.cmd)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 4, 
                      color: copied ? 'var(--cyan)' : 'var(--fg-3)',
                      transition: 'color 0.2s',
                      marginLeft: 6
                    }}
                    title="Copy command"
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* HUD Telemetry Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: 12,
                paddingTop: 16,
                borderTop: '1px solid var(--line)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Token Diet Reduction</span>
                  <span className="mono" style={{ fontSize: 20, fontWeight: 700, color: cur.proxy ? 'var(--cyan)' : 'var(--fg-3)' }}>
                    {cur.stats.tokensSaved}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Memory Access Latency</span>
                  <span className="mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--cyan)' }}>
                    {cur.stats.latency}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Privacy & Keys</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: cur.mcp && !cur.proxy ? '#10B981' : 'var(--fg)' }}>
                    {cur.stats.offlineLocal}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Client Scope</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
                    {cur.stats.crossIdeSync}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cognitive Capabilities</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: cur.mcp ? 'var(--cyan)' : 'var(--fg-3)' }}>
                    {cur.stats.cognitiveTools}
                  </span>
                </div>
              </div>
            </div>
          </Holo>
        </Reveal>

        {/* 3 Primitives Deep-Dive Cards */}
        <div className="grid g3" style={{ marginTop: 36, alignItems: 'stretch' }}>
          
          {/* Card 1: MCP */}
          <Reveal delay={0.05}>
            <Holo style={{ height: '100%' }}>
              <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(0, 240, 255, 0.08)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    display: 'grid', placeItems: 'center'
                  }}>
                    <Brain size={22} color="var(--cyan)" />
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.08em' }}>
                    STDIO · LOCAL WAL
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>1. MCP Protocol</h3>
                  <p style={{ color: 'var(--fg-2)', fontSize: 13.5, lineHeight: 1.6 }}>
                    19 cognitive stdio tools registered in your IDE's settings. 100% offline, zero network, zero API keys required.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--fg)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    What You Get:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: 'var(--fg-2)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>19 Cognitive Tools:</strong> remember, recall, reinforce, genesis_log, challenge_rule, attest_closure...</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Zero Network Delay:</strong> Direct SQLite WAL queries (0.4ms latency), zero cloud dependencies.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Native Model Preserved:</strong> Keeps your Claude 3.5 or Cursor Pro subscription completely untouched.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>20+ Supported IDEs:</strong> Cursor, Claude Desktop, VS Code, Zed, Windsurf, JetBrains, Neovim...</span>
                    </li>
                  </ul>
                </div>

                <div style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--line)',
                  fontSize: 12,
                  color: 'var(--fg-3)'
                }}>
                  <strong style={{ color: 'var(--fg-2)' }}>Honest Boundary:</strong> Does not modify prompt tokens or compress tool output logs.
                </div>
              </div>
            </Holo>
          </Reveal>

          {/* Card 2: Hook */}
          <Reveal delay={0.1}>
            <Holo style={{ height: '100%' }}>
              <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(0, 240, 255, 0.08)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    display: 'grid', placeItems: 'center'
                  }}>
                    <Zap size={22} color="var(--cyan)" />
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.08em' }}>
                    PRE-PROMPT · SUB-10MS
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>2. Lifecycle Hook</h3>
                  <p style={{ color: 'var(--fg-2)', fontSize: 13.5, lineHeight: 1.6 }}>
                    Pre-invocation injection. Automatically primes the agent with a bounded capsule before the model turn begins.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--fg)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    What You Get:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: 'var(--fg-2)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Bounded Capsule:</strong> Strictly ≤200 tokens (~190 measured) injected seamlessly into context.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Subconscious Instinct:</strong> Active thread focus, last cross-client dialogue turn, and top engrams.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Zero User Overhead:</strong> No manual recall prompts needed; your agent already knows your invariants.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Supported Environments:</strong> Cursor 1.7 (hooks.json), Claude Code (PrePrompt), OpenCode plugin.</span>
                    </li>
                  </ul>
                </div>

                <div style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--line)',
                  fontSize: 12,
                  color: 'var(--fg-3)'
                }}>
                  <strong style={{ color: 'var(--fg-2)' }}>Honest Boundary:</strong> Requires clients supporting lifecycle hook APIs; does not compress raw terminal logs.
                </div>
              </div>
            </Holo>
          </Reveal>

          {/* Card 3: Proxy */}
          <Reveal delay={0.15}>
            <Holo style={{ height: '100%' }}>
              <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(0, 240, 255, 0.08)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    display: 'grid', placeItems: 'center'
                  }}>
                    <ShieldCheck size={22} color="var(--cyan)" />
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.08em' }}>
                    127.0.0.1:8000 · REVERSE PROXY
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>3. Gateway Proxy</h3>
                  <p style={{ color: 'var(--fg-2)', fontSize: 13.5, lineHeight: 1.6 }}>
                    Stateless OpenAI & Anthropic reverse proxy. Enforces 70.4% output token diet and lossless tool output compaction.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--fg)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    What You Get:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: 'var(--fg-2)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>70.4% Outbound Token Cut:</strong> Transparent output diet stops repetitive code chatter and cuts API bills.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Tool Spooling:</strong> Collapses 4,000-line test or diff logs into an 84-token pointer (-98.4% volume).</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Model Freedom:</strong> Connect OpenRouter, OpenAI, Groq, etc., and pick ANY model on the fly under GENESIS Proxy.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span><strong>Ideal For:</strong> Aider, OpenCode (genesis-proxy), Python SDKs, LangChain, LlamaIndex, CrewAI, AutoGen.</span>
                    </li>
                  </ul>
                </div>

                <div style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--line)',
                  fontSize: 12,
                  color: 'var(--fg-3)'
                }}>
                  <strong style={{ color: 'var(--fg-2)' }}>Honest Boundary:</strong> Requires running the local daemon; gatekept until upstream credentials are entered.
                </div>
              </div>
            </Holo>
          </Reveal>
        </div>

        {/* Feature Capability Comparison Table */}
        <Reveal style={{ marginTop: 44 }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>Complete Capability Matrix</h3>
                <p style={{ color: 'var(--fg-2)', fontSize: 13.5, marginTop: 4 }}>Compare what is included in each standalone primitive vs the full Tri-Modal stack.</p>
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--cyan)' }}>
                440 tests passed · 100% verified behavior
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--line)' }}>
                    <th style={{ padding: '16px 28px', color: 'var(--fg-2)', fontWeight: 600, width: '40%' }}>Feature / Capability</th>
                    <th style={{ padding: '16px 16px', color: 'var(--fg-2)', fontWeight: 600, textAlign: 'center' }}>MCP Only</th>
                    <th style={{ padding: '16px 16px', color: 'var(--fg-2)', fontWeight: 600, textAlign: 'center' }}>Hook Only</th>
                    <th style={{ padding: '16px 16px', color: 'var(--fg-2)', fontWeight: 600, textAlign: 'center' }}>Proxy Only</th>
                    <th style={{ padding: '16px 20px', color: 'var(--cyan)', fontWeight: 700, textAlign: 'center', background: 'rgba(0, 240, 255, 0.05)' }}>
                      Tri-Modal (All 3)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX_ROWS.map((section, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <tr style={{ background: 'rgba(0, 240, 255, 0.03)', borderBottom: '1px solid var(--line)' }}>
                        <td colSpan={5} style={{ padding: '10px 28px', fontWeight: 800, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)' }}>
                          {section.category}
                        </td>
                      </tr>
                      {section.features.map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: '1px solid var(--line)', transition: 'background 0.2s' }}>
                          <td style={{ padding: '16px 28px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--fg)' }}>{row.name}</div>
                            <div style={{ color: 'var(--fg-3)', fontSize: 12.5, marginTop: 3 }}>{row.desc}</div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            {renderCell(row.mcp)}
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            {renderCell(row.hook)}
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            {renderCell(row.proxy)}
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'center', background: 'rgba(0, 240, 255, 0.03)' }}>
                            {renderCell(row.all, true)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Action Banner */}
        <Reveal style={{ marginTop: 36 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '28px 36px',
            background: 'linear-gradient(90deg, rgba(0,240,255,0.08), rgba(16,185,129,0.04), rgba(0,0,0,0.4))',
            borderRadius: 16,
            border: '1px solid rgba(0,240,255,0.25)',
            flexWrap: 'wrap',
            gap: 20
          }}>
            <div>
              <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Ready to experience true persistent memory?</h4>
              <p style={{ color: 'var(--fg-2)', fontSize: 14 }}>One command wires your entire machine. Reversible at any time with <code>genesis setup --revert</code>.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Magnetic>
                <a href="#setup" className="btn primary">
                  Connect All Clients <ArrowRight size={16} />
                </a>
              </Magnetic>
              <a href="https://github.com/HamidRezaeian/genesis-memory" target="_blank" rel="noreferrer" className="btn ghost">
                View on GitHub
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

function renderCell(val, isAll = false) {
  if (val === true) {
    return (
      <span style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 26, 
        height: 26, 
        borderRadius: '50%', 
        background: isAll ? 'rgba(0, 240, 255, 0.2)' : 'rgba(16, 185, 129, 0.15)',
        color: isAll ? 'var(--cyan)' : '#10B981'
      }}>
        <Check size={16} strokeWidth={2.8} />
      </span>
    )
  }
  if (val === false) {
    return (
      <span style={{ color: 'var(--fg-3)' }}>
        <Minus size={16} />
      </span>
    )
  }
  return (
    <span style={{ 
      fontSize: 11, 
      fontWeight: 700, 
      padding: '3px 8px', 
      borderRadius: 6, 
      background: 'rgba(255,255,255,0.06)',
      color: 'var(--fg-2)'
    }}>
      {val}
    </span>
  )
}
