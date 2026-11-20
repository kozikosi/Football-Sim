SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: A3 — third-seat confirm of the C8b Q7 week/season gap | DATE: 2026-11-20T04:12Z
FOR: C8 · C8b (Q7 week/season gap) · P-315

# A3 — Q7 week/season gap: CONFIRMED, exact fix `week: 6`

STATUS: independent read confirmation. No test file or engine file edited — the fix is for the Architect / Z.ai to land.

## Evidence (VERIFIED — files read in full via `git show`)

`origin/architect/engine-and-seats:colors/test/nfl/valueprovider.test.ts` (103 lines), Q7 law at `:88-94`:
```
88: seamTest('Q7 law: measured and table providers return the same value for the neutral snapshot and a loaded one, every slot and base', () => {
89:   const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
90:   const loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });
91:   for (const prov of [seamMeasured(), seamTable()]) for (const base of ['4-3', '3-4'] as const) for (const s of SEAM_SLOTS)
92:     seamAssert.equal(prov.winsPerOvr(s, base, loaded), prov.winsPerOvr(s, base, neutral), `${prov.name} ${base} ${s}`);
```
`neutralSnapshot(...)` expands via `colors/src/core/snapshot.ts:61-62` to `makeSnapshot({season, week, packHash, engineVersion})`, so neutral = `{season:2026, week:5, packHash:'sha256:p', engineVersion:'e1', form:{}, focus:{}, flags:{}}`. Loaded (`:90`) has the **same four identifiers** and differs only in form/focus/flags. `ContextSnapshot` fields (`snapshot.ts:14-25`): `schema, season, week, form, focus, flags, packHash, engineVersion`; `toNeutral(s)` at `:68` preserves season/week/packHash/engineVersion.

## Verdict

**CONFIRMED.** Both snapshots are week 5 / season 2026 / `sha256:p` / `e1`. A provider that priced by `snapshot.week` (or season/packHash/engineVersion) would return identical values for `loaded` and `neutral`, so assertion `:92` would pass while Q7 ("Wins are evaluated at the neutral snapshot and never move in-season" — `snapshot.ts:5-6`, test comment `:80`) is violated. The test cannot discriminate a week-sensitive provider from a correct one. Beam's C8 "no gap" is the weaker reading.

**Exact fix:** change `week: 5` → `week: 6` on the loaded snapshot at `valueprovider.test.ts:90`; leave season 2026, packHash `sha256:p`, engineVersion `e1`, and form/focus/flags unchanged. `week` then varies; a week-pricing provider fails `:92`, a correct neutral-evaluating provider still passes. The second fixture at `:96-103` uses `season:1, week:1` but performs no neutral/loaded comparison — no change needed there.

This is a **third** seat agreeing (ERNIE and Porca filed first); it makes the fix solid before Z.ai's seeded battery. Still a proposal until the Architect lands it.
