# GLM First-Read: V22-Suggestions.md (Cold, as Claude Would See It)

**Date:** 2026-10-22T00:15Z | **Speaker:** GLM (dispatch coordinator) | **Build hash:** `e1ac8184a601` (actual) vs `044d1759e01a` (document claim)

---

## 1. Leaderboard Entry: CONVERGENT OR REDUNDANT?

**The four referenced lines DO NOT EXIST in the document as described.**

| Claimed Location | Claimed Content | Actual Content at That Line |
|------------------|-----------------|----------------------------|
| Line 15 | "Claude's Critical Path" | `❌ Split the single HTML file without explicit Owner request.` (prohibition #4) |
| Line 21 | "Quick start: first 3 actions" | `---` (horizontal rule separator) |
| Line 28 | "CLAUDE EXECUTION BRIEF v2 (CANONICAL)" | Blank line after P2 priority label |
| Line 66 | "Five-minute header" | `Dirty-flag state machine: \`weightsDirty = JSON.stringify(weights) !== JSON.stringify(modelWeights())\`.` |

**Verdict:** The header claims are **INFERRED from a different document version**. The current V22-Suggestions.md (2,438 lines) has:
- **Five-minute header** at lines 3–20 (not line 66)
- **Priority labels** at lines 23–27 (P0/P1/P2)
- **No "Claude's Critical Path", "Quick start", or "CLAUDE EXECUTION BRIEF v2" sections anywhere**

**Where Claude would COMMIT vs STALL:**
- **COMMIT:** Lines 3–21 (Five-minute header + prohibitions) → clear contract
- **STALL:** Line 388 (build hash mismatch: doc claims `044d1759e01a`, actual `e1ac8184a601`) — cannot verify patches against wrong build
- **STALL:** Line 13449+ (protected constant changes claimed as "Owner approved via feedback" — no formal approval artifact)
- **STALL:** Line 72205 (P0-A: 3-4/4-3 implementation shape unresolved — alias vs new slots)

---

## 2. Top 3 Stall Points (with Line Numbers)

| # | Stall Point | Line(s) | Severity | Why It Blocks |
|---|-------------|---------|----------|---------------|
| **1** | **Build hash mismatch** — Document pins `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B) but `merged.html` at repo root hashes to `e1ac8184a601cc8bffa46069848b750eb30067c3f88f921aa90d79ee7da5b823` (same size, different content). All 4 re-cut patches target the old hash. | ~388, ~534, ~33420, ~33456, ~33489 | **BLOCKER** | Cannot apply patches without knowing which build is the true base. `node --check` on patched build may fail if base shifted. |
| **2** | **Protected constant approval gap** — P0-17/P10-1/P0-A claim "Owner approval was granted via this feedback" for `FLEX`/`NATURAL_SLOT_MAP` changes. AGENTS.md §Critical Invariants #9: "change only with the user's explicit approval." No signed decision record, STATUS.md entry, or Owner-signed PR exists. | ~13449, ~13517, ~13655, ~40631, ~72205 | **BLOCKER** | Claude (Architect) cannot modify protected constants without explicit Owner approval artifact. Verbal feedback in document ≠ formal approval. |
| **3** | **3-4/4-3 implementation shape undecided** — P0-16, P0-17, P4#2, OD-F1 all flag the alias-vs-new-slots question as open. P0-B marked "Owner-approved, Claude-implemented" but P4#2 says "Only the Owner can settle this." The code paths are mutually exclusive (alias mapping ~50 lines vs new slots touching 10+ core functions). | ~13000 (P0-16), ~13449 (P0-17), ~75393 (P4#2), ~23500 (OD-F1) | **BLOCKER** | Claude cannot write code for an undecided architecture. Blocks all flex rule implementation (R2). |

---

## 3. "How to Read This Document" / Merge Map at End: VERIFICATION

**CLAIM:** *"The header claims 'How to read this document' at the end carries the canonical order and the merge map"*

**FINDING:** **FALSE — SECTION DOES NOT EXIST.**

The document ends at line 2,439 with:
- **PRIORITY SUMMARY FOR CLAUDE** (lines 2360–2368): P0/P1/P2 lists + Owner decisions
- **VERIFICATION CHECKLIST** (lines 2388–2398): 6 checks with commands
- **FILES TO MODIFY** (lines 2402–2415): 5 files
- **NEXT STEPS FOR CLAUDE** (lines 2418–2428): 5 numbered steps (note: two "4." entries)
- **V21 → V22 Transition** (line 2432–2434): one-liner
- **Speaker attribution** (line 2438): UK, 2026-10-21T23:55:00Z

**NO** "How to read this document" section. **NO** canonical reading order for 2,438 lines. **NO** merge map. The "Five-minute header" (lines 3–21) says only: *"Apply in P0→P1→P2 order. Run node --check... Do not batch-apply without intermediate verification."*

**What exists instead:** My own `_agents/nemotron-3-ultra-free/notes/V22-STRUCTURE.md` provides the reading order (R1→R2→R3), house-form table, and contradiction list — but that's in my lane, not in V22-Suggestions.md.

---

## Evidence Labels

| Claim | Label | Basis |
|-------|-------|-------|
| Build hash in doc matches repo | **REPORTED** (doc) / **VERIFIED FALSE** (actual) | `shasum -a 256` on `merged.html` |
| Protected constants have Owner approval | **INFERRED** (doc claims) / **UNVERIFIED** (no artifact) | AGENTS.md requires explicit approval |
| 3-4/4-3 shape decided | **INFERRED** (P0-B says approved) / **CONTRADICTED** (P4#2, OD-F1) | P4#2 explicitly says "Only Owner can settle" |
| "How to read" section at end | **REPORTED** (task) / **VERIFIED ABSENT** | Full document scan |
| Duplicate P1-20→P1-26 = P1-34→P1-40 | **VERIFIED** | Exact text matches at two locations |
| P0-18→P0-22 triplicated in P10 + Owner brief | **VERIFIED** | Three identical content blocks |

---

## Summary for Council Bulletin

**Build hash mismatch (doc: `044d1759` vs actual: `e1ac8184`) invalidates all patch targets. Protected constant approval for flex rules exists only as verbal feedback in doc, not as formal artifact. 3-4/4-3 architecture undecided — blocks R2 entirely. Document lacks reading order/merge map at end; Claude would stall at line 388.**