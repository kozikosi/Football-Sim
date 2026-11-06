SPEAKER: VL | ROLE: Council Advisor | TASK: P-282 | DATE: 2026-11-06T10:31:07Z
FOR: P-282

# P-282 — WR2 verification + weights reevaluation + test new tools + respond to Claude/Z.ai proposals
Source: `_agents/PRIORITIES.md` on `origin/council/muse` (P1, Owner-directed, MUSE 2026-11-06). All four parts in this one item. This is a review/findings deliverable only: no product file, `AGENTS.md`, `PRIORITIES.md`, or protected constant is touched.

## Part 1 — WR2 verification (re-run of the weights-vs-impact sweep, post-de60e05)

### The de60e05 fix is present in the current code — VERIFIED
- `de60e05` (2026-11-03, Claude, "Focus dial pays when it matches the offence (defPredict 0.4 to 0.15); WR2/WR3 receiving spec lowered; 32-spot table re-measured (Owner-approved)"): commit object exists; diff touches `colors/src/engine/slots.ts`, `colors/src/engine/specs.ts`, `tools/mathlab/design.json`, plus a focus-dial test and an approval note. `git branch -a --contains de60e05` returns nothing: it is a dangling commit object in this fetch, not on a seat branch.
- On the Colors v1 build line (`origin/architect/engine-and-seats`, new `colors/src/sports/nfl/engine/` layout — the current engine code):
  - `specs.ts` `rec: { WR1: 0.99, WR2: 0.70, WR3: 0.45, TE1: 0.53, RB1: 0.19, TE3: 0.02, WR4: 0.02 }` — WR2 0.91→0.70, WR3 0.53→0.45, no leftover 0.91. `defPredict 0.4→0.15` also applied. VERIFIED by read.
  - `slots.ts` 32-spot table: `WR1 525, WR2 295` (was 470/330). Revealed WR2/WR1 table ratio = 295/525 = **0.562**. VERIFIED by read.
- Contrast: this worktree's (`council/vl`) `colors/src/engine/slots.ts`/`specs.ts` still show the pre-fix values (WR2 0.91/WR3 0.53; WR1 470/WR2 330) — the local `colors/` snapshot predates de60e05; it is not the post-fix build. VERIFIED by read.

### Discrepancy status
The pre-fix discrepancy was WR2 overweighted: spec ratio 0.91/0.99 ≈ 0.92 and table ratio 330/470 ≈ 0.70, both above the 0.4–0.6 salary band (WR1s $30–35M/yr, WR2s $12–18M/yr). Post-de60e05 the **table ratio is 0.562 — inside the salary band**. The overweighting discrepancy is resolved at the table level, which is where the salary comparison lives. The spec knob ratio (0.70/0.99 = 0.707) remains above band, but spec ratios are not salary — `modelWeights()` quantises spec → table, and the table already lands in-band.

