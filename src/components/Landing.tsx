import { useEffect, useRef } from 'react';
import Particles from './Particles';

type Section = 'landing' | 'intro' | 'uiux' | 'webdev' | 'anim3d' | 'papers';

const FOLDERS: { id: Section; label: string; short: string; color: string; cls: string }[] = [
  { id: 'intro',  label: 'Introduction', short: 'Intro',   color: '#5C7A5C', cls: 'f1' },
  { id: 'uiux',   label: 'UI / UX',      short: 'UI/UX',   color: '#C9A84C', cls: 'f2' },
  { id: 'webdev', label: 'Web Dev',       short: 'Web Dev', color: '#4A6B8A', cls: 'f3' },
  { id: 'anim3d', label: '3D Animation',  short: '3D',      color: '#9A4A4A', cls: 'f4' },
  { id: 'papers', label: 'Papers',        short: 'Papers',  color: '#C47A8A', cls: 'f5' },
];

const FOLDER_POS = [
  { left: 30,  top: 50 },
  { left: 100, top: 18 },
  { left: 170, top: 6  },
  { left: 240, top: 18 },
  { left: 310, top: 50 },
];

interface Props { navigate: (s: Section) => void; }

export default function Landing({ navigate }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      scene.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const title1 = "Sally's";
  const title2 = 'Archive Box';

  return (
    <section
      className="section-panel graph-bg relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: 80 }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,115,85,0.055) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
      />

      {/* Doodles */}
      <svg className="doodle" style={{ top: 90, right: 72, width: 140, height: 140, opacity: 0.1 }} viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="58" stroke="rgba(139,115,85,0.9)" strokeWidth="1" fill="none" strokeDasharray="5 8" className="path-draw" />
        <path d="M28,70 Q70,22 112,70 Q70,118 28,70" stroke="rgba(139,115,85,0.65)" strokeWidth="1" fill="none" className="path-draw" />
      </svg>
      <svg className="doodle" style={{ bottom: 130, left: 72, width: 96, height: 96, opacity: 0.08 }} viewBox="0 0 96 96">
        <rect x="8" y="8" width="80" height="80" rx="4" stroke="rgba(139,115,85,0.9)" strokeWidth="1" fill="none" strokeDasharray="4 6" className="path-draw" />
        <line x1="8" y1="48" x2="88" y2="48" stroke="rgba(139,115,85,0.5)" strokeWidth="1" className="path-draw" />
        <line x1="48" y1="8" x2="48" y2="88" stroke="rgba(139,115,85,0.5)" strokeWidth="1" className="path-draw" />
      </svg>

      {/* Landing text */}
      <div className="text-center relative z-10 mb-14">
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 16 }}>
          Creative Portfolio — Archive No. 001
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(56px,8vw,100px)', fontWeight: 300, lineHeight: 0.96, color: 'var(--dark-brown)', letterSpacing: '-0.02em' }}>
          {title1.split('').map((c, i) => (
            <span key={i} className="landing-char" style={{ animationDelay: `${i * 0.06}s` }}>
              {c === ' ' ? '\u00a0' : c}
            </span>
          ))}
          <br />
          <em style={{ color: 'var(--brown)', fontStyle: 'italic' }}>
            {title2.split('').map((c, i) => (
              <span key={i} className="landing-char" style={{ animationDelay: `${(title1.length + i) * 0.055 + 0.12}s` }}>
                {c === ' ' ? '\u00a0' : c}
              </span>
            ))}
          </em>
        </h1>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--warm-gray)', letterSpacing: '0.07em', fontWeight: 300, marginTop: 14 }}>
          Hover the box to explore
        </p>
      </div>

      {/* Box + Folders — single box-scene wrapper so CSS hover selector works */}
      <div
        ref={sceneRef}
        className="box-scene relative"
        style={{ width: 430, height: 350 }}
      >
        {/* Trajectory arc */}
        <svg
          className="absolute pointer-events-none"
          style={{ top: 55, left: '50%', transform: 'translateX(-50%)', width: 380, height: 80 }}
          viewBox="0 0 380 80" fill="none"
        >
          <path
            className="traj-path"
            d="M 40 74 Q 95 14 190 6 Q 285 14 340 74"
            stroke="rgba(139,115,85,0.32)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Folders */}
        {FOLDERS.map((f, i) => (
          <button
            key={f.id}
            className={`folder-item ${f.cls}`}
            onClick={() => navigate(f.id)}
            style={{
              position: 'absolute',
              left: FOLDER_POS[i].left,
              top: FOLDER_POS[i].top,
              width: 78, height: 94,
              background: f.color,
              borderRadius: '2px 8px 2px 2px',
              border: '1px solid rgba(0,0,0,0.09)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'flex-end',
              paddingBottom: 10,
              cursor: 'none',
            }}
            data-hover
          >
            <div className="folder-tip">{f.label}</div>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', lineHeight: 1.3, textAlign: 'center' }}>
              {f.short}
            </span>
          </button>
        ))}

        {/* Archive Box */}
        <div
          className="absolute"
          style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 250, height: 200 }}
        >
          {/* Lid */}
          <div
            className="box-lid absolute"
            style={{ top: 0, left: -8, right: -8, height: 46, background: 'linear-gradient(145deg,#C8B896,#B8A07E)', borderRadius: '4px 4px 0 0', border: '1px solid rgba(139,115,85,0.38)', boxShadow: '0 -4px 22px rgba(74,55,40,0.13)' }}
          >
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 4, background: 'rgba(74,55,40,0.2)', borderRadius: 2 }} />
          </div>

          {/* Body */}
          <div
            className="box-body-wrap absolute"
            style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%' }}
          >
            <div
              style={{
                height: 162,
                background: 'linear-gradient(145deg,#D4C5A9,#C0AA88)',
                borderRadius: '4px 4px 8px 8px',
                border: '1px solid rgba(139,115,85,0.38)',
                boxShadow: '0 22px 64px rgba(74,55,40,0.24), inset 0 1px 0 rgba(255,255,255,0.28)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', inset: 12, border: '1px dashed rgba(139,115,85,0.22)', borderRadius: 2 }} />
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.32em', color: 'rgba(74,55,40,0.3)' }}>
                ARCHIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      <p
        className="absolute bottom-10 text-center"
        style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.22em', color: 'var(--warm-gray)', animation: 'blink 2s ease-in-out infinite' }}
      >
        hover to open — click folder to enter
      </p>

      <Particles />
    </section>
  );
}
