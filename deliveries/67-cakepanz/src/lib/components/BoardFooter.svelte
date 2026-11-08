<!-- The footer: the sort controls, the filled counter, undo. The pick lands from a row or a slot chip. -->
<script lang="ts">
  import SortControls from './SortControls.svelte';
  let { footer, canUndo, onundo, onsort, sort }: { footer: { filled: number; total: number; text: string }; canUndo: boolean; onundo: () => void; onsort: (s: any) => void; sort: string } = $props();
</script>

<div class="cp-ft">
  <SortControls sort={sort} onsort={onsort} />
  <span class="cp-count">{footer.text}</span>
  <button class="cp-undo" onclick={onundo} disabled={!canUndo}>Undo my last pick</button>
</div>

<style>
  .cp-ft { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; border-top: 1px solid #3a2c31; padding-top: 10px; }
  .cp-count { color: #c8a48f; font-size: 0.85rem; }
  .cp-undo { margin-left: auto; border: 1px solid #3a2c31; background: transparent; color: #c8a48f; border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; }
  .cp-undo:hover:not(:disabled) { color: #e8c87e; border-color: #8a5f18; }
  .cp-undo:disabled { opacity: 0.4; cursor: default; }
</style>
