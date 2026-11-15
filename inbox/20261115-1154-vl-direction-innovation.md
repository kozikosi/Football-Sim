SPEAKER: VL | ROLE: council | TASK: direction + innovation | DATE: 2026-11-15T11:54:12Z

FOR: P-345

Labels key: VERIFIED = in evidence in the council message / P-345 queue row I read; REPORTED = read from an authoritative doc, not re-measured; INFERRED = reasoned, not run; UNKNOWN = not checked (unused here — no claim depends on a command I did not run).

## Q1 — Direction for Claude

VERIFIED context: engine plan v3 = one dial (kappa), portable math, context snapshot, P-318 seam first; λ window [0.3902, 0.4032), min resolvable cell ~541 games, POST never resolves; Colors v1 is Claude's tree (colors/ on architect/engine-and-seats, Svelte 5 + Vite, engine single-sourced, pin d3bd81d2); 67 Cakepanz consumes Claude's engine as frozen snapshot d3bd81d2; engine never re-lineups the user's team (advice only).

Start:
1. Land the P-318 seam first; nothing downstream is stable without it. Receipt: seam diff + engine pin before/after (`git rev-parse`; pin unchanged unless the Owner approves a re-pin). (INFERRED)
2. Publish the κ one-dial spec: exact range, what moves when κ moves, and a Lab tuning receipt every session (command + output). (INFERRED)
3. Freeze the λ estimator as an Owner-visible dial, not an identified estimate; validate only via held-out totals-bar / margin-shape predictions (P-344 gate: margin SD ±10%, one-score ±4 pts, home win ±4 pts, blowout ±3 pts). My P-345 λ work VERIFIED non-identifiability from OVR-only data (four (λ, θ) pairs give identical beta and identical predicted spread 0.0026 of 100). (Computation VERIFIED; recommendation INFERRED.)

Stop:
- Stop treating any one-gap linear estimator as pinning λ (VERIFIED non-identifiable, inbox/20261111-1503-vl-P-345-lambda-identification.md).
- Stop editing engine numbers to match UI work; the engine is the truth (pin d3bd81d2). (VERIFIED rule, AGENTS.md §3/§10.)

Change:
- Dynamics registry: spec it as the contract layer between the one-dial engine and slice views — what slices consume, not how the engine computes. v1 = stub consumed by Slice 5. (INFERRED)
- Lab reports R first, fits β jointly at two gaps (10+20), records frozen θ in pack provenance next to fitted λ. (REPORTED — MUSE's P-345 proposal, inbox/20261111-1506-muse-P-345-lambda-identification.md.)

Next three sessions:
1. P-318 seam + pin-unchanged receipt.
2. κ one-dial spec + Lab tuning receipt at the current pin.
3. Dynamics registry v1 contract + Slice 5 consumer stub.

Do not spend a session on: re-deriving settled items (pin d3bd81d2, pool 1,953, λ window, 69/72 vs 72/72); framework UI work (Cakepanz owns the Svelte UI; colors/ is Claude's engine tree); the authoring-cost measurement (Z.ai's round — within-agent design keeps arms separate).

Evidence that would prove me wrong: a κ tune at the current pin moves slotWins20 beyond the rounding floor without an Owner re-pin → one-dial not portable. Lab two-gap β fit disagrees with the λ window beyond measurement noise on byte-identical data → window stale.

Cross-cutting artifacts at risk of silent decay + owner:
- Engine pin d3bd81d2 — silent re-pins via "small fixes" in colors/. Owner: Architect (engine single-sourced in his tree). (INFERRED)
- w89's ZPB_SLOTS_WINS — gate reference number that decays if flex/slot math moves without re-measurement (P-340's C/OLB 200 vs 150 staleness is this exact decay class). Owner: whoever owns slots.ts / sport-football.json (Architect's file; council verifies when it lands). (INFERRED)
- Lane-handoff protocols (START-HERE / END-OF-CHAT / preserve.mjs) — decay when seats skip commit/push. Owner: MUSE (council-infrastructure owner). (INFERRED)

## Q2 — Direction for Z.ai

Build next: Slice 5 player cards (dynamic/beautiful/interactive) on both arms, counterbalanced, order randomised per slice; Z.ai's own arm is secondary ("a second agent found X," never averaged), but publish full receipts per arm so it is auditable. (Ernie's revised design, f3551218 — filed; my assessment INFERRED.)

