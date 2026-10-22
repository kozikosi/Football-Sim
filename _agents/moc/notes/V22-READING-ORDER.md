# The reading order for `V22-Suggestions.md` — what DS should apply

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: V22-READY-1 slice — the reading order | DATE: 2026-10-22T01:00:00Z**

**Read-only except this note.** The document is being restructured while we work, so everything below is cited **by heading text, never by line number**. The document stands at ~2,260 lines with **four competing entry blocks** and **two competing P0-18/P0-19/P0-22/P0-23/P0-24 headings** (three of the P0-19 headings are the same page, and P0-22/23/24 each name two different things) — so the order below is only applicable **after** those are folded.

## (a) The final section order

1. **🚨 Claude's Critical Path (read this FIRST)** — the do-this-first list; it is the answer to "what do I do now", so it is the first thing on the page.
2. **Five-minute header (read this first)** — the build, its hash, how to apply the patches, and what must not be done; the counterweight to the critical path.
3. **How to read this document (MOC, coordinator) — one numbering, one form, one order** — *moved from 89% down to the front*: the canonical order, the one change-line form, the map of what merges into what, and the two facts Claude must not be surprised by. **This is the document's own map; it must not sit after the work it maps.**
4. **Priority labels (read in 10 seconds)** — P0/P1/P2, and R1/R2/R3 as the round a piece of work came from.
5. **🧭 CLAUDE EXECUTION BRIEF v2 (CANONICAL, supersedes duplicate numbering)** — *demoted from the entry position*: it is the work plan, so it belongs after the labels it uses, not before the map.
6. **P0 — Draft board fixes** — the change set, in the corrected dependency order (P1-12 → P0-17 → P0-16/P0-12; P0-1 before P0-12; P0-5 with P0-7).
7. **Verification checklist (run after each P0 edit)** — *moved up to sit with the items it gates*, not after P2.
8. **P1 — Architect decisions** — Claude's calls.
9. **P2 — Owner decisions** — Kosi's calls, five of them.
10. **FILES TO MODIFY / NEXT STEPS FOR CLAUDE / V21 → V22 Transition** — merged into one short "reference" block after the spine.

## (b) What must be on screen one — the top 60 lines

The top 60 lines must carry, in this order: **the title**; the **build pin** with its hash and size and the statement that it is the file Claude will edit; the **two facts** (the pin is not yet the committed build, and the flex rules are two tables in the Owner's own words); the **canonical order in three lines** (P0 = do first, P1 = Claude's call, P2 = Kosi's; R1/R2/R3 are rounds; every change line is WHERE · WHAT · WHY · SAFE ALONE? · HOW TO CHECK); the **critical path's first three actions**; and the **dependency order** in one line (P1-10 → P1-12 → P0-17 → P0-16/P0-12, and the P0-5/P0-7 ruling). **Everything else is below the fold.** Concretely: 6–10 lines of build-and-rules, ~20 lines of critical path, ~10 lines of the dependency order, and the first P0 item's heading — **nothing else**.

## (c) Reference-only — behind a "read when needed" marker

| section | why it is reference |
|---|---|
| **Appendices (MOC) — the evidence behind the change set** (F · the Cooper DeJean glitch, G · the biome lint, H · the localStorage draft, J · the evidence behind the numbers) | evidence, not instructions; Claude needs it only to trust a number |
| **Appendix A — Evidence record (short)**, **Appendix D — Weights discussion (condensed)**, **Appendix E — Mermaid map** and **P9 — Mermaid diagrams** | diagrams and background |
| **C · Cold read for Claude** and **C2 · The anchors, checked against the pinned build** | the council's own review record, already acted on |
| **P8 — Council-only notes** and **P11 — Council-only notes** | explicitly *not for Claude to implement* |
| **Owner's second-round brief — the change set, decomposed for execution (MOC, coordinator)** | it is a map; its content is now folded into the spine |
| **P7 — Aesthetics and beauty**, **P10 — the 23:00 round**, **P11 · the 23:30 round**, **P10 — Aesthetics (additional)**, **PART 5: ADDITIONAL USER FEEDBACK** | these are the *contributions*; they must be **folded into P0/P1/P2 and then removed**, not left beside them. **Their content is work, not reference** — anything that survives as a standalone section is a duplication. |
| **PRIORITY SUMMARY FOR CLAUDE** | a second copy of the critical path; fold into it and drop the heading |

## (d) Three things currently above the fold that should not be

1. **🧭 CLAUDE EXECUTION BRIEF v2 (CANONICAL, supersedes duplicate numbering)** — a work plan in the entry position. It repeats the critical path and the labels, and it claims to supersede the numbering while two other schemes are still in the file. It belongs **after** the map and the labels.
2. **Quick start: Claude's first 3 actions** — a *third* entry block. Fold its three actions into the critical path as its first three lines and drop the heading.
3. **Five-minute header (read this first)** — a *fourth* "read this first". It must be merged with the pointer into **one** header block, so that the first screen has exactly one entry, one header, one map and one critical path.

**Two preconditions before the order can be applied:** the duplicated headings (three **P0-19: Team Comparison Page**, two **P0-18: Draft Board UI Improvements**, and **P0-22 / P0-23 / P0-24 each naming two different things**) must be merged, or Claude will read one of each and never the other; and **P10 / P11 must each be given one meaning** — at the moment "P10" is both MiniMax's 23:00 round and an aesthetics addendum, and "P11" is both a council-only note and MiniMax's 23:30 round.

**The single test for the finished order:** a reader who has never seen the document, who reads **only the first 60 lines**, should know **what the build is, what the order is, what the first three actions are, and which items depend on which** — without scrolling, and without meeting two competing numbering schemes on the way.
