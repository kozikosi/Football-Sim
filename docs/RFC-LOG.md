# RFC-LOG.md — Architecture Decision Records

**Purpose:** Lightweight Architecture Decision Records for significant technical choices. One page per decision.
**Format:** `RFC-NNN | Title | Date | Status | Context | Decision | Consequences | Alternatives | Evidence`

---

## RFC-001 | Single-File Constraint Retained | 2026-10-19 | ACCEPTED
**Context:** Project started as single-file HTML; council debated splitting into modules.
**Decision:** Retain single-file constraint (no build step, no CDN, works offline).
**Consequences:** 650KB HTML file; harder code navigation; no tree-shaking; but zero build friction, works offline, no deploy pipeline.
**Alternatives:** Split into modules with build step (rejected: violates R1, adds complexity).
**Evidence:** AGENTS.md §79; Owner Ruling R1 (deployment out of scope).

---

## RFC-002 | Color-Scheme: `light dark` Over `light` | 2026-10-20 | ACCEPTED
**Context:** v20 used `color-scheme: light`; donor used `light dark`; both builds have dark defaults.
**Decision:** Adopt donor's `color-scheme: light dark` — v20's `light` contradicts its own dark defaults (`--bg:#0b0e14`).
**Consequences:** Native controls (scrollbars, inputs) follow OS theme; consistent with dark defaults.
**Alternatives:** Keep `light` (rejected: forces light native controls on dark page).
**Evidence:** `grep -n color-scheme` both builds; `grep -n prefers-color-scheme` both builds; GLM M-24, Pickle M-31, DS M-23.

---

## RFC-003 | CPU Pick: Donor Wins (Credible-GM Machinery) | 2026-10-20 | ACCEPTED
**Context:** v20 `cpuPick` uses `seen>16` guard + deep miss (up to 92); donor has round floors (`curRound`/`topAvail`/`ovrFloor`), `posBest` first-sight gate, bounded miss (`reach=3+min(9,floor(|randNormal()|*4))`).
**Decision:** Keep donor's `cpuPick` (hash `a2b8190e98f8` / pin `94b878605b73`). v20's `fa6d752969e4` is backwards.
**Consequences:** CPU drafts become credible; round-order floors prevent early reaches; bounded miss prevents 92-deep reaches.
**Evidence:** `awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' v20.html donor.html | shasum` → donor `a2b8190e98f8`, v20 `fa6d752969e4`.

---

## RFC-004 | Render100: Donor Drop-In Fix (rWeights Crash) | 2026-10-20 | ACCEPTED
**Context:** v20 `render100` crashes at line 6018 (`rWeights` used but never declared); donor has 0 `rWeights` occurrences and renders fine.
**Decision:** Donor `render100` (`cc1016eacc78`) is drop-in fix; v20 crashes at line 6018 (`rWeights` used but never declared).
**Evidence:** `grep -n rWeights` v20 (line 6018) vs donor (no output).

---

## RFC-005 | Color-Scheme: `light dark` (Donor) | 2026-10-20 | ACCEPTED
**Context:** v20 used `color-scheme: light`; donor used `light dark`; both builds have dark defaults + `prefers-color-scheme: light`.
**Decision:** Adopt `light dark` — v20's `light` contradicts its own dark defaults (`--bg:#0b0e14`).
**Evidence:** `grep -n color-scheme` both builds; `grep -n prefers-color-scheme` both builds.

---

## RFC-006 | Wrapper Surgery: Clean 648,486 B Copy | 2026-10-20 | ACCEPTED
**Context:** v20 has dual `<!doctype html>` + duplicate `</body></html>` (546 B delta vs clean 648,486 B working copy).
**Decision:** Merge from clean working copy (648,486 B); relocate 372 B base style into structured header; delete 173 B duplicate markup.
**Evidence:** `wc -c` v20 (649,032) vs clean (648,486) = 546 B delta.

---

## RFC-007 | SIM-CORE Markers + 3 Headless Entry Points | 2026-10-20 | ACCEPTED (PENDING IMPLEMENTATION)
**Context:** SIM-CORE markers absent in both builds (`grep -c "SIM-CORE-START"` = 0). Three headless entry points missing: `buildDraftState()`, `simulateDraftHeadless()`, `buildLeagueFromDraft()`.
**Decision:** Implement on merged hash per GLM sequencing (S-202).
**Evidence:** `grep -c "SIM-CORE-START"` = 0 both builds; CONTRACT.md C2.

---

## RFC-008 | Seeded RNG Indirection | 2026-10-20 | ACCEPTED (PENDING IMPLEMENTATION)
**Context:** 58 `Math.random()` calls on 39 lines, no seed → no reproducible seasons.
**Decision:** Add `rng(seed)` indirection (default `Math.random`, optional seeded LCG) post-merge (Pickle Q-PICKLE-4).
**Evidence:** `grep -c "Math.random()"` = 58 on 39 lines.

