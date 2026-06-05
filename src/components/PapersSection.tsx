import { useEffect } from 'react';
import { SectionHeader, useReveal } from './shared';

const PAPERS = [
  {
    num: 'Paper 01 — 2024',
    title: 'Emotional Affordances in Mobile Interface Design: A User Study',
    abstract: 'This paper investigates the role of microinteractions and haptic feedback in building emotional resonance between users and digital interfaces. Drawing on 120 participant studies, we propose a framework for designing emotionally intelligent mobile applications.',
    keywords: ['HCI', 'Microinteractions', 'Emotion', 'Mobile UX'],
    venue: 'NTUA — 2024',
    accentColor: '#5C7A5C',
  },
  {
    num: 'Paper 02 — 2024',
    title: 'Generative Aesthetics: How AI is Reshaping Visual Communication',
    abstract: 'An exploration of generative AI\'s influence on graphic design practice. This paper analyzes 50 professional designers\' workflows and proposes a new taxonomy of human-AI creative collaboration modes in commercial design contexts.',
    keywords: ['AI', 'Generative Design', 'Visual Comm', 'Creativity'],
    venue: 'IDF — 2024',
    accentColor: '#4A6B8A',
  },
  {
    num: 'Paper 03 — 2023',
    title: 'Wayfinding in Spatial Interfaces: Lessons from Physical Architecture',
    abstract: 'Drawing parallels between physical wayfinding research and digital navigation design, this paper proposes architectural principles as a framework for improving spatial orientation in complex web and AR applications.',
    keywords: ['Navigation', 'Architecture', 'AR/VR', 'Wayfinding'],
    venue: 'NTUA — 2023',
    accentColor: '#C9A84C',
  },
  {
    num: 'Paper 04 — 2023',
    title: 'Motion Language: Standardising Animation in Design Systems',
    abstract: 'A comparative analysis of animation tokens and motion specifications across 12 major design systems. Proposes a universal motion grammar to improve consistency and cross-platform legibility of animated interfaces.',
    keywords: ['Motion Design', 'Design Systems', 'Animation', 'Standards'],
    venue: 'School of Motion — 2023',
    accentColor: '#C47A8A',
  },
];

export default function PapersSection() {
  useReveal('papers');
  useEffect(() => {
    const els = document.querySelectorAll('#papers .reveal');
    els.forEach(el => el.classList.add('visible'));
  }, []);

  return (
    <section
      id="papers"
      className="section-panel papers-bg"
      style={{ padding: '120px 48px 80px', minHeight: '100vh', position: 'relative' }}
    >
      {/* doodle */}
      <svg
        className="doodle"
        style={{ top: 140, right: 56, width: 110, height: 110, opacity: 0.09 }}
        viewBox="0 0 110 110"
      >
        <path d="M10,55 L100,55 M55,10 L55,100"
          stroke="rgba(139,115,85,0.9)" strokeWidth="1" className="path-draw" />
        <circle cx="55" cy="55" r="40"
          stroke="rgba(139,115,85,0.7)" strokeWidth="1" fill="none"
          strokeDasharray="5 7" className="path-draw" />
      </svg>

      <SectionHeader tag="File No. 005" title="Research" italic="Library" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 28,
          maxWidth: 1000,
          margin: '40px auto 0',
        }}
      >
        {PAPERS.map((p, i) => (
          <div
            key={p.num}
            className="paper-entry reveal"
            style={{ borderLeft: `4px solid ${p.accentColor}`, animationDelay: `${i * 0.1}s` }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 10, textTransform: 'uppercase' }}>
              {p.num}
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 21, fontWeight: 400, color: 'var(--dark-brown)', lineHeight: 1.3, marginBottom: 12 }}>
              {p.title}
            </div>
            <p style={{ fontSize: 12, color: 'var(--warm-gray)', lineHeight: 1.85, marginBottom: 16 }}>
              {p.abstract}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {p.keywords.map(k => (
                <span key={k} className="kw-tag">{k}</span>
              ))}
            </div>
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 14,
                borderTop: '1px dashed rgba(139,115,85,0.2)',
              }}
            >
              <button
                style={{
                  fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--dark-brown)',
                  border: '1px solid var(--tan)', padding: '5px 12px',
                  borderRadius: 2, cursor: 'none', background: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLButtonElement).style.background = 'var(--dark-brown)';
                  (e.target as HTMLButtonElement).style.color = 'var(--paper)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLButtonElement).style.background = 'none';
                  (e.target as HTMLButtonElement).style.color = 'var(--dark-brown)';
                }}
              >
                PDF Access
              </button>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--warm-gray)' }}>{p.venue}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
