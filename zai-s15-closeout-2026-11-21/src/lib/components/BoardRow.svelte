<!-- The row: name, position, OVR, wins, priority, gone-odds, the flex options (the chips read the flex cost).
     Slice 3: the gone% cell carries the METHOD tooltip (hover) — the engine already computed the odds;
     the shell never told the user how. The meta (sims, picksBetween) rides down from App.
     cakepanz-9 (2026-11-19, the Owner's ruling): ONE uniform row for every pick — the late simple
     branch is SUPERSEDED and deleted (the order §5/B-bis). The WINS/PRIO/OVR captions STAYED (the
     8.1 REC texts now name the uniform row's numeric cells — a bare number still says what it is);
     the detail container is always present (hidden when closed) so aria-controls always resolves
     (the A8e fix).
     S15 (2026-11-21, the Owner's ruling + the continuation order §2.1-2.3): the ROW-LEVEL gold ring
     is RETIRED — the top-three meaning moves INTO the button, w89-style: EVERY row carries ONE
     visible Draft button (the all-button pulse, w89 :12854), and the top three graduate to the
     sheen sweep + a separate TOP badge (w89 :6430-6432) and opt out of the pulse. The top three
     remain the first three ARRAY POSITIONS of the engine-sorted rows (L24) — never rendered text.
     The row marker class cp-top3 is a DOM HOOK only (no visual of its own — the w89 tr.zpb-top3
     pattern); no .cp-suggest ring class remains anywhere. cp-quick is GONE (the Architect's
     one-button decision): its one-click dispatch moved onto cp-draftbtn, which names the SLOT. -->
<script lang="ts">
  import type { BoardRowVM } from '../port/seam.ts';
  let { r, onpick, onpickDirect, oddsMeta = null, suggest = false, why = '', busy = false }: { r: BoardRowVM; onpick: (id: string, slot: string) => void; onpickDirect?: (id: string, slot: string) => void; oddsMeta?: { picksBetween: number; sims: number } | null; suggest?: boolean; why?: string; busy?: boolean } = $props();
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

<div class="cp-row cp-{r.tone}" class:cp-top3={suggest} data-id={r.id}>
  <div class="cp-rowtop">
    <button class="cp-main" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">
      <span class="cp-name">{#if suggest}<span class="cp-toptag" title="One of your top three priorities right now">TOP</span> {/if}{r.name}</span>
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
    <!-- S15 (§2.3): the ONE visible Draft button per row — the w89 button cell (:6488). It names the
         SLOT (a bare "Draft" silently chooses one), dispatches EXACTLY one PICK through
         onpickDirect (the guarded quickDraft path), and disables while a dispatch is in flight
         (the contract's busy flag). The w89 badge-in-name/button-in-button-cell layout is kept. -->
    <span class="cp-btnwrap">
      <button class="cp-draftbtn" class:cp-istop={suggest} onclick={() => (onpickDirect ?? onpick)(r.id, r.slotId)} disabled={busy}
        aria-label="Draft {r.name} at {r.slotLabel}{suggest ? ' — one of your top three priorities' : ''}">Draft at {r.slotLabel}</button>
    </span>
    {#if suggest && why}
      <!-- S14/P2 (§3.6), S15: the top-three reason — one plain line from the SAME VM (never parsed text),
           inside the row the user already has; not a board column (L12's uniform board is
           load-bearing). Not focusable — the L21 Tab order (main → Draft → the method copy)
           is unchanged. -->
      <span class="cp-why">{why}</span>
    {/if}
    <!-- T6/S3 (cakepanz-12): the gone% method is FOCUSABLE and sits AFTER the row's buttons —
         keyboard users reach it by tabbing through the row, and on focus it REVEALS (a hidden
         focus target is a trap, not a feature). It stays the aria-describedby target of the gone
         cell above (the reference works document-wide; A8e's always-exists rule holds). S15 §4.5:
         the old <span tabindex="0"> tripped Svelte's a11y_no_noninteractive_tabindex — it is a
         native <button> now (natively focusable, no tabindex attribute needed, no a11y warning);
         node law N26's pinned source string changed with it, in the same sitting. -->
    <button type="button" class="cp-sr" id="cp-gone-desc-{r.id}">{method(oddsMeta)}</button>
  </div>
  <div class="cp-fits" id="cp-fit-{r.id}" hidden={!open}>
    <span class="cp-fitlbl">Fills {r.slotLabel}{r.natural ? '' : ' (flex)'}</span>
    {#each r.alsoFits as f}
      <button class="cp-chip" onclick={() => onpick(r.id, f.slotId)} disabled={busy}>{f.slotLabel} <i>{f.flex}</i></button>
    {/each}
    <!-- the STAGED path stays where it still applies: inside the expand panel (the detail view),
         guarded like the direct path (L22) — the visible one-click button above is the Architect's
         single surface; the panel's staged Confirm is the deliberate alternative, not a duplicate
         of the visible control (the hand-over names this reading). -->
    <button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)} disabled={busy}>Draft at {r.slotLabel}</button>
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
  /* T2/S15: the row top holds the main row and the ONE Draft button (the w89 button cell).
     Desktop: it sits beside the grid; a phone wraps it to its own line (the 390 law holds:
     wrap, never overflow). */
  .cp-rowtop { display: flex; align-items: center; }
  .cp-rowtop .cp-main { flex: 1 1 auto; min-width: 0; }
  .cp-btnwrap { flex: 0 0 auto; margin-left: 8px; display: inline-flex; align-items: center; }
  .cp-draftbtn { flex: 0 0 auto; border: 1px solid var(--gold2); background: color-mix(in srgb, var(--goldm) 20%, transparent);
    color: var(--gold2); border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; font-size: 0.82rem;
    font-weight: 800; white-space: nowrap; }
  .cp-draftbtn:hover:not(:disabled) { background: color-mix(in srgb, var(--goldm) 32%, transparent); }
  .cp-draftbtn:disabled { opacity: 0.55; cursor: default; }
  /* S15: the TOP badge rides the house tokens (w89 .toptag's structure, :295/:854 — no new hex) */
  .cp-toptag { font-size: 0.62rem; font-weight: 800; background: var(--goldm); color: var(--on-gold);
    border-radius: 4px; padding: 0 4px; vertical-align: 1px; letter-spacing: 0.04em; }
  /* S14/P2 (§3.6), S15: the top-three reason — small, muted, never a column; wraps below the button
     on a phone (the 390 law holds: wrap, never overflow). */
  .cp-why { flex: 0 1 auto; min-width: 0; overflow-wrap: anywhere; margin-left: 8px; font-size: 0.72rem; line-height: 1.4; color: #c8a48f; }
  @media (max-width: 430px) {
    .cp-why { flex-basis: 100%; margin: 0 6px 4px; }
  }
  @media (max-width: 430px) {
    .cp-rowtop { flex-wrap: wrap; }
    .cp-btnwrap { flex-basis: 100%; margin: 0 6px 6px; justify-content: center; }
    .cp-draftbtn { white-space: normal; text-align: center; }
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
  .cp-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; background: none; font: inherit; color: inherit; cursor: default; }   /* S15: the method is a native button now — the resets keep the visually-hidden state identical */
  /* T6/S3 (cakepanz-12): the method copy is FOCUSABLE (tabindex="0") — keyboard users reach it, and
     on focus it REVEALS (a hidden focus target is a trap, not a feature). The hover tooltip rule
     above is untouched (D2ii holds). */
  .cp-sr:focus { position: static; width: auto; height: auto; margin: 0; padding: 2px 8px; overflow: visible; clip: auto; white-space: normal;
    display: block; max-width: 100%; border-radius: 8px; background: #2c2127; outline: 2px solid var(--gold2); outline-offset: 2px; }
  /* T4: keyboard focus is VISIBLE on every control of the row (Tab/Enter path). */
  .cp-main:focus-visible, .cp-chip:focus-visible, .cp-draftbtn:focus-visible { outline: 2px solid var(--gold2); outline-offset: 2px; }
  .cp-chip { border: 1px solid var(--gold3); background: transparent; color: var(--gold2); border-radius: 999px; padding: 4px 12px; cursor: pointer; font-family: inherit; font-size: 0.8rem; }
  .cp-chip:disabled { opacity: 0.55; cursor: default; }
  .cp-chip i { font-style: normal; color: #c8a48f; }
  .cp-chip:hover:not(:disabled) { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  .cp-primary { background: color-mix(in srgb, var(--goldm) 16%, transparent); font-weight: 700; }
  /* S15 (§2.1): the ring visual is RETIRED — no .cp-suggest treatment, no inset shimmer. The
     top-three identity lives in the button treatment (shell.css: the all-button pulse, the
     .cp-istop sheen + the TOP badge). The cp-top3 row marker is a DOM hook only (no style). */
</style>
