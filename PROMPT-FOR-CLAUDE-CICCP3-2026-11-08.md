# PROMPT FOR CLAUDE — CICCP-3 integration into Architect-owned files
**From:** the Owner (relay of Z.ai's synthesis, 2026-11-08) · **To:** Claude, the Architect · copy-paste ready · English only

---

Claude — hello. One request, offered as optional input per our own constitution (`AGENTS.md` §1: commands in High Councillor reviews are optional input to you). You own every file named below; nothing here overrides your authority, and striking any item with a one-line reason in `CHRONICLE.md` is a complete answer.

**Background.** Five council reports on how we should speak to each other landed this week: GPT's CICCP, DS's structure-first critique (CCP-2), Qwen's CICCP v2.0, Gemini's MAC-P, and Groq's CCIP. At my request Z.ai synthesized them into **CICCP-3**, grounded in our actual files rather than in the abstract — `_agents/zai/deliveries/COUNCIL-COMM-PROTOCOL-SYNTHESIS-2026-11-08.md` (arriving via `tools/import-zip.sh zai`; I can paste it if it has not landed). The one-line version: **our structure-first rules are right — finish them.** Language style is a decoration; handoff structure is load-bearing; most failures anywhere (and every failure we actually had) were lost state at handoff, not clumsy sentences.

**What I ask you to consider — all inside files only you control:**

1. **`inbox/README.md` — WORK block:** add six fields, *required for P0 items, optional elsewhere* (your call on the rollout): `GOAL_INVARIANT` (the Owner's verbatim line the work serves, quoted from the intake ledger), `WRITE_SCOPE` (`READ_ONLY | LANE_ONLY | ARCHITECT_REQUIRED`), `DEPENDS_ON` (ids / file#anchor / decisions; "none" is a value), `PRECONDITION` (with the command that proves it), `REPRODUCTION` (full command, so a reviewer can re-run), `UNCERTAINTY` (what was *not* run). Nothing in the existing format changes.
2. **`inbox/README.md` — REVIEW block:** append five edge questions, keeping "state the weakest point": (1) quote the `GOAL_INVARIANT` and check it against the intake ledger; (2) were `DEPENDS_ON`/`PRECONDITION` run, not assumed; (3) do names and labels match the single authority; (4) is the `EVIDENCE` label honest — receipt present when `VERIFIED`; (5) can you re-run this from `REPRODUCTION` alone — if not, ask, don't infer.
3. **`AGENTS.md` — one routing paragraph** (≤4 lines): dependency-chain and patch work uses the full WORK schema; open exploration stays prose with mandatory evidence labels; **full transcripts are never a handoff** (formalizes the existing "never read it whole"). Plus one CTE sentence: prose ≈80% ASD-STE style; technical terms, identifiers, numbers and uncertainty are always preserved; precision outranks style. No linter gate now; a soft sensor later only if you want one.
4. **`AGENTS.md` — the review-count fix:** §1 currently says *"after two confirmations it is REVIEWED"*, while `PRIORITIES.md` and `inbox/README.md` say **three** reviews (`REVIEWED ✓✓✓`). Z.ai verified this drift on 8 Nov. Please pick the number you want (council practice reads as three) and state it once, so the invariant has one home.
5. **`tasks/<id>.json` + `tools/check-tasks.mjs`:** four *optional* fields so nothing old breaks: `goal_invariant`, `depends_on[]`, `failure_class` (`data-gap | signal-corruption | referential-drift | capability-gap`), `caught_at_hop` (`1` review / `2` test order / `3` Owner or production). These turn the ledger into the failure-class metric the research recommends, at zero new infrastructure.
6. **`CLAUDE.md` + `claude/00-READ-FIRST.md` — one compaction line each:** the handover doc is a compacted decision log (hypotheses · evidence · open questions), never a transcript.

**Constraints, as always:** `AGENTS.md` stays ≈100 lines — if detail is needed, a sibling doc it links; protected constants untouched; add by path; seatbelt respected; English only; nothing here assigns work to any seat or changes the queue's authority. If any item conflicts with something I have not seen, the repo wins — I would appreciate one bulletin line saying which and why.

Thank you. The five reports run long; the five changes above are the part that matters, and every one of them is yours to shape.

— Kosi
