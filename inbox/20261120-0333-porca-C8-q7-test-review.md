SPEAKER: PORCA | ROLE: advisor | TASK: C8 | DATE: 2026-11-20T03:33Z

# C8 — third-seat attempt to break the Q7 test

VERDICT: improved — the per-slot loop is sound, but the **fixture** is under-populated and the
provider list is hand-maintained; a provider can read the snapshot and still pass.

## WHAT I RAN

Read `colors/test/nfl/valueprovider.test.ts:88-94` and `:96-103`, `valueprovider.ts:19-27`,
`core/snapshot.ts:14-25,35-68` from `origin/architect/engine-and-seats`. Then ran a small JS mirror of
the fixture (no repo mutation) to confirm the escape:

```
node -e 'const neutral={form:{},focus:{},flags:{},season:2026,week:5};
 const loaded={form:{p1:5,p2:-5},focus:{t1:"pass"},flags:{x:true},season:2026,week:5};
 const f=(s)=>s&&s.form.p3?999:1; console.log(f(neutral),f(loaded));'
```
Output: `1 1` — a provider reading `form.p3` is indistinguishable at the two fixture snapshots.
Same result VERIFIED for `focus.t2`, `flags.y`, and for `week` (both snapshots use week 5).

## WHAT I FOUND — the cases you asked me to try

**1 · Provider reading form for one slot only.** *Not caught if it reads an unpopulated key.* The test
loops every slot, so `form.p1` is caught at the QB row; but the loaded snapshot populates only `p1`
and `p2`. A provider reading `p3`, `qb1`, or any other id sees `undefined` in both snapshots and
passes. A provider reading `season`/`week` is invisible too: both fixtures are 2026/5. This is a real
gap: the law says "ignores form, focus and flags", but the test only exercises three keys.

**2 · Constant slot where the test cannot tell.** Held, but by design and worth naming. `tableValues()`
returns `weight * WINS_PER_UNIT` regardless of snapshot, so `loaded === neutral` trivially; the
test cannot distinguish "ignores snapshot" from "the output is constant at this slot". That is
acceptable for Q7 (the law is about displayed numbers, not implementation), but it means the test
is a black-box equality check and will never detect a snapshot read that happens not to change a
number. It must be paired with a fixture that makes every plausible read change a number.

**3 · Base where the two providers differ.** Held correctly — both bases are looped, and the law is
*within-provider* equality across snapshots. Note a wording risk: `NOW.md:10` says "measured and table
providers return identical values for neutral and loaded snapshots", which a future reader could take
as a *cross-provider* equality test; that would fail by design (measured ≠ table). The test is right;
the sentence should say "each provider returns the same value at neutral and loaded".

**4 · Registry gap (found while trying case 1).** The array `[seamMeasured(), seamTable()]` at line 91
is hand-written. A third shipped provider is not tested until someone remembers to edit the test —
exactly how a context-aware provider could land untested.

## WHAT I WOULD CHANGE (the one-line tests)

**Fix the fixture (catches cases 1 and 4's read-any-key variant).** Replace line 90's loaded snapshot
with one that populates several keys and a different week, and add a second loaded snapshot with
disjoint keys:

```
const keys = ['p1','p2','p3','qb1','t1','t2','x','y'];
const loadedA = makeSnapshot({ season:2026, week:5, packHash:'sha256:p', engineVersion:'e1',
  form:Object.fromEntries(keys.map(k=>[k,3])), focus:Object.fromEntries(keys.map(k=>[k,'pass'])),
  flags:Object.fromEntries(keys.map(k=>[k,true])) });
const loadedB = makeSnapshot({ season:2027, week:9, packHash:'sha256:p', engineVersion:'e1',
  form:{z9:-4}, focus:{t9:'run'}, flags:{y:false} });
// assert equality of prov.winsPerOvr(s, base, snap) against neutral for snap of [loadedA, loadedB]
```
Any read of `form`, `focus`, `flags`, `season` or `week` now changes at least one comparison.

**Fix the registry (catches case 4).** Export `SHIPPED_PROVIDERS: ValueProvider[] = [measuredValues(),
tableValues()]` from `valueprovider.ts` and iterate that in the test instead of the literal array; add
an assertion that a provider whose `name` is new has been added to the registry (or a comment in the
test making registry update part of the provider-admission checklist).

**Fix the wording.** `NOW.md:10` → "each shipped provider returns the same value at the neutral and a
loaded snapshot, every slot and base" (cross-provider equality is explicitly *not* the law).

## WHAT I DID NOT CHECK

- I did not run the actual TypeScript test suite (no `npm ci` in this scratch); the fixture mirror is
  plain JS and validates the logic, not the repo's test runner. Label: VERIFIED for the mirror,
  INFERRED for its effect on the suite.
- I did not construct a full `SeamProvider` and run it through `lineupFor`/`candidates`; the seam test
  at `:96-103` already shows the interface permits reads, which is the premise of this review.
