<!-- Slice 4 — saves: three slots (A · B · C). SAVE writes the current draft as an envelope (the pin's
     own serialize); LOAD restores through the store's LOAD (the board re-renders for the saved team).
     Corrupt-never-repair: a refused slot's message is the engine's own, shown verbatim; the two
     PLANT buttons make both refusal paths (corrupt envelope, newer build's schema) reachable. -->
<script lang="ts">
  import { SLOT_LIST, readSlot, saveDraft, loadDraft, injectBroken } from '../savesService.ts';
  import type { SlotSummary } from '../savesService.ts';
  import type { SlotName } from '../../engine/core/envelope.ts';
  import { draftSnap, metaFor, loadIntoStore } from '../appStore.svelte.ts';
  import { TEAMS } from '../../engine/sports/nfl/engine/league.ts';

  let summaries = $state<SlotSummary[]>([]);
  let msg = $state<{ text: string; refused: boolean } | null>(null);

  async function refresh(): Promise<void> { summaries = await Promise.all(SLOT_LIST.map((s) => readSlot(s))); }
  $effect(() => { void refresh(); });

  async function doSave(slot: SlotName): Promise<void> {
    const rec = draftSnap().record;
    if (!rec) { msg = { text: 'no draft in progress — nothing to save', refused: true }; return; }
    const refusal = await saveDraft(slot, rec, await metaFor(rec), new Date());
    msg = refusal ? { text: refusal, refused: true } : { text: 'saved to slot ' + slot + ' · rev ' + (1 + rec.picks.length) + ' · ' + rec.picks.length + ' picks', refused: false };
    await refresh();
  }
  async function doLoad(slot: SlotName): Promise<void> {
    const r = await loadDraft(slot);
    if (!r.ok) { msg = { text: r.message, refused: true }; return; }
    loadIntoStore(r.record);
    const t = draftSnap().record?.userTeam;
    msg = { text: 'loaded slot ' + slot + ' — the board re-rendered for ' + (t !== undefined ? TEAMS[t].name : 'the saved team'), refused: false };
    await refresh();
  }
  async function doInject(kind: 'corrupt' | 'newer'): Promise<void> {
    await injectBroken('C', kind);
    msg = null;
    await refresh();
  }
  const teamName = (i: number | undefined): string => (i === undefined ? '' : TEAMS[i]?.name ?? '');
</script>

<section class="cp-screen" aria-label="Saves">
  <h3 class="cp-title">SAVES</h3>
  <p class="cp-screen-note">Three slots (A · B · C). Save writes the current draft as an envelope; load restores through the store's LOAD. A refused slot shows the engine's own message, verbatim.</p>
  {#if msg}<p class="cp-msg" class:cp-msg-refused={msg.refused}>{msg.text}</p>{/if}
  <div class="cp-saves-grid">
    {#each summaries as s (s.slot)}
      <div class="cp-save-slot">
        <div class="cp-save-slotname">SLOT {s.slot}</div>
        {#if s.state === 'empty'}
          <div class="cp-save-meta">empty</div>
        {:else if s.state === 'ok'}
          <div class="cp-save-meta">DRAFT · rev {s.saveRevision} · {s.picks} picks · {teamName(s.userTeamIndex)}</div>
          <div class="cp-save-meta">saved {s.savedAt?.replace('T', ' ').slice(0, 16)}</div>
        {:else}
          <div class="cp-save-refused">REFUSED ({s.problem}): {s.message}</div>
        {/if}
        <div class="cp-save-actions">
          <button class="cp-feedtool" onclick={() => doSave(s.slot)}>SAVE</button>
          <button class="cp-feedtool" onclick={() => doLoad(s.slot)}>LOAD</button>
        </div>
      </div>
    {/each}
  </div>
  <div class="cp-toolrow">
    <button class="cp-feedtool" onclick={() => doInject('corrupt')}>PLANT CORRUPT IN C</button>
    <button class="cp-feedtool" onclick={() => doInject('newer')}>PLANT NEWER-VERSION IN C</button>
  </div>
  <footer class="cp-feed-foot">
    <span>envelopes ride the pin's serialize/restore; the store re-parses on LOAD (one parser)</span>
    <span class="cp-feed-dim">corrupt-never-repair</span>
  </footer>
</section>
