import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from './shared';

const FEATURES = [
  { icon: '⬡', title: 'Parallax Scroll', desc: 'Depth-layered sections driven by IntersectionObserver and CSS transforms' },
  { icon: '◐', title: 'Dark / Light Mode', desc: 'Instant theme toggle with prefers-color-scheme detection and localStorage persistence' },
  { icon: '▣', title: 'Responsive Grid', desc: 'Fluid CSS Grid layout collapsing gracefully from 1440px to 320px' },
  { icon: '⏱', title: '99 Lighthouse', desc: 'Performance-first: deferred fonts, lazy images, code splitting, < 1.2s LCP' },
  { icon: '✦', title: 'GSAP Animations', desc: 'Scroll-triggered reveal, magnetic buttons, and page transition sequences' },
  { icon: '⌂', title: 'No Framework', desc: 'Pure HTML/CSS/JS — zero dependencies, maximum control, 48kb total bundle' },
];

const CODE_LINES = [
  { indent: 0, color: '#7EB8D4', text: 'const' , rest: ' initParallax = () => {' },
  { indent: 1, color: '#C9A84C', text: 'const' , rest: ' layers = document.querySelectorAll' },
  { indent: 2, color: '#7AC47A', text: '(' , rest: '\'[data-depth]\'' },
  { indent: 1, color: 'rgba(212,197,169,0.55)', text: '' , rest: ')' },
  { indent: 1, color: 'rgba(212,197,169,0.55)', text: 'window' , rest: '.addEventListener(' },
  { indent: 2, color: '#C9A84C', text: '\'scroll\'' , rest: ', () => {' },
  { indent: 2, color: 'rgba(212,197,169,0.55)', text: 'layers' , rest: '.forEach(el => {' },
  { indent: 3, color: '#7EB8D4', text: 'const' , rest: ' depth = el.dataset.depth' },
  { indent: 3, color: '#7AC47A', text: 'el' , rest: '.style.transform =' },
  { indent: 4, color: '#C9A84C', text: '`translateY' , rest: '(${scrollY * depth}px)`' },
  { indent: 2, color: 'rgba(212,197,169,0.55)', text: '})' , rest: '' },
  { indent: 1, color: 'rgba(212,197,169,0.55)', text: '})' , rest: '' },
  { indent: 0, color: '#7EB8D4', text: '}' , rest: '' },
];

const TECH = [
  { name: 'HTML5', level: 95 },
  { name: 'CSS3 / SCSS', level: 92 },
  { name: 'Vanilla JS', level: 88 },
  { name: 'GSAP', level: 80 },
];

