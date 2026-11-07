# Revised prompt for Claude (Architect) — P-013 modelWeights problem, tooling built ahead of his turn

**From:** VLOC (council seat, council/vloc) · **Date:** 2026-11-07T23:52Z · **For:** Claude (Architect) · **Re:** P-013 (weights recalibration, protected constants) · **Status:** advisory + tooling only; **no product file or protected constant touched** (VERIFIED: `git status` clean on council/vloc, nothing staged)

This revises Z.ai's 8-Nov prompt (`PROMPT-FOR-CLAUDE-2026-11-08.md`, gh-pages `z-post-blue-zai-advisory-2026-11-08/`) in light of the clarified modelWeights problem and the tooling I built this window. Every claim is labelled VERIFIED (I ran it) / REPORTED (another seat's number or a named file) / INFERRED / UNKNOWN, with evidence. Nothing here changes `Football-Sim-*.html`, `AGENTS.md`, `PRIORITIES.md`, or any protected constant (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, the `modelWeights()` contract).

---

## 1 · What changed since Z.ai's 8-Nov synthesis

**The modelWeights problem is deeper and better pinned than the synthesis stated.**

- **Fit target = the old personal table, not the salary table.** The lab-28-Oct fit (`tools/mathlab/fitlm.js`, Levenberg-Marquardt on the real engine inside headless Chromium) patched 28 engine knobs (RATING_SPECS rows, DEF_SPECS, PERS_REC, MC knobs incl. `qb`/`toQb`/`kick`, PUNT_PTS) so `slotWinsPerOvr()` lands on `tools/mathlab/design.json` (QB 1000, WR1 470, DE1 520, CB1 450, OT1 430, ...) — converged to RMS log-error 0.14% (REPORTED: VLOC audit `inbox/20261107-2059-vloc-P-013-weights-audit.md`, verified from fitlm.js + `results/fit-precolors-2026-10-28-recv.json`; I did not re-run fitlm). Per the Owner's 7-Nov ruling (R-01, binding), design.json derives from the OLD personal table — Pre-Colors `DEFAULT_WEIGHTS` = QB 320, WR1 60, TE1 80, CB1 350, SS 80, FS 60 (VERIFIED at product line 452) — the secondary-heavy personal preferences, not the salary table (which arrived 6 Nov).
- **There is a SECOND Colors-track calibration.** `architect/engine-and-seats/tools/mathlab/calibrate-weights.mjs` (its own comment, VERIFIED by reading it) fits spec coefficients (RATING_SPECS, DEF_SPECS, PERS_REC, RB_HEAVY) via fixed-point iteration so `derivedWeights('4-3')` lands within ±50 of `tools/mathlab/salary-reference.json` — the Owner's 6-Nov salary-based weights (QB 1000, WR1 650, DE1 650, CB1 400, ...; VERIFIED from the file). `--write` would paste the rounded coefficients into `colors/src/sports/nfl/engine/specs.ts`.
- **Two inconsistent targets, neither validated.** Mechanics fit to design.json (old personal); display weights = salary/Owner table. The shell's w79 adds a third dialect (multiplicative, shape-preserving rescale of the L2 curve to the Owner's table, scale pinned at deviation 0 — Z.ai Q2, VERIFIED at w79 source). This is exactly Z.ai's §6 two-track risk, now quantified.
- **The raw curve matches no anchor.** My T3 run on Pre-Colors 40233d6b (VERIFIED): raw `slotWinsPerOvr()` rescaled to QB=700 gives CB1 397 > WR1 304 — the engine's raw mechanics value CB1 ABOVE WR1 — while Owner table = WR1 650/CB1 400, design.json = WR1 470/CB1 450, salary-only = WR1 625/CB1 375. 16 of 27 slots flagged (spread > 100 pts or rank spread ≥ 6). Largest: WR1 raw 304 vs Owner 650 vs design 470 vs salary 625 (spread 346). Beam's M2 "measured vs salary" compared two different targets — not a validation (Owner's analysis, R-04).

**Owner's binding rulings (R-01…R-04, filed in `_agents/vloc/deliveries/ruling-log.md`):**
1. Abandon the old system (personal weights AND salary table) as calibration target or foundation; keep only as display presets / independent anchors, never fit targets. `DEFAULT_WEIGHTS` may be repositioned/retired — Owner approval granted; Architect implements + **re-pins MERGE-MANIFEST.md in the same commit**.
2. New display presets: QB at 1000, other slots from the engine's math, increments of 50. Remove old presets entirely. (Consistent with `modelWeights()`: `Math.round(w/mx*700/5)*5`.)
3. This round: read/synthesize/evaluate/answer before building; may run tests to decide the best path. No "Owner's table stays model" law.
4. Z.ai's 8-Nov synthesis adopted with the corrections above.

---

## 2 · Tooling I built (VLOC lane, `council/vloc`), all read-only

Each script pins `Football-Sim-PreColors.html` sha256 (`40233d6be00e987c…`, VERIFIED = matches AGENTS.md §2) before and after, and exits non-zero if the bytes changed during the run. None writes the product. Run from the repo root.

| Tool | File | What it does | Ran? | Evidence |
|---|---|---|---|---|
| **T3** Triangulation generator + raw-curve witness export | `tools/mathlab/triangulate.mjs` | Evaluates the product inline engine in a Node sandbox (DOM/Network stubbed; seeded Math.random); emits raw `slotWinsPerOvr()`, raw 50→100 curves (`slotWinsTable()`), `modelWeights()` calibrated; per-slot comparison vs Owner final 11-06, design.json, salary-only; ranks, spread, disagreement flags | YES — VERIFIED | `tools/mathlab/results/triangulate-2026-11-07T23-46.json` (T12-wrapped, `uncertainty.mjs check` PASS), `tools/mathlab/results/raw-curves-2026-11-07T23-46.csv` |
| **T4** Replacement-level auditor | `tools/mathlab/replacement-audit.mjs` | Engine replacement definition (`staticReplacement`/`replacementLevels`: Nth-best available league-wide per group, dem = 32×slots-per-team) vs Madden 27 pool Nth-best | YES — VERIFIED | `tools/mathlab/results/replacement-audit-2026-11-07T23-49.json` (gapPts = 0 on all 14 groups; TE 69 lowest, EDGE 77 highest; real-snap comparison UNKNOWN — no snap data in workspace) |
| **T6** Flex opportunity-cost pricer (deterministic) | `tools/mathlab/flex-pricer.mjs` | cost(pos→dest, ovr) = slotWins(natural, ovr) − slotWins(dest, ovr); OVR-equivalent = winsLost / slotWinsPerOvr(dest); vs flat FLEX table penalties | YES — VERIFIED | `tools/mathlab/results/flex-pricer-2026-11-07T23-50.json` (e.g. CB→SAM at 95 OVR: 0.993 wins lost vs flat penalty 4; CB→FS flat 0 but costs 0.42 wins at 95) |
| **T12** Uncertainty wrapper (reporting law) | `tools/mathlab/uncertainty.mjs` + `_agents/vloc/deliveries/uncertainty-reporting-law.md` | `wrap` adds n/spread/ci95/practical-effect-threshold/_uncertainty block; `check` exits 1 if any field is absent (null with reason is acceptable) | YES — T3 output wrapped, check PASS | Law note filed; helper VERIFIED |
| **T1** Mechanics validation harness (skeleton) | `tools/mathlab/t1-harness.mjs` | Harness contract + deterministic dry-run (slotWinsPerOvr implied group shares vs Owner final shares; NO sim, NO RNG, NO external data) | Dry-run only | `tools/mathlab/results/t1-dryrun-2026-11-07T23-51.json` (secondary engine-implied share 23.1% vs Owner 16.5% — echo of the fit target, NOT independent validation) |

**Blocked (documented, not run):** full T1 (N seeded seasons, 4-level ladder vs nflverse, play-level outcome distributions) and full T6 (paired-seed lineup re-optimization across sampled supporting casts, percentile table) need (a) the injectable/seeded RNG — task T-20261022-claude-2 (product has 56–58 `Math.random()` sites, no seed) and (b) nflverse snap/target/EPA data — not in this workspace; data ask for the Owner/another seat. Held-out lint: no fit script may read 2024–2025 (Z.ai §4, Beam tool #10).

**Governance artifacts (filed):** `H-001-mechanics-honesty.md` (hypothesis ledger, written before results), `discrepancy-register.md` (D-001…D-006), `ruling-log.md` (R-01…R-04). All in `_agents/vloc/deliveries/`.

---

## 3 · My answers

**Q1 — What `slotWinsPerOvr()` measures.** Same contract as Z.ai's w79 description (deterministic, best-plan matchup model, all-else-80, OVR 50→100 curve, points→wins k=17/POINTS_PER_WIN=32.5, 70→90 slope) — VERIFIED at Pre-Colors lines 1326–1350. One correction: it describes the **shell** (Pre-Colors). The Colors engine has its own `derivedWeights()`/`slotWinsPerOvr` on the specs-driven track. My VERIFIED measurement on Pre-Colors 40233d6b (raw wins per +1 OVR): QB 0.1271, DE1 0.0650, CB1 0.0721, WR1 0.0552, CB2 0.0589, OT1 0.0518, TE1 0.0400, FS 0.0427, DT1 0.0473, MIKE 0.04316, … Raw CB1 (0.0721) > WR1 (0.0552) — the engine's raw mechanics outvalue CB1 over WR1. The full 51-point raw curves per slot are archived in `raw-curves-2026-11-07T23-46.csv` (the witness). No RNG at this layer; n=1 deterministic measurement.

**Q2 — Parameter diff (original → calibrated → position → measured effect).** **Yes — I can produce it within the next wave, in the Beam/VL layer-audit format (parameter · layer · fitted-to-what · when · by whom).** The two Colors-track calibrations are now identified and their files are readable on `architect/engine-and-seats` (read-only for me): `tools/mathlab/fitlm.js` (fit to design.json, 28-Oct lab) and `tools/mathlab/calibrate-weights.mjs` (fit to salary-reference.json, 6-Nov Owner ruling) plus `design.json` and `salary-reference.json`. I can fold the before/after diff with measured effect into the layer-audit tables. No product write needed — this is an evidence report.

**Q3 — Raw-curve witness.** **VLOC accepts, on my (shell) track.** T3 is built and has run: `slotWinsTable()` raw curves beside `modelWeights()` calibrated, per build, hash-stamped, archived — "the calibrated scale answers to the Owner; the raw curve answers to reality" (Z.ai §2 Q3). Nothing on the product side breaks; it is read-only evidence emitted with every weights change.

**a) Accept the raw-curve witness on your track too (Colors, `derivedWeights()`)?** — **Your call; VLOC's recommendation: yes.** Mirror T3 on `derivedWeights()` so the Rosetta table (§3d) has both sides. The Colors track's `calibrate-weights.mjs`/`--write` path writes into `colors/src/sports/nfl/engine/specs.ts` — that is an Architect-owned product-side change on the Colors track; the witness export itself is read-only.

**b) Q2 parameter diff in layer-audit format within the next wave?** — **Yes.** Offer above; the files are visible and readable. I need your confirmation that reading `architect/engine-and-seats/tools/mathlab/` is in bounds (it is on a sibling branch, read-only, no product bytes).

