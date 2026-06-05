import { useEffect } from 'react';
import { SectionHeader, useReveal } from './shared';
import img1 from '../assets/1.png';
import img4 from '../assets/4.png';
import img6 from '../assets/6.png';

type CaseStudyId = 'ticket' | 'coffee';

interface Props { openCase: (id: CaseStudyId) => void; }

const MOCK_COLORS = {
  ticket: { accent: 'var(--folder-yellow)', tape: 'rgba(201,168,76,0.35)', pin: 'var(--folder-yellow)' },
  coffee: { accent: '#A87878', tape: 'rgba(168,120,120,0.32)', pin: '#A87878' },
};

function ProjectCard({
  id, num, title, desc, tags, colors, openCase, images,
}: {
  id: CaseStudyId;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  colors: typeof MOCK_COLORS['ticket'];
  openCase: (id: CaseStudyId) => void;
  images?: string[];
}) {
  return (
    <div className="project-card reveal">
      {/* top accent */}
      <div style={{ height: 5, background: colors.accent }} />

      {/* tape */}
      <div
        className="tape"
        style={{ left: 38, width: 58, background: colors.tape, transform: 'rotate(-1deg)' }}
      />

      {/* paperclip */}
      <div className="paperclip" />

      {/* header */}
      <div style={{ padding: '26px 24px 18px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 8, textTransform: 'uppercase' }}>
          {num}
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--dark-brown)', lineHeight: 1.1, marginBottom: 8 }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--warm-gray)', lineHeight: 1.75 }}>{desc}</div>
      </div>

      {/* mock preview */}
      <div
        style={{
          height: 200,
          borderTop: '1px dashed rgba(139,115,85,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          position: 'relative',
          overflow: 'hidden',
          background: images ? 'rgba(30,20,14,0.97)' : 'rgba(250,247,242,0.5)',
        }}
      >
        {images ? (
          <>
            {[images[0], images[1], images[2]].map((src, i) => (
              <div
                key={i}
                className={i === 0 ? 'float-a' : i === 1 ? 'float-b' : 'float-a'}
                style={{
                  width: 62,
                  height: 132,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                  flexShrink: 0,
                  transform: i === 0 ? 'rotate(-5deg) translateY(-8px)' : i === 1 ? 'rotate(0deg) translateY(-14px) scale(1.08)' : 'rotate(5deg) translateY(-8px)',
                  zIndex: i === 1 ? 3 : 1,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <img src={src} alt={`screen ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </>
        ) : (
          <>
            {/* phone 1 */}
            <div className="mock-phone float-a">
              <div style={{ marginTop: 20 }}>
                <div className="mock-bar" />
                <div className="mock-bar" style={{ width: '60%', opacity: 0.4 }} />
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: colors.accent, opacity: 0.28, margin: '8px auto' }} />
                <div className="mock-bar" style={{ width: '80%' }} />
                <div className="mock-bar" style={{ background: colors.accent, opacity: 0.45, marginTop: 12 }} />
              </div>
            </div>

            {/* phone 2 */}
            <div className="mock-phone float-b" style={{ transform: 'rotate(5deg) translateY(10px)', opacity: 0.65 }}>
              <div style={{ marginTop: 20 }}>
                <div className="mock-bar" />
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--brown)', opacity: 0.2, margin: '10px auto' }} />
                <div className="mock-bar" style={{ opacity: 0.35 }} />
              </div>
            </div>
          </>
        )}

        {/* sticky notes */}
        <div
          className="sticky"
          style={{
            background: id === 'ticket' ? '#FDEEA0' : '#FFD7B5',
            transform: `rotate(${id === 'ticket' ? '3deg' : '-3deg'})`,
            top: 18, right: 18, width: 82,
          }}
        >
          {id === 'ticket' ? 'User flow ↗\n3 taps to buy' : 'Warm palette\n= cozy feel'}
        </div>
        <div
          className="sticky"
          style={{
            background: '#C8E6C9',
            transform: `rotate(${id === 'ticket' ? '-4deg' : '2deg'})`,
            bottom: 18, left: 18, top: 'auto', width: 82,
          }}
        >
          {id === 'ticket' ? 'Research done ✓' : '5 user tests ↑'}
        </div>
      </div>

      {/* tags + button */}
      <div style={{ padding: '14px 24px 6px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map(t => (
          <span
            key={t}
            style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em',
              padding: '4px 8px',
              border: '1px solid rgba(139,115,85,0.24)',
              borderRadius: 2, color: 'var(--warm-gray)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div style={{ padding: '8px 24px 24px' }}>
        <button className="open-btn" onClick={() => openCase(id)}>
          Open Case Study →
        </button>
      </div>
    </div>
  );
}

export default function UIUXSection({ openCase }: Props) {
  useReveal('uiux');
  useEffect(() => {
    const els = document.querySelectorAll('#uiux .reveal');
    els.forEach(el => el.classList.add('visible'));
  }, []);

  return (
    <section
      id="uiux"
      className="section-panel uiux-bg"
      style={{ padding: '120px 48px 80px', minHeight: '100vh', position: 'relative' }}
    >
      {/* doodle */}
      <svg
        className="doodle"
        style={{ top: 160, left: 48, width: 100, height: 100, opacity: 0.1 }}
        viewBox="0 0 100 100"
      >
        <path d="M10,50 Q30,10 50,50 Q70,90 90,50"
          stroke="rgba(139,115,85,0.9)" strokeWidth="1.5" fill="none" className="path-draw" />
        <circle cx="10" cy="50" r="3" fill="rgba(139,115,85,0.5)" />
        <circle cx="50" cy="50" r="3" fill="rgba(139,115,85,0.5)" />
        <circle cx="90" cy="50" r="3" fill="rgba(139,115,85,0.5)" />
      </svg>

      <SectionHeader tag="File No. 002" title="Design" italic="Workspace" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          maxWidth: 1100,
          margin: '40px auto 0',
        }}
      >
        <ProjectCard
          id="ticket"
          num="Project 01 — UI/UX"
          title="Ticket Booking App"
          desc="A seamless event ticketing experience designed for speed and delight. From discovery to checkout in under 60 seconds."
          tags={['Figma', 'User Research', 'Prototyping', 'iOS Design']}
          colors={MOCK_COLORS.ticket}
          openCase={openCase}
        />
        <ProjectCard
          id="coffee"
          num="Project 02 — UI/UX"
          title="Coffee Ordering App"
          desc="A warm, sensory-driven ordering experience that makes every cup feel personal. Designed for the ritual of coffee."
          tags={['Figma', 'Brand Design', 'Usability Test', 'Android']}
          colors={MOCK_COLORS.coffee}
          openCase={openCase}
          images={[img1, img4, img6]}
        />
      </div>
    </section>
  );
}
