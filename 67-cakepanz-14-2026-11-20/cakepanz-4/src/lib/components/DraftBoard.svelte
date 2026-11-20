<!-- The board: the list of available players ranked by the chosen sort (default wins/priority, never raw OVR).
     Slice 3 chrome pass: the needs sticky row (clickable filter) + the gone-odds method tooltip on every row.
     cakepanz-9 (2026-11-19, the Owner's ruling): ONE uniform board for picks 1–32 — the late-mode
     flip is SUPERSEDED and deleted (the order §5/B-bis): no data-form, no simple branch, no FULL
     BOARD door, no late note. C′1: the top three available rows by the ACTIVE order carry the
     suggestion ring; more than three only on an order tie (the comment on suggestIds says so). -->
<script lang="ts">
  import type { BoardVM, BoardRowVM } from '../port/seam.ts';
  import type { SlotId } from '../port/seam.ts';
  import BoardHeader from './BoardHeader.svelte';
  import BoardRow from './BoardRow.svelte';
  import BoardFooter from './BoardFooter.svelte';
  import SlotPicker from './SlotPicker.svelte';
  import NeedsRow from './NeedsRow.svelte';

  let {
    vm, onpick, onundo, onsort, canUndo, openSlots = [], oddsMeta = null, needsSelected = [], onneedtoggle, onneedclear, onplay, draftDone = false, seedCode = '',
  }: {
    vm: BoardVM; onpick: (id: string, slot: string) => void; onundo: () => void; onsort: (s: any) => void; canUndo: boolean;
    openSlots?: SlotId[]; oddsMeta?: { picksBetween: number; sims: number } | null;
    needsSelected?: SlotId[]; onneedtoggle: (slot: SlotId) => void; onneedclear: () => void;
    onplay: () => void; draftDone?: boolean; seedCode?: string;
  } = $props();
  let picked = $state<{ id: string; slot: string } | null>(null);
  let row: HTMLDivElement | null = $state(null);
  // T7/R1 (cakepanz-12): the one-click path is SAFE by construction — a 380 ms guard window swallows
  // a fast double-click or Enter auto-repeat (one interaction = one PICK), the staged confirm banner
  // DISARMS when the pick lands (T7/S2: a second PICK must not be possible), and a "Drafted · Undo"
  // status line (role=status, aria-live=polite) confirms what happened without blocking the board
  // (L16's no-banner law holds — the guard is not a confirm gate).
  let guard = $state(false);
  let draftedToast = $state<{ name: string } | null>(null);
  let toastTimer: ReturnType<typeof setTimeout> | null = null;
  let guardTimer: ReturnType<typeof setTimeout> | null = null;
  const quickDraft = (id: string, slot: string) => {
    if (guard) return;                    // R1: the guard window — one interaction, one pick
    guard = true;
    picked = null;                        // S2: the staged banner disarms when the pick lands
    onpick(id, slot);
    draftedToast = { name: vm.rows.find((r) => r.id === id)?.name ?? 'the pick' };
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { draftedToast = null; }, 2600);
    if (guardTimer) clearTimeout(guardTimer);
    guardTimer = setTimeout(() => { guard = false; }, 380);
  };

  // S13 (the optional hardening the c12 review named): the STAGED path's Confirm gets the same
  // treatment — a null-check (a double-click after the banner disarmed used to dereference null
  // and raise a page error) plus the 380 ms guard window (one Confirm = one PICK). The row chips
  // only STAGE (picked = {…}), so they were never able to double-fire; the fire button was.
  // The law is board battery L22.
  let confirmGuard = $state(false);
  let confirmGuardTimer: ReturnType<typeof setTimeout> | null = null;
  const confirmPick = () => {
    if (!picked || confirmGuard) return;
    confirmGuard = true;
    onpick(picked.id, picked.slot);
    picked = null;
    if (confirmGuardTimer) clearTimeout(confirmGuardTimer);
    confirmGuardTimer = setTimeout(() => { confirmGuard = false; }, 380);
  };

  // the needs filter: a row qualifies when the selected slot is its primary fill OR one of its flex fills
  const shown = $derived(
    needsSelected.length === 0
      ? vm.rows
      : vm.rows.filter((r) => needsSelected.includes(r.slotId) || r.alsoFits.some((f) => needsSelected.includes(f.slotId))),
  );
  import { topSuggestedIds } from '../port/suggestWhy.ts';
  // S14 (ring revival): the ring is driven by topSuggestedIds (pure, port-level, node-testable).
  // The LAST ringed row (lowest of the top 3, or the last tied row) carries the glow.
  const ring = $derived.by(() => topSuggestedIds(shown, vm.sort));
  const suggestIds = $derived(ring.ids);
  const glowId = $derived(ring.lastId);
</script>

<section class="cp-board" aria-label="Draft board">
  <BoardHeader header={vm.header} />
  <NeedsRow open={openSlots} selected={needsSelected} ontoggle={onneedtoggle} onclear={onneedclear} />
  {#if draftedToast}
    <p class="cp-drafted" role="status" aria-live="polite">
      Drafted <b>{draftedToast.name}</b> ·
      <button class="cp-btn cp-draftedundo" onclick={() => { onundo(); draftedToast = null; }}>Undo</button>
    </p>
  {/if}
  {#if picked}
    <p class="cp-confirm">
      Draft <b>{vm.rows.find((r) => r.id === picked.id)?.name}</b> at <b>{picked.slot}</b>?
      <button class="cp-btn cp-go" onclick={confirmPick}>Confirm the pick</button>
      <button class="cp-btn" onclick={() => (picked = null)}>Cancel</button>
    </p>
  {/if}
  <div class="cp-rows" bind:this={row} data-count={shown.length}>
    {#each shown as r (r.id)}
      <!-- T2: onpick stages through the confirm banner; onpickDirect is the immediate dispatch —
           the ringed rows' ONE-CLICK button uses it (no expand, chip or confirm). -->
      <BoardRow {r} onpick={(id, slot) => (picked = { id, slot })} onpickDirect={quickDraft} {oddsMeta} suggest={suggestIds.has(r.id)} glow={glowId === r.id} />
    {/each}
  </div>
  <BoardFooter footer={vm.footer} canUndo={canUndo} onundo={onundo} onsort={onsort} sort={vm.sort} {onplay} {draftDone} {seedCode} />
</section>

<style>
  .cp-board { border: 1px solid #3a2c31; border-radius: 14px; background: #221820; padding: 14px; }
  .cp-confirm { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; border: 1px solid var(--goldm); border-radius: 10px; padding: 10px 12px; background: #2c2127; }
  /* T7/R1: the Drafted · Undo status line — small, non-blocking, gone on its own (2.6 s) */
  .cp-drafted { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; border: 1px solid var(--gold3); border-radius: 10px; padding: 8px 12px; background: #2c2127; color: var(--zcream); }
  .cp-drafted b { color: var(--gold2); }
  .cp-draftedundo { padding: 4px 12px; }
  @media (prefers-reduced-motion: reduce) { .cp-drafted { transition: none; } }
  .cp-btn { border: 1px solid var(--gold3); background: transparent; color: var(--gold2); border-radius: 999px; padding: 7px 16px; cursor: pointer; font-family: inherit; }
  .cp-btn:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  .cp-go { background: linear-gradient(90deg, #c9a24b, #b3766a); color: #2c1e0c; font-weight: 800; }
  /* T4: keyboard focus is visible on the confirm control too */
  .cp-btn:focus-visible, .cp-go:focus-visible { outline: 2px solid var(--gold2); outline-offset: 2px; }
  .cp-rows { margin: 10px 0; }
</style>
