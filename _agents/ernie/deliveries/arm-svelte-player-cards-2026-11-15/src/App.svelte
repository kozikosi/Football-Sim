<script>
  import PlayerCard from './lib/PlayerCard.svelte';
  // Real rows from data/nfl/madden27-ratings.csv at d3bd81d2 — no invented values.
  // Wins and Priority are ENGINE outputs and are deliberately NOT shown here: the card's
  // data source does not carry them, and inventing them would break the data-integrity rule.
  const POOL = [
    { name: "Jaxon Smith-Njigba", pos: "WR", team: "Seattle Seahawks", ovr: 99, spd: 96, str: 78 },
    { name: "Ja'Marr Chase", pos: "WR", team: "Cincinnati Bengals", ovr: 99, spd: 98, str: 85 },
    { name: "Josh Allen", pos: "QB", team: "Buffalo Bills", ovr: 99, spd: 88, str: 94 },
    { name: "Puka Nacua", pos: "WR", team: "Los Angeles Rams", ovr: 98, spd: 94, str: 82 },
    { name: "Christian Gonzalez", pos: "CB", team: "New England Patriots", ovr: 98, spd: 95, str: 76 },
    { name: "Cam Skattebo", pos: "RB", team: "Arizona Cardinals", ovr: 76, spd: 91, str: 80 }
  ];
  const RANK = $derived(new Map(POOL.map((p,i) => [p, i+1])));
  let picked = $state(null);
  const pick = p => picked = (picked === p ? null : p);
</script>

<main>
  <header>
    <h1>Player cards</h1>
    <p class="sub">Tap a card. Arrow keys move, Enter selects.</p>
  </header>
  <div class="grid" role="list">
    {#each POOL as p, i (p.name)}
      <div role="listitem" data-i={i}>
        <PlayerCard player={p} rank={RANK.get(p)} selected={picked===p} onselect={pick}
          onmove={(d) => { const n = (i + (d === 1 ? 1 : POOL.length - 1)) % POOL.length;
            document.querySelectorAll('[data-i]')[n]?.querySelector('button')?.focus(); }} />
      </div>
    {/each}
  </div>
</main>

<style>
  :global(:root) {
    --ink: #eef2f7; --muted: #9aa7b8; --card: #16202c; --sel: #1b2a3a;
    --edge: #26333f; --track: #223040; --accent: #4aa3ff; --r: 12px;
    color-scheme: dark;
  }
  :global(body) { margin: 0; background: #0e1620; color: var(--ink);
    font: 15px/1.45 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { max-width: 30rem; margin: 0 auto; padding: 1rem .85rem 2rem; }
  h1 { font-size: 1.05rem; margin: 0 0 .15rem; }
  .sub { margin: 0 0 .85rem; font-size: .78rem; color: var(--muted); }
  .grid { display: grid; gap: .5rem; }
  .grid > div { border-radius: var(--r); }
</style>
