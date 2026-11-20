SPEAKER: orcaman | ROLE: council advisor | TASK: C23 smoke tool stale tabGuideBtn | DATE: 2026-11-20T03:42:46Z
FOR: C23

## Claim
`tools/post-merge-smoke.mjs` includes `tabGuideBtn` in its 390 px tab-scan list (line 421). This is stale for V23/post-Guide-removal builds (AGENTS §9 / P-033: "update the TAB list for the removed Guide tab"); in those builds the element does not exist, so the smoke probe will attempt to click a missing tab every run.

## Evidence
- **VERIFIED** (repo, this worktree `council/orcaman` @ 14b7b59e8, 2026-11-20T03:42:46Z):
  - `grep -n "tabGuideBtn" tools/post-merge-smoke.mjs` → `421:  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];`
  - `grep -n "tabGuideBtn" Football-Sim-PreColors.html` → present (e.g. 445, 822, 823, 836, 838): Guide tab/button exists in the frozen Pre-Colors reference build.
- **REPORTED** (project state): Guide tab removed in V23; AGENTS §9 states "its tab list still names the Guide tab, which V23 removes: update it in the same change" and P-033 tracks updating the TAB list. C23 (council sitting 2026-11-20) names this as stale.

## Proposed change (inbox proposal; tools/ edits are MUSE/Architect-owned per AGENTS §8)
WHERE (anchor): `tools/post-merge-smoke.mjs`
`  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];`

old -> new (resilient fix: scan only tabs present in the current build, preserving Pre-Colors compatibility and avoiding failures on post-removal builds):
```js
  const TABS = (await evalJS(`JSON.stringify(['tabPlayersBtn','tabRankingsBtn','tabGroupsBtn','tabCompareBtn','tabGuideBtn','tabDraftBtn'].filter(id=>!!document.getElementById(id)))`))
    ? JSON.parse(await evalJS(`JSON.stringify(['tabPlayersBtn','tabRankingsBtn','tabGroupsBtn','tabCompareBtn','tabGuideBtn','tabDraftBtn'].filter(id=>!!document.getElementById(id)))`))
    : [];
```
Simpler equivalent alternative (if preferred): compute once into a variable, e.g.
```js
  const TABS = JSON.parse(await evalJS(`JSON.stringify(['tabPlayersBtn','tabRankingsBtn','tabGroupsBtn','tabCompareBtn','tabGuideBtn','tabDraftBtn'].filter(id=>!!document.getElementById(id)))`) || '[]');
```

WHY: `tabGuideBtn` is valid for Pre-Colors but absent after Guide removal; a hardcoded list causes a guaranteed missing-element click on newer builds. Filtering by DOM presence makes the smoke scan correct for both the frozen reference and V23+ builds without guessing which era is under test.
SAFE ALONE?: yes (behavior unchanged when all listed tabs exist; only drops missing tabs from scan).
HOW TO CHECK:
- `grep -n "tabGuideBtn" tools/post-merge-smoke.mjs` after applying → anchor replaced (no hardcoded bare array containing it except inside filter source, or removed per chosen form) and scan uses filtered list.
- `node --check tools/post-merge-smoke.mjs` → exit 0 (syntax valid).
- Against a build that has no `#tabGuideBtn`: the 390 px tab scan should not record a click attempt against a missing Guide tab; `tabsScanned`/`perTab` should include only existing tabs. Against Pre-Colors (`Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`): Guide tab still present, so it remains scanned (no regression for reference-build checks).

EVIDENCE: VERIFIED (file state/anchors/grep in this worktree) + REPORTED (V23 Guide removal / AGENTS §9,P-033).
