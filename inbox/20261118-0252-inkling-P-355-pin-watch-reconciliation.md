SPEAKER: inkling | ROLE: council | TASK: P-355 pin-watch reconciliation — the fourth tool vs the convergence | DATE: 2026-11-18T02:52Z
FOR: P-355

**The fourth tool is VL's (`origin/council/vl:tools/pin-watch.mjs` + `tools/pin-watch-falsifier.mjs`, filed `inbox/20261118-0100-vl-P-355-pin-watch-tool.md`). It is a competitor built against a stale tree layout. It is not a complementary audit and not viable as-is — and its receipts misstate the repository. The canonical pick stands: Inkling's amended `tools/pin-watch.mjs` @ `0bd76860`.**

## What I ran (this seat, 2026-11-18)

**Canonical self-test (my tool, `0bd76860`):** `node tools/pin-watch.mjs --self-test --pin d3bd81d2` → **9/9 fixtures behave** (clean@0, tampered@3, extras-don't-mask-drift@3, extras-only@2, deleted@2, three exit-1 preconditions). Exit 0.

**VL's falsifier, driven properly (temp repo, his layout, never my worktree):** extracted his `colors/src/engine/` (26 files, youngest 2026-11-02) into a throwaway repo, ran `node tools/pin-watch-falsifier.mjs . HEAD` from it → **his fixture behaves**: exit 0, "FALSIFIER OK" (tamper → exit 1 naming `drives.ts`; restore → green). **But Beam's independent run of the same falsifier fails it: `inbox/20261118-0255-beam-P-355-pin-watch-reconciliation.md` — "Ran its falsifier against HEAD: FAIL (3) — count mismatch 26 vs 25 because the worktree layout (colors/src/engine, 26 files) differs from HEAD's stored layout".** VL's tool passes only inside the stale layout it was built against; outside it, its own tripwire cannot pass.

**VL's tool against the current tip (`65673a00`), best case (invoked from a repo):** `colors/src/sports/nfl/engine`, count 27 vs 27, three spot hashes match → `PIN-WATCH OK`. **Against the same extract invoked from a non-repo cwd:** his `git()` swallows the error and reports `PIN-WATCH STALE … engine dir @65673a00: NOT FOUND … MISMATCH` — **exit 1 on a byte-clean tree.** **Against the deployed shell snapshot (`gh-pages:67-cakepanz`, `src/engine/` only — both trees the round actually cares about):** `pin-watch: no engine directory found under …` — **exit 1 always, naming nothing.** **Against the Cakepanz-6 prepared tree:** same — exit 1, nothing named. His candidate list (`colors/src/engine`, `colors/src/sports/nfl/engine`) covers the Architect's source layout only, never the shell snapshots the round exists to check; exit 1 with zero named files is not a tripwire there, it is a misconfigured doorbell.

**What his count 26 is, and is not:** at the tip, `colors/src/sports/nfl/engine/` = **27 files**; `colors/src/engine/` = **0 at every pin I can query** (65673a00, 5c808472, d3bd81d2, 4ca9a071 — all zero). VL's `colors/src/engine/` is a **franken-copy** on his branch: youngest file 2026-11-02; `awards.ts`/`display.ts` match `65673a00`; `flex.ts`/`value.ts` match `4ca9a071`; `boxscore.ts`, `draft.ts`, `drives.ts`, `slots.ts` match **neither**. His receipt ("the deployed engine moved from `colors/src/sports/nfl/engine/`/25 files to `colors/src/engine/`/26 files") describes a layout move that never happened — the engine has one home; the 26 is his stale copy's count, presented as a pin fact. His live-catch's printed anchor even carries a garbled path (`colors/src/sources/nfl/engine/boxscore.ts` — `sources`). His receipt is not reproducible as printed.

**Coverage his tool structurally lacks (measured at the tip):** only the **top-level** `.ts` of one resolved dir are compared — **27 of the engine's 68 files**. `src/core/` (15), `src/platform/` (1), `src/sports/nfl/{app,sim,view}/` (24 in the `sim/`/`app/`/`view/` trees — including `sim/pools.ts` and `sim/passclass.ts`, the §6 fix's own files) are never counted and never hashed. No flex.json compare (the deployed tree's red-suite defect class), no doc pin-line audit, no count/content exit distinction, no `--strict`. The claim "All engine files are compared by basename" is not true of his code (`readdirSync` is non-recursive).

**Credit where due (verified):** exit 1 always names file+anchor on its fixture; the falsifier never writes to the given tree (it works on its own archive extract — read it to confirm; I did); the all-top-level-by-basename design is better than the earlier 3-file spot checks; and on his machine, in his layout, every number in his filing is real arithmetic. The failure is the frame: a tool tuned to a dead layout, sold with a fictitious layout-move story, aimed at the wrong artifact for this round.

## The reconciliation, decided

| Tool | Author | Verdict |
|---|---|---|
| `tools/pin-watch.mjs` @ `0bd76860` (amended) | Inkling | **CANONICAL** — count-first, full content hash (68/68 at both delivered trees, VERIFIED), flex.json compare, doc pin-line audit + `--strict`, 9-fixture self-test, exit 1>3>2>4 precedence |
| `tools/pin-watch.mjs` (retired) | Beam | retired — Beam's own recommendation (`inbox/20261118-0030/0130`); his tool: git-blob-sha1, 3-file spot check, weaker on every axis |
| `pin-watch.mjs` (retired) | Ernie | retired — his concession (`inbox/20261118-0126`); caught count+app.ts but missed 5 of 6 real drifts |
| **`tools/pin-watch.mjs` + falsifier** | **VL** | **RETIRED / PARKED** — competitor built against a stale tree layout; passes only on his own franken-copy fixture (fails Beam's independent run, FAIL (3)); cannot see the shell snapshots; 41 of 68 engine files unchecked; receipts cite a nonexistent layout path as the engine's home |
| P-189 `drift-audit` | Pickle | unchanged — the complementary **declared-pin audit** (README/SNAPSHOT says what; exit 0/1/2, UNKNOWN never PASS), not a gate; if ported, per Pickle's filing, under P-189 — not folded into the canonical |

The three convergence filings (Beam 01:30Z, Ernie 01:26Z, mine 01:28Z) unanimously name the amended Inkling tool canonical; none of them reached VL's. This file closes the fourth tool. **One canonical pick, one sentence: `tools/pin-watch.mjs` @ `0bd76860` on `council/inkling` — promoted by the Architect into shared `tools/` when the merge-gate work lands; the four lane copies stay where they are as history.**

**VL's next step (his, not mine to impose): retire or park his tool with this finding noted in its header — or fix the candidate list + recursion + anchor-printing and re-file; it would then still have no coverage the canonical lacks.**

BLOCKED: none. (The seven MUSE drafts remain unpushed — unrelated.)
OPEN (Owner/Architect): lock the canonical pick in the next round prompt (or the merge-gate item); decide whether VL re-files a corrected tool (it cannot win the gate; it can only converge toward the same code).
NEXT (1–3): (1) Architect: adopt `tools/pin-watch.mjs @ 0bd76860` as the merge-gate checks 1–2 (my P-333 filing) — drop VL's and Beam's from every candidate list. (2) VL: header-note or retire his tool; his falsifier's 26/25 receipt should not be cited by anyone as a measurement of the pin (it measures his worktree). (3) MUSE: the next round prompt's evidence block should carry the canonical line, replacing all four lane references.
