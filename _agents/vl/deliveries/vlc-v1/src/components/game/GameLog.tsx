// VLC V1 — GameLog (w38 P-166)
// Panel 50% larger, far more space between quarters, no lines.
// Every line: "<team> <play> <yds>" (x yds after runs, receptions, FGs)
// Shimmering TD tag in scoring team colour, FG tag in same place (shimmer only for game-winning FG)
// Score as "x - y" (no "+7"), turnovers as "x int y", "x fum", "y FF", "z FR"
// ALWAYS with the time, never print "Touchdown" or "Turnover"

const PLAYS = [
  { time: '14:52', team: 'KC', teamColor: '#e31837', play: 'Pass', yards: '22 yds', tag: 'TD', tagColor: '#e31837' },
  { time: '13:10', team: 'SF', teamColor: '#aa0000', play: 'Run', yards: '8 yds', tag: null },
  { time: '12:03', team: 'KC', teamColor: '#e31837', play: 'FG', yards: '44 yds', tag: 'FG', tagColor: '#e31837' },
  { time: '10:44', team: 'SF', teamColor: '#aa0000', play: 'Int', yards: '—', tag: null },
  { time: '8:20', team: 'KC', teamColor: '#e31837', play: 'Pass', yards: '11 yds', tag: null },
  { time: '6:33', team: 'SF', teamColor: '#aa0000', play: 'Fum', yards: '—', tag: null },
  { time: '4:15', team: 'KC', teamColor: '#e31837', play: 'Run', yards: '3 yds', tag: null },
  { time: '2:01', team: 'SF', teamColor: '#aa0000', play: 'Pass', yards: '18 yds', tag: 'TD', tagColor: '#aa0000' },
  { time: '0:12', team: 'SF', teamColor: '#aa0000', play: 'FG', yards: '32 yds', tag: 'FG', tagColor: '#aa0000' },
];

export default function GameLog() {
  return (
    <section className="game-log-screen">
      <div className="screen-header">
        <h2 className="screen-title">Game Animation</h2>
        <p className="screen-sub">Kansas City 29 — 34 San Francisco · Q4 · 0:12</p>
      </div>

      <div className="log-panel">
        <div className="log-entries">
          {PLAYS.map((p, i) => (
            <div key={i} className="log-entry">
              <span className="log-time">{p.time}</span>
              <span className="log-team" style={{ color: p.teamColor }}>
                {p.team}
              </span>
              <span className="log-play">{p.play}</span>
              {p.yards !== '—' && <span className="log-yards">{p.yards}</span>}
              {p.tag && (
                <span
                  className={`log-tag ${p.tag === 'TD' ? 'td' : 'fg'}`}
                  style={{ color: p.tagColor }}
                >
                  {p.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-actions" style={{ marginTop: 24 }}>
        <button className="btn btn-primary">Skip</button>
      </div>
    </section>
  );
}
