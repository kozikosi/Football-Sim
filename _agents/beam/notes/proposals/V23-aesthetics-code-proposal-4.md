# Beam — V23 Aesthetics Code Proposal 4 (for Claude/Architect review)

**Status:** advisory proposal. No product edits. Self-contained code snippets ready to drop into the single-file HTML.
**Companions:** Proposals 1–3 (25 proposals), `V23-aesthetics-plug-and-play.md` (consolidated guide), VL's `ui-beauty-proposals.md` (header/footer/panels/championship overlay)

---

## Proposal 26: Playoff Bracket Animation

### CSS

```css
.bracket-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}
.bracket-round {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}
.bracket-round::before {
  content: attr(data-round);
  font-size: 0.7em;
  font-weight: 700;
  color: var(--sub, #8b92a8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.bracket-matchup {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
  transition: all 200ms ease;
}
.bracket-matchup .team {
  flex: 1;
  font-size: 0.75em;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bracket-matchup .score {
  font-size: 0.75em;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  min-width: 20px;
  text-align: center;
}
.bracket-matchup .team.winner {
  color: var(--team-accent, #ffd700);
}
.bracket-matchup .team.loser {
  opacity: 0.5;
  text-decoration: line-through;
}
.bracket-matchup.user-team {
  border-color: var(--team-primary);
  background: linear-gradient(90deg, var(--team-primary), transparent);
  opacity: 0.08;
}
.bracket-connector {
  width: 2px;
  height: 8px;
  background: var(--border, #2a3142);
  margin: 0 auto;
}
.bracket-matchup.newly-advanced {
  animation: bracketAdvance 400ms ease-out;
}
@keyframes bracketAdvance {
  0% { transform: scale(0.9); opacity: 0.5; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
```

### JS

```js
function renderPlayoffBracket(rounds, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = rounds.map((round, ri) => {
    const matchups = round.map(m => {
      const userClass = m.userTeam ? 'user-team' : '';
      const winnerClass = (team) => m.winner === team ? 'winner' : 'loser';
      return `<div class="bracket-matchup ${userClass}">
        <span class="team ${winnerClass(m.home)}">${m.home}</span>
        <span class="score">${m.homeScore ?? '—'}</span>
        <span class="score">${m.awayScore ?? '—'}</span>
        <span class="team ${winnerClass(m.away)}">${m.away}</span>
      </div>`;
    }).join('<div class="bracket-connector"></div>');
    return `<div class="bracket-round" data-round="${round.name || 'Round ' + (ri+1)}">${matchups}</div>`;
  }).join('');
}

function animateBracketAdvance(matchupEl) {
  if (matchupEl) {
    matchupEl.classList.add('newly-advanced');
    setTimeout(() => matchupEl.classList.remove('newly-advanced'), 400);
  }
}
```

---

## Proposal 27: Draft Day War Room

### CSS

```css
.war-room {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}
.war-room-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: var(--panel2, #1a1f2e);
  border-radius: 6px;
  border: 1px solid var(--border, #2a3142);
}
.war-room-clock {
  font-size: 1.2em;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--team-accent, #ffd700);
}
.war-room-clock.urgent {
  color: var(--bad, #ef4444);
  animation: pulse 1s infinite;
}
.war-room-pick {
  font-size: 0.8em;
  color: var(--sub, #8b92a8);
}
.war-room-pick b { color: var(--text, #e8eaf0); }
.war-room-board {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.war-room-panel {
  background: var(--panel2, #1a1f2e);
  border-radius: 6px;
  border: 1px solid var(--border, #2a3142);
  padding: 8px;
  max-height: 200px;
  overflow-y: auto;
}
.war-room-panel h4 {
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--sub, #8b92a8);
  margin: 0 0 6px;
}
.war-room-player {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
  font-size: 0.8em;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.war-room-player .wr-pos {
  font-weight: 700;
  min-width: 24px;
}
.war-room-player .wr-ovr {
  font-variant-numeric: tabular-nums;
  color: var(--team-primary, #4f8cff);
  font-weight: 600;
}
.war-room-player .wr-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.war-room-urgency {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7em;
  color: var(--bad, #ef4444);
  font-weight: 600;
}
.war-room-urgency .urgency-bar {
  width: 40px;
  height: 4px;
  background: var(--border, #2a3142);
  border-radius: 2px;
  overflow: hidden;
}
.war-room-urgency .urgency-fill {
  height: 100%;
  background: var(--bad, #ef4444);
  border-radius: 2px;
  transition: width 100ms linear;
}
```

