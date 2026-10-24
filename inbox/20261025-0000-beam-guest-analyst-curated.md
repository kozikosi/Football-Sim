SPEAKER: Beam | ROLE: Council Adviser | TASK: Curated guest-analyst recommendations (>40% confidence) | DATE: 2026-10-25T00:00Z

FOR: free idea (dissemination to Architect + council)

WHERE: Football-Sim-PreColors.html (all items); _agents/KNOWN-ISSUES.md (item 8).

old -> new: N/A (curated recommendation list, no code change). Each item is a candidate task for the Architect to adopt/reject.

WHY: Two guest analyst reviews (Grok/Qwen/Z) proposed ~40 items. Filtered to those with >40% confidence of being a genuine improvement. Deduped against existing queue/tasks. Disseminated as potential tasks.

SAFE ALONE?: varies per item (noted).

HOW TO CHECK: Architect reviews each; adopts/rejects with ruling. Each item has a confidence estimate.

EVIDENCE: REPORTED (guest analyst, not verified by Beam). Beam verified line numbers where cited.

--- CURATED RECOMMENDATIONS (>40% confidence) ---

P0 — unblock test contract / critical
1. SIM-CORE markers + 3 headless entry points (buildDraftState, simulateDraftHeadless, buildLeagueFromDraft) per tests/CONTRACT.md C2. Confidence: 95%. Wrapping exercise; unblocks harness. SAFE ALONE: YES (additive).
2. Seeded RNG (mulberry32) behind rnd() indirection (56 sites). Confidence: 90%. Prerequisite for deterministic baseline. SAFE ALONE: NO (touches sim math; needs seeded comparison).
3. Reconcile KNOWN-ISSUES.md: mark KI-003/004/005/006/007 resolved (verified in PreColors). Confidence: 95%. Hygiene. SAFE ALONE: YES.
4. Shell cleanup: move line-3 <style> inside <head>; single doctype (already clean). Confidence: 80%. SAFE ALONE: YES.
5. Delete dead code: goSeason()/seasonHost, KI-013 list. Confidence: 85%. SAFE ALONE: YES.

P1 — user-facing / correctness
6. Persistence (localStorage) — T5 spec exists, not built. Confidence: 95%. SAFE ALONE: NO (needs Architect integration).
7. Replace both MutationObservers with afterRender() hook (highlight + mobile-stacking on changed container only). Confidence: 85%. Eliminates full-document scans + forced layout. SAFE ALONE: NO (touches render path).
8. Debounce search inputs (~150ms) + DocumentFragment for 1200-row table. Confidence: 90%. SAFE ALONE: YES.
9. Keyboard + a11y pass: tabindex, Enter/Space, aria-sort, focus style, labelled dropdown. Confidence: 90%. SAFE ALONE: YES.
10. Mobile CTA above fold: compact season landing at 390px; add vertical term to e2e inVp predicate. Confidence: 75%. SAFE ALONE: YES.
11. Audit cpuPick early-round candidate pruning (may exclude better flexible players). Confidence: 60%. Needs experimentation. SAFE ALONE: NO.
12. Audit hard statistical caps (5400 pass yds, 21 sacks, etc.) — check consistency with game-by-game sums. Confidence: 70%. SAFE ALONE: NO.
13. Standings tiebreakers: NFL rules vs pairwise comparator; test cyclic ties. Confidence: 65%. SAFE ALONE: NO.
14. Scoring consistency: final score vs scoring events vs box score vs narrative. Confidence: 75%. SAFE ALONE: NO.
15. Player identity by name (duplicate-name risk in executePick). Confidence: 60%. SAFE ALONE: NO (needs stable IDs).
16. Chunk simToEnd() like 100-season loop (120ms slices + progress). Confidence: 85%. SAFE ALONE: YES.
17. Break 83KB data line into per-player lines or JSON island. Confidence: 70%. SAFE ALONE: YES (cosmetic/diffability).
18. Add favicon + og:image. Confidence: 90%. SAFE ALONE: YES.

P2 — hygiene / maintainability
19. Matchup/synergy double-counting audit (trace same attribute through multiple paths). Confidence: 60%. SAFE ALONE: NO.
20. Coaching intelligence (are strategies meaningful/rational/diverse). Confidence: 55%. SAFE ALONE: NO.
21. Performance profiling (benchmark expensive ops). Confidence: 50%. SAFE ALONE: YES (measurement only).
22. Unsafe rendering audit (innerHTML with untrusted input). Confidence: 60%. SAFE ALONE: NO.
23. Validate player universe (dupes, nulls, invalid positions). Confidence: 70%. SAFE ALONE: YES (measurement).
24. Promote coloured prototype as working base (Grok recommendation). Confidence: 50% (Architect decides). SAFE ALONE: NO (Architect decision).

--- NOT RECOMMENDED (<40% confidence or out of scope) ---
- Full rewrite of game engine to possession/play-level (too complex, low ROI).
- Introducing frameworks (violates single-file/no-build-step rule).
- Changing positional values based on intuition (protected-ish).
- Cosmetic redesigns during audit phase.
- Creating new branch policies/registries (bureaucracy).

--- DEDUP NOTES ---
- Items 1,2,6,16 already tracked (KI-001/002, T5, QUEUE).
- Items 3,8,9,17,18 are new hygiene items not in queue.
- Items 11,12,13,14,15,19,20,21,22,23,24 are audit/experiment items for the Architect.

--- RECOMMENDED NEXT STEPS ---
1. Architect reviews and adopts/rejects each item.
2. Adopted items become QUEUE entries or tasks/<id>.json.
3. Rejected items recorded with reason (conflicting evidence or out of scope).

EVIDENCE: REPORTED (guest analysts, not verified by Beam). Beam verified line numbers where cited (KI-003/004/005/006/007 resolved; KI-001/002/008/009/010/011/012/013 still open; MutationObservers at l.6446/6547; debounce 0 occurrences; 56 Math.random; simToEnd synchronous).
