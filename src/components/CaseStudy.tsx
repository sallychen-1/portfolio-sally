import img1 from '../assets/1.png';
import img4 from '../assets/4.png';
import img6 from '../assets/6.png';

type CaseStudyId = 'ticket' | 'coffee';

/* ─── DATA ─────────────────────────────────────────────────────── */
const DATA: Record<CaseStudyId, {
  title: string;
  tagline: string;
  year: string;
  role: string;
  duration: string;
  platform: string;
  accentColor: string;
  paletteLight: string;
  palette: string[];
  paletteNames: string[];
  metrics: { value: string; label: string }[];
  problem: string;
  insight: string;
  result: string;
  process: { step: string; title: string; detail: string }[];
  screens: { bg: string; content: string; imageSrc?: string }[];
}> = {
  ticket: {
    title: 'Ticket Booking App',
    tagline: 'From discovery to confirmed ticket in under 60 seconds',
    year: '2024',
    role: 'UI/UX Designer',
    duration: '8 weeks',
    platform: 'iOS',
    accentColor: '#C9A84C',
    paletteLight: 'rgba(201,168,76,0.12)',
    palette: ['#1A1A18', '#C9A84C', '#F5F0E8', '#E8D89A', '#9A4A4A'],
    paletteNames: ['Ink', 'Gold', 'Cream', 'Mist', 'Alert'],
    metrics: [
      { value: '43%', label: 'Drop-off reduction' },
      { value: '60s', label: 'Checkout time' },
      { value: '14', label: 'User interviews' },
      { value: '40+', label: 'Components built' },
    ],
    problem: '68% of users abandoned checkout because the total price appeared only after seat selection.',
    insight: 'Showing total cost upfront — even when higher than expected — builds more trust than hiding it.',
    result: 'Redesigned the entire purchase flow from 7 steps down to 3, with price transparency at every stage.',
    process: [
      { step: '01', title: 'Research', detail: '14 interviews · 200 surveys · Competitor analysis' },
      { step: '02', title: 'Define', detail: 'Pain-point mapping · Affinity clustering · HMW statements' },
      { step: '03', title: 'Design', detail: '40+ Figma components · 3 prototype iterations' },
      { step: '04', title: 'Test', detail: '2 moderated usability sessions · A/B tested CTAs' },
    ],
    screens: [
      { bg: 'linear-gradient(160deg,#1a1208,#3a2810)', content: 'home' },
      { bg: 'linear-gradient(160deg,#120a02,#2a1a08)', content: 'seat' },
      { bg: 'linear-gradient(160deg,#0a0802,#201808)', content: 'checkout' },
    ],
  },
  coffee: {
    title: 'Coffee Ordering App',
    tagline: 'Designed to feel as warm as the café itself',
    year: '2024',
    role: 'UI/UX Designer',
    duration: '6 weeks',
    platform: 'Android',
    accentColor: '#A87878',
    paletteLight: 'rgba(168,120,120,0.12)',
    palette: ['#2C1810', '#A87878', '#FAF0E6', '#D4A880', '#5C4030'],
    paletteNames: ['Espresso', 'Terracotta', 'Milk', 'Caramel', 'Bark'],
    metrics: [
      { value: '5', label: 'Usability tests' },
      { value: '32%', label: 'Repeat order rate' },
      { value: '4.8', label: 'User satisfaction' },
      { value: '2', label: 'Days café research' },
    ],
    problem: 'The white-label app felt cold and generic. Customers preferred ordering in person because "the app doesn\'t feel like us."',
    insight: 'People don\'t just buy coffee — they buy a feeling. Every pixel should evoke the warmth of the café.',
    result: 'A fully custom design language: terracotta palette, artisan typography, illustrated ingredients, and micro-animations.',
    process: [
      { step: '01', title: 'Immersion', detail: '2 days in-café · Staff interviews · Photography session' },
      { step: '02', title: 'Brand DNA', detail: 'Mood board · Colour system · Type pairing' },
      { step: '03', title: 'Design', detail: 'Custom icon set · Illustrated components · Motion spec' },
      { step: '04', title: 'Validate', detail: '5 usability tests · Staff walkthroughs · Iteration' },
    ],
    screens: [
      { bg: 'linear-gradient(160deg,#1a0c08,#3a1810)', content: 'splash', imageSrc: img1 },
      { bg: 'linear-gradient(160deg,#150a06,#2c1408)', content: 'signup', imageSrc: img4 },
      { bg: 'linear-gradient(160deg,#0c0804,#201410)', content: 'menu', imageSrc: img6 },
    ],
  },
};

