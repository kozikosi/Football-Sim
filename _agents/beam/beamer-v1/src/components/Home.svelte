<script>
  import { team } from '../stores/team.js';
  const players = [
    { name:'Patrick Mahomes', pos:'QB', ovr:99, team:'KC' },
    { name:'CeeDee Lamb', pos:'WR1', ovr:96, team:'DAL' },
    { name:'Travis Kelce', pos:'TE1', ovr:91, team:'KC' },
  ];
</script>

<section class="home">
  <div class="hero">
    <h2 class="shimmer">20-0</h2>
    <p class="tag">Can you go 20-0?</p>
    <button class="draft-btn shimmer">Start Draft</button>
  </div>

  <div class="card floaty">
    <div class="row">
      <span style="font-weight:700;font-size:.9rem">Draft Board — Round 12</span>
      <span class="shimmer" style="font-size:.75rem">Can you go 20-0?</span>
    </div>
    <div class="board">
      {#each players as p}
        <div class="pcard" style="--t:{p.ovr>=90?'var(--gold)':'var(--team)'}">
          <div class="name" class:shimmer={p.ovr>=90}>{p.name}</div>
          <div class="meta"><span class="pos">{p.pos}</span>{p.team} · {p.ovr} OVR</div>
          <div class="ovr">{p.ovr}</div>
        </div>
      {/each}
    </div>
  </div>

  <div class="card floaty">
    <div class="row">
      <span style="font-weight:700;font-size:.9rem">Game Preview — KC vs SEA</span>
      <span style="font-size:.7rem;color:var(--sub)">Week 14 · Home</span>
    </div>
    <div class="score">
      <div class="sbox user"><div class="tn">Chiefs</div><div class="sc">24</div><div class="dt">+3.2 WINS</div></div>
      <div class="sbox opp"><div class="tn">Seahawks</div><div class="sc">21</div><div class="dt">+1.8 WINS</div></div>
    </div>
  </div>
</section>

<style>
  .home{display:block}
  .hero{text-align:center;padding:24px 0 16px}
  .hero h2{font-size:2.2rem;margin:0;letter-spacing:.04em}
  .tag{color:var(--sub);font-size:.85rem;margin:4px 0 12px}
  .draft-btn{padding:12px 32px;border:none;border-radius:999px;background:linear-gradient(135deg,var(--team),var(--team2));color:#0d0a0e;font-weight:800;font-size:1rem;cursor:pointer;box-shadow:0 4px 24px rgba(0,0,0,.3);transition:transform var(--motion)}
  .draft-btn:hover{transform:translateY(-2px) scale(1.02)}
  .floaty{background:var(--panel);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:20px;padding:16px;margin-bottom:12px;box-shadow:0 8px 32px rgba(0,0,0,.3);transition:transform var(--motion),box-shadow var(--motion)}
  .floaty:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
  .row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .board{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
  .pcard{background:var(--panel2);border:1px solid var(--border);border-radius:12px;padding:10px;border-left:3px solid var(--team);transition:all var(--motion)}
  .pcard:hover{border-color:var(--border-hover);transform:translateY(-3px)}
  .pcard .name{font-weight:700;font-size:.85rem;margin-bottom:2px}
  .pcard .meta{font-size:.7rem;color:var(--sub);margin-bottom:6px}
  .pcard .ovr{float:right;font-weight:800;font-size:.85rem;color:var(--gold)}
  .pcard .pos{display:inline-block;font-size:.65rem;padding:1px 6px;border-radius:4px;background:rgba(212,175,55,.12);color:var(--gold);margin-right:4px}
  .score{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0}
  .sbox{flex:1;min-width:120px;border-radius:14px;padding:12px 14px;color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.2)}
  .sbox.user{background:linear-gradient(135deg,var(--team),var(--team2))}
  .sbox.opp{background:linear-gradient(135deg,#003594,#869397)}
  .sbox .tn{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;opacity:.9}
  .sbox .sc{font-size:1.8rem;font-weight:900}
  .sbox .dt{margin-top:4px;font-size:.7rem;opacity:.9}
  .stat{display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:8px 10px}
  .stat .ovr{font-size:1.2rem;font-weight:800;width:36px;text-align:center;color:var(--gold)}
  .stat .bar{flex:1;height:6px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden}
  .stat .fill{height:100%;border-radius:3px}
  .stat .lbl{font-size:.7rem;color:var(--sub)}
  .tabs{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
  .tab{padding:6px 12px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:6px;cursor:pointer;font-size:.75rem}
  .tab.active{border-color:var(--gold);color:var(--gold)}
</style>
