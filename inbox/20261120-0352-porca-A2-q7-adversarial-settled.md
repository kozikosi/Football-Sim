SPEAKER: PORCA | ROLE: advisor | TASK: A2 (H2 Q7 adversarial) | DATE: 2026-11-20T03:52Z

FOR: the Architect (the test owner), ERNIE (who asked to settle the C8 gap), the council
STATUS: proposal only. All experiments ran in scratch; no repo, product or other seat's file was edited.

# A2 — the Q7 gap, measured, corrected and settled

## 0 · Receipts (VERIFIED — commands and raw stdout)

Sources: `git archive origin/architect/engine-and-seats` at `408410477`, full `colors/` and `data/` trees.
Pinned test file: sha256 `99abfd948bd9bd7d…`, 7,188 B. Node `v26.13.0`.

```
$ cd <scratch>/colors && node --test --experimental-strip-types test/nfl/valueprovider.test.ts
ℹ tests 10
ℹ pass 10
ℹ fail 0
```

I then added a scratch-only probe (`test/nfl/q7-adversarial-porca.ts`) that runs the **exact** shipped
Q7 loop (all `SLOT_IDS`, bases `4-3`/`3-4`, plus the third no-snapshot QB call) against 18 providers,
then against a proposed fixture family. Raw stdout:

```
provider                       current fixture  proposed fixture
-----------------------------  ---------------  ----------------
constant1                      PASSES(gap)      PASSES
reads-week                     caught           caught
reads-season                   caught           caught
reads-packHash                 caught           caught
reads-engineVersion            caught           caught
reads-form[p1]                 caught           caught
reads-form[p3]                 PASSES(gap)      caught
reads-focus[t1]                caught           caught
reads-focus[t2]                PASSES(gap)      caught
reads-flags[x]                 caught           caught
reads-flags[y]                 PASSES(gap)      caught
reads-form[p3] at QB only      PASSES(gap)      caught
constant-at-slot               PASSES(gap)      PASSES
reads-week at DE1 only         PASSES(gap)      caught
reads-season at DE1 only       PASSES(gap)      caught
reads-packHash at DE1 only     PASSES(gap)      caught
measured                       PASSES(gap)      PASSES
table                          PASSES(gap)      PASSES

base 4-3: QB measured=0.126912206 table=0.127 differ=true
base 3-4: QB measured=0.126912206 table=0.127 differ=true

ALL ASSERTIONS HELD
```

## 1 · Correction to my own C8 filing — the gap is narrower

In C8 I wrote that a provider reading `week` (both fixtures use week 5) "passes while reading the
snapshot". **That was incomplete, and the run above disproves it.** The shipped test has a third
assertion — `prov.winsPerOvr('QB','4-3',loaded) === prov.winsPerOvr('QB','4-3')` — with **no** snapshot
on the right. Any provider that reads week/season/packHash/engineVersion at *every* slot changes its
output when the snapshot is absent, so it is caught there (rows `reads-week`, `reads-season`,
`reads-packHash`, `reads-engineVersion`). My original plain-JS mirror omitted that third call; that
is why it misled me. I withdraw the week/season part of the C8 claim and keep the rest.

**The precise residual gap** (VERIFIED — the eight `PASSES(gap)` rows above):
1. reads of **unpopulated keys** at any slot — `form[p3]`, `focus[t2]`, `flags[y]` — because they are
   `undefined` in both loaded and neutral and in the no-arg call;
2. reads of **shared metadata or unpopulated keys at non-QB slots only** — `week at DE1 only`,
   `season at DE1 only`, `packHash at DE1 only` — because the no-arg guard covers QB only;
3. **constant providers** are indistinguishable by design (`constant1`, `constant-at-slot` pass both
   fixtures). This is acceptable: Q7 is a black-box law about displayed numbers, not a source-code
   rule. It should be stated, not "fixed".

The four user-named cases: one-slot form read → gap only if the key is unpopulated (row 12);
constant slot → passes by design; base where providers differ → measured `0.126912206` vs table
`0.127` in **both** bases, so the law must stay *within-provider* — a cross-provider equality assertion
would fail by design; week → caught by the no-arg call when read everywhere, escapes when read at a
non-QB slot only.

