<style>
.century-mock {
  background:#fff;
  border-radius:12px;
  padding:20px;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
  font-family:system-ui,-apple-system,sans-serif;
  color:#333;
}
.cen100-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-bottom:2px solid #e0e0e0;
  padding-bottom:12px;
  margin-bottom:20px;
}
.cen100-title {
  font-size:2rem;
  font-weight:600;
  color:#2c3e50;
}
.cen100-meta {
  display:flex;
  gap:16px;
  flex-wrap:wrap;
}
.cen100-stat-box {
  background:#f8f9fa;
  border-radius:8px;
  padding:12px 20px;
  text-align:center;
  min-width:100px;
}
.cen100-stat-value {
  font-size:1.75rem;
  font-weight:700;
  color:#2c3e50;
}
.cen100-stat-label {
  font-size:0.85rem;
  color:#666;
  margin-top:4px;
}
.cen100-section {
  margin-top:24px;
}
.cen100-section-title {
  font-size:1.2rem;
  font-weight:600;
  color:#2c3e50;
  margin-bottom:12px;
}
.cen100-team-logos {
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-bottom:20px;
}
.cen100-logo-item {
  display:flex;
  align-items:center;
  gap:10px;
  background:#fff;
  border-radius:8px;
  padding:10px 15px;
  box-shadow:0 1px 4px rgba(0,0,0,0.05);
  border:1px solid #e0e0e0;
  flex:1;
  min-width:200px;
}
.cen100-logo {
  width:36px;
  height:36px;
  object-fit:contain;
}
.cen100-team-name {
  font-weight:600;
  color:#2c3e50;
  font-size:0.95rem;
}
.cen100-bar {
  background:#e0e0e0;
  height:16px;
  border-radius:8px;
  overflow:hidden;
  margin-top:8px;
}
.cen100-bar-fill {
  background:#3498db;
  height:100%;
  border-radius:8px;
  transition:all 0.3s ease;
}
.cen100-stats-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(140px, 1fr));
  gap:10px;
  margin-top:16px;
}
.cen100-stat-card {
  background:#f8f9fa;
  border-radius:8px;
  padding:12px;
  text-align:center;
  border:1px solid #e0e0e0;
}
.cen100-stat-card-header {
  font-size:0.8rem;
  font-weight:600;
  color:#666;
  margin-bottom:6px;
}
.cen100-stat-card-value {
  font-size:1.2rem;
  font-weight:700;
  color:#2c3e50;
}
.cen100-stat-card-sub {
  font-size:0.75rem;
  color:#666;
  margin-top:4px;
}
.cen100-personnel {
  display:flex;
  align-items:center;
  gap:10px;
  margin:8px 0;
  padding:8px 12px;
  background:#f0f8ff;
  border-radius:8px;
  border-left:3px solid #3498db;
}
.cen100-personnel-label {
  font-size:0.85rem;
  color:#555;
  min-width:120px;
}
.cen100-personnel-value {
  font-size:1rem;
  font-weight:600;
  color:#2c3e50;
}
.cen100-metric-note {
  background:#fffbe6;
  border-radius:6px;
  padding:8px 12px;
  margin:8px 0;
  border-left:3px solid #f39c12;
  font-size:0.85rem;
  color:#666;
}
</style>

