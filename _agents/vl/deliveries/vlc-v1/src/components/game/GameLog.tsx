// VLC V1 — Game animation log
// w38 lessons: "<team> <play> <yds>", shimmering TD tag in team color, FG tag,
// score "x - y", turnovers "x int y", ALWAYS with the time, never "Touchdown"/"Turnover"

const PLAYS = [
  { time: '14:52', team: 'KC', teamColor: '#e31837', play: 'Pass', yards: '22 yds', tag: 'TD' },
  { time: '13:10', team: 'SF', teamColor: '#aa0000', play: 'Run', yards: '8 yds', tag: null },
  { time: '12:03', team: 'KC', teamColor: '#e31837', play: 'FG', yards: '44 yds', tag: 'FG' },
  { time: '10:44', team: 'SF', teamColor: '#aa0000', play: 'Int', yards: '—', tag: null },
  { time: '8:20', team: 'KC', teamColor: '#e31837', play: 'Pass', yards: '11 yds', tag: null },
  { time: '6:33', team: 'SF', teamColor: '#aa0000', play: 'Fum', yards: '—', tag: null },
  { time: '4:15', team: 'KC', teamColor: '#e31837', play: 'Run', yards: '3 yds', tag: null },
  { time: '2:01', team: 'SF', teamColor: '#aa0000', play: 'Pass', yards: '18 yds', tag: 'TD' },
  { time: '0:12', team: 'SF', teamColor: '#aa0000', play: 'FG', yards: '32 yds', tag: 'FG' },
];

export default function GameLog() {
  return (
    <section className="game-screen">
      <div className="screen-header">
        <h2 className="screen-title">Game Animation</h2>
        <p className="screen-sub">Kansas City 29 — 34 San Francisco · Q4 0:12</p>
      </div>

      <div className="log-wrap">
        <div className="log">
          {PLAYS.map((p, i) => (
            <div key={i} className="log-line">
              <span className="log-time">{p.time}</span>
              <span className="log-team" style={{ color: p.teamColor }}>
                {p.team}
              </span>
              <span className="log-play">{p.play}</span>
              <span className="log-yards">{p.yards}</span>
              {p.tag && (
                <span
                  className={`log-tag ${p.tag === 'TD' ? 'td' : 'fg'}`}
                  style={{ color: p.tag === 'TD' ? '#052e16' : '#052633' }}
                >
                  {p.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-actions">
        <button className="btn btn-primary">Skip</button>
      </div>
    </section>
  );
}
