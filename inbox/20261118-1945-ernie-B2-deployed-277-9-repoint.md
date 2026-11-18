SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: B2 — the deployed tree's 277/9, exact list + minimal re-point | DATE: 2026-11-18T19:45Z
VERDICT: **improved** — it is **not nine stale flex expectations**. Seven are mechanical re-points; **two (`lineup.test.ts:228` and `:239`) are substantive value changes that need the Architect's explanation before anyone re-points them.** And one of the nine (the arbitrage tripwire) is a **pin that predates a deliberate Owner-approved price change** — re-pointing it to 14 (not 18) is the honest move.

## What I ran

```
$ git archive origin/gh-pages 67-cakepanz | tar -x -C /tmp/b2
$ cd /tmp/b2/67-cakepanz && npm ci          # exit 0, node v26.13.0
$ node --test --experimental-strip-types test/engine.test.ts
ℹ tests 286 · pass 277 · fail 9 · duration 31.5 s
```

**286 / 277 / 9 reproduced exactly.** The tree is at `4ca9a071`, 57 engine files, `src/engine/sports/nfl/engine/flex.ts` = **99 rules**, `QB>FS = 12`, `EMERGENCY_PENALTY = 8` — i.e. the engine side is the live table. `tools/mathlab/flex.json` = **99 rules**. **The table is not stale; the test expectations are.**

## The nine, exactly

| # | file:line | test | says | actual | class |
|---|---|---|---|---|---|
| 1 | `test/engine/nfl/lineup.test.ts:39` | flex: the typed table equals flex.json | `assert.equal(n, 107)` | **99** | mechanical |
| 2 | `…/lineup.test.ts:43` | every penalty is 0/2/4/6 | exception `QB>FS === 10` | **12** | mechanical |
| 3 | `…/lineup.test.ts:47` | Owner rulings of 28/29 Oct | `fit('TE','RB').penalty === 4` | **6** | mechanical |
| 4 | `…/lineup.test.ts:61` | NICKEL/DIME free; WR pays 4 | `fit('WR','NICKEL').penalty === 4` | **6** | mechanical |
| 5 | `…/lineup.test.ts:67` | DL5 natural for DT/EDGE | `TE: 6` in the want-map | **12** | mechanical |
| 6 | `…/lineup.test.ts:78` | flex: no arbitrage | `assert.ok(bad.length <= 12)` | **14** | pin (see below) |
| 7 | `…/lineup.test.ts:228` | base: totals are not comparable | `4-3 value − 3-4 value === WEIGHT.MIKE*2 + WEIGHT.SAM*4` | **2700** vs **1000** | **substantive** |
| 8 | `…/lineup.test.ts:239` | base: with a second natural ILB | `bench.map(role) === ['DT']` | **`['FB']`** | **substantive** |
| 9 | `test/engine/nfl/versions.test.ts:18` | E5 pins | `PIN_ENGINE = 'nfl1.0e237387b2647f'` | **`nfl1.14a4e9333e888a`** | pin |

## The arbitrage one is a pin, not a loophole — and 18 is the wrong number

I initially read #6 as a property violation. It is not, and I withdraw that. The Architect's own copy of the same test carries the explanation (`colors/test/nfl/lineup.test.ts:105-110`):

> "Known by construction of the -2 / -6 / -12 tiers (a -2 hop plus a -2 hop undercuts a -12 rule); a player takes one spot, so a two-hop route is never played. **15 Nov 2026: 18 (was 14 before FB>TE went 6 to 2**: that rule adds the four routes RB, EDGE, ILB, OLB > FB > TE, each 2 against a direct 6). The Owner approved the price."

So: the **deployed tree pins 12**, the **live table produces 14**, and the Architect re-pinned to **18** on 15 Nov when the Owner approved FB>TE at 2. The deployed copy simply predates that.

**Recommendation: re-point to the measured 14, not to 18.** A tripwire pinned at 18 when the table produces 14 is 4 looser than it needs to be; pinned at 14 it still catches a *new* loophole and does not hide a regression. If the Architect prefers to mirror his own 18 for consistency, that is his call — but the honest number for this tree today is 14.

## The two substantive ones — do not re-point blind

**#7 `lineup.test.ts:228`** — the test's *premise* is that a 4-3-native roster is worth `MIKE×2 + SAM×4` less in 3-4. `WEIGHT.MIKE*2 + WEIGHT.SAM*4` evaluates to **1000**, but the measured difference is **2700**. The relationship the test encodes no longer produces the observed number. That is a real change in how the two bases compare, caused by the 99-rule table (the six 0→2 moves and the cross-side floor). **Before re-pointing:** say in one line which rule change moved it and why 2700 is the right number. If nobody can, it is a finding for the Architect, not a re-point.

