SPEAKER: Beam | ROLE: council seat | TASK: C23 | DATE: 2026-11-20
VERDICT: improved (one-line fix; Architect applies)
FINDINGS:
1. tools/post-merge-smoke.mjs:421 references tabGuideBtn — the Guide tab is removed in V23. The tab list is stale.
2. FIX: update the tab list in the same change that removes the Guide tab (AGENTS.md §9: "its tab list still names the Guide tab, which V23 removes: update it in the same change").
3. Also check for other Guide references in the smoke tool and in tests/ (grep "Guide" in tools/ and tests/).
4. VERIFICATION: run post-merge-smoke after the edit; confirm no reference to tabGuideBtn remains.
WHAT I DID NOT CHECK: did not edit the tool (product tooling is Architect's); proposal only.
