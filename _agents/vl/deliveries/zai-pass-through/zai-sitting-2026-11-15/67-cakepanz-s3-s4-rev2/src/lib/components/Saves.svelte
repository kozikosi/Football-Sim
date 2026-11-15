<!-- Slice 3 — the load/save UI: three slots (A/B/C), each read through the engine's own hydration.
     Corrupt-never-repair: a refused save is shown VERBATIM, never fixed up, never overwritten silently. -->
<script lang="ts">
  import { SLOTS, readSlot, saveDraftSlot, loadDraftSlot } from '../../lib/savesApp.ts';
  import type { SlotSummary } from '../../lib/savesApp.ts';
  import { TEAMS } from '../../engine/sports/nfl/engine/league.ts';

  let {
    record, meta, userTeamIndex, onclose, onloaddraft,
  }: {
    record: Record<string, unknown> | null;                       // the store's SaveRecord (frozen pool + pick log)
    meta: { engineVersion: string; dataVersion: string; saveId: string; saveRevision: number; createdAt: string } | null;
    userTeamIndex: number;
    onclose: () => void;
    onloaddraft: (record: unknown, lineage?: { saveId?: string; createdAt?: string }) => void;
  } = $props();

  const summaries = $state<Record<string, SlotSummary | null>>({ A: null, B: null, C: null });
  let notice = $state('');
  let hydrated = $state<SlotSummary | null>(null);   // a loaded week/season the panel is showing (the season screens are later slices)
  let busy = $state(false);

  async function refresh() {
    busy = true;
    for (const s of SLOTS) summaries[s] = await readSlot(s);
    busy = false;
  }
  // re-read the slots when the panel mounts or the draft record changes (NEVER tracked: busy/summaries —
  // refresh() writes them; tracking them here would re-trigger the effect forever)
  $effect(() => { void record; refresh(); });

  async function save(slot: string) {
    notice = '';
    if (!record || !meta) { notice = 'nothing to save — no draft is in progress'; return; }
    const err = await saveDraftSlot(slot as 'A' | 'B' | 'C', record as never, meta, new Date());
    if (err) notice = err;
    await refresh();
  }
  async function load(slot: string) {
    notice = ''; hydrated = null;
    const sum = summaries[slot];
    if (!sum || sum.state !== 'ok') { notice = 'nothing loadable in slot ' + slot; return; }
    if (sum.kind === 'draft') {
      const r = await loadDraftSlot(slot as 'A' | 'B' | 'C');
      if (!r.ok) { notice = 'refused: ' + r.message; await refresh(); return; }
      onloaddraft(r.record, { saveId: sum.saveId, createdAt: sum.createdAt });   // the lineage rides along
      onclose();
      return;
    }
    hydrated = sum;                    // week/season: the panel shows the hydrated state honestly
  }
</script>

