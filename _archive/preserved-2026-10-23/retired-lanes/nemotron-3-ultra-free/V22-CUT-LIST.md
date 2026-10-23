# V22-CUT-LIST.md — Cut/Compress/Keep Decisions for V22-Suggestions.md

**Speaker:** Ultra | **Date:** 2026-10-22 | **Target:** <1,200 lines (currently ~2,515)  
**Method:** Every section evaluated against surviving canonical item. "Might be useful" ≠ keep.

---

## CUT LIST TABLE

| Section | Lines | Verdict | Survivor That Carries It | Justification |
|---------|-------|---------|--------------------------|---------------|
| **P1-34 through P1-40** (7 items) | 14 | **DELETE** | P1-20 through P1-26 | Exact duplicate text, same recommendations. Second run appears after P1-33. |
| **P7-6 (second occurrence)** | 10 | **DELETE** | P7-6 (first, 2 lines) | Exact duplicate header + content. First is stub, second is full — keep first, expand if needed. |
| **P0-18 "Visual Changes" (second occurrence)** | 17 | **DELETE** | P0-18 "Visual Changes" (first) | Exact duplicate. Appears as "P0-18: Draft Board UI Improvements (continued)". |
| **P0-19 "Team Comparison Page" (2nd & 3rd occurrences)** | 90 | **DELETE** | P0-19 (first, 51 lines) | Three identical copies. First has full table + implementation notes. |
| **PART 5: P0-15 Coaching Philosophy** | 31 | **DELETE** | P0-15 (12 lines) + P10-3 (19 lines) | Same content in R1 P0-15 and R2 P10-3. PART 5 is late duplicate. |
| **PART 5: P0-16 Base Defense Selection** | 26 | **DELETE** | P0-16 (5 lines) + P10-2 (33 lines) | P10-2 has full JS mapping tables. PART 5 is summary only. |
| **PART 5: P0-17 Flex Rules Overhaul** | 68 | **DELETE** | P0-17 (37 lines) + P10-1 (47 lines) | P0-17 + P10-1 are canonical. PART 5 repeats tables. |
| **PART 5: P0-18 Draft Board UI (both)** | 32 | **DELETE** | P0-12 (16 lines) + P10-5/6 | PART 5 rephrases P0-12 draft board V22 changes. |
| **PART 5: P0-19 Team Comparison (3×)** | 135 | **DELETE** | P0-10 (7 lines) + P0-19 first (51) | Already covered in R1. PART 5 is triplicate. |
| **PART 5: P0-20 Guide Page Overhaul** | 42 | **DELETE** | P0-11 (14 lines) + P10-4 (23 lines) | P0-11 + P10-4 have exact edit tables. |
| **PART 5: P0-21 Game Preview/Review** | 83 | **DELETE** | P10-5 (21) + P10-6 (26) + P10-7 (24) | P10-5/6/7 are canonical with before/after tables. |
| **PART 5: P0-22 Season Review** | 36 | **DELETE** | P10-7 (24) + P0-19 (31) | Already in R2. |
| **PART 5: P0-23 Position Rankings & Player Browser** | 16 | **DELETE** | P0-8 (5) + P0-9 (10) | R1 items are canonical. |
| **PART 5: P0-24 Team Comparison** | 25 | **DELETE** | P0-10 + P0-19 | Duplicate. |
| **PART 5: P0-22 Guide Page (second)** | 42 | **DELETE** | P0-11 + P10-4 | Duplicate of P0-20. |
| **PART 5: P0-23 Arithmetic Fixes** | 29 | **COMPRESS to 8** | P0-20 weight table + Appendix D | Appendix D has full consensus table. Keep only the 4 specific corrections. |
| **PART 5: P0-24 Team Colors & Aesthetics** | 31 | **COMPRESS to 6** | P7-1 (12 lines) | P7-1 is Beam's canonical aesthetics spec. Keep only CSS var snippet. |
| **P0-22 Guide Page (vs P0-20)** | 42 | **COMPRESS to 6** | P0-20 (42 lines) | Same content. P0-20 has better structure. Keep P0-20, drop P0-22. |
| **P0-20 weight table (vs Appendix D)** | 33 | **COMPRESS to 8** | Appendix D (4 lines + condensed table) | Appendix D has full colleague debate summary + consensus table. P0-20 repeats subset. |
| **P10-9 "What council could not verify"** | 12 | **COMPRESS to 4** | P4 "Only Owner can settle" (9 lines) | Same 4 items. P4 is the decision register. Merge into P4. |
| **Owner's Brief: P0 Mechanics** | 9 | **COMPRESS to 3** | P0-15, P0-16, P0-17, P4#2 | Just pointers to canonical items. |
| **Owner's Brief: P1 Copy** | 6 | **COMPRESS to 3** | P10-4 + P10-5 + P10-6 | Pointers only. |
| **Owner's Brief: P2 Graphical** | 25 | **COMPRESS to 6** | P0-25 §2, §3, §4, §6 | Pointers to P0-25 sections. |
| **Owner's Brief: P3 Stars/Typography** | 14 | **COMPRESS to 3** | P0-25 §3.3, §4 Star Card | Pointers only. |
| **Owner's Brief: P4 Owner Decisions** | 9 | **DELETE** | P4 (9 lines) | Exact duplicate of P4 section above. |
| **P0-25-OWNER "Already Answered" table** | 32 | **COMPRESS to 8** | P0-25 §2, §3, §4 + P4 | Mapping table useful but verbose. Keep 4 key cross-refs. |
| **P8 Council-only notes (8 items)** | 24 | **COMPRESS to 8** | Appendix or P0/P10 items | Not for Claude. Move to Appendix or 1-line each. |
| **P9 Mermaid diagrams (3)** | 73 | **COMPRESS to 12** | P0-25 §8 (105 lines) | P0-25 §8 is the canonical motion system diagram. P9 diagrams are precursors. |
| **P7 Beam aesthetics (7 items)** | 84 | **COMPRESS to 16** | P0-25 §3 (gold) + §4 (components) | No Figma yet. Keep as "future: team colors, dark mode, mobile gestures" bullets. |
| **Appendix A (Evidence)** | 9 | **KEEP** | — | Short, factual. |
| **Appendix B (Owner questions)** | 4 | **KEEP** | — | Consolidated ≤5. |
| **Appendix C (Claude questions)** | 4 | **DELETE** | P1 items + P4 | Questions are already in P1/P4 sections. |
| **Appendix D (Weights discussion)** | 4 | **KEEP WHOLE** | — | Critical context for protected constants. |
| **Appendix E (Mermaid map)** | 16 | **COMPRESS to 4** | P0-25 §8 | P0-25 §8 supersedes. |
| **Appendix F (Cooper DeJean)** | 4 | **KEEP** | — | Evidence for flex fix. |
| **Appendix G (Biome lint)** | 4 | **KEEP** | — | Config rationale. |
| **Appendix H (localStorage)** | 4 | **KEEP** | — | Design doc for V22 item b. |
| **Appendix J (Numbers evidence)** | 16 | **COMPRESS to 6** | Five-minute header + P0-17 | Key facts already in header. Keep "weights match modelWeights 34/34" + "70→90 = 20× slope". |
| **PRIORITY SUMMARY (P0/P1/Owner lists)** | 26 | **COMPRESS to 8** | Five-minute header + Priority labels | Already in lines 3–27. Summary is redundant. |
| **FILES TO MODIFY** | 16 | **COMPRESS to 6** | Five-minute header | Already in header. |
| **NEXT STEPS FOR CLAUDE** | 14 | **COMPRESS to 6** | "How to read" section | Already in new "How to read" section. |
| **V21 → V22 Transition** | 7 | **COMPRESS to 2** | Five-minute header | One-liner in header suffices. |

