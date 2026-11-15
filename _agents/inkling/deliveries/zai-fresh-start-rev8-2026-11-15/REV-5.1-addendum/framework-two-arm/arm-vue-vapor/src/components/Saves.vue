<!-- Slice 4 — saves (Vue 3): three slots (A · B · C). SAVE writes the current draft as an envelope
     (the pin's own serialize); LOAD restores through the store's LOAD (the board re-renders for the
     saved team). Corrupt-never-repair: a refused slot's message is the engine's own, shown verbatim;
     the two PLANT buttons make both refusal paths (corrupt envelope, newer build's schema) reachable. -->
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { SLOT_LIST, readSlot, saveDraft, loadDraft, injectBroken } from '../lib/savesService.ts';
  import type { SlotSummary } from '../lib/savesService.ts';
  import type { SlotName } from '../engine/core/envelope.ts';
  import { draftSnap, metaFor, loadIntoStore } from '../lib/appStore.ts';
  import { TEAMS } from '../engine/sports/nfl/engine/league.ts';

  const summaries = ref<SlotSummary[]>([]);
  const msg = ref<{ text: string; refused: boolean } | null>(null);

  async function refresh(): Promise<void> { summaries.value = await Promise.all(SLOT_LIST.map((s) => readSlot(s))); }
  onMounted(() => { void refresh(); });

  async function doSave(slot: SlotName): Promise<void> {
    const rec = draftSnap.value.record;
    if (!rec) { msg.value = { text: 'no draft in progress — nothing to save', refused: true }; return; }
    const refusal = await saveDraft(slot, rec, await metaFor(rec), new Date());
    msg.value = refusal ? { text: refusal, refused: true } : { text: 'saved to slot ' + slot + ' · rev ' + (1 + rec.picks.length) + ' · ' + rec.picks.length + ' picks', refused: false };
    await refresh();
  }
  async function doLoad(slot: SlotName): Promise<void> {
    const r = await loadDraft(slot);
    if (!r.ok) { msg.value = { text: r.message, refused: true }; return; }
    loadIntoStore(r.record);
    const t = draftSnap.value.record?.userTeam;
    msg.value = { text: 'loaded slot ' + slot + ' — the board re-rendered for ' + (t !== undefined ? TEAMS[t].name : 'the saved team'), refused: false };
    await refresh();
  }
  async function doInject(kind: 'corrupt' | 'newer'): Promise<void> {
    await injectBroken('C', kind);
    msg.value = null;
    await refresh();
  }
  const teamName = (i: number | undefined): string => (i === undefined ? '' : TEAMS[i]?.name ?? '');
</script>

<template>
  <section class="cp-screen" aria-label="Saves">
    <h3 class="cp-title">SAVES</h3>
    <p class="cp-screen-note">Three slots (A · B · C). Save writes the current draft as an envelope; load restores through the store's LOAD. A refused slot shows the engine's own message, verbatim.</p>
    <p v-if="msg" class="cp-msg" :class="{ 'cp-msg-refused': msg.refused }">{{ msg.text }}</p>
    <div class="cp-saves-grid">
      <div v-for="s in summaries" :key="s.slot" class="cp-save-slot">
        <div class="cp-save-slotname">SLOT {{ s.slot }}</div>
        <div v-if="s.state === 'empty'" class="cp-save-meta">empty</div>
        <template v-else-if="s.state === 'ok'">
          <div class="cp-save-meta">DRAFT · rev {{ s.saveRevision }} · {{ s.picks }} picks · {{ teamName(s.userTeamIndex) }}</div>
          <div class="cp-save-meta">saved {{ s.savedAt?.replace('T', ' ').slice(0, 16) }}</div>
        </template>
        <div v-else class="cp-save-refused">REFUSED ({{ s.problem }}): {{ s.message }}</div>
        <div class="cp-save-actions">
          <button class="cp-feedtool" @click="doSave(s.slot)">SAVE</button>
          <button class="cp-feedtool" @click="doLoad(s.slot)">LOAD</button>
        </div>
      </div>
    </div>
    <div class="cp-toolrow">
      <button class="cp-feedtool" @click="doInject('corrupt')">PLANT CORRUPT IN C</button>
      <button class="cp-feedtool" @click="doInject('newer')">PLANT NEWER-VERSION IN C</button>
    </div>
    <footer class="cp-feed-foot">
      <span>envelopes ride the pin's serialize/restore; the store re-parses on LOAD (one parser)</span>
      <span class="cp-feed-dim">corrupt-never-repair</span>
    </footer>
  </section>
</template>
