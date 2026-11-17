# MERGE-README.md — engine, ready to merge (the handoff cover)

**Seat:** Z.ai · 67 Cakepanz · 2026-11-17 (the fix round) · **Pin:** `d3bd81d2` · **Verdict:** the
season flow is REAL now — 46/0 shell battery, exit 0, the whole season played through the UI —
merge-ready behind one open store item (P-317) and the tip re-pin (M3 below).

## The one-line merge
Replace `67-cakepanz/src/engine/` with the new pin's `colors/src/**` snapshot — and move
`tools/mathlab/flex.json` + the carried test expectations WITH it (three paths, one green commit:
SNAPSHOT.md) — re-run the batteries (`npm run test:engine && npm run distfile && npm run battery &&
npm run battery:node && node --experimental-transform-types batteries/shell.battery.mjs`), re-pin
(SNAPSHOT.md), ship. `node scripts/swap-test.mjs <sha>` runs the whole rehearsal as one command.

## What this round changed (truthfully)
1. **D1** — `restoreSeason` is now DEFINED (through the seam's own restore path: loadWeekSlot →
   sessionFromWeekPayload → facade.resume; no stub). The season flow is reachable. Receipt: S29/S30.
2. **D2 (two layers)** — the record prop AND a binding race: the shell's readables subscribed
   without pushing the snapshot while the engine store never calls a new subscriber back, so a
   LOAD before the first template read was invisible. Fixed in bindings/stores.ts (engine
   untouched). Receipt: S5/S6 FAIL → PASS.
3. **The season screens' engine-table defect** — the shell read a `s.table` field the weekly
   RunState does not have; the engine's own table(s) call is now the one source (App/reviewVM/Share).
   Receipt: S9–S12 FAIL → PASS.
4. **Share's missing `season` prop**, **Book's `champIdx` ReferenceError** (and the champion's own
   roster as the book's cards), **the hub's missing CTA on no-game weeks** — each found by the
   acceptance run, each fixed, each receipted (S14, S13, S7).
5. **D3/D4/D5** — dist/assets ship and boot (http + file://); the gates cover dist/ and assert the
   boot target; titles + README pins corrected (the gh-pages README line staged for the Owner).
6. **P-365** — N19 (gone% VALUES via an independent engine replay) + N14b (champion truth,
   case-insensitive) added; the falsifier suite (F1–F5) shows every law DYING; zero tautologies.
7. **P-368** — `document` is out of src/lib (bindings/shareDownload.ts); the binding named honestly
   (26 .svelte files + 2 bindings modules). **P-369** — node counts measured (VERIFY §11).
8. **M3 as a habit** — scripts/swap-test.mjs, run at the tip 7a0706df this sitting (see below).

## The merge-readiness verdict (one line per screen, no euphemisms — receipts TRUE this sitting)
- **Draft Board** — perfect: 18 board laws + S25b (the 390px board law, NEW) + N15/N19; the gone%
  VALUES now have an independent-source law.
- **Team Select + P-317** — the UI is done and receipted (team AND slot, same screen); the STORE
  cannot carry a custom order yet — the Architect's piece (§5 filed; the engine's `newDraft` order
  parameter is proven node-side, P-317 law green).
- **Draft Complete** — perfect: S5 PASS (the full 1,024-pick record + the provenance stamp; the
  prop fix + the binding fix receipted; falsifier FA kills S5 when the bug returns).
- **Hub / Week / Standings / Bracket / Book / Awards / Review / Stats / Guide / Cards / Settings /
  Saves / Share / Feed** — good enough for merge: every one now renders through the REAL season run
  (46/0), the season laws are proven node-side (standings = engine table N9b, bracket = engine
  seeding N9c, replay by gameSeed N9d, review grammar N11), the 390px walk is clean on all 14
  screens, and the corrupt/newer refusals are the engine's own parse path. Honest label: the DOM
  fidelity is one screen-level assertion per screen (coarser than the board's); one more pass for
  pixel law.
- **Restore (the season's save/load)** — S29/S30 PASS through the real UI (save from the week view,
  reload, RESTORE A SAVED WEEK, the hub renders the restored season). The session-local stats
  accumulator restarts on restore — the receipted note says so (stats re-accumulate from the next
  played week; a saved STATS blob is the season payload's, not the accumulator's).

## The M3 rehearsal at the Architect's tip (7a0706df) — ran this sitting
The swap (67 engine files vs the pin's 57) touches NOTHING outside src/engine (diff -rq CLEAN) and
the shell SURVIVES it (node battery 23/23, build green, slice battery 26/0/10/3). The carried
ENGINE goldens fail 6 law groups — the tip's flex/formation layer moved against
tools/mathlab/flex.json and the carried expectations. VERDICT: engine behaviour moved, shell
expectation carried; the re-pin is the Architect's three-path move, one green commit. Do not edit
the law; do not edit the snapshot.

## What I do not know (UNKNOWN)
- Whether award grades ≥90 occur in a receipted season (the shimmer is wired; none observed).
- The w89 "90+ shimmer" source law (no source on disk).
- The Svelte-vs-Vue cutover cost delta (the Owner's measurement says tie — REPORTED, Owner).

## Open Owner questions (flagged, NOT fixed — the ruling is the Owner's)
1. **Light gold2 contrast — MEASURED: 1.51:1 on pale rose (1.65:1 on white) — FAIL** (AA 4.5).
2. **Dark --text — MEASURED: the rose ink on plum = 3.17:1 — FAIL** at AA normal (large text passes).
3. Awards-brag content (MVP only as implemented).
4. The "Engine Value" vs "Model Value" label (ships "Model Value"; UNTOUCHED).
5. The 3-4 one-liner on Team Select (PROPOSED in the delivery note; not shipped).

## Open Architect items (§5 filings in MERGE-GUIDE.md §7)
1. **P-317 store** (unchanged) · 2. **OT clock()** (unchanged) · 3. **The parameter property** in
`platform/localstorage.ts` (NEW — one line, no behaviour change; both node-side batteries need
`--experimental-transform-types` until it lands; Node version pinned in SNAPSHOT.md) · 4. **The
gravity/double-teams measurement** (unchanged).
