// VLC V1 — Layout: Shell
// Sticky header + team picker (w38 lesson: team choice remaps the whole site)

import { useEffect } from 'react';
import { useTeamTheme } from '../../hooks/useTeamTheme';
import TeamPicker from './TeamPicker';

export default function Shell({ children }: { children: React.ReactNode }) {
  const { teamId, colors, toggleTheme } = useTeamTheme();

  useEffect(() => {
    // Apply team colors to :root so the whole site tints
    const root = document.documentElement;
    if (colors) {
      root.style.setProperty('--vl-accent', colors.primary);
      root.style.setProperty('--vl-accent-soft', `rgba(${hex(colors.primary)}, 0.10)`);
      root.style.setProperty('--vl-gold', colors.secondary);
      root.style.setProperty('--vl-gold-soft', `rgba(${hex(colors.secondary)}, 0.12)`);
      root.style.setProperty('--vl-gold-glow', `rgba(${hex(colors.secondary)}, 0.30)`);
      root.style.setProperty('--vl-tint', `rgba(${hex(colors.primary)}, 0.16)`);
      root.style.setProperty('--vl-tint-sub', `rgba(${hex(colors.primary)}, 0.06)`);
      root.style.setProperty('--vl-tint-text', colors.primary);
    }
  }, [colors]);

  return (
    <div className="shell">
      <header className="header">
        <div className="bar">
          <div className="wordmark">
            <span className="vlc">VLC</span> Colors
          </div>
          <div className="bar-actions">
            <button className="btn btn-ghost" onClick={toggleTheme}>
              {typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Home
            </button>
          </div>
        </div>
      </header>

      <div className="body">
        {children}
        <TeamPicker current={teamId} />
      </div>
    </div>
  );
}

function hex(h: string): string {
  const x = h.replace('#', '');
  return `${parseInt(x.slice(0, 2), 16)}, ${parseInt(x.slice(2, 4), 16)}, ${parseInt(x.slice(4, 6), 16)}`;
}
