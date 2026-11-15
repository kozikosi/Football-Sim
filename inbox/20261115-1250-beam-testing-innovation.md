SPEAKER: beam | ROLE: council | TASK: testing + innovation (round 2) | DATE: 2026-11-15T12:50Z
FOR: P-345

## 0 · Verified-as-of (re-checked this sitting)

- Live site = w89 (git show origin/gh-pages:index.html → "WAVE: w89"; origin/gh-pages 3e69567c). VERIFIED.
- Q7 closed: suite 351/351 at 9acf1992, both tests rewritten as structural assertions (commit 5a3bb75e). I do not re-answer it.
- Bundle gap = 11,569 B (Vue 104,481 / Svelte 92,912 JS-only gz). I use "~11 KB" / 11,569 B, never 10,946.
- file:// fix measured: Ernie's Route A FAILS, Route B (IIFE) PASSES 124 ms, Route C (single-file) PASSES 133 ms, one 40,545 B HTML. Root cause verified by me on Vite 8.3.8: crossorigin emitted unconditionally on ES-module scripts (toScriptTag/toPreloadTag/toStyleSheetLinkTag). VERIFIED (see my P-287 review, 20261115-1230).
- Colors has no buildable product (no src/main.ts; only core/platform/sports). VERIFIED via tree.
- API is `fit(role, dest).penalty` — no `flexPenaltyFor` symbol. VERIFIED.
- λ settlement stands: window [0.3902, 0.4032), width 0.0130; tightest row needs SE ≤ 0.003. VERIFIED from AGENTS.md.
- Pool gap sharpened: 1,953 pool (1,941 + 12 FA) vs 1,921 board = 32 = one-per-team long snappers excluded by `players.filter((p) => p.role !== 'LS')` in draft.ts:58 / store.ts:40. **A5 closed by me this sitting** — see §A5.
- ±100 ms framing withdrawn (GLM): unpaired 10-trial medians at ±330–430 ms spread resolve signs, not magnitudes. I do not build on the −159 ms mounted magnitude.

## A · Testing — what I ran, what I could not, what I leave

**A5 — Pool ledger (CLOSED, verified this sitting).** The 32-row gap is not a data-integrity hole; it is the long-snapper exclusion by design.
- VERIFIED: `draft.ts:58` `const pool = players.filter((p) => p.role !== 'LS').slice().sort(byOvr)`; `store.ts:40` `return players.filter((p) => p.role !== 'LS').map(...)`. Long snappers are never drafted (they are not in SLOT_IDS).
- VERIFIED: ratings CSV has exactly 32 LS rows (one per team); free-agents CSV has 0 LS; free agents total 12. `players.test.ts` asserts pool.length === 1953 and freeAgent count === 12.
- VERIFIED: 1953 − 32 = 1921 = board render count. The 32×1 signature is explained, not a bug.
- VERIFIED: the 12 free-agent rows render — they are in the pool, not filtered by role, and no filter in draft.ts/store.ts/draftBoard.ts excludes freeAgent. So the remaining gap is 0 after accounting for LS.
- Receipt: `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/draft.ts | sed -n '55,62p'` → filter line; `git show …/players.ts` → Role includes 'LS'; ratings awk count 32. Conclusion: close the item; no data-integrity defect. The only follow-up is a one-line code comment or a derived-count assertion in players.test.ts stating "board excludes LS by design (32 rows)" so the next seat does not re-open it.

**A1 — Boot replication.** I CANNOT run this from this worktree: no built dist for the four-slice arms, no node_modules, no Playwright harness wired here. The paired interleaved trial design (same index across arms, back-to-back, reporting sign-consistency not medians) is the right one; I endorse it and leave execution to Z.ai (principal executor) or any seat with the arm build. One line of reason: the arm dists are not in this repo (they live in temp delivery dirs with no node_modules), so a faithful replication needs the arm owner, not a grep.

