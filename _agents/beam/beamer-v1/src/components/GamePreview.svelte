<script>
  const matchups = [
    { slot:'QB', left:{name:'Mahomes',ovr:99}, right:{name:'Smith',ovr:84}, leftWin:true },
    { slot:'RB1', left:{name:'Pacheco',ovr:84}, right:{name:'Walker',ovr:86}, leftWin:false },
    { slot:'TE1', left:{name:'Kelce',ovr:91}, right:{name:'Fant',ovr:78}, leftWin:true },
    { slot:'WR1', left:{name:'Rice',ovr:88}, right:{name:'Metcalf',ovr:91}, leftWin:false },
  ];
</script>

<section>
  <div class="card floaty">
    <div class="row">
      <span style="font-weight:700;font-size:.9rem">Game Preview — KC vs SEA</span>
      <span style="font-size:.7rem;color:var(--sub)">Week 14 · Home</span>
    </div>
    <div class="score">
      <div class="sbox user"><div class="tn">Chiefs</div><div class="sc">24</div><div class="dt">+3.2 WINS</div></div>
      <div class="sbox opp"><div class="tn">Seahawks</div><div class="sc">21</div><div class="dt">+1.8 WINS</div></div>
    </div>
    <table>
      <thead><tr><th style="text-align:left">KC</th><th>Pos</th><th style="text-align:right">SEA</th></tr></thead>
      <tbody>
        {#each matchups as m}
          <tr>
            <td class:win={m.leftWin}>{m.left.name} ({m.left.ovr})</td>
            <td class="pos">{m.slot}</td>
            <td class:win={!m.leftWin} style="text-align:right">{m.right.name} ({m.right.ovr})</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <p class="note">Effective ratings (flex penalty applied). Winner in gold with foil shimmer. 85+ shimmer in team colour.</p>
    <div class="chips">
      <span class="chip">Strong: QB play</span>
      <span class="chip weak">Weak: TE depth</span>
      <span class="chip">+3 WINS</span>
    </div>
  </div>
</section>

<style>
  .card{background:var(--panel);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:20px;padding:16px;margin-bottom:12px;box-shadow:0 8px 32px rgba(0,0,0,.3);transition:transform var(--motion),box-shadow var(--motion)}
  .card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
  .row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .score{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0}
  .sbox{flex:1;min-width:120px;border-radius:14px;padding:12px 14px;color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.2)}
  .sbox.user{background:linear-gradient(135deg,var(--team),var(--team2))}
  .sbox.opp{background:linear-gradient(135deg,#003594,#869397)}
  .sbox .tn{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;opacity:.9}
  .sbox .sc{font-size:1.8rem;font-weight:900}
  .sbox .dt{margin-top:4px;font-size:.7rem;opacity:.9}
  table{width:100%;border-collapse:collapse;font-size:.8rem;margin-top:8px}
  th,td{padding:6px 4px;border-bottom:1px solid var(--border)}
  th{text-align:center;color:var(--sub);font-weight:600;font-size:.7rem;text-transform:uppercase;letter-spacing:.04em}
  td:first-child{text-align:left}td:last-child{text-align:right}
  .win{font-weight:700;color:var(--gold)}
  .pos{text-align:center;color:var(--sub);font-size:.7rem}
  .note{color:var(--sub);font-size:.7rem;margin-top:6px;font-style:italic}
  .chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
  .chip{padding:2px 8px;border-radius:4px;font-size:.7rem;background:rgba(212,175,55,.12);color:var(--gold)}
  .chip.weak{background:rgba(255,107,107,.12);color:var(--bad)}
</style>
