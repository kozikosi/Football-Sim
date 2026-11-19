<!-- The row: name, position, OVR, wins, priority, gone-odds, the flex options (the chips read the flex cost).
     Slice 3: the gone% cell carries the METHOD tooltip (hover) — the engine already computed the odds;
     the shell never told the user how. The meta (sims, picksBetween) rides down from App.
     cakepanz-9 (2026-11-19, the Owner's ruling): ONE uniform row for every pick — the late simple
     branch is SUPERSEDED and deleted (the order §5/B-bis). The WINS/PRIO/OVR captions STAYED (the
     8.1 REC texts now name the uniform row's numeric cells — a bare number still says what it is);
     the detail container is always present (hidden when closed) so aria-controls always resolves
     (the A8e fix); the top-three suggestion carries the gold ring on the row's pick control (C′1). -->
<script lang="ts">
  import type { BoardRowVM } from '../port/seam.ts';
  let { r, onpick, oddsMeta = null, suggest = false }: { r: BoardRowVM; onpick: (id: string, slot: string) => void; oddsMeta?: { picksBetween: number; sims: number } | null; suggest?: boolean } = $props();
  let open = $state(false);
  // the numeric cells name their field — the caption texts are the 8.1 REC strings, kept verbatim
  const CAP = {
    ovr: 'OVR — the raw rating; the board never ranks by it by default',
    wins: 'Wins — what the board ranks by',
    priority: 'Priority — what the board ranks by while the Priority sort is on',
  };
  const method = (m: { picksBetween: number; sims: number } | null): string =>
    m ? `GONE% — how often the CPU took him before your next pick: the ${m.picksBetween} picks between now and your turn were replayed ${m.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.` : 'GONE% — the CPU replay estimate (no replay while the CPU is on the clock).';
</script>

<div class="cp-row cp-{r.tone}" class:cp-suggest={suggest} data-id={r.id}>
  <button class="cp-main" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">
    <span class="cp-name">{r.name}</span>
    <span class="cp-pos">{r.pos}</span>
    <span class="cp-nflteam">{r.nflTeam}</span>
    <span class="cp-num cp-ovr" title={CAP.ovr} aria-label="OVR">{r.ovr}</span>
    <span class="cp-num" title={CAP.wins} aria-label="WINS">{r.wins}</span>
    <span class="cp-num" title={CAP.priority} aria-label="PRIO">{r.priority}</span>
    <span class="cp-gone-wrap">
      <span class="cp-num cp-gone">{r.gone}</span>
      <span class="cp-gonetip" role="tooltip">{method(oddsMeta)}</span>
    </span>
  </button>
  <div class="cp-fits" id="cp-fit-{r.id}" hidden={!open}>
    <span class="cp-fitlbl">Fills {r.slotLabel}{r.natural ? '' : ' (flex)'}</span>
    {#each r.alsoFits as f}
      <button class="cp-chip" onclick={() => onpick(r.id, f.slotId)}>{f.slotLabel} <i>{f.flex}</i></button>
    {/each}
    <button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)}>Draft at {r.slotLabel}</button>
  </div>
</div>

<style>
  .cp-row { border-bottom: 1px solid #3a2c31; }
  .cp-main { display: grid; grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px; width: 100%;
    background: transparent; border: 0; color: inherit; font-family: inherit; text-align: left; padding: 8px 6px; cursor: pointer; }
  /* the 390px law (this sitting): the desk grid's fixed columns (336px + 48px gaps + 12px padding)
     overflow a 390px viewport — the gone% column sat outside the row box. On a phone the fixed
     columns tighten so scrollWidth == clientWidth (the battery's board-at-390 law holds). */
  @media (max-width: 430px) {
    .cp-main { grid-template-columns: 1fr 30px 34px 40px 52px 58px 46px; gap: 5px; padding: 8px 4px; }
    .cp-gonetip { width: 200px; }
  }
  .cp-main:hover { background: color-mix(in srgb, var(--goldm) 7%, transparent); }
  .cp-name { font-weight: 700; color: #f5e9dd; overflow-wrap: anywhere; }
  .cp-pos, .cp-nflteam { color: #c8a48f; font-size: 0.8rem; }
  .cp-num { font-variant-numeric: tabular-nums; text-align: right; }
  .cp-ovr { font-weight: 800; color: var(--gold2); }
  .cp-good .cp-num:first-of-type { color: #72c18e; }
  .cp-bad .cp-num { color: #e08573; }
  .cp-gone { color: #c8a48f; }
  .cp-gone-wrap { position: relative; display: inline-flex; justify-content: flex-end; }
  .cp-gonetip { position: absolute; right: 0; top: calc(100% + 6px); z-index: 9; width: 240px; display: none;
    background: #2c2127; border: 1px solid var(--gold3); border-radius: 10px; color: #f5e9dd;
    font-size: 0.72rem; line-height: 1.45; padding: 8px 10px; text-align: left; box-shadow: 0 8px 18px rgba(0,0,0,0.45); }
  .cp-gone-wrap:hover .cp-gonetip, .cp-main:focus .cp-gonetip { display: block; }
  @media (prefers-reduced-motion: reduce) { .cp-gonetip { transition: none; } }
  /* the detail container ALWAYS exists (hidden when closed) — aria-controls always resolves (A8e) */
  .cp-fits { display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 6px 10px 12px; align-items: center; }
  .cp-fits[hidden] { display: none; }
  .cp-fitlbl { font-size: 0.78rem; color: #c8a48f; }
  .cp-chip { border: 1px solid var(--gold3); background: transparent; color: var(--gold2); border-radius: 999px; padding: 4px 12px; cursor: pointer; font-family: inherit; font-size: 0.8rem; }
  .cp-chip i { font-style: normal; color: #c8a48f; }
  .cp-chip:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  .cp-primary { background: color-mix(in srgb, var(--goldm) 16%, transparent); font-weight: 700; }
  /* C′1 (cakepanz-9): the top three rows by the board's active order carry the suggestion ring on
     the row's pick control — the Owner's speedrun path ("at least three players' draft buttons
     highlighted"). More than three only on an order tie (DraftBoard computes the ids); the ring is
     display-only, in the house tokens, and it respects reduced motion. */
  .cp-suggest .cp-main { box-shadow: inset 0 0 0 1px var(--gold2); animation: cp-suggest-shimmer 2.4s ease-in-out infinite; }
  .cp-suggest .cp-main:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  @keyframes cp-suggest-shimmer {
    0%, 100% { box-shadow: inset 0 0 0 1px var(--gold2); }
    50% { box-shadow: inset 0 0 0 1px var(--gold2), inset 0 0 16px color-mix(in srgb, var(--goldm) 16%, transparent); }
  }
  @media (prefers-reduced-motion: reduce) { .cp-suggest .cp-main { animation: none; } }
  :global(body.cp-reduced) .cp-suggest .cp-main { animation: none; }
</style>
