import { useEffect } from 'react';
import sallyImg from '../assets/Sally.png';
import { SectionHeader, useReveal } from './shared';

const skills = {
  DESIGN: ['Figma', 'Adobe XD', 'Illustrator', 'After Effects', 'Blender', 'Unity'],
  DEVELOPMENT: ['HTML / CSS', 'JavaScript', 'React', 'VS Code', 'Three.js', 'WebGL'],
};

const education = [
  { years: '2023 – Present', name: 'B.S. Information Communication', sub: 'Yuan Ze University' },
  { years: '2024', name: 'AI Competition', sub: 'Prof. Fang Research Lab' },
  { years: '2024', name: 'Teaching Assistant', sub: 'Yuan Ze University' },
];

const experience = [
  { years: '2024 – Present', name: 'Research Assistant', sub: "Prof. Fang's AI Research Lab — Deep Learning", color: 'var(--folder-blue)' },
  { years: '2024', name: 'Teaching Assistant', sub: 'Yuan Ze University — Taipei', color: 'var(--folder-yellow)' },
  { years: '2024', name: 'AI Competition', sub: 'Machine Learning & Data Science', color: 'var(--folder-green)' },
];

const languages = [
  { name: 'Vietnamese', level: 'Native', color: 'var(--folder-green)' },
  { name: 'Chinese', level: 'B2 TOCFL', color: 'var(--folder-blue)' },
  { name: 'English', level: '710 TOEIC', color: 'var(--folder-pink)' },
];

const contact = [
  { text: 'tranngockhanh28112005@gmail.com', color: 'var(--folder-green)' },
  { text: 'linkedin.com/in/sallytran', color: 'var(--folder-blue)' },
  { text: 'behance.net/sallytran', color: 'var(--folder-pink)' },
];

export default function IntroSection() {
  useReveal('intro');

  useEffect(() => {
    const els = document.querySelectorAll('#intro .reveal');
    els.forEach(el => el.classList.add('visible'));
  }, []);

  return (
    <section
      id="intro"
      className="section-panel intro-bg"
      style={{ padding: '120px 0 80px', minHeight: '100vh', position: 'relative' }}
    >
      {/* Animated doodles */}
      <svg
        className="doodle"
        style={{ top: 120, right: 64, width: 130, height: 130, opacity: 0.12 }}
        viewBox="0 0 130 130"
      >
        <circle cx="65" cy="65" r="55" stroke="rgba(139,115,85,0.9)" strokeWidth="1"
          fill="none" strokeDasharray="5 7" className="path-draw" />
        <path d="M35,65 Q65,25 95,65 Q65,105 35,65"
          stroke="rgba(139,115,85,0.7)" strokeWidth="1" fill="none" className="path-draw" />
      </svg>

      <svg
        className="doodle"
        style={{ bottom: 100, left: 48, width: 90, height: 90, opacity: 0.08 }}
        viewBox="0 0 90 90"
      >
        <path d="M10,45 Q45,5 80,45 Q45,85 10,45"
          stroke="rgba(139,115,85,0.9)" strokeWidth="1" fill="none" className="path-draw" />
      </svg>

      <SectionHeader tag="File No. 001" title="Personal" italic="Archive File" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          padding: '0 48px',
          maxWidth: 1180,
          margin: '0 auto',
        }}
      >
        {/* PROFILE */}
        <div className="paper-card reveal" style={{ gridColumn: 'span 1', textAlign: 'center' }}>
          <div className="pin-dot" style={{ background: 'var(--folder-red)' }} />
          <div className="profile-img" style={{ padding: 0, overflow: 'hidden', background: 'none' }}>
            <img src={sallyImg} alt="Sally Tran" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 10, textTransform: 'uppercase' }}>Subject</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--dark-brown)', marginBottom: 8 }}>Sally Tran</div>
          <div style={{ fontSize: 12.5, color: 'var(--warm-gray)', lineHeight: 1.8 }}>
            Designer, developer & researcher exploring the intersection of AI, communication, and human experience.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--folder-green)' }} />
            <span style={{ fontSize: 11.5, color: 'var(--warm-gray)' }}>Available for work</span>
          </div>
        </div>

        {/* ABOUT */}
        <div className="paper-card reveal" style={{ gridColumn: 'span 2', animationDelay: '0.1s' }}>
          <div className="stamp">FILE<br />OPEN</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 10, textTransform: 'uppercase' }}>About Me</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--dark-brown)', marginBottom: 12 }}>Who I Am</div>
          <p style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.85 }}>
            I'm a multidisciplinary creator studying Information Communication at Yuan Ze University. With a background spanning UI/UX design, web development, 3D animation, and AI research, I build things that feel considered — products that invite users to linger, explore, and remember.
          </p>
          <p style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.85, marginTop: 12 }}>
            Currently working as a Research Assistant in Prof. Fang's AI Lab and a Teaching Assistant at Yuan Ze. Open to collaboration and creative opportunities.
          </p>
        </div>

        {/* SKILLS */}
        <div className="paper-card reveal" style={{ gridColumn: 'span 3', animationDelay: '0.2s' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 10, textTransform: 'uppercase' }}>Technical Skills</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--dark-brown)', marginBottom: 14 }}>Toolkit</div>
          {Object.entries(skills).map(([category, tags]) => (
            <div key={category} style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--warm-gray)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
                {category}
              </div>
              <div>
                {tags.map(t => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <div className="paper-card reveal" style={{ animationDelay: '0.3s' }}>
          <div className="paperclip" />
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 10, textTransform: 'uppercase' }}>Education</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--dark-brown)', marginBottom: 14 }}>Academic Record</div>
          {education.map(e => (
            <div key={e.name} className="timeline-dot-item">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brown)', marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--warm-gray)', marginBottom: 2 }}>{e.years}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark-brown)' }}>{e.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--warm-gray)' }}>{e.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <div className="paper-card reveal" style={{ animationDelay: '0.4s' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 10, textTransform: 'uppercase' }}>Experience</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--dark-brown)', marginBottom: 14 }}>Work Record</div>
          {experience.map(e => (
            <div key={e.name} className="timeline-dot-item">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: e.color, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--warm-gray)', marginBottom: 2 }}>{e.years}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark-brown)' }}>{e.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--warm-gray)' }}>{e.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* LANGUAGES & CONTACT */}
        <div className="paper-card reveal" style={{ gridColumn: 'span 1', animationDelay: '0.5s' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--warm-gray)', marginBottom: 10, textTransform: 'uppercase' }}>Languages & Contact</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--dark-brown)', marginBottom: 12 }}>Languages</div>
          {languages.map(l => (
            <div key={l.name} className="timeline-dot-item">
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: l.color, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark-brown)' }}>{l.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--warm-gray)' }}>{l.level}</div>
              </div>
            </div>
          ))}
          <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--dark-brown)', margin: '18px 0 12px' }}>Get in Touch</div>
          {contact.map(c => (
            <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'var(--warm-gray)', fontFamily: 'var(--mono)' }}>{c.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
