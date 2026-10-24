# V22 P1 Block De-duplication — BOC (DS request) — 21 Oct 2026

## 1. Old→new mapping

| Old number | New number | Action |
|------------|------------|--------|
| P1-1 | P1-1 | KEPT (survivor) |
| P1-2 | P1-2 | KEPT (survivor) |
| P1-3 | P1-3 | KEPT (survivor) |
| P1-4 | P1-4 | KEPT (survivor) |
| P1-5 | P1-5 | KEPT (survivor) |
| P1-6 | P1-6 | KEPT (survivor) |
| P1-7 | P1-7 | KEPT (survivor) |
| P1-8 | P1-8 | KEPT (survivor) |
| P1-9 | P1-9 | KEPT (survivor) |
| P1-10 | P1-10 | KEPT (survivor) |
| P1-11 | P1-11 | KEPT (survivor) |
| P1-12 | P1-12 | KEPT (survivor) |
| P1-13 | P1-13 | KEPT (survivor) |
| P1-14 | P1-14 | KEPT (survivor) |
| P1-15 | P1-15 | KEPT (survivor) |
| P1-16 | P1-16 | KEPT (survivor) |
| P1-17 | P1-17 | KEPT (survivor) |
| P1-18 | P1-18 | KEPT (survivor) |
| P1-19 | P1-19 | KEPT (survivor) |
| P1-20 | P1-20 | KEPT (survivor) |
| P1-21 | P1-21 | KEPT (survivor) |
| P1-22 | P1-22 | KEPT (survivor) |
| P1-23 | P1-23 | KEPT (survivor) |
| P1-24 | — | REMOVED (duplicate of P1-7) |
| P1-25 | — | REMOVED (duplicate of P1-8) |
| P1-26 | — | REMOVED (duplicate of P1-9) |
| P1-27 | P1-27 | KEPT (survivor) |
| P1-28 | P1-28 | KEPT (survivor) |
| P1-29 | P1-29 | KEPT (survivor) |
| P1-30 | P1-30 | KEPT (survivor) |
| P1-31 | P1-31 | KEPT (survivor) |
| P1-32 | — | REMOVED (duplicate of P1-18) |
| P1-33 | — | REMOVED (duplicate of P1-19) |
| P1-34 | — | REMOVED (duplicate of P1-20) |
| P1-35 | — | REMOVED (duplicate of P1-21) |
| P1-36 | — | REMOVED (duplicate of P1-22) |
| P1-37 | — | REMOVED (duplicate of P1-23) |
| P1-38 | — | REMOVED (duplicate of P1-7) |
| P1-39 | — | REMOVED (duplicate of P1-8) |
| P1-40 | — | REMOVED (duplicate of P1-9) |

## 2. Merged P1 block (each item appears exactly once)

## P1 — Architect decisions (de-duplicated)

### P1-1. Merge keep-list
(a) cpuPick = donor (`94b878605b73`, credible-GM floors + bounded miss) vs v20 (`3dc9d12f500a`, cap + 92-deep); (b) color-scheme = `light dark` (donor header) vs `light`; (c) render100 = donor (`cc1016eacc78`, drop-in) vs v20 (crashes on rWeights); (d) #glue phone block = Variant A (`ec6306eb79df`, donor body + data-nostack + v20 tail) vs Variant B (`04b90cb68fcf`, strict donor); (e) Style blocks: v20 keeps #draftTable2 cards CSS, donor Season-first only with donor markup.

### P1-2. Merge surface branch
v20 markup (11 donor / 4 v20 / 2 synthesize = 17, measured working, branch B) vs donor Season surface (14 donor / 1 v20 / 2 synthesize = 17, larger scope). Under donor surface, renderSeasonTabInner delta is the Season-entry path (viewSeason/tabSeasonBtn/seasonHost/goSeason absent in v20); donor's setActiveTab view loop has no null guard → TypeError risk. Under v20 markup, split is 13/2/2.

### P1-3. setActiveTab tail line
v20's `setActiveTab('viewDraft','tabDraftBtn')` (v20:6433) vs donor's `setActiveTab('viewSeason','tabSeasonBtn')` (donor:6489). Which is the merged default tab?

### P1-4. Wrapper
Double-wrapped (2 doctypes, l.1 + l.2) + stray 14-byte `</body></html>` tail. Fix = remove duplicate wrapper + duplicate close, keep donor's structured header? (Pickle's recommendation.) Which color-scheme wins (`light` vs `light dark`)?

### P1-5. cpuPick keep-direction
Donor (credible-GM floors + bounded miss) vs v20 (cap + 92-deep). Recommended: donor.

### P1-6. phone-layout block
Donor (donor:6458–6488, dropped msChecked memo) vs v20 (v20:6409–6432, stale memo → 7,208 overflow). Recommended: donor.

### P1-7. "sudden death" (v20:2880) / "went the distance" (v20:2898)
Donor (0) vs v20 (1 each). Recommended: donor (already clean).

### P1-8. Shared copy debt
"steal a 18–16 win" (v20:3082 / donor:3101, wrong article for scores starting 8/11/18) and "the 49ers's answer" (v20:5433 / donor:5483). Post-merge round or fold into merge?

