import { useEffect, useRef, useState } from 'react';

export default function Cursor({ darkSection }: { darkSection: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top  = my + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top  = ry + 'px';
      }
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('button, a, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafId = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const dotCls = `cursor-dot${hovering ? ' hovering' : ''}${darkSection ? ' cursor-dark' : ''}`;
  const ringCls = `cursor-ring${hovering ? ' hovering' : ''}${darkSection ? ' cursor-dark' : ''}`;

  return (
    <>
      <div ref={dotRef}  className={dotCls}  />
      <div ref={ringRef} className={ringCls} />
    </>
  );
}
