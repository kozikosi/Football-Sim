# Proposed Canonical Shape for V22-Suggestions.md — BOC (MOC request) — 21 Oct 2026

Read-only review. No shared-doc edits. No product edits.

## Problem

Three or four copies exist: root `V22-Suggestions.md` (BOC's, 9 sections, ~186 lines), `_agents/moc/notes/V22-Suggestions.md` (MOC's, 840 lines, 37 diff hunks with code), `_agents/vl/notes/V22-Suggestions.md`, and copies under `council-brief/2026-10-21/`. They overlap and none is self-contained for Claude.

## Proposed shape (one file, read in one pass)

### Five-minute header (top of file)

1. **What this document is:** the council's consolidated V22 change set for Claude (Architect). Proposals only; Claude decides what enters the build.
2. **What the build is:** `NFL Draft Simulator merged.html` (V21), 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, @ `merge/v20-donor` `ff8c05ae`. Call it V21, not V22. Deliverable: `Football-Sim-V22.html`.
3. **How to apply the patches:** each block is `old → new` with line numbers; apply in P0→P1→P2 order; run `node --check` after each; verify with the 390px gate and the 100-season smoke.
4. **What Claude must not do:** invent ratings/team assignments/stats; change protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`) without explicit approval; hand-edit evidence files; break `modelWeights() = f(slotWinsPerOvr())`; ship a candidate without the verifier's five-line report.

### Priority labels (read in 10 seconds)

- **P0 — blocks the release.** Must be fixed before V22 ships. (Value here removal, MORE removal, badge move, weights buttons, weights label, 390px P0, Week 1 display, wrapper, cpuPick, phone-layout.)
- **P1 — Architect decision.** Claude decides whether/how to apply. (Color-scheme, render100, #glue variant, surface branch, SAM scarcity, FB/P slots, V21 stats surface, TS+ definition, architecture.)
- **P2 — Kosi's decision.** Owner approval needed. (DEFAULT_WEIGHTS values, −5 adjustment, quarantine vs delete, archived sessions, default tab, repo vs folders.)

### Section order (what comes first)

1. **Five-minute header** (above).
2. **P0 — Draft board fixes** (Value here, MORE, badges, weights buttons, weights label, player browser cap, footer tabs, mobile collapse, team colors). These are copy-pasteable edits with line numbers.
3. **P0 — Guide page fixes** (Value Here removal, flex table reorder, Position Values merge, glossary, guide box removal, season text, advanced stats text, weight adjustments). Copy-pasteable edits.
4. **P0 — Team Comparison fixes** (remove "real", remove effective-ratings note, parentheses removal + Offense/Defense reorg, Chiefs/Raiders default). Copy-pasteable edits.
5. **P1 — Merge-debt fixes** (cpuPick, color-scheme, render100, #glue, wrapper, phone-layout, sudden death/went the distance, copy debt, expected scoring). Each with recommended default and cost of being wrong.
6. **P1 — SIM-CORE + headless entry points** (S-202: markers + 3 entry points). Round 1A order. Acceptance (a)–(g).
7. **P1 — FB/Punter slots (#12)** (28 rounds, no flex cost, SAM precedent). Foundations spec + 10-step change set. Trap: 52→12 dropped, harmless.
8. **P1 — V21 stats surface** (unit-ratings panel, promote advanced stats, TS+ definition). Proposal only.
9. **P2 — All-time NFL pool** (1,500–2,000 candidates, −5 not approved, modern franchises, OVR, distinct layers, 0 engine-ready records, schema rev 4).
10. **P2 — Architecture (repo vs folders)** (concrete options, folder sketches, tradeoffs, recommendation, cost of being wrong).
11. **P2 — NBA 2K/FIFA** (sources with provenance, basketball-specific math, up to 10 players/team, rotations).
12. **P2 — Cleanup** (quarantine invented ratings, archived sessions, default tab, STATUS.md).
13. **Appendix A — Evidence record** (loss events, candidate build hash, verifier sign-off, PR #5 discovery, invented-ratings quarantine, repo truth). Short, with commands.
14. **Appendix B — Owner questions** (OQ-1 through OQ-5, consolidated, with defaults and cost).
15. **Appendix C — Claude questions** (Q-Claude-1 through Q-Claude-71, full detail).
16. **Appendix D — Weights discussion** (Owner's table, adjustments, colleague debate — condensed to key points).

### What to cut

- The colleague debate verbatim (colleagues 1–4 full text) → condense to "Key points from colleague review" (5 lines). The full debate is in the bulletin and council notes; Claude doesn't need 3,000 words of opinion in the implementation guide.
- The NBA 2027 player list (538 names) → move to a separate data file (`_agents/boc/notes/nba_2027_ratings.csv`), reference by path. Claude doesn't need 538 names in the implementation guide.
- Duplicate "Value here" sections → one canonical section (P0, with MOC's verified corrections folded in).
- The "Reading the Draft Board" guide text → keep the edits, drop the full guide HTML.
- MOC's 37 diff hunks → keep only the ones that apply cleanly (8 of 16 DB items per Lightning's applier check); note which need structural changes.
- The loss-event forensics → condense to 3 lines in Appendix A.

### What to keep

- Every copy-pasteable edit with line numbers (P0, P1 items).
- The priority labels and section order.
- The five-minute header.
- The "what Claude must not do" list.
- The Owner's questions (consolidated, ≤5).
- The candidate build hash and git ref (pin).
- The protected-constants reminder.

### What BOC did not check

- MOC's 37 diff hunks: BOC read the first ~60 lines but did not verify all 840 lines. Lightning's applier (items 21-25 only, partial) suggests many hunks are placeholders ("This approach is getting too complex").
- The root `CLAUDE_PROMPT_V21_CHANGES.md` (6,187 B) — BOC did not read it fully; it may contain additional context.
- `_agents/vl/notes/V22-Suggestions.md` — BOC did not read it.
- `council-brief/2026-10-21/` copies — BOC did not inspect.
- Whether the candidate build (`merged.html`) still exists in the working tree (it was deleted earlier; `NFL Draft Simulator merged.html` also gone; only v20 and donor remain). Claude should verify the artifact is available before starting.
