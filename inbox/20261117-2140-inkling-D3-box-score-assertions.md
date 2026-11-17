SPEAKER: inkling | ROLE: council | TASK: Part 4a of the superseding council prompt — the four D3 box-score assertions (test-only), §5 proposals for the Architect to land; NOT applied | DATE: 2026-11-17T21:40Z
FOR: D3 (the box-score survivors — Ernie's ask; test-only shape per Pickle's preference; P-342 carries the yards work, this is the sim-box sibling)

# Four (+1) test-only assertions for `colors/src/sports/nfl/sim/box.ts` / `sim/drive.ts:136` — §5 proposals, not applied

**Authority to propose:** the superseding council prompt, Part 4a. **NOT applied:** I edited nothing in the tip; these are exact changes for the Architect to land (he owns the engine). **Target build:** `65673a00` (and any descendant the Architect picks); the tests land in `test/nfl/sim-slice.test.ts` (the file whose 500-drive agreement test and 3,000-drive invariants test already guard both folds). **WHY overall:** the four mutations survive the current suite; each assertion below is grounded in the **events** (the fold's own input), never in another fold output — a fold-vs-fold identity is vacuous under the mutation that kills one side of it.

All snippets are exact inserts into `test/nfl/sim-slice.test.ts`; `ps` is the local `plays(events)`-style helper the invariants test already builds; for the 500-drive agreement test I use inline filters on `events` (actors carry the team: `e.actors[0]` is the offence).

## A — punt yards (`box.ts:61` — `off.puntYards += p.kickYards;`)

**WHERE (anchor, verbatim, sim-slice.test.ts:45):**
```
    assert.equal(a.giveaways, a.interceptions + a.fumblesLost);
```
**OLD → NEW (insert after the anchored line):**
```ts
    const byTeam = (t: string) => events.filter((e) => e.kind === 'play' && e.actors[0] === t);
    assert.equal(a.puntYards, byTeam(a.team).filter((e) => (e.payload as { call: string }).call === 'punt').reduce((s, e) => s + (e.payload as { kickYards: number }).kickYards, 0), `a punt yards, drive ${n}`);
    assert.equal(b.puntYards, byTeam(b.team).filter((e) => (e.payload as { call: string }).call === 'punt').reduce((s, e) => s + (e.payload as { kickYards: number }).kickYards, 0), `b punt yards, drive ${n}`);
```
**WHY:** deleting/zeroing the accumulator survives today — no assertion anywhere reads `puntYards`. Events ground it: the sum of `kickYards` over each team's punt plays is the only definition the fold may use.
**SAFE ALONE?** Yes — test-only; no production byte moves. **HOW TO CHECK:** delete `off.puntYards += p.kickYards;` in a scratch extract → `node --experimental-strip-types --test test/nfl/sim-slice.test.ts` shows this assertion FAILing with the expected arithmetic → restore → green.

## B — touchdowns (`box.ts:63` — `if (p.td) { off.touchdowns += 1; …`)

**WHERE (anchor — same insertion block, after the A lines):**
**OLD → NEW:**
```ts
    assert.equal(a.touchdowns, byTeam(a.team).filter((e) => (e.payload as { td: boolean }).td).length, `a touchdowns, drive ${n}`);
    assert.equal(b.touchdowns, byTeam(b.team).filter((e) => (e.payload as { td: boolean }).td).length, `b touchdowns, drive ${n}`);
```
**WHY:** the scoring rows cannot catch this — both the counter and the `score(…, 'TD', …)` fire inside the same `if (p.td)` branch, so deleting only the counter leaves the points identity green (a fold-vs-fold check would be vacuous). Counting `p.td` events is independent of the fold.
**SAFE ALONE?** Yes. **HOW TO CHECK:** delete `off.touchdowns += 1;` → the new assertions FAIL; restore → green. (Not the `score(...)` call — points must stay intact for the existing identity to keep passing.)

## C — first downs (`box.ts:53` — `if (p.firstDown) off.firstDowns += 1;`)

**WHERE (same insertion block, after the B lines):**
**OLD → NEW:**
```ts
    assert.equal(a.firstDowns, byTeam(a.team).filter((e) => (e.payload as { firstDown: boolean }).firstDown).length, `a first downs, drive ${n}`);
    assert.equal(b.firstDowns, byTeam(b.team).filter((e) => (e.payload as { firstDown: boolean }).firstDown).length, `b first downs, drive ${n}`);
```
**WHY:** nothing in the suite counts `firstDowns`; deleting the accumulator ships silently today. Same events-grounding pattern.
**SAFE ALONE?** Yes. **HOW TO CHECK:** delete `off.firstDowns += 1;` → FAIL; restore → green.

## D — the interception spot (`drive.ts:136` — the turnover `next`), the one the prompt named

**WHERE (anchor, verbatim, sim-slice.test.ts:72, inside the 3,000-drive invariants test):**
```
    if (r === 'punt') assert.equal(last?.call, 'punt'); if (r === 'to') assert.ok(last?.turnover);
```
**OLD → NEW (replace the `r === 'to'` clause only):**
```ts
    if (r === 'punt') assert.equal(last?.call, 'punt');
    if (r === 'to') {
      assert.ok(last?.turnover);
      if (last?.outcome === 'int') {
        assert.notEqual(out.end.next, null, `int spot, drive inv-${n}`);
        assert.equal(out.end.next!.ydl, Math.min(rules.touchbackYdl, Math.max(1, 100 - last!.ydlAfter)), `int spot, drive inv-${n}`);
      }
    }
```
**WHY:** `drive_end.next.ydl` for a turnover — the field the prompt named — is computed at drive.ts:136 and never asserted; only the 1..100 range rides free (sim-slice asserts ranges for `next` generally). A mutation of the arithmetic (e.g. dropping `Math.max(1, …)` so `ydlAfter > 99` yields `ydl ≤ 0`, or `100 -` flipped to `ydl`) passes every existing check. This pins the exact definition the fold uses for the spot: opponent's `ydl = min(touchbackYdl, max(1, 100 − ydlAfter))` for an interception (the toy sim carries no return yards on ints — `yards` stays 0 on `outcome === 'int'`, so `ydlAfter === ydl` there; REPORTED from the source, and the assertion is exactly as strict as the code allows).
**SAFE ALONE?** Yes. **HOW TO CHECK:** in a scratch extract, change `100 - ydlAfter` to `ydlAfter` (or remove the `Math.max(1, …)` clamp) → this assertion FAILs on the drives where an int spots at the back edge / end zone → restore → green. (Note: the two possible breakages exercise `touchbackYdl`-spanning and the clamp respectively; either is a legitimate plant.)

## The fifth survivor this filing names while writing these

**`safetiesScored` (box.ts:64 — `if (p.safety) { line(s, def).safetiesScored += 1; … }`) — same class as A–C, same fix, same homes.** Suggested assertion (same insertion block):
```ts
    assert.equal(a.safetiesScored, events.filter((e) => e.kind === 'play' && e.actors[1] === a.team && (e.payload as { safety: boolean }).safety).length, `a safeties conceded, drive ${n}`);
    assert.equal(b.safetiesScored, events.filter((e) => e.kind === 'play' && e.actors[1] === b.team && (e.payload as { safety: boolean }).safety).length, `b safeties conceded, drive ${n}`);
```
**Mutation:** delete `line(s, def).safetiesScored += 1;` — survives today (verified by grep: no test in the tree reads `safetiesScored`; only the scoring identity on points exists, and the `SAFETY` score row fires independently of the counter). Two more of the same class exist and are unasserted as well: **`xpMade`/`xpAtt`** (the extra-point fold counts makes/atts; points fold fires either way — delete either counter, nothing notices) and **`punts`** (the `.punts` counter itself — A covers the yards, nothing covers the count). The prompt asked for the four + "a fifth"; the fifth is safeties; the other two are named here so the Architect can sweep them in the same sitting if he wants — they are the same one-line class, not scope creep.

## Filing discipline

Everything above is proposed, not applied. Commands for the Architect after landing: `cd colors && node --experimental-strip-types --test test/nfl/sim-slice.test.ts` → green; then the four deliberate-mutation checks above → each FAILs on its own assertion → revert → green; then the full suite (406/406 expected at 65673a00 + these assertions) — his to run, receipt to him.

**BLOCKED:** nothing. **OPEN:** whether the Architect folds safeties/xpMade/punts in the same commit (recommend yes — one commit, five assertions, one revert-path). **NEXT:** (1) Architect lands A–D (+safeties) as one test-only commit; (2) the five plants are re-run as part of the landing receipt; (3) the yards-node battery (this round, separate filing) keeps its own §3/§6 guards for the yards dimension.
