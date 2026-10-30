<script>
  const players = [
    { name:'Patrick Mahomes', pos:'QB', ovr:99, team:'KC', shimmer:true },
    { name:'CeeDee Lamb', pos:'WR1', ovr:96, team:'DAL', shimmer:true },
    { name:'Travis Kelce', pos:'TE1', ovr:91, team:'KC', shimmer:true },
    { name:'DK Metcalf', pos:'WR2', ovr:91, team:'SEA' },
    { name:'Micah Parsons', pos:'DE1', ovr:96, team:'DAL', shimmer:true },
    { name:'Devon Witherspoon', pos:'CB1', ovr:88, team:'SEA' },
  ];
</script>

<section>
  <div class="card floaty">
    <div class="row">
      <span style="font-weight:700;font-size:.9rem">Draft Board — Round 12</span>
      <span class="shimmer" style="font-size:.75rem">Can you go 20-0?</span>
    </div>
    <div class="board">
      {#each players as p}
        <div class="pcard">
          <div class="name" class:shimmer={p.shimmer}>{p.name}</div>
          <div class="meta"><span class="pos">{p.pos}</span>{p.team} · {p.ovr} OVR</div>
          <div class="ovr">{p.ovr}</div>
        </div>
      {/each}
    </div>
    <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
      <button class="btn">Undo ↶</button>
      <button class="btn">Sim to End</button>
      <button class="btn primary">Start A New Draft</button>
    </div>
  </div>
</section>

<style>
  .card{background:var(--panel);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:20px;padding:16px;margin-bottom:12px;box-shadow:0 8px 32px rgba(0,0,0,.3);transition:transform var(--motion),box-shadow var(--motion)}
  .card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
  .row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .board{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
  .pcard{background:var(--panel2);border:1px solid var(--border);border-radius:12px;padding:10px;border-left:3px solid var(--team);transition:all var(--motion)}
  .pcard:hover{border-color:var(--border-hover);transform:translateY(-3px)}
  .pcard .name{font-weight:700;font-size:.85rem;margin-bottom:2px}
  .pcard .meta{font-size:.7rem;color:var(--sub);margin-bottom:6px}
  .pcard .ovr{float:right;font-weight:800;font-size:.85rem;color:var(--gold)}
  .pcard .pos{display:inline-block;font-size:.65rem;padding:1px 6px;border-radius:4px;background:rgba(212,175,55,.12);color:var(--gold);margin-right:4px}
  .btn{padding:8px 14px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:8px;cursor:pointer;font-size:.75rem;transition:all var(--motion)}
  .btn:hover{border-color:var(--border-hover)}
  .btn.primary{background:linear-gradient(135deg,var(--team),var(--team2));color:#0d0a0e;border:none;font-weight:700}
  .shimmer{background:linear-gradient(90deg,var(--gold) 0%,var(--rose) 25%,#fff 50%,var(--rose) 75%,var(--gold) 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:sh 2.5s ease-in-out infinite}
  @keyframes sh{0%{background-position:200% 0}100%{background-position:-200% 0}}
</style>