## 2 · The fix — two layers, both executable

**Primary: a poison-proxy assertion.** Wrap a neutral snapshot in a `Proxy` whose `get` trap throws on
any property read, and assert every shipped provider survives the full slot/base loop with it. It
detects *any* read of *any* field at *any* slot in one assertion, including the escapes above.
Executed result (raw stdout):

```
poison-proxy detector (true = provider never touched the snapshot):
  constant1                     true
  reads-week                    false
  reads-season                  false
  reads-packHash                false
  reads-engineVersion           false
  reads-form[p1]                false
  reads-form[p3]                false
  reads-focus[t1]               false
  reads-focus[t2]               false
  reads-flags[x]                false
  reads-flags[y]                false
  reads-form[p3] at QB only     false
  constant-at-slot              true
  reads-week at DE1 only        false
  reads-season at DE1 only      false
  reads-packHash at DE1 only    false
  measured                      true
  table                         true
POISON ASSERTIONS HELD
```

**Secondary: a broader fixture family**, needed because the poison proxy proves *absence of reads*
but the fixture family proves *value equality* under realistic context. Use two loaded snapshots:
one with many populated keys (`p1,p2,p3,qb1,t1,t2,x,y`), one with different `season`, `week`,
`packHash`, `engineVersion` and disjoint keys (`z9,t9,y:false`). All 10 escapees are caught by this
family too (table above, column 3). Note the metadata must differ in the second snapshot — my first
attempt kept `packHash` fixed and `reads-packHash at DE1 only` still escaped; the run caught my own
mistake.

**Third, structural:** the provider array is hand-written (`[seamMeasured(), seamTable()]` at
`valueprovider.test.ts:91`). Export `SHIPPED_PROVIDERS` from `valueprovider.ts` and iterate it, so a
new provider is tested the moment it ships.

## 3 · Exact patch (proposal for the Architect's test file)

File `colors/test/nfl/valueprovider.test.ts`, anchor the existing Q7 `seamTest` block (`:87-95`):

- OLD: `  for (const prov of [seamMeasured(), seamTable()]) for (const base of ['4-3', '3-4'] as const) for (const s of SEAM_SLOTS)`
- NEW: `  for (const prov of SHIPPED_PROVIDERS) for (const base of ['4-3', '3-4'] as const) for (const s of SEAM_SLOTS)`
  (and the same substitution on the next loop; add `SHIPPED_PROVIDERS` to the import from
  `valueprovider.ts`).

Insert a new test after it:

```ts
seamTest('Q7 law: no shipped provider reads any field of the snapshot, at any slot', () => {
  const baseSnap = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
  let touched = '';
  const poison = new Proxy(baseSnap, {
    get(_t, k) { if (k === 'then') return undefined; touched = String(k); throw new Error('Q7: snapshot read: ' + String(k)); },
  });
  for (const prov of SHIPPED_PROVIDERS) for (const base of ['4-3', '3-4'] as const) for (const s of SEAM_SLOTS) {
    touched = '';
    seamAssert.doesNotThrow(() => prov.winsPerOvr(s, base, poison as typeof baseSnap), `${prov.name} ${base} ${s} read ${touched}`);
  }
});
```

File `colors/src/sports/nfl/engine/valueprovider.ts`, anchor after `export const DEFAULT_VALUES`:
`export const SHIPPED_PROVIDERS: readonly ValueProvider[] = [measuredValues(), tableValues()];`
(one instance each, created at module load — no behaviour change to either provider).

## 4 · What I did not do

- I did not edit the repo test, `valueprovider.ts`, or any engine file. The probe and its edits live
  only in `/private/var/folders/.../porca-a2`, which is scratch.
- I did not re-run the full 430/430 suite (Pickle's gate stands); I ran the one affected test file,
  10/10 before and still 10/10 after (the changes were scratch-side only).
- The poison `Proxy` uses a `get` trap; a provider that only enumerates keys without reading values
  could still evade it. I found no such provider in the tree (INFERRED from reading `valueprovider.ts`
  and its call sites — neither enumerates the snapshot).
