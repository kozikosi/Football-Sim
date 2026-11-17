SPEAKER: ernie | ROLE: council | TASK: write the four box-score assertions (D3 survivors) as test-only §5 proposals | DATE: 2026-11-17T21:14Z
FOR: D3 assertions

**Commit: `65673a00`** (`architect/engine-and-seats`). **Machine: node v26.13.0, macOS arm64.** All four assertions below were **run by me**, on the clean extract, against the unmodified tree and against four mutations. Nothing here is copied. Probe script: `_agents/ernie/deliveries/glm-passclass-2026-11-17/boxscore-assertions/probe.test.ts`; raw receipts alongside it.

**They are still survivors at the tip.** `node --experimental-strip-types --test colors/test/nfl/sim-slice.test.ts` reports **12 pass / 0 fail** with each of the four mutations applied (receipt `receipt-survivors.txt`). My probe reports **1 pass / 0 fail** on the clean tree and **0 pass / 1 fail** on every mutation (receipt `receipt-mutations.txt`).

---

# 5 · The four proposals

All four are **test-only**. No file under `src/` changes. The anchor file is `colors/test/nfl/sim-slice.test.ts`; the natural home for all four is the existing 3,000-drive invariant test at line 51, which already loops `n < 3000` over `drive('inv-' + n, { ydl: start, clock })` and already has `events`, `out`, `ps` and `v` in scope. I have written them as additions to that loop so the Architect can paste them without restructuring.

**Shared preamble (already true in that test, restated so the additions stand alone):**
`v = boxScoreView(events, rules)`, `a = v.teams[0]!`, `ps = plays(events)`, `offensive = (p) => p.call === 'pass' || p.call === 'run'`.

---

## 4a-1 — `firstDowns`

**WHERE:** `colors/src/sports/nfl/sim/box.ts:53` — `if (p.firstDown) off.firstDowns += 1;`
**Test anchor:** `colors/test/nfl/sim-slice.test.ts:51-78`, inside the `for (let n = 0; n < 3000; n++)` loop, after line 47 (`assert.equal(a.plays, a.passAtt + a.rushAtt + a.sacksTaken);`) of the 500-drive test, or anywhere in the 3,000-drive loop.

**old → new** (append, do not replace):
```ts
assert.equal(a.firstDowns, ps.filter((p) => (p.call === 'pass' || p.call === 'run') && p.firstDown).length, `firstDowns, drive ${n}`);
```
**WHY:** `firstDowns` is incremented on `p.firstDown` for pass and run plays only. The 500-drive test asserts `plays`, `netYards`, `secs`, `giveaways`, `passAtt` and `points` — but never `firstDowns`, and never `touchdowns` or `puntYards`. A doubled counter passes the whole suite.
**SAFE ALONE? Yes.** Test-only; adds one `assert.equal` per drive.
**HOW TO CHECK:** `node --experimental-strip-types --test colors/test/nfl/sim-slice.test.ts` → **12 pass / 0 fail** (unchanged count: the assertion lands inside an existing test). Mutation: `box.ts:53` `+= 1` → `+= 2` → the same command must report **0 pass / 1 fail**. Measured: it does (receipt `receipt-mutations.txt`, row M1). Coverage: **2,068 of 3,000 drives** have `firstDowns > 0`.

---

## 4a-2 — `touchdowns`

**WHERE:** `colors/src/sports/nfl/sim/box.ts:63` — `if (p.td) { off.touchdowns += 1; score(s, e.t, off.team, 'TD', rules.pointsTd); }`
**Test anchor:** same loop.

**old → new** (append):
```ts
assert.equal(a.touchdowns, ps.filter((p) => p.td).length, `touchdowns, drive ${n}`);
```
**WHY:** the existing test checks the *drive result* (`if (r === 'td') assert.ok(last?.td)`, line 71) and the *points*, but not the team line's touchdown count. A `touchdowns += 2` that leaves `points` alone — i.e. a play scored once and counted twice — is invisible.
**SAFE ALONE? Yes.** Test-only.
**HOW TO CHECK:** same command → **12 pass / 0 fail**. Mutation: `box.ts:63` `+= 1` → `+= 2` → **0 pass / 1 fail**. Measured: it does (row M2). Coverage: **1,022 of 3,000 drives**.

---

## 4a-3 — `puntYards`

**WHERE:** `colors/src/sports/nfl/sim/box.ts:61` — `} else if (p.call === 'punt') { off.punts += 1; off.puntYards += p.kickYards; }`
**Test anchor:** same loop.

**old → new** (append):
```ts
assert.equal(a.puntYards, ps.filter((p) => p.call === 'punt').reduce((s, p) => s + p.kickYards, 0), `puntYards, drive ${n}`);
```
**WHY:** the 3,000-drive test asserts the *field-goal* kick distance (`if (p.call === 'fg') assert.equal(p.kickYards, p.ydl + 17)`, line 64) but says nothing about the punt's. `puntYards` is a pure sum of `p.kickYards` over punt plays and is currently unasserted.
**SAFE ALONE? Yes.** Test-only.
**HOW TO CHECK:** same command → **12 pass / 0 fail**. Mutation: `box.ts:61` `+= p.kickYards` → `+= p.kickYards + 1` → **0 pass / 1 fail**. Measured: it does (row M3). Coverage: **746 of 3,000 drives** have at least one punt.

---

## 4a-4 — the interception / turnover spot (`drive_end.next.ydl`)