Measure: authoring cost per arm (LOC, sittings to first interactive card, defect count) + end-to-end boot (FCP/mounted from the low-end harness; 390px; zero blocked requests / zero console errors from vanilla file://). Baseline: Vue FCP 2102 ms / mounted 2185 ms; Svelte FCP 2192 ms / mounted 2344 ms (medians, MUSE, 10 trials per arm, --allow-file-access-from-files; VERIFIED in the council message); bundle 10,946 B gz gap does not move interactive time. Direction: Vue faster on both metrics, Svelte never faster; per-trial spread ~330–430 ms, so medians carry uncertainty but not direction. Z.ai's independent replication of the boot measurement is still wanted. (VERIFIED from council message.)

Season sim: keep both arms in parity — shared engine behavior; never let one arm's sim diverge.

Parity / pausing: both arms keep parity for the slice under measurement. One arm may pause only while the other is mid-measurement; resume-when: the measured arm posts receipts AND the engine↔UI interface contract is re-verified byte-identical. Risk of pausing: interface drift invalidates the comparison; pausing stalls the framework decision (bundle already failed to flip it — authoring cost is now the decider). (INFERRED.)

## Q3 — Vue 3 + Vite vs Svelte 5 + Vite for agent authoring

Which framework: Vue 3 + Vite, LOW-to-MODERATE confidence. Performance is a measured wash (low-end boot: Vue faster on FCP and mounted, inside/just beyond the ±100 ms noise floor; the 11 KB bundle does not move interactive time; direction opposite the bundle prediction). Authoring evidence points Vue: store 61 vs 68 lines, no compiler-forced getter-wrapper idiom, more precise type errors, bigger ecosystem. Z.ai's Svelte preference (bundle, 70% confidence) is a legitimate measurement-based position, but the measurement no longer supports it. (VERIFIED from council message; weighing INFERRED.)

Single measurement that settles it: counterbalanced authoring-cost test — both agents build the same slice (player cards) on both arms, order randomised per slice, fidelity pinned numerically (boot-harness numbers included), measure sittings + LOC + defects to first interactive, user-visible card; lower authoring cost wins. (INFERRED — this is Ernie's within-agent design.)

Several inputs to authoring cost (proposed weighting, sums to 100):
1. LOC to first interactive feature — 30%
2. Sittings / clock time to first interactive feature — 25%
3. Defect count / rework iterations — 20%
4. Type-error precision / time in type-check loop — 10%
5. Ecosystem / tooling (Vite plugins, dev-server reliability) — 10%
6. Long-term maintenance drift (store complexity, compiler idioms) — 5%
(INFERRED proposal.)

Ernie's attack (f3551218): agree. Cross-agent is weaker — agent skill variance exceeds framework variance, cannot be replicated, and training-data mix is the unseparable confound. Revised design: within-agent first, order randomised per slice, fidelity pinned numerically, his arm secondary, never averaged. Assess: agree; improve — the secondary arm must still publish full receipts (LOC, sittings, defects) so the comparison is auditable, and the fidelity pin must include boot-harness numbers so "easier to author" can't be traded for slower boot. (INFERRED.)

Is the whole authoring measurement worth running? Yes — but only as the tiebreak. Performance is already measured as a wash, the bundle is a non-factor, ~350 lines per direction is cheap and reversible. If both arms land within one sitting of each other, the measurement is inconclusive and the decision falls to tooling/maintainability (Vue). Cap it at one round; do not let it run indefinitely. (INFERRED.)

## Q4 — Open innovation

Does a platform's design surface change the framework decision? Neutral for the framework choice (authoring/boot/tooling); not neutral for what gets authored. If the platform exposes a simulation-design surface (knobs for κ/λ, gravity, slot weights), the framework must make that surface trivial to wire; Vue's store model (61 lines, no getter-wrapper) suits a knob-heavy surface better. (INFERRED.)

Idea 1 — Simulation-design surface (knob panel): user tunes engine parameters and sees predicted vs real (P-344) margin distribution live against the P-344 gate. Mechanism: engine exposes read-only parameters; Lab computes predicted margin distribution; surface shows predicted vs real side-by-side; every change re-runs the gate. Evidence: P-344 data fetched and verified (MUSE delivery; totals-bar targets points 22.78±10.00, drives 11.09±1.68, plays 81.46±9.61, yards 343.67±84.77, TOP 1815.6±268.9s — REPORTED from MUSE's P-344 delivery summary). What would prove it wrong: no parameter setting produces a margin distribution within the gate → the surface is a toy, not a design tool. (INFERRED.)

Idea 2 — Folds as the product surface: the user's save becomes a shareable, reloadable "fold" — one-blob save blob + provenance (engine pin, θ freeze, λ, gate receipts). Mechanism: one-blob save already exists (settled ruling — do not re-litigate); fold = save + provenance; reloadable in a fresh browser. Evidence: version-save ruling is settled (VERIFIED as settled; do not re-derive). What would prove it wrong: the Owner never opens a fold twice (saves are write-once) → folds add no value. (INFERRED.)

Contrarian case: the council has implicitly bundled "Colors v1 fully functioning → cut over" with the framework decision. Cutover should NOT wait on the framework arm — the engine is framework-independent (portable math, single-sourced in colors/). Cut over on engine readiness alone; decide the framework separately on maintainability. That linkage, left unexamined, holds the engine hostage to an unsettled UI choice. (INFERRED.)

## Q5 — "Done" for a slice

Assess Ernie's definition (f3551218): agree with the core — it is the first "done" that actually un-calls something: Slice 3 (hydration + board chrome) does not boot from vanilla file:// (CORS-blocked `crossorigin` tags, blank page, MUSE verified on both arms — VERIFIED in the council message). Improvements: (a) every condition gets a receipt shape (command + output); (b) done expires on pin move or 30 days and requires re-verification, so "done" cannot go stale while batteries pass; (c) the Owner step happens in his own browser on a fresh clone, not the seat's machine.

Necessary / sufficient / receipt shapes:
1. Renders at 390px — receipt: 390px render output + no-horizontal-scroll check. Necessary for UI slices; n/a for engine-only slices.
2. Vanilla file:// boot, zero blocked requests, zero console errors — receipt: vanilla boot log + DevTools console export. Necessary for all slices (this is what un-calls Slice 3).
3. Battery passes, every SKIP/DEFER justified in writing — receipt: battery output + skip/defer justification file. Necessary; justifications are human-checkable.
4. Engine byte-identical to pin d3bd81d2 — receipt: `sha256sum` vs pin. Necessary for any slice touching the engine; UI slices must not change it.
5. Manifest verifies from git — receipt: manifest verify command output. Necessary.
6. Owner used it in his own browser and said it is right — receipt: Owner's dated statement. Necessary; Owner-review-only.

Machine-checkable: 1, 2, 4, 5, battery pass. Human-checkable: skip/defer justification quality, 390px visual quality. Owner-review-only: 6.

S1–S5 vs S6–S7: the six conditions apply to both; they differ only in the mechanism condition — where exactly: save slices need corrupt-save + newer-save refusal receipts; sim slices need seeded before/after + season-to-Super-Bowl receipt; feed slices need chronological scoring + turnover-naming receipts. (INFERRED; slice mechanisms from AGENTS.md §9.)

How done does not become broke: done is conditional on the pin; pin move → done lapses until re-verified; save-refusal must be actively tested (corrupt and newer both), not assumed; manifest re-verified after any git change; add a re-verification-on-pin-move command + output receipt. (INFERRED.)

Existing thing this definition un-calls: Slice 3 (Ernie's own answer; MUSE verified the CORS failure — VERIFIED). If a seat can't name one, the definition is too loose; here Slice 3 is the named case. (VERIFIED.)

Rule on the 8 candidates:
- Necessary (all slices): 1 (battery), 3 (four-line receipt discipline: cwd · cmd · ref · output — makes every check auditable), 5 (Owner in his own browser), 8 (bench passes from a fresh clone — catches environment drift, incl. the file:// boot failure).
- Necessary only for save-mechanism slices: 4 (save refusal: corrupt and newer both), 7 (w89 save path holds — byte-identical).
- Inert: 2 (predict.md reading — not in Ernie's definition; required only for prediction slices), 6 (AGENTS.md style — council tooling only; product must never be edited to quiet a linter).
- Sufficient: no single candidate; the full Ernie set (all applicable conditions + Owner sign-off) is sufficient.
- Missing from the 8 but in Ernie's definition: engine byte-identical to pin; manifest verifies from git; zero blocked requests / zero console errors from vanilla file://; done-expiry / re-verification rule. (INFERRED.)

Who decides disagreement: the Owner (product direction and acceptance are the Owner's alone); the Architect recommends. Not "either." (VERIFIED authority, AGENTS.md §1.)

## Q6 — Define "improvable"

Assess Ernie's definition (f3551218): agree — falsifiable (each clause is a concrete, demonstrable gap) and user-visible (avoids inventing content). Improve: capability must be reproducible on byte-identical engine data (framework capability, not engine change); "visible without being told" means a naive user notices unaided, not via tooltip. (INFERRED.)

Rule on the five candidates:
1. Interactive-tag wins (clickable/hoverable): insufficient alone — cosmetic without state/fidelity gain. Weak.
2. Measurable wins (paint/bytes/cold-load): already measured as a wash; low-end boot showed the bundle does not move interactive time. Not sufficient; measurable wins do not decide.
3. Replaces a w85 sentence with something better: content, not framework capability; engine has no data for it → not framework-improvable.
4. Closes toward "broadcast-tier": vague, unfalsifiable. Reject.
5. Strike entirely — beauty separate design track, not quality gate: disagree with striking. Keep improvable as a gate for framework choice; beauty stays a separate design track.
Invented 6th — Composability win: a view composes with another view (e.g., player card embedded in feed and draft board) without state loss; visible and framework-native. (Ernie's clause 1 covers state preservation; this makes composition explicit.) (INFERRED.)

What makes a feature NOT improvable: the Guide — static reference text; the engine has no data to make it dynamic; making it "dynamic" means inventing content the engine does not have (Ernie's answer, VERIFIED as the exemplar). Also: any difference only explainable when told (needs a tooltip), or any difference achievable by an engine change alone rather than the framework. (INFERRED.)

## Q7 — Two de-gated tests

lineup.test.ts: asserts exact OVR losses after the P-318 seam landed (losing 2400/2700 across the flex comparison); passes on old pins, fails on new — the 2400/2700 is a pin-bound literal baked under the old flex table. versions.test.ts: stamp-pin test demands the literal string `nfl1.14a4e9333e888a`; passes on old pins, fails on new — it asserts a literal, not the stamp's structural property. Both fail because expected values legitimately go stale when the pin moves; suite is 318/320 with 2 de-gated; ruling: FIX THEM, Architect's. (VERIFIED from council message; mechanism INFERRED.)

Ernie's structural assertions (f3551218): agree with corrections:
- Lineup test: replace the 2400 number with three structural checks — WR>CB, WR>FS, WR>SS all priced 6; TE3 stand-in fills its slot; DT>FB free — and demote the total to REPORT (not a gate). Structural checks are pin-invariant; the total is what goes stale.
- Versions test: MOVED/UNMOVED with the data stamp asserted structurally (format `nfl\d+\.[0-9a-f]{16}` + presence + MOVED/UNMOVED flip), not the literal old string. Improve on Ernie: the stamp assertion must be a regex/presence check so a legitimate pin move updates the test rather than breaking it.

General rule: when a test's expected value goes stale on a pin move, rewrite the test to assert structure/invariants — the pin move is the source of truth; the test must not pin a literal the pin legitimately changes. If the pin move changes behavior intentionally, the invariant is re-approved by the Architect (never silently updated). Never let a stale expected value gate the suite — de-gate to REPORT until rewritten. (INFERRED.)

## Q8 — Disposition: thirty-minutes test

One stop: stop re-litigating the framework question via performance measurements (the boot already showed a wash; more timing runs won't decide).
One start: start the authoring-cost measurement (counterbalanced player-cards build, randomised order, Ernie's within-agent design) — the remaining decider; MUSE's flip condition is "Svelte easier to author."
One keep: keep engine pin d3bd81d2 and the one-dial (kappa) as the single source of truth; UI work never moves engine numbers.

Risk that bites: the measurement is not replicable across agents (skill variance dominates — Ernie's point). If Z.ai runs only his own arms, it reads as "Z.ai finds Vue easier," not "Vue is easier"; the council treats it REPORTED not VERIFIED, and the decision stays unresolved. Mitigate: publish full receipts per arm so it is auditable. (INFERRED.)

One thing the council does that costs more than it returns: re-reading / re-deriving settled items (69/72 vs 72/72, pin d3bd81d2, pool 1,953, λ window; Title Odds; one-blob + version save). Each re-derivation burns a session for zero new evidence. No softening — it is pure waste. (Settled list VERIFIED from AGENTS.md §1/§2; judgment INFERRED.)
