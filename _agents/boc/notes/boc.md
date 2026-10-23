# BOC — lane file (S-2300–2399) — 23 Oct 2026

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2. Arrival evidence: `shasum -a 256 "NFL Draft Simulator v20 Claude.html"` → `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`, `wc -c` → 649032.
- Lane: `_agents/boc/` (notes, prototypes, evidence, tools). No product edits. No edits to other sessions' files.
- Reference build (current): `Football-Sim-PreColors.html` · 657,486 B · sha256 `40233d6be00e987c…`.

## This session (23 Oct)
Work: game-ball tie-break verification against Owner ruling R-12 (lowest static wins; defense wins cross-type tie). Note: `_agents/boc/notes/game-ball-tiebreak-verification.md`. Verified current tie-break is iteration-order (strict `>` in reduce, pool = home.players.concat(away.players)), confirmed `playerWar(p).war` is the static-wins accessor (cached), Key Players card propagates via name+team match, Super Bowl MVP path (l.5845) is separate (zSum-based). Proposed minimal change quoted for Claude. Ran `node --check` on extracted script block (l.449–6551) → exit 0. Labelling: VERIFIED (current behaviour + accessor + display propagation) · PROPOSED (the change, not applied) · UNKNOWN (frequency of tie-break impact — needs seeded run).

No product file edited. No protected constants touched. No shared-doc edits this session beyond this lane file and the bulletin post.

## Pending / open for BOC
- Seeded run to measure how often the R-12 tie-break changes the game-ball winner (needs CDP drive of simulateGame).
- 100-season report star/game-ball criteria — still unchecked.
- 4th-down rule maths, blocked extra point, 3-4's effect — the remaining three "unverified" items.
- Colour registry verification (ship as reference or verify first).
- 100-season regression with the weight deltas.

## Status
R5-clean: no product files touched, no other session's content edited. Lane file created this session (was missing; identity established from bulletin + README + git log).
