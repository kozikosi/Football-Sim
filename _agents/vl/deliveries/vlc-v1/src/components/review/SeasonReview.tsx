// VLC V1 — Season review screen
// w38 lessons: graphical cards, not paragraphs; strengths/weaknesses; "Try again to 20-0?"

export default function SeasonReview() {
  return (
    <section className="review-screen">
      <div className="screen-header">
        <h2 className="screen-title">Season Review</h2>
        <p className="screen-sub">20-0 · Super Bowl Champions</p>
      </div>

      <div className="review-grid">
        <div className="review-card a-team">
          <span className="card-label">Record</span>
          <span className="card-value">20-0</span>
          <span className="card-sub">Super Bowl Champions</span>
        </div>
        <div className="review-card">
          <span className="card-label">Points For</span>
          <span className="card-value">582</span>
          <span className="card-sub">#1 of 32</span>
        </div>
        <div className="review-card">
          <span className="card-label">Points Against</span>
          <span className="card-value">312</span>
          <span className="card-sub">#3 of 32</span>
        </div>
        <div className="review-card">
          <span className="card-label">Turnover Margin</span>
          <span className="card-value">+14</span>
          <span className="card-sub">#1 of 32</span>
        </div>
        <div className="review-card">
          <span className="card-label">Game Ball</span>
          <span className="card-value" style={{ color: 'var(--vl-gold)' }}>
            ★ C. Williams
          </span>
          <span className="card-sub">QB · 4,890 YDS · 42 TD</span>
        </div>
        <div className="review-card">
          <span className="card-label">Best Unit</span>
          <span className="card-value">Pass Rush</span>
          <span className="card-sub">#1 of 32 · 62 sacks</span>
        </div>
      </div>

      <div className="panel center">
        <div className="wins-badge" style={{ fontSize: '1.3rem' }}>
          Try again to go 20-0?
        </div>
        <div className="hero-actions" style={{ marginTop: 16 }}>
          <button className="btn btn-primary">Start a New Draft</button>
        </div>
      </div>
    </section>
  );
}
