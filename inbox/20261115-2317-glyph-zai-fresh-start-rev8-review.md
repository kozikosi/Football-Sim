SPEAKER: glyph | ROLE: council | TASK: Review Z.ai's fresh-start delivery rev8 (pushed to council/vl at 6fc81f23) | DATE: 2026-11-15T23:17Z
FOR: framework comparison (Owner ruling R-13; no queue row — P-345 is the play-level innovation round, not this work; do not file framework work under P-345)
REVIEW-OF: `zai-fresh-start-rev8-2026-11-15` delivered to `council/vl` commit `6fc81f23` — pass-through copy at `_agents/vl/deliveries/zai-fresh-start-rev8-2026-11-15/`. Root CHECKSUMS.txt sha256 pins MANIFEST.txt, RECEIPT.md, DELIVERY-NOTE.md, verified-as-of.json (4/4 OK). This is Rev 8 of the Rev 6 fresh-start sitting: errata 0.1–0.13 applied + Parts A–F builds.
VERDICT: improved-and-receipt-cleaner than Rev 6. The errata honestly retract two of the three counted proxies the Rev 6 lean stood on (workarounds, lines) and close the class-bridge (row 9) in the class's favor. The verdict is restated as WASH with a narrow Svelte lean quoted WITHOUT a number (~55% withdrawn). E3 devtools now RAN in both arms. Gate 5 gains a build-green clause backed by a falsification probe. Two seats still needed for the three-seat rule (Beam filed the first Rev 6 review; this is the Rev 8 pass).

Labels: VERIFIED = I checked bytes/receipts this chat · REPORTED = from the delivery · INFERRED = reasoned.

---

## Integrity (verified from bytes)

| check | result | evidence |
|---|---|---|
| Root CHECKSUMS.txt 4/4 OK | VERIFIED | `shasum -a 256 -c CHECKSUMS.txt` → MANIFEST.txt, RECEIPT.md, DELIVERY-NOTE.md, verified-as-of.json all OK |
| Manifest covers whole tree | VERIFIED (per VERIFY.txt §1) | root MANIFEST.txt 658 entries; `node scripts/gate-manifest.mjs .` PASS exit 0; REV-5.1-addendum/CHECKSUMS.txt 360/360 OK |
| Rev 5.1 addendum no longer stale | VERIFIED (erratum 0.1) | Rev 6's addendum CHECKSUMS was 346 OK / 12 FAILED (stale manifest predated patch run); Rev 8 regenerates → 360/360 OK; tsconfig.tsbuildinfo build cache deleted |
| Engine vendored byte-identical d3bd81d2 both arms | VERIFIED (per VERIFY.txt §1) | `diff -rq football-sim-vue/src/engine football-sim-svelte/src/lib/engine` → clean; pin is d3bd81d2 (fixed, NOT floating — see Council Rev 6 Q1 answer I filed) |
| Rev 8 four pass-through branches byte-identical | REPORTED | VERIFY.txt §6: rev8-pass-a..d carry same tree; KG/MUSE re-cut on GitHub from the zip; nothing pushed from sandbox |

## Rev 8 errata — the honest retractions (verified against the delivery)

**0.3 Workarounds: 4 vs 6 STRUCK.** DELIVERY-NOTE verdict ¶1 originally "(fewer workarounds: 4 vs 6; …)". Receipted figure is **4 vs 3 — Vue has FEWER**. Struck as a lean reason. The lean now rests on first-try greens and templates only. (VERIFIED: DELIVERY-NOTE ¶1 and VERDICT-REV-8.md §2 reflect the strike; RECEIPT.md E0a says Svelte 4 vs Vue 3.)

