// VLC V1 — SeasonReview (w38 P-124/P-160)
// Strengths/weaknesses graphics, no paragraphs.
// Panel asking "Try again to 20-0?" that starts a new draft.
// Integers only, 2-Pt Conversions "x of y", "IN DA CLUTCH",
// INDIVIDUAL SKILL, SUBPAR BLOCKING, EXCELLENT COVERAGE.

export default function SeasonReview() {
  return (
    <section className="season-review-screen">
      <div className="screen-header">
        <h2 className="screen-title">Season Review</h2>
        <p className="screen-sub">20-0 · Super Bowl Champions</p>
      </div>

      <div className="review-grid">
        <div className="review-card champion">
          <div className="card-label">Record</div>
          <div className="card-value">20-0</div>
          <div className="card-sub">Super Bowl Champions</div>
        </div>
        <div className="review-card">
          <div class="card-label">Points For</div>
          <div class="card-value">582</div>
          <div class="card-sub">#1 of 32</div>
        </div>
        <div className="review-card">
          <div className="card-label">Points Against</div>
          <div className="card-value">312</div>
          <div className="card-sub">#3 of 32</div>
        </div>
        <div className="review-card">
          <div className="card-label">Turnover Margin</div>
          <div className="card-value">+14</div>
          <div className="card-sub">#1 of 32</div>
        </div>
        <div className="review-card">
          <div className="card-label">2-Pt Conversions</div>
          <div className="card-value">4 of 6</div>
          <div className="card-sub">66.7%</div>
        </div>
        <div className="review-card">
          <div className="card-label">IN DA CLUTCH</div>
          <div className="card-value">8-0</div>
          <div className="card-sub">Within 7, 4th Q</div>
        </div>
        <div className="review-card a-team">
          <div className="card-label">INDIVIDUAL SKILL</div>
          <div className="card-value">★ C. Williams</div>
          <div className="card-sub">QB · 4,890 YDS · 42 TD</div>
        </div>
        <div className="review-card">
          <div className="card-label">Best Unit</div>
          <div className="card-value">Pass Rush</div>
          <div className="card-sub">#1 of 32 · 62 sacks</div>
        </div>
      </div>

      <div className="panel center">
        <div className="wins-badge">Try again to go 20-0?</div>
        <div className="hero-actions" style={{ marginTop: 16 }}>
          <button className="btn btn-primary">Start a New Draft</button>
        </div>
      </div>
    </section>
  );
}
