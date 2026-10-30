// VLC V1 — Game preview screen
// w38 lessons: matchup math as chips, scouting bars, integers, no prose, "#x WINS"

export default function GamePreview() {
  return (
    <section className="preview-screen">
      <div className="matchup-card">
        <div className="team-side">
          <div className="team-name" style={{ color: '#e31837' }}>
            Kansas City Chiefs
          </div>
          <div className="team-record">11-6 · #2 AFC</div>
        </div>
        <div className="vs-badge">vs</div>
        <div className="team-side">
          <div className="team-name" style={{ color: '#aa0000' }}>
            San Francisco 49ers
          </div>
          <div className="team-record">12-5 · #1 NFC</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Scouting</h3>
        </div>
        <div className="scouting-list">
          <div className="scouting-row">
            <span className="scouting-label">Quarterback Play</span>
            <div className="scouting-bar"><div className="scouting-fill" style={{ width: '78%' }} /></div>
            <span className="scouting-value">+3.3</span>
          </div>
          <div className="scouting-row">
            <span className="scouting-label">Run Blocking</span>
            <div className="scouting-bar"><div className="scouting-fill" style={{ width: '62%' }} /></div>
            <span className="scouting-value">+1.1</span>
          </div>
          <div className="scouting-row">
            <span className="scouting-label">Pass Protection</span>
            <div className="scouting-bar"><div className="scouting-fill" style={{ width: '55%' }} /></div>
            <span className="scouting-value">+0.8</span>
          </div>
          <div className="scouting-row">
            <span className="scouting-label">Pass Rush</span>
            <div className="scouting-bar"><div className="scouting-fill" style={{ width: '84%' }} /></div>
            <span className="scouting-value">+4.2</span>
          </div>
          <div className="scouting-row">
            <span className="scouting-label">Pass Coverage</span>
            <div className="scouting-bar"><div className="scouting-fill" style={{ width: '71%' }} /></div>
            <span className="scouting-value">+2.6</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header"><h3 className="panel-title">Matchup Math</h3></div>
        <div className="chips-grid">
          <div className="chip strong">Strong Pass Rush</div>
          <div className="chip strong">Strong Quarterback</div>
          <div className="chip weak">Weak Run Blocking</div>
          <div className="chip neutral">Balanced Matchup</div>
          <div className="chip weak">Weak Pass Coverage</div>
          <div className="chip strong">Strong Special Teams</div>
        </div>
        <div className="wins-badge">+2 WINS</div>
      </div>
    </section>
  );
}
