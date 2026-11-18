<!-- 67 Cakepanz · the draft completion state: the handoff from the draft into the season.
     "Your draft is complete" framing, the provenance stamp (seed · engine), the onward CTA,
     and the partial/complete states the reducer already implies. -->
<script lang="ts">
  import { showInt, TEAMS, engineVersion } from '../port/seam.ts';
  import type { SaveRecord } from '../port/seam.ts';
  import { MODE_LABEL } from '../valuation.ts';
  import { valuation } from '../valuation.ts';

  let { record, requestedSlot, onseason, oncards, onbook }: {
    record: SaveRecord; requestedSlot: number | null;
    onseason: () => void; oncards: () => void; onbook: () => void;
  } = $props();
  let picks = $derived(record.picks.length);
  let complete = $derived(picks >= 1024);
  let mine = $derived(record.picks.filter((p) => p.team === record.userTeam).length);
</script>

<section class="cp-done" data-state={complete ? 'complete' : 'partial'}>
  <h1 class="cp-done-h1">Your draft is complete</h1>
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
  <div class="cp-chipline">
    <button class="cp-stepbtn cp-cta" onclick={onseason}>PLAY THE SEASON</button>
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
</style>
