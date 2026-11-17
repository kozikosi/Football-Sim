# SHELL-STATUS.md — slice-by-slice truth, verified this sitting (2026-11-17 · the re-pin sitting · pin 5c808472)

Every line below ran THIS sitting on the fixed tree. The previous status's "S6..S28 PASS" was
aspirational (the battery died at S5 on the delivered bytes) — this document replaces it with
receipts that ran. Full outputs: ACCEPTANCE-RECEIPTS.txt (the one uninterrupted run) + VERIFY.txt.

## The battery verdict

- **Shell battery: 46 pass · 0 fail · exit 0** — S1a–S30 in ONE uninterrupted run, the WHOLE season
  played through the real UI to the champion banner (22 CTA steps), the restore law, the 390px walk,
  the file:// boot. (Rerun green after the tokens split + the new laws — twice green this sitting.)
- Slice battery: 29/0/10/3, exit 0 — 26 carried + 3 NEW Slice-3 laws (the gone% METHOD tooltip on
  hover, the "my needs" filter, clearing it; the features were built and receipted at the old pin,
  this sitting gave them their laws). Node battery: 24/24 (23 carried + N20 the F8 law), exit 0.
  Engine suite: 394/394 (45 suites, the tip's own, re-pointed), exit 0. Build: green (dist JS
  377.95 KB / 128.64 gz), single-file dist 450.8 KB, "no external refs: true".

## Slice-by-slice

| Slice | Status | THIS sitting's receipt |
|---|---|---|
| s1 Draft Board | DONE | slice battery 18 board laws green; S3; S25b (390px board law); N15/N19 |
| s2 Team Select | DONE | 8 team laws; S1a/S1b/S2; 390 walk team |
| s3 hydration + board chrome | DONE (+3 laws this sitting) | S4 (settings persist); N12a roundtrip; N13 settings; the tooltip/filter/clear laws in the slice battery |
| s4 feed | DONE (OT workaround stands) | feed gates in the S7 loop; beat-in receipts (probe-motion-shots: cpbeat 0.55s normal, none reduced, both modes) |
| s5 shareables | DONE | S14; N14 + N14b (champion truth, case-insensitive); P-368 split (downloadShare → bindings/) |
| s6 Team Select + P-317 | UI DONE; store = Architect's | S1b (32 slots same screen), S2, S4; S26 (file:// picker after a team choice) |
| s7 season hub + week views | DONE (D1 + hub-CTA fixed this sitting) | S6, S7 (22 steps through the real UI), S29/S30 (restore through the UI) |
| s8 standings/bracket/Super Bowl | DONE (engine-table fix this sitting) | S8 (8 division tables), S9 (champion banner), N9b/N9c/N9d |
| s9 awards | DONE (engine-table fix this sitting) | S10 (winners from the played season) |
| s10 season review | DONE (engine-table fix this sitting) | S12 (integer chips); N11 grammar |
| s11 guide | DONE, verified not rebuilt | 390 walk guide; numerals gate CLEAN ×2 |
| s12 merge rehearsal + cutover note | DONE + M3 as a habit | swap-test.mjs run at the tip 7a0706df (see §merge-cone); gates PASS |

## The state-coverage matrix (screen × state → receipt)

