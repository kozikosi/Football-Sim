SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist — D3 open question, box-score mutation scope at 86f22d10 | DATE: 2026-11-16T21:08Z
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# D3 — The box-score mutation scope, settled with a command

## Verdict (VERIFIED — grounded in the runs below, not a position)

**Ernie's ask holds. All four survivors stand unrefuted at `86f22d10`, and the mutation set is needed.**

| # | Mutation (file, exact change) | 1b suite (12 tests) | Full suite (363 tests) | Result |
|---|---|---|---|---|
| M1 | `puntYards` never accumulated — `colors/src/sports/nfl/sim/box.ts:61`, `off.puntYards += p.kickYards` removed (punt count kept) | 12 pass, 0 fail | 363 pass, 0 fail | **SURVIVES** |
| M2 | `touchdowns` never counted — `box.ts:63`, `off.touchdowns += 1` removed (points still scored via `score()`) | 12 pass, 0 fail | 363 pass, 0 fail | **SURVIVES** |
| M3 | `firstDowns` never counted — `box.ts:53`, `if (p.firstDown) off.firstDowns += 1` removed | 12 pass, 0 fail | 363 pass, 0 fail | **SURVIVES** |
| M4 | Interception spot on the wrong side of the field — `colors/src/sports/nfl/sim/drive.ts:136`, turnover `next.ydl` changed from `Math.min(rules.touchbackYdl, Math.max(1, 100 - ydlAfter))` to `Math.max(1, ydlAfter)` | 12 pass, 0 fail | 363 pass, 0 fail | **SURVIVES** |

The pin scope does **not** hold as a defence: Z.ai's harness ran against the vendored pin `d3bd81d2`, which predates `colors/src/sports/nfl/sim/box.ts` (that file lands with the 1b slice at `6dcf13b2`/`86f22d10`), so the harness could not have caught these behaviours — and the behaviours are real, live, and unasserted at `86f22d10` itself, as the mutations above prove. Inkling's position (mutations correctly scoped at the pin) is true about the harness's scope and false as a claim about the engine: the survivors are not an artefact of scoping, they are holes in the test suite at the newer commit. The mutation set Ernie asks for should run against `86f22d10` — and, once written, the four assertions belong in the 1b suite (`colors/test/nfl/sim-slice.test.ts`), not in a harness scoped to a pin that predates the file.

Scope note: this filing settles the D3 question only. It does not re-litigate the framework pick, the pin, or the 1b suite's other results, and it proposes no engine change — the four assertions are a test-suite addition for the Architect, filed here as evidence.

## What unblocks / exact artifact / how to verify

- **Unblocks:** the test round's D3 item and the Architect's 1b suite — four named assertions to add (see §Proposed assertions). Until they exist, `puntYards`, `touchdowns`, `firstDowns`, and the post-turnover spot can all be wrong without any test noticing.
- **Artifact:** this filing. No engine file, test file, or delivery was edited. All mutation work happened on copies under `/tmp/d3-*`; the repo working tree was never mutated.
- **Verify/apply:** re-run the commands in §Evidence on a fresh `git archive 86f22d10` extract. Each mutation is one line; apply it, run `npm test` in `colors/`, confirm 363/363. Then revert the mutation and add the assertion from §Proposed assertions — the assertion must fail on the mutated copy and pass on the pristine one.

## Evidence

### Setup (VERIFIED)

```
$ git archive 86f22d10 | tar -x -C /tmp/d3-86f22d10
$ ls /tmp/d3-86f22d10/colors/src/sports/nfl/sim/   # box.ts drive.ts toypack.ts
$ git log --oneline -1 86f22d10   # Architect: NOW.md records the verified CI run for 6dcf13b
$ git log --oneline -1 6dcf13b2   # Architect: 1b vertical slice (one neutral drive, pack to box score), two de-gated tests fixed, NOW.md
```

No fetch was needed: `86f22d10` was already present locally (`git cat-file -t 86f22d10` → `commit`). The task's stop condition (fetch failure) did not trigger.

### Premise check (VERIFIED — Ernie's premise, re-checked, not assumed)

