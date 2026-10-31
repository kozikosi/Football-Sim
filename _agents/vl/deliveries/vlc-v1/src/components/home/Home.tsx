// VLC V1 — Home (w38 lesson)
// Homepage hero with 20-0 wordmark, shimmer, team picker that remaps the whole site.
// Floating selectors side by side at any width.

import { Shimmer20_0 } from './Shimmer20_0';
import { useTeamTheme } from '../../hooks/useTeamTheme';

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
  const { teamId, colors } = useTeamTheme();
  const [selected, setSelected] = useState(teamId || null);

  return (
    <section className="home-screen">
      <div className="hero">
        <h1 className="hero-title shimmer-text">
          <span className="vlc">VLC</span> Colors
        </h1>
        <p className="hero-sub">
          Build your roster. Win 20 games. Can you go{' '}
          <b className="gold">20-0</b>?
        </p>

        <Shimmer20_0 variant="headline" />

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
            {TEAMS.map((t) => {
              const sel = selected === t.id;
              const color = sel ? (colors ? colors.primary : 'var(--vl-accent)') : 'transparent';
              return (
                <button
                  key={t.id}
                  className={`team-card ${sel ? 'selected' : ''}`}
                  onClick={() => setSelected(t.id)}
                  style={{
                    borderColor: sel ? 'var(--vl-accent)' : 'var(--vl-border)',
                    backgroundColor: sel ? 'color-mix(in srgb, var(--vl-accent-soft) 50%, var(--vl-panel))' : 'transparent',
                  }}
                >
                  <span className="team-logo">🏈</span>
                  <span className="team-name">{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="team-hint">
          Each team remaps the whole site to its colors · Dark mode keeps tinted team text
        </p>
      </div>
    </section>
  );
}
