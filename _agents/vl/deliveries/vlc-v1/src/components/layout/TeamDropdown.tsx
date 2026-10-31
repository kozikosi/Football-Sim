// VLC V1 — TeamDropdown (w38 lesson)
// The homepage dropdown that changes the color of everything on the site.
// Selecting a team remaps --vl-accent, --vl-gold, --vl-tint via CSS custom properties.
// Dark mode keeps tinted team text — perfect for the rest of the site.

import { useState, useEffect } from 'react';
import { useTeamTheme } from '../../hooks/useTeamTheme';

const TEAMS: { id: string; name: string; primary: string; secondary: string }[] = [
  { id: 'kc', name: 'Kansas City Chiefs', primary: '#e31837', secondary: '#ff8c1f' },
  { id: 'sf', name: 'San Francisco 49ers', primary: '#aa0000', secondary: '#b2001d' },
  { id: 'bal', name: 'Baltimore Ravens', primary: '#241773', secondary: '#97c32e' },
  { id: 'buf', name: 'Buffalo Bills', primary: '#00338d', secondary: '#c60c30' },
  { id: 'det', name: 'Detroit Lions', primary: '#0b6e4f', secondary: '#b0b7bd' },
  { id: 'phi', name: 'Philadelphia Eagles', primary: '#004c54', secondary: '#a5aca7' },
  { id: 'dal', name: 'Dallas Cowboys', primary: '#003594', secondary: '#869198' },
  { id: 'gb', name: 'Green Bay Packers', primary: '#203731', secondary: '#ffb612' },
];

export default function TeamDropdown({ current }: { current: string | null }) {
  const { setTeam, darkMode } = useTeamTheme();
  const [open, setOpen] = useState(false);

  const handleSelect = (id: string) => {
    setTeam(id);
    setOpen(false);
  };

  return (
    <div className="team-dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
      <button
        className={`team-dropdown-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="dropdown-chip" style={{ backgroundColor: current ? getColor(current, 'secondary') : 'transparent' }}>
          {current ? TEAMS.find((t) => t.id === current)?.logo : '⚡'}
        </span>
        <span className="dropdown-name" style={{ color: current ? getColor(current, 'primary') : 'var(--vl-sub)' }}>
          {current ? TEAMS.find((t) => t.id === current)?.name : 'Select Team'}
        </span>
        <span className="dropdown-chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="team-dropdown-list">
          <div className="dropdown-list-header">
            <span className="dropdown-section-title">Choose your team</span>
            <span className="dropdown-hint">Each team remaps the whole site to its colors</span>
          </div>
          {TEAMS.map((t) => {
            const selected = current === t.id;
            const isDark = darkMode;
            return (
              <button
                key={t.id}
                className={`team-dropdown-option ${selected ? 'selected' : ''}`}
                onClick={() => handleSelect(t.id)}
                style={{
                  borderLeft: `4px solid ${t.primary}`,
                  color: isDark ? t.primary : 'var(--vl-ink)',
                  backgroundColor: selected ? getTint(t.primary) : 'transparent',
                }}
              >
                <span className="option-logo">{t.logoEmoji}</span>
                <span className="option-name">{t.name}</span>
                <span className="option-swatch" style={{ backgroundColor: t.primary }} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getColor(id: string, kind: 'primary' | 'secondary'): string {
  const t = TEAMS.find((x) => x.id === id);
  return kind === 'primary' ? t?.primary ?? '#9aa3b2' : t?.secondary ?? '#9aa3b2';
}

function getTint(primary: string): string {
  const h = primary.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.14)`;
}

// Attach logo emojis
TEAMS.forEach((t) => {
  (t as any).logoEmoji = '🏈';
});
