<!-- The footer: the sort controls, the filled counter, undo, and (when the draft is done) the week-1 feed door.
     Slice 4: PLAY WEEK 1 — the drive-level feed, played by the engine from the finished rosters. -->
<script lang="ts">
  import SortControls from './SortControls.svelte';
  let { footer, canUndo, onundo, onsort, sort, onplay, draftDone = false, seedCode = '' }: { footer: { filled: number; total: number; text: string }; canUndo: boolean; onundo: () => void; onsort: (s: any) => void; sort: string; onplay: () => void; draftDone?: boolean; seedCode?: string } = $props();
</script>

<div class="cp-ft">
  <SortControls sort={sort} onsort={onsort} />
  <span class="cp-count">{footer.text}</span>
  {#if seedCode}<span class="cp-seedcode" title="the draft code — put ?seed={seedCode} in the URL to replay this exact draft">code <b>{seedCode}</b></span>{/if}
  <button class="cp-undo" onclick={onundo} disabled={!canUndo}>Undo my last pick</button>
  {#if draftDone}
    <button class="cp-play" onclick={onplay} data-testid="cp-play">Play week 1 →</button>
  {/if}
</div>

<style>
  .cp-ft { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; border-top: 1px solid #3a2c31; padding-top: 10px; }
  .cp-count { color: #c8a48f; font-size: 0.85rem; }
  .cp-seedcode { color: #c8a48f; font-size: 0.85rem; font-variant-numeric: tabular-nums; }
  .cp-seedcode b { color: var(--gold2); letter-spacing: 0.04em; }
  .cp-sorttoggle { border: 1px solid var(--hairline); background: transparent; color: var(--sub); border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; font-size: 0.82rem; }
  .cp-undo { margin-left: auto; border: 1px solid #3a2c31; background: transparent; color: #c8a48f; border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; }
  .cp-undo:hover:not(:disabled) { color: var(--gold2); border-color: var(--gold3); }
  .cp-undo:disabled { opacity: 0.4; cursor: default; }
  .cp-play { border: 1px solid var(--gold3); background: linear-gradient(90deg, #c9a24b, #b3766a); color: #2c1e0c; font-weight: 800; border-radius: 999px; padding: 6px 16px; cursor: pointer; font-family: inherit; }
  .cp-play:hover { box-shadow: 0 0 14px color-mix(in srgb, var(--goldm) 35%, transparent); }
</style>