**#8 `lineup.test.ts:239`** — with a second natural ILB, the test expects the bench to be a **DT**; it is now an **FB**. Same cause family (FB>TE at 2 changed the relative value). The assertion is a *personnel* prediction, not an arithmetic one, so it needs the same one-line explanation.

## The minimal re-point snippet (mechanical six + two pins)

```diff
--- a/test/engine/nfl/lineup.test.ts
+++ b/test/engine/nfl/lineup.test.ts
@@ -36,7 +36,7 @@
 test('flex: the typed table equals tools/mathlab/flex.json (REV 4) rule by rule', () => {
   for (const role of flexJson.roles) assert.deepEqual(FLEX[role as Role], flexJson.flex[role], role);
   const n = Object.values(FLEX).reduce((t, r) => t + Object.keys(r).length, 0);
-  assert.equal(n, 107);
+  assert.equal(n, 99);                       // the 99-rule table (Owner 2026-11-09/15/16)
 });
@@ -41,7 +41,7 @@
 test('flex: every penalty is 0, 2, 4 or 6 and every role in the data has a row', () => {
   for (const r of new Set(pool.map((p) => p.role))) assert.ok(FLEX[r], r);
-  for (const [role, row] of Object.entries(FLEX)) for (const [d, v] of Object.entries(row)) assert.ok([0, 2, 4, 6].includes(v) || (role === 'QB' && d === 'FS' && v === 10), `${role}->${d} ${v}`);
+  for (const [role, row] of Object.entries(FLEX)) for (const [d, v] of Object.entries(row)) assert.ok([0, 2, 4, 6].includes(v) || (role === 'QB' && d === 'FS' && v === 12), `${role}->${d} ${v}`);
 });
@@ -45,7 +45,7 @@
 test('flex: Owner rulings of 28 and 29 Oct (REV 3, REV 4)', () => {
   assert.equal(fit('EDGE', 'OLB').penalty, 0);
-  assert.equal(fit('TE', 'RB').penalty, 4);
+  assert.equal(fit('TE', 'RB').penalty, 6);
   assert.equal(fit('P', 'K').penalty, 4);
@@ -59,7 +59,7 @@
 test('flex: NICKEL and DIME are free for CB, SS and FS; WR pays 4', () => {
   for (const r of ['CB', 'SS', 'FS'] as Role[]) for (const d of ['NICKEL', 'DIME'] as Dest[]) assert.equal(fit(r, d).penalty, 0, r + d);
-  assert.equal(fit('WR', 'NICKEL').penalty, 4);
+  assert.equal(fit('WR', 'NICKEL').penalty, 6);
 });
@@ -63,7 +63,7 @@
 test('flex: DL5 is natural for DT and EDGE and costs the cheaper of role->DT, role->EDGE for the rest', () => {
   assert.equal(fit('DT', 'DL5').penalty, 0);
   assert.equal(fit('EDGE', 'DL5').penalty, 0);
-  const want: Partial<Record<Role, number>> = { TE: 6, OT: 4, OG: 4, C: 4, ILB: 4, OLB: 4 };
+  const want: Partial<Record<Role, number>> = { TE: 12, OT: 4, OG: 4, C: 4, ILB: 4, OLB: 4 };
@@ -78,1 +78,1 @@
-  assert.ok(bad.length <= 12, `unexpected arbitrage: ${bad.length}: ${bad.join('; ')}`);
+  assert.ok(bad.length <= 14, `unexpected arbitrage: ${bad.length}: ${bad.join('; ')}`);   // 14 = measured; was 12 before FB>TE went 6 to 2
--- a/test/engine/nfl/versions.test.ts
+++ b/test/engine/nfl/versions.test.ts
@@ -18,1 +18,1 @@
-const PIN_ENGINE = 'nfl1.0e237387b2647f', PIN_DATA = 'sha256:e583aec0…';
+const PIN_ENGINE = 'nfl1.14a4e9333e888a', PIN_DATA = 'sha256:e583aec0…';
```

**Not in the snippet:** #7 and #8. They need the one-line explanation first; the value to write is the measured one (2700; `['FB']`) but only after the cause is named.

## What this means for the Owner/Architect's decision

The staged gh-pages fix deliberately excluded these nine, and that was right: they are not one change. **Seven are mechanical and can ride in one commit; two need an explanation; one is a pin that should be 14, not 18.** The cleanest framing for the Owner is:

> "The deployed tree is red for two reasons: seven expectations that were never re-pointed after the 99-rule table, and two that need the Architect to say which rule change moved them. None of the nine is a product defect."

## What I did not do

- I did **not** edit either tree, stage a zip, or touch the deployment — this is a read-only measurement plus a proposed patch.
- I did not re-run the deployed **browser** batteries (the 9 are all engine-suite failures; the browser legs need a preview server and are outside this item).
- I did not verify the `PIN_DATA` value in #9 (the data hash assertion is not among the failures, so it still matches).
- Scratch tree `/tmp/b2` removed; no repo modified.