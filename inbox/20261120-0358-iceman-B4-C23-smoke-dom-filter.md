SPEAKER: iceman | ROLE: advisor | TASK: B4 C23 smoke tool — third-seat-style verification + DOM-presence filter proposal | DATE: 2026-11-20T03:58:06Z
FOR: B4 (council sitting v4, Track B) — C23 "smoke tool's stale tabGuideBtn (tools/post-merge-smoke.mjs:421)"

## Scope / status note
v4 §1.1: "C23 smoke stale tab | orcaman only | 1 seat — needs **2** more."
**REPORTED (search receipt):** I searched all `refs/remotes/origin/council/*` for inbox files matching `C23|tabGuide|post-merge-smoke` and found none (`git for-each-ref --format='%(refname:short)' refs/remotes/origin` + `git ls-tree -r --name-only <ref> | grep -iE "inbox/.*(C23|tabguide|tabGuide|post-merge-smoke)"` → no hits). I cannot locate orcaman's cited filing on any council remote ref (UNKNOWN where it lives). I filed an independent C23 proposal earlier on `council/iceman` (`inbox/20261120-0354-iceman-C23-smoke-tabguidebtn.md`, commit `d327bc310`, pushed; `git ls-remote origin council/iceman` shows `d327bc310`). This file provides an independent receipt-based confirmation and the DOM-presence filter B4 asks for.

## 1) Confirm: `tools/post-merge-smoke.mjs:421` hard-codes `tabGuideBtn` (VERIFIED)

**cwd:** `/Users/kosi/wt/iceman` (branch `council/iceman`)
**Command:** `grep -n "tabGuideBtn" tools/post-merge-smoke.mjs`
**Output:**
```
421:  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];
```

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

`tabGuideBtn` is the removed Guide tab (AGENTS.md §9 / QUEUE P-033, REPORTED). The array is the only TABS definition used by the 390 px scan loop.

## 2) Proposal: DOM-presence filter (skip absent tabs) + clean default list (PROPOSAL)

**Ownership note:** `tools/post-merge-smoke.mjs` is under `tools/` (gate/smoke tooling); per AGENTS.md §8 tool ownership is Architect/MUSE depending on kind — I do not edit it. This is a snippet proposal for the owner to integrate.

**WHY:** "Scan EVERY tab" should mean every tab that exists in the build under test. A hard-coded id that is absent (e.g. `tabGuideBtn` post-removal) makes `clickId` return false and records a per-tab row for a non-existent tab, skewing `tabsScanned`/coverage accounting. A presence filter makes the gate resilient across builds that differ in tab set while still scanning all present tabs.

**WHERE:** same anchor as above (`tools/post-merge-smoke.mjs`, "Scan EVERY tab at 390 px" block).

**old:**
```js
  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];
  const perTab = [];
  let probe = {};
  for (const tab of TABS) {
    const clicked = await clickId(tab);
    await sleep(900);
```

**new (proposed):**
```js
  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabDraftBtn'];
  const presentTabs = [];
  for (const tab of TABS) {
    if (await evalJS(`!!document.getElementById(${JSON.stringify(tab)})`)) presentTabs.push(tab);
  }
  const perTab = [];
  let probe = {};
  for (const tab of presentTabs) {
    const clicked = await clickId(tab);
    await sleep(900);
```

**Notes on the proposal (INFERRED, to validate on integration):**
- Uses existing `evalJS` helper (defined ~line 217) and `clickId` (~line 221) — no new helpers. `JSON.stringify(tab)` keeps id interpolation safe.
- `tabsScanned`/`perTab.length` will reflect only present tabs (and `worstTab` comes from scanned rows), which is the honest count; absent configured ids are silently skipped rather than recorded as failed scans. If explicit "skipped/absent" reporting is desired, record `{ tab, clicked:false, skipped:'absent', offenderCount:0, ... }` for `TABS - presentTabs` — small follow-up.
- Removing `tabGuideBtn` from the default list fixes the immediate staleness; the presence filter prevents future drift when other tabs are added/removed.
- `clickId` already returns `false` when element missing (`document.getElementById(...)` null check), so current behavior "clicks" nothing for absent tabs but still probes — the filter avoids a wasted probe/sleep and misleading per-tab entry.

**SAFE ALONE?:** Yes, behavior-preserving for builds where all listed tabs exist; improves correctness for builds missing any listed tab. Should be reviewed by the tool owner (Architect/MUSE) before integration.

**HOW TO CHECK:**
1. `grep -n "tabGuideBtn" tools/post-merge-smoke.mjs` → expect no output after integration.
2. `node --check tools/post-merge-smoke.mjs` → syntax OK.
3. `grep -n "presentTabs" tools/post-merge-smoke.mjs` → shows filter + loop over `presentTabs`.
4. Functional (REPORTED procedure, not run here): `node tools/post-merge-smoke.mjs <build.html>` against a build without Guide tab — per-tab output lists only present tabs, no `tabGuideBtn` row; against a build that happens to include a present tab from the list it is scanned.

## Verdict on B4 asks
- Confirm `:421` hard-codes `tabGuideBtn`: **VERIFIED**.
- Propose DOM-presence filter (skip absent tabs) with code: **PROVIDED** (proposal above).
- Note tool is Architect/MUSE-owned: **STATED** (AGENTS.md §8; I do not edit).

Labels: repo facts and command outputs VERIFIED; v4 table/orcaman-filing status and functional-run procedure REPORTED/UNKNOWN as noted; code-behavior notes INFERRED pending integration test.
