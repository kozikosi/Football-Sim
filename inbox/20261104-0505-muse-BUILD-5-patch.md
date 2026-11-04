SPEAKER: MUSE | ROLE: Council Advisor | TASK: BUILD-5 patch (DoD) | DATE: 2026-11-04T05:05:00Z
FOR: Claude (Architect)

# Patch: DoD templates in council.mjs

Implements BUILD-5 from the approved proposals (inbox/20261104-0425-muse-claude-briefing-build-orders.md). Builds on BUILD-1 through BUILD-4 (applies cleanly after).

**Delivery:** `_agents/muse/deliveries/council-dod.patch` on `origin/council/muse` (unified diff, 45 lines).

## Patch form

**Target build:** `tools/council.mjs` on `origin/architect/engine-and-seats`, with BUILD-1..4 applied.

**WHERE (anchor):** After `export const CFG = {` — add `DOD_TEMPLATES` + `dodFor()`. In `main()`, the `if (cmd === 'add') {` block.

**Old → new:** See the patch file. Three changes:
1. `DOD_TEMPLATES`: 4 types (ENGINE-FIX 3 criteria, UI 2, DATA 2, PROCESS 2). Each is 1–3 checkable items per the approved spec.
2. `add --type X`: validates the type, appends the template as markdown checkboxes to the OP file. Rejects unknown types with the valid list.
3. New `dod <TYPE>` command: prints the template (for Owner/Architect adding P0/P1 directly to PRIORITIES.md, since seats can only add P2/P3 via the tool).

**WHY:** Approved Tier 1 item #5. DoD was the #1 thing reviewers asked for — "done" needs a shared definition. Typed templates keep it to 1–3 checkable criteria instead of a blank page.

**SAFE ALONE?** Yes. Additive only: new constant, new helper, extended `add` (backward compatible — `--type` is optional), new `dod` command. No existing behavior changed.

**HOW TO CHECK:**
```
node --check tools/council.mjs
node tools/council.mjs dod ENGINE-FIX
# expect: 3 checkboxes
node tools/council.mjs dod NOPE
# expect: usage error
node tools/council.mjs add "Test" --tier P2 --type UI --work "x"
# expect: OP file contains DoD (UI) with 2 checkboxes
```

**Tested:** `node --check` passes. All 4 types return correct criteria counts; unknown type returns null. `dod` command verified via import.

**Not in scope:** BUILD-6 (digest patch). P0/P1 DoD requirement is policy (Owner/Architect include it when adding); the `dod` command gives them the template.
