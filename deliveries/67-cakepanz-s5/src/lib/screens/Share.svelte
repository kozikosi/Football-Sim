<!-- Slice 5 — the share screen (N2): the brag shareable + the seed card, as static artifacts.
     WHAT YOU SEE IS WHAT DOWNLOADS: both cards render from the same view-model (shareVM.ts — engine-true
     plain JSON), and SAVE PNG draws the same numbers onto a canvas and hands the user the file. The
     artifact is static by construction: an image carrying the result and the proof in its own bytes —
     not a link back into the app. -->
<script lang="ts">
  import type { BragVM, SeedVM } from '../shareVM.ts';
  import { bragPng, seedPng } from '../bragCard.ts';

  let { vm, seed, note, onclose }: {
    vm: BragVM | null;          // null: the save holds no result (draft/week) — the seed card shares the run
    seed: SeedVM;
    note: string;
    onclose: () => void;
  } = $props();

  let saving = $state('');
  let savedNote = $state('');

  // the headline's two segments, colored like the feed's final card (the user's segment in the team ink)
  const segs = $derived(vm ? vm.headline.split(' · ') : []);
  const fileOf = (s: string): string => s.replace(/[^0-9a-zA-Z]+/g, '-').toLowerCase();

  async function saveBrag() {
    if (!vm) return;
    saving = 'brag'; savedNote = '';
    try {
      const blob = await bragPng(vm);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `76-pancakes-${vm.kind}-${fileOf(vm.headline)}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      savedNote = 'the brag card is saved — a PNG, static, postable anywhere';
    } catch (e) { savedNote = (e as Error).message; }
    saving = '';
  }
  async function saveSeed() {
    saving = 'seed'; savedNote = '';
    try {
      const blob = await seedPng(seed);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `76-pancakes-seed-${fileOf(seed.seedValue)}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      savedNote = 'the seed card is saved — the proof travels with it';
    } catch (e) { savedNote = (e as Error).message; }
    saving = '';
  }
</script>

