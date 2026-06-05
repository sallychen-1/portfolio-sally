import { useEffect } from 'react';

export default function Particles() {
  useEffect(() => {
    const container = document.getElementById('particle-container');
    if (!container) return;

    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}vw;
        background: rgba(139,115,85,${Math.random() * 0.12 + 0.04});
        animation-duration:${Math.random() * 22 + 14}s;
        animation-delay:${Math.random() * 22}s;
      `;
      container.appendChild(p);
    }
    return () => { if (container) container.innerHTML = ''; };
  }, []);

  return <div id="particle-container" />;
}