- `grep -rn "puntYards\|firstDowns" colors/test/` at `86f22d10` → **no hits in any test file**. Neither field is asserted anywhere in the suite.
- `grep -rln "touchdowns" colors/test/` → 4 files (`boxscore.test.ts`, `drives.test.ts`, `recap.test.ts`, `standings.test.ts`) — but all four are about the *other* box score / scoring decomposition / standings tiebreaks, not the sim fold's `TeamLine.touchdowns`. No test reads `boxScoreView(...).teams[n].touchdowns`.
- The 1b suite (`colors/test/nfl/sim-slice.test.ts`, 12 tests) asserts: drive shape, the 500-drive cross-screen sums (net yards = rush + pass − sack; drives yards/secs/plays; scoring sums; running score ends at the final; `giveaways = interceptions + fumblesLost`; `passAtt = completions + interceptions + incompletions`; `plays = passAtt + rushAtt + sacksTaken`), 3,000-drive play invariants (including `if (r === 'to') assert.ok(last?.turnover)` and the `next` range check `out.end.next.ydl >= 1 && out.end.next.ydl <= 100`), replay determinism, and keyed coupling. **None of the twelve reads `puntYards`, `touchdowns`, `firstDowns`, or an exact post-turnover spot.**

### Baselines (VERIFIED)

```
$ cd /tmp/d3-86f22d10/colors && node --test --experimental-strip-types "test/nfl/sim-slice.test.ts"
ℹ tests 12 · pass 12 · fail 0 · duration_ms 2092.87
$ cd /tmp/d3-86f22d10/colors && npm test   # node --test --experimental-strip-types "test/**/*.test.ts"
ℹ tests 363 · pass 363 · fail 0 · duration_ms 174505.12
```

Node `v24.22.1` (engine requires ≥24). Baseline is fully green — so every SURVIVES below is a hole, not a pre-existing failure.

### The mutations (VERIFIED — exact diffs, each on its own copy)

Copies: `/tmp/d3-m1-puntyards`, `/tmp/d3-m2-touchdowns`, `/tmp/d3-m3-firstdowns`, `/tmp/d3-m4-intspot` (each a full `cp -r` of the `86f22d10` extract, 12 MB).

M1 — `colors/src/sports/nfl/sim/box.ts:61`:
```diff
- } else if (p.call === 'punt') { off.punts += 1; off.puntYards += p.kickYards; }
+ } else if (p.call === 'punt') { off.punts += 1; /* MUTATION M1: puntYards never accumulated */ }
```
(Punt *count* still increments — only the yardage is dropped. A test that counted punts would still pass; a test that summed punt yards would die. None does.)

M2 — `colors/src/sports/nfl/sim/box.ts:63`:
```diff
- if (p.td) { off.touchdowns += 1; score(s, e.t, off.team, 'TD', rules.pointsTd); }
+ if (p.td) { /* MUTATION M2: touchdowns never counted */ score(s, e.t, off.team, 'TD', rules.pointsTd); }
```
(Points still score — the scoring summary still adds up, so the 500-drive cross-checks still pass. Only the `touchdowns` column is zeroed.)

M3 — `colors/src/sports/nfl/sim/box.ts:53`:
```diff
- if (p.firstDown) off.firstDowns += 1;
+ /* MUTATION M3: firstDowns never counted */
```

M4 — `colors/src/sports/nfl/sim/drive.ts:136` (the spot lives in `drive.ts`, not `box.ts` — see §Why M4 belongs here):
```diff
- if (turnover) { result = 'to'; next = { team: opp, ydl: Math.min(rules.touchbackYdl, Math.max(1, 100 - ydlAfter)) }; break; }
+ if (turnover) { result = 'to'; next = { team: opp, ydl: Math.max(1, ydlAfter) /* MUTATION M4: spot not flipped */ }; break; }
```
(The mutated spot is the offence's own `ydlAfter` instead of the flipped `100 - ydlAfter` — the new drive starts on the wrong side of the field. It stays inside the suite's 1..100 range check, so the range check cannot catch it.)

### The runs (VERIFIED)

1b suite per mutation (each: `node --test --experimental-strip-types "test/nfl/sim-slice.test.ts"`):
- M1: `ℹ tests 12 · pass 12 · fail 0` — SURVIVES
- M2: `ℹ tests 12 · pass 12 · fail 0` — SURVIVES
- M3: `ℹ tests 12 · pass 12 · fail 0` — SURVIVES
- M4: `ℹ tests 12 · pass 12 · fail 0` — SURVIVES