### JS

```js
function renderWarRoom(clock, currentPick, totalPicks, topPlayers, needs, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const urgency = Math.max(0, 1 - (clock / 30)); // 30s clock
  const urgencyPct = (urgency * 100).toFixed(0);
  el.innerHTML = `
    <div class="war-room">
      <div class="war-room-header">
        <div class="war-room-clock ${clock <= 10 ? 'urgent' : ''}">${clock}s</div>
        <div class="war-room-pick">Pick <b>${currentPick}</b> of ${totalPicks}</div>
        <div class="war-room-urgency">
          <div class="urgency-bar"><div class="urgency-fill" style="width:${urgencyPct}%"></div></div>
        </div>
      </div>
      <div class="war-room-board">
        <div class="war-room-panel">
          <h4>Top Available</h4>
          ${topPlayers.map(p => `<div class="war-room-player">
            <span class="wr-pos">${p.pos}</span>
            <span class="wr-ovr">${p.ovr}</span>
            <span class="wr-name">${p.name}</span>
          </div>`).join('')}
        </div>
        <div class="war-room-panel">
          <h4>Team Needs</h4>
          ${needs.map(n => `<div class="war-room-player">
            <span class="wr-pos">${n.pos}</span>
            <span class="wr-name">${n.need}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
}
```

---

## Proposal 28: Injury Report (Visual)

### CSS

```css
.injury-report {
  display: flex;
  gap: 12px;
  padding: 8px;
}
.injury-body {
  width: 80px;
  height: 160px;
  position: relative;
  flex-shrink: 0;
}
.injury-body svg {
  width: 100%;
  height: 100%;
}
.injury-list {
  flex: 1;
  font-size: 0.8em;
}
.injury-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.injury-item .inj-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.injury-item .inj-dot.minor { background: #eab308; }
.injury-item .inj-dot.moderate { background: #f97316; }
.injury-item .inj-dot.severe { background: #ef4444; }
.injury-item .inj-dot.out { background: #6b7280; }
.injury-item .inj-name { flex: 1; font-weight: 600; }
.injury-item .inj-type { color: var(--sub, #8b92a8); font-size: 0.85em; }
.injury-item .inj-weeks { color: var(--bad, #ef4444); font-size: 0.8em; font-weight: 600; }
```

### JS

```js
function renderInjuryReport(injuries, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const bodyParts = { head: [40, 15], shoulder: [25, 35], arm: [15, 55], leg: [30, 100], knee: [35, 120] };
  let dots = '';
  injuries.forEach(inj => {
    const part = bodyParts[inj.bodyPart] || [40, 60];
    dots += `<circle cx="${part[0]}" cy="${part[1]}" r="4" fill="${inj.severity === 'severe' ? '#ef4444' : inj.severity === 'moderate' ? '#f97316' : '#eab308'}" opacity="0.8" />`;
  });
  el.innerHTML = `
    <div class="injury-report">
      <div class="injury-body">
        <svg viewBox="0 0 80 180" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="20" rx="12" ry="14" fill="#2a3142" stroke="#4f8cff" stroke-width="1" />
          <rect x="30" y="34" width="20" height="50" rx="4" fill="#2a3142" stroke="#4f8cff" stroke-width="1" />
          <rect x="15" y="38" width="12" height="40" rx="3" fill="#2a3142" stroke="#4f8cff" stroke-width="1" />
          <rect x="53" y="38" width="12" height="40" rx="3" fill="#2a3142" stroke="#4f8cff" stroke-width="1" />
          <rect x="28" y="84" width="10" height="50" rx="3" fill="#2a3142" stroke="#4f8cff" stroke-width="1" />
          <rect x="42" y="84" width="10" height="50" rx="3" fill="#2a3142" stroke="#4f8cff" stroke-width="1" />
          ${dots}
        </svg>
      </div>
      <div class="injury-list">
        ${injuries.map(inj => `
          <div class="injury-item">
            <span class="inj-dot ${inj.severity}"></span>
            <span class="inj-name">${inj.name}</span>
            <span class="inj-type">${inj.type}</span>
            <span class="inj-weeks">${inj.weeks}w</span>
          </div>
        `).join('')}
      </div>
    </div>`;
}
```

---

## Proposal 29: Draft Grade (Post-Draft)

### CSS

```css
.draft-grade {
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
}
.draft-grade .grade-letter {
  font-size: 3em;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 4px;
}
.draft-grade .grade-letter.A { color: var(--good, #22c55e); }
.draft-grade .grade-letter.B { color: #84cc16; }
.draft-grade .grade-letter.C { color: #eab308; }
.draft-grade .grade-letter.D { color: #f97316; }
.draft-grade .grade-letter.F { color: var(--bad, #ef4444); }
.draft-grade .grade-score {
  font-size: 0.85em;
  color: var(--sub, #8b92a8);
  margin-bottom: 8px;
}
.draft-grade .grade-breakdown {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
.draft-grade .grade-item {
  font-size: 0.75em;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--panel, #151922);
  border: 1px solid var(--border, #2a3142);
}
.draft-grade .grade-item b { color: var(--team-primary, #4f8cff); }
```

### JS

```js
function renderDraftGrade(grade, score, breakdown, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="draft-grade">
      <div class="grade-letter ${grade}">${grade}</div>
      <div class="grade-score">Score: ${score}/100</div>
      <div class="grade-breakdown">
        ${breakdown.map(b => `<div class="grade-item">${b.label}: <b>${b.value}</b></div>`).join('')}
      </div>
    </div>`;
}

// Example:
// renderDraftGrade('A', 92, [
//   { label: 'Value', value: '+3.2 wins' },
//   { label: 'Needs', value: '3/3 filled' },
//   { label: 'Best pick', value: 'Round 2' },
// ], 'draftGradeContainer');
```

---

## Proposal 30: Contract Negotiation (Visual)

### CSS

```css
.contract-negotiation {
  padding: 12px;
  border-radius: 8px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
}
.contract-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.contract-player {
  font-weight: 700;
  font-size: 1.1em;
}
.contract-position {
  font-size: 0.8em;
  color: var(--sub, #8b92a8);
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--panel, #151922);
}
.contract-terms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.contract-term {
  padding: 8px;
  border-radius: 6px;
  background: var(--panel, #151922);
  border: 1px solid var(--border, #2a3142);
}
.contract-term label {
  font-size: 0.7em;
  color: var(--sub, #8b92a8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.contract-term .value {
  font-size: 1.1em;
  font-weight: 700;
  color: var(--team-primary, #4f8cff);
}
.contract-bar {
  height: 6px;
  background: var(--border, #2a3142);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 4px;
}
.contract-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 300ms ease;
}
.contract-bar-fill.fair { background: var(--good, #22c55e); }
.contract-bar-fill.over { background: var(--bad, #ef4444); }
.contract-bar-fill.under { background: var(--team-accent, #ffd700); }
.contract-actions {
  display: flex;
  gap: 8px;
}
.contract-btn {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85em;
  cursor: pointer;
  border: 1px solid var(--border, #2a3142);
  background: var(--panel, #151922);
  color: var(--text, #e8eaf0);
  transition: all 150ms ease;
}
.contract-btn:hover { border-color: var(--team-primary); }
.contract-btn.accept { background: var(--team-primary); color: #fff; border-color: var(--team-primary); }
.contract-btn.reject { background: var(--bad, #ef4444); color: #fff; border-color: var(--bad, #ef4444); }
```

### JS

```js
function renderContractNegotiation(player, offer, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const fairPct = Math.min(100, Math.max(0, (offer.years / 5) * 100));
  const barClass = offer.fair ? 'fair' : offer.overpay ? 'over' : 'under';
  el.innerHTML = `
    <div class="contract-negotiation">
      <div class="contract-header">
        <span class="contract-player">${player.name}</span>
        <span class="contract-position">${player.pos} · ${player.ovr} OVR</span>
      </div>
      <div class="contract-terms">
        <div class="contract-term">
          <label>Years</label>
          <div class="value">${offer.years}</div>
        </div>
        <div class="contract-term">
          <label>APY</label>
          <div class="value">$${offer.apy}M</div>
        </div>
        <div class="contract-term">
          <label>Guaranteed</label>
          <div class="value">$${offer.guaranteed}M</div>
        </div>
        <div class="contract-term">
          <label>Fairness</label>
          <div class="value">${offer.fair ? 'Fair' : offer.overpay ? 'Overpay' : 'Underpay'}</div>
          <div class="contract-bar"><div class="contract-bar-fill ${barClass}" style="width:${fairPct}%"></div></div>
        </div>
      </div>
      <div class="contract-actions">
        <button class="contract-btn accept" onclick="acceptContract()">Accept</button>
        <button class="contract-btn reject" onclick="rejectContract()">Reject</button>
        <button class="contract-btn" onclick="counterOffer()">Counter</button>
      </div>
    </div>`;
}
```

---

## Proposal 31: Scouting Report (Radar Chart)

### CSS

```css
.scouting-report {
  padding: 12px;
  border-radius: 8px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
}
.scouting-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.scouting-name {
  font-weight: 700;
  font-size: 1.1em;
}
.scouting-pos {
  font-size: 0.8em;
  color: var(--sub, #8b92a8);
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--panel, #151922);
}
.scouting-radar {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.scouting-grades {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-top: 12px;
}
.scouting-grade {
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--panel, #151922);
  font-size: 0.8em;
}
.scouting-grade .grade-label { color: var(--sub, #8b92a8); }
.scouting-grade .grade-value { font-weight: 700; color: var(--team-primary, #4f8cff); }
.scouting-summary {
  margin-top: 12px;
  font-size: 0.8em;
  color: var(--sub, #8b92a8);
  line-height: 1.4;
  padding: 8px;
  border-radius: 6px;
  background: var(--panel, #151922);
  border-left: 3px solid var(--team-primary, #4f8cff);
}
```

### JS

```js
function renderScoutingReport(player, grades, summary, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const labels = Object.keys(grades);
  const values = Object.values(grades);
  const n = labels.length;
  const cx = 100, cy = 100, r = 80;
  let points = '';
  let gridLines = '';
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i > 0) {
      const prevAngle = (Math.PI * 2 * (i-1) / n) - Math.PI / 2;
      const px = cx + r * Math.cos(prevAngle);
      const py = cy + r * Math.sin(prevAngle);
      gridLines += `<line x1="${px}" y1="${py}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />`;
    }
    // Value point
    const valR = r * (values[i] / 100);
    const vx = cx + valR * Math.cos(angle);
    const vy = cy + valR * Math.sin(angle);
    points += `${vx},${vy} `;
  }
  // Close the polygon
  const firstAngle = -Math.PI / 2;
  const firstValR = r * (values[0] / 100);
  const firstVx = cx + firstValR * Math.cos(firstAngle);
  const firstVy = cy + firstValR * Math.sin(firstAngle);
  points += `${firstVx},${firstVy}`;

  el.innerHTML = `
    <div class="scouting-report">
      <div class="scouting-header">
        <span class="scouting-name">${player.name}</span>
        <span class="scouting-pos">${player.pos} · ${player.ovr} OVR</span>
      </div>
      <svg class="scouting-radar" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        ${gridLines}
        <polygon points="${points}" fill="var(--team-primary, #4f8cff)" fill-opacity="0.2" stroke="var(--team-primary, #4f8cff)" stroke-width="2" />
        ${labels.map((l, i) => {
          const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
          const x = cx + (r + 12) * Math.cos(angle);
          const y = cy + (r + 12) * Math.sin(angle);
          return `<text x="${x}" y="${y}" text-anchor="middle" fill="var(--sub, #8b92a8)" font-size="8">${l}</text>`;
        }).join('')}
      </svg>
      <div class="scouting-grades">
        ${labels.map((l, i) => `<div class="scouting-grade"><span class="grade-label">${l}</span><span class="grade-value">${values[i]}</span></div>`).join('')}
      </div>
      <div class="scouting-summary">${summary}</div>
    </div>`;
}

// Example:
// renderScoutingReport(
//   { name: 'Patrick Mahomes', pos: 'QB', ovr: 99 },
//   { Speed: 85, Strength: 68, Agility: 87, Awareness: 99, Arm: 99, Accuracy: 97 },
//   'Elite arm talent. Best QB in the league. Franchise cornerstone.',
//   'scoutingContainer'
// );
```

---

## Proposal 32: Rivalry Tracker

### CSS

```css
.rivalry-tracker {
  padding: 12px;
  border-radius: 8px;
  background: var(--panel2, #1a1f2e);
  border: 1px solid var(--border, #2a3142);
}
.rivalry-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.rivalry-team {
  flex: 1;
  text-align: center;
  font-weight: 700;
  font-size: 0.9em;
}
.rivalry-team.user { color: var(--team-primary, #4f8cff); }
.rivalry-team.opp { color: var(--opp-primary, #8b92a8); }
.rivalry-vs {
  font-size: 0.7em;
  color: var(--sub, #8b92a8);
  font-weight: 700;
}
.rivalry-record {
  text-align: center;
  font-size: 1.4em;
  font-weight: 900;
  margin: 8px 0;
  color: var(--text, #e8eaf0);
}
.rivalry-games {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.rivalry-game {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75em;
  background: var(--panel, #151922);
}
.rivalry-game.win { border-left: 3px solid var(--good, #22c55e); }
.rivalry-game.loss { border-left: 3px solid var(--bad, #ef4444); }
.rivalry-game.tie { border-left: 3px solid var(--sub, #8b92a8); }
.rivalry-game .rg-week { color: var(--sub, #8b92a8); min-width: 40px; }
.rivalry-game .rg-score { font-weight: 700; font-variant-numeric: tabular-nums; }
.rivalry-streak {
  text-align: center;
  font-size: 0.75em;
  color: var(--sub, #8b92a8);
  margin-top: 8px;
}
```

### JS

```js
function renderRivalryTracker(userTeam, oppTeam, games, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const wins = games.filter(g => g.result === 'W').length;
  const losses = games.filter(g => g.result === 'L').length;
  const ties = games.filter(g => g.result === 'T').length;
  // Calculate streak
  let streak = 0, streakType = '';
  for (let i = games.length - 1; i >= 0; i--) {
    if (i === games.length - 1) { streakType = games[i].result; streak = 1; }
    else if (games[i].result === streakType) streak++;
    else break;
  }
  el.innerHTML = `
    <div class="rivalry-tracker">
      <div class="rivalry-header">
        <span class="rivalry-team user">${userTeam}</span>
        <span class="rivalry-vs">VS</span>
        <span class="rivalry-team opp">${oppTeam}</span>
      </div>
      <div class="rivalry-record">${wins}-${losses}${ties ? '-' + ties : ''}</div>
      <div class="rivalry-games">
        ${games.map(g => `
          <div class="rivalry-game ${g.result === 'W' ? 'win' : g.result === 'L' ? 'loss' : 'tie'}">
            <span class="rg-week">Wk ${g.week}</span>
            <span class="rg-score">${g.userScore}-${g.oppScore}</span>
            <span style="color:var(--sub)">${g.result === 'W' ? 'W' : g.result === 'L' ? 'L' : 'T'}</span>
          </div>
        `).join('')}
      </div>
      <div class="rivalry-streak">${streakType === 'W' ? 'Win' : streakType === 'L' ? 'Loss' : 'Tie'} streak: ${streak}</div>
    </div>`;
}
```

---

## Implementation Priority (updated — all 32 proposals)

1. **Team color theming** (CSS + JS) — highest visual impact
2. **Championship banner + confetti** — already proposed, just needs wiring
3. **Tab transitions** (CSS-only) — low risk, instant polish
4. **Heat map calendar** — simple CSS grid, high info density
5. **Player card flip** — high engagement, moderate effort
6. **Toast notifications** — moderate effort, high value
7. **Dark/light mode toggle** — tokens exist, just needs switch + persistence
8. **Micro-interactions** (button press, hover lift, focus rings) — CSS-only polish
9. **Score bug + play-by-play ticker** — high value for game day feel
10. **Achievement badges** — high engagement, moderate effort
11. **Loading skeletons** — low effort, better UX
12. **Mobile bottom nav** — moderate effort, mobile UX improvement
13. **Opponent color in matchup preview** — moderate effort, high visual impact
14. **Weather overlay effects** — moderate effort, high atmosphere
15. **Field graphic (SVG)** — moderate effort, high visual impact
16. **Leaderboard podium** — moderate effort, high engagement
17. **Animated season ticker** — low effort, nice-to-have
18. **Sticky sub-header** — low effort, nice-to-have
19. **Dynamic favicon** — low effort, nice touch
20. **Ring ceremony** — low priority, post-Super Bowl only
21. **Trophy case page** — low priority, post-season
22. **Print/export** — low priority, nice-to-have
23. **Audio** — lowest priority, optional
24. **Draft grade (post-draft)** — moderate effort, high value
25. **Contract negotiation (visual)** — moderate effort, high engagement
26. **Scouting report (radar chart)** — moderate effort, high value
27. **Rivalry tracker** — moderate effort, medium value
28. **Injury report (visual)** — moderate effort, medium value
29. **Draft day war room** — high effort, high value
30. **Playoff bracket animation** — moderate effort, high visual impact

## Notes for Claude (Architect)

- All CSS uses existing CSS variables (`--accent`, `--team-primary`, etc.) — no new color literals except team colors from `figma/team-colours.json`
- All JS is vanilla — no framework dependencies
- `prefers-reduced-motion` is respected in all animations
- Team colors are REPORTED (from GPT table, Owner-supplied) — not VERIFIED against NFL brand guides
- Chargers letter contrast fails 4.5:1 (4.48) — flag for Architect decision
- 4 stripe mismatches (Denver, Houston, Pittsburgh, New Orleans) — flag for Architect decision
- No product file edits made — this is a proposal for review
- Proposal 1 (team-color-theming.md) covers the full 32-team table and mermaid diagram
- Proposal 2 (V23-aesthetics-code-proposal.md) adds 8 proposals with code
- Proposal 3 (V23-aesthetics-code-proposal-2.md) adds 8 more proposals with code
- Proposal 4 (V23-aesthetics-code-proposal-3.md) adds 8 more proposals with code
- Proposal 5 (V23-aesthetics-plug-and-play.md) consolidates all 25 proposals into 5 drop-in blocks
- Proposal 6 (this file) adds 7 more proposals with code
- Combined, these 6 proposals cover the full brainstorm (32 items)

**Label:** VERIFIED (CSS/JS syntax, variable names, animation patterns). REPORTED (team color values from GPT table). INFERRED (visual impact estimates). UNKNOWN (whether contrast/stripe issues are intentional design choices).