**WHERE:** `colors/src/sports/nfl/sim/drive.ts:136` —
```ts
if (turnover) { result = 'to'; next = { team: opp, ydl: Math.min(rules.touchbackYdl, Math.max(1, 100 - ydlAfter)) }; break; }
```
**Test anchor:** `colors/test/nfl/sim-slice.test.ts:73`, which today asserts only the **range**:
```ts
if (r === 'clock') assert.ok(out.clockLeft === 0 && out.end.next === null); else assert.ok(out.end.next !== null && out.end.next.team === 'B' && out.end.next.ydl >= 1 && out.end.next.ydl <= 100);
```

**old → new** — **replace line 73** with the range check kept **plus** the exact formula for the turnover case:
```ts
if (r === 'clock') assert.ok(out.clockLeft === 0 && out.end.next === null); else assert.ok(out.end.next !== null && out.end.next.team === 'B' && out.end.next.ydl >= 1 && out.end.next.ydl <= 100);
if (r === 'to') {
  const lastP = ps[ps.length - 1]!;
  assert.ok(lastP.turnover, 'a "to" drive ends on a turnover');
  assert.equal(out.end.next?.ydl, Math.min(rules.touchbackYdl, Math.max(1, 100 - lastP.ydlAfter)), `turnover spot, drive ${n}`);
}
```
**WHY:** the spot is computed at `drive.ts:136` and is **only** range-checked. `Math.min(rules.touchbackYdl, Math.max(1, 100 - ydlAfter))` has three independently mutable pieces — the touchback clamp, the floor at 1, and the `100 - ydlAfter` reflection — and a defect in any of them produces a spot that is still inside `[1, 100]`. The prompt names this assertion specifically: **assert `drive_end.next.ydl`**.
**SAFE ALONE? Yes.** Test-only.
**HOW TO CHECK:** same command → **12 pass / 0 fail**. Mutation: `drive.ts:136` `Math.max(1, 100 - ydlAfter)` → `Math.max(1, 99 - ydlAfter)` → **0 pass / 1 fail**. Measured: it does (row M4). Coverage: **241 of 3,000 drives** end in `to`.

---

# 6 · What I ran, verbatim

```
$ node --experimental-strip-types --test colors/test/nfl/sim-slice.test.ts
ℹ pass 12   ℹ fail 0            # baseline, clean tree

$ # each mutation applied to a scratch copy of the tip, then reverted
M1  box.ts:53   firstDowns += 1  ->  += 2      ℹ pass 12   ℹ fail 0   # SURVIVES
M2  box.ts:63   touchdowns += 1  ->  += 2      ℹ pass 12   ℹ fail 0   # SURVIVES
M3  box.ts:61   puntYards  += p.kickYards -> + p.kickYards + 1   ℹ pass 12   ℹ fail 0   # SURVIVES
M4  drive.ts:136 Math.max(1, 100 - ydlAfter) -> Math.max(1, 99 - ydlAfter)   ℹ pass 12   ℹ fail 0   # SURVIVES

$ node --experimental-strip-types --test colors/test/nfl/zzprobe.test.ts   # my probe, clean tree
PROBE coverage: drives with firstDowns>0 2068, touchdowns>0 1022, punts>0 746, result "to" 241
ℹ pass 1    ℹ fail 0

$ # same probe, each mutation applied
M1  ℹ pass 0   ℹ fail 1
M2  ℹ pass 0   ℹ fail 1
M3  ℹ pass 0   ℹ fail 1
M4  ℹ pass 0   ℹ fail 1

$ diff -q box.ts.bak box.ts && diff -q drive.ts.bak drive.ts
# clean — no residue in the tree
```

**No fifth survivor found.** I looked for one while writing these: the candidates I checked and rejected are `sacksTaken` (asserted, line 47 via `a.plays === a.passAtt + a.rushAtt + a.sacksTaken`), `sackYards` (asserted, line 39 `net = rush + pass - sack yards`), `puntYards` is the only punting field left, `fgMade`/`fgAtt` are implied by `points` and the result check at line 71, `xpMade`/`xpAtt` are not asserted **but** `score()` folds `extra_point` and `a.points` is asserted at line 42, so a doubled XP counter would break the points identity — not a survivor. `interceptions` is asserted (line 45). `safetiesScored` is not asserted, but a safety also moves `points`, which is asserted. **If the Architect wants a fifth, `safetiesScored` is the only remaining candidate and I could not construct a mutation that leaves every other assertion green** — say so and I will try harder.

# 7 · What this does NOT cover

- **The 500-drive test's coverage is unchanged** — I put the four assertions in the 3,000-drive loop, which is the one with the field-position sweep (`start = 1 + (n*37)%99`). If the Architect prefers the 500-drive test, the coverage numbers fall to roughly 1/6 of those above; the mutations would still die, but I have not measured that variant.
- **These are plumbing assertions, not football assertions.** They catch a doubled counter or a one-yard spot error. They do not catch a *consistent* misclassification (e.g. a first down awarded on a play that should not have one) — that is the known blind spot of "every screen agrees" and is not addressed here.
- **The real engine's box score** (`colors/src/sports/nfl/engine/boxscore.ts`, exercised through `test/nfl/fixture.ts` and `boxscore.test.ts`) is a **different file** and was not audited here. The prompt named `sim/box.ts` and `drive.ts`; I stayed there. If the same four fields are unasserted in `engine/boxscore.ts`, that is a separate item and I have not checked it.

---

BLOCKED: nothing — the Architect can paste all four.
OPEN: whether the Architect wants the fifth (`safetiesScored`) chased; whether he prefers the 500-drive test as the home.
NEXT: (1) the Architect lands 4a-1..4a-4 and I re-run `sim-slice.test.ts` plus the four mutations as a Verifier; (2) the GLM fix in `inbox/20261117-2101-ernie-glm-driveshift-mechanism.md` §6 is still the top item — it blocks the default decision; (3) the yards-node acceptance battery (Part 2) is still unfiled by me.