### P1-9. "expected scoring" (v20:4832)
Stats-explainer only. Compliant as-is or remove?

### P1-10. SIM-CORE markers + 3 headless entry points
Absent in both builds (grep 0/0). Round 1A order: S-202 → S-203 → S-103 → S-102 → S-301. Product change = markers + moved entry points only. Acceptance (a)–(g) in rulings.

### P1-11. SAM scarcity
5 records for 32 teams (27-player deficit). Should SAM be a required position in the next intake? (Owner #18.) Recommended: yes. Cost of being wrong: pool imbalance persists.

### P1-12. FB/Punter slots (#12)
Owner confirmed 28 rounds, no flex cost for both (same as SAM precedent). Need: (a) whether FB/P need consumers in teamRatings (nine unit ratings) or are dead slots; (b) whether other positions flex into FB/P at a penalty (SAM precedent — LB_FLEX with penalties). Recommended: dead slots acceptable for specialists; other positions flex in at penalty following SAM precedent.

### P1-13. V21 stats surface
Should the unit-ratings panel be visible by default in the regular season view? (Recommended: visible.) Should TS+/efficiency metrics be defined for football before basketball? (Recommended: basketball first, football second.) Should the 100-season "What actually drove winning" section be reachable from the regular season view? (Recommended: keep as-is, already reachable via sim100Btn.)

### P1-14. All-time NFL pool
1,500–2,000 candidates, Owner approves. −5 adjustment NOT approved. Modern franchises. OVR as summary. Person/player-season/franchise/status/source/rating distinct. No ratings assigned yet (0 engine-ready records). Need Architect approval of the record shape (player-record.schema.json rev 4) and the rating method.

### P1-15. Architecture: repo vs folders
Concrete options with folder sketches, tradeoffs, recommendation, cost of being wrong. Provisional preference: protect NFL product, per-sport rules/math, self-contained HTML per sim, extract shared engine only after demonstrated reuse. Owner wants concrete options, not abstract.

### P1-16. NBA 2K/FIFA ratings as sources
With provenance; basketball-specific math (TS+, rim protection, 3-point shooting matter more); up to 10 players per team; computer-managed rotations vs user-set. Concepts to compare, not finalized.

### P1-17. Soccer/baseball closer to football draft; hockey closer to basketball (uncertain). Ranking source/cutoff for soccer leagues above MLS + MLS TBD.

### P1-18. Quarantine vs delete invented ratings files
`sports/football/ratings.json` and `sports/basketball/all_time_draft.json`. Recommended: quarantine. Owner decides.

### P1-19. Archived sessions (Liquid, Glyph, Omni, Cohere)
Delete contributions unless structural? Recommend: specify exact files/lines before deletion.

### P1-20. Default tab: Draft vs Season-first. Owner decides. (Recommended: Season-first, matches donor + project instructions.)

### P1-21. STATUS.md overwrite (stale). Fix after verifier. Who updates the hash line?

### P1-22. Color-scheme: `light dark` (donor header) vs `light`. (Recommended: `light dark`.)

### P1-23. Wrapper: double-wrapped (2 doctypes). Fix: remove duplicate wrapper + duplicate close, keep donor's structured header.

### P1-27. E2E Week 1 display: build renders "Week 1 of 17" (l.3891). Check not implemented. Protocol change or check implementation? Owner/Architect decide. (BOC verdict: LABEL CORRECT BUT MISLEADING — engine runs 17 weeks no byes; misleading vs real NFL's 18 weeks.)

### P1-28. 390px P0: `#startSeasonBtn` at `top=963.03` in 844px viewport (preseason primary-action clause). Functional flow clean. The gate's `E_viewportUsable` is horizontal-only and cannot see below-the-fold primary actions. Fix: move #startSeasonBtn above the fold or change the gate to check vertical axis. (DS M-122 addendum 2, corroborated MOC M-334.)

### P1-29. E2E gate receipts are JSON object + trailing summary line (strict parser fails on "Extra data"). Fix: `--json` flag or `.json` + `.txt` pair. (MOC M-334.)

### P1-30. `hiddenClipped: 1` on `tabDraftBtn` in every run. Unnamed in receipt; worth naming before next run. (MOC M-334.)

### P1-31. PR #5 scorecard generator admits `_agents/minimax/recon/run-reconciliation-v2.proposed.md`'s `SPEAKER: MiniMax subagent (run-reconciliation)` as a council member. One regeneration from publication. Fix before adopting.


## 3. Count

- Items before de-duplication: 40
- Items after de-duplication: 28
- Duplicates removed: 12

Duplicates removed (12): P1-24, P1-25, P1-26, P1-32, P1-33, P1-34, P1-35, P1-36, P1-37, P1-38, P1-39, P1-40.

## 4. Differences between copies (flagged, not silently kept)

- **P1-7 vs P1-24:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-7 (more detailed).
- **P1-7 vs P1-38:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-7 (more detailed).
- **P1-8 vs P1-25:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-8 (more detailed).
- **P1-8 vs P1-39:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-8 (more detailed).
- **P1-9 vs P1-26:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-9 (more detailed).
- **P1-9 vs P1-40:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-9 (more detailed).
- **P1-18 vs P1-32:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-18 (more detailed).
- **P1-19 vs P1-33:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-19 (more detailed).
- **P1-20 vs P1-34:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-20 (more detailed).
- **P1-21 vs P1-35:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-21 (more detailed).
- **P1-22 vs P1-36:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-22 (more detailed).
- **P1-23 vs P1-37:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-23 (more detailed).
- **P1-25 vs P1-39:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-25 (more detailed).
- **P1-26 vs P1-40:** Text differs (title formatting only — one-line vs two-line title). Substance is identical. Survivor: P1-26 (more detailed).

No substantive differences found between any duplicate pair. All differences are formatting (title on one line vs two, trailing separator).

## What BOC did not check
- Whether P1-27 through P1-31 (E2E Week 1, 390px P0, gate receipts, hiddenClipped, PR #5 scorecard) are themselves duplicates of earlier items. They appear unique.
- Whether the P1 block in the current V22-Suggestions.md (2,247 lines) differs from the version BOC reviewed earlier (335 lines). The document may have been modified by other sessions.


---

## 5. Additional collisions outside the P1 block (for the record)

DS noted 23 duplicated priority labels across the document. Beyond the P1 block, the following collisions exist. All are **(b) same number, different work** — same label, different content. None are true content-duplicates.

### P0 collisions

| Label | Occurrences | Content verdict |
|-------|------------|----------------|
| P0-15 | L205, L1010 | Coaching philosophy (wave 2) vs Coaching Philosophy & Aggressiveness (wave 3) |
| P0-16 | L217, L1041 | Base defense selection (wave 2) vs Base Defense Selection (wave 3) |
| P0-17 | L222, L1067 | Flex rules overhaul (wave 2) vs Flex Rules Overhaul (wave 3) |
| P0-18 | L259, L1130, L1162 | Game recap UI (wave 2) vs Draft Board UI Improvements ×2 (PART 5) |
| P0-19 | L311, L1181, L1234, L1287 | Season review (wave 2) vs Team Comparison Page ×3 (PART 5) |
| P0-22 | L1468, L1551 | Season Review & Playoffs vs Guide Page (PART 5) |
| P0-23 | L1506, L1595 | Position Rankings & Player Browser vs Positional Value Table — Arithmetic Fixes (PART 5) |
| P0-24 | L1524, L1624 | Team Comparison vs Team Colors & Aesthetics (PART 5) |

### P10 collisions (same number, different work)

| Label | Occurrence 1 | Occurrence 2 |
|-------|-------------|-------------|
| P10-1 | L751: The flex rules, rewritten | L1739: Super Bowl champion celebration |
| P10-2 | L798: The 3-4 base, and what it means for the maths | L1749: More motion and graphics throughout |
| P10-3 | L831: Coaching philosophy and aggressiveness stay open all season | L1763: Season review button placement |
| P10-4 | L850: The preseason menu, copy by copy | L1768: Season review more graphical |
| P10-5 | L873: The game preview | L1773: 100 season review more graphical |
| P10-6 | L888: The game review | L1778: 'Seasons by Win total' left alignment fix |
| P10-7 | L907: The season review and the 100-season report | L1783: 'Your players; average season' and 'Award patterns' higher up |
| P10-8 | L932: The graphical direction, for the Architect and for Figma | L1788: Remove 'Realism audit & league-wide records' |
| P10-9 | L958: What the council could not verify in this round | L1793: Game previews and reviews more graphical |

### P11 collisions (same number, different work)

| Label | Occurrence 1 | Occurrence 2 |
|-------|-------------|-------------|
| P11-1 | L1862: The 'Value Here' removal | L1890: 'The Chiefs are Super Bowl champions.' → something worth reading |
| P11-2 | L1865: The 'also fits' line | L1903: The Champions banner goes gold, and it shimmers |
| P11-3 | L1868: The Star system is removed | L1919: A motion system, because a text game should move |
| P11-4 | L1871: The position cards follow the roster order | L1940: The season review button goes up and goes blue |
| P11-5 | L1874: The team colors | L1949: The season review and the 100-season report become graphical |
| P11-6 | L1877: The weights | L1969: 'Your players; average season' and 'Award patterns' move up |
| P11-7 | L1880: The glossary | L1979: Two report sections go internal |
| P11-8 | L1883: The advanced stats | L1998: What the council could not check in this round |

### Summary

- **P1 block:** 40 items → 28 unique, 12 duplicates removed (all formatting-only differences).
- **P0 collisions:** 8 labels with 19 occurrences (all same-number-different-work).
- **P10 collisions:** 9 labels with 18 occurrences (all same-number-different-work).
- **P11 collisions:** 8 labels with 16 occurrences (all same-number-different-work).
- **Total colliding labels:** 25. **Total occurrences:** 53. **True content-duplicates:** 0 (all are same-number-different-work or superseded).

No item has unverifiable math in the P1 block. The math claims (per-spot gains, weight values, etc.) are in P2, not P1.