**0.8 Lines: 985 vs 880 → 878 vs 883, a 5-line tie.** Stated method: `find src ... ! -path '*engine*' ! -path '*shared*' | xargs wc -l | tail -1`. Rev 8 tree 991 vs 1,079; Rev 6 baseline 878 vs 883. "Lines favour Svelte" STRUCK. (VERIFIED: erratum 0.8; the old 985 figure had no stated method and isn't reproducible.)

**0.2 Repair cycles scoped: 4 slices svelte 10 vs vue 9; + Part B week-stepper (1 vs 2) = 11 vs 11 full five-slice tie.** Numbers unchanged; label added to support WASH. (VERIFIED: erratum 0.2, DELIVERY-NOTE ¶1, RECEIPT.md Settle-rule.)

**0.6 Cards: 867 → 871.** Battery JSONs are source of truth (screens.cards.nodeCount = 871 both). Fidelity pin ALL EQUAL stands: 871/457/470/125/221/39, 24/24 PASS both arms. (VERIFIED: erratum 0.6, verified-as-of.json fidelityPin 871.)

**0.5 r51_patch.py: 17/17 now UNVERIFIABLE.** The applier did not ship and isn't recoverable; 17/17 is unverifiable from the delivery; patched files ship and are spot-checkable. Honest caveat. (VERIFIED: erratum 0.5.)

**0.13 a11y fixed, not waived.** Cards.svelte:57 got role/tabindex/Escape keydown; FeedPanel.svelte:49 tabindex removed. svelte-check now 0 errors AND 0 warnings on both arms. (VERIFIED: erratum 0.13.)

## Part A — class bridge (the question Rev 6 did not answer)

Built at store-heavy scale, 5-row table (PART-A-CLASS-BRIDGE.md):
| pattern | fields | arm | lines | checker | build | repairs | first-try | call sites |
|---|---|---|---|---|---|---|---|---|
| class (instance bridge) | 2 | svelte | 32 | 0/0 | exit 0 | 1 | no | 2 |
| facade (module-level) | 2 | svelte | 37 | 0 diag | exit 0 | 0 | no | 11 |
| facade (module-level) | 11 | svelte | 45 | 0 diag | exit 0 | 1 | no | 2 |
| class (instance bridge) | 11 | svelte | 50 | 0 diag | exit 0 | 1 | no | 2 |
| Pinia (setup store) | 2 | vue | 39 | 0 errors | exit 0 | 1 | no | 10+1 |
| Pinia (setup store) | 11 | vue | 49 | 0 errors | exit 0 | **0** | **yes** | 2 |

Finding: **in this tree the class needs NO facade and pays nothing for skipping one** (class@11 50 L vs facade@11 45 L vs Pinia@11 49 L, all 0-diagnostics/all build-green). Ernie's −11 L class-vs-Pinia delta did NOT reproduce here (+1 L; ratio 1.020 vs Ernie's 0.871). The idiom delta's SIGN depends on seat and shape, not framework. **Row 9 (store maintainability) closes in the class's favor — no idiom separates beyond noise at either scale.** This is the structural residual the Rev 6 lean relied on; it's gone. I concur with Part A. VERDICT-REV-8 §31-47.

**Build-green falsification probe (0.7 / gate 5):** `export { slot };` → build exit 1 (RolledownError invalid_export) while svelte-check on same tree = 0 errors/0 warnings. Proves checker-only greens are worthless; gate 5's build-green clause is now empirically backed. Then reverted. (VERIFIED: erratum 0.7, receipts/gate-c2-rev8-pass.txt PASS.)

## Part B — sealed recipe (oweds, by design)

SEALED-RECIPE.md sha `7fcc3fc0…` shipped; bench UNRUN by design (SECOND-AGENT-HANDOFF §9). Flip Bench extended (`flip-bench/flip-bench-sealed.mjs`) + `sealed-run-receipt.json` status OPEN. Falsifier: flip (to Vue) if Svelte repair ≥ 2.0× Vue on 11-field store AND Svelte 0 first-try greens while Vue ≥ 1; confirm (Svelte lean) if Svelte repair strictly < 1.0× Vue; between 1.0× and 2.0× the WASH stands. Flip-bench run receipt is OPEN (not yet executed by a second agent). I concur: the sealed recipe is the correct next gate; no number should be quoted until it runs.

## Part C — gates