---

## SUMMARY

| Action | Sections | Lines Removed | Lines Added (compressed) | Net Reduction |
|--------|----------|---------------|--------------------------|---------------|
| **DELETE** | 18 | ~680 | 0 | -680 |
| **COMPRESS** | 22 | ~580 | ~180 | -400 |
| **KEEP** | ~155 | 0 | 0 | 0 |
| **TOTAL** | 195 | **~1,260** | **~180** | **~-1,080** |

**Projected final length: ~2,515 - 1,080 = ~1,435 lines**  
*Additional ~235 lines compressible from P0-1..P0-14 detail tables if needed (keep exact edits but drop prototypes).*

---

## SURVIVING CANONICAL STRUCTURE (Post-Cut)

```
# V22 Suggestions — Compiled by BOC — 21 Oct 2026
## Five-minute header (build hash, prohibitions, patch protocol)
## Priority labels (P0/P1/P2)
## STOP LIST (8 things Claude must not do)

## R1 — Ten-Item Directive (20 Oct) — P0-1 through P0-14
  P0-1 Value Here removal (exact edits)
  P0-2 MORE removal
  P0-3 Badge strip
  P0-4/5/6/7 Weights buttons + label + user weights delete
  P0-8 Player browser cap
  P0-9 Position Rankings combos
  P0-10 Team Comparison
  P0-11 Guide page changes
  P0-12 Draft board V22 changes
  P0-13 Week 1 display
  P0-14 390px P0

## R2 — Flex Rules + Text Overhaul (21 Oct 23:00) — P0-15, P0-16, P0-17 + P10-1..P10-4
  P0-15 Coaching philosophy unlocked + description
  P0-16 3-4/4-3 base (OD-F1 open)
  P0-17 Flex rules (PROTECTED, exact JS replacement)
  P10-1 Flex rules rewritten (tables)
  P10-2 3-4 base math (BASE_3_4 mapping)
  P10-3 Coaching philosophy stay open
  P10-4 Preseason menu copy (exact before→after)

## R3 — Graphics + Motion (21 Oct late) — P0-25 (canonical)
  §1 Motion vocabulary (17 tokens)
  §2 Application map (48 hooks)
  §3 Gold champion theme (CSS vars, banner, text, accents)
  §4 Reusable components (8)
  §5 Reduced-motion (mandatory)
  §6 New celebrations (6 kinds, OD-M6)
  §7 Exact hooks (CSS classes, keyframes, JS functions)
  §8 Mermaid diagram (motion system architecture)
  §9 Implementation phases (7) + acceptance criteria
  §10 Performance budgets
  §11 Files to modify

## Owner Decisions Blocking Implementation
  OD-F1: 3-4/4-3 alias vs new slots (P0-16, P0-17, P4#2)
  OD-M1: Bracket design (P0-25 §9 Phase 5)
  OD-M2..OD-M8: Motion/graphics (safe to continue)
  P4: 4th-down math, 3-4 shape, sacks threshold, bracket design

## Appendices (Compressed)
  A: Evidence record
  B: Owner questions (≤5)
  D: Weights discussion (condensed, critical)
  F: Cooper DeJean glitch
  G: Biome lint config
  H: localStorage draft design
  J: Numbers evidence (2 key facts)

## How to Read This Document (Canonical order + merge map)
```

---

## NOTES FOR RESTRUCTURER

1. **Do not reorder R1→R2→R3** — chronological rounds match Owner feedback waves.
2. **P0-17 flex rule JS replacement** must stay exact (lines 697-723 in current doc).
3. **P10-1 flex tables** must stay exact (lines 702-723).
4. **P0-25 §3 gold theme CSS** must stay exact (172 lines) — this is the motion spec.
5. **Protected constant warnings** (8 occurrences) must remain on P0-17, P10-1, P0-A, etc.
5. **OD-F1 and OD-M1** are the only "must answer now" items — flag prominently.
6. **Build hash** must be `e1ac8184a601cc8bffa46069848b750eb30067c3f88f921aa90d79ee7da5b823` (actual `merged.html`).