<section class="cp-share" aria-label="Share the result">
  <header class="cp-share-head">
    <h2>Share the result</h2>
    <span class="cp-share-sub">a static card + the seed card — the result, the proof, nothing else</span>
    <button class="cp-saves-x" onclick={onclose} aria-label="Close share">✕</button>
  </header>
  <p class="cp-share-note">{note}</p>

  {#if vm}
    <article class="cp-brag" aria-label="The brag card">
      <p class="cp-brag-eyebrow">{vm.eyebrow}</p>
      <p class="cp-brag-headline">
        {#if segs.length === 2}
          <span style="color:{vm.headlineInks.me}">{segs[0]}</span>
          <span class="cp-brag-dot"> · </span>
          <span style="color:{vm.headlineInks.opp}">{segs[1]}</span>
        {:else}
          <span style="color:{vm.headlineInks.me}">{vm.headline}</span>
        {/if}
      </p>
      <p class="cp-brag-outcome">{vm.outcome}</p>
      <p class="cp-brag-facts">
        {#each vm.facts as f (f.label)}
          <span class="cp-brag-fact"><i>{f.label}</i> {f.value}</span>
        {/each}
      </p>
      <div class="cp-brag-proof">
        {#each vm.proof as f (f.label)}
          <p class="cp-brag-proofline"><i>{f.label}:</i> {f.value}</p>
        {/each}
      </div>
      <p class="cp-brag-foot">{vm.foot}</p>
    </article>
    <button class="cp-share-save" onclick={saveBrag} disabled={saving !== ''}>SAVE PNG — the brag card</button>
  {/if}

  <article class="cp-seedcard" aria-label="The seed card">
    <p class="cp-seed-title">{seed.title}</p>
    <p class="cp-seed-label">{seed.seedLabel.toUpperCase()}</p>
    <p class="cp-seed-value">{seed.seedValue}</p>
    <p class="cp-seed-derived"><i>{seed.derivedLabel}</i> — {seed.derivedValue}</p>
    <ul class="cp-seed-steps">
      {#each seed.steps as s, i (i)}
        <li>{s}</li>
      {/each}
    </ul>
    <div class="cp-seed-prov">
      {#each seed.provenance as f (f.label)}
        <p class="cp-brag-proofline"><i>{f.label}:</i> {f.value}</p>
      {/each}
    </div>
    <p class="cp-brag-foot">{seed.foot}</p>
  </article>
  <button class="cp-share-save" onclick={saveSeed} disabled={saving !== ''}>SAVE PNG — the seed card</button>

  {#if savedNote}<p class="cp-share-saved" role="status">{savedNote}</p>{/if}
  <p class="cp-share-static"><b>Static by construction:</b> the PNG is an image carrying the result and the proof in its own bytes — no link back into the app, nothing fetched, nothing remote. Anyone with the seed can replay the same run on the pinned engine and see the same numbers.</p>
</section>

<style>
  .cp-share { border: 1px solid #3a2c31; border-radius: 14px; background: #221820; padding: 16px; margin: 12px 0; }
  .cp-share-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .cp-share-head h2 { margin: 0; color: #e8c87e; letter-spacing: 0.08em; font-size: 1.1rem; }
  .cp-share-sub { flex: 1; min-width: 200px; color: #c8a48f; font-size: 0.78rem; }
  .cp-saves-x { background: transparent; border: 1px solid #8a5f18; color: #e8c87e; border-radius: 8px; cursor: pointer; padding: 4px 10px; font-family: inherit; }
  .cp-share-note { color: #c8a48f; font-size: 0.78rem; margin: 6px 0 0; }

  .cp-brag { border: 1px solid #3a2c31; border-radius: 12px; background: #181114; padding: 22px 16px; margin: 12px 0; text-align: center; }
  .cp-brag-eyebrow { color: #c8a48f; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.22em; margin: 0 0 10px; }
  .cp-brag-headline { font-family: Georgia, 'Times New Roman', serif; font-size: 2.3rem; font-weight: 800; margin: 0; letter-spacing: 0.04em; }
  .cp-brag-dot { color: #c8a48f; }
  .cp-brag-outcome { color: #e8c87e; font-weight: 800; letter-spacing: 0.12em; font-size: 0.95rem; margin: 8px 0 0; }
  .cp-brag-facts { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin: 14px 0 0; }
  .cp-brag-fact { border: 1px solid #3a2c31; border-radius: 10px; background: rgba(245, 233, 221, 0.04); color: #f5e9dd; padding: 5px 12px; font-size: 0.82rem; }
  .cp-brag-fact i { color: #c8a48f; font-style: normal; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-right: 4px; }
  .cp-brag-proof { margin: 16px auto 0; max-width: 640px; border-top: 1px solid #3a2c31; padding-top: 10px; text-align: left; }
  .cp-brag-proofline { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.74rem; margin: 3px 0; overflow-wrap: anywhere; }
  .cp-brag-proofline i { color: #c8a48f; font-style: normal; }
  .cp-brag-foot { color: #c8a48f; font-style: italic; font-size: 0.78rem; margin: 12px 0 0; }

  .cp-seedcard { border: 1px solid #3a2c31; border-radius: 12px; background: #181114; padding: 22px 16px; margin: 12px 0; text-align: center; }
  .cp-seed-title { color: #f5e9dd; font-weight: 800; letter-spacing: 0.06em; margin: 0 0 8px; }
  .cp-seed-label { color: #c8a48f; font-size: 0.66rem; font-weight: 800; letter-spacing: 0.22em; margin: 8px 0 0; }
  .cp-seed-value { color: #d9a94c; font-family: Georgia, 'Times New Roman', serif; font-size: 3.4rem; font-weight: 900; margin: 0; line-height: 1.1; }
  .cp-seed-derived { color: #f5e9dd; font-size: 0.85rem; margin: 6px 0 0; }
  .cp-seed-derived i { color: #c8a48f; font-style: normal; font-weight: 800; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; }
  .cp-seed-steps { list-style: none; margin: 14px auto 0; padding: 0; max-width: 620px; text-align: left; }
  .cp-seed-steps li { color: #f5e9dd; font-size: 0.85rem; margin: 6px 0; padding-left: 18px; position: relative; }
  .cp-seed-steps li::before { content: '—'; position: absolute; left: 0; color: #e8c87e; }
  .cp-seed-prov { margin: 14px auto 0; max-width: 620px; border-top: 1px solid #3a2c31; padding-top: 10px; text-align: left; }

  .cp-share-save { display: block; margin: 10px auto; border: 1px solid #8a5f18; background: rgba(217, 169, 76, 0.16); color: #e8c87e; border-radius: 999px; padding: 7px 20px; cursor: pointer; font-family: inherit; font-size: 0.82rem; font-weight: 800; letter-spacing: 0.08em; }
  .cp-share-save:hover:not(:disabled) { background: rgba(217, 169, 76, 0.28); }
  .cp-share-save:disabled { opacity: 0.5; cursor: default; }
  .cp-share-saved { color: #72c18e; font-size: 0.82rem; text-align: center; margin: 4px 0 0; }
  .cp-share-static { color: #c8a48f; font-size: 0.76rem; border-top: 1px solid #3a2c31; padding-top: 8px; margin-bottom: 0; }
  .cp-share-static b { color: #f5e9dd; }
</style>