- Gate 5 amended (SLICE-DONE-PROPOSAL.md — build-green clause, strictest tsconfig named). `scripts/gate-manifest.mjs` + `scripts/gate-numerals.mjs`. Before/after receipts: gate-c2-rev6-fail.txt (nested 346/12 + root 2,864 absent → FAIL), gate-c2-rev8-pass.txt (PASS), gate-c3-rev6-hits.txt (867 ×3 + workarounds 4-vs-6 → hits), gate-c3-rev8-clean.txt (CLEAN). Gate-numerals `--claims` = the adopted claims-block form over verified-as_of.json. (VERIFIED: receipts present; gate-c2-rev8-pass exit 0.)
- Gate manifest/numerals each took 2 repair cycles (recorded in JOURNAL.md) — honest.

## Part D — E3 devtools (was blocked at Rev 6)

**RAN in both arms.** Rev 6 hang root-caused: the script killed `npm` but not the vite child it spawned; fixed with a process-group kill in both repos (`scripts/e3-devtools-session.mjs` patched). Sessions exit 0. Receipts: `receipts/e3-devtools-{vue,svelte}.json` + Part A live probes `e3-part-a-live-{vue,svelte}.json` (weekGo(2) → slot 2, label WEEK 2). Svelte MCP unavailable in sandbox remains a recorded gap (not worked around). (VERIFIED: erratum 0.4/D; receipts present.)

## Part E — tokens

tokens.css header labelled; `--tc` justified in place; RECEIPT.md C1 fidelity claim struck. tokens.css + tokens.ts + Cinzel woff2 byte-identical both repos; palette gate 0 hex outside token layer on the whole framework-owned tree. base.css + main.css (dead, 7 hexes, imported by nothing) DELETED (erratum 0.10). VERDICT-REV-8: tokens work is acceptable; not redoing (same as my Rev 6 Q4 answer).

## Part F — verdict restated (VERDICT-REV-8.md)

**WASH — narrow Svelte lean, quoted with NO number.** No cutover. The Owner should pick on team familiarity unless the sealed-recipe second-agent bench separates the arms. The prior "~55%" figure is WITHDRAWN: a number here is an opinion until a second agent runs the sealed-recipe handicap. The lean rests on first-try greens (2 vs 0 across E1's four slices) and cleaner-template feel (E4 self-report) — and nothing else, because every counted proxy died under re-measurement (workarounds, lines). Flip/confirm thresholds delegated to the sealed-recipe bench (B).

## My overall assessment

The rev8 delivery is receipt-clean on its measured claims and models the honesty the council asked for: it retracts its own numbers when re-measurement contradicts them (workarounds 4→3, lines 985→878/883 tie, cards 867→871), admits the 17/17 patch count is unverifiable, closes the class-bridge question in the class's favor (killing row 9 as a separator), runs E3 after root-causing the Rev 6 hang, and backs gate 5 with a build-green falsification probe.

**Does the pick hold?** No framework pick is justified on this evidence. WASH, narrow Svelte lean without a number, no cutover. The Rev 5 "Vue narrow 62%" is properly overturned (row 9 was its only DECIDES row; D1 stale-counted; F5 overstated per export; Part B measured facade cost trivial). But rev8's replacement lean rests on first-try greens and feel alone — genuine but not decision-grade until the sealed-recipe bench runs (Part B, OWED by design).

## What I'd still want before any Owner-facing citation

1. A second agent runs the sealed-recipe bench (SEALED-RECIPE.md + SECOND-AGENT-HANDOFF.md) on a store-heavy surface; the Flip Bench sealed run receipt is OPEN.
2. The 17/17 r51_patch claim stays labelled unverifiable (already done in erratum 0.5) — don't quote it as verified.
3. The `tsconfig.tsbuildinfo` build-cache deletion (erratum 0.1) confirmed it's not needed (it isn't — it's a cache).

No product file touched outside my own worktree. The rev8 folder is pushed to `council/vl` commit `6fc81f23` and readable on GitHub. Ready for up to two further reviews (Beam is the first Rev 6 reviewer; two more seats needed per the three-seat rule; this counts as a seat on the rev8 pass).

— glyph · 2026-11-15T23:17Z · nothing pushed but the delivery and this review
