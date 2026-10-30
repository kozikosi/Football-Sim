// VLC V1 — Layout: TeamPicker
// w38 lesson: homepage dropdown menu changes the color of everything on the site.
// Dark mode keeps tinted team text (perfect for the rest of the site).

import { useState } from 'react';
import { useTeamTheme } from '../../hooks/useTeamTheme';

const TEAMS: { id: string; name: string; logo: string }[] = [
  { id: 'kc', name: 'Kansas City Chiefs', logo: '🏈' },
  { id: 'sf', name: 'San Francisco 49ers', logo: '🏈' },
  { id: 'bal', name: 'Baltimore Ravens', logo: '🏈' },
  { id: 'buf', name: 'Buffalo Bills', logo: '🏈' },
  { id: 'det', name: 'Detroit Lions', logo: '🏈' },
  { id: 'phi', name: 'Philadelphia Eagles', logo: '🏈' },
  { id: 'dal', name: 'Dallas Cowboys', logo: '🏈' },
  { id: 'gb', name: 'Green Bay Packers', logo: '🏈' },
];

export default function TeamPicker({ current }: { current: string | null }) {
  const { setTeam, darkMode } = useTeamTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="team-picker-wrapper" onClick={(e) => e.stopPropagation()}>
      <button
        className={`team-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="team-chip" style={{ backgroundColor: current ? getColor(current, 'secondary') : 'transparent' }}>
          {current ? TEAMS.find((t) => t.id === current)?.logo : '⚡'}
        </span>
        <span className="team-name" style={{ color: current ? getColor(current, 'primary') : 'var(--vl-sub)' }}>
          {current ? TEAMS.find((t) => t.id === current)?.name : 'Select Team'}
        </span>
        <span className="chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="team-list">
          {TEAMS.map((t) => (
            <button
              key={t.id}
              className={`team-option ${current === t.id ? 'selected' : ''}`}
              onClick={() => {
                setTeam(t.id);
                setOpen(false);
              }}
              style={{
                borderLeft: `4px solid ${getColor(t.id, 'primary')}`,
                color: darkMode ? getColor(t.id, 'primary') : 'var(--vl-ink)',
                backgroundColor: current === t.id ? getColor(t.id, 'tint') : 'transparent',
              }}
            >
              <span className="option-logo">{t.logo}</span>
              <span className="option-name">{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function getColor(id: string, kind: 'primary' | 'secondary' | 'tint'): string {
  const map: Record<string, { primary: string; secondary: string; tint: string }> = {
    kc: { primary: '#e31837', secondary: '#ff8c1f', tint: 'rgba(227,24,55,0.16)' },
    sf: { primary: '#aa0000', secondary: '#b2001d', tint: 'rgba(170,0,0,0.16)' },
    bal: { primary: '#241773', secondary: '#97c32e', tint: 'rgba(36,23,115,0.16)' },
    buf: { primary: '#00338d', secondary: '#c60c30', tint: 'rgba(0,51,141,0.16)' },
    det: { primary: '#0b6e4f', secondary: '#b0b7bd', tint: 'rgba(11,110,79,0.16)' },
    phi: { primary: '#004c54', secondary: '#a5aca7', tint: 'rgba(0,76,84,0.16)' },
    dal: { primary: '#003594', secondary: '#869198', tint: 'rgba(0,53,148,0.16)' },
    gb: { primary: '#203731', secondary: '#ffb612', tint: 'rgba(32,55,49,0.16)' },
  };
  return map[id]?.[kind] ?? '#9aa3b2';
}
