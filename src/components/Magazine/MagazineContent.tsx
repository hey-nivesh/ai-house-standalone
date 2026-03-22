'use client';

import React, { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const V = {
  primary: '#724e99',
  primaryDark: '#4a2880',
  ink: '#1a1a1a',
  white: '#ffffff',
  fontHeading: "'Playfair Display', serif",
  fontDeck: "'Oswald', sans-serif",
  fontBody: "'Inter', sans-serif",
};

// ─── TYPOGRAPHY SCALE ─────────────────────────────────────────────────────────
// h2  — main spread headline
// h3  — section subheading (sidebar / right col)
// h4  — label heading (small callout blocks)
// body — all paragraph / caption / list text
// label — uppercase micro-label (sidebarLabel)

const sidebarLabel: React.CSSProperties = {
  display: 'block',
  fontFamily: V.fontBody,
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  color: V.primary,
  marginBottom: '0.4rem',
};

const statBig: React.CSSProperties = {
  display: 'block',
  fontFamily: V.fontDeck,
  fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
  fontWeight: 900,
  color: V.primary,
  lineHeight: 0.95,
  margin: '0.3rem 0',
  letterSpacing: '-1px',
};

const statHighlight: React.CSSProperties = { fontWeight: 700, color: V.primary, fontFamily: V.fontDeck };

const categoryBadge: React.CSSProperties = {
  display: 'inline-block',
  background: V.primary,
  color: V.white,
  fontFamily: V.fontDeck,
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
  padding: '0.25rem 0.75rem',
  marginBottom: '0.6rem',
  alignSelf: 'flex-start',
};

const kicker: React.CSSProperties = {
  fontFamily: V.fontDeck,
  fontSize: '0.78rem',
  fontWeight: 400,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: V.ink,
  opacity: 0.6,
  marginBottom: '0.5rem',
};

// h2 — main spread headline (consistent across all spreads)
const headline: React.CSSProperties = {
  fontFamily: V.fontHeading,
  fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)',
  fontWeight: 700,
  lineHeight: 1.0,
  letterSpacing: '-1px',
  color: V.ink,
  marginBottom: '1rem',
};

// h3 — section subheading used in side columns
const h3Style: React.CSSProperties = {
  fontFamily: V.fontHeading,
  fontSize: '1.35rem',
  fontWeight: 700,
  lineHeight: 1.15,
  letterSpacing: '-0.3px',
  color: V.ink,
  margin: '0.1rem 0 0.5rem',
};

// h4 — small callout / block heading
const h4Style: React.CSSProperties = {
  fontFamily: V.fontDeck,
  fontSize: '1.1rem',
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  color: V.ink,
  margin: '0.1rem 0 0.5rem',
};

// body — single consistent size/font for all paragraph text
const bodyP: React.CSSProperties = {
  fontFamily: V.fontBody,
  fontSize: 'clamp(0.7rem, 0.85vw, 0.9rem)',
  lineHeight: 1.55,
  color: V.ink,
  marginBottom: '0.9rem',
  fontWeight: 300,
  textAlign: 'justify',
  hyphens: 'auto',
};

const imgCaption: React.CSSProperties = {
  fontFamily: V.fontBody,
  fontSize: '0.84rem',
  color: V.ink,
  opacity: 0.6,
  fontStyle: 'italic',
  marginTop: '0.4rem',
  marginBottom: '0.8rem',
  lineHeight: 1.55,
  fontWeight: 400,
};

const pullQuote: React.CSSProperties = {
  fontFamily: V.fontHeading,
  fontSize: 'clamp(0.82rem, 1.1vw, 1.0rem)',
  fontStyle: 'italic',
  fontWeight: 600,
  lineHeight: 1.4,
  color: V.ink,
  borderLeft: `3px solid ${V.ink}`,
  paddingLeft: '0.75rem',
  margin: '1rem 0',
};

// ─── SPREAD 1 LEFT ────────────────────────────────────────────────────────────
export const Spread1Left = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{
    width: '100%', height: '100%', background: V.white,
    display: 'flex', flexDirection: isMobile ? 'column' : 'row',
    boxSizing: 'border-box', overflow: 'hidden', color: V.ink,
    fontFamily: V.fontBody,
  }}>
    {/* COL 1 — image + intro + AI Academy */}
    <div style={{
      width: isMobile ? '100%' : 'clamp(180px, 50%, 425px)', flexShrink: 0, padding: isMobile ? '1rem 1rem 0.8rem' : '1.5rem 2% 1rem 3%',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      borderRight: isMobile ? 'none' : '1px solid rgba(0,0,0,0.06)',
      borderBottom: isMobile ? '1px solid rgba(0,0,0,0.06)' : 'none',
    }}>
      <div style={{ width: '100%', marginBottom: '0.8rem', overflow: 'hidden', flex: 1, minHeight: 'clamp(22vh, 8vw + 20vh, 45vh)' }}>
        <img src="/DSC_0633.jpg" alt="HiDevs Vision"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <p style={{ ...bodyP, overflow: 'hidden', marginBottom: '0.6rem' }}>
        <span style={{
          fontFamily: V.fontHeading, fontSize: 'clamp(2.8rem, 4vw, 4.5rem)', float: 'left',
          lineHeight: 'clamp(2.2rem, 3.2vw, 3.6rem)', paddingRight: '0.5rem', color: V.ink,
          fontWeight: 700, marginTop: '0.1rem',
        }}>T</span>
        his month marks a definitive evolution for HiDevs. We have officially transitioned
        from a training provider to a{' '}
        <span style={statHighlight}>Developer Intelligence Platform</span>.
        In the Agentic Era, passive learning is obsolete; industry leadership now demands a
        verifiable Proof-of-Execution.
      </p>
      <p style={{ ...bodyP, marginBottom: '0.6rem' }}>
        Architectural intuition and production-ready implementation now take precedence. Our
        platform is designed to quantify your execution capability, creating a definitive
        hiring signal for the global AI economy.
      </p>
      <div style={{ marginTop: '1.0rem', paddingTop: '1.05rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <span style={sidebarLabel}>STRATEGIC MILESTONE</span>
        <h4 style={{ margin: '0.1rem 0 0.55rem', fontFamily: V.fontDeck, letterSpacing: '1.3px', fontSize: '1.5rem', fontWeight: 700, color: V.ink, lineHeight: 1.05 }}>
          LAUNCHING THE AI ACADEMY
        </h4>
        <p style={{ ...bodyP, marginBottom: 0, textAlign: 'left' }}>
          Partnering with <strong>Enkrypt AI</strong> to launch the AI Academy. This
          collaboration bridges the gap between raw capability and responsible deployment,
          ensuring our workforce masters the security and ethics required for
          enterprise-grade Generative AI.
        </p>
      </div>
    </div>

    {/* COL 2 — badge + kicker + headline + 2-col body */}
    <div style={centerHalfCol('left')}>
      <CenterSpreadHalf side="left">
        <Spread1Center />
      </CenterSpreadHalf>
    </div>
  </div>
  );
};

