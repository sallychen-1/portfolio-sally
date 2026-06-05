import { useEffect, useState } from 'react';
import { SectionHeader } from './shared';

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'Concept',
    desc: 'Storyboard & reference gathering',
    icon: '◻',
    color: 'rgba(180,80,80,0.7)',
    bg: 'linear-gradient(135deg,#1a0808,#300a0a)',
    preview: 'concept',
  },
  {
    step: '02',
    title: 'Modelling',
    desc: 'Polygon mesh & topology',
    icon: '⬡',
    color: 'rgba(74,120,180,0.7)',
    bg: 'linear-gradient(135deg,#080f1a,#0a1a30)',
    preview: 'model',
  },
  {
    step: '03',
    title: 'Shading',
    desc: 'Materials, textures & PBR maps',
    icon: '◑',
    color: 'rgba(160,100,40,0.7)',
    bg: 'linear-gradient(135deg,#1a0f00,#2a1a00)',
    preview: 'shade',
  },
  {
    step: '04',
    title: 'Lighting',
    desc: 'HDRI + area lights + GI',
    icon: '✦',
    color: 'rgba(200,180,60,0.7)',
    bg: 'linear-gradient(135deg,#1a1800,#2c2600)',
    preview: 'light',
  },
  {
    step: '05',
    title: 'Animation',
    desc: 'Rigging, keyframes & physics sim',
    icon: '▷',
    color: 'rgba(80,160,80,0.7)',
    bg: 'linear-gradient(135deg,#081408,#0a2010)',
    preview: 'anim',
  },
  {
    step: '06',
    title: 'Render',
    desc: 'Cycles renderer · 4K · 24fps',
    icon: '■',
    color: 'rgba(180,80,220,0.7)',
    bg: 'linear-gradient(135deg,#100820,#1a0a30)',
    preview: 'render',
  },
];

const SPECS = [
  { label: 'Software', value: 'Blender 4.1' },
  { label: 'Renderer', value: 'Cycles X' },
  { label: 'Resolution', value: '3840 × 2160' },
  { label: 'Frame Rate', value: '24 fps' },
  { label: 'Duration', value: '01:42' },
  { label: 'Render Time', value: '~4h / frame' },
  { label: 'Polygons', value: '2.4M' },
  { label: 'Samples', value: '4096' },
];

