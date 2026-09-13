import { Holo, SectionHead, Reveal } from './ui'

/**
 * Output diet — the honest counterpart to the input diet above.
 * Input diet can be lossless; output diet is lossy by nature: nothing here
 * compresses what hasn't been said yet, it only asks for less of it.
 * No invented savings rates on this section — just mechanisms, all
 * user-sovereign (an explicit ask for depth always wins) and all counted
 * in telemetry.
 */
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

export default function OutputDiet() {
  return (
    <section id="output" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Output token diet" title="Input diet is lossless." grad="Output diet is a choice." lead="You cannot compress what hasn't been said yet — only ask for less of it. Three small, user-sovereign mechanisms govern outbound tokens, and telemetry counts every decision. Output tokens cost 2–4× input tokens, so less out is where the money is." />
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
            </Reveal>))}
        </div>
        <Reveal style={{ marginTop: 28 }}>
          <div className="term" style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="bar"><i /><i /><i /><span>the whole directive · static · prefix-cache friendly</span></div>
            <div className="body">
              <span className="dim">Answer tersely. No greetings, filler, hedging, restatement, or summaries. State only result and reason. Preserve code blocks, commands, error messages, file paths, and numbers byte-for-byte. Never paraphrase or reformat them. Reply with unified diffs, never full files.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
