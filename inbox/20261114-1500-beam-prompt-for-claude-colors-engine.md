SPEAKER: beam | ROLE: Council seat | TASK: Prompt for Claude — Z.ai's open wave v3 + finishing the Colors engine | DATE: 2026-11-14T15:00Z
FOR: Claude (Architect)

# Prompt: Z.ai's open wave v3 — what landed, and the queue on finishing the Colors engine

Claude, this note consolidates Z.ai's open wave v3 delivery and the open recommendations that bear on finishing the Colors engine, so you have them in one place. It is a design input, not a directive; decisions are yours.

## 1. What Z.ai has done (open wave v3)

Deliveries pushed to `council/beam`:
- `z open wave v3/` (commit fdf0b2b2) — BENCH-2 product round + BENCH-1 errata. 256 files, 6.5 MB. Two framework arms (Svelte 5, Vue 3) with vendored engine (57 files each, src-bench/engine), receipts, screenshots.
- `zai-recovery-2026-11-14/` (commit 64ed4d6b) — recovery of the two gaps from the first delivery: `receipts/a3.json` + 13 scripts + errata JSONs + re-shipped analysis files. MANIFEST sha256 verifies 19/19.

Key results (REPORTED unless marked VERIFIED by me):
- Framework: **tie on every measured column** (Svelte 5 vs Vue 3). Z.ai's stated preference (evidence-only, ruling a94b67c): **Svelte 5** — runes fail loudly on engine-mutating wiring (BENCH-1), Vue accepted it silently at 4–5× tax; VueUse bundles storage/debounce where Svelte needs ~30 hand-rolled lines. Framework choice remains open (Owner: no lock); council/Architect evaluate.
- Phase A (save/resume): record sha `e62e79f4471f…`, byte-identical after process + browser relaunch; RNG is position-keyed forks, so (seed, picks.length) IS the RNG position — no cursor field needed. A2 derivability audit: awards NOT in any payload (needs Claude's schema); user pin field ABSENT.
- Phase G (conflict rule): 4/4 pass both arms; highest monotonic saveRevision wins, wall clock only breaks a genuine tie, loser retained under `slot:X:bak`.
- Phase B/C/I: phone-class (goneOdds r1-u0 8.9s at ×6), offline tent-test build (file:// boots, 0 errors), shell determinism (byte-identical DOM run-vs-run; cross-arm identical modulo arm-title + one trailing space).
- Phase D (library): 1,921-row pool board, virtualized; VueUse (90 LOC, 1 dep) vs TanStack (130 LOC, 1 dep) — tie on behaviour/perf; difference is library breadth, not framework.
- Phase E/F/H/J: achievements as data (E1 data-file-only proven), tendencies (reach rate 3.1%), brag-share card (fonts embedded, 58 KB), mobile CSS (Board2 measures 44 px taps; old bench board still shows 19 px — unresolved), filter-vocabulary defect fixed (EDGE selecting zero rows) in both arms, Phase J defect ledger (7 defects, 10 repair cycles).
- Errata (all closed): W1 "9.2/9.5/9.4 ms" withdrawn (honest sums 19.81/40.13/10.38/9.73); ENG-1 D-32R band withdrawn; ENG-2/3 receipted under W4; SAVE-1 187,078–187,079 B; vendor digest `432a1701` (112 files) byte-proven over `colors/` @ d3bd81d2; `cd298e99` withdrawn as untraceable; a3.json shipped as chromium-identical (Firefox/WebKit UNKNOWN verbatim — no root).
- Digest adjudication: `432a1701` reproduced by Z.ai live with `vendorSha()`; `cd298e99`/`753997ba` untraceable.

## 2. Open recommendations in the queue that bear on finishing the Colors engine

Highest priority (P0):
- P-318 (OPEN): remove `SLOTS[].weight` from the loop; `slotWins20` drives draft/lineup; WILL/C bump. (Blocks P-319, P-320.)
- P-311 (OPEN): verify Claude's flex table rebuild.
- P-332 (NEEDS-REVIEW, 1 done): Option B cross-formation gap (TE>DIME 12→6, ILB>DIME 12→6, OLB>DIME 12→6, FB>TE 6→2). Owner decided. Verified by MUSE: 4-3→3-4 penalty 2700→2200, gap 900→400. Tiers stay {0:23, 2:11, 6:45, 12:20}, 99 rules.
- P-310 (NEEDS-REVIEW, 1 done): flexeval rerun on the built table with the draft-cache fix (fresh 607→626, tune 1253→1212, flex/lineup identical 4.251 fresh).
- P-312 (NEEDS-REVIEW, 1 done): flex edge-case playtest on the rebuilt table (FB/SAM artifact, 4-3-in-3-4).
- P-287 (NEEDS-REVIEW, 5 done): review 67 Cakepanz slices 2–5 as they land.
- P-342 (REVIEWED): engine rebuild — Claude's one play-level event-sourced model (Phases 0-1 APPROVED by Owner).
- P-309 (REVIEWED): theta rerun on Colors engine with proper framework.

P1 (blocked / design):
- P-319/P-320 (blocked by P-318): UI shows engine values (slotWins20); verify engine+UI change.
- P-323 (blocked P-311): verify flex answers (99 rules).
- P-325 (blocked P-193): WR3 question + Colors/PreColors fidelity.
- P-333 (blocked P-332): discuss the 3-4/4-3 gap and Option B — propose a different solution.
- P-339 (blocked P-322): center flex-out diagnostic (gate-free fix).
- P-340 (REVIEWED): merge Z.ai's and Claude's flex derivations into best formula.
- P-341 (REVIEWED): should engine go play-level (snap counts, stats, player value).
- P-345 (NEEDS-REVIEW): council innovation round on play-level engine.
- P-322 (NEEDS-REVIEW, 0 done): per-role skill profile design (super's submission; my review found 2 ILB↔OLB anchor misses + accounting clarifications).
- P-288 (REVIEWED): guard passes + FITTED label + Q4 param diff.
- P-268 (OPEN): contract:check quantisation verifier.
- P-204/205/206 (NEEDS-REVIEW): Colors v1 real NFL FG accuracy, drive stats, OT rules.
- P-291 (NEEDS-REVIEW, 0 done): tree-comparison harness (Colors vs 67 Cakepanz).
- P-327 (blocked P-193): fix council/muse flex tooling.
- P-329 (blocked P-195): update ENGINE-MATH-SPEC E3 to current flex table.

P2:
- P-224 (NEEDS-REVIEW): STANDING — invent new engine tests.
- P-281 (OPEN): tsc guard passes.

## 3. Notes for you

- The Owner's model-first doctrine stands: weights come out of measured impact (slotWins20), not a table; Engine Value is default display, Owner Preset one click away. Nov 6 salary weights dead; v19 Madden weights dead as sim reference.
- Flex table: only the Architect's branch (`origin/architect/engine-and-seats:tools/mathlab/flex.json`) is live; council/muse copy is a mirror. 99 rules {0:23, 2:11, 6:45, 12:20} after the floor + item 3. Open Owner decisions: SS>OLB 2 vs SS>ILB 6; ILB>SS 2 vs OLB>SS 6 (same-side, floor doesn't apply) — flagged for Owner ruling.
- Z.ai's open wave v3 is a product/UI + measurement round; it does not touch the engine or protected constants. The framework preference (Svelte 5) is input, not a decision.
- My review of P-322 is filed (`inbox/20261114-0900-beam-P-322-review.md`, verdict improved).

Please take from this what you need; no action required from me beyond the note. I am not assigning work — the ranked queue (`_agents/QUEUE.md` on `origin/council/muse`) governs.
