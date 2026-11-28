<!-- The board: the list of available players ranked by the chosen sort (default wins/priority, never raw OVR).
     Slice 3 chrome pass: the needs sticky row (clickable filter) + the gone-odds method tooltip on every row.
     cakepanz-9 (2026-11-19, the Owner's ruling): ONE uniform board for picks 1–32 — the late-mode
     flip is SUPERSEDED and deleted (the order §5/B-bis): no data-form, no simple branch, no FULL
     BOARD door, no late note. C′1: the top three available rows by the ACTIVE order carry the
     suggestion ring; more than three only on an order tie (the comment on ring says so). -->
<script lang="ts">
  import type { BoardVM } from '../port/seam.ts';
  import type { SlotId } from '../port/seam.ts';
  import { suggestIdsOf, whyFor, validSavedIds } from '../port/suggestWhy.ts';
  import type { RingRow } from '../port/suggestWhy.ts';
  import BoardHeader from './BoardHeader.svelte';
  import BoardRow from './BoardRow.svelte';
  import BoardFooter from './BoardFooter.svelte';
  import SlotPicker from './SlotPicker.svelte';
  import NeedsRow from './NeedsRow.svelte';
  import { heatStrip, pickConfidence, type HeatCell } from '../port/decisionVM.ts';

  let {
    vm, onpick, onundo, onsort, canUndo, openSlots = [], oddsMeta = null, needsSelected = [], onneedtoggle, onneedclear, onplay, draftDone = false, seedCode = '', savedSuggest = null, busy = false, heat = [], winsNeighbours = [],
  }: {
    vm: BoardVM; onpick: (id: string, slot: string) => boolean | Promise<boolean>; onundo: () => void; onsort: (s: any) => void; canUndo: boolean;
    openSlots?: SlotId[]; oddsMeta?: { picksBetween: number; sims: number } | null;
    needsSelected?: SlotId[]; onneedtoggle: (slot: SlotId) => void; onneedclear: () => void;
    onplay: () => void; draftDone?: boolean; seedCode?: string; savedSuggest?: string[] | null; busy?: boolean;
    heat?: HeatCell[]; winsNeighbours?: (string | number)[];
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
  const quickDraft = async (id: string, slot: string) => {
    if (guard) return;                    // R1: the guard window — one interaction, one pick (set BEFORE the await)
    guard = true;
    picked = null;                        // S2: the staged banner disarms when the pick lands
    // S15 (the 0305 toast-truth fix, law L31): the toast rides a LANDED pick, never the attempt —
    // pick() resolves false on a refused PICK (illegal fit, the S32 class), and a refused pick
    // shows ONLY the error line, never a "Drafted · <name>" lie.
    const rowName = vm.rows.find((r) => r.id === id)?.name ?? 'the pick';   // read BEFORE the await — the board changes while the dispatch is in flight
    const landed = await onpick(id, slot);
    if (landed === false) { if (guardTimer) clearTimeout(guardTimer); guardTimer = setTimeout(() => { guard = false; }, 380); return; }
    draftedToast = { name: rowName };
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
  // C′1 (cakepanz-9): the top THREE rows by the board's ACTIVE order get the suggestion ring — the
  // Owner's ruling: "at least three players' draft buttons highlighted i think the user can speedrun
  // the suggestions that way". More than three ONLY on an order tie.
  // S14/P2 (the ring revival, 2026-11-20): the PRIMARY three are the first three ARRAY POSITIONS
  // of the engine-sorted rows — the pre-sorted row order, never a re-derivation from rendered text
  // or .cp-suggest nodes (the scoped no-display-parse law, board battery L24). The tie extension
  // is INTERIM — display-rounded, awaiting rawSort (the engine half is a §5 proposal to the
  // Architect, BLOCKED (engine half); the extension and L13's oracle stay PAIRED until it lands).
  // After a boot restore the PERSISTED ring (the autosave's suggestIds) drives the display —
  // auditable against stored data — until the next interaction clears it and the derivation
  // recomputes. The why lines ride the same derivation (one plain reason per ringed row, from the
  // SAME VM — never parsed text; not a board column: L12's uniform board is load-bearing).
  const ring = $derived.by(() => {
    const rows = shown as RingRow[];
    const stored = validSavedIds(savedSuggest, new Set(rows.map((r) => r.id)));
    const ids = stored ?? suggestIdsOf(rows, vm.sort);
    const byId = new Map(rows.map((r) => [r.id, r]));
    const why = new Map(ids.map((id, i) => {
      const row = byId.get(id);
      return [id, row ? whyFor(row, i, [...needsSelected]) : ''];
    }));
    return { ids: new Set(ids), why };
  });
  // Wave B #5 (ernie C1/C2, pickle B2): the decision surface — the needs × gone-risk heat strip
  // (one cell per open slot, the cells are the VM layer's PURE computation passed down) and the
  // pick-confidence chip (the engine's own order + the gone-margin; the honest interim shape —
  // decisionVM.pickConfidence does no display-string parsing). Both are pure reads; neither adds
  // a column to the uniform rows (L12 holds).
  const confidence = $derived.by(() => {
    const ids = [...ring.ids];
    if (ids.length < 2) return null;
    const rows = shown as RingRow[];
    const byId = new Map(rows.map((r) => [r.id, r]));
    const top = byId.get(ids[0]), next = byId.get(ids[1]);
    if (!top || !next) return null;
    return pickConfidence(top.wins, next.wins, null);
  });
</script>

<section class="cp-board" aria-label="Draft board">
  <BoardHeader header={vm.header} />
  <NeedsRow open={openSlots} selected={needsSelected} ontoggle={onneedtoggle} onclear={onneedclear} />
  {#if heat.length}
    <div class="cp-heat" aria-label="Needs by open slot — gone-risk heat (the cells are the engine VM's own numbers)">
      {#each heat as c (c.slot)}
        <span class="cp-heatcell" data-tone={c.tone} data-slot={c.slot} title={`{c.slot}: gone-risk ${(c.risk * 100).toFixed(0)}% — need ${c.need ? 'yes' : 'flex'}`}>{c.slot}</span>
      {/each}
    </div>
  {/if}
  {#if confidence}
    <p class="cp-confidence" data-verdict={confidence.verdict}>Top pick: <b>{confidence.topWins}</b> wins · next best: <b>{confidence.nextWins}</b> — {confidence.verdict} (INTERIM — display-rounded, awaiting rawSort)</p>
  {/if}
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
      <!-- T2/S15: onpick stages through the confirm banner (the panel's staged path); onpickDirect is
           the immediate dispatch — the row's ONE visible Draft button uses it (no expand, chip or
           confirm). busy rides down: pick controls disable while a dispatch is in flight. -->
      <BoardRow {r} onpick={(id, slot) => (picked = { id, slot })} onpickDirect={quickDraft} {oddsMeta} suggest={ring.ids.has(r.id)} why={ring.why.get(r.id) ?? ''} winsNeighbours={shown.filter((x) => x.id !== r.id).map((x) => x.wins)} {busy} />
    {/each}
  </div>
  <BoardFooter footer={vm.footer} canUndo={canUndo} onundo={onundo} onsort={onsort} sort={vm.sort} {onplay} {draftDone} {seedCode} {busy} />
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
  /* Wave B #5: the heat strip + the confidence chip — semantic tones, no new palette */
  .cp-heat { display: flex; gap: 6px; flex-wrap: wrap; margin: 8px 0 0; }
  .cp-heatcell { border: 1px solid #4a3a55; border-radius: 8px; padding: 3px 9px; font-size: 0.75rem; letter-spacing: 0.04em; color: #f5e9dd; background: #2c2127; }
  .cp-heatcell[data-tone='hot'] { border-color: #b3556a; color: #ffd9c9; background: color-mix(in srgb, #b3556a 22%, #2c2127); }
  .cp-heatcell[data-tone='warm'] { border-color: #ad7f2e; color: #ffe9c9; }
  .cp-heatcell[data-tone='calm'] { opacity: 0.75; }
  .cp-confidence { margin: 6px 0 0; font-size: 0.8rem; color: #c8a48f; }
  .cp-confidence b { color: var(--gold2); }
</style>
