// VLC V1 — Hook: useTeamTheme
// w38 lesson: selected team remaps the whole site via CSS custom properties.
// Dark mode keeps tinted team text (w38 homepage dropdown text style).

import { useState, useCallback, useEffect } from 'react';
import type { TeamId, TeamColors } from '../types/engine';

// Team color database (NFL team hexes). Owner-supplied authoritative table.
const TEAM_COLORS: Record<TeamId, TeamColors> = {
  kc: { primary: '#e31837', secondary: '#ffb81c', accent: '#ff8c1f' },
  sf: { primary: '#aa0000', secondary: '#b2001d', accent: '#b2001d' },
  bal: { primary: '#241773', secondary: '#97c32e', accent: '#97c32e' },
  buf: { primary: '#00338d', secondary: '#c60c30', accent: '#c60c30' },
  det: { primary: '#0b6e4f', secondary: '#b0b7bd', accent: '#b0b7bd' },
  phi: { primary: '#004c54', secondary: '#a5aca7', accent: '#a5aca7' },
  dal: { primary: '#003594', secondary: '#869198', accent: '#869198' },
  gb: { primary: '#203731', secondary: '#ffb612', accent: '#ffb612' },
};

export function useTeamTheme() {
  const [teamId, setTeamId] = useState<TeamId | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vlc-v1-theme');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.teamId) setTeamId(parsed.teamId);
        if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('vlc-v1-theme', JSON.stringify({ teamId, darkMode }));
    } catch {
      // ignore
    }
  }, [teamId, darkMode]);

  const colors = teamId ? TEAM_COLORS[teamId] : null;

  const applyTheme = useCallback((tid: TeamId | null) => {
    setTeamId(tid);
    const root = document.documentElement;
    if (!tid) {
      root.removeAttribute('data-team');
      return;
    }
    root.setAttribute('data-team', tid);
    const c = TEAM_COLORS[tid];
    root.style.setProperty('--vl-accent', c.primary);
    root.style.setProperty('--vl-accent-soft', `rgba(${hexToRgb(c.primary)}, 0.10)`);
    root.style.setProperty('--vl-gold', c.secondary);
    root.style.setProperty('--vl-gold-soft', `rgba(${hexToRgb(c.secondary)}, 0.12)`);
    root.style.setProperty('--vl-gold-glow', `rgba(${hexToRgb(c.secondary)}, 0.30)`);
    root.style.setProperty('--vl-tint', `rgba(${hexToRgb(c.primary)}, 0.16)`);
    root.style.setProperty('--vl-tint-sub', `rgba(${hexToRgb(c.primary)}, 0.06)`);
    // Tinted text — w38 dark mode style: team-colored text on tinted background
    root.style.setProperty('--vl-tint-text', c.primary);
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode((d) => !d);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return {
    teamId,
    colors,
    darkMode,
    setTeam: applyTheme,
    toggleTheme,
  };
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