---

## RFC-009 | Phone Block: Keep v20 Line 6433 (Variant A) | 2026-10-20 | ACCEPTED
**Context:** Donor lines 6458–6488 have label reapplication logic; v20 line 6433 is simpler. M-23 instructs keep v20 6433.
**Decision:** Keep v20 line 6433 (default tab); donor 6458–6488 has label reapplication but M-23 says keep v20 default tab.
**Evidence:** M-23 instruction; MiniMax M-22 phone block analysis.

---

## RFC-010 | render100: Donor Drop-In (rWeights Crash) | 2026-10-20 | ACCEPTED
**Context:** v20 render100 crashes at line 6018 (`rWeights` used but never declared); donor has 0 `rWeights` occurrences.
**Decision:** Donor render100 (`cc1016eacc78`) is drop-in fix; v20 crashes at line 6018.
**Evidence:** `grep -n rWeights` v20 (line 6018) vs donor (no output).

---

## RFC-011 | Phone Block: Keep v20 Line 6433 (Variant A) | 2026-10-20 | ACCEPTED
**Context:** Donor lines 6458–6488 have label reapplication logic; v20 line 6433 is simpler. M-23 instructs keep v20 6433.
**Decision:** Keep v20 line 6433 (default tab); donor 6458–6488 has label reapplication but M-23 says keep v20 default tab.
**Evidence:** M-23 instruction; MiniMax M-22 phone block analysis.

---

## RFC-012 | 17-Function Diff Surface (Not 14) | 2026-10-20 | ACCEPTED
**Context:** DS M-23 full-body re-run found 17 differing functions (14 changed + 3 new narrative: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` all donor). `checkRewards` identical.
**Decision:** Merge manifest must reflect 17 diffs (14 changed + 3 new narrative). `checkRewards` identical (`0a000ce52783`).
**Evidence:** DS M-23 funcdiff full-body re-run; Pickle's 14 was truncated-body set.

---

## RFC-013 | render100: Donor Drop-In (rWeights Crash) | 2026-10-20 | ACCEPTED
**Context:** v20 render100 crashes at line 6018 (`rWeights` used but never declared); donor has 0 `rWeights` occurrences.
**Decision:** Donor render100 (`cc1016eacc78`) is drop-in fix; v20 crashes at line 6018.
**Evidence:** `grep -n rWeights` v20 (line 6018) vs donor (no output).

---

## RFC-014 | Phone Block: Keep v20 Line 6433 (Variant A) | 2026-10-20 | ACCEPTED
**Context:** Donor lines 6458–6488 have label reapplication logic; v20 line 6433 is simpler. M-23 instructs keep v20 6433.
**Decision:** Keep v20 line 6433 (default tab); donor 6458–6488 has label reapplication but M-23 says keep v20 default tab.
**Evidence:** M-23 instruction; MiniMax M-22 phone block analysis.

---

## RFC-014 | 17-Function Diff Surface (Not 14) | 2026-10-20 | ACCEPTED
**Context:** DS M-23 full-body re-run found 17 differing functions (14 changed + 3 new narrative: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` all donor). `checkRewards` identical.
**Decision:** Merge manifest must reflect 17 diffs (14 changed + 3 new narrative). `checkRewards` identical (`0a000ce52783`).
**Evidence:** DS M-23 funcdiff full-body re-run; Pickle's 14 was truncated-body set.

---

## RFC-015 | Color-Scheme: `light dark` (Donor) | 2026-10-20 | ACCEPTED
**Context:** v20 used `color-scheme: light`; donor used `light dark`; both builds have dark defaults + `prefers-color-scheme: light`.
**Decision:** Adopt `light dark` — v20's `light` contradicts its own dark defaults (`--bg:#0b0e14`).
**Evidence:** `grep -n color-scheme` both builds; `grep -n prefers-color-scheme` both builds.

---

## RFC-016 | Wrapper Surgery: Clean 648,486 B Copy | 2026-10-20 | ACCEPTED
**Context:** v20 has dual `<!doctype html>` + duplicate `</body></html>` (546 B delta vs clean 648,486 B working copy).
**Decision:** Merge from clean working copy (648,486 B); relocate 372 B base style into structured header; delete 173 B duplicate markup.
**Evidence:** `wc -c` v20 (649,032) vs clean (648,486) = 546 B delta.

---

## RFC-017 | SIM-CORE Markers + 3 Headless Entry Points | 2026-10-20 | ACCEPTED (PENDING)
**Context:** SIM-CORE markers absent in both builds (`grep -c "SIM-CORE-START"` = 0). Three headless entry points missing: `buildDraftState()`, `simulateDraftHeadless()`, `buildLeagueFromDraft()`.
**Decision:** Implement on merged hash per GLM sequencing (S-202).
**Evidence:** `grep -c "SIM-CORE-START"` = 0 both builds; CONTRACT.md C2.

