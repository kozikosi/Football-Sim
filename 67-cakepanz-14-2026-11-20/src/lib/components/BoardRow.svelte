<!-- The row: name, position, OVR, wins, priority, gone-odds, the flex options (the chips read the flex cost).
     Slice 3: the gone% cell carries the METHOD tooltip (hover) — the engine already computed the odds;
     the shell never told the user how. The meta (sims, picksBetween) rides down from App.
     cakepanz-9 (2026-11-19, the Owner's ruling): ONE uniform row for every pick — the late simple
     branch is SUPERSEDED and deleted (the order §5/B-bis). The WINS/PRIO/OVR captions STAYED (the
     8.1 REC texts now name the uniform row's numeric cells — a bare number still says what it is);
     the detail container is always present (hidden when closed) so aria-controls always resolves
     (the A8e fix); the top-three suggestion carries the gold ring on the row's pick control (C′1). -->
<script lang="ts">
  import type { BoardRowVM } from '../port/seam.ts';
  let { r, onpick, onpickDirect, oddsMeta = null, suggest = false, why = '' }: { r: BoardRowVM; onpick: (id: string, slot: string) => void; onpickDirect?: (id: string, slot: string) => void; oddsMeta?: { picksBetween: number; sims: number } | null; suggest?: boolean; why?: string } = $props();
  let open = $state(false);
  // the numeric cells name their field — the caption texts are the 8.1 REC strings, kept verbatim
  const CAP = {
    ovr: 'OVR — the raw rating; the board never ranks by it by default',
    wins: 'Wins — what the board ranks by',
    priority: 'Priority — what the board ranks by while the Priority sort is on',
  };
  const method = (m: { picksBetween: number; sims: number } | null): string =>
    m ? `GONE% — how often the CPU took him before your next pick: the ${m.picksBetween} picks between now and your turn were replayed ${m.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.` : 'GONE% — the CPU replay estimate (no replay while the CPU is on the clock).';
</script>

<div class="cp-row cp-{r.tone}" class:cp-suggest={suggest} data-id={r.id}>
  <div class="cp-rowtop">
    <button class="cp-main" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">
      <span class="cp-name">{r.name}</span>
      <span class="cp-pos">{r.pos}</span>
      <span class="cp-nflteam">{r.nflTeam}</span>
      <!-- T6/D2 (cakepanz-12): a value cell's aria-label used to REPLACE the value with the column
           name — a screen-reader user heard "OVR", never the number. The label now ANNOUNCES the
           value (the column name rides the hover title, which never replaced the name). -->
      <span class="cp-num cp-ovr" title={CAP.ovr} aria-label="{r.ovr} overall">{r.ovr}</span>
      <span class="cp-num" title={CAP.wins} aria-label="{r.wins} wins">{r.wins}</span>
      <span class="cp-num" title={CAP.priority} aria-label="{r.priority} priority">{r.priority}</span>
      <span class="cp-gone-wrap">
        <!-- T4: the gone% cell carries its method programmatically — the .cp-sr copy is the screen-reader
             source of truth; the hover tooltip stays a decorative duplicate (the D3 ruling) -->
        <span class="cp-num cp-gone" aria-label="{r.gone} gone odds" aria-describedby="cp-gone-desc-{r.id}">{r.gone}</span>
        <span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>
      </span>
    </button>
    {#if suggest}
      <!-- T2 (the Owner's w89 signal): ONE click drafts a ringed row — no expand, chip or confirm
           (the call goes straight to the store's PICK). The slot is NAMED on the button (a player
           fits several slots; a bare "Draft" silently chooses one). The expand path below stays
           for the flex alternatives. -->
      <button class="cp-quick" onclick={() => (onpickDirect ?? onpick)(r.id, r.slotId)}>Draft {r.name} at {r.slotLabel}</button>
      <!-- S14/P2 (§3.6): the ring reason — one plain line from the SAME VM (never parsed text),
           inside the row the user already has; not a board column (L12's uniform board is
           load-bearing). Not focusable — the L21 Tab order (main → quick → the method copy)
           is unchanged. -->
      {#if why}<span class="cp-why">{why}</span>{/if}
    {/if}
    <!-- T6/S3 (cakepanz-12): the gone% method is FOCUSABLE (tabindex="0") and sits AFTER the row's
         buttons — keyboard users reach it by tabbing through the row, and on focus it REVEALS
         (a hidden focus target is a trap, not a feature). It stays the aria-describedby target of
         the gone cell above (the reference works document-wide; A8e's always-exists rule holds). -->
    <span class="cp-sr" id="cp-gone-desc-{r.id}" tabindex="0">{method(oddsMeta)}</span>
  </div>
  <div class="cp-fits" id="cp-fit-{r.id}" hidden={!open}>
    <span class="cp-fitlbl">Fills {r.slotLabel}{r.natural ? '' : ' (flex)'}</span>
    {#each r.alsoFits as f}
      <button class="cp-chip" onclick={() => onpick(r.id, f.slotId)}>{f.slotLabel} <i>{f.flex}</i></button>
    {/each}
    <button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)}>Draft at {r.slotLabel}</button>
    <p class="cp-gonehow">{method(oddsMeta)}</p>
  </div>
</div>

<style>
  .cp-row { border-bottom: 1px solid #3a2c31; }
  .cp-main { display: grid; grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px; width: 100%;
    background: transparent; border: 0; color: inherit; font-family: inherit; text-align: left; padding: 8px 6px; cursor: pointer; }
  /* the 390px law (this sitting): the desk grid's fixed columns (336px + 48px gaps + 12px padding)
     overflow a 390px viewport — the gone% column sat outside the row box. On a phone the fixed
     columns tighten so scrollWidth == clientWidth (the battery's board-at-390 law holds). */
  @media (max-width: 430px) {
    .cp-main { grid-template-columns: 1fr 30px 34px 40px 52px 58px 46px; gap: 5px; padding: 8px 4px; }
  }
  .cp-main:hover { background: color-mix(in srgb, var(--goldm) 7%, transparent); }
  /* T2: the row top holds the main row and — on a ringed row — the ONE-CLICK draft button.
     Desktop: it sits beside the grid; a phone wraps it to its own line (the 390 law holds:
     wrap, never overflow). */
  .cp-rowtop { display: flex; align-items: center; }
  .cp-rowtop .cp-main { flex: 1 1 auto; min-width: 0; }
  .cp-quick { flex: 0 0 auto; margin-left: 8px; border: 1px solid var(--gold2); background: color-mix(in srgb, var(--goldm) 20%, transparent);
    color: var(--gold2); border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; font-size: 0.82rem;
    font-weight: 800; white-space: nowrap; }
  .cp-quick:hover { background: color-mix(in srgb, var(--goldm) 32%, transparent); }
  /* S14/P2 (§3.6): the ring reason — small, muted, never a column; wraps below the button on a
     phone (the 390 law holds: wrap, never overflow). */
  .cp-why { flex: 0 1 auto; min-width: 0; overflow-wrap: anywhere; margin-left: 8px; font-size: 0.72rem; line-height: 1.4; color: #c8a48f; }
  @media (max-width: 430px) {
    .cp-why { flex-basis: 100%; margin: 0 6px 4px; }
  }
  @media (max-width: 430px) {
    .cp-rowtop { flex-wrap: wrap; }
    .cp-quick { flex-basis: 100%; margin: 0 6px 6px; white-space: normal; text-align: center; }
  }
  .cp-name { font-weight: 700; color: #f5e9dd; overflow-wrap: anywhere; }
  .cp-pos, .cp-nflteam { color: #c8a48f; font-size: 0.8rem; }
  .cp-num { font-variant-numeric: tabular-nums; text-align: right; }
  .cp-ovr { font-weight: 800; color: var(--gold2); }
  .cp-good .cp-num:first-of-type { color: #72c18e; }
  .cp-bad .cp-num { color: #e08573; }
  .cp-gone { color: #c8a48f; }
  .cp-gone-wrap { position: relative; display: inline-flex; justify-content: flex-end; }
  .cp-gonetip { position: absolute; right: 0; top: calc(100% + 6px); z-index: 9; width: min(240px, calc(100vw - 32px)); display: none;
    background: #2c2127; border: 1px solid var(--gold3); border-radius: 10px; color: #f5e9dd;
    font-size: 0.72rem; line-height: 1.45; padding: 8px 10px; text-align: left; box-shadow: 0 8px 18px rgba(0,0,0,0.45); }
  .cp-gone-wrap:hover .cp-gonetip { display: block; }
  @media (prefers-reduced-motion: reduce) { .cp-gonetip { transition: none; } }
  /* the detail container ALWAYS exists (hidden when closed) — aria-controls always resolves (A8e) */
  .cp-fits { display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 6px 10px 12px; align-items: center; }
  .cp-fits[hidden] { display: none; }
  .cp-fitlbl { font-size: 0.78rem; color: #c8a48f; }
  .cp-gonehow { flex-basis: 100%; margin: 2px 0 0; font-size: 0.72rem; line-height: 1.4; color: #c8a48f; }
  /* T4: the visually-hidden method copy — the screen-reader source of truth for the gone% cell
     (the hover tooltip stays decorative; the method is never ONLY hidden from assistive tech). */
  .cp-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
  /* T6/S3 (cakepanz-12): the method copy is FOCUSABLE (tabindex="0") — keyboard users reach it, and
     on focus it REVEALS (a hidden focus target is a trap, not a feature). The hover tooltip rule
     above is untouched (D2ii holds). */
  .cp-sr:focus { position: static; width: auto; height: auto; margin: 0; padding: 2px 8px; overflow: visible; clip: auto; white-space: normal;
    display: block; max-width: 100%; border-radius: 8px; background: #2c2127; outline: 2px solid var(--gold2); outline-offset: 2px; }
  /* T4: keyboard focus is VISIBLE on every control of the row (Tab/Enter path). */
  .cp-main:focus-visible, .cp-chip:focus-visible, .cp-quick:focus-visible { outline: 2px solid var(--gold2); outline-offset: 2px; }
  .cp-chip { border: 1px solid var(--gold3); background: transparent; color: var(--gold2); border-radius: 999px; padding: 4px 12px; cursor: pointer; font-family: inherit; font-size: 0.8rem; }
  .cp-chip i { font-style: normal; color: #c8a48f; }
  .cp-chip:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  .cp-primary { background: color-mix(in srgb, var(--goldm) 16%, transparent); font-weight: 700; }
  /* C′1 (cakepanz-9): the top three rows by the board's active order carry the suggestion ring on
     the row's pick control — the Owner's speedrun path ("at least three players' draft buttons
     highlighted"). More than three only on an order tie (DraftBoard computes the ids); the ring is
     display-only, in the house tokens, and it respects reduced motion. */
  .cp-suggest .cp-main { box-shadow: inset 0 0 0 1px var(--gold2); animation: cp-suggest-shimmer 2.4s ease-in-out infinite; }
  .cp-suggest .cp-main:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  @keyframes cp-suggest-shimmer {
    0%, 100% { box-shadow: inset 0 0 0 1px var(--gold2); }
    50% { box-shadow: inset 0 0 0 1px var(--gold2), inset 0 0 16px color-mix(in srgb, var(--goldm) 16%, transparent); }
  }
  @media (prefers-reduced-motion: reduce) { .cp-suggest .cp-main { animation: none; } }
  :global(body.cp-reduced) .cp-suggest .cp-main { animation: none; }
</style>