/* ─── PHONE MOCK ────────────────────────────────────────────────── */
function PhoneMock({
  bg, accent, idx, content, imageSrc,
}: {
  bg: string; accent: string; idx: number; content: string; imageSrc?: string;
}) {
  const transforms = [
    'rotate(-6deg) translateY(-12px)',
    'rotate(0deg) translateY(-4px) scale(1.06)',
    'rotate(6deg) translateY(-12px)',
  ];
  const zIndexes = [1, 3, 1];

  return (
    <div
      className="float-a"
      style={{
        width: 130, height: 250,
        borderRadius: 22,
        background: bg,
        border: '1.5px solid rgba(255,255,255,0.12)',
        boxShadow: `0 28px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset`,
        position: 'relative', overflow: 'hidden',
        flexShrink: 0,
        transform: transforms[idx],
        zIndex: zIndexes[idx],
        animationDelay: `${idx * 0.5}s`,
      }}
    >
      {/* notch */}
      <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 36, height: 5, background: 'rgba(0,0,0,0.6)', borderRadius: 3, zIndex: 4 }} />

      {/* screen content */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="App screen"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 22 }}
        />
      ) : (
        <div style={{ padding: '28px 12px 12px' }}>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.12)', marginBottom: 6 }} />
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)', width: '65%', marginBottom: 14 }} />

          {content === 'home' || content === 'menu' ? (
            <>
              <div style={{ height: 70, borderRadius: 8, background: `${accent}30`, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${accent}50`, border: `1px solid ${accent}80` }} />
              </div>
              <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.1)', marginBottom: 4 }} />
              <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)', width: '80%', marginBottom: 14 }} />
              <div style={{ display: 'flex', gap: 6 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ flex: 1, height: 40, borderRadius: 6, background: `${accent}20`, border: `1px solid ${accent}30` }} />
                ))}
              </div>
            </>
          ) : content === 'seat' || content === 'product' ? (
            <>
              <div style={{ height: 90, borderRadius: 6, background: `${accent}20`, border: `1px solid ${accent}30`, marginBottom: 8, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${accent}40` }} />
              </div>
              <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.1)', marginBottom: 4 }} />
              <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', width: '70%', marginBottom: 12 }} />
              <div style={{ height: 28, borderRadius: 5, background: accent, opacity: 0.7 }} />
            </>
          ) : (
            <>
              <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', marginBottom: 8 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ height: 30, borderRadius: 5, background: `${accent}${i < 2 ? '25' : '15'}` }} />
                ))}
              </div>
              <div style={{ height: 28, borderRadius: 5, background: accent, opacity: 0.75, marginTop: 16 }} />
            </>
          )}
        </div>
      )}

      {/* bottom bar */}
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 36, height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────── */
interface Props { id: CaseStudyId | null; onClose: () => void; }