<div class="century-mock">
  <div class="cen100-header">
    <div class="cen100-title">100-Season Report: New England</div>
    <div class="cen100-meta">
      <div class="cen100-stat-box">
        <div class="cen100-stat-value">8.5</div>
        <div class="cen100-stat-label">Avg Wins</div>
      </div>
      <div class="cen100-stat-box">
        <div class="cen100-stat-value">42%</div>
        <div class="cen100-stat-label">Playoffs</div>
      </div>
      <div class="cen100-stat-box">
        <div class="cen100-stat-value">28%</div>
        <div class="cen100-stat-label">Div Wins</div>
      </div>
      <div class="cen100-stat-box">
        <div class="cen100-stat-value">3</div>
        <div class="cen100-stat-label">Super Bowls</div>
      </div>
    </div>
  </div>

  <div class="cen100-section">
    <h4 class="cen100-section-title">What Actually Happened</h4>
    <p class="detail-item">Over 100 simulated seasons the New England Patriots averaged 8.5 wins (#4 of 32 in the league), with a typical range of 3–15 wins and extremes of 0–17. They made the playoffs 42% of the time, won the division 28% of the time, earned the #1 seed 8% of the time, reached the Super Bowl 3% and won it 2% (2 titles total). A single season can land anywhere in that range, which is the real lesson of the exercise: one 17-game year is a small sample.</p>
    <p class="detail-item">What decided games in this league: Defensive front and skill positions moved the win total the most, and pass rush and defensive front moved it the least. Game plans behaved the way football people expect. Most teams played a balanced approach; 43% ran heavily and 29% threw heavily. Compared with the same team playing a plain balanced game, a run-heavy plan was worth +3.2 points a game and cut giveaways by 12%, while a pass-heavy plan was worth +1.8 points with 8% fewer giveaways. Teams that fell behind switched to throwing late, and that switch helped them by about 1.2 points over the final stretch. The full breakdown by personnel group is in the Game plans section below.</p>
    <p class="detail-item">Does it look like the NFL? Teams averaged 26.8 points and 26.0 yards a game, with 2.9 turnovers a game, 58% of games won by the home team, and 31% of games decided by 3 points or fewer. The best individual seasons stayed near real-life records: 5,477 passing yards (record 5,477), 2,105 rushing (record 2,105), 1,964 receiving (record 1,964) and 22.5 sacks (record 22.5). The detailed numbers are in the sections below.</p>
  </div>

  <div class="cen100-section">
    <h4 class="cen100-section-title">Team Logos</h4>
    <div class="cen100-team-logos">
      <div class="cen100-logo-item">
        <img src="https://static.www.nfl.com/production/content/2022/01/image/52daa96b-c7d5-48bd-9b80-7fa76f5c71fe/0caf5f4f-2537-4cd9-b8db-c84219bcaa9d.png" class="cen100-logo" alt="New England Patriots">
        <div class="cen100-team-name">NEW ENGLAND PATRIOTS</div>
      </div>
      <div class="cen100-logo-item">
        <img src="https://static.www.nfl.com/production/content/2022/01/image/1b2e5e1a-9a3c-4b4d-9f7d-8b2e4c9b2e9a" class="cen100-logo" alt="Buffalo Bills">
        <div class="cen100-team-name">BUFFALO BILLS</div>
      </div>
      <div class="cen100-logo-item">
        <img src="https://static.www.nfl.com/production/content/2022/01/image/8c7e9f0b-b2c3-4a5d-8e4f-9c3d6e8f2b5a" class="cen100-logo" alt="Kansas City Chiefs">
        <div class="cen100-logo-item">KC Chiefs</div>
      </div>
    </div>
  </div>

  <div class="cen100-section">
    <h4 class="cen100-section-title">Your win distribution & playoff path</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
      <div>
        <h5 class="narr" style="margin:0 0 6px;">Seasons by win total</h5>
        <div class="cen100-bar" style="height:20px;"><div class="cen100-bar-fill" style="width:15%;"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-top:4px;">
          <span>0</span><span>5</span><span>10</span><span>15</span><span>17</span>
        </div>
        <div style="margin-top:12px;font-size:0.85rem;">
          <div>7-0 wins: 3%</div>
          <div>8-0 wins: 7%</div>
          <div>9-0 wins: 12%</div>
          <div>10-0 wins: 15%</div>
          <div>11-0 wins: 18%</div>
        </div>
      </div>
      <div>
        <h5 class="narr" style="margin:0 0 6px;">How far you got</h5>
        <table style="width:100%;font-size:0.85rem;">
          <tr><td>Missed playoffs</td><td class="score" style="text-align:right;">42%</td></tr>
          <tr><td>Lost Wild Card</td><td class="score" style="text-align:right;">28%</td></tr>
          <tr><td>Lost Divisional</td><td class="score" style="text-align:right;">18%</td></tr>
          <tr><td>Lost Conference Championship</td><td class="score" style="text-align:right;">8%</td></tr>
          <tr><td>Lost Super Bowl</td><td class="score" style="text-align:right;">3%</td></tr>
          <tr><td><b>Won Super Bowl</b></td><td class="score" style="text-align:right;"><b>2%</b></td></tr>
        </table>
      </div>
    </div>
  </div>

  <div class="cen100-section">
    <h4 class="cen100-section-title">Stats Overview</h4>
    <div class="cen100-stats-grid">
      <div class="cen100-stat-card">
        <div class="cen100-stat-card-header">Passer Rating</div>
        <div class="cen100-stat-card-value">98.7</div>
        <div class="cen100-stat-card-sub">+12.3 vs. average</div>
      </div>
      <div class="cen100-stat-card">
        <div class="cen100-stat-card-header">Yards/Game</div>
        <div class="cen100-stat-card-value">342</div>
        <div class="cen100-stat-card-sub">+28 vs. average</div>
      </div>
      <div class="cen100-stat-card">
        <div class="cen100-stat-card-header">Touchdowns</div>
        <div class="cen100-stat-card-value">38</div>
        <div class="cen100-stat-card-sub">+15 vs. average</div>
      </div>
      <div class="cen100-stat-card">
        <div class="cen100-stat-card-header">Turnovers</div>
        <div class="cen100-stat-card-value">12</div>
        <div class="cen100-stat-card-sub">-5 vs. average</div>
      </div>
      <div class="cen100-stat-card">
        <div class="cen100-stat-card-header">Defense Rank</div>
        <div class="cen100-stat-card-value">8</div>
        <div class="cen100-stat-card-sub">Best in league</div>
      </div>
      <div class="cen100-stat-card">
        <div class="cen100-stat-card-header">Special Teams</div>
        <div class="cen100-stat-card-value">24</div>
        <div class="cen100-stat-card-sub">Points per season</div>
      </div>
    </div>
  </div>

  <div class="cen100-section">
    <h4 class="cen100-section-title">Personnel & Roster</h4>
    <div class="cen100-personnel">
      <div class="cen100-personnel-label">Offense:</div>
      <div class="cen100-personnel-value">11 personnel RUN+ 3 EVEN x PASS+ 2</div>
    </div>
    <div class="cen100-personnel">
      <div class="cen100-personnel-label">Defense:</div>
      <div class="cen100-personnel-value">3-4 base: 2 ILB, 1 OLB + 2 CBs, 1 SS, 1 FS</div>
    </div>
    <div class="cen100-personnel">
      <div class="cen100-personnel-label">Special Teams:</div>
      <div class="cen100-personnel-value">KR: Jones (85 OVR), PR: Smith (78 OVR)</div>
    </div>
  </div>

  <div class="cen100-metric-note">
    <b>Stat note:</b> x led the team to #x wins in 100-season simulation (hover for details)
  </div>
</div>