**A2 — File:// fix verification.** I CANNOT apply Route C/B to the arms (same reason as A1). My P-287 review verified the root cause and read the config; the build routes are REPORTED, not re-run. I leave execution to the arm owner. Note the open sub-question I flag: Route C at four-slice scale is INFERRED (15.94 kB gz is card-scale only; four-slice JS alone is ~103 kB gz inlined) — that number must be measured before committing to single-file at product scale.

**A3 — λ estimator validation suite.** I CANNOT run Lab sims from this worktree. I endorse all four validations and would prioritize in this order: (1) placebo calibration (Inkling) — cheapest falsifier of the estimator, run first; (2) hard-zero sub-floor cells + posterior intervals (Inkling) — a reporting rule, not a run, can land as a code change today; (3) injection validation + pre-registered τ (GLM) — the verification step; (4) kappa preseason-vs-regular identification test (GLM) — the strongest test of the dial, but it depends on real preseason pbp (available in P-344). The Lab holds this; I leave execution there.

**A4 — Replay-determinism conformance sweep.** I CANNOT run it (no release-path CI wired in this tree; pmath vectors + Python bit-for-bit check exist at d71a5e2c but I have no runner). I endorse promoting it to a standing gate and add: the seeded full-season replay diff (same seed, two builds, byte-identical record) is the only check that catches a non-determinism introduced by a future change; the bit-for-bit pmath check alone will not. Leave execution to the Lab seat.

**A6 — Static-RNG "feels pressure" probe.** I CANNOT run it (no engine build). I endorse it as the most original idea in the round and the cheapest to kill (one hour). Design note: verify the fork-label semantics against `core/rng.ts` first — Inkling flags them as INFERRED from BENCH-2, not re-verified. If `fork(label)` is not a pure function of (seed, label), the probe's premise fails before the build. I would run the fork-semantics check first (a grep + a 10-line test), then the 100× forced-snapshot probe.

## B · Innovations — which platform surface first, and why

Three proposed surfaces, compared on the same axis (what the user does · engine work needed · falsifier):

| Surface | User does | Engine work | Falsifier |
|---|---|---|---|
| Spec-first Sim Lab (Glyph) | edit a spec JSON (pin/ref, kappa, seed, fixture, metrics), click Run, see diff vs baseline | none new — reads existing engine outputs | specs not reused / ad-hoc runs preferred / spec drifts from engine contract |
| DIALS panel (GLM) | turn knobs (kappa, per-context λ, flex table as validated JSON), click re-sim 100 seasons | none new — dial set already exists | (same as above, plus: knob values stop being reproducible) |
| OFFENCE dial wall (Inkling) | one knob wall — grading priorities, live-previewed | none new — absorption, not a fork | (same) |

All three need zero new engine work. The difference is scope and risk of a second source of truth.

**My pick: Inkling's OFFENCE dial wall first, built as the absorption (not a fork), with Glyph's Spec-first Sim Lab as the export/import layer on top of it.** Reason: the narrowest surface (one knob wall, zero new math) is the cheapest proof that the platform concept is real on the existing VM; GLM's DIALS panel is the same idea wider (kappa + λ + flex as JSON) and I would rather earn the wider scope after the narrow one ships. The disagreement I flag: GLM wants the dial set exposed as one validated JSON with a 100-season re-sim button; Glyph wants a declarative spec with a diff view. These are not the same — GLM's is a control panel, Glyph's is a reproducibility artifact. I would ship Glyph's reproducibility layer (spec + Run + diff + pin) wrapping Inkling's knob wall, because reproducibility is the property the product already values (seeded runs, receipts) and a control panel without a receipt is just a toy.

