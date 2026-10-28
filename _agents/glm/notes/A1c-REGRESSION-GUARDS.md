# A1c · Minimum viable regression-guard set — single-file build, no test runner (proposal)

**SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: A1c — regression guards (Claude's ask, unclaimed assignment) | DATE: 2026-10-22**
Anchor: `_agents/pickle/builds/Football-Sim-PreColors.html` (`40233d6b…`, 657,486 B) · Hold §7: propose only, no product edits, no protected constants.

## 0 · Premise receipts

- The docs' named statistical harness does **not exist** in this tree (re-verified this turn): `pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh`, `mk.sh` — absent; `tests/funcdiff.js` — absent at root (only my lane prototype `_agents/glm/tests/funcdiff.js` exists). CORROBORATES MOC's verification; VERIFIED via `for f in …; do [ -e "$f" ]; done`.
- The `AGENTS.md` numbers (r≈0.66, ρ≈0.69, RMSE≈2.6) are therefore **targets, not measurements** — no script in the tree can produce them. (REPORTED-from-doc + VERIFIED absence.)
- What _does_ exist cheaply today: `tests/e2e-smoke.mjs` + `tests/CONTRACT.md` (C1: harness lives in `tests/`, `__dirname`-relative paths, Node core only, no installs) and MiniMax's `post-merge-smoke.mjs` (CDP driver smoke: render100 crash guard, 390px overflow, console health); my `_agents/glm/tests/flex-audit.js` (strict-matching invariant, runs headless, no driver) and `_agents/glm/tests/supply-census.js` (pool census).

## 1 · The guard set, ranked cheapest-first

| # | Guard | Catches that a code review cannot | Build cost | Run cost |
|---|---|---|---|---|
| G1 | **Parse gate** — extract every `<script>` block, compile with `new Function(src)` (no execute), exit 1 on any syntax error | Mangled braces/functions from a hand edit or a bad merge in a 660 KB single file — the #1 mechanical failure of this project | ~10 lines Node core | seconds |
| G2 | **Literal pins** — sha256 over the exact protected-literal texts (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `SLOT_FAMILY`, `LB_FLEX`, `MC`, `PLAN_K`, `RATING_SPECS`, `ROSTER_SLOTS`, `PLAYERS-literal`) compared against a pin table checked into the same change set | The **Math.LN2-class hand edit** (this turn's verified instance: `runB/passB` `0.000 → Math.LN2` at l.2029, model-output-affecting, undetected for its whole life) — nobody diffs 660 KB by eye | minutes — `_agents/glm/tests/flex-audit.js --literals` is the seed | seconds |
| G3 | **Pool census baseline** — replay of `supply-census.js` pinned to a frozen histogram (1,200 records; per-position counts; record-width uniformity; 32-team set completeness) vs the pin table | Invented/deleted/duplicated rating records and roster-slot typos — the class behind both the 1,188-confusion and the invented-ratings incidents; a reviewer cannot count 1,200 rows | minutes (census exists; needs pin table + exit codes) | seconds |
| G4 | **Strict-matching invariant** — `flex-audit.js` configs A/B: flow 832/832 & 896/896, total flex penalty 54/54, edges 12,210/12,339 on the anchor build | Silent damage to `FLEX`/`NATURAL_SLOT_MAP`/`SLOT_FAMILY` (family-key typo → edge count collapses; a penalty typo → total ≠ 54); runs the build's own flex tables through the documented min-cost procedure end-to-end | **zero — already built and receipted** | seconds |
| G5 | **Driver smoke promotion** — run the existing `tests/e2e-smoke.mjs` (and MiniMax's `post-merge-smoke.mjs`) as the contract's mandated suite: draft completes with no console errors, render100 renders, 0 page errors | Runtime **wiring** breaks invisible to any static check — e.g. the dead "Play a Season" CTA (`renderDraftResults` → `setActiveTab('viewSeason')` calling handlers that do not exist) | zero build; needs a launched headless browser | ~1 min |
| G6 | **Seeded model snapshots** — extract `simulateGame`+deps into Node (no DOM), run a fixed grid of ~64 games × fixed seeds, pin the output tuples (score/yards/TOs/sacks) to a golden file | **Model-constant changes outside the protected-literal list** — exactly the Math.LN2 instance again (G2 pins protected constants; runB/passB live in the personnel table, so G6 is the net that catches edits G2 cannot name) | highest — a day of careful extraction | seconds |

## 2 · What each guard can never prove

- **Realism/accuracy.** No guard proves the simulator matches real football. Calibration against real 2025 results is a *study* (and stays undone until `validate.js` is actually built); a guard can only prove *unchanged*, never *correct*.
- **Truth of the hidden data.** Pins enforce that ratings/colours tables did not move; they cannot prove a rating is real. Provenance (Owner open item 2) is a metadata task a snapshot guard will never solve.
- **Feel.** Fairness perception, fun, narrative quality, difficulty shape — out of machine reach.
- **UI/layout surface.** Pure-function guards (G1–G4, G6) say nothing about the 390px layout or the views; only the driver layer (G5) touches it, and a driver smoke is spot-checks, not coverage.
- **Zero false sense.** A guard is only as good as its pin table: a wrong pin enforced loudly is enforced garbage. G2/G3/G6 pins change ONLY in the same submission as an Owner-approved build change — a stale pin must FAIL, not skip.

## 3 · Must-fail-loudly standard (all six)

1. CLI only, Node core modules, no installs (CONTRACT C1), runs in `tests/` with `__dirname`-relative paths.
2. Exit **0** = every asserted pin matched; **exit 1** with one line naming the broken pin; **exit 2** = environment failure (missing input file, wrong sha of the anchor build). *Missing data is never a pass.*
3. Never print warnings without failing; never exit 0 with an empty result set.
4. One runner aggregation: a `tests/run_guards.sh` (the `run_all.sh` the docs never received) that stops at the first RED and prints which layer failed — layered cost discipline included.

## 4 · First one to build, and why

**G1 — the parse gate — first.** (a) Every other guard silently trusts a parseable file, so G1 is the gate the rest stand on; (b) it catches the single most common defect class in a hand-edited 660 KB single file — mangled script blocks — which no reviewer can reliably spot by eye; (c) it is ~10 lines, needs no browser, no pin table, no decisions, and conforms to CONTRACT C1 today. **Same-day second:** G2, in the same extraction harness (its seed already exists in `flex-audit.js --literals`). **Already built, promote in place:** G4 (receipted this turn) and G5 (the smoke stack already passes on the donor). **Defer, by deliberate choice:** G6 until the Owner accepts the snapshot philosophy — it is the only new build with real cost, and it overlaps partially with G2 for protected constants.

_GLM end-anchor._
