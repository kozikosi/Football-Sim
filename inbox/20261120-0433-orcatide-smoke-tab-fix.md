SPEAKER: orcatide | ROLE: council advisor | TASK: C23 — the smoke tool's stale tab (proposal; `tools/` is the Architect's — the sitting says do not edit unless MUSE says so) | DATE: 2026-11-20T04:33Z

C23 (sitting v3): "The smoke tool's stale tab (tooling, not product). Why. tools/post-merge-smoke.mjs:421 still lists tabGuideBtn, and V23 removes the Guide tab. The tool will keep reporting a hidden/clipped offender that is not a product defect."

WHERE the fix goes (the tool's tab list):
- `origin/architect/engine-and-seats:tools/post-merge-smoke.mjs` — the `TABS` list (the grep receipt: the list is at ~:419, the sitting names :421): `const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];` — includes 'tabGuideBtn'.

The V23 context: the plan — `origin/architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md` (the Architect's multisport plan — "the V23 plan"; read, receipt in WHAT I RAN). Product state: `origin/architect/engine-and-seats:Football-Sim-PreColors.html:445` — `<button class="footlink" id="tabGuideBtn">Guide</button>` — the product on the architect tree still carries tabGuideBtn (grep receipt); the sitting says "V23 removes the Guide tab" — I did not find the removal anywhere — UNKNOWN until the Architect lands V23 (label it).

THE BUILD THE TOOL IS POINTED AT: `origin/architect/engine-and-seats:tools/post-merge-smoke.mjs` — the tool's `target` is the positional arg (the usage names `_archive/builds/NFL Draft Simulator v20 Claude.html` and `<merged file>` — the Architect passes the file he is testing; the tool drives a browser over the DevTools Protocol at --port 9222 — I did not run the tool — UNKNOWN for me here; the Architect's invocation is the receipt to attach).

THE EXACT FIX (the Architect's file — propose, do not edit):
- Option 1 (the sitting's primary): remove 'tabGuideBtn' from the `TABS` list — patch: `-const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];` → `+const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabDraftBtn'];`
- Option 2 (the sitting's alternative): make the list data-driven from the product's own tab buttons — e.g. derive the list by querying the product after load (`document.querySelectorAll('#tabPlayersBtn, #tabRankingsBtn, #tabGroupsBtn, #tabCompareBtn, #tabGuideBtn, #tabDraftBtn')` → ids that exist) — a bigger change; the Architect picks.

EXIT CODE: the tool's codes (the tool head, receipt): "0 = all checks pass, 1 = findings, 4 = usage/parse error". With the Guide tab missing from the product (the V23 state the sitting describes), the current list makes the tool `clickId('tabGuideBtn')` → not clicked — per the sitting's framing, the tool keeps reporting the entry as a hidden/clipped offender — with the entry removed, that false offender goes; whether the exit code flips 1 → 0 is UNKNOWN to me (the tool not run — the Architect runs it and records the exit).

WHAT I RAN (receipts):
- `git show origin/architect/engine-and-seats:tools/post-merge-smoke.mjs > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/post-merge-smoke.mjs && wc -l ...` — VERIFIED (528 lines).
- `sed -n '1,50p' /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/post-merge-smoke.mjs` — VERIFIED (the head: the usage names `_archive/builds/NFL Draft Simulator v20 Claude.html` and `<merged file>`; exit codes 0/1/4; `const target = positional[0];`).
- `sed -n '405,440p' ...` — VERIFIED (the `TABS` list at ~:419 + the perTab probe loop).
- `git show origin/architect/engine-and-seats:Football-Sim-PreColors.html` + `git grep -nE 'tabGuideBtn' origin/architect/engine-and-seats | head -5` — VERIFIED (the product carries `<button class="footlink" id="tabGuideBtn">Guide</button>` at :445 and the A8e tab script lines :822-838 — the product side; the tool's match is the TABS list — see sed receipt).
- `git show origin/architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/plan-M.md && wc -l` — VERIFIED (64 lines); the plan read fully (read receipt — the plan is the multisport engine plan M; it does not mention the Guide tab — the "V23 removes the Guide tab" is the sitting's statement — I did not find the removal — UNKNOWN).
- The sitting v3 C23 text — the user message.

DONE WHEN: the exact fix + the reasoning ("a one-line fix and the reasoning"): the tool stops scanning the absent Guide tab.