**c) Where should the seeded/injectable RNG land first (T-20261022-claude-2)?** — **In the game sim first** (`simulateCurrentWeek`/`playGame` path — the missing half; drafts are already seeded with mulberry32 in-page per Z.ai's w79 note). Game-seeding unblocks T2 (paired-seed comparator: same draft seed + same game seeds, kill draft variance first then game variance) and the full T6 pricer (paired seasons, sampled supporting casts). Do not re-seed the draft first — draft seeding exists today.

**d) Shared output schema + Rosetta table?** — **Yes, accept.** One table per slot: shell `modelWeights()` · Colors `derivedWeights()` · raw curves (both tracks) · Owner table · volume-derived · production/EPA-derived · AV-derived · salary-derived · rank correlations · spread · bootstrap CI · disagreement flag. The Owner reads one table instead of three dialects; where the raw curves of both tracks disagree with each other, that is a mechanics difference for a joint finding. Divergences between tracks become visible facts, not folklore (Z.ai §6).

---

## 4 · Recommended steps for you (waves)

- **Wave 0 — now, no product changes:** adopt the raw-curve witness on both tracks; adopt the Rosetta output schema (§3d); adopt the T12 reporting law (every lab JSON: n, spread, CI95, pre-stated practical-effect threshold); compute new display presets with QB = 1000, engine math, 50 increments (Owner R-02); keep old personal + salary tables as display presets/independent anchors only, never fit targets (Owner R-01).
- **Wave 1 — after the RNG lands (T-20261022-claude-2, game sim first):** T1 full mechanics harness on the 4-level ladder with pre-registered tolerance bands (fail → report, never auto-adjust); T2 paired-seed comparator (report mean/median/SD/SE/CI/n-sims/n-distinct-rosters/n-seeds); T3 per-build archival forever; T4 sensitivity on the replacement definition; T6 full flex pricer (paired seeds, sampled supporting casts, percentile table; the Owner's −10 cap stays the interim guard per his 29-Oct ruling).
- **Standing architecture:** adopt the three valuation modes — Football Value (lab raw curves + anchors), Game Balance (documented compensations, each logged with coefficient + reason + commit), Owner Preset (QB=1000 presets computed from engine math, 50 increments). Never fit L2 to any table.
- **Dissent list (Z.ai §5):** I agree with all four — (1) Shadow Sim RMSE demoted from "ultimate source of truth" to a Tier-B distribution check; (2) trait-weighted flex degradation is direction-right but premature — subsumed by T6; (3) individual EPA attribution is research, not a gate — unit-level slopes are the honest granularity; (4) percentile vs scarcity confound — keep importance (marginal wins) and scarcity (talent supply) separate, T9.

---

## 5 · Handoff: what I built / what I need from you

**What I built (this window, all pushed-ready on council/vloc):** T3 + T4 + T6 + T12 (all ran, all VERIFIED numbers), T1 skeleton + dry-run, governance (H-001, discrepancy register, ruling log), this prompt. Full file list and evidence paths in §2. Commit and push pending your read.

**What I need from you:**
1. Your answers to Q3/a/b/c/d (especially c — RNG landing in the game sim first — and d — Rosetta schema go/no-go).
2. Confirmation that producing the Q2 parameter diff from `architect/engine-and-seats/tools/mathlab/` (read-only) is in bounds; if yes, I'll file it as an inbox/lane evidence report.
3. Go-ahead to apply the T12 law to all future lab JSON (T3 output already wrapped, check PASS).
4. No product edits from me this round — any `DEFAULT_WEIGHTS`/`FLEX` change is yours (Architect-only), with MERGE-MANIFEST.md re-pin in the same commit (Owner R-01).

**Constraints restated:** read-only for me on product files and protected constants this round; real data only from public sources (nflverse, PFR AV), hash-pinned, offline; no invented data (AGENTS.md §7); every claim labelled. When you build, the gate is `tools/post-merge-smoke.mjs` + `node tools/lint.mjs product <html>` + 390 px check; a Verifier other than the author signs off.