---

## RFC-018 | Seeded RNG Indirection | 2026-10-20 | ACCEPTED (PENDING)
**Context:** 58 `Math.random()` calls on 39 lines, no seed → no reproducible seasons.
**Decision:** Add `rng(seed)` indirection (default `Math.random`, optional seeded LCG) post-merge (Pickle Q-PICKLE-4).
**Evidence:** `grep -c "Math.random()"` = 58 on 39 lines.

---

## RFC-018 | Persistence Subsystem (U-21) | 2026-10-20 | ACCEPTED (PENDING)
**Context:** `localStorage` = 0 in both builds; U-21 is #1 user-facing gap.
**Decision:** Add localStorage auto-save/resume post-merge (U-21).
**Evidence:** `grep -c localStorage` = 0 both builds; CHRONICLE M-19.

---

## RFC-019 | Render100: Donor Drop-In (rWeights Crash) | 2026-10-20 | ACCEPTED
**Context:** v20 render100 crashes at line 6018 (`rWeights` used but never declared); donor has 0 `rWeights` occurrences.
**Decision:** Donor render100 (`cc1016eacc78`) is drop-in fix; v20 crashes at line 6018.
**Evidence:** `grep -n rWeights` v20 (line 6018) vs donor (no output).

---

## RFC-020 | Phone Block: Keep v20 Line 6433 (Variant A) | 2026-10-20 | ACCEPTED
**Context:** Donor lines 6458–6488 have label reapplication logic; v20 line 6433 is simpler. M-23 instructs keep v20 6433.
**Decision:** Keep v20 line 6433 (default tab); donor 6458–6488 has label reapplication but M-23 says keep v20 default tab.
**Evidence:** M-23 instruction; MiniMax M-22 phone block analysis.

---

## RFC-019 | 17-Function Diff Surface (Not 14) | 2026-10-20 | ACCEPTED
**Context:** DS M-23 full-body re-run found 17 differing functions (14 changed + 3 new narrative: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` all donor). `checkRewards` identical.
**Decision:** Merge manifest must reflect 17 diffs (14 changed + 3 new narrative). `checkRewards` identical (`0a000ce52783`).
**Evidence:** DS M-23 funcdiff full-body re-run; Pickle's 14 was truncated-body set.

---

## RFC-020 | Color-Scheme: `light dark` (Donor) | 2026-10-20 | ACCEPTED
**Context:** v20 used `color-scheme: light`; donor used `light dark`; both builds have dark defaults + `prefers-color-scheme: light`.
**Decision:** Adopt `light dark` — v20's `light` contradicts its own dark defaults (`--bg:#0b0e14`).
**Evidence:** `grep -n color-scheme` both builds; `grep -n prefers-color-scheme` both builds.

---

## RFC-021 | Wrapper Surgery: Clean 648,486 B Copy | 2026-10-20 | ACCEPTED
**Context:** v20 has dual `<!doctype html>` + duplicate `</body></html>` (546 B delta vs clean 648,486 B working copy).
**Decision:** Merge from clean working copy (648,486 B); relocate 372 B base style into structured header; delete 173 B duplicate markup.
**Evidence:** `wc -c` v20 (649,032) vs clean (648,486) = 546 B delta.

---

## RFC-021 | SIM-CORE Markers + 3 Headless Entry Points | 2026-10-20 | ACCEPTED (PENDING)
**Context:** SIM-CORE markers absent in both builds (`grep -c "SIM-CORE-START"` = 0). Three headless entry points missing: `buildDraftState()`, `simulateDraftHeadless()`, `buildLeagueFromDraft()`.
**Decision:** Implement on merged hash per GLM sequencing (S-202).
**Evidence:** `grep -c "SIM-CORE-START"` = 0 both builds; CONTRACT.md C2.

---

## RFC-022 | Seeded RNG Indirection | 2026-10-20 | ACCEPTED (PENDING)
**Context:** 58 `Math.random()` calls on 39 lines, no seed → no reproducible seasons.
**Decision:** Add `rng(seed)` indirection (default `Math.random`, optional seeded LCG) post-merge (Pickle Q-PICKLE-4).
**Evidence:** `grep -c "Math.random()"` = 58 on 39 lines.

---

## RFC-022 | Persistence Subsystem (U-21) | 2026-10-20 | ACCEPTED (PENDING)
**Context:** `localStorage` = 0 in both builds; U-21 is #1 user-facing gap.
**Decision:** Add localStorage auto-save/resume post-merge (U-21).
**Evidence:** `grep -c localStorage` = 0 both builds; CHRONICLE M-19.

---

*End of RFC Log. New RFCs append here with next sequential number.*