export default function CaseStudy({ id, onClose }: Props) {
  if (!id) return null;
  const d = DATA[id];

  return (
    <div className={`cs-overlay${id ? ' open' : ''}`}>
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: 20, right: 48, zIndex: 502,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--dark-brown)',
          border: '1px solid var(--tan)', padding: '8px 16px',
          borderRadius: 2, background: 'rgba(250,247,242,0.92)',
          backdropFilter: 'blur(8px)', cursor: 'none',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { (e.target as HTMLElement).style.background = 'var(--dark-brown)'; (e.target as HTMLElement).style.color = 'var(--paper)'; }}
        onMouseLeave={e => { (e.target as HTMLElement).style.background = 'rgba(250,247,242,0.92)'; (e.target as HTMLElement).style.color = 'var(--dark-brown)'; }}
      >
        Close ×
      </button>

      {/* ── HERO ── */}
      <div
        style={{
          minHeight: '100vh',
          background: '#0E0C0A',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '80px 48px',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* ambient glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${d.accentColor}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

        {/* meta tags */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[d.year, d.role, d.platform, d.duration].map(m => (
            <span key={m} style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.45)', border: '1px solid rgba(255,255,255,0.08)', padding: '5px 12px', borderRadius: 2 }}>{m}</span>
          ))}
        </div>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px,7vw,80px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1, textAlign: 'center', marginBottom: 16, letterSpacing: '-0.01em' }}>
          {d.title}
        </h1>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: d.accentColor, textAlign: 'center', marginBottom: 64, opacity: 0.85 }}>
          {d.tagline}
        </p>

        {/* Phone cluster */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, position: 'relative', zIndex: 2 }}>
          {d.screens.map((s, i) => (
            <PhoneMock key={i} bg={s.bg} accent={d.accentColor} idx={i} content={s.content} imageSrc={s.imageSrc} />
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--paper)' }}>

        {/* ── METRICS ── */}
        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            borderBottom: '1px solid rgba(139,115,85,0.15)',
          }}
        >
          {d.metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                padding: '40px 32px',
                borderRight: i < 3 ? '1px solid rgba(139,115,85,0.12)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--serif)', fontSize: 52, fontWeight: 300, color: d.accentColor, lineHeight: 1 }}>
                {m.value}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginTop: 8 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── COLOUR PALETTE ── */}
        <div style={{ padding: '64px 80px', borderBottom: '1px solid rgba(139,115,85,0.12)', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 28 }}>
            Colour Palette
          </div>
          <div style={{ display: 'flex', gap: 0, height: 80, borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 32px rgba(74,55,40,0.15)' }}>
            {d.palette.map((c, i) => (
              <div
                key={c}
                style={{ flex: 1, background: c, position: 'relative', transition: 'flex 0.4s ease', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.flex = '2'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.flex = '1'; }}
              >
                <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.08em', color: i === 2 ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap', textAlign: 'center' }}>
                  {d.paletteNames[i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROBLEM → INSIGHT → RESULT ── */}
        <div
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            maxWidth: 1000, margin: '0 auto',
            padding: '0 80px 64px',
            gap: 2,
          }}
        >
          {[
            { label: 'Problem', text: d.problem, icon: '⚡', color: '#9A4A4A' },
            { label: 'Insight', text: d.insight, icon: '◎', color: d.accentColor },
            { label: 'Result', text: d.result, icon: '✓', color: '#5C7A5C' },
          ].map(c => (
            <div
              key={c.label}
              style={{
                padding: 32,
                background: 'rgba(250,247,242,0.7)',
                border: '1px solid rgba(139,115,85,0.12)',
                borderTop: `3px solid ${c.color}`,
                borderRadius: 2,
              }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.color, marginBottom: 16 }}>
                {c.icon} {c.label}
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--dark-brown)', lineHeight: 1.75 }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── PROCESS ── */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 80px 80px' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 28 }}>
            Process
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {d.process.map((p, i) => (
              <div
                key={p.step}
                style={{
                  padding: '28px 24px',
                  background: '#fff',
                  border: '1px solid rgba(139,115,85,0.14)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(74,55,40,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{ fontFamily: 'var(--serif)', fontSize: 64, fontWeight: 300, color: d.accentColor, opacity: 0.12, position: 'absolute', top: -10, right: 8, lineHeight: 1 }}>
                  {p.step}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: d.accentColor, marginBottom: 10 }}>
                  {p.step}
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--dark-brown)', marginBottom: 10 }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--warm-gray)', lineHeight: 1.8 }}>
                  {p.detail}
                </div>
                {/* connector */}
                {i < 3 && (
                  <div style={{ position: 'absolute', right: -9, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, borderRadius: '50%', background: 'var(--tan)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, fontSize: 9, color: 'var(--brown)' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
