# DS — lane file

## Identity
- **Seat:** DS · **Model:** deepseek-v4.1-flash-free via OpenChamber · **State:** advisor
- **First seen:** 2026-10-25 · **ID block:** none used
- **Strengths shown (evidence):** P-342 review of the engine design (11 Nov) — toy kernel reproduced exactly, the keyed counterfactual claim tested harder than the author did (branch test), four defects with numbers (solver unit, Phase 1 margin gate, λ/θ identification, dispersion-matching bias); P-341 reviews (11 Nov) — Z.ai's Appendix A re-run 10/11 exact, Pickle's answer 15 rows confirmed, C>OG guard 10.0 vs Owner 6; flex rebuild (9–10 Nov) — generator reproduces both Architect tables rule for rule, 105-rule Owner table; E-211 review + second retire (5 Nov); Owner Colors-v1 answer (5 Nov); P-195 correction (3 Nov).

## Where
- **Worktree:** `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds`
- **Branch:** `council/ds`
- **merge-base HEAD origin/council/base:** `1b91f50e` (base unchanged since 5 Nov)
- **Last session end:** 2026-11-11 (this session)

## Current state (11 Nov 2026)

**P-342 review filed: Claude's engine design + toy kernel** — `inbox/20261111-0359-ds-P-342-engine-design-review.md`
(VERDICT **improved**; second review for P-342 after MUSE's ok). Ran from a read-only `git archive` of
`origin/architect/engine-and-seats` `a0ddc584`; no engine file touched.

- **Reproduced exactly:** solver 0.3722, d/d(pass gap) 0.16358 (20.6 s), simulator 0.3794 ± 0.0116 (z = 0.62),
  pairing 3.0× / 3.8×. Engine size 2,758 = 2,376 engine + 382 core. All §2 code claims VERIFIED (`realise` /
  `decompose`, `margin.ts` quantile coupling + 5.88% OT target, `softCap`, 10.8 drives / 5.15 yd/play,
  `CARRY`/`TARGET`/`YPR` static shares).
- **New test (the design did not run it):** patched the author's toy so the 4th-down policy is a parameter and
  measured the same key across a *policy* counterfactual. Coupling survives a real branch: gap ±2 corr 0.768
  (4.39×), small branch 0.840 (6.34×), always-go vs never-go **0.666 (3.02×)**. The counterfactual-replay claim
  holds; 3.0× is an optimistic ceiling (one chain to the next score, not a full game).
- **New measurement:** dispersion matching (the design's λ estimator) overstates λ by **+23% / +43% / +75%** at
  residual shares 33 / 50 / 67% on a 32-team synthetic (20,000 leagues); `Cov(y,g)/Var(g)` is unbiased
  (1.002) with sd 0.13–0.26. λ at n = 32 is ±13–26% relative even when unbiased.
- **Findings:** D1 solver prices **expected points, not wins** (toy state has no score/clock) and the flex price is
  stated as a derivative where a slot move is a finite change that can cross a 2/6/12 tier; D2 **Phase 1 margin-pmf
  gate cannot pass at λ = 0** (identical teams ⇒ no between-team variance) — the one thing that must change before
  Phase 1; D3 λ and θ are **not separately identified** (only λ·θ); D4 above; D5 **no macro/season gate before
  cutover**; D6 Phase 0 adapter would re-implement `boxscore.ts`'s allocator; D7 `PLAN_K` retired while its
  replacement is a §14 IDEA; D8 "one formula every sport" vs hazard/Poisson links in §7's own table; D9 penalties
  off vs "real league distributions"; D10 softCap's behaviour returns as softmax saturation.
- **Answers:** λ solvable in principle but not to a tier boundary from one snapshot; strangler shape right with
  three amendments; the design's 1%/3%/2% are not the Owner's ~10% and the margin part is unsatisfiable at λ = 0.
- **IDEA for the Owner:** the rebuild **dissolves the C 200 vs 150 question** (P-341 open item) — P-318 took
  `SLOTS[].weight` out of the loop, and the new duty gaps use `effOVR` + duty weights.
- **Artifacts:** `_agents/ds/tools/p342-branchtest.patch` (104-line diff vs `toykernel.mjs`),
  `_agents/ds/tools/p342-ident.mjs`.

## Previous state (11 Nov 2026, earlier session)
**P-341 answer + two reviews** (`d3ac5ffb`, `825703f4`). Answer: *participation ledger first, plays later as an
audit trail* — the box score allocates production, not participation. Z.ai Appendix A re-run: 10/11 exact after
MUSE's corrections (FB>RB 3.30, FB>TE 4.74, OLB>FS 11.74, TE>FS 13.64); **C>OG is the lone miss** — with C 200 /
OG 400 the guard is **10.0**, tier 12 vs the Owner's 6 (needs C ≥ 220 or a scope fix). Pickle's answer: 15 rows
re-run and confirmed; per-slot C>OG needs an Owner decision. Files: `inbox/20261111-0025-ds-P-341-zai-play-level-review.md`,
`-0026-…-play-level-answer.md`, `-0034-…-pickle-answer-review.md`.

## Earlier (9–10 Nov 2026)
**Flex rebuild** — `tools/mathlab/flexrebuild.mjs` (`--selftest` 36/36) reproduces `35ce4e98` (97 rules,
30/16/32/19) and `728b2c53` (23/15/40/19), 0 diffs; + items 3+7 = the **105-rule** table (23/40/16/26), checked by
`flexassert.mjs` (14/14). Findings: WILL/C bump does not move D; "removed" ≠ illegal (falls to −8); four cross-unit
zeros remain; items 3+7 need four engine/test edits; the Owner's WILL/C bump never landed in `slots.ts` (150/150).
P-312 playtest: the removals do not hold. Files `inbox/20261110-0051…`, `-0052…`, `-0053…`, notes
`_agents/ds/notes/flex-rebuild-2026-11-09.md`.

## Durable facts (do not re-derive)
1. **Build truth:** `Football-Sim-PreColors.html` = `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B.
2. `council/base` is a stale 2026-11-02 snapshot — read the live docs/queue from `origin/council/muse`.
3. `origin/main` is a different history (root `268fd56`) from `council/*` (root `474eb52`); never merge/check out `main` in a seat worktree.
4. The toy kernel's `d/d(pass gap)` is **0.16358**, solver value **0.3722** — any re-run must match or the file changed.
5. No seat edits the product file, the engine, or the governance files; DS has never edited one.

## What the next session needs
- **Read first:** `_agents/START-HERE.md` from `origin/council/muse`, this lane, then the queue (`node ./.council_tool.mjs next` from the worktree; delete the file before pushing). If a task is in the prompt, go straight to it.
- **Do not redo:** P-342 (reviewed, improved — awaiting the Architect), P-341 (answered + two reviews), P-311/P-312/P-323, P-195, E-211, P-020, P-152/P-153.
- **If P-342 is built:** re-run the toy kernel (must match) and check the Phase 1 gate now excludes the unconditional margin pmf; re-run the branch test if the keying scheme changes.
- **Next candidates:** P-326 (localWins20 formal recheck — still owed by a council seat, not MUSE), P-339 (re-run `flexcensus.mjs`), P-328 (one more review), or a backlog review from P-288/P-294.

## Open questions (mine, carried)
1. Does the Architect accept the amended Phase 1 gate (no unconditional margin pmf at λ = 0)?
2. Will λ be estimated with θ frozen and by regression, or is the doc's dispersion wording deliberate?
3. `legacy.ts` (delete or wire) is still an Owner decision; the Lab is absent from base and the architect branch.
4. C 200 vs 150 — moot under the rebuild (see IDEA), but the json/slot mismatch still exists today.

## Files in this lane
| path | what it is |
|---|---|
| `inbox/20261111-0359-ds-P-342-engine-design-review.md` | P-342 review: toy reproduced, branch test, D1–D10, amended gates in full |
| `_agents/ds/tools/p342-branchtest.patch` | the 104-line diff that turns `toykernel.mjs` into the branch test |
| `_agents/ds/tools/p342-ident.mjs` | 32-team λ identification synthetic (dispersion vs regression) |
| `inbox/20261111-0025-ds-P-341-zai-play-level-review.md` | P-341 review: Appendix A re-run 10/11, C>OG 10.0 vs 6 |
| `inbox/20261111-0026-ds-P-341-play-level-answer.md` | P-341 answer: participation ledger first; six interactions |
| `inbox/20261111-0034-ds-P-341-pickle-answer-review.md` | Pickle's answer: 15 rows confirmed; C>OG needs an Owner decision |
| `inbox/20261110-0051…`, `-0052…`, `-0053…` | flex rebuild review, 105-rule table proposal, P-312 playtest |
| `notes/flex-rebuild-2026-11-09.md` | the D→728→105 chain, six findings, integration steps |
| `notes/HYPOTHESIS-LEDGER.md` | H-DS-001…007 (8–9 Nov) |
| `deliveries/flex-rebuild-2026-11-09{,-corrected,-items3-7}/` | generated `flex.json`, `flex.ts`, `report.md` |
| `tools/*.mjs`, `tools/*.js` | probes and audits from 24 Oct–11 Nov |
| `reviews/`, `deliveries/`, `snapshots/` | older reviews, doctrine docs; snapshots are legacy build copies (deletion candidates once the Owner confirms) |
