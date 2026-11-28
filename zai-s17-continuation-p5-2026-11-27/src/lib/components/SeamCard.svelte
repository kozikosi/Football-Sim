<!-- SeamCard.svelte — the Wave B #1 dev-gated provenance chip (hy4 #3, porca N1, pickle A1,
     ernie A1). Collapsed by default; visible only when the ?dev gate is on (the same gate the
     coach's tape rides). It renders seam-card.json — the ONE generated file the claims gate also
     reads — so the chip cannot disagree with the gate. Any missing field renders UNKNOWN, never a
     green default; the boot-time pin canary (the stampCanary field, cross-checked against the
     RUNNING engineVersion()) turns the whole card UNKNOWN on a mismatch — a shell running a
     different engine than its card claims is not provenance, it's a lie with extra steps.
     item 10 (orcads R9 + porca B1): (a) the canary/stamp are ONE $derived over the generated card
     — the old init-once values kept the FIRST verdict for a restored session's whole life; (b) the
     card is BYTE-LATCHED to the running build: the card's treeSha must equal the build-embedded
     __CP_TREE_SHA__ (vite.config.js computes both over the same source walk) — unequal or missing
     renders `UNKNOWN · generated before the last edit` with NO numeric fields at all (no
     default-green); (c) the RUNNING engineVersion() is shown from the prop, never the JSON's
     frozen field; (d) no `document` access (P-368 seam neutrality) — Svelte 5 runes only. -->
<script lang="ts">
  import { HOOKS } from '../port/domHooks.ts';
  import cardJson from '../../../seam-card.json';

  let { dev, runningStamp }: { dev: boolean; runningStamp?: string } = $props();

  // the build-embedded source-tree hash (vite.config.js define) — the byte-latch's live side
  declare const __CP_TREE_SHA__: string;

  // ONE $derived over the generated card: every verdict below recomputes from the CURRENT props
  // and card — a restored session can never keep a stale verdict (the R9 defect class).
  const view = $derived.by(() => {
    const card = cardJson as Record<string, any>;
    const buildSha: string = typeof __CP_TREE_SHA__ === 'string' ? __CP_TREE_SHA__ : '';
    const latched = buildSha.length > 0 && typeof card.treeSha === 'string' && card.treeSha === buildSha;
    const canaryOk = !latched
      ? false
      : typeof runningStamp === 'string' && !!card.stampSnapshot &&
        runningStamp.includes(String(card.stampSnapshot).split('.').pop() ?? '');
    const stampShown = canaryOk ? String(card.stampSnapshot ?? 'UNKNOWN') : 'UNKNOWN';
    const liveStamp = typeof runningStamp === 'string' && runningStamp ? runningStamp : 'UNKNOWN';
    return { card, latched, canaryOk, stampShown, liveStamp };
  });

  const field = (v: unknown, pretty: string): string =>
    v === null || v === undefined || v === '' ? `${pretty}: UNKNOWN` : `${pretty}: ${String(v)}`;

  // the chip is a PROVENANCE DISPLAY, not a control: it takes no pointer events at all (a floating
  // chip over the board intercepted the draft buttons' clicks — the 390 walk died on it). It
  // expands from the URL instead: ?seamcard=1 (dev builds only). Zero pointer interception,
  // fully measurable, still readable by a human in dev.
  const open = $derived(dev && new URLSearchParams(location.search).has('seamcard'));
</script>

{#if dev}
  <div class="cp-seamcard" class:cp-seamopen={open}>
    {#if !view.latched}
      <span class="cp-seambad" title="the card was generated before the last edit (treeSha mismatch or missing) — provenance is UNKNOWN">⚠ CARD LATCH</span>
      <span class="cp-seambtn">UNKNOWN · generated before the last edit</span>
      {#if open}
        <dl id="cp-seamdetail" class="cp-seamdetail">
          <dt>card latch</dt><dd>UNKNOWN · generated before the last edit — no numeric fields are shown on a latch mismatch (never a green default)</dd>
        </dl>
      {/if}
    {:else}
      {#if !view.canaryOk}
        <span class="cp-seambad" title="the running engine stamp does not match the card — provenance is UNKNOWN">⚠ PIN CANARY</span>
      {/if}
      <span class="cp-seambtn">
        {field(view.card.pin, 'Engine')} · seal {view.card.sealCount ?? 'UNKNOWN'} · claims {view.card.claims?.total ?? 'UNKNOWN'}
      </span>
      {#if open}
        <dl id="cp-seamdetail" class="cp-seamdetail">
          <dt>snapshot stamp</dt><dd>{view.stampShown}</dd>
          <dt>running engineVersion</dt><dd>{view.liveStamp}</dd>
          <dt>seal entries</dt><dd>{view.card.sealCount ?? 'UNKNOWN'}</dd>
          <dt>claims</dt><dd>{view.card.claims ? `${view.card.claims.total} total · ${view.card.claims.packagingPhase} in the packaging phase — node scripts/check-claims.mjs` : 'UNKNOWN'}</dd>
          <dt>dist fingerprint (at card generation)</dt><dd>{view.card.distHash ? String(view.card.distHash).slice(0, 16) + '… — the dist walk WHEN THE CARD WAS GENERATED; the shipped dist identity lives in dist-manifest.json (the card rides inside the build, so it cannot hash the dist it is embedded in)' : 'UNKNOWN'}</dd>
          <dt>card treeSha (byte-latch)</dt><dd>{view.card.treeSha ? String(view.card.treeSha).slice(0, 16) + '… — latched to this build' : 'UNKNOWN'}</dd>
          <dt>card sealed over</dt><dd>{view.card.sealedOver ? String(view.card.sealedOver).slice(0, 16) + '… — the receipt of record' : 'UNKNOWN'}</dd>
        </dl>
      {/if}
    {/if}
  </div>
{/if}

<style>
  /* the wrapper NEVER intercepts pointer events — the chip floats over the board's own controls
     (the sticky needs row, the draft buttons) and a floating provenance chip must not block them;
     only the chip's own interactive surfaces take pointers back. */
  .cp-seamcard { position: fixed; left: 10px; bottom: 10px; z-index: 60; font-size: 0.72rem; pointer-events: none; }
  .cp-seambad { pointer-events: auto; }
  .cp-seamdetail { pointer-events: auto; }
  .cp-seambtn { background: rgba(20, 14, 28, 0.85); color: #c8a48f; border: 1px solid #4a3a55; border-radius: 8px; padding: 4px 10px; font: inherit; letter-spacing: 0.04em; }
  .cp-seambad { color: #ff9d7a; margin-right: 6px; font-weight: 800; letter-spacing: 0.08em; }
  .cp-seamdetail { margin: 6px 0 0; background: rgba(20, 14, 28, 0.92); border: 1px solid #4a3a55; border-radius: 10px; padding: 8px 12px; color: #f5e9dd; display: grid; grid-template-columns: auto 1fr; gap: 2px 10px; max-width: min(420px, calc(100vw - 32px)); }
  .cp-seamdetail dt { color: #c8a48f; }
  .cp-seamdetail dd { margin: 0; overflow-wrap: anywhere; }
</style>