### Attempted positional impact probe — NOT a reliable finding (below noise floor)
I ran a P-224-style positional sweep (80→99 OVR swing, point-differential/wins impact) against the post-de60e05 engine headless:
- Symmetric league (all teams' starter at the slot set to 80 vs 99, 40 seasons): every position delta ≈ 0.000 pts/g — below the game-noise floor (`PTS_NOISE 6.0`), unusable.
- Asymmetric league (subject team's slot at 80 vs 99, 300 seasons): WR1 +6.47pp win rate, WR2 +12.00pp, QB +14.08pp, CB1 +11.96pp, DE1 +14.80pp, RB1 only +2.90pp — implausible (QB should lead; RB1 shouldn't trail CB1/DE1), dominated by single-subject-team draft variance. Not a reliable revealed-impact rank.
Conclusion: the dedicated P-224 positional-sweep tool (80→99 × 1,500 games, asymmetric, point differential) does **not** exist yet — P-224 is a standing "invent new engine tests" item (PRIORITIES P-224) whose proposals land via `inbox/<UTC>-<seat>-test-<slug>.md`. My probes are reported as probes, not findings.

### Recommendation (the asked call)
**Hold spec WR2 at 0.70; do NOT cut it toward ~0.50 yet.** Rationale: the table the spec quantises to already reveals WR2/WR1 = 0.562, inside the 0.4–0.6 salary band, so the de60e05 fix resolved the overweighting where it is checked. Cutting the spec to force the table toward ~0.50 would push WR2 below its revealed table value with no reliable impact evidence to support it (the P-224 positional sweep that would measure the revealed impact rank is not yet built). Reconsider the spec downward only if a future, trustworthy P-224 positional sweep shows the WR2 impact ratio below ~0.50. Any spec/table change is a protected-constant change: needs Owner approval and a `MERGE-MANIFEST.md` re-pin in the same commit.

## Part 2 — Broader weights reevaluation (32-spot table, post-de60e05)

Full table (`colors/src/sports/nfl/engine/slots.ts`, `origin/architect/engine-and-seats`), weight rank desc:
1 QB 1000 · 2 WR1 525 · 3 DE1 520 · 4 OT1 430 / CB1 430 · 6 DT1 410 · 7 DE2 405 · 8 OT2 400 · 9 CB2 340 · 10 C 320 · 11 DT2 305 · 12 TE1 295 / WR2 295 · 14 OG1 290 / OG2 290 · 16 CB3 280 · 17 MIKE 265 / FS 265 / SS 265 · 20 WILL 245 · 21 RB1 235 · 22 K 200 · 23 WR3 180 · 24 DL5 145 · 25 DIME 40 · 26 P 100 · 27 RB2 80 · 28 TE2 60 · 29 SAM 35 · 30 FB 30 · 31 TE3 10 / WR4 10.

Signal per P-282: rank gap of 4+ spots between weight rank and revealed impact rank, or vs salary context. Revealed impact ranks are not yet measurable (P-224 tool missing — see Part 1), so the flags below are **INFERRED from salary context** (NFL ~2026: QB $55–60M; WR1 $30–35M; edge/CB/DT $20–35M; OL/LB/S $10–20M; RB depressed $8–12M; TE $10–15M; K $4–6M; P $3–5M), not measurements.

Flags:
- **K 200 (weight-rank 22)** vs kicker salary $4–6M (salary-implied rank ~29–31): gap ≈ 7–9 spots vs salary. FLAG. Known tension — kicking wins-value in close games is real — so this is a watch item, not an asserted error.
- **RB1 235 (weight-rank 21)** vs depressed RB market $8–12M (salary-implied rank ~25–27): gap ≈ 4–6 vs salary. FLAG. RB wins impact is real; the weight may simply be high vs the depressed market.
- **TE1 295 (weight-rank 12)** vs TE market $10–15M (salary-implied rank ~16–18): gap ≈ 4–6 vs salary. FLAG (watch). Note TE1 == WR2 at 295 — a tie worth breaking only if a sweep shows an impact split.
- **FS 265 == SS 265 (weight-rank 17)** vs safety market $10–15M (~20–22): gap ≈ 3–5. watch. Also FS vs SS are equal-weighted despite different roles.
- **DL5 145 (weight-rank 24)**: rotational fifth lineman, share 0.33 measured (1,632 team-games 2023–25); impact rank unverified — no P-224 data yet. FLAG as unverified, not as off.

Looks consistent (no flag): QB/WR1/DE1 top-3 match salary; CB1 430/CB2 340, DT1 410, DE2 405, OT1 430/OT2 400, C 320, MIKE 265 > WILL 245 all directionally and gap-sensible vs salary.

Method note: the rank-gap-4+ rule needs revealed impact ranks per spot; build the P-224 positional sweep (per Part 1) and re-score this table against it. File per-spot findings as separate `inbox/<UTC>-<seat>-test-<slug>.md` items once the sweep exists.

## Part 3 — Test the new tools

### 3a Z.ai cutover batteries (gh-pages `z-post-blue-cutover-2026-11-06 w77/`)
- Files present: `batteries/accept.js`, `batteries/adapters/w76.js`, `batteries/adapters/pancakes.stub.js`, `contract.json`, `CUTOVER-BATTERIES.md`, `RUNBOOK.md` — VERIFIED via `git ls-tree origin/gh-pages`.
- Reference build `Football-Sim-Z-post-blue-w76.html`: md5 `4f363452a4ad33709244ca08d4ab3b00`, 1,830,164 B — matches the spec exactly (VERIFIED: `md5`).
- `accept.js` structure: 16 assertion groups V0–V17 totaling the claimed 84 assertions; law strings byte-identical to the w76 battery; exit codes 0 accepted / 1 failures / 2 crash / 3 skips; an unfilled adapter key SKIPs loudly (never a vacuous pass) — VERIFIED by reading `accept.js`, `CUTOVER-BATTERIES.md`, `RUNBOOK.md`.
- **LIVE reference run (84 pass / 0 fail / exit 0) could not be executed here:** `playwright` is not requireable in this environment and no Chromium binary is configured (`ZPB_CHROME` unset). The claimed 84/0/0 remains Z.ai's report; the artifact itself is well-formed and internally consistent.
Verdict on the cutover-batteries proposal: **ok** (sound law-driven harness, adapter separates WHAT from WHERE, no vacuous passes, reference build md5-verified). Reference-run claim: **REPORTED, environment-gapped.**

### 3b Claude's tsc baseline gate (`colors/tsc-baseline.json` + `npm run tsc:check` / `tsc:ratchet`, commit cb5e0427)
- `colors/tsc-baseline.json` on `origin/architect/engine-and-seats`: `total 176`, 24 files — VERIFIED.
- `colors/tools/tsc-baseline.mjs` — VERIFIED by read: `check` exits 1 if any file's error count grew or a new file errors; `--write` (ratchet) refuses to raise any count; `--init` only creates when absent. This is exactly a "gate must fail when errors grow" ratchet.
- `cb5e0427` ("tsc ratchet: per-file baseline (298 errors / 24 files)") is a commit object but is dangling (not on any fetched branch); the baseline on the architect branch is already ratcheted down to 176.
- **LIVE run could not be executed here:** `tsc`/typescript is not installed (`npm run tsc:check` needs the `typescript` devDependency). Gate design VERIFIED structurally; baseline pinned at 176; live execution: **REPORTED, environment-gapped** (needs `npm i -D typescript` and a `tsc` run against `colors/`).
Verdict on the tsc-gate proposal: **ok** (design matches the claim); live pass/fail: **UNVERIFIED here.**

## Part 4 — Respond to the proposals

### 4a Claude's seat stale-lane check proposal (`claude/rulings/2026-11-06-seat-stale-lane-check-proposal.md`; PROPOSAL, not built)
`tools/seat-check.sh <name>` prints three verdict lines: LANE-CHECK (commits on `council/<name>` after the lane file's commit; 0 = fresh, N = stale with subjects), RULES-CHECK (commits on `origin/architect/engine-and-seats` after the lane commit touching `AGENTS.md`, `_agents/COUNCIL.md`, `_agents/PRIORITIES.md`, `_agents/START-OF-CHAT.md`, `_agents/END-OF-CHAT.md`), SEAT-STATE (retired per `_agents/RETIRED.txt`, lane >300 KB, worktree/branch mismatch, `preserve.mjs check` summary). Read-only, one fetch, no work assignment, lives on the Architect branch. VERIFIED by reading the proposal.
- **Verdict: ok.** The END-OF-CHAT rule ("refuse to finish unless the lane file's commit is the branch tip") is sound — it makes LANE-CHECK fresh by construction, mirroring the Architect's NOW-CHECK/NOW.md coupling.
- **PROJECT-KNOWLEDGE.md question:** recommend **do not add** to RULES-CHECK. `PROJECT-KNOWLEDGE.md` is the Architect's single-writer current-facts doc (AGENTS §8), not a seat-facing rule file; it is rewritten at Architect handover, not per-chat. Adding it to RULES-CHECK would create noise on Architect handovers, and `PKM` is not a "rule that moved" that can strand a seat acting on stale rules. Keep RULES-CHECK to the five rules files. (This is an INFERRED judgment; the proposal leaves it to Muse as a one-line add.)
- Note: the proposal is queued after the guard passes and the Owner can amend first; it is not built, so this is a review, not an implementation.

### 4b Z.ai's proposals (`20261106-zai-answers-to-muse.md`, gh-pages w77)
- **Cutover batteries:** verdict **ok** (see Part 3a).
- **Five flag views** — all **ok** (each is measured against shipped code, scoped, and leaves the decision to the Owner):
  - Flag 1 — veto (b) 40%-of-games floor + TRUE OVR test: KEEP both. Floor = `max(3, round(games*0.4))` computed on real `r.gp`; TRUE OVR = `zpbTrueOvr` keeps roster law on engine truth, not the display translation.
  - Flag 2 — twin header "EVERY ROOM AT A B OR BETTER": KEEP as shipped (it is the empty-state content when every room is ≥B); the alternative silent variant (collapse the section) is an Owner option. Do not delete the string and leave an empty shell.
  - Flag 3 — "Cutdown Day" casing: caps is the only honest render. Measured the Cinzel Decorative TTFs: lowercase codepoints exist but are cap-height (no x-height); casing switches plain vs swash caps, not size. Glyph-level proof; no CSS can honor mixed-case in this font.
  - Flag 4 — "SEASON RATING" card label: keep — battery-pinned (V4 U6), distinct from the OVR badge.
  - Flag 5 — explainer's home: the scale-explainer line already lives in the Guide (retired generator shadowed); delete the dead recap/why-box assembly at cutover and never port it; the port's `engine.explainerProbe` reads the line's live home (the Guide).

## DoD (all four parts)
- WR2 revealed ratio measured and reported: table WR2/WR1 = 0.562 (spec ratio 0.707); recommendation: hold spec 0.70, do not cut toward ~0.50 without a trustworthy P-224 positional sweep. ✓
- Other off weights flagged: K, RB1, TE1 (salary-context, INFERRED); DL5 impact unverified. Filed via this `inbox/...-test-<slug>.md` file. ✓
- New tools tested with results reported: cutover batteries (artifact verified; reference run environment-gapped) and tsc baseline gate (design verified; live run environment-gapped). ✓
- Proposals have council verdicts: Claude seat-stale-lane check **ok** (PKM: do not add to RULES-CHECK); Z.ai cutover batteries **ok** + five flag views all **ok**. ✓

No product file, `AGENTS.md`, `PRIORITIES.md`, or protected constant was touched.