Full suite per mutation (each: `npm test` in the mutated copy's `colors/`, ~175 s each):
- M1: `ℹ tests 363 · pass 363 · fail 0` — SURVIVES
- M2: `ℹ tests 363 · pass 363 · fail 0` — SURVIVES
- M3: `ℹ tests 363 · pass 363 · fail 0` — SURVIVES
- M4: `ℹ tests 363 · pass 363 · fail 0` — SURVIVES

No test died anywhere. The four behaviours are unasserted not just in the 1b suite but in the entire 363-test suite at `86f22d10`.

### That the mutations are live, not vacuous (VERIFIED)

A mutation that changes nothing would also "survive" — so each mutation's effect was confirmed independently:

- M1–M3: the mutated lines are the *only* writes to those fields in the fold (`grep` on `box.ts`: `puntYards`, `touchdowns`, `firstDowns` are each written exactly once, at the mutated lines; `blank()` only zeroes them). Removing the write leaves the field at its `blank()` zero for every event. Not vacuous by construction.
- M4: a probe script (`/tmp/d3-spot-check.mjs`, run with `node --experimental-strip-types` against the pristine extract) ran 3,000 drives and compared the correct spot against the mutated spot on the first 200 turnovers: **the mutated spot differs from the correct spot in 198 of 200 turnovers** (the only equal case is `ydlAfter = 50`, the mirror point). Examples: INT at `ydlAfter = 58` → correct next drive starts at 42, mutated at 58 (16 yards wrong); `ydlAfter = 71` → correct 29, mutated 71 (42 yards wrong). The mutation is wrong in ~99% of turnover cases and the suite still passes 363/363. Toy-pack `touchbackYdl` is 80 (`toypack.ts:33`), which is why the flip matters: `min(80, 100 - ydlAfter)` vs `ydlAfter`.

### Why M4 belongs here (the spot is a `drive.ts` behaviour, surfaced through `box.ts`)

Ernie's filing names the interception spot alongside the three `box.ts` fields. The spot computation lives in `drive.ts:136` (`next.ydl` on a turnover), and it reaches the box score only when a *second* drive starts: `box.ts:45` copies `drive_start`'s `ydl` into `DriveRow.startYdl`. The 1b suite runs one drive at a time (`runDrive` once per test drive), so no test ever feeds a post-turnover `drive_start` into the fold — and the only assertion touching `next` at all is the range check (`sim-slice.test.ts:73`: `next.ydl >= 1 && next.ydl <= 100`), which a wrong-but-in-range spot passes by design. The mutation set therefore has to include M4 in `drive.ts`; a `box.ts`-only mutation set would miss it. The proposed assertion (§below) checks the spot at the `drive.ts` level *and* through a two-drive fold, so both layers are covered.

## Proposed assertions (for the Architect — not applied)

To be added to `colors/test/nfl/sim-slice.test.ts` (or the 1b suite's successor), each failing on its mutated copy and passing on the pristine tree:

1. **puntYards:** over N drives, `boxScoreView(events, rules).teams[0].puntYards` equals the sum of `kickYards` over `play` events with `call === 'punt'` (same for team B). Kills M1.
2. **touchdowns:** `teams[0].touchdowns` equals the count of `play` events with `td === true` for that team; and `touchdowns` is consistent with the scoring summary (`scoring` rows of kind `TD` for that team). Kills M2. (The second half matters: M2 kept points scoring, so a touchdowns-vs-points cross-check is the tripwire.)
3. **firstDowns:** `teams[0].firstDowns` equals the count of `play` events with `firstDown === true` for that team. Kills M3.
4. **Interception spot:** run a drive to a turnover, then start the next drive at `out.end.next` and assert `next.ydl === Math.min(rules.touchbackYdl, Math.max(1, 100 - ydlAfter))` where `ydlAfter` is the turnover play's — i.e. the exact spot, not the 1..100 range — and assert the folded second `DriveRow.startYdl` equals it. Kills M4. (The existing range check at `sim-slice.test.ts:73` should stay as a bounds guard; the exact-spot assertion is the new law.)

## On Inkling's position, precisely

Inkling's position, as carried in the prompt: the mutations were correctly scoped at the pin (`d3bd81d2`) and the survivors were correctly not re-litigated as defects. The first half is true and this filing does not dispute it — a harness scoped to `d3bd81d2` cannot test a file that does not exist there, and Z.ai's harness was not wrong to stay in scope. The second half does not follow: "correctly scoped" is a statement about the harness, not about the engine. At `86f22d10` the four behaviours are real, live, and unasserted — demonstrated above by four one-line mutations that the full 363-test suite cannot see. The correct action is not to re-litigate Z.ai's harness but to extend the 1b suite at the commit where the file exists. That is Ernie's ask, and it holds.

## Labels

- VERIFIED: the `86f22d10` extract, the premise greps, both baselines (12/0 and 363/0), all eight mutation runs (4 × 1b suite, 4 × full suite), the four exact mutation diffs, and the M4 liveness probe (198/200).
- INFERRED: that the four proposed assertions would kill their mutations — inferred from the mutation mechanics (each assertion reads exactly the field/spot its mutation zeroes or moves); they have not been written or run, and whoever adds them must show the kill on the mutated copy.
- UNKNOWN: whether the Architect wants these four assertions in `sim-slice.test.ts` or in a successor 1b file — that is his call; the assertions are named here, not placed.
