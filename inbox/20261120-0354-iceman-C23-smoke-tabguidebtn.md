SPEAKER: iceman | ROLE: advisor | TASK: C23 smoke tool stale tabGuideBtn | DATE: 2026-11-20T03:54:10Z
FOR: C23 (council sitting 2026-11-20 v3, Track C) — also addresses P-033 "update the TAB list for the removed Guide tab" (QUEUE.md:26)

## Claim
`tools/post-merge-smoke.mjs` scans a tab id `tabGuideBtn` that belongs to the removed Guide tab, so the 390 px every-tab mobile scan will attempt to click a non-existent element on post-Guide-removal builds (and misreports coverage). VERIFIED by command receipts below.

## Evidence (VERIFIED)

**cwd:** `/Users/kosi/wt/iceman` (branch `council/iceman`)

**Command:** `grep -n "tabGuideBtn" tools/post-merge-smoke.mjs`
**Output:**
```
421:  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];
```
(only occurrence in the smoke tool)

**Command:** `sed -n '418,426p' tools/post-merge-smoke.mjs`
**Output:**
```
  // Scan EVERY tab at 390 px. An earlier version probed only the Players tab, which let a
  // CSS-only mobile regression on another view (Team Rankings) pass both gates — demonstrated
  // adversarially (MiniMax lane, finding F-1; see git history before the retirement commit).
  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];
  const perTab = [];
  let probe = {};
  for (const tab of TABS) {
    const clicked = await clickId(tab);
    await sleep(900);
```

**Command:** `grep -rn "tabGuideBtn" | wc -l && grep -rn "tabGuideBtn" | head -6`
**Output (neighbourhood):** 20 hits repo-wide; in product/reference files: `Football-Sim-PreColors.html` (frozen, 657,486 B, contains Guide tab wiring — expected for that frozen build), `_archive/builds/...`, snapshots, patches, `tools/build-merged.js:44`. The smoke tool is the only live gate tool in `tools/` that enumerates it for scanning.

**Policy anchor (VERIFIED, AGENTS.md §9 as checked out from `origin/council/muse` this session, step 0):** "Gate and lint: update the TAB list for the removed Guide tab; run lint selftest on a machine with Biome" (also QUEUE.md P-033, REPORTED from `git show origin/council/muse:_agents/QUEUE.md`).

## Proposed change (PROPOSAL — I do not edit `tools/` product/build tooling; Architect/MUSE-owned per AGENTS.md §8)

**WHERE:** `tools/post-merge-smoke.mjs`, anchor string (not line-only): `  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];` (the mobile-scan TABS inside the "Scan EVERY tab at 390 px" block)

**old -> new:**
```js
  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];
```
```js
  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabDraftBtn'];
```
(Remove `tabGuideBtn` from the scan list.)

**WHY:** Guide tab removed (V23). Keeping it makes the gate click a missing id on builds without Guide, undermining "scan EVERY tab at 390 px" coverage accounting (clicked may be false, per-tab metrics recorded for a non-tab). Removing it aligns the gate with AGENTS.md §9 / P-033.

**SAFE ALONE?:** Yes for builds that have no Guide tab (the intended current target). **Caveat (REPORTED/INFERRED):** if the smoke tool is ever run against frozen `Football-Sim-PreColors.html` (which still has `tabGuideBtn`), this change would stop scanning that tab there. That is acceptable if Pre-Colors is treated as frozen reference rather than a gated target; if someone needs to gate Pre-Colors, parameterise the tab list per build instead. I do not assert which builds the Architect currently gates.

**HOW TO CHECK:**
1. `grep -n "tabGuideBtn" tools/post-merge-smoke.mjs` → expect no output (exit 1) after the change.
2. `node -e "require('fs').readFileSync('tools/post-merge-smoke.mjs','utf8').includes(\"'tabGuideBtn'\") && process.exit(1)"` → exit 0.
3. Functional (when a target build HTML is available): `node tools/post-merge-smoke.mjs <build.html>`; in the per-tab/mobile output confirm no `tabGuideBtn` row and that total tab count matches the remaining list. (I did not run a full smoke against a build in this session — no build path specified; REPORTED as the check procedure.)

## Notes / non-claims
- I did not edit `tools/post-merge-smoke.mjs`, `tools/build-merged.js`, or any frozen artifact. `tools/build-merged.js:44` also mentions `tabGuideBtn` (VERIFIED by grep above) but that tool targets archived Pre-Colors-era merges; out of scope for C23 as stated.
- Labels: evidence above VERIFIED; caveat about Pre-Colors gating and functional check execution INFERRED/REPORTED as noted.

Pushed as this inbox file on `council/iceman` (commit hash given in my reply). One file per item, per sitting rules.
