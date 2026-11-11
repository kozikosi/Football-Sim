SPEAKER: DS | ROLE: council | TASK: P-311 — review of the landed flex rebuild | DATE: 2026-11-10T00:51Z

REVIEW-OF: `728b2c53` "Architect: flex corrections, 9 Owner overrides (19/40/15/23)" — `tools/mathlab/flex.json`
and `colors/src/sports/nfl/engine/flex.ts` (the P-294/P-311 rebuild).

VERDICT: improved

## What I checked (all commands run, not read)

- **Rule count and histogram.** `node tools/mathlab/flexassert.mjs --table=tools/mathlab/flex-2026-11-09-728.json`
  → `FLEXASSERT OK 97 rules, 23 at 0, 7 banned, 97 checked`. Histogram 19 at 12 / 40 at 6 / 15 at 2 / 23 at 0.
  Matches the commit title.
- **`flex.json` = `flex.ts`.** Imported the typed table on an untouched copy of `728b2c53` and diffed it against
  `tools/mathlab/flex.json`: **97 rules, 0 diffs**.
- **Owner pins.** `EDGE>TE 6`, `OLB>ILB 6`, `OLB>SS 6`, `SAM` weight 100 — all present. `FB>EDGE/DT/ILB/OLB`,
  `CB>RB`, `DT>TE`, `EDGE>FS` are absent from `FLEX`.
- **D untouched.** `tools/mathlab/results/thetaprice-2026-11-09.md` is the same file as on `3ed03627`
  (sha256 `72dae5bc…`); the table was not recomputed from a moved D.
- **Flex tests on the untouched branch.** `node --experimental-strip-types --test --test-name-pattern "flex"
  test/nfl/lineup.test.ts` → **11 pass, 0 fail**.

## Findings

1. **DEFECT — the Owner's WILL/C weight bump did not land.** P-311 item (1) includes `WILL 150→200`,
   `C 150→200`, `SAM` 100. On `3ed03627`, `35ce4e98` and `728b2c53`, `slots.ts` has
   `{ id: 'C', weight: 150 }` (line 28), `{ id: 'WILL', weight: 150 }` (line 45), `{ id: 'SAM', weight: 100 }`
   (line 46). `WEIGHT` is derived from `SLOTS` (`slots.ts:58`) and the 3-4 base reads `WEIGHT.WILL`
   (`slots.ts:83`), so 150 is live in both bases. The flex table is correct; the draft valuation is still the
   P-310 valuation. **This also makes P-311 item (3) impossible to compare usefully**: a flexeval replay now would
   compare two identical weight sets.
2. **DEFECT — "removed" is not "illegal".** With the seven rules deleted, `fit()` returns the emergency fallback:
   `fit('FB','EDGE')` → `{penalty:8, emergency:true, legal:true}`. The move is **cheaper** than the -12 it
   replaced, and still legal. P-312 test (d) ("it should not be allowed") therefore fails on this build. Fix or
   ruling needed (below).
3. **Known gap — items 3 + 7 are not in this table** (97 rules, not 105). P-323; the generated 105-rule table is
   filed separately (`inbox/20261110-0052-ds-P-323-flex-105-table.md`).
4. **RISK — four tier-0 cross-unit moves remain**: `DT>FB`, `EDGE>FB`, `ILB>FB`, `OLB>FB`. `FB>EDGE` was removed
   as absurd while `EDGE>FB` is free. Owner question, not a patch.
5. **NOT RUN — P-311 item (3)`, the flexeval replay.** `find . -name 'flexeval*'` → none in this tree; the scan
   harness is not here. P-311 item (4), the full suite, was not run either; only the flex subset (11/11) was.

**Weakest point of this review:** it checks the table and the runtime `fit()`, not draft outcomes; without
`flexeval` and the landed weights I cannot say whether the table drafts better.

## Improved text (apply on `728b2c53`)

**1. The Owner-approved weights** (`colors/src/sports/nfl/engine/slots.ts`):

```
  { id: 'C', weight: 150, dest: 'C', unit: 'offense' },
→ { id: 'C', weight: 200, dest: 'C', unit: 'offense' },

  { id: 'WILL', weight: 150, dest: 'OLB', unit: 'defense' },
→ { id: 'WILL', weight: 200, dest: 'OLB', unit: 'defense' },
```

`SAM` stays 100. Re-pin the flex D pins? No: D is unchanged (I measured 0 of 97 D values move under the bump);
the lineup pins may move, and the draft scan must be rerun.

**2. Removed = banned** (`colors/src/sports/nfl/engine/flex.ts`) — only if the Owner confirms "delete = not
allowed" (P-312(d) says he does; the current engine disagrees):

```
export const FLEX_BANNED: Readonly<Partial<Record<Role, readonly Dest[]>>> = {
  FB: ['EDGE', 'DT', 'ILB', 'OLB'],
  CB: ['RB'],
  DT: ['TE'],
  EDGE: ['FS'],
};
```

in `fit()`, after `if (role === dest) …`:

```
  if ((FLEX_BANNED[role] ?? []).includes(dest)) {
    return { penalty: EMERGENCY_PENALTY, emergency: true, legal: false };
  }
```

The generated `flex.ts` in my lane already carries exactly this (`BANNED_ARE_ILLEGAL = true`), so it is copyable.
If the ruling is the other way ("removed = unlisted at -8"), then P-312(d) must be rewritten instead — the test,
not the engine, is wrong.
