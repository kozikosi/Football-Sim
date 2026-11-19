<!-- 67 Cakepanz · the draft completion state: the handoff from the draft into the season.
     "Your draft is complete" framing, the provenance stamp (seed · engine), the onward CTA,
     and the partial/complete states the reducer already implies.
     cakepanz-9 (2026-11-19): the headline renders ONLY in the complete branch and PLAY THE
     SEASON is disabled in partial state with the existing finished-draft tip (the C2 fix, the
     order §4/B2 — the screen must not lie); the complete branch prints the roster the engine
     would field (C′2, data-only: the lineup, the effOvr per slot, the three weakest marked);
     the entry cascades — the wall-slip reveal (C′3, CSS only, instant under reduced motion). -->
<script lang="ts">
  import { showInt, TEAMS, engineVersion } from '../port/seam.ts';
  import type { SaveRecord } from '../port/seam.ts';
  import { lineupFor } from '../port/seam.ts';
  import { rostersOfRecord } from '../port/feedVM.ts';
  import { MODE_LABEL } from '../valuation.ts';
  import { valuation } from '../valuation.ts';
  import LineupAdvice from '../components/LineupAdvice.svelte';

  let { record, requestedSlot, onseason, oncards, onbook }: {
    record: SaveRecord; requestedSlot: number | null;
    onseason: () => void; oncards: () => void; onbook: () => void;
  } = $props();
  let picks = $derived(record.picks.length);
  let complete = $derived(picks >= 1024);
  let mine = $derived(record.picks.filter((p) => p.team === record.userTeam).length);
  // C′2 (cakepanz-9): the roster the engine would field — the engine's own lineupFor on the
  // finished record, the effOvr per slot, the three weakest marked. Data-only: the labels and the
  // shape are the advice panel's existing anatomy; no new sentences.
  let rosterSlots = $derived.by<{ label: string; name: string; ovr: string }[]>(() => {
    if (!complete) return [];
    try {
      const rec = record as unknown as { userTeam: number };
      const mineRoster = rostersOfRecord(record as never)[rec.userTeam] ?? [];
      const best = lineupFor(mineRoster, '4-3') as { placements?: { slot?: { label?: string; slot?: string }; player?: { name?: string; ovr?: number }; effOvr?: number }[] };
      return (best.placements ?? []).map((pl) => ({ label: pl.slot?.label ?? pl.slot?.slot ?? '?', name: pl.player?.name ?? '(empty)', ovr: pl.player ? String(pl.effOvr ?? pl.player.ovr) : '-' }));
    } catch { return []; }
  });
  let fieldedCount = $derived(rosterSlots.filter((s) => s.name !== '(empty)' && s.ovr !== '-').length);
  let lineupState = $derived(fieldedCount < 11 && rosterSlots.length ? 'incomplete' : 'complete');
  let weakIdx = $derived.by<number[]>(() => {
    const fielded = rosterSlots.map((s, i) => ({ i, v: s.name !== '(empty)' && s.ovr !== '-' ? Number(s.ovr) : Infinity }));
    return fielded.filter((x) => x.v !== Infinity).sort((a, b) => a.v - b.v).slice(0, 3).map((x) => x.i);
  });
</script>

<section class="cp-done" data-state={complete ? 'complete' : 'partial'}>
  {#if complete}
    <h1 class="cp-done-h1">Your draft is complete</h1>
  {/if}
  <p class="cp-done-sub">
    {#if complete}
      All 1,024 picks are in — every one of the 32 teams holds a full 32-man roster. The league is built; the season is yours to play.
    {:else}
      The draft has {showInt(picks)} of 1,024 picks in ({showInt(mine)} of yours). Come back when the board says done — the season opens from here.
    {/if}
  </p>
  <p class="cp-prov cp-done-prov">
    seed <b>{record.seed}</b> · engine <b>{engineVersion()}</b> · {showInt(picks)} picks · {TEAMS[record.userTeam].name}
    {#if requestedSlot !== null}· requested slot <b>{requestedSlot}</b>{/if}
    · every number reads <b>{MODE_LABEL[valuation.get().mode]}</b>
  </p>
  {#if requestedSlot !== null}
    <p class="cp-note cp-done-note">You asked for draft slot {requestedSlot}; the store ran the standard order — the store's slot wiring is the Architect's piece (P-317, filed §5). The engine's own order parameter supports it (proven node-side).</p>
  {/if}
  {#if complete && rosterSlots.length}
  <div class="cp-rosterline" data-lineup={lineupState}>
    <LineupAdvice slots={rosterSlots} weak={weakIdx} />
  </div>
  {/if}
  <div class="cp-chipline">
    <button class="cp-stepbtn cp-cta" onclick={onseason} disabled={!complete} title={complete ? undefined : 'the season needs a finished draft'}>PLAY THE SEASON</button>
    <button class="cp-stepbtn" onclick={oncards}>YOUR PLAYER CARDS</button>
    <button class="cp-stepbtn" onclick={onbook}>THE SEASON BOOK</button>
  </div>
</section>

<style>
  .cp-done { border: 1px solid var(--gold3); border-radius: 14px; padding: 26px; background: color-mix(in srgb, var(--goldm) 8%, var(--panel)); text-align: center; margin-top: 8vh; }
  .cp-done-h1 { margin: 0 0 8px; color: var(--gold2); font-family: var(--font-display); letter-spacing: 0.1em; font-size: 1.7rem; }
  .cp-done-sub { color: var(--zcream); max-width: 52ch; margin: 0 auto 10px; }
  .cp-done-prov { margin-bottom: 6px; }
  .cp-done-prov b { color: var(--gold2); }
  .cp-done-note { max-width: 62ch; margin: 0 auto 14px; }
  .cp-rosterline { margin: 10px auto 14px; max-width: 720px; text-align: left; }
  /* C′3 (cakepanz-9): the wall-slip reveal — the completion moment cascades (title → the stats
     hint → the buttons), CSS only, ≤2 s total; reduced motion renders it instant (the Owner: "all
     for cinematics and any exciting transitions after an action has been completed"). Zero strings,
     zero logic. */
  .cp-done > * { animation: cp-reveal 0.5s ease-out both; }
  .cp-done-h1 { animation-delay: 0s; }
  .cp-done-sub, .cp-done-prov, .cp-done-note, .cp-rosterline { animation-delay: 0.18s; }
  .cp-chipline { animation-delay: 0.36s; }
  @keyframes cp-reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .cp-done > * { animation: none; } }
  :global(body.cp-reduced) .cp-done > * { animation: none; }
</style>
