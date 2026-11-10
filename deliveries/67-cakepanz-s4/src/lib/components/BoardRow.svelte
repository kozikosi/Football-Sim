<!-- The row: name, position, OVR, wins, priority, gone-odds, the flex options (the chips read the flex cost).
     Slice 3: the gone% cell carries the METHOD tooltip (hover) — the engine already computed the odds;
     the shell never told the user how. The meta (sims, picksBetween) rides down from App. -->
<script lang="ts">
  import type { BoardRowVM } from '../../engine/sports/nfl/view/draftBoard.ts';
  let { r, onpick, oddsMeta = null }: { r: BoardRowVM; onpick: (id: string, slot: string) => void; oddsMeta?: { picksBetween: number; sims: number } | null } = $props();
  let open = $state(false);
  const method = (m: { picksBetween: number; sims: number } | null): string =>
    m ? `GONE% — how often the CPU took him before your next pick: the ${m.picksBetween} picks between now and your turn were replayed ${m.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.` : 'GONE% — the CPU replay estimate (no replay while the CPU is on the clock).';
</script>

<div class="cp-row cp-{r.tone}">
  <button class="cp-main" onclick={() => (open = !open)} aria-expanded={open}>
    <span class="cp-name">{r.name}</span>
    <span class="cp-pos">{r.pos}</span>
    <span class="cp-nflteam">{r.nflTeam}</span>
    <span class="cp-num cp-ovr">{r.ovr}</span>
    <span class="cp-num">{r.wins}</span>
    <span class="cp-num">{r.priority}</span>
    <span class="cp-gone-wrap">
      <span class="cp-num cp-gone">{r.gone}</span>
      <span class="cp-gonetip" role="tooltip">{method(oddsMeta)}</span>
    </span>
  </button>
  {#if open}
    <div class="cp-fits">
      <span class="cp-fitlbl">Fills {r.slotLabel}{r.natural ? '' : ' (flex)'}</span>
      {#each r.alsoFits as f}
        <button class="cp-chip" onclick={() => onpick(r.id, f.slotId)}>{f.slotLabel} <i>{f.flex}</i></button>
      {/each}
      <button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)}>Draft at {r.slotLabel}</button>
    </div>
  {/if}
</div>

<style>
  .cp-row { border-bottom: 1px solid #3a2c31; }
  .cp-main { display: grid; grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px; width: 100%;
    background: transparent; border: 0; color: inherit; font-family: inherit; text-align: left; padding: 8px 6px; cursor: pointer; }
  .cp-main:hover { background: rgba(217, 169, 76, 0.07); }
  .cp-name { font-weight: 700; color: #f5e9dd; overflow-wrap: anywhere; }
  .cp-pos, .cp-nflteam { color: #c8a48f; font-size: 0.8rem; }
  .cp-num { font-variant-numeric: tabular-nums; text-align: right; }
  .cp-ovr { font-weight: 800; color: #e8c87e; }
  .cp-good .cp-num:first-of-type { color: #72c18e; }
  .cp-bad .cp-num { color: #e08573; }
  .cp-gone { color: #c8a48f; }
  .cp-gone-wrap { position: relative; display: inline-flex; justify-content: flex-end; }
  .cp-gonetip { position: absolute; right: 0; top: calc(100% + 6px); z-index: 9; width: 240px; display: none;
    background: #2c2127; border: 1px solid #8a5f18; border-radius: 10px; color: #f5e9dd;
    font-size: 0.72rem; line-height: 1.45; padding: 8px 10px; text-align: left; box-shadow: 0 8px 18px rgba(0,0,0,0.45); }
  .cp-gone-wrap:hover .cp-gonetip, .cp-gone-wrap:focus-within .cp-gonetip { display: block; }
  @media (prefers-reduced-motion: reduce) { .cp-gonetip { transition: none; } }
  .cp-fits { display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 6px 10px 12px; align-items: center; }
  .cp-fitlbl { font-size: 0.78rem; color: #c8a48f; }
  .cp-chip { border: 1px solid #8a5f18; background: transparent; color: #e8c87e; border-radius: 999px; padding: 4px 12px; cursor: pointer; font-family: inherit; font-size: 0.8rem; }
  .cp-chip i { font-style: normal; color: #c8a48f; }
  .cp-chip:hover { background: rgba(217, 169, 76, 0.12); }
  .cp-primary { background: rgba(217, 169, 76, 0.16); font-weight: 700; }
</style>
