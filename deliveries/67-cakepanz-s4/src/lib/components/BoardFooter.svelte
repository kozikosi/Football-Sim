<!-- The footer: the sort controls, the filled counter, undo, and (when the draft is done) the week-1 feed door.
     Slice 4: PLAY WEEK 1 — the drive-level feed, played by the engine from the finished rosters. -->
<script lang="ts">
  import SortControls from './SortControls.svelte';
  let { footer, canUndo, onundo, onsort, sort, onplay, draftDone = false }: { footer: { filled: number; total: number; text: string }; canUndo: boolean; onundo: () => void; onsort: (s: any) => void; sort: string; onplay: () => void; draftDone?: boolean } = $props();
</script>

<div class="cp-ft">
  <SortControls sort={sort} onsort={onsort} />
  <span class="cp-count">{footer.text}</span>
  <button class="cp-undo" onclick={onundo} disabled={!canUndo}>Undo my last pick</button>
  {#if draftDone}
    <button class="cp-play" onclick={onplay} data-testid="cp-play">Play week 1 →</button>
  {/if}
</div>

<style>
  .cp-ft { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; border-top: 1px solid #3a2c31; padding-top: 10px; }
  .cp-count { color: #c8a48f; font-size: 0.85rem; }
  .cp-undo { margin-left: auto; border: 1px solid #3a2c31; background: transparent; color: #c8a48f; border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; }
  .cp-undo:hover:not(:disabled) { color: #e8c87e; border-color: #8a5f18; }
  .cp-undo:disabled { opacity: 0.4; cursor: default; }
  .cp-play { border: 1px solid #8a5f18; background: linear-gradient(90deg, #c9a24b, #b3766a); color: #2c1e0c; font-weight: 800; border-radius: 999px; padding: 6px 16px; cursor: pointer; font-family: inherit; }
  .cp-play:hover { box-shadow: 0 0 14px rgba(217, 169, 76, 0.35); }
</style>
