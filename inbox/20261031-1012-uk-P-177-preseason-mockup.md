<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>P-177 Preseason Layout Mock-up</title>
<style>
:root {
  --bg: #faf9f7;
  --text: #1a1a1a;
  --muted: #6b6b6b;
  --accent: #d4af37;
  --accent-weak: #e8d5a3;
  --card: #ffffff;
  --border: #e5e0d8;
  --good: #2d7d2d;
  --bad: #b83a3a;
  --rose: #f0dce2;
  --rose-weak: #f7edee;
  --shadow: rgba(0,0,0,0.06);
  --shadow-strong: rgba(0,0,0,0.1);
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0d0a0e;
    --text: #f5f0f0;
    --muted: #9a8a8a;
    --accent: #d4af37;
    --accent-weak: #3d3520;
    --card: #1a1518;
    --border: #2a2226;
    --good: #4ade80;
    --bad: #f87171;
    --rose: #2d1a1f;
    --rose-weak: #1f1215;
    --shadow: rgba(0,0,0,0.3);
    --shadow-strong: rgba(0,0,0,0.5);
  }
}
* { box-sizing: border-box; }
body { margin:0; font-family: system-ui, -apple-system, sans-serif; background:var(--bg); color:var(--text); line-height:1.5; }
.container { max-width: 900px; margin: 0 auto; padding: 24px 16px; }

/* Header */
.preseason-header {
  display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border);
}
.preseason-header .badge { text-transform: uppercase; letter-spacing: .08em; font-size: 0.65rem; color: var(--muted); font-weight: 600; }
.preseason-header h1 { margin: 4px 0 0; font-size: 1.5rem; font-weight: 700; }
.preseason-header .sub { color: var(--muted); font-size: 0.85rem; margin-top: 4px; }
.begin-btn { background: var(--accent); color: #0d0a0e; border: none; padding: 12px 28px; font-weight: 700; border-radius: 999px; cursor: pointer; font-size: 0.875rem; transition: transform .15s, box-shadow .15s; }
.begin-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(212,175,55,0.3); }
.begin-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

/* Section Panel */
.panel { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px var(--shadow); }
.panel h2 { margin: 0 0 12px; font-size: 1.05rem; font-weight: 700; }
.panel h3 { margin: 16px 0 8px; font-size: 0.9rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }

/* Selected Line */
.selected-line { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; padding: 12px 16px; background: var(--rose-weak); border: 1px solid var(--rose); border-radius: 8px; font-size: 0.85rem; }
.selected-line .label { font-weight: 600; color: var(--muted); }
.selected-line .value { font-weight: 700; color: var(--text); }
.selected-line .value.accent { color: var(--accent); }

/* Why This Style */
.why-style { margin-bottom: 16px; }
.why-style .reason { padding: 12px 16px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; font-size: 0.875rem; line-height: 1.6; }
.why-style .reason strong { color: var(--accent); }

