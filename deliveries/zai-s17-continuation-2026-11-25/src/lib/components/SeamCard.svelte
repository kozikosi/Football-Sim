<!-- SeamCard.svelte — the Wave B #1 dev-gated provenance chip (hy4 #3, porca N1, pickle A1,
     ernie A1). Collapsed by default; visible only when the ?dev gate is on (the same gate the
     coach's tape rides). It renders seam-card.json — the ONE generated file the claims gate also
     reads — so the chip cannot disagree with the gate. Any missing field renders UNKNOWN, never a
     green default; the boot-time pin canary (the stampCanary field, cross-checked against the
     RUNNING engineVersion()) turns the whole card UNKNOWN on a mismatch — a shell running a
     different engine than its card claims is not provenance, it's a lie with extra steps. -->
<script lang="ts">
  import { HOOKS } from '../port/domHooks.ts';
  import card from '../../../seam-card.json';

  let { dev, runningStamp }: { dev: boolean; runningStamp?: string } = $props();
  let open = $state(false);

  // the boot-time pin canary (ernie A1): the card's snapshot stamp must appear in the RUNNING
  // engineVersion() — otherwise the card describes a different engine than the one executing.
  const canaryOk = typeof runningStamp === 'string' && !!card.stampSnapshot &&
    runningStamp.includes(String(card.stampSnapshot).split('.').pop() ?? '');
  const field = (v: unknown, pretty: string): string =>
    v === null || v === undefined || v === '' ? `${pretty}: UNKNOWN` : `${pretty}: ${String(v)}`;
  const stampShown = canaryOk ? card.stampSnapshot : 'UNKNOWN';
</script>

{#if dev}
  <div class="cp-seamcard" class:cp-seamopen={open}>
    {#if !canaryOk}
      <span class="cp-seambad" title="the running engine stamp does not match the card — provenance is UNKNOWN">⚠ PIN CANARY</span>
    {/if}
    <button class="cp-seambtn" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-seamdetail">
      {field(card.pin, 'Engine')} · seal {card.sealCount ?? 'UNKNOWN'} · claims {card.claims?.total ?? 'UNKNOWN'}
    </button>
    {#if open}
      <dl id="cp-seamdetail" class="cp-seamdetail">
        <dt>snapshot stamp</dt><dd>{stampShown}</dd>
        <dt>running engineVersion</dt><dd>{card.engineVersionRunning ?? 'UNKNOWN'}</dd>
        <dt>seal entries</dt><dd>{card.sealCount ?? 'UNKNOWN'}</dd>
        <dt>claims</dt><dd>{card.claims ? `${card.claims.total} total · ${card.claims.packagingPhase} in the packaging phase — node scripts/check-claims.mjs` : 'UNKNOWN'}</dd>
        <dt>dist fingerprint</dt><dd>{card.distHash ? String(card.distHash).slice(0, 16) + '…' : 'UNKNOWN'}</dd>
        <dt>card generated</dt><dd>{card.generated ?? 'UNKNOWN'}</dd>
      </dl>
    {/if}
  </div>
{/if}

<style>
  .cp-seamcard { position: fixed; left: 10px; bottom: 10px; z-index: 60; font-size: 0.72rem; }
  .cp-seambtn { background: rgba(20, 14, 28, 0.85); color: #c8a48f; border: 1px solid #4a3a55; border-radius: 8px; padding: 4px 10px; font: inherit; letter-spacing: 0.04em; }
  .cp-seambad { color: #ff9d7a; margin-right: 6px; font-weight: 800; letter-spacing: 0.08em; }
  .cp-seamdetail { margin: 6px 0 0; background: rgba(20, 14, 28, 0.92); border: 1px solid #4a3a55; border-radius: 10px; padding: 8px 12px; color: #f5e9dd; display: grid; grid-template-columns: auto 1fr; gap: 2px 10px; max-width: min(420px, calc(100vw - 32px)); }
  .cp-seamdetail dt { color: #c8a48f; }
  .cp-seamdetail dd { margin: 0; overflow-wrap: anywhere; }
</style>