/* mini render-pass preview */
function PassPreview({ type, color }: { type: string; color: string }) {
  const fills: Record<string, string> = {
    concept: 'rgba(255,255,255,0.04)',
    model: 'rgba(255,255,255,0.06)',
    shade: color,
    light: 'rgba(255,255,200,0.06)',
    anim: color,
    render: color,
  };

  return (
    <div
      style={{
        width: '100%', height: '100%',
        background: fills[type] || 'rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* wireframe-ish strokes */}
      <svg viewBox="0 0 80 60" style={{ width: 60, height: 44, opacity: type === 'model' ? 0.6 : 0.2 }}>
        <polygon points="40,4 72,56 8,56" fill="none" stroke={color} strokeWidth="1.5" />
        <line x1="40" y1="4" x2="40" y2="56" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="56" x2="72" y2="56" stroke={color} strokeWidth="0.5" opacity="0.5" />
        {type === 'model' && (
          <>
            <polygon points="40,12 66,50 14,50" fill="none" stroke={color} strokeWidth="0.7" opacity="0.4" />
            <line x1="40" y1="12" x2="8" y2="56" stroke={color} strokeWidth="0.4" opacity="0.3" />
            <line x1="40" y1="12" x2="72" y2="56" stroke={color} strokeWidth="0.4" opacity="0.3" />
          </>
        )}
      </svg>
      {(type === 'shade' || type === 'render') && (
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 35% 35%, ${color}, transparent 65%)`, opacity: 0.35 }} />
      )}
      {type === 'light' && (
        <div style={{ position: 'absolute', top: 10, left: 14, width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,200,0.5)', filter: 'blur(8px)' }} />
      )}
    </div>
  );
}

export default function AnimSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('#anim3d .reveal');
    els.forEach(el => el.classList.add('visible'));

    // auto-cycle stages
    const id = setInterval(() => setActiveStage(p => (p + 1) % PROCESS_STAGES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const mono: React.CSSProperties = { fontFamily: 'var(--mono)' };

  return (
    <section
      id="anim3d"
      style={{ minHeight: '100vh', background: '#060606', color: 'var(--cream)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% -10%, rgba(154,74,74,0.08) 0%, transparent 55%)', zIndex: 0 }} />
      {/* Scanlines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '120px 0 80px' }}>
        <SectionHeader tag="File No. 004" title="Digital" italic="Cinema" dark />

        {/* ── MAIN VIDEO PLAYER ── */}
        <div className="reveal" style={{ maxWidth: 960, margin: '0 auto 80px', padding: '0 48px' }}>

          {/* Film credits header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              {[{ dot: '#FF5F57', label: 'LIVE' }, { dot: '#FFBD2E', label: 'HD' }, { dot: '#28CA41', label: '4K' }].map(b => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.dot, animation: b.label === 'LIVE' ? 'orbPulse 2s ease-in-out infinite' : 'none' }} />
                  <span style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', color: 'rgba(212,197,169,0.38)' }}>{b.label}</span>
                </div>
              ))}
            </div>
            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', color: 'rgba(212,197,169,0.3)' }}>
              NOW SHOWING — The Light We Lost · 2024
            </div>
          </div>

          {/* Player */}
          <div
            style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg,#1a0a20,#3a1040,#6a2060,#1a0a20)',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(106,32,96,0.2)',
              position: 'relative', overflow: 'hidden', cursor: 'none',
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {/* Ambient orb */}
            <div style={{ position: 'absolute', top: '30%', left: '40%', width: 220, height: 220, borderRadius: '50%', background: 'rgba(180,80,220,0.12)', filter: 'blur(40px)', animation: 'orbGlow 4s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', top: '50%', left: '55%', width: 140, height: 140, borderRadius: '50%', background: 'rgba(80,100,220,0.1)', filter: 'blur(30px)', animation: 'orbGlow 5s ease-in-out infinite 1s' }} />

            {/* Geometry decorations */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 1600 900">
              <polygon points="800,80 1200,700 400,700" fill="none" stroke="rgba(180,80,220,0.8)" strokeWidth="1" />
              <polygon points="800,140 1140,660 460,660" fill="none" stroke="rgba(180,80,220,0.4)" strokeWidth="0.5" />
              <circle cx="800" cy="450" r="220" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="8 14" />
              <circle cx="800" cy="450" r="150" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="450" x2="1600" y2="450" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <line x1="800" y1="0" x2="800" y2="900" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </svg>

            {/* Center orb */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 90, height: 90, borderRadius: '50%', background: 'rgba(180,80,220,0.18)', border: '1px solid rgba(180,80,220,0.5)', animation: 'orbPulse 3s ease-in-out infinite', boxShadow: '0 0 60px rgba(180,80,220,0.2)' }} />

            {/* Play overlay */}
            <div
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isPlaying ? 'transparent' : 'rgba(0,0,0,0.35)',
                transition: 'background 0.4s',
              }}
            >
              {!isPlaying && (
                <div style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', transition: 'transform 0.2s, background 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(180,80,220,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.4)'; }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M7 4l12 7-12 7V4z" fill="rgba(255,255,255,0.9)" />
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom info bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px 18px', background: 'linear-gradient(transparent,rgba(0,0,0,0.75))' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'rgba(255,255,255,0.92)', marginBottom: 3 }}>The Light We Lost</div>
                  <div style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.38)' }}>BLENDER 4.1 · CYCLES X · 2024 · 01:42</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['CC', '4K', 'STEREO'].map(t => (
                    <span key={t} style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', padding: '3px 7px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 2, color: 'rgba(255,255,255,0.45)' }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* fake progress bar */}
              <div style={{ marginTop: 10, height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: isPlaying ? '60%' : '0%', background: 'rgba(180,80,220,0.8)', borderRadius: 1, transition: 'width 60s linear' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── SPECS + RENDER PASSES GRID ── */}
        <div style={{ maxWidth: 960, margin: '0 auto 64px', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24 }}>

          {/* Technical specs */}
          <div className="reveal">
            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.38)', marginBottom: 18 }}>Technical Specs</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden' }}>
              {SPECS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 20px',
                    borderBottom: i < SPECS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <span style={{ ...mono, fontSize: 10, color: 'rgba(212,197,169,0.4)', letterSpacing: '0.08em' }}>{s.label}</span>
                  <span style={{ ...mono, fontSize: 11, color: 'rgba(212,197,169,0.75)', letterSpacing: '0.06em' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Render passes */}
          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.38)', marginBottom: 18 }}>Render Passes</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {[
                { label: 'Beauty',    bg: 'linear-gradient(135deg,#1a0a20,#6a2060)', color: 'rgba(180,80,220,0.6)' },
                { label: 'Diffuse',   bg: 'linear-gradient(135deg,#0a0a1a,#2020a0)', color: 'rgba(80,80,200,0.6)' },
                { label: 'Specular',  bg: 'linear-gradient(135deg,#1a1a0a,#c0c000)', color: 'rgba(200,200,40,0.6)' },
                { label: 'Shadow',    bg: 'linear-gradient(135deg,#080808,#181818)', color: 'rgba(80,80,80,0.6)' },
                { label: 'Emission',  bg: 'linear-gradient(135deg,#1a0820,#8000a0)', color: 'rgba(150,0,200,0.6)' },
                { label: 'Depth',     bg: 'linear-gradient(135deg,#0a1008,#204020)', color: 'rgba(40,100,40,0.6)' },
              ].map(p => (
                <div
                  key={p.label}
                  style={{ aspectRatio: '16/10', background: p.bg, borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', cursor: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${p.color}`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 40% 40%, ${p.color}, transparent 70%)`, opacity: 0.5 }} />
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }} viewBox="0 0 80 50">
                    <polygon points="40,5 70,45 10,45" fill="none" stroke="white" strokeWidth="1" />
                  </svg>
                  <div style={{ position: 'absolute', bottom: 5, left: 0, right: 0, textAlign: 'center', ...mono, fontSize: 8, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)' }}>
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PRODUCTION PROCESS ── */}
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 48px 40px' }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.38)', marginBottom: 24 }}>Production Pipeline</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
            {PROCESS_STAGES.map((s, i) => (
              <div
                key={s.step}
                className="reveal"
                style={{
                  animationDelay: `${i * 0.07}s`,
                  background: activeStage === i ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeStage === i ? s.color : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 6,
                  overflow: 'hidden',
                  cursor: 'none',
                  transition: 'border-color 0.3s, background 0.3s, transform 0.25s',
                  transform: activeStage === i ? 'translateY(-4px)' : 'none',
                  boxShadow: activeStage === i ? `0 12px 40px ${s.color.replace('0.7', '0.25')}` : 'none',
                }}
                onMouseEnter={() => setActiveStage(i)}
              >
                {/* mini render preview */}
                <div style={{ height: 60, background: s.bg, position: 'relative', overflow: 'hidden' }}>
                  <PassPreview type={s.preview} color={s.color} />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ ...mono, fontSize: 8, color: s.color, letterSpacing: '0.1em', marginBottom: 4 }}>{s.step}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'rgba(212,197,169,0.85)', marginBottom: 3 }}>{s.title}</div>
                  <div style={{ ...mono, fontSize: 8, color: 'rgba(212,197,169,0.35)', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
