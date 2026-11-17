SPEAKER: vl | TASK: P-333/P-375/P-373/P-374 — innovation ideas (Part 4) | DATE: 2026-11-17T02:37:00Z
FOR: P-333

## Part 4A — A better no-cap test for the gap condition

The per-team approach from Part 1 has a confound: overall roster strength (DT1, EDGE1, QB, WR1) swamps the DT2/LB effect. Correlation(DT2 OVR, adv) = +0.671 holds but isn't universal; Miami (DT2=75, LBq=83.5, adv=+852.5) still favors 4-3 despite a bad DT2 and good LBs.

**Proposed: paired within-team test.** For each of the 32 teams:

1. Start from the team's real roster (all 1,953 players, no cap, no pretend numbers).
2. Run the lineup optimizer under both 4-3 and 3-4 → baseline advantage `adv_base = value(4-3) - value(3-4)`.
3. Create a **degraded roster**: replace the team's DT2 player (the second-highest DT OVR) with a replacement-level DT at OVR 60 (same role, same team, OVR forced to 60, spd/str unchanged). Everything else identical.
4. Run the optimizer again → `adv_degraded = value(4-3) - value(3-4)` on the degraded roster.
5. Compute **delta = adv_degraded - adv_base**. A positive delta means degrading DT2 makes the team relatively more 3-4-favored (or less 4-3-favored).
6. Regress delta on LB quality (top two LB mean OVR). The Owner's condition predicts: higher LB quality → larger positive delta (degrading DT2 helps 3-4 more when LBs are good).

**Why this is better:** it's a within-team comparison, so roster strength in DT1/EDGE/QB/WR is controlled out. The only variable that changes is DT2 quality. The regression on LB quality isolates the "good LBs" half of the condition independently.

**Concrete assertion:** if the condition holds, the slope of delta vs LB quality should be positive (worse DT2 + better LBs → more 3-4 advantage). A slope near zero would refute the condition.

**Data needed:** none beyond what Part 1 used (madden27-ratings.csv, free-agents-old-ratings.csv, player-ids.csv). Reproducible from this filing alone.

**Why not just cap DT2 at 70/75/65 (the dead approach):** capping applies a pretend number to every DT on every team simultaneously, which changes position-group balance in ways unrelated to the "bad DT2 left on the draft board" scenario. The paired test changes one player on one team — exactly the Owner's scenario.

## Part 4B — Workflow and the future

### Workflow improvements

1. **Name the shell of record.** Three trees currently diverge: gh-pages (d3bd81d2, slices 1-2), rev2 (4ca9a071, slices 1-4), s5 (4ca9a071, slices 1-5). No document names which is "the shell." MUSE's review-synthesis identifies this as the root cause of non-commensurable measurements across seats. Recommendation: the Owner names s5 as the shell of record (it's the most complete), and the re-pin to d3bd81d2 becomes a single green commit that moves `src/engine/`, `tools/mathlab/flex.json`, AND carried test expectations together (Pickle's prescription, Part 2 of MUSE's synthesis).

2. **Green-suite-before-seam.** Inkling's cutover checklist (Part 14) would not sign: 6 of 15 checks red. The fix ordering matters: first get the engine suite green on d3bd81d2 (including the 9 pin-coupled laws), then build the seam modules. "A seam wrapped around a red tree is documentation of a defect" (Pickle).

3. **Run the battery fresh on a clean checkout.** No seat ran the Playwright battery fresh and pasted a full green run. The battery requires a global Playwright install (`~/.npm-global/...`) that doesn't exist on a bare checkout — its runtime assumptions belong in SNAPSHOT.md (MUSE's Part 8 finding). Until the battery runs on `npm ci && npm run battery` with zero console errors, no seat's green claim is fully trusted.

4. **One-seat-one-file discipline is working.** The inbox pattern (one file per item, unique IDs, no overwriting) prevented any collisions across 57 filings from 7 seats. Keep it.

### Project future

1. **Basketball readiness without building basketball.** The save envelope is already sport-tagged (`kind: draft/week/season`) through the StorageModule seam, so a server store is a swap behind one interface. Don't build basketball now — but when it comes, the seam is ready. VL's Part 5 filing names two frictions: `saveRevision` has no `deviceId` (two devices revising one saveId collide), and `savedAt` is client clock (sync wants server-authoritative time). Both are small schema changes worth making before multi-device play lands.

2. **The cutover is a gate, not a declaration.** Inkling's Part 14: "NO, not today" — 6 of 15 checks red. The checklist produces a verdict, not a certificate. The Architect should treat it as a merge-day gate with explicit failure modes (what to do if any one step fails: file it, don't route around it).

3. **The propose-first gate is unruled.** Inkling's gate vs KG's standing autonomy grant to Z.ai — carried forward from v4, still unruled. The v4-1 prompt noted Z.ai can rule on it separately. Recommendation: the Owner decides whether Z.ai needs propose-first for shell changes, and documents it once.

4. **Seam-checkers are ready; the inventory is not.** Inkling's seam-gate (10 VMs, falsified three ways) and GLM's seam-checker (6 entries, falsified, zip input proven) both exist and pass/fail correctly. They wait on Z.ai shipping a real SNAPSHOT.md + VM→engine-file→sha256→callers inventory. Until then they gate example inventories only. Recommendation: Z.ai's next deliverable after the shell is the handoff inventory, not more screens.

5. **Box-score mutations belong in the engine's suite.** D3 is settled: the survivors (puntYards, touchdowns, firstDowns in box.ts, interception spot in drive.ts:136) are real at 86f22d10, survived 363/363 and 378/378 at two commits, and GLM's killing control proves the harness works. The fix is test-only (assertions in sim-slice.test.ts or boxscore.test.ts), owned by the Architect, and becomes the shell's responsibility after the next re-pin pulls `sim/` into `src/engine/`.

Labels: All ideas are proposals, not verdicts. No checkmarks. Part 4A's paired test is concrete enough to run from this filing alone.