/* Offense/Defense Tables */
.style-tables { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 16px; }
.style-table { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
.style-table caption { padding: 10px 12px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); background: var(--rose-weak); border-bottom: 1px solid var(--border); text-align: left; }
.style-table table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
.style-table th, .style-table td { padding: 8px 10px; text-align: left; border-bottom: 1px solid var(--border); }
.style-table th { font-weight: 600; color: var(--muted); background: var(--card); position: sticky; top: 0; }
.style-table tr:last-child td { border-bottom: none; }
.style-table .style-name { font-weight: 600; }
.style-table .win-pct { font-variant-numeric: tabular-nums; font-weight: 600; }
.style-table .win-pct.good { color: var(--good); }
.style-table .win-pct.bad { color: var(--bad); }
.style-table .rec-badge { font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; background: var(--accent-weak); color: #0d0a0e; font-weight: 600; }
@media (prefers-color-scheme: dark) {
  .style-table .rec-badge { background: var(--accent); color: #0d0a0e; }
}

/* Strongest / Weakest Units Side by Side */
.units-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.unit-panel { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px; }
.unit-panel h4 { margin: 0 0 12px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; }
.unit-panel.strong h4 { color: var(--good); }
.unit-panel.weak h4 { color: var(--bad); }
.unit-list { list-style: none; padding: 0; margin: 0; }
.unit-list li { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 0.85rem; }
.unit-list li:last-child { border-bottom: none; }
.unit-list .unit-name { font-weight: 500; }
.unit-list .unit-rank { font-variant-numeric: tabular-nums; font-weight: 600; }
.unit-list .unit-rank.good { color: var(--good); }
.unit-list .unit-rank.bad { color: var(--bad); }
.unit-list .unit-grade { font-variant-numeric: tabular-nums; color: var(--muted); font-size: 0.78rem; }

/* Top 3 Setups as Cards */
.setups-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 16px; }
.setup-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px; transition: transform .15s, box-shadow .15s, border-color .15s; position: relative; overflow: hidden; }
.setup-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent), var(--rose)); opacity: 0; transition: opacity .2s; }
.setup-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px var(--shadow-strong); border-color: var(--accent-weak); }
.setup-card:hover::before { opacity: 1; }
.setup-card.recommended { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.setup-card.recommended::before { opacity: 1; }
.setup-card .rank { position: absolute; top: 12px; right: 12px; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; }
.setup-card .rank.1 { background: var(--accent); color: #0d0a0e; }
.setup-card .rank.2 { background: var(--accent-weak); color: #0d0a0e; }
.setup-card .rank.3 { background: var(--border); color: var(--text); }
.setup-card .setup-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 4px; }
.setup-card .setup-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; margin-bottom: 10px; }
.setup-card .setup-stats { display: flex; gap: 12px; font-size: 0.7rem; }
.setup-card .stat { display: flex; flex-direction: column; }
.setup-card .stat-label { text-transform: uppercase; letter-spacing: .04em; color: var(--muted); font-weight: 600; }
.setup-card .stat-value { font-weight: 700; font-variant-numeric: tabular-nums; }
.setup-card .stat-value.good { color: var(--good); }
.setup-card .stat-value.bad { color: var(--bad); }

/* Bubbles Row - "What do these terms mean" */
.bubbles-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin: 20px 0; }
.bubble { padding: 10px 18px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all .2s; border: 1px solid var(--border); background: var(--card); color: var(--text); white-space: nowrap; box-shadow: 0 1px 2px var(--shadow); }
.bubble:hover { transform: translateY(-2px); box-shadow: 0 4px 12px var(--shadow-strong); border-color: var(--accent); }
.bubble:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.bubble.personnel { background: linear-gradient(135deg, var(--rose-weak), #fdf6f8); border-color: var(--rose); }
.bubble.style { background: linear-gradient(135deg, var(--accent-weak), #fff8e8); border-color: var(--accent); }
@media (prefers-color-scheme: dark) {
  .bubble.personnel { background: linear-gradient(135deg, #2d1a1f, #1a0d10); }
  .bubble.style { background: linear-gradient(135deg, #3d3520, #1a1510); }
}

/* Bottom Line: Flex Guide + Group Scores */
.bottom-line { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; padding-top: 16px; border-top: 1px solid var(--border); margin-top: 8px; font-size: 0.85rem; }
.bottom-line .left { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.bottom-line .link { color: var(--accent); text-decoration: none; font-weight: 600; transition: opacity .2s; }
.bottom-line .link:hover { opacity: 0.8; text-decoration: underline; }
.bottom-line .link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }
.bottom-line .right { color: var(--muted); font-weight: 500; }

/* Fade animations */
@keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
.fade-in { animation: fadeInUp 0.5s ease-out forwards; }
.fade-in-delay-1 { animation-delay: 0.1s; opacity: 0; }
.fade-in-delay-2 { animation-delay: 0.2s; opacity: 0; }
.fade-in-delay-3 { animation-delay: 0.3s; opacity: 0; }
.fade-in-delay-4 { animation-delay: 0.4s; opacity: 0; }
.fade-in-delay-5 { animation-delay: 0.5s; opacity: 0; }
.fade-in-delay-6 { animation-delay: 0.6s; opacity: 0; }
.fade-in-delay-7 { animation-delay: 0.7s; opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .fade-in-delay-5, .fade-in-delay-6, .fade-in-delay-7 { animation: none; opacity: 1; }
}

/* No white text enforcement */
:root { --text-on-accent: #0d0a0e; }
.begin-btn { color: var(--text-on-accent) !important; }
.rec-badge { color: var(--text-on-accent) !important; }
.rank.1, .rank.2, .rank.3 { color: var(--text-on-accent) !important; }
.bubble { color: var(--text) !important; }
</style>
</head>
<body>
<div class="container">
  <!-- Header -->
  <header class="preseason-header fade-in">
    <div>
      <div class="badge">Preseason</div>
      <h1>Set up the CHIEFS before Week 1</h1>
      <p class="sub">Three decisions, all optional: who plays where, your coaching philosophy, and your game-day aggressiveness.</p>
    </div>
    <button class="begin-btn fade-in-delay-1">Begin the season →</button>
  </header>

  <!-- Section 1: Lineup -->
  <section class="panel fade-in-delay-2">
    <h2>1. Lineup, flexes and returner</h2>
    <details style="margin-bottom:12px;">
      <summary style="cursor:pointer;font-weight:700;">New to flexing? Read this first</summary>
      <div style="margin-top:10px;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;font-size:0.85rem;line-height:1.6;">
        A <b>flex</b> moves a starter to a related slot (e.g. WR3 → Slot, LB3 → Nickel). The player keeps his OVR but takes a small penalty (−5 to −15) because the role isn't his natural one. You can flex anyone at any time — even mid-season — but the penalty stays. QB may only flex to FS at −10.
      </div>
    </details>
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:16px;font-size:0.85rem;">
      <strong>Lineup Editor</strong> (interactive in product) — shows depth chart with drag-to-flex affordances.
    </div>
  </section>

  <!-- Section 2: Coaching Philosophy -->
  <section class="panel fade-in-delay-3">
    <h2>2. Coaching philosophy</h2>
    <p style="margin:4px 0 12px;color:var(--muted);font-size:0.9rem;">Your coaching philosophy is how your team likes to play by default, on offense and on defense. It names your team's style all season, and opponents scout it.</p>

    <!-- Selected Line -->
    <div class="selected-line fade-in-delay-4">
      <span class="label">Selected:</span>
      <span class="value accent">West Coast</span> <span class="value">(Short, rhythmic passing; protects the QB)</span>
      <span class="label">·</span>
      <span class="value accent">4-3 Balanced</span> <span class="value">(Sound gap control; lets the front four hunt)</span>
    </div>

    <!-- Why This Style -->
    <div class="why-style fade-in-delay-5">
      <div class="reason">
        <strong>Why we recommend Auto.</strong> Auto tests every offensive setup (15 combinations of personnel and run/pass lean) and every defensive one (6) against an average opponent, with <em>your</em> lineup, and keeps whichever gives the best chance of winning. It also re-checks each week against the actual opponent. Picking something else is allowed, and the tables below show what it costs on paper, but it will rarely win more games than the math's pick.
      </div>
    </div>

    <!-- Offense/Defense Tables -->
    <div class="style-tables fade-in-delay-6">
      <div class="style-table">
        <caption>Offense: every style with your roster</caption>
        <table>
          <thead><tr><th>Style</th><th>Personnel</th><th>Lean</th><th>Proj. Win%</th><th></th></tr></thead>
          <tbody>
            <tr><td class="style-name">West Coast</td><td>11 / 12 / 21</td><td>Pass +2</td><td class="win-pct good">58.2%</td><td><span class="rec-badge">AUTO</span></td></tr>
            <tr><td class="style-name">Spread</td><td>10 / 11 / 22</td><td>Pass +4</td><td class="win-pct">56.7%</td><td></td></tr>
            <tr><td class="style-name">Air Raid</td><td>10 / 10 / 23</td><td>Pass +6</td><td class="win-pct">54.1%</td><td></td></tr>
            <tr><td class="style-name">Run Heavy</td><td>22 / 21 / 10</td><td>Run +4</td><td class="win-pct bad">51.3%</td><td></td></tr>
            <tr><td class="style-name">Play Action</td><td>12 / 21 / 11</td><td>Balanced</td><td class="win-pct">55.8%</td><td></td></tr>
            <tr><td class="style-name">Pistol</td><td>21 / 11 / 12</td><td>Run +1</td><td class="win-pct">53.4%</td><td></td></tr>
          </tbody>
        </table>
      </div>
      <div class="style-table">
        <caption>Defense: every style with your roster</caption>
        <table>
          <thead><tr><th>Style</th><th>Personnel</th><th>Lean</th><th>Proj. Win%</th><th></th></tr></thead>
          <tbody>
            <tr><td class="style-name">4-3 Balanced</td><td>Base / Nickel / Dime</td><td>Neutral</td><td class="win-pct good">57.9%</td><td><span class="rec-badge">AUTO</span></td></tr>
            <tr><td class="style-name">3-4 Zone</td><td>Base / Nickel / Dime</td><td>Pass +1</td><td class="win-pct">56.2%</td><td></td></tr>
            <tr><td class="style-name">4-3 Press</td><td>Base / Nickel / Dime</td><td>Aggressive</td><td class="win-pct">55.1%</td><td></td></tr>
            <tr><td class="style-name">3-4 Blitz</td><td>Base / Nickel / Dime</td><td>Aggressive</td><td class="win-pct bad">53.8%</td><td></td></tr>
            <tr><td class="style-name">Nickel Heavy</td><td>Nickel / Dime / Quarter</td><td>Pass +3</td><td class="win-pct">54.5%</td><td></td></tr>
            <tr><td class="style-name">Run Stop</td><td>Base / Big Nickel / 6-1</td><td>Run +2</td><td class="win-pct">52.9%</td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Strongest / Weakest Units Side by Side -->
    <div class="units-compare fade-in-delay-7">
      <div class="unit-panel strong">
        <h4>Strongest Units</h4>
        <ul class="unit-list">
          <li><span class="unit-name">Pass Protection (OL)</span><span class="unit-rank good">#3</span><span class="unit-grade">Grade: 84.2</span></li>
          <li><span class="unit-name">Receiving Corps</span><span class="unit-rank good">#5</span><span class="unit-grade">Grade: 82.7</span></li>
          <li><span class="unit-name">Pass Rush</span><span class="unit-rank good">#7</span><span class="unit-grade">Grade: 80.1</span></li>
        </ul>
      </div>
      <div class="unit-panel weak">
        <h4>Weakest Units</h4>
        <ul class="unit-list">
          <li><span class="unit-name">Run Blocking (OL)</span><span class="unit-rank bad">#28</span><span class="unit-grade">Grade: 62.4</span></li>
          <li><span class="unit-name">Run Defense</span><span class="unit-rank bad">#25</span><span class="unit-grade">Grade: 65.8</span></li>
          <li><span class="unit-name">Kicker</span><span class="unit-rank bad">#30</span><span class="unit-grade">Grade: 58.3</span></li>
        </ul>
      </div>
    </div>

    <!-- Top 3 Setups as Cards -->
    <h3 style="margin:16px 0 8px;text-transform:uppercase;letter-spacing:.04em;font-size:0.75rem;color:var(--muted);">Top 3 Recommended Setups</h3>
    <div class="setups-grid fade-in-delay-7">
      <div class="setup-card recommended">
        <span class="rank 1">1</span>
        <div class="setup-name">West Coast + 4-3 Balanced</div>
        <div class="setup-desc">The math's pick. Short passing protects Mahomes; balanced defense keeps opponents honest.</div>
        <div class="setup-stats">
          <div class="stat"><span class="stat-label">Off Win%</span><span class="stat-value good">58.2%</span></div>
          <div class="stat"><span class="stat-label">Def Win%</span><span class="stat-value good">57.9%</span></div>
          <div class="stat"><span class="stat-label">Combined</span><span class="stat-value good">58.1%</span></div>
        </div>
      </div>
      <div class="setup-card">
        <span class="rank 2">2</span>
        <div class="setup-name">Spread + 4-3 Balanced</div>
        <div class="setup-desc">More vertical threats; slight dip in protection but opens big-play upside.</div>
        <div class="setup-stats">
          <div class="stat"><span class="stat-label">Off Win%</span><span class="stat-value">56.7%</span></div>
          <div class="stat"><span class="stat-label">Def Win%</span><span class="stat-value good">57.9%</span></div>
          <div class="stat"><span class="stat-label">Combined</span><span class="stat-value">57.3%</span></div>
        </div>
      </div>
      <div class="setup-card">
        <span class="rank 3">3</span>
        <div class="setup-name">Play Action + 4-3 Press</div>
        <div class="setup-desc">Leverages play-action off run threat; press coverage forces quick decisions.</div>
        <div class="setup-stats">
          <div class="stat"><span class="stat-label">Off Win%</span><span class="stat-value">55.8%</span></div>
          <div class="stat"><span class="stat-label">Def Win%</span><span class="stat-value">55.1%</span></div>
          <div class="stat"><span class="stat-label">Combined</span><span class="stat-value">55.5%</span></div>
        </div>
      </div>
    </div>

    <!-- What do these terms mean? - Bubbles Row -->
    <div class="bubbles-row fade-in-delay-7" role="group" aria-label="Term definitions">
      <button class="bubble personnel" type="button" aria-expanded="false" aria-controls="terms-personnel">Personnel Packages</button>
      <button class="bubble style" type="button" aria-expanded="false" aria-controls="terms-style">Offensive Styles</button>
      <button class="bubble style" type="button" aria-expanded="false" aria-controls="terms-defstyle">Defensive Styles</button>
      <button class="bubble personnel" type="button" aria-expanded="false" aria-controls="terms-flex">Flex Rules</button>
      <button class="bubble style" type="button" aria-expanded="false" aria-controls="terms-aggr">Aggressiveness</button>
    </div>

    <!-- Collapsible term definitions (hidden in mock-up, shown as placeholder) -->
    <div id="terms-personnel" style="display:none;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;margin-top:8px;font-size:0.85rem;">Personnel package definitions...</div>
    <div id="terms-style" style="display:none;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;margin-top:8px;font-size:0.85rem;">Offensive style definitions...</div>
    <div id="terms-defstyle" style="display:none;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;margin-top:8px;font-size:0.85rem;">Defensive style definitions...</div>
    <div id="terms-flex" style="display:none;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;margin-top:8px;font-size:0.85rem;">Flex rules...</div>
    <div id="terms-aggr" style="display:none;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;margin-top:8px;font-size:0.85rem;">Aggressiveness settings...</div>

    <!-- Aggressiveness (compact) -->
    <h3 style="margin:16px 0 8px;text-transform:uppercase;letter-spacing:.04em;font-size:0.75rem;color:var(--muted);">3. Game-day aggressiveness</h3>
    <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;margin-bottom:8px;">
      <label style="display:flex;flex-direction:column;gap:4px;font-size:0.8rem;">
        <span style="font-weight:600;color:var(--muted);">2-Pt Conversions</span>
        <select style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--card);font-size:0.85rem;">
          <option>Auto (recommended)</option>
          <option>Aggressive</option>
          <option>Conservative</option>
        </select>
      </label>
      <label style="display:flex;flex-direction:column;gap:4px;font-size:0.8rem;">
        <span style="font-weight:600;color:var(--muted);">4th Down</span>
        <select style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--card);font-size:0.85rem;">
          <option>Auto (recommended)</option>
          <option>Aggressive</option>
          <option>Conservative</option>
        </select>
      </label>
    </div>
  </section>

  <!-- Bottom Line: Flex Guide + Group Scores -->
  <div class="bottom-line fade-in-delay-7">
    <div class="left">
      <a href="#" class="link">New to flexing? Read this first</a>
      <span aria-hidden="true">·</span>
      <a href="#" class="link">Group scores</a>
    </div>
    <div class="right">Group scores: Offense 78.4 · Defense 74.1 · Special Teams 62.3</div>
  </div>
</div>

<script>
// Bubble toggle behavior (mock-up only)
document.querySelectorAll('.bubble').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.getAttribute('aria-controls'));
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    if (target) target.style.display = expanded ? 'none' : 'block';
  });
});
</script>
</body>
</html>