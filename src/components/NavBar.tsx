type Section = 'landing' | 'intro' | 'uiux' | 'webdev' | 'anim3d' | 'papers';

const LINKS: { id: Section; label: string }[] = [
  { id: 'intro',  label: 'Introduction' },
  { id: 'uiux',   label: 'UI / UX' },
  { id: 'webdev', label: 'Web Dev' },
  { id: 'anim3d', label: '3D Animation' },
  { id: 'papers', label: 'Papers' },
];

interface Props {
  current: Section;
  navigate: (s: Section) => void;
}

export default function NavBar({ current, navigate }: Props) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-5"
      style={{
        background: 'rgba(250,247,242,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(139,115,85,0.13)',
      }}
    >
      <button
        onClick={() => navigate('landing')}
        className="font-serif text-xl font-light tracking-wide"
        style={{ color: 'var(--dark-brown)', fontFamily: 'var(--serif)', cursor: 'none' }}
      >
        Sally's <em style={{ color: 'var(--brown)', fontStyle: 'italic' }}>Archive</em>
      </button>

      <div className="hidden md:flex gap-8">
        {LINKS.map(l => (
          <button
            key={l.id}
            onClick={() => navigate(l.id)}
            className="nav-link"
            style={{ color: current === l.id ? 'var(--dark-brown)' : undefined }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
