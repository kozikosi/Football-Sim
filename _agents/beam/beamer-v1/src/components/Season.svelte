<script>
  const games = [
    { wk:1, opp:'@ Broncos', res:'W 27-20', fill:'user' },
    { wk:2, opp:'vs Raiders', res:'W 31-17', fill:'user' },
    { wk:3, opp:'@ Chargers', res:'L 20-24', fill:'opp' },
    { wk:4, opp:'vs Broncos', res:'W 28-14', fill:'user' },
  ];
</script>

<section>
  <div class="card floaty">
    <div class="row">
      <span style="font-weight:700;font-size:.9rem">Schedule — KC Chiefs</span>
      <span style="font-size:.7rem;color:var(--sub)">9-4 · 1st AFC West</span>
    </div>
    <div class="sched">
      {#each games as g}
        <div class="grow {g.fill}">
          <span class="wk">Wk {g.wk}</span>
          <span class="opp">{g.opp}</span>
          <span class="res">{g.res}</span>
        </div>
      {/each}
    </div>
    <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
      <button class="btn primary">Play the Broncos</button>
      <button class="btn">Sim Season</button>
    </div>
  </div>
  <div class="card floaty">
    <div style="font-weight:700;font-size:.9rem;margin-bottom:8px">Standings — AFC West</div>
    <table>
      <thead><tr><th>Team</th><th>W</th><th>L</th><th>PF</th><th>PA</th></tr></thead>
      <tbody>
        <tr class="me"><td>KC</td><td>9</td><td>4</td><td>312</td><td>248</td></tr>
        <tr><td>DEN</td><td>8</td><td>5</td><td>280</td><td>260</td></tr>
        <tr><td>LAC</td><td>7</td><td>6</td><td>265</td><td>270</td></tr>
        <tr><td>LV</td><td>3</td><td>10</td><td>210</td><td>320</td></tr>
      </tbody>
    </table>
  </div>
</section>

<style>
  .card{background:var(--panel);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:20px;padding:16px;margin-bottom:12px;box-shadow:0 8px 32px rgba(0,0,0,.3);transition:transform var(--motion),box-shadow var(--motion)}
  .card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
  .row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .sched{display:flex;flex-direction:column;gap:4px}
  .grow{display:flex;gap:10px;align-items:center;padding:8px 10px;border-radius:10px;background:var(--panel2);border:1px solid var(--border);transition:all var(--motion)}
  .grow.user{border-left:3px solid var(--good)}
  .grow.opp{border-left:3px solid var(--bad)}
  .wk{font-size:.7rem;color:var(--muted);width:36px}
  .opp{flex:1;font-size:.8rem}
  .res{font-weight:700;font-size:.8rem;color:var(--gold)}
  .btn{padding:8px 14px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:8px;cursor:pointer;font-size:.75rem;transition:all var(--motion)}
  .btn:hover{border-color:var(--border-hover)}
  .btn.primary{background:linear-gradient(135deg,var(--team),var(--team2));color:#0d0a0e;border:none;font-weight:700}
  table{width:100%;border-collapse:collapse;font-size:.78rem;margin-top:4px}
  th,td{padding:6px 4px;border-bottom:1px solid var(--border);text-align:center}
  th{color:var(--sub);font-weight:600;font-size:.7rem;text-transform:uppercase}
  td:first-child{text-align:left}
  tr.me td{background:rgba(212,175,55,.08);font-weight:700;color:var(--gold)}
</style>