<section class="cp-saves" aria-label="Save and load">
  <header class="cp-saves-head">
    <h2>Saves</h2>
    <span class="cp-saves-sub">slots A · B · C — written through the engine's envelope (saveId · revision · sha-256 dataset stamp)</span>
    <button class="cp-saves-x" onclick={onclose} aria-label="Close saves">✕</button>
  </header>
  {#if notice}<p class="cp-saves-notice" role="alert">{notice}</p>{/if}
  <div class="cp-slotgrid">
    {#each SLOTS as s (s)}
      {@const sum = summaries[s]}
      <article class="cp-slot" class:cp-slot-ok={sum?.state === 'ok'} class:cp-slot-bad={sum?.state === 'refused'} data-slot={s}>
        <h3>Slot {s}</h3>
        {#if !sum || sum.state === 'empty'}
          <p class="cp-slot-empty">empty</p>
        {:else if sum.state === 'refused'}
          <p class="cp-slot-refused"><b>REFUSED ({sum.problem})</b> — corrupt-never-repair</p>
          <p class="cp-slot-msg">{sum.message}</p>
        {:else}
          <p class="cp-slot-kind">{sum.kind?.toUpperCase()} · rev {sum.saveRevision}</p>
          {#if sum.kind === 'draft'}
            <p class="cp-slot-line">{sum.picks} picks · {TEAMS[sum.userTeamIndex ?? 0]?.name ?? '?'}</p>
          {:else}
            <p class="cp-slot-line">{sum.userTeam} · next: week {sum.week}</p>
            <p class="cp-slot-line cp-slot-dim">{sum.nextFixture} · {sum.played} games played</p>
          {/if}
          <p class="cp-slot-dim">saved {sum.savedAt?.slice(0, 16).replace('T', ' ')}</p>
          <button class="cp-slot-load" onclick={() => load(s)}>Load {sum.kind}</button>
        {/if}
        <button class="cp-slot-save" onclick={() => save(s)} disabled={!record}>Save draft here</button>
      </article>
    {/each}
  </div>
  {#if hydrated}
    <aside class="cp-hydrated" aria-label="Hydrated season">
      <h3>Hydrated — {hydrated.kind} save, slot {hydrated.slot}</h3>
      <p class="cp-slot-line">{hydrated.userTeam} · next week {hydrated.week} · {hydrated.nextFixture}</p>
      <p class="cp-slot-dim">{hydrated.played} games played · the table, seeding and champion were RE-DERIVED by the engine (trusted: ratings, roster, scores, plan)</p>
      <p class="cp-slot-dim">the season screens ride a later slice — the hydration itself is proven (this card renders the engine's LoadedWeek)</p>
    </aside>
  {/if}
  <p class="cp-saves-foot">A refused save is <b>never repaired</b> — the reason above is the engine's own verdict (hydrateWeek / parseEnvelope).</p>
</section>

<style>
  .cp-saves { border: 1px solid #3a2c31; border-radius: 14px; background: #221820; padding: 16px; margin: 12px 0; }
  .cp-saves-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .cp-saves-head h2 { margin: 0; color: #e8c87e; letter-spacing: 0.08em; font-size: 1.1rem; }
  .cp-saves-sub { flex: 1; min-width: 200px; color: #c8a48f; font-size: 0.78rem; }
  .cp-saves-x { background: transparent; border: 1px solid #8a5f18; color: #e8c87e; border-radius: 8px; cursor: pointer; padding: 4px 10px; font-family: inherit; }
  .cp-saves-notice { border: 1px solid #e08573; border-radius: 10px; color: #ff8d7e; padding: 8px 12px; font-size: 0.85rem; }
  .cp-slotgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin: 12px 0; }
  .cp-slot { border: 1px solid #3a2c31; border-radius: 12px; padding: 12px; background: #1b1319; }
  .cp-slot-ok { border-color: #4a6b52; }
  .cp-slot-bad { border-color: #7e463c; }
  .cp-slot h3 { margin: 0 0 6px; color: #f5e9dd; font-size: 0.95rem; }
  .cp-slot-kind { color: #e8c87e; font-weight: 700; font-size: 0.82rem; letter-spacing: 0.08em; margin: 0; }
  .cp-slot-line { color: #f5e9dd; font-size: 0.85rem; margin: 4px 0 0; }
  .cp-slot-dim { color: #c8a48f; font-size: 0.76rem; margin: 4px 0 0; }
  .cp-slot-empty { color: #c8a48f; font-size: 0.85rem; }
  .cp-slot-refused { color: #ff8d7e; font-weight: 700; font-size: 0.8rem; margin: 0; }
  .cp-slot-msg { color: #c8a48f; font-size: 0.76rem; overflow-wrap: anywhere; }
  .cp-slot-save, .cp-slot-load { display: inline-block; margin: 10px 8px 0 0; border: 1px solid #8a5f18; background: transparent; color: #e8c87e; border-radius: 999px; padding: 5px 14px; cursor: pointer; font-family: inherit; font-size: 0.8rem; }
  .cp-slot-save:disabled { opacity: 0.4; cursor: default; }
  .cp-slot-save:hover:not(:disabled), .cp-slot-load:hover { background: rgba(217, 169, 76, 0.12); }
  .cp-slot-load { background: rgba(217, 169, 76, 0.16); font-weight: 700; }
  .cp-hydrated { border: 1px solid #4a6b52; border-radius: 12px; padding: 12px; background: #18201a; }
  .cp-hydrated h3 { margin: 0 0 6px; color: #72c18e; font-size: 0.95rem; }
  .cp-saves-foot { color: #c8a48f; font-size: 0.76rem; }
  .cp-saves-foot b { color: #f5e9dd; }
</style>