States: LOADING (the boot's first paint) · EMPTY (no dataset) · NO-SAVE · CORRUPT-SAVE (refused,
never repaired) · NEWER-BUILD (refused by VERSION) · REDUCED-MOTION · OFFLINE (vanilla file://) ·
390PX · LIGHT/DARK modes.

| Screen | LOADING | EMPTY | NO-SAVE | CORRUPT | NEWER | REDUCED | OFFLINE | 390 | MODES |
|---|---|---|---|---|---|---|---|---|---|
| TeamSelect | boot path (every run) | S17/S18 | S23 | N12b | N12c | S22+probe | S26–S28 | S25 walk team | S19/S20 |
| DraftBoard | boot | S17 (empty ≠ board) | S23 | N12b | N12c | S22 | S26–S28 | S25b | S19/S20 |
| Complete | boot | — | — | N12b | N12c | — | single.html | — | S19/S20 |
| Hub | boot | — | S29 pre-state (phase none + restore CTA) | N12b | N12c | S22 | — | S25 walk hub | S19/S20 |
| WeekView | boot | — | — | N12b | N12c | S22 | — | S25 walk week | S19/S20 |
| Standings | boot | — | — | N12b | N12c | S22 | — | S25 walk standings | S19/S20 |
| Bracket | boot | — | — | N12b | N12c | S22 | — | S25 walk bracket | S19/S20 |
| Book | boot | — | — | N12b | N12c | S22 | — | S25 walk book | S19/S20 |
| Awards | boot | — | — | N12b | N12c | S22 | — | S25 walk awards | S19/S20 |
| Review | boot | — | — | N12b | N12c | S22 | — | S25 walk review | S19/S20 |
| Stats | boot | — | — | N12b | N12c | S22 | — | S25 walk stats | S19/S20 |
| Cards | boot | — | — | — | — | S22 | — | S25 walk cards | S19/S20 |
| Guide | boot | S17 reachable | — | — | — | S22 | single.html | S25 walk guide | S19/S20 |
| Settings | boot | — | — | N13 (corrupt → defaults) | — | S22 (the control) | — | S25 walk settings | S19/S20/S21 |
| Share | boot | card-null state (no record → no card) | — | — | — | S22 | offline cards (N14) | S25 walk share | S19/S20 |
| Saves | boot | S23 (empty slots listed) | S23 | N12b + the panel's verbatim refusal | N12c | S22 | — | S25 walk saves | S19/S20 |
| Feed | boot | — | — | — | — | probe (cpbeat none/0s) | — | S25 walk feed | S19/S20 |

Honest gaps in the matrix: the CORRUPT/NEWER refusals are receipted node-side (N12b/N12c — the
panel rides the same engine parse path) and via savesApp.injectBroken's plantable blobs; a
browser-level screenshot of the refusal MESSAGE is not separately receipted. LOADING is a transient
paint receipted by the boot path, not a dedicated law. Both are named, not hidden.

## Framework-coupled seams (the full list, P-368 wording corrected)

- `src/lib/bindings/stores.ts` (svelte/store wrappers + the subscribe-time snapshot push),
  `src/lib/bindings/shareDownload.ts` (the Blob/anchor download) and `src/lib/bindings/tokensApply.ts`
  (NEW this sitting — the DOM half of the token remap moved out of port/tokens.ts; `document` is out
  of src/lib outside bindings, the grep is EMPTY, receipted — the delivered §10 receipt was inaccurate
  and is corrected here).
- The render layer: **26 `.svelte` files** (1 App + 15 screens + 10 components) — THE binding, in
  the honest wording. NOTHING below them imports a framework (node law N16 runs green).
- TS core: `src/lib/port/**` (20 modules) + `src/lib/valuation.ts` — zero `document`, zero framework
  tokens (N16 + the grep receipt in VERIFY §P-368).

## The merge cone (M1–M5), measured this sitting

- **M1 ONE DOOR**: `grep -rln "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v src/engine | grep -v src/lib/port` → EMPTY. Receipt in VERIFY §M1. The count-leaves-0 law is M1b in the node battery.
- **M2 ONE DIRECTORY**: the swap test's `diff -rq` outside src/engine → CLEAN (only the batteries' result JSONs differ from a fresh run).
- **M3 SWAP TEST**: ran BOTH directions this sitting at the new pin. (a) The rehearsal BEFORE the re-pin — snapshot-only swap to `5c808472` (67 files vs the pin's 57): diff outside src/engine CLEAN, node battery 23/23, build green, slice 26/0/10/3, carried goldens RED (formation gap ×4, flex-table equality, Owner D pins) — FAIL BY DESIGN, the re-pin is the multi-path move. (b) The reverse AFTER the re-pin — `d3bd81d2` swapped into the re-pinned tree: diff CLEAN, the shell SURVIVES (node 23/23, build green, slice green), and the tip-asserting suite fails its LOAD (it imports tip-only modules). Both receipts in VERIFY.txt §M3. The snapshot was never edited.
- **M4 CONTRACT**: SNAPSHOT.md — pin, per-file hashes (CHECKSUMS.txt), the exact command, the three re-pin paths, the swap-test habit, the Node-24 battery note.
- **M5 THIN SEAM**: one file — src/lib/port/seam.ts, 160 lines, **68 engine-import lines**, 38 distinct engine modules, 20 port modules beside it (re-measured at the new pin — unchanged; the engine grew BEHIND the seam). (The council's disputed 37-lines/11-files and 65-lines/37-files figures were pre-seam tree measurements; on THIS tree the seam module exists and the number is 68/1. Measured, command in VERIFY §M5.)

## Open Owner decisions (flagged, NOT fixed — the ruling is the Owner's)

1. **Light gold2 contrast** — MEASURED this sitting: #e6c67d on #fdf2f6 = **1.51:1** (AA needs 4.5) — FAIL; on the white panel 1.65:1 — FAIL. (probe-contrast.mjs)
2. **Dark text color** — the dark block sets `--text: #8e5566` (the rose ink): on #1e1119 = **3.17:1** — FAIL at AA normal (passes 3:1 large-text). The zcream and gold2 pass (14.94:1 / 11.30:1). (probe-contrast.mjs)
3. The award line content ("MVP only" as implemented, or expand).
4. The "Engine Value" vs "Model Value" label (the shell ships "Model Value"; UNTOUCHED this sitting).
5. The 3-4 note (proposed in the delivery note; not shipped).
6. The "never print Touchdown" law (no source on disk; UNTOUCHED).

## Open Architect items (§5 filings)

1. **P-317 store**: START/LOAD carrying `order?: number[]` + the slot stamp in DraftPayload (unchanged; the picker waits).
2. **OT clock()**: the feed's OT period mapping (slice-4 filing, still open at this pin).
3. **The parameter property** in `src/engine/platform/localstorage.ts` (`constructor(private readonly ls: …)`) — one line, no behaviour change; strip-only Node cannot parse it, which is why BOTH node-side batteries need `--experimental-transform-types` today (route 1: Node v24.22.3, pinned in SNAPSHOT.md; routes 2/3 in SNAPSHOT.md). **Re-checked at 5c808472: still present** (the docs stay accurate).
4. **`deviceId?: string`** — the reserved additive envelope field (P-254, ENVELOPE-FREEZE.md): one OPTIONAL field so v1.1 never unfreezes; the shell cannot add it (engine bytes), filed for the Architect.
4. **Gravity/double-teams**: the stats screen's STAND-IN names the real call.

## Assumptions labeled

- UNKNOWN: award grade ≥90 occurrence in a receipted season (the shimmer is wired; none observed).
- UNKNOWN: whether the w89 "90+ shimmer" source law exists (no source found on disk; the shimmer rides the recap grade when present).
- INFERRED: the tip-6706df failure diagnosis (engine moved the flex/formation layer; the carried goldens assert the pin) — grounded in the failing law names, not re-derived from the engine source.