export default function WebDevSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [typed, setTyped] = useState(0);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = document.querySelectorAll('#webdev .reveal');
    els.forEach(el => el.classList.add('visible'));

    // Animate code lines in
    let t = setTimeout(() => setTyped(CODE_LINES.length), 600);

    // Animate skill bars
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          barRefs.current.forEach((bar, i) => {
            if (bar) {
              setTimeout(() => {
                bar.style.width = TECH[i].level + '%';
              }, i * 120);
            }
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const skillsEl = document.getElementById('skills-section');
    if (skillsEl) obs.observe(skillsEl);

    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);

  // Feature cycle
  useEffect(() => {
    const id = setInterval(() => setActiveFeature(p => (p + 1) % FEATURES.length), 3200);
    return () => clearInterval(id);
  }, []);

  const mono: React.CSSProperties = { fontFamily: 'var(--mono)' };
  const muted = 'rgba(212,197,169,0.5)';

  return (
    <section
      id="webdev"
      className="section-panel webdev-bg"
      style={{ minHeight: '100vh', color: 'var(--cream)', position: 'relative' }}
    >
      {/* Ambient */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 20% 50%, rgba(74,107,138,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(92,122,92,0.08) 0%, transparent 60%)' }} />

      {/* ── HERO — Project spotlight ── */}
      <div style={{ padding: '120px 0 0', position: 'relative', zIndex: 1 }}>
        <SectionHeader tag="File No. 003" title="Developer's" italic="Workbench" dark />

        {/* Project label */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(212,197,169,0.45)', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28CA41', display: 'inline-block', animation: 'orbPulse 2s ease-in-out infinite' }} />
            Single Project — Personal Portfolio Website
          </div>
        </div>
      </div>

      {/* ── BROWSER MOCKUP (hero) ── */}
      <div className="reveal" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 0', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
          }}
        >
          {/* Chrome bar */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28CA41' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 4, padding: '5px 14px', ...mono, fontSize: 11, color: 'rgba(212,197,169,0.38)', marginLeft: 8 }}>
              https://sallychen.co
            </div>
            <div style={{ ...mono, fontSize: 10, color: '#28CA41', letterSpacing: '0.05em' }}>✓ Live</div>
          </div>

          {/* Website preview */}
          <div
            style={{
              height: 420,
              background: 'linear-gradient(180deg, #FAF7F2 0%, #F0EAE0 100%)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Graph paper grid */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,115,85,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,115,85,0.06) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Nav bar inside preview */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, background: 'rgba(250,247,242,0.88)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(139,115,85,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: '#4A3728' }}>Sally's <em style={{ fontStyle: 'italic', color: '#8B7355' }}>Archive</em></div>
              <div style={{ display: 'flex', gap: 20 }}>
                {['Introduction', 'UI/UX', 'Web Dev', '3D', 'Papers'].map(l => (
                  <div key={l} style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E9589' }}>{l}</div>
                ))}
              </div>
            </div>

            {/* Hero text in preview */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, marginTop: 20 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 64, fontWeight: 300, color: '#4A3728', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                Sally's<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>Archive Box</em>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#9E9589', marginTop: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Hover the box to explore</div>
            </div>

            {/* Decorative archive box in preview */}
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', width: 90, height: 68 }}>
              <div style={{ position: 'absolute', top: 0, left: -3, right: -3, height: 18, background: 'linear-gradient(145deg,#C8B896,#B8A07E)', borderRadius: '3px 3px 0 0', border: '1px solid rgba(139,115,85,0.4)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 54, background: 'linear-gradient(145deg,#D4C5A9,#C0AA88)', borderRadius: '2px 2px 6px 6px', border: '1px solid rgba(139,115,85,0.4)' }} />
            </div>

            {/* Feature badge that cycles */}
            <div
              key={activeFeature}
              style={{
                position: 'absolute', bottom: 20, right: 24,
                background: 'rgba(74,55,40,0.9)',
                border: '1px solid rgba(139,115,85,0.3)',
                borderRadius: 6, padding: '10px 14px',
                animation: 'pageEnter 0.4s ease both',
              }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(212,197,169,0.5)', letterSpacing: '0.1em', marginBottom: 4 }}>FEATURE</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: '#D4C5A9', fontWeight: 500 }}>{FEATURES[activeFeature].title}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT GRID ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, position: 'relative', zIndex: 1 }}>

        {/* LEFT — Code window */}
        <div className="reveal" style={{ animationDelay: '0.1s' }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.38)', marginBottom: 14 }}>Code Preview</div>
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8, overflow: 'hidden',
            }}
          >
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 14px', display: 'flex', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }} />
              <span style={{ ...mono, fontSize: 10, color: muted, marginLeft: 8 }}>parallax.js</span>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {CODE_LINES.slice(0, typed).map((line, i) => (
                <div
                  key={i}
                  style={{ ...mono, fontSize: 12.5, lineHeight: 1.9, paddingLeft: line.indent * 14, animation: 'pageEnter 0.3s ease both', animationDelay: `${i * 0.04}s` }}
                >
                  <span style={{ color: line.color, userSelect: 'none' }}>{line.text}</span>
                  <span style={{ color: 'rgba(212,197,169,0.42)' }}>{line.rest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Tech stack + skills */}
        <div className="reveal" style={{ animationDelay: '0.15s' }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.38)', marginBottom: 14 }}>Tech Stack</div>

          <div id="skills-section" style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
            {TECH.map((t, i) => (
              <div key={t.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ ...mono, fontSize: 11, color: 'rgba(212,197,169,0.7)', letterSpacing: '0.06em' }}>{t.name}</span>
                  <span style={{ ...mono, fontSize: 10, color: 'rgba(212,197,169,0.38)' }}>{t.level}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div
                    ref={el => barRefs.current[i] = el}
                    style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg, rgba(212,197,169,0.5), rgba(212,197,169,0.85))', borderRadius: 2, transition: 'width 1s cubic-bezier(0.34,1.2,0.64,1)' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[{ n: '99', l: 'Lighthouse' }, { n: '< 1.2s', l: 'LCP' }, { n: '48kb', l: 'Bundle' }].map(s => (
              <div key={s.l} style={{ padding: '16px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, textAlign: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
              >
                <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--cream)', fontWeight: 300 }}>{s.n}</div>
                <div style={{ ...mono, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.38)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FULL WIDTH — Feature grid */}
        <div className="reveal" style={{ gridColumn: 'span 2', animationDelay: '0.2s' }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,197,169,0.38)', marginBottom: 20 }}>Key Features</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                style={{
                  padding: '20px 20px',
                  background: activeFeature === i ? 'rgba(212,197,169,0.07)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeFeature === i ? 'rgba(212,197,169,0.22)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 6,
                  cursor: 'none',
                  transition: 'background 0.3s, border-color 0.3s, transform 0.25s',
                  transform: activeFeature === i ? 'translateY(-3px)' : 'none',
                }}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div style={{ fontSize: 20, marginBottom: 10, opacity: 0.7 }}>{f.icon}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--cream)', marginBottom: 6 }}>{f.title}</div>
                <div style={{ ...mono, fontSize: 10, color: 'rgba(212,197,169,0.45)', lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
