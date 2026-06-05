import { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import IntroSection from './components/IntroSection';
import UIUXSection from './components/UIUXSection';
import WebDevSection from './components/WebDevSection';
import AnimSection from './components/AnimSection';
import PapersSection from './components/PapersSection';
import CaseStudy from './components/CaseStudy';

type Section = 'landing' | 'intro' | 'uiux' | 'webdev' | 'anim3d' | 'papers';
type CaseStudyId = 'ticket' | 'coffee';

const DARK_SECTIONS: Section[] = ['webdev', 'anim3d'];

export default function App() {
  const [current, setCurrent] = useState<Section>('landing');
  const [animating, setAnimating] = useState(false);
  const [caseStudy, setCaseStudy] = useState<CaseStudyId | null>(null);

  const navigate = (next: Section) => {
    if (next === current || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      window.scrollTo({ top: 0 });
      setAnimating(false);
    }, 320);
  };

  useEffect(() => {
    if (!animating) {
      setTimeout(() => {
        const els = document.querySelectorAll(`#${current} .reveal`);
        els.forEach(el => el.classList.add('visible'));
      }, 100);
    }
  }, [current, animating]);

  const isDark = DARK_SECTIONS.includes(current);

  return (
    <>
      <Cursor darkSection={isDark} />

      <NavBar current={current} navigate={navigate} />

      {/* Back button */}
      {current !== 'landing' && (
        <button
          className={`back-btn visible${isDark ? ' dark' : ''}`}
          onClick={() => navigate('landing')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Archive Box
        </button>
      )}

      {/* Sections */}
      <div
        className={animating ? 'page-exit' : 'page-enter'}
        style={{ opacity: animating ? 0 : 1 }}
      >
        {current === 'landing' && <Landing navigate={navigate} />}
        {current === 'intro'   && <IntroSection />}
        {current === 'uiux'    && <UIUXSection openCase={id => setCaseStudy(id as CaseStudyId)} />}
        {current === 'webdev'  && <WebDevSection />}
        {current === 'anim3d'  && <AnimSection />}
        {current === 'papers'  && <PapersSection />}
      </div>

      {/* Case Study Overlay */}
      <CaseStudy id={caseStudy} onClose={() => setCaseStudy(null)} />
    </>
  );
}