// ─── SPREAD 1 RIGHT ───────────────────────────────────────────────────────────
export const Spread1Right = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{
    width: '100%', height: '100%', background: V.white,
    display: 'flex', flexDirection: isMobile ? 'column' : 'row',
    boxSizing: 'border-box', overflow: 'hidden', color: V.ink,
    fontFamily: V.fontBody,
  }}>
    {/* ── CENTER COLUMN ── */}
    <div style={centerHalfCol('right')}>
      <CenterSpreadHalf side="right">
        <Spread1Center />
      </CenterSpreadHalf>
    </div>

    {/* ── RIGHT COLUMN ── */}
    <div style={{
      width: isMobile ? '100%' : 'clamp(180px, 50%, 425px)', flexShrink: 0,
      padding: isMobile ? '1rem' : '1.5rem 2.5% 1.5rem 2%',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0,
      borderTop: isMobile ? '1px solid rgba(0,0,0,0.06)' : 'none',
    }}>
      {/* Image */}
      <div style={{ width: '100%', marginBottom: '0.8rem', overflow: 'hidden', flexShrink: 0, flex: 1, minHeight: 'clamp(14vh, 5vw + 10vh, 30vh)' }}>
        <img
          src="/DSC_0718.jpg"
          alt="HiDevs Builders at work"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* METADATA: ISSUE 01 */}
      <div style={{ padding: '0.65rem 0 0.85rem', textAlign: 'center', width: '100%', flexShrink: 0 }}>
        <p style={{
          fontFamily: V.fontBody, fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)', textTransform: 'uppercase',
          letterSpacing: '2px', color: V.ink, fontWeight: 500,
          marginBottom: '0', lineHeight: 1.5,
        }}>
          METADATA:
        </p>
        <span style={{ ...statBig, fontSize: 'clamp(2rem, 8vw, 5rem)', lineHeight: 0.9 }}>Issue 01</span>
        <p style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)', marginTop: '0.35rem', color: V.ink, textTransform: 'uppercase', letterSpacing: '1.4px', fontWeight: 400 }}>
          March <span style={statHighlight}>2026</span> | Monthly Newsletter
        </p>
      </div>

      {/* Pillars of Execution */}
      <div style={{ padding: '0.8rem 0 1rem', flexShrink: 0, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={sidebarLabel}>PILLARS OF EXECUTION</span>
        {[
          { label: 'Strategic Milestone:', text: 'The AI Academy launch with Enkrypt AI.' },
          { label: 'Ecosystem:', text: 'HSR Founder Club partnership in Bangalore.' },
          { label: 'Intelligence:', text: 'Transition to Developer Intelligence Platform.' },
        ].map((item) => (
          <div key={item.label} style={{
            fontSize: 'clamp(0.65rem, 1.5vw, 0.82rem)', lineHeight: 1.55, color: V.ink,
            padding: '0.45rem 0', fontWeight: 300,
          }}>
            <strong style={{ fontWeight: 600, display: 'block', marginBottom: '0.05rem' }}>
              {item.label}
            </strong>
            {item.text}
          </div>
        ))}
      </div>

      {/* VERIFIABLE PROOF — pushed to bottom */}
      <div style={{ flexShrink: 0, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.8rem' }}>
        <div style={{ padding: '1rem 0 0.2rem', textAlign: 'center', width: '100%' }}>
          <p style={{
            fontFamily: V.fontBody, fontSize: 'clamp(0.65rem, 1.2vw, 0.84rem)', textTransform: 'uppercase',
            letterSpacing: '2px', color: V.ink, fontWeight: 500,
            lineHeight: 1.5, marginBottom: '0',
          }}>
            VERIFIABLE
          </p>
          <span style={{ ...statBig, fontSize: 'clamp(2.2rem, 6.5vw, 5.6rem)', lineHeight: 0.92 }}>Proof</span>
          <p style={{
            fontFamily: V.fontBody, fontSize: 'clamp(0.65rem, 1.3vw, 0.88rem)', textTransform: 'uppercase',
            letterSpacing: '1.4px', color: V.ink, fontWeight: 400,
            lineHeight: 1.4, marginTop: '0.3rem',
          }}>
            of Execution is now the primary hiring signal.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};


// ─── SHARED HELPERS ───────────────────────────────────────────────────────────
const page: React.CSSProperties = {
  width: '100%', height: '100%', background: V.white,
  display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
  overflow: 'hidden', color: V.ink, fontFamily: V.fontBody,
};

const spreadPage: React.CSSProperties = {
  ...page,
  flexDirection: 'row',
};

const col = (flex: string | number, extra?: React.CSSProperties): React.CSSProperties => ({
  flex, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, ...extra,
});
const sideCol = (extra?: React.CSSProperties): React.CSSProperties => ({
  width: 'clamp(180px, 50%, 425px)', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, ...extra,
});
const leftPageOuterCol = (extra?: React.CSSProperties): React.CSSProperties => (
  sideCol({ padding: '1.5rem 2.5% 1rem 3%', borderRight: '1px solid rgba(0,0,0,0.06)', ...extra })
);
const leftPageCenterCol = (extra?: React.CSSProperties): React.CSSProperties => (
  col(1, { padding: '1.5rem 3% 1rem 2%', minWidth: 0, ...extra })
);
const rightPageCenterCol = (extra?: React.CSSProperties): React.CSSProperties => (
  col(1, { padding: '1.5rem 3%', borderRight: '1px solid rgba(0,0,0,0.06)', minWidth: 0, ...extra })
);
const rightPageOuterCol = (extra?: React.CSSProperties): React.CSSProperties => (
  sideCol({ padding: '1.5rem 2.5% 1rem 2%', ...extra })
);
const centerHalfCol = (side: 'left' | 'right', extra?: React.CSSProperties): React.CSSProperties => (
  col(1, {
    padding: 0,
    borderRight: side === 'right' ? '1px solid rgba(0,0,0,0.06)' : undefined,
    minWidth: 0,
    ...extra,
  })
);

const fullImg = (src: string, alt: string, h = 'clamp(18vh, 24vh, 30vh)', extra?: React.CSSProperties) => (
  <div style={{ width: '100%', marginBottom: '0.8rem', overflow: 'hidden', flex: 1, minHeight: h }}>
    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...extra }} />
  </div>
);

const dropCap = (letter: string, rest: React.ReactNode) => (
  <p style={{ ...bodyP, overflow: 'hidden', marginBottom: '0.7rem' }}>
    <span style={{ fontFamily: V.fontHeading, fontSize: 'clamp(2.4rem, 3vw, 3.2rem)', float: 'left', lineHeight: 'clamp(1.9rem, 2.4vw, 2.6rem)', paddingRight: '0.5rem', color: V.ink, fontWeight: 700, marginTop: '0.1rem' }}>{letter}</span>
    {rest}
  </p>
);

const PullQuote = ({ text }: { text: string }) => (
  <div style={{ ...pullQuote, borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.8rem', marginTop: '1rem' }}>
    "{text}"
  </div>
);

const CenterSpreadHalf = ({
  side,
  children,
}: {
  side: 'left' | 'right';
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem 1.2rem 1rem', boxSizing: 'border-box' }}>
        {children}
      </div>
    );
  }
  return (
    <div
      style={{
        width: '200%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        transform: side === 'right' ? 'translateX(-50%)' : 'translateX(0)',
        transformOrigin: side === 'right' ? 'left top' : 'left top',
      }}
    >
      <div
        style={{
          width: '100%',
          minHeight: '100%',
          padding: '1.5rem 1.0rem 1rem',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SpreadWideTickerHalf = ({ side }: { side: 'left' | 'right' }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{ width: '100%', overflow: 'hidden', borderTop: '1px solid rgba(114,78,153,0.1)', borderBottom: '1px solid rgba(114,78,153,0.1)', padding: '0.72rem 0', flexShrink: 0 }}>
      <div
        style={{
          width: isMobile ? '100%' : '200%',
          transform: (!isMobile && side === 'right') ? 'translateX(-50%)' : 'translateX(0)',
          transformOrigin: 'left top',
        }}
      >
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', fontFamily: V.fontDeck, fontWeight: 700, letterSpacing: '2px', fontSize: '0.68rem', textTransform: 'uppercase', color: V.ink, animation: 'ticker 35s linear infinite' }}>
          {TICKER_TEXT}{TICKER_TEXT}
        </span>
      </div>
    </div>
  );
};

const SBarChart = ({ bars, labels }: { bars: { h: string; val: string }[]; labels: string[] }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '80px', paddingBottom: '4px', borderBottom: '1px solid #ddd', justifyContent: 'center' }}>
      {bars.map((b, i) => (
        <div key={i} style={{ flex: 1, maxWidth: '50px', minWidth: '20px', height: b.h, background: V.primary, borderRadius: '3px 3px 0 0', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: V.ink, fontWeight: 700, whiteSpace: 'nowrap' }}>{b.val}</span>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '4px' }}>
      {labels.map((l, i) => <span key={i} style={{ flex: 1, maxWidth: '50px', fontSize: '0.55rem', color: '#888', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l}</span>)}
    </div>
  </div>
);

const Spread1Center = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <div>
      <div style={categoryBadge}>01. STRATEGIC PIVOT</div>
      <p style={kicker}>Engineering the Agentic Era</p>
      <h2 style={headline}>The Shift Toward Machine Intelligence</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0.5rem' : '2rem', alignItems: 'start' }}>
        <div>
          <p style={{ ...bodyP, textAlign: 'left', hyphens: 'manual' }}>
            Across our global network, builders are moving beyond tutorials to provide a
            verifiable Proof-of-Execution. The Agentic Era requires more than just knowing
            how to prompt; it requires the ability to architect autonomous workflows that
            solve complex, multi-step reasoning challenges.
          </p>
          <p style={{ ...bodyP, textAlign: 'left', hyphens: 'manual', marginBottom: 0 }}>
            Our transition to a Developer Intelligence Platform marks a definitive
            milestone. We don&apos;t just teach; we audit. Every module you build is recorded
            on your Ledger, proof that speaks louder than any resume.
          </p>
        </div>
        <div>
          <p style={{ ...bodyP, textAlign: 'left', hyphens: 'manual' }}>
            We have partnered with the <strong>HSR Founder Club</strong> to strengthen the
            local startup ecosystem in Bangalore. This partnership provides early-stage
            founders and builders with a dedicated network for collaboration, resource
            sharing, and peer mentorship within the Bangalore region.
          </p>
          <p style={{ ...bodyP, textAlign: 'left', hyphens: 'manual', marginBottom: 0 }}>
            We are building the future of the AI industry, where execution is the only
            currency that matters. Join us in this evolution as we scale the world&apos;s most
            technically elite AI workforce.
          </p>
        </div>
      </div>
      <div style={{ marginTop: '1.5rem', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <img
          src="/matrix_showcasing.jpeg"
          alt="Intelligence Matrix"
          style={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            maxHeight: 'clamp(20vh, 5vw + 18vh, 40vh)',
            objectFit: 'cover',
            display: 'block',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
        />
        <p style={{ ...imgCaption, marginTop: '0.65rem', marginBottom: 0 }}>
          The HiDevs Intelligence Grid: Quantifying the Agentic Era.
        </p>
      </div>
    </div>
    <div style={{ marginTop: '2rem', paddingTop: '1rem' }}>
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.8rem' }}>
        <p style={{ ...pullQuote, marginTop: 0, marginBottom: 0, textAlign: 'center', fontSize: 'clamp(1rem, 1.5vw, 1.7rem)', lineHeight: 1.34, maxWidth: '90%', marginInline: 'auto' }}>
          "Passive learning is obsolete. Leadership now demands a verifiable Proof-of-Execution."
        </p>
      </div>
    </div>
  </div>
  );
};

const Spread2Center = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <div>
      <div style={categoryBadge}>02. ECOSYSTEM</div>
      <p style={kicker}>High-Impact Events</p>
      <h2 style={headline}>The Builder Movement Rising</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0.5rem' : '2rem', alignItems: 'start', marginBottom: 10 }}>
        <div>
          <p style={bodyP}>The builder movement is accelerating. Across online and offline sessions, we engaged over <span style={statHighlight}>650</span> builders with an average participant rating of <span style={statHighlight}>4.8/5</span>. Participants frequently cited high-value networking and technical unblocking as key highlights.</p>
          <p style={{ ...bodyP, marginBottom: 0 }}>Recent high-impact sessions include the <strong>OpenClaw Buildathon</strong>, the <strong>Founder&apos;s Friday Mixer</strong> with HSR Founder Club, and our <strong>Community Mixer</strong>, a collaborative build session for syncing on upcoming projects.</p>
        </div>
        <div>
          <p style={bodyP}>Our expansion continues with the appointment of <strong>Kuldeep Chaudhary</strong> as the NCR City Lead, who will spearhead our GenAI Circuit. We also inaugurated the <strong>Vibe Coding Club</strong> at Nitte Meenakshi Institute of Technology, a club focused on rapid, intuition-led development with AI agents.</p>
          <p style={{ ...bodyP, marginBottom: 0 }}>We distributed <span style={statHighlight}>890</span> physical copies of "Principles of Building AI Agents" this month, providing a clear roadmap for mastering agentic workflows.</p>
        </div>
      </div>
      <PullQuote text="In 8 hours at the AI House, I built more than I did in two weeks of solo research." />
      <div style={{ marginTop: '1rem' }}>
        <span style={{ ...sidebarLabel, marginBottom: '0.5rem' }}>RATINGS &amp; FEEDBACK</span>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.1rem' }}>
          <div style={{ textAlign: 'center', minWidth: 'clamp(60px, 8vw, 92px)', paddingTop: '0.15rem' }}>
            <span style={{ ...statBig, fontSize: 'clamp(1.8rem,4vw,3.4rem)', lineHeight: 0.95 }}>4.8</span>
            <span style={{ fontFamily: V.fontBody, fontSize: 'clamp(0.6rem, 1.2vw, 0.84rem)', color: 'rgba(0,0,0,0.48)', display: 'block', marginTop: '0.25rem', lineHeight: 1.55 }}>650+ Ratings</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(0.2rem, 0.5vw, 0.45rem)', paddingTop: '0.25rem' }}>
            {[['🤩', '85%'], ['🙂', '10%'], ['😐', '3%'], ['😔', '1%'], ['😡', '1%']].map(([emoji, w]) => (
              <div key={emoji} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)', width: '20px', textAlign: 'center' }}>{emoji}</span>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ flex: 1, height: '4px', background: '#ececec', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: w, height: '100%', background: V.primary, borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontFamily: V.fontBody, fontSize: 'clamp(0.6rem, 1.1vw, 0.84rem)', minWidth: '28px', color: 'rgba(0,0,0,0.52)', fontWeight: 600 }}>{w}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div style={{ marginTop: '1.2rem', paddingTop: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.4rem', borderTop: '1px solid rgba(114,78,153,0.12)', paddingTop: '1rem' }}>
        <div style={{ paddingLeft: '0.8rem', borderLeft: '3px solid ' + V.primary }}>
          <span style={sidebarLabel}>DISTRIBUTION</span>
          <p style={{ fontFamily: V.fontHeading, fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)', fontStyle: 'italic', fontWeight: 500, color: V.ink, margin: '0.3rem 0 0.75rem', lineHeight: 1.45 }}>
            <strong>890 Books</strong> of "Principles of Building AI Agents" distributed globally this month.
          </p>
          <a href="https://www.aihouze.xyz/" target="_blank" style={{ display: 'inline-block', fontFamily: V.fontDeck, fontSize: 'clamp(0.52rem, 1vw, 0.64rem)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: V.white, background: V.primary, textDecoration: 'none', padding: '0.48rem 1rem', borderRadius: '2rem' }}>Join the Network →</a>
        </div>
        <div style={{ paddingLeft: '1rem', borderLeft: '3px solid ' + V.primary }}>
          <span style={sidebarLabel}>LATEST MISSIONS</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.4rem, 1vw, 1rem)', margin: '0.35rem 0 0.7rem' }}>
            {[['Community Mixer', 'Collaborative Build & Ideation'], ["Founder's Friday", 'Scaling in the Agentic Era']].map(([t, m]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: V.primary, flexShrink: 0, marginTop: '0.34rem' }} />
                <div>
                  <p style={{ ...bodyP, fontWeight: 600, margin: 0 }}>{t}</p>
                  <p style={{ ...bodyP, color: 'rgba(0,0,0,0.45)', margin: '0.1rem 0 0' }}>{m}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="https://luma.com/ai_house" target="_blank" style={{ display: 'inline-block', fontFamily: V.fontDeck, fontSize: 'clamp(0.52rem, 1vw, 0.64rem)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: V.white, background: V.primary, textDecoration: 'none', padding: '0.48rem 1rem', borderRadius: '2rem' }}>Upcoming Sessions →</a>
        </div>
      </div>
    </div>
  </div>
  );
};

const Spread3Center = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <div>
      <div style={categoryBadge}>03. INNOVATION</div>
      <p style={kicker}>The Builder Toolkit</p>
      <h2 style={headline}>Validating True Intelligence</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0.5rem' : '1.85rem', alignItems: 'start' }}>
        <div>
          <p style={{ ...bodyP, lineHeight: 1.5 }}>We are transforming how technical capability is measured. Our new <strong>Agentic Deployment Portal</strong> is a performance-indexed marketplace where top-scoring builders are matched with roles based on verified platform data.</p>
          <p style={{ ...bodyP, marginBottom: 0, lineHeight: 1.5 }}>Our dedicated portal for <strong>Competitions &amp; Challenges</strong> allows builders to participate in high-stakes AI challenges that test architectural reasoning and the ability to ship production-ready code under pressure.</p>
        </div>
        <div>
          <p style={{ ...bodyP, lineHeight: 1.5 }}>The <strong>100-Day Gamified GenAI Internship</strong> has seen rapid adoption, turning builders into production-ready engineers through a series of increasingly complex agentic workflows.</p>
          <p style={{ ...bodyP, marginBottom: 0, lineHeight: 1.5 }}>Every tool we build is designed with one goal: to create a verifiable ledger of execution that becomes the primary hiring signal for the global AI industry.</p>
        </div>
      </div>
      <div style={{ marginTop: '1.2rem' }}>
        <span style={{ ...sidebarLabel, marginBottom: '0.7rem' }}>INNOVATION METRIC: TOPIC VALUE DISTRIBUTION</span>
        <SBarChart
          bars={[{ h: '50%', val: '7%' }, { h: '50%', val: '7%' }, { h: '50%', val: '7%' }, { h: '100%', val: '14%' }, { h: '100%', val: '14%' }, { h: '50%', val: '7%' }]}
          labels={['Agents', 'AI', 'Lyzr', 'OpenClaw', 'RAG', 'Generative']}
        />
      </div>
    </div>
    <div style={{ paddingTop: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.6rem', borderTop: '1px solid rgba(114,78,153,0.12)', paddingTop: '0.95rem' }}>
        <div>
          <span style={sidebarLabel}>OFFLINE IMPACT</span>
          <p style={{ ...bodyP, margin: 0 }}>
          <span style={{ ...statBig, fontSize: '2rem', fontWeight: 800 }}>220+</span>{' '}
            <strong style={{ fontSize: '1.08rem', color: V.ink }}>Builders</strong>
          </p>
          <p style={{ ...bodyP, margin: '0.42rem 0 0' }}>
            Sold-out Omi x Indore VC Hackathon, integrating AI wearables with Notion and Slack.
          </p>
        </div>
        <div>
          <span style={sidebarLabel}>GLOBAL IMPACT</span>
          <p style={{ fontFamily: V.fontBody, fontSize: '1.12rem', fontWeight: 800, lineHeight: 1.18, color: V.ink, margin: 0 }}>
            SF-BLR Bridge
          </p>
          <p style={{ ...bodyP, margin: '0.42rem 0 0' }}>
            Connecting founders with Talok Capital and DraperU Ventures in San Francisco.
          </p>
        </div>
      </div>
      {/* <div style={{ marginTop: '0.8rem' }}>
        <PullQuote text="We don't just teach; we audit. Logic is the only currency in the Agentic Era." />
      </div> */}
      <div style={{ marginTop: '2.5rem', paddingTop: '1rem' }}>
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.8rem' }}>
        <p style={{ ...pullQuote, marginTop: 0, marginBottom: 0, textAlign: 'center', fontSize: 'clamp(1rem, 1.5vw, 1.7rem)', lineHeight: 1.34, maxWidth: '90%', marginInline: 'auto' }}>
          "We don't just teach; we audit. Logic is the only currency in the Agentic Era."
        </p>
      </div>
    </div>
    </div>
  </div>
  );
};

const Spread4Center = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <div>
      <div style={categoryBadge}>04. VALIDATION</div>
      <p style={kicker}>Beyond The Resume</p>
      <h2 style={headline}>Competitions, Challenges &amp; Proof</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0.5rem' : '1.85rem', alignItems: 'start' }}>
        <div>
          <p style={{ ...bodyP, marginBottom: '1rem' }}>The industry is tired of resumes; it&apos;s looking for proof. HiDevs provides a ledger of technical execution that becomes the primary hiring signal for the global AI industry.</p>
          <p style={{ ...bodyP, marginBottom: 0 }}>Our competitions are rigorous validation engines. They are not simple tests; they are rigorous gauntlets that ensure builders develop deep architectural intuition rather than taking shortcuts.</p>
        </div>
        <div>
          <p style={{ ...bodyP, marginBottom: '1rem' }}>Top-scoring builders on our <strong>Agentic Deployment Portal</strong> are indexed and matched with industry-leading roles based on verified platform data. No shortcuts, just verified capability.</p>
          <p style={{ ...bodyP, marginBottom: 0 }}>Every challenge completed adds to your immutable Ledger, building a history of production-ready builds that speak louder than words.</p>
        </div>
      </div>
      <div style={{ marginTop: '2.0rem' }}>
        <span style={{ ...sidebarLabel, marginBottom: '0.7rem' }}>WORKSHOP PERFORMANCE MATRIX</span>
        <SBarChart
          bars={[{ h: '2%', val: '0' }, { h: '2%', val: '0' }, { h: '6%', val: '6%' }, { h: '41%', val: '41%' }, { h: '53%', val: '53%' }]}
          labels={['1', '2', '3', '4', '5']}
        />
      </div>
    </div>
    <div style={{ paddingTop: '2.0rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.4rem', borderTop: '1px solid rgba(114,78,153,0.12)', paddingTop: '0.95rem' }}>
        <div>
          <span style={sidebarLabel}>VALIDATION SIGNAL</span>
          <p style={{ ...bodyP, margin: 0 }}>
          <span style={{ ...statBig, fontSize: '2rem', fontWeight: 800 }}>94%</span>{' '}
            <strong style={{ fontSize: '1.04rem', color: V.ink }}>score 4 or 5</strong>
          </p>
          <p style={{ ...bodyP, margin: '0.42rem 0 0' }}>
            Most builders land in the top two workshop bands, indicating strong execution under pressure.
          </p>
        </div>
        <div>
          <span style={sidebarLabel}>HIRING OUTCOME</span>
          <p style={{ ...bodyP, fontWeight: 800, margin: 0 }}>
          Verified capability
          </p>
          <p style={{ ...bodyP, margin: '0.42rem 0 0' }}>
            Challenge completion builds a durable ledger for role matching on the deployment portal.
          </p>
        </div>
      </div>
      {/* <div style={{ marginTop: '0.85rem' }}>
        <PullQuote text="These sessions are designed to test logic and the ability to ship production-ready code under pressure." />
      </div> */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.8rem' }}>
        <p style={{ ...pullQuote, marginTop: 0, marginBottom: 0, textAlign: 'center', fontSize: 'clamp(1rem, 1.5vw, 1.7rem)', lineHeight: 1.34, maxWidth: '90%', marginInline: 'auto' }}>
          "These sessions are designed to test logic and the ability to ship production-ready code under pressure."
        </p>
      </div>
    </div>
    </div>
  </div>
  );
};

const Spread5Center = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <div>
      <div style={categoryBadge}>05. MANIFESTO</div>
      <p style={kicker}>From the Founder&apos;s Desk</p>
      <h2 style={headline}>The One Million Builder Mission</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0.5rem' : '1.8rem', alignItems: 'start' }}>
        <div>
          <p style={{ ...bodyP, marginBottom: '1rem' }}>The <span style={statHighlight}>2030</span> Vision is our North Star. It&apos;s a commitment to building the largest, most technically proficient GenAI workforce in history. One million developers who have demonstrably proven their ability to build with AI.</p>
          <p style={{ ...bodyP, marginBottom: 0 }}>This isn&apos;t just a target; it&apos;s a fundamental shift in how human potential is identified and rewarded. We are building a future where technical talent is distributed worldwide, but opportunity is concentrated where there is proof.</p>
        </div>
        <div>
          <span style={sidebarLabel}>INTERNAL TEAM GROWTH</span>
          <p style={{ ...bodyP, marginBottom: '1rem' }}>We are excited to welcome <strong>Rohith</strong> and <strong>Wilfred Dsouza</strong>, who are helping scale the HiDevs mission.</p>
          <p style={{ ...bodyP, marginBottom: 0 }}>Building the world&apos;s largest GenAI workforce requires a collective effort of builders, founders, and mentors who believe in the power of execution over credentials.</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2.4rem', justifyContent: 'center', textAlign: 'center', margin: '1rem 0 0', paddingTop: '0.8rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        {[['REGISTERED BUILDERS', '3,439'], ['MONTHLY GROWTH', '208+']].map(([label, val]) => (
          <div key={label}>
            <span style={sidebarLabel}>{label}</span>
            <span style={{ ...statBig, fontSize: 'clamp(2rem,4vw,3.8rem)', margin: '0.15rem 0' }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem', marginTop: '1rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(114,78,153,0.12)' }}>
        <div>
          <span style={sidebarLabel}>MISSION PRINCIPLE</span>
          <p style={{ ...bodyP, fontWeight: 700, margin: 0 }}>
            Proof over credentials
          </p>
          <p style={{ ...bodyP, margin: '0.4rem 0 0' }}>
            Opportunity should concentrate where there is real execution, not just polished resumes.
          </p>
        </div>
        <div>
          <span style={sidebarLabel}>GLOBAL NETWORK</span>
          <p style={{ ...bodyP, fontWeight: 700, margin: 0 }}>
            Distributed talent, a shared mission
          </p>
          <p style={{ ...bodyP, margin: '0.4rem 0 0' }}>
            Builders, founders, and mentors are scaling the world&apos;s largest GenAI workforce together.
          </p>
        </div>
      </div>
    </div>
    <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
      <div style={{ marginTop: '0.9rem' }}>
        <PullQuote text="The industry is tired of resumes; it's looking for proof. Our mission is simple: To make 1 million developers AI-ready by 2030." />
      </div>
    </div>
  </div>
  );
};

// ─── SPREAD 2 LEFT — PAGE 3 left column ──────────────────────────────────────
export const Spread2Left = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...spreadPage, flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
    <div style={leftPageOuterCol({ ...(isMobile && { width: '100%', borderRight: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }) })}>
      {fullImg('/DSC_0031.jpg', 'AI House Bangalore', 'clamp(20vh, 8vw + 12vh, 42vh)')}
      <p style={{ ...imgCaption, marginTop: '0.35rem', marginBottom: '0.95rem', fontSize: '0.8rem', lineHeight: 1.42 }}>
        The Bangalore AI House (HQ) - Epicentre of the local builder scene. Photograph by HiDevs Media.
      </p>

      {dropCap('O', <>ur Bangalore "Off-Campus HQ" remains the heartbeat of the local scene. We provide the physical space, infrastructure, and AI credits needed to move from concept to production.</>)}
      <p style={{ ...bodyP, marginBottom: '0.75rem', lineHeight: 1.48 }}>
        This month, we hosted elite sprints and collaborative coding sessions, providing builders with the tools necessary to scale.
      </p>

      {/* AI House CTA Section */}
      <div style={{ borderLeft: '3px solid ' + V.primary, paddingLeft: '0.85rem', margin: '0.4rem 0 0.4rem' }}>
        <span style={{ ...sidebarLabel }}>AI HOUSE</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', margin: '0.2rem 0 0.4rem' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={V.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <p style={{ fontFamily: V.fontHeading, fontSize: 'clamp(0.72rem, 1.3vw, 0.82rem)', fontStyle: 'italic', fontWeight: 500, color: V.ink, margin: 0, lineHeight: 1.4 }}>
            Discover upcoming sessions and builder meetups.
          </p>
        </div>
        <a href="https://luma.com/ai_house" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: V.fontDeck, fontSize: '0.64rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: V.white, background: V.primary, textDecoration: 'none', padding: '0.48rem 1rem', borderRadius: '2rem' }}>AI House →</a>
      </div>

      <div style={{ padding: '1rem 0 0', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '1.75rem' }}>
        {/* Heading spans full width */}
        <div style={{ fontFamily: V.fontHeading, fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.55rem' }}>Ambient Intelligence Hackathon: Building the Second Brain</div>
        {/* Bottom row: half-logo + details + button */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Half-cropped logo */}
          <div style={{ width: '42px', height: '42px', flexShrink: 0, overflow: 'hidden', borderRadius: '8px 0 0 8px', position: 'relative' }}>
            <img src="/luma.png" alt="Luma" style={{ width: '84px', height: '42px', objectFit: 'cover', position: 'absolute', left: 0, top: 0 }} />
          </div>
          {/* Event details */}
          <div style={{ flex: 1, fontSize: '0.76rem', color: '#666', lineHeight: 1.5 }}>
            <span style={{ color: V.primary, fontWeight: 700 }}>Mar 28</span> | 9:00 AM - 1:00 PM<br />
            OJone, Bengaluru, Karnataka<br />
            <span style={{ fontSize: '0.7rem', opacity: 0.75 }}>Hosted by Deepak Chawla</span>
          </div>
          {/* Register Now button */}
          <a href="https://luma.com/j4he39o0" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: V.fontDeck, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: V.white, background: V.primary, textDecoration: 'none', padding: '0.48rem 0.9rem', borderRadius: '2rem', whiteSpace: 'nowrap', flexShrink: 0 }}>Register Now →</a>
        </div>
      </div>
    </div>

    <div style={centerHalfCol('left')}>
      <CenterSpreadHalf side="left">
        <Spread2Center />
      </CenterSpreadHalf>
    </div>
  </div>
  );
};
export const Spread2Right = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...page, overflow: 'hidden' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: 0 }}>
      {/* CENTER */}
      <div style={centerHalfCol('right')}>
        <CenterSpreadHalf side="right">
          <Spread2Center />
        </CenterSpreadHalf>
      </div>

      {/* RIGHT */}
      <div style={rightPageOuterCol({ display: 'flex', flexDirection: 'column', minHeight: 0 })}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span style={sidebarLabel}>BUILDER OF THE MONTH</span>
          <h3 style={h3Style}>AKARSH SANGISETTI</h3>
          <p style={{ ...bodyP, textAlign: 'center' }}>Akarsh is currently leading the HiDevs Talent Pool with a high execution score. Akarsh has demonstrated exceptional reasoning depth and consistency in shipping production-ready agentic workflows within our ecosystem.</p>
          <a href="https://app.hidevs.xyz/profile/23btrcn056" target="_blank" style={{ display: 'inline-block', fontFamily: V.fontDeck, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: V.white, background: V.primary, textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '2rem', marginTop: '0.5rem' }}>VIEW EXECUTION PROFILE →</a>
        </div>
        <div style={{ textAlign: 'center', padding: '0.85rem 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={{ ...statBig, fontSize: 'clamp(2rem,5vw,3rem)' }}>650+</span>
          <p style={{ ...bodyP, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>builders engaged this month.</p>
          <p style={{ ...bodyP, textAlign: 'center', opacity: 0.8, marginBottom: 0 }}>Average Event Rating: <span style={statHighlight}>4.8/5</span></p>
        </div>
        {/* Pie chart */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span style={{ ...sidebarLabel, justifyContent: 'center', display: 'block', textAlign: 'center' }}>TEACHING STYLE</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '0.6rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'conic-gradient(#4a2880 0% 37.5%, #724e99 37.5% 93.8%, #f1c40f 93.8% 100%)', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', textAlign: 'left' }}>
              {[['#4a2880', '37.5% Very Easy'], ['#724e99', '56.3% Easy'], ['#f1c40f', '6.2% Other']].map(([c, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', color: V.ink }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, flexShrink: 0 }} />{l}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', marginTop: '1.25rem', paddingTop: '1rem' }}>
          <img src="/DSC_0765.jpg" alt="Akarsh" style={{ width: '100%', height: '100%', maxHeight: 'none', minHeight: '28vh', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
    </div>
  </div>
  );
};

// ─── SPREAD 3 LEFT — PAGE 4 left column ──────────────────────────────────────
export const Spread3Left = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...spreadPage, flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
    <div style={leftPageOuterCol({ paddingBottom: '1.5rem', ...(isMobile && { width: '100%', borderRight: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }) })}>
      {fullImg('/DSC_0672.jpg', 'AI Tools', 'clamp(20vh, 8vw + 14vh, 46vh)')}
      <p style={{ ...imgCaption, marginBottom: '0.95rem', fontSize: '0.82rem', lineHeight: 1.42 }}>
        The HiDevs Toolchain: Built to quantify logic and execution capability.
      </p>
      {dropCap('O', <>ur platform updates are designed to quantify a developer's logic. <strong>Dave (The AI Architect)</strong>, our <span style={statHighlight}>24/7</span> autonomous mentor, is designed to challenge logic rather than provide shortcuts.</>)}
      <p style={{ ...bodyP, marginBottom: '0.8rem', lineHeight: 1.48 }}><strong>LeetPrompt</strong>: A rigorous validation engine for prompt engineering and logic-based reasoning, ensuring builders develop deep architectural intuition.</p>
      <div style={{ marginTop: '0.8rem', paddingTop: '0.7rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={sidebarLabel}>LAUNCHPAD PROGRAM</span>
        <h4 style={{ margin: '0.2rem 0 0.3rem', fontFamily: V.fontDeck, fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 700, color: V.ink, letterSpacing: '0.5px', lineHeight: 1.12 }}>
          LBL: THE AI AGENTIC LAUNCHPAD PROGRAM
        </h4>
        <p style={{ ...bodyP, marginBottom: '0.5rem' }}>
          LBL is not a course. It's a launchpad that takes engineers from basic AI knowledge
          to real-world deployment, with strict evaluations, real projects, and a global
          Demo Day.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.6rem' }}>
          {[
            '100-day structured program',
            'Real agentic project deployments',
            'Global Demo Day with investors & founders',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: V.primary, marginTop: '0.35rem', flexShrink: 0 }} />
              <p style={{ ...bodyP, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
        <a href="https://app.hidevs.xyz/lbl" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: V.fontDeck, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: V.white, background: V.primary, textDecoration: 'none', padding: '0.5rem 1.1rem', borderRadius: '2rem' }}>Apply to LBL →</a>
      </div>
    </div>

    <div style={centerHalfCol('left', { paddingBottom: '1.5rem' })}>
      <CenterSpreadHalf side="left">
        <Spread3Center />
      </CenterSpreadHalf>
    </div>
  </div>
  );
};

// ─── SPREAD 3 RIGHT — PAGE 4 center + right columns ──────────────────────────
export const Spread3Right = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...page, flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
    {/* CENTER */}
    <div style={centerHalfCol('right', { paddingBottom: '1.5rem' })}>
      <CenterSpreadHalf side="right">
        <Spread3Center />
      </CenterSpreadHalf>
    </div>
    {/* RIGHT */}
    <div style={rightPageOuterCol({ paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: 0, ...(isMobile && { width: '100%', borderTop: '1px solid rgba(0,0,0,0.06)' }) })}>
      {fullImg('/DSC_0739.jpg', 'HiDevs platform tools', 'clamp(16vh, 5vw + 10vh, 31vh)')}
      <div style={{ textAlign: 'center', padding: '0.8rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={sidebarLabel}>THE MENTOR</span>
        <div style={{ width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden', border: '2px solid ' + V.ink, margin: '0.45rem auto' }}>
          <img src="/dave.png" alt="Dave AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <strong style={{ fontFamily: V.fontBody, fontSize: '0.84rem', display: 'block', marginBottom: '0.35rem' }}>Dave (The AI Architect)</strong>
        <p style={{ ...bodyP, textAlign: 'center' }}>
          Our 24/7 autonomous mentor, designed to challenge logic rather than provide shortcuts,
          ensuring builders develop deep architectural intuition.
        </p>
      </div>
      <div style={{ padding: '0.9rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
        <span style={sidebarLabel}>DEPLOYMENT</span>
        <p style={{ ...bodyP, textAlign: 'center', marginBottom: 0 }}>
          Performance-indexed marketplace matching top builders with industry roles.
        </p>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2.0rem', textAlign: 'center', paddingTop: '0.75rem', paddingBottom: '0.3rem' }}>
        <div style={{ borderTop: '0px solid rgba(0,0,0,0.06)', paddingTop: '0.6rem' }}>
          <span style={{ ...statBig, fontSize: 'clamp(1.8rem,4vw,2.8rem)', lineHeight: 0.95 }}>100-Day</span>
          <p style={{ ...bodyP, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '0.2rem' }}>
            gamified GenAI internship program live.
          </p>
          <p style={{ ...bodyP, textAlign: 'center', marginBottom: 0 }}>
            Rapid adoption is turning builders into production-ready engineers through increasingly complex agentic workflows.
          </p>
        </div>
        <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={sidebarLabel}>PROGRAM SNAPSHOT</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', textAlign: 'left' }}>
            {[['24/7 Mentor', 'Dave-led guidance'], ['Live Cohorts', 'Weekly build reviews']].map(([label, meta]) => (
              <div key={label}>
                <p style={{ ...bodyP, fontWeight: 700, margin: 0 }}>{label}</p>
                <p style={{ ...bodyP, color: 'rgba(0,0,0,0.48)', margin: '0.08rem 0 0' }}>{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

// ─── SPREAD 4 LEFT — PAGE 5 left column ──────────────────────────────────────
export const Spread4Left = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...spreadPage, flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
    <div style={leftPageOuterCol({ padding: isMobile ? '1rem' : '1.5rem 1.4% 1rem 1.4%', ...(isMobile && { width: '100%', borderRight: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }) })}>
      {fullImg('/DSC_0681.jpg', 'Execution Matrix', 'clamp(20vh, 8vw + 14vh, 45vh)', { filter: 'grayscale(0.2)' })}
      <p style={{ ...imgCaption, marginBottom: '1rem', fontSize: '0.82rem', lineHeight: 1.42 }}>
        The HiDevs Intelligence Grid - mapping logic scores to verified career paths.
      </p>
      {dropCap('O', <>ur latest platform updates are designed to quantify a developer&apos;s logic and execution capability. We don&apos;t just teach; we audit.</>)}
      <p style={{ ...bodyP, marginBottom: '1.05rem' }}>
        Through our dedicated portal for <strong>Competitions &amp; Challenges</strong>, builders
        participate in high-stakes sessions designed to test logic and the ability to ship
        production-ready code under pressure.
      </p>
      <div style={{ marginTop: '1.15rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={sidebarLabel}>VALIDATION FOCUS</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
          {[
            'Proof over resumes',
            'Architectural intuition',
            'Production-ready execution',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: V.primary, marginTop: '0.34rem', flexShrink: 0 }} />
              <p style={{ ...bodyP, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.2rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={sidebarLabel}>AGENTIC DEPLOYMENT PORTAL</span>
        <p style={{ ...bodyP, marginTop: '0.4rem', marginBottom: '0.6rem' }}>
          Top-scoring builders are performance-indexed and matched with industry roles based solely on verified platform data — no resume required.
        </p>
      </div>
    </div>

    <div style={centerHalfCol('left')}>
      <CenterSpreadHalf side="left">
        <Spread4Center />
      </CenterSpreadHalf>
    </div>
  </div>
  );
};

// ─── SPREAD 4 RIGHT — PAGE 5 center + right + ticker ─────────────────────────
const TICKER_TEXT = 'LEETPROMPT VALIDATION • AGENTIC DEPLOYMENT PORTAL • DAVE AI ARCHITECT • PERFORMANCE INDEXED MARKETPLACE • VERIFIABLE PROOF • BUILDING THE FUTURE • 3,439 BUILDERS • ZERO-HALLUCINATION PROMPTS •\u00a0';

export const Spread4Right = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...page, overflow: 'hidden' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: 0 }}>
      {/* CENTER */}
      <div style={centerHalfCol('right')}>
        <CenterSpreadHalf side="right">
          <Spread4Center />
        </CenterSpreadHalf>
      </div>
      {/* RIGHT */}
      <div style={rightPageOuterCol({ paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: 0, ...(isMobile && { width: '100%', borderTop: '1px solid rgba(0,0,0,0.06)' }) })}>
        {fullImg('/DSC_0781.jpg', 'Builders proving execution', '31vh')}
        <div style={{ textAlign: 'center', padding: '0.75rem 0 0.6rem' }}>
          <p style={{ ...bodyP, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 0 }}>AVG. LOGIC SCORE:</p>
          <span style={{ ...statBig, fontSize: 'clamp(2.5rem,5.8vw,3.9rem)', lineHeight: 0.92 }}>84%</span>
          <p style={{ ...bodyP, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 0 }}>Verified across 45+ challenges active this month.</p>
        </div>
        <div style={{ padding: '0.8rem 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={sidebarLabel}>TOP SCORES THIS MONTH</span>
          {[['Diksha Swami', '95%', 'RAG Pipeline'], ['Varad Nirgude', '90%', 'Agentic Logic'], ['Akarsh S.', '88%', 'Multi-Agent']].map(([name, score, tag]) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.42rem 0', gap: '0.5rem' }}>
              <strong style={{ fontWeight: 600, fontSize: 'clamp(0.7rem, 1.3vw, 0.88rem)', color: V.ink }}>{name}</strong>
              <span style={{ fontFamily: V.fontBody, fontSize: 'clamp(0.65rem, 1.2vw, 0.84rem)', color: V.primary, textAlign: 'right', flexShrink: 0 }}><span style={statHighlight}>{score}</span> {tag}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0.95rem 0 0.2rem' }}>
          <div style={{ paddingTop: '0.2rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <span style={sidebarLabel}>VALIDATION INSIGHT</span>
            <p style={{ ...bodyP, marginBottom: 0 }}>
              High scorers are trending toward RAG, agentic logic, and multi-agent execution paths.
            </p>
          </div>
          <div style={{ marginTop:'1rem',paddingTop: '1.15rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <span style={sidebarLabel}>DEMO DAY</span>
            <p style={{ ...bodyP, marginBottom: 0 }}>
              LBL graduates present real-world deployments to a global audience of investors and founders.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

// ─── SPREAD 5 LEFT — PAGE 6 left column ──────────────────────────────────────
export const Spread5Left = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...page, overflow: 'hidden' }}>
    <SpreadWideTickerHalf side="left" />
    <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: 0 }}>
      <div style={leftPageOuterCol({ padding: isMobile ? '1rem' : '1.2rem 1.5% 1rem 1.6%', ...(isMobile && { width: '100%', borderRight: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }) })}>
        {fullImg('/vision_hero.jpeg', 'The Vision 2030', 'clamp(20vh, 8vw + 14vh, 46vh)')}
        <p style={{ ...imgCaption, marginBottom: '1rem', fontSize: '0.82rem', lineHeight: 1.42 }}>Our mission is simple: To make 1 million developers AI-ready by 2030.</p>
        {dropCap('O', <>ur mission is simple: To make <span style={statHighlight}>1 million</span> developers AI-ready by <span style={statHighlight}>2030</span>. This isn&apos;t just about quantity; it&apos;s about building a ledger of technical execution that becomes the primary hiring signal.</>)}
        <p style={{ ...bodyP, marginBottom: '1rem' }}>The industry is tired of resumes; it&apos;s looking for proof. We are building a future where your history of production-ready builds defines your professional worth - bypassing traditional gatekeepers.</p>
        <p style={{ ...bodyP, marginBottom: '1rem' }}>We are excited to welcome our newest team members who are helping scale the HiDevs mission across our global network.</p>
        <div style={{ marginTop: '1rem', paddingTop: '0.95rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={sidebarLabel}>MISSION OUTLOOK</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.42rem' }}>
            {[
              '1 million developers AI-ready by 2030',
              'Production-ready builds as the primary signal',
              'Global network expansion through new team growth',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: V.primary, marginTop: '0.34rem', flexShrink: 0 }} />
                <p style={{ ...bodyP, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={centerHalfCol('left', { paddingBottom: '1.5rem' })}>
        <CenterSpreadHalf side="left">
          <Spread5Center />
        </CenterSpreadHalf>
      </div>
    </div>
  </div>
  );
};

// ─── SPREAD 5 RIGHT — PAGE 6 center + right + footer ─────────────────────────
export const Spread5Right = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{ ...page, overflow: 'hidden' }}>
    <SpreadWideTickerHalf side="right" />
    <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: 0 }}>
      {/* CENTER */}
      <div style={centerHalfCol('right', { paddingBottom: '1.5rem' })}>
        <CenterSpreadHalf side="right">
          <Spread5Center />
        </CenterSpreadHalf>
      </div>
      {/* RIGHT */}
      <div style={rightPageOuterCol({ paddingBottom: '1.2rem', display: 'flex', flexDirection: 'column', minHeight: 0, ...(isMobile && { width: '100%', borderTop: '1px solid rgba(0,0,0,0.06)' }) })}>
        {fullImg('/DSC_0795.jpg', 'HiDevs 2030 vision', 'clamp(14vh, 4vw + 10vh, 26vh)')}
        <div style={{ textAlign: 'left', padding: '0.35rem 0 0.9rem' }}>
          <p style={{ ...bodyP, textTransform: 'uppercase', letterSpacing: '1.3px', marginBottom: '0.2rem' }}>Goal:</p>
          <span style={{ ...statBig, fontSize: 'clamp(3.4rem,8vw,5.4rem)', lineHeight: 0.9, margin: '0.15rem 0' }}>1M<br />Skilled</span>
          <p style={{ ...bodyP, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 0 }}>by 2030.</p>
        </div>
        <div style={{ padding: '1rem 0 0.9rem', borderTop: '1px solid rgba(0,0,0,0.06)', textAlign: 'center', marginTop: '0.4rem' }}>
          <span style={sidebarLabel}>TEAM GROWTH</span>
          {[['Rohith', 'Generative AI Developer Intern'], ['Wilfred Dsouza', 'Full-Stack Developer']].map(([name, role]) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', padding: '0.32rem 0', gap: '0.7rem' }}>
              <strong style={{ fontWeight: 700, color: V.ink }}>{name}</strong>
              <span style={{ fontFamily: V.fontBody, fontSize: '0.84rem', color: V.primary, textAlign: 'left' }}>{role}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '1.05rem 0', borderTop: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
          <span style={sidebarLabel}>CONTACT &amp; BRANDING</span>
          <p style={{ ...bodyP, textAlign: 'center', marginBottom: '0.35rem' }}><strong>Website:</strong> <a href="https://www.hidevs.xyz" target="_blank" style={{ color: '#0000ff' }}>www.hidevs.xyz</a></p>
          <p style={{ ...bodyP, textAlign: 'center', marginBottom: 0 }}><strong>Tagline:</strong> Building the world&apos;s largest GenAI workforce.</p>
        </div>
        <div style={{ marginTop: '1.6rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontFamily: V.fontBody, fontSize: '0.76rem', fontWeight: 500, color: V.primary, letterSpacing: '0.5px', textTransform: 'uppercase', textAlign: 'left' }}>
            — Deepak Chawla, Founder &amp; CEO
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};