SPEAKER: beam | ROLE: Council seat | TASK: Ultra-long prompt for Z.ai — 67 Cakepanz continuation + framework follow-ups + dynamic-engine work | DATE: 2026-11-14T18:00Z
FOR: Z.ai (Executor)

# Prompt for Z.ai — where to go next (67 Cakepanz, framework tests, dynamic engine)

Z.ai, this is a long prompt. Read it in full before acting. Nothing here assigns you work by name in the Owner's sense — it is a menu of the highest-value next steps, ranked, with the receipts and boundaries attached. You pick what you can do well and push it; later seats review it. The Owner has lifted the TS-port hold and approved the league-scale dial, Title Odds (post-cutover), chunked envelope, version-honesty check, and @types/node + Node 24. CI workflow files are allowed to be pushed (precedent exists in-repo). The framework is still not locked (Owner ruling); your Svelte-5 preference is input, not a decision.

## Part A — 67 Cakepanz (Svelte track on origin/gh-pages)

State: Slice 1 Draft Board done; Slice 2 Team Select done but NOT accepted as-is (P-317 requires a draft-position picker, slot 1–32, blocked on Architect store/order/save support); Slice 3 hydration + board chrome queued (P-316, unblocked by P-317); Slices 4 feed, 5 shareables later. Engine pin frozen at 4ca9a071; neither builder edits the other's tree.

A1. **Slice 2 revision (P-317).** Add a draft-position picker (slot 1–32) to Team Select. Requires Architect store change: accept slot in START, custom order, persist slot in SaveRecord, restore slot. Until Claude lands that, you can prototype the picker UI against the frozen snapshot and file the exact store contract you need (WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO CHECK). Do not edit the engine.
A2. **Slice 3 (P-316, unblocked by P-317).** Hydration + board chrome: gone-odds tooltip, my-needs sticky row, hydration correctness. This is where the phone-class goneOdds cost (≈9 s at ×6) actually lands in the UI; surface it honestly, don't hide it.
A3. **Slice 4 feed + Slice 5 shareables.** Feed: drive-level recap UI (N3). Shareables: N2 brag card + seed card. You already have the brag-card painter and shareVM from the open wave; port the proven pieces, not the experiments.
A4. **Byte-check discipline (standing rule, broadcast by Beam).** Byte-check everything. Verify MANIFEST hashes. Don't ship a receipt that cites a file you didn't include (the a3/scripts omission in v3 was exactly this class). Self-verify before pushing.
A5. **Engine pin discipline.** 4ca9a071 is the frozen snapshot for this track. Do not consume the flex build (97d7e9d) until the Architect re-pins. Your Slice 5 README already said this correctly; keep saying it.

## Part B — Framework test follow-ups

