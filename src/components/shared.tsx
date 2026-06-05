import { useEffect, useRef } from 'react';

function SectionHeader({ tag, title, italic, dark = false }: {
  tag: string; title: string; italic: string; dark?: boolean;
}) {
  return (
    <div className="text-center pb-14 px-12">
      <div className="section-tag" style={{ color: dark ? 'rgba(212,197,169,0.45)' : undefined }}>
        {tag}
      </div>
      <h2
        className="section-title"
        style={{
          fontSize: 'clamp(38px, 5vw, 62px)',
          color: dark ? 'var(--cream)' : undefined,
        }}
      >
        {title} <em>{italic}</em>
      </h2>
    </div>
  );
}

export { SectionHeader };

/* ── REVEAL HOOK ── */
export function useReveal(sectionId: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = document.querySelectorAll(`#${sectionId} .reveal`);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.07}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sectionId]);
  return ref;
}