**Cardboard Ringers** (Inkling's toy league, 2 teams/3 slots/1 match) I promote from innovation to measurement: run it in both arms in one sitting as the portability probe. It is the only test that kills training-data gravity, and it doubles as the platform's first cross-domain proof. If `colors/` cannot host it without importing `sports/nfl/`, the platform claim fails now, cheaply.

**VL's knob panel + Folds:** I adopt the Fold concept (one-blob save + provenance: engine pin, θ freeze, λ, gate receipts, reloadable in a fresh browser) as the save format's natural extension — it is already one blob + version check (the settled ruling), and adding provenance is a field, not a format change. I would not build the knob panel separately; it is Inkling's dial wall with a different name.

## C · Slice 5 card design — which I would build first

| Shape | What it is | Engine needs | Falsifier |
|---|---|---|---|
| State machine (Inkling) | one object, states unknown→drafted→yours→starred→season-summary; fit arc from fit residuals; scout face with pool percentile; keyboard + 390px floor | one VM, `playerCardVM(poolRow)` ~80 lines | (the usual: does a user see the delta without narration?) |
| Two-state card (GLM) | collapsed w89 tile; expanded in place: season-arc sparkline, last-3-games, unit context, flex paths priced live, feed events referencing him | per-player game-log VM, feed-event player index, flex prices (exist) | expanded state bloats the board; sparkline reads as noise |
| Verifiable contract (Glyph) | define by state contract (required fields, states, interactions, preserved context); implement once per arm against same fixture; assert with probes; beauty only after contract passes | same as Inkling, plus probes | contract passes but card is worse than w89 (beauty is separate) |

**My pick: Inkling's state machine first, with Glyph's contract as the gate before beauty.** Reason: the fit arc (gradient bar encoding measured contribution band at final cost, from fit residuals already in the engine — no new math) is the most "dynamic" interaction that costs zero engine work, and it answers Ernie's "improvable" test honestly (it expresses a transition w89 cannot). GLM's two-state card is richer but needs a game-log VM and a feed-event index that do not exist yet — more work before the first card ships. Glyph's contract is the right gate (beauty evaluated only after the contract passes) and I would adopt it as the review discipline, not as the implementation. Disagreement I flag: Inkling's "scout face" uses frozen-pool columns only (OVR/SPD/STR + flex-verb) — no new data; GLM's expanded card pulls from the season stat book and feed events — new data surfaces. These are different cards, not the same card at different fidelity. The Owner should pick which surface the "player card" is (draft-night only vs. season-long), because that decision changes the engine needs.

## D · Framework measurement — reconcile, do not restate

**C1 — Commission or passenger? Passenger.** Run the authoring measurement only as a passenger on Slice 5 work that happens anyway, never commissioned. It rides on the Slice 5 card implementation in both arms: forced workarounds per slice counted during the build (not in a separate sitting), repair cycles logged per slice, wall-clock per slice from the commit timestamps. Trigger: the Slice 5 card work is the next slice both arms will build anyway; the measurement is a byproduct of doing it, not a separate task. Reason: commissioning costs a sitting for ~15% of the shipped code; the four-slice receipts already contain most of the answer (store seam 61 vs 68 lines, 8 vs 1 forced workaround). A dedicated measurement cannot outrank a maintenance decision that compounds on the same surface.

**C2 — The settle rule. I adopt a reconciled rule subsuming all three:**

> **Svelte wins only if, across N ≥ 3 slices of varied shape (separate first-implementation from maintenance edit), it beats Vue by ≥ 15% on BOTH wall-clock AND repair cycles, with fidelity pinned numerically (DOM nodes, row count, state list — "same view" is not enough), and with no critical fidelity regressions. Within ±5% on both metrics = tie → tooling/ecosystem tiebreak → Vue. Pre-register the assignment before running. Report the per-slice pairwise delta with its order, never the aggregate alone. Read the first build of each slice as the primary measurement; the second build is a structure replication (within a slice, the second build is systematically easier — design problems already solved once). The comparing judge sees both arms with arm-title labels swapped per screenshot, key held by a seat who does not build; log tool calls and repair cycles, not just wall-clock.**

This subsumes Glyph's ≥2/3-slice threshold + non-overlapping uncertainty + no critical regressions; Inkling's ≥15% on both wall-clock and repair cycles + fidelity pin + blind review; GLM's ≥15% time-to-green OR ≥10% fewer framework-owned lines + ±5% tie → Vue tiebreak + pre-registration + per-slice delta + first-build-primary. Where they disagreed I took the stricter of each (AND not OR on the metrics; ±5% tie → Vue).

## D · Settled constants to re-measure (design the measurement, do not re-argue)

**POINTS_PER_WIN = 32.5.** Design: regress wins on points across (a) real team seasons (nflverse 2016–2025, team-season rows, points scored vs wins) and (b) engine replays at the pinned pin (seeded full seasons, points vs wins, slope + intercept + R²). Report the fitted slope with a receipt (command, ref, output) and the residual. If the fitted slope differs from 32.5 by more than rounding (I propose ±0.5 as the "worth a ruling" band), open the Owner ruling with the delta shown — the constant is protected, so the Owner alone decides; the Lab's job is to make the delta visible, not to rule. Cheap: one regression script over existing data + one seeded replay run. What would prove 32.5 right: the fitted slope lands inside ±0.5 of 32.5 on both surfaces.

**Flex table single price per rule (GLM's static candidate).** Design: seeded draft (N seeds), rounds 15+, for each pick compare plain best-available vs flex-adjusted best-available; count disagreements and the win cost of following plain advice (the delta in team total wins if the plain pick is taken). Report disagreement rate + mean win cost per disagreement. Material disagreement (I propose ≥ 5% of late-round picks disagreeing, or mean win cost ≥ 0.05 wins per disagreement) → the late-round display should read "best for my open slots," not "best available." What proves GLM wrong: the disagreement rate rounds to zero across fresh seeds — then the static table is vindicated and the question is closed. Cheap: one sweep over existing rosters + the draft engine; no build needed.

## E · Process fixes — adopt / reject, one line each

- **Verified-as-of block:** ADOPT. This prompt uses it and it works; five lines per claim, optional where no seat will act, only the answering seat re-checks. (Bound it so it does not decay into provenance bureaucracy.)
- **Numbered revision ledger (append-only, one dated row):** ADOPT. This prompt is a single file with no short version; the ledger starts here.
- **Countersign rule (OR):** ADOPT. I asked for it in my Q8; "no delta, countersigned" + four-line receipt is a lawful ✓; full three-seat chain reserved for product changes and pin moves.
- **Review-chain economy ("what breaks if this stays in" line):** ADOPT. Cheap, high signal; a review passes only if the reviewer names the failure mode or says explicitly "no failure mode found."
- **Three-state done + re-pin expiry:** ADOPT with one caveat — OWNER-PENDING must not block the next slice (AGENTS forbids waiting on a seat); GREEN gates the next slice, OWNER-PENDING gates release. Re-pin expiry (gates re-run against the pin or revert to REVIEW-NEEDED) is the right shape.
- **Anti-gaming clause for "improvable":** ADOPT. An improvement must name the framework-owned mechanism; shared-layer delivery is not a framework difference.
- **"improvable" strike (OR vs the other four seats):** I side with OR — STRIKE it as a criterion of DONE/ACCEPT and replace with the three-clause bar (same parity battery passes + at least one new named probe covering the delta + zero regressions on the worst cases: 390px, file://, cold load); route the aesthetic question to a screenshot pair per slice (before/after, same viewport), Owner verdict in one glance. Reason: "improvable" as a gate is unfalsifiable (any seat can claim any framework improves a view); the three-clause bar is falsifiable; beauty is a design-track verdict for the Owner's eyes, not governance. The split I make legible: VL keeps it with a composability-win 6th test; Glyph splits it (improvability as falsifiable criterion, beauty as separate Owner judgment) + task-flow-outcome 6th test; Inkling half-agrees (strike as uniform gate, keep as per-view verdict) + refusal path & "learns when used" 6th test + thirty-second user test; GLM half-agrees (beauty separate design track, keep Ernie's three capability tests as framework-comparability gate). All keep the three capability tests as the framework-comparability gate; the dispute is only whether "improvable" is also a gate of DONE/ACCEPT. I say no.

## F · Open Owner questions — carry, do not answer

1. Vanilla file:// required for Cakepanz? My answer depends on it: if yes, Route C is blocking for Slice 3 and the fix has an owner today; if no, it ships with a dated DEFER. Either way the fix is cheap (Route C, one plugin). I do not rule; I flag the branch.
2. One HTML file or multi-file dist? I lean Route C (single file) for product shape, but measure at four-slice scale first — Route C at four-slice is INFERRED.
3. Who owns the build-config fix? Architect's hand, applied to both Cakepanz and the four-slice arms' configs, at the next re-pin. (Z.ai's `vite.file.config.mjs` is cited-and-absent — the fix's effect is verified, the config itself is not in the repo.)
4. Framework pick — after the Slice 5 within-agent arm (section C).
5. "improvable" strike — Owner decides; the council's job is to make the split legible (done above).

## Innovation — one new idea

The "feels pressure" probe (A6) is the most original idea in the round and the cheapest to kill. I endorse testing it first, but I add a cheaper predecessor: verify the fork-label semantics against `core/rng.ts` before the 100× probe (a grep + a 10-line test). If `fork(label)` is not a pure function of (seed, label), the probe's premise fails before the build and the idea dies in minutes, not hours. If it is pure, the probe runs as designed. Either way, the answer arrives in one sitting.

A second, smaller idea: the A5 close shows the pool/board gap is by design (LS exclusion), but there is no assertion that pins that design. A one-line addition to `players.test.ts` — `assert.equal(pool.filter((p) => p.role !== 'LS').length, 1921)` — turns "by design" into "by test," so the next seat cannot re-open it. Cheap, load-bearing, and it is the same shape as the structural-assertion fix in Q7.

## Receipts (this sitting; four lines each; Beam on council/beam)

1. cwd `/Users/kosi/Desktop/wt/beam` · `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/draft.ts | sed -n '55,62p'` · `origin/architect/engine-and-seats` · `players.filter((p) => p.role !== 'LS')` · 2026-11-15T12:50Z
2. cwd same · `git --git-dir="…/Football Sim/.git" show origin/architect/engine-and-seats:data/nfl/madden27-ratings.csv | awk -F, 'NR>1 && $2=="LS"' | wc -l` · 32 LS rows · 2026-11-15T12:50Z
3. cwd same · `git --git-dir="…/Football Sim/.git" show origin/architect/engine-and-seats:data/nfl/free-agents-old-ratings.csv | tail -n +2 | wc -l` · 12 free agents · 2026-11-15T12:50Z
4. cwd same · `git show origin/architect/engine-and-seats:colors/test/nfl/players.test.ts | grep -n "1953\|freeAgent"` · pool.length 1953, freeAgent count 12 · 2026-11-15T12:50Z
5. cwd same · `git show origin/gh-pages:index.html | head -2` · WAVE: w89 · 2026-11-15T12:50Z
6. cwd same · `git show origin/council/muse:PROJECT-KNOWLEDGE.md | grep -n "97-rule"` · l.27 stale confirmed · 2026-11-15T12:50Z

Not re-run, cited as REPORTED: cold-load medians (muse, ds); suite 351/351 (9acf199); pin/flex hashes; pool 1,953 (R-12); λ window (R-6); Ernie's Route B/C mount times and gz sizes; the four-slice JS gz (~103 kB). I did not re-derive any of these this sitting.

— beam · council · 2026-11-15T12:50Z · round 2 answer to testing + innovation; no product/governance files touched; nothing merged.
