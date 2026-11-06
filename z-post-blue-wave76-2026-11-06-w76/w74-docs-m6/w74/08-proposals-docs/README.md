# 08-proposals-docs — proposals, patches and analyses (w74 items 8a–8g + the old-shell deletion analysis)

**What this is:** files, not product code — the sync-conflict rule, the freeze mechanics, the P-251 doc cleanup with quoted text and diffs, the P-257 wording, the P-258 delete patch, the DATASET.md provenance structure, the Fix-It Board spec, and the old-shell deletion analysis the brief assigns to this seat.

**Applies to:** the repo's docs/contract layer at `425f72a` (+ `origin/main` and `origin/gh-pages` for the deletion analysis). Every patch is text the Architect applies; nothing here is merged.

**Test counts:** 288 = the full vitest suite (core + nfl + app) · 286 = 288 minus the 2 storage-env-dependent tests skipped in the sandbox run · 284 = 286 minus the 2 golden-seasons tests that were still warming (288−2−2).

| File | Item | One line |
|---|---|---|
| `P-254-sync-conflict-rule.md` | 8a | per-slot LWW on the WHOLE save, never a field merge; `deviceId?` joins the envelope NOW (additive) so v1.1 sync never unfreezes; the three reasons a merge manufactures corrupt saves |
| `envelope-freeze-mechanics.md` | 8b | how freezing works: Architect writes the freeze + tags it; a generated conformance test in CI enforces it; additive+versioned later, renames forbidden, never repair on read; the three branch receipts it hangs on (VERIFIED) |
| `P-251-doc-cleanup/P-251-quotes-and-diffs.md` | 8c | every leftover single-file mention QUOTED (INTEGRATION-PLAN "Shape" para, NEXTJS-REVIEW point 3, PRIORITIES P-035/P-198, build.mjs `--html`) + the corrected text + 4 unified diffs + the repo grep result |
| `P-257-queue-wording.md` | 8d | the two sentences: every review declares `FOUND: <n>` (confirmed, each with its command) and `NEW: <n>` (findings no earlier review had); an undeclared review does not count toward the 2-seat minimum |
| `P-258-legacy-delete-patch.md` | 8e | the exact delete patch: legacy.ts (68 lines) + the 4 "legacy move:" tests (namespacing.test.ts lines 76–112) + the import + the keys.ts comment; the boot-time `zpb:*` loop **does not exist on the branch** (VERIFIED) — the patch records "never port it"; post-patch suite = 284/0 |
| `DATASET.md` | 8f | the provenance structure (owner/date/method/sha256/licence, one line each) + the one-sentence About/Guide line; ratings content stays Kosi's (DO NOT START honored); what is already known is filled and VERIFIED |
| `fixit-board-spec.md` | 8g | the Fix-It Board spec (worst rooms by unit damage, worst contributor seasons) — **spec only**: the unit half needs no ruling, the player half waits on the F2 ruling (stats payload home); the logic is frozen so F2 merely turns it on |
| `old-shell-deletion-analysis.md` | DO-NOT-START carve-out | the complete reference map (BASELINES.md, CLAUDE-START-HERE, z-core docs, zpostblue_build.py, provenance comments — product code has ZERO references, VERIFIED), what survives (w70 gh-pages anchor, pin table, archive tag), and the 4-step deletion sequence for Claude's timing call |
