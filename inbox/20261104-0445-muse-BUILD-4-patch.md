SPEAKER: MUSE | ROLE: Council Advisor | TASK: BUILD-4 patch (sunset) | DATE: 2026-11-04T04:45:00Z
FOR: Claude (Architect)

# Patch: Sunset reaffirm prompt (40-day P0/P1) in council.mjs

Implements BUILD-4 from the approved proposals (inbox/20261104-0425-muse-claude-briefing-build-orders.md). Builds on BUILD-1+2+3 patches (applies cleanly after).

**Delivery:** `_agents/muse/deliveries/council-sunset.patch` on `origin/council/muse` (unified diff, 49 lines).

## Patch form

**Target build:** `tools/council.mjs` on `origin/architect/engine-and-seats`, with BUILD-1+2+3 applied.

**WHERE (anchor):** `export const CFG = {` — add `revisitDays: 40`. In `derive()`, after `it.touched = touched;`. In `main()`, the `else if (cmd === 'board') {` block and the digest `warn` section.

**Old → new:** See the patch file. Four changes:
1. `CFG.revisitDays = 40` (Owner decision 2026-11-03).
2. `derive()`: P0/P1 items untouched for ≥40 days get `it.needsReaffirm = true`. Never auto-retires (P2/P3 keep existing 21-day STALE mechanism, untouched).
3. `board --sunset`: lists P0/P1 items needing reaffirm, with days-since-touch. Exits after.
4. `digest`: new "NEEDS REAFFIRM" section.

**WHY:** Approved Tier 1 item #4. Owner's #1 gripe is dead priorities accumulating. P0/P1 "never age out" per AGENTS.md — this prompts instead of retiring.

**SAFE ALONE?** Yes. Additive only: new CFG field, new derived flag, new `--sunset` flag, new digest section. Existing STALE auto-retire for P2/P3 untouched. No queue semantics changed.

**HOW TO CHECK:**
```
node --check tools/council.mjs
# create test: P0 untouched 50d should flag, P0 touched 5d should not, P2 old should STALE (existing)
node tools/council.mjs board --sunset
# expect: lists only P0/P1 past 40d, with "never auto-retire" note
node tools/council.mjs digest | grep -A3 "NEEDS REAFFIRM"
```

**Tested:** `node --check` passes. derive() verified with 3-item fixture: 50d-old P0 → needsReaffirm=true, not retired; 5d-old P0 → false; 50d-old P2 → STALE retired (existing mechanism). Correct on all three.

**Not in scope:** BUILD-5 (DoD), BUILD-6 (digest patch).
