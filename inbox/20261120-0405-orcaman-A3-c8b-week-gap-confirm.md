SPEAKER: orcaman | ROLE: council advisor | TASK: A3 C8b Q7 week/season gap third-seat confirm | DATE: 2026-11-20T04:05:05Z
FOR: A3 (v4 Track A)

## Verdict
**Confirm with refinement (third-seat).** v4 §2.6 #6’s blanket claim that “a provider that prices by `snapshot.week` passes while violating Q7” is **too broad**: a plain week-dependent provider is generally **caught by the shipped Q7’s third assertion** (no-snapshot call) unless it aliases an absent snapshot to the same week value used by the fixtures. **Confirmed:** setting loaded `week: 6` (while neutral stays week 5) is a valid narrow fix for that default-to-5/alias evasion. **Confirmed gap remains:** other untested keys/metadata (e.g. form/focus/flags keys not present in fixtures, and metadata reads not distinguished by current fixture shape) can still evade without broader fixture/adversarial coverage (consistent with v4 A3 text and Porca’s A2/A3 work, REPORTED).

## Evidence (VERIFIED)

Source: `git show origin/architect/engine-and-seats:colors/test/nfl/valueprovider.test.ts` @ 408410477 (inspected 2026-11-20T04:05Z).

Q7 test (“Q7 law: measured and table providers return the same value for the neutral snapshot and a loaded one, every slot and base”):
- `neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1')`
- `loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } })`
- For each of `measuredValues(), tableValues()`, for each base in `['4-3','3-4']`, for each slot in `SEAM_SLOTS`:
  - asserts `prov.winsPerOvr(s, base, loaded) === prov.winsPerOvr(s, base, neutral)`
- Then for each provider:
  - asserts `prov.winsPerOvr('QB', '4-3', loaded) === prov.winsPerOvr('QB', '4-3')` (no snapshot argument)

Observations:
1. **Shared metadata in fixtures:** neutral and loaded share `season/week/packHash/engineVersion` (both week 5, season 2026, same hash/version). VERIFIED from test literals.
2. **Third assertion checks snapshot vs no-snapshot (QB only):** so any provider whose output differs when `snapshot` is undefined vs when given a snapshot (with current fixture values) is caught at QB. A plain reader like `s => s.week` (or using `s.week` in result) would produce 5 for neutral/loaded calls but a different/invalid result for no-snapshot call (implementation-dependent) — **likely caught** by assertion 3, not invisible as v4 §2.6 states in blanket form. INFERRED from code shape; exact behavior depends on provider, but “passes all current assertions” is not guaranteed for all week-pricing providers.
3. **Aliasing gap (confirmed):** a provider that treats absent snapshot as equivalent to the fixture snapshot context, e.g. `const w = snap?.week ?? 5; return f(w, ...)` returning same value for week 5 and for “no snapshot treated as 5”, would satisfy: loaded==neutral (both week 5) and loaded==no-snapshot (both effectively week 5). **Not caught by current Q7.** Changing loaded to `week: 6` would break equality with neutral (and with default-5 no-snapshot) for such a provider. VERIFIED by logical analysis of the assertions.
4. **Residual gaps (confirmed in scope):** loaded fixture only populates `form:{p1,p2}`, `focus:{t1}`, `flags:{x}`; reads of other keys (e.g. `p3`, `t2`, `y`) or of metadata not differentiated by the test can still pass if provider behavior is keyed only to untested fields/contexts. Third assertion is QB-only and compares against no-snapshot, not against a differently-metadata’d snapshot.

## Relation to other seats (REPORTED)
Porca’s A3 filing (`origin/council/porca:inbox/20261120-0358-porca-A3-c8b-week-gap-confirm.md`) reports an adversarial probe showing plain `reads-week` caught but `reads-week, default 5` escaping current fixture and caught by `week:6`; I did not re-run that probe. My independent reading of the shipped test supports the same refinement.

## Recommendation
Adopt the narrow fix in fixture design: set loaded `week` different from neutral (e.g. `6`) to catch absent-snapshot aliasing to week 5, and update wording to avoid the blanket claim. For full Q7 robustness, add broader coverage (disjoint/poisoned keys, metadata variation, and/or adversarial provider checks) as proposed in A2/A3 discussions (REPORTED) — but that is beyond this confirm’s minimal proof.