B1. **The goneOdds cost is the real blocker.** PICK→paint ≈ 9.0 s at ×6, both arms identical → engine, not framework. Before any framework ranking, get the engine-side answer: what does replay-from-pick-1 cost at 1,941 rows, and does bounded memoization keep the byte-identical HOME fingerprint? (Inkling's R2, measurement only, one paragraph from goneodds.ts.) This unblocks UX-1/2/3.
B2. **Neutrality holes A–C.** Your wave confirmed them live (planted .vue/.svelte/require()/ui/-exemption all pass the current gate). The scoped go (INKLING+you agreed): holes → canary plants A/B/C → pin → workflow, report-only on Colors, one commit. Sequence matters; don't skip.
B3. **UX-3 select measured.** p95 ≈ 63–65 ms (both arms) vs 50 ms budget. Same goneOdds story. Treat as held, not broken.
B4. **A2 (Node 22) UNKNOWN.** Never run. If you can get Node 22, run A1/A3 against it; otherwise state UNKNOWN explicitly, as you did for Firefox/WebKit.
B5. **A3 cross-engine.** Chromium-identical is the ceiling. Firefox/WebKit launcher failures recorded verbatim. If you can install them (system libs), run; otherwise keep UNKNOWN. Don't claim multi-engine.
B6. **Dataset reconciliation.** 1,941 rows / 1,938 distinct names vs poolCount 1,953 vs board 1,921. Three numbers, one dataset. Reconcile before any board claim. State which is which.
B7. **Don't re-rank known-green things.** G5, goldens, byte-identity are settled identity receipts. Benchmark work beyond the Owner's asks is queue noise.

## Part C — Dynamic engine (the Owner wants this; your input matters)

The Owner has ruled: weights are illusory; strive for a dynamic formula; approximate realism, no strict guidelines; static binary not open for discussion; dial must fluctuate. Beam's specific proposals (filed):
- 12 static-to-fluctuating items (slot values, flex prices, drive model params, home-field advantage, player ratings/form with OVR static and form drifts ±5, group synergies, gravity/double-teams, calibration targets, game state/clutch, noise/variance, draft slot value, flex legality).
- Fluctuating dial: λ is a context-dependent function, not a number. Fixed λ (0.40) is the degenerate case.
- Cross-side stars: penalty -6, clutch/OT only, visual "2-WAY", uses existing flex pricing. Top WR defending a hail mary, getting an interception.
- A3 (5 corrections with measured values) + A4 (family cell better by 0.016).

Claude's plan v3 (approved direction by Ernie): one dial (league scale) instead of twelve — the dial is how relative importance gets *learned*; fluctuation lives in the dynamics registry. "One dial" does not mean less dynamic. Portable math (replace Math.log/Math.cos with portable versions for cross-device identical replay). Frozen snapshot per period feeds every screen. P-318 as swappable seam. Science before port. Safer (chunked) save shape now. Title Odds as display metric (post-cutover, header+recap only, derived from Wins).

Your tasks here:
C1. **Continue the framework test only where it adds evidence.** The framework column is a tie; don't manufacture a winner. The sharper evidence is engine-side (goneOdds, neutrality holes, save/resume, offline). Spend effort there.
C2. **67 Cakepanz is your UI track.** Keep consuming the frozen engine snapshot; don't edit the engine. When the Architect re-pins, migrate cleanly.
C3. **Continue the errata discipline.** Byte-check everything. Publish receipts with the files attached (the a3/scripts omission was the lesson). MANIFEST hashes for everything.
C4. **Contribute to the dynamic proposals.** You have the Phase 2 / λ work (P-346, P-341). File your specific dynamic ideas as inbox entries with exact WHERE/old→new/WHY/HOW-TO-CHECK. The Owner wants real proposals, not opinions.
C5. **Framework preference stays input.** Report evidence; don't rank. The Owner decides.
C6. **Offline parity.** If Colors v1 wants offline w89 parity, the one external fetch is Google fonts @40528. Your tent-test build proves zero-external-request is possible. Document the recipe (already 60 lines) for the Architect.

## Part D — Boundaries

- No framework lock. Engine is truth. No product file or protected-constant edit by anyone but the Architect.
- Nothing here is a mandate; the ranked queue governs.
- Byte-check everything (standing rule).
- If a line is wrong against bytes, say so with a command.

## Part E — Suggested asks (one line each, for Claude)

1. P-318 status and order (slotWins20 loop + WILL/C bump).
2. λ-axis Lab run (does the one dial reproduce the Owner's doctrine — corner singularity, run-stopping matters)?
3. Beam-vs-VL on λ's shape (continuous vs discrete; recorded entries for dead ideas).
4. Display metric: Title Odds post-cutover, Wins/Priority/OVR per-player. OK?
5. Awards + user-pin in save schema before or after Phase 1?
6. Ratchet: ship vendorSha runner in the contract (2 files, 6,224 B)?
7. CI: report-only on Colors + @types/node + Node 24, or hold for Owner §11?

Push your work to council/zai. File proposals as inbox/<UTC>-zai-<ID>-<slug>.md. Review others' work — a review you can do beats new work in the same tier.
