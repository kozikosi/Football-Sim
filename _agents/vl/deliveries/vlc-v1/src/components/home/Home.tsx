// VLC V1 — Layout: Home screen
// w38 lesson: "Can you go 20-0?" hero, team color takeover, floating selectors

import { useState } from 'react';

const TEAMS: { id: string; name: string }[] = [
  { id: 'kc', name: 'Kansas City Chiefs' },
  { id: 'sf', name: 'San Francisco 49ers' },
  { id: 'bal', name: 'Baltimore Ravens' },
  { id: 'buf', name: 'Buffalo Bills' },
  { id: 'det', name: 'Detroit Lions' },
  { id: 'phi', name: 'Philadelphia Eagles' },
  { id: 'dal', name: 'Dallas Cowboys' },
  { id: 'gb', name: 'Green Bay Packers' },
];

export default function Home({ onStartDraft }: { onStartDraft: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="home-screen">
      <div className="hero">
        <h1 className="hero-title">
          <span className="vlc">VLC</span> Colors
        </h1>
        <p className="hero-sub">
          Build your roster. Win 20 games. Can you go{' '}
          <b className="gold">20-0</b>?
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            disabled={!selected}
            onClick={() => onStartDraft(selected!)}
          >
            Start Draft
          </button>
        </div>

        <div className="team-picker-row">
          <label className="picker-label">Team</label>
          <div className="team-grid">
            {TEAMS.map((t) => (
              <button
                key={t.id}
                className={`team-card ${selected === t.id ? 'selected' : ''}`}
                onClick={() => setSelected(t.id)}
                style={{ borderColor: selected === t.id ? 'var(--vl-accent)' : 'var(--vl-border)' }}
              >
                <span className="team-logo">{getLogo(t.id)}</span>
                <span className="team-name">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="team-hint">
          Each team remaps the whole site to its colors · Dark mode keeps tinted team text
        </p>
      </div>
    </section>
  );
}

function getLogo(id: string): string {
  const m: Record<string, string> = {
    kc: '🏈', sf: '🏈', bal: '🏈', buf: '🏈', det: '🏈', phi: '🏈', dal: '🏈', gb: '🏈',
  };
  return m[id] ?? '🏈';
}
